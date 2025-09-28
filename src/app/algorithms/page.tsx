"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Play, Clock, Target, ArrowRight } from 'lucide-react';
import { Colors } from '../../theme/colors';
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton';
import { ProgressIndicator } from '@/components/progress/ProgressIndicator';

const algorithms = [
  {
    id: 'sorting-overview',
    name: 'Sorting Algorithms',
    description: 'Learn bubble sort, merge sort, quick sort, and more',
    path: '/algorithms/sorting',
    category: 'algorithms',
    color: 'bg-blue-500',
    icon: '↕️',
    complexity: 'O(n log n)',
    difficulty: 'Beginner to Advanced'
  },
  {
    id: 'searching-overview',
    name: 'Searching Algorithms',
    description: 'Master linear search, binary search, and search optimizations',
    path: '/algorithms/searching',
    category: 'algorithms',
    color: 'bg-green-500',
    icon: '🔍',
    complexity: 'O(log n)',
    difficulty: 'Beginner'
  },
  {
    id: 'graph-overview',
    name: 'Graph Algorithms',
    description: 'Explore BFS, DFS, Dijkstra, and shortest path algorithms',
    path: '/algorithms/graph',
    category: 'algorithms',
    color: 'bg-purple-500',
    icon: '🌐',
    complexity: 'O(V + E)',
    difficulty: 'Intermediate'
  },
  {
    id: 'dynamic-programming-overview',
    name: 'Dynamic Programming',
    description: 'Solve complex problems by breaking them into subproblems',
    path: '/algorithms/dynamic-programming',
    category: 'algorithms',
    color: 'bg-orange-500',
    icon: '🧩',
    complexity: 'Varies',
    difficulty: 'Advanced'
  },
  {
    id: 'greedy-overview',
    name: 'Greedy Algorithms',
    description: 'Make locally optimal choices for global optimization',
    path: '/algorithms/greedy',
    category: 'algorithms',
    color: 'bg-red-500',
    icon: '🎯',
    complexity: 'O(n log n)',
    difficulty: 'Intermediate'
  },
  {
    id: 'divide-conquer-overview',
    name: 'Divide & Conquer',
    description: 'Break problems into smaller subproblems recursively',
    path: '/algorithms/divide-and-conquer',
    category: 'algorithms',
    color: 'bg-indigo-500',
    icon: '⚔️',
    complexity: 'O(n log n)',
    difficulty: 'Intermediate'
  }
];

const features = [
  {
    icon: <Target className="h-8 w-8" />,
    title: 'Problem-Solving Focus',
    description: 'Learn algorithmic thinking and problem-solving strategies'
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: 'Complexity Analysis',
    description: 'Understand time and space complexity for efficient solutions'
  },
  {
    icon: <Play className="h-8 w-8" />,
    title: 'Step-by-Step Visualization',
    description: 'Watch algorithms execute with detailed animations'
  },
  {
    icon: <BookOpen className="h-8 w-8" />,
    title: 'Real Applications',
    description: 'See how algorithms solve real-world problems'
  }
];

export default function AlgorithmsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6">
            Master <span className="text-blue-600">Algorithms</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed">
            Learn essential algorithms through interactive visualizations and hands-on practice. 
            From basic sorting to advanced graph algorithms.
          </p>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 shadow-lg text-center hover:shadow-xl transition-shadow"
            >
              <div className="text-blue-600 mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{feature.title}</h3>
              <p className="text-slate-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Algorithms Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">Explore Algorithm Categories</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {algorithms.map((algorithm, index) => (
              <motion.div
                key={algorithm.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative"
              >
                <div className="absolute top-4 right-4 z-20">
                  <BookmarkButton 
                    topicId={algorithm.id}
                    topicType="overview"
                    category={algorithm.category}
                    title={algorithm.name}
                    url={algorithm.path}
                  />
                </div>
                <Link href={algorithm.path}>
                  <div className={`${algorithm.color} h-24 flex items-center justify-center`}>
                    <span className="text-4xl">{algorithm.icon}</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-slate-800">{algorithm.name}</h3>
                      <ProgressIndicator 
                        topicId={algorithm.id}
                        topicType="overview" 
                        category={algorithm.category}
                        title={algorithm.name}
                        className="w-6 h-6"
                      />
                    </div>
                    <p className="text-slate-600 text-sm mb-4">{algorithm.description}</p>
                    <div className="flex justify-between items-center text-xs text-slate-500">
                      <span className="bg-gray-100 px-2 py-1 rounded">{algorithm.complexity}</span>
                      <span className="bg-gray-100 px-2 py-1 rounded">{algorithm.difficulty}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Algorithm Complexity Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-16"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-slate-700">
            Big O Complexity Chart
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-red-600 mb-4">Common Time Complexities</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-green-50 rounded border border-green-200">
                  <span className="font-mono font-semibold text-gray-800">O(1)</span>
                  <span className="text-green-700 font-semibold">Excellent</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-green-50 rounded border border-green-200">
                  <span className="font-mono font-semibold text-gray-800">O(log n)</span>
                  <span className="text-green-700 font-semibold">Good</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-yellow-50 rounded border border-yellow-300">
                  <span className="font-mono font-semibold text-gray-800">O(n)</span>
                  <span className="text-yellow-700 font-semibold">Fair</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-orange-50 rounded border border-orange-300">
                  <span className="font-mono font-semibold text-gray-800">O(n log n)</span>
                  <span className="text-orange-700 font-semibold">Bad</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-red-50 rounded border border-red-300">
                  <span className="font-mono font-semibold text-gray-800">O(n²)</span>
                  <span className="text-red-700 font-semibold">Horrible</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold  mb-4"style={{ color: Colors.accent }}>Algorithm Examples</h3>
              <div className="space-y-2 text-sm">
                <div className="p-2 border-l-4 border-green-500 text-green-500">
                  <strong>O(1):</strong> Array access, Hash table lookup
                </div>
                <div className="p-2 border-l-4 border-green-500 text-green-500">
                  <strong>O(log n):</strong> Binary search, Balanced tree operations
                </div>
                <div className="p-2 border-l-4 border-yellow-500 text-yellow-500">
                  <strong>O(n):</strong> Linear search, Array traversal
                </div>
                <div className="p-2 border-l-4 border-orange-500 text-orange-500">
                  <strong>O(n log n):</strong> Merge sort, Quick sort (average)
                </div>
                <div className="p-2 border-l-4 border-red-500 text-red-500">
                  <strong>O(n²):</strong> Bubble sort, Selection sort
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Learning Path */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Recommended Learning Path</h2>
          <p className="text-xl mb-8 opacity-90">
            Start with sorting and searching, then progress to more complex algorithms
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm text-yellow-700">
              1. Sorting & Searching
            </span>
            <ArrowRight className="h-6 w-6 mt-2 opacity-70" />
            <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm text-yellow-700">
              2. Graph Algorithms
            </span>
            <ArrowRight className="h-6 w-6 mt-2 opacity-70" />
            <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm text-yellow-600">
              3. Dynamic Programming
            </span>
          </div>
          <div className="mt-8">
            <Link href="/algorithms/sorting" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Learning →
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
