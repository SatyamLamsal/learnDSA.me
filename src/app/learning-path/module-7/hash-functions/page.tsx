'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Key, ArrowRight, ArrowLeft, Hash, Calculator, Zap, Target, Play } from 'lucide-react';

type DemoKey = string;

export default function HashFunctionsPage() {
  const [inputKey, setInputKey] = useState<string>('example');
  const [tableSize, setTableSize] = useState<number>(7);

  // Hash function implementations
  const divisionHash = (key: string, m: number): number => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % m;
  };

  const multiplicationHash = (key: string, m: number): number => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    const A = 0.618033988749; // Golden ratio conjugate
    return Math.floor(m * ((hash * A) % 1));
  };

  const universalHash = (key: string, m: number): number => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    const a = 31; // Random coefficient
    const b = 17; // Random coefficient
    const p = 101; // Prime number
    return ((a * hash + b) % p) % m;
  };

  const hashResults = {
    division: divisionHash(inputKey, tableSize),
    multiplication: multiplicationHash(inputKey, tableSize),
    universal: universalHash(inputKey, tableSize)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/learning-path/module-7" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Module 7
            </Link>
            <div className="flex items-center text-sm text-gray-500">
              <Target className="w-4 h-4 mr-1" />
              Lesson 2 of 4
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Key className="w-8 h-8 mr-3 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Hash Functions in Detail</h1>
          </div>
          <p className="text-lg text-gray-600">
            Deep dive into different hash function implementations and their characteristics
          </p>
        </div>

        <div className="space-y-8">
          {/* Interactive Demo */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Play className="w-7 h-7 mr-3 text-blue-600" />
              Interactive Hash Function Demo
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Input Key
                  </label>
                  <input
                    type="text"
                    value={inputKey}
                    onChange={(e) => setInputKey(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter a key to hash"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Table Size (m)
                  </label>
                  <input
                    type="number"
                    value={tableSize}
                    onChange={(e) => setTableSize(parseInt(e.target.value) || 7)}
                    min="1"
                    max="20"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Hash Results</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-orange-100 rounded-lg">
                    <span className="font-medium text-orange-900">Division Method:</span>
                    <span className="font-bold text-orange-700">Index {hashResults.division}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-100 rounded-lg">
                    <span className="font-medium text-green-900">Multiplication Method:</span>
                    <span className="font-bold text-green-700">Index {hashResults.multiplication}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-100 rounded-lg">
                    <span className="font-medium text-purple-900">Universal Hashing:</span>
                    <span className="font-bold text-purple-700">Index {hashResults.universal}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Division Method Details */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Calculator className="w-7 h-7 mr-3 text-orange-600" />
              Division Method
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4">
                  <code className="text-green-400 font-mono">
                    h(k) = k mod m
                  </code>
                </div>
                
                <p className="text-gray-700">
                  The division method is the simplest hash function. It takes the key value and returns the remainder when divided by the table size.
                </p>
                
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h3 className="font-semibold text-orange-900 mb-2">Implementation Steps:</h3>
                  <ol className="space-y-1 text-orange-800 text-sm list-decimal list-inside">
                    <li>Convert string key to numeric value (sum of ASCII values)</li>
                    <li>Apply modulo operation with table size</li>
                    <li>Result is the hash table index</li>
                  </ol>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Advantages</h4>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• Very fast computation</li>
                      <li>• Simple to understand</li>
                      <li>• Memory efficient</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-red-900 mb-2">Disadvantages</h4>
                    <ul className="text-red-700 text-sm space-y-1">
                      <li>• Poor distribution for certain patterns</li>
                      <li>• Sensitive to table size choice</li>
                      <li>• Clustering with sequential keys</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-center">Best Practices</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border">
                    <h4 className="font-semibold text-gray-900 mb-2">Choose Prime Table Sizes</h4>
                    <p className="text-gray-600 text-sm">Prime numbers help distribute keys more evenly and reduce clustering.</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border">
                    <h4 className="font-semibold text-gray-900 mb-2">Avoid Powers of 2</h4>
                    <p className="text-gray-600 text-sm">Powers of 2 can lead to poor distribution for certain key patterns.</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border">
                    <h4 className="font-semibold text-gray-900 mb-2">Consider Key Distribution</h4>
                    <p className="text-gray-600 text-sm">Analyze your key patterns to choose appropriate table sizes.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Multiplication Method Details */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Zap className="w-7 h-7 mr-3 text-green-600" />
              Multiplication Method
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4">
                  <code className="text-green-400 font-mono text-sm">
                    h(k) = ⌊m(kA mod 1)⌋<br/>
                    where A ≈ 0.618 (golden ratio)
                  </code>
                </div>
                
                <p className="text-gray-700">
                  The multiplication method multiplies the key by a constant A (0 &lt; A &lt; 1), extracts the fractional part, and multiplies by the table size.
                </p>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-900 mb-2">Key Features:</h3>
                  <ul className="space-y-1 text-green-800 text-sm">
                    <li>• Uses the golden ratio (φ - 1 ≈ 0.618) for optimal distribution</li>
                    <li>• Less sensitive to table size choice</li>
                    <li>• Good performance with many key patterns</li>
                    <li>• Fractional part provides randomization</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-center">Step-by-Step Example</h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-white p-3 rounded border">
                    <strong>Step 1:</strong> k = 123, A = 0.618
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <strong>Step 2:</strong> k × A = 123 × 0.618 = 76.014
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <strong>Step 3:</strong> Fractional part = 0.014
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <strong>Step 4:</strong> m × 0.014 = 7 × 0.014 = 0.098
                  </div>
                  <div className="bg-green-100 p-3 rounded border border-green-300">
                    <strong>Result:</strong> ⌊0.098⌋ = 0
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Universal Hashing */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Hash className="w-7 h-7 mr-3 text-purple-600" />
              Universal Hashing
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4">
                  <code className="text-green-400 font-mono text-sm">
                    h(k) = ((ak + b) mod p) mod m<br/>
                    where a, b are random, p is prime
                  </code>
                </div>
                
                <p className="text-gray-700">
                  Universal hashing uses a family of hash functions with random coefficients, providing theoretical guarantees against worst-case behavior.
                </p>
                
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h3 className="font-semibold text-purple-900 mb-2">Theoretical Guarantees:</h3>
                  <ul className="space-y-1 text-purple-800 text-sm">
                    <li>• For any two keys x ≠ y: Pr[h(x) = h(y)] ≤ 1/m</li>
                    <li>• Expected collisions are minimized</li>
                    <li>• Resilient against adversarial input patterns</li>
                    <li>• Performance guarantees regardless of key distribution</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-center">Implementation Details</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border">
                    <h4 className="font-semibold text-gray-900 mb-2">Random Selection</h4>
                    <p className="text-gray-600 text-sm">Choose random values for a and b at hash table creation time.</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border">
                    <h4 className="font-semibold text-gray-900 mb-2">Prime Choice</h4>
                    <p className="text-gray-600 text-sm">Select prime p larger than the universe of possible keys.</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border">
                    <h4 className="font-semibold text-gray-900 mb-2">Collision Handling</h4>
                    <p className="text-gray-600 text-sm">Even with collisions, expected performance remains optimal.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Method Comparison</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-blue-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Method</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Computation</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Distribution</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Best Use Case</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-blue-100">
                    <td className="py-4 px-4 font-medium text-orange-600">Division</td>
                    <td className="py-4 px-4 text-gray-700">Fastest</td>
                    <td className="py-4 px-4 text-gray-700">Variable</td>
                    <td className="py-4 px-4 text-gray-700">Simple applications with prime table sizes</td>
                  </tr>
                  <tr className="border-b border-blue-100">
                    <td className="py-4 px-4 font-medium text-green-600">Multiplication</td>
                    <td className="py-4 px-4 text-gray-700">Medium</td>
                    <td className="py-4 px-4 text-gray-700">Good</td>
                    <td className="py-4 px-4 text-gray-700">General purpose with flexible table sizes</td>
                  </tr>
                  <tr className="border-b border-blue-100">
                    <td className="py-4 px-4 font-medium text-purple-600">Universal</td>
                    <td className="py-4 px-4 text-gray-700">Slowest</td>
                    <td className="py-4 px-4 text-gray-700">Guaranteed</td>
                    <td className="py-4 px-4 text-gray-700">Security-critical or adversarial environments</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-200">
          <Link 
            href="/learning-path/module-7/fundamentals" 
            className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Previous: Fundamentals
          </Link>
          <Link 
            href="/learning-path/module-7/collision-resolution" 
            className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Next: Collision Resolution
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}