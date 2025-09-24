"use client";
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  SkipForward, 
  GitBranch, 
  TreePine,
  Network,
  Settings,
  Search,
  Plus,
  Trash2,
  Eye,
  RotateCcw,
  PlayCircle
} from 'lucide-react';

interface TreeNode {
  value: number;
  x: number;
  y: number;
  level: number;
}

const TreeTheoryPage: React.FC = () => {
  // Sample BST for visualization
  const bstNodes: TreeNode[] = [
    { value: 50, x: 400, y: 50, level: 0 },
    { value: 30, x: 200, y: 150, level: 1 },
    { value: 70, x: 600, y: 150, level: 1 },
    { value: 20, x: 100, y: 250, level: 2 },
    { value: 40, x: 300, y: 250, level: 2 },
    { value: 60, x: 500, y: 250, level: 2 },
    { value: 80, x: 700, y: 250, level: 2 },
  ];

  const TreeDiagram: React.FC<{ nodes: TreeNode[]; title: string }> = ({ nodes, title }) => (
    <div className="bg-gray-50 rounded-lg p-6 border">
      <h4 className="text-lg font-semibold text-center mb-4 text-gray-800">{title}</h4>
      <div className="relative h-80 bg-white rounded border">
        <svg className="absolute inset-0 w-full h-full">
          {/* Draw connections */}
          <g stroke="#d1d5db" strokeWidth="2" fill="none">
            <line x1="400" y1="50" x2="200" y2="150" />
            <line x1="400" y1="50" x2="600" y2="150" />
            <line x1="200" y1="150" x2="100" y2="250" />
            <line x1="200" y1="150" x2="300" y2="250" />
            <line x1="600" y1="150" x2="500" y2="250" />
            <line x1="600" y1="150" x2="700" y2="250" />
          </g>
        </svg>
        
        {/* Draw nodes */}
        {nodes.map((node, index) => (
          <motion.div
            key={node.value}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="absolute w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm transform -translate-x-5 -translate-y-5"
            style={{ left: `${(node.x / 800) * 100}%`, top: `${(node.y / 320) * 100}%` }}
          >
            {node.value}
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Link href="/data-structures/trees" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Trees Overview
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Trees Theory</h1>
          <p className="text-xl text-gray-600 max-w-4xl leading-relaxed">
            Comprehensive guide to tree data structures, covering fundamental concepts, 
            various tree types, and essential algorithms for tree operations.
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* Basic Concepts */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <TreePine className="h-8 w-8 text-purple-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Fundamental Concepts</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-purple-700">What is a Tree?</h3>
                <div className="space-y-4 text-gray-700">
                  <p>
                    A <strong>tree</strong> is a hierarchical data structure consisting of nodes connected by edges. 
                    It&apos;s called a tree because it resembles an inverted tree with the root at the top and leaves at the bottom.
                  </p>
                  <p>
                    <strong>Key Properties:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Exactly one path exists between any two nodes</li>
                    <li>No cycles (acyclic graph)</li>
                    <li>Connected graph with n-1 edges for n nodes</li>
                    <li>Hierarchical structure with parent-child relationships</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-purple-700">Tree Terminology</h3>
                <div className="space-y-3 text-gray-700">
                  <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-500">
                    <strong>Root:</strong> The topmost node with no parent
                  </div>
                  <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-500">
                    <strong>Leaf:</strong> A node with no children
                  </div>
                  <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-500">
                    <strong>Internal Node:</strong> A node with at least one child
                  </div>
                  <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-500">
                    <strong>Height:</strong> Maximum distance from root to any leaf
                  </div>
                  <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-500">
                    <strong>Depth:</strong> Distance from root to a specific node
                  </div>
                  <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-500">
                    <strong>Subtree:</strong> A tree formed by a node and its descendants
                  </div>
                </div>
              </div>
            </div>

            {/* Visual representation */}
            <div className="mt-8">
              <TreeDiagram nodes={bstNodes} title="Binary Search Tree Example" />
            </div>
          </motion.section>

          {/* Binary Trees */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <GitBranch className="h-8 w-8 text-purple-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Binary Trees</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-purple-700">Binary Tree Properties</h3>
                <div className="space-y-4 text-gray-700">
                  <p>
                    A <strong>binary tree</strong> is a tree where each node has at most two children, 
                    typically called left and right child.
                  </p>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Types of Binary Trees:</h4>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><strong>Full Binary Tree:</strong> Every node has 0 or 2 children</li>
                      <li><strong>Complete Binary Tree:</strong> All levels filled except possibly the last</li>
                      <li><strong>Perfect Binary Tree:</strong> All internal nodes have 2 children, all leaves at same level</li>
                      <li><strong>Balanced Binary Tree:</strong> Height difference between left and right subtrees ≤ 1</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-purple-700">Binary Tree Implementation</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }
  
  insert(val) {
    const newNode = new TreeNode(val);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    
    // Insert logic here
    this.insertHelper(this.root, newNode);
  }
  
  insertHelper(node, newNode) {
    if (newNode.val < node.val) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this.insertHelper(node.left, newNode);
      }
    } else {
      if (!node.right) {
        node.right = newNode;
      } else {
        this.insertHelper(node.right, newNode);
      }
    }
  }
}`}</pre>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Tree Traversals */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Network className="h-8 w-8 text-purple-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Tree Traversal Algorithms</h2>
            </div>

            <p className="text-gray-700 mb-6">
              Tree traversal is the process of visiting each node in a tree exactly once. 
              There are different ways to traverse a tree, each useful for different purposes.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <h3 className="text-lg font-semibold mb-3 text-green-800">Depth-First Traversals</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-green-700">1. Inorder (Left → Root → Right)</h4>
                      <p className="text-sm text-gray-600 mb-2">Visit left subtree, then root, then right subtree</p>
                      <div className="bg-gray-900 text-green-400 p-3 rounded text-sm font-mono">
                        <pre>{`function inorder(node) {
  if (node) {
    inorder(node.left);
    console.log(node.val);
    inorder(node.right);
  }
}`}</pre>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Result for BST: 20, 30, 40, 50, 60, 70, 80 (sorted order)
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-green-700">2. Preorder (Root → Left → Right)</h4>
                      <p className="text-sm text-gray-600 mb-2">Visit root, then left subtree, then right subtree</p>
                      <div className="bg-gray-900 text-green-400 p-3 rounded text-sm font-mono">
                        <pre>{`function preorder(node) {
  if (node) {
    console.log(node.val);
    preorder(node.left);
    preorder(node.right);
  }
}`}</pre>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Result: 50, 30, 20, 40, 70, 60, 80 (useful for copying tree)
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-green-700">3. Postorder (Left → Right → Root)</h4>
                      <p className="text-sm text-gray-600 mb-2">Visit left subtree, then right subtree, then root</p>
                      <div className="bg-gray-900 text-green-400 p-3 rounded text-sm font-mono">
                        <pre>{`function postorder(node) {
  if (node) {
    postorder(node.left);
    postorder(node.right);
    console.log(node.val);
  }
}`}</pre>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Result: 20, 40, 30, 60, 80, 70, 50 (useful for deleting tree)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-semibold mb-3 text-blue-800">Breadth-First Traversal</h3>
                  
                  <div>
                    <h4 className="font-semibold text-blue-700">Level Order Traversal</h4>
                    <p className="text-sm text-gray-600 mb-3">Visit nodes level by level from left to right</p>
                    <div className="bg-gray-900 text-blue-400 p-3 rounded text-sm font-mono">
                      <pre>{`function levelOrder(root) {
  if (!root) return;
  
  const queue = [root];
  
  while (queue.length > 0) {
    const node = queue.shift();
    console.log(node.val);
    
    if (node.left) {
      queue.push(node.left);
    }
    if (node.right) {
      queue.push(node.right);
    }
  }
}`}</pre>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Result: 50, 30, 70, 20, 40, 60, 80 (level by level)
                    </p>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                  <h3 className="text-lg font-semibold mb-3 text-purple-800">Traversal Comparison</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Time Complexity:</span>
                      <span className="font-mono text-purple-600">O(n)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Space Complexity:</span>
                      <span className="font-mono text-purple-600">O(h)</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      where n = number of nodes, h = height of tree
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Binary Search Trees */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Search className="h-8 w-8 text-purple-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Binary Search Trees (BST)</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-purple-700">BST Properties</h3>
                <div className="space-y-4 text-gray-700">
                  <p>
                    A <strong>Binary Search Tree</strong> is a binary tree with the following property:
                  </p>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h4 className="font-semibold text-yellow-800 mb-2">BST Property:</h4>
                    <p className="text-sm">
                      For every node in the tree:
                    </p>
                    <ul className="list-disc pl-4 text-sm mt-2">
                      <li>All values in the left subtree are less than the node&apos;s value</li>
                      <li>All values in the right subtree are greater than the node&apos;s value</li>
                      <li>Both left and right subtrees are also BSTs</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Advantages:</h4>
                    <ul className="list-disc pl-4 text-sm space-y-1">
                      <li>Efficient searching: O(log n) average case</li>
                      <li>Inorder traversal gives sorted sequence</li>
                      <li>Dynamic size (can grow/shrink)</li>
                      <li>No memory waste (unlike arrays)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-purple-700">BST Operations</h3>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded border">
                    <h4 className="font-semibold flex items-center mb-2">
                      <Search className="h-4 w-4 mr-2 text-blue-600" />
                      Search Operation
                    </h4>
                    <div className="bg-gray-900 text-gray-100 p-3 rounded text-xs font-mono">
                      <pre>{`function search(root, val) {
  if (!root || root.val === val) {
    return root;
  }
  
  if (val < root.val) {
    return search(root.left, val);
  } else {
    return search(root.right, val);
  }
}`}</pre>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded border">
                    <h4 className="font-semibold flex items-center mb-2">
                      <Plus className="h-4 w-4 mr-2 text-green-600" />
                      Insert Operation
                    </h4>
                    <div className="bg-gray-900 text-gray-100 p-3 rounded text-xs font-mono">
                      <pre>{`function insert(root, val) {
  if (!root) {
    return new TreeNode(val);
  }
  
  if (val < root.val) {
    root.left = insert(root.left, val);
  } else if (val > root.val) {
    root.right = insert(root.right, val);
  }
  
  return root;
}`}</pre>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded border">
                    <h4 className="font-semibold flex items-center mb-2">
                      <Trash2 className="h-4 w-4 mr-2 text-red-600" />
                      Delete Operation
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">Three cases to handle:</p>
                    <ul className="text-xs text-gray-600 list-disc pl-4 space-y-1">
                      <li><strong>No children:</strong> Simply remove the node</li>
                      <li><strong>One child:</strong> Replace node with its child</li>
                      <li><strong>Two children:</strong> Replace with inorder successor/predecessor</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Balanced Trees */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Settings className="h-8 w-8 text-purple-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Balanced Trees</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <h3 className="text-lg font-semibold mb-3 text-red-800">AVL Trees</h3>
                <div className="space-y-3 text-sm">
                  <p className="text-gray-700">
                    Self-balancing BST where height difference between left and right subtrees is at most 1.
                  </p>
                  <div className="bg-red-100 p-3 rounded">
                    <h4 className="font-semibold text-red-800 mb-1">Features:</h4>
                    <ul className="list-disc pl-4 text-xs space-y-1">
                      <li>Guarantee O(log n) operations</li>
                      <li>Automatic rebalancing via rotations</li>
                      <li>Height-balanced property maintained</li>
                    </ul>
                  </div>
                  <div className="text-xs text-gray-600">
                    <strong>Rotations:</strong> Left, Right, Left-Right, Right-Left
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold mb-3 text-blue-800">Red-Black Trees</h3>
                <div className="space-y-3 text-sm">
                  <p className="text-gray-700">
                    Self-balancing BST with colored nodes that satisfy specific color properties.
                  </p>
                  <div className="bg-blue-100 p-3 rounded">
                    <h4 className="font-semibold text-blue-800 mb-1">Properties:</h4>
                    <ul className="list-disc pl-4 text-xs space-y-1">
                      <li>Every node is red or black</li>
                      <li>Root is always black</li>
                      <li>Red nodes have black children</li>
                      <li>All paths to leaves have same black height</li>
                    </ul>
                  </div>
                  <div className="text-xs text-gray-600">
                    <strong>Used in:</strong> C++ STL, Java TreeMap, Linux kernel
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-lg font-semibold mb-3 text-green-800">Heaps</h3>
                <div className="space-y-3 text-sm">
                  <p className="text-gray-700">
                    Complete binary tree that satisfies the heap property.
                  </p>
                  <div className="bg-green-100 p-3 rounded">
                    <h4 className="font-semibold text-green-800 mb-1">Types:</h4>
                    <ul className="list-disc pl-4 text-xs space-y-1">
                      <li><strong>Max Heap:</strong> Parent ≥ children</li>
                      <li><strong>Min Heap:</strong> Parent ≤ children</li>
                      <li>Efficient priority queue implementation</li>
                    </ul>
                  </div>
                  <div className="text-xs text-gray-600">
                    <strong>Operations:</strong> Insert O(log n), Extract O(log n), Peek O(1)
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Applications */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Real-World Applications</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-6 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-3">File Systems</h3>
                <p className="text-sm text-gray-700">
                  Directory structures in operating systems use tree hierarchies to organize files and folders.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-3">Database Indexing</h3>
                <p className="text-sm text-gray-700">
                  B-trees and B+ trees enable efficient searching, insertion, and deletion in database systems.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-3">Expression Parsing</h3>
                <p className="text-sm text-gray-700">
                  Abstract syntax trees represent mathematical expressions and code structure in compilers.
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-6 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-3">Decision Trees</h3>
                <p className="text-sm text-gray-700">
                  Machine learning algorithms use decision trees for classification and regression problems.
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-100 to-red-200 p-6 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-3">Network Routing</h3>
                <p className="text-sm text-gray-700">
                  Routing algorithms use tree structures to find optimal paths in computer networks.
                </p>
              </div>

              <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 p-6 rounded-lg">
                <h3 className="font-semibold text-indigo-800 mb-3">Game Trees</h3>
                <p className="text-sm text-gray-700">
                  AI algorithms like minimax use game trees to evaluate possible moves in strategy games.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Complexity Summary */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow-lg p-8"
          >
            <h2 className="text-3xl font-bold mb-6">Complexity Summary</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Time Complexity</h3>
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="font-semibold">Operation</div>
                    <div className="font-semibold">Average</div>
                    <div className="font-semibold">Worst</div>
                    
                    <div>Search</div>
                    <div className="font-mono">O(log n)</div>
                    <div className="font-mono">O(n)</div>
                    
                    <div>Insert</div>
                    <div className="font-mono">O(log n)</div>
                    <div className="font-mono">O(n)</div>
                    
                    <div>Delete</div>
                    <div className="font-mono">O(log n)</div>
                    <div className="font-mono">O(n)</div>
                    
                    <div>Traversal</div>
                    <div className="font-mono">O(n)</div>
                    <div className="font-mono">O(n)</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Space Complexity</h3>
                <div className="bg-white bg-opacity-20 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span>Storage:</span>
                    <span className="font-mono">O(n)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Recursion (balanced):</span>
                    <span className="font-mono">O(log n)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Recursion (skewed):</span>
                    <span className="font-mono">O(n)</span>
                  </div>
                  <div className="text-sm mt-4 opacity-90">
                    <p><strong>Note:</strong> Balanced trees guarantee O(log n) for all operations</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex justify-between items-center"
          >
            <Link
              href="/data-structures/trees"
              className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Overview
            </Link>
            
            <Link
              href="/data-structures/trees/simulation"
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Interactive Simulation
              <SkipForward className="h-5 w-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TreeTheoryPage;
