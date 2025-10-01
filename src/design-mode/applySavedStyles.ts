// Loads and applies saved styles from localStorage (dev only)
// Note: Hardcoded styles are now directly in the .tsx files and don't need to be loaded
export function applySavedDesignModeStyles() {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') return;
  
  // Apply localStorage styles (temporary changes not yet hardcoded)
  const saved = JSON.parse(localStorage.getItem('designModeStyles') || '{}');
  Object.entries(saved).forEach(([selector, styles]) => {
    try {
      const els = document.querySelectorAll(selector);
      els.forEach(el => {
        Object.assign((el as HTMLElement).style, styles);
      });
    } catch (e) {
      console.warn('Could not apply saved style for selector:', selector, e);
    }
  });

  console.log('🎨 Design mode: Applied temporary styles from localStorage');
  console.log('💾 Hardcoded styles are already in the .tsx files permanently!');
}

// Load permanent CSS styles and inject them into the page
async function loadPermanentStyles() {
  try {
    const response = await fetch('/api/design-mode/save-styles');
    if (response.ok) {
      const data = await response.json();
      if (data.success && data.css) {
        // Remove existing design mode styles
        const existingStyle = document.getElementById('design-mode-permanent-styles');
        if (existingStyle) {
          existingStyle.remove();
        }

        // Inject new permanent styles
        const styleElement = document.createElement('style');
        styleElement.id = 'design-mode-permanent-styles';
        styleElement.textContent = data.css;
        document.head.appendChild(styleElement);
        
        console.log('🎨 Permanent design mode styles loaded');
      }
    }
  } catch (error) {
    console.warn('Could not load permanent styles:', error);
  }
}
