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
CheckCircle,
BarChart3,
AlertTriangle
} from 'lucide-react';
import { ProgressIndicator } from '@/components/progress/ProgressIndicator';
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton';

interface ArrayElement {
  value: number;
  id: string;
  isComparing?: boolean;
  isSwapping?: boolean;
  isSorted?: boolean;
  isActive?: boolean;
}

const BubbleSortPage: React.FC = () => {
  const [array, setArray] = useState<ArrayElement[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState(1000);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [currentPass, setCurrentPass] = useState(0);
  const [algorithm, setAlgorithm] = useState<'bubble' | 'optimized'>('bubble');

  const generateRandomArray = useCallback((size = 8) => {
    const newArray: ArrayElement[] = [];
    for (let i = 0; i < size; i++) {
      newArray.push({
        value: Math.floor(Math.random() * 90) + 10,
        id: `element-${i}-${Date.now()}`,
        isComparing: false,
        isSwapping: false,
        isSorted: false,
        isActive: false
      });
    }
    setArray(newArray);
    resetAnimation();
  }, []);

  // Initialize array
  useEffect(() => { generateRandomArray(); }, [generateRandomArray]);

  const resetAnimation = () => {
    setIsPlaying(false);
    setComparisons(0);
    setSwaps(0);
    setCurrentPass(0);
    setArray(prev => prev.map(el => ({
      ...el,
      isComparing: false,
      isSwapping: false,
      isSorted: false,
      isActive: false
    })));
  };

  // Generate sorting steps
  const generateSortingSteps = () => {
    const steps = [];
    const arr = [...array];
    let totalComparisons = 0;
    let totalSwaps = 0;
    let pass = 0;

    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
      pass++;
      let hasSwapped = false;
      
      steps.push({
        type: 'pass-start',
        array: [...arr],
        message: `Pass ${pass}: Finding the ${i === 0 ? 'largest' : i === 1 ? '2nd largest' : `${i + 1}th largest`} element`,
        pass,
        comparisons: totalComparisons,
        swaps: totalSwaps
      });

      for (let j = 0; j < n - i - 1; j++) {
        // Compare step
        totalComparisons++;
        steps.push({
          type: 'compare',
          array: [...arr],
          compareIndices: [j, j + 1],
          message: `Comparing ${arr[j].value} and ${arr[j + 1].value}`,
          pass,
          comparisons: totalComparisons,
          swaps: totalSwaps
        });

        if (arr[j].value > arr[j + 1].value) {
          // Swap step
          totalSwaps++;
          hasSwapped = true;
          
          steps.push({
            type: 'swap',
            array: [...arr],
            swapIndices: [j, j + 1],
            message: `${arr[j].value} > ${arr[j + 1].value}, swapping`,
            pass,
            comparisons: totalComparisons,
            swaps: totalSwaps
          });

          // Perform swap
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

          steps.push({
            type: 'swapped',
            array: [...arr],
            message: `Swapped: ${arr[j].value} and ${arr[j + 1].value}`,
            pass,
            comparisons: totalComparisons,
            swaps: totalSwaps
          });
        } else {
          steps.push({
            type: 'no-swap',
            array: [...arr],
            message: `${arr[j].value} ≤ ${arr[j + 1].value}, no swap needed`,
            pass,
            comparisons: totalComparisons,
            swaps: totalSwaps
          });
        }
      }

      // Mark element as sorted
      arr[n - i - 1].isSorted = true;
      steps.push({
        type: 'sorted',
        array: [...arr],
        sortedIndex: n - i - 1,
        message: `${arr[n - i - 1].value} is now in its correct position`,
        pass,
        comparisons: totalComparisons,
        swaps: totalSwaps
      });

      // Optimized bubble sort: stop if no swaps in this pass
      if (algorithm === 'optimized' && !hasSwapped) {
        // Mark remaining elements as sorted
        for (let k = 0; k < n - i - 1; k++) {
          arr[k].isSorted = true;
        }
        steps.push({
          type: 'early-termination',
          array: [...arr],
          message: 'No swaps in this pass - array is sorted!',
          pass,
          comparisons: totalComparisons,
          swaps: totalSwaps
        });
        break;
      }
    }

    // Mark first element as sorted
    if (arr.length > 0) {
      arr[0].isSorted = true;
      steps.push({
        type: 'complete',
        array: [...arr],
        message: 'Sorting complete!',
        pass,
        comparisons: totalComparisons,
        swaps: totalSwaps
      });
    }

    return steps;
  };

  // Execute sorting animation
  const startSorting = () => {
    if (isPlaying) return;
    
    resetAnimation();
    const steps = generateSortingSteps();
    setIsPlaying(true);
    
    let stepIndex = 0;
    const executeStep = () => {
      if (stepIndex >= steps.length) {
        setIsPlaying(false);
        return;
      }

      const step = steps[stepIndex];
      
      // Update array visualization based on step
      setArray(_ => {
        const newArray = [...step.array];
        
        // Reset all states
        newArray.forEach(el => {
          el.isComparing = false;
          el.isSwapping = false;
          el.isActive = false;
        });

        // Apply step-specific states
        switch (step.type) {
          case 'compare':
            if (step.compareIndices) {
              step.compareIndices.forEach(idx => {
                if (newArray[idx]) newArray[idx].isComparing = true;
              });
            }
            break;
          case 'swap':
          case 'swapped':
            if (step.swapIndices) {
              step.swapIndices.forEach(idx => {
                if (newArray[idx]) newArray[idx].isSwapping = true;
              });
            }
            break;
        }

        return newArray;
      });

      setComparisons(step.comparisons);
      setSwaps(step.swaps);
      setCurrentPass(step.pass);
      // Animation step removed

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
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 text-gray-700">
      <div className="container mx-auto px-4 py-12 text-gray-700">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-gray-700"
        >
          <Link href="/algorithms/sorting" className="inline-flex items-center text-red-600 hover:text-red-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2 text-gray-700" />
            Back to Sorting Algorithms
          </Link>
          <div className="flex items-start justify-between mb-4 text-gray-700">
            <div className="flex-1 text-gray-700">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Bubble Sort</h1>
              <p className="text-xl text-gray-600 max-w-4xl leading-relaxed">
                The simplest sorting algorithm that works by repeatedly swapping adjacent elements 
                if they are in the wrong order. Named &ldquo;bubble sort&rdquo; because smaller elements &ldquo;bubble&rdquo; to the top.
              </p>
            </div>
            <div className="flex items-center space-x-3 ml-6 text-gray-700">
              <BookmarkButton 
                topicId="bubble-sort"
                topicType="algorithm"
                category="sorting"
                title="Bubble Sort"
                url="/algorithms/sorting/bubble-sort"
              />
              <ProgressIndicator 
                topicId="bubble-sort"
                topicType="algorithm"
                category="sorting"
              />
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8 text-gray-700">
          {/* Controls Panel */}
          <div className="lg:col-span-1 space-y-6 text-gray-700">
            {/* Algorithm Selection */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Algorithm</h3>
              <div className="space-y-3 text-gray-700">
                <label className="flex items-center text-gray-700">
                  <input
                    type="radio"
                    name="algorithm"
                    value="bubble"
                    checked={algorithm === 'bubble'}
                    onChange={(e) => {
                      setAlgorithm(e.target.value as 'bubble');
                      resetAnimation();
                    }}
                    className="mr-3"
                  />
                  <span>Basic Bubble Sort</span>
                </label>
                <label className="flex items-center text-gray-700">
                  <input
                    type="radio"
                    name="algorithm"
                    value="optimized"
                    checked={algorithm === 'optimized'}
                    onChange={(e) => {
                      setAlgorithm(e.target.value as 'optimized');
                      resetAnimation();
                    }}
                    className="mr-3"
                  />
                  <span>Optimized Bubble Sort</span>
                </label>
              </div>
            </div>

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
                    min="200"
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
                    className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center justify-center text-white text-white text-white text-white"
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
                  <span className="text-gray-600">Pass:</span>
                  <span className="font-semibold text-gray-800">{currentPass}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span className="text-gray-600">Comparisons:</span>
                  <span className="font-semibold text-blue-600">{comparisons}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span className="text-gray-600">Swaps:</span>
                  <span className="font-semibold text-red-600">{swaps}</span>
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
                    <span className="font-mono text-blue-600">O(1)</span>
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
                      <span>Adaptive*</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">*Only optimized version</p>
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
                  Pass {currentPass} - {isPlaying ? 'Sorting...' : 'Ready'}
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
                        scale: element.isSwapping ? 1.1 : 1
                      }}
                      transition={{ 
                        duration: 0.3,
                        scale: { duration: 0.2 }
                      }}
                      className={`
                        flex flex-col items-center justify-end min-w-12 rounded-t-lg transition-all duration-300
                        ${element.isSorted 
                          ? 'bg-green-500 border-green-600' 
                          : element.isComparing 
                            ? 'bg-yellow-400 border-yellow-500' 
                            : element.isSwapping 
                              ? 'bg-red-500 border-red-600' 
                              : 'bg-red-300 border-red-400'
                        }
                        border-2
                      `}
                      style={{
                        height: `${(element.value / 100) * 200 + 20}px`,
                      }}
                    >
                      <div className="text-white font-bold text-sm p-2 text-gray-600">
                        {element.value}
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Index labels */}
                <div className="flex justify-center space-x-2 mt-2 text-gray-700">
                  {array.map((item, index) => (
                    <div key={index} className="min-w-12 text-center text-sm text-gray-500">
                      {index}
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap justify-center gap-4 mb-6 text-gray-700">
                <div className="flex items-center text-gray-700">
                  <div className="w-4 h-4 bg-red-300 border border-red-400 rounded mr-2 text-gray-700"></div>
                  <span className="text-sm text-gray-600">Unsorted</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-4 h-4 bg-yellow-400 border border-yellow-500 rounded mr-2 text-gray-700"></div>
                  <span className="text-sm text-gray-600">Comparing</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-4 h-4 bg-red-500 border border-red-600 rounded mr-2 text-gray-700"></div>
                  <span className="text-sm text-gray-600">Swapping</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="w-4 h-4 bg-green-500 border border-green-600 rounded mr-2 text-gray-700"></div>
                  <span className="text-sm text-gray-600">Sorted</span>
                </div>
              </div>

              {/* Algorithm Description */}
              <div className="bg-gray-50 rounded-lg p-6 text-gray-700">
                <h4 className="font-semibold text-gray-800 mb-3">How Bubble Sort Works:</h4>
                <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
                  <div>
                    <h5 className="font-semibold mb-2 text-gray-800">Basic Algorithm:</h5>
                    <ol className="list-decimal pl-4 space-y-1 text-gray-700">
                      <li>Compare adjacent elements</li>
                      <li>Swap if they are in wrong order</li>
                      <li>Continue through the array</li>
                      <li>Repeat until no swaps needed</li>
                    </ol>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2 text-gray-800">Optimization:</h5>
                    <ul className="list-disc pl-4 space-y-1 text-gray-700">
                      <li>Track if any swaps occurred in a pass</li>
                      <li>If no swaps, array is sorted</li>
                      <li>Reduces best-case to O(n)</li>
                      <li>Still O(n²) in average/worst case</li>
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
          
          <div className="grid md:grid-cols-2 gap-6 text-gray-700">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Basic Bubble Sort</h3>
              <div className="bg-gray-900 text-gray-800 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`function bubbleSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  
  return arr;
}

// Time: O(n²), Space: O(1)`}</pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Optimized Bubble Sort</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`function optimizedBubbleSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let hasSwapped = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        hasSwapped = true;
      }
    }
    
    // If no swaps, array is sorted
    if (!hasSwapped) break;
  }
  
  return arr;
}

// Best case: O(n), Worst: O(n²)`}</pre>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 flex justify-between items-center text-gray-700"
        >
          <Link
            href="/algorithms/sorting"
            className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2 text-gray-700" />
            Back to Sorting
          </Link>
          
          <Link
            href="/algorithms/sorting/selection-sort"
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-gray-100"
          >
            Next: Selection Sort
            <SkipForward className="h-5 w-5 ml-2 text-gray-700" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default BubbleSortPage;

