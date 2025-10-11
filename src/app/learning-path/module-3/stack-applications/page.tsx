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
  Brain,
  Phone,
  Undo,
  Calculator,
  FileText,
  Globe,
  Cpu
} from 'lucide-react';
import Link from 'next/link';
import { EnhancedModuleLayout } from '@/components/layouts/EnhancedModuleLayout';
import { ProgressIndicator } from '@/components/progress/ProgressIndicator';
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton';
import { SectionProgressIndicator } from '@/components/progress/SectionProgressIndicator';

export default function StackApplicationsPage() {
  const [activeSection, setActiveSection] = useState('function-calls');
  const [activeExample, setActiveExample] = useState('balanced-parentheses');

  const sections = [
    { id: 'function-calls', name: 'Function Call Stack', icon: Phone },
    { id: 'expression-evaluation', name: 'Expression Evaluation', icon: Calculator },
    { id: 'undo-redo', name: 'Undo/Redo Operations', icon: Undo },
    { id: 'browser-history', name: 'Browser History', icon: Globe },
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
      estimatedTime="30-35 minutes"
      difficulty="Intermediate"
      totalSections={8}
      currentPath="/learning-path/module-3/stack-applications"
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
            topicId="stack-applications" 
            topicType="stacks-queues"
            category="learning-path"
          />
          <BookmarkButton 
            topicId="stack-applications"
            topicType="stacks-queues"
            title="Stack Applications"
            category="learning-path"
            url="/learning-path/module-3/stack-applications"
          />
        </div>
        
        <div className="inline-flex items-center bg-purple-100 text-purple-800 px-6 py-3 rounded-full text-sm font-medium mb-8">
          <Brain className="w-5 h-5 mr-2" />
          Lesson 3: Stack Applications
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-8">
          Real-World
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Stack Applications
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Discover how stacks power essential computer science concepts: function calls, expression evaluation, 
          undo operations, and much more. See stacks in action with interactive examples and visualizations.
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
              <Phone className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">Function Calls</h3>
                <p className="text-sm text-gray-600">Understand how programs manage function execution</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Calculator className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">Expression Evaluation</h3>
                <p className="text-sm text-gray-600">Learn infix, postfix, and prefix notations</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Undo className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">Undo/Redo</h3>
                <p className="text-sm text-gray-600">Implement reversible operations</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Globe className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">Browser History</h3>
                <p className="text-sm text-gray-600">Navigate through page history</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Function Call Stack */}
      <div id="function-calls" className="bg-white rounded-2xl p-8 shadow-lg border mb-12 text-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <Phone className="w-8 h-8 mr-3 text-blue-600" />
            Function Call Stack
          </h2>
          <SectionProgressIndicator 
            moduleId="module-3"
            sectionId="function-calls"
          />
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <p className="text-gray-600 text-lg leading-relaxed">
              Every time you call a function, the program uses a <strong>call stack</strong> to keep track of:
              function parameters, local variables, and return addresses. This is fundamental to how all programming languages work.
            </p>
            
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-3">How Function Calls Work</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold">1</div>
                  <span className="text-blue-800">Function called → pushed onto stack</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold">2</div>
                  <span className="text-blue-800">Parameters and local variables stored</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold">3</div>
                  <span className="text-blue-800">Function executes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold">4</div>
                  <span className="text-blue-800">Function returns → popped from stack</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-3">Code Example</h4>
              <div className="bg-white p-4 rounded border font-mono text-sm space-y-1">
                <div className="text-blue-600">function factorial(n) {`{`}</div>
                <div className="ml-4 text-gray-600">if (n === 0) return 1;</div>
                <div className="ml-4 text-purple-600">return n * factorial(n - 1);</div>
                <div className="text-blue-600">{`}`}</div>
                <div className="mt-3 text-green-600">factorial(3); // Call this</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-4">Call Stack Visualization</h4>
            <div className="space-y-2">
              <div className="bg-red-100 border-2 border-red-300 p-3 rounded text-center">
                <div className="font-bold text-red-800">factorial(1)</div>
                <div className="text-xs text-red-600">n=1, returns 1</div>
              </div>
              <div className="bg-orange-100 border border-orange-300 p-3 rounded text-center">
                <div className="font-bold text-orange-800">factorial(2)</div>
                <div className="text-xs text-orange-600">n=2, waits for factorial(1)</div>
              </div>
              <div className="bg-yellow-100 border border-yellow-300 p-3 rounded text-center">
                <div className="font-bold text-yellow-800">factorial(3)</div>
                <div className="text-xs text-yellow-600">n=3, waits for factorial(2)</div>
              </div>
              <div className="bg-blue-100 border border-blue-300 p-3 rounded text-center">
                <div className="font-bold text-blue-800">main()</div>
                <div className="text-xs text-blue-600">Called factorial(3)</div>
              </div>
            </div>
            <div className="mt-4 text-center text-sm text-gray-600">
              ↑ Stack grows upward with each function call
            </div>
          </div>
        </div>
      </div>

      {/* Expression Evaluation */}
      <div id="expression-evaluation" className="bg-white rounded-2xl p-8 shadow-lg border mb-12 text-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <Calculator className="w-8 h-8 mr-3 text-green-600" />
            Expression Evaluation & Notation Conversion
          </h2>
          <SectionProgressIndicator 
            moduleId="module-3"
            sectionId="expression-evaluation"
          />
        </div>
        
        <div className="space-y-8">
          {/* Notation Types */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-green-50 p-6 rounded-xl border border-green-200">
              <h4 className="font-semibold text-green-900 mb-3">Infix Notation</h4>
              <p className="text-green-700 text-sm mb-3">Operators between operands (human-readable)</p>
              <div className="bg-white p-3 rounded border font-mono text-sm">
                <div>A + B</div>
                <div>(A + B) * C</div>
                <div>A + B * C - D</div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-3">Postfix Notation</h4>
              <p className="text-blue-700 text-sm mb-3">Operators after operands (stack-friendly)</p>
              <div className="bg-white p-3 rounded border font-mono text-sm">
                <div>A B +</div>
                <div>A B + C *</div>
                <div>A B C * + D -</div>
              </div>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-3">Prefix Notation</h4>
              <p className="text-purple-700 text-sm mb-3">Operators before operands (Polish notation)</p>
              <div className="bg-white p-3 rounded border font-mono text-sm">
                <div>+ A B</div>
                <div>* + A B C</div>
                <div>- + A * B C D</div>
              </div>
            </div>
          </div>
          
          {/* Interactive Example */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl border border-green-200">
            <h4 className="font-semibold text-gray-900 mb-4">Interactive: Postfix Evaluation with Stack</h4>
            <p className="text-gray-600 mb-4">Watch how the expression "3 4 + 2 * 7 /" is evaluated using a stack:</p>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="bg-white p-4 rounded border">
                  <div className="font-bold text-gray-800 mb-2">Expression: 3 4 + 2 * 7 /</div>
                  <div className="text-sm text-gray-600">Step-by-step evaluation:</div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="bg-white p-3 rounded border flex justify-between">
                    <span>Read 3 → Push to stack</span>
                    <span className="font-mono text-blue-600">[3]</span>
                  </div>
                  <div className="bg-white p-3 rounded border flex justify-between">
                    <span>Read 4 → Push to stack</span>
                    <span className="font-mono text-blue-600">[3, 4]</span>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded border flex justify-between">
                    <span>Read + → Pop 4,3 → Push 3+4=7</span>
                    <span className="font-mono text-orange-600">[7]</span>
                  </div>
                  <div className="bg-white p-3 rounded border flex justify-between">
                    <span>Read 2 → Push to stack</span>
                    <span className="font-mono text-blue-600">[7, 2]</span>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded border flex justify-between">
                    <span>Read * → Pop 2,7 → Push 7*2=14</span>
                    <span className="font-mono text-orange-600">[14]</span>
                  </div>
                  <div className="bg-white p-3 rounded border flex justify-between">
                    <span>Read 7 → Push to stack</span>
                    <span className="font-mono text-blue-600">[14, 7]</span>
                  </div>
                  <div className="bg-green-100 p-3 rounded border flex justify-between">
                    <span>Read / → Pop 7,14 → Push 14/7=2</span>
                    <span className="font-mono text-green-600">[2] ✓</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl border">
                <h5 className="font-semibold mb-4">Algorithm Steps:</h5>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold text-xs">1</div>
                    <span>If operand → push to stack</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-orange-800 font-bold text-xs">2</div>
                    <span>If operator → pop two operands</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-bold text-xs">3</div>
                    <span>Apply operator → push result</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-800 font-bold text-xs">4</div>
                    <span>Final result = top of stack</span>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-gray-50 rounded border">
                  <div className="font-bold text-gray-800">Why Use Postfix?</div>
                  <ul className="text-sm text-gray-600 mt-2 space-y-1">
                    <li>• No parentheses needed</li>
                    <li>• No operator precedence rules</li>
                    <li>• Perfect for stack evaluation</li>
                    <li>• Used in calculators & compilers</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Balanced Parentheses */}
          <div className="bg-white p-6 rounded-xl border">
            <h4 className="font-semibold text-gray-900 mb-4">Bonus: Balanced Parentheses Checker</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600 mb-4">Stacks are perfect for checking if parentheses are balanced in expressions:</p>
                <div className="bg-gray-50 p-4 rounded border font-mono text-sm space-y-2">
                  <div className="text-green-600">✓ (a + b) * (c - d)</div>
                  <div className="text-green-600">✓ {`{[a + b] * c}`}</div>
                  <div className="text-red-600">✗ (a + b * (c - d)</div>
                  <div className="text-red-600">✗ )a + b(</div>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded border">
                <div className="font-bold text-blue-900 mb-2">Algorithm:</div>
                <div className="text-sm text-blue-800 space-y-1">
                  <div>1. For opening brackets: push to stack</div>
                  <div>2. For closing brackets: pop and match</div>
                  <div>3. Stack empty at end = balanced ✓</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Undo/Redo Operations */}
      <div id="undo-redo" className="bg-white rounded-2xl p-8 shadow-lg border mb-12 text-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <Undo className="w-8 h-8 mr-3 text-orange-600" />
            Undo/Redo Operations
          </h2>
          <SectionProgressIndicator 
            moduleId="module-3"
            sectionId="undo-redo"
          />
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <p className="text-gray-600 text-lg leading-relaxed">
              Text editors, image editors, and many applications use <strong>two stacks</strong> to implement 
              undo and redo functionality. This allows users to reverse actions and then redo them if needed.
            </p>
            
            <div className="space-y-4">
              <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
                <h4 className="font-semibold text-orange-900 mb-3">How It Works</h4>
                <div className="space-y-2 text-sm text-orange-800">
                  <div><strong>Action Stack:</strong> Stores completed actions</div>
                  <div><strong>Undo:</strong> Pop from action stack, push to redo stack</div>
                  <div><strong>Redo:</strong> Pop from redo stack, push to action stack</div>
                  <div><strong>New Action:</strong> Clear redo stack, push to action stack</div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-3">Real-World Examples</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="font-medium">Text Editors:</div>
                    <div className="text-gray-600">• Type text → push to stack</div>
                    <div className="text-gray-600">• Ctrl+Z → undo last action</div>
                    <div className="text-gray-600">• Ctrl+Y → redo action</div>
                  </div>
                  <div className="space-y-2">
                    <div className="font-medium">Image Editors:</div>
                    <div className="text-gray-600">• Apply filter → push to stack</div>
                    <div className="text-gray-600">• Undo → revert filter</div>
                    <div className="text-gray-600">• Redo → reapply filter</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200">
            <h4 className="font-semibold text-orange-900 mb-4">Interactive Example</h4>
            <div className="text-sm mb-4 text-orange-800">Typing "HELLO" in a text editor:</div>
            
            <div className="space-y-4">
              <div>
                <div className="font-medium text-gray-800 mb-2">After typing "HELLO":</div>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <div className="text-xs text-gray-600 mb-1">Action Stack:</div>
                    <div className="bg-white p-2 rounded border space-y-1 text-xs">
                      <div className="bg-blue-100 p-1 rounded">Type 'O'</div>
                      <div className="bg-blue-100 p-1 rounded">Type 'L'</div>
                      <div className="bg-blue-100 p-1 rounded">Type 'L'</div>
                      <div className="bg-blue-100 p-1 rounded">Type 'E'</div>
                      <div className="bg-blue-100 p-1 rounded">Type 'H'</div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-600 mb-1">Redo Stack:</div>
                    <div className="bg-white p-2 rounded border text-xs text-gray-400">
                      (empty)
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="font-medium text-gray-800 mb-2">After 2 undos (text: "HEL"):</div>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <div className="text-xs text-gray-600 mb-1">Action Stack:</div>
                    <div className="bg-white p-2 rounded border space-y-1 text-xs">
                      <div className="bg-blue-100 p-1 rounded">Type 'L'</div>
                      <div className="bg-blue-100 p-1 rounded">Type 'E'</div>
                      <div className="bg-blue-100 p-1 rounded">Type 'H'</div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-600 mb-1">Redo Stack:</div>
                    <div className="bg-white p-2 rounded border space-y-1 text-xs">
                      <div className="bg-red-100 p-1 rounded">Type 'O'</div>
                      <div className="bg-red-100 p-1 rounded">Type 'L'</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-gray-600">
                Now you can redo to get back "HELLO" or continue editing to clear the redo stack.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Browser History */}
      <div id="browser-history" className="bg-white rounded-2xl p-8 shadow-lg border mb-12 text-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <Globe className="w-8 h-8 mr-3 text-indigo-600" />
            Browser History Navigation
          </h2>
          <SectionProgressIndicator 
            moduleId="module-3"
            sectionId="browser-history"
          />
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <p className="text-gray-600 text-lg leading-relaxed">
              Web browsers use stacks to manage page history. When you click "Back", you're essentially 
              popping from a history stack. When you visit a new page, it's pushed onto the stack.
            </p>
            
            <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-200">
              <h4 className="font-semibold text-indigo-900 mb-3">Browser Navigation Logic</h4>
              <div className="space-y-3 text-sm text-indigo-800">
                <div className="flex items-center space-x-2">
                  <ChevronRight className="w-4 h-4" />
                  <span><strong>Visit new page:</strong> Push to history stack</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span><strong>Back button:</strong> Pop from history stack</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ChevronRight className="w-4 h-4" />
                  <span><strong>Forward button:</strong> Use forward stack</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4" />
                  <span><strong>New page from back:</strong> Clear forward stack</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-3">Other Stack Applications</h4>
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="flex items-center space-x-3">
                  <Cpu className="w-5 h-5 text-blue-600" />
                  <span><strong>Memory Management:</strong> Stack memory for local variables</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-green-600" />
                  <span><strong>Syntax Parsing:</strong> Compilers use stacks for parsing code</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <span><strong>Backtracking:</strong> AI algorithms use stacks to backtrack</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Code className="w-5 h-5 text-orange-600" />
                  <span><strong>Depth-First Search:</strong> Graph traversal algorithms</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-200">
            <h4 className="font-semibold text-indigo-900 mb-4">Browser History Simulation</h4>
            
            <div className="space-y-4">
              <div className="text-sm text-indigo-800 mb-3">Navigation sequence:</div>
              
              <div className="space-y-3">
                <div className="bg-white p-3 rounded border">
                  <div className="font-bold text-gray-800">1. Visit google.com</div>
                  <div className="text-xs text-gray-600 mt-1">History: [google.com]</div>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <div className="font-bold text-gray-800">2. Click link → facebook.com</div>
                  <div className="text-xs text-gray-600 mt-1">History: [google.com, facebook.com]</div>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <div className="font-bold text-gray-800">3. Navigate to twitter.com</div>
                  <div className="text-xs text-gray-600 mt-1">History: [google.com, facebook.com, twitter.com]</div>
                </div>
                
                <div className="bg-yellow-100 p-3 rounded border">
                  <div className="font-bold text-yellow-800">4. Press Back button</div>
                  <div className="text-xs text-yellow-600 mt-1">
                    Pop twitter.com → Now at facebook.com<br/>
                    History: [google.com, facebook.com]<br/>
                    Forward: [twitter.com]
                  </div>
                </div>
                
                <div className="bg-blue-100 p-3 rounded border">
                  <div className="font-bold text-blue-800">5. Press Forward button</div>
                  <div className="text-xs text-blue-600 mt-1">
                    Back to twitter.com<br/>
                    History: [google.com, facebook.com, twitter.com]
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-white rounded border text-xs text-gray-600">
                <strong>Note:</strong> If you visit a new page while having forward history, 
                the forward stack gets cleared (you can't go forward to the old pages anymore).
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-200 mb-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Stack Applications Summary</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Key Applications:</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Function call management</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Expression evaluation (postfix, infix)</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Undo/Redo operations</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Browser history navigation</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Syntax checking & parsing</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Why Stacks Are Perfect:</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div>• <strong>LIFO nature</strong> matches natural undo/redo behavior</div>
              <div>• <strong>O(1) operations</strong> for push/pop make them efficient</div>
              <div>• <strong>Simple implementation</strong> with arrays or linked lists</div>
              <div>• <strong>Memory efficient</strong> for recursive function calls</div>
              <div>• <strong>Natural fit</strong> for nested structures (parentheses, HTML tags)</div>
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
          href="/learning-path/module-3/stack-operations"
          className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Previous: Stack Operations
        </Link>
        <Link
          href="/learning-path/module-3/queue-fundamentals"
          className="flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
        >
          Next: Queue Fundamentals
          <ChevronRight className="w-6 h-6 ml-2" />
        </Link>
      </motion.div>
    </EnhancedModuleLayout>
  );
}