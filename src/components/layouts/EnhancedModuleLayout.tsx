'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ChevronRight, 
  ChevronDown,
  BookOpen, 
  Clock,
  CheckCircle,
  Circle,
  PlayCircle,
  FileText,
  Code,
  Brain,
  Zap,
  BarChart3,
  Layers,
  Target,
  Grid3X3,
  Network,
  Database,
  MemoryStick,
  Code2,
  Menu,
  X
} from 'lucide-react';
import { ModuleProgressIndicator } from '@/components/progress/ModuleProgressIndicator';
import { ModuleBookmarkButton } from '@/components/bookmarks/ModuleBookmarkButton';
import { useScrollSpy } from '@/hooks/useScrollSpy';

// Enhanced section interface with nested structure
export interface EnhancedSection {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  href?: string;
  description?: string;
  duration?: string;
  type?: 'lesson' | 'practice' | 'quiz' | 'simulation';
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  isCompleted?: boolean;
  subsections?: Array<{
    id: string;
    name: string;
    href: string;
    duration?: string;
    type?: 'theory' | 'practice' | 'simulation' | 'quiz';
    isCompleted?: boolean;
  }>;
  isExpanded?: boolean;
}

// Full course structure interface
export interface CourseModule {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  href: string;
  isCurrentModule?: boolean;
  sections?: EnhancedSection[];
}

interface EnhancedModuleLayoutProps {
  children: React.ReactNode;
  moduleId: string;
  moduleTitle: string;
  moduleDescription: string;
  sections: EnhancedSection[];
  activeSection?: string;
  onSectionChange?: (sectionId: string) => void;
  backUrl?: string;
  nextUrl?: string;
  estimatedTime?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  totalSections?: number;
  currentPath?: string; // Current page path to highlight active section
  enableScrollSpy?: boolean;
  showFullCourseStructure?: boolean; // Show complete course hierarchy
  courseModules?: CourseModule[]; // Full course structure
}

