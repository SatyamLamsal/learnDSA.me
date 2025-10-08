import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, BookOpen } from 'lucide-react';
import { ModuleProgressIndicator } from '@/components/progress/ModuleProgressIndicator';
import { ModuleBookmarkButton } from '@/components/bookmarks/ModuleBookmarkButton';

interface ModuleLayoutProps {
  children: React.ReactNode;
  moduleId: string;
  moduleTitle: string;
  moduleDescription: string;
  sections: Array<{
    id: string;
    name: string;
    icon: React.ComponentType<any>;
  }>;
  activeSection?: string;
  onSectionChange?: (sectionId: string) => void;
  backUrl?: string;
  nextUrl?: string;
  estimatedTime?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  totalSections?: number;
  currentSectionIndex?: number;
}

export const ModuleLayout: React.FC<ModuleLayoutProps> = ({
  children,
  moduleId,
  moduleTitle,
  moduleDescription,
  sections,
  activeSection,
  onSectionChange,
  backUrl = '/learning-path',
  nextUrl: _nextUrl,
  estimatedTime = '45 minutes',
  difficulty = 'Beginner',
  totalSections,
  currentSectionIndex = 0,
}) => {
  const scrollToSection = (sectionId: string) => {
    if (onSectionChange) {
      onSectionChange(sectionId);
    }
    // Scroll to top of the page first
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Small delay to ensure smooth transition
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600';
      case 'Intermediate': return 'text-yellow-600';
      case 'Advanced': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex text-white">
      {/* Left Sidebar Navigation */}
      <motion.div 
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-80 bg-white/95 backdrop-blur-lg border-r border-gray-200 shadow-xl sticky top-0 h-screen overflow-y-auto text-gray-700"
      >
        <div className="p-6 text-gray-700">
          {/* Module Header */}
          <div className="mb-8 text-gray-700">
            <Link href={backUrl} className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-4 text-sm">
              <ArrowLeft className="w-4 h-4 mr-2 text-gray-700" />
              Back to Learning Path
            </Link>
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-3">
              <BookOpen className="w-4 h-4 mr-2 text-gray-700" />
              {moduleTitle}
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Navigation</h2>
            <p className="text-gray-600 text-sm mt-1">{moduleDescription}</p>
          </div>

          {/* Navigation Pills */}
          <div className="space-y-2 mb-8 text-gray-700">
            {sections.map((section, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onClick={() => scrollToSection(section.id)}
                className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center group ${
                  activeSection === section.id
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:scale-102'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <section.icon className="w-5 h-5 mr-3 flex-shrink-0 text-gray-700" />
                <span className="text-sm leading-tight text-gray-600">{section.name}</span>
                {activeSection === section.id && (
                  <ChevronRight className="w-4 h-4 ml-auto text-gray-700" />
                )}
              </motion.button>
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 text-black">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Module Progress</h3>
            <ModuleProgressIndicator moduleId={moduleId} />
            <p className="text-xs text-gray-600 mt-2">
              Section {currentSectionIndex + 1} of {totalSections || sections.length}
            </p>
          </div>

          {/* Bookmark Button */}
          <div className="mb-6 text-gray-700">
            <ModuleBookmarkButton
              moduleId={moduleId}
              moduleUrl={`/learning-path/${moduleId}`}
            />
          </div>

          {/* Module Stats */}
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 text-gray-700">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Module Stats</h3>
            <div className="space-y-1 text-xs text-gray-600">
              <div className="flex justify-between text-gray-700">
                <span>Total Sections:</span>
                <span className="font-medium text-gray-600">{totalSections || sections.length}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Estimated Time:</span>
                <span className="font-medium text-gray-600">{estimatedTime}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Difficulty:</span>
                <span className={`font-medium ${getDifficultyColor(difficulty)}`}>
                  {difficulty}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden text-gray-700">
        <div className="container mx-auto px-4 py-12 text-gray-700">
          {children}
        </div>
      </div>
    </div>
  );
};