"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Play, 
  Clock, 
  Target, 
  ArrowRight, 
  Database,
  Grid3X3,
  Link as LinkIcon,
  Layers,
  GitBranch,
  Hash,
  Circle,
  Square
} from 'lucide-react';
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton';
import { ProgressIndicator } from '@/components/progress/ProgressIndicator';
import type { Metadata } from "next";

const dataStructures = [
  {
    id: 'arrays-overview',
    name: 'Arrays',
    description: 'Fixed-size sequential collection of elements stored in contiguous memory',
    path: '/data-structures/arrays',
    category: 'data-structures',
    color: 'bg-blue-500',
    icon: Grid3X3,
    timeComplexity: {
      access: 'O(1)',
      search: 'O(n)',
      insertion: 'O(n)',
      deletion: 'O(n)'
    },
    difficulty: 'Beginner',
    concepts: ['Indexing', 'Traversal', 'Memory Layout', 'Cache Locality']
  },
  {
    id: 'linked-lists-overview',
    name: 'Linked Lists',
    description: 'Dynamic linear data structure with nodes connected via pointers',
    path: '/data-structures/linked-lists',
    category: 'data-structures',
    color: 'bg-green-500',
    icon: LinkIcon,
    timeComplexity: {
      access: 'O(n)',
      search: 'O(n)',
      insertion: 'O(1)',
      deletion: 'O(1)'
    },
    difficulty: 'Beginner',
    concepts: ['Pointers', 'Dynamic Memory', 'Traversal', 'Node Manipulation']
  },
  {
    id: 'stacks-overview',
    name: 'Stacks',
    description: 'LIFO (Last In First Out) linear data structure with restricted access',
    path: '/data-structures/stacks',
    category: 'data-structures',
    color: 'bg-purple-500',
    icon: Layers,
    timeComplexity: {
      access: 'O(n)',
      search: 'O(n)',
      insertion: 'O(1)',
      deletion: 'O(1)'
    },
    difficulty: 'Beginner',
    concepts: ['LIFO Principle', 'Push/Pop', 'Function Calls', 'Expression Evaluation']
  },
  {
    id: 'queues-overview',
    name: 'Queues',
    description: 'FIFO (First In First Out) linear data structure for ordered processing',
    path: '/data-structures/queues',
    category: 'data-structures',
    color: 'bg-orange-500',
    icon: ArrowRight,
    timeComplexity: {
      access: 'O(n)',
      search: 'O(n)',
      insertion: 'O(1)',
      deletion: 'O(1)'
    },
    difficulty: 'Beginner',
    concepts: ['FIFO Principle', 'Enqueue/Dequeue', 'Circular Queue', 'Priority Queue']
  },
  {
    id: 'trees-overview',
    name: 'Trees',
    description: 'Hierarchical data structure with nodes connected in parent-child relationships',
    path: '/data-structures/trees',
    category: 'data-structures',
    color: 'bg-emerald-500',
    icon: GitBranch,
    timeComplexity: {
      access: 'O(log n)',
      search: 'O(log n)',
      insertion: 'O(log n)',
      deletion: 'O(log n)'
    },
    difficulty: 'Intermediate',
    concepts: ['Binary Trees', 'BST', 'Traversal', 'Balancing', 'Heap']
  },
  {
    id: 'graphs-overview',
    name: 'Graphs',
    description: 'Non-linear data structure with vertices connected by edges',
    path: '/data-structures/graphs',
    category: 'data-structures',
    color: 'bg-indigo-500',
    icon: Circle,
    timeComplexity: {
      access: 'O(V + E)',
      search: 'O(V + E)',
      insertion: 'O(1)',
      deletion: 'O(V + E)'
    },
    difficulty: 'Advanced',
    concepts: ['Vertices & Edges', 'Adjacency', 'BFS/DFS', 'Shortest Path']
  },
  {
    id: 'hash-tables-overview',
    name: 'Hash Tables',
    description: 'Key-value pairs with O(1) average access time using hash functions',
    path: '/data-structures/hash-tables',
    category: 'data-structures',
    color: 'bg-red-500',
    icon: Hash,
    timeComplexity: {
      access: 'O(1)',
      search: 'O(1)',
      insertion: 'O(1)',
      deletion: 'O(1)'
    },
    difficulty: 'Intermediate',
    concepts: ['Hash Functions', 'Collision Resolution', 'Load Factor', 'Probing']
  }
];

const features = [
  {
    icon: <Target className="h-8 w-8 text-gray-700" />,
    title: 'Interactive Learning',
    description: 'Theory, visualizations, and hands-on simulations for each structure'
  },
  {
    icon: <Clock className="h-8 w-8 text-gray-700" />,
    title: 'Complexity Analysis',
    description: 'Understand time and space complexity for optimal data structure choice'
  },
  {
    icon: <Play className="h-8 w-8 text-gray-700" />,
    title: 'Live Simulations',
    description: 'Watch operations execute step-by-step with visual animations'
  },
  {
    icon: <BookOpen className="h-8 w-8 text-gray-700" />,
    title: 'Real Applications',
    description: 'See how data structures solve real-world programming problems'
  }
];

