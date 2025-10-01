// DesignModePanel: Floating panel to edit color and font of selected element
import React, { useState, useEffect } from 'react';

interface Props {
  element: HTMLElement;
}

const fonts = [
  'inherit',
  'Arial',
  'Georgia',
  'Times New Roman',
  'Courier New',
  'Verdana',
  'Script MT Bold',
  'Inter',
  'Roboto',
  'Poppins',
];

const standardColors = {
  text: [
    '#000000', '#1f2937', '#374151', '#6b7280', '#9ca3af',
    '#ffffff', '#f9fafb', '#f3f4f6',
    '#dc2626', '#ea580c', '#d97706', '#ca8a04',
    '#65a30d', '#16a34a', '#059669', '#0d9488',
    '#0891b2', '#0284c7', '#2563eb', '#4f46e5',
    '#7c3aed', '#9333ea', '#c026d3', '#db2777',
  ],
  background: [
    '#ffffff', '#f9fafb', '#f3f4f6', '#e5e7eb', '#d1d5db',
    '#000000', '#1f2937', '#374151', '#4b5563',
    '#fef2f2', '#fef7f0', '#fffbeb', '#fefce8',
    '#f0fdf4', '#ecfdf5', '#f0fdfa', '#ecfeff',
    '#eff6ff', '#eef2ff', '#f5f3ff', '#faf5ff',
    '#fdf2f8', '#fdf4ff',
    '#dc2626', '#ea580c', '#d97706', '#ca8a04',
    '#65a30d', '#16a34a', '#059669', '#0d9488',
    '#0891b2', '#0284c7', '#2563eb', '#4f46e5',
    '#7c3aed', '#9333ea', '#c026d3', '#db2777',
  ]
};

