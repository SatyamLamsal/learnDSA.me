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
  const { styles, tagName, className, textContent } = elementInfo;
  
  let modifiedContent = content;
  let hasModifications = false;

  // Strategy 1: Find by className and add/update style prop
  if (className) {
    const classNames = className.split(' ').filter(Boolean);
    
    for (const cls of classNames) {
      // Look for className usage and add style prop
      const classNameRegex = new RegExp(
        `className=['"\`]([^'"\`]*\\b${escapeRegex(cls)}\\b[^'"\`]*)['"\`](?!\\s*style=)`,
        'g'
      );
      
      modifiedContent = modifiedContent.replace(classNameRegex, (match) => {
        hasModifications = true;
        const styleString = generateStyleString(styles);
        return match + ` style={${styleString}}`;
      });

      // Update existing style props
      const existingStyleRegex = new RegExp(
        `className=['"\`]([^'"\`]*\\b${escapeRegex(cls)}\\b[^'"\`]*)['"\`]\\s*style=\\{([^}]+)\\}`,
        'g'
      );
      
      modifiedContent = modifiedContent.replace(existingStyleRegex, (match, classMatch, existingStyle) => {
        hasModifications = true;
        const mergedStyle = mergeStyles(existingStyle, styles);
        return `className="${classMatch.trim()}" style={${mergedStyle}}`;
      });
    }
  }

  // Strategy 2: Find by text content and wrap in styled element
  if (textContent && textContent.length > 5 && !hasModifications) {
    // Clean the text for searching
    const cleanText = textContent.trim().replace(/\s+/g, ' ');
    
    // Look for the exact text in JSX
    const textRegex = new RegExp(
      `(?<!<[^>]*>)\\b${escapeRegex(cleanText)}\\b(?![^<]*>)`,
      'g'
    );
    
    modifiedContent = modifiedContent.replace(textRegex, (match) => {
      hasModifications = true;
      const styleString = generateStyleString(styles);
      return `<span style={${styleString}}>${match}</span>`;
    });
  }

  // Strategy 3: Find by tag + class combination
  if (tagName && className && !hasModifications) {
    const tag = tagName.toLowerCase();
    const firstClass = className.split(' ')[0];
    
    if (firstClass) {
      const tagClassRegex = new RegExp(
        `<${tag}([^>]*className=['"\`][^'"\`]*\\b${escapeRegex(firstClass)}\\b[^'"\`]*['"\`][^>]*)>`,
        'g'
      );
      
      modifiedContent = modifiedContent.replace(tagClassRegex, (match, attributes) => {
        hasModifications = true;
        const styleString = generateStyleString(styles);
        
        if (attributes.includes('style=')) {
          // Update existing style
          return match.replace(/style=\{([^}]+)\}/, (styleMatch, existingStyle) => {
            const mergedStyle = mergeStyles(existingStyle, styles);
            return `style={${mergedStyle}}`;
          });
        } else {
          // Add new style
          return match.replace('>', ` style={${styleString}}>`);
        }
      });
    }
  }

  return modifiedContent;
}

function generateStyleString(styles: any): string {
  const validStyles = Object.entries(styles)
    .filter(([_, value]) => value && value !== 'inherit' && value !== 'transparent')
    .map(([key, value]) => `${key}: '${value}'`)
    .join(', ');
  
  return `{ ${validStyles} }`;
}

function mergeStyles(existingStyle: string, newStyles: any): string {
  // Parse existing styles (simple approach)
  const existing = existingStyle.trim();
  const newStyleString = generateStyleString(newStyles);
  
  if (existing === '{}') {
    return newStyleString;
  }
  
  // Simple merge - add new styles to existing
  const existingWithoutBraces = existing.slice(1, -1).trim();
  const newWithoutBraces = newStyleString.slice(1, -1).trim();
  
  if (existingWithoutBraces && newWithoutBraces) {
    return `{ ${existingWithoutBraces}, ${newWithoutBraces} }`;
  } else if (newWithoutBraces) {
    return newStyleString;
  } else {
    return existing;
  }
}

function escapeRegex(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}