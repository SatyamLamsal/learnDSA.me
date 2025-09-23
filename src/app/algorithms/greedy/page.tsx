'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Play, Target, Zap, ArrowLeft, ArrowRight, TrendingUp, Award, Clock, DollarSign } from 'lucide-react';

const greedyAlgorithms = [
  {
    name: 'Activity Selection Problem',
    description: 'Select maximum number of non-overlapping activities',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(1)',
    difficulty: 'Beginner',
    strategy: 'Earliest Finish Time',
    path: '/algorithms/greedy/activity-selection',
    color: 'bg-green-500',
    approach: 'Sort by finish time, select greedily',
    proof: 'Exchange argument - greedy choice is always part of optimal solution',
    useCases: ['Meeting scheduling', 'Resource allocation', 'Task scheduling']
  },
  {
    name: 'Fractional Knapsack',
    description: 'Maximize value by taking fractions of items within weight limit',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(1)',
    difficulty: 'Beginner',
    strategy: 'Highest Value-to-Weight Ratio',
    path: '/algorithms/greedy/fractional-knapsack',
    color: 'bg-blue-500',
    approach: 'Sort by value/weight ratio, take greedily',
    proof: 'Cut-and-paste argument proves optimality',
    useCases: ['Resource optimization', 'Investment portfolio', 'Load balancing']
  },
  {
    name: 'Huffman Coding',
    description: 'Optimal prefix-free binary encoding for data compression',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    difficulty: 'Intermediate',
    strategy: 'Minimum Frequency First',
    path: '/algorithms/greedy/huffman-coding',
    color: 'bg-purple-500',
    approach: 'Build tree bottom-up merging least frequent nodes',
    proof: 'Optimal substructure and greedy choice property',
    useCases: ['Data compression', 'File encoding', 'Network protocols']
  },
  {
    name: 'Job Scheduling with Deadlines',
    description: 'Schedule jobs to maximize profit within deadlines',
    timeComplexity: 'O(n²) / O(n log n)',
    spaceComplexity: 'O(n)',
    difficulty: 'Intermediate',
    strategy: 'Highest Profit First',
    path: '/algorithms/greedy/job-scheduling',
    color: 'bg-orange-500',
    approach: 'Sort by profit, schedule at latest possible time',
    proof: 'Exchange argument with disjoint set optimization',
    useCases: ['Project management', 'CPU scheduling', 'Workflow optimization']
  },
  {
    name: 'Coin Change (Greedy)',
    description: 'Make change with minimum number of coins (for canonical systems)',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    difficulty: 'Beginner',
    strategy: 'Largest Denomination First',
    path: '/algorithms/greedy/coin-change-greedy',
    color: 'bg-red-500',
    approach: 'Always pick largest coin ≤ remaining amount',
    proof: 'Works only for canonical coin systems (US, Euro)',
    useCases: ['Cash registers', 'Vending machines', 'Currency exchange']
  },
  {
    name: "Kruskal's MST Algorithm",
    description: 'Find minimum spanning tree using edge-based greedy approach',
    timeComplexity: 'O(E log E)',
    spaceComplexity: 'O(V)',
    difficulty: 'Intermediate',
    strategy: 'Minimum Weight Edge First',
    path: '/algorithms/greedy/kruskal-mst',
    color: 'bg-indigo-500',
    approach: 'Sort edges, add if no cycle (union-find)',
    proof: 'Cut property - minimum edge crossing any cut is in MST',
    useCases: ['Network design', 'Circuit layout', 'Clustering']
  },
  {
    name: "Prim's MST Algorithm",
    description: 'Build minimum spanning tree by growing from starting vertex',
    timeComplexity: 'O(E log V)',
    spaceComplexity: 'O(V)',
    difficulty: 'Intermediate',
    strategy: 'Minimum Edge from Tree',
    path: '/algorithms/greedy/prim-mst',
    color: 'bg-pink-500',
    approach: 'Maintain tree, add minimum edge to new vertex',
    proof: 'Cut property applied to tree vs non-tree vertices',
    useCases: ['Network infrastructure', 'Road construction', 'Utility networks']
  },
  {
    name: "Dijkstra's Shortest Path",
    description: 'Find shortest paths from source using greedy edge relaxation',
    timeComplexity: 'O((V + E) log V)',
    spaceComplexity: 'O(V)',
    difficulty: 'Intermediate',
    strategy: 'Closest Unvisited Vertex',
    path: '/algorithms/greedy/dijkstra-shortest-path',
    color: 'bg-teal-500',
    approach: 'Maintain distances, always relax from closest vertex',
    proof: 'Optimal substructure with non-negative weights',
    useCases: ['GPS navigation', 'Network routing', 'Game pathfinding']
  },
  {
    name: 'Gas Station Problem',
    description: 'Find starting gas station to complete circular tour',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    difficulty: 'Intermediate',
    strategy: 'Reset at Deficit',
    path: '/algorithms/greedy/gas-station',
    color: 'bg-cyan-500',
    approach: 'Track surplus, reset start when deficit occurs',
    proof: 'If solution exists, greedy choice finds it',
    useCases: ['Route planning', 'Resource planning', 'Fuel optimization']
  }
];

