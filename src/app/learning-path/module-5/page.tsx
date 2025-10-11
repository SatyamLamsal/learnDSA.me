'use client';

import { StandardModulePage } from '@/components/layouts/StandardModulePage';
import { EnhancedSection } from '@/components/layouts/EnhancedModuleLayout';
import { 
  TreePine,
  Network,
  Search,
  RotateCcw,
  ArrowRight,
  BookOpen,
  Code,
  Target,
  Zap
} from 'lucide-react';

export default function Module5Page() {
  const sections: EnhancedSection[] = [
    {
      id: 'basics',
      name: 'Tree Basics',
      icon: TreePine,
      href: '/learning-path/module-5/basics',
      description: 'Fundamental tree concepts and terminology',
      duration: '30 min',
      difficulty: 'Intermediate',
      type: 'lesson'
    },
    {
      id: 'binary-trees',
      name: 'Binary Trees',
      icon: Network,
      href: '/learning-path/module-5/binary-trees',
      description: 'Binary tree structures and properties',
      duration: '45 min',
      difficulty: 'Intermediate',
      type: 'lesson'
    },
    {
      id: 'traversal',
      name: 'Tree Traversal',
      icon: Search,
      href: '/learning-path/module-5/traversal',
      description: 'In-order, pre-order, and post-order traversal',
      duration: '40 min',
      difficulty: 'Intermediate',
      type: 'lesson'
    },
    {
      id: 'problems',
      name: 'Tree Problems',
      icon: RotateCcw,
      href: '/learning-path/module-5/problems',
      description: 'Common tree algorithms and problem-solving',
      duration: '60 min',
      difficulty: 'Advanced',
      type: 'practice'
    }
  ];

  return (
    <StandardModulePage
      moduleId="module-5"
      moduleTitle="Module 5: Trees & Hierarchical Structures"
      moduleDescription="Master hierarchical data structures and tree algorithms"
      moduleIcon={TreePine}
      sections={sections}
      estimatedTime="2.5 hours"
      difficulty="Intermediate"
      prevModuleUrl="/learning-path/module-4"
      prevModuleTitle="Linked Lists & Pointers"
      nextModuleUrl="/learning-path/module-6"
      nextModuleTitle="Graphs & Networks"
    >
      {/* Course Overview Content */}
      <div className="space-y-8">
        <div className="bg-white p-8 rounded-2xl shadow-lg border">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <ArrowRight className="w-7 h-7 mr-3 text-green-600" />
            Tree Topics
          </h2>
          <div className="grid gap-6">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all group cursor-pointer"
                onClick={() => section.href && (window.location.href = section.href)}
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <section.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 group-hover:text-green-800">{section.name}</h3>
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
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trees Overview */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl shadow-lg border border-green-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <TreePine className="w-7 h-7 mr-3 text-green-600" />
            What You'll Learn
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <BookOpen className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Tree Fundamentals</h3>
                  <p className="text-gray-700 text-sm">Learn tree terminology, properties, and hierarchical relationships.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Code className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Implementation</h3>
                  <p className="text-gray-700 text-sm">Build trees using nodes, pointers, and array representations.</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Target className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Algorithms</h3>
                  <p className="text-gray-700 text-sm">Master traversal algorithms and tree manipulation techniques.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Zap className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Applications</h3>
                  <p className="text-gray-700 text-sm">Apply trees to file systems, decision trees, and parsing.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StandardModulePage>
  );
}