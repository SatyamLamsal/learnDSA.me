'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Play, Clock, Network, ArrowRight } from 'lucide-react';

const GraphVisualization = () => {
  const nodes = [
    { id: 'A', x: 50, y: 50 },
    { id: 'B', x: 150, y: 50 },
    { id: 'C', x: 100, y: 120 },
    { id: 'D', x: 200, y: 120 },
    { id: 'E', x: 50, y: 190 }
  ];
  
  const edges = [
    { from: 'A', to: 'B' },
    { from: 'A', to: 'C' },
    { from: 'B', to: 'D' },
    { from: 'C', to: 'E' },
    { from: 'D', to: 'E' }
  ];
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="relative w-full h-64 flex items-center justify-center">
        <svg width="250" height="240" className="absolute">
          {/* Edges */}
          {edges.map((edge, index) => {
            const fromNode = nodes.find(n => n.id === edge.from);
            const toNode = nodes.find(n => n.id === edge.to);
            return (
              <motion.line
                key={index}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                x1={fromNode?.x}
                y1={fromNode?.y}
                x2={toNode?.x}
                y2={toNode?.y}
                stroke="#6366f1"
                strokeWidth="2"
              />
            );
          })}
        </svg>
        
        {/* Nodes */}
        {nodes.map((node, index) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="absolute w-12 h-12 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold border-2 border-indigo-600"
            style={{ left: node.x - 24, top: node.y - 24 }}
          >
            {node.id}
          </motion.div>
        ))}
      </div>
      <div className="text-center text-sm text-gray-600 mt-4">
        <p>Network of vertices (nodes) connected by edges</p>
      </div>
    </div>
  );
};

