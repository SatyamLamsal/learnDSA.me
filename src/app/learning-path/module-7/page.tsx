'use client';

import { StandardModulePage } from '@/components/layouts/StandardModulePage';
import { EnhancedSection } from '@/components/layouts/EnhancedModuleLayout';
import { 
  Hash,
  Key,
  Lock,
  Zap,
  ArrowRight,
  BookOpen,
  Code,
  Target,
  Database
} from 'lucide-react';

export default function Module7Page() {
  const sections: EnhancedSection[] = [
    {
      id: 'fundamentals',
      name: 'Hash Table Basics',
      icon: Hash,
      href: '/learning-path/module-7/fundamentals',
      description: 'Key-value pairs, buckets, and constant-time operations',
      duration: '40 min',
      difficulty: 'Intermediate',
      type: 'lesson'
    },
    {
      id: 'hash-functions',
      name: 'Hash Functions',
      icon: Key,
      href: '/learning-path/module-7/hash-functions',
      description: 'Uniform distribution, design principles, and properties',
      duration: '45 min',
      difficulty: 'Intermediate',
      type: 'lesson'
    },
    {
      id: 'collision-resolution',
      name: 'Collision Resolution',
      icon: Lock,
      href: '/learning-path/module-7/collision-resolution',
      description: 'Chaining, open addressing, and performance optimization',
      duration: '50 min',
      difficulty: 'Advanced',
      type: 'lesson'
    },
    {
      id: 'applications',
      name: 'Hash Table Applications',
      icon: Zap,
      href: '/learning-path/module-7/applications',
      description: 'Databases, caches, compilers, and distributed systems',
      duration: '45 min',
      difficulty: 'Advanced',
      type: 'practice'
    }
  ];

  return (
    <StandardModulePage
      moduleId="module-7"
      moduleTitle="Module 7: Hash Tables & Hashing"
      moduleDescription="Master efficient key-value storage and fast data retrieval systems"
      moduleIcon={Hash}
      sections={sections}
      estimatedTime="3 hours"
      difficulty="Advanced"
      prevModuleUrl="/learning-path/module-6"
      prevModuleTitle="Graph Theory & Algorithms"
      nextModuleUrl="/learning-path/module-8"
      nextModuleTitle="Dynamic Programming"
    >
      {/* Course Overview Content */}
      <div className="space-y-8">
        <div className="bg-white p-8 rounded-2xl shadow-lg border">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <ArrowRight className="w-7 h-7 mr-3 text-orange-600" />
            Hash Table Topics
          </h2>
          <div className="grid gap-6">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-all group cursor-pointer"
                onClick={() => section.href && (window.location.href = section.href)}
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                    <section.icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 group-hover:text-orange-800">{section.name}</h3>
                    <p className="text-gray-600 text-sm">{section.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">{section.duration}</div>
                    <div className={`text-xs px-2 py-1 rounded mt-1 ${
                      section.difficulty === 'Intermediate' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : section.difficulty === 'Advanced'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {section.difficulty}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-600" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hash Tables Overview */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl shadow-lg border border-orange-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Hash className="w-7 h-7 mr-3 text-orange-600" />
            What You'll Learn
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <BookOpen className="w-6 h-6 text-orange-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Hash Fundamentals</h3>
                  <p className="text-gray-700 text-sm">Understand how hash tables provide O(1) average-case operations.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Code className="w-6 h-6 text-orange-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Implementation</h3>
                  <p className="text-gray-700 text-sm">Build hash tables with various collision resolution strategies.</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Target className="w-6 h-6 text-orange-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Optimization</h3>
                  <p className="text-gray-700 text-sm">Master load factors, resizing, and performance tuning.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Database className="w-6 h-6 text-orange-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Applications</h3>
                  <p className="text-gray-700 text-sm">Apply hash tables to caching, indexing, and data processing.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StandardModulePage>
  );
}