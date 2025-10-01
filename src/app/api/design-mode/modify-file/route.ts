import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

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
    
    // Modify the file based on element info
    const modifiedContent = await modifyPageContent(fileContent, elementInfo);
    
    if (modifiedContent !== fileContent) {
      // Write the modified content back
      await writeFile(pagePath, modifiedContent, 'utf8');
      
      console.log(`✅ Modified page.tsx for element: ${elementInfo.tagName}`);
      
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

async function modifyPageContent(content: string, elementInfo: any): Promise<string> {
  const { styles, tagName, className, textContent } = sanitizeElementInfo(elementInfo);

  // Only allow whitelisted style props and defined values
  const safeStyles = filterAllowedStyles(styles);
  if (Object.keys(safeStyles).length === 0) return content;

  let modifiedContent = content;
  let hasModifications = false;

  // Strategy 1: Find by className and add/update style prop
  if (className) {
    const classNames = className.split(' ').filter(Boolean);
    for (const cls of classNames) {
      // Add style if missing
      const addRegex = new RegExp(
        `className=["'\`]([^"'\`]*\\b${escapeRegex(cls)}\\b[^"'\`]*)["'\`](?!\\s*style=)`,
        'g'
      );
      modifiedContent = modifiedContent.replace(addRegex, (match) => {
        hasModifications = true;
        return match + ` style={${styleObjectToString(safeStyles)}}`;
      });

      // Merge if style exists
      const updateRegex = new RegExp(
        `className=["'\`]([^"'\`]*\\b${escapeRegex(cls)}\\b[^"'\`]*)["'\`]\\s*style=\\{([^}]+)\\}`,
        'g'
      );
      modifiedContent = modifiedContent.replace(updateRegex, (_m, classMatch, existing) => {
        hasModifications = true;
        const merged = mergeStyleStrings(existing, safeStyles);
        return `className="${classMatch.trim()}" style={${styleObjectToString(merged)}}`;
      });
    }
  }

  // Strategy 2: Find by exact text content (fallback)
  if (!hasModifications && textContent && textContent.length > 3) {
    const clean = textContent.trim().replace(/\s+/g, ' ');
    const textRegex = new RegExp(`(>\s*)${escapeRegex(clean)}(\s*<)`, 'g');
    modifiedContent = modifiedContent.replace(textRegex, (_m, before, after) => {
      hasModifications = true;
      return `${before}<span style={${styleObjectToString(safeStyles)}}>${clean}</span>${after}`;
    });
  }

  // Strategy 3: tag + class combo
  if (!hasModifications && tagName && className) {
    const tag = tagName.toLowerCase();
    const firstClass = className.split(' ').filter(Boolean)[0];
    if (firstClass) {
      const tagClassRegex = new RegExp(
        `<${tag}([^>]*className=["'\`][^"'\`]*\\b${escapeRegex(firstClass)}\\b[^"'\`]*["'\`][^>]*)>`,
        'g'
      );
      modifiedContent = modifiedContent.replace(tagClassRegex, (match, attrs) => {
        hasModifications = true;
        if (/style=\{[^}]+\}/.test(attrs)) {
          return match.replace(/style=\{([^}]+)\}/, (_sm, ex) => {
            const merged = mergeStyleStrings(ex, safeStyles);
            return `style={${styleObjectToString(merged)}}`;
          });
        }
        return match.replace('>', ` style={${styleObjectToString(safeStyles)}}>`);
      });
    }
  }

  return modifiedContent;
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

function mergeStyleStrings(existing: string, add: Record<string, string>): Record<string, string> {
  const parsed = parseStyleString(existing);
  // Override with new values
  for (const [k, v] of Object.entries(add)) parsed[k] = v;
  return parsed;
}

function parseStyleString(styleStr: string): Record<string, string> {
  const out: Record<string, string> = {};
  if (!styleStr) return out;
  // Extract key: 'value' or key: "value"
  const regex = /([\w-]+)\s*:\s*['"]([^'"\\]*(?:\\.[^'"\\]*)*)['"]/g;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(styleStr)) !== null) {
    const key = m[1];
    const raw = m[2].replace(/\\(['"])/g, '$1');
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