export default function GraphsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-slate-800 mb-4">
            <span className="text-indigo-600">Graphs</span> Data Structure
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Graphs are collections of vertices (nodes) connected by edges. They represent 
            relationships and connections between entities, making them perfect for modeling 
            networks, social connections, maps, and many real-world scenarios.
          </p>
        </motion.div>

        {/* Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold text-center mb-6 text-slate-700">
            Graph Visualization
          </h2>
          <GraphVisualization />
        </motion.div>

        {/* Key Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-lg p-6 shadow-lg text-center"
          >
            <Network className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Versatile Connections</h3>
            <p className="text-gray-800 font-medium">Model any type of relationship between entities</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-lg p-6 shadow-lg text-center"
          >
            <Clock className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Efficient Algorithms</h3>
            <p className="text-gray-800 font-medium">Powerful algorithms for pathfinding and analysis</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-lg p-6 shadow-lg text-center"
          >
            <BookOpen className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Multiple Representations</h3>
            <p className="text-gray-800 font-medium">Adjacency matrix, adjacency list, edge list</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-lg p-6 shadow-lg text-center"
          >
            <Play className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Real-world Applications</h3>
            <p className="text-gray-800 font-medium">Social networks, maps, web crawling, AI</p>
          </motion.div>
        </div>

        {/* Graph Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-16"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-slate-700">
            Types of Graphs
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-4 border-2 border-indigo-200 rounded-lg">
              <h3 className="font-semibold text-indigo-700 mb-2">Directed Graph</h3>
              <p className="text-sm text-gray-600">Edges have direction (one-way relationships)</p>
            </div>
            <div className="text-center p-4 border-2 border-indigo-200 rounded-lg">
              <h3 className="font-semibold text-indigo-700 mb-2">Undirected Graph</h3>
              <p className="text-sm text-gray-600">Edges are bidirectional (mutual relationships)</p>
            </div>
            <div className="text-center p-4 border-2 border-indigo-200 rounded-lg">
              <h3 className="font-semibold text-indigo-700 mb-2">Weighted Graph</h3>
              <p className="text-sm text-gray-600">Edges have weights/costs associated</p>
            </div>
            <div className="text-center p-4 border-2 border-indigo-200 rounded-lg">
              <h3 className="font-semibold text-indigo-700 mb-2">Cyclic Graph</h3>
              <p className="text-sm text-gray-600">Contains cycles (paths back to starting node)</p>
            </div>
            <div className="text-center p-4 border-2 border-indigo-200 rounded-lg">
              <h3 className="font-semibold text-indigo-700 mb-2">Acyclic Graph</h3>
              <p className="text-sm text-gray-600">No cycles present (DAG - Directed Acyclic Graph)</p>
            </div>
            <div className="text-center p-4 border-2 border-indigo-200 rounded-lg">
              <h3 className="font-semibold text-indigo-700 mb-2">Connected Graph</h3>
              <p className="text-sm text-gray-600">Path exists between every pair of vertices</p>
            </div>
          </div>
        </motion.div>

        {/* Graph Algorithms & Use Cases */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h3 className="text-2xl font-semibold mb-6 text-slate-700">Common Algorithms</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-indigo-500 pl-4">
                <h4 className="font-semibold">Breadth-First Search (BFS)</h4>
                <p className="text-gray-600">Explore neighbors before going deeper</p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4">
                <h4 className="font-semibold">Depth-First Search (DFS)</h4>
                <p className="text-gray-600">Explore as far as possible before backtracking</p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4">
                <h4 className="font-semibold">Dijkstra&apos;s Algorithm</h4>
                <p className="text-gray-600">Find shortest path in weighted graphs</p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4">
                <h4 className="font-semibold">Topological Sort</h4>
                <p className="text-gray-600">Linear ordering of vertices in DAG</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h3 className="text-2xl font-semibold mb-6 text-slate-700">Real-world Applications</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-indigo-500 pl-4">
                <h4 className="font-semibold">Social Networks</h4>
                <p className="text-gray-600">Facebook friends, Twitter followers</p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4">
                <h4 className="font-semibold">GPS Navigation</h4>
                <p className="text-gray-600">Road networks and route planning</p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4">
                <h4 className="font-semibold">Web Crawling</h4>
                <p className="text-gray-600">Following links between web pages</p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4">
                <h4 className="font-semibold">Recommendation Systems</h4>
                <p className="text-gray-600">Product recommendations based on connections</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Time Complexity Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-16"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-slate-700">
            Time Complexity (Graph Operations)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-indigo-100">
                  <th className="border border-indigo-300 px-4 py-3 font-semibold">Operation</th>
                  <th className="border border-indigo-300 px-4 py-3 font-semibold">Adjacency Matrix</th>
                  <th className="border border-indigo-300 px-4 py-3 font-semibold">Adjacency List</th>
                  <th className="border border-indigo-300 px-4 py-3 font-semibold">Edge List</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-indigo-300 px-4 py-3">Add Vertex</td>
                  <td className="border border-indigo-300 px-4 py-3 text-red-600 font-mono">O(V²)</td>
                  <td className="border border-indigo-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                  <td className="border border-indigo-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-indigo-300 px-4 py-3">Add Edge</td>
                  <td className="border border-indigo-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                  <td className="border border-indigo-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                  <td className="border border-indigo-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                </tr>
                <tr>
                  <td className="border border-indigo-300 px-4 py-3">Check Edge</td>
                  <td className="border border-indigo-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                  <td className="border border-indigo-300 px-4 py-3 text-yellow-600 font-mono">O(V)</td>
                  <td className="border border-indigo-300 px-4 py-3 text-red-600 font-mono">O(E)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-indigo-300 px-4 py-3">Get Neighbors</td>
                  <td className="border border-indigo-300 px-4 py-3 text-yellow-600 font-mono">O(V)</td>
                  <td className="border border-indigo-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                  <td className="border border-indigo-300 px-4 py-3 text-red-600 font-mono">O(E)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p><strong>Space Complexity:</strong> Matrix: O(V²), List: O(V + E), Edge List: O(E)</p>
            <p><strong>V:</strong> Number of vertices, <strong>E:</strong> Number of edges</p>
          </div>
        </motion.div>

        {/* Navigation Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <Link href="/data-structures/graphs/theory" className="block bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <BookOpen className="h-8 w-8 text-indigo-600" />
                <ArrowRight className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Learn Theory</h3>
              <p className="text-gray-600">
                Explore graph theory, algorithms, and practical implementations
              </p>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <Link href="/data-structures/graphs/simulation" className="block bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <Play className="h-8 w-8 text-indigo-600" />
                <ArrowRight className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Simulation</h3>
              <p className="text-gray-600">
                Build graphs and run algorithms with interactive visualization tools
              </p>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}