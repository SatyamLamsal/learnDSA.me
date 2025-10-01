import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile, readdir } from 'fs/promises';
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

    // Find and modify the appropriate .tsx files
    const result = await hardcodeStylesIntoFiles(elementInfo);
    
    return NextResponse.json(result);

  } catch (error) {
    console.error('Error hardcoding styles:', error);
    return NextResponse.json({ error: 'Failed to hardcode styles' }, { status: 500 });
  }
}

async function hardcodeStylesIntoFiles(elementInfo: any) {
  const srcDir = join(process.cwd(), 'src');
  const searchDirs = [
    join(srcDir, 'app'),
    join(srcDir, 'components'),
  ];

  let modifiedFiles = [];

  for (const dir of searchDirs) {
    try {
      const files = await findTsxFiles(dir);
      
      for (const filePath of files) {
        const modified = await modifyFileIfContainsElement(filePath, elementInfo);
        if (modified) {
          modifiedFiles.push(filePath);
        }
      }
    } catch (error) {
      console.warn(`Could not search directory ${dir}:`, error);
    }
  }

  if (modifiedFiles.length > 0) {
    return {
      success: true,
      message: `Hardcoded styles into ${modifiedFiles.length} file(s)`,
      filePaths: modifiedFiles
    };
  } else {
    return {
      success: false,
      error: 'Could not find matching elements in .tsx files'
    };
  }
}

async function findTsxFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      
      if (entry.isDirectory()) {
        // Recursively search subdirectories
        const subFiles = await findTsxFiles(fullPath);
        files.push(...subFiles);
      } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    // Directory might not exist or be inaccessible
  }
  
  return files;
}

async function modifyFileIfContainsElement(filePath: string, elementInfo: any): Promise<boolean> {
  try {
    const content = await readFile(filePath, 'utf8');
    
    // Look for potential matches based on element characteristics
    const searchTerms = [
      elementInfo.textContent,
      elementInfo.className,
      elementInfo.id
    ].filter(Boolean);

    let hasMatch = false;
    for (const term of searchTerms) {
      if (content.includes(term)) {
        hasMatch = true;
        break;
      }
    }

    if (!hasMatch) {
      return false;
    }

    // Generate inline style string
    const styleString = generateInlineStyle(elementInfo.styles);
    
    // Try to modify the file content
    let modifiedContent = content;
    let wasModified = false;

    // Strategy 1: Find className matches and add/update style prop
    if (elementInfo.className) {
      const classNames = elementInfo.className.split(' ').filter(Boolean);
      
      for (const className of classNames) {
        // Look for elements with this className
        const classNameRegex = new RegExp(`className=["'\`]([^"'\`]*\\b${className}\\b[^"'\`]*)["'\`](?!\\s*style=)`, 'g');
        
        modifiedContent = modifiedContent.replace(classNameRegex, (match) => {
          wasModified = true;
          return match + ` style={${styleString}}`;
        });

        // Update existing style props
        const existingStyleRegex = new RegExp(`className=["'\`]([^"'\`]*\\b${className}\\b[^"'\`]*)["'\`]\\s*style=\\{([^}]+)\\}`, 'g');
        
        modifiedContent = modifiedContent.replace(existingStyleRegex, (match, classMatch, existingStyle) => {
          wasModified = true;
          // Merge with existing styles
          const mergedStyle = mergeStyles(existingStyle, styleString);
          return `className="${classMatch.trim()}" style={${mergedStyle}}`;
        });
      }
    }

    // Strategy 2: Find text content matches and wrap with styled span
    if (elementInfo.textContent && elementInfo.textContent.length > 5) {
      const textRegex = new RegExp(`(?<!<[^>]*>)\\b${escapeRegex(elementInfo.textContent.trim())}\\b(?![^<]*>)`, 'g');
      
      modifiedContent = modifiedContent.replace(textRegex, (match) => {
        wasModified = true;
        return `<span style={${styleString}}>${match}</span>`;
      });
    }

    if (wasModified) {
      await writeFile(filePath, modifiedContent, 'utf8');
      console.log(`✅ Modified file: ${filePath}`);
      return true;
    }

    return false;

  } catch (error) {
    console.warn(`Could not modify file ${filePath}:`, error);
    return false;
  }
}

function generateInlineStyle(styles: any): string {
  const styleEntries = Object.entries(styles)
    .filter(([_, value]) => value && value !== 'inherit' && value !== 'transparent')
    .map(([key, value]) => `${key}: '${value}'`)
    .join(', ');
  
  return `{ ${styleEntries} }`;
}

function mergeStyles(existingStyle: string, newStyleString: string): string {
  // Simple merge - this could be enhanced
  const newStyleObj = newStyleString.replace(/[{}]/g, '').trim();
  const existing = existingStyle.trim();
  
  if (existing === '{}') {
    return newStyleString;
  }
  
  // Remove closing brace, add comma, add new styles
  const merged = existing.slice(0, -1) + ', ' + newStyleObj + '}';
  return merged;
}

function escapeRegex(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}