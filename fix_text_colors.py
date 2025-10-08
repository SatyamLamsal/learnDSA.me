#!/usr/bin/env python3
"""
Script to automatically add color classes to text elements that don't have them.
Scans all TSX files in the project and adds appropriate Tailwind CSS text color classes.
Now with background color analysis to prevent text from disappearing.
"""

import os
import re
import glob
from typing import List, Tuple

# Dark background patterns that need white/light text
DARK_BG_PATTERNS = [
    r'bg-(?:slate|gray|zinc|neutral|stone)-(?:[5-9]\d\d|[8-9]\d|\d{3,})',  # dark grays
    r'bg-(?:red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:[5-9]\d\d|[7-9]\d|\d{3,})',  # dark colors
    r'bg-black',
    r'bg-gradient-to-.*?(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:[5-9]\d\d|[6-9]\d|\d{3,})',  # dark gradients
    r'bg-gradient-to-.*?black'
]

# Light background patterns that need dark text
LIGHT_BG_PATTERNS = [
    r'bg-(?:slate|gray|zinc|neutral|stone)-(?:[1-4]\d\d|[1-4]\d|[1-4])',  # light grays
    r'bg-(?:red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:[1-4]\d\d|[1-4]\d|[1-4])',  # light colors
    r'bg-white',
    r'bg-gradient-to-.*?(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:[1-4]\d\d|[1-4]\d|[1-4])',  # light gradients
    r'bg-gradient-to-.*?white'
]

# Standard color mapping based on element context and background
COLOR_MAPPINGS_LIGHT_BG = {
    'h1': 'text-slate-800',
    'h2': 'text-slate-700', 
    'h3': 'text-slate-600',
    'h4': 'text-slate-600',
    'h5': 'text-slate-600',
    'h6': 'text-slate-600',
    'p': 'text-gray-700',
    'span': 'text-gray-600',
    'div': 'text-gray-700',
    'li': 'text-gray-700',
    'label': 'text-gray-700',
    'button': 'text-gray-800',
    'a': 'text-blue-600',
    'strong': 'text-gray-800',
    'em': 'text-gray-600',
    'small': 'text-gray-500',
    'td': 'text-gray-700',
    'th': 'text-gray-800'
}

COLOR_MAPPINGS_DARK_BG = {
    'h1': 'text-white',
    'h2': 'text-gray-100', 
    'h3': 'text-gray-200',
    'h4': 'text-gray-200',
    'h5': 'text-gray-200',
    'h6': 'text-gray-200',
    'p': 'text-gray-100',
    'span': 'text-gray-200',
    'div': 'text-gray-100',
    'li': 'text-gray-100',
    'label': 'text-gray-100',
    'button': 'text-white',
    'a': 'text-blue-300',
    'strong': 'text-white',
    'em': 'text-gray-200',
    'small': 'text-gray-300',
    'td': 'text-gray-100',
    'th': 'text-white'
}

# Patterns to identify elements that already have text colors
EXISTING_COLOR_PATTERN = re.compile(r'text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|white|black)-\d+')

def analyze_background_color(class_attr: str) -> str:
    """Analyze the background color in class attribute and return 'dark', 'light', or 'neutral'."""
    # Check for dark backgrounds
    for pattern in DARK_BG_PATTERNS:
        if re.search(pattern, class_attr):
            return 'dark'
    
    # Check for light backgrounds
    for pattern in LIGHT_BG_PATTERNS:
        if re.search(pattern, class_attr):
            return 'light'
    
    # Default to neutral/light for unknown backgrounds
    return 'light'

def has_text_color(class_attr: str) -> bool:
    """Check if the class attribute already contains a text color class."""
    return bool(EXISTING_COLOR_PATTERN.search(class_attr))

def extract_element_tag(element: str) -> str:
    """Extract the HTML tag name from an element string."""
    tag_match = re.match(r'<(\w+)', element)
    return tag_match.group(1) if tag_match else 'div'

