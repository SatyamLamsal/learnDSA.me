"use client";
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Play, Clock, Zap, ArrowRight } from 'lucide-react';

const LinkedListVisualization = () => {
  const nodes = [
    { data: 10, next: true },
    { data: 23, next: true },
    { data: 45, next: true },
    { data: 67, next: false }
  ];
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="flex justify-center items-center space-x-4 mb-4">
        {nodes.map((node, index) => (
          <div key={index} className="flex items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              className="bg-blue-500 text-white rounded-lg p-4 shadow-lg"
            >
              <div className="text-center">
                <div className="font-bold text-lg">{node.data}</div>
                <div className="text-xs mt-1">data</div>
              </div>
            </motion.div>
            {node.next && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 + 0.1 }}
                className="mx-2 text-blue-600"
              >
                <ArrowRight className="h-6 w-6" />
              </motion.div>
            )}
            {!node.next && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.2 + 0.1 }}
                className="mx-2 text-gray-600 font-bold"
              >
                NULL
              </motion.div>
            )}
          </div>
        ))}
      </div>
      <div className="text-center text-sm text-gray-600">
        <p>Each node contains data and a pointer to the next node</p>
      </div>
    </div>
  );
};

export default function LinkedListsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-slate-800 mb-4">
            <span className="text-blue-600">Linked Lists</span> Data Structure
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Linked Lists are dynamic data structures where elements (nodes) are stored 
            in sequence, with each node containing data and a reference to the next node. 
            They provide flexibility in memory allocation and efficient insertion/deletion.
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
            Linked List Visualization
          </h2>
          <LinkedListVisualization />
        </motion.div>

        {/* Key Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-lg p-6 shadow-lg text-center"
          >
            <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Dynamic Size</h3>
            <p className="text-gray-800 font-medium">Size can grow or shrink during runtime</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-lg p-6 shadow-lg text-center"
          >
            <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">O(1) Insertion</h3>
            <p className="text-gray-800 font-medium">Constant time insertion at the beginning</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-lg p-6 shadow-lg text-center"
          >
            <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Memory Efficient</h3>
            <p className="text-gray-800 font-medium">No memory waste, allocates as needed</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-lg p-6 shadow-lg text-center"
          >
            <Play className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Flexible</h3>
            <p className="text-gray-800 font-medium">Easy insertion and deletion at any position</p>
          </motion.div>
        </div>

        {/* Time Complexity Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-16"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-slate-700">
            Time & Space Complexity
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border border-blue-300 px-4 py-3 font-semibold">Operation</th>
                  <th className="border border-blue-300 px-4 py-3 font-semibold">Best Case</th>
                  <th className="border border-blue-300 px-4 py-3 font-semibold">Average Case</th>
                  <th className="border border-blue-300 px-4 py-3 font-semibold">Worst Case</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-blue-300 px-4 py-3">Access</td>
                  <td className="border border-blue-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                  <td className="border border-blue-300 px-4 py-3 text-yellow-600 font-mono">O(n)</td>
                  <td className="border border-blue-300 px-4 py-3 text-red-600 font-mono">O(n)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-blue-300 px-4 py-3">Search</td>
                  <td className="border border-blue-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                  <td className="border border-blue-300 px-4 py-3 text-yellow-600 font-mono">O(n)</td>
                  <td className="border border-blue-300 px-4 py-3 text-red-600 font-mono">O(n)</td>
                </tr>
                <tr>
                  <td className="border border-blue-300 px-4 py-3">Insertion</td>
                  <td className="border border-blue-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                  <td className="border border-blue-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                  <td className="border border-blue-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-blue-300 px-4 py-3">Deletion</td>
                  <td className="border border-blue-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                  <td className="border border-blue-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                  <td className="border border-blue-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p><strong>Space Complexity:</strong> O(n) where n is the number of elements</p>
            <p><strong>Note:</strong> Insertion/Deletion is O(1) when you have reference to the node</p>
          </div>
        </motion.div>

  {/* Navigation Cards */}
  <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{ scale: 1.02 }}
          >
            <Link href="/data-structures/linked-lists/theory" className="block bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <ArrowRight className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Learn Theory</h3>
              <p className="text-gray-600">
                Explore linked list concepts, types, implementation, and comparison with arrays
              </p>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            whileHover={{ scale: 1.02 }}
          >
            <Link href="/data-structures/linked-lists/simulation" className="block bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <Play className="h-8 w-8 text-blue-600" />
                <ArrowRight className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Simulation</h3>
              <p className="text-gray-600">
                Practice linked list operations with interactive exercises and step-by-step visualization
              </p>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            whileHover={{ scale: 1.02 }}
          >
            <Link href="/data-structures/linked-lists/pseudocode" className="block bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <ArrowRight className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pseudocode</h3>
              <p className="text-gray-600">
                Reference common linked list operations in clean, copyable pseudocode
              </p>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
