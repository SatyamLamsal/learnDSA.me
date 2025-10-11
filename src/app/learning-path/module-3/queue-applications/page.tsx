'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Target, 
  Info, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Package,
  ChevronRight,
  Code,
  Play,
  RotateCcw,
  Settings,
  Star,
  Shuffle,
  RefreshCw,
  ArrowUpDown,
  Network,
  Cpu,
  Globe,
  Database,
  Users,
  Clock,
  Calendar,
  Printer,
  Download,
  Upload
} from 'lucide-react';
import Link from 'next/link';
import { EnhancedModuleLayout } from '@/components/layouts/EnhancedModuleLayout';
import { ProgressIndicator } from '@/components/progress/ProgressIndicator';
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton';
import { SectionProgressIndicator } from '@/components/progress/SectionProgressIndicator';

export default function QueueApplicationsPage() {
  const [activeSection, setActiveSection] = useState('bfs-traversal');
  const [bfsStep, setBfsStep] = useState(0);
  const [taskQueueStep, setTaskQueueStep] = useState(0);

  const sections = [
    { id: 'bfs-traversal', name: 'BFS Traversal', icon: Network },
    { id: 'task-scheduling', name: 'Task Scheduling', icon: Clock },
    { id: 'buffer-management', name: 'Buffer Management', icon: Database },
    { id: 'real-world-systems', name: 'Real-World Systems', icon: Globe },
  ];

  const bfsSteps = [
    { node: 'A', queue: ['A'], visited: [], description: 'Start with node A in queue' },
    { node: 'A', queue: ['B', 'C'], visited: ['A'], description: 'Visit A, add neighbors B and C to queue' },
    { node: 'B', queue: ['C', 'D', 'E'], visited: ['A', 'B'], description: 'Visit B, add neighbors D and E to queue' },
    { node: 'C', queue: ['D', 'E', 'F'], visited: ['A', 'B', 'C'], description: 'Visit C, add neighbor F to queue' },
    { node: 'D', queue: ['E', 'F'], visited: ['A', 'B', 'C', 'D'], description: 'Visit D (no new neighbors)' },
    { node: 'E', queue: ['F'], visited: ['A', 'B', 'C', 'D', 'E'], description: 'Visit E (no new neighbors)' },
    { node: 'F', queue: [], visited: ['A', 'B', 'C', 'D', 'E', 'F'], description: 'Visit F, queue empty, BFS complete' },
  ];

  const taskSchedulingSteps = [
    { tasks: ['High Priority Task'], queue: ['Task A', 'Task B', 'Task C'], description: 'High priority task preempts current queue' },
    { tasks: ['Task A'], queue: ['Task B', 'Task C', 'Task D'], description: 'Process Task A, new Task D arrives' },
    { tasks: ['Task B'], queue: ['Task C', 'Task D', 'Task E'], description: 'Process Task B, new Task E arrives' },
    { tasks: ['Task C'], queue: ['Task D', 'Task E'], description: 'Process Task C from queue' },
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
      currentPath="/learning-path/module-3/queue-applications"
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
            topicId="queue-applications" 
            topicType="stacks-queues"
            category="learning-path"
          />
          <BookmarkButton 
            topicId="queue-applications"
            topicType="stacks-queues"
            title="Queue Applications"
            category="learning-path"
            url="/learning-path/module-3/queue-applications"
          />
        </div>
        
        <div className="inline-flex items-center bg-indigo-100 text-indigo-800 px-6 py-3 rounded-full text-sm font-medium mb-8">
          <Globe className="w-5 h-5 mr-2" />
          Lesson 6: Queue Applications in Real World
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-8">
          Queue
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
            Applications
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Discover how queues power the systems around us: from graph algorithms like BFS 
          to task scheduling, buffer management, and network protocols. See FIFO in action 
          across computer science and everyday technology.
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
              <Network className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">BFS Algorithm</h3>
                <p className="text-sm text-gray-600">Level-by-level graph traversal</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">Task Scheduling</h3>
                <p className="text-sm text-gray-600">Fair resource allocation</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Database className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">Buffer Management</h3>
                <p className="text-sm text-gray-600">Data flow control</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Globe className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">System Design</h3>
                <p className="text-sm text-gray-600">Real-world implementations</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* BFS Traversal */}
      <div id="bfs-traversal" className="bg-white rounded-2xl p-8 shadow-lg border mb-12 text-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <Network className="w-8 h-8 mr-3 text-blue-600" />
            Breadth-First Search (BFS)
          </h2>
          <SectionProgressIndicator 
            moduleId="module-3"
            sectionId="bfs-traversal"
          />
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <p className="text-gray-600 text-lg leading-relaxed">
              BFS explores a graph level by level, visiting all neighbors of a node before moving to the next level. 
              This systematic approach relies on a queue to maintain the order of exploration.
            </p>
            
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-3">BFS Algorithm Steps:</h4>
              <div className="space-y-2 text-blue-800 text-sm">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mr-3">1</div>
                  <span>Start with initial node in queue</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mr-3">2</div>
                  <span>Dequeue a node and mark as visited</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mr-3">3</div>
                  <span>Add all unvisited neighbors to queue</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mr-3">4</div>
                  <span>Repeat until queue is empty</span>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-6 rounded-xl border border-green-200">
              <h4 className="font-semibold text-green-900 mb-3">Why Use a Queue?</h4>
              <div className="text-green-800 text-sm space-y-2">
                <div>• <strong>FIFO ensures level-order:</strong> Nodes added first are processed first</div>
                <div>• <strong>Guarantees shortest path:</strong> In unweighted graphs</div>
                <div>• <strong>Systematic exploration:</strong> Never misses a closer node</div>
                <div>• <strong>Memory efficient:</strong> Only stores current level + next level</div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
              <h4 className="font-semibold text-yellow-900 mb-3">BFS Applications:</h4>
              <div className="text-yellow-800 text-sm space-y-1">
                <div>• Shortest path in unweighted graphs</div>
                <div>• Connected components detection</div>
                <div>• Social network analysis (degrees of separation)</div>
                <div>• Web crawling and sitemap generation</div>
                <div>• GPS navigation systems</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-4">Interactive BFS Simulation</h4>
            
            {/* Graph visualization */}
            <div className="bg-white p-4 rounded border mb-4">
              <div className="relative h-48">
                {/* Nodes */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">A</div>
                <div className="absolute top-16 left-8 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center font-bold">B</div>
                <div className="absolute top-16 right-8 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center font-bold">C</div>
                <div className="absolute bottom-16 left-4 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center font-bold">D</div>
                <div className="absolute bottom-16 left-12 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center font-bold">E</div>
                <div className="absolute bottom-16 right-4 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center font-bold">F</div>
                
                {/* Edges - simplified representation */}
                <svg className="absolute inset-0 w-full h-full" style={{zIndex: -1}}>
                  <line x1="50%" y1="20" x2="20%" y2="70" stroke="#e5e7eb" strokeWidth="2"/>
                  <line x1="50%" y1="20" x2="80%" y2="70" stroke="#e5e7eb" strokeWidth="2"/>
                  <line x1="20%" y1="70" x2="15%" y2="130" stroke="#e5e7eb" strokeWidth="2"/>
                  <line x1="20%" y1="70" x2="35%" y2="130" stroke="#e5e7eb" strokeWidth="2"/>
                  <line x1="80%" y1="70" x2="85%" y2="130" stroke="#e5e7eb" strokeWidth="2"/>
                </svg>
              </div>
            </div>
            
            {/* Current step info */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-blue-900">Step {bfsStep + 1} of {bfsSteps.length}</span>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setBfsStep(Math.max(0, bfsStep - 1))}
                    className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                    disabled={bfsStep === 0}
                  >
                    ←
                  </button>
                  <button 
                    onClick={() => setBfsStep(Math.min(bfsSteps.length - 1, bfsStep + 1))}
                    className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                    disabled={bfsStep === bfsSteps.length - 1}
                  >
                    →
                  </button>
                </div>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <div className="text-sm text-gray-800 mb-2">{bfsSteps[bfsStep].description}</div>
                <div className="flex justify-between text-xs">
                  <div>
                    <strong>Queue:</strong> [{bfsSteps[bfsStep].queue.join(', ')}]
                  </div>
                  <div>
                    <strong>Visited:</strong> [{bfsSteps[bfsStep].visited.join(', ')}]
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-100 p-3 rounded border border-blue-300">
                <div className="font-bold text-blue-800 mb-1">BFS Code Template:</div>
                <div className="font-mono text-xs space-y-1 text-blue-700">
                  <div>function bfs(graph, start) {`{`}</div>
                  <div className="ml-2">const queue = [start];</div>
                  <div className="ml-2">const visited = new Set();</div>
                  <div className="ml-2">while (queue.length {'>'} 0) {`{`}</div>
                  <div className="ml-4">const node = queue.shift();</div>
                  <div className="ml-4">if (!visited.has(node)) {`{`}</div>
                  <div className="ml-6">visited.add(node);</div>
                  <div className="ml-6">// Process node</div>
                  <div className="ml-6">queue.push(...neighbors);</div>
                  <div className="ml-4">{`}`}</div>
                  <div className="ml-2">{`}`}</div>
                  <div>{`}`}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Task Scheduling */}
      <div id="task-scheduling" className="bg-white rounded-2xl p-8 shadow-lg border mb-12 text-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <Clock className="w-8 h-8 mr-3 text-green-600" />
            Task Scheduling & Process Management
          </h2>
          <SectionProgressIndicator 
            moduleId="module-3"
            sectionId="task-scheduling"
          />
        </div>
        
        <div className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <p className="text-gray-600 text-lg leading-relaxed">
                Operating systems use queues to manage processes and ensure fair resource allocation. 
                Tasks are scheduled in FIFO order, with different priority levels handled by separate queues.
              </p>
              
              <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                <h4 className="font-semibold text-green-900 mb-3">CPU Scheduling Types:</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center p-2 bg-white rounded border">
                    <span className="font-medium">First-Come, First-Served (FCFS)</span>
                    <span className="text-green-600 text-xs">Simple Queue</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white rounded border">
                    <span className="font-medium">Round Robin</span>
                    <span className="text-green-600 text-xs">Circular Queue</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white rounded border">
                    <span className="font-medium">Priority Scheduling</span>
                    <span className="text-green-600 text-xs">Priority Queue</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white rounded border">
                    <span className="font-medium">Multi-level Queue</span>
                    <span className="text-green-600 text-xs">Multiple Queues</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-3">Queue Benefits in Scheduling:</h4>
                <div className="text-blue-800 text-sm space-y-2">
                  <div>• <strong>Fairness:</strong> First-come, first-served principle</div>
                  <div>• <strong>Predictability:</strong> Known order of execution</div>
                  <div>• <strong>Starvation Prevention:</strong> Every task gets a turn</div>
                  <div>• <strong>Easy Implementation:</strong> Simple data structure</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
              <h4 className="font-semibold text-green-900 mb-4">Task Scheduling Simulation</h4>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded border">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-green-900">Current Execution</span>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setTaskQueueStep(Math.max(0, taskQueueStep - 1))}
                        className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
                        disabled={taskQueueStep === 0}
                      >
                        ←
                      </button>
                      <button 
                        onClick={() => setTaskQueueStep(Math.min(taskSchedulingSteps.length - 1, taskQueueStep + 1))}
                        className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
                        disabled={taskQueueStep === taskSchedulingSteps.length - 1}
                      >
                        →
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-16 h-8 bg-green-500 text-white rounded flex items-center justify-center text-xs font-bold">
                      CPU
                    </div>
                    <ArrowRight className="w-4 h-4 text-green-600" />
                    <div className="flex-1 bg-green-100 p-2 rounded border border-green-300 text-sm">
                      {taskSchedulingSteps[taskQueueStep].tasks[0]}
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="text-xs text-gray-600 mb-1">Ready Queue (FIFO):</div>
                    <div className="flex space-x-1">
                      {taskSchedulingSteps[taskQueueStep].queue.map((task, index) => (
                        <div key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs border border-blue-300">
                          {task}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                    {taskSchedulingSteps[taskQueueStep].description}
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <div className="font-bold text-gray-800 mb-2">Round Robin Example:</div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div>Time Quantum: 4ms</div>
                    <div>Task A: 10ms → [4ms] → back to queue with 6ms remaining</div>
                    <div>Task B: 6ms → [4ms] → back to queue with 2ms remaining</div>
                    <div>Task C: 8ms → [4ms] → back to queue with 4ms remaining</div>
                  </div>
                </div>
                
                <div className="bg-yellow-100 p-3 rounded border border-yellow-300">
                  <div className="font-bold text-yellow-800 mb-1">Real-World Examples:</div>
                  <div className="text-yellow-700 text-xs space-y-1">
                    <div>• Print job scheduling</div>
                    <div>• Download queue management</div>
                    <div>• Batch processing systems</div>
                    <div>• Request handling in web servers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buffer Management */}
      <div id="buffer-management" className="bg-white rounded-2xl p-8 shadow-lg border mb-12 text-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <Database className="w-8 h-8 mr-3 text-purple-600" />
            Buffer Management & Data Streaming
          </h2>
          <SectionProgressIndicator 
            moduleId="module-3"
            sectionId="buffer-management"
          />
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <p className="text-gray-600 text-lg leading-relaxed">
              Buffers use queues to manage data flow between systems with different processing speeds. 
              They smooth out temporary speed mismatches and prevent data loss.
            </p>
            
            <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-3">Buffer Applications:</h4>
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="flex items-center space-x-3">
                  <Upload className="w-4 h-4 text-purple-600" />
                  <div>
                    <strong>I/O Buffering:</strong> Keyboard input, file reading
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Download className="w-4 h-4 text-purple-600" />
                  <div>
                    <strong>Network Buffering:</strong> Packet transmission, streaming
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Printer className="w-4 h-4 text-purple-600" />
                  <div>
                    <strong>Print Spooling:</strong> Document queue management
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Cpu className="w-4 h-4 text-purple-600" />
                  <div>
                    <strong>Producer-Consumer:</strong> Multi-threaded systems
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-3">Buffer Types:</h4>
              <div className="space-y-3 text-sm">
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-blue-800">Single Buffer</div>
                  <div className="text-blue-600 text-xs mt-1">One queue, simple implementation</div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-blue-800">Double Buffer</div>
                  <div className="text-blue-600 text-xs mt-1">Two queues, one filling while other empties</div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-blue-800">Circular Buffer</div>
                  <div className="text-blue-600 text-xs mt-1">Fixed size, efficient memory usage</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-4">Streaming Buffer Visualization</h4>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded border">
                <div className="text-sm text-purple-900 mb-3 font-medium">Video Streaming Buffer:</div>
                
                {/* Producer */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-20 h-8 bg-green-500 text-white rounded flex items-center justify-center text-xs font-bold">
                    Producer
                  </div>
                  <ArrowRight className="w-4 h-4 text-green-600" />
                  <div className="text-xs text-green-700">Generates data</div>
                </div>
                
                {/* Buffer Queue */}
                <div className="mb-3">
                  <div className="text-xs text-gray-600 mb-1">Buffer Queue:</div>
                  <div className="flex space-x-1 mb-2">
                    {['Frame1', 'Frame2', 'Frame3', 'Frame4', 'Frame5'].map((frame, index) => (
                      <div key={index} className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs border border-purple-300">
                        {frame}
                      </div>
                    ))}
                    <div className="px-2 py-1 bg-gray-100 text-gray-400 rounded text-xs border border-gray-300">
                      Empty
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>↑ Front (Consumer reads)</span>
                    <span>↑ Rear (Producer writes)</span>
                  </div>
                </div>
                
                {/* Consumer */}
                <div className="flex items-center space-x-2">
                  <div className="text-xs text-blue-700">Processes data</div>
                  <ArrowRight className="w-4 h-4 text-blue-600" />
                  <div className="w-20 h-8 bg-blue-500 text-white rounded flex items-center justify-center text-xs font-bold">
                    Consumer
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <div className="font-bold text-gray-800 mb-2">Producer-Consumer Code:</div>
                <div className="font-mono text-xs space-y-1 text-gray-700">
                  <div className="text-green-600">// Producer</div>
                  <div>while (producing) {`{`}</div>
                  <div className="ml-2">data = generateData();</div>
                  <div className="ml-2">buffer.enqueue(data);</div>
                  <div>{`}`}</div>
                  
                  <div className="text-blue-600 mt-2">// Consumer</div>
                  <div>while (consuming) {`{`}</div>
                  <div className="ml-2">data = buffer.dequeue();</div>
                  <div className="ml-2">processData(data);</div>
                  <div>{`}`}</div>
                </div>
              </div>
              
              <div className="bg-green-100 p-3 rounded border border-green-300">
                <div className="font-bold text-green-800 mb-1">Benefits:</div>
                <div className="text-green-700 text-xs space-y-1">
                  <div>• Smooth playback despite network fluctuations</div>
                  <div>• Prevents data loss during speed mismatches</div>
                  <div>• Allows asynchronous processing</div>
                  <div>• Improves overall system performance</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-World Systems */}
      <div id="real-world-systems" className="bg-white rounded-2xl p-8 shadow-lg border mb-12 text-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <Globe className="w-8 h-8 mr-3 text-indigo-600" />
            Real-World Queue Systems
          </h2>
          <SectionProgressIndicator 
            moduleId="module-3"
            sectionId="real-world-systems"
          />
        </div>
        
        <div className="space-y-8">
          <p className="text-gray-600 text-lg leading-relaxed text-center">
            Queues are everywhere in technology and daily life. From the apps on your phone to massive 
            data centers, FIFO principles ensure fair, organized, and efficient processing.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Web Services */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
              <div className="flex items-center mb-4">
                <Globe className="w-8 h-8 text-blue-600 mr-3" />
                <h4 className="font-bold text-blue-900">Web Services</h4>
              </div>
              <div className="space-y-3 text-sm">
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-blue-800">Request Processing</div>
                  <div className="text-blue-600 text-xs mt-1">Web servers queue incoming HTTP requests</div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-blue-800">API Rate Limiting</div>
                  <div className="text-blue-600 text-xs mt-1">Queue requests to prevent system overload</div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-blue-800">Message Queues</div>
                  <div className="text-blue-600 text-xs mt-1">RabbitMQ, Apache Kafka for microservices</div>
                </div>
              </div>
            </div>
            
            {/* Gaming Systems */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
              <div className="flex items-center mb-4">
                <Users className="w-8 h-8 text-green-600 mr-3" />
                <h4 className="font-bold text-green-900">Gaming & Entertainment</h4>
              </div>
              <div className="space-y-3 text-sm">
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-green-800">Matchmaking</div>
                  <div className="text-green-600 text-xs mt-1">Players queued by skill level and wait time</div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-green-800">Event Processing</div>
                  <div className="text-green-600 text-xs mt-1">Game actions processed in order received</div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-green-800">Content Delivery</div>
                  <div className="text-green-600 text-xs mt-1">Video streaming, music playlist management</div>
                </div>
              </div>
            </div>
            
            {/* Financial Systems */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
              <div className="flex items-center mb-4">
                <Calendar className="w-8 h-8 text-purple-600 mr-3" />
                <h4 className="font-bold text-purple-900">Financial Systems</h4>
              </div>
              <div className="space-y-3 text-sm">
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-purple-800">Transaction Processing</div>
                  <div className="text-purple-600 text-xs mt-1">Banking transactions processed in order</div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-purple-800">Trading Systems</div>
                  <div className="text-purple-600 text-xs mt-1">Stock orders queued by timestamp</div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-purple-800">Payment Processing</div>
                  <div className="text-purple-600 text-xs mt-1">Credit card transactions in FIFO order</div>
                </div>
              </div>
            </div>
            
            {/* Transportation */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200">
              <div className="flex items-center mb-4">
                <Shuffle className="w-8 h-8 text-orange-600 mr-3" />
                <h4 className="font-bold text-orange-900">Transportation</h4>
              </div>
              <div className="space-y-3 text-sm">
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-orange-800">Traffic Management</div>
                  <div className="text-orange-600 text-xs mt-1">Traffic lights use queues for fair timing</div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-orange-800">Airport Systems</div>
                  <div className="text-orange-600 text-xs mt-1">Flight queues for takeoff and landing</div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-orange-800">Ride Sharing</div>
                  <div className="text-orange-600 text-xs mt-1">Driver-rider matching algorithms</div>
                </div>
              </div>
            </div>
            
            {/* Communication */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-xl border border-teal-200">
              <div className="flex items-center mb-4">
                <Network className="w-8 h-8 text-teal-600 mr-3" />
                <h4 className="font-bold text-teal-900">Communication</h4>
              </div>
              <div className="space-y-3 text-sm">
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-teal-800">Email Systems</div>
                  <div className="text-teal-600 text-xs mt-1">Messages queued for delivery</div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-teal-800">Chat Applications</div>
                  <div className="text-teal-600 text-xs mt-1">Message ordering in group chats</div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-teal-800">Call Centers</div>
                  <div className="text-teal-600 text-xs mt-1">Customer calls handled in order</div>
                </div>
              </div>
            </div>
            
            {/* Healthcare */}
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-6 rounded-xl border border-rose-200">
              <div className="flex items-center mb-4">
                <Target className="w-8 h-8 text-rose-600 mr-3" />
                <h4 className="font-bold text-rose-900">Healthcare</h4>
              </div>
              <div className="space-y-3 text-sm">
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-rose-800">Patient Management</div>
                  <div className="text-rose-600 text-xs mt-1">Appointment scheduling and queuing</div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-rose-800">Emergency Triage</div>
                  <div className="text-rose-600 text-xs mt-1">Priority queues for urgent cases</div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-rose-800">Lab Processing</div>
                  <div className="text-rose-600 text-xs mt-1">Test samples processed in order</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Industry Statistics */}
          <div className="bg-gray-50 p-8 rounded-xl">
            <h4 className="font-semibold text-gray-900 mb-6 text-center">Queue Systems by the Numbers</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2">1.7B</div>
                <div className="text-sm text-gray-600">Website requests processed daily using queue systems</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">99.9%</div>
                <div className="text-sm text-gray-600">Financial transaction accuracy with proper queuing</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">23ms</div>
                <div className="text-sm text-gray-600">Average queue processing time in modern systems</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">10M+</div>
                <div className="text-sm text-gray-600">Messages handled by messaging systems per second</div>
              </div>
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
          href="/learning-path/module-3/queue-types"
          className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Previous: Queue Types
        </Link>
        <Link
          href="/learning-path/module-3/comparison"
          className="flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
        >
          Next: Stacks vs Queues
          <ChevronRight className="w-6 h-6 ml-2" />
        </Link>
      </motion.div>
    </EnhancedModuleLayout>
  );
}