#!/usr/bin/env python3
"""
Smart Text Color Assignment Script
Analyzes the entire project structure including CSS files, Tailwind config, 
parent elements, and global styles to intelligently assign text colors.
"""

import os
import re
import json
import glob
from typing import Dict, List, Tuple, Set
from pathlib import Path

class SmartColorAnalyzer:
    def __init__(self, project_root: str):
        self.project_root = project_root
        self.global_styles = {}
        self.tailwind_config = {}
        self.dark_bg_classes = set()
        self.light_bg_classes = set()
        self.colored_bg_patterns = []
        self.component_backgrounds = {}
        
        # Load all style information
        self.load_global_styles()
        self.load_tailwind_config()
        self.analyze_component_backgrounds()
        self.build_color_database()
    
    def load_global_styles(self):
        """Load global CSS files and extract background color definitions."""
        css_files = glob.glob(f"{self.project_root}/**/*.css", recursive=True)
        
        for css_file in css_files:
            try:
                with open(css_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                # Extract CSS rules
                css_rules = re.findall(r'\.([^{]+)\s*\{([^}]+)\}', content)
                
                for selector, rules in css_rules:
                    selector = selector.strip()
                    
                    # Look for background color definitions
                    bg_match = re.search(r'background(?:-color)?:\s*([^;]+)', rules)
                    if bg_match:
                        bg_value = bg_match.group(1).strip()
                        self.analyze_css_background(selector, bg_value)
                        
            except Exception as e:
                print(f"Warning: Could not parse CSS file {css_file}: {e}")
    
    def load_tailwind_config(self):
        """Load Tailwind configuration to understand custom colors."""
        config_files = [
            f"{self.project_root}/tailwind.config.js",
            f"{self.project_root}/tailwind.config.ts"
        ]
        
        for config_file in config_files:
            if os.path.exists(config_file):
                try:
                    with open(config_file, 'r', encoding='utf-8') as f:
                        content = f.read()
                        # Basic parsing of common Tailwind config patterns
                        self.parse_tailwind_config(content)
                    break
                except Exception as e:
                    print(f"Warning: Could not parse Tailwind config: {e}")
    
    def analyze_component_backgrounds(self):
        """Analyze all TSX files to understand component background patterns."""
        tsx_files = glob.glob(f"{self.project_root}/src/**/*.tsx", recursive=True)
        
        for tsx_file in tsx_files:
            try:
                with open(tsx_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                    self.extract_component_patterns(tsx_file, content)
            except Exception as e:
                print(f"Warning: Could not analyze {tsx_file}: {e}")
    
    def build_color_database(self):
        """Build comprehensive database of dark/light/colored background classes."""
        
        # Standard Tailwind dark backgrounds
        dark_patterns = [
            # Dark grays and neutrals
            r'bg-(?:slate|gray|zinc|neutral|stone)-(?:[7-9]\d\d|[8-9]\d|[7-9]00)',
            # Dark colors
            r'bg-(?:red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:[7-9]\d\d|[8-9]\d|[7-9]00)',
            # Black and very dark
            r'bg-black',
            # Dark gradients
            r'bg-gradient-to-.*?(?:slate|gray|zinc|neutral|stone)-(?:[7-9]\d\d|[8-9]\d|[7-9]00)',
            r'bg-gradient-to-.*?(?:red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:[7-9]\d\d|[8-9]\d|[7-9]00)',
        ]
        
        # Standard Tailwind light backgrounds (only very light colors)
        light_patterns = [
            # Very light grays and neutrals (100-200 range)
            r'bg-(?:slate|gray|zinc|neutral|stone)-(?:1\d\d|100|200)',
            # Very light colors (100-200 range)
            r'bg-(?:red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:1\d\d|100|200)',
            # White and transparent
            r'bg-white',
            r'bg-transparent',
            # Very light gradients
            r'bg-gradient-to-.*?(?:slate|gray|zinc|neutral|stone)-(?:1\d\d|100|200)',
            r'bg-gradient-to-.*?(?:red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:1\d\d|100|200)',
        ]
        
        # All colored backgrounds (any color that's not white/transparent) - these should get white text
        colored_patterns = [
            # Medium to dark grays and neutrals (300-900)
            r'bg-(?:slate|gray|zinc|neutral|stone)-(?:[3-9]\d\d|[3-9]00)',
            # All colored backgrounds (100-900, but excluding very light ones handled above)
            r'bg-(?:red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:[3-9]\d\d|[3-9]00|[2-9]\d|300|400|500|600|700|800|900)',
            # Named colors that aren't white
            r'bg-black',
            r'bg-red-\d+',
            r'bg-blue-\d+',
            r'bg-green-\d+',
            r'bg-purple-\d+',
            r'bg-indigo-\d+',
            r'bg-pink-\d+',
            r'bg-yellow-\d+',
            r'bg-orange-\d+',
            r'bg-teal-\d+',
            r'bg-cyan-\d+',
            r'bg-emerald-\d+',
            r'bg-lime-\d+',
            r'bg-amber-\d+',
            r'bg-rose-\d+',
            r'bg-fuchsia-\d+',
            r'bg-violet-\d+',
            r'bg-sky-\d+',
            # Gradients with colors
            r'bg-gradient-to-.*?(?:red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)',
        ]
        
        self.dark_bg_patterns = [re.compile(pattern) for pattern in dark_patterns]
        self.light_bg_patterns = [re.compile(pattern) for pattern in light_patterns]
        self.colored_bg_patterns = [re.compile(pattern) for pattern in colored_patterns]
    
    def analyze_css_background(self, selector: str, bg_value: str):
        """Analyze CSS background value to determine if it's dark or light."""
        bg_value = bg_value.lower()
        
        # Common dark colors
        dark_colors = ['black', '#000', 'rgb(0,0,0)', 'rgba(0,0,0', 'hsl(0,0%,0%']
        light_colors = ['white', '#fff', '#ffffff', 'rgb(255,255,255)', 'rgba(255,255,255']
        
        if any(dark in bg_value for dark in dark_colors):
            self.dark_bg_classes.add(selector)
        elif any(light in bg_value for light in light_colors):
            self.light_bg_classes.add(selector)
    
    def parse_tailwind_config(self, content: str):
        """Basic parsing of Tailwind config for custom colors."""
        # This is a simplified parser - could be enhanced
        pass
    
    def extract_component_patterns(self, file_path: str, content: str):
        """Extract background patterns from component files."""
        # Find common background patterns in components
        bg_classes = re.findall(r'(?:className|class)=["\']([^"\']*bg-[^"\']*)["\']', content)
        
        for class_string in bg_classes:
            classes = class_string.split()
            bg_classes_only = [cls for cls in classes if cls.startswith('bg-')]
            
            if bg_classes_only:
                relative_path = os.path.relpath(file_path, self.project_root)
                self.component_backgrounds[relative_path] = bg_classes_only
    
    def analyze_element_context(self, file_path: str, element_classes: str, parent_context: str = "") -> str:
        """Analyze element context to determine appropriate text color."""
        
        # 1. Check element's own background
        element_bg_type = self.get_background_type(element_classes)
        if element_bg_type != 'neutral':
            return element_bg_type
        
        # 2. Check parent context if provided
        if parent_context:
            parent_bg_type = self.get_background_type(parent_context)
            if parent_bg_type != 'neutral':
                return parent_bg_type
        
        # 3. Check file-level patterns
        relative_path = os.path.relpath(file_path, self.project_root)
        if relative_path in self.component_backgrounds:
            for bg_class in self.component_backgrounds[relative_path]:
                bg_type = self.get_background_type(bg_class)
                if bg_type != 'neutral':
                    return bg_type
        
        # 4. Check global patterns based on file location
        return self.infer_from_file_location(file_path)
    
    def get_background_type(self, classes: str) -> str:
        """Determine background type from class string."""
        
        # First check for any colored backgrounds (should get white text)
        for pattern in self.colored_bg_patterns:
            if pattern.search(classes):
                return 'colored'
        
        # Check for dark patterns
        for pattern in self.dark_bg_patterns:
            if pattern.search(classes):
                return 'dark'
        
        # Check for light patterns
        for pattern in self.light_bg_patterns:
            if pattern.search(classes):
                return 'light'
        
        # Check custom CSS classes
        class_list = classes.split()
        for cls in class_list:
            if cls in self.dark_bg_classes:
                return 'dark'
            elif cls in self.light_bg_classes:
                return 'light'
        
        return 'neutral'
    
    def infer_from_file_location(self, file_path: str) -> str:
        """Infer likely background type from file location and name."""
        path_lower = file_path.lower()
        
        # Dark themes likely in these locations
        if any(keyword in path_lower for keyword in ['dark', 'night', 'black']):
            return 'dark'
        
        # Light themes likely default
        return 'light'
    
    def get_appropriate_text_color(self, tag: str, bg_type: str, classes: str) -> str:
        """Get appropriate text color based on tag, background type, and existing classes."""
        
        # Color mappings for light backgrounds (white/very light)
        light_colors = {
            'h1': 'text-slate-800',
            'h2': 'text-slate-700',
            'h3': 'text-slate-600',
            'h4': 'text-slate-600',
            'p': 'text-gray-700',
            'span': 'text-gray-600',
            'div': 'text-gray-700',
            'li': 'text-gray-700',
            'a': 'text-blue-600',
            'button': 'text-gray-800',
            'strong': 'text-gray-800',
            'em': 'text-gray-600',
            'small': 'text-gray-500'
        }
        
        # Color mappings for dark backgrounds
        dark_colors = {
            'h1': 'text-white',
            'h2': 'text-gray-100',
            'h3': 'text-gray-200',
            'h4': 'text-gray-200',
            'p': 'text-gray-100',
            'span': 'text-gray-200',
            'div': 'text-gray-100',
            'li': 'text-gray-100',
            'a': 'text-blue-300',
            'button': 'text-white',
            'strong': 'text-white',
            'em': 'text-gray-200',
            'small': 'text-gray-300'
        }
        
        # Color mappings for colored backgrounds (blue, red, green, etc.) - all get white text
        colored_colors = {
            'h1': 'text-white',
            'h2': 'text-white',
            'h3': 'text-white',
            'h4': 'text-white',
            'p': 'text-white',
            'span': 'text-white',
            'div': 'text-white',
            'li': 'text-white',
            'a': 'text-white',
            'button': 'text-white',
            'strong': 'text-white',
            'em': 'text-white',
            'small': 'text-gray-100'
        }
        
        # Choose appropriate color map
        if bg_type == 'colored':
            color_map = colored_colors
            default_color = 'text-white'
        elif bg_type == 'dark':
            color_map = dark_colors
            default_color = 'text-gray-100'
        else:  # light or neutral
            color_map = light_colors
            default_color = 'text-gray-700'
        
        base_color = color_map.get(tag.lower(), default_color)
        
        # Adjust based on existing classes
        if 'font-bold' in classes or 'font-semibold' in classes:
            if bg_type == 'colored':
                base_color = 'text-white'  # Always white for colored backgrounds
            elif bg_type == 'dark':
                base_color = 'text-white' if tag.lower() in ['h1', 'h2'] else 'text-gray-100'
            else:
                base_color = 'text-slate-800' if tag.lower() in ['h1', 'h2'] else 'text-gray-800'
        
        if 'text-sm' in classes or 'text-xs' in classes:
            if bg_type == 'colored':
                base_color = 'text-gray-100'  # Light white for small text on colored backgrounds
            elif bg_type == 'dark':
                base_color = 'text-gray-300'
            else:
                base_color = 'text-gray-600'
        
        return base_color

def process_file_intelligently(analyzer: SmartColorAnalyzer, file_path: str) -> Tuple[int, List[str]]:
    """Process a file with intelligent context analysis."""
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        original_content = content
        changes_made = []
        
        # Pattern to find elements and their context
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
            
            # Skip if already has text color
            if text_color_pattern.search(class_attr):
                return match.group(0)
            
            # Skip non-text elements
            if tag.lower() in ['input', 'img', 'svg', 'path', 'circle', 'rect', 'line', 'br', 'hr']:
                return match.group(0)
            
            # Analyze context intelligently
            bg_type = analyzer.analyze_element_context(file_path, class_attr)
            
            # Get appropriate text color
            text_color = analyzer.get_appropriate_text_color(tag, bg_type, class_attr)
            
            # Add the color class
            new_class_attr = f"{class_attr} {text_color}".strip()
            new_element = f'<{tag}{before_class}className="{new_class_attr}"{after_class}>'
            
            # Better logging for colored backgrounds
            bg_description = "colored (white text)" if bg_type == 'colored' else bg_type
            changes_made.append(f"  - Added {text_color} to <{tag}> (bg: {bg_description})")
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
    """Main function with intelligent analysis."""
    print("🧠 Starting intelligent text color analysis...")
    
    project_root = os.getcwd()
    print(f"📁 Analyzing project: {project_root}")
    
    # Initialize the smart analyzer
    print("🔍 Analyzing global styles, CSS files, and component patterns...")
    analyzer = SmartColorAnalyzer(project_root)
    
    print(f"✅ Found {len(analyzer.dark_bg_classes)} dark background classes")
    print(f"✅ Found {len(analyzer.light_bg_classes)} light background classes") 
    print(f"✅ Built {len(analyzer.colored_bg_patterns)} colored background patterns")
    print(f"✅ Analyzed {len(analyzer.component_backgrounds)} component files")
    
    # Find all TSX files
    tsx_files = glob.glob('src/**/*.tsx', recursive=True)
    print(f"📝 Processing {len(tsx_files)} TSX files...")
    
    total_changes = 0
    processed_files = 0
    
    for file_path in tsx_files:
        print(f"\n🔧 Analyzing: {file_path}")
        
        changes_count, changes = process_file_intelligently(analyzer, file_path)
        
        if changes_count > 0:
            processed_files += 1
            total_changes += changes_count
            print(f"✅ Made {changes_count} intelligent changes:")
            for change in changes[:3]:  # Show first 3 changes
                print(change)
            if len(changes) > 3:
                print(f"  ... and {len(changes) - 3} more changes")
        else:
            print("ℹ️  No changes needed")
    
    print(f"\n🎉 Intelligent processing completed!")
    print(f"📊 Summary:")
    print(f"   - Files processed: {len(tsx_files)}")
    print(f"   - Files modified: {processed_files}")
    print(f"   - Total intelligent changes: {total_changes}")

if __name__ == "__main__":
    main()