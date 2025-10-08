'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Settings, BarChart3, ArrowRight, Play, Pause, RotateCcw, Eye, Code, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ModuleLayout } from '@/components/layouts/ModuleLayout';
import { SectionProgressIndicator } from '@/components/progress/SectionProgressIndicator';
import Link from 'next/link';

// Type definitions
type AnimationStep = {
  step: number;
  desc: string;
  highlight: string;
};

type AnimationNode = {
  id: number;
  data: number;
  isHead: boolean;
};

type OperationAnimation = {
  title: string;
  description: string;
  steps: AnimationStep[];
  initialNodes: AnimationNode[];
};

type OperationAnimations = {
  insertion: OperationAnimation;
  deletion: OperationAnimation;
  traversal: OperationAnimation;
};

// Animation configurations for different operations
const operationAnimations: OperationAnimations = {
  insertion: {
    title: 'Insert at Head',
    description: 'Adding a new node at the beginning of the list',
    steps: [
      { step: 1, desc: 'Create new node', highlight: 'new' },
      { step: 2, desc: 'Point new node to current head', highlight: 'link' },
      { step: 3, desc: 'Update head to new node', highlight: 'head' },
      { step: 4, desc: 'Operation complete!', highlight: 'complete' }
    ],
    initialNodes: [
      { id: 1, data: 20, isHead: true },
      { id: 2, data: 30, isHead: false },
      { id: 3, data: 40, isHead: false }
    ]
  },
  deletion: {
    title: 'Delete Head Node',
    description: 'Removing the first node from the list',
    steps: [
      { step: 1, desc: 'Identify node to delete', highlight: 'target' },
      { step: 2, desc: 'Update head to next node', highlight: 'head' },
      { step: 3, desc: 'Free deleted node memory', highlight: 'delete' },
      { step: 4, desc: 'Operation complete!', highlight: 'complete' }
    ],
    initialNodes: [
      { id: 1, data: 10, isHead: true },
      { id: 2, data: 20, isHead: false },
      { id: 3, data: 30, isHead: false }
    ]
  },
  traversal: {
    title: 'List Traversal',
    description: 'Visiting each node from head to tail',
    steps: [
      { step: 1, desc: 'Start at head node', highlight: 'start' },
      { step: 2, desc: 'Visit current node', highlight: 'visit1' },
      { step: 3, desc: 'Move to next node', highlight: 'visit2' },
      { step: 4, desc: 'Continue until NULL', highlight: 'visit3' }
    ],
    initialNodes: [
      { id: 1, data: 10, isHead: true },
      { id: 2, data: 20, isHead: false },
      { id: 3, data: 30, isHead: false }
    ]
  }
};

const linkedListOperations = [
  {
    operation: 'Traversal',
    timeComplexity: 'O(n)',
    description: 'Visit each node from head to tail sequentially',
    detailedSteps: [
      'Start with pointer at head node',
      'Process/visit current node data', 
      'Follow next pointer to move forward',
      'Repeat until reaching NULL pointer',
      'Total visits = number of nodes'
    ],
    code: `function traverse(head) {
  let current = head;
  while (current !== null) {
    console.log(current.data);
    current = current.next;
  }
}`,
    complexity: { time: 'O(n)', space: 'O(1)' }
  },
  {
    operation: 'Insertion',
    timeComplexity: 'O(1) at head, O(n) at position',
    description: 'Add new node at beginning, end, or specific position',
    detailedSteps: [
      'Allocate memory for new node',
      'Set data value in new node',
      'Update pointer connections',
      'Handle head/tail pointer updates',
      'Consider edge cases (empty list)'
    ],
    code: `function insertAtHead(head, data) {
  let newNode = new Node(data);
  newNode.next = head;
  return newNode; // new head
}`,
    complexity: { time: 'O(1)', space: 'O(1)' }
  },
  {
    operation: 'Deletion',
    timeComplexity: 'O(1) at head, O(n) at position',
    description: 'Remove node from beginning, end, or specific position',
    detailedSteps: [
      'Locate the target node to delete',
      'Update previous node&apos;s next pointer',
      'Handle head pointer if deleting first',
      'Free the memory of deleted node',
      'Handle edge cases (single node, empty list)'
    ],
    code: `function deleteHead(head) {
  if (head === null) return null;
  let temp = head.next;
  delete head; // free memory
  return temp; // new head
}`,
    complexity: { time: 'O(1)', space: 'O(1)' }
  },
  {
    operation: 'Search',
    timeComplexity: 'O(n)',
    description: 'Find node with specific value or position',
    detailedSteps: [
      'Start from head node',
      'Compare current node data with target',
      'If match found, return node/position',
      'Otherwise, move to next node',
      'Return null if not found after full traversal'
    ],
    code: `function search(head, target) {
  let current = head;
  let position = 0;
  while (current !== null) {
    if (current.data === target) {
      return position;
    }
    current = current.next;
    position++;
  }
  return -1; // not found
}`,
    complexity: { time: 'O(n)', space: 'O(1)' }
  }
];

