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
  ArrowUpDown,
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
  isMerging?: boolean;
  isSorted?: boolean;
  isActive?: boolean;
  leftHalf?: boolean;
  rightHalf?: boolean;
  mergePosition?: number;
}

interface SortingStep {
  type: string;
  array: ArrayElement[];
  left?: number;
  right?: number;
  mid?: number;
  leftArray?: ArrayElement[];
  rightArray?: ArrayElement[];
  mergedArray?: ArrayElement[];
  message: string;
  recursionLevel: number;
  comparisons: number;
  merges: number;
}

const MergeSortPage: React.FC = () => {
  const [array, setArray] = useState<ArrayElement[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState(1000);
  const [comparisons, setComparisons] = useState(0);
  const [merges, setMerges] = useState(0);
  const [recursionDepth, setRecursionDepth] = useState(0);
  const [maxRecursionDepth, setMaxRecursionDepth] = useState(0);
  const [sortingSteps, setSortingSteps] = useState<SortingStep[]>([]);

  // Reset animation helper (defined first so generator can depend on it)
  const resetAnimation = useCallback(() => {
    setIsPlaying(false);
    setCurrentStep(0);
    setComparisons(0);
    setMerges(0);
    setRecursionDepth(0);
    setMaxRecursionDepth(0);
    setSortingSteps([]);
    setArray(prev => prev.map(el => ({
      ...el,
      isComparing: false,
      isMerging: false,
      isSorted: false,
      isActive: false,
      leftHalf: false,
      rightHalf: false
    })));
  }, []);

  // Define generator after resetAnimation
  const generateRandomArray = useCallback((size = 8) => {
    const newArray: ArrayElement[] = [];
    for (let i = 0; i < size; i++) {
      newArray.push({
        value: Math.floor(Math.random() * 90) + 10,
        id: `element-${i}-${Date.now()}`,
        isComparing: false,
        isMerging: false,
        isSorted: false,
        isActive: false,
        leftHalf: false,
        rightHalf: false
      });
    }
    setArray(newArray);
    resetAnimation();
  }, [resetAnimation]);

  // Initialize array (dependency included to satisfy exhaustive-deps)
  useEffect(() => {
    generateRandomArray();
  }, [generateRandomArray]);

  // (resetAnimation moved above)

  // Generate sorting steps for Merge Sort
  const generateMergeSortSteps = () => {
    const steps: SortingStep[] = [];
    const arr = [...array];
    let totalComparisons = 0;
    let totalMerges = 0;
    let maxDepth = 0;

    const mergeSort = (arr: ArrayElement[], left: number, right: number, depth: number = 0): ArrayElement[] => {
      maxDepth = Math.max(maxDepth, depth);
      
      if (left >= right) {
        return [arr[left]];
      }

      steps.push({
        type: 'divide-start',
        array: [...arr],
        left,
        right,
        message: `Dividing array from index ${left} to ${right} (depth ${depth})`,
        recursionLevel: depth,
        comparisons: totalComparisons,
        merges: totalMerges
      });

      const mid = Math.floor((left + right) / 2);

      steps.push({
        type: 'divide-mid',
        array: [...arr],
        left,
        right,
        mid,
        message: `Split at index ${mid}: [${left}..${mid}] and [${mid + 1}..${right}]`,
        recursionLevel: depth,
        comparisons: totalComparisons,
        merges: totalMerges
      });

      // Recursively sort left and right halves
      const leftSorted = mergeSort(arr, left, mid, depth + 1);
      const rightSorted = mergeSort(arr, mid + 1, right, depth + 1);

      // Merge the sorted halves
      const merged = merge(leftSorted, rightSorted, depth);
      
      // Update the original array with merged result
      for (let i = 0; i < merged.length; i++) {
        arr[left + i] = merged[i];
      }

      steps.push({
        type: 'merge-complete',
        array: [...arr],
        left,
        right,
        message: `Merged subarrays - range [${left}..${right}] is now sorted`,
        recursionLevel: depth,
        comparisons: totalComparisons,
        merges: totalMerges
      });

      return merged;
    };

    const merge = (leftArr: ArrayElement[], rightArr: ArrayElement[], depth: number): ArrayElement[] => {
      const result: ArrayElement[] = [];
      let i = 0, j = 0;

      steps.push({
        type: 'merge-start',
        array: [...arr],
        leftArray: [...leftArr],
        rightArray: [...rightArr],
        message: `Merging arrays of size ${leftArr.length} and ${rightArr.length}`,
        recursionLevel: depth,
        comparisons: totalComparisons,
        merges: totalMerges
      });

      while (i < leftArr.length && j < rightArr.length) {
        totalComparisons++;
        
        steps.push({
          type: 'compare-elements',
          array: [...arr],
          leftArray: [...leftArr],
          rightArray: [...rightArr],
          mergedArray: [...result],
          message: `Comparing ${leftArr[i].value} and ${rightArr[j].value}`,
          recursionLevel: depth,
          comparisons: totalComparisons,
          merges: totalMerges
        });

        if (leftArr[i].value <= rightArr[j].value) {
          const element = { ...leftArr[i], isMerging: true };
          result.push(element);
          totalMerges++;
          
          steps.push({
            type: 'merge-left',
            array: [...arr],
            leftArray: [...leftArr],
            rightArray: [...rightArr],
            mergedArray: [...result],
            message: `${leftArr[i].value} ≤ ${rightArr[j].value}, adding ${leftArr[i].value} to result`,
            recursionLevel: depth,
            comparisons: totalComparisons,
            merges: totalMerges
          });
          
          i++;
        } else {
          const element = { ...rightArr[j], isMerging: true };
          result.push(element);
          totalMerges++;
          
          steps.push({
            type: 'merge-right',
            array: [...arr],
            leftArray: [...leftArr],
            rightArray: [...rightArr],
            mergedArray: [...result],
            message: `${leftArr[i].value} &gt; ${rightArr[j].value}, adding ${rightArr[j].value} to result`,
            recursionLevel: depth,
            comparisons: totalComparisons,
            merges: totalMerges
          });
          
          j++;
        }
      }

      // Add remaining elements
      while (i < leftArr.length) {
        const element = { ...leftArr[i], isMerging: true };
        result.push(element);
        totalMerges++;
        
        steps.push({
          type: 'merge-remaining-left',
          array: [...arr],
          leftArray: [...leftArr],
          rightArray: [...rightArr],
          mergedArray: [...result],
          message: `Adding remaining element ${leftArr[i].value} from left array`,
          recursionLevel: depth,
          comparisons: totalComparisons,
          merges: totalMerges
        });
        
        i++;
      }

      while (j < rightArr.length) {
        const element = { ...rightArr[j], isMerging: true };
        result.push(element);
        totalMerges++;
        
        steps.push({
          type: 'merge-remaining-right',
          array: [...arr],
          leftArray: [...leftArr],
          rightArray: [...rightArr],
          mergedArray: [...result],
          message: `Adding remaining element ${rightArr[j].value} from right array`,
          recursionLevel: depth,
          comparisons: totalComparisons,
          merges: totalMerges
        });
        
        j++;
      }

      return result;
    };

    mergeSort(arr, 0, arr.length - 1);
    
    // Mark all as sorted
    arr.forEach(el => el.isSorted = true);
    steps.push({
      type: 'complete',
      array: [...arr],
      message: 'Merge Sort complete!',
      recursionLevel: 0,
      comparisons: totalComparisons,
      merges: totalMerges
    });

    setMaxRecursionDepth(maxDepth);
    return steps;
  };

  // Execute sorting animation
  const startSorting = () => {
    if (isPlaying) return;
    
    resetAnimation();
    const steps = generateMergeSortSteps();
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
          el.isComparing = false;
          el.isMerging = false;
          el.isActive = false;
          el.leftHalf = false;
          el.rightHalf = false;
        });

        // Apply step-specific states
        switch (step.type) {
          case 'divide-mid':
            if (step.left !== undefined && step.right !== undefined && step.mid !== undefined) {
              for (let i = step.left; i <= step.mid; i++) {
                newArray[i].leftHalf = true;
              }
              for (let i = step.mid + 1; i <= step.right; i++) {
                newArray[i].rightHalf = true;
              }
            }
            break;
          case 'compare-elements':
            // Highlight elements being compared
            break;
          case 'merge-left':
          case 'merge-right':
          case 'merge-remaining-left':
          case 'merge-remaining-right':
            // Highlight merging elements
            break;
        }

        return newArray;
      });

      setComparisons(step.comparisons);
      setMerges(step.merges);
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
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
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Merge Sort</h1>
              <p className="text-xl text-gray-600 max-w-4xl leading-relaxed">
                A stable, divide-and-conquer algorithm that consistently delivers O(n log n) performance. 
                It divides the array into halves, sorts them recursively, and merges the sorted halves.
              </p>
            </div>
            <div className="flex items-center space-x-3 ml-6">
              <BookmarkButton 
                topicId="merge-sort"
                topicType="algorithm"
                category="sorting"
                title="Merge Sort"
                url="/algorithms/sorting/merge-sort"
              />
              <ProgressIndicator 
                topicId="merge-sort"
                topicType="algorithm"
                category="sorting"
              />
            </div>
          </div>
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
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center justify-center"
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
                  <span className="text-gray-600">Merges:</span>
                  <span className="font-semibold text-green-600">{merges}</span>
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
                      <span className="font-mono text-green-600">O(n log n)</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <span className="font-semibold text-gray-700">Space Complexity:</span>
                  <div className="mt-1">
                    <span className="font-mono text-orange-600">O(n)</span>
                    <span className="text-gray-500 text-xs block">Additional arrays</span>
                  </div>
                </div>

                <div>
                  <span className="font-semibold text-gray-700">Properties:</span>
                  <div className="mt-1 text-xs space-y-1">
                    <div className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                      <span>Stable</span>
                    </div>
                    <div className="flex items-center">
                      <AlertTriangle className="h-3 w-3 text-red-500 mr-1" />
                      <span>Not in-place</span>
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
                          : element.leftHalf 
                            ? 'bg-blue-400 border-blue-500' 
                            : element.rightHalf 
                              ? 'bg-purple-400 border-purple-500' 
                              : element.isMerging 
                                ? 'bg-yellow-400 border-yellow-500' 
                                : 'bg-gray-300 border-gray-400'
                        }
                      `}
                      style={{
                        height: `${(element.value / 100) * 200 + 20}px`,
                      }}
                    >
                      <div className="text-white font-bold text-sm p-2">
                        {element.value}
                      </div>
                      {element.isMerging && (
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                          <ArrowUpDown className="h-4 w-4 text-yellow-600" />
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
                  <div className="w-4 h-4 bg-blue-400 border border-blue-500 rounded mr-2"></div>
                  <span className="text-sm text-gray-600">Left Half</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-purple-400 border border-purple-500 rounded mr-2"></div>
                  <span className="text-sm text-gray-600">Right Half</span>
                </div>
                <div className="flex items-center">
                  <ArrowUpDown className="h-4 w-4 text-yellow-600 mr-1" />
                  <span className="text-sm text-gray-600">Merging</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 border border-green-600 rounded mr-2"></div>
                  <span className="text-sm text-gray-600">Sorted</span>
                </div>
              </div>

              {/* Current Step Message */}
              {sortingSteps.length > 0 && currentStep < sortingSteps.length && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <BarChart3 className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-green-800 font-medium">
                      {sortingSteps[currentStep]?.message}
                    </span>
                  </div>
                </div>
              )}

              {/* Sub-arrays Visualization */}
              {sortingSteps.length > 0 && currentStep < sortingSteps.length && 
               (sortingSteps[currentStep]?.leftArray || sortingSteps[currentStep]?.rightArray) && (
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {sortingSteps[currentStep]?.leftArray && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Left Array</h4>
                      <div className="flex space-x-1">
                        {sortingSteps[currentStep].leftArray!.map((el, i) => (
                          <div key={i} className="bg-blue-400 text-white px-2 py-1 rounded text-sm">
                            {el.value}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {sortingSteps[currentStep]?.rightArray && (
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-800 mb-2">Right Array</h4>
                      <div className="flex space-x-1">
                        {sortingSteps[currentStep].rightArray!.map((el, i) => (
                          <div key={i} className="bg-purple-400 text-white px-2 py-1 rounded text-sm">
                            {el.value}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {sortingSteps[currentStep]?.mergedArray && (
                    <div className="md:col-span-2 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">Merged Result</h4>
                      <div className="flex space-x-1">
                        {sortingSteps[currentStep].mergedArray!.map((el, i) => (
                          <div key={i} className="bg-yellow-400 text-white px-2 py-1 rounded text-sm">
                            {el.value}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Algorithm Description */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 mb-3">How Merge Sort Works:</h4>
                <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
                  <div>
                    <h5 className="font-semibold mb-2">Divide Phase:</h5>
                    <ol className="list-decimal pl-4 space-y-1">
                      <li>Split array in half recursively</li>
                      <li>Continue until single elements</li>
                      <li>Create a binary tree of divisions</li>
                      <li>Depth is always log₂(n)</li>
                    </ol>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2">Conquer Phase:</h5>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Merge pairs of sorted sub-arrays</li>
                      <li>Compare front elements of each array</li>
                      <li>Add smaller element to result</li>
                      <li>Repeat until all arrays merged</li>
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
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Merge Sort Implementation</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`function mergeSort(arr) {
  // Base case: arrays with 0 or 1 element are sorted
  if (arr.length <= 1) return arr;
  
  // Divide: split array in half
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  
  // Conquer: recursively sort both halves
  const leftSorted = mergeSort(left);
  const rightSorted = mergeSort(right);
  
  // Combine: merge the sorted halves
  return merge(leftSorted, rightSorted);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  
  // Compare elements and merge in sorted order
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  
  // Add remaining elements
  return result.concat(left.slice(i)).concat(right.slice(j));
}

