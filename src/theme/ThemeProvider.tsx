'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ColorTheme, ThemeMode, getCurrentTheme, generateCSSVariables } from './colors';

interface ThemeContextType {
  theme: ColorTheme;
  themeMode: ThemeMode;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>('light');
  const [theme, setTheme] = useState<ColorTheme>(() => getCurrentTheme('light'));

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeMode | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme: ThemeMode = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    setThemeModeState(initialTheme);
    setTheme(getCurrentTheme(initialTheme));
  }, []);

  // Update theme when mode changes
  useEffect(() => {
    const newTheme = getCurrentTheme(themeMode);
    setTheme(newTheme);
    
    // Save to localStorage
    localStorage.setItem('theme', themeMode);
    
    // Update CSS custom properties
    const cssVariables = generateCSSVariables(newTheme);
    const root = document.documentElement;
    
    Object.entries(cssVariables).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
    
    // Update document class for Tailwind dark mode
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeModeState(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
  };

  const value: ThemeContextType = {
    theme,
    themeMode,
    toggleTheme,
    setThemeMode,
  };

  return (
    <ThemeContext.Provider value={value}>
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

// Convenience hooks for specific theme values
export const useThemeColor = () => {
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