'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Target, 
  Info, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Package,
  ChevronRight,
  Code,
  Play,
  RotateCcw
} from 'lucide-react';
import Link from 'next/link';
import { EnhancedModuleLayout } from '@/components/layouts/EnhancedModuleLayout';
import { ProgressIndicator } from '@/components/progress/ProgressIndicator';
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton';
import { SectionProgressIndicator } from '@/components/progress/SectionProgressIndicator';

export default function QueueFundamentalsPage() {
  const [activeSection, setActiveSection] = useState('queue-concept');

  const sections = [
    { id: 'queue-concept', name: 'Queue Concept', icon: Package },
    { id: 'fifo-principle', name: 'FIFO Principle', icon: ArrowRight },
    { id: 'queue-visualization', name: 'Queue Visualization', icon: Info },
    { id: 'real-world-examples', name: 'Real-World Examples', icon: Target },
  ];

  return (
    <EnhancedModuleLayout
      moduleId="module-3"
      moduleTitle="Stacks & Queues"
      moduleDescription="Master LIFO and FIFO data structures"
      sections={sections}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      backUrl="/learning-path/module-3"
      estimatedTime="15-20 minutes"
      difficulty="Intermediate"
      totalSections={8}
      currentPath="/learning-path/module-3/queue-fundamentals"
      showFullCourseStructure={true}
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 relative text-gray-700"
      >
        <div className="absolute top-0 right-0 flex items-center space-x-4 text-gray-700">
          <ProgressIndicator 
            topicId="queue-fundamentals" 
            topicType="stacks-queues"
            category="learning-path"
          />
          <BookmarkButton 
            topicId="queue-fundamentals"
            topicType="stacks-queues"
            title="Queue Fundamentals"
            category="learning-path"
            url="/learning-path/module-3/queue-fundamentals"
          />
        </div>
        
        <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full text-sm font-medium mb-8">
          <RotateCcw className="w-5 h-5 mr-2" />
          Lesson 4: Queue Fundamentals
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-8">
          Understanding
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
            Queue Data Structure
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Learn the fundamental concepts of queues, the FIFO (First In, First Out) principle, 
          and discover how this essential data structure manages order and fairness in computing systems.
        </p>
      </motion.div>

      {/* Learning Objectives */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.8 }}
        className="mb-12"
      >
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Learning Objectives</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-start space-x-3">
              <Package className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">Queue Concept</h3>
                <p className="text-sm text-gray-600">Understand what a queue is and its properties</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <ArrowRight className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">FIFO Principle</h3>
                <p className="text-sm text-gray-600">Master First In, First Out operations</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Target className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">Real Applications</h3>
                <p className="text-sm text-gray-600">Discover queue usage in systems and algorithms</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Queue Concept */}
      <div id="queue-concept" className="bg-white rounded-2xl p-8 shadow-lg border mb-12 text-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <RotateCcw className="w-8 h-8 mr-3 text-green-600" />
            What is a Queue?
          </h2>
          <SectionProgressIndicator 
            moduleId="module-3"
            sectionId="queue-concept"
          />
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-gray-600 text-lg leading-relaxed">
              A <strong>queue</strong> is a linear data structure that follows the First In, First Out (FIFO) principle. 
              Think of it like a line at a store - the first person in line is the first person served.
            </p>
            
            <div className="bg-green-50 p-6 rounded-xl border border-green-200">
              <h4 className="font-semibold text-green-900 mb-3">Key Characteristics:</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-green-800">Linear data structure</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-green-800">FIFO (First In, First Out) ordering</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-green-800">Access from both ends (front & rear)</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-green-800">Dynamic size (can grow/shrink)</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl">
            <h4 className="font-semibold text-gray-900 mb-4">Queue Visualization</h4>
            <div className="flex items-center space-x-2">
              <div className="text-sm text-gray-500">← Dequeue (Front)</div>
              <div className="flex space-x-1">
                {['First', 'Second', 'Third'].map((item, index) => (
                  <div 
                    key={index}
                    className={`px-4 py-3 text-center rounded-lg font-medium ${
                      index === 0 
                        ? 'bg-red-100 text-red-800 border-2 border-red-300' 
                        : 'bg-green-100 text-green-800 border border-green-200'
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-500">Enqueue (Rear) →</div>
            </div>
            <div className="text-sm text-gray-500 mt-2 text-center">Front element leaves first, new elements join at rear</div>
          </div>
        </div>
      </div>

      {/* FIFO Principle */}
      <div id="fifo-principle" className="bg-white rounded-2xl p-8 shadow-lg border mb-12 text-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <ArrowRight className="w-8 h-8 mr-3 text-blue-600" />
            FIFO Principle in Action
          </h2>
          <SectionProgressIndicator 
            moduleId="module-3"
            sectionId="fifo-principle"
          />
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <p className="text-gray-600 text-lg mb-6">
              FIFO means the first element added to the queue will be the first one to be removed. 
              This ensures fairness and order in data processing.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Enqueue Operation
                </h4>
                <p className="text-green-700 mb-3">Adding an element to the rear of the queue</p>
                <div className="bg-white p-3 rounded border font-mono text-sm">
                  <div className="text-gray-600">queue.enqueue(element)</div>
                  <div className="text-green-600">// Adds to rear</div>
                </div>
              </div>
              
              <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                <h4 className="font-semibold text-red-900 mb-3 flex items-center">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Dequeue Operation
                </h4>
                <p className="text-red-700 mb-3">Removing the front element from the queue</p>
                <div className="bg-white p-3 rounded border font-mono text-sm">
                  <div className="text-gray-600">element = queue.dequeue()</div>
                  <div className="text-red-600">// Removes from front</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-4">Step-by-Step Example</h4>
            <div className="space-y-3 text-sm">
              <div className="bg-white p-2 rounded border">
                <div className="font-mono">enqueue(A) → [A]</div>
              </div>
              <div className="bg-white p-2 rounded border">
                <div className="font-mono">enqueue(B) → [A,B]</div>
              </div>
              <div className="bg-white p-2 rounded border">
                <div className="font-mono">enqueue(C) → [A,B,C]</div>
              </div>
              <div className="bg-white p-2 rounded border border-red-300">
                <div className="font-mono text-red-700">dequeue() → returns A</div>
                <div className="font-mono text-gray-500">[B,C]</div>
              </div>
              <div className="bg-white p-2 rounded border border-red-300">
                <div className="font-mono text-red-700">dequeue() → returns B</div>
                <div className="font-mono text-gray-500">[C]</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-World Examples */}
      <div id="real-world-examples" className="bg-white rounded-2xl p-8 shadow-lg border mb-12 text-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <Target className="w-8 h-8 mr-3 text-purple-600" />
            Real-World Queue Examples
          </h2>
          <SectionProgressIndicator 
            moduleId="module-3"
            sectionId="real-world-examples"
          />
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-3">Task Scheduling</h4>
            <p className="text-blue-700 mb-3">CPU scheduler manages processes</p>
            <div className="bg-white p-3 rounded border text-sm">
              <div>Process A (first)</div>
              <div>Process B</div>
              <div>Process C (last)</div>
            </div>
          </div>
          
          <div className="bg-green-50 p-6 rounded-xl border border-green-200">
            <h4 className="font-semibold text-green-900 mb-3">Print Queue</h4>
            <p className="text-green-700 mb-3">Documents printed in order</p>
            <div className="bg-white p-3 rounded border text-sm">
              <div>Document 1 (printing)</div>
              <div>Document 2 (waiting)</div>
              <div>Document 3 (waiting)</div>
            </div>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-3">Breadth-First Search</h4>
            <p className="text-purple-700 mb-3">Graph traversal algorithm</p>
            <div className="bg-white p-3 rounded border text-sm">
              <div>Visit neighbors level by level</div>
              <div className="text-gray-500">Queue maintains order</div>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
            <h4 className="font-semibold text-yellow-900 mb-3">Web Server Requests</h4>
            <p className="text-yellow-700 mb-3">HTTP requests served in order</p>
            <div className="bg-white p-3 rounded border text-sm">
              <div>Request 1 (processing)</div>
              <div>Request 2 (queued)</div>
              <div>Request 3 (queued)</div>
            </div>
          </div>
          
          <div className="bg-red-50 p-6 rounded-xl border border-red-200">
            <h4 className="font-semibold text-red-900 mb-3">Buffer Management</h4>
            <p className="text-red-700 mb-3">I/O operations buffering</p>
            <div className="bg-white p-3 rounded border text-sm">
              <div>Data chunks</div>
              <div>Processed in order</div>
              <div>Memory efficient</div>
            </div>
          </div>
          
          <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-200">
            <h4 className="font-semibold text-indigo-900 mb-3">Customer Service</h4>
            <p className="text-indigo-700 mb-3">Call center queue system</p>
            <div className="bg-white p-3 rounded border text-sm">
              <div>First caller served first</div>
              <div className="text-gray-500">Fair service order</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="flex justify-between items-center mt-16 pt-8 border-t border-gray-200"
      >
        <Link
          href="/learning-path/module-3/stack-applications"
          className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Previous: Stack Applications
        </Link>
        <Link
          href="/learning-path/module-3/queue-types"
          className="flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
        >
          Next: Queue Types
          <ChevronRight className="w-6 h-6 ml-2" />
        </Link>
      </motion.div>
    </EnhancedModuleLayout>
  );
}