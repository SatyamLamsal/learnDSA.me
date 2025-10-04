'use client'

import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Code, 
  Link as LinkIcon, 
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
  ArrowUpDown,
  RotateCcw,
  Search,
  Plus,
  Minus,
  Eye,
  Settings
} from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ProgressIndicator } from '@/components/progress/ProgressIndicator'
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton'
import { ModuleProgressIndicator } from '@/components/progress/ModuleProgressIndicator'
import { ModuleBookmarkButton } from '@/components/bookmarks/ModuleBookmarkButton'
import { SectionProgressIndicator } from '@/components/progress/SectionProgressIndicator'

const linkedListTypes = [
  {
    name: 'Singly Linked List',
    description: 'Each node contains data and a pointer to the next node',
    structure: ['Data', '→ Next'],
    advantages: ['Dynamic size', 'Memory efficient', 'Easy insertion/deletion'],
    disadvantages: ['No backward traversal', 'Extra memory for pointers'],
    useCase: 'Implementation of stacks, queues, and simple lists',
    color: 'bg-blue-100 text-blue-800 border-blue-200'
  },
  {
    name: 'Doubly Linked List',
    description: 'Each node has pointers to both next and previous nodes',
    structure: ['← Prev', 'Data', 'Next →'],
    advantages: ['Bidirectional traversal', 'Easy deletion', 'Navigation flexibility'],
    disadvantages: ['Extra memory overhead', 'More complex operations'],
    useCase: 'Browser history, music playlists, undo functionality',
    color: 'bg-green-100 text-green-800 border-green-200'
  },
  {
    name: 'Circular Linked List',
    description: 'Last node points back to the first node, forming a circle',
    structure: ['Node1 → Node2 → ... → NodeN ↺'],
    advantages: ['Efficient round-robin scheduling', 'No NULL pointers', 'Continuous traversal'],
    disadvantages: ['Infinite loop risk', 'Complex termination conditions'],
    useCase: 'Round-robin CPU scheduling, multiplayer games',
    color: 'bg-purple-100 text-purple-800 border-purple-200'
  }
]

const linkedListOperations = [
  {
    operation: 'Traversal',
    timeComplexity: 'O(n)',
    description: 'Visit each node from head to tail',
    steps: ['Start at head', 'Visit current node', 'Move to next node', 'Repeat until NULL'],
    icon: Eye
  },
  {
    operation: 'Insertion',
    timeComplexity: 'O(1) or O(n)',
    description: 'Add new node at beginning, end, or specific position',
    steps: ['Create new node', 'Set data', 'Update pointers', 'Handle edge cases'],
    icon: Plus
  },
  {
    operation: 'Deletion',
    timeComplexity: 'O(1) or O(n)',
    description: 'Remove node from beginning, end, or specific position',
    steps: ['Find target node', 'Update previous pointers', 'Free memory', 'Handle edge cases'],
    icon: Minus
  },
  {
    operation: 'Search',
    timeComplexity: 'O(n)',
    description: 'Find node with specific value',
    steps: ['Start at head', 'Compare data', 'Move to next', 'Return position or NULL'],
    icon: Search
  }
]

const pointerConcepts = [
  {
    concept: 'Memory Address',
    description: 'Location in memory where data is stored',
    example: 'int *ptr = &variable; // ptr holds address of variable',
    importance: 'Foundation of dynamic data structures'
  },
  {
    concept: 'Dereferencing',
    description: 'Accessing the value stored at the memory address',
    example: '*ptr = 10; // Sets value at address to 10',
    importance: 'Essential for reading/writing data through pointers'
  },
  {
    concept: 'NULL Pointer',
    description: 'Special pointer value indicating no valid memory address',
    example: 'Node *head = NULL; // Empty list',
    importance: 'Prevents undefined behavior and marks list boundaries'
  },
  {
    concept: 'Dynamic Allocation',
    description: 'Allocating memory during program execution',
    example: 'Node *newNode = malloc(sizeof(Node));',
    importance: 'Enables flexible, runtime-sized data structures'
  }
]