const learningPath = [
  { name: 'Arrays & Linked Lists', description: 'Start with linear structures' },
  { name: 'Stacks & Queues', description: 'Learn restricted access patterns' },
  { name: 'Trees & Graphs', description: 'Master hierarchical structures' },
  { name: 'Hash Tables', description: 'Optimize with key-value storage' }
];

export default function DataStructuresPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-gray-700">
      <div className="container mx-auto px-4 py-20 text-gray-700">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-16 text-gray-700"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6">
            Master <span className="text-emerald-600">Data Structures</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed">
            Perfect for self-directed learners. Flexible exploration with self-paced learning, 
            any topic access, and instant visualization of concepts.
          </p>
          <div className="inline-flex items-center bg-emerald-100 text-emerald-800 px-6 py-3 rounded-full text-lg font-medium">
            <Database className="w-5 h-5 mr-2 text-gray-700" />
            ⚡ Perfect for Self-Directed Learners
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 text-gray-700"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 shadow-lg text-center hover:shadow-xl transition-shadow text-gray-700"
            >
              <div className="text-emerald-600 mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{feature.title}</h3>
              <p className="text-slate-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Flexible Exploration Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white rounded-xl p-8 shadow-lg mb-16 text-gray-700"
        >
          <h2 className="text-3xl font-bold text-slate-800 text-center mb-6">Flexible Exploration</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center text-gray-700">
            <div>
              <div className="text-4xl mb-4 text-gray-700">🎯</div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Self-paced</h3>
              <p className="text-slate-600">Learn at your own speed with no pressure</p>
            </div>
            <div>
              <div className="text-4xl mb-4 text-gray-700">📚</div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Any topic</h3>
              <p className="text-slate-600">Jump to any data structure that interests you</p>
            </div>
            <div>
              <div className="text-4xl mb-4 text-gray-700">⚡</div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Instant access</h3>
              <p className="text-slate-600">Deep-dive explanations with visualizations</p>
            </div>
          </div>
        </motion.div>

        {/* Available Topics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16 text-gray-700"
        >
          <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">Available Data Structures</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-gray-700">
            {dataStructures.map((structure, index) => {
              const IconComponent = structure.icon;
              return (
                <motion.div
                  key={structure.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden relative text-gray-700"
                >
                  <div className="absolute top-3 right-3 z-20 text-gray-700">
                    <BookmarkButton 
                      topicId={structure.id}
                      topicType="overview"
                      category={structure.category}
                      title={structure.name}
                      url={structure.path}
                    />
                  </div>
                  
                  <Link href={structure.path}>
                    <div className={`${structure.color} h-20 flex items-center justify-center`}>
                      <IconComponent className="w-8 h-8 text-white text-gray-700" />
                    </div>
                    
                    <div className="p-4 text-gray-700">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{structure.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{structure.description}</p>
                      <p className="text-gray-500 text-xs">{structure.difficulty}</p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* What You Get Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-16 text-gray-700"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-slate-800">What Each Topic Includes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center text-gray-700">
            <div className="p-4 text-gray-700">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-gray-700" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Deep-dive Theory</h3>
              <p className="text-slate-600 text-sm">Comprehensive explanations with real-world context</p>
            </div>
            <div className="p-4 text-gray-700">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Play className="w-6 h-6 text-gray-700" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Live Simulations</h3>
              <p className="text-slate-600 text-sm">Interactive visualizations of operations</p>
            </div>
            <div className="p-4 text-gray-700">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-gray-700" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Practice Problems</h3>
              <p className="text-slate-600 text-sm">Coding challenges for each concept</p>
            </div>
            <div className="p-4 text-gray-700">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <ArrowRight className="w-6 h-6 text-gray-700" />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Custom Sequences</h3>
              <p className="text-slate-600 text-sm">Build your own learning path</p>
            </div>
          </div>
        </motion.div>

        {/* Learning Path */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gradient-to-r from-lightblue to-blue-600 rounded-lg p-8 text-white text-center text-gray-700"
        >
          <h2 className="text-3xl font-bold mb-4 text-blue text-slate-800">Recommended Learning Path</h2>
          <p className="text-xl mb-8 opacity-90 text-blue text-gray-700">
            Start with fundamental structures, then progress to advanced topics
          </p>
          <div className="flex flex-wrap justify-center gap-4 items-center text-gray-700">
            {learningPath.map((step, index) => (
              <div key={index} className="flex items-center text-gray-700">
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-center text-gray-700">
                  <div className="font-semibold text-sm text-blue-500">{step.name}</div>
                  <div className="text-xs opacity-80 text-black text-gray-600">{step.description}</div>
                </div>
                {index < learningPath.length - 1 && (
                  <ArrowRight className="h-6 w-6 mx-2 opacity-70 text-gray-700" />
                )}
              </div>
            ))}
          </div>
          <div className="mt-8 text-gray-700">
            <Link href="/data-structures/arrays" className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start with Arrays →
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}