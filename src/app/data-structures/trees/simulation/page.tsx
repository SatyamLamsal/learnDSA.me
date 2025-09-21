'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  SkipForward,
  Plus, 
  Minus, 
  Search, 
  RotateCcw, 
  Play, 
  Pause,
  Eye,
  TreePine,
  GitBranch,
  AlertCircle,
  Settings,
  ChevronDown
} from 'lucide-react';

interface TreeNode {
  id: number;
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
  x: number;
  y: number;
  level: number;
  isHighlighted?: boolean;
  isAnimating?: boolean;
  color?: string;
}

interface TreeOperation {
  type: 'insert' | 'delete' | 'search' | 'traverse';
  value?: number;
  result?: string;
  path?: number[];
}

type TraversalType = 'inorder' | 'preorder' | 'postorder' | 'levelorder';

const TreesSimulationPage: React.FC = () => {
  const [root, setRoot] = useState<TreeNode | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentOperation, setCurrentOperation] = useState<string>('');
  const [operationHistory, setOperationHistory] = useState<TreeOperation[]>([]);
  const [autoPlay, setAutoPlay] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1000);
  const [traversalType, setTraversalType] = useState<TraversalType>('inorder');
  const [traversalResult, setTraversalResult] = useState<number[]>([]);
  const [isTraversing, setIsTraversing] = useState(false);
  const [nodeCounter, setNodeCounter] = useState(1);
  const [treeHeight, setTreeHeight] = useState(0);
  const [nodeCount, setNodeCount] = useState(0);
  const [selectedTreeType, setSelectedTreeType] = useState<'bst' | 'complete' | 'perfect'>('bst');

  // Demo operations for auto-play
  const demoOperations = [
    () => insertNode(50),
    () => insertNode(30),
    () => insertNode(70),
    () => insertNode(20),
    () => insertNode(40),
    () => insertNode(60),
    () => insertNode(80),
    () => searchNode(40),
    () => traverseTree('inorder'),
    () => deleteNode(30),
  ];

  const [demoIndex, setDemoIndex] = useState(0);

  // Calculate node positions for visualization
  const calculatePositions = useCallback((node: TreeNode | null, x: number = 400, y: number = 80, level: number = 0, spacing: number = 200): TreeNode | null => {
    if (!node) return null;

    const newNode = {
      ...node,
      x,
      y,
      level,
    };

    const levelSpacing = spacing / Math.pow(2, level);

    if (node.left) {
      newNode.left = calculatePositions(node.left, x - levelSpacing, y + 80, level + 1, spacing);
    }

    if (node.right) {
      newNode.right = calculatePositions(node.right, x + levelSpacing, y + 80, level + 1, spacing);
    }

    return newNode;
  }, []);

  // Update tree statistics
  const updateTreeStats = useCallback((node: TreeNode | null) => {
    const getHeight = (n: TreeNode | null): number => {
      if (!n) return 0;
      return 1 + Math.max(getHeight(n.left), getHeight(n.right));
    };

    const getNodeCount = (n: TreeNode | null): number => {
      if (!n) return 0;
      return 1 + getNodeCount(n.left) + getNodeCount(n.right);
    };

    setTreeHeight(getHeight(node));
    setNodeCount(getNodeCount(node));
  }, []);

  // Insert node into BST
  const insertNode = async (value: number) => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentOperation(`Inserting ${value} into the tree...`);

    const insert = (node: TreeNode | null, val: number): TreeNode => {
      if (!node) {
        const newNode: TreeNode = {
          id: nodeCounter,
          value: val,
          left: null,
          right: null,
          x: 0,
          y: 0,
          level: 0,
          isAnimating: true,
          color: '#10b981',
        };
        setNodeCounter(prev => prev + 1);
        return newNode;
      }

      if (val < node.value) {
        node.left = insert(node.left, val);
      } else if (val > node.value) {
        node.right = insert(node.right, val);
      }

      return node;
    };

    const newRoot = root ? insert(root, value) : insert(null, value);
    const positionedRoot = calculatePositions(newRoot);
    setRoot(positionedRoot);

    setTimeout(() => {
      if (positionedRoot) {
        const clearAnimations = (node: TreeNode): TreeNode => ({
          ...node,
          isAnimating: false,
          left: node.left ? clearAnimations(node.left) : null,
          right: node.right ? clearAnimations(node.right) : null,
        });

        const finalRoot = clearAnimations(positionedRoot);
        setRoot(finalRoot);
        updateTreeStats(finalRoot);
      }

      setIsAnimating(false);
      setCurrentOperation(`Successfully inserted ${value}`);
      setOperationHistory(prev => [...prev, { type: 'insert', value, result: 'success' }]);
      setInputValue('');
    }, 800);
  };

  // Search for a node
  const searchNode = async (value: number) => {
    if (isAnimating || !root) return;

    setIsAnimating(true);
    setCurrentOperation(`Searching for ${value}...`);

    const searchPath: number[] = [];
    const found = await searchHelper(root, value, searchPath);

    setCurrentOperation(
      found 
        ? `Found ${value} in the tree! Path: ${searchPath.join(' → ')}` 
        : `${value} not found in the tree. Path searched: ${searchPath.join(' → ')}`
    );
    
    setOperationHistory(prev => [...prev, { 
      type: 'search', 
      value, 
      result: found ? 'found' : 'not found',
      path: searchPath 
    }]);

    setIsAnimating(false);
    setSearchValue('');
  };

  const searchHelper = (node: TreeNode | null, value: number, path: number[]): Promise<boolean> => {
    return new Promise((resolve) => {
      if (!node) {
        resolve(false);
        return;
      }

      path.push(node.value);

      // Highlight current node
      const highlightNode = (n: TreeNode): TreeNode => ({
        ...n,
        isHighlighted: n.value === node.value,
        left: n.left ? highlightNode(n.left) : null,
        right: n.right ? highlightNode(n.right) : null,
      });

      if (root) {
        setRoot(highlightNode(root));
      }

      setTimeout(() => {
        if (value === node.value) {
          resolve(true);
        } else if (value < node.value) {
          searchHelper(node.left, value, path).then(resolve);
        } else {
          searchHelper(node.right, value, path).then(resolve);
        }
      }, 600);
    });
  };

  // Delete node from BST
  const deleteNode = async (value: number) => {
    if (isAnimating || !root) return;

    setIsAnimating(true);
    setCurrentOperation(`Deleting ${value} from the tree...`);

    const deleteHelper = (node: TreeNode | null, val: number): TreeNode | null => {
      if (!node) return null;

      if (val < node.value) {
        node.left = deleteHelper(node.left, val);
      } else if (val > node.value) {
        node.right = deleteHelper(node.right, val);
      } else {
        // Node to be deleted found
        if (!node.left) return node.right;
        if (!node.right) return node.left;

        // Node with two children - find inorder successor
        const findMin = (n: TreeNode): TreeNode => {
          while (n.left) n = n.left;
          return n;
        };

        const minNode = findMin(node.right);
        node.value = minNode.value;
        node.right = deleteHelper(node.right, minNode.value);
      }

      return node;
    };

    const newRoot = deleteHelper(root, value);
    const positionedRoot = calculatePositions(newRoot);
    setRoot(positionedRoot);

    setTimeout(() => {
      setIsAnimating(false);
      setCurrentOperation(`Successfully deleted ${value}`);
      setOperationHistory(prev => [...prev, { type: 'delete', value, result: 'success' }]);
      updateTreeStats(positionedRoot);
    }, 800);
  };

  // Tree traversal
  const traverseTree = async (type: TraversalType) => {
    if (isTraversing || !root) return;

    setIsTraversing(true);
    setTraversalResult([]);
    setCurrentOperation(`Performing ${type} traversal...`);

    const result: number[] = [];

    const traverse = async (node: TreeNode | null): Promise<void> => {
      if (!node) return;

      // Highlight current node
      const highlightNode = (n: TreeNode): TreeNode => ({
        ...n,
        isHighlighted: n.value === node.value,
        left: n.left ? highlightNode(n.left) : null,
        right: n.right ? highlightNode(n.right) : null,
      });

      setRoot(highlightNode(root));

      await new Promise(resolve => setTimeout(resolve, 800));

      switch (type) {
        case 'preorder':
          result.push(node.value);
          setTraversalResult([...result]);
          await traverse(node.left);
          await traverse(node.right);
          break;
        case 'inorder':
          await traverse(node.left);
          result.push(node.value);
          setTraversalResult([...result]);
          await traverse(node.right);
          break;
        case 'postorder':
          await traverse(node.left);
          await traverse(node.right);
          result.push(node.value);
          setTraversalResult([...result]);
          break;
        case 'levelorder':
          // Implemented separately
          break;
      }
    };

    if (type === 'levelorder') {
      await levelOrderTraversal();
    } else {
      await traverse(root);
    }

    // Clear highlights
    const clearHighlights = (node: TreeNode): TreeNode => ({
      ...node,
      isHighlighted: false,
      left: node.left ? clearHighlights(node.left) : null,
      right: node.right ? clearHighlights(node.right) : null,
    });

    setRoot(clearHighlights(root));
    setIsTraversing(false);
    setCurrentOperation(`${type} traversal completed: [${result.join(', ')}]`);
    setOperationHistory(prev => [...prev, { type: 'traverse', result: type }]);
  };

  const levelOrderTraversal = async () => {
    if (!root) return;

    const queue: TreeNode[] = [root];
    const result: number[] = [];

    while (queue.length > 0) {
      const node = queue.shift()!;
      result.push(node.value);
      setTraversalResult([...result]);

      // Highlight current node
      const highlightNode = (n: TreeNode): TreeNode => ({
        ...n,
        isHighlighted: n.value === node.value,
        left: n.left ? highlightNode(n.left) : null,
        right: n.right ? highlightNode(n.right) : null,
      });

      setRoot(highlightNode(root));

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);

      await new Promise(resolve => setTimeout(resolve, 800));
    }
  };

  // Clear tree
  const clearTree = () => {
    setRoot(null);
    setTraversalResult([]);
    setCurrentOperation('Tree cleared');
    setOperationHistory([]);
    setInputValue('');
    setSearchValue('');
    setAutoPlay(false);
    setDemoIndex(0);
    setNodeCounter(1);
    setTreeHeight(0);
    setNodeCount(0);
  };

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && demoIndex < demoOperations.length) {
      const timer = setTimeout(() => {
        demoOperations[demoIndex]();
        setDemoIndex(prev => prev + 1);
      }, playbackSpeed);

      return () => clearTimeout(timer);
    } else if (autoPlay && demoIndex >= demoOperations.length) {
      setAutoPlay(false);
      setDemoIndex(0);
    }
  }, [autoPlay, demoIndex, playbackSpeed, demoOperations]);

  // Render tree nodes and connections
  const renderTree = (node: TreeNode | null): React.ReactElement | null => {
    if (!node) return null;

    return (
      <g key={node.id}>
        {/* Connections to children */}
        {node.left && (
          <line
            x1={node.x}
            y1={node.y}
            x2={node.left.x}
            y2={node.left.y}
            stroke="#94a3b8"
            strokeWidth="2"
            className="transition-all duration-300"
          />
        )}
        {node.right && (
          <line
            x1={node.x}
            y1={node.y}
            x2={node.right.x}
            y2={node.right.y}
            stroke="#94a3b8"
            strokeWidth="2"
            className="transition-all duration-300"
          />
        )}

        {/* Node circle */}
        <motion.circle
          cx={node.x}
          cy={node.y}
          r="20"
          fill={node.isHighlighted ? '#f59e0b' : node.isAnimating ? '#10b981' : '#8b5cf6'}
          stroke={node.isHighlighted ? '#d97706' : '#6d28d9'}
          strokeWidth="2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="cursor-pointer"
        />

        {/* Node value */}
        <text
          x={node.x}
          y={node.y + 5}
          textAnchor="middle"
          fill="white"
          fontSize="14"
          fontWeight="bold"
        >
          {node.value}
        </text>

        {/* Render children */}
        {renderTree(node.left)}
        {renderTree(node.right)}
      </g>
    );
  };

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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Interactive Tree Simulation</h1>
          <p className="text-xl text-gray-600 max-w-4xl leading-relaxed">
            Build and manipulate binary search trees with real-time visualization. 
            Practice insertion, deletion, searching, and traversal algorithms.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Controls Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4 space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">Controls</h2>
              
              {/* Tree Operations */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Insert Node
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && inputValue && insertNode(parseInt(inputValue))}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Value..."
                      disabled={isAnimating}
                    />
                    <button
                      onClick={() => inputValue && insertNode(parseInt(inputValue))}
                      disabled={isAnimating || !inputValue}
                      className="flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search Node
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && searchValue && searchNode(parseInt(searchValue))}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Search..."
                      disabled={isAnimating}
                    />
                    <button
                      onClick={() => searchValue && searchNode(parseInt(searchValue))}
                      disabled={isAnimating || !searchValue || !root}
                      className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      <Search className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delete Node
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Delete..."
                      disabled={isAnimating}
                    />
                    <button
                      onClick={() => inputValue && deleteNode(parseInt(inputValue))}
                      disabled={isAnimating || !inputValue || !root}
                      className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={clearTree}
                  disabled={isAnimating}
                  className="w-full flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Clear Tree
                </button>
              </div>

              {/* Traversal Controls */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tree Traversal</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Traversal Type
                    </label>
                    <select
                      value={traversalType}
                      onChange={(e) => setTraversalType(e.target.value as TraversalType)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      disabled={isTraversing}
                    >
                      <option value="inorder">Inorder (Left-Root-Right)</option>
                      <option value="preorder">Preorder (Root-Left-Right)</option>
                      <option value="postorder">Postorder (Left-Right-Root)</option>
                      <option value="levelorder">Level Order (BFS)</option>
                    </select>
                  </div>
                  
                  <button
                    onClick={() => traverseTree(traversalType)}
                    disabled={isTraversing || !root}
                    className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    {isTraversing ? 'Traversing...' : 'Start Traversal'}
                  </button>

                  {traversalResult.length > 0 && (
                    <div className="bg-green-50 p-3 rounded border border-green-200">
                      <p className="text-sm font-medium text-green-800 mb-1">Result:</p>
                      <p className="text-sm text-green-700">[{traversalResult.join(', ')}]</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Auto-play Demo */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Auto-play Demo</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Speed: {playbackSpeed}ms
                    </label>
                    <input
                      type="range"
                      min="500"
                      max="2000"
                      step="250"
                      value={playbackSpeed}
                      onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                      className="w-full"
                      disabled={autoPlay}
                    />
                  </div>
                  
                  <button
                    onClick={() => {
                      if (autoPlay) {
                        setAutoPlay(false);
                      } else {
                        clearTree();
                        setAutoPlay(true);
                        setDemoIndex(0);
                      }
                    }}
                    className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    {autoPlay ? (
                      <>
                        <Pause className="h-4 w-4 mr-2" />
                        Stop Demo
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Start Demo
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Tree Statistics */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tree Info</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nodes:</span>
                    <span className="font-medium">{nodeCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Height:</span>
                    <span className="font-medium">{treeHeight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Is Empty:</span>
                    <span className="font-medium">{nodeCount === 0 ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Is Balanced:</span>
                    <span className="font-medium">{treeHeight <= Math.log2(nodeCount + 1) + 1 ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Binary Search Tree Visualization</h2>
              
              {/* Current Operation Display */}
              {currentOperation && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-lg bg-blue-50 border border-blue-200 text-blue-700"
                >
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <span className="font-medium">{currentOperation}</span>
                  </div>
                </motion.div>
              )}

              {/* Tree Visualization */}
              <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-4 min-h-[500px] overflow-auto">
                {root ? (
                  <svg width="100%" height="500" viewBox="0 0 800 500" className="w-full">
                    {renderTree(root)}
                  </svg>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <div className="text-center">
                      <TreePine className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium">Tree is empty</p>
                      <p className="text-sm">Add some nodes to get started</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Operation History */}
              {operationHistory.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Operation History</h3>
                  <div className="bg-gray-50 rounded-lg p-4 max-h-32 overflow-y-auto">
                    <div className="space-y-1">
                      {operationHistory.slice(-5).map((operation, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-sm text-gray-600"
                        >
                          {operationHistory.length - 4 + index}. {operation.type.toUpperCase()}: {operation.value || operation.result}
                          {operation.path && ` (Path: ${operation.path.join(' → ')})`}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Algorithm Complexity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Time & Space Complexity</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-700 mb-2">Search</h3>
              <p className="text-sm text-gray-600">
                Average: <span className="font-mono text-purple-600">O(log n)</span><br/>
                Worst: <span className="font-mono text-red-600">O(n)</span>
              </p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-700 mb-2">Insert</h3>
              <p className="text-sm text-gray-600">
                Average: <span className="font-mono text-green-600">O(log n)</span><br/>
                Worst: <span className="font-mono text-red-600">O(n)</span>
              </p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <h3 className="font-semibold text-red-700 mb-2">Delete</h3>
              <p className="text-sm text-gray-600">
                Average: <span className="font-mono text-yellow-600">O(log n)</span><br/>
                Worst: <span className="font-mono text-red-600">O(n)</span>
              </p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-700 mb-2">Traversal</h3>
              <p className="text-sm text-gray-600">
                All cases: <span className="font-mono text-blue-600">O(n)</span><br/>
                Space: <span className="font-mono text-blue-600">O(h)</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 flex justify-between items-center"
        >
          <Link
            href="/data-structures/trees/theory"
            className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Theory
          </Link>
          
          <Link
            href="/data-structures/graphs"
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Next: Graphs
            <SkipForward className="h-5 w-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default TreesSimulationPage;