"use client";
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Play, Clock, GitBranch, ArrowRight } from 'lucide-react';

const TreeVisualization = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg text-gray-700">
      <div className="flex flex-col items-center text-gray-700">
        {/* Root */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold mb-4 text-gray-800"
        >
          50
        </motion.div>
        
        {/* Level 1 */}
        <div className="flex items-center space-x-16 mb-4 text-gray-700">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-gray-800"
          >
            30
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-gray-800"
          >
            70
          </motion.div>
        </div>
        
        {/* Level 2 */}
        <div className="flex items-center space-x-8 mb-4 text-gray-700">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="w-10 h-10 bg-purple-400 text-white rounded-full flex items-center justify-center font-bold text-sm text-gray-600"
          >
            20
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
            className="w-10 h-10 bg-purple-400 text-white rounded-full flex items-center justify-center font-bold text-sm text-gray-600"
          >
            40
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1 }}
            className="w-10 h-10 bg-purple-400 text-white rounded-full flex items-center justify-center font-bold text-sm text-gray-600"
          >
            60
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3 }}
            className="w-10 h-10 bg-purple-400 text-white rounded-full flex items-center justify-center font-bold text-sm text-gray-600"
          >
            80
          </motion.div>
        </div>
        
        {/* Connection lines would be drawn with SVG in a real implementation */}
        <div className="text-center text-sm text-gray-600 mt-4">
          <p>Hierarchical structure with parent-child relationships</p>
        </div>
      </div>
    </div>
  );
};

