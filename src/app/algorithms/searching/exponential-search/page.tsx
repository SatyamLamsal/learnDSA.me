"use client";
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, ArrowLeft, ArrowRight, Clock, Cpu, Eye, CheckCircle, TrendingUp } from 'lucide-react';
import { useState } from 'react';

type ExponentialStep = {
  phase: 'exponential' | 'binary';
  comparison: number;
  action: string;
  // exponential fields
  bound?: number;
  element?: number;
  // binary fields
  left?: number;
  right?: number;
  mid?: number;
};

const ExponentialSearchVisualization = () => {
  const [array, setArray] = useState([1, 2, 3, 4, 5, 8, 10, 10, 10, 15, 20, 26, 30, 31, 35, 42, 50, 65, 70, 88]);
  const [target, setTarget] = useState(42);
  const [currentBound, setCurrentBound] = useState(-1);
  const [binaryLeft, setBinaryLeft] = useState(-1);
  const [binaryRight, setBinaryRight] = useState(-1);
  const [binaryMid, setBinaryMid] = useState(-1);
  const [found, setFound] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [comparisons, setComparisons] = useState(0);
  const [phase, setPhase] = useState(''); // 'exponential', 'binary', 'found', 'not-found'
  const [searchHistory, setSearchHistory] = useState<ExponentialStep[]>([]);
  const [bounds, setBounds] = useState<number[]>([]);

  const exponentialSearch = async () => {
    setIsSearching(true);
    setFound(false);
    setComparisons(0);
    setSearchHistory([]);
    setBounds([]);
    setPhase('exponential');
    setCurrentBound(-1);
    setBinaryLeft(-1);
    setBinaryRight(-1);
    setBinaryMid(-1);
    
    let compCount = 0;
  const history: ExponentialStep[] = [];
  const boundHistory: number[] = [];

    // Phase 1: Find range where element may exist
    if (array[0] === target) {
      setCurrentBound(0);
      setFound(true);
      setPhase('found');
      setComparisons(1);
      setIsSearching(false);
      return;
    }

    let bound = 1;
    compCount++;
    
    // Exponentially increase bound
    while (bound < array.length && array[bound] < target) {
      setCurrentBound(bound);
      boundHistory.push(bound);
      setBounds([...boundHistory]);
      compCount++;
      setComparisons(compCount);
      
      const step: ExponentialStep = {
        phase: 'exponential',
        bound: bound,
        element: array[bound],
        comparison: compCount,
        action: `${array[bound]} < ${target}, double bound: ${bound} → ${bound * 2}`
      };
      
      history.push(step);
      setSearchHistory([...history]);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      bound *= 2;
    }

    // Final bound check
  const finalBound = Math.min(bound, array.length - 1);
    setCurrentBound(finalBound);
    boundHistory.push(finalBound);
    setBounds([...boundHistory]);
    
    if (bound < array.length) {
      compCount++;
      setComparisons(compCount);
      
      const step: ExponentialStep = {
        phase: 'exponential',
        bound: finalBound,
        element: array[finalBound],
        comparison: compCount,
        action: `${array[finalBound]} >= ${target}, found range [${Math.floor(bound / 2)}, ${finalBound}]`
      };
      
      history.push(step);
      setSearchHistory([...history]);
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Phase 2: Binary search in found range
    setPhase('binary');
    setCurrentBound(-1);
    
    let left = Math.floor(bound / 2);
    let right = Math.min(bound, array.length - 1);
    
    setBinaryLeft(left);
    setBinaryRight(right);
    
    await new Promise(resolve => setTimeout(resolve, 500));

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      setBinaryMid(mid);
      compCount++;
      setComparisons(compCount);
      
      const step: ExponentialStep = {
        phase: 'binary',
        left: left,
        right: right,
        mid: mid,
        element: array[mid],
        comparison: compCount,
        action: `Binary search: comparing ${array[mid]} with ${target}`
      };
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (array[mid] === target) {
        step.action = `Found! ${target} = ${array[mid]}`;
        history.push(step);
        setSearchHistory([...history]);
        setFound(true);
        setPhase('found');
        setIsSearching(false);
        return;
      } else if (array[mid] < target) {
        step.action = `${array[mid]} < ${target}, search right half`;
        history.push(step);
        left = mid + 1;
        setBinaryLeft(left);
      } else {
        step.action = `${array[mid]} > ${target}, search left half`;
        history.push(step);
        right = mid - 1;
        setBinaryRight(right);
      }
      
      setSearchHistory([...history]);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    setPhase('not-found');
    setIsSearching(false);
    setBinaryMid(-1);
  };

  const resetSearch = () => {
    setCurrentBound(-1);
    setBinaryLeft(-1);
    setBinaryRight(-1);
    setBinaryMid(-1);
    setFound(false);
    setIsSearching(false);
    setComparisons(0);
    setPhase('');
    setSearchHistory([]);
    setBounds([]);
  };

  const generateNewArray = () => {
    // Generate sorted array with some duplicates
    const baseArray = Array.from({ length: 15 }, (_, i) => i * 2 + 1);
    const newArray = [...baseArray, ...baseArray.slice(5, 10)].sort((a, b) => a - b);
    setArray(newArray);
    resetSearch();
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-slate-800 mb-4">Interactive Exponential Search</h3>
        
        {/* Controls */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-slate-700">Target:</label>
            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(parseInt(e.target.value) || 0)}
              className="w-20 px-2 py-1 border border-gray-300 rounded"
              disabled={isSearching}
            />
          </div>
          <button
            onClick={exponentialSearch}
            disabled={isSearching}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded font-medium disabled:opacity-50"
          >
            {isSearching ? 'Searching...' : 'Start Search'}
          </button>
          <button
            onClick={resetSearch}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded font-medium"
          >
            Reset
          </button>
          <button
            onClick={generateNewArray}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium"
          >
            New Array
          </button>
        </div>

        {/* Phase Indicator */}
        <div className="mb-4 p-3 bg-gray-50 rounded">
          <div className="text-sm font-medium text-gray-700">
            Current Phase: 
            <span className={`ml-2 px-2 py-1 rounded text-white ${
              phase === 'exponential' ? 'bg-emerald-500' :
              phase === 'binary' ? 'bg-blue-500' :
              phase === 'found' ? 'bg-green-500' :
              phase === 'not-found' ? 'bg-red-500' :
              'bg-gray-400'
            }`}>
              {phase === 'exponential' ? 'Finding Range' :
               phase === 'binary' ? 'Binary Search' :
               phase === 'found' ? 'Found!' :
               phase === 'not-found' ? 'Not Found' :
               'Ready'}
            </span>
          </div>
        </div>

        {/* Array Visualization - Two rows for better display */}
        <div className="space-y-2 mb-4">
          {/* First row */}
          <div className="flex justify-center items-center space-x-1">
            {array.slice(0, 10).map((element, index) => (
              <motion.div
                key={index}
                initial={{ scale: 1 }}
                animate={{ 
                  scale: 
                    (found && (binaryMid === index)) ? 1.15 :
                    (currentBound === index || binaryMid === index) ? 1.1 : 
                    (bounds.includes(index)) ? 1.05 :
                    (binaryLeft !== -1 && binaryRight !== -1 && index >= binaryLeft && index <= binaryRight) ? 1.02 :
                    1,
                  backgroundColor: 
                    found && binaryMid === index ? '#10b981' :
                    binaryMid === index ? '#3b82f6' :
                    currentBound === index ? '#10b981' :
                    bounds.includes(index) ? '#f59e0b' :
                    (binaryLeft !== -1 && binaryRight !== -1 && index >= binaryLeft && index <= binaryRight) ? '#e5e7eb' :
                    '#f3f4f6'
                }}
                className={`w-10 h-10 flex items-center justify-center font-bold rounded border-2 text-xs ${
                  found && binaryMid === index ? 'border-green-600 text-white' :
                  binaryMid === index ? 'border-blue-600 text-white' :
                  currentBound === index ? 'border-emerald-600 text-white' :
                  bounds.includes(index) ? 'border-yellow-600 text-white' :
                  (binaryLeft !== -1 && binaryRight !== -1 && index >= binaryLeft && index <= binaryRight) ? 'border-gray-400 text-gray-700' :
                  'border-gray-300 text-gray-600'
                }`}
              >
                {element}
              </motion.div>
            ))}
          </div>
          
          {/* Second row */}
          <div className="flex justify-center items-center space-x-1">
            {array.slice(10).map((element, index) => {
              const actualIndex = index + 10;
              return (
                <motion.div
                  key={actualIndex}
                  initial={{ scale: 1 }}
                  animate={{ 
                    scale: 
                      (found && (binaryMid === actualIndex)) ? 1.15 :
                      (currentBound === actualIndex || binaryMid === actualIndex) ? 1.1 : 
                      (bounds.includes(actualIndex)) ? 1.05 :
                      (binaryLeft !== -1 && binaryRight !== -1 && actualIndex >= binaryLeft && actualIndex <= binaryRight) ? 1.02 :
                      1,
                    backgroundColor: 
                      found && binaryMid === actualIndex ? '#10b981' :
                      binaryMid === actualIndex ? '#3b82f6' :
                      currentBound === actualIndex ? '#10b981' :
                      bounds.includes(actualIndex) ? '#f59e0b' :
                      (binaryLeft !== -1 && binaryRight !== -1 && actualIndex >= binaryLeft && actualIndex <= binaryRight) ? '#e5e7eb' :
                      '#f3f4f6'
                  }}
                  className={`w-10 h-10 flex items-center justify-center font-bold rounded border-2 text-xs ${
                    found && binaryMid === actualIndex ? 'border-green-600 text-white' :
                    binaryMid === actualIndex ? 'border-blue-600 text-white' :
                    currentBound === actualIndex ? 'border-emerald-600 text-white' :
                    bounds.includes(actualIndex) ? 'border-yellow-600 text-white' :
                    (binaryLeft !== -1 && binaryRight !== -1 && actualIndex >= binaryLeft && actualIndex <= binaryRight) ? 'border-gray-400 text-gray-700' :
                    'border-gray-300 text-gray-600'
                  }`}
                >
                  {element}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Indices display */}
        <div className="space-y-1 mb-6 text-xs text-gray-600">
          <div className="flex justify-center items-center space-x-1">
            {array.slice(0, 10).map((_, index) => (
              <div key={index} className="w-10 text-center">
                [{index}]
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center space-x-1">
            {array.slice(10).map((_, index) => (
              <div key={index} className="w-10 text-center">
                [{index + 10}]
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-4 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-emerald-500 rounded mr-2"></div>
            <span>Current Bound</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
            <span>Previous Bounds</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
            <span>Binary Search Mid</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-400 rounded mr-2"></div>
            <span>Binary Search Range</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
            <span>Found</span>
          </div>
        </div>

        {/* Status */}
        <div className="grid grid-cols-4 gap-4 mb-4 text-sm">
          <div className="bg-emerald-50 p-3 rounded">
            <span className="font-semibold text-emerald-700">Current Bound:</span>
            <div className="text-xl font-bold text-emerald-600">{currentBound === -1 ? '-' : currentBound}</div>
          </div>
          <div className="bg-blue-50 p-3 rounded">
            <span className="font-semibold text-blue-700">Binary Range:</span>
            <div className="text-lg font-bold text-blue-600">
              {binaryLeft === -1 ? '-' : `[${binaryLeft}, ${binaryRight}]`}
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <span className="font-semibold text-gray-700">Binary Mid:</span>
            <div className="text-xl font-bold text-gray-600">{binaryMid === -1 ? '-' : binaryMid}</div>
          </div>
          <div className="bg-orange-50 p-3 rounded">
            <span className="font-semibold text-orange-700">Comparisons:</span>
            <div className="text-xl font-bold text-orange-600">{comparisons}</div>
          </div>
        </div>

        {/* Search History */}
        {searchHistory.length > 0 && (
          <div className="bg-gray-50 p-4 rounded mt-4">
            <h4 className="font-semibold text-gray-800 mb-2">Search Steps:</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {searchHistory.map((step, index) => (
                <div key={index} className="text-sm">
                  <span className="font-medium">Step {step.comparison}:</span>
                  <span className={`ml-2 px-2 py-1 rounded text-white text-xs ${
                    step.phase === 'exponential' ? 'bg-emerald-500' : 'bg-blue-500'
                  }`}>
                    {step.phase.toUpperCase()}
                  </span>
                  {step.bound !== undefined && (
                    <span className="ml-2">Bound {step.bound}: {step.element}</span>
                  )}
                  {step.mid !== undefined && (
                    <span className="ml-2">Left={step.left}, Mid={step.mid}, Right={step.right}: {step.element}</span>
                  )}
                  <span className="ml-2 text-gray-600">→ {step.action}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Result */}
        <div className="text-center mt-4">
          {found && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              ✅ Target {target} found at index {binaryMid} after {comparisons} comparisons!
            </div>
          )}
          
          {!found && !isSearching && comparisons > 0 && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              ❌ Target {target} not found after {comparisons} comparisons!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CodeExample = () => {
  const [activeTab, setActiveTab] = useState<'python' | 'java' | 'cpp' | 'javascript'>('python');

  const pythonCode = `def binary_search(arr, left, right, target):
    """Helper function for binary search"""
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

def exponential_search(arr, target):
    """
    Exponential Search Algorithm
    Time Complexity: O(log n)
    Space Complexity: O(1)
    Prerequisite: Array must be sorted
    """
    # Check if element is at first position
    if arr[0] == target:
        return 0
    
    # Find range for binary search by repeated doubling
    bound = 1
    while bound < len(arr) and arr[bound] < target:
        bound *= 2
    
    # Perform binary search in found range
    left = bound // 2
    right = min(bound, len(arr) - 1)
    
    return binary_search(arr, left, right, target)

# Example usage
sorted_array = [1, 2, 3, 4, 5, 8, 10, 15, 20, 26, 30, 31, 35, 42, 50, 65, 70, 88]
target = 42

result = exponential_search(sorted_array, target)
if result != -1:
    print(f"Element {target} found at index {result}")
else:
    print(f"Element {target} not found")

# Demonstrate the exponential bound finding
def exponential_search_verbose(arr, target):
    print(f"Searching for {target} in array of size {len(arr)}")
    
    if arr[0] == target:
        print(f"Found at index 0!")
        return 0
    
    bound = 1
    print(f"Starting exponential search with bound = {bound}")
    
    while bound < len(arr) and arr[bound] < target:
        print(f"arr[{bound}] = {arr[bound]} < {target}, doubling bound to {bound * 2}")
        bound *= 2
    
    left = bound // 2
    right = min(bound, len(arr) - 1)
    print(f"Range found: [{left}, {right}]")
    print(f"Performing binary search in range...")
    
    return binary_search(arr, left, right, target)

# Verbose example
print("\\nVerbose search:")
exponential_search_verbose(sorted_array, 42)`;

  const javaCode = `public class ExponentialSearch {
    /**
     * Helper method for binary search
     */
    private static int binarySearch(int[] arr, int left, int right, int target) {
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }
    
    /**
     * Exponential Search Algorithm
     * Time Complexity: O(log n)
     * Space Complexity: O(1)
     * Prerequisite: Array must be sorted
     */
    public static int exponentialSearch(int[] arr, int target) {
        // Check if element is at first position
        if (arr[0] == target) {
            return 0;
        }
        
        // Find range for binary search by repeated doubling
        int bound = 1;
        while (bound < arr.length && arr[bound] < target) {
            bound *= 2;
        }
        
        // Perform binary search in found range
        int left = bound / 2;
        int right = Math.min(bound, arr.length - 1);
        
        return binarySearch(arr, left, right, target);
    }
    
    /**
     * Verbose version for demonstration
     */
    public static int exponentialSearchVerbose(int[] arr, int target) {
        System.out.println("Searching for " + target + " in array of size " + arr.length);
        
        if (arr[0] == target) {
            System.out.println("Found at index 0!");
            return 0;
        }
        
        int bound = 1;
        System.out.println("Starting exponential search with bound = " + bound);
        
        while (bound < arr.length && arr[bound] < target) {
            System.out.println("arr[" + bound + "] = " + arr[bound] + 
                             " < " + target + ", doubling bound to " + (bound * 2));
            bound *= 2;
        }
        
        int left = bound / 2;
        int right = Math.min(bound, arr.length - 1);
        System.out.println("Range found: [" + left + ", " + right + "]");
        System.out.println("Performing binary search in range...");
        
        return binarySearch(arr, left, right, target);
    }
    
    public static void main(String[] args) {
        int[] sortedArray = {1, 2, 3, 4, 5, 8, 10, 15, 20, 26, 30, 31, 35, 42, 50, 65, 70, 88};
        int target = 42;
        
        int result = exponentialSearch(sortedArray, target);
        if (result != -1) {
            System.out.println("Element " + target + " found at index " + result);
        } else {
            System.out.println("Element " + target + " not found");
        }
        
        // Verbose demonstration
        System.out.println("\\nVerbose search:");
        exponentialSearchVerbose(sortedArray, 42);
    }
}`;

  const cppCode = `#include <iostream>
#include <vector>
#include <algorithm>

/**
 * Helper function for binary search
 */
int binarySearch(const std::vector<int>& arr, int left, int right, int target) {
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

/**
 * Exponential Search Algorithm
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 * Prerequisite: Array must be sorted
 */
int exponentialSearch(const std::vector<int>& arr, int target) {
    // Check if element is at first position
    if (arr[0] == target) {
        return 0;
    }
    
    // Find range for binary search by repeated doubling
    int bound = 1;
    while (bound < arr.size() && arr[bound] < target) {
        bound *= 2;
    }
    
    // Perform binary search in found range
    int left = bound / 2;
    int right = std::min(bound, static_cast<int>(arr.size()) - 1);
    
    return binarySearch(arr, left, right, target);
}

/**
 * Verbose version for demonstration
 */
int exponentialSearchVerbose(const std::vector<int>& arr, int target) {
    std::cout << "Searching for " << target << " in array of size " << arr.size() << std::endl;
    
    if (arr[0] == target) {
        std::cout << "Found at index 0!" << std::endl;
        return 0;
    }
    
    int bound = 1;
    std::cout << "Starting exponential search with bound = " << bound << std::endl;
    
    while (bound < arr.size() && arr[bound] < target) {
        std::cout << "arr[" << bound << "] = " << arr[bound] 
                 << " < " << target << ", doubling bound to " << (bound * 2) << std::endl;
        bound *= 2;
    }
    
    int left = bound / 2;
    int right = std::min(bound, static_cast<int>(arr.size()) - 1);
    std::cout << "Range found: [" << left << ", " << right << "]" << std::endl;
    std::cout << "Performing binary search in range..." << std::endl;
    
    return binarySearch(arr, left, right, target);
}

int main() {
    std::vector<int> sortedArray = {1, 2, 3, 4, 5, 8, 10, 15, 20, 26, 30, 31, 35, 42, 50, 65, 70, 88};
    int target = 42;
    
    int result = exponentialSearch(sortedArray, target);
    if (result != -1) {
        std::cout << "Element " << target << " found at index " << result << std::endl;
    } else {
        std::cout << "Element " << target << " not found" << std::endl;
    }
    
    // Verbose demonstration
    std::cout << "\\nVerbose search:" << std::endl;
    exponentialSearchVerbose(sortedArray, 42);
    
    return 0;
}`;

  const javascriptCode = `/**
 * Helper function for binary search
 */
function binarySearch(arr, left, right, target) {
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

/**
 * Exponential Search Algorithm
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 * Prerequisite: Array must be sorted
 */
function exponentialSearch(arr, target) {
    // Check if element is at first position
    if (arr[0] === target) {
        return 0;
    }
    
    // Find range for binary search by repeated doubling
    let bound = 1;
    while (bound < arr.length && arr[bound] < target) {
        bound *= 2;
    }
    
    // Perform binary search in found range
    const left = Math.floor(bound / 2);
    const right = Math.min(bound, arr.length - 1);
    
    return binarySearch(arr, left, right, target);
}

/**
 * Verbose version for demonstration
 */
function exponentialSearchVerbose(arr, target) {
    console.log(\`Searching for \${target} in array of size \${arr.length}\`);
    
    if (arr[0] === target) {
        console.log("Found at index 0!");
        return 0;
    }
    
    let bound = 1;
    console.log(\`Starting exponential search with bound = \${bound}\`);
    
    while (bound < arr.length && arr[bound] < target) {
        console.log(\`arr[\${bound}] = \${arr[bound]} < \${target}, doubling bound to \${bound * 2}\`);
        bound *= 2;
    }
    
    const left = Math.floor(bound / 2);
    const right = Math.min(bound, arr.length - 1);
    console.log(\`Range found: [\${left}, \${right}]\`);
    console.log("Performing binary search in range...");
    
    return binarySearch(arr, left, right, target);
}

// Example usage
const sortedArray = [1, 2, 3, 4, 5, 8, 10, 15, 20, 26, 30, 31, 35, 42, 50, 65, 70, 88];
const target = 42;

const result = exponentialSearch(sortedArray, target);
if (result !== -1) {
    console.log(\`Element \${target} found at index \${result}\`);
} else {
    console.log(\`Element \${target} not found\`);
}

// Verbose demonstration
console.log("\\nVerbose search:");
exponentialSearchVerbose(sortedArray, 42);

// Performance comparison
function performanceTest() {
    const largeArray = Array.from({length: 1000000}, (_, i) => i);
    
    console.time('Exponential Search');
    exponentialSearch(largeArray, 750000);
    console.timeEnd('Exponential Search');
}

// Demonstrate on different array sizes
function demonstrateScalability() {
    const sizes = [100, 1000, 10000, 100000];
    
    sizes.forEach(size => {
        const testArray = Array.from({length: size}, (_, i) => i);
        const searchTarget = Math.floor(size * 0.75);
        
        console.time(\`Size \${size}\`);
        exponentialSearch(testArray, searchTarget);
        console.timeEnd(\`Size \${size}\`);
    });
}`;

  const codeExamples = {
    python: pythonCode,
    java: javaCode,
    cpp: cppCode,
    javascript: javascriptCode
  } as const;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold text-slate-800 mb-4">Implementation</h3>
      
      {/* Language Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        {(Object.keys(codeExamples) as Array<keyof typeof codeExamples>).map((lang) => (
          <button
            key={lang}
            onClick={() => setActiveTab(lang)}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === lang
                ? 'border-b-2 border-emerald-500 text-emerald-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {String(lang).charAt(0).toUpperCase() + String(lang).slice(1)}
          </button>
        ))}
      </div>
      
      {/* Code Display */}
      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
        <pre className="text-sm">
          <code>{codeExamples[activeTab]}</code>
        </pre>
      </div>
    </div>
  );
};

export default function ExponentialSearchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Link href="/algorithms/searching" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Searching Algorithms
          </Link>
          <h1 className="text-5xl font-bold text-slate-800 mb-4">
            <span className="text-emerald-600">Exponential Search</span> Algorithm
          </h1>
          <p className="text-xl text-slate-600 max-w-4xl leading-relaxed">
            Also known as Doubling Search or Galloping Search, this algorithm finds a range where the target element might exist by exponentially increasing the bound, then performs binary search.
          </p>
        </motion.div>

        {/* Algorithm Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid md:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Clock className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Time Complexity</h3>
            <div className="text-2xl font-bold text-emerald-600">O(log n)</div>
            <p className="text-sm text-slate-600 mt-2">Logarithmic time</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Cpu className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Space Complexity</h3>
            <div className="text-2xl font-bold text-green-600">O(1)</div>
            <p className="text-sm text-slate-600 mt-2">Constant extra space</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Bound Finding</h3>
            <div className="text-2xl font-bold text-blue-600">O(log i)</div>
            <p className="text-sm text-slate-600 mt-2">Where i is target position</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Eye className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Best For</h3>
            <div className="text-2xl font-bold text-purple-600">Unbounded</div>
            <p className="text-sm text-slate-600 mt-2">Unknown array size</p>
          </div>
        </motion.div>

        {/* Interactive Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <ExponentialSearchVisualization />
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-12"
        >
          <h2 className="text-2xl font-semibold text-slate-800 mb-6 flex items-center">
            <BookOpen className="h-6 w-6 mr-2 text-emerald-600" />
            How Exponential Search Works
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Algorithm Steps:</h3>
              <ol className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-emerald-100 text-emerald-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                  <span className="text-slate-700">Check if element is at index 0</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-emerald-100 text-emerald-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                  <span className="text-slate-700">Start with bound = 1</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-emerald-100 text-emerald-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                  <span className="text-slate-700">While arr[bound] &lt; target, double the bound</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-emerald-100 text-emerald-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                  <span className="text-slate-700">Found range: [bound/2, min(bound, n-1)]</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-emerald-100 text-emerald-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">5</span>
                  <span className="text-slate-700">Perform binary search in the identified range</span>
                </li>
              </ol>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Key Characteristics:</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium text-slate-800">Two-Phase Algorithm</div>
                    <div className="text-sm text-slate-600">Range finding + Binary search</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium text-slate-800">Exponential Growth</div>
                    <div className="text-sm text-slate-600">Bounds grow as 1, 2, 4, 8, 16, ...</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium text-slate-800">Optimal for Unknown Size</div>
                    <div className="text-sm text-slate-600">Excellent when array size is unknown</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-orange-600 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium text-slate-800">Better than Linear</div>
                    <div className="text-sm text-slate-600">More efficient than sequential scanning</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Code Implementation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <CodeExample />
        </motion.div>

        {/* When to Use */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-12"
        >
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">When Exponential Search Shines</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-emerald-700 mb-4">🎯 Ideal Scenarios</h3>
              <div className="space-y-4">
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                  <h4 className="font-semibold text-emerald-800 mb-2">Unbounded Arrays</h4>
                  <p className="text-sm text-gray-700">
                    When you don&apos;t know the size of the array in advance. Exponential search can work with streams or dynamic data.
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Target Near Beginning</h4>
                  <p className="text-sm text-gray-700">
                    When the target element is likely to be found early in the array, exponential search quickly narrows down the range.
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-800 mb-2">Memory-Constrained Systems</h4>
                  <p className="text-sm text-gray-700">
                    When you can&apos;t hold the entire array in memory and need to search as you read the data.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">📊 Performance Analysis</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Time Complexity Breakdown</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Range Finding:</span>
                      <span className="font-mono text-emerald-600">O(log i)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Binary Search:</span>
                      <span className="font-mono text-blue-600">O(log i)</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-semibold">Total:</span>
                      <span className="font-mono font-bold text-emerald-600">O(log i)</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      where i is the position of the target element
                    </p>
                  </div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-2">🔍 Example</h4>
                  <p className="text-sm text-gray-700">
                    For an array of 1 million elements, if target is at position 1000:
                  </p>
                  <ul className="text-xs text-gray-600 mt-2 list-disc pl-4">
                    <li>Range finding: ~10 comparisons</li>
                    <li>Binary search: ~10 comparisons</li>
                    <li>Total: ~20 comparisons vs 1000 for linear search</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-12"
        >
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Algorithm Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 text-left font-semibold text-slate-800">Algorithm</th>
                  <th className="p-3 text-left font-semibold text-slate-800">Time Complexity</th>
                  <th className="p-3 text-left font-semibold text-slate-800">Space Complexity</th>
                  <th className="p-3 text-left font-semibold text-slate-800">Array Size Knowledge</th>
                  <th className="p-3 text-left font-semibold text-slate-800">Best Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="p-3 font-medium text-red-600">Linear Search</td>
                  <td className="p-3 text-slate-700">O(n)</td>
                  <td className="p-3 text-slate-700">O(1)</td>
                  <td className="p-3 text-slate-700">Not required</td>
                  <td className="p-3 text-slate-700">Small arrays, unsorted data</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-blue-600">Binary Search</td>
                  <td className="p-3 text-slate-700">O(log n)</td>
                  <td className="p-3 text-slate-700">O(1)</td>
                  <td className="p-3 text-slate-700">Required</td>
                  <td className="p-3 text-slate-700">Known size, random access</td>
                </tr>
                <tr className="bg-emerald-50">
                  <td className="p-3 font-medium text-emerald-600">Exponential Search</td>
                  <td className="p-3 text-slate-700">O(log i)</td>
                  <td className="p-3 text-slate-700">O(1)</td>
                  <td className="p-3 text-slate-700">Not required</td>
                  <td className="p-3 text-slate-700">Unknown size, target near start</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-purple-600">Jump Search</td>
                  <td className="p-3 text-slate-700">O(√n)</td>
                  <td className="p-3 text-slate-700">O(1)</td>
                  <td className="p-3 text-slate-700">Required</td>
                  <td className="p-3 text-slate-700">Medium arrays, simple implementation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Pros and Cons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="grid md:grid-cols-2 gap-6 mb-12"
        >
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-green-700 mb-4">✅ Advantages</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span className="text-slate-700">Works without knowing array size</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span className="text-slate-700">Excellent for unbounded arrays</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span className="text-slate-700">Better than binary search when target is near beginning</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span className="text-slate-700">Constant space complexity</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span className="text-slate-700">Works with streaming data</span>
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-red-700 mb-4">❌ Disadvantages</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                <span className="text-slate-700">Requires sorted data</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                <span className="text-slate-700">Slightly more complex than binary search</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                <span className="text-slate-700">May be slower for targets near the end</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                <span className="text-slate-700">Two-phase algorithm adds complexity</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                <span className="text-slate-700">Not as widely known as binary search</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Real-World Applications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-12"
        >
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Real-World Applications</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border-l-4 border-emerald-500 pl-4">
              <h3 className="font-semibold text-emerald-700 mb-2">💾 System Applications</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Log file searching</li>
                <li>• Database query optimization</li>
                <li>• Memory allocation systems</li>
                <li>• File system indexing</li>
                <li>• Cache management</li>
              </ul>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-blue-700 mb-2">🌐 Network & Data</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Streaming data analysis</li>
                <li>• Time-series databases</li>
                <li>• Network packet analysis</li>
                <li>• Real-time monitoring</li>
                <li>• Sensor data processing</li>
              </ul>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-purple-700 mb-2">🔬 Scientific Computing</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Scientific simulations</li>
                <li>• Bioinformatics sequence search</li>
                <li>• Signal processing</li>
                <li>• Mathematical optimization</li>
                <li>• Research data analysis</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex justify-between items-center"
        >
          <Link
            href="/algorithms/searching/interpolation-search"
            className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Previous: Interpolation Search
          </Link>
          
          <Link
            href="/algorithms/searching/ternary-search"
            className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Next: Ternary Search
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
