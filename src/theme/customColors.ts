// Custom Colors Collection for LearnDSA.me
// Import and use these colors directly in your components

export const colors = {
  // Primary Brand Colors
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',  // Main primary
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },

  // Secondary/Gray Scale
  gray: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },

  // Data Structure Colors
  dataStructures: {
    arrays: '#ef4444',      // Red
    linkedLists: '#3b82f6', // Blue
    stacks: '#10b981',      // Green
    queues: '#f59e0b',      // Yellow
    trees: '#8b5cf6',       // Purple
    graphs: '#ec4899',      // Pink
    hashTables: '#f97316',  // Orange
  },

  // Algorithm Colors
  algorithms: {
    sorting: '#6366f1',     // Indigo
    searching: '#8b5cf6',   // Purple
    graph: '#ec4899',       // Pink
    dynamicProgramming: '#06b6d4', // Cyan
    greedy: '#84cc16',      // Lime
    divideAndConquer: '#f97316',   // Orange
  },

  // Status Colors
  status: {
    success: '#10b981',     // Green
    warning: '#f59e0b',     // Yellow
    error: '#ef4444',       // Red
    info: '#3b82f6',        // Blue
  },

  // Semantic UI Colors (organized by usage)
  navigation: {
    background: '#0f172a',    // gray-900
    text: '#ffffff',          // white
    hover: '#1e293b',         // gray-800
    dropdown: '#1e293b',      // gray-800
  },

  content: {
    title: '#0f172a',         // gray-900
    subtitle: '#334155',      // gray-700
    body: '#475569',          // gray-600
    muted: '#64748b',         // gray-500
    link: '#3b82f6',          // primary-500
    linkHover: '#2563eb',     // primary-600
  },

  surfaces: {
    background: '#ffffff',    // white
    card: '#ffffff',          // white
    elevated: '#f8fafc',      // gray-50
    border: '#e2e8f0',        // gray-200
    borderLight: '#f1f5f9',   // gray-100
  },

  feedback: {
    errorBg: '#fef2f2',       // red-50
    errorBorder: '#fecaca',   // red-200
    errorText: '#dc2626',     // red-600
    warningBg: '#fffbeb',     // yellow-50
    warningBorder: '#fed7aa', // yellow-200
    warningText: '#d97706',   // yellow-600
    successBg: '#f0fdf4',     // green-50
    successBorder: '#bbf7d0', // green-200
    successText: '#16a34a',   // green-600
  },

  // Dark Mode Variants
  dark: {
    navigation: {
      background: '#0f172a',
      text: '#f8fafc',
      hover: '#1e293b',
      dropdown: '#1e293b',
    },
    content: {
      title: '#f1f5f9',
      subtitle: '#e2e8f0',
      body: '#cbd5e1',
      muted: '#94a3b8',
      link: '#60a5fa',
      linkHover: '#3b82f6',
    },
    surfaces: {
      background: '#0f172a',
      card: '#1e293b',
      elevated: '#334155',
      border: '#334155',
      borderLight: '#475569',
    },
    feedback: {
      errorBg: '#450a0a',
      errorBorder: '#7f1d1d',
      errorText: '#f87171',
      warningBg: '#451a03',
      warningBorder: '#a16207',
      warningText: '#fbbf24',
      successBg: '#052e16',
      successBorder: '#166534',
      successText: '#4ade80',
    },
  },
};

// Utility functions for easy access
export const getDataStructureColor = (structure: keyof typeof colors.dataStructures): string => {
  return colors.dataStructures[structure];
};

export const getAlgorithmColor = (algorithm: keyof typeof colors.algorithms): string => {
  return colors.algorithms[algorithm];
};

export const getStatusColor = (status: keyof typeof colors.status): string => {
  return colors.status[status];
};

// Export individual color groups for convenience
export const { 
  primary, 
  gray, 
  dataStructures, 
  algorithms, 
  status, 
  navigation, 
  content, 
  surfaces, 
  feedback 
} = colors;