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
  Play,
  Eye,
  Search,
  AlertTriangle
} from 'lucide-react';
import Link from 'next/link';
import { EnhancedModuleLayout } from '@/components/layouts/EnhancedModuleLayout';
import { ProgressIndicator } from '@/components/progress/ProgressIndicator';
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton';
import { SectionProgressIndicator } from '@/components/progress/SectionProgressIndicator';

export default function StackOperationsPage() {
  const [activeSection, setActiveSection] = useState('basic-operations');

  const sections = [
    { id: 'basic-operations', name: 'Basic Operations', icon: Code },
    { id: 'push-operation', name: 'Push Operation', icon: ArrowUp },
    { id: 'pop-operation', name: 'Pop Operation', icon: ArrowDown },
    { id: 'helper-operations', name: 'Helper Operations', icon: Eye },
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
      estimatedTime="20-25 minutes"
      difficulty="Intermediate"
      totalSections={8}
      currentPath="/learning-path/module-3/stack-operations"
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
            topicId="stack-operations" 
            topicType="stacks-queues"
            category="learning-path"
          />
          <BookmarkButton 
            topicId="stack-operations"
            topicType="stacks-queues"
            title="Stack Operations"
            category="learning-path"
            url="/learning-path/module-3/stack-operations"
          />
        </div>
        
        <div className="inline-flex items-center bg-blue-100 text-blue-800 px-6 py-3 rounded-full text-sm font-medium mb-8">
          <Code className="w-5 h-5 mr-2" />
          Lesson 2: Stack Operations
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-8">
          Stack
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Operations & Implementation
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Master the essential stack operations: push, pop, peek, and isEmpty. 
          Learn how to implement these operations efficiently and understand their time complexities.
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
          <div className="grid md:grid-cols-4 gap-4">
            <div className="flex items-start space-x-3">
              <ArrowUp className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">Push Operation</h3>
                <p className="text-sm text-gray-600">Add elements to the stack</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <ArrowDown className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">Pop Operation</h3>
                <p className="text-sm text-gray-600">Remove elements from stack</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Eye className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">Peek/Top</h3>
                <p className="text-sm text-gray-600">View top element without removing</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Search className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">Helper Methods</h3>
                <p className="text-sm text-gray-600">Check empty status and size</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Basic Operations Overview */}
      <div id="basic-operations" className="bg-white rounded-2xl p-8 shadow-lg border mb-12 text-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <Code className="w-8 h-8 mr-3 text-blue-600" />
            Essential Stack Operations
          </h2>
          <SectionProgressIndicator 
            moduleId="module-3"
            sectionId="basic-operations"
          />
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <p className="text-gray-600 text-lg leading-relaxed">
              A stack provides a limited set of operations that maintain the LIFO principle. 
              These operations are simple but powerful enough to solve many complex problems.
            </p>
            
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2 flex items-center">
                  <ArrowUp className="w-5 h-5 mr-2" />
                  Push Operation
                </h4>
                <p className="text-green-700 text-sm">Add an element to the top of the stack</p>
                <div className="text-xs text-green-600 mt-1">Time Complexity: O(1)</div>
              </div>
              
              <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                <h4 className="font-semibold text-red-900 mb-2 flex items-center">
                  <ArrowDown className="w-5 h-5 mr-2" />
                  Pop Operation
                </h4>
                <p className="text-red-700 text-sm">Remove and return the top element</p>
                <div className="text-xs text-red-600 mt-1">Time Complexity: O(1)</div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  Peek/Top Operation
                </h4>
                <p className="text-blue-700 text-sm">View the top element without removing it</p>
                <div className="text-xs text-blue-600 mt-1">Time Complexity: O(1)</div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-2 flex items-center">
                  <Search className="w-5 h-5 mr-2" />
                  isEmpty Operation
                </h4>
                <p className="text-purple-700 text-sm">Check if the stack is empty</p>
                <div className="text-xs text-purple-600 mt-1">Time Complexity: O(1)</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl">
            <h4 className="font-semibold text-gray-900 mb-4">Stack Interface</h4>
            <div className="bg-white p-4 rounded border font-mono text-sm space-y-2">
              <div className="text-blue-600">class Stack {`<T>`}:</div>
              <div className="ml-4 text-green-600">push(item: T): void</div>
              <div className="ml-4 text-red-600">pop(): T | undefined</div>
              <div className="ml-4 text-purple-600">peek(): T | undefined</div>
              <div className="ml-4 text-orange-600">isEmpty(): boolean</div>
              <div className="ml-4 text-gray-600">size(): number</div>
              <div className="text-blue-600">{`}`}</div>
            </div>
            
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-yellow-700">
                  <strong>Important:</strong> All operations work on the top of the stack only!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Push Operation */}
      <div id="push-operation" className="bg-white rounded-2xl p-8 shadow-lg border mb-12 text-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <ArrowUp className="w-8 h-8 mr-3 text-green-600" />
            Push Operation Deep Dive
          </h2>
          <SectionProgressIndicator 
            moduleId="module-3"
            sectionId="push-operation"
          />
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-green-50 p-6 rounded-xl border border-green-200">
              <h4 className="font-semibold text-green-900 mb-3">How Push Works</h4>
              <p className="text-green-700 mb-4">
                The push operation adds a new element to the top of the stack. It increases the stack size by one 
                and ensures the new element becomes the most recently added item.
              </p>
              
              <div className="space-y-3">
                <div className="text-sm font-medium text-green-800">Push Algorithm:</div>
                <div className="bg-white p-3 rounded border font-mono text-sm space-y-1">
                  <div>1. Check if stack has space (if using fixed-size)</div>
                  <div>2. Add element to the top position</div>
                  <div>3. Increment the stack pointer/size</div>
                  <div>4. Return success (if needed)</div>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border">
                <h4 className="font-semibold text-gray-900 mb-3">Array Implementation</h4>
                <div className="bg-gray-50 p-3 rounded font-mono text-sm space-y-1">
                  <div className="text-blue-600">push(item) {`{`}</div>
                  <div className="ml-2 text-gray-600">if (top {'<'} maxSize - 1) {`{`}</div>
                  <div className="ml-4 text-green-600">arr[++top] = item;</div>
                  <div className="ml-2 text-gray-600">{`} else {`}</div>
                  <div className="ml-4 text-red-600">throw "Stack Overflow";</div>
                  <div className="ml-2 text-gray-600">{`}`}</div>
                  <div className="text-blue-600">{`}`}</div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl border">
                <h4 className="font-semibold text-gray-900 mb-3">Linked List Implementation</h4>
                <div className="bg-gray-50 p-3 rounded font-mono text-sm space-y-1">
                  <div className="text-blue-600">push(item) {`{`}</div>
                  <div className="ml-2 text-green-600">newNode = new Node(item);</div>
                  <div className="ml-2 text-green-600">newNode.next = top;</div>
                  <div className="ml-2 text-green-600">top = newNode;</div>
                  <div className="ml-2 text-green-600">size++;</div>
                  <div className="text-blue-600">{`}`}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 p-6 rounded-xl border border-green-200">
            <h4 className="font-semibold text-green-900 mb-4">Push Example</h4>
            <div className="space-y-3 text-sm">
              <div className="bg-white p-3 rounded border">
                <div className="font-bold text-gray-800">Initial: []</div>
                <div className="text-gray-600">Empty stack</div>
              </div>
              
              <div className="text-center">
                <ArrowDown className="w-4 h-4 text-green-600 mx-auto" />
                <div className="text-xs text-green-600">push(5)</div>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <div className="font-bold text-gray-800">[5] ← top</div>
                <div className="text-gray-600">Size: 1</div>
              </div>
              
              <div className="text-center">
                <ArrowDown className="w-4 h-4 text-green-600 mx-auto" />
                <div className="text-xs text-green-600">push(3)</div>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <div className="font-bold text-gray-800">[5, 3] ← top</div>
                <div className="text-gray-600">Size: 2</div>
              </div>
              
              <div className="text-center">
                <ArrowDown className="w-4 h-4 text-green-600 mx-auto" />
                <div className="text-xs text-green-600">push(8)</div>
              </div>
              
              <div className="bg-white p-3 rounded border bg-green-100">
                <div className="font-bold text-gray-800">[5, 3, 8] ← top</div>
                <div className="text-gray-600">Size: 3</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pop Operation */}
      <div id="pop-operation" className="bg-white rounded-2xl p-8 shadow-lg border mb-12 text-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <ArrowDown className="w-8 h-8 mr-3 text-red-600" />
            Pop Operation Deep Dive
          </h2>
          <SectionProgressIndicator 
            moduleId="module-3"
            sectionId="pop-operation"
          />
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-red-50 p-6 rounded-xl border border-red-200">
              <h4 className="font-semibold text-red-900 mb-3">How Pop Works</h4>
              <p className="text-red-700 mb-4">
                The pop operation removes and returns the top element from the stack. It decreases the stack size 
                by one and makes the second-to-top element the new top.
              </p>
              
              <div className="space-y-3">
                <div className="text-sm font-medium text-red-800">Pop Algorithm:</div>
                <div className="bg-white p-3 rounded border font-mono text-sm space-y-1">
                  <div>1. Check if stack is not empty</div>
                  <div>2. Save the top element to return</div>
                  <div>3. Remove the top element</div>
                  <div>4. Decrement the stack pointer/size</div>
                  <div>5. Return the saved element</div>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border">
                <h4 className="font-semibold text-gray-900 mb-3">Array Implementation</h4>
                <div className="bg-gray-50 p-3 rounded font-mono text-sm space-y-1">
                  <div className="text-blue-600">pop() {`{`}</div>
                  <div className="ml-2 text-gray-600">if (top {'>'}= 0) {`{`}</div>
                  <div className="ml-4 text-green-600">return arr[top--];</div>
                  <div className="ml-2 text-gray-600">{`} else {`}</div>
                  <div className="ml-4 text-red-600">throw "Stack Underflow";</div>
                  <div className="ml-2 text-gray-600">{`}`}</div>
                  <div className="text-blue-600">{`}`}</div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl border">
                <h4 className="font-semibold text-gray-900 mb-3">Linked List Implementation</h4>
                <div className="bg-gray-50 p-3 rounded font-mono text-sm space-y-1">
                  <div className="text-blue-600">pop() {`{`}</div>
                  <div className="ml-2 text-gray-600">if (top != null) {`{`}</div>
                  <div className="ml-4 text-green-600">item = top.data;</div>
                  <div className="ml-4 text-green-600">top = top.next;</div>
                  <div className="ml-4 text-green-600">size--;</div>
                  <div className="ml-4 text-green-600">return item;</div>
                  <div className="ml-2 text-gray-600">{`}`}</div>
                  <div className="text-blue-600">{`}`}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-red-50 p-6 rounded-xl border border-red-200">
            <h4 className="font-semibold text-red-900 mb-4">Pop Example</h4>
            <div className="space-y-3 text-sm">
              <div className="bg-white p-3 rounded border">
                <div className="font-bold text-gray-800">[5, 3, 8] ← top</div>
                <div className="text-gray-600">Size: 3</div>
              </div>
              
              <div className="text-center">
                <ArrowUp className="w-4 h-4 text-red-600 mx-auto" />
                <div className="text-xs text-red-600">pop() returns 8</div>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <div className="font-bold text-gray-800">[5, 3] ← top</div>
                <div className="text-gray-600">Size: 2</div>
              </div>
              
              <div className="text-center">
                <ArrowUp className="w-4 h-4 text-red-600 mx-auto" />
                <div className="text-xs text-red-600">pop() returns 3</div>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <div className="font-bold text-gray-800">[5] ← top</div>
                <div className="text-gray-600">Size: 1</div>
              </div>
              
              <div className="text-center">
                <ArrowUp className="w-4 h-4 text-red-600 mx-auto" />
                <div className="text-xs text-red-600">pop() returns 5</div>
              </div>
              
              <div className="bg-white p-3 rounded border bg-red-100">
                <div className="font-bold text-gray-800">[] (empty)</div>
                <div className="text-gray-600">Size: 0</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Helper Operations */}
      <div id="helper-operations" className="bg-white rounded-2xl p-8 shadow-lg border mb-12 text-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <Eye className="w-8 h-8 mr-3 text-purple-600" />
            Helper Operations
          </h2>
          <SectionProgressIndicator 
            moduleId="module-3"
            sectionId="helper-operations"
          />
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
              <Eye className="w-5 h-5 mr-2" />
              Peek/Top Operation
            </h4>
            <p className="text-blue-700 mb-4">View the top element without removing it from the stack.</p>
            
            <div className="bg-white p-3 rounded border font-mono text-sm space-y-1">
              <div className="text-blue-600">peek() {`{`}</div>
              <div className="ml-2 text-gray-600">if (!isEmpty()) {`{`}</div>
              <div className="ml-4 text-green-600">return arr[top];</div>
              <div className="ml-2 text-gray-600">{`}`}</div>
              <div className="ml-2 text-red-600">return null;</div>
              <div className="text-blue-600">{`}`}</div>
            </div>
            
            <div className="mt-3 text-xs text-blue-600">
              <strong>Time:</strong> O(1) | <strong>Space:</strong> O(1)
            </div>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-3 flex items-center">
              <Search className="w-5 h-5 mr-2" />
              isEmpty Operation
            </h4>
            <p className="text-purple-700 mb-4">Check whether the stack contains any elements.</p>
            
            <div className="bg-white p-3 rounded border font-mono text-sm space-y-1">
              <div className="text-blue-600">isEmpty() {`{`}</div>
              <div className="ml-2 text-green-600">return top == -1;</div>
              <div className="ml-2 text-gray-600">// or size == 0</div>
              <div className="text-blue-600">{`}`}</div>
            </div>
            
            <div className="mt-3 text-xs text-purple-600">
              <strong>Time:</strong> O(1) | <strong>Space:</strong> O(1)
            </div>
          </div>
          
          <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
            <h4 className="font-semibold text-orange-900 mb-3 flex items-center">
              <Info className="w-5 h-5 mr-2" />
              Size Operation
            </h4>
            <p className="text-orange-700 mb-4">Get the current number of elements in the stack.</p>
            
            <div className="bg-white p-3 rounded border font-mono text-sm space-y-1">
              <div className="text-blue-600">size() {`{`}</div>
              <div className="ml-2 text-green-600">return top + 1;</div>
              <div className="ml-2 text-gray-600">// or return size</div>
              <div className="text-blue-600">{`}`}</div>
            </div>
            
            <div className="mt-3 text-xs text-orange-600">
              <strong>Time:</strong> O(1) | <strong>Space:</strong> O(1)
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-gray-50 p-6 rounded-xl">
          <h4 className="font-semibold text-gray-900 mb-4">Complete Stack Usage Example</h4>
          <div className="bg-white p-4 rounded border font-mono text-sm space-y-2">
            <div className="text-gray-600">Stack{`<Integer>`} stack = new Stack{`<>`}();</div>
            <div className="text-blue-600">// Initial state</div>
            <div className="text-gray-600">stack.isEmpty(); <span className="text-green-600">// returns true</span></div>
            <div className="text-gray-600">stack.size(); <span className="text-green-600">// returns 0</span></div>
            <div className="text-blue-600">// Adding elements</div>
            <div className="text-gray-600">stack.push(10);</div>
            <div className="text-gray-600">stack.push(20);</div>
            <div className="text-gray-600">stack.push(30);</div>
            <div className="text-blue-600">// Checking state</div>
            <div className="text-gray-600">stack.size(); <span className="text-green-600">// returns 3</span></div>
            <div className="text-gray-600">stack.peek(); <span className="text-green-600">// returns 30</span></div>
            <div className="text-gray-600">stack.isEmpty(); <span className="text-green-600">// returns false</span></div>
            <div className="text-blue-600">// Removing elements</div>
            <div className="text-gray-600">stack.pop(); <span className="text-green-600">// returns 30</span></div>
            <div className="text-gray-600">stack.peek(); <span className="text-green-600">// returns 20</span></div>
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
          href="/learning-path/module-3/stack-fundamentals"
          className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Previous: Stack Fundamentals
        </Link>
        <Link
          href="/learning-path/module-3/stack-applications"
          className="flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
        >
          Next: Stack Applications
          <ChevronRight className="w-6 h-6 ml-2" />
        </Link>
      </motion.div>
    </EnhancedModuleLayout>
  );
}