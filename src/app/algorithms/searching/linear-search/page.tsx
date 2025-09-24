"use client";
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Search, ArrowLeft, Clock, Cpu, Zap, Eye, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const LinearSearchVisualization = () => {
  const [array, setArray] = useState([64, 34, 25, 12, 22, 11, 90, 88, 76, 50]);
  const [target, setTarget] = useState(22);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [found, setFound] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [comparisons, setComparisons] = useState(0);

  const linearSearch = async () => {
    setIsSearching(true);
    setFound(false);
    setComparisons(0);
    setCurrentIndex(-1);

    for (let i = 0; i < array.length; i++) {
      setCurrentIndex(i);
      setComparisons(i + 1);
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (array[i] === target) {
        setFound(true);
        setIsSearching(false);
        return;
      }
    }
    
    setIsSearching(false);
    setCurrentIndex(-1);
  };

  const resetSearch = () => {
    setCurrentIndex(-1);
    setFound(false);
    setIsSearching(false);
    setComparisons(0);
  };

  const generateNewArray = () => {
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 99) + 1);
    setArray(newArray);
    resetSearch();
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-slate-800 mb-4">Interactive Linear Search</h3>
        
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
            onClick={linearSearch}
            disabled={isSearching}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-medium disabled:opacity-50"
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

        {/* Array Visualization */}
        <div className="flex justify-center items-center space-x-2 mb-4">
          {array.map((element, index) => (
            <motion.div
              key={index}
              initial={{ scale: 1 }}
              animate={{ 
                scale: currentIndex === index ? 1.1 : 1,
                backgroundColor: 
                  found && currentIndex === index ? '#10b981' :
                  currentIndex === index ? '#f59e0b' :
                  '#e5e7eb'
              }}
              className={`w-12 h-12 flex items-center justify-center font-bold rounded border-2 ${
                found && currentIndex === index ? 'border-green-600 text-white' :
                currentIndex === index ? 'border-yellow-600 text-white' :
                'border-gray-400 text-gray-700'
              }`}
            >
              {element}
            </motion.div>
          ))}
        </div>

        {/* Array Indices */}
        <div className="flex justify-center items-center space-x-2 mb-6 text-sm text-gray-600">
          {array.map((_, index) => (
            <div key={index} className="w-12 text-center">
              [{index}]
            </div>
          ))}
        </div>

        {/* Status */}
        <div className="text-center">
          <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
            <div className="bg-blue-50 p-3 rounded">
              <span className="font-semibold text-blue-700">Current Index:</span>
              <div className="text-2xl font-bold text-blue-600">{currentIndex === -1 ? '-' : currentIndex}</div>
            </div>
            <div className="bg-orange-50 p-3 rounded">
              <span className="font-semibold text-orange-700">Comparisons:</span>
              <div className="text-2xl font-bold text-orange-600">{comparisons}</div>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <span className="font-semibold text-gray-700">Status:</span>
              <div className="text-lg font-bold text-gray-600">
                {isSearching ? 'Searching...' : found ? 'Found!' : comparisons > 0 ? 'Not Found' : 'Ready'}
              </div>
            </div>
          </div>
          
          {found && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              ✅ Target {target} found at index {currentIndex} after {comparisons} comparisons!
            </div>
          )}
          
          {!found && !isSearching && comparisons > 0 && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              ❌ Target {target} not found after searching {comparisons} elements!
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

  const pythonCode = `def linear_search(arr, target):
    """
    Linear Search Algorithm
    Time Complexity: O(n)
    Space Complexity: O(1)
    """
    for i in range(len(arr)):
        if arr[i] == target:
            return i  # Return index if found
    return -1  # Return -1 if not found

# Example usage
array = [64, 34, 25, 12, 22, 11, 90, 88, 76, 50]
target = 22

result = linear_search(array, target)
if result != -1:
    print(f"Element {target} found at index {result}")
else:
    print(f"Element {target} not found")`;

  const javaCode = `public class LinearSearch {
    /**
     * Linear Search Algorithm
     * Time Complexity: O(n)
     * Space Complexity: O(1)
     */
    public static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i; // Return index if found
            }
        }
        return -1; // Return -1 if not found
    }
    
    public static void main(String[] args) {
        int[] array = {64, 34, 25, 12, 22, 11, 90, 88, 76, 50};
        int target = 22;
        
        int result = linearSearch(array, target);
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
 * Linear Search Algorithm
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
int linearSearch(const std::vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) {
            return i; // Return index if found
        }
    }
    return -1; // Return -1 if not found
}

int main() {
    std::vector<int> array = {64, 34, 25, 12, 22, 11, 90, 88, 76, 50};
    int target = 22;
    
    int result = linearSearch(array, target);
    if (result != -1) {
        std::cout << "Element " << target << " found at index " << result << std::endl;
    } else {
        std::cout << "Element " << target << " not found" << std::endl;
    }
    
    return 0;
}`;

  const javascriptCode = `/**
 * Linear Search Algorithm
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i; // Return index if found
        }
    }
    return -1; // Return -1 if not found
}

// Example usage
const array = [64, 34, 25, 12, 22, 11, 90, 88, 76, 50];
const target = 22;

const result = linearSearch(array, target);
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
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold text-slate-800 mb-4">Implementation</h3>
      
      {/* Language Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        {(['python','java','cpp','javascript'] as TabKey[]).map((lang) => (
          <button
            key={lang}
            onClick={() => setActiveTab(lang)}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === lang
                ? 'border-b-2 border-red-500 text-red-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {lang.charAt(0).toUpperCase() + lang.slice(1)}
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

export default function LinearSearchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Link href="/algorithms/searching" className="inline-flex items-center text-red-600 hover:text-red-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Searching Algorithms
          </Link>
          <h1 className="text-5xl font-bold text-slate-800 mb-4">
            <span className="text-red-600">Linear Search</span> Algorithm
          </h1>
          <p className="text-xl text-slate-600 max-w-4xl leading-relaxed">
            The simplest search algorithm that examines each element sequentially until the target is found or the entire array is searched.
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
            <Clock className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Time Complexity</h3>
            <div className="text-2xl font-bold text-red-600">O(n)</div>
            <p className="text-sm text-slate-600 mt-2">Linear time in worst case</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Cpu className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Space Complexity</h3>
            <div className="text-2xl font-bold text-green-600">O(1)</div>
            <p className="text-sm text-slate-600 mt-2">Constant extra space</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Best Case</h3>
            <div className="text-2xl font-bold text-blue-600">O(1)</div>
            <p className="text-sm text-slate-600 mt-2">Element at first position</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Eye className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Stability</h3>
            <div className="text-2xl font-bold text-purple-600">N/A</div>
            <p className="text-sm text-slate-600 mt-2">Not applicable to searching</p>
          </div>
        </motion.div>

        {/* Interactive Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <LinearSearchVisualization />
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-12"
        >
          <h2 className="text-2xl font-semibold text-slate-800 mb-6 flex items-center">
            <BookOpen className="h-6 w-6 mr-2 text-red-600" />
            How Linear Search Works
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Algorithm Steps:</h3>
              <ol className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-red-100 text-red-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                  <span className="text-slate-700">Start from the first element of the array</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-red-100 text-red-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                  <span className="text-slate-700">Compare the current element with the target value</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-red-100 text-red-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                  <span className="text-slate-700">If they match, return the current index</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-red-100 text-red-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                  <span className="text-slate-700">If not, move to the next element</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-red-100 text-red-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">5</span>
                  <span className="text-slate-700">Repeat until element is found or array ends</span>
                </li>
              </ol>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Key Characteristics:</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium text-slate-800">Simple Implementation</div>
                    <div className="text-sm text-slate-600">Easy to understand and implement</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium text-slate-800">Works on Unsorted Data</div>
                    <div className="text-sm text-slate-600">No preprocessing required</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium text-slate-800">Sequential Access</div>
                    <div className="text-sm text-slate-600">Suitable for linked lists and arrays</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-orange-600 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium text-slate-800">Linear Time Complexity</div>
                    <div className="text-sm text-slate-600">Performance degrades with larger datasets</div>
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

        {/* Pros and Cons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid md:grid-cols-2 gap-6 mb-12"
        >
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-green-700 mb-4">✅ Advantages</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span className="text-slate-700">Simple and easy to understand</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span className="text-slate-700">Works on unsorted data</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span className="text-slate-700">No additional memory required</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span className="text-slate-700">Suitable for small datasets</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                <span className="text-slate-700">Works with any data structure</span>
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-red-700 mb-4">❌ Disadvantages</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                <span className="text-slate-700">Slow for large datasets</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                <span className="text-slate-700">Inefficient for repeated searches</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                <span className="text-slate-700">Linear time complexity O(n)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                <span className="text-slate-700">Not suitable for real-time applications</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                <span className="text-slate-700">Doesn&apos;t utilize data ordering</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Use Cases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-12"
        >
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">When to Use Linear Search</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-green-700 mb-2">✅ Good For:</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Small datasets (&lt; 100 elements)</li>
                <li>• Unsorted arrays</li>
                <li>• One-time searches</li>
                <li>• Linked lists</li>
                <li>• Simple implementations</li>
              </ul>
            </div>
            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="font-semibold text-red-700 mb-2">❌ Avoid For:</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Large datasets (&gt; 1000 elements)</li>
                <li>• Sorted arrays</li>
                <li>• Frequent searches</li>
                <li>• Performance-critical applications</li>
                <li>• Real-time systems</li>
              </ul>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-blue-700 mb-2">💡 Alternatives:</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Binary Search (sorted data)</li>
                <li>• Hash Table (frequent searches)</li>
                <li>• Jump Search (large sorted arrays)</li>
                <li>• Interpolation Search (uniform data)</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex justify-between items-center"
        >
          <Link
            href="/algorithms/searching"
            className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Searching
          </Link>
          
          <Link
            href="/algorithms/searching/binary-search"
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Next: Binary Search
            <Search className="h-5 w-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
