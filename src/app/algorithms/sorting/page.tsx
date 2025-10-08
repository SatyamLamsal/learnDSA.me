"use client";
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Play, ArrowLeft, ArrowRight, BarChart3, Shuffle, Zap } from 'lucide-react';

const sortingAlgorithms = [
  {
    name: 'Bubble Sort',
    description: 'Simple comparison-based algorithm that repeatedly steps through the list',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    difficulty: 'Beginner',
    stable: true,
    path: '/algorithms/sorting/bubble-sort',
    color: 'bg-red-500',
    pros: ['Simple to understand', 'In-place sorting', 'Stable'],
    cons: ['Very slow for large datasets', 'Poor performance']
  },
  {
    name: 'Selection Sort',
    description: 'Finds the minimum element and places it at the beginning',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    difficulty: 'Beginner',
    stable: false,
    path: '/algorithms/sorting/selection-sort',
    color: 'bg-orange-500',
    pros: ['Simple implementation', 'In-place sorting', 'Fewer swaps than bubble sort'],
    cons: ['Poor performance', 'Not stable', 'Not adaptive']
  },
  {
    name: 'Insertion Sort',
    description: 'Builds the sorted array one element at a time',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    difficulty: 'Beginner',
    stable: true,
    path: '/algorithms/sorting/insertion-sort',
    color: 'bg-yellow-500',
    pros: ['Efficient for small datasets', 'Adaptive', 'Stable', 'In-place'],
    cons: ['Poor performance on large datasets']
  },
  {
    name: 'Merge Sort',
    description: 'Divide-and-conquer algorithm that divides array into halves',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    difficulty: 'Intermediate',
    stable: true,
    path: '/algorithms/sorting/merge-sort',
    color: 'bg-green-500',
    pros: ['Consistent O(n log n) performance', 'Stable', 'Predictable'],
    cons: ['Requires additional memory', 'Not in-place']
  },
  {
    name: 'Quick Sort',
    description: 'Efficient divide-and-conquer algorithm using pivot partitioning',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(log n)',
    difficulty: 'Intermediate',
    stable: false,
    path: '/algorithms/sorting/quick-sort',
    color: 'bg-blue-500',
    pros: ['Fast in practice', 'In-place sorting', 'Cache efficient'],
    cons: ['Worst case O(n²)', 'Not stable', 'Poor pivot choice affects performance']
  },
  {
    name: 'Heap Sort',
    description: 'Uses binary heap data structure to sort elements',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(1)',
    difficulty: 'Intermediate',
    stable: false,
    path: '/algorithms/sorting/heap-sort',
    color: 'bg-purple-500',
    pros: ['Consistent O(n log n)', 'In-place sorting', 'No worst case'],
    cons: ['Not stable', 'Poor cache performance', 'Complex implementation']
  },
  {
    name: 'Counting Sort',
    description: 'Non-comparison sorting for integers within a range',
    timeComplexity: 'O(n + k)',
    spaceComplexity: 'O(k)',
    difficulty: 'Intermediate',
    stable: true,
    path: '/algorithms/sorting/counting-sort',
    color: 'bg-indigo-500',
    pros: ['Linear time complexity', 'Stable', 'No comparisons'],
    cons: ['Only for integers', 'Requires range knowledge', 'Space intensive']
  },
  {
    name: 'Radix Sort',
    description: 'Sorts integers by processing digits from least to most significant',
    timeComplexity: 'O(d × n)',
    spaceComplexity: 'O(n + k)',
    difficulty: 'Advanced',
    stable: true,
    path: '/algorithms/sorting/radix-sort',
    color: 'bg-pink-500',
    pros: ['Linear time for fixed digits', 'Stable', 'No comparisons'],
    cons: ['Only for integers/strings', 'Complex implementation', 'Space overhead']
  },
  {
    name: 'Bucket Sort',
    description: 'Distributes elements into buckets then sorts each bucket',
    timeComplexity: 'O(n + k)',
    spaceComplexity: 'O(n + k)',
    difficulty: 'Advanced',
    stable: true,
    path: '/algorithms/sorting/bucket-sort',
    color: 'bg-teal-500',
    pros: ['Can be very fast', 'Stable', 'Parallelizable'],
    cons: ['Requires uniform distribution', 'Extra space', 'Complex implementation']
  }
];

