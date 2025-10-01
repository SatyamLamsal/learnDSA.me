// Simple Design Mode - Direct File Modification System
'use client';
import React, { useState, useEffect, useRef } from 'react';

// Only show in development
if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'development') {
  throw new Error('Design mode is only available in development');
}

interface DesignModeProps {
  children?: React.ReactNode;
}

const DesignMode: React.FC<DesignModeProps> = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);
  const [panelPosition, setPanelPosition] = useState({ x: 20, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const panelRef = useRef<HTMLDivElement>(null);

  // Color presets for easy selection
  const colorPresets = [
    '#000000', '#374151', '#6b7280', '#9ca3af', '#ffffff',
    '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16',
    '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9',
    '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
    '#ec4899', '#f43f5e'
  ];

  const fontOptions = [
    'inherit', 'Arial', 'Georgia', 'Times New Roman', 'Courier New',
    'Verdana', 'Script MT Bold', 'Inter', 'Roboto', 'Poppins'
  ];

  // Initialize design mode
  useEffect(() => {
    if (!isActive) return;

    const handleElementClick = (e: MouseEvent) => {
      if (panelRef.current?.contains(e.target as Node)) return;
      
      e.preventDefault();
      e.stopPropagation();
      
      const element = e.target as HTMLElement;
      if (element.closest('[data-design-panel]')) return;
      
      // Clear previous selection
      document.querySelectorAll('[data-design-selected]').forEach(el => {
        el.removeAttribute('data-design-selected');
        (el as HTMLElement).style.outline = '';
      });
      
      // Select new element
      element.setAttribute('data-design-selected', 'true');
      element.style.outline = '2px solid #3b82f6';
      element.style.outlineOffset = '2px';
      
      setSelectedElement(element);
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (panelRef.current?.contains(e.target as Node)) return;
      
      const element = e.target as HTMLElement;
      if (element.closest('[data-design-panel]')) return;
      if (element.hasAttribute('data-design-selected')) return;
      
      element.style.outline = '1px solid #facc15';
      element.style.outlineOffset = '1px';
    };

    const handleMouseOut = (e: MouseEvent) => {
      const element = e.target as HTMLElement;
      if (!element.hasAttribute('data-design-selected')) {
        element.style.outline = '';
        element.style.outlineOffset = '';
      }
    };

    document.addEventListener('click', handleElementClick, true);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('click', handleElementClick, true);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isActive]);

  // Handle panel dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - panelPosition.x,
      y: e.clientY - panelPosition.y
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setPanelPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  // Apply styles and save to file
  const applyStyles = async (color?: string, bg?: string, font?: string) => {
    if (!selectedElement) return;

    // Apply to element immediately
    if (color) selectedElement.style.setProperty('color', color, 'important');
    if (bg) selectedElement.style.setProperty('background-color', bg, 'important');  
    if (font) selectedElement.style.setProperty('font-family', font, 'important');

    // Send to backend to modify the actual file
    try {
      const elementInfo = {
        tagName: selectedElement.tagName,
        className: selectedElement.className,
        id: selectedElement.id,
        textContent: selectedElement.textContent?.slice(0, 100),
        styles: { color, backgroundColor: bg, fontFamily: font }
      };

      const response = await fetch('/api/design-mode/modify-file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(elementInfo)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ File modified:', result);
        alert('Style applied and saved to file!');
      }
    } catch (error) {
      console.warn('Could not save to file:', error);
    }
  };

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <>
      {children}
      
      {/* Toggle Button */}
      <button
        onClick={() => setIsActive(!isActive)}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 9999,
          background: isActive ? '#ef4444' : '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          padding: '12px 20px',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          fontSize: '14px'
        }}
      >
        {isActive ? '🎨 Exit Design' : '🎨 Design Mode'}
      </button>

      {/* Design Panel */}
      {isActive && selectedElement && (
        <div
          ref={panelRef}
          data-design-panel="true"
          style={{
            position: 'fixed',
            left: panelPosition.x,
            top: panelPosition.y,
            zIndex: 9998,
            background: 'linear-gradient(135deg, #1e293b, #334155)',
            border: '2px solid #facc15',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            minWidth: '320px',
            maxWidth: '380px',
            cursor: isDragging ? 'grabbing' : 'default'
          }}
        >
          {/* Header - Draggable */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
              paddingBottom: '12px',
              borderBottom: '2px solid #facc15',
              cursor: 'grab'
            }}
            onMouseDown={handleMouseDown}
          >
            <div style={{
              fontSize: '18px',
              fontWeight: '800',
              color: '#facc15',
              textShadow: '0 0 10px rgba(250,204,21,0.5)'
            }}>
              🎨 Style Editor
            </div>
            <button
              onClick={() => setSelectedElement(null)}
              style={{
                background: 'rgba(239,68,68,0.2)',
                border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: '6px',
                color: '#f1f5f9',
                fontSize: '18px',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ×
            </button>
          </div>

          {/* Element Info */}
          <div style={{
            backgroundColor: 'rgba(15,23,42,0.8)',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '16px',
            fontSize: '12px',
            color: '#cbd5e1'
          }}>
            <div><span style={{color: '#facc15'}}>Element:</span> {selectedElement.tagName.toLowerCase()}</div>
            {selectedElement.className && (
              <div><span style={{color: '#facc15'}}>Classes:</span> {selectedElement.className}</div>
            )}
          </div>

          {/* Text Color */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{
              fontSize: '14px',
              fontWeight: '700',
              color: '#f1f5f9',
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              🖊️ Text Color
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '6px',
              marginBottom: '8px'
            }}>
              {colorPresets.slice(0, 10).map(color => (
                <div
                  key={color}
                  onClick={() => applyStyles(color)}
                  style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: color,
                    border: '2px solid #475569',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                />
              ))}
            </div>
          </div>

          {/* Background Color */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{
              fontSize: '14px',
              fontWeight: '700',
              color: '#f1f5f9',
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              🎨 Background
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '6px',
              marginBottom: '8px'
            }}>
              {colorPresets.slice(10).map(color => (
                <div
                  key={color}
                  onClick={() => applyStyles(undefined, color)}
                  style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: color,
                    border: '2px solid #475569',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                />
              ))}
            </div>
          </div>

          {/* Font Family */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{
              fontSize: '14px',
              fontWeight: '700',
              color: '#f1f5f9',
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              📝 Font Family
            </div>
            <select
              onChange={(e) => applyStyles(undefined, undefined, e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '2px solid #475569',
                borderRadius: '8px',
                fontSize: '14px',
                background: '#0f172a',
                color: '#f1f5f9',
                cursor: 'pointer'
              }}
            >
              <option value="">Choose Font...</option>
              {fontOptions.map(font => (
                <option key={font} value={font}>
                  {font === 'inherit' ? 'Default Font' : font}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Actions */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px'
          }}>
            <button
              onClick={() => {
                selectedElement.style.removeProperty('color');
                selectedElement.style.removeProperty('background-color');
                selectedElement.style.removeProperty('font-family');
              }}
              style={{
                background: 'linear-gradient(45deg, #ef4444, #dc2626)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px',
                fontWeight: '700',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              🔄 Reset
            </button>
            
            <button
              onClick={() => {
                navigator.clipboard.writeText(selectedElement.outerHTML);
                alert('Element HTML copied!');
              }}
              style={{
                background: 'linear-gradient(45deg, #10b981, #059669)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px',
                fontWeight: '700',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              📋 Copy
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DesignMode;