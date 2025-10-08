#!/usr/bin/env python3
"""
CSS-in-JS Solution Generator
Creates components with runtime styling that overrides Tailwind conflicts
"""

import os
import re
from pathlib import Path

def create_css_in_js_solution():
    """Generate CSS-in-JS solution files"""
    
    # Create a hook for dynamic styling
    hook_content = '''import { useMemo } from 'react';

export const useBlueBackgroundStyles = (hasBlueBackground: boolean = false) => {
  return useMemo(() => {
    if (!hasBlueBackground) return {};
    
    return {
      color: '#ffffff',
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
      // Force override of any Tailwind classes
      '& *': {
        color: '#ffffff !important',
      },
      // Specific overrides for common elements
      '& h1, & h2, & h3, & h4, & h5, & h6': {
        color: '#ffffff !important',
      },
      '& p, & span, & div': {
        color: '#ffffff !important',
      },
      '& a': {
        color: '#e0e7ff !important', // light blue for links
      },
    };
  }, [hasBlueBackground]);
};

// Hook to detect if parent has blue background
export const useDetectBlueBackground = (ref: React.RefObject<HTMLElement>) => {
  return useMemo(() => {
    if (!ref.current) return false;
    
    const element = ref.current;
    const computedStyle = window.getComputedStyle(element);
    const bgImage = computedStyle.backgroundImage;
    const bgColor = computedStyle.backgroundColor;
    
    // Check for blue gradients or backgrounds
    const hasBlueGradient = /blue|indigo|slate.*90[0-9]/.test(bgImage);
    const hasBlueBackground = /rgb\\(.*[0-9]{1,2}.*[0-9]{2,3}.*[0-9]{3}\\)/.test(bgColor);
    
    return hasBlueGradient || hasBlueBackground;
  }, [ref]);
};'''
    
    with open('src/hooks/useBlueBackgroundStyles.ts', 'w') as f:
        f.write(hook_content)
    
    # Create a utility for runtime style injection
    util_content = '''export const forceWhiteTextOnBlue = (element: HTMLElement) => {
  if (!element) return;
  
  // Check if element or parent has blue background
  const hasBlueBackground = checkForBlueBackground(element);
  
  if (hasBlueBackground) {
    // Force white text on all children
    const allTextElements = element.querySelectorAll('*');
    allTextElements.forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.setProperty('color', '#ffffff', 'important');
      }
    });
  }
};

const checkForBlueBackground = (element: HTMLElement): boolean => {
  let currentElement: HTMLElement | null = element;
  
  while (currentElement) {
    const computedStyle = window.getComputedStyle(currentElement);
    const classList = currentElement.classList;
    
    // Check for blue classes
    const hasBlueClass = Array.from(classList).some(className => 
      className.includes('blue') || 
      className.includes('indigo') ||
      (className.includes('slate') && className.includes('9'))
    );
    
    // Check computed background
    const bgImage = computedStyle.backgroundImage;
    const hasBlueGradient = bgImage && bgImage.includes('blue');
    
    if (hasBlueClass || hasBlueGradient) {
      return true;
    }
    
    currentElement = currentElement.parentElement;
  }
  
  return false;
};

// Auto-fix function that can be called on page load
export const autoFixBlueBackgroundText = () => {
  const blueBackgroundElements = document.querySelectorAll('[class*="blue"], [class*="indigo"], [class*="slate-9"]');
  
  blueBackgroundElements.forEach((element) => {
    if (element instanceof HTMLElement) {
      forceWhiteTextOnBlue(element);
    }
  });
};'''
    
    with open('src/utils/blueBackgroundFixer.ts', 'w') as f:
        f.write(util_content)
    
    print("✅ Created CSS-in-JS solution files:")
    print("   - src/hooks/useBlueBackgroundStyles.ts")
    print("   - src/utils/blueBackgroundFixer.ts")

if __name__ == "__main__":
    create_css_in_js_solution()