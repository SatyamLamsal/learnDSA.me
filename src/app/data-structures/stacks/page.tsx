'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Play, Clock, Layers, ArrowRight, ArrowUp } from 'lucide-react';

const StackVisualization = () => {
  const stackElements = [30, 45, 12, 67, 89];
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="flex flex-col items-center space-y-2 mb-6">
        <div className="text-sm text-gray-600 mb-2 flex items-center">
          <ArrowUp className="h-4 w-4 mr-1" />
          TOP (LIFO - Last In, First Out)
        </div>
        {stackElements.slice().reverse().map((element, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="w-32 h-12 bg-green-500 text-white rounded-lg flex items-center justify-center font-bold border-2 border-green-600 shadow-md"
          >
            {element}
          </motion.div>
        ))}
        <div className="w-32 h-2 bg-gray-400 rounded-b-lg"></div>
        <div className="text-sm text-gray-600">BOTTOM</div>
      </div>
      <div className="text-center text-sm text-gray-600">
        <p>Elements are added and removed from the top only</p>
      </div>
    </div>
  );
};

export default function StacksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-slate-800 mb-4">
            <span className="text-green-600">Stacks</span> Data Structure
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Stacks follow the Last-In-First-Out (LIFO) principle. Elements are added and 
            removed from the same end, called the top. Think of it like a stack of plates - 
            you can only add or remove plates from the top.
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
            Stack Visualization
          </h2>
          <StackVisualization />
        </motion.div>

        {/* Key Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-lg p-6 shadow-lg text-center"
          >
            <Layers className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">LIFO Principle</h3>
            <p className="text-gray-600">Last element added is the first to be removed</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-lg p-6 shadow-lg text-center"
          >
            <Clock className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">O(1) Operations</h3>
            <p className="text-gray-600">Constant time push, pop, and top operations</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-lg p-6 shadow-lg text-center"
          >
            <BookOpen className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Simple Interface</h3>
            <p className="text-gray-600">Easy to understand and implement operations</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-lg p-6 shadow-lg text-center"
          >
            <Play className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Versatile Applications</h3>
            <p className="text-gray-600">Used in recursion, parsing, and function calls</p>
          </motion.div>
        </div>

        {/* Operations & Use Cases */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h3 className="text-2xl font-semibold mb-6 text-slate-700">Main Operations</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold">Push</h4>
                <p className="text-gray-600">Add an element to the top of the stack</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold">Pop</h4>
                <p className="text-gray-600">Remove and return the top element</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold">Top/Peek</h4>
                <p className="text-gray-600">View the top element without removing it</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold">IsEmpty</h4>
                <p className="text-gray-600">Check if the stack has no elements</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h3 className="text-2xl font-semibold mb-6 text-slate-700">Common Use Cases</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold">Function Call Management</h4>
                <p className="text-gray-600">Managing function calls and local variables</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold">Expression Evaluation</h4>
                <p className="text-gray-600">Converting infix to postfix expressions</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold">Undo Operations</h4>
                <p className="text-gray-600">Implementing undo functionality in applications</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold">Backtracking Algorithms</h4>
                <p className="text-gray-600">Solving maze problems and puzzles</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Time Complexity Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-16"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-slate-700">
            Time & Space Complexity
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-green-100">
                  <th className="border border-green-300 px-4 py-3 font-semibold">Operation</th>
                  <th className="border border-green-300 px-4 py-3 font-semibold">Time Complexity</th>
                  <th className="border border-green-300 px-4 py-3 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-green-300 px-4 py-3">Push</td>
                  <td className="border border-green-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                  <td className="border border-green-300 px-4 py-3">Add element to top</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-green-300 px-4 py-3">Pop</td>
                  <td className="border border-green-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                  <td className="border border-green-300 px-4 py-3">Remove element from top</td>
                </tr>
                <tr>
                  <td className="border border-green-300 px-4 py-3">Top/Peek</td>
                  <td className="border border-green-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                  <td className="border border-green-300 px-4 py-3">Access top element</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-green-300 px-4 py-3">IsEmpty</td>
                  <td className="border border-green-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                  <td className="border border-green-300 px-4 py-3">Check if stack is empty</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p><strong>Space Complexity:</strong> O(n) where n is the number of elements</p>
          </div>
        </motion.div>

        {/* Navigation Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            whileHover={{ scale: 1.02 }}
          >
            <Link href="/data-structures/stacks/theory" className="block bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <BookOpen className="h-8 w-8 text-green-600" />
                <ArrowRight className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Learn Theory</h3>
              <p className="text-gray-600">
                Deep dive into stack implementation, applications, and problem-solving techniques
              </p>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <Link href="/data-structures/stacks/simulation" className="block bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <Play className="h-8 w-8 text-green-600" />
                <ArrowRight className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Simulation</h3>
              <p className="text-gray-600">
                Practice stack operations with hands-on exercises and real-time visualization
              </p>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}