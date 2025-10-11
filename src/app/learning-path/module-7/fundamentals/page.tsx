'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Hash, Key, ArrowRight, Play, ArrowLeft, Target, Clock, Zap } from 'lucide-react';

type HashFunction = 'division' | 'multiplication' | 'universal';

export default function HashTableFundamentalsPage() {
  const [activeFunction, setActiveFunction] = useState<HashFunction>('division');

  const hashFunctions = {
    division: {
      name: 'Division Method',
      formula: 'h(k) = k mod m',
      description: 'Simple modular arithmetic approach',
      example: 'h(123) = 123 mod 7 = 4',
      pros: ['Simple to compute', 'Fast execution'],
      cons: ['Poor performance with certain patterns', 'Requires careful choice of m']
    },
    multiplication: {
      name: 'Multiplication Method',
      formula: 'h(k) = ⌊m(kA mod 1)⌋',
      description: 'Uses fractional part of k*A',
      example: 'A=0.618, h(123) = ⌊7(123*0.618 mod 1)⌋ = 2',
      pros: ['Good distribution', 'Less sensitive to m'],
      cons: ['More complex computation', 'Floating point precision issues']
    },
    universal: {
      name: 'Universal Hashing',
      formula: 'h(k) = ((ak + b) mod p) mod m',
      description: 'Family of hash functions with randomization',
      example: 'a=3, b=7, p=11: h(123) = ((3*123 + 7) mod 11) mod 7 = 3',
      pros: ['Theoretical guarantees', 'Handles adversarial inputs'],
      cons: ['More complex', 'Additional randomization needed']
    }
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
              <Clock className="w-4 h-4 mr-1" />
              40 minutes
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Hash className="w-8 h-8 mr-3 text-orange-600" />
            <h1 className="text-3xl font-bold text-gray-900">Hash Table Fundamentals</h1>
          </div>
          <p className="text-lg text-gray-600">
            Understanding the core concepts behind lightning-fast data structures
          </p>
        </div>

        <div className="space-y-8">
          {/* Basic Concepts */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Target className="w-7 h-7 mr-3 text-orange-600" />
              What is a Hash Table?
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-gray-700">
                  A hash table is a data structure that implements an associative array, mapping keys to values using a hash function to compute an index into an array of buckets or slots.
                </p>
                
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h3 className="font-semibold text-orange-900 mb-2">Key Properties:</h3>
                  <ul className="space-y-2 text-orange-800 text-sm">
                    <li>• <strong>Average O(1) access time</strong> - Constant time operations</li>
                    <li>• <strong>Direct indexing</strong> - No sequential searching needed</li>
                    <li>• <strong>Dynamic sizing</strong> - Can grow and shrink as needed</li>
                    <li>• <strong>Key-value mapping</strong> - Associates unique keys with values</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-center">Hash Table Structure</h3>
                <svg width="320" height="280" viewBox="0 0 320 280" className="mx-auto">
                  {/* Array representation */}
                  {[0, 1, 2, 3, 4, 5, 6].map((index) => (
                    <g key={index}>
                      <rect
                        x="20"
                        y={40 + index * 30}
                        width="60"
                        height="25"
                        fill="#f3f4f6"
                        stroke="#9ca3af"
                        strokeWidth="1"
                      />
                      <text
                        x="50"
                        y={55 + index * 30}
                        textAnchor="middle"
                        fontSize="12"
                        fill="#374151"
                      >
                        [{index}]
                      </text>
                      
                      {/* Sample data */}
                      {index === 1 && (
                        <>
                          <rect x="90" y={40 + index * 30} width="80" height="25" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
                          <text x="130" y={55 + index * 30} textAnchor="middle" fontSize="10" fill="#92400e">"name": "Alice"</text>
                        </>
                      )}
                      {index === 3 && (
                        <>
                          <rect x="90" y={40 + index * 30} width="80" height="25" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
                          <text x="130" y={55 + index * 30} textAnchor="middle" fontSize="10" fill="#15803d">"age": 25</text>
                        </>
                      )}
                      {index === 5 && (
                        <>
                          <rect x="90" y={40 + index * 30} width="80" height="25" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
                          <text x="130" y={55 + index * 30} textAnchor="middle" fontSize="10" fill="#1d4ed8">"city": "NYC"</text>
                        </>
                      )}
                    </g>
                  ))}
                  
                  {/* Hash function illustration */}
                  <text x="200" y="30" fontSize="14" fontWeight="bold" fill="#374151">Hash Function</text>
                  <text x="200" y="50" fontSize="12" fill="#6b7280">h("name") → 1</text>
                  <text x="200" y="70" fontSize="12" fill="#6b7280">h("age") → 3</text>
                  <text x="200" y="90" fontSize="12" fill="#6b7280">h("city") → 5</text>
                  
                  <path d="M200 100 L90 70" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <path d="M200 110 L90 130" stroke="#16a34a" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <path d="M200 120 L90 190" stroke="#2563eb" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                    </marker>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          {/* Hash Functions */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Key className="w-7 h-7 mr-3 text-orange-600" />
              Hash Functions
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex space-x-2 mb-4">
                  {Object.entries(hashFunctions).map(([key, func]) => (
                    <button
                      key={key}
                      onClick={() => setActiveFunction(key as HashFunction)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeFunction === key
                          ? 'bg-orange-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {func.name.split(' ')[0]}
                    </button>
                  ))}
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {hashFunctions[activeFunction].name}
                  </h3>
                  <p className="text-gray-700 text-sm mb-3">
                    {hashFunctions[activeFunction].description}
                  </p>
                  
                  <div className="bg-gray-900 rounded-lg p-3 mb-3">
                    <code className="text-green-400 font-mono text-sm">
                      {hashFunctions[activeFunction].formula}
                    </code>
                  </div>
                  
                  <div className="text-sm mb-3">
                    <strong>Example:</strong> {hashFunctions[activeFunction].example}
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong className="text-green-700">Pros:</strong>
                      <ul className="text-green-600 ml-4">
                        {hashFunctions[activeFunction].pros.map((pro, index) => (
                          <li key={index}>• {pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <strong className="text-red-700">Cons:</strong>
                      <ul className="text-red-600 ml-4">
                        {hashFunctions[activeFunction].cons.map((con, index) => (
                          <li key={index}>• {con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-center">Good Hash Function Properties</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Zap className="w-5 h-5 text-orange-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Deterministic</h4>
                      <p className="text-gray-600 text-sm">Same key always produces same hash value</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Zap className="w-5 h-5 text-orange-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Uniform Distribution</h4>
                      <p className="text-gray-600 text-sm">Keys spread evenly across hash table</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Zap className="w-5 h-5 text-orange-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Fast Computation</h4>
                      <p className="text-gray-600 text-sm">Efficient to calculate in constant time</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Zap className="w-5 h-5 text-orange-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Avalanche Effect</h4>
                      <p className="text-gray-600 text-sm">Small key changes produce large hash changes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Analysis */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Performance Analysis</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-orange-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Operation</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Average Case</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Worst Case</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Best Case</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-orange-100">
                    <td className="py-4 px-4 font-medium text-orange-600">Search</td>
                    <td className="py-4 px-4 text-gray-700">O(1)</td>
                    <td className="py-4 px-4 text-gray-700">O(n)</td>
                    <td className="py-4 px-4 text-gray-700">O(1)</td>
                  </tr>
                  <tr className="border-b border-orange-100">
                    <td className="py-4 px-4 font-medium text-orange-600">Insert</td>
                    <td className="py-4 px-4 text-gray-700">O(1)</td>
                    <td className="py-4 px-4 text-gray-700">O(n)</td>
                    <td className="py-4 px-4 text-gray-700">O(1)</td>
                  </tr>
                  <tr className="border-b border-orange-100">
                    <td className="py-4 px-4 font-medium text-orange-600">Delete</td>
                    <td className="py-4 px-4 text-gray-700">O(1)</td>
                    <td className="py-4 px-4 text-gray-700">O(n)</td>
                    <td className="py-4 px-4 text-gray-700">O(1)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-200">
          <Link 
            href="/learning-path/module-7" 
            className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Module Overview
          </Link>
          <Link 
            href="/learning-path/module-7/hash-functions" 
            className="flex items-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
          >
            Next: Hash Functions
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}