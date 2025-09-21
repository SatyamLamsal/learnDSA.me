'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, Code, Play, BookOpen } from 'lucide-react';

// Base Loading Spinner
export const LoadingSpinner: React.FC<{ 
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <Loader2 
      className={`animate-spin text-blue-600 ${sizeClasses[size]} ${className}`} 
    />
  );
};

// Full Page Loading
export const PageLoader: React.FC<{ message?: string }> = ({ 
  message = 'Loading...' 
}) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
    <div className="text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="mb-4"
      >
        <Code className="h-16 w-16 text-blue-600 mx-auto" />
      </motion.div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        {message}
      </h2>
      <p className="text-gray-600">Please wait while we prepare your content...</p>
    </div>
  </div>
);

// Simulation Loading
export const SimulationLoader: React.FC<{ message?: string }> = ({ 
  message = 'Initializing simulation...' 
}) => (
  <div className="bg-white rounded-lg shadow-lg p-8 text-center">
    <motion.div
      animate={{ 
        scale: [1, 1.1, 1],
        opacity: [0.7, 1, 0.7]
      }}
      transition={{ 
        duration: 1.5, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
      className="mb-4"
    >
      <Play className="h-12 w-12 text-green-600 mx-auto" />
    </motion.div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">
      {message}
    </h3>
    <div className="flex items-center justify-center space-x-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
          }}
          className="w-2 h-2 bg-green-600 rounded-full"
        />
      ))}
    </div>
  </div>
);

// Content Loading
export const ContentLoader: React.FC<{ 
  type?: 'theory' | 'simulation' | 'algorithm';
  message?: string;
}> = ({ type = 'theory', message }) => {
  const getIcon = () => {
    switch (type) {
      case 'theory': return BookOpen;
      case 'simulation': return Play;
      case 'algorithm': return Code;
      default: return BookOpen;
    }
  };

  const Icon = getIcon();
  const defaultMessage = {
    theory: 'Loading theory content...',
    simulation: 'Loading simulation...',
    algorithm: 'Loading algorithm...',
  }[type];

  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mb-4"
        >
          <Icon className="h-10 w-10 text-blue-600 mx-auto" />
        </motion.div>
        <p className="text-gray-600 font-medium">
          {message || defaultMessage}
        </p>
      </div>
    </div>
  );
};

// Skeleton Components
export const SkeletonBox: React.FC<{ 
  className?: string;
  animate?: boolean;
}> = ({ className = '', animate = true }) => (
  <div 
    className={`bg-gray-200 rounded ${animate ? 'animate-pulse' : ''} ${className}`}
  />
);

export const SkeletonText: React.FC<{ 
  lines?: number;
  className?: string;
}> = ({ lines = 1, className = '' }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <SkeletonBox 
        key={i}
        className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}
      />
    ))}
  </div>
);

// Page Skeleton
export const PageSkeleton: React.FC = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="container mx-auto px-4 py-12">
      {/* Header Skeleton */}
      <div className="mb-12">
        <SkeletonBox className="h-12 w-1/2 mb-4" />
        <SkeletonBox className="h-6 w-3/4 mb-2" />
        <SkeletonBox className="h-6 w-1/2" />
      </div>

      {/* Content Grid Skeleton */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <SkeletonBox className="h-8 w-1/2 mb-6" />
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i}>
                  <SkeletonBox className="h-10 w-full mb-2" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <SkeletonBox className="h-8 w-1/3 mb-6" />
            <SkeletonBox className="h-64 w-full mb-6" />
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonBox key={i} className="h-16 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Card Skeleton
export const CardSkeleton: React.FC<{ count?: number }> = ({ count = 1 }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="bg-white rounded-lg shadow-lg p-6">
        <SkeletonBox className="h-12 w-12 mb-4" />
        <SkeletonBox className="h-6 w-2/3 mb-2" />
        <SkeletonText lines={3} />
      </div>
    ))}
  </>
);

// Navigation Skeleton
export const NavigationSkeleton: React.FC = () => (
  <div className="bg-white border-b border-gray-200">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between py-4">
        <SkeletonBox className="h-8 w-32" />
        <div className="flex items-center space-x-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonBox key={i} className="h-8 w-20" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Algorithm Visualization Skeleton
export const VisualizationSkeleton: React.FC = () => (
  <div className="bg-white rounded-lg shadow-lg p-8">
    <SkeletonBox className="h-8 w-1/3 mb-6 mx-auto" />
    
    {/* Controls */}
    <div className="flex justify-center space-x-4 mb-8">
      {Array.from({ length: 3 }).map((_, i) => (
        <SkeletonBox key={i} className="h-10 w-24" />
      ))}
    </div>

    {/* Main Visualization Area */}
    <SkeletonBox className="h-64 w-full mb-6" />

    {/* Stats/Info */}
    <div className="grid grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="text-center">
          <SkeletonBox className="h-6 w-3/4 mx-auto mb-2" />
          <SkeletonBox className="h-4 w-1/2 mx-auto" />
        </div>
      ))}
    </div>
  </div>
);

// Loading Button
export const LoadingButton: React.FC<{
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger';
}> = ({ 
  loading = false, 
  children, 
  onClick, 
  disabled = false,
  className = '',
  variant = 'primary'
}) => {
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {loading && <LoadingSpinner size="sm" className="mr-2" />}
      {children}
    </button>
  );
};

export default {
  LoadingSpinner,
  PageLoader,
  SimulationLoader,
  ContentLoader,
  SkeletonBox,
  SkeletonText,
  PageSkeleton,
  CardSkeleton,
  NavigationSkeleton,
  VisualizationSkeleton,
  LoadingButton,
};