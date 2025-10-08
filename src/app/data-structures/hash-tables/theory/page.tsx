"use client";
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  SkipForward, 
  Hash, 
  Zap,
  Search,
  Plus,
  Minus,
  Database,
  Key,
  Lock,
  RotateCcw,
  Layers,
  Target,
  AlertTriangle,
  TrendingUp
} from 'lucide-react';

const HashTableTheoryPage: React.FC = () => {
  // Simple hash function demonstration
  const simpleHash = (key: string, tableSize: number) => {
    let sum = 0;
    for (let i = 0; i < key.length; i++) {
      sum += key.charCodeAt(i);
    }
    return sum % tableSize;
  };

  const HashFunctionDemo: React.FC = () => {
    const keys = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];
    const tableSize = 7;
    
    return (
      <div className="bg-gray-50 rounded-lg p-6 border text-gray-700">
        <h4 className="text-lg font-semibold text-center mb-4 text-gray-800">
          Hash Function Demo: sum(ASCII) % {tableSize}
        </h4>
        <div className="space-y-3 text-gray-700">
          {keys.map((key, index) => {
            const ascii = key.split('').map(c => c.charCodeAt(0));
            const sum = ascii.reduce((a, b) => a + b, 0);
            const hash = sum % tableSize;
            
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-3 rounded border text-gray-700"
              >
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="font-semibold text-gray-700">{key}</span>
                  <span className="text-gray-500">
                    {ascii.join('+')} = {sum}
                  </span>
                  <span className="text-gray-500">
                    {sum} % {tableSize} = {hash}
                  </span>
                  <span className="bg-pink-500 text-white px-3 py-1 rounded font-bold text-gray-800">
                    {hash}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };

  const CollisionDemo: React.FC = () => {
    const tableSize = 5;
    const keys = ['Cat', 'Dog', 'Rat', 'Owl'];
    const buckets: string[][] = Array(tableSize).fill(null).map(() => []);
    
    keys.forEach(key => {
      const hash = simpleHash(key, tableSize);
      buckets[hash].push(key);
    });
    
    return (
      <div className="bg-gray-50 rounded-lg p-6 border text-gray-700">
        <h4 className="text-lg font-semibold text-center mb-4 text-gray-800">
          Collision Resolution: Chaining
        </h4>
        <div className="space-y-2 text-gray-700">
          {buckets.map((bucket, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center text-gray-700"
            >
              <div className="w-12 h-12 bg-pink-500 text-black rounded-lg flex items-center justify-center font-bold mr-4 text-gray-800">
                {index}
              </div>
              <div className="flex-1 min-h-12 bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center px-4 text-gray-700">
                {bucket.length > 0 ? (
                  <div className="flex items-center space-x-2 text-gray-700">
                    {bucket.map((key, keyIndex) => (
                      <React.Fragment key={keyIndex}>
                        <div className="bg-pink-200 text-pink-800 px-3 py-1 rounded font-semibold text-sm">
                          {key}
                        </div>
                        {keyIndex < bucket.length - 1 && (
                          <span className="text-gray-400">→</span>
                        )}
                      </React.Fragment>
                    ))}
                    {bucket.length > 1 && (
                      <span className="text-red-600 text-sm font-medium ml-2">
                        ← Collision!
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm">Empty</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 text-gray-700">
      <div className="container mx-auto px-4 py-12 text-gray-700">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-gray-700"
        >
          <Link href="/data-structures/hash-tables" className="inline-flex items-center text-pink-600 hover:text-pink-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2 text-gray-700" />
            Back to Hash Tables Overview
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Hash Table Theory</h1>
          <p className="text-xl text-gray-600 max-w-4xl leading-relaxed">
            Master hash table concepts, hash functions, collision resolution strategies, and 
            performance characteristics. Learn how to design efficient hash-based data structures.
          </p>
        </motion.div>

        <div className="space-y-12 text-gray-700">
          {/* Introduction */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-white rounded-lg shadow-lg p-8 text-gray-700"
          >
            <div className="flex items-center mb-6 text-gray-700">
              <Hash className="h-8 w-8 text-pink-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">What are Hash Tables?</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 text-gray-700">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-pink-700">Definition</h3>
                <div className="space-y-4 text-gray-700">
                  <p>
                    A <strong>hash table</strong> (or hash map) is a data structure that implements an 
                    associative array abstract data type, mapping keys to values using a hash function.
                  </p>
                  
                  <div className="bg-pink-50 p-4 rounded-lg border border-pink-200 text-gray-700">
                    <h4 className="font-semibold text-pink-800 mb-2">Key Components:</h4>
                    <ul className="list-disc pl-4 text-sm space-y-1 text-gray-600">
                      <li><strong>Hash Function:</strong> Maps keys to array indices</li>
                      <li><strong>Buckets:</strong> Array slots to store key-value pairs</li>
                      <li><strong>Collision Resolution:</strong> Handle multiple keys mapping to same index</li>
                      <li><strong>Load Factor:</strong> Ratio of stored elements to table size</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg text-gray-700">
                    <h4 className="font-semibold text-green-800 mb-2">Key Advantages:</h4>
                    <ul className="list-disc pl-4 text-sm space-y-1 text-gray-600">
                      <li>Average O(1) time complexity for operations</li>
                      <li>Efficient key-value storage and retrieval</li>
                      <li>Dynamic sizing capabilities</li>
                      <li>Flexible key types (strings, numbers, objects)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-pink-700">How It Works</h3>
                <div className="space-y-4 text-gray-700">
                  <div className="bg-white border border-gray-200 rounded-lg p-4 text-gray-700">
                    <h4 className="font-semibold text-gray-800 mb-3">Basic Process:</h4>
                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-center space-x-3 text-gray-700">
                        <div className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold text-xs text-gray-600">
                          1
                        </div>
                        <div>
                          <strong>Hash Function:</strong> Convert key to array index
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-700">
                        <div className="w-8 h-8 bg-pink-500 text-black rounded-full flex items-center justify-center font-bold text-xs text-gray-600">
                          2
                        </div>
                        <div>
                          <strong>Store/Retrieve:</strong> Access bucket at computed index
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-700">
                        <div className="w-8 h-8 bg-pink-500 text-black rounded-full flex items-center justify-center font-bold text-xs text-gray-600">
                          3
                        </div>
                        <div>
                          <strong>Handle Collisions:</strong> Resolve conflicts if multiple keys hash to same index
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg text-gray-700">
                    <h4 className="font-semibold text-gray-800 mb-2">Example Operation:</h4>
                    <div className="font-mono text-sm space-y-1 text-gray-600">
                      <div><strong>Insert:</strong> put(&quot;John&quot;, 25)</div>
                      <div className="text-gray-600">→ hash(&quot;John&quot;) = 3</div>
                      <div className="text-gray-600">→ table[3] = (&quot;John&quot;, 25)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Hash Functions */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-8 text-gray-700"
          >
            <div className="flex items-center mb-6 text-gray-700">
              <Key className="h-8 w-8 text-pink-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Hash Functions</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8 text-gray-700">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-pink-700">Properties of Good Hash Functions</h3>
                <div className="space-y-4 text-gray-700">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-white">
                    <h4 className="font-semibold text-blue-800 mb-2">Deterministic</h4>
                    <p className="text-sm text-gray-700">
                      Same key always produces same hash value
                    </p>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-gray-700">
                    <h4 className="font-semibold text-green-800 mb-2">Uniform Distribution</h4>
                    <p className="text-sm text-gray-700">
                      Spreads keys evenly across hash table
                    </p>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-gray-700">
                    <h4 className="font-semibold text-yellow-800 mb-2">Fast Computation</h4>
                    <p className="text-sm text-gray-700">
                      Quick to calculate to maintain O(1) performance
                    </p>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 text-gray-700">
                    <h4 className="font-semibold text-purple-800 mb-2">Low Collision Rate</h4>
                    <p className="text-sm text-gray-700">
                      Minimizes keys mapping to same index
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <HashFunctionDemo />
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-gray-700">
              <div className="bg-gray-50 p-4 rounded-lg text-gray-700">
                <h4 className="font-semibold text-gray-800 mb-3">Division Method</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="font-mono bg-gray-100 p-2 rounded text-gray-700">h(k) = k mod m</div>
                  <p className="text-gray-600">Simple and fast. Choose m as prime number.</p>
                  <div className="text-xs text-gray-500">
                    <strong>Example:</strong> h(15) = 15 mod 7 = 1
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg text-gray-700">
                <h4 className="font-semibold text-gray-800 mb-3">Multiplication Method</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="font-mono bg-gray-100 p-2 rounded text-xs text-gray-600">h(k) = ⌊m(kA mod 1)⌋</div>
                  <p className="text-gray-600">Works well with any table size. A ≈ 0.618 (golden ratio).</p>
                  <div className="text-xs text-gray-500">
                    <strong>Better distribution</strong> than division
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg text-gray-700">
                <h4 className="font-semibold text-gray-800 mb-3">Universal Hashing</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="font-mono bg-gray-100 p-2 rounded text-xs text-gray-600">h(k) = ((ak + b) mod p) mod m</div>
                  <p className="text-gray-600">Randomly choose a, b. Provides theoretical guarantees.</p>
                  <div className="text-xs text-gray-500">
                    <strong>Worst-case</strong> collision probability
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg text-gray-700">
                <h4 className="font-semibold text-gray-800 mb-3">Cryptographic Hash</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="font-mono bg-gray-100 p-2 rounded text-xs text-gray-600">SHA-256, MD5</div>
                  <p className="text-gray-600">Strong hash functions for security applications.</p>
                  <div className="text-xs text-gray-500">
                    <strong>Slower</strong> but more secure
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Collision Resolution */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-8 text-gray-700"
          >
            <div className="flex items-center mb-6 text-gray-700">
              <AlertTriangle className="h-8 w-8 text-pink-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Collision Resolution</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8 text-gray-700">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-pink-700">Why Collisions Occur</h3>
                <div className="space-y-4 text-gray-700">
                  <p>
                    <strong>Collisions</strong> happen when different keys hash to the same index. 
                    This is inevitable when the key space is larger than the hash table size.
                  </p>
                  
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-gray-700">
                    <h4 className="font-semibold text-red-800 mb-2">Pigeonhole Principle:</h4>
                    <p className="text-sm text-gray-600">
                      If you have n keys and m buckets where n &gt; m, at least one bucket 
                      must contain more than one key.
                    </p>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg text-gray-700">
                    <h4 className="font-semibold text-orange-800 mb-2">Birthday Paradox:</h4>
                    <p className="text-sm text-gray-600">
                      With just √m random keys in a table of size m, there&apos;s a 50% chance of collision.
                      For m=365 (days), only 23 people needed for 50% birthday collision chance.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <CollisionDemo />
              </div>
            </div>

            <div className="space-y-8 text-gray-700">
              <div>
                <h3 className="text-xl font-semibold mb-6 text-pink-700">Collision Resolution Strategies</h3>
                
                <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                  {/* Chaining */}
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 text-white">
                    <h4 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                      <Layers className="h-5 w-5 mr-2 text-gray-700" />
                      Separate Chaining
                    </h4>
                    
                    <div className="space-y-3 text-sm text-gray-600">
                      <p className="text-gray-700">
                        Store multiple elements at the same index using linked lists or arrays.
                      </p>
                      
                      <div className="bg-blue-100 p-3 rounded text-white">
                        <h5 className="font-semibold text-blue-800 mb-1">Advantages:</h5>
                        <ul className="list-disc pl-4 text-xs space-y-1 text-gray-600">
                          <li>Simple implementation</li>
                          <li>Never fills up</li>
                          <li>Good for unknown dataset size</li>
                          <li>Deletion is straightforward</li>
                        </ul>
                      </div>
                      
                      <div className="bg-blue-200 p-3 rounded text-white">
                        <h5 className="font-semibold text-blue-800 mb-1">Disadvantages:</h5>
                        <ul className="list-disc pl-4 text-xs space-y-1 text-gray-600">
                          <li>Extra memory for pointers</li>
                          <li>Cache performance issues</li>
                          <li>Complexity increases with collisions</li>
                        </ul>
                      </div>

                      <div className="bg-gray-100 p-3 rounded text-gray-700">
                        <h5 className="font-semibold text-gray-800 mb-1">Implementation:</h5>
                        <div className="font-mono text-xs text-gray-600">
                          <div>table[i] → [key1,val1] → [key2,val2] → null</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Open Addressing */}
                  <div className="bg-green-50 p-6 rounded-lg border border-green-200 text-gray-700">
                    <h4 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                      <Target className="h-5 w-5 mr-2 text-gray-700" />
                      Open Addressing
                    </h4>
                    
                    <div className="space-y-3 text-sm text-gray-600">
                      <p className="text-gray-700">
                        Find another slot within the table when collision occurs using probing sequences.
                      </p>
                      
                      <div className="space-y-2 text-gray-700">
                        <div className="bg-green-100 p-3 rounded text-gray-700">
                          <h5 className="font-semibold text-green-800 mb-1">Linear Probing:</h5>
                          <div className="font-mono text-xs text-gray-600">h&apos;(k) = (h(k) + i) mod m</div>
                          <p className="text-xs text-gray-600 mt-1">Check next slot sequentially</p>
                        </div>
                        
                        <div className="bg-green-200 p-3 rounded text-gray-700">
                          <h5 className="font-semibold text-green-800 mb-1">Quadratic Probing:</h5>
                          <div className="font-mono text-xs text-gray-600">h&apos;(k) = (h(k) + i²) mod m</div>
                          <p className="text-xs text-gray-600 mt-1">Use quadratic function for probing</p>
                        </div>
                        
                        <div className="bg-green-300 p-3 rounded text-gray-700">
                          <h5 className="font-semibold text-green-800 mb-1">Double Hashing:</h5>
                          <div className="font-mono text-xs text-gray-600">h&apos;(k) = (h₁(k) + i×h₂(k)) mod m</div>
                          <p className="text-xs text-gray-600 mt-1">Use second hash function</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Load Factor and Resizing */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-8 text-gray-700"
          >
            <div className="flex items-center mb-6 text-gray-700">
              <TrendingUp className="h-8 w-8 text-pink-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Load Factor & Performance</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 text-gray-700">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-pink-700">Load Factor (α)</h3>
                <div className="space-y-4 text-gray-700">
                  <div className="bg-pink-50 p-4 rounded-lg border border-pink-200 text-gray-700">
                    <h4 className="font-semibold text-pink-800 mb-2">Definition:</h4>
                    <div className="text-center text-2xl font-mono font-bold text-pink-700 mb-2">
                      α = n / m
                    </div>
                    <div className="text-sm text-gray-700 text-center">
                      <p><strong>n</strong> = number of elements stored</p>
                      <p><strong>m</strong> = table size (number of buckets)</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg text-gray-700">
                    <h4 className="font-semibold text-gray-800 mb-3">Load Factor Guidelines:</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between items-center text-gray-700">
                        <span>α ≤ 0.5</span>
                        <span className="bg-green-500 text-black px-2 py-1 rounded text-xs text-gray-600">Excellent</span>
                      </div>
                      <div className="flex justify-between items-center text-gray-700">
                        <span>0.5 &lt; α ≤ 0.75</span>
                        <span className="bg-blue-500 text-black px-2 py-1 rounded text-xs text-gray-600">Good</span>
                      </div>
                      <div className="flex justify-between items-center text-gray-700">
                        <span>0.75 &lt; α ≤ 1.0</span>
                        <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs text-gray-600">Acceptable</span>
                      </div>
                      <div className="flex justify-between items-center text-gray-700">
                        <span>α &gt; 1.0</span>
                        <span className="bg-red-500 text-black px-2 py-1 rounded text-xs text-gray-600">Poor</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-pink-700">Dynamic Resizing</h3>
                <div className="space-y-4 text-gray-700">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-white">
                    <h4 className="font-semibold text-blue-800 mb-2">When to Resize:</h4>
                    <ul className="list-disc pl-4 text-sm space-y-1 text-gray-600">
                      <li><strong>Expand:</strong> When α &gt; 0.75</li>
                      <li><strong>Shrink:</strong> When α &lt; 0.25</li>
                      <li><strong>Common sizes:</strong> Powers of 2 or prime numbers</li>
                    </ul>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 text-gray-700">
                    <h4 className="font-semibold text-orange-800 mb-2">Resizing Process:</h4>
                    <ol className="list-decimal pl-4 text-sm space-y-1 text-gray-600">
                      <li>Create new table (usually 2× current size)</li>
                      <li>Rehash all existing elements</li>
                      <li>Insert into new table</li>
                      <li>Replace old table with new table</li>
                    </ol>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-gray-700">
                    <h4 className="font-semibold text-yellow-800 mb-2">Amortized Analysis:</h4>
                    <p className="text-sm text-gray-700">
                      Although resizing takes O(n) time, it happens infrequently. 
                      Amortized cost per operation remains O(1).
                    </p>
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
            className="bg-white rounded-lg shadow-lg p-8 text-gray-700"
          >
            <div className="flex items-center mb-6 text-gray-700">
              <Zap className="h-8 w-8 text-pink-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Performance Analysis</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 text-gray-700">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-pink-700">Time Complexity</h3>
                
                <div className="overflow-x-auto text-gray-700">
                  <table className="w-full text-left border-collapse bg-gray-50 rounded-lg text-gray-700">
                    <thead>
                      <tr className="bg-pink-100 text-gray-700">
                        <th className="border border-pink-300 px-3 py-2 font-semibold text-sm text-gray-600">Operation</th>
                        <th className="border border-pink-300 px-3 py-2 font-semibold text-sm text-gray-600">Average</th>
                        <th className="border border-pink-300 px-3 py-2 font-semibold text-sm text-gray-600">Worst</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-pink-300 px-3 py-2 text-sm text-gray-600">Search</td>
                        <td className="border border-pink-300 px-3 py-2 text-green-600 font-mono text-sm">O(1)</td>
                        <td className="border border-pink-300 px-3 py-2 text-red-600 font-mono text-sm">O(n)</td>
                      </tr>
                      <tr className="bg-gray-50 text-gray-700">
                        <td className="border border-pink-300 px-3 py-2 text-sm text-gray-600">Insert</td>
                        <td className="border border-pink-300 px-3 py-2 text-green-600 font-mono text-sm">O(1)</td>
                        <td className="border border-pink-300 px-3 py-2 text-red-600 font-mono text-sm">O(n)</td>
                      </tr>
                      <tr>
                        <td className="border border-pink-300 px-3 py-2 text-sm text-gray-600">Delete</td>
                        <td className="border border-pink-300 px-3 py-2 text-green-600 font-mono text-sm">O(1)</td>
                        <td className="border border-pink-300 px-3 py-2 text-red-600 font-mono text-sm">O(n)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 space-y-3 text-sm text-gray-600">
                  <div className="bg-green-50 p-3 rounded border border-green-200 text-gray-700">
                    <h4 className="font-semibold text-green-800 mb-1">Best Case (α ≤ 0.75):</h4>
                    <p className="text-gray-700">
                      Good hash function with low load factor gives true O(1) performance.
                    </p>
                  </div>
                  
                  <div className="bg-red-50 p-3 rounded border border-red-200 text-gray-700">
                    <h4 className="font-semibold text-red-800 mb-1">Worst Case (Poor Hash):</h4>
                    <p className="text-gray-700">
                      All keys hash to same bucket, degrading to O(n) linear search.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-pink-700">Space Complexity</h3>
                
                <div className="space-y-4 text-gray-700">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-white">
                    <h4 className="font-semibold text-blue-800 mb-2">Memory Usage:</h4>
                    <ul className="list-disc pl-4 text-sm space-y-1 text-gray-600">
                      <li><strong>Data storage:</strong> O(n) for n key-value pairs</li>
                      <li><strong>Empty slots:</strong> Additional overhead for unused buckets</li>
                      <li><strong>Pointers:</strong> Extra memory for chaining (if used)</li>
                      <li><strong>Total:</strong> Typically 1.3-2× data size</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 text-gray-700">
                    <h4 className="font-semibold text-purple-800 mb-2">Memory Efficiency:</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between text-gray-700">
                        <span>Chaining:</span>
                        <span className="font-mono text-gray-600">O(n + m)</span>
                      </div>
                      <div className="flex justify-between text-gray-700">
                        <span>Open Addressing:</span>
                        <span className="font-mono text-gray-600">O(m)</span>
                      </div>
                      <div className="text-xs text-gray-600 mt-2">
                        m = table size, n = number of elements
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-gray-700">
                    <h4 className="font-semibold text-yellow-800 mb-2">Cache Performance:</h4>
                    <p className="text-sm text-gray-700">
                      Open addressing generally provides better cache locality than chaining 
                      due to data being stored contiguously in the main table.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Implementation Details */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white rounded-lg shadow-lg p-8 text-gray-700"
          >
            <div className="flex items-center mb-6 text-gray-700">
              <Database className="h-8 w-8 text-pink-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Implementation Example</h2>
            </div>

            <div className="space-y-6 text-gray-700">
              <div className="bg-gray-900 text-gray-100 p-6 rounded-lg font-mono text-sm overflow-x-auto">
                <div className="text-green-400 mb-2">{/* Hash Table Implementation (Separate Chaining) */}</div>
                <pre>{`class HashTable {
  constructor(size = 10) {
    this.size = size;
    this.table = new Array(size).fill(null).map(() => []);
    this.count = 0;
  }
  
  // Simple hash function
  hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % this.size;
  }
  
  // Insert key-value pair
  set(key, value) {
    const index = this.hash(key);
    const bucket = this.table[index];
    
    // Check if key already exists
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value; // Update existing
        return;
      }
    }
    
    // Add new key-value pair
    bucket.push([key, value]);
    this.count++;
    
    // Resize if load factor > 0.75
    if (this.count / this.size > 0.75) {
      this.resize();
    }
  }
  
  // Get value by key
  get(key) {
    const index = this.hash(key);
    const bucket = this.table[index];
    
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return bucket[i][1];
      }
    }
    return undefined;
  }
  
  // Delete key-value pair
  delete(key) {
    const index = this.hash(key);
    const bucket = this.table[index];
    
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.count--;
        return true;
      }
    }
    return false;
  }
  
  // Resize and rehash
  resize() {
    const oldTable = this.table;
    this.size *= 2;
    this.table = new Array(this.size).fill(null).map(() => []);
    this.count = 0;
    
    // Rehash all elements
    for (let bucket of oldTable) {
      for (let [key, value] of bucket) {
        this.set(key, value);
      }
    }
  }
  
  // Get load factor
  loadFactor() {
    return this.count / this.size;
  }
}`}</pre>
              </div>

              <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                <div className="bg-pink-50 p-4 rounded-lg border border-pink-200 text-gray-700">
                  <h4 className="font-semibold text-pink-800 mb-3">Key Design Decisions:</h4>
                  <ul className="list-disc pl-4 text-sm space-y-1 text-gray-600">
                    <li><strong>Hash Function:</strong> Simple sum of ASCII values</li>
                    <li><strong>Collision Resolution:</strong> Separate chaining with arrays</li>
                    <li><strong>Load Factor Threshold:</strong> 0.75 for resizing</li>
                    <li><strong>Resize Strategy:</strong> Double the table size</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-white">
                  <h4 className="font-semibold text-blue-800 mb-3">Optimizations:</h4>
                  <ul className="list-disc pl-4 text-sm space-y-1 text-gray-600">
                    <li><strong>Better Hash:</strong> Use multiplication or universal hashing</li>
                    <li><strong>Robin Hood Hashing:</strong> Minimize variance in probe distances</li>
                    <li><strong>Cuckoo Hashing:</strong> Guarantee O(1) worst-case lookup</li>
                    <li><strong>Consistent Hashing:</strong> For distributed systems</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Real-world Applications */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="bg-white rounded-lg shadow-lg p-8 text-gray-700"
          >
            <div className="flex items-center mb-6 text-gray-700">
              <Database className="h-8 w-8 text-pink-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Real-World Applications</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-lg text-white">
                <h3 className="font-semibold text-blue-800 mb-3">Database Indexing</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Hash indexes provide fast record lookup by primary key.
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• MySQL MEMORY storage engine</li>
                  <li>• PostgreSQL hash indexes</li>
                  <li>• NoSQL key-value stores</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-lg text-gray-700">
                <h3 className="font-semibold text-green-800 mb-3">Caching Systems</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Quick access to frequently used data and memoization.
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• CPU cache lines</li>
                  <li>• Web browser caches</li>
                  <li>• Redis/Memcached</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-6 rounded-lg text-gray-700">
                <h3 className="font-semibold text-purple-800 mb-3">Language Features</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Built-in data structures in programming languages.
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Python dictionaries</li>
                  <li>• JavaScript objects/Maps</li>
                  <li>• Java HashMap</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-6 rounded-lg text-gray-700">
                <h3 className="font-semibold text-yellow-800 mb-3">Cryptography</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Security applications and data integrity verification.
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Password hashing</li>
                  <li>• Digital signatures</li>
                  <li>• Blockchain mining</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-100 to-red-200 p-6 rounded-lg text-gray-700">
                <h3 className="font-semibold text-red-800 mb-3">Distributed Systems</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Consistent hashing for load balancing and sharding.
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• CDN routing</li>
                  <li>• Database sharding</li>
                  <li>• Load balancers</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 p-6 rounded-lg text-white">
                <h3 className="font-semibold text-indigo-800 mb-3">Compilers</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Symbol tables and optimization techniques.
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Variable name lookup</li>
                  <li>• Function resolution</li>
                  <li>• String interning</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex justify-between items-center text-gray-700"
          >
            <Link
              href="/data-structures/hash-tables"
              className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2 text-gray-700" />
              Back to Overview
            </Link>
            
            <Link
              href="/data-structures/hash-tables/simulation"
              className="inline-flex items-center px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors text-gray-100"
            >
              Interactive Simulation
              <SkipForward className="h-5 w-5 ml-2 text-gray-700" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HashTableTheoryPage;
