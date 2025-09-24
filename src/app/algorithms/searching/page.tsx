"use client";
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Search, ArrowLeft, ArrowRight, Zap, Eye, Brain } from 'lucide-react';

const searchingAlgorithms = [
  {
    name: 'Linear Search',
    description: 'Sequential search through elements one by one until target is found',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    difficulty: 'Beginner',
    bestCase: 'O(1)',
    worstCase: 'O(n)',
    path: '/algorithms/searching/linear-search',
    color: 'bg-red-500',
    pros: ['Simple implementation', 'Works on unsorted data', 'No preprocessing required'],
    cons: ['Slow for large datasets', 'Inefficient for repeated searches'],
    useCases: ['Small datasets', 'Unsorted arrays', 'One-time searches']
  },
  {
    name: 'Binary Search',
    description: 'Efficient search on sorted arrays by repeatedly dividing search space',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    difficulty: 'Beginner',
    bestCase: 'O(1)',
    worstCase: 'O(log n)',
    path: '/algorithms/searching/binary-search',
    color: 'bg-blue-500',
    pros: ['Very fast', 'Logarithmic time complexity', 'Space efficient'],
    cons: ['Requires sorted data', 'Not suitable for linked lists'],
    useCases: ['Sorted arrays', 'Dictionary lookups', 'Database queries']
  },
  {
    name: 'Jump Search',
    description: 'Searches by jumping ahead by fixed steps, then linear search in block',
    timeComplexity: 'O(√n)',
    spaceComplexity: 'O(1)',
    difficulty: 'Intermediate',
    bestCase: 'O(1)',
    worstCase: 'O(√n)',
    path: '/algorithms/searching/jump-search',
    color: 'bg-green-500',
    pros: ['Faster than linear', 'Better than binary for some cases', 'Simple to implement'],
    cons: ['Requires sorted data', 'Slower than binary search'],
    useCases: ['Large sorted arrays', 'When binary search overhead is high']
  },
  {
    name: 'Interpolation Search',
    description: 'Estimates position based on key value, works well with uniform distribution',
    timeComplexity: 'O(log log n)',
    spaceComplexity: 'O(1)',
    difficulty: 'Intermediate',
    bestCase: 'O(1)',
    worstCase: 'O(n)',
    path: '/algorithms/searching/interpolation-search',
    color: 'bg-purple-500',
    pros: ['Very fast for uniform data', 'Better than binary search', 'Adaptive positioning'],
    cons: ['Poor performance on non-uniform data', 'Complex implementation'],
    useCases: ['Uniformly distributed data', 'Numerical searches', 'Phone directories']
  },
  {
    name: 'Exponential Search',
    description: 'Finds range where element exists, then applies binary search',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    difficulty: 'Intermediate',
    bestCase: 'O(1)',
    worstCase: 'O(log n)',
    path: '/algorithms/searching/exponential-search',
    color: 'bg-orange-500',
    pros: ['Good for infinite arrays', 'Efficient range finding', 'Logarithmic complexity'],
    cons: ['Requires sorted data', 'More complex than binary search'],
    useCases: ['Infinite or very large arrays', 'When size is unknown']
  },
  {
    name: 'Fibonacci Search',
    description: 'Uses Fibonacci numbers to divide array into unequal parts',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    difficulty: 'Advanced',
    bestCase: 'O(1)',
    worstCase: 'O(log n)',
    path: '/algorithms/searching/fibonacci-search',
    color: 'bg-indigo-500',
    pros: ['No division operations', 'Good for large arrays', 'Efficient on sorted data'],
    cons: ['Complex implementation', 'Requires sorted data', 'Fibonacci number calculation'],
    useCases: ['Systems without division operation', 'Very large sorted arrays']
  },
  {
    name: 'Ternary Search',
    description: 'Divides array into three parts and eliminates 2/3 in each iteration',
    timeComplexity: 'O(log₃ n)',
    spaceComplexity: 'O(1)',
    difficulty: 'Intermediate',
    bestCase: 'O(1)',
    worstCase: 'O(log₃ n)',
    path: '/algorithms/searching/ternary-search',
    color: 'bg-pink-500',
    pros: ['Fewer iterations than binary', 'Good theoretical complexity', 'Divide into three parts'],
    cons: ['More comparisons per iteration', 'Slower in practice', 'Complex implementation'],
    useCases: ['Theoretical studies', 'Finding maximum/minimum in unimodal arrays']
  },
  {
    name: 'Hash Table Search',
    description: 'Uses hash function to map keys to array indices for O(1) access',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(n)',
    difficulty: 'Intermediate',
    bestCase: 'O(1)',
    worstCase: 'O(n)',
    path: '/algorithms/searching/hash-search',
    color: 'bg-teal-500',
    pros: ['Constant time average', 'Very fast lookups', 'Flexible key types'],
    cons: ['Space overhead', 'Hash collisions', 'No ordering'],
    useCases: ['Frequent searches', 'Key-value stores', 'Caching systems']
  }
];

