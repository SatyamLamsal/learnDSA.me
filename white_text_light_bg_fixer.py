#!/usr/bin/env python3
"""
White Text on Light Background Fixer
Changes white text to black only on white/light backgrounds, preserves all other colors
"""

import os
import re
from pathlib import Path

class WhiteTextLightBackgroundFixer:
    def __init__(self):
        self.root_dir = Path('.')
        self.fixes_made = 0
        self.files_processed = 0
        self.files_modified = 0
        
        # Light background patterns
        self.light_background_patterns = [
            # White backgrounds
            r'bg-white\b',
            r'bg-slate-50\b',
            r'bg-slate-100\b',
            r'bg-gray-50\b',
            r'bg-gray-100\b',
            
            # Light gradients
            r'bg-gradient.*from-white',
            r'bg-gradient.*to-white',
            r'from-slate-50\s+to-slate-100',
            r'from-gray-50\s+to-gray-100',
            r'from-white\s+to-gray-50',
            
            # Light transparency effects
            r'bg-white/[7-9]\d',  # bg-white/70, bg-white/80, bg-white/90
            r'bg-slate-50/\d+',
            r'bg-gray-50/\d+',
            
            # Light colored backgrounds
            r'bg-blue-50\b',
            r'bg-purple-50\b', 
            r'bg-green-50\b',
            r'bg-yellow-50\b',
            r'bg-pink-50\b',
            r'bg-indigo-50\b',
            r'bg-emerald-50\b',
            r'bg-teal-50\b',
            r'bg-orange-50\b',
            
            # Light gradient combinations
            r'from-.*-50\s+to-.*-100',
            r'bg-gradient.*50.*100',
        ]
        
        # Only target white text (not other colors)
        self.white_text_patterns = [
            r'text-white\b',
            r'text-slate-50\b',
            r'text-gray-50\b',
            r'text-slate-100\b',
            r'text-gray-100\b',
        ]
        
        # Don't change these colored texts (preserve intentional colors)
        self.preserve_colored_text = [
            r'text-blue-\d+\b',
            r'text-red-\d+\b',
            r'text-green-\d+\b',
            r'text-yellow-\d+\b',
            r'text-purple-\d+\b',
            r'text-pink-\d+\b',
            r'text-indigo-\d+\b',
            r'text-orange-\d+\b',
            r'text-teal-\d+\b',
            r'text-emerald-\d+\b',
            r'text-cyan-\d+\b',
            r'text-amber-\d+\b',
            r'text-lime-\d+\b',
            r'text-rose-\d+\b',
            r'text-sky-\d+\b',
            r'text-violet-\d+\b',
            r'text-fuchsia-\d+\b',
        ]

    def has_light_background_context(self, content: str, element_start: int, element_end: int) -> bool:
        """Check if element has light background through various methods"""
        
        # Extract element content
        element = content[element_start:element_end]
        
        # Check for direct light background in element
        for pattern in self.light_background_patterns:
            if re.search(pattern, element, re.IGNORECASE):
                return True
        
        # Check parent containers (look backwards for opening tags)
        context_start = max(0, element_start - 2000)
        context = content[context_start:element_end]
        
        # Look for parent divs/sections with light backgrounds
        parent_patterns = [
            r'<(?:div|section|main|header)[^>]*(?:' + '|'.join([
                r'bg-white',
                r'bg-slate-50',
                r'bg-gray-50',
                r'bg-slate-100',
                r'bg-gray-100',
                r'from-white',
                r'to-white',
                r'bg-.*-50',
            ]) + r')[^>]*>',
            
            # Check for CSS-in-JS or style attributes with light colors
            r'style=.*background.*white',
            r'style=.*background-color.*white',
            r'style=.*backgroundColor.*white',
        ]
        
        for pattern in parent_patterns:
            if re.search(pattern, context, re.IGNORECASE):
                return True
                
        return False

    def has_white_text_only(self, element: str) -> bool:
        """Check if element has white text (not other colors)"""
        
        # First check if it has any colored text (preserve these)
        for pattern in self.preserve_colored_text:
            if re.search(pattern, element):
                return False  # Don't change colored text
        
        # Check if it has white text
        for pattern in self.white_text_patterns:
            if re.search(pattern, element):
                return True
        
        # Check for inline white color styles
        if re.search(r'style=.*color:\s*[\'"]?#fff(fff)?[\'"]?', element, re.IGNORECASE):
            return True
        if re.search(r'style=.*color:\s*[\'"]?white[\'"]?', element, re.IGNORECASE):
            return True
            
        return False

    def fix_white_text_to_black(self, element: str, tag_name: str) -> str:
        """Convert white text to black for better readability"""
        
        fixed_element = element
        
        # Replace white text classes with black
        for pattern in self.white_text_patterns:
            if pattern == r'text-white\b':
                fixed_element = re.sub(pattern, 'text-black', fixed_element)
            elif pattern == r'text-slate-50\b':
                fixed_element = re.sub(pattern, 'text-slate-900', fixed_element)
            elif pattern == r'text-gray-50\b':
                fixed_element = re.sub(pattern, 'text-gray-900', fixed_element)
            elif pattern == r'text-slate-100\b':
                fixed_element = re.sub(pattern, 'text-slate-800', fixed_element)
            elif pattern == r'text-gray-100\b':
                fixed_element = re.sub(pattern, 'text-gray-800', fixed_element)
        
        # Handle white inline styles
        fixed_element = re.sub(
            r'style=([\'"])([^\'">]*color:\s*)#fff(fff)?([^\'">]*)\1',
            r'style=\1\2#000000\4\1',
            fixed_element,
            flags=re.IGNORECASE
        )
        fixed_element = re.sub(
            r'style=([\'"])([^\'">]*color:\s*)white([^\'">]*)\1',
            r'style=\1\2black\3\1',
            fixed_element,
            flags=re.IGNORECASE
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
                
            # Check if has light background context
            has_light_bg = self.has_light_background_context(content, start, end)
            
            if not has_light_bg:
                continue
            
            # Check if element has white text (not other colors)
            has_white_text = self.has_white_text_only(element_content)
            
            if not has_white_text:
                continue
            
            # Fix the element
            fixed_element = self.fix_white_text_to_black(element_content, tag_name)
            
            if fixed_element != element_content:
                content = content[:start] + fixed_element + content[end:]
                fixes += 1
                print(f"  ⚫ Fixed <{tag_name}> white text to black (light background detected)")
        
        # Save changes if any fixes were made
        if content != original_content:
            try:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"✅ Made {fixes} white-to-black fixes:")
            except Exception as e:
                print(f"❌ Error writing {file_path}: {e}")
                return 0
        else:
            print("ℹ️  No white text on light backgrounds found")
        
        return fixes

    def analyze_workspace(self):
        """Analyze entire workspace for white text on light backgrounds"""
        
        print("🔍 White Text on Light Background Fixer")
        print("=" * 60)
        print("🎯 Targeting:")
        print("   • White text on white/light backgrounds → black")
        print("   • Preserving all colored text (blue, red, green, etc.)")
        print("   • Only changing text-white, text-gray-50/100, text-slate-50/100")
        print("   • Detecting light backgrounds: bg-white, bg-*-50, bg-*-100")
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
        print("🎉 White Text Analysis Complete!")
        print("=" * 60)
        print(f"📊 Final Summary:")
        print(f"   - Files processed: {self.files_processed}")
        print(f"   - Files with fixes: {self.files_modified}")
        print(f"   - Total white-to-black fixes: {self.fixes_made}")
        print()
        print("💡 Fixed white text on:")
        print("   ✓ White backgrounds (bg-white)")
        print("   ✓ Light gray backgrounds (bg-gray-50, bg-slate-50)")
        print("   ✓ Light colored backgrounds (bg-*-50)")
        print("   ✓ Light gradients and transparency effects")
        print()
        print("🎨 Preserved all colored text:")
        print("   ✓ Blue, red, green, yellow text unchanged")
        print("   ✓ Purple, pink, orange text unchanged")
        print("   ✓ All intentional color choices preserved")

if __name__ == "__main__":
    fixer = WhiteTextLightBackgroundFixer()
    fixer.analyze_workspace()