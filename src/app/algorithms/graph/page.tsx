"use client";
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Network, Route, ArrowLeft, ArrowRight, GitBranch, MapPin } from 'lucide-react';

const graphAlgorithms = [
  {
    name: 'Breadth-First Search (BFS)',
    description: 'Explores graph level by level, finding shortest path in unweighted graphs',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    difficulty: 'Beginner',
    type: 'Traversal',
    path: '/algorithms/graph/bfs',
    color: 'bg-blue-500',
    pros: ['Finds shortest path', 'Explores systematically', 'Complete algorithm'],
    cons: ['Uses more memory', 'Not optimal for deep trees'],
    useCases: ['Shortest path in unweighted graphs', 'Social network analysis', 'Web crawling']
  },
  {
    name: 'Depth-First Search (DFS)',
    description: 'Explores as far as possible along each branch before backtracking',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    difficulty: 'Beginner',
    type: 'Traversal',
    path: '/algorithms/graph/dfs',
    color: 'bg-green-500',
    pros: ['Memory efficient', 'Can detect cycles', 'Simple implementation'],
    cons: ['May get stuck in deep paths', 'No shortest path guarantee'],
    useCases: ['Topological sorting', 'Cycle detection', 'Maze solving']
  },
  {
    name: "Dijkstra's Algorithm",
    description: 'Finds shortest path from source to all vertices in weighted graphs',
    timeComplexity: 'O((V + E) log V)',
    spaceComplexity: 'O(V)',
    difficulty: 'Intermediate',
    type: 'Shortest Path',
    path: '/algorithms/graph/dijkstra',
    color: 'bg-purple-500',
    pros: ['Optimal for non-negative weights', 'Widely applicable', 'Well-established'],
    cons: ['Cannot handle negative weights', 'Can be slow for dense graphs'],
    useCases: ['GPS navigation', 'Network routing', 'Flight connections']
  },
  {
    name: 'Bellman-Ford Algorithm',
    description: 'Finds shortest paths and detects negative weight cycles',
    timeComplexity: 'O(V × E)',
    spaceComplexity: 'O(V)',
    difficulty: 'Intermediate',
    type: 'Shortest Path',
    path: '/algorithms/graph/bellman-ford',
    color: 'bg-red-500',
    pros: ['Handles negative weights', 'Detects negative cycles', 'Simple to understand'],
    cons: ['Slower than Dijkstra', 'Poor performance on dense graphs'],
    useCases: ['Currency exchange', 'Network with negative costs', 'Arbitrage detection']
  },
  {
    name: 'Floyd-Warshall Algorithm',
    description: 'Finds shortest paths between all pairs of vertices',
    timeComplexity: 'O(V³)',
    spaceComplexity: 'O(V²)',
    difficulty: 'Intermediate',
    type: 'All Pairs Shortest Path',
    path: '/algorithms/graph/floyd-warshall',
    color: 'bg-orange-500',
    pros: ['All pairs shortest path', 'Handles negative weights', 'Simple dynamic programming'],
    cons: ['High time complexity', 'Large space requirement', 'Not suitable for sparse graphs'],
    useCases: ['Distance matrices', 'Transitive closure', 'Game pathfinding']
  },
  {
    name: "Kruskal's Algorithm",
    description: 'Finds minimum spanning tree by selecting edges in ascending order',
    timeComplexity: 'O(E log E)',
    spaceComplexity: 'O(V)',
    difficulty: 'Intermediate',
    type: 'Minimum Spanning Tree',
    path: '/algorithms/graph/kruskal',
    color: 'bg-indigo-500',
    pros: ['Simple greedy approach', 'Works well for sparse graphs', 'Optimal MST'],
    cons: ['Requires edge sorting', 'Union-find overhead'],
    useCases: ['Network design', 'Circuit design', 'Clustering algorithms']
  },
  {
    name: "Prim's Algorithm",
    description: 'Builds minimum spanning tree by growing tree from starting vertex',
    timeComplexity: 'O(E log V)',
    spaceComplexity: 'O(V)',
    difficulty: 'Intermediate',
    type: 'Minimum Spanning Tree',
    path: '/algorithms/graph/prim',
    color: 'bg-pink-500',
    pros: ['Good for dense graphs', 'Can start from any vertex', 'Incremental construction'],
    cons: ['More complex than Kruskal', 'Requires priority queue'],
    useCases: ['Network infrastructure', 'Maze generation', 'Approximation algorithms']
  },
  {
    name: 'Topological Sort',
    description: 'Linear ordering of vertices in directed acyclic graph (DAG)',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    difficulty: 'Intermediate',
    type: 'Graph Ordering',
    path: '/algorithms/graph/topological-sort',
    color: 'bg-teal-500',
    pros: ['Essential for DAG problems', 'Multiple algorithms available', 'Linear time'],
    cons: ['Only works on DAGs', 'Multiple valid orderings possible'],
    useCases: ['Task scheduling', 'Build systems', 'Course prerequisites']
  },
  {
    name: 'Strongly Connected Components',
    description: 'Finds maximal strongly connected subgraphs using algorithms like Tarjan or Kosaraju',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    difficulty: 'Advanced',
    type: 'Graph Analysis',
    path: '/algorithms/graph/scc',
    color: 'bg-cyan-500',
    pros: ['Important graph property', 'Linear time algorithms', 'Many applications'],
    cons: ['Complex implementation', 'Requires deep understanding'],
    useCases: ['Social network analysis', 'Dependency analysis', 'Compiler optimization']
  }
];

