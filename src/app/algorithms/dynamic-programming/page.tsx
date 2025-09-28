"use client";
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Brain, Layers, ArrowLeft, ArrowRight, Zap, Target, Puzzle } from 'lucide-react';

const dpAlgorithms = [
  {
    name: 'Fibonacci Sequence',
    description: 'Classic introduction to DP concepts with overlapping subproblems',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n) / O(1)',
    difficulty: 'Beginner',
    pattern: 'Linear DP',
    path: '/algorithms/dynamic-programming/fibonacci',
    color: 'bg-green-500',
    approach: ['Memoization', 'Tabulation', 'Space Optimized'],
    recurrence: 'F(n) = F(n-1) + F(n-2)',
    useCases: ['Learning DP fundamentals', 'Mathematical sequences', 'Growth problems']
  },
  {
    name: '0/1 Knapsack Problem',
    description: 'Select items with maximum value within weight constraint',
    timeComplexity: 'O(n × W)',
    spaceComplexity: 'O(n × W) / O(W)',
    difficulty: 'Intermediate',
    pattern: '2D DP',
    path: '/algorithms/dynamic-programming/knapsack-01',
    color: 'bg-blue-500',
    approach: ['2D Table', 'Space Optimized', 'Backtracking'],
    recurrence: 'dp[i][w] = max(dp[i-1][w], dp[i-1][w-weight[i]] + value[i])',
    useCases: ['Resource allocation', 'Budget optimization', 'Portfolio selection']
  },
  {
    name: 'Longest Common Subsequence',
    description: 'Find longest subsequence common to two sequences',
    timeComplexity: 'O(m × n)',
    spaceComplexity: 'O(m × n) / O(min(m,n))',
    difficulty: 'Intermediate',
    pattern: '2D DP',
    path: '/algorithms/dynamic-programming/lcs',
    color: 'bg-purple-500',
    approach: ['2D Table', 'Space Optimized', 'Reconstruction'],
    recurrence: 'If match: dp[i][j] = 1 + dp[i-1][j-1], else: max(dp[i-1][j], dp[i][j-1])',
    useCases: ['DNA sequence analysis', 'Diff utilities', 'Text comparison']
  },
  {
    name: 'Coin Change Problem',
    description: 'Find minimum coins needed or number of ways to make amount',
    timeComplexity: 'O(n × amount)',
    spaceComplexity: 'O(amount)',
    difficulty: 'Intermediate',
    pattern: 'Unbounded Knapsack',
    path: '/algorithms/dynamic-programming/coin-change',
    color: 'bg-orange-500',
    approach: ['Bottom-up DP', 'Memoization', 'Space Optimized'],
    recurrence: 'dp[amount] = min(dp[amount], dp[amount - coin] + 1)',
    useCases: ['Currency systems', 'Change making', 'Payment processing']
  },
  {
    name: 'Longest Increasing Subsequence',
    description: 'Find length of longest strictly increasing subsequence',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    difficulty: 'Intermediate',
    pattern: 'LIS Pattern',
    path: '/algorithms/dynamic-programming/lis',
    color: 'bg-red-500',
    approach: ['DP O(n²)', 'Binary Search O(n log n)', 'Patience Sorting'],
    recurrence: 'dp[i] = max(dp[j] + 1) for j < i where arr[j] < arr[i]',
    useCases: ['Sequence analysis', 'Stock prices', 'Activity selection']
  },
  {
    name: 'Edit Distance (Levenshtein)',
    description: 'Minimum operations to transform one string to another',
    timeComplexity: 'O(m × n)',
    spaceComplexity: 'O(m × n) / O(min(m,n))',
    difficulty: 'Intermediate',
    pattern: '2D DP',
    path: '/algorithms/dynamic-programming/edit-distance',
    color: 'bg-indigo-500',
    approach: ['2D DP', 'Space Optimized', 'Operations Tracking'],
    recurrence: 'dp[i][j] = min(insert, delete, replace) + cost',
    useCases: ['Spell checkers', 'DNA analysis', 'Version control']
  },
  {
    name: 'Matrix Chain Multiplication',
    description: 'Find optimal way to parenthesize matrix multiplications',
    timeComplexity: 'O(n³)',
    spaceComplexity: 'O(n²)',
    difficulty: 'Advanced',
    pattern: 'Interval DP',
    path: '/algorithms/dynamic-programming/matrix-chain',
    color: 'bg-pink-500',
    approach: ['Interval DP', 'Memoization', 'Optimal Parenthesization'],
    recurrence: 'dp[i][j] = min(dp[i][k] + dp[k+1][j] + cost(i,k,j))',
    useCases: ['Compiler optimization', 'GPU computations', 'Linear algebra']
  },
  {
    name: 'Palindrome Partitioning',
    description: 'Find minimum cuts to partition string into palindromes',
    timeComplexity: 'O(n³) / O(n²)',
    spaceComplexity: 'O(n²)',
    difficulty: 'Advanced',
    pattern: 'Partition DP',
    path: '/algorithms/dynamic-programming/palindrome-partition',
    color: 'bg-teal-500',
    approach: ['Preprocessing', 'Manacher Algorithm', 'Optimized DP'],
    recurrence: 'dp[i] = min(dp[j] + 1) for j < i where s[j+1:i] is palindrome',
    useCases: ['Text processing', 'String analysis', 'Compression algorithms']
  },
  {
    name: 'Maximum Subarray (Kadane)',
    description: 'Find contiguous subarray with maximum sum',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    difficulty: 'Beginner',
    pattern: 'Linear DP',
    path: '/algorithms/dynamic-programming/max-subarray',
    color: 'bg-cyan-500',
    approach: ['Kadane Algorithm', 'DP Approach', 'Divide & Conquer'],
    recurrence: 'maxSum = max(arr[i], maxSum + arr[i])',
    useCases: ['Stock trading', 'Signal processing', 'Image analysis']
  }
];

