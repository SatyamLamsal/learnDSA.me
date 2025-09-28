"use client";
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Zap, Split, ArrowLeft, ArrowRight, Layers, Target, GitBranch, Shuffle } from 'lucide-react';

const divideConquerAlgorithms = [
  {
    name: 'Merge Sort',
    description: 'Divide array into halves, sort recursively, then merge sorted halves',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    difficulty: 'Beginner',
    pattern: 'Divide-Sort-Merge',
    path: '/algorithms/divide-and-conquer/merge-sort',
    color: 'bg-blue-500',
    divideStep: 'Split array into two equal halves',
    conquerStep: 'Recursively sort both halves',
    combineStep: 'Merge two sorted halves into one',
    recurrence: 'T(n) = 2T(n/2) + O(n)',
    useCases: ['Stable sorting', 'External sorting', 'Parallel processing']
  },
  {
    name: 'Quick Sort',
    description: 'Choose pivot, partition around it, recursively sort partitions',
    timeComplexity: 'O(n log n) avg, O(n²) worst',
    spaceComplexity: 'O(log n)',
    difficulty: 'Intermediate',
    pattern: 'Partition-Recurse',
    path: '/algorithms/divide-and-conquer/quick-sort',
    color: 'bg-red-500',
    divideStep: 'Choose pivot and partition array',
    conquerStep: 'Recursively sort both partitions',
    combineStep: 'No explicit combine step needed',
    recurrence: 'T(n) = T(k) + T(n-k-1) + O(n)',
    useCases: ['In-place sorting', 'Cache-efficient sorting', 'General purpose']
  },
  {
    name: 'Binary Search',
    description: 'Search sorted array by repeatedly dividing search space in half',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1) iterative, O(log n) recursive',
    difficulty: 'Beginner',
    pattern: 'Divide-Search',
    path: '/algorithms/divide-and-conquer/binary-search',
    color: 'bg-green-500',
    divideStep: 'Compare target with middle element',
    conquerStep: 'Search appropriate half recursively',
    combineStep: 'Return found index or not found',
    recurrence: 'T(n) = T(n/2) + O(1)',
    useCases: ['Sorted array search', 'Finding boundaries', 'Optimization problems']
  },
  {
    name: 'Maximum Subarray (D&C)',
    description: 'Find contiguous subarray with maximum sum using divide and conquer',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(log n)',
    difficulty: 'Intermediate',
    pattern: 'Divide-Max-Combine',
    path: '/algorithms/divide-and-conquer/max-subarray',
    color: 'bg-purple-500',
    divideStep: 'Divide array into two halves',
    conquerStep: 'Find max subarray in each half',
    combineStep: 'Find max crossing subarray and compare',
    recurrence: 'T(n) = 2T(n/2) + O(n)',
    useCases: ['Financial analysis', 'Signal processing', 'Algorithm learning']
  },
  {
    name: 'Closest Pair of Points',
    description: 'Find closest pair among n points in 2D plane efficiently',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    difficulty: 'Advanced',
    pattern: 'Geometric Divide & Conquer',
    path: '/algorithms/divide-and-conquer/closest-pair',
    color: 'bg-orange-500',
    divideStep: 'Divide points by median x-coordinate',
    conquerStep: 'Find closest pair in each half',
    combineStep: 'Check pairs across the dividing line',
    recurrence: 'T(n) = 2T(n/2) + O(n)',
    useCases: ['Computational geometry', 'Collision detection', 'Clustering']
  },
  {
    name: "Strassen's Matrix Multiplication",
    description: 'Multiply matrices faster than naive O(n³) algorithm',
    timeComplexity: 'O(n^2.807)',
    spaceComplexity: 'O(n²)',
    difficulty: 'Advanced',
    pattern: 'Matrix Block Division',
    path: '/algorithms/divide-and-conquer/strassen',
    color: 'bg-indigo-500',
    divideStep: 'Divide matrices into 4 blocks each',
    conquerStep: '7 recursive multiplications instead of 8',
    combineStep: 'Combine results using addition/subtraction',
    recurrence: 'T(n) = 7T(n/2) + O(n²)',
    useCases: ['Large matrix operations', 'Computer graphics', 'Scientific computing']
  },
  {
    name: 'Fast Fourier Transform (FFT)',
    description: 'Compute discrete Fourier transform in O(n log n) time',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    difficulty: 'Advanced',
    pattern: 'Frequency Domain D&C',
    path: '/algorithms/divide-and-conquer/fft',
    color: 'bg-pink-500',
    divideStep: 'Split into even and odd indexed elements',
    conquerStep: 'Recursively compute FFT of both halves',
    combineStep: 'Combine using complex number arithmetic',
    recurrence: 'T(n) = 2T(n/2) + O(n)',
    useCases: ['Signal processing', 'Polynomial multiplication', 'Image processing']
  },
  {
    name: 'Karatsuba Multiplication',
    description: 'Multiply large integers faster than grade-school algorithm',
    timeComplexity: 'O(n^1.585)',
    spaceComplexity: 'O(n)',
    difficulty: 'Intermediate',
    pattern: 'Integer Arithmetic D&C',
    path: '/algorithms/divide-and-conquer/karatsuba',
    color: 'bg-teal-500',
    divideStep: 'Split numbers into high and low halves',
    conquerStep: '3 recursive multiplications instead of 4',
    combineStep: 'Combine using algebraic identity',
    recurrence: 'T(n) = 3T(n/2) + O(n)',
    useCases: ['Cryptography', 'Big integer arithmetic', 'Computer algebra']
  },
  {
    name: 'Median of Medians',
    description: 'Find k-th smallest element in linear time with good pivot',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(log n)',
    difficulty: 'Advanced',
    pattern: 'Selection Algorithm',
    path: '/algorithms/divide-and-conquer/median-of-medians',
    color: 'bg-cyan-500',
    divideStep: 'Find median of medians as pivot',
    conquerStep: 'Recursively search appropriate partition',
    combineStep: 'Return the k-th element',
    recurrence: 'T(n) ≤ T(n/5) + T(7n/10) + O(n)',
    useCases: ['Selection problems', 'Robust quicksort', 'Statistical analysis']
  }
];

