'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Gauge, 
  Zap, 
  Clock, 
  TrendingUp,
  CheckCircle,
  ArrowLeft,
  ChevronRight,
  AlertTriangle,
  Target
} from 'lucide-react';
import Link from 'next/link';
import { EnhancedModuleLayout } from '@/components/layouts/EnhancedModuleLayout';
import { ProgressIndicator } from '@/components/progress/ProgressIndicator';
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton';

export default function PerformanceImpactPage() {
  const [activeSection, setActiveSection] = useState('cache-effects');

  const sections = [
    { id: 'cache-effects', name: 'Cache Effects', icon: Zap },
    { id: 'access-patterns', name: 'Access Patterns', icon: Target },
    { id: 'real-world', name: 'Real-World Impact', icon: TrendingUp },
  ];

  return (
    <EnhancedModuleLayout
      moduleId="module-1"
      moduleTitle="Module 1: Memory & Efficiency"
      moduleDescription="Understand why data structures matter through memory systems"
      sections={sections}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      backUrl="/learning-path/module-1"
      estimatedTime="20 minutes"
      difficulty="Beginner"
      totalSections={4}
      currentPath="/learning-path/module-1/performance"
      showFullCourseStructure={true}
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
            topicId="module-1-performance" 
            topicType="module"
            category="learning-path"
          />
          <BookmarkButton 
            topicId="module-1-performance"
            topicType="module"
            title="Performance Impact"
            category="learning-path"
            url="/learning-path/module-1/performance"
          />
        </div>
        
        <div className="inline-flex items-center bg-red-100 text-red-800 px-6 py-3 rounded-full text-sm font-medium mb-8">
          <Gauge className="w-5 h-5 mr-2" />
          Chapter 2: Performance Impact
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-8">
          Performance
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
            Impact
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Discover how memory access patterns can make the difference between milliseconds and minutes in program execution.
        </p>
      </motion.div>

      {/* Cache Effects */}
      <div id="cache-effects" className="bg-white rounded-2xl p-8 shadow-lg border mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <Zap className="w-8 h-8 mr-3 text-yellow-600" />
          Cache Effects
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">The Speed Difference</h3>
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2">Cache Hit</h4>
                <div className="text-sm text-green-800 space-y-2">
                  <p><strong>Time:</strong> 1-3 CPU cycles</p>
                  <p><strong>When:</strong> Data is already in CPU cache</p>
                  <p><strong>Example:</strong> Sequential array access</p>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                <h4 className="font-semibold text-yellow-900 mb-2">Cache Miss - RAM</h4>
                <div className="text-sm text-yellow-800 space-y-2">
                  <p><strong>Time:</strong> 200-300 CPU cycles</p>
                  <p><strong>When:</strong> Data must be loaded from RAM</p>
                  <p><strong>Example:</strong> Random memory access</p>
                </div>
              </div>
              
              <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                <h4 className="font-semibold text-red-900 mb-2">Cache Miss - Storage</h4>
                <div className="text-sm text-red-800 space-y-2">
                  <p><strong>Time:</strong> Millions of CPU cycles</p>
                  <p><strong>When:</strong> Data must be loaded from disk</p>
                  <p><strong>Example:</strong> Virtual memory page fault</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Visual Comparison</h3>
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-20 text-sm font-medium">Cache:</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '1%'}}></div>
                  </div>
                  <div className="w-16 text-xs text-right">1-3 cycles</div>
                </div>
                <div className="flex items-center">
                  <div className="w-20 text-sm font-medium">RAM:</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{width: '20%'}}></div>
                  </div>
                  <div className="w-16 text-xs text-right">~200 cycles</div>
                </div>
                <div className="flex items-center">
                  <div className="w-20 text-sm font-medium">Storage:</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{width: '100%'}}></div>
                  </div>
                  <div className="w-16 text-xs text-right">Millions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Access Patterns */}
      <div id="access-patterns" className="bg-white rounded-2xl p-8 shadow-lg border mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <Target className="w-8 h-8 mr-3 text-blue-600" />
          Access Patterns Matter
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Sequential Access (Good)</h3>
            <div className="bg-green-50 p-6 rounded-xl border border-green-200">
              <div className="font-mono text-sm mb-4 bg-green-100 p-3 rounded">
                {`for (int i = 0; i < n; i++) {
  sum += array[i];
}`}
              </div>
              <div className="space-y-2 text-sm text-green-800">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                  <span>Cache-friendly: loads entire cache line</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                  <span>Predictable: CPU can prefetch next elements</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                  <span>Fast: mostly cache hits after first load</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Random Access (Bad)</h3>
            <div className="bg-red-50 p-6 rounded-xl border border-red-200">
              <div className="font-mono text-sm mb-4 bg-red-100 p-3 rounded">
                {`for (int i = 0; i < n; i++) {
  sum += array[random_index()];
}`}
              </div>
              <div className="space-y-2 text-sm text-red-800">
                <div className="flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2 text-red-600" />
                  <span>Cache-unfriendly: wastes cache lines</span>
                </div>
                <div className="flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2 text-red-600" />
                  <span>Unpredictable: CPU can&apos;t prefetch</span>
                </div>
                <div className="flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2 text-red-600" />
                  <span>Slow: frequent cache misses</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-World Impact */}
      <div id="real-world" className="bg-white rounded-2xl p-8 shadow-lg border mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <TrendingUp className="w-8 h-8 mr-3 text-purple-600" />
          Real-World Performance Impact
        </h2>
        
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-3">Array vs Linked List</h3>
            <div className="text-sm text-blue-800 space-y-2">
              <p><strong>Task:</strong> Sum 1 million integers</p>
              <p><strong>Array:</strong> ~2ms (sequential)</p>
              <p><strong>Linked List:</strong> ~50ms (random)</p>
              <p className="font-semibold text-blue-900">25x slower!</p>
            </div>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
            <h3 className="font-semibold text-purple-900 mb-3">Hash Table Collisions</h3>
            <div className="text-sm text-purple-800 space-y-2">
              <p><strong>Good hash:</strong> O(1) lookups</p>
              <p><strong>Bad hash:</strong> O(n) lookups</p>
              <p><strong>Impact:</strong> 1000x slower for large datasets</p>
              <p className="font-semibold text-purple-900">Choose wisely!</p>
            </div>
          </div>
          
          <div className="bg-green-50 p-6 rounded-xl border border-green-200">
            <h3 className="font-semibold text-green-900 mb-3">Database Queries</h3>
            <div className="text-sm text-green-800 space-y-2">
              <p><strong>Indexed:</strong> Milliseconds</p>
              <p><strong>Full scan:</strong> Minutes/Hours</p>
              <p><strong>B-trees:</strong> Enable fast lookups</p>
              <p className="font-semibold text-green-900">Index everything!</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-xl border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Key Takeaway</h3>
          <p className="text-gray-700 leading-relaxed">
            The choice of data structure and access pattern can make the difference between a program that runs in 
            milliseconds versus one that takes hours. Understanding these performance characteristics is crucial 
            for writing efficient software.
          </p>
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
          Previous: Data Structures Overview
        </Link>
        <Link
          href="/learning-path/module-1/efficiency"
          className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Next: Efficiency Principles
          <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </motion.div>
    </EnhancedModuleLayout>
  );
}