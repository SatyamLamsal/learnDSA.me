import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import * as recast from 'recast';
import { parse } from '@babel/parser';

const b = recast.types.builders;

export async function POST(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
  }

  try {
    const elementInfo = await request.json();
    
    if (!elementInfo || !elementInfo.styles) {
      return NextResponse.json({ error: 'Missing element info or styles' }, { status: 400 });
    }

    // Path to the current page.tsx
    const pagePath = join(process.cwd(), 'src', 'app', 'page.tsx');
    
    // Read current file content
    const fileContent = await readFile(pagePath, 'utf8');

    // Modify using AST for safety
    const modifiedContent = await modifyPageContentAST(fileContent, elementInfo);

    if (modifiedContent && modifiedContent !== fileContent) {
      // Write the modified content back
      await writeFile(pagePath, modifiedContent, 'utf8');
      
      console.log(`✅ Modified page.tsx for element: ${elementInfo.tagName || 'unknown'}`);
      
      return NextResponse.json({
        success: true,
        message: 'Page modified successfully',
        filePath: 'src/app/page.tsx',
        changes: 'Applied inline styles'
      });
    } else {
      return NextResponse.json({
        success: false,
        error: 'No matching element found to modify'
      });
    }

  } catch (error) {
    console.error('Error modifying file:', error);
    return NextResponse.json({ error: 'Failed to modify file' }, { status: 500 });
  }
}

async function modifyPageContentAST(content: string, elementInfo: any): Promise<string | null> {
  const { styles, tagName, className, textContent } = sanitizeElementInfo(elementInfo);
  let safeStyles = filterAllowedStyles(styles);

  // Early exit if nothing to apply
  if (Object.keys(safeStyles).length === 0) return null;

  // Parse TSX using Babel via Recast to preserve formatting
  const ast = recast.parse(content, {
    parser: {
      parse: (source: string) =>
        parse(source, {
          sourceType: 'module',
          plugins: ['typescript', 'jsx'],
        }),
    },
  });

  let changed = false;

  recast.types.visit(ast, {
    // Use loose typing to avoid build-time type dependency on recast internals
    visitJSXElement(path: any) {
      const opening = path.node.openingElement;
      const name = opening.name.type === 'JSXIdentifier' ? opening.name.name : null;

      // Match by tag if provided
      if (tagName && name && name.toLowerCase() !== String(tagName).toLowerCase()) {
        return this.traverse(path);
      }

      // Get className string literal if present
      const clsAttr = opening.attributes.find(
        (a: any) => a.type === 'JSXAttribute' && a.name?.name === 'className'
      ) as any;

      let classStr: string | null = null;
      if (clsAttr && clsAttr.value) {
        if (clsAttr.value.type === 'StringLiteral') classStr = clsAttr.value.value;
        if (clsAttr.value.type === 'JSXExpressionContainer' && clsAttr.value.expression.type === 'StringLiteral') {
          classStr = clsAttr.value.expression.value;
        }
      }

      // If className filter provided, require at least one class to match
      if (className) {
        const required = String(className).split(/\s+/).filter(Boolean);
        if (!classStr) return this.traverse(path);
        const hasAny = required.some((c) => new RegExp(`(^|\n|\t|\s)${escapeRegex(c)}(\n|\t|\s|$)`).test(classStr!));
        if (!hasAny) return this.traverse(path);
      }

      // Fallback: match textContent if provided and not already matched by class
      if (!className && textContent) {
        const wanted = String(textContent).trim().replace(/\s+/g, ' ');
        const hasText = path.node.children.some((ch: any) =>
          (ch.type === 'JSXText' && ch.value.trim().replace(/\s+/g, ' ') === wanted)
        );
        if (!hasText) return this.traverse(path);
      }

      // Gradient guard: if class has gradient text, remove color from styles
      if (classStr && /\bbg-clip-text\b/.test(classStr) && /\btext-transparent\b/.test(classStr)) {
        const { color, ...rest } = safeStyles;
        safeStyles = rest;
      }

      if (Object.keys(safeStyles).length === 0) return this.traverse(path);

      // Find style attribute
      const styleAttrIndex = opening.attributes.findIndex(
        (a: any) => a.type === 'JSXAttribute' && a.name?.name === 'style'
      );

      if (styleAttrIndex >= 0) {
        const styleAttr: any = opening.attributes[styleAttrIndex];
        if (
          styleAttr.value &&
          styleAttr.value.type === 'JSXExpressionContainer' &&
          styleAttr.value.expression.type === 'ObjectExpression'
        ) {
          const obj = styleAttr.value.expression;
          const existingMap = new Map<string, any>();
          for (const prop of obj.properties) {
            if (prop.type === 'ObjectProperty' && prop.key.type === 'Identifier') {
              existingMap.set(prop.key.name, prop);
            }
          }
          // Merge values
          for (const [k, v] of Object.entries(safeStyles)) {
            const lit = b.stringLiteral(String(v));
            if (existingMap.has(k)) {
              const p: any = existingMap.get(k);
              p.value = lit;
            } else {
              obj.properties.push(b.objectProperty(b.identifier(k), lit));
            }
          }
          changed = true;
        }
        // If style is non-object expression, skip to avoid unsafe edits
      } else {
        // Create a new style object literal
        const props = Object.entries(safeStyles).map(([k, v]) =>
          b.objectProperty(b.identifier(k), b.stringLiteral(String(v)))
        );
        const jsxAttr = b.jsxAttribute(
          b.jsxIdentifier('style'),
          b.jsxExpressionContainer(b.objectExpression(props))
        );
        opening.attributes.push(jsxAttr);
        changed = true;
      }

      return false; // don't traverse into children after modification
    },
  });

  if (!changed) return null;

  const output = recast.print(ast, { quote: 'single' }).code;

  // Validate by parsing again to ensure we didn't corrupt JSX
  try {
    recast.parse(output, {
      parser: { parse: (source: string) => parse(source, { sourceType: 'module', plugins: ['typescript', 'jsx'] }) },
    });
  } catch (e) {
    console.error('AST output failed to parse, aborting write:', e);
    return null;
  }

  return output;
}

