'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, ArrowRight, ArrowLeft, Link as LinkIcon, Grid, Target, Zap } from 'lucide-react';

type CollisionMethod = 'chaining' | 'linear' | 'quadratic' | 'double';

export default function CollisionResolutionPage() {
  const [activeMethod, setActiveMethod] = useState<CollisionMethod>('chaining');
  const [insertKey, setInsertKey] = useState<string>('apple');

  // Simulated hash table data for different methods
  const hashTableData = {
    chaining: [
      { index: 0, values: [] },
      { index: 1, values: ['banana'] },
      { index: 2, values: ['apple', 'cherry'] }, // collision example
      { index: 3, values: [] },
      { index: 4, values: ['date'] },
      { index: 5, values: [] },
      { index: 6, values: ['elderberry'] }
    ],
    linear: [
      { index: 0, value: null },
      { index: 1, value: 'banana' },
      { index: 2, value: 'apple' },
      { index: 3, value: 'cherry' }, // moved due to collision
      { index: 4, value: 'date' },
      { index: 5, value: null },
      { index: 6, value: 'elderberry' }
    ],
    quadratic: [
      { index: 0, value: null },
      { index: 1, value: 'banana' },
      { index: 2, value: 'apple' },
      { index: 3, value: null },
      { index: 4, value: 'date' },
      { index: 5, value: 'cherry' }, // moved due to quadratic probing
      { index: 6, value: 'elderberry' }
    ],
    double: [
      { index: 0, value: null },
      { index: 1, value: 'banana' },
      { index: 2, value: 'apple' },
      { index: 3, value: null },
      { index: 4, value: 'cherry' }, // moved due to double hashing
      { index: 5, value: 'date' },
      { index: 6, value: 'elderberry' }
    ]
  };

  const methods = {
    chaining: {
      name: 'Separate Chaining',
      description: 'Each slot contains a linked list of all elements that hash to that slot',
      complexity: 'Average: O(1 + α), Worst: O(n)',
      pros: ['Simple implementation', 'Never fills up', 'Good performance with good hash function'],
      cons: ['Extra memory for pointers', 'Cache performance issues', 'Uneven memory access']
    },
    linear: {
      name: 'Linear Probing',
      description: 'On collision, search sequentially for the next empty slot',
      complexity: 'Average: O(1), Worst: O(n) with clustering',
      pros: ['Good cache performance', 'No extra memory', 'Simple implementation'],
      cons: ['Primary clustering', 'Performance degrades with high load', 'Deletion complex']
    },
    quadratic: {
      name: 'Quadratic Probing',
      description: 'On collision, probe at quadratic intervals: h(k) + 1², h(k) + 2², etc.',
      complexity: 'Average: O(1), Better than linear probing',
      pros: ['Reduces primary clustering', 'Better than linear probing', 'Good cache locality'],
      cons: ['Secondary clustering', 'May not find empty slot', 'Complex deletion']
    },
    double: {
      name: 'Double Hashing',
      description: 'Use a second hash function to determine probe sequence',
      complexity: 'Average: O(1), Best open addressing method',
      pros: ['Eliminates clustering', 'Uniform probe distribution', 'Best open addressing method'],
      cons: ['Requires two hash functions', 'More complex', 'Potential infinite loops']
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
              <Target className="w-4 h-4 mr-1" />
              Lesson 3 of 4
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-8 h-8 mr-3 text-red-600" />
            <h1 className="text-3xl font-bold text-gray-900">Collision Resolution</h1>
          </div>
          <p className="text-lg text-gray-600">
            Strategies for handling when different keys hash to the same index
          </p>
        </div>

        <div className="space-y-8">
          {/* What are Collisions */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <AlertTriangle className="w-7 h-7 mr-3 text-red-600" />
              Understanding Collisions
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-gray-700">
                  A collision occurs when two different keys produce the same hash value. Even with perfect hash functions, collisions are inevitable due to the pigeonhole principle.
                </p>
                
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h3 className="font-semibold text-red-900 mb-2">Why Collisions Happen:</h3>
                  <ul className="space-y-1 text-red-800 text-sm">
                    <li>• <strong>Pigeonhole Principle:</strong> More keys than table slots</li>
                    <li>• <strong>Birthday Paradox:</strong> Collisions likely with just √n keys</li>
                    <li>• <strong>Hash Function Limits:</strong> Finite output range</li>
                    <li>• <strong>Key Patterns:</strong> Similar keys may cluster</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h3 className="font-semibold text-yellow-900 mb-2">Load Factor (α):</h3>
                  <p className="text-yellow-800 text-sm mb-2">
                    α = n/m (elements/table size)
                  </p>
                  <ul className="space-y-1 text-yellow-800 text-sm">
                    <li>• α &lt; 0.7: Good performance</li>
                    <li>• α &gt; 0.8: Performance degrades</li>
                    <li>• α = 1.0: Table full (open addressing)</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-center">Collision Example</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border">
                    <div className="text-sm text-gray-600 mb-2">Keys and their hash values:</div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>"apple"</span>
                        <span className="font-mono text-red-600">h("apple") = 2</span>
                      </div>
                      <div className="flex justify-between">
                        <span>"cherry"</span>
                        <span className="font-mono text-red-600">h("cherry") = 2</span>
                      </div>
                    </div>
                    <div className="mt-3 p-2 bg-red-100 rounded text-red-800 text-sm text-center">
                      ⚠️ Collision at index 2!
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border">
                    <div className="text-sm text-gray-600 mb-2">Hash table state:</div>
                    <svg width="200" height="180" viewBox="0 0 200 180" className="mx-auto">
                      {[0, 1, 2, 3, 4, 5, 6].map((index) => (
                        <g key={index}>
                          <rect
                            x="20"
                            y={20 + index * 20}
                            width="30"
                            height="18"
                            fill={index === 2 ? "#fecaca" : "#f3f4f6"}
                            stroke={index === 2 ? "#dc2626" : "#9ca3af"}
                            strokeWidth="1"
                          />
                          <text
                            x="35"
                            y={32 + index * 20}
                            textAnchor="middle"
                            fontSize="10"
                            fill="#374151"
                          >
                            {index}
                          </text>
                          
                          {index === 2 && (
                            <>
                              <rect x="60" y={20 + index * 20} width="50" height="18" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
                              <text x="85" y={32 + index * 20} textAnchor="middle" fontSize="8" fill="#92400e">CONFLICT!</text>
                            </>
                          )}
                        </g>
                      ))}
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Method Comparison */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Grid className="w-7 h-7 mr-3 text-purple-600" />
              Collision Resolution Methods
            </h2>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {Object.entries(methods).map(([key, method]) => (
                <button
                  key={key}
                  onClick={() => setActiveMethod(key as CollisionMethod)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeMethod === key
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {method.name}
                </button>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {methods[activeMethod].name}
                </h3>
                
                <p className="text-gray-700">
                  {methods[activeMethod].description}
                </p>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Time Complexity:</h4>
                  <p className="text-blue-800 text-sm font-mono">
                    {methods[activeMethod].complexity}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Advantages</h4>
                    <ul className="text-green-700 space-y-1">
                      {methods[activeMethod].pros.map((pro, index) => (
                        <li key={index}>• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-red-900 mb-2">Disadvantages</h4>
                    <ul className="text-red-700 space-y-1">
                      {methods[activeMethod].cons.map((con, index) => (
                        <li key={index}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-center">Visual Representation</h3>
                {activeMethod === 'chaining' ? (
                  <div className="space-y-2">
                    {hashTableData.chaining.map((slot) => (
                      <div key={slot.index} className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gray-200 border border-gray-400 flex items-center justify-center text-sm">
                          {slot.index}
                        </div>
                        <div className="flex space-x-1">
                          {slot.values.length === 0 ? (
                            <div className="w-16 h-6 bg-gray-100 border border-gray-300 flex items-center justify-center text-xs text-gray-500">
                              null
                            </div>
                          ) : (
                            slot.values.map((value, i) => (
                              <div key={i} className="flex items-center">
                                <div className="px-2 py-1 bg-blue-100 border border-blue-300 text-xs">
                                  {value}
                                </div>
                                {i < slot.values.length - 1 && (
                                  <ArrowRight className="w-3 h-3 text-gray-400 mx-1" />
                                )}
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {hashTableData[activeMethod].map((slot) => (
                      <div key={slot.index} className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gray-200 border border-gray-400 flex items-center justify-center text-sm">
                          {slot.index}
                        </div>
                        <div className={`px-3 py-1 border text-sm ${
                          slot.value
                            ? 'bg-blue-100 border-blue-300 text-blue-800'
                            : 'bg-gray-100 border-gray-300 text-gray-500'
                        }`}>
                          {slot.value || 'null'}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Detailed Method Explanations */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Separate Chaining */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <LinkIcon className="w-6 h-6 mr-2 text-blue-600" />
                Separate Chaining
              </h3>
              
              <div className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-3">
                  <code className="text-green-400 font-mono text-sm">
                    // Insertion<br/>
                    table[h(key)].add(key, value)
                  </code>
                </div>
                
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Best When:</h4>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>• Memory is not a primary concern</li>
                    <li>• High load factors expected</li>
                    <li>• Frequent insertions/deletions</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Open Addressing */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Zap className="w-6 h-6 mr-2 text-orange-600" />
                Open Addressing
              </h3>
              
              <div className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-3">
                  <code className="text-green-400 font-mono text-sm">
                    // Linear: h(k, i) = (h(k) + i) % m<br/>
                    // Quadratic: h(k, i) = (h(k) + i²) % m<br/>
                    // Double: h(k, i) = (h₁(k) + i×h₂(k)) % m
                  </code>
                </div>
                
                <div className="bg-orange-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-2">Best When:</h4>
                  <ul className="text-orange-800 text-sm space-y-1">
                    <li>• Memory efficiency is critical</li>
                    <li>• Cache performance matters</li>
                    <li>• Load factor &lt; 0.7</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Comparison */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Performance Comparison</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-purple-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Method</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Search</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Insert</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Delete</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Space</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-purple-100">
                    <td className="py-4 px-4 font-medium text-blue-600">Chaining</td>
                    <td className="py-4 px-4 text-gray-700">O(1 + α)</td>
                    <td className="py-4 px-4 text-gray-700">O(1)</td>
                    <td className="py-4 px-4 text-gray-700">O(1 + α)</td>
                    <td className="py-4 px-4 text-gray-700">Higher</td>
                  </tr>
                  <tr className="border-b border-purple-100">
                    <td className="py-4 px-4 font-medium text-orange-600">Linear Probing</td>
                    <td className="py-4 px-4 text-gray-700">O(1)</td>
                    <td className="py-4 px-4 text-gray-700">O(1)</td>
                    <td className="py-4 px-4 text-gray-700">O(1)*</td>
                    <td className="py-4 px-4 text-gray-700">Lower</td>
                  </tr>
                  <tr className="border-b border-purple-100">
                    <td className="py-4 px-4 font-medium text-green-600">Quadratic Probing</td>
                    <td className="py-4 px-4 text-gray-700">O(1)</td>
                    <td className="py-4 px-4 text-gray-700">O(1)</td>
                    <td className="py-4 px-4 text-gray-700">O(1)*</td>
                    <td className="py-4 px-4 text-gray-700">Lower</td>
                  </tr>
                  <tr className="border-b border-purple-100">
                    <td className="py-4 px-4 font-medium text-purple-600">Double Hashing</td>
                    <td className="py-4 px-4 text-gray-700">O(1)</td>
                    <td className="py-4 px-4 text-gray-700">O(1)</td>
                    <td className="py-4 px-4 text-gray-700">O(1)*</td>
                    <td className="py-4 px-4 text-gray-700">Lower</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-sm text-gray-600 mt-2">* Requires lazy deletion for open addressing</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-200">
          <Link 
            href="/learning-path/module-7/hash-functions" 
            className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Previous: Hash Functions
          </Link>
          <Link 
            href="/learning-path/module-7/applications" 
            className="flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Next: Applications
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}