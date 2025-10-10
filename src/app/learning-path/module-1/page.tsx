'use client';

import { StandardModulePage } from '@/components/layouts/StandardModulePage';
import { EnhancedSection } from '@/components/layouts/EnhancedModuleLayout';
import { 
  Layers,
  Gauge,
  Target,
  Zap,
  ArrowRight,
  Database
} from 'lucide-react';

export default function Module1Page() {
  const sections: EnhancedSection[] = [
    { 
      id: 'memory-hierarchy', 
      name: 'Memory Hierarchy', 
      icon: Layers,
      href: '/learning-path/module-1/memory-hierarchy',
      description: 'Explore CPU cache, RAM, and storage speed differences',
      duration: '25 min',
      type: 'lesson',
      difficulty: 'Beginner'
    },
    { 
      id: 'data-structures', 
      name: 'Data Structures Overview', 
      icon: Database,
      href: '/learning-path/module-1/data-structures',
      description: 'Why different data structures exist and their trade-offs',
      duration: '30 min',
      type: 'lesson',
      difficulty: 'Beginner'
    },
    { 
      id: 'performance', 
      name: 'Performance Impact', 
      icon: Gauge,
      href: '/learning-path/module-1/performance',
      description: 'Learn how data structure choice affects program speed',
      duration: '20 min',
      type: 'lesson',
      difficulty: 'Beginner'
    },
    { 
      id: 'efficiency', 
      name: 'Efficiency Principles', 
      icon: Target,
      href: '/learning-path/module-1/efficiency',
      description: 'Master the fundamentals of algorithmic efficiency',
      duration: '18 min',
      type: 'lesson',
      difficulty: 'Beginner'
    }
  ];

  return (
    <StandardModulePage
      moduleId="module-1"
      moduleTitle="Module 1: Memory & Efficiency"
      moduleDescription="Understand why data structures matter through memory systems"
      moduleIcon={Zap}
      sections={sections}
      estimatedTime="93 minutes"
      difficulty="Beginner"
      prevModuleUrl="/learning-path/foundations"
      prevModuleTitle="Foundations of DSA"
      nextModuleUrl="/learning-path/module-2"
      nextModuleTitle="Arrays & Analysis"
    >
      {/* Module Overview */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <ArrowRight className="w-7 h-7 mr-3 text-blue-600" />
          Learning Path
        </h2>
        <div className="grid gap-6">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all group cursor-pointer"
              onClick={() => section.href && (window.location.href = section.href)}
            >
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <section.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 group-hover:text-blue-800">{section.name}</h3>
                  <p className="text-gray-600 text-sm">{section.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">{section.duration}</div>
                  <div className="text-xs px-2 py-1 rounded mt-1 bg-green-100 text-green-800">
                    {section.difficulty}
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Concepts Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">What You'll Learn</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Layers className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Memory Systems</h3>
            <p className="text-gray-600 text-sm">
              Understand how different memory levels affect data structure performance
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gauge className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Performance Analysis</h3>
            <p className="text-gray-600 text-sm">
              Learn to measure and optimize data structure operations
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Efficiency Principles</h3>
            <p className="text-gray-600 text-sm">
              Master time-space tradeoffs and optimization strategies
            </p>
          </div>
        </div>
      </div>
    </StandardModulePage>
  );
}