const masterTheoremCases = [
  {
    case: 'Case 1',
    condition: 'f(n) = O(n^(log_b(a) - ε)) for some ε > 0',
    result: 'T(n) = Θ(n^(log_b(a)))',
    example: 'T(n) = 2T(n/2) + O(1) → T(n) = Θ(n)',
    description: 'Work is dominated by leaves of recursion tree'
  },
  {
    case: 'Case 2',
    condition: 'f(n) = Θ(n^(log_b(a)) × log^k(n)) for some k ≥ 0',
    result: 'T(n) = Θ(n^(log_b(a)) × log^(k+1)(n))',
    example: 'T(n) = 2T(n/2) + O(n) → T(n) = Θ(n log n)',
    description: 'Work is balanced between levels'
  },
  {
    case: 'Case 3',
    condition: 'f(n) = Ω(n^(log_b(a) + ε)) and regularity condition',
    result: 'T(n) = Θ(f(n))',
    example: 'T(n) = 2T(n/2) + O(n²) → T(n) = Θ(n²)',
    description: 'Work is dominated by root of recursion tree'
  }
];

const designPrinciples = [
  {
    name: 'Divide',
    description: 'Break the problem into smaller subproblems of the same type',
    icon: <Split className="h-8 w-8" />,
    color: 'text-blue-600',
    tips: ['Divide into roughly equal parts', 'Ensure subproblems are independent', 'Base case should be simple']
  },
  {
    name: 'Conquer',
    description: 'Solve subproblems recursively (base case solves directly)',
    icon: <Target className="h-8 w-8" />,
    color: 'text-green-600',
    tips: ['Define clear base cases', 'Recursive calls on smaller inputs', 'Trust the recursion works']
  },
  {
    name: 'Combine',
    description: 'Merge solutions of subproblems to solve original problem',
    icon: <GitBranch className="h-8 w-8" />,
    color: 'text-purple-600',
    tips: ['Combine step should be efficient', 'May require additional data structures', 'Sometimes implicit (like quicksort)']
  }
];

