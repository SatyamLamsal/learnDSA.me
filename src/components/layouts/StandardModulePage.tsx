'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { EnhancedModuleLayout, EnhancedSection } from './EnhancedModuleLayout';

interface StandardModulePageProps {
  moduleId: string;
  moduleTitle: string;
  moduleDescription: string;
  moduleIcon: React.ComponentType<any>;
  sections: EnhancedSection[];
  estimatedTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  children: React.ReactNode;
  nextModuleUrl?: string;
  nextModuleTitle?: string;
  prevModuleUrl?: string;
  prevModuleTitle?: string;
}

export const StandardModulePage: React.FC<StandardModulePageProps> = ({
  moduleId,
  moduleTitle,
  moduleDescription,
  moduleIcon: ModuleIcon,
  sections,
  estimatedTime,
  difficulty,
  children,
  nextModuleUrl,
  nextModuleTitle,
  prevModuleUrl,
  prevModuleTitle,
}) => {
  return (
    <EnhancedModuleLayout
      moduleId={moduleId}
      moduleTitle={moduleTitle}
      moduleDescription={moduleDescription}
      sections={sections}
      estimatedTime={estimatedTime}
      difficulty={difficulty}
      totalSections={sections.length}
      currentPath={typeof window !== 'undefined' ? window.location.pathname : ''}
      showFullCourseStructure={true}
    >
      <div className="space-y-8 text-gray-700">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-8 rounded-2xl">
          <div className="flex items-center space-x-4 mb-4">
            <ModuleIcon className="w-12 h-12 text-white" />
            <div>
              <h1 className="text-4xl font-bold text-white">{moduleTitle}</h1>
              <p className="text-blue-100 text-lg">{moduleDescription}</p>
            </div>
          </div>
        </div>

        {/* Module Content */}
        {children}
        
        {/* Module Navigation Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex justify-between items-center mt-16 pt-8 border-t border-gray-200"
        >
          {prevModuleUrl ? (
            <Link
              href={prevModuleUrl}
              className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Previous: {prevModuleTitle}
            </Link>
          ) : (
            <Link
              href="/learning-path"
              className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Learning Path
            </Link>
          )}

          {nextModuleUrl ? (
            <Link
              href={nextModuleUrl}
              className="flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
            >
              Next: {nextModuleTitle}
              <ChevronRight className="w-6 h-6 ml-2" />
            </Link>
          ) : (
            <div className="flex items-center px-8 py-4 bg-gray-300 text-gray-500 rounded-xl font-semibold cursor-not-allowed">
              Course Complete!
            </div>
          )}
        </motion.div>
      </div>
    </EnhancedModuleLayout>
  );
};