'use client'

import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Code, 
  Cpu, 
  Database, 
  GitBranch, 
  BarChart3, 
  Brain, 
  Zap, 
  Clock, 
  TrendingUp,
  ArrowDown,
  Target,
  FileText,
  Layers,
  Network,
  Search,
  Shuffle,
  TreePine,
  Infinity,
  Calculator,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Info,
  Play,
  Users,
  Settings
} from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ProgressIndicator } from '@/components/progress/ProgressIndicator'
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton'
import { ModuleProgressIndicator } from '@/components/progress/ModuleProgressIndicator'
import { ModuleBookmarkButton } from '@/components/bookmarks/ModuleBookmarkButton'
import { SectionProgressIndicator } from '@/components/progress/SectionProgressIndicator'

const algorithmDesignTechniques = [
  { 
    name: 'Greedy Algorithm', 
    description: 'Makes locally optimal choices without considering future consequences',
    example: 'Dijkstra\'s algorithm, Prim\'s algorithm',
    useCase: 'When locally optimal choice leads to globally optimal solution',
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: Target
  },
  { 
    name: 'Divide and Conquer', 
    description: 'Divides problem into smaller subproblems, solves recursively, then combines',
    example: 'Quick sort, Merge sort, Binary search',
    useCase: 'When problem can be broken into similar smaller problems',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: GitBranch
  },
  { 
    name: 'Dynamic Programming', 
    description: 'Solves overlapping subproblems by storing solutions in optimal structure',
    example: 'Fibonacci series, Knapsack problem',
    useCase: 'When subproblems overlap and optimal substructure exists',
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    icon: Database
  },
  { 
    name: 'Brute Force', 
    description: 'Tries all possible solutions until finding the optimal one',
    example: 'Linear search algorithm',
    useCase: 'When problem size is small or no better algorithm exists',
    color: 'bg-red-100 text-red-800 border-red-200',
    icon: Search
  },
  { 
    name: 'Backtracking', 
    description: 'Explores all possible solutions and backtracks when solution isn\'t optimal',
    example: 'N-Queens problem, Sudoku solver',
    useCase: 'When need to find all solutions or constraint satisfaction problems',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: ArrowDown
  },
  { 
    name: 'Branch and Bound', 
    description: 'Systematically explores solution space with pruning of suboptimal branches',
    example: 'Traveling salesman problem',
    useCase: 'For optimization problems where bounds can be computed',
    color: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    icon: TreePine
  }
]

const complexityNotations = [
  {
    notation: 'Big O (O)',
    symbol: 'O(g(n))',
    description: 'Upper bound - worst case scenario',
    meaning: 'Algorithm will never perform worse than this',
    mathematicalDef: 'f(n) ≤ c × g(n) for all n ≥ n₀',
    color: 'bg-red-50 border-red-200 text-red-800',
    icon: TrendingUp
  },
  {
    notation: 'Big Omega (Ω)',
    symbol: 'Ω(g(n))',
    description: 'Lower bound - best case scenario',
    meaning: 'Algorithm will never perform better than this',
    mathematicalDef: 'f(n) ≥ c × g(n) for all n ≥ n₀',
    color: 'bg-green-50 border-green-200 text-green-800',
    icon: TrendingUp
  },
  {
    notation: 'Big Theta (Θ)',
    symbol: 'Θ(g(n))',
    description: 'Tight bound - average case scenario',
    meaning: 'Algorithm performs exactly at this rate',
    mathematicalDef: 'c₁ × g(n) ≤ f(n) ≤ c₂ × g(n) for all n ≥ n₀',
    color: 'bg-blue-50 border-blue-200 text-blue-800',
    icon: Target
  }
]