const commonProblems = [
  {
    problem: "Floyd's Cycle Detection",
    description: 'Detect if a cycle exists in a linked list using two pointers',
    algorithm: 'Tortoise and Hare Algorithm',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    steps: [
      'Initialize slow and fast pointers at head',
      'Move slow pointer one step, fast pointer two steps',
      'If they meet, cycle exists',
      'If fast reaches NULL, no cycle'
    ],
    applications: ['Memory leak detection', 'Infinite loop prevention']
  },
  {
    problem: 'Reverse Linked List',
    description: 'Reverse the direction of pointers in a linked list',
    algorithm: 'Three-pointer technique',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    steps: [
      'Initialize prev=NULL, curr=head, next=NULL',
      'While curr is not NULL',
      'Store next node, reverse current link',
      'Move pointers forward'
    ],
    applications: ['Undo operations', 'String reversal', 'Path backtracking']
  },
  {
    problem: 'Merge Two Sorted Lists',
    description: 'Combine two sorted linked lists into one sorted list',
    algorithm: 'Two-pointer merge technique',
    timeComplexity: 'O(m + n)',
    spaceComplexity: 'O(1)',
    steps: [
      'Create dummy head node',
      'Compare values from both lists',
      'Link smaller value to result',
      'Advance pointer of chosen list'
    ],
    applications: ['Database joins', 'File merging', 'Priority queues']
  }
]

