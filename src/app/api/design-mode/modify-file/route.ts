import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import * as recast from 'recast';
import { parse } from '@babel/parser';

const b = recast.types.builders;

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
  }
  try {
    const elementInfo = await request.json();
    if (!elementInfo || !elementInfo.styles) {
      return NextResponse.json({ error: 'Missing element info or styles' }, { status: 400 });
    }
    const pagePath = join(process.cwd(), 'src', 'app', 'page.tsx');
    const fileContent = await readFile(pagePath, 'utf8');
    const modifiedContent = await modifyPageContentAST(fileContent, elementInfo);
    if (modifiedContent && modifiedContent !== fileContent) {
      await writeFile(pagePath, modifiedContent, 'utf8');
      return NextResponse.json({ success: true, filePath: 'src/app/page.tsx' });
    }
    return NextResponse.json({ success: false, error: 'No matching element found to modify' });
  } catch (error) {
    console.error('Error modifying file:', error);
    return NextResponse.json({ error: 'Failed to modify file' }, { status: 500 });
  }
}

function sanitizeElementInfo(info: any) {
  return {
    tagName: String(info?.tagName || '').toLowerCase(),
    className: String(info?.className || ''),
    id: String(info?.id || ''),
    textContent: String(info?.textContent || ''),
    styles: info?.styles || {},
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

function baseTagName(node: any): string | null {
  if (!node) return null;
  if (node.type === 'JSXIdentifier') return String(node.name || '').toLowerCase();
  if (node.type === 'JSXMemberExpression') {
    const prop = node.property;
    if (prop && prop.type === 'JSXIdentifier') return String(prop.name || '').toLowerCase();
  }
  return null;
}

function getStaticClassText(attrValue: any): string {
  if (!attrValue) return '';
  if (attrValue.type === 'StringLiteral') return attrValue.value || '';
  if (attrValue.type === 'JSXExpressionContainer') {
    const expr = attrValue.expression;
    if (!expr) return '';
    if (expr.type === 'StringLiteral') return expr.value || '';
    if (expr.type === 'TemplateLiteral') {
      return expr.quasis.map((q: any) => q.value?.cooked || '').join(' ');
    }
    const collectBinary = (e: any): string => {
      if (!e) return '';
      if (e.type === 'StringLiteral') return e.value || '';
      if (e.type === 'TemplateLiteral') return e.quasis.map((q: any) => q.value?.cooked || '').join(' ');
      if (e.type === 'BinaryExpression' && e.operator === '+') {
        return `${collectBinary(e.left)} ${collectBinary(e.right)}`.trim();
      }
      return '';
    };
    return collectBinary(expr);
  }
  return '';
}

function staticHasAnyToken(staticText: string, tokens: string[]): boolean {
  if (!staticText) return false;
  const words = new Set(staticText.split(/\s+/).filter(Boolean));
  return tokens.some(t => words.has(t));
}

async function modifyPageContentAST(content: string, elementInfo: any): Promise<string | null> {
  const { styles, tagName, className, id, textContent } = sanitizeElementInfo(elementInfo);
  let safeStyles = filterAllowedStyles(styles);
  if (Object.keys(safeStyles).length === 0) return null;

  const ast = recast.parse(content, {
    parser: {
      parse: (source: string) => parse(source, { sourceType: 'module', plugins: ['typescript', 'jsx'] }),
    },
  });

  let changed = false;

  recast.types.visit(ast, {
    visitJSXElement(path: any) {
      const opening = path.node.openingElement;
      const tagBase = baseTagName(opening.name);

      if (tagName && tagBase && tagBase !== tagName) {
        return this.traverse(path);
      }

      // Attributes
      const clsAttr = opening.attributes.find((a: any) => a.type === 'JSXAttribute' && a.name?.name === 'className') as any;
      const idAttr = opening.attributes.find((a: any) => a.type === 'JSXAttribute' && a.name?.name === 'id') as any;
      const staticClass = clsAttr ? getStaticClassText(clsAttr.value) : '';
      const idStr = idAttr && idAttr.value && idAttr.value.type === 'StringLiteral' ? idAttr.value.value : '';

      const wantClasses = className ? className.split(/\s+/).filter(Boolean) : [];

      // Matching logic priority: id > className > textContent
      if (id) {
        if (idStr !== id) return this.traverse(path);
      } else if (wantClasses.length) {
        if (!staticHasAnyToken(staticClass, wantClasses)) return this.traverse(path);
      } else if (textContent) {
        const wanted = textContent.trim().replace(/\s+/g, ' ');
        const hasText = path.node.children.some((ch: any) => ch.type === 'JSXText' && ch.value.trim().replace(/\s+/g, ' ') === wanted);
        if (!hasText) return this.traverse(path);
      }

      // Gradient text guard
      if (staticClass && /\bbg-clip-text\b/.test(staticClass) && /\btext-transparent\b/.test(staticClass)) {
        const { color, ...rest } = safeStyles;
        safeStyles = rest;
      }
      if (Object.keys(safeStyles).length === 0) return this.traverse(path);

      const styleIdx = opening.attributes.findIndex((a: any) => a.type === 'JSXAttribute' && a.name?.name === 'style');
      if (styleIdx >= 0) {
        const styleAttr: any = opening.attributes[styleIdx];
        if (styleAttr.value && styleAttr.value.type === 'JSXExpressionContainer' && styleAttr.value.expression.type === 'ObjectExpression') {
          const obj = styleAttr.value.expression;
          const existing = new Map<string, any>();
          for (const p of obj.properties) {
            if (p.type === 'ObjectProperty' && p.key.type === 'Identifier') existing.set(p.key.name, p);
          }
          for (const [k, v] of Object.entries(safeStyles)) {
            const lit = b.stringLiteral(String(v));
            if (existing.has(k)) {
              (existing.get(k) as any).value = lit;
            } else {
              obj.properties.push(b.objectProperty(b.identifier(k), lit));
            }
          }
          changed = true;
        }
      } else {
        const props = Object.entries(safeStyles).map(([k, v]) => b.objectProperty(b.identifier(k), b.stringLiteral(String(v))));
        const jsxAttr = b.jsxAttribute(b.jsxIdentifier('style'), b.jsxExpressionContainer(b.objectExpression(props)));
        opening.attributes.push(jsxAttr);
        changed = true;
      }

      return false;
    },
  });

  if (!changed) return null;
  const output = recast.print(ast, { quote: 'single' }).code;
  // Validate
  try {
    parse(output, { sourceType: 'module', plugins: ['typescript', 'jsx'] });
  } catch (e) {
    console.error('AST output failed to parse:', e);
    return null;
  }
  return output;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}