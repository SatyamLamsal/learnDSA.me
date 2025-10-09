'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Zap, 
  Scale, 
  Target,
  CheckCircle,
  ArrowLeft,
  ChevronRight,
  Lightbulb,
  Timer
} from 'lucide-react';
import Link from 'next/link';
import { ModuleLayout } from '@/components/layouts/ModuleLayout';
import { ProgressIndicator } from '@/components/progress/ProgressIndicator';
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton';

export default function EfficiencyPrinciplesPage() {
  const [activeSection, setActiveSection] = useState('time-vs-space');

  const sections = [
    { id: 'time-vs-space', name: 'Time vs Space', icon: Scale },
    { id: 'optimization', name: 'Optimization Strategies', icon: Target },
    { id: 'principles', name: 'Core Principles', icon: Lightbulb },
  ];

  return (
    <ModuleLayout
      moduleId="module-1"
      moduleTitle="Module 1: Memory & Efficiency"
      moduleDescription="Jump to any section"
      sections={sections}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      backUrl="/learning-path/module-1"
      estimatedTime="20 minutes"
      difficulty="Beginner"
      totalSections={3}
      enableScrollSpy={true}
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 relative"
      >
        <div className="absolute top-0 right-0 flex items-center space-x-4">
          <ProgressIndicator 
            topicId="module-1-efficiency" 
            topicType="module"
            category="learning-path"
          />
          <BookmarkButton 
            topicId="module-1-efficiency"
            topicType="module"
            title="Efficiency Principles"
            category="learning-path"
            url="/learning-path/module-1/efficiency"
          />
        </div>
        
        <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full text-sm font-medium mb-8">
          <TrendingUp className="w-5 h-5 mr-2" />
          Chapter 4: Efficiency Principles
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-8">
          Efficiency
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
            Principles
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Master the fundamental tradeoffs and optimization strategies that guide all efficient algorithm and data structure design.
        </p>
      </motion.div>

      {/* Time vs Space Tradeoffs */}
      <div id="time-vs-space" className="bg-white rounded-2xl p-8 shadow-lg border mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <Scale className="w-8 h-8 mr-3 text-purple-600" />
          Time vs Space Tradeoffs
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">The Fundamental Tradeoff</h3>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <p className="text-gray-700 mb-4">
                In computer science, you often have to choose between using more time or more space (memory). 
                Rarely can you optimize both simultaneously.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Timer className="w-5 h-5 mr-3 text-blue-600" />
                  <span className="text-gray-700"><strong>Time:</strong> How long the algorithm takes to run</span>
                </div>
                <div className="flex items-center">
                  <Zap className="w-5 h-5 mr-3 text-green-600" />
                  <span className="text-gray-700"><strong>Space:</strong> How much memory the algorithm uses</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Classic Examples</h3>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Fibonacci Numbers</h4>
                <div className="text-sm text-blue-800 space-y-2">
                  <p><strong>Recursive:</strong> Simple code, exponential time</p>
                  <p><strong>Memoized:</strong> Linear time, linear space</p>
                  <p><strong>Iterative:</strong> Linear time, constant space</p>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2">Lookup Operations</h4>
                <div className="text-sm text-green-800 space-y-2">
                  <p><strong>Hash Table:</strong> O(1) lookup, O(n) space</p>
                  <p><strong>Sorted Array:</strong> O(log n) lookup, O(n) space</p>
                  <p><strong>Unsorted Array:</strong> O(n) lookup, O(n) space</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Optimization Strategies */}
      <div id="optimization" className="bg-white rounded-2xl p-8 shadow-lg border mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <Target className="w-8 h-8 mr-3 text-orange-600" />
          Optimization Strategies
        </h2>
        
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
            <h3 className="font-semibold text-purple-900 mb-3">Caching/Memoization</h3>
            <div className="text-sm text-purple-800 space-y-2">
              <p><strong>Idea:</strong> Store computed results</p>
              <p><strong>Tradeoff:</strong> Use space to save time</p>
              <p><strong>Example:</strong> Dynamic programming</p>
              <div className="mt-3 p-2 bg-purple-100 rounded text-xs font-mono">
                cache[key] = expensiveFunction(key)
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-3">Preprocessing</h3>
            <div className="text-sm text-blue-800 space-y-2">
              <p><strong>Idea:</strong> Do work upfront to save later</p>
              <p><strong>Tradeoff:</strong> Initialization time for query speed</p>
              <p><strong>Example:</strong> Sorted arrays, indexes</p>
              <div className="mt-3 p-2 bg-blue-100 rounded text-xs font-mono">
                sort(array) // O(n log n) once<br/>
                binarySearch(array, x) // O(log n) many times
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 p-6 rounded-xl border border-green-200">
            <h3 className="font-semibold text-green-900 mb-3">Lazy Evaluation</h3>
            <div className="text-sm text-green-800 space-y-2">
              <p><strong>Idea:</strong> Delay computation until needed</p>
              <p><strong>Tradeoff:</strong> Save work that might not be needed</p>
              <p><strong>Example:</strong> Generators, lazy loading</p>
              <div className="mt-3 p-2 bg-green-100 rounded text-xs font-mono">
                // Only compute when accessed<br/>
                getValue() {`{ return compute() }`}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-gradient-to-r from-gray-50 to-orange-50 p-6 rounded-xl border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">Choosing the Right Strategy</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Consider These Factors:</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                  <span>How often will operations be performed?</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                  <span>What are your memory constraints?</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                  <span>What are your time requirements?</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Common Patterns:</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                  <span>Many queries → Preprocess for speed</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                  <span>Limited memory → Optimize space</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                  <span>One-time use → Keep it simple</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Core Principles */}
      <div id="principles" className="bg-white rounded-2xl p-8 shadow-lg border mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <Lightbulb className="w-8 h-8 mr-3 text-yellow-600" />
          Core Efficiency Principles
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
              <h3 className="font-semibold text-yellow-900 mb-3">1. Locality of Reference</h3>
              <p className="text-sm text-yellow-800 mb-2">
                Access nearby data and reuse recently accessed data
              </p>
              <div className="text-xs text-yellow-700">
                <strong>Why:</strong> Cache systems work better with predictable patterns
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3">2. Minimize Work</h3>
              <p className="text-sm text-blue-800 mb-2">
                Don&apos;t compute what you don&apos;t need
              </p>
              <div className="text-xs text-blue-700">
                <strong>How:</strong> Early termination, lazy evaluation, short-circuiting
              </div>
            </div>
            
            <div className="bg-green-50 p-6 rounded-xl border border-green-200">
              <h3 className="font-semibold text-green-900 mb-3">3. Reuse Computation</h3>
              <p className="text-sm text-green-800 mb-2">
                Store results of expensive operations
              </p>
              <div className="text-xs text-green-700">
                <strong>Techniques:</strong> Memoization, caching, precomputation
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
              <h3 className="font-semibold text-purple-900 mb-3">4. Choose Right Data Structure</h3>
              <p className="text-sm text-purple-800 mb-2">
                Match the structure to your access patterns
              </p>
              <div className="text-xs text-purple-700">
                <strong>Example:</strong> Hash table for lookups, array for iteration
              </div>
            </div>
            
            <div className="bg-red-50 p-6 rounded-xl border border-red-200">
              <h3 className="font-semibold text-red-900 mb-3">5. Profile and Measure</h3>
              <p className="text-sm text-red-800 mb-2">
                Don&apos;t guess where the bottlenecks are
              </p>
              <div className="text-xs text-red-700">
                <strong>Tools:</strong> Profilers, benchmarks, time measurements
              </div>
            </div>
            
            <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-200">
              <h3 className="font-semibold text-indigo-900 mb-3">6. Consider the Context</h3>
              <p className="text-sm text-indigo-800 mb-2">
                Optimization depends on your specific use case
              </p>
              <div className="text-xs text-indigo-700">
                <strong>Factors:</strong> Data size, frequency, hardware, requirements
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="flex justify-between items-center mt-12"
      >
        <Link
          href="/learning-path/module-1/data-structures"
          className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Previous: Why Data Structures?
        </Link>
        <div className="text-center">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl shadow-lg">
            <div className="flex items-center">
              <CheckCircle className="w-6 h-6 mr-2" />
              <span className="font-semibold text-lg">Module 1 Complete!</span>
            </div>
            <p className="text-green-100 text-sm mt-1">Ready to build data structures</p>
            <Link 
              href="/learning-path/module-2"
              className="mt-3 inline-flex items-center text-white hover:text-green-100 font-medium"
            >
              Start Module 2: Arrays & Linear Structures
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </motion.div>
    </ModuleLayout>
  );
}