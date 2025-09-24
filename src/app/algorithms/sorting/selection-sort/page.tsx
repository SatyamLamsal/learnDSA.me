'use client';
git 
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  RotateCcw, 
  SkipForward,
  Search,
  CheckCircle,
BarChart3,
AlertTriangle
} from 'lucide-react';

interface ArrayElement {
  value: number;
  id: string;
  isSelected?: boolean;
  isMinimum?: boolean;
  isSorted?: boolean;
  isComparing?: boolean;
  isActive?: boolean;
}

interface SortingStep {
  type: string;
  array: ArrayElement[];
  currentIndex?: number;
  minIndex?: number;
  searchRange?: { start: number; end: number };
  message: string;
  comparisons: number;
  swaps: number;
}

const SelectionSortPage: React.FC = () => {
  const [array, setArray] = useState<ArrayElement[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState(1000);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [currentPass, setCurrentPass] = useState(0);
  const [sortingSteps, setSortingSteps] = useState<SortingStep[]>([]);

  // Place generator before useEffect to avoid TS hoisting error
  const generateRandomArray = useCallback((size = 8) => {
    const newArray: ArrayElement[] = [];
    for (let i = 0; i < size; i++) {
      newArray.push({
        value: Math.floor(Math.random() * 90) + 10,
        id: `element-${i}-${Date.now()}`,
        isSelected: false,
        isMinimum: false,
        isSorted: false,
        isComparing: false,
        isActive: false
      });
    }
    setArray(newArray);
    resetAnimation();
  }, []);

  // Initialize array AFTER function defined
  useEffect(() => { generateRandomArray(); }, [generateRandomArray]);

  const resetAnimation = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setComparisons(0);
    setSwaps(0);
    setCurrentPass(0);
    setSortingSteps([]);
    setArray(prev => prev.map(el => ({
      ...el,
      isSelected: false,
      isMinimum: false,
      isSorted: false,
      isComparing: false,
      isActive: false
    })));
  };

  // Generate sorting steps for Selection Sort
  const generateSelectionSortSteps = () => {
    const steps: SortingStep[] = [];
    const arr = [...array];
    let totalComparisons = 0;
    let totalSwaps = 0;

    for (let i = 0; i < arr.length - 1; i++) {
      steps.push({
        type: 'pass-start',
        array: [...arr],
        currentIndex: i,
        searchRange: { start: i, end: arr.length - 1 },
        message: `Pass ${i + 1}: Finding minimum in range [${i}..${arr.length - 1}]`,
        comparisons: totalComparisons,
        swaps: totalSwaps
      });

      let minIndex = i;
      
      steps.push({
        type: 'assume-minimum',
        array: [...arr],
        currentIndex: i,
        minIndex,
        message: `Assume element at index ${i} (${arr[i].value}) is the minimum`,
        comparisons: totalComparisons,
        swaps: totalSwaps
      });

      // Find minimum in remaining array
      for (let j = i + 1; j < arr.length; j++) {
        totalComparisons++;
        
        steps.push({
          type: 'compare',
          array: [...arr],
          currentIndex: j,
          minIndex,
          message: `Comparing ${arr[j].value} with current minimum ${arr[minIndex].value}`,
          comparisons: totalComparisons,
          swaps: totalSwaps
        });

        if (arr[j].value < arr[minIndex].value) {
          minIndex = j;
          
          steps.push({
            type: 'new-minimum',
            array: [...arr],
            currentIndex: j,
            minIndex,
            message: `${arr[j].value} < ${arr[minIndex === j ? i : minIndex].value}! New minimum found at index ${j}`,
            comparisons: totalComparisons,
            swaps: totalSwaps
          });
        } else {
          steps.push({
            type: 'no-change',
            array: [...arr],
            currentIndex: j,
            minIndex,
            message: `${arr[j].value} ≥ ${arr[minIndex].value}. Minimum remains at index ${minIndex}`,
            comparisons: totalComparisons,
            swaps: totalSwaps
          });
        }
      }

      // Swap if needed
      if (minIndex !== i) {
        totalSwaps++;
        
        steps.push({
          type: 'swap-needed',
          array: [...arr],
          currentIndex: i,
          minIndex,
          message: `Minimum ${arr[minIndex].value} found at index ${minIndex}. Swapping with position ${i}`,
          comparisons: totalComparisons,
          swaps: totalSwaps
        });

        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        
        steps.push({
          type: 'swap-complete',
          array: [...arr],
          currentIndex: i,
          message: `Swapped! ${arr[i].value} is now in its correct position`,
          comparisons: totalComparisons,
          swaps: totalSwaps
        });
      } else {
        steps.push({
          type: 'no-swap',
          array: [...arr],
          currentIndex: i,
          minIndex,
          message: `Minimum is already at position ${i}. No swap needed`,
          comparisons: totalComparisons,
          swaps: totalSwaps
        });
      }

      arr[i].isSorted = true;
      
      steps.push({
        type: 'position-sorted',
        array: [...arr],
        currentIndex: i,
        message: `Position ${i} is now sorted with value ${arr[i].value}`,
        comparisons: totalComparisons,
        swaps: totalSwaps
      });
    }

    // Mark last element as sorted
    arr[arr.length - 1].isSorted = true;
    steps.push({
      type: 'complete',
      array: [...arr],
      message: 'Selection Sort complete! All elements are in their correct positions',
      comparisons: totalComparisons,
      swaps: totalSwaps
    });

    return steps;
  };

  // Execute sorting animation
  const startSorting = () => {
    if (isPlaying) return;
    
    resetAnimation();
    const steps = generateSelectionSortSteps();
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
      setArray(_ => {
        const newArray = [...step.array];
        
        // Reset all states
        newArray.forEach(el => {
          el.isSelected = false;
          el.isMinimum = false;
          el.isComparing = false;
          el.isActive = false;
        });

        // Apply step-specific states
        switch (step.type) {
          case 'pass-start':
            if (step.currentIndex !== undefined) {
              newArray[step.currentIndex].isSelected = true;
            }
            break;
          case 'assume-minimum':
          case 'new-minimum':
          case 'no-change':
            if (step.minIndex !== undefined) {
              newArray[step.minIndex].isMinimum = true;
            }
            if (step.currentIndex !== undefined) {
              newArray[step.currentIndex].isActive = true;
            }
            break;
          case 'compare':
            if (step.minIndex !== undefined) {
              newArray[step.minIndex].isMinimum = true;
            }
            if (step.currentIndex !== undefined) {
              newArray[step.currentIndex].isComparing = true;
            }
            break;
          case 'swap-needed':
          case 'swap-complete':
            if (step.minIndex !== undefined) {
              newArray[step.minIndex].isMinimum = true;
            }
            if (step.currentIndex !== undefined) {
              newArray[step.currentIndex].isSelected = true;
            }
            break;
          case 'no-swap':
          case 'position-sorted':
            if (step.currentIndex !== undefined) {
              newArray[step.currentIndex].isSelected = true;
            }
            break;
        }

        return newArray;
      });

      setComparisons(step.comparisons);
      setSwaps(step.swaps);
      setCurrentStep(stepIndex);
      
      // Update current pass
      if (step.type === 'pass-start') {
        setCurrentPass((step.currentIndex || 0) + 1);
      }

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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Selection Sort</h1>
          <p className="text-xl text-gray-600 max-w-4xl leading-relaxed">
            A simple comparison-based algorithm that finds the minimum element in each pass 
            and places it at the beginning. Easy to understand but inefficient for large datasets.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Controls Panel */}
          <div className="lg:col-span-1 space-y-6">
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
                    defaultValue={8}
                  >
                    <option value={6}>6 elements</option>
                    <option value={8}>8 elements</option>
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
                    className="flex-1 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 disabled:opacity-50 flex items-center justify-center"
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
                  <span className="text-gray-600">Current Pass:</span>
                  <span className="font-semibold">{currentPass}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Passes:</span>
                  <span className="font-semibold">{array.length - 1}</span>
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
                      <span>All Cases:</span>
                      <span className="font-mono text-red-600">O(n²)</span>
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
                <h3 className="text-lg font-semibold text-gray-900">Array Visualization</h3>
                <div className="text-sm text-gray-600">
                  Pass {currentPass}/{array.length - 1} - {isPlaying ? 'Sorting...' : 'Ready'}
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
                        scale: element.isActive || element.isComparing ? 1.1 : 1
                      }}
                      transition={{ 
                        duration: 0.3,
                        scale: { duration: 0.2 }
                      }}
                      className={`flex flex-col items-center justify-end min-w-12 rounded-t-lg transition-all duration-300 border-2 relative ${
                        element.isSorted 
                          ? 'bg-green-500 border-green-600' 
                          : element.isMinimum 
                            ? 'bg-orange-500 border-orange-600' 
                            : element.isSelected 
                              ? 'bg-red-500 border-red-600' 
                              : element.isComparing 
                                ? 'bg-yellow-400 border-yellow-500' 
                                : 'bg-gray-300 border-gray-400'
                      }`}
                      style={{
                        height: `${(element.value / 100) * 200 + 20}px`,
                      }}
                    >
                      <div className="text-white font-bold text-sm p-2">
                        {element.value}
                      </div>
                      {element.isMinimum && (
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                          <Search className="h-4 w-4 text-orange-600" />
                        </div>
                      )}
                      {element.isSelected && (
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                          <CheckCircle className="h-4 w-4 text-red-600" />
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
                  <div className="w-4 h-4 bg-gray-300 border border-gray-400 rounded mr-2"></div>
                  <span className="text-sm text-gray-600">Unsorted</span>
                </div>
                <div className="flex items-center">
                  <Search className="h-4 w-4 text-orange-600 mr-1" />
                  <span className="text-sm text-gray-600">Current Minimum</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-400 border border-yellow-500 rounded mr-2"></div>
                  <span className="text-sm text-gray-600">Comparing</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-red-600 mr-1" />
                  <span className="text-sm text-gray-600">Selected Position</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 border border-green-600 rounded mr-2"></div>
                  <span className="text-sm text-gray-600">Sorted</span>
                </div>
              </div>

              {/* Current Step Message */}
              {sortingSteps.length > 0 && currentStep < sortingSteps.length && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <BarChart3 className="h-5 w-5 text-orange-600 mr-2" />
                    <span className="text-orange-800 font-medium">
                      {sortingSteps[currentStep]?.message}
                    </span>
                  </div>
                </div>
              )}

              {/* Algorithm Description */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 mb-3">How Selection Sort Works:</h4>
                <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
                  <div>
                    <h5 className="font-semibold mb-2">Algorithm Steps:</h5>
                    <ol className="list-decimal pl-4 space-y-1">
                      <li>Find minimum element in unsorted portion</li>
                      <li>Swap it with first unsorted element</li>
                      <li>Move boundary of sorted region</li>
                      <li>Repeat until entire array is sorted</li>
                    </ol>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2">Key Properties:</h5>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><strong>O(n²) comparisons:</strong> Always (n-1) + (n-2) + ... + 1</li>
                      <li><strong>O(n) swaps:</strong> At most one swap per pass</li>
                      <li><strong>Not adaptive:</strong> Same time regardless of input</li>
                      <li><strong>Unstable:</strong> May change relative order</li>
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
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Selection Sort Implementation</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`function selectionSort(arr) {
  const n = arr.length;
  
  // One by one move boundary of unsorted subarray
  for (let i = 0; i < n - 1; i++) {
    // Find the minimum element in remaining unsorted array
    let minIndex = i;
    
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    
    // Swap the found minimum element with the first element
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  
  return arr;
}

// Time Complexity: O(n²) - always
// Space Complexity: O(1) - in-place
// Comparisons: n(n-1)/2
// Swaps: O(n) - at most n-1 swaps`}</pre>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Optimized Version</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`function selectionSortOptimized(arr) {
  let n = arr.length;
  
  for (let i = 0; i < Math.floor(n / 2); i++) {
    let minIndex = i;
    let maxIndex = i;
    
    // Find both min and max in one pass
    for (let j = i + 1; j < n - i; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
      if (arr[j] > arr[maxIndex]) {
        maxIndex = j;
      }
    }
    
    // Place minimum at start
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    
    // Adjust maxIndex if it was at position i
    if (maxIndex === i) {
      maxIndex = minIndex;
    }
    
    // Place maximum at end
    [arr[n - 1 - i], arr[maxIndex]] = [arr[maxIndex], arr[n - 1 - i]];
  }
  
  return arr;
}`}</pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Generic Implementation</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`function selectionSort(arr, compareFn) {
  const compare = compareFn || ((a, b) => a - b);
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let extremeIndex = i;
    
    for (let j = i + 1; j < n; j++) {
      if (compare(arr[j], arr[extremeIndex]) < 0) {
        extremeIndex = j;
      }
    }
    
    if (extremeIndex !== i) {
      [arr[i], arr[extremeIndex]] = [arr[extremeIndex], arr[i]];
    }
  }
  
  return arr;
}

// Usage examples:
// selectionSort([3, 1, 4, 1, 5]); // ascending
// selectionSort([3, 1, 4, 1, 5], (a, b) => b - a); // descending
// selectionSort(objects, (a, b) => a.name.localeCompare(b.name));`}</pre>
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
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-800 mb-2">Time Complexity - O(n²)</h3>
              <p className="text-sm text-gray-700 mb-3">
                Always performs n(n-1)/2 comparisons regardless of input order. 
                No best or worst case - always quadratic.
              </p>
              <div className="text-xs text-gray-600">
                <div>• Comparisons: n(n-1)/2</div>
                <div>• Swaps: 0 to n-1</div>
                <div>• Passes: n-1</div>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">Space Complexity - O(1)</h3>
              <p className="text-sm text-gray-700 mb-3">
                In-place sorting algorithm using only a constant amount of 
                additional memory space.
              </p>
              <div className="text-xs text-gray-600">
                <div>• No additional arrays</div>
                <div>• Only loop variables</div>
                <div>• Memory efficient</div>
              </div>
            </div>
            
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="font-semibold text-orange-800 mb-2">When to Use</h3>
              <p className="text-sm text-gray-700 mb-3">
                Best for small datasets or when memory is limited. 
                Minimizes number of swaps.
              </p>
              <div className="text-xs text-gray-600">
                <div>• Small arrays (&lt; 20 elements)</div>
                <div>• Memory-constrained environments</div>
                <div>• When swaps are expensive</div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-800 mb-3">Comparison with Other O(n²) Sorts</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-blue-200">
                    <th className="text-left p-2">Algorithm</th>
                    <th className="text-left p-2">Comparisons</th>
                    <th className="text-left p-2">Swaps</th>
                    <th className="text-left p-2">Stable</th>
                    <th className="text-left p-2">Adaptive</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-blue-100">
                    <td className="p-2 font-medium">Selection Sort</td>
                    <td className="p-2">O(n²)</td>
                    <td className="p-2">O(n)</td>
                    <td className="p-2">❌</td>
                    <td className="p-2">❌</td>
                  </tr>
                  <tr className="border-b border-blue-100">
                    <td className="p-2">Bubble Sort</td>
                    <td className="p-2">O(n²)</td>
                    <td className="p-2">O(n²)</td>
                    <td className="p-2">✅</td>
                    <td className="p-2">✅</td>
                  </tr>
                  <tr>
                    <td className="p-2">Insertion Sort</td>
                    <td className="p-2">O(n²)</td>
                    <td className="p-2">O(n²)</td>
                    <td className="p-2">✅</td>
                    <td className="p-2">✅</td>
                  </tr>
                </tbody>
              </table>
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
            href="/algorithms/sorting/merge-sort"
            className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Previous: Merge Sort
          </Link>
          
          <Link
            href="/algorithms/sorting/insertion-sort"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Next: Insertion Sort
            <SkipForward className="h-5 w-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default SelectionSortPage;

