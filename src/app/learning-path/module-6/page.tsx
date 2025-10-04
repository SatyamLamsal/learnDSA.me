'use client'

import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Code, 
  TreePine, 
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
  ArrowLeftRight,
  Network,
  GitBranch,
  FolderTree,
  Binary
} from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ProgressIndicator } from '@/components/progress/ProgressIndicator'
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton'
import { ModuleProgressIndicator } from '@/components/progress/ModuleProgressIndicator'
import { ModuleBookmarkButton } from '@/components/bookmarks/ModuleBookmarkButton'
import { SectionProgressIndicator } from '@/components/progress/SectionProgressIndicator'

const treeTypes = [
  {
    name: 'Binary Tree',
    description: 'Each node has at most two children: left and right',
    characteristics: ['Max 2 children per node', 'Left and right subtrees', 'Hierarchical structure'],
    applications: ['Expression trees', 'Decision trees', 'File systems'],
    complexity: { search: 'O(n)', insert: 'O(n)', delete: 'O(n)' },
    color: 'bg-blue-100 text-blue-800 border-blue-200'
  },
  {
    name: 'Binary Search Tree',
    description: 'Binary tree with ordering property: left < node < right',
    characteristics: ['Ordered structure', 'Left subtree smaller', 'Right subtree larger'],
    applications: ['Database indexing', 'Symbol tables', 'Priority queues'],
    complexity: { search: 'O(log n)', insert: 'O(log n)', delete: 'O(log n)' },
    color: 'bg-green-100 text-green-800 border-green-200'
  },
  {
    name: 'AVL Tree',
    description: 'Self-balancing BST where height difference ≤ 1',
    characteristics: ['Self-balancing', 'Height balanced', 'Rotation operations'],
    applications: ['Database systems', 'Memory management', 'Compilers'],
    complexity: { search: 'O(log n)', insert: 'O(log n)', delete: 'O(log n)' },
    color: 'bg-purple-100 text-purple-800 border-purple-200'
  },
  {
    name: 'Red-Black Tree',
    description: 'Self-balancing BST with colored nodes and balancing rules',
    characteristics: ['Color-coded nodes', 'Balancing properties', 'Efficient operations'],
    applications: ['Java TreeMap', 'C++ map/set', 'Linux kernel'],
    complexity: { search: 'O(log n)', insert: 'O(log n)', delete: 'O(log n)' },
    color: 'bg-red-100 text-red-800 border-red-200'
  }
]

const treeTraversals = [
  {
    name: 'In-Order',
    pattern: 'Left → Root → Right',
    description: 'Visit left subtree, then root, then right subtree',
    result: 'Sorted order for BST',
    example: '[4, 2, 5, 1, 6, 3, 7]',
    useCase: 'Getting sorted data from BST',
    color: 'bg-blue-50 border-blue-200',
    icon: ArrowRight
  },
  {
    name: 'Pre-Order',
    pattern: 'Root → Left → Right',
    description: 'Visit root first, then left subtree, then right subtree',
    result: 'Root appears before children',
    example: '[1, 2, 4, 5, 3, 6, 7]',
    useCase: 'Tree copying, expression evaluation',
    color: 'bg-green-50 border-green-200',
    icon: ArrowDown
  },
  {
    name: 'Post-Order',
    pattern: 'Left → Right → Root',
    description: 'Visit left subtree, then right subtree, then root',
    result: 'Root appears after children',
    example: '[4, 5, 2, 6, 7, 3, 1]',
    useCase: 'Tree deletion, expression evaluation',
    color: 'bg-purple-50 border-purple-200',
    icon: ArrowUp
  },
  {
    name: 'Level-Order',
    pattern: 'Level by Level',
    description: 'Visit nodes level by level from left to right',
    result: 'Breadth-first traversal',
    example: '[1, 2, 3, 4, 5, 6, 7]',
    useCase: 'Tree printing, finding level',
    color: 'bg-orange-50 border-orange-200',
    icon: Layers
  }
]

