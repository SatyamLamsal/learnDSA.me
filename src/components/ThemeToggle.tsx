'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemeToggleProps {
  variant?: 'button' | 'dropdown' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'button',
  size = 'md',
  showLabel = false,
  className = ''
}) => {
  const { toggleTheme, isDark } = useTheme();

  const sizeClasses = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  if (variant === 'minimal') {
    return (
      <button
        onClick={toggleTheme}
        className={`${sizeClasses[size]} rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors duration-200 ${className}`}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
        <motion.div
          initial={false}
          animate={{ rotate: isDark ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {isDark ? (
            <Sun size={iconSizes[size]} className="text-yellow-500" />
          ) : (
            <Moon size={iconSizes[size]} className="text-slate-600" />
          )}
        </motion.div>
      </button>
    );
  }

  if (variant === 'dropdown') {
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={toggleTheme}
          className={`${sizeClasses[size]} rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-center transition-all duration-200 shadow-sm`}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
          <motion.div
            initial={false}
            animate={{ scale: isDark ? 0.9 : 1 }}
            transition={{ duration: 0.2 }}
          >
            {isDark ? (
              <Moon size={iconSizes[size]} className="text-blue-400" />
            ) : (
              <Sun size={iconSizes[size]} className="text-amber-500" />
            )}
          </motion.div>
        </button>
        
        {showLabel && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded whitespace-nowrap"
          >
            {isDark ? 'Dark Mode' : 'Light Mode'}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900 dark:border-b-gray-100 text-gray-700"></div>
          </motion.div>
        )}
      </div>
    );
  }

  // Default button variant
  return (
    <motion.button
      onClick={toggleTheme}
      className={`
        relative ${sizeClasses[size]} rounded-lg
        bg-gradient-to-r from-blue-500 to-purple-600 dark:from-yellow-400 dark:to-orange-500
        hover:from-blue-600 hover:to-purple-700 dark:hover:from-yellow-500 dark:hover:to-orange-600
        text-white shadow-lg hover:shadow-xl
        transition-all duration-300 ease-in-out
        transform hover:scale-105 active:scale-95
        flex items-center justify-center
        ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <motion.div
        initial={false}
        animate={{ 
          rotate: isDark ? 180 : 0,
          scale: isDark ? 1.1 : 1 
        }}
        transition={{ 
          duration: 0.5, 
          ease: 'easeInOut',
          type: 'spring',
          stiffness: 200,
          damping: 20
        }}
      >
        {isDark ? (
          <Sun size={iconSizes[size]} className="drop-shadow-sm text-gray-700" />
        ) : (
          <Moon size={iconSizes[size]} className="drop-shadow-sm text-gray-700" />
        )}
      </motion.div>
      
      {/* Subtle glow effect */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-white opacity-0 text-gray-700"
        animate={{ opacity: isDark ? 0.1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};

// Advanced theme selector with system preference option
export const ThemeSelector: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { mode, setTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  const options = [
    { value: 'light' as const, label: 'Light', icon: Sun },
    { value: 'dark' as const, label: 'Dark', icon: Moon },
  ];

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        {mode === 'light' ? (
          <Sun size={16} className="text-amber-500" />
        ) : (
          <Moon size={16} className="text-blue-400" />
        )}
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {mode === 'light' ? 'Light' : 'Dark'}
        </span>
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          className="absolute top-full mt-2 right-0 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 text-gray-100"
        >
          {options.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => {
                setTheme(value);
                setIsOpen(false);
              }}
              className={`
                w-full flex items-center space-x-2 px-3 py-2 text-sm
                hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors
                ${mode === value ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}
                ${value === 'light' ? 'rounded-t-lg' : ''}
                ${value === 'dark' ? 'rounded-b-lg' : ''}
              `}
            >
              <Icon size={16} className={mode === value ? 'text-blue-500' : 'text-gray-400'} />
              <span>{label}</span>
              {mode === value && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-2 h-2 bg-blue-500 rounded-full ml-auto text-gray-700"
                />
              )}
            </button>
          ))}
        </motion.div>
      )}
      
      {isOpen && (
        <div
          className="fixed inset-0 z-40 text-gray-700"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ThemeToggle;