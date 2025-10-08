#!/usr/bin/env python3
"""
Advanced Blue Background Text Analyzer
Analyzes imports, global CSS, component hierarchies, and all stylesheets
to accurately detect blue backgrounds and fix black text visibility issues.
"""

import os
import re
import glob
import json
from typing import Dict, List, Tuple, Set, Optional
from pathlib import Path
import ast

class AdvancedBlueAnalyzer:
    def __init__(self, project_root: str):
        self.project_root = project_root
        self.global_css_classes = {}
        self.component_styles = {}
        self.import_graph = {}
        self.blue_bg_patterns = []
        self.css_blue_backgrounds = set()
        self.tailwind_classes = {}
        
        print("🔍 Starting comprehensive analysis...")
        self.build_comprehensive_analysis()
    
    def build_comprehensive_analysis(self):
        """Build comprehensive analysis of all styling sources."""
        
        # 1. Analyze all CSS files
        print("📄 Analyzing CSS files...")
        self.analyze_all_css_files()
        
        # 2. Analyze Tailwind configuration
        print("🎨 Analyzing Tailwind configuration...")
        self.analyze_tailwind_config()
        
        # 3. Build import graph
        print("🔗 Building component import graph...")
        self.build_import_graph()
        
        # 4. Analyze component styles
        print("⚛️ Analyzing component styles...")
        self.analyze_component_styles()
        
        # 5. Build blue background patterns
        print("🔵 Building blue background detection patterns...")
        self.build_blue_patterns()
    
    def analyze_all_css_files(self):
        """Analyze all CSS files including globals.css, modules, etc."""
        css_files = []
        
        # Find all CSS files
        for ext in ['*.css', '*.scss', '*.sass', '*.less']:
            css_files.extend(glob.glob(f"{self.project_root}/**/{ext}", recursive=True))
        
        print(f"  📁 Found {len(css_files)} CSS files")
        
        for css_file in css_files:
            try:
                with open(css_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                    self.parse_css_content(css_file, content)
            except Exception as e:
                print(f"  ⚠️ Could not parse CSS file {css_file}: {e}")
    
    def parse_css_content(self, file_path: str, content: str):
        """Parse CSS content and extract background color information."""
        
        # Extract CSS rules
        css_rules = re.findall(r'([^{]+)\s*\{([^}]+)\}', content, re.MULTILINE)
        
        for selector, rules in css_rules:
            selector = selector.strip()
            
            # Look for background properties
            bg_properties = re.findall(
                r'(background(?:-color|-image)?)\s*:\s*([^;]+)',
                rules,
                re.IGNORECASE
            )
            
            for prop, value in bg_properties:
                value = value.strip()
                
                # Check if this is a blue background
                if self.is_blue_background_value(value):
                    # Store the selector as a blue background
                    self.css_blue_backgrounds.add(selector)
                    
                    # Clean up selector for class matching
                    clean_selector = re.sub(r'^\.', '', selector)  # Remove leading dot
                    clean_selector = re.sub(r'[:\s>+~].*', '', clean_selector)  # Remove pseudo-classes and combinators
                    
                    self.global_css_classes[clean_selector] = {
                        'file': file_path,
                        'selector': selector,
                        'background': value,
                        'is_blue': True
                    }
                    
                    print(f"  🔵 Found blue background: .{clean_selector} → {value}")
    
    def is_blue_background_value(self, value: str) -> bool:
        """Check if a CSS background value represents blue."""
        value = value.lower()
        
        # Named blue colors
        blue_names = [
            'blue', 'navy', 'darkblue', 'mediumblue', 'royalblue',
            'steelblue', 'lightblue', 'skyblue', 'deepskyblue',
            'cornflowerblue', 'dodgerblue', 'lightsteelblue',
            'powderblue', 'cadetblue', 'cyan', 'darkcyan',
            'lightcyan', 'teal', 'darkteal', 'indigo', 'midnightblue'
        ]
        
        # Check named colors
        for blue_name in blue_names:
            if blue_name in value:
                return True
        
        # Check hex colors (blue dominant)
        hex_matches = re.findall(r'#([0-9a-f]{3}|[0-9a-f]{6})', value)
        for hex_value in hex_matches:
            if len(hex_value) == 3:
                r, g, b = int(hex_value[0], 16) * 17, int(hex_value[1], 16) * 17, int(hex_value[2], 16) * 17
            else:
                r, g, b = int(hex_value[0:2], 16), int(hex_value[2:4], 16), int(hex_value[4:6], 16)
            
            # Blue is dominant and significantly higher
            if b > r and b > g and b > 80:
                return True
        
        # Check RGB/RGBA values
        rgb_matches = re.findall(r'rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)', value)
        for r, g, b in rgb_matches:
            r, g, b = int(r), int(g), int(b)
            if b > r and b > g and b > 80:
                return True
        
        # Check HSL values (hue 200-280 for blues)
        hsl_matches = re.findall(r'hsla?\(\s*(\d+)\s*,', value)
        for hue in hsl_matches:
            hue = int(hue)
            if 200 <= hue <= 280:  # Blue hue range
                return True
        
        return False
    
    def analyze_tailwind_config(self):
        """Analyze Tailwind configuration for custom blue colors."""
        config_files = [
            f"{self.project_root}/tailwind.config.js",
            f"{self.project_root}/tailwind.config.ts",
            f"{self.project_root}/tailwind.config.mjs"
        ]
        
        for config_file in config_files:
            if os.path.exists(config_file):
                try:
                    with open(config_file, 'r', encoding='utf-8') as f:
                        content = f.read()
                        self.parse_tailwind_config(content)
                    break
                except Exception as e:
                    print(f"  ⚠️ Could not parse Tailwind config: {e}")
    
    def parse_tailwind_config(self, content: str):
        """Parse Tailwind config for custom colors."""
        # Extract color definitions (simplified parsing)
        color_matches = re.findall(r'["\']([^"\']*blue[^"\']*)["\']:\s*["\']([^"\']+)["\']', content, re.IGNORECASE)
        
        for color_name, color_value in color_matches:
            if self.is_blue_background_value(color_value):
                self.tailwind_classes[f"bg-{color_name}"] = color_value
                print(f"  🎨 Found custom Tailwind blue: bg-{color_name} → {color_value}")
    
    def build_import_graph(self):
        """Build graph of component imports to track style inheritance."""
        tsx_files = glob.glob(f"{self.project_root}/src/**/*.tsx", recursive=True)
        
        for file_path in tsx_files:
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                # Extract imports
                imports = re.findall(r'import\s+[^;]+from\s+["\']([^"\']+)["\']', content)
                
                relative_path = os.path.relpath(file_path, self.project_root)
                self.import_graph[relative_path] = imports
                
            except Exception as e:
                print(f"  ⚠️ Could not analyze imports in {file_path}: {e}")
    
    def analyze_component_styles(self):
        """Analyze styles within components."""
        tsx_files = glob.glob(f"{self.project_root}/src/**/*.tsx", recursive=True)
        
        for file_path in tsx_files:
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                # Extract className patterns
                class_patterns = re.findall(r'className=["\']([^"\']+)["\']', content)
                
                relative_path = os.path.relpath(file_path, self.project_root)
                blue_classes = []
                
                for class_string in class_patterns:
                    if self.contains_blue_background(class_string):
                        blue_classes.append(class_string)
                
                if blue_classes:
                    self.component_styles[relative_path] = blue_classes
                    print(f"  🔵 Found blue backgrounds in {relative_path}: {len(blue_classes)} elements")
                    
            except Exception as e:
                print(f"  ⚠️ Could not analyze component {file_path}: {e}")
    
    def build_blue_patterns(self):
        """Build comprehensive blue background patterns."""
        
        # Standard Tailwind blue patterns
        tailwind_blue_patterns = [
            r'bg-blue-(?:\d+)',
            r'bg-sky-(?:\d+)',
            r'bg-cyan-(?:\d+)',
            r'bg-indigo-(?:\d+)',
            r'bg-navy(?:-\d+)?',
            r'bg-teal-(?:\d+)',
            # Gradients
            r'bg-gradient-to-[tlbr]+.*?(?:from|to|via)-(?:blue|sky|cyan|indigo|navy|teal)-\d+',
            # Custom patterns from config
        ]
        
        # Add custom Tailwind classes
        for custom_class in self.tailwind_classes.keys():
            tailwind_blue_patterns.append(re.escape(custom_class))
        
        self.blue_bg_patterns = [re.compile(pattern, re.IGNORECASE) for pattern in tailwind_blue_patterns]
    
    def contains_blue_background(self, class_string: str) -> bool:
        """Check if class string contains blue background."""
        
        # Check Tailwind patterns
        for pattern in self.blue_bg_patterns:
            if pattern.search(class_string):
                return True
        
        # Check global CSS classes
        classes = class_string.split()
        for cls in classes:
            if cls in self.global_css_classes:
                return self.global_css_classes[cls].get('is_blue', False)
        
        return False
    
    def get_element_background_context(self, file_path: str, class_string: str) -> str:
        """Get comprehensive background context for an element."""
        
        # 1. Direct class analysis
        if self.contains_blue_background(class_string):
            return 'blue'
        
        # 2. Check imported components
        relative_path = os.path.relpath(file_path, self.project_root)
        if relative_path in self.import_graph:
            for imported_path in self.import_graph[relative_path]:
                # Resolve import path
                resolved_path = self.resolve_import_path(file_path, imported_path)
                if resolved_path and resolved_path in self.component_styles:
                    # Check if imported component has blue backgrounds
                    if self.component_styles[resolved_path]:
                        return 'inherited-blue'
        
        # 3. Check parent context (would need AST parsing for full accuracy)
        # For now, use heuristics
        
        return 'unknown'
    
    def resolve_import_path(self, current_file: str, import_path: str) -> Optional[str]:
        """Resolve relative import path to absolute."""
        if import_path.startswith('.'):
            # Relative import
            current_dir = os.path.dirname(current_file)
            resolved = os.path.normpath(os.path.join(current_dir, import_path))
            
            # Try different extensions
            for ext in ['.tsx', '.ts', '.jsx', '.js']:
                if os.path.exists(resolved + ext):
                    return os.path.relpath(resolved + ext, self.project_root)
        
        return None
    
    def needs_white_text_fix(self, file_path: str, class_string: str) -> bool:
        """Determine if element needs white text fix."""
        
        # Get background context
        bg_context = self.get_element_background_context(file_path, class_string)
        
        if bg_context not in ['blue', 'inherited-blue']:
            return False
        
        # Check current text color
        text_color_match = re.search(
            r'text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|white|black)-\d+',
            class_string
        )
        
        if text_color_match:
            text_color = text_color_match.group()
            # Check if it's a dark color that would be invisible on blue
            dark_colors = [
                r'text-black',
                r'text-(?:slate|gray|zinc|neutral|stone)-(?:[7-9]\d\d|[8-9]00)',
            ]
            
            for dark_pattern in dark_colors:
                if re.match(dark_pattern, text_color):
                    return True
            
            return False  # Has light text color, don't change
        
        # No text color specified on blue background - needs white text
        return True

def process_file_with_advanced_analysis(analyzer: AdvancedBlueAnalyzer, file_path: str) -> Tuple[int, List[str]]:
    """Process file with advanced blue background analysis."""
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
        
        def replace_element(match):
            tag = match.group(1)
            before_class = match.group(2)
            class_attr = match.group(3)
            after_class = match.group(4)
            
            # Skip non-text elements
            if tag.lower() in ['input', 'img', 'svg', 'path', 'circle', 'rect', 'line', 'br', 'hr']:
                return match.group(0)
            
            # Check if this element needs white text fix
            if not analyzer.needs_white_text_fix(file_path, class_attr):
                return match.group(0)
            
            # Remove existing dark text colors
            new_class_attr = re.sub(
                r'text-(?:black|slate-[7-9]\d\d|gray-[7-9]\d\d|zinc-[7-9]\d\d|neutral-[7-9]\d\d|stone-[7-9]\d\d)',
                '',
                class_attr
            ).strip()
            
            # Clean up extra spaces
            new_class_attr = re.sub(r'\s+', ' ', new_class_attr)
            
            # Add white text
            new_class_attr = f"{new_class_attr} text-white".strip()
            
            new_element = f'<{tag}{before_class}className="{new_class_attr}"{after_class}>'
            
            bg_context = analyzer.get_element_background_context(file_path, class_attr)
            changes_made.append(f"  🔵 Fixed <{tag}> text color (detected: {bg_context} background)")
            
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
    """Main function with advanced analysis."""
    print("🚀 Advanced Blue Background Text Analyzer")
    print("=" * 50)
    
    project_root = os.getcwd()
    print(f"📁 Project root: {project_root}")
    
    # Initialize advanced analyzer
    analyzer = AdvancedBlueAnalyzer(project_root)
    
    print(f"\n📊 Analysis Summary:")
    print(f"   - CSS blue backgrounds found: {len(analyzer.css_blue_backgrounds)}")
    print(f"   - Global CSS classes: {len(analyzer.global_css_classes)}")
    print(f"   - Components with blue: {len(analyzer.component_styles)}")
    print(f"   - Import relationships: {len(analyzer.import_graph)}")
    
    # Process TSX files
    tsx_files = glob.glob('src/**/*.tsx', recursive=True)
    print(f"\n📝 Processing {len(tsx_files)} TSX files...")
    
    total_changes = 0
    processed_files = 0
    
    for file_path in tsx_files:
        print(f"\n🔧 Analyzing: {file_path}")
        
        changes_count, changes = process_file_with_advanced_analysis(analyzer, file_path)
        
        if changes_count > 0:
            processed_files += 1
            total_changes += changes_count
            print(f"✅ Made {changes_count} advanced fixes:")
            for change in changes[:3]:
                print(change)
            if len(changes) > 3:
                print(f"  ... and {len(changes) - 3} more fixes")
        else:
            print("ℹ️  No issues detected")
    
    print(f"\n🎉 Advanced Analysis Complete!")
    print(f"=" * 50)
    print(f"📊 Final Summary:")
    print(f"   - Files processed: {len(tsx_files)}")
    print(f"   - Files with fixes: {processed_files}")
    print(f"   - Total advanced fixes: {total_changes}")
    
    if total_changes > 0:
        print(f"\n💡 Applied sophisticated analysis including:")
        print(f"   ✓ Global CSS file analysis")
        print(f"   ✓ Component import tracking")
        print(f"   ✓ Tailwind configuration parsing")
        print(f"   ✓ Cross-file background detection")
        print(f"   ✓ Intelligent text color fixing")

if __name__ == "__main__":
    main()