const greedyPrinciples = [
  {
    name: 'Greedy Choice Property',
    description: 'A globally optimal solution can be reached by making locally optimal choices',
    icon: <Target className="h-8 w-8" />,
    color: 'text-green-600',
    example: 'In activity selection, choosing earliest finish time is always optimal'
  },
  {
    name: 'Optimal Substructure',
    description: 'An optimal solution contains optimal solutions to subproblems',
    icon: <TrendingUp className="h-8 w-8" />,
    color: 'text-blue-600',
    example: 'In MST, removing any edge gives optimal spanning tree for remaining vertices'
  },
  {
    name: 'No Backtracking',
    description: 'Once a choice is made, it is never reconsidered or undone',
    icon: <Zap className="h-8 w-8" />,
    color: 'text-purple-600',
    example: 'Dijkstra never updates distance to visited vertices'
  }
];

const proofTechniques = [
  {
    name: 'Exchange Argument',
    description: 'Show that any optimal solution can be transformed to greedy solution without losing optimality',
    example: 'Activity Selection: Exchange any activity with later finish time for earlier one',
    steps: ['Start with optimal solution', 'Exchange non-greedy choice with greedy one', 'Prove new solution is still optimal']
  },
  {
    name: 'Cut-and-Paste',
    description: 'Remove part of optimal solution and replace with greedy choice',
    example: 'Fractional Knapsack: Replace any item with lower ratio with higher ratio item',
    steps: ['Remove suboptimal part', 'Replace with greedy choice', 'Show improvement or equality']
  },
  {
    name: 'Stays Ahead',
    description: 'Prove greedy algorithm always maintains better or equal state than any other algorithm',
    example: 'Dijkstra: Greedy distances are always ≤ actual shortest distances',
    steps: ['Define invariant', 'Prove invariant maintained', 'Show invariant implies optimality']
  }
];