const treeApplications = [
  {
    name: 'File System Hierarchy',
    description: 'Operating systems use trees to organize files and directories',
    example: 'Root directory contains folders, which contain subfolders and files',
    benefits: ['Hierarchical organization', 'Efficient search', 'Path navigation'],
    implementation: 'Each node represents a file/folder with parent-child relationships',
    icon: FolderTree,
    color: 'bg-indigo-100 text-indigo-800 border-indigo-200'
  },
  {
    name: 'Database Indexing',
    description: 'B-trees and variants provide fast data retrieval in databases',
    example: 'MySQL uses B+ trees for primary key indexing',
    benefits: ['O(log n) search time', 'Range queries', 'Sorted access'],
    implementation: 'Multi-way trees optimized for disk storage',
    icon: Database,
    color: 'bg-green-100 text-green-800 border-green-200'
  },
  {
    name: 'Decision Making',
    description: 'Decision trees model choices and their consequences',
    example: 'Machine learning classification and game theory',
    benefits: ['Clear logic flow', 'Easy interpretation', 'Rule extraction'],
    implementation: 'Each internal node tests an attribute, leaves are decisions',
    icon: GitBranch,
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200'
  },
  {
    name: 'Expression Evaluation',
    description: 'Parse trees represent mathematical and programming expressions',
    example: '(a + b) * c becomes a tree with * at root, + as left child',
    benefits: ['Operator precedence', 'Easy evaluation', 'Syntax checking'],
    implementation: 'Operators as internal nodes, operands as leaves',
    icon: Code,
    color: 'bg-purple-100 text-purple-800 border-purple-200'
  }
]

const bstOperations = [
  {
    operation: 'Search',
    description: 'Find a specific value in the BST',
    timeComplexity: 'O(log n) avg, O(n) worst',
    steps: [
      'Start at root node',
      'Compare target with current node',
      'Go left if target < current, right if target > current',
      'Repeat until found or reach NULL'
    ],
    pseudocode: `search(root, key):
  if root is NULL or root.data == key:
    return root
  if key < root.data:
    return search(root.left, key)
  else:
    return search(root.right, key)`
  },
  {
    operation: 'Insert',
    description: 'Add a new value maintaining BST property',
    timeComplexity: 'O(log n) avg, O(n) worst',
    steps: [
      'Start at root node',
      'Compare new value with current node',
      'Go left if smaller, right if larger',
      'Insert when reaching appropriate NULL position'
    ],
    pseudocode: `insert(root, key):
  if root is NULL:
    return new Node(key)
  if key < root.data:
    root.left = insert(root.left, key)
  else:
    root.right = insert(root.right, key)
  return root`
  },
  {
    operation: 'Delete',
    description: 'Remove a value while maintaining BST property',
    timeComplexity: 'O(log n) avg, O(n) worst',
    steps: [
      'Find the node to delete',
      'Case 1: No children - simply remove',
      'Case 2: One child - replace with child',
      'Case 3: Two children - replace with inorder successor'
    ],
    pseudocode: `delete(root, key):
  if root is NULL: return root
  if key < root.data:
    root.left = delete(root.left, key)
  elif key > root.data:
    root.right = delete(root.right, key)
  else: // Node to delete found
    // Handle 3 cases...`
  }
]

const treeProblems = [
  {
    problem: 'Maximum Depth',
    description: 'Find the maximum depth (height) of a binary tree',
    difficulty: 'Easy',
    approach: 'Recursive depth calculation',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h) where h is height',
    keyInsight: 'Height = 1 + max(left_height, right_height)',
    applications: ['Tree analysis', 'Balancing checks', 'Memory estimation']
  },
  {
    problem: 'Lowest Common Ancestor',
    description: 'Find the lowest common ancestor of two nodes in BST',
    difficulty: 'Medium',
    approach: 'Leverage BST property for efficient search',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    keyInsight: 'LCA is first node where paths diverge',
    applications: ['Version control', 'Organizational hierarchy', 'Phylogenetic trees']
  },
  {
    problem: 'Validate BST',
    description: 'Check if a binary tree is a valid binary search tree',
    difficulty: 'Medium',
    approach: 'In-order traversal or range validation',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    keyInsight: 'In-order traversal should be strictly increasing',
    applications: ['Data validation', 'Tree integrity checks', 'Testing']
  },
  {
    problem: 'Path Sum',
    description: 'Find if there exists a root-to-leaf path with given sum',
    difficulty: 'Easy',
    approach: 'DFS with running sum',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    keyInsight: 'Subtract current value and recurse on children',
    applications: ['Game trees', 'Decision paths', 'Cost optimization']
  }
]

