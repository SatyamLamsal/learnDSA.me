'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown, ArrowDownRight, TreePine, Play, CheckCircle, Info, Zap, Code } from 'lucide-react';
import { useState } from 'react';
import { EnhancedModuleLayout } from '@/components/layouts/EnhancedModuleLayout';
import { SectionProgressIndicator } from '@/components/progress/SectionProgressIndicator';
import Link from 'next/link';

export default function TreeTraversalPage() {
  const [selectedTraversal, setSelectedTraversal] = useState<'inorder' | 'preorder' | 'postorder' | 'levelorder'>('inorder');
  const [animationStep, setAnimationStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const sections = [
    { id: 'introduction', name: 'Traversal Overview', icon: TreePine },
    { id: 'depth-first', name: 'Depth-First Traversals', icon: ArrowDown },
    { id: 'breadth-first', name: 'Breadth-First Traversal', icon: ArrowRight },
    { id: 'implementation', name: 'Implementation Details', icon: Code },
  ];

  const traversalTypes: Record<'inorder' | 'preorder' | 'postorder' | 'levelorder', {
    name: string;
    order: string; 
    useCase: string;
    sequence: number[];
    visitOrder: string[];
    code: string;
    complexity: string;
  }> = {
    inorder: {
      name: 'In-Order',
      order: 'Left → Root → Right',
      useCase: 'Get sorted data from BST',
      sequence: [4, 2, 5, 1, 6, 3, 7],
      visitOrder: ['4', '2', '5', '1', '6', '3', '7'],
      code: `function inorderTraversal(root) {
  const result = [];
  
  function inorder(node) {
    if (node) {
      inorder(node.left);    // Left
      result.push(node.val); // Root
      inorder(node.right);   // Right
    }
  }
  
  inorder(root);
  return result;
}`,
      complexity: 'Time: O(n), Space: O(h) where h is height'
    },
    preorder: {
      name: 'Pre-Order',
      order: 'Root → Left → Right',
      useCase: 'Create copy of tree, expression trees',
      sequence: [1, 2, 4, 5, 3, 6, 7],
      visitOrder: ['1', '2', '4', '5', '3', '6', '7'],
      code: `function preorderTraversal(root) {
  const result = [];
  
  function preorder(node) {
    if (node) {
      result.push(node.val); // Root
      preorder(node.left);   // Left
      preorder(node.right);  // Right
    }
  }
  
  preorder(root);
  return result;
}`,
      complexity: 'Time: O(n), Space: O(h) where h is height'
    },
    postorder: {
      name: 'Post-Order',
      order: 'Left → Right → Root',
      useCase: 'Delete tree, calculate size, expression evaluation',
      sequence: [4, 5, 2, 6, 7, 3, 1],
      visitOrder: ['4', '5', '2', '6', '7', '3', '1'],
      code: `function postorderTraversal(root) {
  const result = [];
  
  function postorder(node) {
    if (node) {
      postorder(node.left);  // Left
      postorder(node.right); // Right
      result.push(node.val); // Root
    }
  }
  
  postorder(root);
  return result;
}`,
      complexity: 'Time: O(n), Space: O(h) where h is height'
    },
    levelorder: {
      name: 'Level-Order',
      order: 'Level by level, left to right',
      useCase: 'Level-wise processing, shortest path',
      sequence: [1, 2, 3, 4, 5, 6, 7],
      visitOrder: ['1', '2', '3', '4', '5', '6', '7'],
      code: `function levelorderTraversal(root) {
  if (!root) return [];
  
  const result = [];
  const queue = [root];
  
  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node.val);
    
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  
  return result;
}`,
      complexity: 'Time: O(n), Space: O(w) where w is max width'
    }
  };

  const startAnimation = () => {
    setIsAnimating(true);
    setAnimationStep(0);
    
    const steps = traversalTypes[selectedTraversal].sequence.length;
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep++;
      setAnimationStep(currentStep);
      
      if (currentStep >= steps) {
        clearInterval(interval);
        setTimeout(() => {
          setIsAnimating(false);
          setAnimationStep(0);
        }, 1000);
      }
    }, 800);
  };

  return (
    <EnhancedModuleLayout
      moduleId="module-5"
      moduleTitle="Module 5: Trees"
      moduleDescription="Tree traversal algorithms and patterns"
      sections={sections}
      enableScrollSpy
      backUrl="/learning-path/module-5"
      estimatedTime="25 minutes"
      difficulty="Advanced"
      totalSections={sections.length}
      currentPath="/learning-path/module-6/traversal"
      showFullCourseStructure={true}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12 text-gray-700"
      >
        {/* Traversal Introduction */}
        <div id="introduction" className="bg-white rounded-2xl p-8 shadow-lg border text-gray-700">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center">
              <TreePine className="w-8 h-8 mr-3 text-green-600" />
              Tree Traversal Overview
            </h2>
            <SectionProgressIndicator moduleId="trees" sectionId="traversal-intro" />
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Tree traversal is the process of visiting each node in a tree data structure exactly once. 
                The order in which nodes are visited defines different traversal algorithms, each useful 
                for different purposes.
              </p>
              
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-3">Why Traversal Matters:</h4>
                <div className="space-y-2 text-blue-800">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>Access all data in the tree</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>Search for specific values</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>Perform operations on each node</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>Convert tree to other data structures</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                <h4 className="font-semibold text-green-900 mb-3">Two Main Categories:</h4>
                <div className="space-y-3">
                  <div className="bg-white/70 p-3 rounded border">
                    <strong className="text-green-800">Depth-First Search (DFS):</strong>
                    <div className="text-sm text-green-700 mt-1">Go as deep as possible before backtracking</div>
                    <div className="text-xs text-green-600 mt-1">Types: In-order, Pre-order, Post-order</div>
                  </div>
                  <div className="bg-white/70 p-3 rounded border">
                    <strong className="text-green-800">Breadth-First Search (BFS):</strong>
                    <div className="text-sm text-green-700 mt-1">Visit all nodes at current level before going deeper</div>
                    <div className="text-xs text-green-600 mt-1">Also called: Level-order traversal</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
              <h4 className="font-semibold text-green-900 mb-4">Sample Tree Structure</h4>
              
              {/* Tree visualization for traversal examples */}
              <div className="relative mx-auto w-80 h-64 mb-4">
                <svg className="w-full h-full" viewBox="0 0 280 220">
                  {/* Edges */}
                  <line x1="140" y1="40" x2="80" y2="90" stroke="#374151" strokeWidth="2"/>
                  <line x1="140" y1="40" x2="200" y2="90" stroke="#374151" strokeWidth="2"/>
                  <line x1="80" y1="90" x2="50" y2="140" stroke="#374151" strokeWidth="2"/>
                  <line x1="80" y1="90" x2="110" y2="140" stroke="#374151" strokeWidth="2"/>
                  <line x1="200" y1="90" x2="170" y2="140" stroke="#374151" strokeWidth="2"/>
                  <line x1="200" y1="90" x2="230" y2="140" stroke="#374151" strokeWidth="2"/>
                  
                  {/* Nodes */}
                  <circle cx="140" cy="40" r="20" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
                  <circle cx="80" cy="90" r="18" fill="#10b981" stroke="#059669" strokeWidth="2" />
                  <circle cx="200" cy="90" r="18" fill="#10b981" stroke="#059669" strokeWidth="2" />
                  <circle cx="50" cy="140" r="16" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
                  <circle cx="110" cy="140" r="16" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
                  <circle cx="170" cy="140" r="16" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
                  <circle cx="230" cy="140" r="16" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
                  
                  {/* Labels */}
                  <text x="140" y="46" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">1</text>
                  <text x="80" y="96" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">2</text>
                  <text x="200" y="96" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">3</text>
                  <text x="50" y="146" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">4</text>
                  <text x="110" y="146" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">5</text>
                  <text x="170" y="146" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">6</text>
                  <text x="230" y="146" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">7</text>
                  
                  {/* Level indicators */}
                  <text x="10" y="46" fontSize="11" fill="#6b7280" fontWeight="medium">Level 0</text>
                  <text x="10" y="96" fontSize="11" fill="#6b7280" fontWeight="medium">Level 1</text>
                  <text x="10" y="146" fontSize="11" fill="#6b7280" fontWeight="medium">Level 2</text>
                </svg>
              </div>
              
              <div className="text-center text-sm text-gray-600 space-y-1">
                <div><strong>Root:</strong> Node 1</div>
                <div><strong>Height:</strong> 2 levels</div>
                <div><strong>Complete binary tree</strong> - perfect for traversal examples</div>
              </div>
            </div>
          </div>
        </div>

        {/* Depth-First Traversals */}
        <div id="depth-first" className="bg-white rounded-2xl p-8 shadow-lg border text-gray-700">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center">
              <ArrowDown className="w-8 h-8 mr-3 text-purple-600" />
              Depth-First Traversals
            </h2>
            <SectionProgressIndicator moduleId="trees" sectionId="depth-first" />
          </div>
          
          <div className="space-y-8">
            {/* Traversal Type Selector */}
            <div className="flex flex-wrap gap-3 justify-center">
              {(Object.entries(traversalTypes) as Array<[keyof typeof traversalTypes, typeof traversalTypes[keyof typeof traversalTypes]]>).filter(([key]) => key !== 'levelorder').map(([key, traversal]) => (
                <button
                  key={key}
                  onClick={() => {setSelectedTraversal(key as 'inorder' | 'preorder' | 'postorder' | 'levelorder'); setAnimationStep(0);}}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedTraversal === key && key !== 'levelorder'
                      ? 'bg-purple-600 text-white'
                      : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                  }`}
                >
                  {traversal.name}
                </button>
              ))}
            </div>
            
            {/* Interactive Visualization */}
            {selectedTraversal !== 'levelorder' && (
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-purple-900">
                        {traversalTypes[selectedTraversal].name} Traversal
                      </h4>
                      <button
                        onClick={startAnimation}
                        disabled={isAnimating}
                        className="flex items-center px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 disabled:opacity-50"
                      >
                        <Play className="w-4 h-4 mr-1" />
                        {isAnimating ? 'Running...' : 'Animate'}
                      </button>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <div><strong>Order:</strong> {traversalTypes[selectedTraversal].order}</div>
                      <div><strong>Use Case:</strong> {traversalTypes[selectedTraversal].useCase}</div>
                      <div><strong>Result:</strong> [{traversalTypes[selectedTraversal].sequence.join(', ')}]</div>
                    </div>
                  </div>
                  
                  {/* Animated Tree */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-4">Traversal Animation</h4>
                    
                    <div className="relative mx-auto w-72 h-52">
                      <svg className="w-full h-full" viewBox="0 0 240 180">
                        {/* Edges */}
                        <line x1="120" y1="30" x2="70" y2="80" stroke="#6b7280" strokeWidth="2"/>
                        <line x1="120" y1="30" x2="170" y2="80" stroke="#6b7280" strokeWidth="2"/>
                        <line x1="70" y1="80" x2="40" y2="130" stroke="#6b7280" strokeWidth="2"/>
                        <line x1="70" y1="80" x2="100" y2="130" stroke="#6b7280" strokeWidth="2"/>
                        <line x1="170" y1="80" x2="140" y2="130" stroke="#6b7280" strokeWidth="2"/>
                        <line x1="170" y1="80" x2="200" y2="130" stroke="#6b7280" strokeWidth="2"/>
                        
                        {/* Animated nodes */}
                        {[
                          {id: '1', x: 120, y: 30, r: 18},
                          {id: '2', x: 70, y: 80, r: 15},
                          {id: '3', x: 170, y: 80, r: 15},
                          {id: '4', x: 40, y: 130, r: 12},
                          {id: '5', x: 100, y: 130, r: 12},
                          {id: '6', x: 140, y: 130, r: 12},
                          {id: '7', x: 200, y: 130, r: 12}
                        ].map((node, index) => {
                          const visitIndex = traversalTypes[selectedTraversal].visitOrder.indexOf(node.id);
                          const isVisited = animationStep > visitIndex;
                          const isCurrent = animationStep === visitIndex + 1;
                          
                          return (
                            <g key={node.id}>
                              <circle 
                                cx={node.x} 
                                cy={node.y} 
                                r={node.r} 
                                fill={isCurrent ? '#ef4444' : isVisited ? '#10b981' : '#e5e7eb'}
                                stroke={isCurrent ? '#dc2626' : isVisited ? '#059669' : '#9ca3af'}
                                strokeWidth="2"
                                className="transition-all duration-300"
                              />
                              <text 
                                x={node.x} 
                                y={node.y + 5} 
                                textAnchor="middle" 
                                fill={isVisited || isCurrent ? 'white' : '#6b7280'} 
                                fontSize={node.r === 18 ? "12" : node.r === 15 ? "10" : "9"} 
                                fontWeight="bold"
                              >
                                {node.id}
                              </text>
                            </g>
                          );
                        })}
                      </svg>
                    </div>
                    
                    <div className="flex justify-center space-x-4 mt-4 text-xs">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-gray-300 rounded-full mr-1"></div>
                        <span>Unvisited</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
                        <span>Current</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                        <span>Visited</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-900 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-white">Implementation:</h4>
                    <span className="text-xs text-gray-400">JavaScript</span>
                  </div>
                  <pre className="text-green-300 text-sm overflow-x-auto">
                    <code>{traversalTypes[selectedTraversal].code}</code>
                  </pre>
                  <div className="mt-4 p-3 bg-gray-800 rounded border border-gray-700">
                    <div className="text-xs text-gray-300">
                      <strong>Complexity:</strong> {traversalTypes[selectedTraversal].complexity}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Breadth-First Traversal */}
        <div id="breadth-first" className="bg-white rounded-2xl p-8 shadow-lg border text-gray-700">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center">
              <ArrowRight className="w-8 h-8 mr-3 text-blue-600" />
              Breadth-First Traversal
            </h2>
            <SectionProgressIndicator moduleId="trees" sectionId="breadth-first" />
          </div>
          
          <div className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Level-order traversal visits nodes level by level, from left to right. 
                  It uses a queue data structure to keep track of nodes to visit next.
                </p>
                
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-3">Level-Order Algorithm:</h4>
                  <ol className="space-y-2">
                    <li className="text-sm text-blue-800 flex items-start">
                      <span className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">1</span>
                      Start with root in queue
                    </li>
                    <li className="text-sm text-blue-800 flex items-start">
                      <span className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">2</span>
                      While queue is not empty:
                    </li>
                    <li className="text-sm text-blue-800 flex items-start ml-8">
                      <span className="w-4 h-4 bg-blue-400 text-white rounded-full flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">a</span>
                      Dequeue node and visit it
                    </li>
                    <li className="text-sm text-blue-800 flex items-start ml-8">
                      <span className="w-4 h-4 bg-blue-400 text-white rounded-full flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">b</span>
                      Add left child to queue (if exists)
                    </li>
                    <li className="text-sm text-blue-800 flex items-start ml-8">
                      <span className="w-4 h-4 bg-blue-400 text-white rounded-full flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">c</span>
                      Add right child to queue (if exists)
                    </li>
                  </ol>
                </div>
                
                <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-3">Common Applications:</h4>
                  <div className="space-y-2 text-green-800">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>Finding shortest path in unweighted graphs</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>Level-wise processing (e.g., printing each level)</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>Finding nodes at a specific distance</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>Tree serialization/deserialization</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-blue-900">Level-Order Traversal</h4>
                    <button
                      onClick={() => {setSelectedTraversal('levelorder'); startAnimation();}}
                      disabled={isAnimating}
                      className="flex items-center px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50"
                    >
                      <Play className="w-4 h-4 mr-1" />
                      {isAnimating && selectedTraversal === 'levelorder' ? 'Running...' : 'Animate'}
                    </button>
                  </div>
                  
                  {/* Level-by-level visualization */}
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-sm font-medium text-blue-800 mb-2">Visit order: [1, 2, 3, 4, 5, 6, 7]</div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-xs text-blue-600 w-12">Level 0:</span>
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-xs text-blue-600 w-12">Level 1:</span>
                        <div className="w-7 h-7 bg-blue-400 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                        <div className="w-7 h-7 bg-blue-400 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-xs text-blue-600 w-12">Level 2:</span>
                        <div className="w-6 h-6 bg-blue-300 text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
                        <div className="w-6 h-6 bg-blue-300 text-white rounded-full flex items-center justify-center text-xs font-bold">5</div>
                        <div className="w-6 h-6 bg-blue-300 text-white rounded-full flex items-center justify-center text-xs font-bold">6</div>
                        <div className="w-6 h-6 bg-blue-300 text-white rounded-full flex items-center justify-center text-xs font-bold">7</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-900 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-white">Level-Order Implementation:</h4>
                    <span className="text-xs text-gray-400">JavaScript</span>
                  </div>
                  <pre className="text-green-300 text-sm overflow-x-auto">
                    <code>{traversalTypes.levelorder.code}</code>
                  </pre>
                  <div className="mt-4 p-3 bg-gray-800 rounded border border-gray-700">
                    <div className="text-xs text-gray-300">
                      <strong>Complexity:</strong> {traversalTypes.levelorder.complexity}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Implementation Details */}
        <div id="implementation" className="bg-white rounded-2xl p-8 shadow-lg border text-gray-700">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center">
              <Code className="w-8 h-8 mr-3 text-orange-600" />
              Implementation Patterns
            </h2>
            <SectionProgressIndicator moduleId="trees" sectionId="implementation" />
          </div>
          
          <div className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
                  <h4 className="font-semibold text-orange-900 mb-3">Recursive vs Iterative:</h4>
                  <div className="space-y-3">
                    <div className="bg-white/70 p-3 rounded border">
                      <strong className="text-orange-800">Recursive (DFS):</strong>
                      <div className="text-sm text-orange-700 mt-1">Natural, clean code, uses call stack</div>
                      <div className="text-xs text-orange-600 mt-1">Space complexity: O(h) for call stack</div>
                    </div>
                    <div className="bg-white/70 p-3 rounded border">
                      <strong className="text-orange-800">Iterative (BFS):</strong>
                      <div className="text-sm text-orange-700 mt-1">Uses explicit queue, more control</div>
                      <div className="text-xs text-orange-600 mt-1">Space complexity: O(w) for queue</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                  <h4 className="font-semibold text-red-900 mb-3">Common Pitfalls:</h4>
                  <div className="space-y-2 text-red-800 text-sm">
                    <div><strong>Null checks:</strong> Always check if node exists before accessing</div>
                    <div><strong>Base case:</strong> Recursive functions need proper termination</div>
                    <div><strong>Stack overflow:</strong> Deep trees can cause stack overflow in recursion</div>
                    <div><strong>Order matters:</strong> Wrong order gives wrong traversal type</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gray-900 rounded-xl p-6">
                  <h4 className="font-semibold text-white mb-4">Iterative DFS Template:</h4>
                  <pre className="text-green-300 text-sm overflow-x-auto">
                    <code>{`function iterativeInorder(root) {
  const result = [];
  const stack = [];
  let current = root;
  
  while (current || stack.length > 0) {
    // Go to leftmost node
    while (current) {
      stack.push(current);
      current = current.left;
    }
    
    // Process node
    current = stack.pop();
    result.push(current.val);
    
    // Move to right subtree
    current = current.right;
  }
  
  return result;
}`}</code>
                  </pre>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-3">Performance Comparison:</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b-2 border-blue-300">
                          <th className="text-left p-2">Method</th>
                          <th className="text-left p-2">Time</th>
                          <th className="text-left p-2">Space</th>
                          <th className="text-left p-2">Notes</th>
                        </tr>
                      </thead>
                      <tbody className="text-blue-800">
                        <tr className="border-b border-blue-200">
                          <td className="p-2 font-medium">Recursive DFS</td>
                          <td className="p-2 text-green-600">O(n)</td>
                          <td className="p-2 text-yellow-600">O(h)</td>
                          <td className="p-2">Call stack space</td>
                        </tr>
                        <tr className="border-b border-blue-200">
                          <td className="p-2 font-medium">Iterative DFS</td>
                          <td className="p-2 text-green-600">O(n)</td>
                          <td className="p-2 text-yellow-600">O(h)</td>
                          <td className="p-2">Explicit stack</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">Level-order BFS</td>
                          <td className="p-2 text-green-600">O(n)</td>
                          <td className="p-2 text-orange-600">O(w)</td>
                          <td className="p-2">Queue space</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="text-xs text-blue-700 mt-2">
                    h = height of tree, w = maximum width of tree
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 text-gray-700 flex-wrap gap-4">
          <Link href="/learning-path/module-6/binary-trees" className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-600">Previous: Binary Trees</Link>
          <Link href="/learning-path/module-6/problems" className="ml-auto px-6 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Next: Tree Problems</Link>
        </div>
      </motion.div>
    </EnhancedModuleLayout>
  );
}