const dpPatterns = [
  {
    name: 'Linear DP',
    description: 'Problems with 1D state space',
    examples: ['Fibonacci', 'House Robber', 'Climbing Stairs'],
    icon: <Target className="h-8 w-8" />,
    color: 'text-green-600'
  },
  {
    name: '2D DP',
    description: 'Problems with 2D state space',
    examples: ['Knapsack', 'LCS', 'Grid Path'],
    icon: <Layers className="h-8 w-8" />,
    color: 'text-blue-600'
  },
  {
    name: 'Interval DP',
    description: 'Problems on ranges or intervals',
    examples: ['Matrix Chain', 'Burst Balloons', 'Optimal BST'],
    icon: <Puzzle className="h-8 w-8" />,
    color: 'text-purple-600'
  },
  {
    name: 'Tree DP',
    description: 'DP on tree structures',
    examples: ['Tree Diameter', 'House Robber III', 'Binary Tree Cameras'],
    icon: <Brain className="h-8 w-8" />,
    color: 'text-orange-600'
  }
];

const dpTechniques = [
  {
    name: 'Memoization (Top-Down)',
    description: 'Recursive approach with caching of results',
    pros: ['Natural recursive thinking', 'Computes only needed subproblems', 'Easy to implement'],
    cons: ['Function call overhead', 'Stack space usage', 'May hit recursion limits'],
    bestFor: 'Complex state transitions, when not all subproblems needed'
  },
  {
    name: 'Tabulation (Bottom-Up)',
    description: 'Iterative approach building solutions from base cases',
    pros: ['No recursion overhead', 'Better space optimization', 'Easier to optimize'],
    cons: ['Less intuitive', 'May compute unnecessary subproblems', 'Complex initialization'],
    bestFor: 'When all subproblems are needed, space optimization important'
  }
];

