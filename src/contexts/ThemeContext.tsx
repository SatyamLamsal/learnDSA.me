'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ColorTheme, ThemeMode, getCurrentTheme, generateCSSVariables } from '@/theme/colors';

interface ThemeContextType {
  theme: ColorTheme;
  mode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
  isDark: boolean;
  isLight: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultMode?: ThemeMode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  defaultMode = 'light' 
}) => {
  const [mode, setMode] = useState<ThemeMode>(defaultMode);
  const [mounted, setMounted] = useState(false);

  // Get the current theme based on mode
  const theme = getCurrentTheme(mode);

  // Initialize theme from localStorage and system preference
  useEffect(() => {
    const initializeTheme = () => {
      try {
        // Check localStorage first
        const savedTheme = localStorage.getItem('theme-mode') as ThemeMode | null;
        
        if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
          setMode(savedTheme);
        } else {
          // Check system preference
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          setMode(prefersDark ? 'dark' : 'light');
        }
      } catch (error) {
        console.warn('Failed to initialize theme from localStorage:', error);
        setMode(defaultMode);
      }
      
      setMounted(true);
    };

    initializeTheme();
  }, [defaultMode]);

  // Apply CSS variables when theme changes
  useEffect(() => {
    if (!mounted) return;

    const cssVariables = generateCSSVariables(theme);
    const root = document.documentElement;

    // Apply all CSS custom properties
    Object.entries(cssVariables).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    // Update the class on html element for Tailwind dark mode
    const htmlElement = document.documentElement;
    if (mode === 'dark') {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }

    // Save to localStorage
    try {
      localStorage.setItem('theme-mode', mode);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  }, [theme, mode, mounted]);

  // Listen for system theme changes
  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // Only auto-update if user hasn't manually set a preference
      const savedTheme = localStorage.getItem('theme-mode');
      if (!savedTheme) {
        setMode(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mounted]);

  const toggleTheme = () => {
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };

  const setTheme = (newMode: ThemeMode) => {
    setMode(newMode);
  };

  const contextValue: ThemeContextType = {
    theme,
    mode,
    toggleTheme,
    setTheme,
    isDark: mode === 'dark',
    isLight: mode === 'light',
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-white">
        {children}
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Utility hooks for specific theme aspects
export const useThemeColors = () => {
  const { theme } = useTheme();
  return theme;
};

export const useDataStructureColor = (structure: keyof ColorTheme['dataStructures']) => {
  const { theme } = useTheme();
  return theme.dataStructures[structure];
};

export const useAlgorithmColor = (algorithm: keyof ColorTheme['algorithms']) => {
  const { theme } = useTheme();
  return theme.algorithms[algorithm];
};

export const useStatusColor = (status: keyof ColorTheme['status']) => {
  const { theme } = useTheme();
  return theme.status[status];
};

// HOC for components that need theme
export const withTheme = <P extends object>(
  Component: React.ComponentType<P & { theme: ColorTheme }>
) => {
  const WithThemeComponent = (props: P) => {
    const { theme } = useTheme();
    return <Component {...props} theme={theme} />;
  };
  
  WithThemeComponent.displayName = `withTheme(${Component.displayName || Component.name})`;
  
  return WithThemeComponent;
};