function sanitizeElementInfo(info: any) {
  return {
    tagName: String(info?.tagName || ''),
    className: String(info?.className || ''),
    textContent: String(info?.textContent || ''),
    styles: info?.styles || {}
  };
}

const ALLOWED_PROPS = new Set(['color', 'backgroundColor', 'fontFamily', 'fontSize', 'fontWeight']);

function filterAllowedStyles(styles: Record<string, any>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(styles || {})) {
    if (!ALLOWED_PROPS.has(k)) continue;
    if (v === undefined || v === null || v === '' || v === 'inherit') continue;
    out[k] = String(v);
  }
  return out;
}

function styleObjectToString(obj: Record<string, string>): string {
  const pairs = Object.entries(obj).map(([k, v]) => `${k}: '${escapeSingleQuotes(v)}'`);
  return `{ ${pairs.join(', ')} }`;
}

// Legacy regex helpers kept for potential future utilities
function mergeStyleStrings(existing: string, add: Record<string, string>): Record<string, string> {
  const parsed = parseStyleString(existing);
  for (const [k, v] of Object.entries(add)) parsed[k] = v;
  return parsed;
}

function parseStyleString(styleStr: string): Record<string, string> {
  const out: Record<string, string> = {};
  if (!styleStr) return out;
  const regex = /([\w-]+)\s*:\s*['"]([^'"\\]*(?:\\.[^'"\\]*)*)['"]/g;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(styleStr)) !== null) {
    const key = m[1];
    const raw = m[2].replace(/\\(['"]) /g, '$1');
    out[key] = raw;
  }
  return out;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function escapeSingleQuotes(v: string): string {
  return v.replace(/'/g, "\\'");
}