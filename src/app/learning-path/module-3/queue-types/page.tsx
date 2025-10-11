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
  ArrowUpDown
} from 'lucide-react';
import Link from 'next/link';
import { EnhancedModuleLayout } from '@/components/layouts/EnhancedModuleLayout';
import { ProgressIndicator } from '@/components/progress/ProgressIndicator';
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton';
import { SectionProgressIndicator } from '@/components/progress/SectionProgressIndicator';

export default function QueueTypesPage() {
  const [activeSection, setActiveSection] = useState('simple-queue');
  const [selectedQueueType, setSelectedQueueType] = useState('circular');

  const sections = [
    { id: 'simple-queue', name: 'Simple Queue', icon: Package },
    { id: 'circular-queue', name: 'Circular Queue', icon: RefreshCw },
    { id: 'priority-queue', name: 'Priority Queue', icon: Star },
    { id: 'deque', name: 'Double-Ended Queue', icon: ArrowUpDown },
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
      estimatedTime="25-30 minutes"
      difficulty="Intermediate"
      totalSections={8}
      currentPath="/learning-path/module-3/queue-types"
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
            topicId="queue-types" 
            topicType="stacks-queues"
            category="learning-path"
          />
          <BookmarkButton 
            topicId="queue-types"
            topicType="stacks-queues"
            title="Queue Types"
            category="learning-path"
            url="/learning-path/module-3/queue-types"
          />
        </div>
        
        <div className="inline-flex items-center bg-indigo-100 text-indigo-800 px-6 py-3 rounded-full text-sm font-medium mb-8">
          <Settings className="w-5 h-5 mr-2" />
          Lesson 5: Queue Types & Implementations
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-8">
          Advanced
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Queue Types
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Explore different types of queues: circular queues for efficient memory usage, 
          priority queues for ordered processing, and deques for maximum flexibility. 
          Master the implementations that power real-world systems.
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
              <RefreshCw className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">Circular Queue</h3>
                <p className="text-sm text-gray-600">Optimize memory with wraparound</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Star className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">Priority Queue</h3>
                <p className="text-sm text-gray-600">Process elements by priority</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <ArrowUpDown className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">Deque</h3>
                <p className="text-sm text-gray-600">Insert/remove from both ends</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Code className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">Implementation</h3>
                <p className="text-sm text-gray-600">Code efficient solutions</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Queue Types Comparison */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <Settings className="w-8 h-8 mr-3 text-indigo-600" />
          Queue Types Overview
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 text-center">
            <Package className="w-12 h-12 text-blue-600 mx-auto mb-3" />
            <h4 className="font-semibold text-blue-900 mb-2">Simple Queue</h4>
            <p className="text-blue-700 text-sm">Basic FIFO queue with linear array</p>
          </div>
          
          <div className="bg-green-50 p-6 rounded-xl border border-green-200 text-center">
            <RefreshCw className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <h4 className="font-semibold text-green-900 mb-2">Circular Queue</h4>
            <p className="text-green-700 text-sm">Wraparound queue for memory efficiency</p>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-xl border border-purple-200 text-center">
            <Star className="w-12 h-12 text-purple-600 mx-auto mb-3" />
            <h4 className="font-semibold text-purple-900 mb-2">Priority Queue</h4>
            <p className="text-purple-700 text-sm">Elements served by priority order</p>
          </div>
          
          <div className="bg-orange-50 p-6 rounded-xl border border-orange-200 text-center">
            <ArrowUpDown className="w-12 h-12 text-orange-600 mx-auto mb-3" />
            <h4 className="font-semibold text-orange-900 mb-2">Deque</h4>
            <p className="text-orange-700 text-sm">Double-ended queue flexibility</p>
          </div>
        </div>
      </div>

      {/* Simple Queue */}
      <div id="simple-queue" className="bg-white rounded-2xl p-8 shadow-lg border mb-12 text-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <Package className="w-8 h-8 mr-3 text-blue-600" />
            Simple Queue (Linear Queue)
          </h2>
          <SectionProgressIndicator 
            moduleId="module-3"
            sectionId="simple-queue"
          />
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <p className="text-gray-600 text-lg leading-relaxed">
              A simple queue uses a linear array with front and rear pointers. Elements are added at the rear 
              and removed from the front, following strict FIFO ordering.
            </p>
            
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-3">Key Characteristics:</h4>
              <div className="space-y-2 text-blue-800">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Simple to implement and understand</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Fixed size (when using arrays)</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Memory wastage after dequeue operations</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>O(1) enqueue and dequeue operations</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-3">Problem with Simple Queue</h4>
              <p className="text-gray-600 text-sm mb-3">
                Once elements are dequeued, the space at the beginning cannot be reused, 
                leading to "false full" condition even when array has empty spaces.
              </p>
              <div className="bg-red-100 p-3 rounded border border-red-200 text-red-700 text-sm">
                <strong>Issue:</strong> Array [_, _, _, A, B, C] appears "full" at rear but has empty spaces at front!
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-4">Simple Queue Implementation</h4>
            <div className="bg-white p-4 rounded border font-mono text-sm space-y-2">
              <div className="text-blue-600">class SimpleQueue {`{`}</div>
              <div className="ml-2 text-gray-600">constructor(size) {`{`}</div>
              <div className="ml-4 text-green-600">this.arr = new Array(size);</div>
              <div className="ml-4 text-green-600">this.front = -1;</div>
              <div className="ml-4 text-green-600">this.rear = -1;</div>
              <div className="ml-4 text-green-600">this.size = size;</div>
              <div className="ml-2 text-gray-600">{`}`}</div>
              <div className="text-blue-600">{`}`}</div>
            </div>
            
            <div className="mt-4 space-y-3">
              <div className="bg-white p-3 rounded border text-sm">
                <div className="font-bold text-gray-800 mb-1">Enqueue Operation:</div>
                <div className="font-mono text-xs space-y-1">
                  <div>if (rear === size-1) return "Queue Full";</div>
                  <div>if (front === -1) front = 0;</div>
                  <div>arr[++rear] = element;</div>
                </div>
              </div>
              
              <div className="bg-white p-3 rounded border text-sm">
                <div className="font-bold text-gray-800 mb-1">Dequeue Operation:</div>
                <div className="font-mono text-xs space-y-1">
                  <div>if (front === -1) return "Queue Empty";</div>
                  <div>element = arr[front++];</div>
                  <div>if (front {'>'} rear) front = rear = -1;</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Circular Queue */}
      <div id="circular-queue" className="bg-white rounded-2xl p-8 shadow-lg border mb-12 text-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <RefreshCw className="w-8 h-8 mr-3 text-green-600" />
            Circular Queue (Ring Buffer)
          </h2>
          <SectionProgressIndicator 
            moduleId="module-3"
            sectionId="circular-queue"
          />
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <p className="text-gray-600 text-lg leading-relaxed">
              A circular queue solves the memory wastage problem by connecting the rear back to the front, 
              creating a circular arrangement. When the rear reaches the end, it wraps around to the beginning.
            </p>
            
            <div className="bg-green-50 p-6 rounded-xl border border-green-200">
              <h4 className="font-semibold text-green-900 mb-3">Advantages:</h4>
              <div className="space-y-2 text-green-800">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Maximum memory utilization</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>No memory wastage</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Continuous operations possible</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Perfect for buffering applications</span>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
              <h4 className="font-semibold text-yellow-900 mb-3">Key Formula:</h4>
              <div className="bg-white p-3 rounded border font-mono text-sm">
                <div className="text-purple-600">next_position = (current + 1) % size</div>
              </div>
              <p className="text-yellow-700 text-sm mt-2">
                This modulo operation creates the wraparound effect that makes the queue "circular".
              </p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Real-World Uses:</h4>
              <div className="text-sm text-blue-800 space-y-1">
                <div>• Buffer for streaming data (audio/video)</div>
                <div>• Keyboard buffer in operating systems</div>
                <div>• Network packet buffering</div>
                <div>• Round-robin scheduling</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
            <h4 className="font-semibold text-green-900 mb-4">Circular Queue Visualization</h4>
            
            {/* Visual representation of circular queue */}
            <div className="relative mx-auto w-48 h-48 mb-6">
              <div className="absolute inset-0 border-4 border-green-300 rounded-full"></div>
              {/* Queue positions */}
              {[0, 1, 2, 3, 4, 5, 6, 7].map((pos) => {
                const angle = (pos * 45) - 90; // Start from top
                const x = 90 + 70 * Math.cos(angle * Math.PI / 180);
                const y = 90 + 70 * Math.sin(angle * Math.PI / 180);
                const isOccupied = pos >= 2 && pos <= 5; // Sample data
                
                return (
                  <div
                    key={pos}
                    className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transform -translate-x-4 -translate-y-4 ${
                      isOccupied 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}
                    style={{ left: x, top: y }}
                  >
                    {isOccupied ? ['', '', 'A', 'B', 'C', 'D'][pos - 2] || pos : pos}
                  </div>
                );
              })}
              {/* Front and Rear indicators */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs font-bold text-green-700">
                FRONT ↓
              </div>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-bold text-green-700">
                ↑ REAR
              </div>
            </div>
            
            <div className="bg-white p-4 rounded border">
              <h5 className="font-bold text-gray-800 mb-2">Implementation Logic:</h5>
              <div className="font-mono text-xs space-y-1 text-gray-700">
                <div className="text-blue-600">// Enqueue</div>
                <div>rear = (rear + 1) % size;</div>
                <div>arr[rear] = element;</div>
                <div className="text-blue-600 mt-2">// Dequeue</div>
                <div>element = arr[front];</div>
                <div>front = (front + 1) % size;</div>
              </div>
            </div>
            
            <div className="mt-4 bg-green-100 p-3 rounded border border-green-300 text-sm">
              <strong className="text-green-800">Memory Efficiency:</strong>
              <div className="text-green-700 text-xs mt-1">
                Uses 100% of allocated space, no wastage unlike simple queue!
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Priority Queue */}
      <div id="priority-queue" className="bg-white rounded-2xl p-8 shadow-lg border mb-12 text-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <Star className="w-8 h-8 mr-3 text-purple-600" />
            Priority Queue
          </h2>
          <SectionProgressIndicator 
            moduleId="module-3"
            sectionId="priority-queue"
          />
        </div>
        
        <div className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <p className="text-gray-600 text-lg leading-relaxed">
                In a priority queue, elements are served based on their <strong>priority</strong> rather than 
                their arrival order. Higher priority elements are dequeued first, regardless of when they were added.
              </p>
              
              <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-3">Types of Priority:</h4>
                <div className="space-y-2 text-purple-800">
                  <div><strong>Max Priority Queue:</strong> Highest priority served first</div>
                  <div><strong>Min Priority Queue:</strong> Lowest priority served first</div>
                  <div><strong>Custom Priority:</strong> User-defined priority function</div>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
                <h4 className="font-semibold text-yellow-900 mb-3">Implementation Options:</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Simple Array:</span>
                    <span className="text-yellow-700">O(n) insertion, O(1) deletion</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Sorted Array:</span>
                    <span className="text-yellow-700">O(n) insertion, O(1) deletion</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Heap:</span>
                    <span className="text-green-600">O(log n) insertion, O(log n) deletion</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-4">Priority Queue Example</h4>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded border">
                  <div className="font-bold text-gray-800 mb-2">Hospital Emergency Room:</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center p-2 bg-red-100 rounded border border-red-300">
                      <span>Heart Attack Patient</span>
                      <span className="bg-red-500 text-white px-2 py-1 rounded text-xs">Priority: 1</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-orange-100 rounded border border-orange-300">
                      <span>Broken Arm</span>
                      <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs">Priority: 3</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-yellow-100 rounded border border-yellow-300">
                      <span>Minor Cut</span>
                      <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs">Priority: 5</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-orange-100 rounded border border-orange-300">
                      <span>Chest Pain</span>
                      <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs">Priority: 2</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-100 p-3 rounded border border-green-300">
                  <div className="font-bold text-green-800 mb-1">Serving Order:</div>
                  <div className="text-green-700 text-sm">
                    1. Heart Attack (Priority 1) → 2. Chest Pain (Priority 2) → 3. Broken Arm (Priority 3) → 4. Minor Cut (Priority 5)
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Real-world applications */}
          <div className="bg-gray-50 p-8 rounded-xl">
            <h4 className="font-semibold text-gray-900 mb-6">Real-World Priority Queue Applications</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded border">
                <h5 className="font-semibold text-gray-800 mb-2">Operating Systems</h5>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>• Process scheduling</div>
                  <div>• CPU task management</div>
                  <div>• Memory allocation</div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded border">
                <h5 className="font-semibold text-gray-800 mb-2">Network Systems</h5>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>• Quality of Service (QoS)</div>
                  <div>• Packet routing</div>
                  <div>• Bandwidth allocation</div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded border">
                <h5 className="font-semibold text-gray-800 mb-2">Algorithms</h5>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>• Dijkstra's shortest path</div>
                  <div>• A* pathfinding</div>
                  <div>• Huffman coding</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deque */}
      <div id="deque" className="bg-white rounded-2xl p-8 shadow-lg border mb-12 text-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <ArrowUpDown className="w-8 h-8 mr-3 text-orange-600" />
            Deque (Double-Ended Queue)
          </h2>
          <SectionProgressIndicator 
            moduleId="module-3"
            sectionId="deque"
          />
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <p className="text-gray-600 text-lg leading-relaxed">
              A deque (pronounced "deck") allows insertion and deletion at <strong>both ends</strong>. 
              It combines the functionality of both stacks and queues, providing maximum flexibility.
            </p>
            
            <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
              <h4 className="font-semibold text-orange-900 mb-3">Deque Operations:</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-bold text-orange-800 mb-2">Front Operations:</div>
                  <div className="space-y-1 text-orange-700">
                    <div>• addFront() - Insert at front</div>
                    <div>• removeFront() - Delete from front</div>
                    <div>• peekFront() - View front element</div>
                  </div>
                </div>
                <div>
                  <div className="font-bold text-orange-800 mb-2">Rear Operations:</div>
                  <div className="space-y-1 text-orange-700">
                    <div>• addRear() - Insert at rear</div>
                    <div>• removeRear() - Delete from rear</div>
                    <div>• peekRear() - View rear element</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-3">Deque as Stack & Queue:</h4>
              <div className="space-y-3 text-sm text-blue-800">
                <div>
                  <strong>As Stack (LIFO):</strong> Use addFront() and removeFront()
                </div>
                <div>
                  <strong>As Queue (FIFO):</strong> Use addRear() and removeFront()
                </div>
                <div className="bg-blue-100 p-2 rounded text-xs">
                  One data structure, multiple behaviors!
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200">
            <h4 className="font-semibold text-orange-900 mb-4">Deque Visualization</h4>
            
            {/* Deque visual */}
            <div className="bg-white p-4 rounded border mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-orange-600">← addFront() / removeFront()</div>
                <div className="text-xs text-orange-600">addRear() / removeRear() →</div>
              </div>
              
              <div className="flex items-center space-x-1">
                <div className="w-8 h-8 bg-orange-200 rounded flex items-center justify-center text-xs font-bold">
                  FRONT
                </div>
                {['A', 'B', 'C', 'D'].map((item, index) => (
                  <div key={index} className="w-8 h-8 bg-orange-500 text-white rounded flex items-center justify-center text-xs font-bold">
                    {item}
                  </div>
                ))}
                <div className="w-8 h-8 bg-orange-200 rounded flex items-center justify-center text-xs font-bold">
                  REAR
                </div>
              </div>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="bg-white p-3 rounded border">
                <div className="font-bold text-gray-800 mb-1">Example Operations:</div>
                <div className="font-mono text-xs space-y-1">
                  <div>addFront('X') → [X, A, B, C, D]</div>
                  <div>addRear('Y') → [X, A, B, C, D, Y]</div>
                  <div>removeFront() → [A, B, C, D, Y]</div>
                  <div>removeRear() → [A, B, C, D]</div>
                </div>
              </div>
              
              <div className="bg-green-100 p-3 rounded border border-green-300">
                <div className="font-bold text-green-800 mb-1">Time Complexity:</div>
                <div className="text-green-700 text-xs">
                  All operations: O(1) with proper implementation
                </div>
              </div>
            </div>
            
            <div className="mt-4 bg-yellow-100 p-3 rounded border border-yellow-300">
              <div className="font-bold text-yellow-800 mb-1">Real-World Uses:</div>
              <div className="text-yellow-700 text-xs space-y-1">
                <div>• Browser history (back/forward)</div>
                <div>• Undo/Redo with multiple paths</div>
                <div>• Sliding window algorithms</div>
                <div>• Palindrome checking</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-8 rounded-2xl border border-gray-200 mb-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Queue Types Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left p-3 font-semibold">Queue Type</th>
                <th className="text-left p-3 font-semibold">Insert</th>
                <th className="text-left p-3 font-semibold">Remove</th>
                <th className="text-left p-3 font-semibold">Memory Usage</th>
                <th className="text-left p-3 font-semibold">Best For</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="border-b border-gray-200 bg-white">
                <td className="p-3 font-medium">Simple Queue</td>
                <td className="p-3">Rear only</td>
                <td className="p-3">Front only</td>
                <td className="p-3 text-red-600">Wasteful</td>
                <td className="p-3">Learning, simple cases</td>
              </tr>
              <tr className="border-b border-gray-200 bg-gray-50">
                <td className="p-3 font-medium">Circular Queue</td>
                <td className="p-3">Rear (wraps)</td>
                <td className="p-3">Front (wraps)</td>
                <td className="p-3 text-green-600">Efficient</td>
                <td className="p-3">Buffers, streaming</td>
              </tr>
              <tr className="border-b border-gray-200 bg-white">
                <td className="p-3 font-medium">Priority Queue</td>
                <td className="p-3">By priority</td>
                <td className="p-3">Highest priority</td>
                <td className="p-3 text-yellow-600">Variable</td>
                <td className="p-3">Scheduling, algorithms</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-3 font-medium">Deque</td>
                <td className="p-3">Both ends</td>
                <td className="p-3">Both ends</td>
                <td className="p-3 text-green-600">Efficient</td>
                <td className="p-3">Flexible applications</td>
              </tr>
            </tbody>
          </table>
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
          href="/learning-path/module-3/queue-fundamentals"
          className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Previous: Queue Fundamentals
        </Link>
        <Link
          href="/learning-path/module-3/queue-applications"
          className="flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
        >
          Next: Queue Applications
          <ChevronRight className="w-6 h-6 ml-2" />
        </Link>
      </motion.div>
    </EnhancedModuleLayout>
  );
}