const complexityGrowthRates = [
  { 
    notation: 'O(1)', 
    name: 'Constant Time', 
    description: 'Operations remain constant regardless of input size',
    example: 'Array access: arr[5], Hash table lookup',
    color: 'bg-emerald-500',
    growth: 'Always 1 operation'
  },
  { 
    notation: 'O(log n)', 
    name: 'Logarithmic Time', 
    description: 'Time increases slowly as input grows',
    example: 'Binary search in sorted array',
    color: 'bg-blue-500',
    growth: 'Halves search space each step'
  },
  { 
    notation: 'O(n)', 
    name: 'Linear Time', 
    description: 'Time increases directly with input size',
    example: 'Linear search, finding max in array',
    color: 'bg-yellow-500',
    growth: 'One operation per element'
  },
  { 
    notation: 'O(n log n)', 
    name: 'Linearithmic Time', 
    description: 'Efficient divide-and-conquer algorithms',
    example: 'Merge sort, Heap sort',
    color: 'bg-orange-500',
    growth: 'n × log n operations'
  },
  { 
    notation: 'O(n²)', 
    name: 'Quadratic Time', 
    description: 'Time increases with square of input',
    example: 'Bubble sort, nested loops',
    color: 'bg-red-500',
    growth: 'n² operations for n elements'
  },
  { 
    notation: 'O(2ⁿ)', 
    name: 'Exponential Time', 
    description: 'Time doubles with each addition',
    example: 'Brute force password cracking',
    color: 'bg-purple-500',
    growth: 'Exponential explosion'
  }
]

const dataStructureClassification = [
  {
    category: 'By Organization',
    types: [
      { name: 'Linear', desc: 'Elements in sequence with unique predecessor/successor', examples: ['Array', 'Linked List', 'Stack', 'Queue'] },
      { name: 'Non-Linear', desc: 'Elements not in sequence, hierarchical relationships', examples: ['Tree', 'Graph', 'Hash Table'] }
    ]
  },
  {
    category: 'By Memory',
    types: [
      { name: 'Static', desc: 'Fixed size during compilation', examples: ['Array'] },
      { name: 'Dynamic', desc: 'Size can change during execution', examples: ['Linked List', 'Dynamic Array'] }
    ]
  },
  {
    category: 'By Access',
    types: [
      { name: 'Sequential', desc: 'Must access elements in order', examples: ['Linked List', 'Stack', 'Queue'] },
      { name: 'Random', desc: 'Can directly access any element', examples: ['Array'] }
    ]
  },
  {
    category: 'By Data Type',
    types: [
      { name: 'Homogeneous', desc: 'All elements of same type', examples: ['Array', 'Linked List'] },
      { name: 'Heterogeneous', desc: 'Elements of different types', examples: ['Structure', 'Class'] }
    ]
  }
]

const adtConcepts = [
  {
    title: 'Data Abstraction',
    description: 'Think about what you can do with data, not how it\'s implemented',
    benefits: ['Separation of concerns', 'Code reusability', 'Easier maintenance']
  },
  {
    title: 'Encapsulation',
    description: 'Data and operations are bundled together, hiding internal details',
    benefits: ['Data protection', 'Interface consistency', 'Implementation flexibility']
  },
  {
    title: 'Information Hiding',
    description: 'Internal representation is hidden from users',
    benefits: ['Security', 'Modularity', 'Reduced complexity']
  }
]

