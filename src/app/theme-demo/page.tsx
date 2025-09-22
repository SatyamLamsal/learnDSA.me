'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { ThemeToggle, ThemeSelector } from '@/components/ThemeToggle';
import { 
  Palette, 
  Sun, 
  Moon, 
  Monitor,
  Code,
  Zap,
  CheckCircle
} from 'lucide-react';

const ThemeDemoPage: React.FC = () => {
  const { theme, mode, overrides, setOverride, clearOverrides } = useTheme();

  const features = [
    {
      icon: <Sun className="h-6 w-6" />,
      title: 'Light Mode',
      description: 'Clean, bright interface optimized for daylight use',
      colors: ['#3b82f6', '#10b981', '#f59e0b', '#ec4899']
    },
    {
      icon: <Moon className="h-6 w-6" />,
      title: 'Dark Mode',
      description: 'Easy on the eyes with carefully selected dark colors',
      colors: ['#60a5fa', '#34d399', '#fbbf24', '#f472b6']
    },
    {
      icon: <Monitor className="h-6 w-6" />,
      title: 'System Sync',
      description: 'Automatically follows your system preference',
      colors: ['#6366f1', '#8b5cf6', '#06b6d4', '#84cc16']
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Smooth Transitions',
      description: 'Seamless animated transitions between themes',
      colors: ['#f97316', '#ef4444', '#22c55e', '#a855f7']
    }
  ];

  const dataStructureColors = [
    { name: 'Arrays', color: theme.dataStructures.arrays },
    { name: 'Linked Lists', color: theme.dataStructures.linkedLists },
    { name: 'Stacks', color: theme.dataStructures.stacks },
    { name: 'Queues', color: theme.dataStructures.queues },
    { name: 'Trees', color: theme.dataStructures.trees },
    { name: 'Graphs', color: theme.dataStructures.graphs },
    { name: 'Hash Tables', color: theme.dataStructures.hashTables },
  ];

  const algorithmColors = [
    { name: 'Sorting', color: theme.algorithms.sorting },
    { name: 'Searching', color: theme.algorithms.searching },
    { name: 'Graph Algorithms', color: theme.algorithms.graph },
    { name: 'Dynamic Programming', color: theme.algorithms.dynamicProgramming },
    { name: 'Greedy', color: theme.algorithms.greedy },
    { name: 'Divide & Conquer', color: theme.algorithms.divideAndConquer },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <Palette className="h-12 w-12 text-blue-600 dark:text-blue-400 mr-4" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Dark Mode Demo
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience our comprehensive theme system with smooth transitions, 
            system preference detection, and carefully crafted color palettes.
          </p>
        </motion.div>

        {/* Current Theme Status */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Current Theme: {mode === 'light' ? 'Light' : 'Dark'} Mode
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Theme persisted in localStorage and synced across tabs
              </p>
            </div>
            <div className="flex space-x-4">
              <ThemeToggle variant="button" size="lg" />
              <ThemeSelector />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-white">Theme Properties</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Mode:</span>
                  <span className="font-mono text-gray-900 dark:text-white">{mode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Primary Color:</span>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-4 h-4 rounded" 
                      style={{ backgroundColor: theme.primary }}
                    />
                    <span className="font-mono text-gray-900 dark:text-white">{theme.primary}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Background:</span>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-4 h-4 rounded border" 
                      style={{ backgroundColor: theme.background.primary }}
                    />
                    <span className="font-mono text-gray-900 dark:text-white">{theme.background.primary}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Text Color:</span>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-4 h-4 rounded border" 
                      style={{ backgroundColor: theme.text.primary }}
                    />
                    <span className="font-mono text-gray-900 dark:text-white">{theme.text.primary}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-white">Features</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">LocalStorage persistence</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">System preference detection</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Smooth CSS transitions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Accessibility compliant</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Theme Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Theme Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg text-blue-600 dark:text-blue-400">
                    {feature.icon}
                  </div>
                  <h3 className="ml-3 font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {feature.description}
                </p>
                <div className="flex space-x-2">
                  {feature.colors.map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-600"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

  {/* Color Palettes */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Data Structure Colors */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Data Structure Colors
            </h3>
            <div className="space-y-4">
              {dataStructureColors.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <span className="font-medium text-gray-900 dark:text-white">
                    {item.name}
                  </span>
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-8 h-8 rounded-lg border-2 border-white dark:border-gray-600 shadow-sm"
                      style={{ backgroundColor: item.color }}
                    />
                    <code className="text-sm font-mono text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">
                      {item.color}
                    </code>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Algorithm Colors */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Algorithm Colors
            </h3>
            <div className="space-y-4">
              {algorithmColors.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <span className="font-medium text-gray-900 dark:text-white">
                    {item.name}
                  </span>
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-8 h-8 rounded-lg border-2 border-white dark:border-gray-600 shadow-sm"
                      style={{ backgroundColor: item.color }}
                    />
                    <code className="text-sm font-mono text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">
                      {item.color}
                    </code>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Live Color Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Live Color Controls
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: 'Primary', var: '--color-primary', defaultValue: theme.primary },
              { label: 'Accent', var: '--color-accent', defaultValue: theme.accent },
              { label: 'Text Primary', var: '--color-text-primary', defaultValue: theme.text.primary },
              { label: 'BG Primary', var: '--color-bg-primary', defaultValue: theme.background.primary },
              { label: 'Arrays', var: '--color-arrays', defaultValue: theme.dataStructures.arrays },
              { label: 'Graphs', var: '--color-graphs', defaultValue: theme.dataStructures.graphs },
              { label: 'Sorting', var: '--color-sorting', defaultValue: theme.algorithms.sorting },
              { label: 'Searching', var: '--color-searching', defaultValue: theme.algorithms.searching },
              { label: 'Divide & Conquer', var: '--color-divide-and-conquer', defaultValue: theme.algorithms.divideAndConquer },
            ].map((item) => (
              <div key={item.var} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {item.label}
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    defaultValue={(overrides[item.var] as string) || item.defaultValue}
                    onChange={(e) => setOverride(item.var, e.target.value)}
                    className="h-10 w-16 rounded bg-transparent cursor-pointer"
                    aria-label={`Pick color for ${item.label}`}
                  />
                  <input
                    type="text"
                    defaultValue={(overrides[item.var] as string) || item.defaultValue}
                    onBlur={(e) => setOverride(item.var, e.target.value)}
                    className="flex-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-1 text-sm text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={clearOverrides}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100"
            >
              Reset Overrides
            </button>
          </div>
        </motion.div>

        {/* Usage Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800"
        >
          <div className="flex items-center mb-4">
            <Code className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
            <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100">
              How to Use Dark Mode
            </h3>
          </div>
          <div className="space-y-4 text-blue-800 dark:text-blue-200">
            <div>
              <h4 className="font-semibold mb-2">1. Use the Theme Context</h4>
              <div className="bg-blue-100 dark:bg-blue-900/40 p-4 rounded-lg font-mono text-sm">
                <div>import {'{ useTheme }'} from &apos;@/contexts/ThemeContext&apos;;</div>
                <div>const {'{ theme, toggleTheme, isDark }'} = useTheme();</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">2. Add Theme Toggle Component</h4>
              <div className="bg-blue-100 dark:bg-blue-900/40 p-4 rounded-lg font-mono text-sm">
                <div>import {'{ ThemeToggle }'} from &apos;@/components/ThemeToggle&apos;;</div>
                <div>{'<ThemeToggle variant=&quot;button&quot; size=&quot;md&quot; />'}</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">3. Use Tailwind Dark Mode Classes</h4>
              <div className="bg-blue-100 dark:bg-blue-900/40 p-4 rounded-lg font-mono text-sm">
                <div>className=&quot;bg-white dark:bg-gray-800 text-gray-900 dark:text-white&quot;</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ThemeDemoPage;