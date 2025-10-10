'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  ChevronRight, 
  CheckCircle, 
  Circle, 
  Clock, 
  Star,
  BookOpen,
  Database,
  Code,
  Brain,
  Zap,
  Target,
  Layers,
  TrendingUp,
  BarChart3,
  Search,
  FileText,
  PlayCircle,
  Gauge,
  Users,
  Award
} from 'lucide-react';

// TypeScript interfaces for course structure
interface Subsection {
  name: string;
  href: string;
  duration: string;
  type: 'theory' | 'simulation' | 'practice' | 'quiz';
}

interface Section {
  id: string;
  name: string;
  href: string;
  duration: string;
  type: 'theory' | 'simulation' | 'practice' | 'quiz';
  isCompleted: boolean;
  subsections?: Subsection[];
}

interface Module {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  href: string;
  isCompleted: boolean;
  sections: Section[];
}

// Full course structure with nested hierarchy
const courseStructure: Module[] = [
  {
    id: 'foundations',
    title: 'Foundations of DSA',
    description: 'Build your algorithmic thinking foundation',
    icon: BookOpen,
    duration: '90 min',
    difficulty: 'Beginner' as const,
    href: '/learning-path/foundations',
    isCompleted: true,
    sections: [
      {
        id: 'introduction',
        name: 'Introduction to DSA',
        href: '/learning-path/foundations/introduction',
        duration: '10 min',
        type: 'theory' as const,
        isCompleted: true
      },
      {
        id: 'data-structures-intro',
        name: 'Data Structures Overview',  
        href: '/learning-path/foundations/data-structures',
        duration: '15 min',
        type: 'theory' as const,
        isCompleted: true
      },
      {
        id: 'algorithms-intro',
        name: 'Algorithms Overview',
        href: '/learning-path/foundations/algorithms',
        duration: '20 min', 
        type: 'theory' as const,
        isCompleted: false
      },
      {
        id: 'complexity',
        name: 'Complexity Analysis',
        href: '/learning-path/foundations/complexity',
        duration: '25 min',
        type: 'theory' as const,
        isCompleted: false
      },
      {
        id: 'adt',
        name: 'Abstract Data Types',
        href: '/learning-path/foundations/adt',
        duration: '20 min',
        type: 'theory' as const,
        isCompleted: false
      }
    ]
  },
  {
    id: 'module-1',
    title: 'Memory & Efficiency',
    description: 'Understand why data structures matter through memory systems',
    icon: Layers,
    duration: '90 min',
    difficulty: 'Beginner' as const,
    href: '/learning-path/module-1',
    isCompleted: false,
    sections: [
      {
        id: 'memory-hierarchy',
        name: 'Memory Hierarchy',
        href: '/learning-path/module-1/memory-hierarchy',
        duration: '25 min',
        type: 'theory' as const,
        isCompleted: false,
        subsections: [
          { name: 'Memory Systems Theory', href: '/learning-path/module-1/memory-hierarchy/theory', duration: '12 min', type: 'theory' as const },
          { name: 'Interactive Memory Demo', href: '/learning-path/module-1/memory-hierarchy/simulation', duration: '8 min', type: 'simulation' as const },
          { name: 'Memory Analysis Exercise', href: '/learning-path/module-1/memory-hierarchy/practice', duration: '5 min', type: 'practice' as const }
        ]
      },
      {
        id: 'performance',
        name: 'Performance Impact',
        href: '/learning-path/module-1/performance',
        duration: '20 min',
        type: 'theory' as const,
        isCompleted: false,
        subsections: [
          { name: 'Access Pattern Theory', href: '/learning-path/module-1/performance/theory', duration: '10 min', type: 'theory' as const },
          { name: 'Performance Benchmarks', href: '/learning-path/module-1/performance/simulation', duration: '10 min', type: 'simulation' as const }
        ]
      },
      {
        id: 'data-structures',
        name: 'Why Data Structures?',
        href: '/learning-path/module-1/data-structures',  
        duration: '25 min',
        type: 'theory' as const,
        isCompleted: false,
        subsections: [
          { name: 'Data Structure Fundamentals', href: '/learning-path/module-1/data-structures/introduction', duration: '15 min', type: 'theory' as const },
          { name: 'Structure Comparison Tool', href: '/learning-path/module-1/data-structures/comparison', duration: '10 min', type: 'simulation' as const }
        ]
      },
      {
        id: 'efficiency',
        name: 'Efficiency Principles',
        href: '/learning-path/module-1/efficiency',
        duration: '20 min',
        type: 'theory' as const,
        isCompleted: false,
        subsections: [
          { name: 'Big O Notation Basics', href: '/learning-path/module-1/efficiency/theory', duration: '12 min', type: 'theory' as const },
          { name: 'Complexity Analysis Practice', href: '/learning-path/module-1/efficiency/practice', duration: '8 min', type: 'practice' as const }
        ]
      }
    ]
  },
  {
    id: 'module-2',
    title: 'Arrays & Linear Structures',
    description: 'Master arrays, strings, stacks, queues, and linked lists',
    icon: Database,
    duration: '2-3 weeks',
    difficulty: 'Beginner' as const,
    href: '/learning-path/module-2',
    isCompleted: false,
    sections: [
      {
        id: 'arrays',
        name: 'Arrays & Dynamic Arrays',
        href: '/learning-path/module-2/arrays',
        duration: '45 min',
        type: 'theory' as const,
        isCompleted: false,
        subsections: [
          { name: 'Array Fundamentals', href: '/learning-path/module-2/arrays/theory', duration: '20 min', type: 'theory' as const },
          { name: 'Array Operations Demo', href: '/learning-path/module-2/arrays/simulation', duration: '15 min', type: 'simulation' as const },
          { name: 'Array Problems Practice', href: '/learning-path/module-2/arrays/practice', duration: '10 min', type: 'practice' as const }
        ]
      },
      {
        id: 'strings',
        name: 'String Manipulation',
        href: '/learning-path/module-2/strings',
        duration: '40 min',
        type: 'theory' as const,
        isCompleted: false,
        subsections: [
          { name: 'String Algorithms', href: '/learning-path/module-2/strings/theory', duration: '25 min', type: 'theory' as const },
          { name: 'Pattern Matching Demo', href: '/learning-path/module-2/strings/simulation', duration: '15 min', type: 'simulation' as const }
        ]
      },
      {
        id: 'stacks',
        name: 'Stacks (LIFO)',
        href: '/learning-path/module-2/stacks',
        duration: '35 min',
        type: 'theory' as const,
        isCompleted: false,
        subsections: [
          { name: 'Stack Theory & Implementation', href: '/learning-path/module-2/stacks/theory', duration: '20 min', type: 'theory' as const },
          { name: 'Stack Applications', href: '/learning-path/module-2/stacks/applications', duration: '15 min', type: 'practice' as const }
        ]
      },
      {
        id: 'queues',
        name: 'Queues (FIFO)',
        href: '/learning-path/module-2/queues',
        duration: '35 min',
        type: 'theory' as const,
        isCompleted: false,
        subsections: [
          { name: 'Queue Implementation', href: '/learning-path/module-2/queues/theory', duration: '20 min', type: 'theory' as const },
          { name: 'Priority Queue Demo', href: '/learning-path/module-2/queues/simulation', duration: '15 min', type: 'simulation' as const }
        ]
      },
      {
        id: 'linked-lists',
        name: 'Linked Lists',
        href: '/learning-path/module-2/linked-lists',
        duration: '50 min',
        type: 'theory' as const,
        isCompleted: false,
        subsections: [
          { name: 'Linked List Theory', href: '/learning-path/module-2/linked-lists/theory', duration: '25 min', type: 'theory' as const },
          { name: 'Interactive Linked List', href: '/learning-path/module-2/linked-lists/simulation', duration: '15 min', type: 'simulation' as const },
          { name: 'Linked List Problems', href: '/learning-path/module-2/linked-lists/practice', duration: '10 min', type: 'practice' as const }
        ]
      }
    ]
  },
  {
    id: 'module-3',
    title: 'Trees & Hierarchical Data',
    description: 'Binary trees, BSTs, heaps, and tree traversals',
    icon: Brain,
    duration: '3-4 weeks',
    difficulty: 'Intermediate' as const,
    href: '/learning-path/module-3',
    isCompleted: false,
    sections: [
      {
        id: 'binary-trees',
        name: 'Binary Trees',
        href: '/learning-path/module-3/binary-trees',
        duration: '60 min',
        type: 'theory' as const,
        isCompleted: false,
        subsections: [
          { name: 'Tree Fundamentals', href: '/learning-path/module-3/binary-trees/theory', duration: '30 min', type: 'theory' as const },
          { name: 'Tree Visualization', href: '/learning-path/module-3/binary-trees/simulation', duration: '20 min', type: 'simulation' as const },
          { name: 'Tree Traversal Practice', href: '/learning-path/module-3/binary-trees/practice', duration: '10 min', type: 'practice' as const }
        ]
      },
      {
        id: 'bst',
        name: 'Binary Search Trees',
        href: '/learning-path/module-3/bst',
        duration: '50 min',
        type: 'theory' as const,
        isCompleted: false,
        subsections: [
          { name: 'BST Operations', href: '/learning-path/module-3/bst/theory', duration: '30 min', type: 'theory' as const },
          { name: 'BST Interactive Demo', href: '/learning-path/module-3/bst/simulation', duration: '20 min', type: 'simulation' as const }
        ]
      },
      {
        id: 'heaps',
        name: 'Heaps & Priority Queues',
        href: '/learning-path/module-3/heaps',
        duration: '45 min',
        type: 'theory' as const,
        isCompleted: false,
        subsections: [
          { name: 'Heap Theory', href: '/learning-path/module-3/heaps/theory', duration: '25 min', type: 'theory' as const },
          { name: 'Heap Operations Demo', href: '/learning-path/module-3/heaps/simulation', duration: '20 min', type: 'simulation' as const }
        ]
      }
    ]
  },
  {
    id: 'module-4',
    title: 'Hash Tables & Advanced Structures',
    description: 'Hash tables, graphs, and advanced data structures',
    icon: Zap,
    duration: '3-4 weeks', 
    difficulty: 'Advanced' as const,
    href: '/learning-path/module-4',
    isCompleted: false,
    sections: [
      {
        id: 'hash-tables',
        name: 'Hash Tables',
        href: '/learning-path/module-4/hash-tables',
        duration: '55 min',
        type: 'theory' as const,
        isCompleted: false,
        subsections: [
          { name: 'Hashing Theory', href: '/learning-path/module-4/hash-tables/theory', duration: '30 min', type: 'theory' as const },
          { name: 'Hash Function Demo', href: '/learning-path/module-4/hash-tables/simulation', duration: '25 min', type: 'simulation' as const }
        ]
      },
      {
        id: 'graphs',
        name: 'Graph Theory & Algorithms',
        href: '/learning-path/module-4/graphs',
        duration: '90 min',
        type: 'theory' as const,
        isCompleted: false,
        subsections: [
          { name: 'Graph Fundamentals', href: '/learning-path/module-4/graphs/theory', duration: '40 min', type: 'theory' as const },
          { name: 'Graph Visualization', href: '/learning-path/module-4/graphs/simulation', duration: '30 min', type: 'simulation' as const },
          { name: 'Graph Algorithms', href: '/learning-path/module-4/graphs/algorithms', duration: '20 min', type: 'practice' as const }
        ]
      }
    ]
  },
  {
    id: 'algorithms',
    title: 'Algorithm Design & Analysis',
    description: 'Sorting, searching, and algorithmic paradigms',
    icon: Target,
    duration: '4-5 weeks',
    difficulty: 'Advanced' as const,
    href: '/learning-path/algorithms',
    isCompleted: false,
    sections: [
      {
        id: 'sorting',
        name: 'Sorting Algorithms',
        href: '/learning-path/algorithms/sorting',
        duration: '75 min',
        type: 'theory' as const,
        isCompleted: false,
        subsections: [
          { name: 'Basic Sorts (Bubble, Selection, Insertion)', href: '/learning-path/algorithms/sorting/basic', duration: '30 min', type: 'theory' as const },
          { name: 'Advanced Sorts (Merge, Quick, Heap)', href: '/learning-path/algorithms/sorting/advanced', duration: '30 min', type: 'theory' as const },
          { name: 'Sorting Visualizer', href: '/learning-path/algorithms/sorting/simulation', duration: '15 min', type: 'simulation' as const }
        ]
      },
      {
        id: 'searching',
        name: 'Searching Algorithms',
        href: '/learning-path/algorithms/searching',
        duration: '45 min',
        type: 'theory' as const,
        isCompleted: false,
        subsections: [
          { name: 'Linear & Binary Search', href: '/learning-path/algorithms/searching/basic', duration: '25 min', type: 'theory' as const },
          { name: 'Advanced Search Techniques', href: '/learning-path/algorithms/searching/advanced', duration: '20 min', type: 'theory' as const }
        ]
      },
      {
        id: 'dynamic-programming',
        name: 'Dynamic Programming',
        href: '/learning-path/algorithms/dynamic-programming',
        duration: '90 min',
        type: 'theory' as const,
        isCompleted: false,
        subsections: [
          { name: 'DP Fundamentals', href: '/learning-path/algorithms/dynamic-programming/theory', duration: '45 min', type: 'theory' as const },
          { name: 'DP Problems Practice', href: '/learning-path/algorithms/dynamic-programming/practice', duration: '45 min', type: 'practice' as const }
        ]
      },
      {
        id: 'greedy',
        name: 'Greedy Algorithms',
        href: '/learning-path/algorithms/greedy',
        duration: '60 min',
        type: 'theory' as const,
        isCompleted: false,
        subsections: [
          { name: 'Greedy Strategy', href: '/learning-path/algorithms/greedy/theory', duration: '30 min', type: 'theory' as const },
          { name: 'Greedy Problems', href: '/learning-path/algorithms/greedy/practice', duration: '30 min', type: 'practice' as const }
        ]
      }
    ]
  }
];