export default function LinkedListsModule() {
  const [activeSection, setActiveSection] = useState('introduction')
  const [animationStep, setAnimationStep] = useState(0)
  const [selectedListType, setSelectedListType] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 4)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const sections = [
    { id: 'introduction', name: 'Introduction', icon: BookOpen },
    { id: 'types', name: 'Types of Lists', icon: Layers },
    { id: 'operations', name: 'Operations', icon: Settings },
    { id: 'pointers', name: 'Pointer Concepts', icon: Target },
    { id: 'problems', name: 'Common Problems', icon: Code }
  ]

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-teal-50 flex">
      {/* Left Sidebar Navigation */}
      <motion.div 
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-80 bg-white/95 backdrop-blur-lg border-r border-gray-200 shadow-xl sticky top-0 h-screen overflow-y-auto"
      >
        <div className="p-6">
          <div className="mb-8">
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-3">
              <LinkIcon className="w-4 h-4 mr-2" />
              Module 4: Linked Lists
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
                    ? 'bg-green-600 text-white shadow-lg scale-105'
                    : 'bg-gray-50 text-gray-700 hover:bg-green-50 hover:text-green-700 hover:scale-102'
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

          <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border border-green-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Module Progress</h3>
            <ModuleProgressIndicator moduleId="linked-lists" />
            <p className="text-xs text-gray-600 mt-2">
              Section {sections.findIndex(s => s.id === activeSection) + 1} of {sections.length}
            </p>
          </div>

          <div className="mt-6">
            <ModuleBookmarkButton
              moduleId="linked-lists"
              moduleUrl="/learning-path/module-4"
            />
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Module Stats</h3>
            <div className="space-y-1 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Total Sections:</span>
                <span className="font-medium">{sections.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Time:</span>
                <span className="font-medium">60 minutes</span>
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
                topicId="linked-lists-module" 
                topicType="module"
                category="learning-path"
              />
              <BookmarkButton 
                topicId="linked-lists-module"
                topicType="module"
                title="Linked Lists & Pointers"
                category="learning-path"
                url="/learning-path/module-4"
              />
            </div>
            
            <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full text-sm font-medium mb-8">
              <LinkIcon className="w-5 h-5 mr-2" />
              Module 4: Dynamic Data Structures
            </div>
            
            <h1 className="text-6xl font-bold text-gray-900 mb-8">
              Linked Lists &
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600">
                Pointer Mastery
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Master dynamic data structures with linked lists and pointer manipulation. 
              Learn how to build flexible, memory-efficient data structures that grow and shrink at runtime.
            </p>
          </motion.div>

          {/* Learning Objectives */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-20"
          >
            <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-3xl p-8 text-white mb-12">
              <h2 className="text-3xl font-bold mb-6 text-center">What You&apos;ll Master</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                  <LinkIcon className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Dynamic Structures</h3>
                  <p className="text-green-100">Build flexible data structures that adapt to runtime requirements</p>
                </div>
                <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                  <Target className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Pointer Mastery</h3>
                  <p className="text-green-100">Master memory addresses, references, and dynamic allocation</p>
                </div>
                <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                  <Code className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Problem Solving</h3>
                  <p className="text-green-100">Solve classic problems like cycle detection and list reversal</p>
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
              {/* What is a Linked List */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                    <LinkIcon className="w-8 h-8 mr-3 text-green-600" />
                    What is a Linked List?
                  </h2>
                  <SectionProgressIndicator 
                    moduleId="linked-lists"
                    sectionId="introduction"
                  />
                </div>
                
                <div className="bg-green-50 p-6 rounded-xl border border-green-200 mb-8">
                  <p className="text-lg text-green-900 leading-relaxed">
                    A <strong>linked list</strong> is a linear data structure where elements (nodes) are stored 
                    in sequence, but unlike arrays, they are not stored in contiguous memory locations. 
                    Each node contains data and a reference (or pointer) to the next node in the sequence.
                  </p>
                </div>

                {/* Visual Comparison */}
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                    <h3 className="text-xl font-semibold text-red-900 mb-4">Arrays (Static)</h3>
                    <div className="space-y-4">
                      <div className="flex justify-center space-x-1">
                        {[10, 20, 30, 40, 50].map((val, idx) => (
                          <div key={idx} className="w-12 h-12 bg-red-500 text-white rounded flex items-center justify-center text-sm font-bold">
                            {val}
                          </div>
                        ))}
                      </div>
                      <div className="text-center text-red-700 text-sm">Contiguous Memory</div>
                      <ul className="space-y-1 text-red-800 text-sm">
                        <li>• Fixed size at compile time</li>
                        <li>• Elements in adjacent memory</li>
                        <li>• O(1) random access</li>
                        <li>• Memory waste if not full</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                    <h3 className="text-xl font-semibold text-green-900 mb-4">Linked Lists (Dynamic)</h3>
                    <div className="space-y-4">
                      <div className="flex justify-center items-center space-x-2">
                        {[10, 20, 30].map((val, idx) => (
                          <div key={idx} className="flex items-center">
                            <div className="w-12 h-12 bg-green-500 text-white rounded flex items-center justify-center text-sm font-bold">
                              {val}
                            </div>
                            {idx < 2 && <ArrowRight className="w-4 h-4 text-green-600" />}
                          </div>
                        ))}
                      </div>
                      <div className="text-center text-green-700 text-sm">Non-contiguous Memory</div>
                      <ul className="space-y-1 text-green-800 text-sm">
                        <li>• Dynamic size at runtime</li>
                        <li>• Elements anywhere in memory</li>
                        <li>• O(n) sequential access</li>
                        <li>• Memory efficient allocation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Use Linked Lists */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <Database className="w-8 h-8 mr-3 text-blue-600" />
                  Why Use Linked Lists?
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-green-900 mb-4">Advantages</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Dynamic Size</h4>
                          <p className="text-gray-600 text-sm">Size can be changed during execution</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Memory Efficiency</h4>
                          <p className="text-gray-600 text-sm">Only allocates memory when needed</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Easy Insertion/Deletion</h4>
                          <p className="text-gray-600 text-sm">O(1) at beginning, no shifting required</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-red-900 mb-4">Disadvantages</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Info className="w-6 h-6 text-red-500 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">No Random Access</h4>
                          <p className="text-gray-600 text-sm">Must traverse from head to reach element</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Info className="w-6 h-6 text-red-500 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Extra Memory</h4>
                          <p className="text-gray-600 text-sm">Additional storage for pointer/reference</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Info className="w-6 h-6 text-red-500 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Cache Performance</h4>
                          <p className="text-gray-600 text-sm">Poor cache locality due to non-contiguous memory</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Applications */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <Play className="w-8 h-8 mr-3 text-purple-600" />
                  Real-World Applications
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      title: 'Music Playlists',
                      description: 'Navigate forward/backward through songs',
                      icon: '🎵',
                      details: 'Doubly linked lists for easy navigation'
                    },
                    {
                      title: 'Browser History',
                      description: 'Back and forward button functionality',
                      icon: '🌐',
                      details: 'Stack-like operations with linked lists'
                    },
                    {
                      title: 'Undo Operations',
                      description: 'Text editors and graphics software',
                      icon: '↺',
                      details: 'Maintain history of operations'
                    },
                    {
                      title: 'Memory Management',
                      description: 'Operating system memory allocation',
                      icon: '💾',
                      details: 'Track free and allocated blocks'
                    },
                    {
                      title: 'Implementation Base',
                      description: 'Foundation for stacks and queues',
                      icon: '📚',
                      details: 'Building blocks for other structures'
                    },
                    {
                      title: 'Sparse Matrices',
                      description: 'Store only non-zero elements',
                      icon: '🔢',
                      details: 'Memory efficient matrix representation'
                    }
                  ].map((app, index) => (
                    <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                      <div className="text-4xl mb-3">{app.icon}</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{app.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{app.description}</p>
                      <p className="text-purple-700 text-xs font-medium">{app.details}</p>
                    </div>
                  ))}
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
              {/* Types Overview */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                  <Layers className="w-8 h-8 mr-3 text-indigo-600" />
                  Types of Linked Lists
                </h2>
                
                <div className="grid gap-8">
                  {linkedListTypes.map((type, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      className={`border-2 rounded-xl p-6 ${type.color} cursor-pointer transition-all duration-300 hover:shadow-lg`}
                      onClick={() => setSelectedListType(index)}
                    >
                      <div className="grid lg:grid-cols-3 gap-6">
                        <div>
                          <h3 className="text-2xl font-bold mb-3">{type.name}</h3>
                          <p className="mb-4 leading-relaxed">{type.description}</p>
                          
                          <div className="mb-4">
                            <h4 className="font-semibold mb-2">Structure:</h4>
                            <div className="flex flex-wrap gap-2">
                              {type.structure.map((part, partIndex) => (
                                <span key={partIndex} className="px-3 py-1 bg-white rounded-full text-sm font-medium">
                                  {part}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <h4 className="font-semibold mb-2">Use Case:</h4>
                            <p className="text-sm">{type.useCase}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-3 text-green-800">Advantages:</h4>
                          <ul className="space-y-2">
                            {type.advantages.map((adv, advIndex) => (
                              <li key={advIndex} className="flex items-center text-sm">
                                <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                                {adv}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-3 text-red-800">Disadvantages:</h4>
                          <ul className="space-y-2">
                            {type.disadvantages.map((dis, disIndex) => (
                              <li key={disIndex} className="flex items-center text-sm">
                                <Info className="w-4 h-4 mr-2 text-red-600" />
                                {dis}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Visual Representations */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                  <Eye className="w-8 h-8 mr-3 text-teal-600" />
                  Visual Representations
                </h2>
                
                <div className="space-y-12">
                  {/* Singly Linked List */}
                  <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                    <h3 className="text-xl font-semibold text-blue-900 mb-6">Singly Linked List</h3>
                    <div className="flex items-center justify-center space-x-4 mb-4">
                      <div className="text-sm text-blue-700">HEAD</div>
                      <ArrowRight className="w-4 h-4 text-blue-600" />
                      {['Node1', 'Node2', 'Node3'].map((node, idx) => (
                        <div key={idx} className="flex items-center">
                          <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md border-2 border-blue-600">
                            <div className="text-sm font-semibold">{node}</div>
                            <div className="text-xs">Data | Next</div>
                          </div>
                          {idx < 2 && <ArrowRight className="w-6 h-6 text-blue-600 mx-2" />}
                        </div>
                      ))}
                      <ArrowRight className="w-6 h-6 text-blue-600 mx-2" />
                      <div className="text-sm text-blue-700">NULL</div>
                    </div>
                    <div className="text-center text-blue-700 text-sm">
                      Each node contains data and pointer to next node
                    </div>
                  </div>

                  {/* Doubly Linked List */}
                  <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                    <h3 className="text-xl font-semibold text-green-900 mb-6">Doubly Linked List</h3>
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <div className="text-sm text-green-700">HEAD</div>
                      <ArrowRight className="w-4 h-4 text-green-600" />
                      {['Node1', 'Node2', 'Node3'].map((node, idx) => (
                        <div key={idx} className="flex items-center">
                          <div className="bg-green-500 text-white p-3 rounded-lg shadow-md border-2 border-green-600">
                            <div className="text-xs font-semibold">{node}</div>
                            <div className="text-xs">Prev|Data|Next</div>
                          </div>
                          {idx < 2 && (
                            <div className="flex flex-col items-center mx-1">
                              <ArrowRight className="w-4 h-4 text-green-600" />
                              <ArrowRight className="w-4 h-4 text-green-600 rotate-180" />
                            </div>
                          )}
                        </div>
                      ))}
                      <ArrowRight className="w-4 h-4 text-green-600 mx-1" />
                      <div className="text-sm text-green-700">NULL</div>
                    </div>
                    <div className="text-center text-green-700 text-sm">
                      Each node has pointers to both previous and next nodes
                    </div>
                  </div>

                  {/* Circular Linked List */}
                  <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                    <h3 className="text-xl font-semibold text-purple-900 mb-6">Circular Linked List</h3>
                    <div className="flex items-center justify-center mb-4">
                      <div className="relative">
                        <div className="flex items-center space-x-4">
                          {['Node1', 'Node2', 'Node3', 'Node4'].map((node, idx) => (
                            <div key={idx} className="flex items-center">
                              <div className="bg-purple-500 text-white p-3 rounded-lg shadow-md border-2 border-purple-600">
                                <div className="text-xs font-semibold">{node}</div>
                                <div className="text-xs">Data | Next</div>
                              </div>
                              {idx < 3 && <ArrowRight className="w-4 h-4 text-purple-600 mx-2" />}
                            </div>
                          ))}
                        </div>
                        {/* Circular arrow */}
                        <div className="absolute top-12 left-0 right-0 flex justify-center">
                          <ArrowRight className="w-6 h-6 text-purple-600 rotate-180" />
                          <div className="flex-1 border-t-2 border-purple-600 mt-3"></div>
                          <ArrowRight className="w-6 h-6 text-purple-600 rotate-180" />
                        </div>
                      </div>
                    </div>
                    <div className="text-center text-purple-700 text-sm">
                      Last node points back to the first node, forming a circle
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'operations' && (
            <motion.div
              key="operations"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              {/* Operations Overview */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                  <Settings className="w-8 h-8 mr-3 text-orange-600" />
                  Linked List Operations
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {linkedListOperations.map((op, index) => {
                    const IconComponent = op.icon
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200"
                      >
                        <div className="flex items-center mb-4">
                          <IconComponent className="w-8 h-8 text-orange-600 mr-3" />
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{op.operation}</h3>
                            <div className="text-sm font-mono bg-orange-100 text-orange-800 px-2 py-1 rounded">
                              {op.timeComplexity}
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-4">{op.description}</p>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Steps:</h4>
                          <ol className="space-y-1">
                            {op.steps.map((step, stepIndex) => (
                              <li key={stepIndex} className="text-sm text-gray-600 flex items-center">
                                <span className="w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs mr-2">
                                  {stepIndex + 1}
                                </span>
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Time Complexity Table */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <BarChart3 className="w-8 h-8 mr-3 text-blue-600" />
                  Time Complexity Analysis
                </h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-blue-100">
                        <th className="border border-blue-300 px-4 py-3 font-semibold text-blue-600">Operation</th>
                        <th className="border border-blue-300 px-4 py-3 font-semibold text-blue-600">Singly Linked</th>
                        <th className="border border-blue-300 px-4 py-3 font-semibold text-blue-600">Doubly Linked</th>
                        <th className="border border-blue-300 px-4 py-3 font-semibold text-blue-600">Circular Linked</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-blue-300 px-4 py-3 text-blue-600 font-medium">Access (by index)</td>
                        <td className="border border-blue-300 px-4 py-3 text-red-600 font-mono">O(n)</td>
                        <td className="border border-blue-300 px-4 py-3 text-red-600 font-mono">O(n)</td>
                        <td className="border border-blue-300 px-4 py-3 text-red-600 font-mono">O(n)</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-blue-300 px-4 py-3 text-blue-600 font-medium">Search</td>
                        <td className="border border-blue-300 px-4 py-3 text-red-600 font-mono">O(n)</td>
                        <td className="border border-blue-300 px-4 py-3 text-red-600 font-mono">O(n)</td>
                        <td className="border border-blue-300 px-4 py-3 text-red-600 font-mono">O(n)</td>
                      </tr>
                      <tr>
                        <td className="border border-blue-300 px-4 py-3 text-blue-600 font-medium">Insert at beginning</td>
                        <td className="border border-blue-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                        <td className="border border-blue-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                        <td className="border border-blue-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-blue-300 px-4 py-3 text-blue-600 font-medium">Insert at end</td>
                        <td className="border border-blue-300 px-4 py-3 text-red-600 font-mono">O(n)</td>
                        <td className="border border-blue-300 px-4 py-3 text-green-600 font-mono">O(1)*</td>
                        <td className="border border-blue-300 px-4 py-3 text-green-600 font-mono">O(1)*</td>
                      </tr>
                      <tr>
                        <td className="border border-blue-300 px-4 py-3 text-blue-600 font-medium">Delete from beginning</td>
                        <td className="border border-blue-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                        <td className="border border-blue-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                        <td className="border border-blue-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-blue-300 px-4 py-3 text-blue-600 font-medium">Delete from end</td>
                        <td className="border border-blue-300 px-4 py-3 text-red-600 font-mono">O(n)</td>
                        <td className="border border-blue-300 px-4 py-3 text-green-600 font-mono">O(1)*</td>
                        <td className="border border-blue-300 px-4 py-3 text-green-600 font-mono">O(1)*</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <p><strong>*</strong> Assumes we maintain a tail pointer</p>
                  <p><strong>Space Complexity:</strong> O(n) where n is the number of elements</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'pointers' && (
            <motion.div
              key="pointers"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              {/* Pointer Concepts */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                  <Target className="w-8 h-8 mr-3 text-purple-600" />
                  Understanding Pointers
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {pointerConcepts.map((concept, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-200"
                    >
                      <h3 className="text-xl font-bold text-purple-900 mb-3">{concept.concept}</h3>
                      <p className="text-gray-700 mb-4">{concept.description}</p>
                      
                      <div className="bg-white p-3 rounded-lg border mb-4">
                        <code className="text-sm text-purple-800">{concept.example}</code>
                      </div>
                      
                      <div className="bg-purple-100 p-3 rounded-lg">
                        <h4 className="font-semibold text-purple-900 mb-1">Why Important:</h4>
                        <p className="text-purple-800 text-sm">{concept.importance}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Memory Visualization */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <Database className="w-8 h-8 mr-3 text-teal-600" />
                  Memory Layout Visualization
                </h2>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="bg-teal-50 p-6 rounded-xl border border-teal-200">
                    <h3 className="text-xl font-semibold text-teal-900 mb-4">Array in Memory</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-5 gap-1">
                        {['100', '101', '102', '103', '104'].map((addr, idx) => (
                          <div key={idx} className="text-center">
                            <div className="bg-teal-500 text-white p-2 rounded text-sm font-bold">
                              {10 + idx * 10}
                            </div>
                            <div className="text-xs text-teal-700 mt-1">{addr}</div>
                          </div>
                        ))}
                      </div>
                      <div className="text-center text-teal-700 text-sm">
                        Contiguous memory addresses
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
                    <h3 className="text-xl font-semibold text-orange-900 mb-4">Linked List in Memory</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        {[
                          { data: 10, next: '→ 205', addr: '100' },
                          { data: 20, next: '→ 312', addr: '205' },
                          { data: 30, next: '→ NULL', addr: '312' }
                        ].map((node, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-orange-500 text-white p-2 rounded">
                            <span className="text-xs">@{node.addr}</span>
                            <span className="font-bold">{node.data}</span>
                            <span className="text-xs">{node.next}</span>
                          </div>
                        ))}
                      </div>
                      <div className="text-center text-orange-700 text-sm">
                        Non-contiguous memory addresses
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'problems' && (
            <motion.div
              key="problems"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              {/* Common Problems */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                  <Code className="w-8 h-8 mr-3 text-indigo-600" />
                  Classic Linked List Problems
                </h2>
                
                <div className="space-y-8">
                  {commonProblems.map((problem, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="grid lg:grid-cols-3 gap-6">
                        <div>
                          <h3 className="text-2xl font-bold text-indigo-900 mb-3">{problem.problem}</h3>
                          <p className="text-gray-700 mb-4">{problem.description}</p>
                          
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 text-green-600 mr-2" />
                              <span className="text-sm"><strong>Time:</strong> {problem.timeComplexity}</span>
                            </div>
                            <div className="flex items-center">
                              <Database className="w-4 h-4 text-blue-600 mr-2" />
                              <span className="text-sm"><strong>Space:</strong> {problem.spaceComplexity}</span>
                            </div>
                            <div className="flex items-center">
                              <Code className="w-4 h-4 text-purple-600 mr-2" />
                              <span className="text-sm"><strong>Algorithm:</strong> {problem.algorithm}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Algorithm Steps:</h4>
                          <ol className="space-y-2">
                            {problem.steps.map((step, stepIndex) => (
                              <li key={stepIndex} className="text-sm text-gray-600 flex items-start">
                                <span className="w-5 h-5 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">
                                  {stepIndex + 1}
                                </span>
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Applications:</h4>
                          <ul className="space-y-2">
                            {problem.applications.map((app, appIndex) => (
                              <li key={appIndex} className="text-sm text-gray-600 flex items-center">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                {app}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Practice Exercises */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <Play className="w-8 h-8 mr-3 text-green-600" />
                  Practice Exercises
                </h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: 'Find Middle Element', difficulty: 'Easy', description: 'Find middle node in single pass' },
                    { title: 'Remove Duplicates', difficulty: 'Medium', description: 'Remove duplicate nodes from sorted list' },
                    { title: 'Intersection Point', difficulty: 'Medium', description: 'Find where two lists intersect' },
                    { title: 'Palindrome Check', difficulty: 'Medium', description: 'Check if list forms palindrome' },
                    { title: 'Add Two Numbers', difficulty: 'Hard', description: 'Add numbers represented as lists' },
                    { title: 'Clone Random List', difficulty: 'Hard', description: 'Deep copy list with random pointers' }
                  ].map((exercise, index) => (
                    <div key={index} className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{exercise.title}</h3>
                      <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-3 ${
                        exercise.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                        exercise.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {exercise.difficulty}
                      </div>
                      <p className="text-gray-600 text-sm">{exercise.description}</p>
                    </div>
                  ))}
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
              href="/learning-path/module-3"
              className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 mr-2 rotate-180" />
              Previous: Module 3 - Searching & Sorting
            </Link>
            
            <Link 
              href="/learning-path/module-5"
              className="flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              Next: Module 5 - Stacks & Queues
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}