// Time: O(n log n) - always
// Space: O(n) - temporary arrays`}</pre>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">In-Place Merge Sort</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`function mergeSortInPlace(arr, left = 0, right = arr.length - 1) {
  if (left >= right) return;
  
  const mid = Math.floor((left + right) / 2);
  
  mergeSortInPlace(arr, left, mid);
  mergeSortInPlace(arr, mid + 1, right);
  
  mergeInPlace(arr, left, mid, right);
}

function mergeInPlace(arr, left, mid, right) {
  // Create temporary arrays
  const leftArr = arr.slice(left, mid + 1);
  const rightArr = arr.slice(mid + 1, right + 1);
  
  let i = 0, j = 0, k = left;
  
  while (i < leftArr.length && j < rightArr.length) {
    if (leftArr[i] <= rightArr[j]) {
      arr[k++] = leftArr[i++];
    } else {
      arr[k++] = rightArr[j++];
    }
  }
  
  while (i < leftArr.length) arr[k++] = leftArr[i++];
  while (j < rightArr.length) arr[k++] = rightArr[j++];
}`}</pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Bottom-Up Merge Sort</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`function mergeSortBottomUp(arr) {
  const n = arr.length;
  
  // Start with subarray size 1, double each iteration
  for (let size = 1; size < n; size *= 2) {
    
    // Merge subarrays of current size
    for (let left = 0; left < n - size; left += 2 * size) {
      const mid = left + size - 1;
      const right = Math.min(left + 2 * size - 1, n - 1);
      
      mergeInPlace(arr, left, mid, right);
    }
  }
  
  return arr;
}