export default function DivideAndConquerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
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
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Divide & Conquer Algorithms</h1>
          <p className="text-xl text-slate-600 max-w-4xl leading-relaxed">
            Master the recursive paradigm of breaking problems into smaller subproblems, solving them independently, 
            and combining their solutions. Learn the Master Theorem and analyze recursive algorithms.
          </p>
        </motion.div>

        {/* Design Principles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">The Three-Step Process</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {designPrinciples.map((principle, index) => (
              <motion.div
                key={principle.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
              >
                <div className={`${principle.color} mb-4 flex justify-center`}>
                  {principle.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">{principle.name}</h3>
                <p className="text-slate-600 mb-4">{principle.description}</p>
                <div className="text-left">
                  <h4 className="font-semibold text-slate-700 text-sm mb-2">Key Tips:</h4>
                  <ul className="text-xs text-slate-600 space-y-1">
                    {principle.tips.map((tip, i) => (
                      <li key={i}>• {tip}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Algorithm Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Shuffle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Sorting & Searching</h3>
            <p className="text-slate-600 text-sm">Merge sort, Quick sort, Binary search</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Layers className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Mathematical</h3>
            <p className="text-slate-600 text-sm">Matrix multiplication, FFT, Karatsuba</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Target className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Geometric</h3>
            <p className="text-slate-600 text-sm">Closest pair, Convex hull, Voronoi diagram</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Zap className="h-12 w-12 text-orange-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Optimization</h3>
            <p className="text-slate-600 text-sm">Maximum subarray, Selection problems</p>
          </div>
        </motion.div>

        {/* Divide & Conquer Algorithms Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Classic Divide & Conquer Algorithms</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {divideConquerAlgorithms.map((algorithm, index) => (
              <motion.div
                key={algorithm.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <Link href={algorithm.path}>
                  <div className={`${algorithm.color} h-16 flex items-center justify-center relative`}>
                    <h3 className="text-lg font-bold text-white text-center px-2">{algorithm.name}</h3>
                    {/* <span className="absolute top-2 right-2 bg-white bg-opacity-20 px-2 py-1 rounded text-xs text-white">
                      {algorithm.pattern}
                    </span> */}
                  </div>
                  <div className="p-6">
                    <p className="text-slate-600 text-sm mb-4">{algorithm.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <span className="font-semibold text-slate-700">Time:</span>
                        <div className="bg-gray-100 px-2 py-1 rounded mt-1 text-xs">{algorithm.timeComplexity}</div>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-700">Space:</span>
                        <div className="bg-gray-100 px-2 py-1 rounded mt-1 text-xs">{algorithm.spaceComplexity}</div>
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
                      <div className="space-y-2 text-xs">
                        <div>
                          <span className="font-semibold text-blue-700">Divide:</span>
                          <p className="text-slate-600">{algorithm.divideStep}</p>
                        </div>
                        <div>
                          <span className="font-semibold text-green-700">Conquer:</span>
                          <p className="text-slate-600">{algorithm.conquerStep}</p>
                        </div>
                        <div>
                          <span className="font-semibold text-purple-700">Combine:</span>
                          <p className="text-slate-600">{algorithm.combineStep}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-2 border-t">
                        <span className="text-xs font-semibold text-orange-700">Recurrence:</span>
                        <div className="text-xs text-slate-600 mt-1 font-mono bg-gray-50 p-2 rounded">
                          {algorithm.recurrence}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Master Theorem */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-12"
        >
          <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center">Master Theorem for Divide & Conquer Recurrences</h2>
          
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2">General Form:</h3>
            <p className="font-mono text-blue-700 text-lg">T(n) = a·T(n/b) + f(n)</p>
            <p className="text-blue-600 text-sm mt-2">
              where a ≥ 1, b &gt; 1, and f(n) is asymptotically positive
            </p>
          </div>

          <div className="space-y-6">
            {masterTheoremCases.map((caseData, _index) => (
              <div key={caseData.case} className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold text-blue-700 mb-2">{caseData.case}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-slate-700 text-sm mb-1">Condition:</h4>
                    <p className="text-sm font-mono bg-gray-50 p-2 rounded text-slate-600">{caseData.condition}</p>
                    <h4 className="font-semibold text-slate-700 text-sm mb-1 mt-2">Result:</h4>
                    <p className="text-sm font-mono bg-green-50 p-2 rounded text-green-700">{caseData.result}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-700 text-sm mb-1">Example:</h4>
                    <p className="text-sm font-mono bg-yellow-50 p-2 rounded text-yellow-700">{caseData.example}</p>
                    <h4 className="font-semibold text-slate-700 text-sm mb-1 mt-2">Intuition:</h4>
                    <p className="text-sm text-slate-600">{caseData.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Common Patterns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-12"
        >
          <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center">Common Divide & Conquer Patterns</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">✅ When to Use Divide & Conquer</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-slate-700">Problem has Optimal Substructure</h4>
                  <p className="text-sm text-slate-600">Optimal solution contains optimal solutions to subproblems</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-slate-700">Subproblems are Independent</h4>
                  <p className="text-sm text-slate-600">No overlapping subproblems (unlike DP)</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-slate-700">Divide Step is Efficient</h4>
                  <p className="text-sm text-slate-600">Can split problem quickly into roughly equal parts</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-slate-700">Combine Step is Feasible</h4>
                  <p className="text-sm text-slate-600">Can efficiently merge subproblem solutions</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">⚠️ Common Pitfalls</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-slate-700">Unbalanced Partitions</h4>
                  <p className="text-sm text-slate-600">Poor pivot choice in quicksort → O(n²) worst case</p>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-slate-700">Expensive Combine Step</h4>
                  <p className="text-sm text-slate-600">If combining is too costly, D&C may not help</p>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-slate-700">Overlapping Subproblems</h4>
                  <p className="text-sm text-slate-600">Should use DP instead of D&C for efficiency</p>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-slate-700">Stack Overflow</h4>
                  <p className="text-sm text-slate-600">Deep recursion may exceed stack limits</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Complexity Analysis Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-12"
        >
          <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center">Complexity Analysis Examples</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left p-3 font-semibold text-slate-700">Algorithm</th>
                  <th className="text-center p-3 font-semibold text-slate-700">Recurrence</th>
                  <th className="text-center p-3 font-semibold text-slate-700">Master Theorem Case</th>
                  <th className="text-center p-3 font-semibold text-slate-700">Time Complexity</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Binary Search', recurrence: 'T(n) = T(n/2) + O(1)', case: 'Case 1', complexity: 'O(log n)' },
                  { name: 'Merge Sort', recurrence: 'T(n) = 2T(n/2) + O(n)', case: 'Case 2', complexity: 'O(n log n)' },
                  { name: 'Strassen', recurrence: 'T(n) = 7T(n/2) + O(n²)', case: 'Case 1', complexity: 'O(n^2.807)' },
                  { name: 'Karatsuba', recurrence: 'T(n) = 3T(n/2) + O(n)', case: 'Case 1', complexity: 'O(n^1.585)' },
                  { name: 'Max Subarray', recurrence: 'T(n) = 2T(n/2) + O(n)', case: 'Case 2', complexity: 'O(n log n)' }
                ].map((row, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="p-3 font-medium text-slate-800">{row.name}</td>
                    <td className="p-3 text-center font-mono text-xs">{row.recurrence}</td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-1 rounded text-xs ${
                        row.case === 'Case 1' ? 'bg-blue-100 text-blue-800' :
                        row.case === 'Case 2' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {row.case}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-800">{row.complexity}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Interactive Learning Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Master Divide & Conquer</h2>
          <p className="text-xl mb-6 opacity-90">
            Visualize recursive algorithms and understand how they break down problems
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/algorithms/divide-and-conquer/visualizer" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              <Split className="h-5 w-5 inline mr-2" />
              D&C Visualizer
            </Link>
            <Link href="/algorithms/divide-and-conquer/merge-sort" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              <BookOpen className="h-5 w-5 inline mr-2" />
              Start with Merge Sort
            </Link>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex justify-between items-center"
        >
          <Link
            href="/algorithms/greedy"
            className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Greedy Algorithms
          </Link>
          
          <Link
            href="/algorithms"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Algorithms Overview
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