export default function DynamicProgrammingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Link href="/algorithms" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Algorithms
          </Link>
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Dynamic Programming</h1>
          <p className="text-xl text-slate-600 max-w-4xl leading-relaxed">
            Master the art of solving complex problems by breaking them into simpler subproblems. 
            Learn memoization, tabulation, and optimization techniques for efficient algorithms.
          </p>
        </motion.div>

        {/* DP Core Concepts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-12"
        >
          <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center">Dynamic Programming Fundamentals</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Optimal Substructure</h3>
              <p className="text-slate-600 text-sm">
                Optimal solution can be constructed from optimal solutions of subproblems
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Layers className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Overlapping Subproblems</h3>
              <p className="text-slate-600 text-sm">
                Same subproblems are solved multiple times in naive recursive approach
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Memoization</h3>
              <p className="text-slate-600 text-sm">
                Store and reuse results of expensive function calls for efficiency
              </p>
            </div>
          </div>
        </motion.div>

        {/* DP Patterns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Common DP Patterns</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dpPatterns.map((pattern, index) => (
              <motion.div
                key={pattern.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
              >
                <div className={`${pattern.color} mb-4 flex justify-center`}>
                  {pattern.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">{pattern.name}</h3>
                <p className="text-slate-600 text-sm mb-3">{pattern.description}</p>
                <div className="text-xs text-slate-500">
                  {pattern.examples.join(' • ')}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* DP Techniques Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-12"
        >
          <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center">Memoization vs Tabulation</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {dpTechniques.map((technique, _index) => (
              <div key={technique.name} className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-slate-800 mb-3">{technique.name}</h3>
                <p className="text-slate-600 mb-4">{technique.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-green-700 text-sm mb-1">Advantages:</h4>
                    <ul className="text-xs text-slate-600 space-y-1">
                      {technique.pros.map((pro, i) => (
                        <li key={i}>• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-red-700 text-sm mb-1">Disadvantages:</h4>
                    <ul className="text-xs text-slate-600 space-y-1">
                      {technique.cons.map((con, i) => (
                        <li key={i}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="border-t pt-3">
                    <h4 className="font-semibold text-blue-700 text-sm mb-1">Best For:</h4>
                    <p className="text-xs text-slate-600">{technique.bestFor}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* DP Problems Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Classic DP Problems</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dpAlgorithms.map((algorithm, index) => (
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
                    <span className="absolute top-2 right-2 bg-white bg-opacity-20 px-2 py-1 rounded text-xs text-white">
                      {algorithm.pattern}
                    </span>
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
                      <div className="mb-2">
                        <span className="text-xs font-semibold text-blue-700">Approaches:</span>
                        <div className="text-xs text-slate-600 mt-1">
                          {algorithm.approach.join(' • ')}
                        </div>
                      </div>
                      
                      <div className="mb-2">
                        <span className="text-xs font-semibold text-purple-700">Recurrence:</span>
                        <div className="text-xs text-slate-600 mt-1 font-mono bg-gray-50 p-2 rounded">
                          {algorithm.recurrence}
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-xs font-semibold text-green-700">Use Cases:</span>
                        <div className="text-xs text-slate-600 mt-1">
                          {algorithm.useCases.slice(0, 2).join(', ')}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Optimization Techniques */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-12"
        >
          <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center">Space Optimization Techniques</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-blue-700 mb-2">Rolling Array</h3>
              <p className="text-sm text-slate-600 mb-2">
                Use only current and previous rows instead of entire 2D table
              </p>
              <p className="text-xs text-slate-500">Example: 2D DP → O(2 × n) space</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-green-700 mb-2">State Compression</h3>
              <p className="text-sm text-slate-600 mb-2">
                Use bit manipulation to represent states compactly
              </p>
              <p className="text-xs text-slate-500">Example: Subset problems with bitmask</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-purple-700 mb-2">Coordinate Compression</h3>
              <p className="text-sm text-slate-600 mb-2">
                Map large coordinate space to smaller space
              </p>
              <p className="text-xs text-slate-500">Example: Large range → array indices</p>
            </div>
          </div>
        </motion.div>

        {/* Problem-Solving Strategy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-12"
        >
          <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center">DP Problem-Solving Steps</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: '1', title: 'Identify the Problem', desc: 'Look for optimal substructure and overlapping subproblems' },
              { step: '2', title: 'Define State', desc: 'What parameters uniquely identify a subproblem?' },
              { step: '3', title: 'Write Recurrence', desc: 'Express solution in terms of smaller subproblems' },
              { step: '4', title: 'Implement & Optimize', desc: 'Choose memoization or tabulation, optimize space' }
            ].map((item, _index) => (
              <div key={item.step} className="text-center">
                <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-orange-600 font-bold">{item.step}</span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-xs text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Interactive Learning Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="bg-gradient-to-r from-orange-600 to-red-600 rounded-lg p-8 text-white text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Master Dynamic Programming</h2>
          <p className="text-xl mb-6 opacity-90">
            Practice with interactive visualizations and step-by-step solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/algorithms/dynamic-programming/fibonacci" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors">
              <BookOpen className="h-5 w-5 inline mr-2" />
              Start with Fibonacci
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
            href="/algorithms/graph"
            className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Graph Algorithms
          </Link>
          
          <Link
            href="/algorithms/greedy"
            className="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            Next: Greedy Algorithms
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
