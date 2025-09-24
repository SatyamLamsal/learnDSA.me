"use client";
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Code, Clock, BookOpen } from 'lucide-react';

export default function ArraysTheoryPage() {
  const codeExamples = {
    declaration: `// Array Declaration in Different Languages

// JavaScript
let numbers = [1, 2, 3, 4, 5];
let names = ["Alice", "Bob", "Charlie"];

// Python  
numbers = [1, 2, 3, 4, 5]
names = ["Alice", "Bob", "Charlie"]

// Java
int[] numbers = {1, 2, 3, 4, 5};
String[] names = {"Alice", "Bob", "Charlie"};

// C++
int numbers[] = {1, 2, 3, 4, 5};
std::string names[] = {"Alice", "Bob", "Charlie"};`,

    operations: `// Basic Array Operations

// Access - O(1)
let firstElement = arr[0];
let lastElement = arr[arr.length - 1];

// Update - O(1)
arr[2] = 100;

// Search - O(n)
function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i; // Return index if found
        }
    }
    return -1; // Not found
}

// Insertion at end - O(1) amortized
arr.push(newElement);

// Insertion at specific position - O(n)
function insertAt(arr, index, element) {
    for (let i = arr.length; i > index; i--) {
        arr[i] = arr[i - 1];
    }
    arr[index] = element;
}`,

    advanced: `// Advanced Array Algorithms

// Binary Search (for sorted arrays) - O(log n)
function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

// Two Pointer Technique
function twoSum(arr, target) {
    let left = 0, right = arr.length - 1;
    
    while (left < right) {
        let sum = arr[left] + arr[right];
        if (sum === target) return [left, right];
        else if (sum < target) left++;
        else right--;
    }
    return [];
}

// Sliding Window Technique
function maxSubarraySum(arr, k) {
    let maxSum = 0, windowSum = 0;
    
    // Calculate sum of first window
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    maxSum = windowSum;
    
    // Slide the window
    for (let i = k; i < arr.length; i++) {
        windowSum = windowSum - arr[i - k] + arr[i];
        maxSum = Math.max(maxSum, windowSum);
    }
    return maxSum;
}`
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <Link href="/data-structures/arrays" className="inline-flex items-center text-red-600 hover:text-red-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Arrays Overview
          </Link>
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Arrays: Theory & Implementation</h1>
          <p className="text-xl text-slate-600 max-w-3xl">
            Master the fundamentals of arrays, from basic operations to advanced techniques and real-world applications.
          </p>
        </motion.div>

        {/* Table of Contents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-12"
        >
          <h2 className="text-2xl font-semibold mb-6 text-slate-700">Table of Contents</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <a href="#fundamentals" className="block text-red-600 hover:text-red-700">1. Array Fundamentals</a>
              <a href="#memory" className="block text-red-600 hover:text-red-700">2. Memory Layout</a>
              <a href="#operations" className="block text-red-600 hover:text-red-700">3. Basic Operations</a>
              <a href="#complexity" className="block text-red-600 hover:text-red-700">4. Time Complexity Analysis</a>
            </div>
            <div className="space-y-2">
              <a href="#types" className="block text-red-600 hover:text-red-700">5. Types of Arrays</a>
              <a href="#algorithms" className="block text-red-600 hover:text-red-700">6. Common Algorithms</a>
              <a href="#applications" className="block text-red-600 hover:text-red-700">7. Real-world Applications</a>
              <a href="#best-practices" className="block text-red-600 hover:text-red-700">8. Best Practices</a>
            </div>
          </div>
        </motion.div>

        {/* Section 1: Fundamentals */}
        <motion.section
          id="fundamentals"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-lg shadow-lg p-8 mb-12"
        >
          <h2 className="text-3xl font-semibold mb-6 text-slate-700 flex items-center">
            <BookOpen className="h-8 w-8 text-red-600 mr-3" />
            Array Fundamentals
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">What is an Array?</h3>
              <p className="text-gray-700 leading-relaxed">
                An array is a collection of elements stored in contiguous memory locations. Each element 
                can be directly accessed using its index, which represents its position in the array. 
                Arrays are one of the most fundamental data structures in computer science.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Key Characteristics</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Fixed Size:</strong> In most languages, array size is determined at creation time</li>
                <li><strong>Homogeneous:</strong> All elements are of the same data type</li>
                <li><strong>Zero-indexed:</strong> First element is at index 0</li>
                <li><strong>Random Access:</strong> Any element can be accessed in constant time</li>
                <li><strong>Contiguous Memory:</strong> Elements are stored in consecutive memory locations</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Section 2: Memory Layout */}
        <motion.section
          id="memory"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-lg shadow-lg p-8 mb-12"
        >
          <h2 className="text-3xl font-semibold mb-6 text-slate-700">Memory Layout & Indexing</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Memory Allocation</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Arrays store elements in contiguous memory locations. If an array starts at memory address 
                1000 and each element takes 4 bytes, then:
              </p>
              <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                Element[0] → Address: 1000<br/>
                Element[1] → Address: 1004<br/>
                Element[2] → Address: 1008<br/>
                Element[3] → Address: 1012
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Address Calculation Formula</h3>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-mono text-center text-lg text-blue-800">
                  Address = Base_Address + (Index × Element_Size)
                </p>
              </div>
              <p className="text-gray-700 mt-4">
                This formula enables O(1) random access to any element, making arrays highly efficient 
                for scenarios requiring frequent element access.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Section 3: Operations */}
        <motion.section
          id="operations"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-lg shadow-lg p-8 mb-12"
        >
          <h2 className="text-3xl font-semibold mb-6 text-slate-700 flex items-center">
            <Code className="h-8 w-8 text-red-600 mr-3" />
            Basic Operations
          </h2>
          
          <div className="space-y-8">
            {/* Declaration */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Array Declaration</h3>
              <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                <pre className="text-green-400 text-sm">
                  <code>{codeExamples.declaration}</code>
                </pre>
              </div>
            </div>

            {/* Basic Operations */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Basic Operations</h3>
              <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                <pre className="text-green-400 text-sm">
                  <code>{codeExamples.operations}</code>
                </pre>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 4: Complexity */}
        <motion.section
          id="complexity"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-lg shadow-lg p-8 mb-12"
        >
          <h2 className="text-3xl font-semibold mb-6 text-slate-700 flex items-center">
            <Clock className="h-8 w-8 text-red-600 mr-3" />
            Time Complexity Analysis
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Time Complexities</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                  <span className="font-semibold">Access/Update</span>
                  <span className="font-mono text-green-600">O(1)</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
                  <span className="font-semibold">Linear Search</span>
                  <span className="font-mono text-yellow-600">O(n)</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                  <span className="font-semibold">Binary Search</span>
                  <span className="font-mono text-blue-600">O(log n)</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded">
                  <span className="font-semibold">Insertion/Deletion</span>
                  <span className="font-mono text-red-600">O(n)</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Why These Complexities?</h3>
              <div className="space-y-4 text-sm">
                <div className="p-3 border-l-4 border-green-500">
                  <strong>O(1) Access:</strong> Direct calculation using index formula
                </div>
                <div className="p-3 border-l-4 border-yellow-500">
                  <strong>O(n) Search:</strong> May need to check every element
                </div>
                <div className="p-3 border-l-4 border-blue-500">
                  <strong>O(log n) Binary Search:</strong> Eliminates half the elements each step
                </div>
                <div className="p-3 border-l-4 border-red-500">
                  <strong>O(n) Insert/Delete:</strong> May need to shift all elements
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 5: Advanced Algorithms */}
        <motion.section
          id="algorithms"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-lg shadow-lg p-8 mb-12"
        >
          <h2 className="text-3xl font-semibold mb-6 text-slate-700">Advanced Array Algorithms</h2>
          
          <div className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              Beyond basic operations, arrays are used in many sophisticated algorithms and techniques:
            </p>
            
            <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
              <pre className="text-green-400 text-sm">
                <code>{codeExamples.advanced}</code>
              </pre>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 border-2 border-red-200 rounded-lg">
                <h4 className="font-semibold text-red-700 mb-2">Two Pointers</h4>
                <p className="text-sm text-gray-600">Use two pointers moving towards each other to solve problems efficiently</p>
              </div>
              <div className="p-4 border-2 border-red-200 rounded-lg">
                <h4 className="font-semibold text-red-700 mb-2">Sliding Window</h4>
                <p className="text-sm text-gray-600">Maintain a window of elements and slide it to find optimal solutions</p>
              </div>
              <div className="p-4 border-2 border-red-200 rounded-lg">
                <h4 className="font-semibold text-red-700 mb-2">Binary Search</h4>
                <p className="text-sm text-gray-600">Efficiently search sorted arrays by eliminating half the search space</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 6: Applications */}
        <motion.section
          id="applications"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-lg shadow-lg p-8 mb-12"
        >
          <h2 className="text-3xl font-semibold mb-6 text-slate-700">Real-world Applications</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Common Use Cases</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <div>
                    <strong>Database Records:</strong> Storing and accessing database rows
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <div>
                    <strong>Image Processing:</strong> Pixel data representation
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <div>
                    <strong>Mathematical Operations:</strong> Matrix operations, vectors
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <div>
                    <strong>Buffers:</strong> Input/output buffers, caching mechanisms
                  </div>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Industry Examples</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <div>
                    <strong>Gaming:</strong> Game boards, sprite animations, score tables
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <div>
                    <strong>Finance:</strong> Stock prices, trading data, portfolios
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <div>
                    <strong>Web Development:</strong> DOM elements, API responses
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <div>
                    <strong>Scientific Computing:</strong> Data analysis, simulations
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-between items-center"
        >
          <Link href="/data-structures/arrays" className="flex items-center text-red-600 hover:text-red-700">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Overview
          </Link>
          <Link href="/data-structures/arrays/simulation" className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Try Interactive Simulation →
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