const DesignModePanel: React.FC<Props> = ({ element }) => {
  // Get computed styles to show current values
  const computedStyles = window.getComputedStyle(element);
  
  // Store original values for undo functionality
  const [originalStyles, setOriginalStyles] = useState<{color: string, backgroundColor: string, fontFamily: string} | null>(null);
  
  // Dragging state
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 16, y: 70 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  // Convert RGB to hex if needed (cross-browser compatible)
  function rgbToHex(rgb: string): string {
    if (!rgb || rgb === 'transparent' || rgb === 'rgba(0, 0, 0, 0)' || rgb === 'initial' || rgb === 'inherit') return '';
    if (rgb.startsWith('#')) return rgb;
    
    // Handle rgb() format
    const rgbMatch = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (rgbMatch) {
      const r = parseInt(rgbMatch[1]);
      const g = parseInt(rgbMatch[2]);
      const b = parseInt(rgbMatch[3]);
      return '#' + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      }).join('');
    }
    
    // Handle rgba() format
    const rgbaMatch = rgb.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
    if (rgbaMatch && parseFloat(rgbaMatch[4]) > 0) {
      const r = parseInt(rgbaMatch[1]);
      const g = parseInt(rgbaMatch[2]);
      const b = parseInt(rgbaMatch[3]);
      return '#' + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      }).join('');
    }
    
    return rgb;
  }
  
  // Safer access to computed styles with fallbacks
  let currentColor, currentBg, currentFont;
  try {
    currentColor = element.style.color || computedStyles.color || '';
    currentBg = element.style.backgroundColor || computedStyles.backgroundColor || '';
    currentFont = element.style.fontFamily || computedStyles.fontFamily || '';
  } catch (e) {
    console.warn('Could not access computed styles:', e);
    currentColor = element.style.color || '';
    currentBg = element.style.backgroundColor || '';
    currentFont = element.style.fontFamily || '';
  }
  
  const [color, setColor] = useState(rgbToHex(currentColor) || '#000000');
  const [bg, setBg] = useState(rgbToHex(currentBg) || '');
  const [font, setFont] = useState(currentFont || 'inherit');
  
  // Store original styles when component mounts
  useEffect(() => {
    if (!originalStyles) {
      setOriginalStyles({
        color: currentColor,
        backgroundColor: currentBg,
        fontFamily: currentFont
      });
    }
  }, [currentColor, currentBg, currentFont, originalStyles]);

  function applyStyles() {
    console.log('Applying styles:', { color, bg, font, tagName: element.tagName, element });
    
    try {
      // Apply styles with !important to override existing CSS
      if (color && color !== 'transparent' && color !== '' && color !== 'rgba(0, 0, 0, 0)') {
        element.style.setProperty('color', color, 'important');
        // Fallback for older browsers
        element.style.color = color;
        console.log('Applied color:', color);
      }
      
      if (bg && bg !== 'transparent' && bg !== '' && bg !== 'rgba(0, 0, 0, 0)') {
        element.style.setProperty('background-color', bg, 'important');
        // Fallback for older browsers
        element.style.backgroundColor = bg;
        console.log('Applied background:', bg);
      }
      
      if (font && font !== 'inherit' && font !== '') {
        element.style.setProperty('font-family', font, 'important');
        // Fallback for older browsers
        element.style.fontFamily = font;
        console.log('Applied font:', font);
      }
      
      // Force a repaint (cross-browser compatible)
      const originalDisplay = element.style.display;
      element.style.display = 'none';
      void element.offsetHeight; // Trigger reflow
      element.style.display = originalDisplay || '';
      
      // Save to localStorage and hardcode into actual files
      if (typeof Storage !== 'undefined') {
        const selector = getElementSelector(element);
        const saved = JSON.parse(localStorage.getItem('designModeStyles') || '{}');
        saved[selector] = { color, backgroundColor: bg, fontFamily: font };
        localStorage.setItem('designModeStyles', JSON.stringify(saved));
        
        // Hardcode changes into actual .tsx files (PERMANENT)
        hardcodeIntoFiles(element, { color, backgroundColor: bg, fontFamily: font });
        
        console.log('✅ Styles applied and HARDCODED into files:', { color, bg, font, selector });
      }
      
    } catch (error) {
      console.error('Error applying styles:', error);
      // Fallback: try direct style assignment
      if (color) element.style.color = color;
      if (bg) element.style.backgroundColor = bg;
      if (font) element.style.fontFamily = font;
    }
  }

  function getElementSelector(el: HTMLElement): string {
    // Generate a more specific selector
    if (el.id) return `#${el.id}`;
    
    let selector = el.tagName.toLowerCase();
    
    // Add classes if they exist
    if (el.className && typeof el.className === 'string') {
      const classes = el.className.trim().split(/\s+/).filter(c => c);
      if (classes.length > 0) {
        selector += '.' + classes.join('.');
      }
    }
    
    // Add data attributes for more specificity if needed
    const dataAttrs = Array.from(el.attributes)
      .filter(attr => attr.name.startsWith('data-'))
      .slice(0, 2); // Limit to avoid overly complex selectors
    
    dataAttrs.forEach(attr => {
      selector += `[${attr.name}="${attr.value}"]`;
    });
    
    return selector;
  }
  
  // Hardcode changes into actual .tsx files (PERMANENT MODIFICATION)
  async function hardcodeIntoFiles(element: HTMLElement, styles: any) {
    try {
      const elementInfo = {
        tagName: element.tagName,
        className: element.className,
        id: element.id,
        textContent: element.textContent?.slice(0, 50), // First 50 chars for identification
        parentClassName: element.parentElement?.className,
        styles
      };
      
      const response = await fetch('/api/design-mode/hardcode-styles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(elementInfo)
      });
      
      const result = await response.json();
      if (result.success) {
        console.log('✅ HARDCODED into file:', result.filePath);
        alert(`✨ Style permanently hardcoded into: ${result.filePath}`);
      } else {
        console.warn('Could not hardcode:', result.error);
      }
    } catch (error) {
      console.warn('Could not hardcode into files:', error);
    }
  }
  
  // Undo changes - revert to original styles
  function undoChanges() {
    if (!originalStyles) return;
    
    try {
      // Restore original styles
      if (originalStyles.color) {
        element.style.setProperty('color', originalStyles.color, 'important');
        element.style.color = originalStyles.color;
      } else {
        element.style.removeProperty('color');
      }
      
      if (originalStyles.backgroundColor) {
        element.style.setProperty('background-color', originalStyles.backgroundColor, 'important');
        element.style.backgroundColor = originalStyles.backgroundColor;
      } else {
        element.style.removeProperty('background-color');
      }
      
      if (originalStyles.fontFamily) {
        element.style.setProperty('font-family', originalStyles.fontFamily, 'important');
        element.style.fontFamily = originalStyles.fontFamily;
      } else {
        element.style.removeProperty('font-family');
      }
      
      // Update state to reflect original values
      setColor(rgbToHex(originalStyles.color) || '#000000');
      setBg(rgbToHex(originalStyles.backgroundColor) || '');
      setFont(originalStyles.fontFamily || 'inherit');
      
      // Remove from localStorage
      const selector = getElementSelector(element);
      const saved = JSON.parse(localStorage.getItem('designModeStyles') || '{}');
      delete saved[selector];
      localStorage.setItem('designModeStyles', JSON.stringify(saved));
      
      console.log('✅ Changes reverted to original');
      
    } catch (error) {
      console.error('Error undoing changes:', error);
    }
  }
  
  // Dragging handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  // Add global mouse listeners for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  function ColorPalette({ colors, onSelect, label }: { colors: string[], onSelect: (color: string) => void, label: string }) {
    return (
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 4 }}>
          {colors.map(colorValue => (
            <div
              key={colorValue}
              style={{
                width: 28,
                height: 28,
                backgroundColor: colorValue,
                border: '3px solid #475569',
                borderRadius: 6,
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}
              onClick={() => onSelect(colorValue)}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'scale(1.15)';
                e.currentTarget.style.borderColor = '#facc15';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.4), 0 0 0 2px rgba(250,204,21,0.3)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.borderColor = '#475569';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div 
      data-design-panel="true"
      style={{
        position: 'fixed',
        top: position.y,
        left: window.innerWidth - position.x - 320, // Keep it on the right side
        zIndex: 10000,
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
        border: '2px solid #facc15',
        borderRadius: 16,
        padding: 24,
        boxShadow: '0 25px 50px rgba(0,0,0,0.4), 0 10px 20px rgba(250,204,21,0.3)',
        minWidth: 300,
        maxWidth: 340,
        backdropFilter: 'blur(20px)',
        cursor: isDragging ? 'grabbing' : 'default',
        userSelect: 'none'
      }}>
      {/* Header - Draggable */}
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginBottom: 16,
          paddingBottom: 12,
          borderBottom: '2px solid #facc15',
          cursor: 'grab',
          padding: '8px 0'
        }}
        onMouseDown={handleMouseDown}
      >
        <div style={{ 
          fontSize: 18, 
          fontWeight: 800, 
          color: '#facc15',
          textShadow: '0 0 10px rgba(250,204,21,0.5)',
          letterSpacing: '0.5px'
        }}>
          🎨 Style Editor
        </div>
        <div 
          style={{ 
            fontSize: 20, 
            cursor: 'pointer', 
            color: '#f1f5f9',
            padding: 6,
            borderRadius: 6,
            background: 'rgba(248,113,113,0.2)',
            border: '1px solid rgba(248,113,113,0.3)'
          }}
          onClick={(e) => {
            e.stopPropagation();
            // Clear selection to close panel
            const event = new CustomEvent('closeDesignPanel');
            document.dispatchEvent(event);
          }}
          onMouseOver={e => {
            e.currentTarget.style.background = '#ef4444';
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = 'rgba(248,113,113,0.2)';
            e.currentTarget.style.color = '#f1f5f9';
          }}
        >
          ×
        </div>
      </div>

      {/* Text Color Section */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, color: '#f1f5f9', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span>🖊️</span> Text Color
        </div>
        <ColorPalette colors={standardColors.text} onSelect={setColor} label="Standard Colors" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <input 
            type="color" 
            value={color} 
            onChange={e => setColor(e.target.value)}
            style={{
              width: 48,
              height: 40,
              border: '3px solid #475569',
              borderRadius: 8,
              cursor: 'pointer',
              background: '#0f172a'
            }}
          />
          <input
            type="text"
            value={color}
            onChange={e => setColor(e.target.value)}
            placeholder="#000000"
            style={{
              flex: 1,
              padding: '8px 10px',
              border: '2px solid #475569',
              borderRadius: 8,
              fontSize: 12,
              fontFamily: 'monospace',
              background: '#0f172a',
              color: '#f1f5f9',
              outline: 'none'
            }}
            onFocus={e => e.currentTarget.style.borderColor = '#facc15'}
            onBlur={e => e.currentTarget.style.borderColor = '#475569'}
          />
        </div>
      </div>

      {/* Background Color Section */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, color: '#f1f5f9', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span>🎨</span> Background
        </div>
        <ColorPalette colors={standardColors.background} onSelect={setBg} label="Standard Backgrounds" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <input 
            type="color" 
            value={bg} 
            onChange={e => setBg(e.target.value)}
            style={{
              width: 48,
              height: 40,
              border: '3px solid #475569',
              borderRadius: 8,
              cursor: 'pointer',
              background: '#0f172a'
            }}
          />
          <input
            type="text"
            value={bg}
            onChange={e => setBg(e.target.value)}
            placeholder="transparent"
            style={{
              flex: 1,
              padding: '8px 10px',
              border: '2px solid #475569',
              borderRadius: 8,
              fontSize: 12,
              fontFamily: 'monospace',
              background: '#0f172a',
              color: '#f1f5f9',
              outline: 'none'
            }}
            onFocus={e => e.currentTarget.style.borderColor = '#facc15'}
            onBlur={e => e.currentTarget.style.borderColor = '#475569'}
          />
        </div>
      </div>

      {/* Font Section */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, color: '#f1f5f9', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span>📝</span> Font Family
        </div>
        <select 
          value={font} 
          onChange={e => setFont(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 14px',
            border: '2px solid #475569',
            borderRadius: 8,
            fontSize: 14,
            cursor: 'pointer',
            background: '#0f172a',
            color: '#f1f5f9',
            outline: 'none'
          }}
          onFocus={e => e.currentTarget.style.borderColor = '#facc15'}
          onBlur={e => e.currentTarget.style.borderColor = '#475569'}
        >
          {fonts.map(f => <option key={f} value={f}>{f === 'inherit' ? 'Default Font' : f}</option>)}
        </select>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <button
          style={{ 
            flex: 1,
            background: 'linear-gradient(45deg, #facc15, #f59e0b)', 
            color: '#000', 
            border: 'none', 
            borderRadius: 8, 
            padding: '12px 16px', 
            fontWeight: 700, 
            fontSize: 14,
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 2px 4px rgba(250, 204, 21, 0.3)'
          }}
          onClick={applyStyles}
          onMouseOver={e => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(250, 204, 21, 0.4)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 4px rgba(250, 204, 21, 0.3)';
          }}
        >
          ✨ Apply
        </button>
        
        <button
          style={{ 
            flex: 1,
            background: 'linear-gradient(45deg, #ef4444, #dc2626)', 
            color: '#fff', 
            border: 'none', 
            borderRadius: 8, 
            padding: '12px 16px', 
            fontWeight: 700, 
            fontSize: 14,
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 2px 4px rgba(239, 68, 68, 0.3)'
          }}
          onClick={undoChanges}
          onMouseOver={e => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(239, 68, 68, 0.4)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 4px rgba(239, 68, 68, 0.3)';
          }}
        >
          ⏪ Undo
        </button>
      </div>
      
      {/* Info Section */}
      <div style={{ 
        fontSize: 11, 
        color: '#94a3b8', 
        textAlign: 'center',
        paddingTop: 8,
        borderTop: '1px solid #475569'
      }}>
        💾 Changes saved to localStorage & CSS file
        <br />
        <span style={{ color: '#facc15' }}>Element:</span> {element.tagName.toLowerCase()}
        {element.className && <><br /><span style={{ color: '#facc15' }}>Classes:</span> {element.className}</>}
      </div>
    </div>
  );
};

export default DesignModePanel;
