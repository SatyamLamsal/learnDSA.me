'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Plus, Trash2, Search, Play, ChevronRight, Link as LinkIcon } from 'lucide-react';

interface LinkedListNode {
  id: string;
  value: number;
  next: string | null;
  isHighlighted?: boolean;
  isNew?: boolean;
  isBeingDeleted?: boolean;
  isTraversing?: boolean;
}

interface AnimationStep {
  message: string;
  action?: 'traverse' | 'insert' | 'delete' | 'search' | 'found';
}

type ListType = 'singly' | 'doubly' | 'circular';

export default function LinkedListsSimulationPage() {
  const [nodes, setNodes] = useState<LinkedListNode[]>([
    { id: 'node-1', value: 10, next: 'node-2' },
    { id: 'node-2', value: 23, next: 'node-3' },
    { id: 'node-3', value: 45, next: 'node-4' },
    { id: 'node-4', value: 67, next: null }
  ]);
  
  const [head, setHead] = useState<string | null>('node-1');
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [insertPosition, setInsertPosition] = useState('');
  const [message, setMessage] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationSteps, setAnimationSteps] = useState<AnimationStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [showSteps, setShowSteps] = useState(false);
  const [listType, setListType] = useState<ListType>('singly');
  const [searchResult, setSearchResult] = useState<string | null>(null);

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const resetHighlights = () => {
    setNodes(prev => prev.map(node => ({ 
      ...node, 
      isHighlighted: false, 
      isNew: false, 
      isBeingDeleted: false,
      isTraversing: false
    })));
  };

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const generateNodeId = () => `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const insertAtBeginning = async () => {
    if (!inputValue || isNaN(Number(inputValue))) {
      showMessage('Please enter a valid number');
      return;
    }

    if (isAnimating) return;
    setIsAnimating(true);
    setShowSteps(true);
    resetHighlights();
    
    const value = Number(inputValue);
    const newNodeId = generateNodeId();
    const steps: AnimationStep[] = [
      { message: `Step 1: Creating new node with value ${value}` },
      { message: `Step 2: Setting new node's next pointer to current head` },
      { message: `Step 3: Updating head pointer to new node` },
      { message: `Step 4: Insertion at beginning complete!` }
    ];
    
    setAnimationSteps(steps);
    setCurrentStep(0);
    await delay(1000);
    
    // Step 1: Create new node
    setCurrentStep(1);
    const newNode: LinkedListNode = {
      id: newNodeId,
      value: value,
      next: head,
      isNew: true
    };
    setNodes(prev => [newNode, ...prev]);
    await delay(1500);
    
    // Step 2: Show pointer connection
    setCurrentStep(2);
    if (head) {
      setNodes(prev => prev.map(node => ({
        ...node,
        isHighlighted: node.id === head
      })));
    }
    await delay(1500);
    
    // Step 3: Update head
    setCurrentStep(3);
    setHead(newNodeId);
    resetHighlights();
    await delay(1000);
    
    setNodes(prev => prev.map(node => ({ ...node, isNew: false })));
    setInputValue('');
    showMessage(`Successfully inserted ${value} at the beginning`);
    setIsAnimating(false);
    setShowSteps(false);
  };

  const insertAtEnd = async () => {
    if (!inputValue || isNaN(Number(inputValue))) {
      showMessage('Please enter a valid number');
      return;
    }

    if (isAnimating) return;
    setIsAnimating(true);
    setShowSteps(true);
    resetHighlights();
    
    const value = Number(inputValue);
    const newNodeId = generateNodeId();
    
    if (!head) {
      // List is empty
      const steps: AnimationStep[] = [
        { message: `Step 1: List is empty, creating first node` },
        { message: `Step 2: Setting head pointer to new node` }
      ];
      setAnimationSteps(steps);
      setCurrentStep(0);
      await delay(1000);
      
      setCurrentStep(1);
      const newNode: LinkedListNode = {
        id: newNodeId,
        value: value,
        next: null,
        isNew: true
      };
      setNodes([newNode]);
      setHead(newNodeId);
      await delay(1500);
      
      setNodes(prev => prev.map(node => ({ ...node, isNew: false })));
      setInputValue('');
      showMessage(`Successfully inserted ${value} as first node`);
      setIsAnimating(false);
      setShowSteps(false);
      return;
    }

    const steps: AnimationStep[] = [
      { message: `Step 1: Traversing to find the last node` },
      { message: `Step 2: Found last node, creating new node` },
      { message: `Step 3: Linking last node to new node` },
      { message: `Step 4: Insertion at end complete!` }
    ];
    
    setAnimationSteps(steps);
    setCurrentStep(0);
    await delay(1000);
    
    // Step 1: Traverse to end
    setCurrentStep(1);
    let current = head;
    while (current) {
      setNodes(prev => prev.map(node => ({
        ...node,
        isTraversing: node.id === current,
        isHighlighted: false
      })));
      await delay(800);
      
      const currentNode = nodes.find(n => n.id === current);
      if (!currentNode?.next) break;
      current = currentNode.next;
    }
    
    // Step 2: Create new node
    setCurrentStep(2);
    const newNode: LinkedListNode = {
      id: newNodeId,
      value: value,
      next: null,
      isNew: true
    };
    setNodes(prev => [...prev, newNode]);
    await delay(1500);
    
    // Step 3: Link last node to new node
    setCurrentStep(3);
    setNodes(prev => prev.map(node => {
      if (node.id === current) {
        return { ...node, next: newNodeId, isHighlighted: true };
      }
      return { ...node, isTraversing: false };
    }));
    await delay(1500);
    
    resetHighlights();
    setNodes(prev => prev.map(node => ({ ...node, isNew: false })));
    setInputValue('');
    showMessage(`Successfully inserted ${value} at the end`);
    setIsAnimating(false);
    setShowSteps(false);
  };

  const insertAtPosition = async () => {
    if (!inputValue || !insertPosition || isNaN(Number(inputValue)) || isNaN(Number(insertPosition))) {
      showMessage('Please enter valid number and position');
      return;
    }

    if (isAnimating) return;
    const position = Number(insertPosition);
    const value = Number(inputValue);

    if (position < 0) {
      showMessage('Position must be non-negative');
      return;
    }

    if (position === 0) {
      await insertAtBeginning();
      return;
    }

    setIsAnimating(true);
    setShowSteps(true);
    resetHighlights();
    
    const newNodeId = generateNodeId();
    const steps: AnimationStep[] = [
      { message: `Step 1: Traversing to position ${position - 1}` },
      { message: `Step 2: Creating new node with value ${value}` },
      { message: `Step 3: Adjusting pointer connections` },
      { message: `Step 4: Insertion at position ${position} complete!` }
    ];
    
    setAnimationSteps(steps);
    setCurrentStep(0);
    await delay(1000);
    
    // Step 1: Traverse to position - 1
    setCurrentStep(1);
    let current = head;
    let currentIndex = 0;
    
    while (current && currentIndex < position - 1) {
      setNodes(prev => prev.map(node => ({
        ...node,
        isTraversing: node.id === current,
        isHighlighted: false
      })));
      await delay(800);
      
      const currentNode = nodes.find(n => n.id === current);
      if (!currentNode?.next) break;
      current = currentNode.next;
      currentIndex++;
    }

    if (currentIndex !== position - 1) {
      showMessage(`Position ${position} is out of bounds`);
      setIsAnimating(false);
      setShowSteps(false);
      return;
    }
    
    // Step 2: Create new node
    setCurrentStep(2);
    const currentNode = nodes.find(n => n.id === current);
    const newNode: LinkedListNode = {
      id: newNodeId,
      value: value,
      next: currentNode?.next || null,
      isNew: true
    };
    
    const nodeIndex = nodes.findIndex(n => n.id === current);
    setNodes(prev => {
      const newNodes = [...prev];
      newNodes.splice(nodeIndex + 1, 0, newNode);
      return newNodes;
    });
    await delay(1500);
    
    // Step 3: Update connections
    setCurrentStep(3);
    setNodes(prev => prev.map(node => {
      if (node.id === current) {
        return { ...node, next: newNodeId, isHighlighted: true };
      }
      return { ...node, isTraversing: false };
    }));
    await delay(1500);
    
    resetHighlights();
    setNodes(prev => prev.map(node => ({ ...node, isNew: false })));
    setInputValue('');
    setInsertPosition('');
    showMessage(`Successfully inserted ${value} at position ${position}`);
    setIsAnimating(false);
    setShowSteps(false);
  };

  const deleteNode = async (nodeId: string) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setShowSteps(true);
    resetHighlights();
    
    const nodeToDelete = nodes.find(n => n.id === nodeId);
    if (!nodeToDelete) return;
    
    const steps: AnimationStep[] = [
      { message: `Step 1: Locating node with value ${nodeToDelete.value}` },
      { message: `Step 2: Adjusting pointer connections` },
      { message: `Step 3: Removing node from memory` },
      { message: `Step 4: Deletion complete!` }
    ];
    
    setAnimationSteps(steps);
    setCurrentStep(0);
    await delay(1000);
    
    // Step 1: Highlight node to delete
    setCurrentStep(1);
    setNodes(prev => prev.map(node => ({
      ...node,
      isBeingDeleted: node.id === nodeId
    })));
    await delay(1500);
    
    // Step 2: Update connections
    setCurrentStep(2);
    if (head === nodeId) {
      // Deleting head
      setHead(nodeToDelete.next);
    } else {
      // Find previous node
      const prevNode = nodes.find(n => n.next === nodeId);
      if (prevNode) {
        setNodes(prev => prev.map(node => {
          if (node.id === prevNode.id) {
            return { ...node, next: nodeToDelete.next, isHighlighted: true };
          }
          return node;
        }));
      }
    }
    await delay(1500);
    
    // Step 3: Remove node
    setCurrentStep(3);
    setNodes(prev => prev.filter(node => node.id !== nodeId));
    await delay(1000);
    
    resetHighlights();
    showMessage(`Successfully deleted node with value ${nodeToDelete.value}`);
    setIsAnimating(false);
    setShowSteps(false);
  };

  const searchElement = async () => {
    if (!searchValue || isNaN(Number(searchValue))) {
      showMessage('Please enter a valid number to search');
      return;
    }

    if (isAnimating) return;
    setIsAnimating(true);
    setShowSteps(true);
    setSearchResult(null);
    resetHighlights();
    
    const target = Number(searchValue);
    const steps: AnimationStep[] = [
      { message: `Step 1: Starting search for ${target}` },
      { message: `Step 2: Traversing linked list node by node` },
      { message: `Step 3: Comparing current node value with target` }
    ];
    
    setAnimationSteps(steps);
    setCurrentStep(0);
    await delay(1000);
    setCurrentStep(1);
    await delay(1000);

    let current = head;
    let position = 0;
    
    while (current) {
      setCurrentStep(2);
      setAnimationSteps(prev => [
        ...prev.slice(0, 2),
        { message: `Step 3: Checking node at position ${position}: ${nodes.find(n => n.id === current)?.value} === ${target}?` }
      ]);
      
      setNodes(prev => prev.map(node => ({
        ...node,
        isTraversing: node.id === current,
        isHighlighted: false
      })));
      await delay(1200);

      const currentNode = nodes.find(n => n.id === current);
      if (currentNode?.value === target) {
        setAnimationSteps(prev => [
          ...prev,
          { message: `Step 4: Found! ${target} is at position ${position}`, action: 'found' }
        ]);
        setCurrentStep(3);
        setNodes(prev => prev.map(node => ({
          ...node,
          isHighlighted: node.id === current,
          isTraversing: false
        })));
        setSearchResult(current);
        showMessage(`Found ${target} at position ${position}`);
        setIsAnimating(false);
        setShowSteps(false);
        return;
      }
      
      current = currentNode?.next || null;
      position++;
    }

    // Not found
    setAnimationSteps(prev => [
      ...prev,
      { message: `Step 4: Search complete. ${target} not found in the list`, action: 'found' }
    ]);
    setCurrentStep(3);
    resetHighlights();
    setSearchResult(null);
    showMessage(`${target} not found in the linked list`);
    setIsAnimating(false);
    setShowSteps(false);
  };

  const clearList = () => {
    if (isAnimating) return;
    setNodes([]);
    setHead(null);
    setSearchResult(null);
    resetHighlights();
    showMessage('Linked list cleared');
  };

  const generateRandomList = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setShowSteps(true);
    
    const size = Math.floor(Math.random() * 6) + 3; // 3-8 nodes
    const steps: AnimationStep[] = [
      { message: `Step 1: Generating random linked list with ${size} nodes` },
      { message: `Step 2: Creating nodes with random values` },
      { message: `Step 3: Linking nodes together` }
    ];
    
    setAnimationSteps(steps);
    setCurrentStep(0);
    await delay(1000);
    
    setCurrentStep(1);
    await delay(1000);
    
    const newNodes: LinkedListNode[] = [];
    let newHead: string | null = null;
    
    for (let i = 0; i < size; i++) {
      const nodeId = generateNodeId();
      const newNode: LinkedListNode = {
        id: nodeId,
        value: Math.floor(Math.random() * 100) + 1,
        next: i < size - 1 ? `temp-${i + 1}` : null,
        isNew: true
      };
      
      if (i === 0) newHead = nodeId;
      newNodes.push(newNode);
    }
    
    // Fix next references
    for (let i = 0; i < newNodes.length - 1; i++) {
      newNodes[i].next = newNodes[i + 1].id;
    }
    
    setCurrentStep(2);
    setNodes(newNodes);
    setHead(newHead);
    await delay(1500);
    
    setNodes(prev => prev.map(node => ({ ...node, isNew: false })));
    setSearchResult(null);
    showMessage(`Generated random linked list with ${size} nodes`);
    setIsAnimating(false);
    setShowSteps(false);
  };

  const renderNode = (node: LinkedListNode, index: number) => {
    return (
      <motion.div
        key={node.id}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: 1, 
          scale: node.isBeingDeleted ? 0.8 : 1,
          backgroundColor: node.isTraversing ? '#fbbf24' :
                          node.isHighlighted ? '#34d399' : 
                          node.isNew ? '#a78bfa' : 
                          node.isBeingDeleted ? '#f87171' : '#3b82f6'
        }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ 
          duration: 0.5,
          type: "spring",
          stiffness: 300,
          damping: 25
        }}
        className="flex items-center text-gray-700"
      >
        {/* Node */}
        <div className={`relative bg-blue-600 text-white rounded-lg p-4 min-w-[80px] flex flex-col items-center justify-center border-2 shadow-lg
          ${node.isTraversing ? 'border-yellow-400 ring-2 ring-yellow-300' :
            node.isHighlighted ? 'border-green-400 ring-2 ring-green-300' : 
            node.isNew ? 'border-purple-400 ring-2 ring-purple-300' : 
            node.isBeingDeleted ? 'border-red-400 ring-2 ring-red-300' : 
            'border-blue-700'}`}
        >
          <div className="text-lg font-bold text-gray-800">{node.value}</div>
          <div className="text-xs opacity-75 text-gray-600">ID: {node.id.slice(-4)}</div>
          
          {!isAnimating && (
            <button
              onClick={() => deleteNode(node.id)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white text-xs transition-colors"
            >
              <Trash2 className="h-3 w-3 text-gray-700" />
            </button>
          )}
          
          {/* Status indicators */}
          {node.isTraversing && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-yellow-600 text-white text-xs px-2 py-1 rounded text-gray-600">
              Checking
            </div>
          )}
          {node.isHighlighted && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-xs px-2 py-1 rounded text-gray-600">
              Found
            </div>
          )}
          {node.isNew && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white text-xs px-2 py-1 rounded text-gray-600">
              New
            </div>
          )}
          {node.isBeingDeleted && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-xs px-2 py-1 rounded text-gray-600">
              Deleting
            </div>
          )}
        </div>
        
        {/* Arrow to next node */}
        {node.next && (
          <div className="flex items-center mx-2 text-gray-700">
            <ArrowRight className="h-6 w-6 text-gray-600" />
            <div className="text-xs text-gray-700 ml-1 font-medium">next</div>
          </div>
        )}
        
        {/* NULL indicator for last node */}
        {!node.next && (
          <div className="flex items-center mx-2 text-gray-700">
            <ArrowRight className="h-6 w-6 text-gray-500" />
            <div className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded border border-gray-300 font-medium">
              NULL
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 text-white">
      <div className="container mx-auto px-4 py-12 text-gray-700">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-gray-700"
        >
          <Link href="/data-structures/linked-lists" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2 text-gray-700" />
            Back to Linked Lists Overview
          </Link>
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Interactive Linked List Simulation</h1>
          <p className="text-xl text-slate-600 max-w-3xl">
            Explore linked list operations with step-by-step algorithm visualization. Watch how pointers connect nodes dynamically.
          </p>
        </motion.div>

        {/* Message Display */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-6"
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Algorithm Steps Display */}
        <AnimatePresence>
          {showSteps && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-300 rounded-lg p-6 mb-6 text-white"
            >
              <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center">
                <Play className="h-5 w-5 mr-2 text-gray-700" />
                Algorithm Execution Steps
              </h3>
              <div className="space-y-2 text-gray-700">
                {animationSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: index <= currentStep ? 1 : 0.4,
                      x: 0,
                      scale: index === currentStep ? 1.02 : 1
                    }}
                    className={`flex items-center p-3 rounded-lg transition-all ${
                      index === currentStep 
                        ? 'bg-purple-200 border border-purple-400 font-semibold' 
                        : index < currentStep
                        ? 'bg-green-100 border border-green-300'
                        : 'bg-gray-100 border border-gray-300'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 ${
                      index === currentStep 
                        ? 'bg-purple-600 text-white' 
                        : index < currentStep
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-400 text-white'
                    }`}>
                      {index < currentStep ? '✓' : index + 1}
                    </div>
                    <span className={index === currentStep ? 'text-purple-800' : 'text-gray-700'}>
                      {step.message}
                    </span>
                    {index === currentStep && (
                      <ChevronRight className="h-4 w-4 ml-auto text-purple-600 animate-pulse" />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Linked List Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-8 text-gray-700"
        >
          <div className="flex items-center justify-between mb-6 text-gray-700">
            <h2 className="text-2xl font-semibold flex items-center text-slate-800">
              <LinkIcon className="h-6 w-6 text-blue-600 mr-2" />
              Linked List Visualization
            </h2>
            <div className="flex items-center space-x-2 text-gray-700">
              <span className="text-sm text-gray-600">Head:</span>
              <div className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium text-gray-600">
                {head ? head.slice(-4) : 'NULL'}
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-start space-x-4 overflow-x-auto pb-4 min-h-[120px] text-gray-700">
            <AnimatePresence>
              {nodes.length === 0 ? (
                <div className="text-gray-700 text-center py-8 w-full font-medium">
                  Linked list is empty. Add some nodes to get started!
                </div>
              ) : (
                nodes.map((node, index) => renderNode(node, index))
              )}
            </AnimatePresence>
          </div>

          {/* Search Result */}
          {searchResult && (
            <div className="text-center mt-4 text-gray-700">
              <span className="text-green-600 font-semibold">
                Found node with ID: {searchResult.slice(-4)}
              </span>
            </div>
          )}
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-2 gap-8 text-gray-700"
        >
          {/* Insertion Operations */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-gray-700">
            <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
              <Plus className="h-6 w-6 text-blue-600 mr-2" />
              Insertion Operations
            </h3>
            <div className="space-y-4 text-gray-700">
              <div className="flex space-x-2 text-gray-700">
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter a number"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="space-y-2 text-gray-700">
                <button
                  onClick={insertAtBeginning}
                  disabled={isAnimating}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-gray-100"
                >
                  Insert at Beginning (O(1))
                </button>
                
                <button
                  onClick={insertAtEnd}
                  disabled={isAnimating}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-gray-100"
                >
                  Insert at End (O(n))
                </button>
                
                <div className="flex space-x-2 text-gray-700">
                  <input
                    type="number"
                    value={insertPosition}
                    onChange={(e) => setInsertPosition(e.target.value)}
                    placeholder="Position"
                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={insertAtPosition}
                    disabled={isAnimating}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-gray-100"
                  >
                    Insert at Position (O(n))
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Search Operations */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-gray-700">
            <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
              <Search className="h-6 w-6 text-blue-600 mr-2" />
              Search Operations
            </h3>
            <div className="space-y-4 text-gray-700">
              <div className="flex space-x-2 text-gray-700">
                <input
                  type="number"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search for a number"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={searchElement}
                  disabled={isAnimating}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center text-gray-100"
                >
                  {isAnimating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 text-gray-700"></div>
                      Searching...
                    </>
                  ) : (
                    'Linear Search (O(n))'
                  )}
                </button>
              </div>
              <p className="text-sm text-gray-600">
                Watch the algorithm traverse through each node sequentially to find the target value.
              </p>
            </div>
          </div>
        </motion.div>

        {/* List Operations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-lg shadow-lg p-6 mt-8 text-gray-700"
        >
          <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
            <Play className="h-6 w-6 text-blue-600 mr-2" />
            List Operations
          </h3>
          <div className="flex flex-wrap gap-4 text-gray-700">
            <button
              onClick={generateRandomList}
              disabled={isAnimating}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-gray-100"
            >
              Generate Random List
            </button>
            <button
              onClick={clearList}
              disabled={isAnimating}
              className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-gray-100"
            >
              Clear List
            </button>
          </div>
        </motion.div>

        {/* Color Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-white rounded-lg shadow-lg p-6 mt-8 text-gray-700"
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-800">🎨 Animation Legend</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2 text-gray-700">
              <div className="w-4 h-4 bg-blue-600 rounded border text-white"></div>
              <span>Normal Node</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <div className="w-4 h-4 bg-yellow-500 rounded border text-gray-700"></div>
              <span>Currently Traversing</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <div className="w-4 h-4 bg-green-500 rounded border text-gray-700"></div>
              <span>Found/Highlighted</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <div className="w-4 h-4 bg-purple-500 rounded border text-gray-700"></div>
              <span>New Node</span>
            </div>
          </div>
        </motion.div>

        {/* Learning Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="bg-white rounded-lg shadow-lg p-6 mt-8 text-gray-700"
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-800">💡 Learning Notes</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
            <div>
              <h4 className="font-semibold mb-2 text-blue-600">Key Observations:</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• Nodes are connected through pointer references</li>
                <li>• Insertion at beginning is always O(1)</li>
                <li>• Traversal is required for most operations</li>
                <li>• No direct access to nodes by index</li>
                <li>• Memory is allocated dynamically</li>
                <li>• Each operation shows step-by-step execution</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-green-600">Algorithm Complexity:</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• <strong>Insert at beginning:</strong> O(1) - Direct head update</li>
                <li>• <strong>Insert at end:</strong> O(n) - Traverse to last node</li>
                <li>• <strong>Insert at position:</strong> O(n) - Traverse to position</li>
                <li>• <strong>Search:</strong> O(n) - Linear traversal required</li>
                <li>• <strong>Delete:</strong> O(n) - Find node then remove</li>
                <li>• <strong>Space:</strong> O(n) - Linear space per node</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-gray-700">
            <h4 className="font-semibold mb-2 text-yellow-800">💭 Practice Exercises:</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
              <ul className="space-y-1 text-gray-700">
                <li>• Insert nodes at different positions and observe pointer updates</li>
                <li>• Compare search time with different list sizes</li>
                <li>• Watch how deletion affects the remaining connections</li>
              </ul>
              <ul className="space-y-1 text-gray-700">
                <li>• Notice the step-by-step traversal process</li>
                <li>• Try searching for non-existent values</li>
                <li>• Observe how the head pointer changes with operations</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex justify-between items-center mt-8 text-gray-700"
        >
          <Link href="/data-structures/linked-lists/theory" className="flex items-center text-blue-600 hover:text-blue-700">
            ← Linked Lists Theory
          </Link>
          <Link href="/data-structures/stacks" className="bg-blue-600 hover:bg-blue-700 text-black px-6 py-3 rounded-lg font-semibold transition-colors text-gray-800">
            Next: Stacks →
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