export default function LinkedListOperationsPage() {
  const [activeSection, setActiveSection] = useState('operations');
  const [currentAnimation, setCurrentAnimation] = useState<keyof OperationAnimations>('insertion');
  const [animationStep, setAnimationStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState(0);

  const sections = [
    { id: 'operations', name: 'Core Operations', icon: Settings },
    { id: 'animations', name: 'Visual Animations', icon: Eye },
    { id: 'implementation', name: 'Code Examples', icon: Code },
    { id: 'complexity', name: 'Complexity Analysis', icon: BarChart3 },
  ];

  // Auto-play animation
  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        setAnimationStep(prev => {
          const maxSteps = operationAnimations[currentAnimation].steps.length;
          return prev >= maxSteps - 1 ? 0 : prev + 1;
        });
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, animationStep, currentAnimation]);

  const resetAnimation = () => {
    setAnimationStep(0);
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <ModuleLayout
      moduleId="module-4"
      moduleTitle="Module 4: Linked Lists"
      moduleDescription="Core operations and performance"
      sections={sections}
      activeSection={activeSection}
      onSectionChange={(id)=>{ setActiveSection(id); const el=document.getElementById(id); if(el){ el.scrollIntoView({behavior:'smooth'});} }}
      backUrl="/learning-path/module-4"
      estimatedTime="16 minutes"
      difficulty="Intermediate"
      totalSections={sections.length}
      currentSectionIndex={sections.findIndex(s => s.id === activeSection)}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 text-gray-700"
      >
        <div className="inline-flex items-center bg-orange-100 text-orange-800 px-6 py-3 rounded-full text-sm font-medium mb-8">
          <Settings className="w-5 h-5 mr-2 text-gray-700" />
          Module 4 · Linked List Operations
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-8">
          Master Core
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 text-gray-600">
            Operations
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Learn the fundamental operations that make linked lists powerful: insertion, deletion, traversal, and search. 
          Watch them in action with interactive animations!
        </p>
      </motion.div>

      <motion.div
        id="operations"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12 text-gray-700"
      >
          <div className="bg-white rounded-2xl p-8 shadow-lg border text-gray-700">
            <div className="flex items-center justify-between mb-8 text-gray-700">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                <Settings className="w-8 h-8 mr-3 text-orange-600" />
                Core Operations Overview
              </h2>
              <SectionProgressIndicator moduleId="linked-lists" sectionId="operations-overview" />
            </div>
            
            <div className="mb-8 bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200 text-gray-700">
              <h3 className="text-lg font-semibold text-orange-900 mb-3">🎯 Essential Operations</h3>
              <p className="text-orange-800 text-sm leading-relaxed">
                Every linked list must support these fundamental operations. Understanding their implementation 
                and complexity is crucial for choosing the right data structure for your problem.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 text-gray-700">
              {linkedListOperations.map((op, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className={`rounded-xl p-6 border-2 cursor-pointer transition-all duration-300 ${
                    selectedOperation === index 
                      ? 'bg-gradient-to-br from-orange-100 to-red-100 border-orange-400 shadow-lg' 
                      : 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 hover:border-orange-300'
                  }`}
                  onClick={() => setSelectedOperation(index)}
                >
                  <div className="flex items-center justify-between mb-4 text-gray-700">
                    <h3 className="text-xl font-bold text-orange-900">{op.operation}</h3>
                    <div className="text-xs bg-orange-200 text-orange-800 px-3 py-1 rounded-full font-mono">
                      {op.complexity.time}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{op.description}</p>
                  
                  <div className="mb-4 text-gray-700">
                    <h4 className="font-semibold text-orange-800 mb-2">Detailed Steps:</h4>
                    <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                      {op.detailedSteps.map((step, stepIndex) => (
                        <li key={stepIndex} className="leading-relaxed text-gray-700">{step}</li>
                      ))}
                    </ol>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-xs text-gray-600">
                    <div className="bg-green-100 p-2 rounded border border-green-300 text-center text-gray-700">
                      <div className="font-semibold text-green-800">Time</div>
                      <div className="text-green-700 font-mono">{op.complexity.time}</div>
                    </div>
                    <div className="bg-blue-100 p-2 rounded border border-blue-300 text-center text-gray-700">
                      <div className="font-semibold text-blue-800">Space</div>
                      <div className="text-blue-700 font-mono">{op.complexity.space}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div id="animations" className="bg-white rounded-2xl p-8 shadow-lg border text-gray-700">
            <div className="flex items-center justify-between mb-8 text-gray-700">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                <Eye className="w-8 h-8 mr-3 text-purple-600" />
                Interactive Animations
              </h2>
              <SectionProgressIndicator moduleId="linked-lists" sectionId="operations-animations" />
            </div>
            
            <div className="mb-6 text-gray-700">
              <div className="flex items-center justify-between mb-4 text-gray-700">
                <div className="flex space-x-2 text-gray-700">
                  {(Object.keys(operationAnimations) as (keyof OperationAnimations)[]).map((animType) => (
                    <button
                      key={animType}
                      onClick={() => {
                        setCurrentAnimation(animType);
                        resetAnimation();
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        currentAnimation === animType
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                      }`}
                    >
                      {operationAnimations[animType].title}
                    </button>
                  ))}
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <button
                    onClick={togglePlayPause}
                    className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-white text-white"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 mr-1 text-gray-700" /> : <Play className="w-4 h-4 mr-1 text-gray-700" />}
                    {isPlaying ? 'Pause' : 'Play'}
                  </button>
                  <button
                    onClick={resetAnimation}
                    className="flex items-center px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-white text-white"
                  >
                    <RotateCcw className="w-4 h-4 mr-1 text-gray-700" />
                    Reset
                  </button>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-200 mb-6 text-gray-700">
                <h3 className="text-lg font-semibold text-purple-900 mb-2">
                  {operationAnimations[currentAnimation].title}
                </h3>
                <p className="text-purple-800 text-sm mb-4">
                  {operationAnimations[currentAnimation].description}
                </p>
                <div className="text-sm text-purple-700">
                  <strong>Step {animationStep + 1}:</strong> {operationAnimations[currentAnimation].steps[animationStep]?.desc}
                </div>
              </div>
              
              {/* Animation Visualization */}
              <div className="bg-white p-8 rounded-xl border-2 border-purple-200 min-h-[200px] text-gray-700">
                <div className="flex items-center justify-center space-x-8 text-gray-700">
                  <div className="text-sm font-semibold text-purple-700">HEAD</div>
                  
                  {/* Render existing nodes */}
                  {operationAnimations[currentAnimation].initialNodes.map((node: AnimationNode, idx: number) => {
                    const isHighlighted = 
                      (currentAnimation === 'traversal' && animationStep > 0 && idx <= animationStep - 1) ||
                      (currentAnimation === 'deletion' && animationStep >= 1 && node.isHead && animationStep < 3) ||
                      (currentAnimation === 'insertion' && animationStep >= 2);
                    
                    const isDeleting = currentAnimation === 'deletion' && animationStep === 2 && node.isHead;
                    
                    return (
                      <AnimatePresence key={node.id}>
                        {!isDeleting && (
                          <motion.div
                            initial={{ opacity: 1, scale: 1 }}
                            animate={{ 
                              opacity: isDeleting ? 0 : 1,
                              scale: isHighlighted ? 1.1 : 1,
                              backgroundColor: isHighlighted ? '#fbbf24' : '#e5e7eb'
                            }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.5 }}
                            className={`relative bg-gray-200 border-2 ${
                              isHighlighted ? 'border-yellow-400 bg-yellow-200' : 'border-gray-400'
                            } rounded-lg p-4 min-w-[80px] text-center`}
                          >
                            <div className="text-lg font-bold text-gray-800">{node.data}</div>
                            <div className="text-xs text-gray-600">Node</div>
                            {node.isHead && animationStep >= 1 && currentAnimation === 'deletion' && (
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs text-gray-600">
                                ×
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    );
                  })}
                  
                  {/* New node for insertion */}
                  <AnimatePresence>
                    {currentAnimation === 'insertion' && animationStep >= 0 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: -20 }}
                        animate={{ 
                          opacity: 1, 
                          scale: 1, 
                          y: animationStep >= 2 ? 0 : -20,
                          backgroundColor: animationStep >= 1 ? '#86efac' : '#f3f4f6'
                        }}
                        transition={{ duration: 0.5 }}
                        className="relative bg-green-200 border-2 border-green-400 rounded-lg p-4 min-w-[80px] text-center"
                      >
                        <div className="text-lg font-bold text-gray-800">10</div>
                        <div className="text-xs text-gray-600">New</div>
                        {animationStep >= 3 && (
                          <div className="absolute -top-2 -left-2 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs text-gray-600">
                            H
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <div className="text-sm font-semibold text-purple-700">NULL</div>
                </div>
                
                <div className="mt-6 text-center text-gray-700">
                  <div className="inline-flex items-center space-x-4 bg-purple-100 px-4 py-2 rounded-lg text-gray-700">
                    {operationAnimations[currentAnimation].steps.map((step: AnimationStep, idx: number) => (
                      <div
                        key={idx}
                        className={`w-3 h-3 rounded-full transition-all ${
                          idx <= animationStep ? 'bg-purple-600' : 'bg-purple-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="implementation" className="bg-white rounded-2xl p-8 shadow-lg border text-gray-700">
            <div className="flex items-center justify-between mb-8 text-gray-700">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                <Code className="w-8 h-8 mr-3 text-indigo-600" />
                Code Implementation
              </h2>
              <SectionProgressIndicator moduleId="linked-lists" sectionId="operations-code" />
            </div>
            
            <div className="mb-6 bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-200 text-gray-700">
              <h3 className="text-lg font-semibold text-indigo-900 mb-3">💻 Implementation Details</h3>
              <p className="text-indigo-800 text-sm leading-relaxed">
                Here are clean, production-ready implementations of each operation. Study the pointer manipulations 
                and edge case handling to master linked list programming.
              </p>
            </div>
            
            <div className="space-y-6 text-gray-700">
              {linkedListOperations.map((op, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-200 text-gray-700"
                >
                  <div className="flex items-center justify-between mb-4 text-gray-700">
                    <h3 className="text-xl font-bold text-indigo-900">{op.operation} Implementation</h3>
                    <div className="flex space-x-2 text-xs text-gray-600">
                      <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full font-mono">
                        Time: {op.complexity.time}
                      </span>
                      <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full font-mono">
                        Space: {op.complexity.space}
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900 rounded-lg p-4 mb-4 text-gray-100">
                    <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap overflow-x-auto">
                      {op.code}
                    </pre>
                  </div>
                  
                  <div className="text-sm text-indigo-700">
                    <strong>Key Points:</strong> Focus on pointer updates, memory management, and handling edge cases like empty lists.
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div id="complexity" className="bg-white rounded-2xl p-8 shadow-lg border text-gray-700">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <BarChart3 className="w-8 h-8 mr-3 text-blue-600" />
              Time Complexity Analysis
            </h2>
            <div className="overflow-x-auto text-gray-700">
              <table className="w-full text-left border-collapse text-gray-700">
                <thead>
                  <tr className="bg-blue-100 text-gray-700">
                    <th className="border border-blue-300 px-4 py-3 font-semibold text-blue-600">Operation</th>
                    <th className="border border-blue-300 px-4 py-3 font-semibold text-blue-600">Singly</th>
                    <th className="border border-blue-300 px-4 py-3 font-semibold text-blue-600">Doubly</th>
                    <th className="border border-blue-300 px-4 py-3 font-semibold text-blue-600">Circular</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-blue-300 px-4 py-3 text-blue-600 font-medium">Access (index)</td>
                    <td className="border border-blue-300 px-4 py-3 text-red-600 font-mono">O(n)</td>
                    <td className="border border-blue-300 px-4 py-3 text-red-600 font-mono">O(n)</td>
                    <td className="border border-blue-300 px-4 py-3 text-red-600 font-mono">O(n)</td>
                  </tr>
                  <tr className="bg-gray-50 text-gray-700">
                    <td className="border border-blue-300 px-4 py-3 text-blue-600 font-medium">Search</td>
                    <td className="border border-blue-300 px-4 py-3 text-red-600 font-mono">O(n)</td>
                    <td className="border border-blue-300 px-4 py-3 text-red-600 font-mono">O(n)</td>
                    <td className="border border-blue-300 px-4 py-3 text-red-600 font-mono">O(n)</td>
                  </tr>
                  <tr>
                    <td className="border border-blue-300 px-4 py-3 text-blue-600 font-medium">Insert (head)</td>
                    <td className="border border-blue-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                    <td className="border border-blue-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                    <td className="border border-blue-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                  </tr>
                  <tr className="bg-gray-50 text-gray-700">
                    <td className="border border-blue-300 px-4 py-3 text-blue-600 font-medium">Insert (end)</td>
                    <td className="border border-blue-300 px-4 py-3 text-red-600 font-mono">O(n)</td>
                    <td className="border border-blue-300 px-4 py-3 text-green-600 font-mono">O(1)*</td>
                    <td className="border border-blue-300 px-4 py-3 text-green-600 font-mono">O(1)*</td>
                  </tr>
                  <tr>
                    <td className="border border-blue-300 px-4 py-3 text-blue-600 font-medium">Delete (head)</td>
                    <td className="border border-blue-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                    <td className="border border-blue-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                    <td className="border border-blue-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                  </tr>
                  <tr className="bg-gray-50 text-gray-700">
                    <td className="border border-blue-300 px-4 py-3 text-blue-600 font-medium">Delete (end)</td>
                    <td className="border border-blue-300 px-4 py-3 text-red-600 font-mono">O(n)</td>
                    <td className="border border-blue-300 px-4 py-3 text-green-600 font-mono">O(1)*</td>
                    <td className="border border-blue-300 px-4 py-3 text-green-600 font-mono">O(1)*</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-gray-600"><strong>*</strong> Assumes a maintained tail pointer.</p>
          </div>
          <div className="flex justify-between items-center mt-8 text-gray-700">
            <Link href="/learning-path/module-4/types" className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-600">Previous: Types</Link>
            <Link href="/learning-path/module-4/problems" className="px-6 py-3 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 text-gray-300">Next: Problems <ArrowRight className="w-4 h-4 ml-2 text-gray-700" /></Link>
          </div>
        </motion.div>
    </ModuleLayout>
  );
}
