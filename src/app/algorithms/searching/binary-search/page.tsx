"use client";
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, ArrowLeft, ArrowRight, Clock, Cpu, Zap, CheckCircle, Divide } from 'lucide-react';
import { useState } from 'react';

const BinarySearchVisualization = () => {
  const [array, setArray] = useState([11, 12, 22, 25, 34, 50, 64, 76, 88, 90]);
  const [target, setTarget] = useState(50);
  const [left, setLeft] = useState(-1);
  const [right, setRight] = useState(-1);
  const [mid, setMid] = useState(-1);
  const [found, setFound] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [comparisons, setComparisons] = useState(0);
  type Step = { left: number; right: number; mid: number; comparison: number; element: number; action: string };
  const [searchHistory, setSearchHistory] = useState<Step[]>([]);

  const binarySearch = async () => {
    setIsSearching(true);
    setFound(false);
    setComparisons(0);
    setSearchHistory([]);
    
    let leftPtr = 0;
    let rightPtr = array.length - 1;
    let compCount = 0;
  const history: Step[] = [];

    while (leftPtr <= rightPtr) {
      const midPtr = Math.floor((leftPtr + rightPtr) / 2);
      setLeft(leftPtr);
      setRight(rightPtr);
      setMid(midPtr);
      compCount++;
      setComparisons(compCount);
      
      const step = {
        left: leftPtr,
        right: rightPtr,
        mid: midPtr,
        comparison: compCount,
        element: array[midPtr],
        action: ''
      };

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (array[midPtr] === target) {
        step.action = `Found! ${target} = ${array[midPtr]}`;
        history.push(step);
        setSearchHistory([...history]);
        setFound(true);
        setIsSearching(false);
        return;
      } else if (array[midPtr] < target) {
        step.action = `${array[midPtr]} < ${target}, search right half`;
        history.push(step);
        leftPtr = midPtr + 1;
      } else {
        step.action = `${array[midPtr]} > ${target}, search left half`;
        history.push(step);
        rightPtr = midPtr - 1;
      }
      
      setSearchHistory([...history]);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    setIsSearching(false);
    setLeft(-1);
    setRight(-1);
    setMid(-1);
  };

  const resetSearch = () => {
    setLeft(-1);
    setRight(-1);
    setMid(-1);
    setFound(false);
    setIsSearching(false);
    setComparisons(0);
    setSearchHistory([]);
  };

  const generateNewArray = () => {
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 99) + 1)
      .sort((a, b) => a - b);
    setArray(newArray);
    resetSearch();
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg text-gray-700">
      <div className="mb-6 text-gray-700">
        <h3 className="text-xl font-semibold text-slate-800 mb-4">Interactive Binary Search</h3>
        
        {/* Controls */}
        <div className="flex flex-wrap gap-4 mb-6 text-gray-700">
          <div className="flex items-center gap-2 text-gray-700">
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
            onClick={binarySearch}
            disabled={isSearching}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium disabled:opacity-50 text-gray-800"
          >
            {isSearching ? 'Searching...' : 'Start Search'}
          </button>
          <button
            onClick={resetSearch}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded font-medium text-gray-800"
          >
            Reset
          </button>
          <button
            onClick={generateNewArray}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-medium text-gray-800"
          >
            New Array
          </button>
        </div>

        {/* Array Visualization */}
        <div className="flex justify-center items-center space-x-2 mb-4 text-gray-700">
          {array.map((element, index) => (
            <motion.div
              key={index}
              initial={{ scale: 1 }}
              animate={{ 
                scale: mid === index ? 1.15 : (left === index || right === index) ? 1.05 : 1,
                backgroundColor: 
                  found && mid === index ? '#10b981' :
                  mid === index ? '#3b82f6' :
                  (index >= left && index <= right && left !== -1 && right !== -1) ? '#fbbf24' :
                  '#e5e7eb'
              }}
              className={`w-12 h-12 flex items-center justify-center font-bold rounded border-2 ${
                found && mid === index ? 'border-green-600 text-white' :
                mid === index ? 'border-blue-600 text-white' :
                (index >= left && index <= right && left !== -1 && right !== -1) ? 'border-yellow-600 text-white' :
                'border-gray-400 text-gray-700'
              }`}
            >
              {element}
            </motion.div>
          ))}
        </div>

        {/* Array Indices */}
        <div className="flex justify-center items-center space-x-2 mb-4 text-sm text-gray-600">
          {array.map((_, index) => (
            <div key={index} className="w-12 text-center text-gray-700">
              [{index}]
            </div>
          ))}
        </div>

        {/* Pointers */}
        <div className="flex justify-center items-center space-x-2 mb-6 text-sm text-gray-600">
          {array.map((_, index) => (
            <div key={index} className="w-12 text-center h-6 text-gray-700">
              {left === index && <span className="text-red-600 font-bold">L</span>}
              {mid === index && <span className="text-blue-600 font-bold">M</span>}
              {right === index && <span className="text-green-600 font-bold">R</span>}
            </div>
          ))}
        </div>

        {/* Status */}
        <div className="grid grid-cols-4 gap-4 mb-4 text-sm text-gray-600">
          <div className="bg-red-50 p-3 rounded text-gray-700">
            <span className="font-semibold text-red-700">Left:</span>
            <div className="text-xl font-bold text-red-600">{left === -1 ? '-' : left}</div>
          </div>
          <div className="bg-blue-50 p-3 rounded text-gray-700">
            <span className="font-semibold text-blue-700">Mid:</span>
            <div className="text-xl font-bold text-blue-600">{mid === -1 ? '-' : mid}</div>
          </div>
          <div className="bg-green-50 p-3 rounded text-gray-700">
            <span className="font-semibold text-green-700">Right:</span>
            <div className="text-xl font-bold text-green-600">{right === -1 ? '-' : right}</div>
          </div>
          <div className="bg-orange-50 p-3 rounded text-gray-700">
            <span className="font-semibold text-orange-700">Comparisons:</span>
            <div className="text-xl font-bold text-orange-600">{comparisons}</div>
          </div>
        </div>

        {/* Search History */}
        {searchHistory.length > 0 && (
          <div className="bg-gray-50 p-4 rounded mt-4 text-gray-700">
            <h4 className="font-semibold text-gray-800 mb-2">Search Steps:</h4>
            <div className="space-y-2 max-h-32 overflow-y-auto text-gray-700">
              {searchHistory.map((step, index) => (
                <div key={index} className="text-sm text-gray-600">
                  <span className="font-medium text-gray-600">Step {step.comparison}:</span>
                  <span className="ml-2 text-gray-600">Left={step.left}, Mid={step.mid}, Right={step.right}</span>
                  <span className="ml-2 text-blue-600">→ {step.action}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Result */}
        <div className="text-center mt-4 text-gray-700">
          {found && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              ✅ Target {target} found at index {mid} after {comparisons} comparisons!
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

type TabKey = 'python' | 'java' | 'cpp' | 'javascript';
const CodeExample = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('python');

  const pythonCode = `def binary_search(arr, target):
    """
    Binary Search Algorithm
    Time Complexity: O(log n)
    Space Complexity: O(1)
    Prerequisite: Array must be sorted
    """
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid  # Element found
        elif arr[mid] < target:
            left = mid + 1  # Search right half
        else:
            right = mid - 1  # Search left half
    
    return -1  # Element not found

# Recursive implementation
def binary_search_recursive(arr, target, left=0, right=None):
    if right is None:
        right = len(arr) - 1
    
    if left > right:
        return -1
    
    mid = (left + right) // 2
    
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, right)
    else:
        return binary_search_recursive(arr, target, left, mid - 1)

# Example usage
sorted_array = [11, 12, 22, 25, 34, 50, 64, 76, 88, 90]
target = 50

result = binary_search(sorted_array, target)
if result != -1:
    print(f"Element {target} found at index {result}")
else:
    print(f"Element {target} not found")`;

  const javaCode = `public class BinarySearch {
    /**
     * Binary Search Algorithm
     * Time Complexity: O(log n)
     * Space Complexity: O(1)
     * Prerequisite: Array must be sorted
     */
    public static int binarySearch(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2; // Prevents overflow
            
            if (arr[mid] == target) {
                return mid; // Element found
            } else if (arr[mid] < target) {
                left = mid + 1; // Search right half
            } else {
                right = mid - 1; // Search left half
            }
        }
        
        return -1; // Element not found
    }
    
    // Recursive implementation
    public static int binarySearchRecursive(int[] arr, int target, int left, int right) {
        if (left > right) {
            return -1;
        }
        
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            return binarySearchRecursive(arr, target, mid + 1, right);
        } else {
            return binarySearchRecursive(arr, target, left, mid - 1);
        }
    }
    
    public static void main(String[] args) {
        int[] sortedArray = {11, 12, 22, 25, 34, 50, 64, 76, 88, 90};
        int target = 50;
        
        int result = binarySearch(sortedArray, target);
        if (result != -1) {
            System.out.println("Element " + target + " found at index " + result);
        } else {
            System.out.println("Element " + target + " not found");
        }
    }
}`;

  const cppCode = `#include <iostream>
#include <vector>

/**
 * Binary Search Algorithm
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 * Prerequisite: Array must be sorted
 */
int binarySearch(const std::vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2; // Prevents overflow
        
        if (arr[mid] == target) {
            return mid; // Element found
        } else if (arr[mid] < target) {
            left = mid + 1; // Search right half
        } else {
            right = mid - 1; // Search left half
        }
    }
    
    return -1; // Element not found
}

// Recursive implementation
int binarySearchRecursive(const std::vector<int>& arr, int target, int left, int right) {
    if (left > right) {
        return -1;
    }
    
    int mid = left + (right - left) / 2;
    
    if (arr[mid] == target) {
        return mid;
    } else if (arr[mid] < target) {
        return binarySearchRecursive(arr, target, mid + 1, right);
    } else {
        return binarySearchRecursive(arr, target, left, mid - 1);
    }
}

int main() {
    std::vector<int> sortedArray = {11, 12, 22, 25, 34, 50, 64, 76, 88, 90};
    int target = 50;
    
    int result = binarySearch(sortedArray, target);
    if (result != -1) {
        std::cout << "Element " << target << " found at index " << result << std::endl;
    } else {
        std::cout << "Element " << target << " not found" << std::endl;
    }
    
    return 0;
}`;

  const javascriptCode = `/**
 * Binary Search Algorithm
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 * Prerequisite: Array must be sorted
 */
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid; // Element found
        } else if (arr[mid] < target) {
            left = mid + 1; // Search right half
        } else {
            right = mid - 1; // Search left half
        }
    }
    
    return -1; // Element not found
}

// Recursive implementation
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) {
        return -1;
    }
    
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
        return mid;
    } else if (arr[mid] < target) {
        return binarySearchRecursive(arr, target, mid + 1, right);
    } else {
        return binarySearchRecursive(arr, target, left, mid - 1);
    }
}

// Example usage
const sortedArray = [11, 12, 22, 25, 34, 50, 64, 76, 88, 90];
const target = 50;

const result = binarySearch(sortedArray, target);
if (result !== -1) {
    console.log(\`Element \${target} found at index \${result}\`);
} else {
    console.log(\`Element \${target} not found\`);
}`;

  const codeExamples: Record<TabKey, string> = {
    python: pythonCode,
    java: javaCode,
    cpp: cppCode,
    javascript: javascriptCode
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 text-gray-700">
      <h3 className="text-xl font-semibold text-slate-800 mb-4">Implementation</h3>
      
      {/* Language Tabs */}
      <div className="flex border-b border-gray-200 mb-4 text-gray-700">
        {(['python','java','cpp','javascript'] as TabKey[]).map((lang) => (
          <button
            key={lang}
            onClick={() => setActiveTab(lang)}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === lang
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {lang.charAt(0).toUpperCase() + lang.slice(1)}
          </button>
        ))}
      </div>
      
      {/* Code Display */}
      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
        <pre className="text-sm text-gray-600">
          <code>{codeExamples[activeTab]}</code>
        </pre>
      </div>
    </div>
  );
};

export default function BinarySearchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 text-gray-700">
      <div className="container mx-auto px-4 py-12 text-gray-700">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-gray-700"
        >
          <Link href="/algorithms/searching" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2 text-gray-700" />
            Back to Searching Algorithms
          </Link>
          <h1 className="text-5xl font-bold text-slate-800 mb-4">
            <span className="text-blue-600">Binary Search</span> Algorithm
          </h1>
          <p className="text-xl text-slate-600 max-w-4xl leading-relaxed">
            An efficient divide-and-conquer search algorithm that works on sorted arrays by repeatedly dividing the search interval in half.
          </p>
        </motion.div>

        {/* Algorithm Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid md:grid-cols-4 gap-6 mb-12 text-gray-700"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 text-center text-gray-700">
            <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Time Complexity</h3>
            <div className="text-2xl font-bold text-blue-600">O(log n)</div>
            <p className="text-sm text-slate-600 mt-2">Logarithmic time</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center text-gray-700">
            <Cpu className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Space Complexity</h3>
            <div className="text-2xl font-bold text-green-600">O(1)</div>
            <p className="text-sm text-slate-600 mt-2">Constant extra space</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center text-gray-700">
            <Zap className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Best Case</h3>
            <div className="text-2xl font-bold text-purple-600">O(1)</div>
            <p className="text-sm text-slate-600 mt-2">Element at middle</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center text-gray-700">
            <Divide className="h-12 w-12 text-orange-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Requirement</h3>
            <div className="text-2xl font-bold text-orange-600">Sorted</div>
            <p className="text-sm text-slate-600 mt-2">Array must be sorted</p>
          </div>
        </motion.div>

        {/* Interactive Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 text-gray-700"
        >
          <BinarySearchVisualization />
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-12 text-gray-700"
        >
          <h2 className="text-2xl font-semibold text-slate-800 mb-6 flex items-center">
            <BookOpen className="h-6 w-6 mr-2 text-blue-600" />
            How Binary Search Works
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-gray-700">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Algorithm Steps:</h3>
              <ol className="space-y-3 text-gray-700">
                <li className="flex items-start text-gray-700">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                  <span className="text-slate-700">Set left pointer to 0 and right pointer to array length - 1</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                  <span className="text-slate-700">Calculate middle index: mid = (left + right) / 2</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                  <span className="text-slate-700">Compare middle element with target value</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                  <span className="text-slate-700">If equal, return the index (found!)</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">5</span>
                  <span className="text-slate-700">If target is smaller, search left half (right = mid - 1)</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">6</span>
                  <span className="text-slate-700">If target is larger, search right half (left = mid + 1)</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">7</span>
                  <span className="text-slate-700">Repeat until found or left &gt; right</span>
                </li>
              </ol>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Key Characteristics:</h3>
              <div className="space-y-4 text-gray-700">
                <div className="flex items-start text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium text-slate-800">Divide and Conquer</div>
                    <div className="text-sm text-slate-600">Eliminates half of the search space each iteration</div>
                  </div>
                </div>
                <div className="flex items-start text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium text-slate-800">Logarithmic Time</div>
                    <div className="text-sm text-slate-600">Extremely efficient for large datasets</div>
                  </div>
                </div>
                <div className="flex items-start text-gray-700">
                  <CheckCircle className="h-5 w-5 text-orange-600 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium text-slate-800">Requires Sorted Data</div>
                    <div className="text-sm text-slate-600">Only works on pre-sorted arrays</div>
                  </div>
                </div>
                <div className="flex items-start text-gray-700">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium text-slate-800">Two Implementations</div>
                    <div className="text-sm text-slate-600">Can be implemented iteratively or recursively</div>
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
          className="mb-12 text-gray-700"
        >
          <CodeExample />
        </motion.div>

        {/* Comparison with Linear Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-12 text-gray-700"
        >
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Binary Search vs Linear Search</h2>
          <div className="overflow-x-auto text-gray-700">
            <table className="w-full text-sm text-gray-600">
              <thead>
                <tr className="bg-gray-50 text-gray-700">
                  <th className="p-3 text-left font-semibold text-slate-800">Aspect</th>
                  <th className="p-3 text-left font-semibold text-blue-600">Binary Search</th>
                  <th className="p-3 text-left font-semibold text-red-600">Linear Search</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-700">
                <tr>
                  <td className="p-3 font-medium text-slate-700">Time Complexity</td>
                  <td className="p-3 text-blue-600">O(log n)</td>
                  <td className="p-3 text-red-600">O(n)</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-700">Space Complexity</td>
                  <td className="p-3 text-blue-600">O(1)</td>
                  <td className="p-3 text-red-600">O(1)</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-700">Data Requirement</td>
                  <td className="p-3 text-blue-600">Must be sorted</td>
                  <td className="p-3 text-red-600">No requirement</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-700">Best for</td>
                  <td className="p-3 text-blue-600">Large sorted datasets</td>
                  <td className="p-3 text-red-600">Small or unsorted data</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-700">Implementation</td>
                  <td className="p-3 text-blue-600">More complex</td>
                  <td className="p-3 text-red-600">Very simple</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-700">Performance (1M elements)</td>
                  <td className="p-3 text-blue-600">~20 comparisons</td>
                  <td className="p-3 text-red-600">~500,000 comparisons</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Pros and Cons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-2 gap-6 mb-12 text-gray-700"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 text-gray-700">
            <h3 className="text-xl font-semibold text-green-700 mb-4">✅ Advantages</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start text-gray-700">
                <span className="text-green-600 mr-2">•</span>
                <span className="text-slate-700">Extremely fast O(log n) time complexity</span>
              </li>
              <li className="flex items-start text-gray-700">
                <span className="text-green-600 mr-2">•</span>
                <span className="text-slate-700">Excellent for large datasets</span>
              </li>
              <li className="flex items-start text-gray-700">
                <span className="text-green-600 mr-2">•</span>
                <span className="text-slate-700">Constant space complexity O(1)</span>
              </li>
              <li className="flex items-start text-gray-700">
                <span className="text-green-600 mr-2">•</span>
                <span className="text-slate-700">Well-suited for repeated searches</span>
              </li>
              <li className="flex items-start text-gray-700">
                <span className="text-green-600 mr-2">•</span>
                <span className="text-slate-700">Predictable performance</span>
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-gray-700">
            <h3 className="text-xl font-semibold text-red-700 mb-4">❌ Disadvantages</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start text-gray-700">
                <span className="text-red-600 mr-2">•</span>
                <span className="text-slate-700">Requires sorted data</span>
              </li>
              <li className="flex items-start text-gray-700">
                <span className="text-red-600 mr-2">•</span>
                <span className="text-slate-700">Sorting overhead for unsorted data</span>
              </li>
              <li className="flex items-start text-gray-700">
                <span className="text-red-600 mr-2">•</span>
                <span className="text-slate-700">Not suitable for linked lists</span>
              </li>
              <li className="flex items-start text-gray-700">
                <span className="text-red-600 mr-2">•</span>
                <span className="text-slate-700">More complex than linear search</span>
              </li>
              <li className="flex items-start text-gray-700">
                <span className="text-red-600 mr-2">•</span>
                <span className="text-slate-700">Overkill for very small datasets</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Use Cases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-12 text-gray-700"
        >
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">When to Use Binary Search</h2>
          <div className="grid md:grid-cols-3 gap-6 text-gray-700">
            <div className="border-l-4 border-green-500 pl-4 text-gray-700">
              <h3 className="font-semibold text-green-700 mb-2">✅ Perfect For:</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Large sorted datasets (&gt; 1000 elements)</li>
                <li>• Frequent searches on same data</li>
                <li>• Database indexing</li>
                <li>• Phone directories</li>
                <li>• Dictionary applications</li>
              </ul>
            </div>
            <div className="border-l-4 border-red-500 pl-4 text-gray-700">
              <h3 className="font-semibold text-red-700 mb-2">❌ Avoid For:</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Unsorted data</li>
                <li>• Small datasets (&lt; 100 elements)</li>
                <li>• Linked lists</li>
                <li>• Frequently changing data</li>
                <li>• One-time searches</li>
              </ul>
            </div>
            <div className="border-l-4 border-blue-500 pl-4 text-gray-700">
              <h3 className="font-semibold text-blue-700 mb-2">💡 Real Examples:</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Finding words in dictionary</li>
                <li>• Searching library catalogs</li>
                <li>• Database B-tree indexes</li>
                <li>• Version control systems</li>
                <li>• Search engines</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex justify-between items-center text-gray-700"
        >
          <Link
            href="/algorithms/searching/linear-search"
            className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2 text-gray-700" />
            Previous: Linear Search
          </Link>
          
          <Link
            href="/algorithms/searching/jump-search"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-gray-100"
          >
            Next: Jump Search
            <ArrowRight className="h-5 w-5 ml-2 text-gray-700" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
