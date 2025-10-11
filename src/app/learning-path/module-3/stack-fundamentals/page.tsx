'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Target, 
  Info, 
  CheckCircle, 
  ArrowDown, 
  ArrowUp,
  Package,
  ChevronRight,
  ArrowLeft,
  Code,
  Play
} from 'lucide-react';
import Link from 'next/link';
import { EnhancedModuleLayout } from '@/components/layouts/EnhancedModuleLayout';
import { ProgressIndicator } from '@/components/progress/ProgressIndicator';
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton';
import { SectionProgressIndicator } from '@/components/progress/SectionProgressIndicator';

export default function StackFundamentalsPage() {
  const [activeSection, setActiveSection] = useState('stack-concept');

  const sections = [
    { id: 'stack-concept', name: 'Stack Concept', icon: Package },
    { id: 'lifo-principle', name: 'LIFO Principle', icon: ArrowUp },
    { id: 'stack-visualization', name: 'Stack Visualization', icon: Info },
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
      currentPath="/learning-path/module-3/stack-fundamentals"
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
            topicId="stack-fundamentals" 
            topicType="stacks-queues"
            category="learning-path"
          />
          <BookmarkButton 
            topicId="stack-fundamentals"
            topicType="stacks-queues"
            title="Stack Fundamentals"
            category="learning-path"
            url="/learning-path/module-3/stack-fundamentals"
          />
        </div>
        
        <div className="inline-flex items-center bg-blue-100 text-blue-800 px-6 py-3 rounded-full text-sm font-medium mb-8">
          <Package className="w-5 h-5 mr-2" />
          Lesson 1: Stack Fundamentals
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-8">
          Understanding
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Stack Data Structure
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Learn the fundamental concepts of stacks, the LIFO (Last In, First Out) principle, 
          and discover how this simple yet powerful data structure is used everywhere in computer science.
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
              <Package className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">Stack Concept</h3>
                <p className="text-sm text-gray-600">Understand what a stack is and its properties</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <ArrowUp className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">LIFO Principle</h3>
                <p className="text-sm text-gray-600">Master Last In, First Out operations</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Target className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">Real Applications</h3>
                <p className="text-sm text-gray-600">Discover how stacks are used in programming</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stack Concept */}
      <div id="stack-concept" className="bg-white rounded-2xl p-8 shadow-lg border mb-12 text-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <Package className="w-8 h-8 mr-3 text-blue-600" />
            What is a Stack?
          </h2>
          <SectionProgressIndicator 
            moduleId="module-3"
            sectionId="stack-concept"
          />
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-gray-600 text-lg leading-relaxed">
              A <strong>stack</strong> is a linear data structure that follows the Last In, First Out (LIFO) principle. 
              Think of it like a stack of plates - you can only add or remove plates from the top.
            </p>
            
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-3">Key Characteristics:</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-blue-800">Linear data structure</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-blue-800">LIFO (Last In, First Out) ordering</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-blue-800">Access only from one end (top)</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-blue-800">Dynamic size (can grow/shrink)</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl">
            <h4 className="font-semibold text-gray-900 mb-4">Stack Visualization</h4>
            <div className="flex flex-col items-center space-y-2">
              {['Element 3 (Top)', 'Element 2', 'Element 1 (Bottom)'].map((item, index) => (
                <div 
                  key={index}
                  className={`w-full max-w-xs px-4 py-3 text-center rounded-lg font-medium ${
                    index === 0 
                      ? 'bg-red-100 text-red-800 border-2 border-red-300' 
                      : 'bg-blue-100 text-blue-800 border border-blue-200'
                  }`}
                >
                  {item}
                </div>
              ))}
              <div className="text-sm text-gray-500 mt-2">↑ Push/Pop operations happen here</div>
            </div>
          </div>
        </div>
      </div>

      {/* LIFO Principle */}
      <div id="lifo-principle" className="bg-white rounded-2xl p-8 shadow-lg border mb-12 text-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <ArrowUp className="w-8 h-8 mr-3 text-purple-600" />
            LIFO Principle in Action
          </h2>
          <SectionProgressIndicator 
            moduleId="module-3"
            sectionId="lifo-principle"
          />
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <p className="text-gray-600 text-lg mb-6">
              LIFO means the last element added to the stack will be the first one to be removed. 
              This is the fundamental principle that defines stack behavior.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                  <ArrowUp className="w-5 h-5 mr-2" />
                  Push Operation
                </h4>
                <p className="text-green-700 mb-3">Adding an element to the top of the stack</p>
                <div className="bg-white p-3 rounded border font-mono text-sm">
                  <div className="text-gray-600">stack.push(element)</div>
                  <div className="text-green-600">// Adds to top</div>
                </div>
              </div>
              
              <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                <h4 className="font-semibold text-red-900 mb-3 flex items-center">
                  <ArrowDown className="w-5 h-5 mr-2" />
                  Pop Operation
                </h4>
                <p className="text-red-700 mb-3">Removing the top element from the stack</p>
                <div className="bg-white p-3 rounded border font-mono text-sm">
                  <div className="text-gray-600">element = stack.pop()</div>
                  <div className="text-red-600">// Removes from top</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-4">Step-by-Step Example</h4>
            <div className="space-y-3 text-sm">
              <div className="bg-white p-2 rounded border">
                <div className="font-mono">push(1) → [1]</div>
              </div>
              <div className="bg-white p-2 rounded border">
                <div className="font-mono">push(2) → [1,2]</div>
              </div>
              <div className="bg-white p-2 rounded border">
                <div className="font-mono">push(3) → [1,2,3]</div>
              </div>
              <div className="bg-white p-2 rounded border border-red-300">
                <div className="font-mono text-red-700">pop() → returns 3</div>
                <div className="font-mono text-gray-500">[1,2]</div>
              </div>
              <div className="bg-white p-2 rounded border border-red-300">
                <div className="font-mono text-red-700">pop() → returns 2</div>
                <div className="font-mono text-gray-500">[1]</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-World Examples */}
      <div id="real-world-examples" className="bg-white rounded-2xl p-8 shadow-lg border mb-12 text-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <Target className="w-8 h-8 mr-3 text-indigo-600" />
            Real-World Stack Examples
          </h2>
          <SectionProgressIndicator 
            moduleId="module-3"
            sectionId="real-world-examples"
          />
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-3">Function Calls</h4>
            <p className="text-blue-700 mb-3">Call stack manages function execution</p>
            <div className="bg-white p-3 rounded border font-mono text-sm">
              <div>main() calls</div>
              <div className="ml-2">foo() calls</div>
              <div className="ml-4">bar() // top</div>
            </div>
          </div>
          
          <div className="bg-green-50 p-6 rounded-xl border border-green-200">
            <h4 className="font-semibold text-green-900 mb-3">Browser History</h4>
            <p className="text-green-700 mb-3">Back button uses stack behavior</p>
            <div className="bg-white p-3 rounded border text-sm">
              <div>Current Page (top)</div>
              <div>Previous Page</div>
              <div>Earlier Page</div>
            </div>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-3">Undo/Redo</h4>
            <p className="text-purple-700 mb-3">Text editors use stacks for undo</p>
            <div className="bg-white p-3 rounded border text-sm">
              <div>Latest Change (top)</div>
              <div>Previous Change</div>
              <div>Earlier Change</div>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
            <h4 className="font-semibold text-yellow-900 mb-3">Expression Evaluation</h4>
            <p className="text-yellow-700 mb-3">Parsing mathematical expressions</p>
            <div className="bg-white p-3 rounded border font-mono text-sm">
              <div>((3+4)*2)</div>
              <div className="text-gray-500">Uses operator stack</div>
            </div>
          </div>
          
          <div className="bg-red-50 p-6 rounded-xl border border-red-200">
            <h4 className="font-semibold text-red-900 mb-3">Memory Management</h4>
            <p className="text-red-700 mb-3">Stack memory for local variables</p>
            <div className="bg-white p-3 rounded border text-sm">
              <div>Local variables</div>
              <div>Function parameters</div>
              <div>Return addresses</div>
            </div>
          </div>
          
          <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-200">
            <h4 className="font-semibold text-indigo-900 mb-3">Syntax Parsing</h4>
            <p className="text-indigo-700 mb-3">Matching parentheses, brackets</p>
            <div className="bg-white p-3 rounded border font-mono text-sm">
              <div>{`{ "[" "(" ")" "]" }`}</div>
              <div className="text-gray-500">Balanced checking</div>
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
          href="/learning-path/module-3"
          className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Module Overview
        </Link>
        <Link
          href="/learning-path/module-3/stack-operations"
          className="flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
        >
          Next: Stack Operations
          <ChevronRight className="w-6 h-6 ml-2" />
        </Link>
      </motion.div>
    </EnhancedModuleLayout>
  );
}