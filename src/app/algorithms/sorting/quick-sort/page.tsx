'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  RotateCcw, 
  SkipForward,
  Target,
  CheckCircle,
  Clock,
  BarChart3,
  Zap,
  AlertTriangle
} from 'lucide-react';

interface ArrayElement {
  value: number;
  id: string;
  isPivot?: boolean;
  isLess?: boolean;
  isGreater?: boolean;
  isEqual?: boolean;
  isSorted?: boolean;
  isActive?: boolean;
  partitionIndex?: number;
}

interface SortingStep {
  type: string;
  array: ArrayElement[];
  pivot?: number;
  left?: number;
  right?: number;
  message: string;
  recursionLevel: number;
  comparisons: number;
  swaps: number;
}

const QuickSortPage: React.FC = () => {
  const [array, setArray] = useState<ArrayElement[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState(1000);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [recursionDepth, setRecursionDepth] = useState(0);
  const [maxRecursionDepth, setMaxRecursionDepth] = useState(0);
  const [pivotStrategy, setPivotStrategy] = useState<'first' | 'last' | 'middle' | 'median'>('last');
  const [sortingSteps, setSortingSteps] = useState<SortingStep[]>([]);

  // Initialize array
  useEffect(() => {
    generateRandomArray();
  }, []);

  const generateRandomArray = (size = 8) => {
    const newArray: ArrayElement[] = [];
    for (let i = 0; i < size; i++) {
      newArray.push({
        value: Math.floor(Math.random() * 90) + 10,
        id: `element-${i}-${Date.now()}`,
        isPivot: false,
        isLess: false,
        isGreater: false,
        isEqual: false,
        isSorted: false,
        isActive: false
      });
    }
    setArray(newArray);
    resetAnimation();
  };

  const resetAnimation = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setComparisons(0);
    setSwaps(0);
    setRecursionDepth(0);
    setMaxRecursionDepth(0);
    setSortingSteps([]);
    setArray(prev => prev.map(el => ({
      ...el,
      isPivot: false,
      isLess: false,
      isGreater: false,
      isEqual: false,
      isSorted: false,
      isActive: false
    })));
  };

  // Pivot selection strategies
  const selectPivot = (arr: ArrayElement[], left: number, right: number): number => {
    switch (pivotStrategy) {
      case 'first':
        return left;
      case 'last':
        return right;
      case 'middle':
        return Math.floor((left + right) / 2);
      case 'median':
        // Median of three
        const mid = Math.floor((left + right) / 2);
        const a = arr[left].value;
        const b = arr[mid].value;
        const c = arr[right].value;
        
        if ((a >= b && a <= c) || (a >= c && a <= b)) return left;
        if ((b >= a && b <= c) || (b >= c && b <= a)) return mid;
        return right;
      default:
        return right;
    }
  };

  // Generate sorting steps for Quick Sort
  const generateQuickSortSteps = () => {
    const steps: SortingStep[] = [];
    const arr = [...array];
    let totalComparisons = 0;
    let totalSwaps = 0;
    let maxDepth = 0;

    const quickSort = (arr: ArrayElement[], left: number, right: number, depth: number = 0) => {
      maxDepth = Math.max(maxDepth, depth);
      
      if (left >= right) return;

      steps.push({
        type: 'subarray-start',
        array: [...arr],
        left,
        right,
        message: `Sorting subarray from index ${left} to ${right} (depth ${depth})`,
        recursionLevel: depth,
        comparisons: totalComparisons,
        swaps: totalSwaps
      });

      // Select pivot
      const pivotIndex = selectPivot(arr, left, right);
      const pivotValue = arr[pivotIndex].value;

      // Move pivot to end for partitioning
      if (pivotIndex !== right) {
        [arr[pivotIndex], arr[right]] = [arr[right], arr[pivotIndex]];
        totalSwaps++;
        
        steps.push({
          type: 'move-pivot',
          array: [...arr],
          pivot: right,
          message: `Moving pivot ${pivotValue} to end for partitioning`,
          recursionLevel: depth,
          comparisons: totalComparisons,
          swaps: totalSwaps
        });
      }

      steps.push({
        type: 'select-pivot',
        array: [...arr],
        pivot: right,
        left,
        right,
        message: `Selected pivot: ${pivotValue} (${pivotStrategy} strategy)`,
        recursionLevel: depth,
        comparisons: totalComparisons,
        swaps: totalSwaps
      });

      // Partition
      let i = left;
      
      for (let j = left; j < right; j++) {
        totalComparisons++;
        
        steps.push({
          type: 'compare',
          array: [...arr],
          pivot: right,
          left: i,
          right: j,
          message: `Comparing ${arr[j].value} with pivot ${pivotValue}`,
          recursionLevel: depth,
          comparisons: totalComparisons,
          swaps: totalSwaps
        });

        if (arr[j].value <= pivotValue) {
          if (i !== j) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            totalSwaps++;
            
            steps.push({
              type: 'swap',
              array: [...arr],
              pivot: right,
              message: `${arr[i].value} ≤ ${pivotValue}, swapping with position ${i}`,
              recursionLevel: depth,
              comparisons: totalComparisons,
              swaps: totalSwaps
            });
          }
          i++;
        }
      }

      // Place pivot in correct position
      [arr[i], arr[right]] = [arr[right], arr[i]];
      totalSwaps++;
      
      steps.push({
        type: 'place-pivot',
        array: [...arr],
        pivot: i,
        message: `Placing pivot ${pivotValue} at position ${i}`,
        recursionLevel: depth,
        comparisons: totalComparisons,
        swaps: totalSwaps
      });

      // Recursively sort partitions
      quickSort(arr, left, i - 1, depth + 1);
      quickSort(arr, i + 1, right, depth + 1);

      steps.push({
        type: 'subarray-complete',
        array: [...arr],
        left,
        right,
        message: `Subarray from ${left} to ${right} is sorted`,
        recursionLevel: depth,
        comparisons: totalComparisons,
        swaps: totalSwaps
      });
    };

    quickSort(arr, 0, arr.length - 1);
    
    // Mark all as sorted
    arr.forEach(el => el.isSorted = true);
    steps.push({
      type: 'complete',
      array: [...arr],
      message: 'Quick Sort complete!',
      recursionLevel: 0,
      comparisons: totalComparisons,
      swaps: totalSwaps
    });

    setMaxRecursionDepth(maxDepth);
    return steps;
  };

  // Execute sorting animation
  const startSorting = () => {
    if (isPlaying) return;
    
    resetAnimation();
    const steps = generateQuickSortSteps();
    setSortingSteps(steps);
    setIsPlaying(true);
    
    let stepIndex = 0;
    const executeStep = () => {
      if (stepIndex >= steps.length) {
        setIsPlaying(false);
        return;
      }

      const step = steps[stepIndex];
      
      // Update array visualization
      setArray(prev => {
        const newArray = [...step.array];
        
        // Reset all states
        newArray.forEach(el => {
          el.isPivot = false;
          el.isLess = false;
          el.isGreater = false;
          el.isEqual = false;
          el.isActive = false;
        });

        // Apply step-specific states
        switch (step.type) {
          case 'select-pivot':
          case 'place-pivot':
            if (step.pivot !== undefined) {
              newArray[step.pivot].isPivot = true;
            }
            break;
          case 'compare':
            if (step.pivot !== undefined) {
              newArray[step.pivot].isPivot = true;
            }
            if (step.left !== undefined) {
              newArray[step.left].isActive = true;
            }
            if (step.right !== undefined) {
              newArray[step.right].isActive = true;
            }
            break;
          case 'swap':
            if (step.pivot !== undefined) {
              newArray[step.pivot].isPivot = true;
            }
            break;
        }

        return newArray;
      });

      setComparisons(step.comparisons);
      setSwaps(step.swaps);
      setRecursionDepth(step.recursionLevel);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Quick Sort</h1>
          <p className="text-xl text-gray-600 max-w-4xl leading-relaxed">
            A highly efficient divide-and-conquer algorithm that picks a pivot element and partitions 
            the array around it. Generally performs better than other O(n log n) algorithms in practice.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Controls Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Pivot Strategy */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Pivot Strategy</h3>
              <div className="space-y-3">
                {[
                  { value: 'first', label: 'First Element' },
                  { value: 'last', label: 'Last Element' },
                  { value: 'middle', label: 'Middle Element' },
                  { value: 'median', label: 'Median of Three' }
                ].map(strategy => (
                  <label key={strategy.value} className="flex items-center">
                    <input
                      type="radio"
                      name="pivotStrategy"
                      value={strategy.value}
                      checked={pivotStrategy === strategy.value}
                      onChange={(e) => {
                        setPivotStrategy(e.target.value as 'first' | 'last' | 'middle' | 'median');
                        resetAnimation();
                      }}
                      className="mr-3"
                    />
                    <span className="text-sm">{strategy.label}</span>
                  </label>
                ))}
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
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center"
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
                  <span className="text-gray-600">Recursion Depth:</span>
                  <span className="font-semibold">{recursionDepth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Max Depth:</span>
                  <span className="font-semibold">{maxRecursionDepth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Comparisons:</span>
                  <span className="font-semibold text-blue-600">{comparisons}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Swaps:</span>
                  <span className="font-semibold text-red-600">{swaps}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Array Size:</span>
                  <span className="font-semibold">{array.length}</span>
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
                      <span>Best:</span>
                      <span className="font-mono text-green-600">O(n log n)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average:</span>
                      <span className="font-mono text-yellow-600">O(n log n)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Worst:</span>
                      <span className="font-mono text-red-600">O(n²)</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <span className="font-semibold text-gray-700">Space Complexity:</span>
                  <div className="mt-1">
                    <span className="font-mono text-blue-600">O(log n)</span>
                    <span className="text-gray-500 text-xs block">Recursion stack</span>
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
                <h3 className="text-lg font-semibold text-gray-900">Array Visualization</h3>
                <div className="text-sm text-gray-600">
                  Depth {recursionDepth} - {isPlaying ? 'Sorting...' : 'Ready'}
                </div>
              </div>
              
              {/* Array Visualization */}
              <div className="mb-8">
                <div className="flex items-end justify-center space-x-2 h-64">
                  {array.map((element, index) => (
                    <motion.div
                      key={element.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        scale: element.isActive ? 1.1 : 1
                      }}
                      transition={{ 
                        duration: 0.3,
                        scale: { duration: 0.2 }
                      }}
                      className={`
                        flex flex-col items-center justify-end min-w-12 rounded-t-lg transition-all duration-300 border-2
                        ${element.isSorted 
                          ? 'bg-green-500 border-green-600' 
                          : element.isPivot 
                            ? 'bg-purple-500 border-purple-600' 
                            : element.isActive 
                              ? 'bg-yellow-400 border-yellow-500' 
                              : 'bg-blue-300 border-blue-400'
                        }
                      `}
                      style={{
                        height: `${(element.value / 100) * 200 + 20}px`,
                      }}
                    >
                      <div className="text-white font-bold text-sm p-2">
                        {element.value}
                      </div>
                      {element.isPivot && (
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                          <Target className="h-4 w-4 text-purple-600" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
                
                {/* Index labels */}
                <div className="flex justify-center space-x-2 mt-2">
                  {array.map((_, index) => (
                    <div key={index} className="min-w-12 text-center text-sm text-gray-500">
                      {index}
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-300 border border-blue-400 rounded mr-2"></div>
                  <span className="text-sm text-gray-600">Unsorted</span>
                </div>
                <div className="flex items-center">
                  <Target className="h-4 w-4 text-purple-600 mr-1" />
                  <span className="text-sm text-gray-600">Pivot</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-400 border border-yellow-500 rounded mr-2"></div>
                  <span className="text-sm text-gray-600">Comparing</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 border border-green-600 rounded mr-2"></div>
                  <span className="text-sm text-gray-600">Sorted</span>
                </div>
              </div>

              {/* Current Step Message */}
              {sortingSteps.length > 0 && currentStep < sortingSteps.length && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <BarChart3 className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="text-blue-800 font-medium">
                      {sortingSteps[currentStep]?.message}
                    </span>
                  </div>
                </div>
              )}

              {/* Algorithm Description */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 mb-3">How Quick Sort Works:</h4>
                <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
                  <div>
                    <h5 className="font-semibold mb-2">Algorithm Steps:</h5>
                    <ol className="list-decimal pl-4 space-y-1">
                      <li>Choose a pivot element</li>
                      <li>Partition array around pivot</li>
                      <li>Elements ≤ pivot go left</li>
                      <li>Elements &gt; pivot go right</li>
                      <li>Recursively sort partitions</li>
                    </ol>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2">Pivot Strategies:</h5>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><strong>First/Last:</strong> Simple but can be O(n²)</li>
                      <li><strong>Middle:</strong> Better for sorted arrays</li>
                      <li><strong>Median of 3:</strong> Reduces worst-case probability</li>
                      <li><strong>Random:</strong> Good average performance</li>
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
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Quick Sort Implementation</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left >= right) return;
  
  // Partition the array and get pivot index
  const pivotIndex = partition(arr, left, right);
  
  // Recursively sort left and right partitions
  quickSort(arr, left, pivotIndex - 1);
  quickSort(arr, pivotIndex + 1, right);
}

function partition(arr, left, right) {
  const pivot = arr[right]; // Last element as pivot
  let i = left;
  
  for (let j = left; j < right; j++) {
    if (arr[j] <= pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }
  
  // Place pivot in correct position
  [arr[i], arr[right]] = [arr[right], arr[i]];
  return i;
}

// Time: O(n log n) average, O(n²) worst
// Space: O(log n) recursion stack`}</pre>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Median-of-Three Pivot</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`function medianOfThree(arr, left, right) {
  const mid = Math.floor((left + right) / 2);
  
  if (arr[mid] < arr[left]) {
    [arr[left], arr[mid]] = [arr[mid], arr[left]];
  }
  if (arr[right] < arr[left]) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
  }
  if (arr[mid] < arr[right]) {
    [arr[mid], arr[right]] = [arr[right], arr[mid]];
  }
  
  return right; // Median is now at right
}`}</pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Iterative Quick Sort</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`function quickSortIterative(arr) {
  const stack = [[0, arr.length - 1]];
  
  while (stack.length > 0) {
    const [left, right] = stack.pop();
    
    if (left >= right) continue;
    
    const pivotIndex = partition(arr, left, right);
    
    // Push smaller partition first (optimization)
    if (pivotIndex - left < right - pivotIndex) {
      stack.push([pivotIndex + 1, right]);
      stack.push([left, pivotIndex - 1]);
    } else {
      stack.push([left, pivotIndex - 1]);
      stack.push([pivotIndex + 1, right]);
    }
  }
  
  return arr;
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
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">Best Case - O(n log n)</h3>
              <p className="text-sm text-gray-700">
                Pivot always divides array into two equal halves. Tree depth is log n, 
                each level requires n comparisons.
              </p>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">Average Case - O(n log n)</h3>
              <p className="text-sm text-gray-700">
                Random pivot selection gives good partitions on average. Expected depth 
                is log n with high probability.
              </p>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-800 mb-2">Worst Case - O(n²)</h3>
              <p className="text-sm text-gray-700">
                Pivot is always smallest or largest element (sorted arrays with first/last pivot). 
                Tree depth becomes n.
              </p>
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
            href="/algorithms/sorting/bubble-sort"
            className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Previous: Bubble Sort
          </Link>
          
          <Link
            href="/algorithms/sorting/merge-sort"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Next: Merge Sort
            <SkipForward className="h-5 w-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default QuickSortPage;