export default function TreesModule() {
  const [activeSection, setActiveSection] = useState('introduction')
  const [animationStep, setAnimationStep] = useState(0)
  const [selectedTraversal, setSelectedTraversal] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 4)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const sections = [
    { id: 'introduction', name: 'Introduction', icon: BookOpen },
    { id: 'types', name: 'Tree Types', icon: TreePine },
    { id: 'traversals', name: 'Tree Traversals', icon: Search },
    { id: 'bst', name: 'Binary Search Trees', icon: Binary },
    { id: 'applications', name: 'Applications', icon: Play },
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex">
      {/* Left Sidebar Navigation */}
      <motion.div 
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-80 bg-white/95 backdrop-blur-lg border-r border-gray-200 shadow-xl sticky top-0 h-screen overflow-y-auto"
      >
        <div className="p-6">
          <div className="mb-8">
            <div className="inline-flex items-center bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-3">
              <TreePine className="w-4 h-4 mr-2" />
              Module 6: Trees & Hierarchies
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
                    ? 'bg-emerald-600 text-white shadow-lg scale-105'
                    : 'bg-gray-50 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 hover:scale-102'
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

          <div className="mt-8 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Module Progress</h3>
            <ModuleProgressIndicator moduleId="trees" />
            <p className="text-xs text-gray-600 mt-2">
              Section {sections.findIndex(s => s.id === activeSection) + 1} of {sections.length}
            </p>
          </div>

          <div className="mt-6">
            <ModuleBookmarkButton
              moduleId="trees"
              moduleUrl="/learning-path/module-6"
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
                <span className="font-medium">75 minutes</span>
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
                topicId="trees-module" 
                topicType="module"
                category="learning-path"
              />
              <BookmarkButton 
                topicId="trees-module"
                topicType="module"
                title="Trees & Hierarchies"
                category="learning-path"
                url="/learning-path/module-6"
              />
            </div>
            
            <div className="inline-flex items-center bg-emerald-100 text-emerald-800 px-6 py-3 rounded-full text-sm font-medium mb-8">
              <TreePine className="w-5 h-5 mr-2" />
              Module 6: Hierarchical Data Structures
            </div>
            
            <h1 className="text-6xl font-bold text-gray-900 mb-8">
              Trees & Binary Trees
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                Hierarchical Mastery
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Master hierarchical data structures that power databases, file systems, and decision-making algorithms. 
              Learn tree traversals, binary search trees, and balanced tree implementations.
            </p>
          </motion.div>

          {/* Learning Objectives */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-20"
          >
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 text-white mb-12">
              <h2 className="text-3xl font-bold mb-6 text-center">What You&apos;ll Master</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                  <TreePine className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Tree Structures</h3>
                  <p className="text-emerald-100">Master binary trees, BSTs, and self-balancing trees</p>
                </div>
                <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                  <Search className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Tree Traversals</h3>
                  <p className="text-emerald-100">Learn in-order, pre-order, post-order, and level-order traversals</p>
                </div>
                <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                  <Database className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Real Applications</h3>
                  <p className="text-emerald-100">Understand file systems, databases, and decision trees</p>
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
              {/* What is a Tree */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                    <TreePine className="w-8 h-8 mr-3 text-emerald-600" />
                    What is a Tree?
                  </h2>
                  <SectionProgressIndicator 
                    moduleId="trees"
                    sectionId="introduction"
                  />
                </div>
                
                <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-200 mb-8">
                  <p className="text-lg text-emerald-900 leading-relaxed mb-4">
                    A <strong>tree</strong> is a hierarchical data structure consisting of nodes connected by edges. 
                    It represents a collection of nodes where each node has a value and a list of references to other nodes (children). 
                    Unlike linear data structures, trees organize data in a parent-child relationship.
                  </p>
                  
                  <div className="bg-white p-4 rounded-lg border border-emerald-200">
                    <h4 className="font-semibold text-emerald-900 mb-3">Key Properties:</h4>
                    <ul className="grid md:grid-cols-2 gap-2 text-emerald-800">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-emerald-600" />
                        Exactly one root node
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-emerald-600" />
                        No cycles (acyclic graph)
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-emerald-600" />
                        Each node has one parent (except root)
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-emerald-600" />
                        N nodes have N-1 edges
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Tree Terminology */}
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                    <h3 className="text-xl font-semibold text-blue-900 mb-6">Tree Terminology</h3>
                    <div className="space-y-4">
                      {[
                        { term: 'Root', def: 'Top-most node with no parent' },
                        { term: 'Leaf', def: 'Node with no children' },
                        { term: 'Internal Node', def: 'Node with at least one child' },
                        { term: 'Parent', def: 'Node with children' },
                        { term: 'Child', def: 'Node with a parent' },
                        { term: 'Sibling', def: 'Nodes with same parent' },
                        { term: 'Ancestor', def: 'Node on path from root to node' },
                        { term: 'Descendant', def: 'Node in subtree of another node' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start space-x-3">
                          <div className="w-20 font-semibold text-blue-900 text-sm">{item.term}:</div>
                          <div className="text-blue-800 text-sm">{item.def}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                    <h3 className="text-xl font-semibold text-purple-900 mb-6">Tree Measurements</h3>
                    <div className="space-y-4">
                      {[
                        { term: 'Height', def: 'Longest path from node to leaf' },
                        { term: 'Depth', def: 'Path length from root to node' },
                        { term: 'Level', def: 'Depth + 1 (root is level 1)' },
                        { term: 'Degree', def: 'Number of children of a node' },
                        { term: 'Size', def: 'Total number of nodes in tree' },
                        { term: 'Width', def: 'Number of nodes at a level' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start space-x-3">
                          <div className="w-16 font-semibold text-purple-900 text-sm">{item.term}:</div>
                          <div className="text-purple-800 text-sm">{item.def}</div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 bg-white p-4 rounded-lg border">
                      <h4 className="font-semibold text-purple-900 mb-2">Example:</h4>
                      <div className="text-purple-800 text-sm space-y-1">
                        <div>Tree Height: 3</div>
                        <div>Root Depth: 0</div>
                        <div>Leaf Nodes: 4</div>
                        <div>Internal Nodes: 3</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tree vs Other Structures */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <Network className="w-8 h-8 mr-3 text-teal-600" />
                  Trees vs Other Data Structures
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                    <h3 className="text-lg font-semibold text-red-900 mb-4">Linear Structures</h3>
                    <div className="space-y-3">
                      <div className="text-red-800 text-sm">
                        <strong>Arrays/Lists:</strong> Sequential access, fixed relationships
                      </div>
                      <div className="text-red-700 text-sm">
                        • One-dimensional organization<br/>
                        • Predecessor/successor relationships<br/>
                        • Limited hierarchical modeling
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-200">
                    <h3 className="text-lg font-semibold text-emerald-900 mb-4">Tree Structures</h3>
                    <div className="space-y-3">
                      <div className="text-emerald-800 text-sm">
                        <strong>Trees:</strong> Hierarchical access, parent-child relationships
                      </div>
                      <div className="text-emerald-700 text-sm">
                        • Multi-dimensional organization<br/>
                        • Natural hierarchy modeling<br/>
                        • Efficient search and insertion
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">Graph Structures</h3>
                    <div className="space-y-3">
                      <div className="text-blue-800 text-sm">
                        <strong>Graphs:</strong> Complex relationships, cycles allowed
                      </div>
                      <div className="text-blue-700 text-sm">
                        • Many-to-many relationships<br/>
                        • Cycles and complex connections<br/>
                        • More general but complex
                      </div>
                    </div>
                  </div>
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
              {/* Tree Types */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                  <Layers className="w-8 h-8 mr-3 text-indigo-600" />
                  Types of Trees
                </h2>
                
                <div className="space-y-8">
                  {treeTypes.map((type, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      className={`border-2 rounded-xl p-6 ${type.color}`}
                    >
                      <div className="grid lg:grid-cols-4 gap-6">
                        <div>
                          <h3 className="text-2xl font-bold mb-3">{type.name}</h3>
                          <p className="mb-4 leading-relaxed">{type.description}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-3">Characteristics:</h4>
                          <ul className="space-y-1">
                            {type.characteristics.map((char, charIndex) => (
                              <li key={charIndex} className="text-sm flex items-center">
                                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                {char}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-3">Applications:</h4>
                          <ul className="space-y-1">
                            {type.applications.map((app, appIndex) => (
                              <li key={appIndex} className="text-sm">• {app}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-3">Time Complexity:</h4>
                          <div className="space-y-1 text-sm">
                            <div><strong>Search:</strong> <code className="bg-white px-1 rounded">{type.complexity.search}</code></div>
                            <div><strong>Insert:</strong> <code className="bg-white px-1 rounded">{type.complexity.insert}</code></div>
                            <div><strong>Delete:</strong> <code className="bg-white px-1 rounded">{type.complexity.delete}</code></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'traversals' && (
            <motion.div
              key="traversals"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              {/* Tree Traversals */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                  <Search className="w-8 h-8 mr-3 text-purple-600" />
                  Tree Traversal Methods
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {treeTraversals.map((traversal, index) => {
                    const IconComponent = traversal.icon
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        className={`border-2 rounded-xl p-6 ${traversal.color} cursor-pointer transition-all duration-300 hover:shadow-lg`}
                        onClick={() => setSelectedTraversal(index)}
                      >
                        <div className="flex items-center mb-4">
                          <IconComponent className="w-8 h-8 mr-3 text-gray-700" />
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{traversal.name}</h3>
                            <div className="text-sm font-mono bg-white px-2 py-1 rounded text-gray-700">
                              {traversal.pattern}
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-4">{traversal.description}</p>
                        
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-semibold text-gray-900">Result:</h4>
                            <p className="text-sm text-gray-700">{traversal.result}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Example Output:</h4>
                            <code className="text-sm bg-white px-2 py-1 rounded text-gray-800">
                              {traversal.example}
                            </code>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Use Case:</h4>
                            <p className="text-sm text-gray-700">{traversal.useCase}</p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Traversal Visualization */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <Eye className="w-8 h-8 mr-3 text-teal-600" />
                  Traversal Visualization
                </h2>
                
                <div className="bg-teal-50 p-6 rounded-xl border border-teal-200">
                  <h3 className="text-xl font-semibold text-teal-900 mb-6 text-center">
                    Example Tree Structure
                  </h3>
                  
                  <div className="flex justify-center mb-8">
                    {/* Visual Tree */}
                    <div className="relative">
                      {/* Level 1 - Root */}
                      <div className="flex justify-center mb-8">
                        <div className="w-12 h-12 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                          1
                        </div>
                      </div>
                      
                      {/* Level 2 */}
                      <div className="flex justify-center space-x-24 mb-8">
                        <div className="w-12 h-12 bg-teal-400 text-white rounded-full flex items-center justify-center font-bold">
                          2
                        </div>
                        <div className="w-12 h-12 bg-teal-400 text-white rounded-full flex items-center justify-center font-bold">
                          3
                        </div>
                      </div>
                      
                      {/* Level 3 */}
                      <div className="flex justify-center space-x-8">
                        <div className="w-12 h-12 bg-teal-300 text-white rounded-full flex items-center justify-center font-bold">
                          4
                        </div>
                        <div className="w-12 h-12 bg-teal-300 text-white rounded-full flex items-center justify-center font-bold">
                          5
                        </div>
                        <div className="w-12 h-12 bg-teal-300 text-white rounded-full flex items-center justify-center font-bold">
                          6
                        </div>
                        <div className="w-12 h-12 bg-teal-300 text-white rounded-full flex items-center justify-center font-bold">
                          7
                        </div>
                      </div>
                      
                      {/* Connection Lines */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{zIndex: -1}}>
                        {/* Root to children */}
                        <line x1="50%" y1="24" x2="35%" y2="72" stroke="#14b8a6" strokeWidth="2"/>
                        <line x1="50%" y1="24" x2="65%" y2="72" stroke="#14b8a6" strokeWidth="2"/>
                        
                        {/* Level 2 to level 3 */}
                        <line x1="35%" y1="96" x2="25%" y2="144" stroke="#14b8a6" strokeWidth="2"/>
                        <line x1="35%" y1="96" x2="37%" y2="144" stroke="#14b8a6" strokeWidth="2"/>
                        <line x1="65%" y1="96" x2="63%" y2="144" stroke="#14b8a6" strokeWidth="2"/>
                        <line x1="65%" y1="96" x2="75%" y2="144" stroke="#14b8a6" strokeWidth="2"/>
                      </svg>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-teal-900 mb-3">Traversal Results:</h4>
                      <div className="space-y-2 font-mono text-sm">
                        <div className="bg-white p-2 rounded border">
                          <span className="text-blue-600">In-Order:</span> <span className="text-gray-800">4, 2, 5, 1, 6, 3, 7</span>
                        </div>
                        <div className="bg-white p-2 rounded border">
                          <span className="text-green-600">Pre-Order:</span> <span className="text-gray-800">1, 2, 4, 5, 3, 6, 7</span>
                        </div>
                        <div className="bg-white p-2 rounded border">
                          <span className="text-purple-600">Post-Order:</span> <span className="text-gray-800">4, 5, 2, 6, 7, 3, 1</span>
                        </div>
                        <div className="bg-white p-2 rounded border">
                          <span className="text-orange-600">Level-Order:</span> <span className="text-gray-800">1, 2, 3, 4, 5, 6, 7</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-teal-900 mb-3">Key Observations:</h4>
                      <ul className="space-y-2 text-teal-800 text-sm">
                        <li>• In-order visits nodes in ascending order for BST</li>
                        <li>• Pre-order processes root before children</li>
                        <li>• Post-order processes children before root</li>
                        <li>• Level-order processes level by level</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'bst' && (
            <motion.div
              key="bst"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              {/* BST Operations */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                  <Binary className="w-8 h-8 mr-3 text-blue-600" />
                  Binary Search Tree Operations
                </h2>
                
                <div className="space-y-8">
                  {bstOperations.map((op, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="grid lg:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-2xl font-bold text-blue-900 mb-3">{op.operation}</h3>
                          <p className="text-gray-700 mb-4">{op.description}</p>
                          
                          <div className="mb-4">
                            <div className="flex items-center">
                              <Clock className="w-5 h-5 text-green-600 mr-2" />
                              <span className="font-semibold">Time Complexity:</span>
                              <code className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                                {op.timeComplexity}
                              </code>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Algorithm Steps:</h4>
                            <ol className="space-y-1">
                              {op.steps.map((step, stepIndex) => (
                                <li key={stepIndex} className="text-sm text-gray-600 flex items-start">
                                  <span className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">
                                    {stepIndex + 1}
                                  </span>
                                  {step}
                                </li>
                              ))}
                            </ol>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Pseudocode:</h4>
                          <div className="bg-gray-800 text-green-400 p-4 rounded font-mono text-sm overflow-x-auto">
                            <pre className="whitespace-pre-wrap">{op.pseudocode}</pre>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'applications' && (
            <motion.div
              key="applications"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              {/* Tree Applications */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                  <Play className="w-8 h-8 mr-3 text-green-600" />
                  Real-World Tree Applications
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {treeApplications.map((app, index) => {
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
                            <h4 className="font-semibold">Benefits:</h4>
                            <ul className="text-sm space-y-1">
                              {app.benefits.map((benefit, benefitIndex) => (
                                <li key={benefitIndex} className="flex items-center">
                                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold">Implementation:</h4>
                            <p className="text-sm">{app.implementation}</p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
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
              {/* Common Tree Problems */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                  <Code className="w-8 h-8 mr-3 text-indigo-600" />
                  Common Tree Problems
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {treeProblems.map((problem, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold text-indigo-900">{problem.problem}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                            problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {problem.difficulty}
                          </span>
                        </div>
                        <p className="text-gray-700">{problem.description}</p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 text-green-600 mr-2" />
                            <span><strong>Time:</strong> {problem.timeComplexity}</span>
                          </div>
                          <div className="flex items-center">
                            <Database className="w-4 h-4 text-blue-600 mr-2" />
                            <span><strong>Space:</strong> {problem.spaceComplexity}</span>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900">Approach:</h4>
                          <p className="text-sm text-gray-600">{problem.approach}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900">Key Insight:</h4>
                          <p className="text-sm text-gray-600 italic">{problem.keyInsight}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900">Applications:</h4>
                          <ul className="text-sm text-gray-600">
                            {problem.applications.map((app, appIndex) => (
                              <li key={appIndex}>• {app}</li>
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
                  <Target className="w-8 h-8 mr-3 text-orange-600" />
                  Practice Exercises
                </h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: 'Tree Diameter', difficulty: 'Medium', description: 'Find longest path between any two nodes' },
                    { title: 'Symmetric Tree', difficulty: 'Easy', description: 'Check if tree is mirror of itself' },
                    { title: 'Level Order Zigzag', difficulty: 'Medium', description: 'Traverse levels alternating direction' },
                    { title: 'Serialize Tree', difficulty: 'Hard', description: 'Convert tree to string and back' },
                    { title: 'Merge Binary Trees', difficulty: 'Easy', description: 'Merge two trees by adding values' },
                    { title: 'Construct from Traversals', difficulty: 'Hard', description: 'Build tree from inorder/preorder' }
                  ].map((exercise, index) => (
                    <div key={index} className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200">
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
              href="/learning-path/module-5"
              className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 mr-2 rotate-180" />
              Previous: Module 5 - Stacks & Queues
            </Link>
            
            <Link 
              href="/learning-path/module-7"
              className="flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
            >
              Next: Module 7 - Hash Tables
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}