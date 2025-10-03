'use client'

import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Code, 
  Layers as StackIcon, 
  ArrowRight, 
  ChevronRight,
  CheckCircle,
  Info,
  Play,
  Target,
  Database,
  BarChart3,
  Clock,
  Layers,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Search,
  Plus,
  Minus,
  Eye,
  Settings,
  Shuffle,
  Users,
  Cpu,
  FileText,
  ArrowLeftRight
} from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ProgressIndicator } from '@/components/progress/ProgressIndicator'
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton'
import { ModuleProgressIndicator } from '@/components/progress/ModuleProgressIndicator'
import { ModuleBookmarkButton } from '@/components/bookmarks/ModuleBookmarkButton'
import { SectionProgressIndicator } from '@/components/progress/SectionProgressIndicator'

const stackApplications = [
  {
    name: 'Function Call Management',
    description: 'Track function calls and return addresses in program execution',
    example: 'When function A calls B, A\'s context is pushed onto call stack',
    realWorld: 'Every programming language uses this mechanism',
    icon: Cpu,
    color: 'bg-blue-100 text-blue-800 border-blue-200'
  },
  {
    name: 'Expression Evaluation',
    description: 'Evaluate mathematical expressions and check balanced parentheses',
    example: 'Convert infix to postfix notation: (A+B)*C → AB+C*',
    realWorld: 'Calculators, compilers, mathematical software',
    icon: FileText,
    color: 'bg-green-100 text-green-800 border-green-200'
  },
  {
    name: 'Undo Operations',
    description: 'Store sequence of operations for reversal functionality',
    example: 'Text editor: type → push, undo → pop last operation',
    realWorld: 'Text editors, graphics software, browsers',
    icon: RotateCcw,
    color: 'bg-purple-100 text-purple-800 border-purple-200'
  },
  {
    name: 'Browser History',
    description: 'Navigate backward through visited pages',
    example: 'Each page visit pushes to stack, back button pops',
    realWorld: 'Web browsers, navigation systems',
    icon: ArrowLeftRight,
    color: 'bg-orange-100 text-orange-800 border-orange-200'
  }
]

const queueApplications = [
  {
    name: 'CPU Scheduling',
    description: 'Operating systems manage process execution order',
    example: 'Round-robin scheduling: each process gets equal CPU time',
    realWorld: 'Operating systems, multitasking environments',
    icon: Cpu,
    color: 'bg-red-100 text-red-800 border-red-200'
  },
  {
    name: 'Print Queue Management',
    description: 'Handle multiple print jobs in order received',
    example: 'First document sent to printer gets printed first',
    realWorld: 'Printer spoolers, document management systems',
    icon: FileText,
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200'
  },
  {
    name: 'Breadth-First Search',
    description: 'Explore graph nodes level by level using queue',
    example: 'Social network: find shortest path between users',
    realWorld: 'GPS navigation, social networks, game AI',
    icon: Search,
    color: 'bg-teal-100 text-teal-800 border-teal-200'
  },
  {
    name: 'Customer Service',
    description: 'Handle customer requests in arrival order',
    example: 'Call center: first caller in queue gets served first',
    realWorld: 'Call centers, ticketing systems, support queues',
    icon: Users,
    color: 'bg-indigo-100 text-indigo-800 border-indigo-200'
  }
]

const stackOperations = [
  {
    operation: 'Push',
    description: 'Add element to top of stack',
    timeComplexity: 'O(1)',
    pseudocode: [
      'if stack is full:',
      '    return overflow error',
      'increment top pointer',
      'stack[top] = new_element'
    ],
    icon: ArrowUp
  },
  {
    operation: 'Pop',
    description: 'Remove and return top element',
    timeComplexity: 'O(1)',
    pseudocode: [
      'if stack is empty:',
      '    return underflow error',
      'element = stack[top]',
      'decrement top pointer',
      'return element'
    ],
    icon: ArrowDown
  },
  {
    operation: 'Top/Peek',
    description: 'Return top element without removing',
    timeComplexity: 'O(1)',
    pseudocode: [
      'if stack is empty:',
      '    return error',
      'return stack[top]'
    ],
    icon: Eye
  },
  {
    operation: 'isEmpty',
    description: 'Check if stack has no elements',
    timeComplexity: 'O(1)',
    pseudocode: [
      'return top == -1'
    ],
    icon: Search
  }
]