// Iterative approach
// No recursion - uses loops instead
// Same time complexity: O(n log n)
// Space: O(n) for temporary arrays`}</pre>
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
                    Always divides array into log n levels, with n work per level. 
                    Performance is predictable regardless of input order.
                  </p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Why O(n log n)?</h4>
                  <ul className="text-sm text-gray-700 list-disc pl-4 space-y-1">
                    <li>Tree depth: log₂(n) levels</li>
                    <li>Work per level: O(n) merging</li>
                    <li>Total: log₂(n) × n = O(n log n)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Space Complexity</h3>
              <div className="space-y-4">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800 mb-2">O(n) Additional Space</h4>
                  <p className="text-sm text-gray-700">
                    Requires temporary arrays for merging. Not an in-place algorithm, 
                    but space usage is linear and predictable.
                  </p>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Memory Usage</h4>
                  <ul className="text-sm text-gray-700 list-disc pl-4 space-y-1">
                    <li>O(n) for temporary arrays</li>
                    <li>O(log n) for recursion stack</li>
                    <li>Total: O(n) space complexity</li>
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
            href="/algorithms/sorting/quick-sort"
            className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Previous: Quick Sort
          </Link>
          
          <Link
            href="/algorithms/sorting/heap-sort"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Next: Heap Sort
            <SkipForward className="h-5 w-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default MergeSortPage;