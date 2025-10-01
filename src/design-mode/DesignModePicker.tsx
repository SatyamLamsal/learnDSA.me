// DesignModePicker: Handles element selection and shows the style editor panel
import React, { useEffect } from 'react';
import { useDesignMode } from './DesignModeContext';
import DesignModePanel from './DesignModePanel';

const hoverStyle = {
  outline: '2px solid #facc15',
  outlineOffset: '2px',
  cursor: 'pointer',
};

const selectedStyle = {
  outline: '3px solid #ef4444',
  outlineOffset: '3px',
  cursor: 'pointer',
  boxShadow: '0 0 0 1px #ef4444, 0 0 20px rgba(239, 68, 68, 0.3)',
};

const DesignModePicker: React.FC = () => {
  const { enabled, selectedElement, setSelectedElement } = useDesignMode();

  useEffect(() => {
    if (!enabled) return;
    
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      
      // Ignore clicks on the design panel itself
      if (target.closest('[data-design-panel]')) {
        return;
      }
      
      e.preventDefault();
      e.stopPropagation();
      
      // Clear previous selection styling
      if (selectedElement && selectedElement !== target) {
        selectedElement.style.outline = selectedElement.getAttribute('data-original-outline') || '';
        selectedElement.style.outlineOffset = selectedElement.getAttribute('data-original-outline-offset') || '';
        selectedElement.style.cursor = selectedElement.getAttribute('data-original-cursor') || '';
        selectedElement.style.boxShadow = selectedElement.getAttribute('data-original-box-shadow') || '';
      }
      
      // Apply selected styling to new element
      Object.assign(target.style, selectedStyle);
      
      setSelectedElement(target);
      console.log('Selected element:', target.tagName, target.className);
    }
    
    function handleMouseOver(e: MouseEvent) {
      const el = e.target as HTMLElement;
      
      // Ignore hover on design panel
      if (el.closest('[data-design-panel]') || el === document.body) {
        return;
      }
      
      // Store original outline to restore later (cross-browser compatible)
      if (!el.getAttribute('data-design-original-stored')) {
        el.setAttribute('data-original-outline', el.style.outline || '');
        el.setAttribute('data-original-outline-offset', el.style.outlineOffset || '');
        el.setAttribute('data-original-cursor', el.style.cursor || '');
        el.setAttribute('data-original-box-shadow', el.style.boxShadow || '');
        el.setAttribute('data-design-original-stored', 'true');
      }
      
      // Don't change hover style if this element is already selected
      if (el === selectedElement) {
        return;
      }
      
      Object.assign(el.style, hoverStyle);
    }
    
    function handleMouseOut(e: MouseEvent) {
      const el = e.target as HTMLElement;
      
      if (el.closest('[data-design-panel]') || el === document.body) {
        return;
      }
      
      // Don't remove highlight if this is the selected element
      if (el === selectedElement) {
        return;
      }
      
      // Restore original styles for non-selected elements
      el.style.outline = el.getAttribute('data-original-outline') || '';
      el.style.outlineOffset = el.getAttribute('data-original-outline-offset') || '';
      el.style.cursor = el.getAttribute('data-original-cursor') || '';
    }
    
    function handleClosePanel() {
      // Clear selection styling
      if (selectedElement) {
        selectedElement.style.outline = selectedElement.getAttribute('data-original-outline') || '';
        selectedElement.style.outlineOffset = selectedElement.getAttribute('data-original-outline-offset') || '';
        selectedElement.style.cursor = selectedElement.getAttribute('data-original-cursor') || '';
        selectedElement.style.boxShadow = selectedElement.getAttribute('data-original-box-shadow') || '';
      }
      setSelectedElement(null);
    }
    
    // Use body for event delegation to avoid document security restrictions
    document.body.addEventListener('click', handleClick, true);
    document.body.addEventListener('mouseover', handleMouseOver, true);
    document.body.addEventListener('mouseout', handleMouseOut, true);
    document.addEventListener('closeDesignPanel', handleClosePanel);
    
    return () => {
      if (document.body) {
        document.body.removeEventListener('click', handleClick, true);
        document.body.removeEventListener('mouseover', handleMouseOver, true);
        document.body.removeEventListener('mouseout', handleMouseOut, true);
      }
      document.removeEventListener('closeDesignPanel', handleClosePanel);
    };
  }, [enabled, setSelectedElement]);

  if (!enabled) return null;
  return selectedElement ? <DesignModePanel element={selectedElement} /> : null;
};

export default DesignModePicker;