const queueOperations = [
  {
    operation: 'Enqueue',
    description: 'Add element to rear of queue',
    timeComplexity: 'O(1)',
    pseudocode: [
      'if queue is full:',
      '    return overflow error',
      'increment rear pointer',
      'queue[rear] = new_element',
      'increment size'
    ],
    icon: ArrowRight
  },
  {
    operation: 'Dequeue',
    description: 'Remove and return front element',
    timeComplexity: 'O(1)',
    pseudocode: [
      'if queue is empty:',
      '    return underflow error',
      'element = queue[front]',
      'increment front pointer',
      'decrement size',
      'return element'
    ],
    icon: ArrowRight
  },
  {
    operation: 'Front/Peek',
    description: 'Return front element without removing',
    timeComplexity: 'O(1)',
    pseudocode: [
      'if queue is empty:',
      '    return error',
      'return queue[front]'
    ],
    icon: Eye
  },
  {
    operation: 'isEmpty',
    description: 'Check if queue has no elements',
    timeComplexity: 'O(1)',
    pseudocode: [
      'return size == 0'
    ],
    icon: Search
  }
]

const queueTypes = [
  {
    name: 'Simple Queue',
    description: 'Basic FIFO queue with front and rear pointers',
    characteristics: ['Linear arrangement', 'Fixed size (array)', 'FIFO principle'],
    limitations: ['Wasted space after dequeue operations', 'May appear full when space available'],
    useCase: 'Basic task scheduling, simple buffering'
  },
  {
    name: 'Circular Queue',
    description: 'Queue where rear connects back to front, forming circle',
    characteristics: ['Efficient space utilization', 'No wasted memory', 'Modular arithmetic'],
    limitations: ['Still fixed size', 'Complex full/empty detection'],
    useCase: 'Buffer management, round-robin scheduling'
  },
  {
    name: 'Priority Queue',
    description: 'Elements have priorities, highest priority served first',
    characteristics: ['Priority-based ordering', 'Not strictly FIFO', 'Heap implementation'],
    limitations: ['More complex operations', 'Higher time complexity for some operations'],
    useCase: 'Dijkstra\'s algorithm, process scheduling, A* search'
  },
  {
    name: 'Deque (Double-ended)',
    description: 'Insertion and deletion allowed at both ends',
    characteristics: ['Flexible operations', 'Combines stack and queue', 'Bidirectional access'],
    limitations: ['More complex implementation', 'Additional memory overhead'],
    useCase: 'Browser history, sliding window problems, palindrome checking'
  }
]

const implementationComparison = [
  {
    aspect: 'Memory Usage',
    array: 'Fixed size, may waste space',
    linkedList: 'Dynamic size, extra pointer storage',
    winner: 'linkedList'
  },
  {
    aspect: 'Access Time',
    array: 'O(1) direct access by index',
    linkedList: 'O(1) for top/front only',
    winner: 'array'
  },
  {
    aspect: 'Cache Performance',
    array: 'Excellent - contiguous memory',
    linkedList: 'Poor - scattered memory locations',
    winner: 'array'
  },
  {
    aspect: 'Memory Overhead',
    array: 'Minimal - just data storage',
    linkedList: 'Higher - additional pointers',
    winner: 'array'
  },
  {
    aspect: 'Dynamic Sizing',
    array: 'Fixed at creation time',
    linkedList: 'Grows/shrinks as needed',
    winner: 'linkedList'
  },
  {
    aspect: 'Implementation Complexity',
    array: 'Simple and straightforward',
    linkedList: 'More complex pointer management',
    winner: 'array'
  }
]

