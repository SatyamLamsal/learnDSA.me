// DesignModeProvider: Context to enable/disable design mode and provide selected element info
import React, { createContext, useContext, useState, useEffect } from 'react';

const DesignModeContext = createContext({
  enabled: false,
  setEnabled: (v: boolean) => {},
  selectedElement: null as HTMLElement | null,
  setSelectedElement: (el: HTMLElement | null) => {},
});

export const useDesignMode = () => useContext(DesignModeContext);

export const DesignModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [enabled, setEnabled] = useState(false);
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);

  // Only enable in development and check browser compatibility
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      setEnabled(false);
      return;
    }
    
    // Check if browser supports required features
    const hasRequiredFeatures = typeof window !== 'undefined' && 
      'addEventListener' in window && 
      document.body !== null && 
      'querySelector' in document &&
      typeof Storage !== 'undefined';
      
    if (!hasRequiredFeatures) {
      console.warn('Design mode disabled: browser lacks required features');
      setEnabled(false);
    }
  }, []);

  return (
    <DesignModeContext.Provider value={{ enabled, setEnabled, selectedElement, setSelectedElement }}>
      {children}
    </DesignModeContext.Provider>
  );
};
