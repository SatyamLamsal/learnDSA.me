'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ChevronRight, 
  BookOpen,
  Clock,
  Target,
  CheckCircle,
  Code,
  Lightbulb,
  TrendingUp,
  Users,
  Award,
  Download,
  ExternalLink
} from 'lucide-react';

const ArrayGuideCard = ({ 
  title, 
  description, 
  href, 
  icon: Icon, 
  difficulty, 
  timeEstimate,
  completed = false 
}: {
  title: string;
  description: string;
  href: string;
  icon: any;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeEstimate: string;
  completed?: boolean;
}) => (
  <Link href={href}>
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${
        completed 
          ? 'bg-green-50 border-green-200 hover:border-green-300' 
          : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-lg'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${
            completed ? 'bg-green-100' : 'bg-blue-100'
          }`}>
            <Icon className={`w-6 h-6 ${
              completed ? 'text-green-600' : 'text-blue-600'
            }`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <div className="flex items-center space-x-3 text-sm">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {difficulty}
              </span>
              <div className="flex items-center text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                {timeEstimate}
              </div>
            </div>
          </div>
        </div>
        {completed && (
          <CheckCircle className="w-6 h-6 text-green-600" />
        )}
      </div>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">{description}</p>
      <div className="flex items-center text-blue-600 font-medium">
        <span>Start Learning</span>
        <ChevronRight className="w-4 h-4 ml-1" />
      </div>
    </motion.div>
  </Link>
);

const ArrayCheatSheet = () => {
  const [activeSection, setActiveSection] = useState<'operations' | 'patterns' | 'complexity'>('operations');

  const cheatSheetData: {
    operations: Array<{ operation: string; syntax: string; complexity: string; description: string }>;
    patterns: Array<{ pattern: string; use: string; time: string; space: string }>;
    complexity: Array<{ scenario: string; complexity: string; description: string }>;
  } = {
    operations: [
      { operation: 'Access', syntax: 'arr[i]', complexity: 'O(1)', description: 'Direct index access' },
      { operation: 'Insert (End)', syntax: 'arr.push(x)', complexity: 'O(1)*', description: 'Amortized constant time' },
      { operation: 'Insert (Middle)', syntax: 'arr.insert(i, x)', complexity: 'O(n)', description: 'Shift elements right' },
      { operation: 'Delete (End)', syntax: 'arr.pop()', complexity: 'O(1)', description: 'Remove last element' },
      { operation: 'Delete (Middle)', syntax: 'arr.erase(i)', complexity: 'O(n)', description: 'Shift elements left' },
      { operation: 'Search', syntax: 'find(arr, x)', complexity: 'O(n)', description: 'Linear search through array' },
    ],
    patterns: [
      { pattern: 'Two Pointers', use: 'Sorted arrays, palindromes', time: 'O(n)', space: 'O(1)' },
      { pattern: 'Sliding Window', use: 'Subarray problems', time: 'O(n)', space: 'O(1)' },
      { pattern: 'Prefix Sum', use: 'Range sum queries', time: 'O(1) query', space: 'O(n)' },
      { pattern: 'Binary Search', use: 'Sorted array search', time: 'O(log n)', space: 'O(1)' },
      { pattern: 'Divide & Conquer', use: 'Merge sort, quick sort', time: 'O(n log n)', space: 'O(log n)' },
    ],
    complexity: [
      { scenario: 'Best Case Access', complexity: 'O(1)', description: 'Direct indexing with known position' },
      { scenario: 'Worst Case Search', complexity: 'O(n)', description: 'Element at end or not present' },
      { scenario: 'Dynamic Array Resize', complexity: 'O(n)', description: 'Copy all elements to new location' },
      { scenario: 'Sorted Array Search', complexity: 'O(log n)', description: 'Binary search optimization' },
      { scenario: 'Matrix Traversal', complexity: 'O(m×n)', description: '2D array with m rows, n columns' },
    ]
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <BookOpen className="w-6 h-6 mr-2 text-purple-600" />
        Arrays Quick Reference
      </h3>
      
      {/* Tab Navigation */}
      <div className="flex space-x-2 mb-4 border-b">
        {Object.keys(cheatSheetData).map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section as any)}
            className={`px-4 py-2 font-medium capitalize transition-colors ${
              activeSection === section
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {section.replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              {activeSection === 'operations' && (
                <>
                  <th className="text-left py-2 font-medium text-gray-800">Operation</th>
                  <th className="text-left py-2 font-medium text-gray-800">Syntax</th>
                  <th className="text-left py-2 font-medium text-gray-800">Time</th>
                  <th className="text-left py-2 font-medium text-gray-800">Description</th>
                </>
              )}
              {activeSection === 'patterns' && (
                <>
                  <th className="text-left py-2 font-medium text-gray-800">Pattern</th>
                  <th className="text-left py-2 font-medium text-gray-800">Use Case</th>
                  <th className="text-left py-2 font-medium text-gray-800">Time</th>
                  <th className="text-left py-2 font-medium text-gray-800">Space</th>
                </>
              )}
              {activeSection === 'complexity' && (
                <>
                  <th className="text-left py-2 font-medium text-gray-800">Scenario</th>
                  <th className="text-left py-2 font-medium text-gray-800">Complexity</th>
                  <th className="text-left py-2 font-medium text-gray-800">Description</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {cheatSheetData[activeSection].map((item, index) => {
              const operationItem = item as { operation: string; syntax: string; complexity: string; description: string };
              const patternItem = item as { pattern: string; use: string; time: string; space: string };
              const complexityItem = item as { scenario: string; complexity: string; description: string };
              
              return (
                <tr key={index} className="border-b border-gray-100">
                  {activeSection === 'operations' && (
                    <>
                      <td className="py-2 font-medium text-gray-800">{operationItem.operation}</td>
                      <td className="py-2">
                        <code className="bg-gray-100 px-2 py-1 rounded text-xs">{operationItem.syntax}</code>
                      </td>
                      <td className="py-2">
                        <code className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{operationItem.complexity}</code>
                      </td>
                      <td className="py-2 text-gray-600">{operationItem.description}</td>
                    </>
                  )}
                  {activeSection === 'patterns' && (
                    <>
                      <td className="py-2 font-medium text-gray-800">{patternItem.pattern}</td>
                      <td className="py-2 text-gray-600">{patternItem.use}</td>
                      <td className="py-2">
                        <code className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">{patternItem.time}</code>
                      </td>
                      <td className="py-2">
                        <code className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">{patternItem.space}</code>
                      </td>
                    </>
                  )}
                  {activeSection === 'complexity' && (
                    <>
                      <td className="py-2 font-medium text-gray-800">{complexityItem.scenario}</td>
                      <td className="py-2">
                        <code className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">{complexityItem.complexity}</code>
                      </td>
                      <td className="py-2 text-gray-600">{complexityItem.description}</td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function ArrayGuidePage() {
  const learningPath = [
    {
      title: 'Memory & Cache',
      description: 'Understand how arrays are stored in memory, cache locality, and performance implications of different access patterns.',
      href: '/learning-path/module-2/memory',
      icon: Code,
      difficulty: 'Beginner' as const,
      timeEstimate: '15-20 min',
      completed: false
    },
    {
      title: 'Basic Operations',
      description: 'Master insertion, deletion, traversal, and search operations with hands-on interactive examples.',
      href: '/learning-path/module-2/operations',
      icon: Target,
      difficulty: 'Beginner' as const,
      timeEstimate: '20-25 min',
      completed: false
    },
    {
      title: 'Algorithm Patterns',
      description: 'Learn essential problem-solving patterns: two pointers, sliding window, prefix sum, and array rotation techniques.',
      href: '/learning-path/module-2/algorithms',
      icon: Lightbulb,
      difficulty: 'Intermediate' as const,
      timeEstimate: '30-35 min',
      completed: false
    }
  ];

  const keyTakeaways = [
    {
      title: 'Memory Efficiency',
      description: 'Arrays store elements in contiguous memory, enabling O(1) random access and excellent cache performance.',
      icon: TrendingUp
    },
    {
      title: 'Trade-offs',
      description: 'Fast access vs. expensive insertions/deletions in the middle. Choose the right data structure for your use case.',
      icon: Users
    },
    {
      title: 'Algorithm Patterns',
      description: 'Master two pointers, sliding window, and prefix sum patterns to solve 80% of array problems efficiently.',
      icon: Award
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-4 mb-6">
            <Link href="/learning-path" className="text-white hover:text-blue-200">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <div className="text-sm font-medium text-blue-200 mb-2">Module 2 • Data Structures</div>
              <h1 className="text-5xl font-bold mb-4">Arrays Complete Guide</h1>
              <p className="text-xl text-blue-100 max-w-2xl">
                                  Let&apos;s explore the fundamental building block of computer science: From memory layout to advanced algorithms, 
                become proficient in one of the most versatile data structures.
              </p>
            </div>
          </div>
          
          {/* Module Stats */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Clock className="w-8 h-8 text-blue-200" />
                <div>
                  <div className="text-2xl font-bold">65-80 min</div>
                  <div className="text-blue-200 text-sm">Total Learning Time</div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Target className="w-8 h-8 text-green-200" />
                <div>
                  <div className="text-2xl font-bold">12+</div>
                  <div className="text-blue-200 text-sm">Interactive Examples</div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Award className="w-8 h-8 text-yellow-200" />
                <div>
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-blue-200 text-sm">Core Sections</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
        {/* Learning Path */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Learning Journey</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Follow this structured path to build comprehensive understanding of arrays, 
              from low-level memory concepts to advanced problem-solving patterns.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {learningPath.map((item, index) => (
              <ArrayGuideCard key={index} {...item} />
            ))}
          </div>
        </motion.div>

        {/* Key Takeaways */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-8 shadow-lg border"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <Lightbulb className="w-8 h-8 mr-3 text-yellow-600" />
            Key Learning Outcomes
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {keyTakeaways.map((takeaway, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <takeaway.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{takeaway.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{takeaway.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Reference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ArrayCheatSheet />
        </motion.div>

        {/* Prerequisites & Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Prerequisites */}
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
              <CheckCircle className="w-6 h-6 mr-2" />
              Prerequisites
            </h3>
            <ul className="space-y-2 text-blue-800">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Basic programming knowledge (variables, loops)
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Understanding of memory and pointers (helpful)
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Foundations module completion (recommended)
              </li>
            </ul>
          </div>

          {/* Next Steps */}
          <div className="bg-green-50 rounded-xl p-6 border border-green-200">
            <h3 className="text-xl font-semibold text-green-900 mb-4 flex items-center">
              <ChevronRight className="w-6 h-6 mr-2" />
              What&apos;s Next
            </h3>
            <ul className="space-y-2 text-green-800">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                Searching & Sorting Algorithms
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                Linked Lists & Dynamic Structures
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                Stacks & Queues Applications
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-12"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Master Arrays?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Start with memory fundamentals and work your way up to advanced algorithms. 
            Interactive examples and real code implementations included.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              href="/learning-path/module-2/memory"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center"
            >
              <span>Start Learning</span>
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
            
            <Link
              href="/learning-path"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors flex items-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span>Back to Modules</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}