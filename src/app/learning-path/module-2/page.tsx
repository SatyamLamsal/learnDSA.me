'use client';

import { StandardModulePage } from '@/components/layouts/StandardModulePage';
import { EnhancedSection } from '@/components/layouts/EnhancedModuleLayout';
import { 
  Database,
  MemoryStick,
  Code2,
  Brain,
  BookOpen,
  Clock,
  Target,
  CheckCircle,
  ArrowRight,
  Grid3X3,
  Award
} from 'lucide-react';

export default function Module2Page() {
  const sections: EnhancedSection[] = [
    {
      id: 'fundamentals',
      name: 'Array Fundamentals',
      icon: BookOpen,
      href: '/learning-path/module-2/fundamentals',
      description: 'Theory, definitions, types, and core concepts of arrays',
      duration: '20 min',
      difficulty: 'Beginner',
      type: 'lesson'
    },
    {
      id: 'memory',
      name: 'Memory Layout',
      icon: MemoryStick,
      href: '/learning-path/module-2/memory',
      description: 'How arrays are stored in memory',
      duration: '20 min',
      difficulty: 'Beginner',
      type: 'lesson'
    },
    {
      id: 'operations',
      name: 'Basic Operations',
      icon: Code2,
      href: '/learning-path/module-2/operations',
      description: 'Insertion, deletion, and access operations',
      duration: '25 min',
      difficulty: 'Intermediate',
      type: 'practice'
    },
    {
      id: 'algorithms',
      name: 'Array Algorithms',
      icon: Brain,
      href: '/learning-path/module-2/algorithms',
      description: 'Common algorithms for array manipulation',
      duration: '30 min',
      difficulty: 'Intermediate',
      type: 'practice'
    }
  ];

  const sectionDetails = [
    {
      id: 'fundamentals',
      title: 'Array Fundamentals',
      description: 'Theory, definitions, types, and core concepts of arrays',
      icon: BookOpen,
      href: '/learning-path/module-2/fundamentals',
      difficulty: 'Beginner' as const,
      timeEstimate: '20 min'
    },
    {
      id: 'memory',
      title: 'Memory Layout',
      description: 'Understanding how arrays are stored in memory and cache optimization',
      icon: MemoryStick,
      href: '/learning-path/module-2/memory',
      difficulty: 'Intermediate' as const,
      timeEstimate: '20 min'
    },
    {
      id: 'operations',
      title: 'Basic Operations',
      description: 'Essential array operations: insertion, deletion, searching, and traversal',
      icon: Code2,
      href: '/learning-path/module-2/operations',
      difficulty: 'Beginner' as const,
      timeEstimate: '25 min'
    },
    {
      id: 'algorithms',
      title: 'Array Algorithms',
      description: 'Advanced algorithms: two-pointer, sliding window, and prefix sum techniques',
      icon: Brain,
      href: '/learning-path/module-2/algorithms',
      difficulty: 'Intermediate' as const,
      timeEstimate: '30 min'
    }
  ];

  const moduleStats = {
    totalSections: sections.length,
    estimatedTime: '90 minutes',
    difficulty: 'Beginner to Intermediate',
    prerequisites: ['Foundations of DSA']
  };

  return (
    <StandardModulePage
      moduleId="module-2"
      moduleTitle="Module 2: Arrays & Memory Fundamentals"
      moduleDescription="Master array structures and memory optimization techniques"
      moduleIcon={Grid3X3}
      sections={sections}
      estimatedTime="90 minutes"
      difficulty="Intermediate"
      prevModuleUrl="/learning-path/module-1"
      prevModuleTitle="Memory & Efficiency"
      nextModuleUrl="/learning-path/module-3"
      nextModuleTitle="Advanced Structures"
    >
      <div className="space-y-8 text-gray-700">
         <div className="bg-white p-8 rounded-2xl shadow-lg border text-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Target className="w-7 h-7 mr-3 text-green-600" />
            What You&apos;ll Master
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-700">
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start space-x-3 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Array Fundamentals</h3>
                  <p className="text-gray-600 text-sm">Static vs dynamic arrays, memory layout, and performance characteristics</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Memory Optimization</h3>
                  <p className="text-gray-600 text-sm">Cache performance, memory layout, and efficient access patterns</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">C/C++ Implementation</h3>
                  <p className="text-gray-600 text-sm">Low-level array operations and memory management techniques</p>
                </div>
              </div>
            </div>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start space-x-3 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Advanced Algorithms</h3>
                  <p className="text-gray-600 text-sm">Two-pointer, sliding window, and prefix sum techniques</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Problem Solving</h3>
                  <p className="text-gray-600 text-sm">Common patterns and solutions for array-based problems</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Interactive Visualizations</h3>
                  <p className="text-gray-600 text-sm">See algorithms in action with step-by-step demonstrations</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border text-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <ArrowRight className="w-7 h-7 mr-3 text-blue-600" />
            Learning Path
          </h2>
          <div className="grid gap-6 text-gray-700">
            {sectionDetails.map((section, index) => (
              <div
                key={section.id}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all group cursor-pointer text-white"
                onClick={() => window.location.href = section.href}
              >
                <div className="flex items-center space-x-4 flex-1 text-gray-700">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors text-white">
                    <section.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1 text-gray-700">
                    <h3 className="font-semibold text-gray-800 group-hover:text-blue-800">{section.title}</h3>
                    <p className="text-gray-600 text-sm">{section.description}</p>
                  </div>
                  <div className="text-right text-gray-700">
                    <div className="text-sm text-gray-500">{section.timeEstimate}</div>
                    <div className={`text-xs px-2 py-1 rounded mt-1 ${
                      section.difficulty === 'Beginner' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {section.difficulty}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                </div>
              </div>
            ))}
          </div>
        </div>

   
      </div>
    </StandardModulePage>
  );
}