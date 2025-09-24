"use client";
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Play, Clock, Users, ArrowRight, ArrowLeft } from 'lucide-react';

const QueueVisualization = () => {
  const queueElements = [12, 45, 78, 23, 56];
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-center mb-6">
        <div className="text-sm text-gray-600 mr-4 flex flex-col items-center">
          <ArrowLeft className="h-4 w-4 mb-1" />
          <span>FRONT</span>
          <span className="text-xs">(Dequeue)</span>
        </div>
        
        <div className="flex items-center space-x-2">
          {queueElements.map((element, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="w-16 h-16 bg-yellow-500 text-white rounded-lg flex items-center justify-center font-bold border-2 border-yellow-600 shadow-md"
            >
              {element}
            </motion.div>
          ))}
        </div>
        
        <div className="text-sm text-gray-600 ml-4 flex flex-col items-center">
          <ArrowRight className="h-4 w-4 mb-1" />
          <span>REAR</span>
          <span className="text-xs">(Enqueue)</span>
        </div>
      </div>
      <div className="text-center text-sm text-gray-600">
        <p>FIFO: First In, First Out - Elements enter from rear and exit from front</p>
      </div>
    </div>
  );
};

export default function QueuesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-slate-800 mb-4">
            <span className="text-yellow-600">Queues</span> Data Structure
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Queues follow the First-In-First-Out (FIFO) principle. Elements are added 
            at the rear and removed from the front. Think of it like a line of people 
            waiting - the first person to join is the first to be served.
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
            Queue Visualization
          </h2>
          <QueueVisualization />
        </motion.div>

        {/* Key Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-lg p-6 shadow-lg text-center"
          >
            <Users className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">FIFO Principle</h3>
            <p className="text-gray-800 font-medium">First element added is the first to be removed</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-lg p-6 shadow-lg text-center"
          >
            <Clock className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">O(1) Operations</h3>
            <p className="text-gray-800 font-medium">Constant time enqueue and dequeue operations</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-lg p-6 shadow-lg text-center"
          >
            <BookOpen className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Fair Scheduling</h3>
            <p className="text-gray-800 font-medium">Ensures fair order of processing elements</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-lg p-6 shadow-lg text-center"
          >
            <Play className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Buffer Management</h3>
            <p className="text-gray-800 font-medium">Perfect for managing data flow and buffering</p>
          </motion.div>
        </div>

        {/* Queue Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-16"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-slate-700">
            Types of Queues
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 border-2 border-yellow-200 rounded-lg">
              <h3 className="font-semibold text-yellow-700 mb-2">Simple Queue</h3>
              <p className="text-sm text-gray-600">Basic FIFO queue with front and rear pointers</p>
            </div>
            <div className="text-center p-4 border-2 border-yellow-200 rounded-lg">
              <h3 className="font-semibold text-yellow-700 mb-2">Circular Queue</h3>
              <p className="text-sm text-gray-600">Rear connects to front, efficient memory usage</p>
            </div>
            <div className="text-center p-4 border-2 border-yellow-200 rounded-lg">
              <h3 className="font-semibold text-yellow-700 mb-2">Priority Queue</h3>
              <p className="text-sm text-gray-600">Elements served based on priority, not order</p>
            </div>
            <div className="text-center p-4 border-2 border-yellow-200 rounded-lg">
              <h3 className="font-semibold text-yellow-700 mb-2">Deque</h3>
              <p className="text-sm text-gray-600">Double-ended queue, insertion/deletion at both ends</p>
            </div>
          </div>
        </motion.div>

        {/* Operations & Use Cases */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h3 className="text-2xl font-semibold mb-6 text-slate-700">Main Operations</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="font-semibold">Enqueue</h4>
                <p className="text-gray-600">Add an element to the rear of the queue</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="font-semibold">Dequeue</h4>
                <p className="text-gray-600">Remove and return element from the front</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="font-semibold">Front</h4>
                <p className="text-gray-600">View the front element without removing it</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="font-semibold">IsEmpty</h4>
                <p className="text-gray-600">Check if the queue has no elements</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h3 className="text-2xl font-semibold mb-6 text-slate-700">Common Use Cases</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="font-semibold">Task Scheduling</h4>
                <p className="text-gray-600">Operating system process scheduling</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="font-semibold">BFS Algorithm</h4>
                <p className="text-gray-600">Breadth-First Search in graphs and trees</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="font-semibold">Print Queue</h4>
                <p className="text-gray-600">Managing print jobs in order</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="font-semibold">Buffer for Data Streams</h4>
                <p className="text-gray-600">Handling data between fast and slow devices</p>
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
            Time & Space Complexity
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-yellow-100">
                  <th className="border border-yellow-300 px-4 py-3 font-semibold">Operation</th>
                  <th className="border border-yellow-300 px-4 py-3 font-semibold">Time Complexity</th>
                  <th className="border border-yellow-300 px-4 py-3 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-yellow-300 px-4 py-3">Enqueue</td>
                  <td className="border border-yellow-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                  <td className="border border-yellow-300 px-4 py-3">Add element to rear</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-yellow-300 px-4 py-3">Dequeue</td>
                  <td className="border border-yellow-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                  <td className="border border-yellow-300 px-4 py-3">Remove element from front</td>
                </tr>
                <tr>
                  <td className="border border-yellow-300 px-4 py-3">Front</td>
                  <td className="border border-yellow-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                  <td className="border border-yellow-300 px-4 py-3">Access front element</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-yellow-300 px-4 py-3">IsEmpty</td>
                  <td className="border border-yellow-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                  <td className="border border-yellow-300 px-4 py-3">Check if queue is empty</td>
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
            transition={{ duration: 0.6, delay: 1.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <Link href="/data-structures/queues/theory" className="block bg-white rounded-lg border border-gray-100 shadow-lg p-8 hover:shadow-xl hover:border-yellow-200 transition-all">
              <div className="flex items-center justify-between mb-4">
                <BookOpen className="h-8 w-8 text-yellow-600" />
                <ArrowRight className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Learn Theory</h3>
              <p className="text-gray-600">
                Explore queue implementations, variations, and algorithmic applications
              </p>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <Link href="/data-structures/queues/simulation" className="block bg-white rounded-lg border border-gray-100 shadow-lg p-8 hover:shadow-xl hover:border-yellow-200 transition-all">
              <div className="flex items-center justify-between mb-4">
                <Play className="h-8 w-8 text-yellow-600" />
                <ArrowRight className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Simulation</h3>
              <p className="text-gray-600">
                Practice queue operations and explore different queue types interactively
              </p>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <Link href="/data-structures/queues/pseudocode" className="block bg-white rounded-lg border border-gray-100 shadow-lg p-8 hover:shadow-xl hover:border-yellow-200 transition-all">
              <div className="flex items-center justify-between mb-4">
                <BookOpen className="h-8 w-8 text-yellow-600" />
                <ArrowRight className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pseudocode</h3>
              <p className="text-gray-600">
                Reference queue operations and circular queue logic in clean pseudocode
              </p>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
