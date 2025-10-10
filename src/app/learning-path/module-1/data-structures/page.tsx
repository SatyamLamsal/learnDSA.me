'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { EnhancedModuleLayout } from '@/components/layouts/EnhancedModuleLayout';
import { ProgressIndicator } from '@/components/progress/ProgressIndicator';
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton';
import { 
  ArrowLeft,
  Database,
  Search,
  Grid3X3,
  Link as LinkIcon,
  TreePine,
  Hash,
  Clock,
  Gauge,
  MemoryStick,
  Users,
  Zap,
  CheckCircle,
  TrendingUp,
  Activity,
  Target,
  ChevronRight,
  Layers
} from 'lucide-react';

export default function DataStructuresPage() {
  const [selectedProblem, setSelectedProblem] = useState(0);

  const problemSolutions = [
    {
      problem: "Finding a Contact in Phone Book",
      description: "You have 1 million contacts and need to find one quickly",
      icon: Users,
      color: "blue",
      solutions: [
        {
          name: "Unsorted Array",
          approach: "Check every contact one by one",
          timeComplexity: "O(n)",
          realWorldTime: "Up to 1 million checks",
          pros: ["Simple to implement", "No extra memory"],
          cons: ["Extremely slow for large datasets", "Worst case very bad"],
          visualization: "📞 📞 📞 ... 📞 ✅ (found after checking many)"
        },
        {
          name: "Sorted Array + Binary Search",  
          approach: "Keep contacts sorted, search by dividing in half",
          timeComplexity: "O(log n)",
          realWorldTime: "At most 20 checks",
          pros: ["Much faster searches", "Space efficient"],
          cons: ["Must keep sorted", "Insertion is slow"],
          visualization: "📞📞📞📞 → 📞📞 → 📞 ✅ (found by halving)"
        },
        {
          name: "Hash Table",
          approach: "Use name as key to directly compute location", 
          timeComplexity: "O(1)",
          realWorldTime: "Usually 1 check",
          pros: ["Ultra fast lookups", "Fast insertion"],
          cons: ["Extra memory overhead", "Hash collisions possible"],
          visualization: "John → hash(John) → location[142] ✅ (direct access)"
        }
      ]
    },
    {
      problem: "Managing Company Hierarchy",
      description: "Represent CEO, VPs, managers, and employees efficiently",
      icon: TreePine,
      color: "green",
      solutions: [
        {
          name: "Flat Array",
          approach: "Store all employees in a single array",
          timeComplexity: "O(n)",
          realWorldTime: "Scan all employees to find reports",
          pros: ["Simple structure", "Memory efficient"],
          cons: ["No hierarchy representation", "Slow hierarchy operations"],
          visualization: "[CEO, VP1, VP2, Mgr1, Emp1, Emp2, ...] (no structure)"
        },
        {
          name: "Tree Structure",
          approach: "Each person has references to their direct reports",
          timeComplexity: "O(h)",
          realWorldTime: "Traverse down hierarchy levels",
          pros: ["Natural hierarchy", "Fast traversal", "Easy org chart generation"],
          cons: ["More complex", "Pointer overhead"],
          visualization: "CEO → [VP1, VP2] → [Mgr1, Mgr2] → [Emp1, Emp2] (tree structure)"
        }
      ]
    },
    {
      problem: "Browser History",
      description: "Implement back/forward buttons and track visited pages",
      icon: Database,
      color: "purple", 
      solutions: [
        {
          name: "Simple Array",
          approach: "Store all pages in order, track current position",
          timeComplexity: "O(1)",
          realWorldTime: "Instant access",
          pros: ["Simple implementation", "Fast access"],
          cons: ["Limited memory", "Fixed size"],
          visualization: "[page1, page2, page3] ← current (array with pointer)"
        },
        {
          name: "Stack for Back History",
          approach: "Push new pages, pop for back button",
          timeComplexity: "O(1)", 
          realWorldTime: "Instant push/pop",
          pros: ["Natural back operation", "Dynamic size"],
          cons: ["No forward button support", "One direction only"],
          visualization: "Stack: [page1, page2, page3] ← top (LIFO for back)"
        },
        {
          name: "Doubly Linked List",
          approach: "Each page links to previous and next",
          timeComplexity: "O(1)",
          realWorldTime: "Instant navigation",
          pros: ["Full back/forward", "Dynamic", "Memory efficient"],
          cons: ["More complex pointers", "Implementation complexity"],
          visualization: "page1 ↔ page2 ↔ page3 ← current (bidirectional links)"
        }
      ]
    },
    {
      problem: "Task Priority Management", 
      description: "Always process the highest priority task first",
      icon: TrendingUp,
      color: "orange",
      solutions: [
        {
          name: "Unsorted Array",
          approach: "Add tasks anywhere, scan for highest priority",
          timeComplexity: "O(n)",
          realWorldTime: "Scan all tasks each time", 
          pros: ["Simple to add tasks", "No sorting overhead"],
          cons: ["Slow to find max priority", "Inefficient processing"],
          visualization: "[P3, P1, P5, P2] → scan all → P5 (find max each time)"
        },
        {
          name: "Sorted Array",
          approach: "Keep tasks sorted by priority",
          timeComplexity: "O(n) insert, O(1) max",
          realWorldTime: "Fast max, slow insertion",
          pros: ["Fast max extraction", "Always sorted"],
          cons: ["Slow insertion", "Must shift elements"],
          visualization: "[P5, P3, P2, P1] → P5 (max at front, but insertion is slow)"
        },
        {
          name: "Heap (Priority Queue)",
          approach: "Tree structure maintaining heap property",
          timeComplexity: "O(log n)",
          realWorldTime: "Fast both insertion and extraction",
          pros: ["Fast insertion AND extraction", "Dynamic size"],
          cons: ["More complex structure", "Not fully sorted"],
          visualization: "Heap tree: P5 at root, O(log n) to maintain (balanced efficiency)"
        }
      ]
    }
  ];

  const dataStructureOverview = [
    {
      name: "Array",
      purpose: "Store elements in contiguous memory",
      bestFor: "Random access, cache performance, simple iteration",
      weakAt: "Dynamic sizing, insertion/deletion in middle", 
      realWorld: "Image pixels, audio samples, game grids",
      icon: Grid3X3,
      color: "blue"
    },
    {
      name: "Linked List", 
      purpose: "Dynamic collection with flexible insertion",
      bestFor: "Dynamic sizing, frequent insertion/deletion",
      weakAt: "Random access, cache performance, extra memory",
      realWorld: "Music playlist, undo operations, memory management",
      icon: LinkIcon,
      color: "green" 
    },
    {
      name: "Stack",
      purpose: "Last-In-First-Out (LIFO) access pattern",
      bestFor: "Function calls, undo operations, parsing",
      weakAt: "Random access, searching, middle insertion",
      realWorld: "Browser back button, function call stack, calculator",
      icon: Database,
      color: "purple"
    },
    {
      name: "Queue", 
      purpose: "First-In-First-Out (FIFO) access pattern",
      bestFor: "Task scheduling, buffering, breadth-first search", 
      weakAt: "Random access, searching, middle access",
      realWorld: "Print queue, CPU scheduling, customer service",
      icon: Users,
      color: "orange"
    },
    {
      name: "Hash Table",
      purpose: "Key-value mapping with fast lookup",
      bestFor: "Fast lookups, caching, counting",
      weakAt: "Ordering, range queries, memory overhead",
      realWorld: "Database indexes, caches, dictionaries",
      icon: Hash,
      color: "red"
    },
    {
      name: "Tree",
      purpose: "Hierarchical organization of data", 
      bestFor: "Hierarchies, searching, representing decisions",
      weakAt: "Simple linear operations, cache performance",
      realWorld: "File systems, org charts, decision trees",
      icon: TreePine,
      color: "teal"
    }
  ];

  return (
    <EnhancedModuleLayout
      moduleId="module-1"
      moduleTitle="Module 1: Memory & Efficiency"
      moduleDescription="Understand why data structures matter through memory systems"
      sections={[
        { id: 'memory-hierarchy', name: 'Memory Hierarchy', icon: Layers, href: '/learning-path/module-1/memory-hierarchy' },
        { id: 'performance', name: 'Performance Impact', icon: Gauge, href: '/learning-path/module-1/performance' },
        { id: 'data-structures', name: 'Data Structures Overview', icon: Database, href: '/learning-path/module-1/data-structures' },
        { id: 'efficiency', name: 'Efficiency Principles', icon: Target, href: '/learning-path/module-1/efficiency' }
      ]}
      activeSection="data-structures"
      backUrl="/learning-path/module-1"
      estimatedTime="30 minutes"
      difficulty="Beginner"
      totalSections={4}
      currentPath="/learning-path/module-1/data-structures"
      showFullCourseStructure={true}
      enableScrollSpy={true}
    >
        {/* Header */}
        <div className="mb-8 text-gray-700">
          <Link 
            href="/learning-path/module-1" 
            className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2 text-gray-700" />
            Back to Module 1
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 text-gray-700"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Why Do Data Structures Exist?
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Data structures aren&apos;t academic concepts - they&apos;re practical solutions to real-world problems
            </p>
          </motion.div>
        </div>

        {/* Interactive Problem-Solution Explorer */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border mb-8 text-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Target className="w-7 h-7 mr-3 text-indigo-600" />
            Real Problems, Real Solutions
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-6 text-gray-700">
            {/* Problem Selector */}
            <div className="space-y-3 text-gray-700">
              <h3 className="font-semibold text-gray-900 mb-4">Choose a Problem:</h3>
              {problemSolutions.map((problem, index) => (
                <motion.button
                  key={index}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    selectedProblem === index
                      ? `border-${problem.color}-500 bg-${problem.color}-50`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedProblem(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3 text-gray-700">
                    <problem.icon className={`w-6 h-6 ${
                      selectedProblem === index ? `text-${problem.color}-600` : 'text-gray-500'
                    }`} />
                    <div>
                      <div className={`font-semibold ${
                        selectedProblem === index ? `text-${problem.color}-900` : 'text-gray-900'
                      }`}>
                        {problem.problem}
                      </div>
                      <div className={`text-sm ${
                        selectedProblem === index ? `text-${problem.color}-700` : 'text-gray-600'
                      }`}>
                        {problem.description}
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Solutions Comparison */}
            <div className="lg:col-span-2 text-gray-700">
              <h3 className="font-semibold text-gray-900 mb-4">Solutions Comparison:</h3>
              <div className="space-y-6 text-gray-700">
                {problemSolutions[selectedProblem].solutions.map((solution, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`border-2 border-${problemSolutions[selectedProblem].color}-200 bg-${problemSolutions[selectedProblem].color}-50 p-6 rounded-xl`}
                  >
                    <div className="flex items-start justify-between mb-4 text-gray-700">
                      <div>
                        <h4 className={`text-lg font-bold text-${problemSolutions[selectedProblem].color}-900`}>
                          {solution.name}
                        </h4>
                        <p className={`text-${problemSolutions[selectedProblem].color}-700`}>
                          {solution.approach}
                        </p>
                      </div>
                      <div className="text-right text-gray-700">
                        <div className={`font-mono font-bold text-${problemSolutions[selectedProblem].color}-800`}>
                          {solution.timeComplexity}
                        </div>
                        <div className={`text-sm text-${problemSolutions[selectedProblem].color}-600`}>
                          Time Complexity
                        </div>
                      </div>
                    </div>

                    <div className={`bg-white p-3 rounded-lg border border-${problemSolutions[selectedProblem].color}-200 mb-4`}>
                      <div className="font-mono text-sm text-gray-700">
                        {solution.visualization}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                      <div>
                        <h5 className={`font-semibold text-${problemSolutions[selectedProblem].color}-900 mb-2`}>
                          ✅ Advantages:
                        </h5>
                        <ul className={`space-y-1 text-sm text-${problemSolutions[selectedProblem].color}-800`}>
                          {solution.pros.map((pro, idx) => (
                            <li key={idx} className="flex items-start text-gray-700">
                              <CheckCircle className="w-4 h-4 mr-1 mt-0.5 text-green-500" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className={`font-semibold text-${problemSolutions[selectedProblem].color}-900 mb-2`}>
                          ❌ Disadvantages:
                        </h5>
                        <ul className={`space-y-1 text-sm text-${problemSolutions[selectedProblem].color}-800`}>
                          {solution.cons.map((con, idx) => (
                            <li key={idx} className="flex items-start text-gray-700">
                              <span className="w-4 h-4 mr-1 mt-0.5 text-red-500">×</span>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className={`mt-4 p-3 bg-${problemSolutions[selectedProblem].color}-100 rounded-lg`}>
                      <strong>Real-world performance:</strong> {solution.realWorldTime}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Data Structure Overview */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border mb-8 text-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Database className="w-7 h-7 mr-3 text-green-600" />
            Data Structure Overview
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700">
            {dataStructureOverview.map((ds, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-${ds.color}-50 p-6 rounded-xl border-2 border-${ds.color}-200 hover:shadow-lg transition-all`}
              >
                <div className="flex items-center mb-4 text-gray-700">
                  <div className={`w-12 h-12 bg-${ds.color}-500 text-white rounded-full flex items-center justify-center mr-4`}>
                    <ds.icon className="w-6 h-6 text-gray-700" />
                  </div>
                  <h3 className={`text-xl font-bold text-${ds.color}-900`}>{ds.name}</h3>
                </div>

                <div className="space-y-3 text-gray-700">
                  <div>
                    <h4 className={`font-semibold text-${ds.color}-900 text-sm`}>Purpose:</h4>
                    <p className={`text-${ds.color}-800 text-sm`}>{ds.purpose}</p>
                  </div>

                  <div>
                    <h4 className={`font-semibold text-${ds.color}-900 text-sm`}>Best For:</h4>
                    <p className={`text-${ds.color}-700 text-sm`}>{ds.bestFor}</p>
                  </div>

                  <div>
                    <h4 className={`font-semibold text-${ds.color}-900 text-sm`}>Weak At:</h4>
                    <p className={`text-${ds.color}-700 text-sm`}>{ds.weakAt}</p>
                  </div>

                  <div className={`bg-white p-3 rounded-lg border border-${ds.color}-200`}>
                    <h4 className={`font-semibold text-${ds.color}-900 text-sm mb-1`}>Examples:</h4>
                    <p className={`text-${ds.color}-800 text-xs`}>{ds.realWorld}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* The Big Picture */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border text-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="w-7 h-7 mr-3 text-blue-600" />
            The Big Picture: It&apos;s All About Trade-offs
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8 text-gray-700">
            <div className="space-y-6 text-gray-700">
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 text-white">
                <h3 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
                  <Clock className="w-6 h-6 mr-2 text-gray-700" />
                  Time Complexity Trade-offs
                </h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex justify-between items-center p-2 bg-white rounded border text-gray-700">
                    <span className="text-blue-800">Array access:</span>
                    <code className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">O(1)</code>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white rounded border text-gray-700">
                    <span className="text-blue-800">Binary search:</span>
                    <code className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">O(log n)</code>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white rounded border text-gray-700">
                    <span className="text-blue-800">Linear search:</span>
                    <code className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">O(n)</code>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white rounded border text-gray-700">
                    <span className="text-blue-800">Nested loops:</span>
                    <code className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">O(n²)</code>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-xl border border-green-200 text-gray-700">
                <h3 className="text-xl font-semibold text-green-900 mb-4 flex items-center">
                  <MemoryStick className="w-6 h-6 mr-2 text-gray-700" />
                  Space Complexity Trade-offs
                </h3>
                <div className="space-y-2 text-green-800 text-sm">
                  <p><strong>Arrays:</strong> Minimal overhead, contiguous memory</p>
                  <p><strong>Linked Lists:</strong> Extra pointers, scattered memory</p> 
                  <p><strong>Hash Tables:</strong> Load factor affects memory usage</p>
                  <p><strong>Trees:</strong> Pointer overhead, but balanced access</p>
                </div>
              </div>
            </div>

            <div className="space-y-6 text-gray-700">
              <div className="bg-purple-50 p-6 rounded-xl border border-purple-200 text-gray-700">
                <h3 className="text-xl font-semibold text-purple-900 mb-4 flex items-center">
                  <Gauge className="w-6 h-6 mr-2 text-gray-700" />
                  Performance Characteristics
                </h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="bg-white p-3 rounded border text-gray-700">
                    <strong className="text-purple-900">Cache Performance:</strong>
                    <div className="text-purple-700 mt-1">
                      Arrays {'>'} Trees {'>'} Hash Tables {'>'} Linked Lists
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded border text-gray-700">
                    <strong className="text-purple-900">Insertion Speed:</strong>
                    <div className="text-purple-700 mt-1">
                      Hash Tables {'>'} Linked Lists {'>'} Trees {'>'} Arrays (middle)
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded border text-gray-700">
                    <strong className="text-purple-900">Search Speed:</strong>
                    <div className="text-purple-700 mt-1">
                      Hash Tables {'>'} Sorted Arrays {'>'} Trees {'>'} Unsorted
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 p-6 rounded-xl border border-orange-200 text-gray-700">
                <h3 className="text-xl font-semibold text-orange-900 mb-4">Key Insight</h3>
                <p className="text-orange-800 leading-relaxed">
                  <strong>There&apos;s no &quot;perfect&quot; data structure.</strong> Each one optimizes for specific 
                  operations at the cost of others. The art is choosing the right tool for your specific 
                  use case based on what operations you do most frequently.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200 text-white">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Questions to Ask When Choosing</h3>
            <div className="grid md:grid-cols-2 gap-6 text-gray-700">
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start text-gray-700">
                  <CheckCircle className="w-5 h-5 mr-2 mt-0.5 text-indigo-600" />
                  What operations do you do most frequently?
                </li>
                <li className="flex items-start text-gray-700">
                  <CheckCircle className="w-5 h-5 mr-2 mt-0.5 text-indigo-600" />
                  Do you know the size in advance?
                </li>
                <li className="flex items-start text-gray-700">
                  <CheckCircle className="w-5 h-5 mr-2 mt-0.5 text-indigo-600" />
                  Is memory usage a concern?
                </li>
              </ul>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start text-gray-700">
                  <CheckCircle className="w-5 h-5 mr-2 mt-0.5 text-indigo-600" />
                  Do you need to maintain order?
                </li>
                <li className="flex items-start text-gray-700">
                  <CheckCircle className="w-5 h-5 mr-2 mt-0.5 text-indigo-600" />
                  Are cache misses expensive?
                </li>
                <li className="flex items-start text-gray-700">
                  <CheckCircle className="w-5 h-5 mr-2 mt-0.5 text-indigo-600" />
                  Is implementation complexity important?
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex justify-between items-center mt-12"
        >
          <Link
            href="/learning-path/module-1/memory-hierarchy"
            className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Previous: Memory Hierarchy
          </Link>
          <Link
            href="/learning-path/module-1/performance"
            className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Next: Performance Impact
            <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
    </EnhancedModuleLayout>
  );
}