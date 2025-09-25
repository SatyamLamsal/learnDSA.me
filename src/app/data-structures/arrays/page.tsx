"use client";
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Play, Clock, HardDrive, ArrowRight } from 'lucide-react';


const ArrayVisualization = () => {
  const arrayElements = [10, 23, 45, 67, 89, 12, 34];
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="flex justify-center items-center space-x-2 mb-4">
        {arrayElements.map((element, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="w-16 h-16 bg-red-500 text-white rounded-lg flex items-center justify-center font-bold border-2 border-red-600"
          >
            {element}
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center items-center space-x-2 text-sm text-gray-600">
        {arrayElements.map((_, index) => (
          <div key={index} className="w-16 text-center">
            [{index}]
          </div>
        ))}
      </div>
    </div>
  );
};

export default function ArraysPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-slate-800 mb-4">
            <span className="text-red-600">Arrays</span> Data Structure
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Arrays are the most fundamental data structure in computer science. 
            They store elements in contiguous memory locations and provide 
            constant-time access to elements using indices.
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
            Array Visualization
          </h2>
          <ArrayVisualization />
        </motion.div>

        {/* Key Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-lg p-6 shadow-lg text-center"
          >
            <Clock className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-slate-600">O(1) Access</h3>
            <p className="text-gray-800 font-medium">Constant time access to any element using its index</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-lg p-6 shadow-lg text-center"
          >
            <HardDrive className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-slate-600">Memory Efficient</h3>
            <p className="text-gray-800 font-medium">Elements stored in contiguous memory locations</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-lg p-6 shadow-lg text-center"
          >
            <BookOpen className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-slate-600 ">Simple Structure</h3>
            <p className="text-gray-800 font-medium">Easy to understand and implement basic operations</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-lg p-6 shadow-lg text-center"
          >
            <Play className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-slate-600">Cache Friendly</h3>
            <p className="text-gray-800 font-medium">Sequential access patterns optimize cache performance</p>
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
                <tr className="bg-red-100">
                  <th className="border border-red-300 px-4 py-3 font-semibold text-red-600">Operation</th>
                  <th className="border border-red-300 px-4 py-3 font-semibold text-red-600">Best Case</th>
                  <th className="border border-red-300 px-4 py-3 font-semibold text-red-600">Average Case</th>
                  <th className="border border-red-300 px-4 py-3 font-semibold text-red-600">Worst Case</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-red-300 px-4 py-3 text-blue-600">Access</td>
                  <td className="border border-red-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                  <td className="border border-red-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                  <td className="border border-red-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-red-300 px-4 py-3 text-blue-600">Search</td>
                  <td className="border border-red-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                  <td className="border border-red-300 px-4 py-3 text-yellow-600 font-mono">O(n)</td>
                  <td className="border border-red-300 px-4 py-3 text-red-600 font-mono">O(n)</td>
                </tr>
                <tr>
                  <td className="border border-red-300 px-4 py-3 text-blue-600">Insertion</td>
                  <td className="border border-red-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                  <td className="border border-red-300 px-4 py-3 text-yellow-600 font-mono">O(n)</td>
                  <td className="border border-red-300 px-4 py-3 text-red-600 font-mono">O(n)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-red-300 px-4 py-3 text-blue-600">Deletion</td>
                  <td className="border border-red-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                  <td className="border border-red-300 px-4 py-3 text-yellow-600 font-mono">O(n)</td>
                  <td className="border border-red-300 px-4 py-3 text-red-600 font-mono">O(n)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p><strong>Space Complexity:</strong> O(n) where n is the number of elements</p>
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
            <Link href="/data-structures/arrays/theory" className="block bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <BookOpen className="h-8 w-8 text-red-600" />
                <ArrowRight className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-600" >Learn Theory</h3>
              <p className="text-gray-600">
                Dive deep into array concepts, implementation details, and real-world applications
              </p>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            whileHover={{ scale: 1.02 }}
          >
            <Link href="/data-structures/arrays/simulation" className="block bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <Play className="h-8 w-8 text-red-600" />
                <ArrowRight className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Interactive Simulation</h3>
              <p className="text-gray-600">
                Practice array operations with hands-on interactive exercises and visualizations
              </p>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            whileHover={{ scale: 1.02 }}
          >
            <Link href="/data-structures/arrays/pseudocode" className="block bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <BookOpen className="h-8 w-8 text-red-600" />
                <ArrowRight className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Pseudocode</h3>
              <p className="text-gray-600">
                Reference common array operations in clean, copyable pseudocode
              </p>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