export default function ComprehensiveFoundationsPage() {
  const [activeSection, setActiveSection] = useState('introduction')
  const [selectedComplexity, setSelectedComplexity] = useState(0)
  const [animationStep, setAnimationStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 4)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const sections = [
    { id: 'introduction', name: 'Introduction', icon: BookOpen },
    { id: 'data-structures', name: 'Data Structures', icon: Database },
    { id: 'algorithms', name: 'Algorithms', icon: Code },
    { id: 'complexity', name: 'Complexity Analysis', icon: BarChart3 },
    { id: 'adt', name: 'Abstract Data Types', icon: Brain }
  ]

  // Function to scroll to section
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex">
      {/* Left Sidebar Navigation */}
      <motion.div 
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-80 bg-white/95 backdrop-blur-lg border-r border-gray-200 shadow-xl sticky top-0 h-screen overflow-y-auto"
      >
        <div className="p-6">
          <div className="mb-8">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-3">
              <BookOpen className="w-4 h-4 mr-2" />
              Module 1: Foundations
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Navigation</h2>
            <p className="text-gray-600 text-sm mt-1">Jump to any section</p>
          </div>

          {/* Navigation Pills - Now in Sidebar */}
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
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:scale-102'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <section.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                <span className="text-sm leading-tight">{section.name}</span>
                {activeSection === section.id && (
                  <ChevronRight className="w-4 h-4 ml-auto" />
                )}
              </motion.button>
            ))}
          </div>

          {/* Progress Indicator in Sidebar */}
          <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Module Progress</h3>
            <ModuleProgressIndicator 
              moduleId="foundations"
              moduleName="DSA Foundations"
            />
            <p className="text-xs text-gray-600 mt-2">
              Section {sections.findIndex(s => s.id === activeSection) + 1} of {sections.length}
            </p>
          </div>

          {/* Bookmark Button in Sidebar */}
          <div className="mt-6">
            <ModuleBookmarkButton 
              moduleId="foundations"
              moduleName="DSA Foundations"
              moduleUrl="/learning-path/foundations"
            />
          </div>

          {/* Quick Stats */}
          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Module Stats</h3>
            <div className="space-y-1 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Total Sections:</span>
                <span className="font-medium">{sections.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Time:</span>
                <span className="font-medium">45 minutes</span>
              </div>
              <div className="flex justify-between">
                <span>Difficulty:</span>
                <span className="font-medium text-green-600">Beginner</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden">
        <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 relative"
        >
          <div className="absolute top-0 right-0 flex items-center space-x-4">
            <ProgressIndicator 
              topicId="foundations-comprehensive" 
              topicType="foundations"
              category="learning-path"
            />
            <BookmarkButton 
              topicId="foundations-comprehensive"
              topicType="foundations"
              title="Comprehensive DSA Foundations"
              category="learning-path"
              url="/learning-path/foundations"
            />
          </div>
          
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-6 py-3 rounded-full text-sm font-medium mb-8">
            <BookOpen className="w-5 h-5 mr-2" />
            Chapter 1: Introduction to Data Structure and Algorithm
          </div>
          
          <h1 className="text-6xl font-bold text-gray-900 mb-8">
            Data Structures &
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Algorithms Fundamentals
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Master the essential concepts that form the foundation of computer science. 
            This comprehensive module covers data structures, algorithm design paradigms, 
            complexity analysis, and abstract data types with detailed explanations and practical examples.
          </p>
        </motion.div>

        {/* Learning Objectives */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-20"
        >
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 text-white mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center">What You&apos;ll Master</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                <BarChart3 className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Complexity Analysis</h3>
                <p className="text-blue-100">Master Big O, Omega, and Theta notations to analyze algorithm efficiency</p>
              </div>
              <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                <Brain className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Algorithm Design</h3>
                <p className="text-blue-100">Learn paradigms like divide-and-conquer, dynamic programming, and greedy algorithms</p>
              </div>
              <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                <Database className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Data Structures</h3>
                <p className="text-blue-100">Understand arrays, linked lists, trees, graphs, and their applications</p>
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
            {/* Why Study DSA */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                  <Target className="w-8 h-8 mr-3 text-blue-600" />
                  Why Study Data Structures and Algorithms?
                </h2>
                <SectionProgressIndicator 
                  moduleId="foundations"
                  sectionId="why-study"
                  sectionName="Why Study DSA"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Efficient Solutions</h4>
                      <p className="text-gray-600">Apply best practices for developing optimal solutions using programming</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Right Tool for Job</h4>
                      <p className="text-gray-600">Understand concepts to apply the best-fit data structure for requirements</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">System Architecture</h4>
                      <p className="text-gray-600">Design, develop and optimize applications using computer programming</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Reliable Solutions</h4>
                      <p className="text-gray-600">Develop effective and reliable software solutions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Data vs Information */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                  <Info className="w-8 h-8 mr-3 text-purple-600" />
                  Understanding Data and Information
                </h2>
                <SectionProgressIndicator 
                  moduleId="foundations"
                  sectionId="data-information"
                  sectionName="Data vs Information"
                />
              </div>
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">Input → Processing → Output</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="w-16 h-8 bg-gray-300 rounded mr-3"></div>
                        <span className="text-sm text-gray-600">Raw Data</span>
                      </div>
                      <ArrowDown className="w-5 h-5 text-blue-600 mx-auto" />
                      <div className="flex items-center">
                        <Settings className="w-8 h-8 text-blue-600 mr-3" />
                        <span className="text-sm text-gray-600">Processing</span>
                      </div>
                      <ArrowDown className="w-5 h-5 text-blue-600 mx-auto" />
                      <div className="flex items-center">
                        <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
                        <span className="text-sm text-gray-600">Information</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-2 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                      <h4 className="font-semibold text-green-900 mb-3">Atomic Data</h4>
                      <p className="text-green-700 mb-3">Single, indivisible value</p>
                      <div className="space-y-2">
                        <code className="bg-white px-2 py-1 rounded text-sm">integer: 123</code>
                        <code className="bg-white px-2 py-1 rounded text-sm">float: 45.67</code>
                        <code className="bg-white px-2 py-1 rounded text-sm">char: &apos;A&apos;</code>
                      </div>
                    </div>
                    
                    <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                      <h4 className="font-semibold text-purple-900 mb-3">Composite Data</h4>
                      <p className="text-purple-700 mb-3">Can be broken into subfields</p>
                      <div className="space-y-2">
                        <code className="bg-white px-2 py-1 rounded text-sm block">Student {`{`}</code>
                        <code className="bg-white px-2 py-1 rounded text-sm block ml-4">roll_no: 123</code>
                        <code className="bg-white px-2 py-1 rounded text-sm block ml-4">name: &quot;John&quot;</code>
                        <code className="bg-white px-2 py-1 rounded text-sm block ml-4">faculty: &quot;CS&quot;</code>
                        <code className="bg-white px-2 py-1 rounded text-sm block">{`}`}</code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'data-structures' && (
          <motion.div
            key="data-structures"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            {/* Data Structure Definition */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Database className="w-8 h-8 mr-3 text-blue-600" />
                What is a Data Structure?
              </h2>
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 mb-8">
                <p className="text-lg text-blue-900 leading-relaxed">
                  A <strong>data structure</strong> is a particular way of storing and organizing data in a computer 
                  so that it can be used efficiently. It represents the logical relationship existing between 
                  individual elements of data and considers not only the elements stored but also their 
                  relationship to each other.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Functions:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>Depicts logical representation of data in memory</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>Represents relationships between data elements</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>Enables efficient manipulation of stored data</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span>Allows programs to process data efficiently</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Example: Student Data Storage</h3>
                  <div className="space-y-3">
                    <p className="text-gray-700"><strong>Data Structures:</strong> Arrays, Linked Lists</p>
                    <p className="text-gray-700"><strong>Key Issues:</strong></p>
                    <ul className="ml-4 space-y-1 text-gray-600">
                      <li>• Space needed for storage</li>
                      <li>• Operation efficiency (time required)</li>
                      <li>• Retrieval, Insertion, Deletion performance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Structure Classification */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <GitBranch className="w-8 h-8 mr-3 text-purple-600" />
                Types of Data Structures
              </h2>
              
              <div className="space-y-8">
                {dataStructureClassification.map((category, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-6">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">{category.category}</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {category.types.map((type, typeIndex) => (
                        <div key={typeIndex} className="bg-gray-50 p-6 rounded-xl">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">{type.name}</h4>
                          <p className="text-gray-600 mb-3">{type.desc}</p>
                          <div className="flex flex-wrap gap-2">
                            {type.examples.map((example, exampleIndex) => (
                              <span 
                                key={exampleIndex}
                                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                              >
                                {example}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Structure Operations */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Settings className="w-8 h-8 mr-3 text-green-600" />
                Common Operations on Data Structures
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'Creating', desc: 'Make/Create new data structure', icon: Play },
                  { name: 'Inserting', desc: 'Adding new record to structure', icon: ArrowDown },
                  { name: 'Traversing', desc: 'Accessing each record exactly once', icon: Search },
                  { name: 'Searching', desc: 'Find location of record with specific key', icon: Target },
                  { name: 'Deleting', desc: 'Removing existing record from structure', icon: AlertCircle },
                  { name: 'Sorting', desc: 'Arranging data in specific order', icon: BarChart3 },
                  { name: 'Merging', desc: 'Combining sorted records into single set', icon: GitBranch }
                ].map((operation, index) => {
                  const IconComponent = operation.icon
                  return (
                    <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border">
                      <div className="flex items-center mb-3">
                        <IconComponent className="w-6 h-6 text-blue-600 mr-3" />
                        <h3 className="text-lg font-semibold text-gray-900">{operation.name}</h3>
                      </div>
                      <p className="text-gray-600">{operation.desc}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'algorithms' && (
          <motion.div
            key="algorithms"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            {/* Algorithm Definition */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Code className="w-8 h-8 mr-3 text-green-600" />
                What is an Algorithm?
              </h2>
              
              <div className="bg-green-50 p-6 rounded-xl border border-green-200 mb-8">
                <p className="text-lg text-green-900 leading-relaxed mb-4">
                  An <strong>algorithm</strong> is a step-by-step finite set of instructions to solve a 
                  well-defined computational problem. It is a precise plan for performing a sequence of actions.
                </p>
                
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-3">Example: Sum of Two Numbers</h4>
                  <ol className="space-y-2 text-green-800">
                    <li><strong>Step 1:</strong> START ADD</li>
                    <li><strong>Step 2:</strong> Get values of a & b</li>
                    <li><strong>Step 3:</strong> c ← a + b</li>
                    <li><strong>Step 4:</strong> Display c</li>
                    <li><strong>Step 5:</strong> STOP</li>
                  </ol>
                </div>
              </div>

              {/* Algorithm Criteria */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Essential Criteria:</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Input</h4>
                        <p className="text-gray-600">Zero or more quantities externally supplied</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Output</h4>
                        <p className="text-gray-600">At least one quantity is produced</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Definiteness</h4>
                        <p className="text-gray-600">Each instruction must be clear and unambiguous</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Requirements:</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-blue-500 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Finiteness</h4>
                        <p className="text-gray-600">Algorithm terminates after finite steps for all cases</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-blue-500 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Effectiveness</h4>
                        <p className="text-gray-600">Every instruction sufficiently basic to be carried out</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Algorithm Design Techniques */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <Brain className="w-8 h-8 mr-3 text-purple-600" />
                Algorithm Design Techniques
              </h2>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {algorithmDesignTechniques.map((technique, index) => {
                  const IconComponent = technique.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      className={`p-6 rounded-xl border-2 ${technique.color}`}
                    >
                      <div className="flex items-center mb-4">
                        <IconComponent className="w-8 h-8 mr-3" />
                        <h3 className="text-xl font-bold">{technique.name}</h3>
                      </div>
                      
                      <p className="mb-4 leading-relaxed">{technique.description}</p>
                      
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold">Example:</h4>
                          <p className="text-sm">{technique.example}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold">When to Use:</h4>
                          <p className="text-sm">{technique.useCase}</p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'complexity' && (
          <motion.div
            key="complexity"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            {/* Why Analyze Algorithms */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <BarChart3 className="w-8 h-8 mr-3 text-red-600" />
                Why Analyze Algorithms?
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-red-50 rounded-xl border border-red-200">
                  <Clock className="w-12 h-12 text-red-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Computational Time</h3>
                  <p className="text-gray-600">Predict CPU consumption and execution time</p>
                </div>
                <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-200">
                  <Database className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Memory Space</h3>
                  <p className="text-gray-600">Analyze RAM consumption and space requirements</p>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-xl border border-green-200">
                  <Network className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Communication</h3>
                  <p className="text-gray-600">Evaluate bandwidth consumption for data transfer</p>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <h3 className="text-xl font-semibold text-blue-900 mb-3">Running Time Definition</h3>
                <p className="text-blue-800 mb-4">
                  The running time of an algorithm is the total number of primitive operations executed 
                  (machine independent steps). This is also known as algorithm complexity.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-blue-900">Time Factor:</h4>
                    <p className="text-blue-700">Measured by counting key operations like comparisons</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Space Factor:</h4>
                    <p className="text-blue-700">Measured by maximum memory space required</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Asymptotic Notations */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <Target className="w-8 h-8 mr-3 text-purple-600" />
                Asymptotic Notations
              </h2>
              
              <div className="grid lg:grid-cols-3 gap-8">
                {complexityNotations.map((notation, index) => {
                  const IconComponent = notation.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2, duration: 0.6 }}
                      className={`p-6 rounded-xl border-2 ${notation.color}`}
                    >
                      <div className="text-center mb-4">
                        <IconComponent className="w-12 h-12 mx-auto mb-3" />
                        <h3 className="text-2xl font-bold">{notation.notation}</h3>
                        <code className="text-lg font-mono">{notation.symbol}</code>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold">Description:</h4>
                          <p className="text-sm">{notation.description}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold">Meaning:</h4>
                          <p className="text-sm">{notation.meaning}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold">Mathematical:</h4>
                          <code className="text-sm font-mono block bg-white p-2 rounded">
                            {notation.mathematicalDef}
                          </code>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Growth Rates Visualization */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <TrendingUp className="w-8 h-8 mr-3 text-green-600" />
                Complexity Growth Rates & Interactive Graphs
              </h2>
              
              {/* Interactive Complexity Graph */}
              <div className="mb-12 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-8 border">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Interactive Complexity Comparison
                </h3>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Graph Visualization */}
                  <div className="bg-white rounded-lg p-6 border shadow-sm">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Growth Rate Comparison</h4>
                    <div className="relative h-64 bg-gray-50 rounded-lg overflow-hidden">
                      <svg className="w-full h-full" viewBox="0 0 400 250">
                        {/* Grid lines */}
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                          <g key={i}>
                            <line 
                              x1={i * 40} 
                              y1="10" 
                              x2={i * 40} 
                              y2="240" 
                              stroke="#e5e7eb" 
                              strokeWidth="1"
                            />
                            <line 
                              x1="10" 
                              y1={i * 24} 
                              x2="390" 
                              y2={i * 24} 
                              stroke="#e5e7eb" 
                              strokeWidth="1"
                            />
                          </g>
                        ))}
                        
                        {/* Axes */}
                        <line x1="10" y1="240" x2="390" y2="240" stroke="#374151" strokeWidth="2"/>
                        <line x1="10" y1="10" x2="10" y2="240" stroke="#374151" strokeWidth="2"/>
                        
                        {/* O(1) - Constant */}
                        <line x1="10" y1="200" x2="390" y2="200" stroke="#10B981" strokeWidth="3"/>
                        
                        {/* O(log n) - Logarithmic */}
                        <path 
                          d="M 10 240 Q 100 180 200 150 T 390 120" 
                          fill="none" 
                          stroke="#3B82F6" 
                          strokeWidth="3"
                        />
                        
                        {/* O(n) - Linear */}
                        <line x1="10" y1="240" x2="390" y2="50" stroke="#EAB308" strokeWidth="3"/>
                        
                        {/* O(n log n) - Linearithmic */}
                        <path 
                          d="M 10 240 Q 150 120 250 80 T 390 30" 
                          fill="none" 
                          stroke="#F97316" 
                          strokeWidth="3"
                        />
                        
                        {/* O(n²) - Quadratic */}
                        <path 
                          d="M 10 240 Q 100 180 200 100 Q 300 40 390 15" 
                          fill="none" 
                          stroke="#EF4444" 
                          strokeWidth="3"
                        />
                        
                        {/* O(2ⁿ) - Exponential */}
                        <path 
                          d="M 10 240 Q 50 220 100 180 Q 150 120 200 60 Q 250 20 300 10 L 390 5" 
                          fill="none" 
                          stroke="#8B5CF6" 
                          strokeWidth="3"
                        />
                        
                        {/* Labels */}
                        <text x="20" y="25" className="fill-gray-700 text-xs font-medium">Time</text>
                        <text x="360" y="235" className="fill-gray-700 text-xs font-medium">Input Size (n)</text>
                      </svg>
                      
                      {/* Legend */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-xs">
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <div className="w-3 h-0.5 bg-green-500 mr-2"></div>
                            <span>O(1)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-0.5 bg-blue-500 mr-2"></div>
                            <span>O(log n)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-0.5 bg-yellow-500 mr-2"></div>
                            <span>O(n)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-0.5 bg-orange-500 mr-2"></div>
                            <span>O(n log n)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-0.5 bg-red-500 mr-2"></div>
                            <span>O(n²)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-0.5 bg-purple-500 mr-2"></div>
                            <span>O(2ⁿ)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Interactive Operations Counter */}
                  <div className="bg-white rounded-lg p-6 border shadow-sm">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Operations Calculator</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Input Size (n): {selectedComplexity + 1}
                        </label>
                        <input 
                          type="range" 
                          min="0" 
                          max="9" 
                          value={selectedComplexity}
                          onChange={(e) => setSelectedComplexity(parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      
                      <div className="space-y-3">
                        {complexityGrowthRates.map((complexity, index) => {
                          const n = selectedComplexity + 1
                          let operations = 1
                          
                          switch(complexity.notation) {
                            case 'O(1)': operations = 1; break;
                            case 'O(log n)': operations = Math.max(1, Math.floor(Math.log2(n))); break;
                            case 'O(n)': operations = n; break;
                            case 'O(n log n)': operations = n * Math.max(1, Math.floor(Math.log2(n))); break;
                            case 'O(n²)': operations = n * n; break;
                            case 'O(2ⁿ)': operations = Math.pow(2, Math.min(n, 10)); break;
                          }
                          
                          return (
                            <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                              <div className="flex items-center">
                                <div className={`w-4 h-4 rounded-full ${complexity.color} mr-3`}></div>
                                <span className="font-medium">{complexity.notation}</span>
                              </div>
                              <span className="text-lg font-bold text-gray-900">
                                {operations.toLocaleString()} ops
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {complexityGrowthRates.map((complexity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                    onClick={() => setSelectedComplexity(index)}
                  >
                    <div className="text-center mb-4">
                      <div className={`w-16 h-16 ${complexity.color} rounded-full mx-auto mb-3 flex items-center justify-center`}>
                        <span className="text-white font-bold text-lg">{complexity.notation}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{complexity.name}</h3>
                    </div>
                    
                    {/* Mini growth visualization */}
                    <div className="mb-4">
                      <div className="h-16 bg-gray-50 rounded-lg flex items-end justify-center p-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => {
                          let height = 4
                          switch(complexity.notation) {
                            case 'O(1)': height = 8; break;
                            case 'O(log n)': height = Math.log2(n) * 4; break;
                            case 'O(n)': height = n * 2; break;
                            case 'O(n log n)': height = n * Math.log2(n); break;
                            case 'O(n²)': height = Math.min(n * n * 0.5, 48); break;
                            case 'O(2ⁿ)': height = Math.min(Math.pow(2, n * 0.5), 48); break;
                          }
                          
                          return (
                            <div 
                              key={n}
                              className={`w-2 mx-0.5 ${complexity.color} rounded-t`}
                              style={{ height: `${Math.max(height, 4)}px` }}
                            ></div>
                          )
                        })}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <p className="text-gray-600 text-sm">{complexity.description}</p>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">Example:</h4>
                        <p className="text-gray-600 text-sm">{complexity.example}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">Growth Pattern:</h4>
                        <p className="text-gray-600 text-sm">{complexity.growth}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Time-Space Tradeoff */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Calculator className="w-8 h-8 mr-3 text-orange-600" />
                Time-Space Tradeoff
              </h2>
              
              <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
                <p className="text-lg text-orange-900 leading-relaxed mb-4">
                  A <strong>time-space tradeoff</strong> is a situation where memory use can be reduced at 
                  the cost of slower program execution, and conversely, computation time can be reduced 
                  at the cost of increased memory use.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-900 mb-2">Key Considerations:</h4>
                    <ul className="space-y-1 text-orange-800 text-sm">
                      <li>• Relative costs of CPU cycles vs RAM space</li>
                      <li>• Hard drive space becoming cheaper over time</li>
                      <li>• Changing hardware cost dynamics</li>
                      <li>• Program performance requirements</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-900 mb-2">Benefits:</h4>
                    <ul className="space-y-1 text-orange-800 text-sm">
                      <li>• Programs can run much faster</li>
                      <li>• Memory efficiency can be optimized</li>
                      <li>• Adaptation to hardware constraints</li>
                      <li>• Performance tuning opportunities</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'adt' && (
          <motion.div
            key="adt"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            {/* ADT Introduction */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Brain className="w-8 h-8 mr-3 text-indigo-600" />
                Abstract Data Types (ADT)
              </h2>
              
              <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-200 mb-8">
                <p className="text-lg text-indigo-900 leading-relaxed mb-4">
                  An <strong>Abstract Data Type (ADT)</strong> is composed of a collection of data and 
                  a set of operations on that data. It emphasizes what operations can be performed 
                  rather than how they are implemented.
                </p>
                
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-indigo-900 mb-3">ADT Components:</h4>
                  <ul className="space-y-2 text-indigo-800">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      Declaration of data
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      Declaration of operations
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      Encapsulation of data and operations
                    </li>
                  </ul>
                </div>
              </div>

              {/* ADT Concepts */}
              <div className="grid md:grid-cols-3 gap-6">
                {adtConcepts.map((concept, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-xl border">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{concept.title}</h3>
                    <p className="text-gray-600 mb-4">{concept.description}</p>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Benefits:</h4>
                      <ul className="space-y-1">
                        {concept.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="text-gray-600 text-sm flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Array as ADT Example */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Code className="w-8 h-8 mr-3 text-green-600" />
                Array as ADT Example
              </h2>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Value Definition:</h3>
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <code className="text-sm">
                      {`abstract typedef <element_type, index_type> Array

//definition clause
element_type A [max_size]
index_type i

//condition clause
index_type == integer`}
                    </code>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Implementation Requirements:</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                      <div>
                        <h4 className="font-semibold">Data Representation</h4>
                        <p className="text-gray-600 text-sm">Must represent all necessary ADT values and be private</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                      <div>
                        <h4 className="font-semibold">Algorithm for Operations</h4>
                        <p className="text-gray-600 text-sm">Consistent with chosen representation, private helpers</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Operator Definitions:</h3>
                  
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-900 mb-2">Extract Operation (A[i]):</h4>
                      <code className="text-sm text-blue-800 block mb-2">
                        abstract &lt;element_type&gt; Extract (A, i)
                      </code>
                      <div className="text-sm text-blue-700">
                        <p><strong>Precondition:</strong> 0 ≤ i &lt; max_size</p>
                        <p><strong>Postcondition:</strong> Extract == A[i]</p>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-900 mb-2">Store Operation:</h4>
                      <code className="text-sm text-green-800 block mb-2">
                        abstract Store(A, i, value)
                      </code>
                      <div className="text-sm text-green-700">
                        <p><strong>Precondition:</strong> 0 ≤ i &lt; max_size</p>
                        <p><strong>Postcondition:</strong> A[i] == value</p>
                      </div>
                    </div>
                  </div>
                </div>
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
            href="/learning-path"
            className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 mr-2 rotate-180" />
            Back to Learning Path
          </Link>
          
          <Link 
            href="/learning-path/module-2"
            className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Next: Module 2 - Linear Structures
            <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
        </div>
      </div>
    </div>
  )
}