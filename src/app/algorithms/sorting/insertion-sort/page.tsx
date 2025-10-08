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
  ArrowRight,
  CheckCircle,
BarChart3,
AlertTriangle
} from 'lucide-react';

interface ArrayElement {
  value: number;
  id: string;
  isKey?: boolean;
  isSorted?: boolean;
  isComparing?: boolean;
  isShifting?: boolean;
  isInserted?: boolean;
  position?: number;
}

interface SortingStep {
  type: string;
  array: ArrayElement[];
  keyIndex?: number;
  keyValue?: number;
  compareIndex?: number;
  insertPosition?: number;
  shiftedElements?: number[];
  message: string;
  comparisons: number;
  shifts: number;
}

const InsertionSortPage: React.FC = () => {
  const [array, setArray] = useState<ArrayElement[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState(1000);
  const [comparisons, setComparisons] = useState(0);
  const [shifts, setShifts] = useState(0);
  const [currentPass, setCurrentPass] = useState(0);
  const [sortingSteps, setSortingSteps] = useState<SortingStep[]>([]);

  const generateRandomArray = useCallback((size = 8) => {
    const newArray: ArrayElement[] = [];
    for (let i = 0; i < size; i++) {
      newArray.push({
        value: Math.floor(Math.random() * 90) + 10,
        id: `element-${i}-${Date.now()}`,
        isKey: false,
        isSorted: false,
        isComparing: false,
        isShifting: false,
        isInserted: false
      });
    }
    setArray(newArray);
    resetAnimation();
  }, []);

  // Initialize array
  useEffect(() => { generateRandomArray(); }, [generateRandomArray]);

  const resetAnimation = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setComparisons(0);
    setShifts(0);
    setCurrentPass(0);
    setSortingSteps([]);
    setArray(prev => prev.map(el => ({
      ...el,
      isKey: false,
      isSorted: false,
      isComparing: false,
      isShifting: false,
      isInserted: false
    })));
  };

  // Generate sorting steps for Insertion Sort
  const generateInsertionSortSteps = () => {
    const steps: SortingStep[] = [];
    const arr = [...array];
    let totalComparisons = 0;
    let totalShifts = 0;

    // First element is considered sorted
    arr[0].isSorted = true;
    steps.push({
      type: 'initialize',
      array: [...arr],
      message: 'First element is considered sorted. Starting with second element.',
      comparisons: totalComparisons,
      shifts: totalShifts
    });

    for (let i = 1; i < arr.length; i++) {
      const key = arr[i].value;
      
      steps.push({
        type: 'select-key',
        array: [...arr],
        keyIndex: i,
        keyValue: key,
        message: `Pass ${i}: Selected key element ${key} at index ${i}`,
        comparisons: totalComparisons,
        shifts: totalShifts
      });

      let j = i - 1;
      
      // Find the correct position for the key
      while (j >= 0 && arr[j].value > key) {
        totalComparisons++;
        
        steps.push({
          type: 'compare',
          array: [...arr],
          keyIndex: i,
          keyValue: key,
          compareIndex: j,
          message: `Comparing key ${key} with ${arr[j].value}: ${key} < ${arr[j].value}`,
          comparisons: totalComparisons,
          shifts: totalShifts
        });

        // Shift element to the right
        totalShifts++;
        arr[j + 1] = { ...arr[j] };
        
        steps.push({
          type: 'shift',
          array: [...arr],
          keyIndex: i,
          keyValue: key,
          compareIndex: j,
          shiftedElements: [j + 1],
          message: `Shifting ${arr[j].value} one position to the right`,
          comparisons: totalComparisons,
          shifts: totalShifts
        });
        
        j--;
      }

      // Check if we need one more comparison (when we exit the loop)
      if (j >= 0) {
        totalComparisons++;
        
        steps.push({
          type: 'compare-final',
          array: [...arr],
          keyIndex: i,
          keyValue: key,
          compareIndex: j,
          message: `Comparing key ${key} with ${arr[j].value}: ${key} ≥ ${arr[j].value}`,
          comparisons: totalComparisons,
          shifts: totalShifts
        });
      }

      // Insert the key at the correct position
      arr[j + 1] = { 
        value: key,
        id: `element-${j + 1}-${Date.now()}`,
        isInserted: true,
        isSorted: false
      };
      
      steps.push({
        type: 'insert',
        array: [...arr],
        keyValue: key,
        insertPosition: j + 1,
        message: `Inserting key ${key} at position ${j + 1}`,
        comparisons: totalComparisons,
        shifts: totalShifts
      });

      // Mark all elements from 0 to i as sorted
      for (let k = 0; k <= i; k++) {
        arr[k].isSorted = true;
        arr[k].isInserted = false;
      }
      
      steps.push({
        type: 'pass-complete',
        array: [...arr],
        message: `Pass ${i} complete. Elements [0..${i}] are now sorted`,
        comparisons: totalComparisons,
        shifts: totalShifts
      });
    }

    steps.push({
      type: 'complete',
      array: [...arr],
      message: 'Insertion Sort complete! All elements are in their correct positions',
      comparisons: totalComparisons,
      shifts: totalShifts
    });

    return steps;
  };

  // Execute sorting animation
  const startSorting = () => {
    if (isPlaying) return;
    
    resetAnimation();
    const steps = generateInsertionSortSteps();
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
        
        // Reset dynamic states
        newArray.forEach(el => {
          el.isKey = false;
          el.isComparing = false;
          el.isShifting = false;
        });

        // Apply step-specific states
        switch (step.type) {
          case 'select-key':
            if (step.keyIndex !== undefined) {
              newArray[step.keyIndex].isKey = true;
            }
            break;
          case 'compare':
          case 'compare-final':
            if (step.keyIndex !== undefined) {
              newArray[step.keyIndex].isKey = true;
            }
            if (step.compareIndex !== undefined) {
              newArray[step.compareIndex].isComparing = true;
            }
            break;
          case 'shift':
            if (step.keyIndex !== undefined) {
              newArray[step.keyIndex].isKey = true;
            }
            if (step.shiftedElements) {
              step.shiftedElements.forEach(index => {
                if (newArray[index]) {
                  newArray[index].isShifting = true;
                }
              });
            }
            break;
          case 'insert':
            if (step.insertPosition !== undefined) {
              newArray[step.insertPosition].isInserted = true;
            }
            break;
        }

        return newArray;
      });

      setComparisons(step.comparisons);
      setShifts(step.shifts);
      setCurrentStep(stepIndex);
      
      // Update current pass
      if (step.type === 'select-key' && step.keyIndex !== undefined) {
        setCurrentPass(step.keyIndex);
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 text-gray-700">
      <div className="container mx-auto px-4 py-12 text-gray-700">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-gray-700"
        >
          <Link href="/algorithms/sorting" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2 text-gray-700" />
            Back to Sorting Algorithms
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Insertion Sort</h1>
          <p className="text-xl text-gray-600 max-w-4xl leading-relaxed">
            A simple and efficient algorithm for small datasets. It builds the sorted array one element at a time 
            by repeatedly taking an element and inserting it into its correct position.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8 text-gray-700">
          {/* Controls Panel */}
          <div className="lg:col-span-1 space-y-6 text-gray-700">
            {/* Controls */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Controls</h3>
              
              <div className="space-y-4 text-gray-700">
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

                <div className="flex space-x-2 text-gray-700">
                  <button
                    onClick={isPlaying ? stopSorting : startSorting}
                    disabled={array.length === 0}
                    className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 flex items-center justify-center text-white text-white text-white text-white"
                  >
                    {isPlaying ? <Pause className="h-4 w-4 mr-2 text-gray-700" /> : <Play className="h-4 w-4 mr-2 text-gray-700" />}
                    {isPlaying ? 'Pause' : 'Start'}
                  </button>
                  
                  <button
                    onClick={() => generateRandomArray(array.length)}
                    disabled={isPlaying}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50"
                  >
                    <RotateCcw className="h-4 w-4 text-gray-700" />
                  </button>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Statistics</h3>
              
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between text-gray-700">
                  <span className="text-gray-600">Current Pass:</span>
                  <span className="font-semibold text-gray-800">{currentPass}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span className="text-gray-600">Total Passes:</span>
                  <span className="font-semibold text-gray-800">{array.length - 1}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span className="text-gray-600">Comparisons:</span>
                  <span className="font-semibold text-blue-600">{comparisons}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span className="text-gray-600">Shifts:</span>
                  <span className="font-semibold text-purple-600">{shifts}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span className="text-gray-600">Array Size:</span>
                  <span className="font-semibold text-gray-800">{array.length}</span>
                </div>
              </div>
            </div>

            {/* Complexity Info */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Complexity</h3>
              
              <div className="space-y-3 text-sm text-gray-600">
                <div>
                  <span className="font-semibold text-gray-700">Time Complexity:</span>
                  <div className="mt-1 space-y-1 text-gray-700">
                    <div className="flex justify-between text-gray-700">
                      <span>Best:</span>
                      <span className="font-mono text-green-600">O(n)</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Average:</span>
                      <span className="font-mono text-yellow-600">O(n²)</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Worst:</span>
                      <span className="font-mono text-red-600">O(n²)</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <span className="font-semibold text-gray-700">Space Complexity:</span>
                  <div className="mt-1 text-gray-700">
                    <span className="font-mono text-green-600">O(1)</span>
                    <span className="text-gray-500 text-xs block">In-place sorting</span>
                  </div>
                </div>

                <div>
                  <span className="font-semibold text-gray-700">Properties:</span>
                  <div className="mt-1 text-xs space-y-1 text-gray-600">
                    <div className="flex items-center text-gray-700">
                      <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                      <span>Stable</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                      <span>In-place</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                      <span>Adaptive</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visualization */}
          <div className="lg:col-span-3 text-gray-700">
            <div className="bg-white rounded-lg shadow-lg p-6 text-gray-700">
              <div className="flex items-center justify-between mb-6 text-gray-700">
                <h3 className="text-lg font-semibold text-gray-900">Array Visualization</h3>
                <div className="text-sm text-gray-600">
                  Pass {currentPass}/{array.length - 1} - {isPlaying ? 'Sorting...' : 'Ready'}
                </div>
              </div>
              
              {/* Array Visualization */}
              <div className="mb-8 text-gray-700">
                <div className="flex items-end justify-center space-x-2 h-64 text-gray-700">
                  {array.map((element, index) => (
                    <motion.div
                      key={element.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        scale: element.isKey || element.isInserted ? 1.1 : 1
                      }}
                      transition={{ 
                        duration: 0.3,
                        scale: { duration: 0.2 }
                      }}
                      className={`
                        flex flex-col items-center justify-end min-w-12 rounded-t-lg transition-all duration-300 border-2 relative
                        ${element.isSorted 
                          ? 'bg-green-500 border-green-600' 
                          : element.isKey 
                            ? 'bg-purple-500 border-purple-600' 
                            : element.isInserted 
                              ? 'bg-pink-500 border-pink-600' 
                              : element.isComparing 
                                ? 'bg-yellow-400 border-yellow-500' 
                                : element.isShifting 
                                  ? 'bg-orange-400 border-orange-500' 
                                  : 'bg-gray-300 border-gray-400'
                        }
                      `}
                      style={{
                        height: `${(element.value / 100) * 200 + 20}px`,
                      }}
                    >
                      <div className="text-white font-bold text-sm p-2 text-gray-600">
                        {element.value}
                      </div>
                      {element.isKey && (
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-gray-700">
                          <div className="bg-purple-600 text-white text-xs px-1 py-0.5 rounded text-gray-600">
                            KEY
                          </div>
                        </div>
                      )}
                      {element.isInserted && (
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-gray-700">
                          <ArrowRight className="h-4 w-4 text-pink-600" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
                
                {/* Index labels */}
                <div className="flex justify-center space-x-2 mt-2 text-gray-700">
                  {array.map((element, index) => (
                    <div key={index} className="min-w-12 text-center text-sm text-gray-500">
                      {index}
                    </div>
                  ))}
                </div>
              </div>

              {/* Sorted/Unsorted Boundary */}
              {currentPass > 0 && (
                <div className="mb-6 text-gray-700">
                  <div className="flex justify-center items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center text-gray-700">
                      <div className="w-16 h-0.5 bg-green-500 mr-2 text-gray-700"></div>
                      <span className="text-green-700 font-medium">Sorted [0..{currentPass}]</span>
                    </div>
                    <div className="text-gray-400">|</div>
                    <div className="flex items-center text-gray-700">
                      <span className="text-gray-700 font-medium">Unsorted [{currentPass + 1}..{array.length - 1}]</span>
                      <div className="w-16 h-0.5 bg-gray-400 ml-2 text-gray-700"></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Legend */}
              <div className="flex flex-wrap justify-center gap-4 mb-6 text-gray-700">
                <div className="flex items-center text-gray-700">
                  <div className="w-4 h-4 bg-gray-300 border border-gray-400 rounded mr-2 text-gray-700"></div>
                  <span className="text-sm text-gray-600">Unsorted</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-4 h-4 bg-purple-500 border border-purple-600 rounded mr-2 text-gray-700"></div>
                  <span className="text-sm text-gray-600">Key Element</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-4 h-4 bg-yellow-400 border border-yellow-500 rounded mr-2 text-gray-700"></div>
                  <span className="text-sm text-gray-600">Comparing</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-4 h-4 bg-orange-400 border border-orange-500 rounded mr-2 text-gray-700"></div>
                  <span className="text-sm text-gray-600">Shifting</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <ArrowRight className="h-4 w-4 text-pink-600 mr-1" />
                  <span className="text-sm text-gray-600">Inserting</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-4 h-4 bg-green-500 border border-green-600 rounded mr-2 text-gray-700"></div>
                  <span className="text-sm text-gray-600">Sorted</span>
                </div>
              </div>

              {/* Current Step Message */}
              {sortingSteps.length > 0 && currentStep < sortingSteps.length && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6 text-gray-700">
                  <div className="flex items-center text-gray-700">
                    <BarChart3 className="h-5 w-5 text-purple-600 mr-2" />
                    <span className="text-purple-800 font-medium">
                      {sortingSteps[currentStep]?.message}
                    </span>
                  </div>
                </div>
              )}

              {/* Algorithm Description */}
              <div className="bg-gray-50 rounded-lg p-6 text-gray-700">
                <h4 className="font-semibold text-gray-800 mb-3">How Insertion Sort Works:</h4>
                <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
                  <div>
                    <h5 className="font-semibold mb-2 text-gray-800">Algorithm Steps:</h5>
                    <ol className="list-decimal pl-4 space-y-1 text-gray-700">
                      <li>Start with second element as key</li>
                      <li>Compare key with sorted elements</li>
                      <li>Shift larger elements to the right</li>
                      <li>Insert key at correct position</li>
                      <li>Repeat for all elements</li>
                    </ol>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2 text-gray-800">Key Properties:</h5>
                    <ul className="list-disc pl-4 space-y-1 text-gray-700">
                      <li><strong>Adaptive:</strong> O(n) time for nearly sorted arrays</li>
                      <li><strong>Stable:</strong> Maintains relative order of equal elements</li>
                      <li><strong>In-place:</strong> Only O(1) extra memory needed</li>
                      <li><strong>Online:</strong> Can sort array as it receives data</li>
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
          className="mt-12 bg-white rounded-lg shadow-lg p-8 text-gray-700"
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">Implementation</h2>
          
          <div className="space-y-6 text-gray-700">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Insertion Sort Implementation</h3>
              <div className="bg-gray-900 text-gray-800 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`function insertionSort(arr) {
  // Start with second element (index 1)
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    
    // Move elements greater than key one position ahead
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    // Insert key at correct position
    arr[j + 1] = key;
  }
  
  return arr;
}

// Time Complexity:
// Best case: O(n) - already sorted
// Average case: O(n²)
// Worst case: O(n²) - reverse sorted
// Space Complexity: O(1) - in-place`}</pre>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 text-gray-700">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Binary Insertion Sort</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`function binaryInsertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    
    // Use binary search to find insertion position
    let left = 0;
    let right = i;
    
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (arr[mid] > key) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }
    
    // Shift elements and insert
    for (let j = i - 1; j >= left; j--) {
      arr[j + 1] = arr[j];
    }
    arr[left] = key;
  }
  
  return arr;
}

// Reduces comparisons to O(n log n)
// But shifts are still O(n²) in worst case`}</pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Recursive Insertion Sort</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`function insertionSortRecursive(arr, n = arr.length) {
  // Base case
  if (n <= 1) return arr;
  
  // Sort first n-1 elements
  insertionSortRecursive(arr, n - 1);
  
  // Insert the nth element at correct position
  const last = arr[n - 1];
  let j = n - 2;
  
  while (j >= 0 && arr[j] > last) {
    arr[j + 1] = arr[j];
    j--;
  }
  
  arr[j + 1] = last;
  return arr;
}

