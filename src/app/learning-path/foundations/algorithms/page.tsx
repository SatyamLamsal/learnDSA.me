'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Brain, 
  Target, 
  GitBranch, 
  Database, 
  Search, 
  ArrowDown, 
  TreePine,
  CheckCircle,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import { ModuleLayout } from '@/components/layouts/ModuleLayout';
import { ProgressIndicator } from '@/components/progress/ProgressIndicator';
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton';
import { SectionProgressIndicator } from '@/components/progress/SectionProgressIndicator';

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
];

export default function FoundationsAlgorithmsPage() {
  const [activeSection, setActiveSection] = useState('definition');

  const sections = [
    { id: 'definition', name: 'What is an Algorithm?', icon: Code },
    { id: 'criteria', name: 'Algorithm Criteria', icon: CheckCircle },
    { id: 'paradigms', name: 'Design Paradigms', icon: Brain },
  ];

  return (
    <ModuleLayout
      moduleId="foundations"
      moduleTitle="Foundations"
      moduleDescription="Jump to any section"
      sections={sections}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      backUrl="/learning-path/foundations"
      estimatedTime="20-25 minutes"
      difficulty="Intermediate"
      totalSections={5}
      currentSectionIndex={2}
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
            topicId="foundations-algorithms" 
            topicType="foundations"
            category="learning-path"
          />
          <BookmarkButton 
            topicId="foundations-algorithms"
            topicType="foundations"
            title="Algorithm Design Paradigms"
            category="learning-path"
            url="/learning-path/foundations/algorithms"
          />
        </div>
        
        <div className="inline-flex items-center bg-blue-100 text-blue-800 px-6 py-3 rounded-full text-sm font-medium mb-8">
          <Code className="w-5 h-5 mr-2 text-gray-700" />
          Chapter 3: Algorithm Design and Problem Solving
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-8">
          Algorithm Design
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-gray-600">
            Paradigms
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Master the essential algorithm design techniques that form the backbone of computer science. 
          Learn when and how to apply different paradigms to solve complex computational problems efficiently.
        </p>
      </motion.div>

      {/* Algorithm Definition */}
      <div id="definition" className="bg-white rounded-2xl p-8 shadow-lg border mb-12 text-gray-700">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <Code className="w-8 h-8 mr-3 text-green-600" />
          What is an Algorithm?
        </h2>
        
        <div className="bg-green-50 p-6 rounded-xl border border-green-200 mb-8 text-gray-700">
          <p className="text-lg text-green-900 leading-relaxed mb-4">
            An <strong>algorithm</strong> is a step-by-step finite set of instructions to solve a 
            well-defined computational problem. It is a precise plan for performing a sequence of actions.
          </p>
          
          <div className="bg-white p-4 rounded-lg text-gray-700">
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
      </div>

      {/* Algorithm Criteria */}
      <div id="criteria" className="bg-white rounded-2xl p-8 shadow-lg border mb-12 text-gray-700">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <CheckCircle className="w-8 h-8 mr-3 text-blue-600" />
          Essential Algorithm Criteria
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 text-gray-700">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Essential Criteria:</h3>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start space-x-3 text-gray-700">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Input</h4>
                  <p className="text-gray-600">Zero or more quantities externally supplied</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-gray-700">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Output</h4>
                  <p className="text-gray-600">At least one quantity is produced</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-gray-700">
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
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start space-x-3 text-gray-700">
                <CheckCircle className="w-6 h-6 text-blue-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Finiteness</h4>
                  <p className="text-gray-600">Algorithm terminates after finite steps for all cases</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-gray-700">
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
      <div id="paradigms" className="bg-white rounded-2xl p-8 shadow-lg border mb-12 text-gray-700">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
          <Brain className="w-8 h-8 mr-3 text-purple-600" />
          Algorithm Design Techniques
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8 text-gray-700">
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
                <div className="flex items-center mb-4 text-gray-700">
                  <IconComponent className="w-8 h-8 mr-3 text-gray-700" />
                  <h3 className="text-xl font-bold text-gray-800">{technique.name}</h3>
                </div>
                
                <p className="mb-4 leading-relaxed text-gray-700">{technique.description}</p>
                
                <div className="space-y-3 text-gray-700">
                  <div>
                    <h4 className="font-semibold text-gray-800">Example:</h4>
                    <p className="text-sm text-gray-600">{technique.example}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">When to Use:</h4>
                    <p className="text-sm text-gray-600">{technique.useCase}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="flex justify-between items-center mt-12 text-gray-700"
      >
        <Link
          href="/learning-path/foundations/data-structures"
          className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700"
        >
          <ArrowLeft className="w-5 h-5 mr-2 text-gray-700" />
          Previous: Data Structures
        </Link>
        <Link
          href="/learning-path/foundations/complexity"
          className="flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold text-gray-100"
        >
          Next: Complexity Analysis
          <ChevronRight className="w-6 h-6 ml-2 text-gray-700" />
        </Link>
      </motion.div>
    </ModuleLayout>
  );
}