const algorithmTypes = [
  {
    name: 'Graph Traversal',
    description: 'Systematically visit all vertices and edges',
    algorithms: ['BFS', 'DFS'],
    icon: <GitBranch className="h-8 w-8" />,
    color: 'text-blue-600'
  },
  {
    name: 'Shortest Path',
    description: 'Find optimal paths between vertices',
    algorithms: ['Dijkstra', 'Bellman-Ford', 'Floyd-Warshall'],
    icon: <Route className="h-8 w-8" />,
    color: 'text-green-600'
  },
  {
    name: 'Minimum Spanning Tree',
    description: 'Connect all vertices with minimum total weight',
    algorithms: ['Kruskal', 'Prim'],
    icon: <Network className="h-8 w-8" />,
    color: 'text-purple-600'
  },
  {
    name: 'Graph Properties',
    description: 'Analyze structural properties of graphs',
    algorithms: ['Topological Sort', 'SCC', 'Cycle Detection'],
    icon: <MapPin className="h-8 w-8" />,
    color: 'text-orange-600'
  }
];

export default function GraphAlgorithmsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Link href="/algorithms" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Algorithms
          </Link>
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Graph Algorithms</h1>
          <p className="text-xl text-slate-600 max-w-4xl leading-relaxed">
            Master algorithms for analyzing networks, relationships, and connected data. From basic traversals 
            to advanced pathfinding and network optimization algorithms.
          </p>
        </motion.div>

        {/* Algorithm Types Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {algorithmTypes.map((type, index) => (
            <motion.div
              key={type.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
            >
              <div className={`${type.color} mb-4 flex justify-center`}>
                {type.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{type.name}</h3>
              <p className="text-slate-600 text-sm mb-3">{type.description}</p>
              <div className="text-xs text-slate-500">
                {type.algorithms.join(' • ')}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Graph Algorithms Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Essential Graph Algorithms</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {graphAlgorithms.map((algorithm, index) => (
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

        {/* Graph Representations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-12"
        >
          <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center">Graph Representations</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">Adjacency Matrix</h3>
              <div className="space-y-2 text-sm">
                <p className="text-slate-600">2D array where matrix[i][j] = 1 if edge exists between vertex i and j</p>
                <div className="bg-blue-50 p-4 rounded">
                  <p><strong>Time Complexity:</strong> O(1) edge lookup, O(V²) space</p>
                  <p><strong>Best for:</strong> Dense graphs, frequent edge queries</p>
                  <p><strong>Cons:</strong> High space usage, inefficient for sparse graphs</p>
                </div>
              </div>
            </div>
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-xl font-semibold text-green-700 mb-3">Adjacency List</h3>
              <div className="space-y-2 text-sm">
                <p className="text-slate-600">Array of lists where list[i] contains all neighbors of vertex i</p>
                <div className="bg-green-50 p-4 rounded">
                  <p><strong>Time Complexity:</strong> O(degree) edge lookup, O(V + E) space</p>
                  <p><strong>Best for:</strong> Sparse graphs, memory efficiency</p>
                  <p><strong>Cons:</strong> Slower edge existence check</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Algorithm Selection Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-12"
        >
          <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center">When to Use Each Algorithm</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-blue-700 mb-2">Graph Exploration</h3>
                <p className="text-sm text-slate-600">Use <strong>BFS</strong> for shortest path in unweighted graphs, <strong>DFS</strong> for cycle detection and topological sorting</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-semibold text-purple-700 mb-2">Single-Source Shortest Path</h3>
                <p className="text-sm text-slate-600">Use <strong>Dijkstra</strong> for non-negative weights, <strong>Bellman-Ford</strong> when negative edges exist</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-semibold text-orange-700 mb-2">All-Pairs Shortest Path</h3>
                <p className="text-sm text-slate-600">Use <strong>Floyd-Warshall</strong> for small dense graphs, run Dijkstra from each vertex for sparse graphs</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="border-l-4 border-indigo-500 pl-4">
                <h3 className="font-semibold text-indigo-700 mb-2">Minimum Spanning Tree</h3>
                <p className="text-sm text-slate-600">Use <strong>Kruskal</strong> for sparse graphs, <strong>Prim</strong> for dense graphs or when starting vertex matters</p>
              </div>
              <div className="border-l-4 border-teal-500 pl-4">
                <h3 className="font-semibold text-teal-700 mb-2">Task Scheduling</h3>
                <p className="text-sm text-slate-600">Use <strong>Topological Sort</strong> for dependency resolution and ordering problems</p>
              </div>
              <div className="border-l-4 border-cyan-500 pl-4">
                <h3 className="font-semibold text-cyan-700 mb-2">Network Analysis</h3>
                <p className="text-sm text-slate-600">Use <strong>SCC algorithms</strong> to identify clusters and strongly connected components</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Complexity Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-12"
        >
          <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center">Time Complexity Summary</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left p-3 font-semibold text-slate-700">Algorithm</th>
                  <th className="text-center p-3 font-semibold text-slate-700">Time Complexity</th>
                  <th className="text-center p-3 font-semibold text-slate-700">Space Complexity</th>
                  <th className="text-center p-3 font-semibold text-slate-700">Graph Type</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'BFS / DFS', time: 'O(V + E)', space: 'O(V)', type: 'Any' },
                  { name: 'Dijkstra', time: 'O((V + E) log V)', space: 'O(V)', type: 'Non-negative weights' },
                  { name: 'Bellman-Ford', time: 'O(V × E)', space: 'O(V)', type: 'Any weighted' },
                  { name: 'Floyd-Warshall', time: 'O(V³)', space: 'O(V²)', type: 'Any weighted' },
                  { name: 'Kruskal', time: 'O(E log E)', space: 'O(V)', type: 'Undirected weighted' },
                  { name: 'Prim', time: 'O(E log V)', space: 'O(V)', type: 'Undirected weighted' }
                ].map((row, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="p-3 font-medium text-slate-800">{row.name}</td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">{row.time}</span>
                    </td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">{row.space}</span>
                    </td>
                    <td className="p-3 text-center text-xs text-slate-600">{row.type}</td>
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
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-8 text-white text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Explore Graph Algorithms</h2>
          <p className="text-xl mb-6 opacity-90">
            Visualize networks and see algorithms work on real graph structures
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/algorithms/graph/bfs" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
              <BookOpen className="h-5 w-5 inline mr-2" />
              Start with BFS
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
            href="/algorithms/searching"
            className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Searching
          </Link>
          
          <Link
            href="/algorithms/dynamic-programming"
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Next: Dynamic Programming
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
