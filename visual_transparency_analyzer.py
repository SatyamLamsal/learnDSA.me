#!/usr/bin/env python3
"""
Visual Transparency & Blue Background Analyzer
Detects transparency effects, gradients, and backdrop filters that create blue-tinted backgrounds
with problematic text colors.
"""

import os
import re
import json
from pathlib import Path
from typing import Dict, List, Set, Tuple, Optional

class VisualTransparencyAnalyzer:
    def __init__(self):
        self.root_dir = Path('.')
        self.fixes_made = 0
        self.files_processed = 0
        self.files_modified = 0
        
        # Enhanced blue background patterns
        self.blue_patterns = {
            # Gradient patterns with blue
            'blue_gradients': [
                r'bg-gradient-to-\w+\s+from-blue-\d+', 
                r'bg-gradient-to-\w+\s+.*to-blue-\d+',
                r'from-slate-\d+\s+via-blue-\d+',
                r'from-blue-\d+\s+to-\w+-\d+',
                r'bg-gradient-to-br\s+from-indigo-\d+',
                r'bg-gradient-to-r\s+from-blue-\d+',
                r'from-slate-900\s+via-blue-900',
                r'from-blue-600\s+via-purple-600',
            ],
            
            # Transparency with blue tints
            'blue_transparency': [
                r'bg-blue-\d+/\d+',  # bg-blue-600/20
                r'bg-white/\d+.*backdrop-blur',
                r'backdrop-blur.*bg-.*blue',
                r'bg-gradient.*blue.*backdrop-blur',
                r'from-blue-50\s+via-blue-50',
                r'from-slate-50\s+via-blue-50',
            ],
            
            # Blue background classes
            'solid_blue': [
                r'bg-blue-[1-9]\d*\b',
                r'bg-indigo-[1-9]\d*\b', 
                r'bg-navy-\d+',
                r'bg-slate-[8-9]\d*\b',  # Dark slate often appears blue
            ],
            
            # Complex blue effects
            'complex_blue': [
                r'bg-gradient.*blue.*mix-blend',
                r'filter\s+blur.*bg.*blue',
                r'bg-.*blue.*opacity-\d+',
                r'text-transparent\s+bg-clip-text\s+bg-gradient.*blue',
            ]
        }
        
        # Text patterns that should be white on blue backgrounds
        self.problematic_text_patterns = [
            r'text-gray-[1-7]\d*\b',
            r'text-slate-[1-7]\d*\b', 
            r'text-black\b',
            r'text-gray-900\b',
            r'text-slate-900\b',
            r'text-slate-800\b',
            r'text-slate-700\b',
        ]
        
        # Safe text colors (don't change these)
        self.safe_text_patterns = [
            r'text-white\b',
            r'text-gray-100\b',
            r'text-blue-100\b',
            r'text-transparent\b',
            r'text-red-\d+\b',
            r'text-green-\d+\b',
            r'text-yellow-\d+\b',
            r'text-orange-\d+\b',
            r'text-pink-\d+\b',
            r'text-purple-\d+\b',
            r'text-emerald-\d+\b',
            r'text-cyan-\d+\b',
            r'text-teal-\d+\b',
        ]

    def has_blue_background_context(self, content: str, element_start: int, element_end: int) -> bool:
        """Check if element has blue background through various methods"""
        
        # Extract element content
        element = content[element_start:element_end]
        
        # Check for direct blue background in element
        for pattern_group in self.blue_patterns.values():
            for pattern in pattern_group:
                if re.search(pattern, element, re.IGNORECASE):
                    return True
        
        # Check parent containers (look backwards for opening tags)
        context_start = max(0, element_start - 2000)
        context = content[context_start:element_end]
        
        # Look for parent divs/sections with blue backgrounds
        parent_patterns = [
            r'<(?:div|section|main|header)[^>]*(?:' + '|'.join([
                r'bg-gradient.*blue',
                r'from-.*blue.*to-',
                r'bg-blue-\d+',
                r'bg-indigo-\d+',
                r'from-slate-\d+\s+via-blue-\d+',
                r'backdrop-blur.*bg-.*blue',
                r'bg-white/\d+.*blue',
            ]) + r')[^>]*>',
            
            # Check for CSS-in-JS or style attributes
            r'style=.*background.*blue',
            r'style=.*background-color.*blue',
            r'className=.*blue.*gradient',
        ]
        
        for pattern in parent_patterns:
            if re.search(pattern, context, re.IGNORECASE):
                return True
        
        # Check for complex blue contexts
        blue_context_indicators = [
            r'bg-gradient-to-br\s+from-slate-50\s+via-blue-50',
            r'bg-gradient-to-br\s+from-indigo-50\s+via-purple-50',
            r'absolute\s+inset-0.*bg.*blue',
            r'mix-blend-multiply.*blue',
            r'filter\s+blur.*blue',
        ]
        
        for pattern in blue_context_indicators:
            if re.search(pattern, context, re.IGNORECASE):
                return True
                
        return False

    def has_transparency_effects(self, content: str, element_start: int, element_end: int) -> bool:
        """Check for transparency/backdrop effects that might create blue tints"""
        
        element = content[element_start:element_end]
        context_start = max(0, element_start - 1500)
        context = content[context_start:element_end]
        
        transparency_patterns = [
            r'backdrop-blur',
            r'bg-white/[1-9]\d*',
            r'bg-\w+/[1-9]\d*',
            r'mix-blend-\w+',
            r'filter\s+blur',
            r'opacity-[1-9]\d*',
            r'bg-gradient.*backdrop-blur',
        ]
        
        for pattern in transparency_patterns:
            if re.search(pattern, context, re.IGNORECASE):
                return True
        
        return False

    def has_conflicting_styles(self, element: str) -> bool:
        """Check for conflicting inline styles vs Tailwind classes"""
        
        # Check for inline style with white color but dark Tailwind class
        has_white_inline = re.search(r'style=.*color:\s*[\'"]?#ffffff[\'"]?', element, re.IGNORECASE)
        has_dark_class = False
        
        for pattern in self.problematic_text_patterns:
            if re.search(pattern, element):
                has_dark_class = True
                break
        
        return has_white_inline and has_dark_class

    def is_safe_text_color(self, text: str) -> bool:
        """Check if text already has safe color that shouldn't be changed"""
        for pattern in self.safe_text_patterns:
            if re.search(pattern, text):
                return True
        return False

    def fix_text_color_in_element(self, element: str, tag_name: str) -> str:
        """Fix text color in specific element"""
        
        if self.is_safe_text_color(element):
            return element
        
        # Remove problematic dark text colors and add white
        fixed_element = element
        
        for pattern in self.problematic_text_patterns:
            fixed_element = re.sub(pattern, 'text-white', fixed_element)
        
        # Handle conflicting inline styles
        if 'style=' in fixed_element and 'color:' in fixed_element:
            # Remove conflicting color styles, let text-white handle it
            fixed_element = re.sub(r'style=[\'"][^\'">]*color:\s*#[0-9a-fA-F]{3,6}[^\'">]*[\'"]', '', fixed_element)
            fixed_element = re.sub(r'style=[\'"][^\'">]*color:\s*\w+[^\'">]*[\'"]', '', fixed_element)
            
        # If no text color class exists, add text-white
        if not re.search(r'text-\w+-\d+', fixed_element) and not re.search(r'text-white', fixed_element):
            # Add text-white to className
            if 'className=' in fixed_element:
                fixed_element = re.sub(
                    r'className="([^"]*)"',
                    r'className="\1 text-white"',
                    fixed_element
                )
            elif 'class=' in fixed_element:
                fixed_element = re.sub(
                    r'class="([^"]*)"',
                    r'class="\1 text-white"',
                    fixed_element
                )
        
        return fixed_element

    def analyze_file(self, file_path: Path) -> int:
        """Analyze and fix a single file"""
        
        if not file_path.suffix in ['.tsx', '.jsx', '.ts', '.js']:
            return 0
            
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
        except Exception as e:
            print(f"❌ Error reading {file_path}: {e}")
            return 0
        
        original_content = content
        fixes = 0
        
        # Find all JSX elements with text
        element_pattern = r'<(\w+)(?:\s+[^>]*)?>(.*?)</\1>'
        elements = list(re.finditer(element_pattern, content, re.DOTALL))
        
        for match in reversed(elements):  # Process in reverse to maintain positions
            start, end = match.span()
            tag_name = match.group(1)
            element_content = match.group(0)
            
            # Skip if element is too large (likely contains other elements)
            if len(element_content) > 1000:
                continue
                
            # Check if has blue background or transparency context
            has_blue_bg = self.has_blue_background_context(content, start, end)
            has_transparency = self.has_transparency_effects(content, start, end)
            has_conflicts = self.has_conflicting_styles(element_content)
            
            if not (has_blue_bg or has_transparency or has_conflicts):
                continue
            
            # Check if element has problematic text color
            has_problematic_text = False
            for pattern in self.problematic_text_patterns:
                if re.search(pattern, element_content):
                    has_problematic_text = True
                    break
            
            if not has_problematic_text and not has_conflicts:
                continue
            
            # Fix the element
            fixed_element = self.fix_text_color_in_element(element_content, tag_name)
            
            if fixed_element != element_content:
                content = content[:start] + fixed_element + content[end:]
                fixes += 1
                print(f"  🔵 Fixed <{tag_name}> text color (detected: {'blue background' if has_blue_bg else 'transparency effects' if has_transparency else 'style conflicts'})")
        
        # Save changes if any fixes were made
        if content != original_content:
            try:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"✅ Made {fixes} visual fixes:")
            except Exception as e:
                print(f"❌ Error writing {file_path}: {e}")
                return 0
        else:
            print("ℹ️  No issues detected")
        
        return fixes

    def analyze_workspace(self):
        """Analyze entire workspace for visual transparency issues"""
        
        print("🔍 Visual Transparency & Blue Background Analyzer")
        print("=" * 60)
        print("🎯 Detecting:")
        print("   • Blue gradients with dark text")
        print("   • Transparency/backdrop effects creating blue tints")
        print("   • Conflicting inline styles vs Tailwind classes")
        print("   • Complex visual hierarchy issues")
        print()
        
        # Find all relevant files
        for file_path in self.root_dir.rglob('*.tsx'):
            if any(skip in str(file_path) for skip in ['node_modules', '.git', 'build', 'dist']):
                continue
                
            self.files_processed += 1
            print(f"🔧 Analyzing: {file_path}")
            
            fixes = self.analyze_file(file_path)
            self.fixes_made += fixes
            
            if fixes > 0:
                self.files_modified += 1
        
        # Final summary
        print("\n" + "=" * 60)
        print("🎉 Visual Analysis Complete!")
        print("=" * 60)
        print(f"📊 Final Summary:")
        print(f"   - Files processed: {self.files_processed}")
        print(f"   - Files with fixes: {self.files_modified}")
        print(f"   - Total visual fixes: {self.fixes_made}")
        print()
        print("💡 Enhanced detection for:")
        print("   ✓ Blue gradient backgrounds with transparency")
        print("   ✓ Backdrop blur effects creating blue tints")
        print("   ✓ Conflicting inline styles and Tailwind classes")
        print("   ✓ Complex visual hierarchy with mixed backgrounds")
        print("   ✓ Dark text on blue-tinted transparent backgrounds")

if __name__ == "__main__":
    analyzer = VisualTransparencyAnalyzer()
    analyzer.analyze_workspace()