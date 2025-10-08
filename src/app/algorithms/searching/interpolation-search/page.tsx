"use client";
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, ArrowLeft, ArrowRight, Clock, Cpu, Eye, CheckCircle, Calculator } from 'lucide-react';
import { useState } from 'react';

const InterpolationSearchVisualization = () => {
  const [array, setArray] = useState([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
  const [target, setTarget] = useState(50);
  const [left, setLeft] = useState(-1);
  const [right, setRight] = useState(-1);
  const [pos, setPos] = useState(-1);
  const [found, setFound] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [comparisons, setComparisons] = useState(0);
  const [interpolationFormula, setInterpolationFormula] = useState('');
  type Step = { left: number; right: number; pos: number; comparison: number; element: number; formula: string; action: string };
  const [searchHistory, setSearchHistory] = useState<Step[]>([]);

  const interpolationSearch = async () => {
    setIsSearching(true);
    setFound(false);
    setComparisons(0);
    setSearchHistory([]);
    
    let leftPtr = 0;
    let rightPtr = array.length - 1;
    let compCount = 0;
  const history: Step[] = [];

    while (leftPtr <= rightPtr && target >= array[leftPtr] && target <= array[rightPtr]) {
      // Handle single element
      if (leftPtr === rightPtr) {
        setLeft(leftPtr);
        setRight(rightPtr);
        setPos(leftPtr);
        compCount++;
        setComparisons(compCount);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (array[leftPtr] === target) {
          setFound(true);
          const step = {
            left: leftPtr,
            right: rightPtr,
            pos: leftPtr,
            comparison: compCount,
            element: array[leftPtr],
            formula: 'Single element remaining',
            action: `Found! ${target} = ${array[leftPtr]}`
          };
          history.push(step);
          setSearchHistory([...history]);
        }
        setIsSearching(false);
        return;
      }

      // Calculate interpolated position
      const posCalculation = leftPtr + Math.floor(
        ((target - array[leftPtr]) / (array[rightPtr] - array[leftPtr])) * 
        (rightPtr - leftPtr)
      );
      
      const formula = `${leftPtr} + ⌊((${target} - ${array[leftPtr]}) / (${array[rightPtr]} - ${array[leftPtr]})) × (${rightPtr} - ${leftPtr})⌋ = ${posCalculation}`;
      setInterpolationFormula(formula);
      
      setLeft(leftPtr);
      setRight(rightPtr);
      setPos(posCalculation);
      compCount++;
      setComparisons(compCount);
      
      const step = {
        left: leftPtr,
        right: rightPtr,
        pos: posCalculation,
        comparison: compCount,
        element: array[posCalculation],
        formula,
        action: ''
      };

      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (array[posCalculation] === target) {
        step.action = `Found! ${target} = ${array[posCalculation]}`;
        history.push(step);
        setSearchHistory([...history]);
        setFound(true);
        setIsSearching(false);
        return;
      } else if (array[posCalculation] < target) {
        step.action = `${array[posCalculation]} < ${target}, search right portion`;
        history.push(step);
        leftPtr = posCalculation + 1;
      } else {
        step.action = `${array[posCalculation]} > ${target}, search left portion`;
        history.push(step);
        rightPtr = posCalculation - 1;
      }
      
      setSearchHistory([...history]);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    setIsSearching(false);
    setLeft(-1);
    setRight(-1);
    setPos(-1);
  };

  const resetSearch = () => {
    setLeft(-1);
    setRight(-1);
    setPos(-1);
    setFound(false);
    setIsSearching(false);
    setComparisons(0);
    setInterpolationFormula('');
    setSearchHistory([]);
  };

  const generateUniformArray = () => {
    // Generate uniformly distributed array for better interpolation
    const newArray = Array.from({ length: 10 }, (_, i) => (i + 1) * 10);
    setArray(newArray);
    resetSearch();
  };

  const generateNonUniformArray = () => {
    // Generate non-uniformly distributed array
    const newArray = [1, 5, 12, 18, 25, 35, 48, 65, 85, 100];
    setArray(newArray);
    resetSearch();
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg text-gray-700">
      <div className="mb-6 text-gray-700">
        <h3 className="text-xl font-semibold text-slate-800 mb-4">Interactive Interpolation Search</h3>
        
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
            onClick={interpolationSearch}
            disabled={isSearching}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-medium disabled:opacity-50 text-gray-800"
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
            onClick={generateUniformArray}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-medium text-sm text-gray-600"
          >
            Uniform Array
          </button>
          <button
            onClick={generateNonUniformArray}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium text-sm text-gray-600"
          >
            Non-Uniform Array
          </button>
        </div>

        {/* Interpolation Formula Display */}
        {interpolationFormula && (
          <div className="bg-orange-50 p-4 rounded mb-4 border border-orange-200 text-gray-700">
            <h4 className="font-semibold text-orange-800 mb-2">Interpolation Formula:</h4>
            <div className="font-mono text-sm text-orange-700 break-all">
              pos = {interpolationFormula}
            </div>
          </div>
        )}

        {/* Array Visualization */}
        <div className="flex justify-center items-center space-x-2 mb-4 text-gray-700">
          {array.map((element, index) => (
            <motion.div
              key={index}
              initial={{ scale: 1 }}
              animate={{ 
                scale: 
                  (found && pos === index) ? 1.15 :
                  (pos === index) ? 1.1 : 
                  (index >= left && index <= right && left !== -1 && right !== -1) ? 1.05 : 
                  1,
                backgroundColor: 
                  found && pos === index ? '#10b981' :
                  pos === index ? '#f97316' :
                  (index >= left && index <= right && left !== -1 && right !== -1) ? '#fbbf24' :
                  '#e5e7eb'
              }}
              className={`w-12 h-12 flex items-center justify-center font-bold rounded border-2 text-sm ${
                found && pos === index ? 'border-green-600 text-white' :
                pos === index ? 'border-orange-600 text-white' :
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
              {pos === index && <span className="text-orange-600 font-bold">P</span>}
              {right === index && <span className="text-green-600 font-bold">R</span>}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center text-gray-700">
            <div className="w-4 h-4 bg-orange-500 rounded mr-2 text-gray-700"></div>
            <span>Interpolated Position</span>
          </div>
          <div className="flex items-center text-gray-700">
            <div className="w-4 h-4 bg-yellow-500 rounded mr-2 text-gray-700"></div>
            <span>Search Range</span>
          </div>
          <div className="flex items-center text-gray-700">
            <div className="w-4 h-4 bg-green-500 rounded mr-2 text-gray-700"></div>
            <span>Found</span>
          </div>
        </div>

        {/* Status */}
        <div className="grid grid-cols-4 gap-4 mb-4 text-sm text-gray-600">
          <div className="bg-red-50 p-3 rounded text-gray-700">
            <span className="font-semibold text-red-700">Left:</span>
            <div className="text-xl font-bold text-red-600">{left === -1 ? '-' : left}</div>
          </div>
          <div className="bg-orange-50 p-3 rounded text-gray-700">
            <span className="font-semibold text-orange-700">Position:</span>
            <div className="text-xl font-bold text-orange-600">{pos === -1 ? '-' : pos}</div>
          </div>
          <div className="bg-green-50 p-3 rounded text-gray-700">
            <span className="font-semibold text-green-700">Right:</span>
            <div className="text-xl font-bold text-green-600">{right === -1 ? '-' : right}</div>
          </div>
          <div className="bg-blue-50 p-3 rounded text-gray-700">
            <span className="font-semibold text-blue-700">Comparisons:</span>
            <div className="text-xl font-bold text-blue-600">{comparisons}</div>
          </div>
        </div>

        {/* Search History */}
        {searchHistory.length > 0 && (
          <div className="bg-gray-50 p-4 rounded mt-4 text-gray-700">
            <h4 className="font-semibold text-gray-800 mb-2">Search Steps:</h4>
            <div className="space-y-3 max-h-48 overflow-y-auto text-gray-700">
              {searchHistory.map((step, index) => (
                <div key={index} className="text-sm border-l-4 border-orange-300 pl-3 text-gray-600">
                  <div className="font-medium text-gray-700">Step {step.comparison}:</div>
                  <div className="text-orange-600 font-mono text-xs mb-1">{step.formula}</div>
                  <div>
                    <span className="text-gray-600">Left={step.left}, Pos={step.pos}, Right={step.right}</span>
                    <span className="ml-2 text-gray-600">Element: {step.element}</span>
                  </div>
                  <div className="text-blue-600">→ {step.action}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Result */}
        <div className="text-center mt-4 text-gray-700">
          {found && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              ✅ Target {target} found at index {pos} after {comparisons} comparisons!
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

  const pythonCode = `def interpolation_search(arr, target):
    """
    Interpolation Search Algorithm
    Time Complexity: O(log log n) for uniformly distributed data
                    O(n) worst case
    Space Complexity: O(1)
    Prerequisite: Array must be sorted and uniformly distributed for best performance
    """
    left = 0
    right = len(arr) - 1
    
    while left <= right and target >= arr[left] and target <= arr[right]:
        # Handle single element
        if left == right:
            if arr[left] == target:
                return left
            return -1
        
        # Calculate interpolated position
        # Formula: left + [(target - arr[left]) / (arr[right] - arr[left])] * (right - left)
        pos = left + int(((target - arr[left]) / (arr[right] - arr[left])) * (right - left))
        
        # Ensure pos is within bounds
        pos = max(left, min(pos, right))
        
        if arr[pos] == target:
            return pos
        elif arr[pos] < target:
            left = pos + 1
        else:
            right = pos - 1
    
    return -1

# Example usage
uniform_array = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
target = 50

result = interpolation_search(uniform_array, target)
if result != -1:
    print(f"Element {target} found at index {result}")
else:
    print(f"Element {target} not found")

# Performance comparison
import time

# Uniform distribution - best case
uniform_data = list(range(1, 1000001, 1))
start_time = time.time()
interpolation_search(uniform_data, 500000)
print(f"Uniform data search time: {time.time() - start_time:.6f} seconds")`;

  const javaCode = `public class InterpolationSearch {
    /**
     * Interpolation Search Algorithm
     * Time Complexity: O(log log n) for uniformly distributed data
     *                 O(n) worst case
     * Space Complexity: O(1)
     * Prerequisite: Array must be sorted and uniformly distributed for best performance
     */
    public static int interpolationSearch(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;
        
        while (left <= right && target >= arr[left] && target <= arr[right]) {
            // Handle single element
            if (left == right) {
                if (arr[left] == target) {
                    return left;
                }
                return -1;
            }
            
            // Calculate interpolated position
            // Using long to prevent overflow in calculation
            long numerator = (long)(target - arr[left]) * (right - left);
            long denominator = arr[right] - arr[left];
            int pos = left + (int)(numerator / denominator);
            
            // Ensure pos is within bounds
            pos = Math.max(left, Math.min(pos, right));
            
            if (arr[pos] == target) {
                return pos;
            } else if (arr[pos] < target) {
                left = pos + 1;
            } else {
                right = pos - 1;
            }
        }
        
        return -1;
    }
    
    public static void main(String[] args) {
        int[] uniformArray = {10, 20, 30, 40, 50, 60, 70, 80, 90, 100};
        int target = 50;
        
        int result = interpolationSearch(uniformArray, target);
        if (result != -1) {
            System.out.println("Element " + target + " found at index " + result);
        } else {
            System.out.println("Element " + target + " not found");
        }
        
        // Performance test
        int[] largeArray = new int[1000000];
        for (int i = 0; i < largeArray.length; i++) {
            largeArray[i] = i + 1;
        }
        
        long startTime = System.nanoTime();
        interpolationSearch(largeArray, 500000);
        long endTime = System.nanoTime();
        System.out.println("Search time: " + (endTime - startTime) / 1000000.0 + " ms");
    }
}`;

  const cppCode = `#include <iostream>
#include <vector>
#include <chrono>

/**
 * Interpolation Search Algorithm
 * Time Complexity: O(log log n) for uniformly distributed data
 *                 O(n) worst case
 * Space Complexity: O(1)
 * Prerequisite: Array must be sorted and uniformly distributed for best performance
 */
int interpolationSearch(const std::vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    
    while (left <= right && target >= arr[left] && target <= arr[right]) {
        // Handle single element
        if (left == right) {
            if (arr[left] == target) {
                return left;
            }
            return -1;
        }
        
        // Calculate interpolated position
        // Using double to handle potential precision issues
        double ratio = static_cast<double>(target - arr[left]) / (arr[right] - arr[left]);
        int pos = left + static_cast<int>(ratio * (right - left));
        
        // Ensure pos is within bounds
        pos = std::max(left, std::min(pos, right));
        
        if (arr[pos] == target) {
            return pos;
        } else if (arr[pos] < target) {
            left = pos + 1;
        } else {
            right = pos - 1;
        }
    }
    
    return -1;
}

int main() {
    std::vector<int> uniformArray = {10, 20, 30, 40, 50, 60, 70, 80, 90, 100};
    int target = 50;
    
    int result = interpolationSearch(uniformArray, target);
    if (result != -1) {
        std::cout << "Element " << target << " found at index " << result << std::endl;
    } else {
        std::cout << "Element " << target << " not found" << std::endl;
    }
    
    // Performance test
    std::vector<int> largeArray(1000000);
    for (int i = 0; i < largeArray.size(); i++) {
        largeArray[i] = i + 1;
    }
    
    auto start = std::chrono::high_resolution_clock::now();
    interpolationSearch(largeArray, 500000);
    auto end = std::chrono::high_resolution_clock::now();
    
    auto duration = std::chrono::duration_cast<std::chrono::microseconds>(end - start);
    std::cout << "Search time: " << duration.count() << " microseconds" << std::endl;
    
    return 0;
}`;

  const javascriptCode = `/**
 * Interpolation Search Algorithm
 * Time Complexity: O(log log n) for uniformly distributed data
 *                 O(n) worst case
 * Space Complexity: O(1)
 * Prerequisite: Array must be sorted and uniformly distributed for best performance
 */
function interpolationSearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right && target >= arr[left] && target <= arr[right]) {
        // Handle single element
        if (left === right) {
            if (arr[left] === target) {
                return left;
            }
            return -1;
        }
        
        // Calculate interpolated position
        const ratio = (target - arr[left]) / (arr[right] - arr[left]);
        let pos = left + Math.floor(ratio * (right - left));
        
        // Ensure pos is within bounds
        pos = Math.max(left, Math.min(pos, right));
        
        if (arr[pos] === target) {
            return pos;
        } else if (arr[pos] < target) {
            left = pos + 1;
        } else {
            right = pos - 1;
        }
    }
    
    return -1;
}

// Example usage
const uniformArray = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const target = 50;

const result = interpolationSearch(uniformArray, target);
if (result !== -1) {
    console.log(\`Element \${target} found at index \${result}\`);
} else {
    console.log(\`Element \${target} not found\`);
}

// Performance comparison function
function performanceTest() {
    const largeArray = Array.from({length: 1000000}, (_, i) => i + 1);
    
    console.time('Interpolation Search');
    interpolationSearch(largeArray, 500000);
    console.timeEnd('Interpolation Search');
}

// Demonstration of different data distributions
const uniformData = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const nonUniformData = [1, 5, 12, 18, 25, 35, 48, 65, 85, 100];

console.log("Uniform data result:", interpolationSearch(uniformData, 50));
console.log("Non-uniform data result:", interpolationSearch(nonUniformData, 50));`;

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
                ? 'border-b-2 border-orange-500 text-orange-600'
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

export default function InterpolationSearchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 text-gray-700">
      <div className="container mx-auto px-4 py-12 text-gray-700">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-gray-700"
        >
          <Link href="/algorithms/searching" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2 text-gray-700" />
            Back to Searching Algorithms
          </Link>
          <h1 className="text-5xl font-bold text-slate-800 mb-4">
            <span className="text-orange-600">Interpolation Search</span> Algorithm
          </h1>
          <p className="text-xl text-slate-600 max-w-4xl leading-relaxed">
            An advanced search algorithm that uses interpolation to guess the position of the target element, particularly effective for uniformly distributed sorted data.
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
            <Clock className="h-12 w-12 text-orange-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Time Complexity</h3>
            <div className="text-2xl font-bold text-orange-600">O(log log n)</div>
            <p className="text-sm text-slate-600 mt-2">For uniform data</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center text-gray-700">
            <Cpu className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Space Complexity</h3>
            <div className="text-2xl font-bold text-green-600">O(1)</div>
            <p className="text-sm text-slate-600 mt-2">Constant extra space</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center text-gray-700">
            <Calculator className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Worst Case</h3>
            <div className="text-2xl font-bold text-blue-600">O(n)</div>
            <p className="text-sm text-slate-600 mt-2">Non-uniform data</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center text-gray-700">
            <Eye className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Best For</h3>
            <div className="text-2xl font-bold text-purple-600">Uniform</div>
            <p className="text-sm text-slate-600 mt-2">Distributed data</p>
          </div>
        </motion.div>

        {/* Interactive Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 text-gray-700"
        >
          <InterpolationSearchVisualization />
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-12 text-gray-700"
        >
          <h2 className="text-2xl font-semibold text-slate-800 mb-6 flex items-center">
            <BookOpen className="h-6 w-6 mr-2 text-orange-600" />
            How Interpolation Search Works
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-gray-700">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Algorithm Steps:</h3>
              <ol className="space-y-3 text-gray-700">
                <li className="flex items-start text-gray-700">
                  <span className="bg-orange-100 text-orange-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                  <span className="text-slate-700">Check if target is within array bounds</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="bg-orange-100 text-orange-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                  <span className="text-slate-700">Calculate interpolated position using the formula</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="bg-orange-100 text-orange-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                  <span className="text-slate-700">Compare element at interpolated position with target</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="bg-orange-100 text-orange-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                  <span className="text-slate-700">If equal, return index (found!)</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="bg-orange-100 text-orange-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">5</span>
                  <span className="text-slate-700">If target is smaller, search left portion</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="bg-orange-100 text-orange-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">6</span>
                  <span className="text-slate-700">If target is larger, search right portion</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="bg-orange-100 text-orange-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">7</span>
                  <span className="text-slate-700">Repeat until found or search space exhausted</span>
                </li>
              </ol>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Interpolation Formula:</h3>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 mb-4 text-gray-700">
                <div className="text-center text-gray-700">
                  <div className="text-lg font-bold text-orange-800 mb-2">Position Calculation</div>
                  <div className="font-mono text-sm bg-white p-3 rounded border text-gray-600">
                    pos = left + ⌊((target - arr[left]) / (arr[right] - arr[left])) × (right - left)⌋
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <div className="flex items-start text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium text-slate-800">Linear Interpolation</div>
                    <div className="text-sm text-slate-600">Assumes uniform distribution to predict position</div>
                  </div>
                </div>
                <div className="flex items-start text-gray-700">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium text-slate-800">Adaptive Positioning</div>
                    <div className="text-sm text-slate-600">Position adapts based on value distribution</div>
                  </div>
                </div>
                <div className="flex items-start text-gray-700">
                  <CheckCircle className="h-5 w-5 text-orange-600 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium text-slate-800">Superior to Binary Search</div>
                    <div className="text-sm text-slate-600">Much faster for uniformly distributed data</div>
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

        {/* Performance Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-12 text-gray-700"
        >
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Performance Analysis</h2>
          <div className="grid md:grid-cols-2 gap-8 text-gray-700">
            <div>
              <h3 className="text-lg font-semibold text-green-700 mb-4">✅ Best Case (Uniform Data)</h3>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-gray-700">
                <div className="space-y-3 text-gray-700">
                  <div className="flex justify-between text-gray-700">
                    <span className="font-medium text-gray-600">Time Complexity:</span>
                    <span className="font-mono text-green-600">O(log log n)</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span className="font-medium text-gray-600">Example (1M elements):</span>
                    <span className="font-mono text-green-600">~4-5 comparisons</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p className="mb-2 text-gray-700"><strong>When data is uniformly distributed:</strong></p>
                    <ul className="list-disc pl-4 space-y-1 text-gray-700">
                      <li>Each interpolation gets very close to target</li>
                      <li>Dramatically reduces search space</li>
                      <li>Much faster than binary search</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-red-700 mb-4">❌ Worst Case (Non-Uniform Data)</h3>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-gray-700">
                <div className="space-y-3 text-gray-700">
                  <div className="flex justify-between text-gray-700">
                    <span className="font-medium text-gray-600">Time Complexity:</span>
                    <span className="font-mono text-red-600">O(n)</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span className="font-medium text-gray-600">Example (1M elements):</span>
                    <span className="font-mono text-red-600">Up to 1M comparisons</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p className="mb-2 text-gray-700"><strong>When data is skewed:</strong></p>
                    <ul className="list-disc pl-4 space-y-1 text-gray-700">
                      <li>Interpolation may be very inaccurate</li>
                      <li>Can degrade to linear search performance</li>
                      <li>Binary search might be better choice</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Performance Comparison Table */}
          <div className="mt-8 text-gray-700">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Algorithm Comparison (1 Million Elements)</h3>
            <div className="overflow-x-auto text-gray-700">
              <table className="w-full text-sm border border-gray-200 text-gray-600">
                <thead>
                  <tr className="bg-gray-50 text-gray-700">
                    <th className="p-3 text-left font-semibold text-slate-800 border-r">Algorithm</th>
                    <th className="p-3 text-left font-semibold text-slate-800 border-r">Uniform Data</th>
                    <th className="p-3 text-left font-semibold text-slate-800 border-r">Random Data</th>
                    <th className="p-3 text-left font-semibold text-slate-800">Skewed Data</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-700">
                  <tr>
                    <td className="p-3 font-medium text-red-600 border-r">Linear Search</td>
                    <td className="p-3 text-slate-700 border-r">~500,000 comparisons</td>
                    <td className="p-3 text-slate-700 border-r">~500,000 comparisons</td>
                    <td className="p-3 text-slate-700">~500,000 comparisons</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-blue-600 border-r">Binary Search</td>
                    <td className="p-3 text-slate-700 border-r">~20 comparisons</td>
                    <td className="p-3 text-slate-700 border-r">~20 comparisons</td>
                    <td className="p-3 text-slate-700">~20 comparisons</td>
                  </tr>
                  <tr className="bg-orange-50 text-gray-700">
                    <td className="p-3 font-medium text-orange-600 border-r">Interpolation Search</td>
                    <td className="p-3 text-slate-700 border-r">~4-5 comparisons ⭐</td>
                    <td className="p-3 text-slate-700 border-r">~10-15 comparisons</td>
                    <td className="p-3 text-slate-700">Up to 1M comparisons ⚠️</td>
                  </tr>
                </tbody>
              </table>
            </div>
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
                <span className="text-slate-700">Extremely fast for uniform data O(log log n)</span>
              </li>
              <li className="flex items-start text-gray-700">
                <span className="text-green-600 mr-2">•</span>
                <span className="text-slate-700">Outperforms binary search on suitable data</span>
              </li>
              <li className="flex items-start text-gray-700">
                <span className="text-green-600 mr-2">•</span>
                <span className="text-slate-700">Adaptive positioning based on value distribution</span>
              </li>
              <li className="flex items-start text-gray-700">
                <span className="text-green-600 mr-2">•</span>
                <span className="text-slate-700">Constant space complexity O(1)</span>
              </li>
              <li className="flex items-start text-gray-700">
                <span className="text-green-600 mr-2">•</span>
                <span className="text-slate-700">Excellent for large uniformly distributed datasets</span>
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-gray-700">
            <h3 className="text-xl font-semibold text-red-700 mb-4">❌ Disadvantages</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start text-gray-700">
                <span className="text-red-600 mr-2">•</span>
                <span className="text-slate-700">Poor performance on non-uniform data</span>
              </li>
              <li className="flex items-start text-gray-700">
                <span className="text-red-600 mr-2">•</span>
                <span className="text-slate-700">Can degrade to O(n) in worst case</span>
              </li>
              <li className="flex items-start text-gray-700">
                <span className="text-red-600 mr-2">•</span>
                <span className="text-slate-700">Requires knowledge of data distribution</span>
              </li>
              <li className="flex items-start text-gray-700">
                <span className="text-red-600 mr-2">•</span>
                <span className="text-slate-700">More complex than binary search</span>
              </li>
              <li className="flex items-start text-gray-700">
                <span className="text-red-600 mr-2">•</span>
                <span className="text-slate-700">Potential floating-point precision issues</span>
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
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">When to Use Interpolation Search</h2>
          <div className="grid md:grid-cols-3 gap-6 text-gray-700">
            <div className="border-l-4 border-green-500 pl-4 text-gray-700">
              <h3 className="font-semibold text-green-700 mb-2">✅ Perfect For:</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Uniformly distributed data</li>
                <li>• Large sorted datasets</li>
                <li>• Numerical sequences (IDs, timestamps)</li>
                <li>• Performance-critical applications</li>
                <li>• When you know data characteristics</li>
              </ul>
            </div>
            <div className="border-l-4 border-red-500 pl-4 text-gray-700">
              <h3 className="font-semibold text-red-700 mb-2">❌ Avoid For:</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Skewed or clustered data</li>
                <li>• Unknown data distribution</li>
                <li>• Small datasets (&lt; 1000 elements)</li>
                <li>• Frequently changing data</li>
                <li>• Safety-critical systems</li>
              </ul>
            </div>
            <div className="border-l-4 border-blue-500 pl-4 text-gray-700">
              <h3 className="font-semibold text-blue-700 mb-2">💡 Real Examples:</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Phone directories (alphabetical)</li>
                <li>• Time-series databases</li>
                <li>• Scientific data sets</li>
                <li>• Financial tick data</li>
                <li>• Sensor readings over time</li>
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
            href="/algorithms/searching/jump-search"
            className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2 text-gray-700" />
            Previous: Jump Search
          </Link>
          
          <Link
            href="/algorithms/searching/exponential-search"
            className="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-gray-100"
          >
            Next: Exponential Search
            <ArrowRight className="h-5 w-5 ml-2 text-gray-700" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