export const EnhancedModuleLayout: React.FC<EnhancedModuleLayoutProps> = ({
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
  currentPath,
  enableScrollSpy = false,
  showFullCourseStructure = false,
  courseModules = [],
}) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  // Handle screen size changes
  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  // Create course structure with current module marked - memoized to prevent re-creation
  const defaultCourseModules = useMemo((): CourseModule[] => [
    {
      id: 'foundations',
      name: 'Foundations of DSA',
      icon: Brain,
      href: '/learning-path/foundations',
      isCurrentModule: moduleId === 'foundations',
      sections: [
        { id: 'introduction', name: 'Introduction to DSA', icon: BookOpen, href: '/learning-path/foundations/introduction', description: 'Why Study DSA?', duration: '10 min' },
        { id: 'data-structures', name: 'Data Structures', icon: FileText, href: '/learning-path/foundations/data-structures', description: 'Data vs Information', duration: '15 min' },
        { id: 'algorithms', name: 'Algorithms', icon: Code, href: '/learning-path/foundations/algorithms', description: 'Step-by-step procedures', duration: '20 min' },
        { id: 'complexity', name: 'Complexity Analysis', icon: BarChart3, href: '/learning-path/foundations/complexity', description: 'Big O notation', duration: '25 min' },
        { id: 'adt', name: 'Abstract Data Types', icon: Brain, href: '/learning-path/foundations/adt', description: 'Mathematical models', duration: '20 min' },
      ]
    },
    {
      id: 'module-1',
      name: 'Memory & Efficiency',
      icon: Zap,
      href: '/learning-path/module-1',
      isCurrentModule: moduleId === 'module-1',
      sections: [
        { id: 'memory-hierarchy', name: 'Memory Hierarchy', icon: Layers, href: '/learning-path/module-1/memory-hierarchy', description: 'Cache levels and access patterns', duration: '25 min' },
        { id: 'data-structures', name: 'Data Structures Overview', icon: Database, href: '/learning-path/module-1/data-structures', description: 'Why different structures exist', duration: '30 min' },
        { id: 'performance', name: 'Performance Impact', icon: Clock, href: '/learning-path/module-1/performance', description: 'How structures affect speed', duration: '20 min' },
        { id: 'efficiency', name: 'Efficiency Principles', icon: Target, href: '/learning-path/module-1/efficiency', description: 'Optimization fundamentals', duration: '18 min' },
      ]
    },
    {
      id: 'module-2',
      name: 'Arrays & Memory Fundamentals',
      icon: Grid3X3,
      href: '/learning-path/module-2',
      isCurrentModule: moduleId === 'module-2',
      sections: [
        { id: 'fundamentals', name: 'Array Fundamentals', icon: BookOpen, href: '/learning-path/module-2/fundamentals', description: 'Theory, types, and definitions', duration: '20 min' },
        { id: 'memory', name: 'Memory Layout', icon: MemoryStick, href: '/learning-path/module-2/memory', description: 'How arrays are stored in memory', duration: '20 min' },
        { id: 'operations', name: 'Basic Operations', icon: Code2, href: '/learning-path/module-2/operations', description: 'Array insertion, deletion, access', duration: '25 min' },
        { id: 'algorithms', name: 'Array Algorithms', icon: Brain, href: '/learning-path/module-2/algorithms', description: 'Advanced array techniques', duration: '30 min' },
      ]
    },
    {
      id: 'module-3',
      name: 'Advanced Structures',
      icon: Network,
      href: '/learning-path/module-3',
      isCurrentModule: moduleId === 'module-3'
    }
  ], [moduleId]);

  // Memoize course modules to prevent infinite re-renders
  const finalCourseModules = useMemo(() => {
    return courseModules.length > 0 ? courseModules : defaultCourseModules;
  }, [courseModules, moduleId]);
  
  // Initialize expanded sections based on current path - Only run once or when currentPath changes
  React.useEffect(() => {
    if (!currentPath) return;
    
    const expandedSecs = new Set<string>();
    const expandedMods = new Set<string>();
    
    // Check sections for subsections
    sections.forEach(section => {
      if (section.subsections?.some(sub => currentPath.includes(sub.href))) {
        expandedSecs.add(section.id);
      }
    });
    
    // Auto-expand current module and related modules
    defaultCourseModules.forEach(module => {
      if (moduleId === module.id || currentPath.includes(module.href)) {
        expandedMods.add(module.id);
      }
    });
    
    setExpandedSections(expandedSecs);
    setExpandedModules(expandedMods);
  }, [currentPath, moduleId]); // Remove sections and finalCourseModules from dependencies

  // Derive active section if scroll spy is enabled
  const sectionIds = useMemo(() => sections.map(s => s.id), [sections]);
  const spiedActive = useScrollSpy(enableScrollSpy && !activeSection ? sectionIds : []);
  const resolvedActive = activeSection || (enableScrollSpy && !activeSection ? spiedActive : null) || sections[0]?.id;

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  const scrollToSection = (sectionId: string) => {
    if (onSectionChange) onSectionChange(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type?: string) => {
    switch (type) {
      case 'theory': return FileText;
      case 'practice': return Code;
      case 'simulation': return PlayCircle;
      case 'quiz': return Brain;
      default: return Circle;
    }
  };

  const getTypeColor = (type?: string) => {
    switch (type) {
      case 'theory': return 'text-blue-600';
      case 'practice': return 'text-green-600';
      case 'simulation': return 'text-purple-600';
      case 'quiz': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  // Calculate overall progress
  const totalItems = sections.reduce((acc, section) => {
    return acc + 1 + (section.subsections?.length || 0);
  }, 0);
  
  const completedItems = sections.reduce((acc, section) => {
    let completed = section.isCompleted ? 1 : 0;
    if (section.subsections) {
      completed += section.subsections.filter(sub => sub.isCompleted).length;
    }
    return acc + completed;
  }, 0);

  const progressPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex relative">
      {/* Tablet/Mobile Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-2 shadow-lg hover:bg-white transition-colors"
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile/Tablet Overlay */}
      <AnimatePresence>
        {isSidebarOpen && !isLargeScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Enhanced Left Sidebar Navigation */}
      <motion.div 
        initial={{ x: isLargeScreen ? -300 : -400, opacity: 0 }}
        animate={{ 
          x: isLargeScreen ? 0 : (isSidebarOpen ? 0 : -400), 
          opacity: 1
        }}
        transition={{ duration: isLargeScreen ? 0.8 : 0.3 }}
        className={`
          bg-white/98 backdrop-blur-lg border-r border-gray-200 shadow-xl h-screen overflow-y-auto z-50
          lg:w-96 lg:sticky lg:top-0
          md:w-80 md:fixed md:top-0 md:left-0
          sm:w-72 sm:fixed sm:top-0 sm:left-0
          ${isLargeScreen ? 'relative' : 'fixed'}
        `}
      >
        <div className="p-6">
          {/* Module Header */}
          <div className="mb-8">
            <Link href={backUrl} className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-4 text-sm transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Learning Path
            </Link>
            
            <div className="mb-4">
              <div className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-3">
                <BookOpen className="w-4 h-4 mr-2" />
                {moduleTitle}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Navigation</h2>
              <p className="text-gray-600 text-sm">{moduleDescription}</p>
            </div>

            {/* Progress Overview */}
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-xl border border-indigo-200 mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-indigo-900 font-semibold text-sm">Overall Progress</span>
                <span className="text-indigo-700 font-bold text-sm">{progressPercentage}%</span>
              </div>
              <div className="w-full bg-white rounded-full h-2 mb-3">
                <motion.div 
                  className="bg-gradient-to-r from-indigo-500 to-blue-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-indigo-700">
                <span>{completedItems} of {totalItems} completed</span>
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {estimatedTime}
                </div>
              </div>
            </div>
          </div>

          {/* Full Course Structure Navigation */}
          <div className="space-y-2">
            {showFullCourseStructure ? (
              // Show complete course hierarchy
              finalCourseModules.map((module, moduleIndex) => {
                const isCurrentModule = module.isCurrentModule;
                const isModuleExpanded = expandedModules.has(module.id);
                const hasModuleSections = module.sections && module.sections.length > 0;

                return (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: moduleIndex * 0.1, duration: 0.5 }}
                    className="relative"
                  >
                    <div className="flex items-center">
                      {/* Module Header */}
                      <div className="flex-1">
                        <Link 
                          href={module.href}
                          className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center group ${
                            isCurrentModule
                              ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg border-2 border-indigo-300'
                              : 'bg-gray-100 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 border border-gray-200'
                          }`}
                        >
                          <module.icon className={`w-6 h-6 mr-3 flex-shrink-0 ${isCurrentModule ? 'text-white' : 'text-gray-600'}`} />
                          <span className={`text-sm font-bold leading-tight ${isCurrentModule ? 'text-white' : 'text-gray-800'}`}>
                            {module.name}
                          </span>
                          {isCurrentModule && (
                            <span className="ml-auto text-xs bg-white/20 px-2 py-1 rounded-full text-white">
                              Current
                            </span>
                          )}
                        </Link>
                      </div>

                      {/* Expand/Collapse Button for modules with sections */}
                      {hasModuleSections && (
                        <button
                          onClick={() => toggleModule(module.id)}
                          className="ml-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <ChevronDown 
                            className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                              isModuleExpanded ? 'rotate-180' : ''
                            }`} 
                          />
                        </button>
                      )}
                    </div>

                    {/* Module Sections */}
                    {hasModuleSections && (
                      <AnimatePresence>
                        {isModuleExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="ml-8 mt-2 border-l-2 border-indigo-200 pl-4 space-y-1"
                          >
                            {module.sections!.map((section, sectionIndex) => {
                              const isSectionActive = currentPath?.includes(section.href || '');

                              return (
                                <motion.div
                                  key={section.id}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: sectionIndex * 0.05, duration: 0.3 }}
                                >
                                  <Link
                                    href={section.href || '#'}
                                    className={`flex items-center px-3 py-2 rounded-lg text-sm transition-all duration-200 group ${
                                      isSectionActive
                                        ? 'bg-indigo-500 text-white shadow-md'
                                        : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-700'
                                    }`}
                                  >
                                    <section.icon className={`w-4 h-4 mr-3 ${
                                      isSectionActive ? 'text-white' : 'text-gray-500'
                                    }`} />
                                    <div className="flex-1 min-w-0">
                                      <div className={`font-medium ${isSectionActive ? 'text-white' : 'text-gray-800'}`}>
                                        {section.name}
                                      </div>
                                      {section.description && (
                                        <div className={`text-xs mt-0.5 ${
                                          isSectionActive ? 'text-indigo-100' : 'text-gray-500'
                                        }`}>
                                          {section.description}
                                        </div>
                                      )}
                                    </div>
                                    
                                    <div className="flex items-center ml-2">
                                      {section.duration && (
                                        <span className={`text-xs mr-2 ${
                                          isSectionActive ? 'text-indigo-100' : 'text-gray-500'
                                        }`}>
                                          {section.duration}
                                        </span>
                                      )}
                                      {section.isCompleted ? (
                                        <CheckCircle className={`w-4 h-4 ${
                                          isSectionActive ? 'text-green-300' : 'text-green-500'
                                        }`} />
                                      ) : (
                                        <Circle className={`w-4 h-4 ${
                                          isSectionActive ? 'text-white' : 'text-gray-400'
                                        }`} />
                                      )}
                                    </div>
                                  </Link>
                                </motion.div>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </motion.div>
                );
              })
            ) : (
              // Show current module navigation only
              sections.map((section, index) => {
                const isActive = resolvedActive === section.id || currentPath?.includes(section.href || '');
                const isExpanded = expandedSections.has(section.id);
                const hasSubsections = section.subsections && section.subsections.length > 0;

                return (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="relative"
                  >
                    <div className="flex items-center">
                      {/* Main Section Button/Link */}
                      <div className="flex-1">
                        {section.href ? (
                          <Link 
                            href={section.href}
                            className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center group ${
                              isActive
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                                : 'bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:scale-102'
                            }`}
                          >
                            <div className="flex items-center flex-1">
                              <section.icon className={`w-5 h-5 mr-3 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                              <div className="flex-1 min-w-0">
                                <div className={`text-sm font-semibold leading-tight ${isActive ? 'text-white' : 'text-gray-800'}`}>
                                  {section.name}
                                </div>
                                {section.description && (
                                  <div className={`text-xs leading-tight mt-1 ${isActive ? 'text-blue-100' : 'text-gray-500'}`}>
                                    {section.description}
                                  </div>
                                )}
                                <div className={`flex items-center mt-1 text-xs ${isActive ? 'text-blue-100' : 'text-gray-500'}`}>
                                  {section.duration && (
                                    <div className="flex items-center mr-3">
                                      <Clock className="w-3 h-3 mr-1" />
                                      {section.duration}
                                    </div>
                                  )}
                                  {section.difficulty && (
                                    <span className={`px-2 py-0.5 rounded text-xs ${
                                      isActive ? 'bg-white/20 text-white' : getDifficultyColor(section.difficulty)
                                    }`}>
                                      {section.difficulty}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center ml-2">
                                {section.isCompleted && (
                                  <CheckCircle className={`w-4 h-4 mr-2 ${isActive ? 'text-green-300' : 'text-green-500'}`} />
                                )}
                                {section.type && (
                                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                                    isActive ? 'bg-white/20' : 'bg-gray-200'
                                  }`}>
                                    {React.createElement(getTypeIcon(section.type), { 
                                      className: `w-3 h-3 ${isActive ? 'text-white' : getTypeColor(section.type)}` 
                                    })}
                                  </div>
                                )}
                              </div>
                            </div>
                          </Link>
                        ) : (
                          <button
                            onClick={() => scrollToSection(section.id)}
                            className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center group ${
                              isActive
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                                : 'bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:scale-102'
                            }`}
                          >
                            <section.icon className={`w-5 h-5 mr-3 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                            <span className={`text-sm leading-tight flex-1 ${isActive ? 'text-white' : 'text-gray-700'}`}>
                              {section.name}
                            </span>
                            {section.isCompleted && (
                              <CheckCircle className={`w-4 h-4 ${isActive ? 'text-green-300' : 'text-green-500'}`} />
                            )}
                          </button>
                        )}
                      </div>

                      {/* Expand/Collapse Button for sections with subsections */}
                      {hasSubsections && (
                        <button
                          onClick={() => toggleSection(section.id)}
                          className="ml-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <ChevronDown 
                            className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180' : ''
                            }`} 
                          />
                        </button>
                      )}
                    </div>

                    {/* Subsections */}
                    {hasSubsections && (
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="ml-6 mt-2 border-l-2 border-gray-200 pl-4 space-y-1"
                          >
                            {section.subsections!.map((subsection, subIndex) => {
                              const isSubActive = currentPath?.includes(subsection.href);
                              const TypeIcon = getTypeIcon(subsection.type);

                              return (
                                <motion.div
                                  key={subsection.id}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: subIndex * 0.05, duration: 0.3 }}
                                >
                                  <Link
                                    href={subsection.href}
                                    className={`flex items-center px-3 py-2 rounded-lg text-sm transition-all duration-200 group ${
                                      isSubActive
                                        ? 'bg-blue-500 text-white shadow-md'
                                        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700'
                                    }`}
                                  >
                                    <TypeIcon className={`w-4 h-4 mr-2 ${
                                      isSubActive ? 'text-white' : getTypeColor(subsection.type)
                                    }`} />
                                    <span className="flex-1">{subsection.name}</span>
                                    
                                    <div className="flex items-center ml-2">
                                      {subsection.duration && (
                                        <span className={`text-xs mr-2 ${
                                          isSubActive ? 'text-blue-100' : 'text-gray-500'
                                        }`}>
                                          {subsection.duration}
                                        </span>
                                      )}
                                      {subsection.isCompleted ? (
                                        <CheckCircle className={`w-4 h-4 ${
                                          isSubActive ? 'text-green-300' : 'text-green-500'
                                        }`} />
                                      ) : (
                                        <Circle className={`w-4 h-4 ${
                                          isSubActive ? 'text-white' : 'text-gray-400'
                                        }`} />
                                      )}
                                    </div>
                                  </Link>
                                </motion.div>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </motion.div>
                );
              })
            )}
          </div>

          {/* Progress Indicator */}
          <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Module Progress</h3>
            <ModuleProgressIndicator moduleId={moduleId} />
            <p className="text-xs text-gray-600 mt-2">
              Section {sections.findIndex(s => s.id === resolvedActive) + 1} of {totalSections || sections.length}
            </p>
          </div>

          {/* Bookmark Button */}
          <div className="mt-4">
            <ModuleBookmarkButton
              moduleId={moduleId}
              moduleUrl={`/learning-path/${moduleId}`}
            />
          </div>

          {/* Module Stats */}
          <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Module Stats</h3>
            <div className="space-y-1 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Total Sections:</span>
                <span className="font-medium text-gray-700">{totalSections || sections.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Time:</span>
                <span className="font-medium text-gray-700">{estimatedTime}</span>
              </div>
              <div className="flex justify-between">
                <span>Difficulty:</span>
                <span className={`font-medium ${getDifficultyColor(difficulty).split(' ')[0]}`}>
                  {difficulty}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Progress:</span>
                <span className="font-medium text-gray-700">{progressPercentage}%</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden lg:ml-0 md:ml-0 sm:ml-0">
        <div className="container mx-auto px-4 py-12 lg:py-12 md:py-16 sm:py-16">
          {children}
        </div>
      </div>
    </div>
  );
};