def process_tsx_file(file_path: str) -> Tuple[int, List[str]]:
    """Process a single TSX file and add missing text colors."""
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        original_content = content
        changes_made = []
        
        # Pattern to find HTML elements with className attributes
        element_pattern = re.compile(
            r'<(\w+)([^>]*?)className=["\']([^"\']*?)["\']([^>]*?)>',
            re.MULTILINE | re.DOTALL
        )
        
        def replace_element(match):
            tag = match.group(1)
            before_class = match.group(2)
            class_attr = match.group(3)
            after_class = match.group(4)
            
            # Skip if already has text color or is an input/img/svg type element
            if (has_text_color(class_attr) or 
                tag.lower() in ['input', 'img', 'svg', 'path', 'circle', 'rect', 'line']):
                return match.group(0)
            
            # Skip if it's a non-text element
            if tag.lower() in ['br', 'hr', 'meta', 'link', 'script']:
                return match.group(0)
            
            # Be more selective about when to add colors to elements with backgrounds
            has_background = bool(re.search(r'bg-(?!transparent)', class_attr))
            if has_background and tag.lower() not in ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div', 'button', 'a']:
                return match.group(0)
            
            # Analyze background color to determine appropriate text color
            bg_type = analyze_background_color(class_attr)
            
            # Choose appropriate color mapping based on background
            if bg_type == 'dark':
                color_mappings = COLOR_MAPPINGS_DARK_BG
                default_color = 'text-gray-100'
            else:
                color_mappings = COLOR_MAPPINGS_LIGHT_BG
                default_color = 'text-gray-700'
            
            # Determine appropriate color based on tag and context
            color_class = color_mappings.get(tag.lower(), default_color)
            
            # Special cases based on existing classes and background
            if 'font-bold' in class_attr or 'font-semibold' in class_attr:
                if bg_type == 'dark':
                    if tag.lower() in ['h1', 'h2']:
                        color_class = 'text-white'
                    elif tag.lower() in ['h3', 'h4']:
                        color_class = 'text-gray-100'
                    else:
                        color_class = 'text-gray-100'
                else:
                    if tag.lower() in ['h1', 'h2']:
                        color_class = 'text-slate-800'
                    elif tag.lower() in ['h3', 'h4']:
                        color_class = 'text-slate-700'
                    else:
                        color_class = 'text-gray-800'
            
            if 'text-sm' in class_attr or 'text-xs' in class_attr:
                color_class = 'text-gray-300' if bg_type == 'dark' else 'text-gray-600'
            
            if 'hover:' in class_attr and tag.lower() == 'a':
                color_class = 'text-blue-300' if bg_type == 'dark' else 'text-blue-600'
            
            # Clean up any duplicate text color classes that might exist
            existing_classes = class_attr.split()
            cleaned_classes = []
            
            for cls in existing_classes:
                # Skip if it's a text color class (we'll add the new one)
                if not EXISTING_COLOR_PATTERN.match(cls):
                    cleaned_classes.append(cls)
            
            # Add the new color class
            cleaned_classes.append(color_class)
            new_class_attr = ' '.join(cleaned_classes)
            new_element = f'<{tag}{before_class}className="{new_class_attr}"{after_class}>'
            
            changes_made.append(f"  - Added {color_class} to <{tag}> element")
            return new_element
        
        # Apply the replacements
        content = element_pattern.sub(replace_element, content)
        
        # Write back if changes were made
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as file:
                file.write(content)
            return len(changes_made), changes_made
        
        return 0, []
    
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return 0, []

def rollback_text_colors(file_path: str) -> int:
    """Remove text color classes that were automatically added."""
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        original_content = content
        
        # Pattern to find and clean up text color classes
        def clean_classes(match):
            before_class = match.group(2)
            class_attr = match.group(3)
            after_class = match.group(4)
            tag = match.group(1)
            
            # Remove text color classes
            classes = class_attr.split()
            cleaned_classes = []
            
            for cls in classes:
                if not EXISTING_COLOR_PATTERN.match(cls):
                    cleaned_classes.append(cls)
            
            if cleaned_classes:
                new_class_attr = ' '.join(cleaned_classes)
                return f'<{tag}{before_class}className="{new_class_attr}"{after_class}>'
            else:
                # If no classes left, remove className attribute
                return f'<{tag}{before_class}{after_class}>'
        
        element_pattern = re.compile(
            r'<(\w+)([^>]*?)className=["\']([^"\']*?)["\']([^>]*?)>',
            re.MULTILINE | re.DOTALL
        )
        
        content = element_pattern.sub(clean_classes, content)
        
        # Write back if changes were made
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as file:
                file.write(content)
            return 1
        
        return 0
    
    except Exception as e:
        print(f"Error rolling back {file_path}: {e}")
        return 0

def main():
    """Main function to process all TSX files in the project."""
    import sys
    
    # Check if rollback mode
    if len(sys.argv) > 1 and sys.argv[1] == '--rollback':
        print("🔄 Rolling back text color changes...")
        tsx_files = glob.glob('src/**/*.tsx', recursive=True)
        
        rollback_count = 0
        for file_path in tsx_files:
            rollback_count += rollback_text_colors(file_path)
        
        print(f"✅ Rolled back changes in {rollback_count} files")
        return
    
    print("🎨 Starting intelligent text color assignment process...")
    
    # Find all TSX files in the src directory
    tsx_files = glob.glob('src/**/*.tsx', recursive=True)
    
    if not tsx_files:
        print("❌ No TSX files found in src directory")
        return
    
    print(f"📁 Found {len(tsx_files)} TSX files to process")
    
    total_changes = 0
    processed_files = 0
    
    for file_path in tsx_files:
        print(f"\n📝 Processing: {file_path}")
        
        changes_count, changes = process_tsx_file(file_path)
        
        if changes_count > 0:
            processed_files += 1
            total_changes += changes_count
            print(f"✅ Made {changes_count} changes:")
            for change in changes[:5]:  # Show first 5 changes
                print(change)
            if len(changes) > 5:
                print(f"  ... and {len(changes) - 5} more changes")
        else:
            print("ℹ️  No changes needed")
    
    print(f"\n🎉 Process completed!")
    print(f"📊 Summary:")
    print(f"   - Files processed: {len(tsx_files)}")
    print(f"   - Files modified: {processed_files}")
    print(f"   - Total changes made: {total_changes}")
    
    if processed_files > 0:
        print(f"\n💡 Tip: Review the changes and run 'npm run build' to ensure everything compiles correctly.")

if __name__ == "__main__":
    main()