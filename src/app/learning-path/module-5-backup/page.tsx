'use client';

import { StandardModulePage } from '@/components/layouts/StandardModulePage';
import { EnhancedSection } from '@/components/layouts/EnhancedModuleLayout';
import { 
  Database,
  MemoryStick,
  Code2,
  Brain,
  BookOpen,
  Network,
  Grid3X3,
  Target,
  CheckCircle,
  ArrowRight,
  Clock,
  Award,
  BarChart3,
  Rocket
} from 'lucide-react';

export default function Module5Page() {
  const sections: EnhancedSection[] = [
    {
      id: 'two-pointers',
      name: 'Two Pointer Technique',
      icon: Target,
      href: '/learning-path/module-5/two-pointers',
      description: 'Master the two pointer technique for array problems',
      duration: '30 min',
      difficulty: 'Intermediate',
      type: 'lesson'
    },
    {
      id: 'sliding-window',
      name: 'Sliding Window',
      icon: Grid3X3,
      href: '/learning-path/module-5/sliding-window',
      description: 'Learn sliding window pattern for subarray problems',
      duration: '35 min',
      difficulty: 'Intermediate',
      type: 'lesson'
    },
    {
      id: 'advanced-patterns',
      name: 'Advanced Array Patterns',
      icon: Brain,
      href: '/learning-path/module-5/advanced-patterns',
      description: 'Complex array manipulation techniques',
      duration: '40 min',
      difficulty: 'Intermediate',
      type: 'practice'
    },
    {
      id: 'prefix-suffix',
      name: 'Prefix & Suffix Arrays',
      icon: BarChart3,
      href: '/learning-path/module-5/prefix-suffix',
      description: 'Optimize queries with prefix and suffix techniques',
      duration: '25 min',
      difficulty: 'Intermediate',
      type: 'lesson'
    },
    {
      id: 'matrix-problems',
      name: 'Matrix Manipulation',
      icon: Grid3X3,
      href: '/learning-path/module-5/matrix-problems',
      description: '2D array problems and optimization techniques',
      duration: '30 min',
      difficulty: 'Intermediate',
      type: 'practice'
    },
    {
      id: 'advanced-projects',
      name: 'Advanced Array Projects',
      icon: Rocket,
      href: '/learning-path/module-5/advanced-projects',
      description: 'Complex array-based algorithm implementations',
      duration: '45 min',
      difficulty: 'Advanced',
      type: 'practice'
    }
  ];

  const sectionDetails = [
    {
      id: 'two-pointers',
      title: 'Two Pointer Technique',
      description: 'Master the two pointer technique for array problems',
      icon: Target,
      href: '/learning-path/module-5/two-pointers',
      difficulty: 'Intermediate' as const,
      timeEstimate: '30 min'
    },
    {
      id: 'sliding-window',
      title: 'Sliding Window Pattern',
      description: 'Learn sliding window pattern for subarray problems',
      icon: Grid3X3,
      href: '/learning-path/module-5/sliding-window',
      difficulty: 'Intermediate' as const,
      timeEstimate: '35 min'
    },
    {
      id: 'advanced-patterns',
      title: 'Advanced Array Patterns',
      description: 'Complex array manipulation techniques and optimization',
      icon: Brain,
      href: '/learning-path/module-5/advanced-patterns',
      difficulty: 'Intermediate' as const,
      timeEstimate: '40 min'
    },
    {
      id: 'prefix-suffix',
      title: 'Prefix & Suffix Arrays',
      description: 'Optimize queries with prefix and suffix array techniques',
      icon: BarChart3,
      href: '/learning-path/module-5/prefix-suffix',
      difficulty: 'Intermediate' as const,
      timeEstimate: '25 min'
    },
    {
      id: 'matrix-problems',
      title: 'Matrix Manipulation',
      description: '2D array problems and advanced optimization techniques',
      icon: Grid3X3,
      href: '/learning-path/module-5/matrix-problems',
      difficulty: 'Intermediate' as const,
      timeEstimate: '30 min'
    },
    {
      id: 'advanced-projects',
      title: 'Advanced Array Projects',
      description: 'Complex array-based algorithm implementations',
      icon: Rocket,
      href: '/learning-path/module-5/advanced-projects',
      difficulty: 'Advanced' as const,
      timeEstimate: '45 min'
    }
  ];

  const moduleStats = {
    totalSections: sections.length,
    estimatedTime: '3 hours',
    difficulty: 'Intermediate to Advanced',
    prerequisites: ['Module 1', 'Module 2', 'Module 3', 'Module 4']
  };

  return (
    <StandardModulePage
      moduleId="module-5"
      moduleTitle="Module 5: Advanced Array Techniques"
      moduleDescription="Master advanced array manipulation patterns and optimization techniques"
      moduleIcon={Target}
      sections={sections}
      estimatedTime="180 minutes"
      difficulty="Intermediate"
      prevModuleUrl="/learning-path/module-4"
      prevModuleTitle="Linked Lists"
    >
      <div className="space-y-8 text-gray-700">
        
        {/* Previous Module Reference */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 p-6 rounded-2xl text-white">
          <h2 className="text-lg font-semibold text-indigo-900 mb-3">Building on Data Structure Foundations</h2>
          <p className="text-indigo-700 mb-4">
            You&apos;ve mastered arrays, stacks & queues, and linked lists. 
            Now we&apos;ll explore advanced array patterns, optimization techniques, and complex algorithmic approaches.
          </p>
          <a 
            href="/learning-path/module-4"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
          >
            ← Review Module 4: Linked Lists
          </a>
        </div>
        
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl text-white">
          <div className="flex items-center space-x-4 mb-4">
            <Target className="w-12 h-12 text-white" />
            <div>
              <h1 className="text-4xl font-bold text-white">Module 5: Advanced Array Techniques</h1>
              <p className="text-blue-100 text-lg">Master sophisticated array patterns and optimization</p>
            </div>
          </div>
          <p className="text-blue-50">
            Take your array skills to the next level with advanced patterns like two-pointer technique, 
            sliding window, prefix arrays, and complex optimization strategies. Essential techniques 
            for competitive programming and technical interviews.
          </p>
        </div>

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
                  <h3 className="font-semibold text-gray-800">Two Pointer Technique</h3>
                  <p className="text-gray-600 text-sm">Master left-right, fast-slow pointers for efficient array traversal</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Sliding Window Patterns</h3>
                  <p className="text-gray-600 text-sm">Fixed and variable window techniques for subarray problems</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Prefix & Suffix Arrays</h3>
                  <p className="text-gray-600 text-sm">Precomputation techniques for range query optimization</p>
                </div>
              </div>
            </div>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start space-x-3 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Matrix Operations</h3>
                  <p className="text-gray-600 text-sm">2D array manipulation, rotation, and traversal patterns</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Advanced Patterns</h3>
                  <p className="text-gray-600 text-sm">Dutch flag, merge intervals, and complex optimization techniques</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Interview Preparation</h3>
                  <p className="text-gray-600 text-sm">Essential patterns for technical interviews and competitive programming</p>
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
                      section.difficulty === 'Intermediate' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-red-100 text-red-800'
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

        <div className="grid md:grid-cols-3 gap-6 text-gray-700">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-xl text-gray-700">
            <div className="flex items-center justify-between text-gray-700">
              <div>
                <div className="text-3xl font-bold text-gray-800">{moduleStats.totalSections}</div>
                <div className="text-green-100">Sections</div>
              </div>
              <Grid3X3 className="w-8 h-8 text-green-100" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-white">180</div>
                <div className="text-blue-100">Minutes</div>
              </div>
              <Clock className="w-8 h-8 text-blue-100" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white">Advanced</div>
                <div className="text-purple-100">Level</div>
              </div>
              <Award className="w-8 h-8 text-purple-100" />
            </div>
          </div>
        </div>
      </div>
    </StandardModulePage>
  );
}