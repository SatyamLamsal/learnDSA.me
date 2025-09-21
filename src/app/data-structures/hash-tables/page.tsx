'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Play, Clock, Hash, ArrowRight } from 'lucide-react';

const HashTableVisualization = () => {
  const buckets = [
    { index: 0, values: ['Alice'] },
    { index: 1, values: [] },
    { index: 2, values: ['Bob', 'Charlie'] },
    { index: 3, values: [] },
    { index: 4, values: ['Dave'] },
    { index: 5, values: [] },
    { index: 6, values: ['Eve'] }
  ];
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="mb-6">
        <h3 className="text-center font-semibold text-gray-700 mb-4">Hash Function: hash(key) = key.length % 7</h3>
        <div className="flex justify-center space-x-4 mb-4">
          <div className="text-sm text-gray-600">
            <span className="font-semibold">Example:</span> hash(&quot;Bob&quot;) = 3 % 7 = 3
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        {buckets.map((bucket, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center"
          >
            <div className="w-12 h-12 bg-pink-500 text-white rounded-lg flex items-center justify-center font-bold mr-4">
              {bucket.index}
            </div>
            <div className="flex-1 min-h-12 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center px-4">
              {bucket.values.length > 0 ? (
                <div className="flex space-x-2">
                  {bucket.values.map((value, valueIndex) => (
                    <motion.div
                      key={valueIndex}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + valueIndex * 0.2 }}
                      className="bg-pink-200 text-pink-800 px-3 py-1 rounded font-semibold text-sm"
                    >
                      {value}
                    </motion.div>
                  ))}
                  {bucket.values.length > 1 && (
                    <span className="text-gray-500 text-sm">← Collision!</span>
                  )}
                </div>
              ) : (
                <span className="text-gray-400 text-sm">Empty</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="text-center text-sm text-gray-600 mt-4">
        <p>Keys are mapped to array indices using a hash function</p>
      </div>
    </div>
  );
};

export default function HashTablesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-slate-800 mb-4">
            <span className="text-pink-600">Hash Tables</span> Data Structure
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Hash Tables (Hash Maps) provide efficient key-value storage using hash functions 
            to map keys to array indices. They offer near-constant time complexity for 
            insertion, deletion, and lookup operations, making them essential for many applications.
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
            Hash Table Visualization
          </h2>
          <HashTableVisualization />
        </motion.div>

        {/* Key Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-lg p-6 shadow-lg text-center"
          >
            <Hash className="h-12 w-12 text-pink-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Hash Function</h3>
            <p className="text-gray-600">Maps keys to array indices for direct access</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-lg p-6 shadow-lg text-center"
          >
            <Clock className="h-12 w-12 text-pink-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">O(1) Average</h3>
            <p className="text-gray-600">Constant time operations on average</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-lg p-6 shadow-lg text-center"
          >
            <BookOpen className="h-12 w-12 text-pink-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Key-Value Storage</h3>
            <p className="text-gray-600">Efficient storage and retrieval of key-value pairs</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-lg p-6 shadow-lg text-center"
          >
            <Play className="h-12 w-12 text-pink-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Dynamic Sizing</h3>
            <p className="text-gray-600">Can grow and shrink based on load factor</p>
          </motion.div>
        </div>

        {/* Hash Functions & Collision Resolution */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h3 className="text-2xl font-semibold mb-6 text-slate-700">Hash Functions</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-pink-500 pl-4">
                <h4 className="font-semibold">Division Method</h4>
                <p className="text-gray-600">h(k) = k mod m</p>
              </div>
              <div className="border-l-4 border-pink-500 pl-4">
                <h4 className="font-semibold">Multiplication Method</h4>
                <p className="text-gray-600">h(k) = floor(m * (k * A mod 1))</p>
              </div>
              <div className="border-l-4 border-pink-500 pl-4">
                <h4 className="font-semibold">Universal Hashing</h4>
                <p className="text-gray-600">Randomly chosen hash function family</p>
              </div>
              <div className="border-l-4 border-pink-500 pl-4">
                <h4 className="font-semibold">Cryptographic</h4>
                <p className="text-gray-600">MD5, SHA-1, SHA-256 for security</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h3 className="text-2xl font-semibold mb-6 text-slate-700">Collision Resolution</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-pink-500 pl-4">
                <h4 className="font-semibold">Chaining</h4>
                <p className="text-gray-600">Store multiple values in linked lists</p>
              </div>
              <div className="border-l-4 border-pink-500 pl-4">
                <h4 className="font-semibold">Linear Probing</h4>
                <p className="text-gray-600">Find next available slot sequentially</p>
              </div>
              <div className="border-l-4 border-pink-500 pl-4">
                <h4 className="font-semibold">Quadratic Probing</h4>
                <p className="text-gray-600">Use quadratic function to find slots</p>
              </div>
              <div className="border-l-4 border-pink-500 pl-4">
                <h4 className="font-semibold">Double Hashing</h4>
                <p className="text-gray-600">Use second hash function for probing</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Load Factor & Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-16"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-slate-700">
            Load Factor & Performance
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 border-2 border-pink-200 rounded-lg">
              <h3 className="font-semibold text-pink-700 mb-2">Load Factor = n/m</h3>
              <p className="text-sm text-gray-600">n = number of keys, m = table size</p>
            </div>
            <div className="text-center p-4 border-2 border-pink-200 rounded-lg">
              <h3 className="font-semibold text-pink-700 mb-2">Ideal Range: 0.7-0.8</h3>
              <p className="text-sm text-gray-600">Balance between space and performance</p>
            </div>
            <div className="text-center p-4 border-2 border-pink-200 rounded-lg">
              <h3 className="font-semibold text-pink-700 mb-2">Resizing</h3>
              <p className="text-sm text-gray-600">Double table size when load factor exceeds threshold</p>
            </div>
          </div>
        </motion.div>

        {/* Common Use Cases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-16"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-slate-700">
            Common Applications
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 border-2 border-pink-200 rounded-lg">
              <h3 className="font-semibold text-pink-700 mb-2">Caching</h3>
              <p className="text-sm text-gray-600">Store frequently accessed data</p>
            </div>
            <div className="text-center p-4 border-2 border-pink-200 rounded-lg">
              <h3 className="font-semibold text-pink-700 mb-2">Database Indexing</h3>
              <p className="text-sm text-gray-600">Fast record lookup by key</p>
            </div>
            <div className="text-center p-4 border-2 border-pink-200 rounded-lg">
              <h3 className="font-semibold text-pink-700 mb-2">Symbol Tables</h3>
              <p className="text-sm text-gray-600">Compiler symbol management</p>
            </div>
            <div className="text-center p-4 border-2 border-pink-200 rounded-lg">
              <h3 className="font-semibold text-pink-700 mb-2">Set Implementation</h3>
              <p className="text-sm text-gray-600">Efficient set operations</p>
            </div>
          </div>
        </motion.div>

        {/* Time Complexity Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-16"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-slate-700">
            Time & Space Complexity
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-pink-100">
                  <th className="border border-pink-300 px-4 py-3 font-semibold">Operation</th>
                  <th className="border border-pink-300 px-4 py-3 font-semibold">Average Case</th>
                  <th className="border border-pink-300 px-4 py-3 font-semibold">Worst Case</th>
                  <th className="border border-pink-300 px-4 py-3 font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-pink-300 px-4 py-3">Search</td>
                  <td className="border border-pink-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                  <td className="border border-pink-300 px-4 py-3 text-red-600 font-mono">O(n)</td>
                  <td className="border border-pink-300 px-4 py-3 text-sm">Worst case with many collisions</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-pink-300 px-4 py-3">Insert</td>
                  <td className="border border-pink-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                  <td className="border border-pink-300 px-4 py-3 text-red-600 font-mono">O(n)</td>
                  <td className="border border-pink-300 px-4 py-3 text-sm">May trigger resize operation</td>
                </tr>
                <tr>
                  <td className="border border-pink-300 px-4 py-3">Delete</td>
                  <td className="border border-pink-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                  <td className="border border-pink-300 px-4 py-3 text-red-600 font-mono">O(n)</td>
                  <td className="border border-pink-300 px-4 py-3 text-sm">Depends on collision resolution</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-pink-300 px-4 py-3">Space</td>
                  <td className="border border-pink-300 px-4 py-3 text-yellow-600 font-mono">O(n)</td>
                  <td className="border border-pink-300 px-4 py-3 text-yellow-600 font-mono">O(n)</td>
                  <td className="border border-pink-300 px-4 py-3 text-sm">Plus overhead for empty slots</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p><strong>Note:</strong> Performance depends heavily on hash function quality and load factor</p>
          </div>
        </motion.div>

        {/* Navigation Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <Link href="/data-structures/hash-tables/theory" className="block bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <BookOpen className="h-8 w-8 text-pink-600" />
                <ArrowRight className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Learn Theory</h3>
              <p className="text-gray-600">
                Deep dive into hash functions, collision resolution, and implementation details
              </p>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <Link href="/data-structures/hash-tables/simulation" className="block bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <Play className="h-8 w-8 text-pink-600" />
                <ArrowRight className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Simulation</h3>
              <p className="text-gray-600">
                Experiment with hash functions and collision resolution strategies
              </p>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}