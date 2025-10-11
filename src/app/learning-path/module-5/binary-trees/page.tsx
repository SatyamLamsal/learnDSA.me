'use client';

import { motion } from 'framer-motion';
import { Network, Database, Search, Zap, CheckCircle, Info, Target, BookOpen, Binary, TreePine } from 'lucide-react';
import { useState } from 'react';
import { EnhancedModuleLayout } from '@/components/layouts/EnhancedModuleLayout';
import { SectionProgressIndicator } from '@/components/progress/SectionProgressIndicator';
import Link from 'next/link';

export default function BinaryTreesPage() {
  const [selectedOperation, setSelectedOperation] = useState<'insert' | 'search' | 'delete'>('insert');

  const sections = [
    { id: 'introduction', name: 'Binary Tree Basics', icon: Network },
    { id: 'bst', name: 'Binary Search Trees', icon: Search },
    { id: 'operations', name: 'BST Operations', icon: Database },
    { id: 'balancing', name: 'Tree Balancing', icon: Zap },
  ];

  const bstOperations: Record<'insert' | 'search' | 'delete', {steps: string[], code: string, complexity: string}> = {
    insert: {
      steps: [
        'Start at root node',
        'Compare new value with current node',
        'Go left if smaller, right if larger',
        'When you reach null, insert new node there'
      ],
      code: `function insert(root, value) {
  if (!root) return new Node(value);
  
  if (value < root.val) {
    root.left = insert(root.left, value);
  } else if (value > root.val) {
    root.right = insert(root.right, value);
  }
  
  return root;
}`,
      complexity: 'O(log n) average, O(n) worst case'
    },
    search: {
      steps: [
        'Start at root node',
        'Compare target with current node value',
        'Go left if target is smaller',
        'Go right if target is larger',
        'Return true if found, false if null'
      ],
      code: `function search(root, target) {
  if (!root) return false;
  
  if (target === root.val) return true;
  
  if (target < root.val) {
    return search(root.left, target);
  } else {
    return search(root.right, target);
  }
}`,
      complexity: 'O(log n) average, O(n) worst case'
    },
    delete: {
      steps: [
        'Find the node to delete',
        'Case 1: Node has no children - simply remove',
        'Case 2: Node has one child - replace with child',
        'Case 3: Node has two children - replace with inorder successor'
      ],
      code: `function deleteNode(root, value) {
  if (!root) return null;
  
  if (value < root.val) {
    root.left = deleteNode(root.left, value);
  } else if (value > root.val) {
    root.right = deleteNode(root.right, value);
  } else {
    // Node to delete found
    if (!root.left) return root.right;
    if (!root.right) return root.left;
    
    // Node has two children
    let successor = findMin(root.right);
    root.val = successor.val;
    root.right = deleteNode(root.right, successor.val);
  }
  
  return root;
}`,
      complexity: 'O(log n) average, O(n) worst case'
    }
  };

  return (
    <EnhancedModuleLayout
      moduleId="module-5"
      moduleTitle="Module 5: Trees"
      moduleDescription="Binary trees and search operations"
      sections={sections}
      enableScrollSpy
      backUrl="/learning-path/module-5"
      estimatedTime="22 minutes"
      difficulty="Advanced"
      totalSections={sections.length}
      currentPath="/learning-path/module-6/binary-trees"
      showFullCourseStructure={true}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12 text-gray-700"
      >
        {/* Binary Tree Introduction */}
        <div id="introduction" className="bg-white rounded-2xl p-8 shadow-lg border text-gray-700">
          <div className="flex items-center justify-between mb-8 text-gray-700">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center">
              <Network className="w-8 h-8 mr-3 text-blue-600" />
              Binary Tree Fundamentals
            </h2>
            <SectionProgressIndicator moduleId="trees" sectionId="binary-basics" />
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                A binary tree is a tree data structure where each node has at most two children, 
                typically referred to as the left child and right child. This simple constraint 
                makes binary trees incredibly versatile and efficient for many operations.
              </p>
              
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-3">Binary Tree Properties:</h4>
                <div className="space-y-2 text-blue-800">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>Each node has at most 2 children</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>Children are distinguished as "left" and "right"</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>Maximum nodes at level i: 2^i</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>Height h tree has at most 2^(h+1) - 1 nodes</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                <h4 className="font-semibold text-green-900 mb-3">Types of Binary Trees:</h4>
                <div className="space-y-3 text-sm text-green-800">
                  <div><strong>Full Binary Tree:</strong> Every node has 0 or 2 children</div>
                  <div><strong>Complete Binary Tree:</strong> All levels filled except possibly last (left-filled)</div>
                  <div><strong>Perfect Binary Tree:</strong> All internal nodes have 2 children, leaves at same level</div>
                  <div><strong>Balanced Binary Tree:</strong> Height difference between subtrees ≤ 1</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-4">Binary Tree Structure</h4>
              
              {/* Binary tree visualization */}
              <div className="relative mx-auto w-72 h-56 mb-4">
                <svg className="w-full h-full" viewBox="0 0 240 180">
                  {/* Edges */}
                  <line x1="120" y1="30" x2="80" y2="80" stroke="#3b82f6" strokeWidth="2"/>
                  <line x1="120" y1="30" x2="160" y2="80" stroke="#3b82f6" strokeWidth="2"/>
                  <line x1="80" y1="80" x2="50" y2="130" stroke="#3b82f6" strokeWidth="2"/>
                  <line x1="80" y1="80" x2="110" y2="130" stroke="#3b82f6" strokeWidth="2"/>
                  <line x1="160" y1="80" x2="190" y2="130" stroke="#3b82f6" strokeWidth="2"/>
                  
                  {/* Nodes */}
                  <circle cx="120" cy="30" r="18" fill="#1d4ed8" />
                  <circle cx="80" cy="80" r="15" fill="#3b82f6" />
                  <circle cx="160" cy="80" r="15" fill="#3b82f6" />
                  <circle cx="50" cy="130" r="12" fill="#60a5fa" />
                  <circle cx="110" cy="130" r="12" fill="#60a5fa" />
                  <circle cx="190" cy="130" r="12" fill="#60a5fa" />
                  
                  {/* Labels */}
                  <text x="120" y="35" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">50</text>
                  <text x="80" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">30</text>
                  <text x="160" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">70</text>
                  <text x="50" y="135" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">20</text>
                  <text x="110" y="135" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">40</text>
                  <text x="190" y="135" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">80</text>
                  
                  {/* Level indicators */}
                  <text x="10" y="35" fontSize="10" fill="#6b7280">Level 0</text>
                  <text x="10" y="85" fontSize="10" fill="#6b7280">Level 1</text>
                  <text x="10" y="135" fontSize="10" fill="#6b7280">Level 2</text>
                </svg>
              </div>
              
              <div className="space-y-2 text-sm text-blue-800">
                <div><strong>Root:</strong> 50 (top level)</div>
                <div><strong>Internal Nodes:</strong> 50, 30, 70 (have children)</div>
                <div><strong>Leaves:</strong> 20, 40, 80 (no children)</div>
                <div><strong>Height:</strong> 2 (maximum edges from root to leaf)</div>
                <div><strong>Size:</strong> 6 nodes total</div>
              </div>
            </div>
          </div>
        </div>

        {/* Binary Search Trees */}
        <div id="bst" className="bg-white rounded-2xl p-8 shadow-lg border text-gray-700">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center">
              <Search className="w-8 h-8 mr-3 text-green-600" />
              Binary Search Trees (BST)
            </h2>
            <SectionProgressIndicator moduleId="trees" sectionId="bst-intro" />
          </div>
          
          <div className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  A Binary Search Tree is a binary tree with a special ordering property: 
                  for every node, all values in the left subtree are smaller, and all values 
                  in the right subtree are larger than the node's value.
                </p>
                
                <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-3">BST Property:</h4>
                  <div className="space-y-2 text-green-800 text-sm">
                    <div className="bg-white/70 p-3 rounded border">
                      <strong>Left Subtree:</strong> All values &lt; node value
                    </div>
                    <div className="bg-white/70 p-3 rounded border">
                      <strong>Right Subtree:</strong> All values &gt; node value
                    </div>
                    <div className="bg-white/70 p-3 rounded border">
                      <strong>In-order Traversal:</strong> Produces sorted sequence
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
                  <h4 className="font-semibold text-yellow-900 mb-3">BST Advantages:</h4>
                  <div className="space-y-2 text-yellow-800">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>Efficient search: O(log n) average case</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>Dynamic size: Can grow/shrink during runtime</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>Ordered data: In-order traversal gives sorted output</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>Range queries: Easy to find values in a range</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                <h4 className="font-semibold text-green-900 mb-4">BST Example</h4>
                
                {/* BST visualization */}
                <div className="relative mx-auto w-72 h-56 mb-4">
                  <svg className="w-full h-full" viewBox="0 0 240 180">
                    {/* Edges */}
                    <line x1="120" y1="30" x2="70" y2="80" stroke="#10b981" strokeWidth="2"/>
                    <line x1="120" y1="30" x2="170" y2="80" stroke="#10b981" strokeWidth="2"/>
                    <line x1="70" y1="80" x2="40" y2="130" stroke="#10b981" strokeWidth="2"/>
                    <line x1="70" y1="80" x2="100" y2="130" stroke="#10b981" strokeWidth="2"/>
                    <line x1="170" y1="80" x2="140" y2="130" stroke="#10b981" strokeWidth="2"/>
                    <line x1="170" y1="80" x2="200" y2="130" stroke="#10b981" strokeWidth="2"/>
                    
                    {/* Nodes */}
                    <circle cx="120" cy="30" r="18" fill="#059669" />
                    <circle cx="70" cy="80" r="15" fill="#10b981" />
                    <circle cx="170" cy="80" r="15" fill="#10b981" />
                    <circle cx="40" cy="130" r="12" fill="#34d399" />
                    <circle cx="100" cy="130" r="12" fill="#34d399" />
                    <circle cx="140" cy="130" r="12" fill="#34d399" />
                    <circle cx="200" cy="130" r="12" fill="#34d399" />
                    
                    {/* Labels */}
                    <text x="120" y="35" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">15</text>
                    <text x="70" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">10</text>
                    <text x="170" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">20</text>
                    <text x="40" y="135" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">8</text>
                    <text x="100" y="135" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">12</text>
                    <text x="140" y="135" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">17</text>
                    <text x="200" y="135" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">25</text>
                  </svg>
                </div>
                
                <div className="space-y-2 text-sm text-green-800">
                  <div><strong>In-order:</strong> 8, 10, 12, 15, 17, 20, 25 (sorted!)</div>
                  <div><strong>Search path for 17:</strong> 15 → 20 → 17 (3 steps)</div>
                  <div><strong>All left subtree values &lt; parent</strong></div>
                  <div><strong>All right subtree values &gt; parent</strong></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BST Operations */}
        <div id="operations" className="bg-white rounded-2xl p-8 shadow-lg border text-gray-700">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center">
              <Database className="w-8 h-8 mr-3 text-purple-600" />
              BST Operations
            </h2>
            <SectionProgressIndicator moduleId="trees" sectionId="bst-operations" />
          </div>
          
          <div className="space-y-8">
            {/* Operation Selector */}
            <div className="flex flex-wrap gap-3 justify-center">
              {(Object.keys(bstOperations) as Array<keyof typeof bstOperations>).map((op) => (
                <button
                  key={op}
                  onClick={() => setSelectedOperation(op)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedOperation === op
                      ? 'bg-purple-600 text-white'
                      : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                  }`}
                >
                  {op.charAt(0).toUpperCase() + op.slice(1)}
                </button>
              ))}
            </div>
            
            {/* Selected Operation Details */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-4">
                    {selectedOperation.charAt(0).toUpperCase() + selectedOperation.slice(1)} Algorithm:
                  </h4>
                  <ol className="space-y-2">
                    {bstOperations[selectedOperation].steps.map((step, index) => (
                      <li key={index} className="text-sm text-purple-800 flex items-start">
                        <span className="w-5 h-5 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">
                          {index + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <div className="text-sm font-medium text-blue-900 mb-2">Time Complexity:</div>
                  <div className="text-blue-800">{bstOperations[selectedOperation].complexity}</div>
                </div>
              </div>
              
              <div className="bg-gray-900 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-white">Implementation:</h4>
                  <span className="text-xs text-gray-400">JavaScript</span>
                </div>
                <pre className="text-green-300 text-sm overflow-x-auto">
                  <code>{bstOperations[selectedOperation].code}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Tree Balancing */}
        <div id="balancing" className="bg-white rounded-2xl p-8 shadow-lg border text-gray-700">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center">
              <Zap className="w-8 h-8 mr-3 text-orange-600" />
              Tree Balancing & Performance
            </h2>
            <SectionProgressIndicator moduleId="trees" sectionId="balancing" />
          </div>
          
          <div className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  The performance of BST operations depends heavily on the tree's balance. 
                  An unbalanced tree can degrade to O(n) performance, essentially becoming a linked list.
                </p>
                
                <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                  <h4 className="font-semibold text-red-900 mb-3">The Balancing Problem:</h4>
                  <div className="space-y-3 text-red-800 text-sm">
                    <div><strong>Worst Case:</strong> Inserting sorted data creates a skewed tree</div>
                    <div><strong>Example:</strong> Insert [1, 2, 3, 4, 5] sequentially</div>
                    <div><strong>Result:</strong> Linear chain (essentially a linked list)</div>
                    <div><strong>Performance:</strong> O(n) instead of O(log n)</div>
                  </div>
                </div>
                
                <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
                  <h4 className="font-semibold text-orange-900 mb-3">Self-Balancing Trees:</h4>
                  <div className="space-y-2 text-orange-800">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span><strong>AVL Trees:</strong> Height-balanced, rotations on insert/delete</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span><strong>Red-Black Trees:</strong> Color-based balancing rules</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span><strong>Splay Trees:</strong> Recently accessed nodes move to root</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200">
                  <h4 className="font-semibold text-orange-900 mb-4">Balanced vs Unbalanced</h4>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-sm font-medium text-green-800 mb-2">Balanced Tree</div>
                      <svg className="w-full h-24" viewBox="0 0 120 80">
                        <line x1="60" y1="15" x2="30" y2="40" stroke="#10b981" strokeWidth="2"/>
                        <line x1="60" y1="15" x2="90" y2="40" stroke="#10b981" strokeWidth="2"/>
                        <line x1="30" y1="40" x2="15" y2="65" stroke="#10b981" strokeWidth="2"/>
                        <line x1="30" y1="40" x2="45" y2="65" stroke="#10b981" strokeWidth="2"/>
                        <circle cx="60" cy="15" r="8" fill="#10b981" />
                        <circle cx="30" cy="40" r="6" fill="#34d399" />
                        <circle cx="90" cy="40" r="6" fill="#34d399" />
                        <circle cx="15" cy="65" r="5" fill="#6ee7b7" />
                        <circle cx="45" cy="65" r="5" fill="#6ee7b7" />
                        <text x="60" y="19" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">4</text>
                        <text x="30" y="44" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">2</text>
                        <text x="90" y="44" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">6</text>
                        <text x="15" y="68" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">1</text>
                        <text x="45" y="68" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">3</text>
                      </svg>
                      <div className="text-xs text-green-600">Height: 2, Search: O(log n)</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-sm font-medium text-red-800 mb-2">Unbalanced Tree</div>
                      <svg className="w-full h-24" viewBox="0 0 120 80">
                        <line x1="20" y1="15" x2="35" y2="30" stroke="#ef4444" strokeWidth="2"/>
                        <line x1="35" y1="30" x2="50" y2="45" stroke="#ef4444" strokeWidth="2"/>
                        <line x1="50" y1="45" x2="65" y2="60" stroke="#ef4444" strokeWidth="2"/>
                        <circle cx="20" cy="15" r="6" fill="#ef4444" />
                        <circle cx="35" cy="30" r="6" fill="#f87171" />
                        <circle cx="50" cy="45" r="6" fill="#fca5a5" />
                        <circle cx="65" cy="60" r="6" fill="#fecaca" />
                        <text x="20" y="19" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">1</text>
                        <text x="35" y="34" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">2</text>
                        <text x="50" y="49" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">3</text>
                        <text x="65" y="64" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">4</text>
                      </svg>
                      <div className="text-xs text-red-600">Height: 3, Search: O(n)</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-3">Performance Comparison:</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b-2 border-green-300">
                          <th className="text-left p-2">Tree Type</th>
                          <th className="text-left p-2">Search</th>
                          <th className="text-left p-2">Insert</th>
                          <th className="text-left p-2">Delete</th>
                        </tr>
                      </thead>
                      <tbody className="text-green-800">
                        <tr className="border-b border-green-200">
                          <td className="p-2 font-medium">Balanced BST</td>
                          <td className="p-2 text-green-600">O(log n)</td>
                          <td className="p-2 text-green-600">O(log n)</td>
                          <td className="p-2 text-green-600">O(log n)</td>
                        </tr>
                        <tr className="border-b border-green-200">
                          <td className="p-2 font-medium">Unbalanced BST</td>
                          <td className="p-2 text-red-600">O(n)</td>
                          <td className="p-2 text-red-600">O(n)</td>
                          <td className="p-2 text-red-600">O(n)</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">AVL Tree</td>
                          <td className="p-2 text-blue-600">O(log n)</td>
                          <td className="p-2 text-blue-600">O(log n)</td>
                          <td className="p-2 text-blue-600">O(log n)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 text-gray-700 flex-wrap gap-4">
          <Link href="/learning-path/module-6/basics" className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-600">Previous: Tree Basics</Link>
          <Link href="/learning-path/module-6/traversal" className="ml-auto px-6 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Next: Tree Traversal</Link>
        </div>
      </motion.div>
    </EnhancedModuleLayout>
  );
}