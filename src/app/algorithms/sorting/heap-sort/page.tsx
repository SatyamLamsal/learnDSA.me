'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  RotateCcw, 
  SkipForward,
  Triangle,
ArrowDown,
  CheckCircle,
BarChart3,
AlertTriangle
} from 'lucide-react';

interface HeapElement {
  value: number;
  id: string;
  index: number;
  isRoot?: boolean;
  isComparing?: boolean;
  isSwapping?: boolean;
  isSorted?: boolean;
  isHeapifying?: boolean;
  level?: number;
  parent?: number;
  leftChild?: number;
  rightChild?: number;
}

interface SortingStep {
  type: string;
  array: HeapElement[];
  heap: HeapElement[];
  heapSize?: number;
  rootIndex?: number;
  compareIndices?: number[];
  swapIndices?: number[];
  message: string;
  comparisons: number;
  swaps: number;
  phase: 'heapify' | 'sorting' | 'complete';
}

const HeapSortPage: React.FC = () => {
  const [array, setArray] = useState<HeapElement[]>([]);
  const [heap, setHeap] = useState<HeapElement[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState(1000);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [heapSize, setHeapSize] = useState(0);
  const [currentPhase, setCurrentPhase] = useState<'heapify' | 'sorting' | 'complete'>('heapify');
  const [sortingSteps, setSortingSteps] = useState<SortingStep[]>([]);

  const generateRandomArray = useCallback((size = 8) => {
    const newArray: HeapElement[] = [];
    for (let i = 0; i < size; i++) {
      newArray.push({
        value: Math.floor(Math.random() * 90) + 10,
        id: `element-${i}-${Date.now()}`,
        index: i,
        isRoot: false,
        isComparing: false,
        isSwapping: false,
        isSorted: false,
        isHeapifying: false,
        level: Math.floor(Math.log2(i + 1)),
        parent: i > 0 ? Math.floor((i - 1) / 2) : undefined,
        leftChild: 2 * i + 1 < size ? 2 * i + 1 : undefined,
        rightChild: 2 * i + 2 < size ? 2 * i + 2 : undefined
      });
    }
    setArray(newArray);
    setHeap([...newArray]);
    setHeapSize(size);
    resetAnimation();
  }, []);

  const resetAnimation = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setComparisons(0);
    setSwaps(0);
    setCurrentPhase('heapify');
    setSortingSteps([]);
    setArray(prev => prev.map(el => ({
      ...el,
      isRoot: false,
      isComparing: false,
      isSwapping: false,
      isSorted: false,
      isHeapifying: false
    })));
  };

  // Initialize array
  useEffect(() => { generateRandomArray(); }, [generateRandomArray]);

  // Heap utility functions
  const getLeftChild = (i: number) => 2 * i + 1;
  const getRightChild = (i: number) => 2 * i + 2;
  const getParent = (i: number) => Math.floor((i - 1) / 2);

  // Generate sorting steps for Heap Sort
  const generateHeapSortSteps = () => {
    const steps: SortingStep[] = [];
    const arr = [...array];
    let totalComparisons = 0;
    let totalSwaps = 0;
    let currentHeapSize = arr.length;

    steps.push({
      type: 'start',
      array: [...arr],
      heap: [...arr],
      heapSize: currentHeapSize,
      message: 'Starting Heap Sort: First build a max heap, then extract elements',
      comparisons: totalComparisons,
      swaps: totalSwaps,
      phase: 'heapify'
    });

    // Build max heap (heapify)
    const heapify = (arr: HeapElement[], n: number, i: number) => {
      let largest = i;
      const left = getLeftChild(i);
      const right = getRightChild(i);

      steps.push({
        type: 'heapify-start',
        array: [...arr],
        heap: [...arr],
        heapSize: n,
        rootIndex: i,
        message: `Heapifying subtree rooted at index ${i} (value: ${arr[i].value})`,
        comparisons: totalComparisons,
        swaps: totalSwaps,
        phase: 'heapify'
      });

      // Compare with left child
      if (left < n) {
        totalComparisons++;
        steps.push({
          type: 'compare-left',
          array: [...arr],
          heap: [...arr],
          heapSize: n,
          compareIndices: [i, left],
          message: `Comparing parent ${arr[i].value} with left child ${arr[left].value}`,
          comparisons: totalComparisons,
          swaps: totalSwaps,
          phase: 'heapify'
        });

        if (arr[left].value > arr[largest].value) {
          largest = left;
          steps.push({
            type: 'left-larger',
            array: [...arr],
            heap: [...arr],
            heapSize: n,
            message: `Left child ${arr[left].value} is larger than parent ${arr[i].value}`,
            comparisons: totalComparisons,
            swaps: totalSwaps,
            phase: 'heapify'
          });
        }
      }

      // Compare with right child
      if (right < n) {
        totalComparisons++;
        steps.push({
          type: 'compare-right',
          array: [...arr],
          heap: [...arr],
          heapSize: n,
          compareIndices: [largest, right],
          message: `Comparing current largest ${arr[largest].value} with right child ${arr[right].value}`,
          comparisons: totalComparisons,
          swaps: totalSwaps,
          phase: 'heapify'
        });

        if (arr[right].value > arr[largest].value) {
          largest = right;
          steps.push({
            type: 'right-larger',
            array: [...arr],
            heap: [...arr],
            heapSize: n,
            message: `Right child ${arr[right].value} is the largest`,
            comparisons: totalComparisons,
            swaps: totalSwaps,
            phase: 'heapify'
          });
        }
      }

      // Swap if needed
      if (largest !== i) {
        totalSwaps++;
        steps.push({
          type: 'heap-swap',
          array: [...arr],
          heap: [...arr],
          heapSize: n,
          swapIndices: [i, largest],
          message: `Swapping ${arr[i].value} with ${arr[largest].value} to maintain heap property`,
          comparisons: totalComparisons,
          swaps: totalSwaps,
          phase: 'heapify'
        });

        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        
        steps.push({
          type: 'heap-swapped',
          array: [...arr],
          heap: [...arr],
          heapSize: n,
          message: `Swapped! Now recursively heapify affected subtree`,
          comparisons: totalComparisons,
          swaps: totalSwaps,
          phase: 'heapify'
        });

        heapify(arr, n, largest);
      } else {
        steps.push({
          type: 'heap-property-satisfied',
          array: [...arr],
          heap: [...arr],
          heapSize: n,
          message: `Heap property satisfied at index ${i}`,
          comparisons: totalComparisons,
          swaps: totalSwaps,
          phase: 'heapify'
        });
      }
    };

    // Build heap from bottom up
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
      steps.push({
        type: 'build-heap-step',
        array: [...arr],
        heap: [...arr],
        heapSize: currentHeapSize,
        message: `Building max heap: Processing node at index ${i}`,
        comparisons: totalComparisons,
        swaps: totalSwaps,
        phase: 'heapify'
      });
      
      heapify(arr, arr.length, i);
    }

    steps.push({
      type: 'heap-built',
      array: [...arr],
      heap: [...arr],
      heapSize: currentHeapSize,
      message: 'Max heap construction complete! Now extracting elements one by one',
      comparisons: totalComparisons,
      swaps: totalSwaps,
      phase: 'sorting'
    });

    // Extract elements from heap one by one
    for (let i = arr.length - 1; i > 0; i--) {
      steps.push({
        type: 'extract-max',
        array: [...arr],
        heap: [...arr],
        heapSize: i + 1,
        rootIndex: 0,
        message: `Extracting maximum element ${arr[0].value} from heap`,
        comparisons: totalComparisons,
        swaps: totalSwaps,
        phase: 'sorting'
      });

      // Move current root to end
      totalSwaps++;
      [arr[0], arr[i]] = [arr[i], arr[0]];
      
      steps.push({
        type: 'move-to-sorted',
        array: [...arr],
        heap: [...arr],
        heapSize: i,
        swapIndices: [0, i],
        message: `Moved ${arr[i].value} to sorted position ${i}`,
        comparisons: totalComparisons,
        swaps: totalSwaps,
        phase: 'sorting'
      });

      arr[i].isSorted = true;
      currentHeapSize = i;

      // Heapify the reduced heap
      if (i > 0) {
        steps.push({
          type: 'restore-heap',
          array: [...arr],
          heap: [...arr],
          heapSize: i,
          message: `Restoring heap property for remaining ${i} elements`,
          comparisons: totalComparisons,
          swaps: totalSwaps,
          phase: 'sorting'
        });
        
        heapify(arr, i, 0);
      }
    }

    // Mark first element as sorted
    arr[0].isSorted = true;
    
    steps.push({
      type: 'complete',
      array: [...arr],
      heap: [...arr],
      heapSize: 0,
      message: 'Heap Sort complete! All elements are now in ascending order',
      comparisons: totalComparisons,
      swaps: totalSwaps,
      phase: 'complete'
    });

    return steps;
  };

  // Execute sorting animation
  const startSorting = () => {
    if (isPlaying) return;
    
    resetAnimation();
    const steps = generateHeapSortSteps();
    setSortingSteps(steps);
    setIsPlaying(true);
    
    let stepIndex = 0;
    const executeStep = () => {
      if (stepIndex >= steps.length) {
        setIsPlaying(false);
        return;
      }

      const step = steps[stepIndex];
      
      // Update array and heap visualization
      setArray(_ => {
        const newArray = [...step.array];
        
        // Reset dynamic states
        newArray.forEach(el => {
          el.isRoot = false;
          el.isComparing = false;
          el.isSwapping = false;
          el.isHeapifying = false;
        });

        // Apply step-specific states
        switch (step.type) {
          case 'heapify-start':
          case 'extract-max':
            if (step.rootIndex !== undefined) {
              newArray[step.rootIndex].isRoot = true;
            }
            break;
          case 'compare-left':
          case 'compare-right':
            if (step.compareIndices) {
              step.compareIndices.forEach(index => {
                if (newArray[index]) {
                  newArray[index].isComparing = true;
                }
              });
            }
            break;
          case 'heap-swap':
          case 'move-to-sorted':
            if (step.swapIndices) {
              step.swapIndices.forEach(index => {
                if (newArray[index]) {
                  newArray[index].isSwapping = true;
                }
              });
            }
            break;
        }

        return newArray;
      });

      setHeap([...step.heap]);
      setComparisons(step.comparisons);
      setSwaps(step.swaps);
      setHeapSize(step.heapSize || 0);
      setCurrentPhase(step.phase);
      setCurrentStep(stepIndex);

      stepIndex++;
      if (stepIndex < steps.length) {
        setTimeout(executeStep, speed);
      } else {
        setIsPlaying(false);
      }
    };

    executeStep();
  };

  const stopSorting = () => {
    setIsPlaying(false);
  };

  // Calculate tree position for heap visualization
  const getTreePosition = (index: number, totalElements: number) => {
    const level = Math.floor(Math.log2(index + 1));
    const maxLevel = Math.floor(Math.log2(totalElements));
    const positionInLevel = index - (Math.pow(2, level) - 1);
    const maxPositionsInLevel = Math.pow(2, level);
    
    const containerWidth = 600;
    const levelHeight = 80;
    
    const x = (containerWidth / (maxPositionsInLevel + 1)) * (positionInLevel + 1);
    const y = level * levelHeight + 40;
    
    return { x, y, level };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Link href="/algorithms/sorting" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Sorting Algorithms
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Heap Sort</h1>
          <p className="text-xl text-gray-600 max-w-4xl leading-relaxed">
            An efficient comparison-based sorting algorithm that uses a binary heap data structure. 
            It guarantees O(n log n) time complexity and is not stable but sorts in-place.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Controls Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Phase Indicator */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Current Phase</h3>
              <div className="space-y-3">
                <div className={`flex items-center p-2 rounded ${currentPhase === 'heapify' ? 'bg-indigo-100 border border-indigo-300' : 'bg-gray-100'}`}>
                  <Triangle className="h-4 w-4 mr-2 text-indigo-600" />
                  <span className="text-sm font-medium">1. Build Max Heap</span>
                </div>
                <div className={`flex items-center p-2 rounded ${currentPhase === 'sorting' ? 'bg-purple-100 border border-purple-300' : 'bg-gray-100'}`}>
                  <ArrowDown className="h-4 w-4 mr-2 text-purple-600" />
                  <span className="text-sm font-medium">2. Extract & Sort</span>
                </div>
                <div className={`flex items-center p-2 rounded ${currentPhase === 'complete' ? 'bg-green-100 border border-green-300' : 'bg-gray-100'}`}>
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                  <span className="text-sm font-medium">3. Complete</span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Controls</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Array Size
                  </label>
                  <select
                    onChange={(e) => generateRandomArray(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    disabled={isPlaying}
                  >
                    <option value={6}>6 elements</option>
                    <option value={8} selected>8 elements</option>
                    <option value={10}>10 elements</option>
                    <option value={12}>12 elements</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Speed: {speed}ms
                  </label>
                  <input
                    type="range"
                    min="300"
                    max="2000"
                    step="200"
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={isPlaying ? stopSorting : startSorting}
                    disabled={array.length === 0}
                    className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center"
                  >
                    {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                    {isPlaying ? 'Pause' : 'Start'}
                  </button>
                  
                  <button
                    onClick={() => generateRandomArray(array.length)}
                    disabled={isPlaying}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Statistics</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Heap Size:</span>
                  <span className="font-semibold">{heapSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Array Size:</span>
                  <span className="font-semibold">{array.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Comparisons:</span>
                  <span className="font-semibold text-blue-600">{comparisons}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Swaps:</span>
                  <span className="font-semibold text-indigo-600">{swaps}</span>
                </div>
              </div>
            </div>

            {/* Complexity Info */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Complexity</h3>
              
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-semibold text-gray-700">Time Complexity:</span>
                  <div className="mt-1 space-y-1">
                    <div className="flex justify-between">
                      <span>All Cases:</span>
                      <span className="font-mono text-green-600">O(n log n)</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <span className="font-semibold text-gray-700">Space Complexity:</span>
                  <div className="mt-1">
                    <span className="font-mono text-green-600">O(1)</span>
                    <span className="text-gray-500 text-xs block">In-place sorting</span>
                  </div>
                </div>

                <div>
                  <span className="font-semibold text-gray-700">Properties:</span>
                  <div className="mt-1 text-xs space-y-1">
                    <div className="flex items-center">
                      <AlertTriangle className="h-3 w-3 text-red-500 mr-1" />
                      <span>Unstable</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                      <span>In-place</span>
                    </div>
                    <div className="flex items-center">
                      <AlertTriangle className="h-3 w-3 text-yellow-500 mr-1" />
                      <span>Not adaptive</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visualization */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Heap Visualization</h3>
                <div className="text-sm text-gray-600">
                  {currentPhase === 'heapify' ? 'Building Heap' : 
                   currentPhase === 'sorting' ? 'Extracting Elements' : 'Complete'} - {isPlaying ? 'Running...' : 'Ready'}
                </div>
              </div>
              
              {/* Heap Tree Visualization */}
              <div className="mb-8">
                <h4 className="text-md font-semibold mb-4 text-gray-800">Binary Heap Tree</h4>
                <div className="relative h-80 bg-gray-50 rounded-lg overflow-hidden">
                  <svg className="w-full h-full">
                    {/* Draw connections */}
                    {heap.slice(0, heapSize).map((element, index) => {
                      const pos = getTreePosition(index, heapSize);
                      const leftChild = getLeftChild(index);
                      const rightChild = getRightChild(index);
                      
                      return (
                        <g key={`connections-${element.id}`}>
                          {leftChild < heapSize && (
                            <line
                              x1={pos.x}
                              y1={pos.y}
                              x2={getTreePosition(leftChild, heapSize).x}
                              y2={getTreePosition(leftChild, heapSize).y}
                              stroke="#cbd5e1"
                              strokeWidth="2"
                            />
                          )}
                          {rightChild < heapSize && (
                            <line
                              x1={pos.x}
                              y1={pos.y}
                              x2={getTreePosition(rightChild, heapSize).x}
                              y2={getTreePosition(rightChild, heapSize).y}
                              stroke="#cbd5e1"
                              strokeWidth="2"
                            />
                          )}
                        </g>
                      );
                    })}
                    
                    {/* Draw nodes */}
                    {heap.slice(0, heapSize).map((element, index) => {
                      const pos = getTreePosition(index, heapSize);
                      
                      return (
                        <g key={element.id}>
                          <motion.circle
                            initial={{ scale: 0 }}
                            animate={{ 
                              scale: 1,
                              fill: element.isSorted 
                                ? '#10b981' 
                                : element.isRoot 
                                  ? '#8b5cf6' 
                                  : element.isComparing 
                                    ? '#f59e0b' 
                                    : element.isSwapping 
                                      ? '#ef4444' 
                                      : '#6366f1'
                            }}
                            transition={{ duration: 0.3 }}
                            cx={pos.x}
                            cy={pos.y}
                            r="20"
                            stroke="#fff"
                            strokeWidth="2"
                          />
                          <text
                            x={pos.x}
                            y={pos.y + 5}
                            textAnchor="middle"
                            className="text-white font-bold text-sm"
                          >
                            {element.value}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>

              {/* Array Representation */}
              <div className="mb-8">
                <h4 className="text-md font-semibold mb-4 text-gray-800">Array Representation</h4>
                <div className="flex items-end justify-center space-x-2 h-48">
                  {array.map((element, index) => (
                    <motion.div
                      key={element.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: index < heapSize ? 1 : 0.5, 
                        y: 0,
                        scale: element.isRoot || element.isSwapping ? 1.1 : 1
                      }}
                      transition={{ 
                        duration: 0.3,
                        scale: { duration: 0.2 }
                      }}
                      className={`
                        flex flex-col items-center justify-end min-w-12 rounded-t-lg transition-all duration-300 border-2 relative
                        ${element.isSorted 
                          ? 'bg-green-500 border-green-600' 
                          : element.isRoot 
                            ? 'bg-purple-500 border-purple-600' 
                            : element.isComparing 
                              ? 'bg-yellow-400 border-yellow-500' 
                              : element.isSwapping 
                                ? 'bg-red-500 border-red-600' 
                                : index < heapSize 
                                  ? 'bg-indigo-400 border-indigo-500' 
                                  : 'bg-gray-300 border-gray-400'
                        }
                      `}
                      style={{
                        height: `${(element.value / 100) * 160 + 20}px`,
                      }}
                    >
                      <div className="text-white font-bold text-sm p-2">
                        {element.value}
                      </div>
                      {element.isRoot && index === 0 && (
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                          <Triangle className="h-4 w-4 text-purple-600" />
                        </div>
                      )}
                      {index >= heapSize && (
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                          <span className="text-xs text-gray-500">Sorted</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
                
                {/* Index labels */}
                <div className="flex justify-center space-x-2 mt-2">
                  {array.map((element, index) => (
                    <div key={index} className="min-w-12 text-center text-sm text-gray-500">
                      {index}
                    </div>
                  ))}
                </div>
              </div>

              {/* Heap Property Indicator */}
              {heapSize > 0 && (
                <div className="mb-6 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-indigo-800 font-medium">Active Heap Size: {heapSize}</span>
                    <span className="text-indigo-600 text-sm">
                      {currentPhase === 'heapify' ? 'Building max heap...' : 
                       currentPhase === 'sorting' ? 'Extracting maximum elements...' : 'Sorting complete!'}
                    </span>
                  </div>
                </div>
              )}

              {/* Legend */}
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-indigo-400 border border-indigo-500 rounded mr-2"></div>
                  <span className="text-sm text-gray-600">In Heap</span>
                </div>
                <div className="flex items-center">
                  <Triangle className="h-4 w-4 text-purple-600 mr-1" />
                  <span className="text-sm text-gray-600">Root/Current</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-400 border border-yellow-500 rounded mr-2"></div>
                  <span className="text-sm text-gray-600">Comparing</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 border border-red-600 rounded mr-2"></div>
                  <span className="text-sm text-gray-600">Swapping</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 border border-green-600 rounded mr-2"></div>
                  <span className="text-sm text-gray-600">Sorted</span>
                </div>
              </div>

              {/* Current Step Message */}
              {sortingSteps.length > 0 && currentStep < sortingSteps.length && (
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <BarChart3 className="h-5 w-5 text-indigo-600 mr-2" />
                    <span className="text-indigo-800 font-medium">
                      {sortingSteps[currentStep]?.message}
                    </span>
                  </div>
                </div>
              )}

              {/* Algorithm Description */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 mb-3">How Heap Sort Works:</h4>
                <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
                  <div>
                    <h5 className="font-semibold mb-2">Phase 1: Build Max Heap</h5>
                    <ol className="list-decimal pl-4 space-y-1">
                      <li>Start from last non-leaf node</li>
                      <li>Apply heapify procedure</li>
                      <li>Compare with children</li>
                      <li>Swap if heap property violated</li>
                      <li>Continue until root is reached</li>
                    </ol>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2">Phase 2: Extract & Sort</h5>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Move root (max) to sorted position</li>
                      <li>Reduce heap size by 1</li>
                      <li>Restore heap property at root</li>
                      <li>Repeat until heap is empty</li>
                      <li>Result: sorted array in ascending order</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Code Implementation */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 bg-white rounded-lg shadow-lg p-8"
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">Implementation</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Heap Sort Implementation</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`function heapSort(arr) {
  const n = arr.length;
  
  // Build max heap (rearrange array)
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  
  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    [arr[0], arr[i]] = [arr[i], arr[0]];
    
    // Call heapify on the reduced heap
    heapify(arr, i, 0);
  }
  
  return arr;
}

function heapify(arr, n, i) {
  let largest = i;        // Initialize largest as root
  let left = 2 * i + 1;   // Left child
  let right = 2 * i + 2;  // Right child
  
  // If left child is larger than root
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  
  // If right child is larger than largest so far
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }
  
  // If largest is not root
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    
    // Recursively heapify the affected sub-tree
    heapify(arr, n, largest);
  }
}

// Time: O(n log n) - always
// Space: O(1) - in-place (if we ignore recursion stack)`}</pre>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Iterative Heapify</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`function heapifyIterative(arr, n, start) {
  let parent = start;
  
  while (true) {
    let largest = parent;
    let left = 2 * parent + 1;
    let right = 2 * parent + 2;
    
    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }
    
    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }
    
    if (largest === parent) {
      break; // Heap property satisfied
    }
    
    [arr[parent], arr[largest]] = [arr[largest], arr[parent]];
    parent = largest;
  }
}

// Avoids recursion stack
// True O(1) space complexity`}</pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Min Heap Sort</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`function minHeapSort(arr) {
  const n = arr.length;
  
  // Build min heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    minHeapify(arr, n, i);
  }
  
  // Extract elements (results in descending order)
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    minHeapify(arr, i, 0);
  }
  
  return arr;
}

function minHeapify(arr, n, i) {
  let smallest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  
  if (left < n && arr[left] < arr[smallest]) {
    smallest = left;
  }
  
  if (right < n && arr[right] < arr[smallest]) {
    smallest = right;
  }
  
  if (smallest !== i) {
    [arr[i], arr[smallest]] = [arr[smallest], arr[i]];
    minHeapify(arr, n, smallest);
  }
}`}</pre>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Performance Analysis */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 bg-white rounded-lg shadow-lg p-8"
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">Performance Analysis</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Time Complexity</h3>
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Consistent O(n log n)</h4>
                  <p className="text-sm text-gray-700">
                    Unlike Quick Sort, Heap Sort always guarantees O(n log n) performance 
                    regardless of input distribution.
                  </p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Phase Breakdown</h4>
                  <ul className="text-sm text-gray-700 list-disc pl-4 space-y-1">
                    <li><strong>Build Heap:</strong> O(n) - surprisingly linear!</li>
                    <li><strong>Extract Max:</strong> O(log n) × n = O(n log n)</li>
                    <li><strong>Total:</strong> O(n) + O(n log n) = O(n log n)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Practical Considerations</h3>
              <div className="space-y-4">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800 mb-2">Cache Performance</h4>
                  <p className="text-sm text-gray-700">
                    Heap Sort has poor cache locality compared to Quick Sort and Merge Sort, 
                    making it slower in practice despite same Big O complexity.
                  </p>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">When to Use</h4>
                  <ul className="text-sm text-gray-700 list-disc pl-4 space-y-1">
                    <li>Need guaranteed O(n log n) performance</li>
                    <li>Memory is severely constrained (O(1) space)</li>
                    <li>Building priority queues</li>
                    <li>Real-time systems with predictable timing</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 flex justify-between items-center"
        >
          <Link
            href="/algorithms/sorting/insertion-sort"
            className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Previous: Insertion Sort
          </Link>
          
          <Link
            href="/algorithms/sorting/counting-sort"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Next: Counting Sort
            <SkipForward className="h-5 w-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default HeapSortPage;

