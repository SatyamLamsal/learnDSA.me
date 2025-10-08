'use client';

import { ModuleLayout } from '@/components/layouts/ModuleLayout';
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

export default function Module3Page() {
  const sections = [
    {
      id: 'guide',
      name: 'Comprehensive Guide',
      icon: BookOpen
    },
    {
      id: 'memory',
      name: 'Memory Layout',
      icon: MemoryStick
    },
    {
      id: 'operations',
      name: 'Basic Operations',
      icon: Code2
    },
    {
      id: 'algorithms',
      name: 'Array Algorithms',
      icon: Brain
    }
  ];

  const sectionDetails = [
    {
      id: 'guide',
      title: 'Comprehensive Guide',
      description: 'Complete introduction to arrays and their fundamentals',
      icon: BookOpen,
      href: '/learning-path/module-3/guide',
      difficulty: 'Beginner' as const,
      timeEstimate: '15 min'
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
      href: '/learning-path/module-3/operations',
      difficulty: 'Beginner' as const,
      timeEstimate: '25 min'
    },
    {
      id: 'algorithms',
      title: 'Array Algorithms',
      description: 'Advanced algorithms: two-pointer, sliding window, and prefix sum techniques',
      icon: Brain,
      href: '/learning-path/module-3/algorithms',
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
    <ModuleLayout
      moduleId="module-3"
      moduleTitle="Module 3: Advanced Arrays & Patterns"
      moduleDescription="Advanced array concepts, optimization techniques, and algorithmic patterns"
      sections={sections}
      estimatedTime="120 minutes"
      difficulty="Intermediate"
      totalSections={4}
    >
      <div className="space-y-8">
        
        {/* Previous Module Reference */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 p-6 rounded-2xl">
          <h2 className="text-lg font-semibold text-indigo-900 mb-3">Building on Array Fundamentals</h2>
          <p className="text-indigo-700 mb-4">
            In Module 2, we learned array basics and fundamental operations. 
            Now we&apos;ll explore advanced patterns, optimization techniques, and complex algorithms.
          </p>
          <a 
            href="/learning-path/module-2"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
          >
            ← Review Module 2: Array Fundamentals
          </a>
        </div>
        
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl">
          <div className="flex items-center space-x-4 mb-4">
            <Database className="w-12 h-12" />
            <div>
              <h1 className="text-4xl font-bold">Module 3: Advanced Arrays</h1>
              <p className="text-blue-100 text-lg">Advanced patterns and optimization techniques</p>
            </div>
          </div>
          <p className="text-blue-50">
            Building upon your array foundations, this advanced module explores sophisticated patterns 
            and optimization techniques. Master two-pointer, sliding window, and other algorithmic 
            patterns essential for complex problem-solving.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Target className="w-7 h-7 mr-3 text-green-600" />
            What You&apos;ll Master
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Array Fundamentals</h3>
                  <p className="text-gray-600 text-sm">Static vs dynamic arrays, memory layout, and performance characteristics</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Memory Optimization</h3>
                  <p className="text-gray-600 text-sm">Cache performance, memory layout, and efficient access patterns</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">C/C++ Implementation</h3>
                  <p className="text-gray-600 text-sm">Low-level array operations and memory management techniques</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Advanced Algorithms</h3>
                  <p className="text-gray-600 text-sm">Two-pointer, sliding window, and prefix sum techniques</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Problem Solving</h3>
                  <p className="text-gray-600 text-sm">Common patterns and solutions for array-based problems</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Interactive Visualizations</h3>
                  <p className="text-gray-600 text-sm">See algorithms in action with step-by-step demonstrations</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <ArrowRight className="w-7 h-7 mr-3 text-blue-600" />
            Learning Path
          </h2>
          <div className="grid gap-6">
            {sectionDetails.map((section, index) => (
              <div
                key={section.id}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all group cursor-pointer"
                onClick={() => window.location.href = section.href}
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <section.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 group-hover:text-blue-800">{section.title}</h3>
                    <p className="text-gray-600 text-sm">{section.description}</p>
                  </div>
                  <div className="text-right">
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

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">{moduleStats.totalSections}</div>
                <div className="text-green-100">Sections</div>
              </div>
              <Grid3X3 className="w-8 h-8 text-green-100" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">90</div>
                <div className="text-blue-100">Minutes</div>
              </div>
              <Clock className="w-8 h-8 text-blue-100" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">Beginner</div>
                <div className="text-purple-100">Level</div>
              </div>
              <Award className="w-8 h-8 text-purple-100" />
            </div>
          </div>
        </div>
      </div>
    </ModuleLayout>
  );
}