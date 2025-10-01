import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
  }

  try {
    const { selector, styles } = await request.json();
    
    if (!selector || !styles) {
      return NextResponse.json({ error: 'Missing selector or styles' }, { status: 400 });
    }

    // Create design-mode directory if it doesn't exist
    const designDir = join(process.cwd(), 'src', 'design-mode', 'generated');
    try {
      await mkdir(designDir, { recursive: true });
    } catch (e) {
      // Directory might already exist
    }

    const cssFilePath = join(designDir, 'custom-styles.css');
    
    // Read existing CSS file or create new content
    let existingCSS = '';
    try {
      existingCSS = await readFile(cssFilePath, 'utf8');
    } catch (e) {
      // File doesn't exist yet
      existingCSS = '/* Auto-generated design mode styles - DO NOT EDIT MANUALLY */\n\n';
    }

    // Generate CSS rule
    const cssRule = `${selector} {\n${Object.entries(styles)
      .filter(([_, value]) => value && value !== 'inherit' && value !== 'transparent')
      .map(([property, value]) => `  ${property.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value} !important;`)
      .join('\n')}\n}\n\n`;

    // Check if this selector already exists and replace it, or append new rule
    const selectorRegex = new RegExp(`${selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\{[^}]*\\}\\s*`, 'g');
    
    if (selectorRegex.test(existingCSS)) {
      // Replace existing rule
      existingCSS = existingCSS.replace(selectorRegex, cssRule);
    } else {
      // Append new rule
      existingCSS += cssRule;
    }

    // Write the updated CSS file
    await writeFile(cssFilePath, existingCSS, 'utf8');
    
    console.log(`💾 Saved style for ${selector} to permanent storage`);

    return NextResponse.json({ 
      success: true, 
      message: 'Styles saved permanently',
      selector,
      cssRule: cssRule.trim()
    });

  } catch (error) {
    console.error('Error saving styles:', error);
    return NextResponse.json({ error: 'Failed to save styles' }, { status: 500 });
  }
}

export async function GET() {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
  }

  try {
    const cssFilePath = join(process.cwd(), 'src', 'design-mode', 'generated', 'custom-styles.css');
    
    try {
      const cssContent = await readFile(cssFilePath, 'utf8');
      return NextResponse.json({ 
        success: true, 
        css: cssContent 
      });
    } catch (e) {
      return NextResponse.json({ 
        success: true, 
        css: '/* No custom styles yet */' 
      });
    }

  } catch (error) {
    console.error('Error reading styles:', error);
    return NextResponse.json({ error: 'Failed to read styles' }, { status: 500 });
  }
}