export default function GreedyAlgorithmsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Link href="/algorithms" className="inline-flex items-center text-green-600 hover:text-green-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Algorithms
          </Link>
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Greedy Algorithms</h1>
          <p className="text-xl text-slate-600 max-w-4xl leading-relaxed">
            Learn to solve optimization problems by making the best local choice at each step. 
            Master the greedy approach and understand when it leads to globally optimal solutions.
          </p>
        </motion.div>

        {/* Greedy Principles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Greedy Algorithm Principles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {greedyPrinciples.map((principle, index) => (
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
                <h3 className="text-lg font-semibold text-slate-800 mb-3">{principle.name}</h3>
                <p className="text-slate-600 text-sm mb-4">{principle.description}</p>
                <div className="bg-gray-50 p-3 rounded text-xs text-slate-500">
                  <strong>Example:</strong> {principle.example}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Algorithm vs Strategy Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-12"
        >
          <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center">Greedy vs Other Approaches</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Greedy Algorithm</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Make locally optimal choice</li>
                <li>• Never reconsider decisions</li>
                <li>• Fast and simple</li>
                <li>• Works for specific problems</li>
              </ul>
            </div>
            <div className="text-center">
              <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Dynamic Programming</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Consider all subproblems</li>
                <li>• Optimal substructure</li>
                <li>• Slower but more general</li>
                <li>• Guaranteed optimal solution</li>
              </ul>
            </div>
            <div className="text-center">
              <DollarSign className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Brute Force</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Try all possibilities</li>
                <li>• Guaranteed optimal</li>
                <li>• Exponential time</li>
                <li>• Impractical for large inputs</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Greedy Algorithms Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Classic Greedy Algorithms</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {greedyAlgorithms.map((algorithm, index) => (
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
                  </div>
                  <div className="p-6">
                    <p className="text-slate-600 text-sm mb-4">{algorithm.description}</p>
                    
                    <div className="mb-4">
                      <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                        <span className="text-xs font-semibold text-yellow-800">Strategy:</span>
                        <p className="text-xs text-yellow-700 mt-1">{algorithm.strategy}</p>
                      </div>
                    </div>
                    
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
                        <span className="text-xs font-semibold text-blue-700">Approach:</span>
                        <p className="text-xs text-slate-600 mt-1">{algorithm.approach}</p>
                      </div>
                      
                      <div className="mb-2">
                        <span className="text-xs font-semibold text-purple-700">Proof Technique:</span>
                        <p className="text-xs text-slate-600 mt-1">{algorithm.proof}</p>
                      </div>
                      
                      <div>
                        <span className="text-xs font-semibold text-green-700">Use Cases:</span>
                        <p className="text-xs text-slate-600 mt-1">
                          {algorithm.useCases.slice(0, 2).join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Proof Techniques */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-12"
        >
          <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center">Proof Techniques for Greedy Algorithms</h2>
          <div className="space-y-6">
            {proofTechniques.map((technique, index) => (
              <div key={technique.name} className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-semibold text-green-700 mb-2">{technique.name}</h3>
                <p className="text-slate-600 mb-3">{technique.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-slate-700 text-sm mb-2">Example Application:</h4>
                    <p className="text-sm text-slate-600 bg-gray-50 p-3 rounded">{technique.example}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-700 text-sm mb-2">Proof Steps:</h4>
                    <ol className="text-sm text-slate-600 space-y-1">
                      {technique.steps.map((step, i) => (
                        <li key={i}>
                          <span className="font-medium text-green-600">{i + 1}.</span> {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* When Greedy Works/Fails */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-12"
        >
          <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center">When Does Greedy Work?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-green-700 mb-4">✅ Greedy Works Well</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-slate-700">Scheduling Problems</h4>
                  <p className="text-sm text-slate-600">Activity selection, job scheduling with deadlines</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-slate-700">Graph Problems</h4>
                  <p className="text-sm text-slate-600">MST (Kruskal, Prim), shortest path (Dijkstra)</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-slate-700">Optimization with Ratios</h4>
                  <p className="text-sm text-slate-600">Fractional knapsack, Huffman coding</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-slate-700">Canonical Systems</h4>
                  <p className="text-sm text-slate-600">Coin change for standard currencies</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-red-700 mb-4">❌ Greedy Fails</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-slate-700">0/1 Knapsack</h4>
                  <p className="text-sm text-slate-600">Cannot take fractions - need DP instead</p>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-slate-700">Longest Path Problem</h4>
                  <p className="text-sm text-slate-600">Greedy choices don&apos;t lead to global optimum</p>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-slate-700">Non-canonical Coin Systems</h4>
                  <p className="text-sm text-slate-600">Example: coins [1, 3, 4] for amount 6</p>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-slate-700">Traveling Salesman</h4>
                  <p className="text-sm text-slate-600">Nearest neighbor heuristic not optimal</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Interactive Learning Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-green-600 to-yellow-600 rounded-lg p-8 text-white text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Practice Greedy Algorithms</h2>
          <p className="text-xl mb-6 opacity-90">
            Visualize greedy choices and see how local optimizations lead to global solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/algorithms/greedy/activity-selection" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
              <BookOpen className="h-5 w-5 inline mr-2" />
              Start with Activity Selection
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
            href="/algorithms/dynamic-programming"
            className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dynamic Programming
          </Link>
          
          <Link
            href="/algorithms/divide-and-conquer"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Next: Divide & Conquer
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}