export default function StacksQueuesModule() {
  const [activeSection, setActiveSection] = useState('introduction')
  const [animationStep, setAnimationStep] = useState(0)
  const [selectedStructure, setSelectedStructure] = useState('stack')

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 4)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const sections = [
    { id: 'introduction', name: 'Introduction', icon: BookOpen },
    { id: 'stacks', name: 'Stacks (LIFO)', icon: StackIcon },
    { id: 'queues', name: 'Queues (FIFO)', icon: Shuffle },
    { id: 'types', name: 'Queue Types', icon: Layers },
    { id: 'implementation', name: 'Implementation', icon: Code }
  ]

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 flex">
      {/* Left Sidebar Navigation */}
      <motion.div 
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-80 bg-white/95 backdrop-blur-lg border-r border-gray-200 shadow-xl sticky top-0 h-screen overflow-y-auto"
      >
        <div className="p-6">
          <div className="mb-8">
            <div className="inline-flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-3">
              <StackIcon className="w-4 h-4 mr-2" />
              Module 5: Stacks & Queues
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Navigation</h2>
            <p className="text-gray-600 text-sm mt-1">Jump to any section</p>
          </div>

          <div className="space-y-2">
            {sections.map((section, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onClick={() => scrollToSection(section.id)}
                className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center group ${
                  activeSection === section.id
                    ? 'bg-purple-600 text-white shadow-lg scale-105'
                    : 'bg-gray-50 text-gray-700 hover:bg-purple-50 hover:text-purple-700 hover:scale-102'
                }`}
              >
                <section.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                <span className="text-sm leading-tight">{section.name}</span>
                {activeSection === section.id && (
                  <ChevronRight className="w-4 h-4 ml-auto" />
                )}
              </motion.button>
            ))}
          </div>

          <div className="mt-8 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Module Progress</h3>
            <ModuleProgressIndicator moduleId="stacks-queues" />
            <p className="text-xs text-gray-600 mt-2">
              Section {sections.findIndex(s => s.id === activeSection) + 1} of {sections.length}
            </p>
          </div>

          <div className="mt-6">
            <ModuleBookmarkButton
              moduleId="stacks-queues"
              moduleUrl="/learning-path/module-5"
            />
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Module Stats</h3>
            <div className="space-y-1 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Total Sections:</span>
                <span className="font-medium">{sections.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Time:</span>
                <span className="font-medium">50 minutes</span>
              </div>
              <div className="flex justify-between">
                <span>Difficulty:</span>
                <span className="font-medium text-orange-600">Intermediate</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 relative"
          >
            <div className="absolute top-0 right-0 flex items-center space-x-4">
              <ProgressIndicator 
                topicId="stacks-queues-module" 
                topicType="module"
                category="learning-path"
              />
              <BookmarkButton 
                topicId="stacks-queues-module"
                topicType="module"
                title="Stacks & Queues"
                category="learning-path"
                url="/learning-path/module-5"
              />
            </div>
            
            <div className="inline-flex items-center bg-purple-100 text-purple-800 px-6 py-3 rounded-full text-sm font-medium mb-8">
              <StackIcon className="w-5 h-5 mr-2" />
              Module 5: Linear Abstract Data Types
            </div>
            
            <h1 className="text-6xl font-bold text-gray-900 mb-8">
              Stacks & Queues
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                LIFO & FIFO Mastery
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Master the fundamental abstract data types that power function calls, task scheduling, 
              and countless algorithms. Learn LIFO and FIFO principles with real-world applications.
            </p>
          </motion.div>

          {/* Learning Objectives */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-20"
          >
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl p-8 text-white mb-12">
              <h2 className="text-3xl font-bold mb-6 text-center">What You'll Master</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                  <StackIcon className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">LIFO Principle</h3>
                  <p className="text-purple-100">Master Last-In-First-Out operations and stack applications</p>
                </div>
                <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                  <Shuffle className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">FIFO Principle</h3>
                  <p className="text-purple-100">Master First-In-First-Out operations and queue variations</p>
                </div>
                <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                  <Code className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Implementation</h3>
                  <p className="text-purple-100">Build efficient implementations using arrays and linked lists</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Dynamic Content Sections */}
          {activeSection === 'introduction' && (
            <motion.div
              id="introduction"
              key="introduction"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              {/* ADT Introduction */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                    <Database className="w-8 h-8 mr-3 text-purple-600" />
                    Abstract Data Types
                  </h2>
                  <SectionProgressIndicator 
                    moduleId="stacks-queues"
                    sectionId="introduction"
                  />
                </div>
                
                <div className="bg-purple-50 p-6 rounded-xl border border-purple-200 mb-8">
                  <p className="text-lg text-purple-900 leading-relaxed mb-4">
                    <strong>Stacks</strong> and <strong>Queues</strong> are fundamental Abstract Data Types (ADTs) 
                    that provide restricted access to their elements. They define <em>what</em> operations 
                    can be performed, not <em>how</em> they are implemented.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-white p-4 rounded-lg border border-purple-200">
                      <h4 className="font-semibold text-purple-900 mb-2">Stack (LIFO)</h4>
                      <p className="text-purple-800 text-sm mb-3">Last In, First Out - like a stack of plates</p>
                      <ul className="text-purple-700 text-sm space-y-1">
                        <li>• Push: Add to top</li>
                        <li>• Pop: Remove from top</li>
                        <li>• Peek: View top element</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-purple-200">
                      <h4 className="font-semibold text-purple-900 mb-2">Queue (FIFO)</h4>
                      <p className="text-purple-800 text-sm mb-3">First In, First Out - like a waiting line</p>
                      <ul className="text-purple-700 text-sm space-y-1">
                        <li>• Enqueue: Add to rear</li>
                        <li>• Dequeue: Remove from front</li>
                        <li>• Front: View front element</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Visual Comparison */}
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                    <h3 className="text-xl font-semibold text-blue-900 mb-6 flex items-center">
                      <StackIcon className="w-6 h-6 mr-2" />
                      Stack Visualization
                    </h3>
                    <div className="space-y-2">
                      <div className="text-center mb-4">
                        <div className="inline-block bg-blue-500 text-white px-3 py-1 rounded text-sm font-bold">
                          ← Push | Pop →
                        </div>
                      </div>
                      {['Top: 30', 'Middle: 20', 'Bottom: 10'].map((item, idx) => (
                        <div key={idx} className={`p-3 rounded border-2 text-center font-semibold ${
                          idx === 0 ? 'bg-blue-500 text-white border-blue-600' : 
                          'bg-blue-100 text-blue-800 border-blue-300'
                        }`}>
                          {item}
                        </div>
                      ))}
                      <div className="text-center text-blue-700 text-sm mt-4">
                        Access only from TOP
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                    <h3 className="text-xl font-semibold text-green-900 mb-6 flex items-center">
                      <ArrowRight className="w-6 h-6 mr-2" />
                      Queue Visualization
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm font-bold">
                        <span className="text-green-700">Front</span>
                        <span className="text-green-700">Rear</span>
                      </div>
                      <div className="flex space-x-2">
                        {['10', '20', '30'].map((item, idx) => (
                          <div key={idx} className={`flex-1 p-3 rounded text-center font-semibold ${
                            idx === 0 ? 'bg-green-500 text-white border-2 border-green-600' :
                            idx === 2 ? 'bg-green-400 text-white border-2 border-green-500' :
                            'bg-green-200 text-green-800 border-2 border-green-300'
                          }`}>
                            {item}
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between text-xs text-green-700">
                        <span>← Dequeue</span>
                        <span>Enqueue →</span>
                      </div>
                      <div className="text-center text-green-700 text-sm">
                        Front for removal, Rear for insertion
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Important */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <Target className="w-8 h-8 mr-3 text-orange-600" />
                  Why Are They Important?
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Programming Fundamentals</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Function Calls</h4>
                          <p className="text-gray-600 text-sm">Every program uses call stack for function execution</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Memory Management</h4>
                          <p className="text-gray-600 text-sm">Stack and heap allocation strategies</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Algorithm Building Blocks</h4>
                          <p className="text-gray-600 text-sm">Essential for DFS, BFS, and expression evaluation</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">System Applications</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-blue-500 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Operating Systems</h4>
                          <p className="text-gray-600 text-sm">Process scheduling and resource management</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-blue-500 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">User Interface</h4>
                          <p className="text-gray-600 text-sm">Undo/redo functionality and navigation</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-blue-500 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Network Programming</h4>
                          <p className="text-gray-600 text-sm">Buffer management and request queuing</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'stacks' && (
            <motion.div
              key="stacks"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              {/* Stack Operations */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                  <StackIcon className="w-8 h-8 mr-3 text-blue-600" />
                  Stack Operations (LIFO)
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {stackOperations.map((op, index) => {
                    const IconComponent = op.icon
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200"
                      >
                        <div className="flex items-center mb-4">
                          <IconComponent className="w-8 h-8 text-blue-600 mr-3" />
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{op.operation}</h3>
                            <div className="text-sm font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {op.timeComplexity}
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-4">{op.description}</p>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Pseudocode:</h4>
                          <div className="bg-gray-800 text-green-400 p-3 rounded font-mono text-sm">
                            {op.pseudocode.map((line, lineIndex) => (
                              <div key={lineIndex}>{line}</div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Stack Applications */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                  <Play className="w-8 h-8 mr-3 text-green-600" />
                  Real-World Stack Applications
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {stackApplications.map((app, index) => {
                    const IconComponent = app.icon
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        className={`border-2 rounded-xl p-6 ${app.color}`}
                      >
                        <div className="flex items-center mb-4">
                          <IconComponent className="w-8 h-8 mr-3" />
                          <h3 className="text-xl font-bold">{app.name}</h3>
                        </div>
                        
                        <p className="mb-4 leading-relaxed">{app.description}</p>
                        
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-semibold">Example:</h4>
                            <p className="text-sm">{app.example}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold">Real World:</h4>
                            <p className="text-sm">{app.realWorld}</p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Interactive Stack Demo */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <Eye className="w-8 h-8 mr-3 text-purple-600" />
                  Expression Evaluation Example
                </h2>
                
                <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                  <h3 className="text-xl font-semibold text-purple-900 mb-4">
                    Balanced Parentheses Check: "((()))"
                  </h3>
                  
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-purple-900 mb-3">Algorithm Steps:</h4>
                      <ol className="space-y-2 text-purple-800">
                        <li className="flex items-start">
                          <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                          <span className="text-sm">Initialize empty stack</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                          <span className="text-sm">For each character in expression:</span>
                        </li>
                        <li className="flex items-start ml-8">
                          <span className="w-6 h-6 bg-purple-400 text-white rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">a</span>
                          <span className="text-sm">If opening bracket: push to stack</span>
                        </li>
                        <li className="flex items-start ml-8">
                          <span className="w-6 h-6 bg-purple-400 text-white rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">b</span>
                          <span className="text-sm">If closing bracket: pop from stack</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                          <span className="text-sm">If stack is empty at end: balanced</span>
                        </li>
                      </ol>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-purple-900 mb-3">Trace Example:</h4>
                      <div className="space-y-3 font-mono text-sm">
                        <div className="bg-white p-2 rounded border">
                          <span className="text-purple-600">Input:</span> ( → <span className="text-green-600">Push '(' → Stack: ['(']</span>
                        </div>
                        <div className="bg-white p-2 rounded border">
                          <span className="text-purple-600">Input:</span> ( → <span className="text-green-600">Push '(' → Stack: ['(', '(']</span>
                        </div>
                        <div className="bg-white p-2 rounded border">
                          <span className="text-purple-600">Input:</span> ( → <span className="text-green-600">Push '(' → Stack: ['(', '(', '(']</span>
                        </div>
                        <div className="bg-white p-2 rounded border">
                          <span className="text-purple-600">Input:</span> ) → <span className="text-orange-600">Pop '(' → Stack: ['(', '(']</span>
                        </div>
                        <div className="bg-white p-2 rounded border">
                          <span className="text-purple-600">Input:</span> ) → <span className="text-orange-600">Pop '(' → Stack: ['(']</span>
                        </div>
                        <div className="bg-white p-2 rounded border">
                          <span className="text-purple-600">Input:</span> ) → <span className="text-orange-600">Pop '(' → Stack: []</span>
                        </div>
                        <div className="bg-green-100 p-2 rounded border border-green-300">
                          <span className="text-green-800 font-semibold">Result: BALANCED ✓</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'queues' && (
            <motion.div
              key="queues"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              {/* Queue Operations */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                  <Shuffle className="w-8 h-8 mr-3 text-green-600" />
                  Queue Operations (FIFO)
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {queueOperations.map((op, index) => {
                    const IconComponent = op.icon
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl border border-green-200"
                      >
                        <div className="flex items-center mb-4">
                          <IconComponent className="w-8 h-8 text-green-600 mr-3" />
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{op.operation}</h3>
                            <div className="text-sm font-mono bg-green-100 text-green-800 px-2 py-1 rounded">
                              {op.timeComplexity}
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-4">{op.description}</p>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Pseudocode:</h4>
                          <div className="bg-gray-800 text-green-400 p-3 rounded font-mono text-sm">
                            {op.pseudocode.map((line, lineIndex) => (
                              <div key={lineIndex}>{line}</div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Queue Applications */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                  <Users className="w-8 h-8 mr-3 text-orange-600" />
                  Real-World Queue Applications
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {queueApplications.map((app, index) => {
                    const IconComponent = app.icon
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        className={`border-2 rounded-xl p-6 ${app.color}`}
                      >
                        <div className="flex items-center mb-4">
                          <IconComponent className="w-8 h-8 mr-3" />
                          <h3 className="text-xl font-bold">{app.name}</h3>
                        </div>
                        
                        <p className="mb-4 leading-relaxed">{app.description}</p>
                        
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-semibold">Example:</h4>
                            <p className="text-sm">{app.example}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold">Real World:</h4>
                            <p className="text-sm">{app.realWorld}</p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'types' && (
            <motion.div
              key="types"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              {/* Queue Types */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                  <Layers className="w-8 h-8 mr-3 text-indigo-600" />
                  Types of Queues
                </h2>
                
                <div className="space-y-8">
                  {queueTypes.map((type, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="grid lg:grid-cols-3 gap-6">
                        <div>
                          <h3 className="text-2xl font-bold text-indigo-900 mb-3">{type.name}</h3>
                          <p className="text-gray-700 mb-4">{type.description}</p>
                          <div className="text-sm text-indigo-700 font-medium">{type.useCase}</div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-green-900 mb-3">Characteristics:</h4>
                          <ul className="space-y-2">
                            {type.characteristics.map((char, charIndex) => (
                              <li key={charIndex} className="flex items-center text-sm text-green-700">
                                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                {char}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-red-900 mb-3">Limitations:</h4>
                          <ul className="space-y-2">
                            {type.limitations.map((lim, limIndex) => (
                              <li key={limIndex} className="flex items-center text-sm text-red-700">
                                <Info className="w-4 h-4 mr-2 text-red-500" />
                                {lim}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'implementation' && (
            <motion.div
              key="implementation"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              {/* Implementation Comparison */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                  <Code className="w-8 h-8 mr-3 text-blue-600" />
                  Implementation Comparison
                </h2>
                
                <div className="overflow-x-auto mb-8">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-blue-100">
                        <th className="border border-blue-300 px-4 py-3 font-semibold text-blue-600">Aspect</th>
                        <th className="border border-blue-300 px-4 py-3 font-semibold text-blue-600">Array Implementation</th>
                        <th className="border border-blue-300 px-4 py-3 font-semibold text-blue-600">Linked List Implementation</th>
                        <th className="border border-blue-300 px-4 py-3 font-semibold text-blue-600">Better Choice</th>
                      </tr>
                    </thead>
                    <tbody>
                      {implementationComparison.map((comp, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                          <td className="border border-blue-300 px-4 py-3 text-blue-600 font-medium">{comp.aspect}</td>
                          <td className="border border-blue-300 px-4 py-3 text-gray-700">{comp.array}</td>
                          <td className="border border-blue-300 px-4 py-3 text-gray-700">{comp.linkedList}</td>
                          <td className="border border-blue-300 px-4 py-3">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              comp.winner === 'array' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {comp.winner === 'array' ? 'Array' : 'Linked List'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">Implementation Guidelines</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">Choose Array When:</h4>
                      <ul className="space-y-1 text-blue-800 text-sm">
                        <li>• Known maximum size</li>
                        <li>• Performance is critical</li>
                        <li>• Memory usage is important</li>
                        <li>• Simple implementation preferred</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">Choose Linked List When:</h4>
                      <ul className="space-y-1 text-blue-800 text-sm">
                        <li>• Unknown or variable size</li>
                        <li>• Frequent size changes</li>
                        <li>• Memory efficiency priority</li>
                        <li>• No size limitations needed</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Time Complexity Summary */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <BarChart3 className="w-8 h-8 mr-3 text-green-600" />
                  Time Complexity Summary
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">Stack Operations</h3>
                    <div className="space-y-3">
                      {[
                        { op: 'Push', complexity: 'O(1)', desc: 'Add to top' },
                        { op: 'Pop', complexity: 'O(1)', desc: 'Remove from top' },
                        { op: 'Peek/Top', complexity: 'O(1)', desc: 'View top element' },
                        { op: 'isEmpty', complexity: 'O(1)', desc: 'Check if empty' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-white rounded border">
                          <div>
                            <div className="font-medium text-gray-900">{item.op}</div>
                            <div className="text-sm text-gray-600">{item.desc}</div>
                          </div>
                          <div className="font-mono text-green-600 font-bold">{item.complexity}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                    <h3 className="text-xl font-semibold text-green-900 mb-4">Queue Operations</h3>
                    <div className="space-y-3">
                      {[
                        { op: 'Enqueue', complexity: 'O(1)', desc: 'Add to rear' },
                        { op: 'Dequeue', complexity: 'O(1)', desc: 'Remove from front' },
                        { op: 'Front/Peek', complexity: 'O(1)', desc: 'View front element' },
                        { op: 'isEmpty', complexity: 'O(1)', desc: 'Check if empty' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-white rounded border">
                          <div>
                            <div className="font-medium text-gray-900">{item.op}</div>
                            <div className="text-sm text-gray-600">{item.desc}</div>
                          </div>
                          <div className="font-mono text-green-600 font-bold">{item.complexity}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-sm text-gray-600">
                  <p><strong>Space Complexity:</strong> O(n) where n is the number of elements</p>
                  <p><strong>Note:</strong> All operations are constant time when implemented properly</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex justify-between items-center mt-16 pt-8 border-t border-gray-200"
          >
            <Link 
              href="/learning-path/module-4"
              className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 mr-2 rotate-180" />
              Previous: Module 4 - Linked Lists
            </Link>
            
            <Link 
              href="/learning-path/module-6"
              className="flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              Next: Module 6 - Trees & Hierarchies
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}