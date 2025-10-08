#!/usr/bin/env python3
"""
Blue Background Text Color Analyzer
Specifically targets blue backgrounds and changes text to white,
while leaving other colors unchanged.
"""

import os
import re
import glob
from typing import Dict, List, Tuple, Set
from pathlib import Path

class BlueBackgroundAnalyzer:
    def __init__(self, project_root: str):
        self.project_root = project_root
        self.blue_bg_patterns = []
        self.css_blue_classes = set()
        self.build_blue_patterns()
        self.analyze_css_files()
    
    def build_blue_patterns(self):
        """Build patterns specifically for blue backgrounds and their shades."""
        
        # Blue background patterns (all shades of blue)
        blue_patterns = [
            # Standard blue colors - all shades (100-900)
            r'bg-blue-(?:1\d\d|[1-9]\d\d|[1-9]0|100|200|300|400|500|600|700|800|900)',
            # Navy blue (which is typically dark blue)
            r'bg-navy',
            r'bg-navy-\d+',
            # Sky blue
            r'bg-sky-(?:1\d\d|[1-9]\d\d|[1-9]0|100|200|300|400|500|600|700|800|900)',
            # Cyan (blue-ish)
            r'bg-cyan-(?:1\d\d|[1-9]\d\d|[1-9]0|100|200|300|400|500|600|700|800|900)',
            # Indigo (blue-purple)
            r'bg-indigo-(?:1\d\d|[1-9]\d\d|[1-9]0|100|200|300|400|500|600|700|800|900)',
            # Blue gradients
            r'bg-gradient-to-.*?blue',
            r'bg-gradient-to-.*?sky',
            r'bg-gradient-to-.*?cyan',
            r'bg-gradient-to-.*?indigo',
            r'bg-gradient-to-.*?navy',
            # From/to blue in gradients
            r'from-blue-\d+',
            r'to-blue-\d+',
            r'via-blue-\d+',
            r'from-sky-\d+',
            r'to-sky-\d+',
            r'via-sky-\d+',
            r'from-cyan-\d+',
            r'to-cyan-\d+',
            r'via-cyan-\d+',
            r'from-indigo-\d+',
            r'to-indigo-\d+',
            r'via-indigo-\d+',
        ]
        
        self.blue_bg_patterns = [re.compile(pattern, re.IGNORECASE) for pattern in blue_patterns]
        print(f"📘 Built {len(self.blue_bg_patterns)} blue background patterns")
    
    def analyze_css_files(self):
        """Analyze CSS files for blue background definitions."""
        css_files = glob.glob(f"{self.project_root}/**/*.css", recursive=True)
        
        for css_file in css_files:
            try:
                with open(css_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                # Extract CSS rules that contain blue colors
                css_rules = re.findall(r'\.([^{]+)\s*\{([^}]+)\}', content)
                
                for selector, rules in css_rules:
                    selector = selector.strip()
                    
                    # Look for background color definitions with blue
                    bg_match = re.search(r'background(?:-color)?:\s*([^;]+)', rules, re.IGNORECASE)
                    if bg_match:
                        bg_value = bg_match.group(1).strip().lower()
                        
                        # Check if background is blue-ish
                        if self.is_blue_color(bg_value):
                            self.css_blue_classes.add(selector)
                            print(f"  🔵 Found blue CSS class: .{selector} = {bg_value}")
                        
            except Exception as e:
                print(f"Warning: Could not parse CSS file {css_file}: {e}")
        
        print(f"📘 Found {len(self.css_blue_classes)} blue CSS classes")
    
    def is_blue_color(self, color_value: str) -> bool:
        """Check if a CSS color value represents blue or blue shades."""
        color_value = color_value.lower()
        
        # Named blue colors
        blue_names = [
            'blue', 'navy', 'darkblue', 'mediumblue', 'royalblue', 
            'steelblue', 'lightblue', 'skyblue', 'deepskyblue',
            'cornflowerblue', 'dodgerblue', 'lightsteelblue',
            'powderblue', 'cadetblue', 'cyan', 'darkcyan',
            'lightcyan', 'teal', 'darkteal', 'indigo'
        ]
        
        # Check named colors
        for blue_name in blue_names:
            if blue_name in color_value:
                return True
        
        # Check hex colors (rough blue detection - dominant blue channel)
        hex_match = re.search(r'#([0-9a-f]{3}|[0-9a-f]{6})', color_value)
        if hex_match:
            hex_value = hex_match.group(1)
            if len(hex_value) == 3:
                r, g, b = int(hex_value[0], 16), int(hex_value[1], 16), int(hex_value[2], 16)
            else:
                r, g, b = int(hex_value[0:2], 16), int(hex_value[2:4], 16), int(hex_value[4:6], 16)
            
            # Blue is dominant and significantly higher than red/green
            return b > r and b > g and b > 100
        
        # Check RGB/RGBA values
        rgb_match = re.search(r'rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)', color_value)
        if rgb_match:
            r, g, b = int(rgb_match.group(1)), int(rgb_match.group(2)), int(rgb_match.group(3))
            # Blue is dominant and significantly higher than red/green
            return b > r and b > g and b > 100
        
        return False
    
    def has_blue_background(self, classes: str) -> bool:
        """Check if element has blue background."""
        
        # Check Tailwind patterns
        for pattern in self.blue_bg_patterns:
            if pattern.search(classes):
                return True
        
        # Check custom CSS classes
        class_list = classes.split()
        for cls in class_list:
            if cls in self.css_blue_classes:
                return True
        
        return False
    
    def should_change_to_white(self, classes: str) -> bool:
        """Determine if text should be changed to white (only for blue backgrounds)."""
        return self.has_blue_background(classes)

def process_tsx_file_for_blue(analyzer: BlueBackgroundAnalyzer, file_path: str) -> Tuple[int, List[str]]:
    """Process TSX file and change text to white only for blue backgrounds."""
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
            
            # Only process if element has blue background
            if not analyzer.should_change_to_white(class_attr):
                return match.group(0)
            
            # Remove existing text color if present
            new_class_attr = text_color_pattern.sub('', class_attr).strip()
            
            # Add white text color
            new_class_attr = f"{new_class_attr} text-white".strip()
            
            new_element = f'<{tag}{before_class}className="{new_class_attr}"{after_class}>'
            
            changes_made.append(f"  🔵 Changed <{tag}> to white text (blue background detected)")
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
    """Main function for blue background text color analysis."""
    print("🔵 Starting Blue Background Text Color Analysis...")
    
    project_root = os.getcwd()
    print(f"📁 Analyzing project: {project_root}")
    
    # Initialize the blue background analyzer
    print("🔍 Analyzing CSS files and building blue background patterns...")
    analyzer = BlueBackgroundAnalyzer(project_root)
    
    # Find all TSX files
    tsx_files = glob.glob('src/**/*.tsx', recursive=True)
    print(f"📝 Processing {len(tsx_files)} TSX files for blue backgrounds...")
    
    total_changes = 0
    processed_files = 0
    
    for file_path in tsx_files:
        print(f"\n🔧 Analyzing: {file_path}")
        
        changes_count, changes = process_tsx_file_for_blue(analyzer, file_path)
        
        if changes_count > 0:
            processed_files += 1
            total_changes += changes_count
            print(f"✅ Made {changes_count} blue-specific changes:")
            for change in changes[:3]:  # Show first 3 changes
                print(change)
            if len(changes) > 3:
                print(f"  ... and {len(changes) - 3} more blue background changes")
        else:
            print("ℹ️  No blue backgrounds found or no changes needed")
    
    print(f"\n🎉 Blue Background Analysis completed!")
    print(f"📊 Summary:")
    print(f"   - Files processed: {len(tsx_files)}")
    print(f"   - Files with blue backgrounds modified: {processed_files}")
    print(f"   - Total blue background text changes: {total_changes}")
    print(f"   - Blue patterns detected: {len(analyzer.blue_bg_patterns)}")
    print(f"   - CSS blue classes found: {len(analyzer.css_blue_classes)}")
    
    if total_changes > 0:
        print(f"\n💡 Changed text color to WHITE for elements with BLUE backgrounds only!")
        print(f"💡 All other background colors remain unchanged.")

if __name__ == "__main__":
    main()