interface NavigationProps {
  className?: string;
  showProgress?: boolean;
  currentPath?: string;
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'theory': return FileText;
    case 'practice': return Code;
    case 'simulation': return PlayCircle;
    case 'quiz': return Brain;
    default: return Circle;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'theory': return 'text-blue-600';
    case 'practice': return 'text-green-600';
    case 'simulation': return 'text-purple-600';
    case 'quiz': return 'text-orange-600';
    default: return 'text-gray-600';
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

export const LearningPathNavigation: React.FC<NavigationProps> = ({ 
  className = '', 
  showProgress = true,
  currentPath = ''
}) => {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set(['foundations']));
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

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

  return (
    <div className={`bg-white rounded-2xl shadow-lg border p-6 ${className}`}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete Learning Path</h2>
        <p className="text-gray-600">Master Data Structures & Algorithms step by step</p>
      </div>

      <div className="space-y-4">
        {courseStructure.map((module, moduleIndex) => {
          const isModuleExpanded = expandedModules.has(module.id);
          const isModuleActive = currentPath.includes(module.href);

          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: moduleIndex * 0.1, duration: 0.5 }}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              {/* Module Header */}
              <div className="flex items-center">
                <Link
                  href={module.href}
                  className={`flex-1 p-4 transition-all duration-300 ${
                    isModuleActive
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-gray-50 hover:bg-blue-50 text-gray-800'
                  }`}
                >
                  <div className="flex items-center">
                    <module.icon className={`w-6 h-6 mr-3 ${isModuleActive ? 'text-white' : 'text-gray-600'}`} />
                    <div className="flex-1 min-w-0">
                      <div className={`font-semibold ${isModuleActive ? 'text-white' : 'text-gray-900'}`}>
                        {module.title}
                      </div>
                      <div className={`text-sm ${isModuleActive ? 'text-blue-100' : 'text-gray-600'}`}>
                        {module.description}
                      </div>
                      <div className={`flex items-center mt-2 text-xs ${isModuleActive ? 'text-blue-100' : 'text-gray-500'}`}>
                        <Clock className="w-3 h-3 mr-1" />
                        {module.duration}
                        <span className={`ml-3 px-2 py-0.5 rounded text-xs ${
                          isModuleActive ? 'bg-white/20 text-white' : getDifficultyColor(module.difficulty)
                        }`}>
                          {module.difficulty}
                        </span>
                      </div>
                    </div>
                    {module.isCompleted && (
                      <CheckCircle className={`w-5 h-5 mr-3 ${
                        isModuleActive ? 'text-green-300' : 'text-green-500'
                      }`} />
                    )}
                  </div>
                </Link>

                <button
                  onClick={() => toggleModule(module.id)}
                  className="p-4 hover:bg-gray-100 transition-colors"
                >
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
                      isModuleExpanded ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
              </div>

              {/* Module Sections */}
              <AnimatePresence>
                {isModuleExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-200"
                  >
                    <div className="p-4 space-y-2">
                      {module.sections.map((section, sectionIndex) => {
                        const isSectionExpanded = expandedSections.has(section.id);
                        const isSectionActive = currentPath.includes(section.href);
                        const hasSubsections = section.subsections && section.subsections.length > 0;

                        return (
                          <div key={section.id} className="border border-gray-100 rounded-lg overflow-hidden">
                            <div className="flex items-center">
                              <Link
                                href={section.href}
                                className={`flex-1 p-3 transition-all duration-200 ${
                                  isSectionActive
                                    ? 'bg-blue-500 text-white'
                                    : 'hover:bg-blue-50 text-gray-700'
                                }`}
                              >
                                <div className="flex items-center">
                                  {React.createElement(getTypeIcon(section.type), {
                                    className: `w-4 h-4 mr-2 ${
                                      isSectionActive ? 'text-white' : getTypeColor(section.type)
                                    }`
                                  })}
                                  <span className="flex-1 text-sm font-medium">{section.name}</span>
                                  <div className="flex items-center ml-2">
                                    <span className={`text-xs mr-2 ${
                                      isSectionActive ? 'text-blue-100' : 'text-gray-500'
                                    }`}>
                                      {section.duration}
                                    </span>
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
                                </div>
                              </Link>

                              {hasSubsections && (
                                <button
                                  onClick={() => toggleSection(section.id)}
                                  className="p-3 hover:bg-gray-100 transition-colors"
                                >
                                  <ChevronDown 
                                    className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                                      isSectionExpanded ? 'rotate-180' : ''
                                    }`} 
                                  />
                                </button>
                              )}
                            </div>

                            {/* Subsections */}
                            {hasSubsections && (
                              <AnimatePresence>
                                {isSectionExpanded && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="border-t border-gray-100 bg-gray-50"
                                  >
                                    <div className="p-2 space-y-1">
                                      {section.subsections!.map((subsection: Subsection, subIndex: number) => {
                                        const isSubActive = currentPath.includes(subsection.href);
                                        const TypeIcon = getTypeIcon(subsection.type);

                                        return (
                                          <Link
                                            key={subIndex}
                                            href={subsection.href}
                                            className={`flex items-center px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                                              isSubActive
                                                ? 'bg-blue-500 text-white'
                                                : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700'
                                            }`}
                                          >
                                            <TypeIcon className={`w-3 h-3 mr-2 ${
                                              isSubActive ? 'text-white' : getTypeColor(subsection.type)
                                            }`} />
                                            <span className="flex-1">{subsection.name}</span>
                                            <span className={`text-xs mr-2 ${
                                              isSubActive ? 'text-blue-100' : 'text-gray-500'
                                            }`}>
                                              {subsection.duration}
                                            </span>
                                            <Circle className={`w-3 h-3 ${
                                              isSubActive ? 'text-white' : 'text-gray-400'
                                            }`} />
                                          </Link>
                                        );
                                      })}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Overall Progress */}
      {showProgress && (
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-green-900 font-semibold text-sm">Overall Course Progress</span>
            <span className="text-green-700 font-bold text-sm">15%</span>
          </div>
          <div className="w-full bg-white rounded-full h-2 mb-2">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '15%' }} />
          </div>
          <div className="flex items-center justify-between text-xs text-green-700">
            <span>5 of 30+ lessons completed</span>
            <div className="flex items-center">
              <Award className="w-3 h-3 mr-1" />
              Certificate available
            </div>
          </div>
        </div>
      )}
    </div>
  );
};