export default function TreesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 text-gray-700">
      <div className="container mx-auto px-4 py-12 text-gray-700">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 text-gray-700"
        >
          <h1 className="text-5xl font-bold text-slate-800 mb-4">
            <span className="text-purple-600">Trees</span> Data Structure
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Trees are hierarchical data structures with a root node and child nodes forming 
            a hierarchy. Each node can have zero or more children, and there&apos;s exactly one 
            path between any two nodes. Perfect for representing hierarchical relationships.
          </p>
        </motion.div>

        {/* Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 text-gray-700"
        >
          <h2 className="text-2xl font-semibold text-center mb-6 text-slate-700">
            Binary Tree Visualization
          </h2>
          <TreeVisualization />
        </motion.div>

        {/* Key Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 text-gray-700">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-lg p-6 shadow-lg text-center text-gray-700"
          >
            <GitBranch className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Hierarchical Structure</h3>
            <p className="text-gray-800 font-medium">Natural representation of hierarchical data</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-lg p-6 shadow-lg text-center text-gray-700"
          >
            <Clock className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Efficient Operations</h3>
            <p className="text-gray-800 font-medium">O(log n) search, insertion, and deletion in balanced trees</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-lg p-6 shadow-lg text-center text-gray-700"
          >
            <BookOpen className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Recursive Nature</h3>
            <p className="text-gray-800 font-medium">Each subtree is also a tree, enabling recursive algorithms</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-lg p-6 shadow-lg text-center text-gray-700"
          >
            <Play className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Multiple Traversals</h3>
            <p className="text-gray-800 font-medium">Various ways to visit nodes: inorder, preorder, postorder</p>
          </motion.div>
        </div>

        

        {/* Tree Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-16 text-gray-700"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-slate-700">
            Types of Trees
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700">
            <div className="text-center p-4 border-2 border-purple-200 rounded-lg text-gray-700">
              <h3 className="font-semibold text-purple-700 mb-2">Binary Tree</h3>
              <p className="text-sm text-gray-600">Each node has at most two children</p>
            </div>
            <div className="text-center p-4 border-2 border-purple-200 rounded-lg text-gray-700">
              <h3 className="font-semibold text-purple-700 mb-2">Binary Search Tree</h3>
              <p className="text-sm text-gray-600">Left child &lt; parent &lt; right child</p>
            </div>
            <div className="text-center p-4 border-2 border-purple-200 rounded-lg text-gray-700">
              <h3 className="font-semibold text-purple-700 mb-2">AVL Tree</h3>
              <p className="text-sm text-gray-600">Self-balancing binary search tree</p>
            </div>
            <div className="text-center p-4 border-2 border-purple-200 rounded-lg text-gray-700">
              <h3 className="font-semibold text-purple-700 mb-2">Red-Black Tree</h3>
              <p className="text-sm text-gray-600">Balanced tree with color properties</p>
            </div>
            <div className="text-center p-4 border-2 border-purple-200 rounded-lg text-gray-700">
              <h3 className="font-semibold text-purple-700 mb-2">Heap</h3>
              <p className="text-sm text-gray-600">Complete binary tree with heap property</p>
            </div>
            <div className="text-center p-4 border-2 border-purple-200 rounded-lg text-gray-700">
              <h3 className="font-semibold text-purple-700 mb-2">Trie</h3>
              <p className="text-sm text-gray-600">Tree for storing strings efficiently</p>
            </div>
          </div>
        </motion.div>

        {/* Tree Terminology */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 text-gray-700">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-white rounded-lg shadow-lg p-8 text-gray-700"
          >
            <h3 className="text-2xl font-semibold mb-6 text-slate-700">Key Terminology</h3>
            <div className="space-y-4 text-gray-700">
              <div className="border-l-4 border-purple-500 pl-4 text-gray-700">
                <h4 className="font-semibold text-gray-800">Root</h4>
                <p className="text-gray-600">The topmost node with no parent</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4 text-gray-700">
                <h4 className="font-semibold text-gray-800">Leaf</h4>
                <p className="text-gray-600">A node with no children</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4 text-gray-700">
                <h4 className="font-semibold text-gray-800">Height</h4>
                <p className="text-gray-600">Maximum distance from root to any leaf</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4 text-gray-700">
                <h4 className="font-semibold text-gray-800">Depth</h4>
                <p className="text-gray-600">Distance from root to a specific node</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="bg-white rounded-lg shadow-lg p-8 text-gray-700"
          >
            <h3 className="text-2xl font-semibold mb-6 text-slate-700">Common Use Cases</h3>
            <div className="space-y-4 text-gray-700">
              <div className="border-l-4 border-purple-500 pl-4 text-gray-700">
                <h4 className="font-semibold text-gray-800">File Systems</h4>
                <p className="text-gray-600">Directory and file organization</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4 text-gray-700">
                <h4 className="font-semibold text-gray-800">Database Indexing</h4>
                <p className="text-gray-600">B-trees for efficient database operations</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4 text-gray-700">
                <h4 className="font-semibold text-gray-800">Expression Parsing</h4>
                <p className="text-gray-600">Abstract syntax trees for compilers</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4 text-gray-700">
                <h4 className="font-semibold text-gray-800">Decision Making</h4>
                <p className="text-gray-600">Decision trees in AI and machine learning</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Time Complexity Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-16 text-gray-700"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-slate-700">
            Time Complexity (Binary Search Tree)
          </h2>
          <div className="overflow-x-auto text-gray-700">
            <table className="w-full text-left border-collapse text-gray-700">
              <thead>
                <tr className="bg-purple-100 text-gray-700">
                  <th className="border border-purple-300 px-4 py-3 font-semibold text-gray-800">Operation</th>
                  <th className="border border-purple-300 px-4 py-3 font-semibold text-gray-800">Average Case</th>
                  <th className="border border-purple-300 px-4 py-3 font-semibold text-gray-800">Worst Case</th>
                  <th className="border border-purple-300 px-4 py-3 font-semibold text-gray-800">Best Case</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-purple-300 px-4 py-3 text-gray-700">Search</td>
                  <td className="border border-purple-300 px-4 py-3 text-yellow-600 font-mono">O(log n)</td>
                  <td className="border border-purple-300 px-4 py-3 text-red-600 font-mono">O(n)</td>
                  <td className="border border-purple-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                </tr>
                <tr className="bg-gray-50 text-gray-700">
                  <td className="border border-purple-300 px-4 py-3 text-gray-700">Insertion</td>
                  <td className="border border-purple-300 px-4 py-3 text-yellow-600 font-mono">O(log n)</td>
                  <td className="border border-purple-300 px-4 py-3 text-red-600 font-mono">O(n)</td>
                  <td className="border border-purple-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                </tr>
                <tr>
                  <td className="border border-purple-300 px-4 py-3 text-gray-700">Deletion</td>
                  <td className="border border-purple-300 px-4 py-3 text-yellow-600 font-mono">O(log n)</td>
                  <td className="border border-purple-300 px-4 py-3 text-red-600 font-mono">O(n)</td>
                  <td className="border border-purple-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                </tr>
                <tr className="bg-gray-50 text-gray-700">
                  <td className="border border-purple-300 px-4 py-3 text-gray-700">Traversal</td>
                  <td className="border border-purple-300 px-4 py-3 text-yellow-600 font-mono">O(n)</td>
                  <td className="border border-purple-300 px-4 py-3 text-yellow-600 font-mono">O(n)</td>
                  <td className="border border-purple-300 px-4 py-3 text-yellow-600 font-mono">O(n)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p><strong>Space Complexity:</strong> O(n) where n is the number of nodes</p>
            <p><strong>Note:</strong> Balanced trees guarantee O(log n) for search, insertion, and deletion</p>
          </div>
        </motion.div>

  {/* Navigation Cards */}
  <div className="grid md:grid-cols-3 gap-8 text-gray-700">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <Link href="/data-structures/trees/theory" className="block bg-white rounded-lg border border-gray-100 shadow-lg p-8 hover:shadow-xl hover:border-purple-200 transition-all text-gray-700">
              <div className="flex items-center justify-between mb-4 text-gray-700">
                <BookOpen className="h-8 w-8 text-purple-600" />
                <ArrowRight className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Learn Theory</h3>
              <p className="text-gray-600">
                Explore tree concepts, traversal algorithms, and various tree implementations
              </p>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <Link href="/data-structures/trees/simulation" className="block bg-white rounded-lg border border-gray-100 shadow-lg p-8 hover:shadow-xl hover:border-purple-200 transition-all text-gray-700">
              <div className="flex items-center justify-between mb-4 text-gray-700">
                <Play className="h-8 w-8 text-purple-600" />
                <ArrowRight className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Interactive Simulation</h3>
              <p className="text-gray-600">
                Build and manipulate trees with interactive tools and visualization
              </p>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <Link href="/data-structures/trees/pseudocode" className="block bg-white rounded-lg border border-gray-100 shadow-lg p-8 hover:shadow-xl hover:border-purple-200 transition-all text-gray-700">
              <div className="flex items-center justify-between mb-4 text-gray-700">
                <BookOpen className="h-8 w-8 text-purple-600" />
                <ArrowRight className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Pseudocode</h3>
              <p className="text-gray-600">
                Reference tree traversals and BST operations in clean pseudocode
              </p>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