const comparisonData = [
  { name: 'Best Case', bubble: 'O(n)', selection: 'O(n²)', insertion: 'O(n)', merge: 'O(n log n)', quick: 'O(n log n)', heap: 'O(n log n)' },
  { name: 'Average Case', bubble: 'O(n²)', selection: 'O(n²)', insertion: 'O(n²)', merge: 'O(n log n)', quick: 'O(n log n)', heap: 'O(n log n)' },
  { name: 'Worst Case', bubble: 'O(n²)', selection: 'O(n²)', insertion: 'O(n²)', merge: 'O(n log n)', quick: 'O(n²)', heap: 'O(n log n)' }
];

export default function SortingAlgorithmsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 text-white">
      <div className="container mx-auto px-4 py-12 text-gray-700">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-gray-700"
        >
          <Link href="/algorithms" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2 text-gray-700" />
            Back to Algorithms
          </Link>
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Sorting Algorithms</h1>
          <p className="text-xl text-slate-600 max-w-4xl leading-relaxed">
            Master the art of organizing data efficiently. From simple comparison-based sorts to advanced 
            non-comparison algorithms, learn how different sorting techniques work and when to use them.
          </p>
        </motion.div>

        {/* Overview Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid md:grid-cols-3 gap-6 mb-12 text-gray-700"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 text-center text-gray-700">
            <BarChart3 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Comparison-Based</h3>
            <p className="text-slate-600">Algorithms that sort by comparing elements with each other</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center text-gray-700">
            <Shuffle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Non-Comparison</h3>
            <p className="text-slate-600">Algorithms that sort without direct element comparisons</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center text-gray-700">
            <Zap className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Hybrid Approaches</h3>
            <p className="text-slate-600">Algorithms that combine multiple sorting strategies</p>
          </div>
        </motion.div>

        {/* Sorting Algorithms Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 text-gray-700"
        >
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Choose Your Sorting Algorithm</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700">
            {sortingAlgorithms.map((algorithm, index) => (
              <motion.div
                key={algorithm.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden text-gray-700"
              >
                <Link href={algorithm.path}>
                  <div className={`${algorithm.color} h-16 flex items-center justify-center`}>
                    <h3 className="text-xl font-bold text-black text-gray-800">{algorithm.name}</h3>
                  </div>
                  <div className="p-6 text-gray-700">
                    <p className="text-slate-600 text-sm mb-4">{algorithm.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                      <div>
                        <span className="font-semibold text-slate-700">Time:</span>
                        <div className="bg-gray-100 px-2 py-1 rounded mt-1 text-gray-700">{algorithm.timeComplexity}</div>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-700">Space:</span>
                        <div className="bg-gray-100 px-2 py-1 rounded mt-1 text-gray-700">{algorithm.spaceComplexity}</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mb-4 text-gray-700">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        algorithm.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                        algorithm.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {algorithm.difficulty}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        algorithm.stable ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {algorithm.stable ? 'Stable' : 'Unstable'}
                      </span>
                    </div>

                    <div className="border-t pt-3 text-gray-700">
                      <div className="mb-2 text-gray-700">
                        <span className="text-xs font-semibold text-green-700">Pros:</span>
                        <ul className="text-xs text-slate-600 mt-1">
                          {algorithm.pros.slice(0, 2).map((pro, i) => (
                            <li key={i}>• {pro}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-red-700">Cons:</span>
                        <ul className="text-xs text-slate-600 mt-1">
                          {algorithm.cons.slice(0, 2).map((con, i) => (
                            <li key={i}>• {con}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Complexity Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-12 text-gray-700"
        >
          <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center">Time Complexity Comparison</h2>
          <div className="overflow-x-auto text-gray-700">
            <table className="w-full text-sm text-gray-600">
              <thead>
                <tr className="border-b-2 border-gray-200 text-gray-700">
                  <th className="text-left p-3 font-semibold text-slate-700">Case</th>
                  <th className="text-center p-3 font-semibold text-slate-700">Bubble</th>
                  <th className="text-center p-3 font-semibold text-slate-700">Selection</th>
                  <th className="text-center p-3 font-semibold text-slate-700">Insertion</th>
                  <th className="text-center p-3 font-semibold text-slate-700">Merge</th>
                  <th className="text-center p-3 font-semibold text-slate-700">Quick</th>
                  <th className="text-center p-3 font-semibold text-slate-700">Heap</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className="border-b border-gray-100 text-gray-700">
                    <td className="p-3 font-medium text-slate-800">{row.name}</td>
                    <td className="p-3 text-center text-gray-700">
                      <span className={`px-2 py-1 rounded text-xs ${
                        row.bubble.includes('n²') ? 'bg-red-100 text-red-800' : 
                        row.bubble.includes('log') ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {row.bubble}
                      </span>
                    </td>
                    <td className="p-3 text-center text-gray-700">
                      <span className="px-2 py-1 rounded text-xs bg-red-100 text-red-800">{row.selection}</span>
                    </td>
                    <td className="p-3 text-center text-gray-700">
                      <span className={`px-2 py-1 rounded text-xs ${
                        row.insertion.includes('n²') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {row.insertion}
                      </span>
                    </td>
                    <td className="p-3 text-center text-gray-700">
                      <span className="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-800">{row.merge}</span>
                    </td>
                    <td className="p-3 text-center text-gray-700">
                      <span className={`px-2 py-1 rounded text-xs ${
                        row.quick.includes('n²') ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {row.quick}
                      </span>
                    </td>
                    <td className="p-3 text-center text-gray-700">
                      <span className="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-800">{row.heap}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Algorithm Selection Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-12 text-gray-700"
        >
          <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center">When to Use Each Algorithm</h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-700">
            <div className="space-y-4 text-gray-700">
              <div className="border-l-4 border-green-500 pl-4 text-gray-700">
                <h3 className="font-semibold text-green-700 mb-2">Small Datasets (n &lt; 50)</h3>
                <p className="text-sm text-slate-600">Use <strong>Insertion Sort</strong> - Simple, efficient for small arrays, adaptive</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4 text-gray-700">
                <h3 className="font-semibold text-blue-700 mb-2">Large Datasets (General Purpose)</h3>
                <p className="text-sm text-slate-600">Use <strong>Quick Sort</strong> or <strong>Merge Sort</strong> - Excellent average performance</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4 text-gray-700">
                <h3 className="font-semibold text-purple-700 mb-2">Guaranteed O(n log n)</h3>
                <p className="text-sm text-slate-600">Use <strong>Merge Sort</strong> or <strong>Heap Sort</strong> - No worst-case scenarios</p>
              </div>
            </div>
            <div className="space-y-4 text-gray-700">
              <div className="border-l-4 border-orange-500 pl-4 text-gray-700">
                <h3 className="font-semibold text-orange-700 mb-2">Integers in Range</h3>
                <p className="text-sm text-slate-600">Use <strong>Counting Sort</strong> or <strong>Radix Sort</strong> - Linear time complexity</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4 text-gray-700">
                <h3 className="font-semibold text-red-700 mb-2">Stability Required</h3>
                <p className="text-sm text-slate-600">Use <strong>Merge Sort</strong>, <strong>Insertion Sort</strong>, or counting-based sorts</p>
              </div>
              <div className="border-l-4 border-gray-500 pl-4 text-gray-700">
                <h3 className="font-semibold text-gray-700 mb-2">Memory Constrained</h3>
                <p className="text-sm text-slate-600">Use <strong>Quick Sort</strong> or <strong>Heap Sort</strong> - In-place sorting</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Interactive Learning Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white text-center mb-12 text-white"
        >
          <h2 className="text-3xl font-bold mb-4 text-slate-800">Ready to Practice?</h2>
          <p className="text-xl mb-6 opacity-90 text-gray-700">
            Try our interactive sorting visualizer to see algorithms in action
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-gray-700">
            <Link href="/algorithms/sorting/visualizer" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              <Play className="h-5 w-5 inline mr-2 text-gray-700" />
              Interactive Visualizer
            </Link>
            <Link href="/algorithms/sorting/bubble-sort" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              <BookOpen className="h-5 w-5 inline mr-2 text-gray-700" />
              Start with Bubble Sort
            </Link>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-between items-center text-gray-700"
        >
          <Link
            href="/algorithms"
            className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2 text-gray-700" />
            Back to Algorithms
          </Link>
          
          <Link
            href="/algorithms/searching"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-gray-100"
          >
            Next: Searching Algorithms
            <ArrowRight className="h-5 w-5 ml-2 text-gray-700" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