// Same time complexity but uses recursion
// Space: O(n) due to recursive calls`}</pre>
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
          className="mt-12 bg-white rounded-lg shadow-lg p-8 text-gray-700"
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">Performance Analysis</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8 text-gray-700">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-gray-700">
              <h3 className="font-semibold text-green-800 mb-2">Best Case - O(n)</h3>
              <p className="text-sm text-gray-700 mb-3">
                Array is already sorted. Each element requires only one comparison.
              </p>
              <div className="text-xs text-gray-600">
                <div>• Comparisons: n-1</div>
                <div>• Shifts: 0</div>
                <div>• Very efficient for sorted data</div>
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-gray-700">
              <h3 className="font-semibold text-yellow-800 mb-2">Average Case - O(n²)</h3>
              <p className="text-sm text-gray-700 mb-3">
                Random order. On average, each element needs to be compared with half the sorted elements.
              </p>
              <div className="text-xs text-gray-600">
                <div>• Comparisons: ≈ n²/4</div>
                <div>• Shifts: ≈ n²/4</div>
                <div>• Better than selection/bubble sort</div>
              </div>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-gray-700">
              <h3 className="font-semibold text-red-800 mb-2">Worst Case - O(n²)</h3>
              <p className="text-sm text-gray-700 mb-3">
                Array is reverse sorted. Each element must be compared with all previous elements.
              </p>
              <div className="text-xs text-gray-600">
                <div>• Comparisons: n(n-1)/2</div>
                <div>• Shifts: n(n-1)/2</div>
                <div>• Same as bubble sort performance</div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-white">
            <h3 className="font-semibold text-blue-800 mb-3">When to Use Insertion Sort</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
              <div>
                <h4 className="font-semibold mb-2 text-gray-800">Advantages:</h4>
                <ul className="list-disc pl-4 space-y-1 text-gray-700">
                  <li>Simple implementation</li>
                  <li>Efficient for small datasets</li>
                  <li>Adaptive - fast for nearly sorted arrays</li>
                  <li>Stable - preserves order of equal elements</li>
                  <li>In-place - O(1) extra memory</li>
                  <li>Online - can sort while receiving data</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-gray-800">Best Use Cases:</h4>
                <ul className="list-disc pl-4 space-y-1 text-gray-700">
                  <li>Small arrays (&lt; 50 elements)</li>
                  <li>Nearly sorted data</li>
                  <li>Part of hybrid algorithms (Timsort)</li>
                  <li>Real-time sorting of incoming data</li>
                  <li>When simplicity is more important than speed</li>
                  <li>Educational purposes</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 flex justify-between items-center text-gray-700"
        >
          <Link
            href="/algorithms/sorting/selection-sort"
            className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2 text-gray-700" />
            Previous: Selection Sort
          </Link>
          
          <Link
            href="/algorithms/sorting/heap-sort"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-gray-100"
          >
            Next: Heap Sort
            <SkipForward className="h-5 w-5 ml-2 text-gray-700" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default InsertionSortPage;

