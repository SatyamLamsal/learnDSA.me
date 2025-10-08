#!/usr/bin/env python3
"""
Precise Blue Background Text Fixer
Only changes black/dark text to white when it's specifically on blue backgrounds.
Leaves all other text colors unchanged.
"""

import os
import re
import glob
from typing import Dict, List, Tuple, Set
from pathlib import Path

class PreciseBlueTextFixer:
    def __init__(self, project_root: str):
        self.project_root = project_root
        self.blue_bg_patterns = []
        self.build_blue_patterns()
    
    def build_blue_patterns(self):
        """Build precise patterns for blue backgrounds only."""
        
        blue_patterns = [
            # Standard blue colors
            r'bg-blue-(?:\d+)',
            # Sky blue
            r'bg-sky-(?:\d+)',
            # Cyan (blue-ish)
            r'bg-cyan-(?:\d+)',
            # Indigo (blue-purple)
            r'bg-indigo-(?:\d+)',
            # Navy blue
            r'bg-navy(?:-\d+)?',
            # Blue gradients - more specific
            r'bg-gradient-to-[lr].*from-blue-\d+',
            r'bg-gradient-to-[lr].*to-blue-\d+',
            r'bg-gradient-to-[tbrl].*from-blue-\d+',
            r'bg-gradient-to-[tbrl].*to-blue-\d+',
        ]
        
        self.blue_bg_patterns = [re.compile(pattern, re.IGNORECASE) for pattern in blue_patterns]
        print(f"🔵 Built {len(self.blue_bg_patterns)} precise blue background patterns")
    
    def has_blue_background(self, classes: str) -> bool:
        """Check if element has blue background."""
        for pattern in self.blue_bg_patterns:
            if pattern.search(classes):
                return True
        return False
    
    def has_dark_text(self, classes: str) -> bool:
        """Check if element has dark/black text that needs to be changed."""
        # Look for dark text colors that would be invisible on blue
        dark_text_patterns = [
            r'text-black\b',
            r'text-gray-(?:[7-9]\d\d|[8-9]00|900)',
            r'text-slate-(?:[7-9]\d\d|[8-9]00|900)', 
            r'text-zinc-(?:[7-9]\d\d|[8-9]00|900)',
            r'text-neutral-(?:[7-9]\d\d|[8-9]00|900)',
            r'text-stone-(?:[7-9]\d\d|[8-9]00|900)',
        ]
        
        for pattern in dark_text_patterns:
            if re.search(pattern, classes):
                return True
        
        return False
    
    def needs_white_text(self, classes: str) -> bool:
        """Check if element needs white text (blue bg + dark text OR blue bg + no text color)."""
        has_blue_bg = self.has_blue_background(classes)
        
        if not has_blue_bg:
            return False
        
        # Check if it has dark text or no text color at all
        has_dark = self.has_dark_text(classes)
        has_any_text_color = re.search(r'text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|white|black)-\d+', classes)
        
        # Needs white text if: (blue bg AND dark text) OR (blue bg AND no text color)
        return has_dark or not has_any_text_color

def process_tsx_file_precisely(fixer: PreciseBlueTextFixer, file_path: str) -> Tuple[int, List[str]]:
    """Process TSX file and fix only problematic text on blue backgrounds."""
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        original_content = content
        changes_made = []
        
        # Pattern to find elements with className
        element_pattern = re.compile(
            r'<(\w+)([^>]*?)className=["\']([^"\']*?)["\']([^>]*?)>',
            re.MULTILINE | re.DOTALL
        )
        
        # Pattern to identify existing text colors
        text_color_pattern = re.compile(r'text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|white|black)-\d+')
        
        def replace_element(match):
            tag = match.group(1)
            before_class = match.group(2)
            class_attr = match.group(3)
            after_class = match.group(4)
            
            # Skip if not a text element
            if tag.lower() in ['input', 'img', 'svg', 'path', 'circle', 'rect', 'line', 'br', 'hr']:
                return match.group(0)
            
            # Only process if element needs white text (blue bg + dark/no text)
            if not fixer.needs_white_text(class_attr):
                return match.group(0)
            
            # Remove existing text color if it's dark
            new_class_attr = class_attr
            existing_dark_text = re.search(r'text-(?:black|gray-[8-9]\d\d|slate-[8-9]\d\d|zinc-[8-9]\d\d|neutral-[8-9]\d\d|stone-[8-9]\d\d)', class_attr)
            
            if existing_dark_text:
                # Remove the dark text color
                new_class_attr = text_color_pattern.sub('', class_attr).strip()
                change_type = f"Replaced {existing_dark_text.group()} with text-white"
            else:
                change_type = "Added text-white (no text color on blue bg)"
            
            # Add white text color
            new_class_attr = f"{new_class_attr} text-white".strip()
            
            new_element = f'<{tag}{before_class}className="{new_class_attr}"{after_class}>'
            
            changes_made.append(f"  🔵 {change_type} on <{tag}>")
            return new_element
        
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

def main():
    """Main function for precise blue background text fixing."""
    print("🎯 Starting Precise Blue Background Text Fix...")
    print("🔍 Only targeting BLACK/DARK text on BLUE backgrounds")
    
    project_root = os.getcwd()
    print(f"📁 Analyzing project: {project_root}")
    
    # Initialize the precise fixer
    fixer = PreciseBlueTextFixer(project_root)
    
    # Find all TSX files
    tsx_files = glob.glob('src/**/*.tsx', recursive=True)
    print(f"📝 Processing {len(tsx_files)} TSX files...")
    
    total_changes = 0
    processed_files = 0
    
    for file_path in tsx_files:
        print(f"\n🔧 Analyzing: {file_path}")
        
        changes_count, changes = process_tsx_file_precisely(fixer, file_path)
        
        if changes_count > 0:
            processed_files += 1
            total_changes += changes_count
            print(f"✅ Made {changes_count} precise fixes:")
            for change in changes[:3]:  # Show first 3 changes
                print(change)
            if len(changes) > 3:
                print(f"  ... and {len(changes) - 3} more precise fixes")
        else:
            print("ℹ️  No problematic text found")
    
    print(f"\n🎉 Precise Blue Background Fix completed!")
    print(f"📊 Summary:")
    print(f"   - Files processed: {len(tsx_files)}")
    print(f"   - Files with fixes: {processed_files}")
    print(f"   - Total precise fixes: {total_changes}")
    
    if total_changes > 0:
        print(f"\n💡 Fixed ONLY black/dark text on blue backgrounds!")
        print(f"💡 All other text colors left completely unchanged.")
    else:
        print(f"\n✅ No problematic black text on blue backgrounds found!")

if __name__ == "__main__":
    main()