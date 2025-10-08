"use client";
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, ArrowLeft, ArrowRight, Clock, Cpu, Eye, CheckCircle, SkipForward } from 'lucide-react';
import { useState } from 'react';

const JumpSearchVisualization = () => {
  const [array, setArray] = useState([1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31]);
  const [target, setTarget] = useState(15);
  const [jumpSize, setJumpSize] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [jumpIndex, setJumpIndex] = useState(-1);
  const [linearStart, setLinearStart] = useState(-1);
  const [found, setFound] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [comparisons, setComparisons] = useState(0);
  const [phase, setPhase] = useState<'jumping' | 'linear' | 'found' | 'not-found' | ''>('');
  type Step = { phase: 'jumping' | 'linear'; index: number; element: number; comparison: number; action: string };
  const [searchHistory, setSearchHistory] = useState<Step[]>([]);

  const jumpSearch = async () => {
    setIsSearching(true);
    setFound(false);
    setComparisons(0);
    setSearchHistory([]);
    setPhase('jumping');
    setCurrentIndex(-1);
    setLinearStart(-1);
    
    let step = Math.floor(Math.sqrt(array.length));
    let prev = 0;
    let compCount = 0;
  const history: Step[] = [];

    // Jumping phase
    while (array[Math.min(step, array.length) - 1] < target) {
      setJumpIndex(Math.min(step, array.length) - 1);
      compCount++;
      setComparisons(compCount);
      
      const stepInfo: Step = {
        phase: 'jumping',
        index: Math.min(step, array.length) - 1,
        element: array[Math.min(step, array.length) - 1],
        comparison: compCount,
        action: `${array[Math.min(step, array.length) - 1]} < ${target}, jump to next block`
      };
      
      history.push(stepInfo);
      setSearchHistory([...history]);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      prev = step;
      step += Math.floor(Math.sqrt(array.length));
      
      if (prev >= array.length) {
        setPhase('not-found');
        setIsSearching(false);
        setJumpIndex(-1);
        return;
      }
    }

    // Linear search phase
    setPhase('linear');
    setLinearStart(prev);
    setJumpIndex(-1);
    
    await new Promise(resolve => setTimeout(resolve, 500));

    for (let i = prev; i < Math.min(step, array.length); i++) {
      setCurrentIndex(i);
      compCount++;
      setComparisons(compCount);
      
      const stepInfo: Step = {
        phase: 'linear',
        index: i,
        element: array[i],
        comparison: compCount,
        action: `Linear search: comparing ${array[i]} with ${target}`
      };
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (array[i] === target) {
        stepInfo.action = `Found! ${target} = ${array[i]}`;
        history.push(stepInfo);
        setSearchHistory([...history]);
        setFound(true);
        setPhase('found');
        setIsSearching(false);
        return;
      } else if (array[i] > target) {
        stepInfo.action = `${array[i]} > ${target}, element not found`;
        history.push(stepInfo);
        setSearchHistory([...history]);
        setPhase('not-found');
        setIsSearching(false);
        setCurrentIndex(-1);
        return;
      }
      
      history.push(stepInfo);
      setSearchHistory([...history]);
    }
    
    setPhase('not-found');
    setIsSearching(false);
    setCurrentIndex(-1);
  };

  const resetSearch = () => {
    setCurrentIndex(-1);
    setJumpIndex(-1);
    setLinearStart(-1);
    setFound(false);
    setIsSearching(false);
    setComparisons(0);
    setPhase('');
    setSearchHistory([]);
  };

  const generateNewArray = () => {
    const newArray = Array.from({ length: 16 }, (_, i) => (i + 1) * 2 - 1); // 1, 3, 5, 7, ...
    setArray(newArray);
    setJumpSize(Math.floor(Math.sqrt(newArray.length)));
    resetSearch();
  };

  const optimalJumpSize = Math.floor(Math.sqrt(array.length));

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg text-gray-700">
      <div className="mb-6 text-gray-700">
        <h3 className="text-xl font-semibold text-slate-800 mb-4">Interactive Jump Search</h3>
        
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
          <div className="flex items-center gap-2 text-gray-700">
            <label className="text-sm font-medium text-slate-700">Optimal Jump Size:</label>
            <span className="text-sm font-bold text-purple-600">{optimalJumpSize}</span>
          </div>
          <button
            onClick={jumpSearch}
            disabled={isSearching}
            className="bg-purple-500 hover:bg-purple-600 text-black px-4 py-2 rounded font-medium disabled:opacity-50 text-gray-800"
          >
            {isSearching ? 'Searching...' : 'Start Search'}
          </button>
          <button
            onClick={resetSearch}
            className="bg-gray-500 hover:bg-gray-600 text-black px-4 py-2 rounded font-medium text-gray-800"
          >
            Reset
          </button>
          <button
            onClick={generateNewArray}
            className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded font-medium text-gray-800"
          >
            New Array
          </button>
        </div>

        {/* Phase Indicator */}
        <div className="mb-4 p-3 bg-gray-50 rounded text-gray-700">
          <div className="text-sm font-medium text-gray-700">
            Current Phase: 
            <span className={`ml-2 px-2 py-1 rounded text-black ${
              phase === 'jumping' ? 'bg-purple-500' :
              phase === 'linear' ? 'bg-blue-500' :
              phase === 'found' ? 'bg-green-500' :
              phase === 'not-found' ? 'bg-red-500' :
              'bg-gray-400'
            }`}>
              {phase === 'jumping' ? 'Jumping Phase' :
               phase === 'linear' ? 'Linear Search Phase' :
               phase === 'found' ? 'Found!' :
               phase === 'not-found' ? 'Not Found' :
               'Ready'}
            </span>
          </div>
        </div>

        {/* Array Visualization */}
        <div className="grid grid-cols-8 gap-2 mb-4 text-gray-700">
          {array.map((element, index) => (
            <motion.div
              key={index}
              initial={{ scale: 1 }}
              animate={{ 
                scale: 
                  (found && currentIndex === index) ? 1.15 :
                  (currentIndex === index || jumpIndex === index) ? 1.1 : 
                  1,
                backgroundColor: 
                  found && currentIndex === index ? '#10b981' :
                  currentIndex === index ? '#3b82f6' :
                  jumpIndex === index ? '#8b5cf6' :
                  (linearStart !== -1 && index >= linearStart && index < linearStart + optimalJumpSize) ? '#fbbf24' :
                  '#e5e7eb'
              }}
              className={`w-12 h-12 flex items-center justify-center font-bold rounded border-2 text-sm ${
                found && currentIndex === index ? 'border-green-600 text-white' :
                currentIndex === index ? 'border-blue-600 text-white' :
                jumpIndex === index ? 'border-purple-600 text-white' :
                (linearStart !== -1 && index >= linearStart && index < linearStart + optimalJumpSize) ? 'border-yellow-600 text-white' :
                'border-gray-400 text-gray-700'
              }`}
            >
              {element}
            </motion.div>
          ))}
        </div>

        {/* Array Indices */}
        <div className="grid grid-cols-8 gap-2 mb-6 text-xs text-gray-600">
          {array.map((_, index) => (
            <div key={index} className="w-12 text-center text-gray-700">
              [{index}]
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center text-gray-700">
            <div className="w-4 h-4 bg-purple-500 rounded mr-2 text-gray-700"></div>
            <span>Jump Position</span>
          </div>
          <div className="flex items-center text-gray-700">
            <div className="w-4 h-4 bg-yellow-500 rounded mr-2 text-gray-700"></div>
            <span>Linear Search Block</span>
          </div>
          <div className="flex items-center text-gray-700">
            <div className="w-4 h-4 bg-blue-500 rounded mr-2 text-black"></div>
            <span>Current Position</span>
          </div>
          <div className="flex items-center text-gray-700">
            <div className="w-4 h-4 bg-green-500 rounded mr-2 text-gray-700"></div>
            <span>Found</span>
          </div>
        </div>

        {/* Status */}
        <div className="grid grid-cols-3 gap-4 mb-4 text-sm text-gray-600">
          <div className="bg-purple-50 p-3 rounded text-gray-700">
            <span className="font-semibold text-purple-700">Jump Size:</span>
            <div className="text-2xl font-bold text-purple-600">{optimalJumpSize}</div>
          </div>
          <div className="bg-blue-50 p-3 rounded text-white">
            <span className="font-semibold text-blue-700">Current Index:</span>
            <div className="text-2xl font-bold text-blue-600">{currentIndex === -1 ? (jumpIndex === -1 ? '-' : jumpIndex) : currentIndex}</div>
          </div>
          <div className="bg-orange-50 p-3 rounded text-gray-700">
            <span className="font-semibold text-orange-700">Comparisons:</span>
            <div className="text-2xl font-bold text-orange-600">{comparisons}</div>
          </div>
        </div>

        {/* Search History */}
        {searchHistory.length > 0 && (
          <div className="bg-gray-50 p-4 rounded mt-4 text-gray-700">
            <h4 className="font-semibold text-gray-800 mb-2">Search Steps:</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto text-gray-700">
              {searchHistory.map((step, index) => (
                <div key={index} className="text-sm text-gray-600">
                  <span className="font-medium text-gray-600">Step {step.comparison}:</span>
                  <span className={`ml-2 px-2 py-1 rounded text-black text-xs ${
                    step.phase === 'jumping' ? 'bg-purple-500' : 'bg-blue-500'
                  }`}>
                    {step.phase.toUpperCase()}
                  </span>
                  <span className="ml-2 text-gray-600">Index {step.index}: {step.element}</span>
                  <span className="ml-2 text-gray-600">→ {step.action}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Result */}
        <div className="text-center mt-4 text-gray-700">
          {found && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              ✅ Target {target} found at index {currentIndex} after {comparisons} comparisons!
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

  const pythonCode = `import math

def jump_search(arr, target):
    """
    Jump Search Algorithm
    Time Complexity: O(√n)
    Space Complexity: O(1)
    Prerequisite: Array must be sorted
    """
    n = len(arr)
    
    # Finding the optimal jump size (√n)
    jump = int(math.sqrt(n))
    
    # Finding the block where element is present
    prev = 0
    while arr[min(jump, n) - 1] < target:
        prev = jump
        jump += int(math.sqrt(n))
        
        # If we have reached beyond the array
        if prev >= n:
            return -1
    
    # Linear search in the identified block
    while arr[prev] < target:
        prev += 1
        
        # If we reached next block or end of array
        if prev == min(jump, n):
            return -1
    
    # If element is found
    if arr[prev] == target:
        return prev
    
    return -1

# Example usage
sorted_array = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31]
target = 15

result = jump_search(sorted_array, target)
if result != -1:
    print(f"Element {target} found at index {result}")
else:
    print(f"Element {target} not found")

# Optimal jump size calculation
optimal_jump = int(math.sqrt(len(sorted_array)))
print(f"Optimal jump size for array of length {len(sorted_array)}: {optimal_jump}")`;

  const javaCode = `public class JumpSearch {
    /**
     * Jump Search Algorithm
     * Time Complexity: O(√n)
     * Space Complexity: O(1)
     * Prerequisite: Array must be sorted
     */
    public static int jumpSearch(int[] arr, int target) {
        int n = arr.length;
        
        // Finding the optimal jump size (√n)
        int jump = (int) Math.sqrt(n);
        
        // Finding the block where element is present
        int prev = 0;
        while (arr[Math.min(jump, n) - 1] < target) {
            prev = jump;
            jump += (int) Math.sqrt(n);
            
            // If we have reached beyond the array
            if (prev >= n) {
                return -1;
            }
        }
        
        // Linear search in the identified block
        while (arr[prev] < target) {
            prev++;
            
            // If we reached next block or end of array
            if (prev == Math.min(jump, n)) {
                return -1;
            }
        }
        
        // If element is found
        if (arr[prev] == target) {
            return prev;
        }
        
        return -1;
    }
    
    public static void main(String[] args) {
        int[] sortedArray = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31};
        int target = 15;
        
        int result = jumpSearch(sortedArray, target);
        if (result != -1) {
            System.out.println("Element " + target + " found at index " + result);
        } else {
            System.out.println("Element " + target + " not found");
        }
        
        // Optimal jump size calculation
        int optimalJump = (int) Math.sqrt(sortedArray.length);
        System.out.println("Optimal jump size for array of length " + 
                          sortedArray.length + ": " + optimalJump);
    }
}`;

  const cppCode = `#include <iostream>
#include <vector>
#include <cmath>

/**
 * Jump Search Algorithm
 * Time Complexity: O(√n)
 * Space Complexity: O(1)
 * Prerequisite: Array must be sorted
 */
int jumpSearch(const std::vector<int>& arr, int target) {
    int n = arr.size();
    
    // Finding the optimal jump size (√n)
    int jump = static_cast<int>(std::sqrt(n));
    
    // Finding the block where element is present
    int prev = 0;
    while (arr[std::min(jump, n) - 1] < target) {
        prev = jump;
        jump += static_cast<int>(std::sqrt(n));
        
        // If we have reached beyond the array
        if (prev >= n) {
            return -1;
        }
    }
    
    // Linear search in the identified block
    while (arr[prev] < target) {
        prev++;
        
        // If we reached next block or end of array
        if (prev == std::min(jump, n)) {
            return -1;
        }
    }
    
    // If element is found
    if (arr[prev] == target) {
        return prev;
    }
    
    return -1;
}

int main() {
    std::vector<int> sortedArray = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31};
    int target = 15;
    
    int result = jumpSearch(sortedArray, target);
    if (result != -1) {
        std::cout << "Element " << target << " found at index " << result << std::endl;
    } else {
        std::cout << "Element " << target << " not found" << std::endl;
    }
    
    // Optimal jump size calculation
    int optimalJump = static_cast<int>(std::sqrt(sortedArray.size()));
    std::cout << "Optimal jump size for array of length " << 
                 sortedArray.size() << ": " << optimalJump << std::endl;
    
    return 0;
}`;

  const javascriptCode = `/**
 * Jump Search Algorithm
 * Time Complexity: O(√n)
 * Space Complexity: O(1)
 * Prerequisite: Array must be sorted
 */
function jumpSearch(arr, target) {
    const n = arr.length;
    
    // Finding the optimal jump size (√n)
    const jump = Math.floor(Math.sqrt(n));
    
    // Finding the block where element is present
    let prev = 0;
    let currentJump = jump;
    
    while (arr[Math.min(currentJump, n) - 1] < target) {
        prev = currentJump;
        currentJump += jump;
        
        // If we have reached beyond the array
        if (prev >= n) {
            return -1;
        }
    }
    
    // Linear search in the identified block
    while (arr[prev] < target) {
        prev++;
        
        // If we reached next block or end of array
        if (prev === Math.min(currentJump, n)) {
            return -1;
        }
    }
    
    // If element is found
    if (arr[prev] === target) {
        return prev;
    }
    
    return -1;
}

// Example usage
const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31];
const target = 15;

const result = jumpSearch(sortedArray, target);
if (result !== -1) {
    console.log(\`Element \${target} found at index \${result}\`);
} else {
    console.log(\`Element \${target} not found\`);
}

// Optimal jump size calculation
const optimalJump = Math.floor(Math.sqrt(sortedArray.length));
console.log(\`Optimal jump size for array of length \${sortedArray.length}: \${optimalJump}\`);`;

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
                ? 'border-b-2 border-purple-500 text-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {lang.charAt(0).toUpperCase() + lang.slice(1)}
          </button>
        ))}
      </div>
      
      {/* Code Display */}
      <div className="bg-gray-900 text-gray-800 p-4 rounded-lg overflow-x-auto">
        <pre className="text-sm text-gray-600">
          <code>{codeExamples[activeTab]}</code>
        </pre>
      </div>
    </div>
  );
};

export default function JumpSearchPage() {
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
          <Link href="/algorithms/searching" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2 text-gray-700" />
            Back to Searching Algorithms
          </Link>
          <h1 className="text-5xl font-bold text-slate-800 mb-4">
            <span className="text-purple-600">Jump Search</span> Algorithm
          </h1>
          <p className="text-xl text-slate-600 max-w-4xl leading-relaxed">
            A search algorithm that works on sorted arrays by skipping blocks of elements instead of searching one by one, combining the benefits of linear and binary search.
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
            <Clock className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Time Complexity</h3>
            <div className="text-2xl font-bold text-purple-600">O(√n)</div>
            <p className="text-sm text-slate-600 mt-2">Square root time</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center text-gray-700">
            <Cpu className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Space Complexity</h3>
            <div className="text-2xl font-bold text-green-600">O(1)</div>
            <p className="text-sm text-slate-600 mt-2">Constant extra space</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center text-gray-700">
            <SkipForward className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Jump Size</h3>
            <div className="text-2xl font-bold text-blue-600">√n</div>
            <p className="text-sm text-slate-600 mt-2">Optimal block size</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center text-gray-700">
            <Eye className="h-12 w-12 text-orange-600 mx-auto mb-4" />
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
          <JumpSearchVisualization />
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-12 text-gray-700"
        >
          <h2 className="text-2xl font-semibold text-slate-800 mb-6 flex items-center">
            <BookOpen className="h-6 w-6 mr-2 text-purple-600" />
            How Jump Search Works
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-gray-700">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Algorithm Steps:</h3>
              <ol className="space-y-3 text-gray-700">
                <li className="flex items-start text-gray-700">
                  <span className="bg-purple-100 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                  <span className="text-slate-700">Calculate optimal jump size: √n</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="bg-purple-100 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                  <span className="text-slate-700">Jump through blocks until finding a block where last element ≥ target</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="bg-purple-100 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                  <span className="text-slate-700">Perform linear search within the identified block</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="bg-purple-100 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                  <span className="text-slate-700">Return index if found, otherwise return -1</span>
                </li>
              </ol>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Key Characteristics:</h3>
              <div className="space-y-4 text-gray-700">
                <div className="flex items-start text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium text-slate-800">Two-Phase Search</div>
                    <div className="text-sm text-slate-600">Jumping phase + linear search phase</div>
                  </div>
                </div>
                <div className="flex items-start text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium text-slate-800">Optimal Jump Size</div>
                    <div className="text-sm text-slate-600">√n provides best performance</div>
                  </div>
                </div>
                <div className="flex items-start text-gray-700">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium text-slate-800">Better than Linear</div>
                    <div className="text-sm text-slate-600">Faster than linear search for large arrays</div>
                  </div>
                </div>
                <div className="flex items-start text-gray-700">
                  <CheckCircle className="h-5 w-5 text-orange-600 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium text-slate-800">Simpler than Binary</div>
                    <div className="text-sm text-slate-600">Easier to implement than binary search</div>
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

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-12 text-gray-700"
        >
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Search Algorithm Comparison</h2>
          <div className="overflow-x-auto text-gray-700">
            <table className="w-full text-sm text-gray-600">
              <thead>
                <tr className="bg-gray-50 text-gray-700">
                  <th className="p-3 text-left font-semibold text-slate-800">Algorithm</th>
                  <th className="p-3 text-left font-semibold text-slate-800">Time Complexity</th>
                  <th className="p-3 text-left font-semibold text-slate-800">Space Complexity</th>
                  <th className="p-3 text-left font-semibold text-slate-800">Requirement</th>
                  <th className="p-3 text-left font-semibold text-slate-800">Best For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-700">
                <tr>
                  <td className="p-3 font-medium text-red-600">Linear Search</td>
                  <td className="p-3 text-slate-700">O(n)</td>
                  <td className="p-3 text-slate-700">O(1)</td>
                  <td className="p-3 text-slate-700">None</td>
                  <td className="p-3 text-slate-700">Small arrays, unsorted data</td>
                </tr>
                <tr className="bg-purple-50 text-gray-700">
                  <td className="p-3 font-medium text-purple-600">Jump Search</td>
                  <td className="p-3 text-slate-700">O(√n)</td>
                  <td className="p-3 text-slate-700">O(1)</td>
                  <td className="p-3 text-slate-700">Sorted</td>
                  <td className="p-3 text-slate-700">Medium arrays, simple implementation</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-blue-600">Binary Search</td>
                  <td className="p-3 text-slate-700">O(log n)</td>
                  <td className="p-3 text-slate-700">O(1)</td>
                  <td className="p-3 text-slate-700">Sorted</td>
                  <td className="p-3 text-slate-700">Large arrays, optimal performance</td>
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
                <span className="text-slate-700">Better than linear search O(√n) vs O(n)</span>
              </li>
              <li className="flex items-start text-gray-700">
                <span className="text-green-600 mr-2">•</span>
                <span className="text-slate-700">Simpler than binary search</span>
              </li>
              <li className="flex items-start text-gray-700">
                <span className="text-green-600 mr-2">•</span>
                <span className="text-slate-700">Good for medium-sized arrays</span>
              </li>
              <li className="flex items-start text-gray-700">
                <span className="text-green-600 mr-2">•</span>
                <span className="text-slate-700">Works well with sequential access</span>
              </li>
              <li className="flex items-start text-gray-700">
                <span className="text-green-600 mr-2">•</span>
                <span className="text-slate-700">Intuitive and easy to understand</span>
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-gray-700">
            <h3 className="text-xl font-semibold text-red-700 mb-4">❌ Disadvantages</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start text-gray-700">
                <span className="text-red-600 mr-2">•</span>
                <span className="text-slate-700">Slower than binary search</span>
              </li>
              <li className="flex items-start text-gray-700">
                <span className="text-red-600 mr-2">•</span>
                <span className="text-slate-700">Requires sorted array</span>
              </li>
              <li className="flex items-start text-gray-700">
                <span className="text-red-600 mr-2">•</span>
                <span className="text-slate-700">Still has linear component</span>
              </li>
              <li className="flex items-start text-gray-700">
                <span className="text-red-600 mr-2">•</span>
                <span className="text-slate-700">Not optimal for very large datasets</span>
              </li>
              <li className="flex items-start text-gray-700">
                <span className="text-red-600 mr-2">•</span>
                <span className="text-slate-700">May not be worth the complexity for small arrays</span>
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
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">When to Use Jump Search</h2>
          <div className="grid md:grid-cols-3 gap-6 text-gray-700">
            <div className="border-l-4 border-green-500 pl-4 text-gray-700">
              <h3 className="font-semibold text-green-700 mb-2">✅ Good For:</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Medium-sized sorted arrays (100-10,000 elements)</li>
                <li>• When binary search is too complex</li>
                <li>• Sequential access preferred</li>
                <li>• Simple implementation needed</li>
                <li>• Learning algorithms</li>
              </ul>
            </div>
            <div className="border-l-4 border-red-500 pl-4 text-gray-700">
              <h3 className="font-semibold text-red-700 mb-2">❌ Avoid For:</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Very large datasets (&gt; 100,000 elements)</li>
                <li>• Unsorted arrays</li>
                <li>• When optimal performance is critical</li>
                <li>• Small arrays (&lt; 100 elements)</li>
                <li>• Frequent searches on same data</li>
              </ul>
            </div>
            <div className="border-l-4 border-blue-500 pl-4 text-gray-700">
              <h3 className="font-semibold text-blue-700 mb-2">💡 Real Examples:</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Game leaderboards</li>
                <li>• Student grade lists</li>
                <li>• Product catalogs</li>
                <li>• Time-series data</li>
                <li>• Educational tools</li>
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
            href="/algorithms/searching/binary-search"
            className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2 text-gray-700" />
            Previous: Binary Search
          </Link>
          
          <Link
            href="/algorithms/searching/interpolation-search"
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-gray-100"
          >
            Next: Interpolation Search
            <ArrowRight className="h-5 w-5 ml-2 text-gray-700" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
