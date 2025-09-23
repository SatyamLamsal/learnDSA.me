// Simple Color System for LearnDSA.me
// For complex color management, use customColors.ts instead

export interface ColorTheme {
  primary: string;
  primaryHover: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  secondaryHover: string;
  accent: string;
  accentHover: string;
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    inverse: string;
  };
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
    elevated: string;
  };
  border: {
    light: string;
    medium: string;
    dark: string;
  };
  status: {
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  dataStructures: {
    arrays: string;
    linkedLists: string;
    stacks: string;
    queues: string;
    trees: string;
    graphs: string;
    hashTables: string;
  };
  algorithms: {
    sorting: string;
    searching: string;
    graph: string;
    dynamicProgramming: string;
    greedy: string;
    divideAndConquer: string;
  };
}

// Light Theme (Default)
export const lightTheme: ColorTheme = {
  primary: '#3b82f6',
  primaryHover: '#2563eb',
  primaryLight: '#dbeafe',
  primaryDark: '#1d4ed8',
  secondary: '#64748b',
  secondaryHover: '#475569',
  accent: '#10b981',
  accentHover: '#059669',
  text: {
    primary: '#0f172a',
    secondary: '#475569',
    tertiary: '#94a3b8',
    inverse: '#ffffff',
  },
  background: {
    primary: '#ffffff',
    secondary: '#f8fafc',
    tertiary: '#f1f5f9',
    elevated: '#ffffff',
  },
  border: {
    light: '#e2e8f0',
    medium: '#cbd5e1',
    dark: '#94a3b8',
  },
  status: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  dataStructures: {
    arrays: '#8b5cf6',
    linkedLists: '#06b6d4',
    stacks: '#10b981',
    queues: '#f59e0b',
    trees: '#84cc16',
    graphs: '#ec4899',
    hashTables: '#f97316',
  },
  algorithms: {
    sorting: '#6366f1',
    searching: '#8b5cf6',
    graph: '#ec4899',
    dynamicProgramming: '#06b6d4',
    greedy: '#84cc16',
    divideAndConquer: '#f97316',
  },
};

// Dark Theme
export const darkTheme: ColorTheme = {
  primary: '#60a5fa',
  primaryHover: '#3b82f6',
  primaryLight: '#1e40af',
  primaryDark: '#1d4ed8',
  secondary: '#94a3b8',
  secondaryHover: '#cbd5e1',
  accent: '#34d399',
  accentHover: '#10b981',
  text: {
    primary: '#f8fafc',
    secondary: '#cbd5e1',
    tertiary: '#94a3b8',
    inverse: '#0f172a',
  },
  background: {
    primary: '#0f172a',
    secondary: '#1e293b',
    tertiary: '#334155',
    elevated: '#1e293b',
  },
  border: {
    light: '#334155',
    medium: '#475569',
    dark: '#64748b',
  },
  status: {
    success: '#34d399',
    warning: '#fbbf24',
    error: '#f87171',
    info: '#60a5fa',
  },
  dataStructures: {
    arrays: '#a78bfa',
    linkedLists: '#22d3ee',
    stacks: '#34d399',
    queues: '#fbbf24',
    trees: '#a3e635',
    graphs: '#f472b6',
    hashTables: '#fb923c',
  },
  algorithms: {
    sorting: '#818cf8',
    searching: '#a78bfa',
    graph: '#f472b6',
    dynamicProgramming: '#22d3ee',
    greedy: '#a3e635',
    divideAndConquer: '#fb923c',
  },
};

// Theme Context Type
export type ThemeMode = 'light' | 'dark';

// Current active theme (can be extended to support theme switching)
export const getCurrentTheme = (mode: ThemeMode = 'light'): ColorTheme => {
  return mode === 'dark' ? darkTheme : lightTheme;
};

// Legacy export for backward compatibility
export const Colors = lightTheme;

// Utility functions for theme colors
export const getDataStructureColor = (structure: keyof ColorTheme['dataStructures']): string => {
  return lightTheme.dataStructures[structure];
};

export const getAlgorithmColor = (algorithm: keyof ColorTheme['algorithms']): string => {
  return lightTheme.algorithms[algorithm];
};

export const getStatusColor = (status: keyof ColorTheme['status']): string => {
  return lightTheme.status[status];
};