const comparisonData = [
  { name: 'Best Case', linear: 'O(1)', binary: 'O(1)', jump: 'O(1)', interpolation: 'O(1)', exponential: 'O(1)' },
  { name: 'Average Case', linear: 'O(n)', binary: 'O(log n)', jump: 'O(√n)', interpolation: 'O(log log n)', exponential: 'O(log n)' },
  { name: 'Worst Case', linear: 'O(n)', binary: 'O(log n)', jump: 'O(√n)', interpolation: 'O(n)', exponential: 'O(log n)' }
];

export default function SearchingAlgorithmsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Link href="/algorithms" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Algorithms
          </Link>
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Searching Algorithms</h1>
          <p className="text-xl text-slate-600 max-w-4xl leading-relaxed">
            Master the art of finding data efficiently. From simple linear searches to advanced algorithms 
            that leverage data structure properties for lightning-fast lookups.
          </p>
        </motion.div>

        {/* Overview Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Eye className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Sequential Search</h3>
            <p className="text-slate-600">Examine elements one by one until target is found</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Divide & Conquer</h3>
            <p className="text-slate-600">Reduce search space systematically for efficiency</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Brain className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Intelligent Search</h3>
            <p className="text-slate-600">Use data patterns and heuristics for optimal performance</p>
          </div>
        </motion.div>

        {/* Searching Algorithms Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Choose Your Search Strategy</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchingAlgorithms.slice(0, 6).map((algorithm, index) => (
              <motion.div
                key={algorithm.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <Link href={algorithm.path}>
                  <div className={`${algorithm.color} h-16 flex items-center justify-center`}>
                    <h3 className="text-xl font-bold text-white">{algorithm.name}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-slate-600 text-sm mb-4">{algorithm.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <span className="font-semibold text-slate-700">Average:</span>
                        <div className="bg-gray-100 px-2 py-1 rounded mt-1">{algorithm.timeComplexity}</div>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-700">Space:</span>
                        <div className="bg-gray-100 px-2 py-1 rounded mt-1">{algorithm.spaceComplexity}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <span className="font-semibold text-slate-700">Best:</span>
                        <div className="bg-green-100 px-2 py-1 rounded mt-1 text-green-800">{algorithm.bestCase}</div>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-700">Worst:</span>
                        <div className="bg-red-100 px-2 py-1 rounded mt-1 text-red-800">{algorithm.worstCase}</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        algorithm.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                        algorithm.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {algorithm.difficulty}
                      </span>
                    </div>

                    <div className="border-t pt-3">
                      <div className="mb-2">
                        <span className="text-xs font-semibold text-green-700">Pros:</span>
                        <ul className="text-xs text-slate-600 mt-1">
                          {algorithm.pros.slice(0, 2).map((pro, i) => (
                            <li key={i}>• {pro}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="mb-2">
                        <span className="text-xs font-semibold text-red-700">Cons:</span>
                        <ul className="text-xs text-slate-600 mt-1">
                          {algorithm.cons.slice(0, 1).map((con, i) => (
                            <li key={i}>• {con}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-blue-700">Use Cases:</span>
                        <ul className="text-xs text-slate-600 mt-1">
                          {algorithm.useCases.slice(0, 1).map((useCase, i) => (
                            <li key={i}>• {useCase}</li>
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

        {/* Additional Algorithms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Advanced Search Techniques</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {searchingAlgorithms.slice(6).map((algorithm, index) => (
              <motion.div
                key={algorithm.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <Link href={algorithm.path}>
                  <div className={`${algorithm.color} h-12 flex items-center justify-center`}>
                    <h3 className="text-lg font-bold text-white">{algorithm.name}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-slate-600 text-sm mb-4">{algorithm.description}</p>
                    
                    <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                      <div className="text-center">
                        <div className="font-semibold text-slate-700 mb-1">Average</div>
                        <div className="bg-blue-100 px-2 py-1 rounded text-blue-800">{algorithm.timeComplexity}</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-slate-700 mb-1">Best</div>
                        <div className="bg-green-100 px-2 py-1 rounded text-green-800">{algorithm.bestCase}</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-slate-700 mb-1">Worst</div>
                        <div className="bg-red-100 px-2 py-1 rounded text-red-800">{algorithm.worstCase}</div>
                      </div>
                    </div>

                    <div className="text-xs text-slate-600">
                      <span className="font-semibold">Best for:</span> {algorithm.useCases.join(', ')}
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
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-12"
        >
          <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center">Time Complexity Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left p-3 font-semibold text-slate-700">Case</th>
                  <th className="text-center p-3 font-semibold text-slate-700">Linear</th>
                  <th className="text-center p-3 font-semibold text-slate-700">Binary</th>
                  <th className="text-center p-3 font-semibold text-slate-700">Jump</th>
                  <th className="text-center p-3 font-semibold text-slate-700">Interpolation</th>
                  <th className="text-center p-3 font-semibold text-slate-700">Exponential</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="p-3 font-medium text-slate-800">{row.name}</td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-1 rounded text-xs ${
                        row.linear.includes('n') && !row.linear.includes('log') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {row.linear}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-800">{row.binary}</span>
                    </td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-1 rounded text-xs bg-orange-100 text-orange-800">{row.jump}</span>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-1 rounded text-xs ${
                        row.interpolation.includes('n') && !row.interpolation.includes('log') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {row.interpolation}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-800">{row.exponential}</span>
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
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-12"
        >
          <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center">When to Use Each Algorithm</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="font-semibold text-red-700 mb-2">Unsorted Data</h3>
                <p className="text-sm text-slate-600">Use <strong>Linear Search</strong> - Only option for unsorted arrays</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-blue-700 mb-2">Sorted Arrays (General)</h3>
                <p className="text-sm text-slate-600">Use <strong>Binary Search</strong> - Most efficient for sorted data</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-green-700 mb-2">Large Sorted Arrays</h3>
                <p className="text-sm text-slate-600">Use <strong>Jump Search</strong> - Good balance between simplicity and performance</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-semibold text-purple-700 mb-2">Uniform Distribution</h3>
                <p className="text-sm text-slate-600">Use <strong>Interpolation Search</strong> - Excellent for evenly distributed data</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-semibold text-orange-700 mb-2">Unknown Array Size</h3>
                <p className="text-sm text-slate-600">Use <strong>Exponential Search</strong> - Great for infinite or very large arrays</p>
              </div>
              <div className="border-l-4 border-teal-500 pl-4">
                <h3 className="font-semibold text-teal-700 mb-2">Frequent Searches</h3>
                <p className="text-sm text-slate-600">Use <strong>Hash Table</strong> - O(1) average lookup time</p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4">
                <h3 className="font-semibold text-indigo-700 mb-2">No Division Operations</h3>
                <p className="text-sm text-slate-600">Use <strong>Fibonacci Search</strong> - When division is expensive</p>
              </div>
              <div className="border-l-4 border-pink-500 pl-4">
                <h3 className="font-semibold text-pink-700 mb-2">Theoretical Optimization</h3>
                <p className="text-sm text-slate-600">Use <strong>Ternary Search</strong> - For finding extrema in unimodal functions</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Interactive Learning Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-8 text-white text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Practice Your Search Skills</h2>
          <p className="text-xl mb-6 opacity-90">
            Try our interactive search visualizer and master different algorithms
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/algorithms/searching/visualizer" className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              <Search className="h-5 w-5 inline mr-2" />
              Interactive Visualizer
            </Link>
            <Link href="/algorithms/searching/linear-search" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
              <BookOpen className="h-5 w-5 inline mr-2" />
              Start with Linear Search
            </Link>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex justify-between items-center"
        >
          <Link
            href="/algorithms/sorting"
            className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Sorting
          </Link>
          
          <Link
            href="/algorithms/graph"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Next: Graph Algorithms
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
