"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, RotateCcw, Plus, Minus, Search, Code, BookOpen, Zap, Eye, PlayCircle, Target, Layers, GitBranch, Activity } from 'lucide-react';
import { useState } from 'react';

export default function LinkedListsTheoryPage() {
  const [activeDemo, setActiveDemo] = useState('singly');
  const [animationStep, setAnimationStep] = useState(0);

  // Animation control
  const startAnimation = (type: string) => {
    setActiveDemo(type);
    setAnimationStep(0);
    const interval = setInterval(() => {
      setAnimationStep(prev => {
        if (prev >= 3) {
          clearInterval(interval);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 text-white">
      <div className="container mx-auto px-4 py-12 text-gray-700">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-gray-700"
        >
          <Link href="/data-structures/linked-lists" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2 text-gray-700" />
            Back to Linked Lists Overview
          </Link>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6 text-white">
            Linked Lists: Complete Theory Guide
          </h1>
          <p className="text-xl text-slate-600 max-w-4xl leading-relaxed">
            Dive deep into linked lists - the fundamental dynamic data structures that revolutionize how we store and manipulate data. 
            From basic concepts to advanced implementations, master every aspect with interactive visualizations and comprehensive examples.
          </p>
        </motion.div>

        {/* Quick Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8 text-gray-700"
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center text-slate-800">
            <BookOpen className="h-6 w-6 text-blue-600 mr-2" />
            Complete Learning Path
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-gray-700">
            <a href="#pointers" className="flex items-center p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors border border-red-200 text-blue-600">
              <Target className="h-5 w-5 text-red-600 mr-3" />
              <span className="text-gray-800 font-medium">Pointers Fundamentals</span>
            </a>
            <a href="#introduction" className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200 text-blue-600">
              <BookOpen className="h-5 w-5 text-blue-600 mr-3" />
              <span className="text-gray-800 font-medium">Introduction & Concepts</span>
            </a>
            <a href="#types" className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors border border-green-200 text-blue-600">
              <Layers className="h-5 w-5 text-green-600 mr-3" />
              <span className="text-gray-800 font-medium">Types & Variations</span>
            </a>
            <a href="#operations" className="flex items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors border border-purple-200 text-blue-600">
              <Zap className="h-5 w-5 text-purple-600 mr-3" />
              <span className="text-gray-800 font-medium">Operations & Algorithms</span>
            </a>
          </div>
        </motion.div>

        {/* Interactive Mini Simulation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg p-6 mb-8 text-white text-white"
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center text-slate-800">
            <PlayCircle className="h-6 w-6 mr-2 text-gray-700" />
            Interactive Linked List Visualizer
          </h2>
          <p className="text-indigo-100 mb-6">
            Watch how different linked list operations work in real-time. Select a type and see the magic happen!
          </p>
          
          <div className="flex flex-wrap gap-3 mb-6 text-gray-700">
            <button 
              onClick={() => startAnimation('singly')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${activeDemo === 'singly' ? 'bg-white text-indigo-600' : 'bg-indigo-500 hover:bg-indigo-400'}`}
            >
              Singly Linked List
            </button>
            <button 
              onClick={() => startAnimation('doubly')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${activeDemo === 'doubly' ? 'bg-white text-indigo-600' : 'bg-indigo-500 hover:bg-indigo-400'}`}
            >
              Doubly Linked List
            </button>
            <button 
              onClick={() => startAnimation('circular')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${activeDemo === 'circular' ? 'bg-white text-indigo-600' : 'bg-indigo-500 hover:bg-indigo-400'}`}
            >
              Circular Linked List
            </button>
          </div>

          {/* Animation Area */}
          <div className="bg-white/10 rounded-lg p-6 min-h-24 flex items-center justify-center text-gray-700">
            {activeDemo === 'singly' && (
              <div className="flex items-center space-x-4 text-gray-700">
                {[1, 2, 3, 4].map((num, index) => (
                  <div key={num} className="flex items-center text-gray-700">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0.6 }}
                      animate={{ 
                        scale: animationStep === index ? 1.1 : 1, 
                        opacity: animationStep >= index ? 1 : 0.6,
                        backgroundColor: animationStep === index ? '#fbbf24' : '#ffffff'
                      }}
                      className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-bold shadow-lg"
                    >
                      {num}
                    </motion.div>
                    {index < 3 && (
                      <motion.div
                        initial={{ opacity: 0.3 }}
                        animate={{ opacity: animationStep > index ? 1 : 0.3 }}
                      >
                        <ArrowRight className="h-6 w-6 text-white mx-2 text-gray-700" />
                      </motion.div>
                    )}
                  </div>
                ))}
                <div className="text-black/70 ml-2 text-gray-700">→ NULL</div>
              </div>
            )}
            
            {activeDemo === 'doubly' && (
              <div className="flex items-center space-x-2 text-gray-700">
                {[1, 2, 3].map((num, index) => (
                  <div key={num} className="flex items-center text-gray-700">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0.6 }}
                      animate={{ 
                        scale: animationStep === index ? 1.1 : 1, 
                        opacity: animationStep >= index ? 1 : 0.6,
                        backgroundColor: animationStep === index ? '#fbbf24' : '#ffffff'
                      }}
                      className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-bold shadow-lg relative"
                    >
                      {num}
                    </motion.div>
                    {index < 2 && (
                      <div className="flex flex-col items-center mx-1 text-gray-700">
                        <motion.div
                          initial={{ opacity: 0.3 }}
                          animate={{ opacity: animationStep > index ? 1 : 0.3 }}
                        >
                          <ArrowRight className="h-4 w-4 text-white text-gray-700" />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0.3 }}
                          animate={{ opacity: animationStep > index ? 1 : 0.3 }}
                        >
                          <ArrowLeft className="h-4 w-4 text-white text-gray-700" />
                        </motion.div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {activeDemo === 'circular' && (
              <div className="relative text-gray-700">
                <div className="flex items-center space-x-4 text-gray-700">
                  {[1, 2, 3].map((num, index) => (
                    <motion.div
                      key={num}
                      initial={{ scale: 0.8, opacity: 0.6 }}
                      animate={{ 
                        scale: animationStep === index ? 1.1 : 1, 
                        opacity: animationStep >= index ? 1 : 0.6,
                        backgroundColor: animationStep === index ? '#fbbf24' : '#ffffff'
                      }}
                      className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-bold shadow-lg"
                    >
                      {num}
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: animationStep >= 2 ? 1 : 0.3 }}
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white flex items-center"
                >
                  <div className="w-24 h-6 border-2 border-white rounded-full border-t-transparent animate-spin text-gray-700"></div>
                  <span className="ml-2 text-sm text-gray-600">Circular</span>
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Pointers Fundamentals Section */}
        <motion.section
          id="pointers"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-8 text-gray-700"
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center text-slate-800">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center mr-3 text-gray-700">
              <Target className="h-5 w-5 text-white text-gray-700" />
            </div>
            Understanding Pointers: The Foundation
          </h2>

          <div className="space-y-8 text-gray-700">
            <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-600 text-gray-700">
              <h3 className="text-2xl font-semibold mb-4 text-red-800">What are Pointers?</h3>
              <p className="text-gray-700 mb-6 text-lg">
                Before diving into linked lists, you must understand <strong>pointers</strong> - variables that store memory addresses of other variables. 
                Think of them as directions to where actual data is stored, like an address pointing to a house.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                <div className="bg-white p-6 rounded-lg border text-gray-700">
                  <h4 className="font-semibold mb-4 text-red-700 flex items-center">
                    <Eye className="h-5 w-5 mr-2 text-gray-700" />
                    Memory Visualization
                  </h4>
                  <div className="space-y-4 text-gray-700">
                    <div className="flex items-center space-x-4 text-gray-700">
                      <div className="text-sm text-gray-600">Variable:</div>
                      <div className="bg-blue-200 px-3 py-2 rounded font-mono text-black">x = 42</div>
                      <div className="text-sm text-gray-600">@Address: 1000</div>
                    </div>
                    <div className="flex items-center space-x-4 text-gray-700">
                      <div className="text-sm text-gray-600">Pointer:</div>
                      <div className="bg-red-200 px-3 py-2 rounded font-mono text-gray-700">ptr = 1000</div>
                      <ArrowRight className="h-4 w-4 text-gray-700" />
                      <div className="bg-blue-200 px-3 py-2 rounded font-mono text-black">42</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg border text-gray-700">
                  <h4 className="font-semibold mb-4 text-red-700">Key Concepts</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start text-gray-700">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 text-gray-700"></div>
                      <span><strong>Address:</strong> Memory location where data is stored</span>
                    </li>
                    <li className="flex items-start text-gray-700">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 text-gray-700"></div>
                      <span><strong>Pointer:</strong> Variable storing an address</span>
                    </li>
                    <li className="flex items-start text-gray-700">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 text-gray-700"></div>
                      <span><strong>Dereferencing:</strong> Accessing data at pointer&apos;s address</span>
                    </li>
                    <li className="flex items-start text-gray-700">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 text-gray-700"></div>
                      <span><strong>NULL:</strong> Pointer pointing to no valid address</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4 text-red-800">Pointer Operations in Practice</h3>
              <div className="grid md:grid-cols-3 gap-6 text-gray-700">
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg border border-yellow-200 text-gray-700">
                  <h4 className="font-semibold mb-3 text-yellow-800">Declaration</h4>
                  <div className="bg-gray-900 p-3 rounded text-green-400 text-sm font-mono">
                    int* ptr;<br/>
                    Node* head;
                  </div>
                  <p className="text-sm text-gray-700 mt-2">
                    Declaring pointers to integers and Node structures
                  </p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200 text-gray-700">
                  <h4 className="font-semibold mb-3 text-orange-800">Assignment</h4>
                  <div className="bg-gray-900 p-3 rounded text-green-400 text-sm font-mono">
                    ptr = &x;<br/>
                    head = newNode;
                  </div>
                  <p className="text-sm text-gray-700 mt-2">
                    Assigning addresses to pointers
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200 text-gray-700">
                  <h4 className="font-semibold mb-3 text-green-800">Dereferencing</h4>
                  <div className="bg-gray-900 p-3 rounded text-green-400 text-sm font-mono">
                    *ptr = 100;<br/>
                    head-&gt;data = 42;
                  </div>
                  <p className="text-sm text-gray-700 mt-2">
                    Accessing and modifying data through pointers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Comprehensive Introduction Section */}
        <motion.section
          id="introduction"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-8 text-gray-700"
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center text-slate-800">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3 text-black">
              <BookOpen className="h-5 w-5 text-black text-gray-700" />
            </div>
            Introduction to Linked Lists
          </h2>

          <div className="space-y-8 text-gray-700">
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600 text-white">
              <h3 className="text-2xl font-semibold mb-4 text-blue-800">What is a Linked List?</h3>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                A <strong>linked list</strong> is a dynamic linear data structure where elements (called <em>nodes</em>) are stored in sequence, 
                but unlike arrays, they are not stored in contiguous memory locations. Each node contains two essential components:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6 text-gray-700">
                <div className="bg-white p-6 rounded-lg border text-gray-700">
                  <h4 className="font-semibold mb-3 text-blue-700 flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-gray-700" />
                    Data Component
                  </h4>
                  <p className="text-gray-700 mb-3">
                    Stores the actual information - could be integers, strings, objects, or any data type.
                  </p>
                  <div className="bg-blue-100 p-3 rounded text-white">
                    <div className="text-center font-mono text-blue-800">42</div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border text-gray-700">
                  <h4 className="font-semibold mb-3 text-blue-700 flex items-center">
                    <ArrowRight className="h-5 w-5 mr-2 text-gray-700" />
                    Pointer Component
                  </h4>
                  <p className="text-gray-700 mb-3">
                    Contains the memory address of the next node in the sequence, creating the &quot;link&quot;.
                  </p>
                  <div className="bg-green-100 p-3 rounded text-gray-700">
                    <div className="text-center font-mono text-green-800">→ Next Node</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-lg text-white text-white">
                <h4 className="font-semibold mb-3 text-white flex items-center text-gray-800">
                  <Eye className="h-5 w-5 mr-2 text-gray-700" />
                  Complete Node Structure Visualization
                </h4>
                <div className="flex items-center justify-center space-x-6 bg-white/10 p-4 rounded text-gray-700">
                  <div className="text-center text-gray-700">
                    <div className="bg-blue-400 px-4 py-3 rounded-lg font-bold text-blue-900 mb-2">Data: 10</div>
                    <div className="text-sm text-blue-100">First Node</div>
                  </div>
                  <ArrowRight className="h-8 w-8 text-white text-gray-700" />
                  <div className="text-center text-gray-700">
                    <div className="bg-purple-400 px-4 py-3 rounded-lg font-bold text-purple-900 mb-2">Data: 20</div>
                    <div className="text-sm text-purple-100">Second Node</div>
                  </div>
                  <ArrowRight className="h-8 w-8 text-white text-gray-700" />
                  <div className="text-center text-gray-700">
                    <div className="bg-green-400 px-4 py-3 rounded-lg font-bold text-green-900 mb-2">Data: 30</div>
                    <div className="text-sm text-green-100">Third Node</div>
                  </div>
                  <ArrowRight className="h-8 w-8 text-white text-gray-700" />
                  <div className="text-center text-gray-700">
                    <div className="bg-gray-400 px-4 py-3 rounded-lg font-bold text-gray-900 mb-2">NULL</div>
                    <div className="text-sm text-gray-800">End of List</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4 text-blue-800">Why Choose Linked Lists?</h3>
              <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                <div className="space-y-4 text-gray-700">
                  <h4 className="font-semibold text-green-700 flex items-center">
                    <Plus className="h-5 w-5 mr-2 text-gray-700" />
                    Advantages Over Arrays
                  </h4>
                  <div className="space-y-3 text-gray-700">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-gray-700">
                      <div className="font-medium text-green-800 mb-1">Dynamic Size</div>
                      <p className="text-sm text-gray-700">
                        Size can change during runtime - no need to declare fixed size upfront
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-gray-700">
                      <div className="font-medium text-green-800 mb-1">Efficient Insertion/Deletion</div>
                      <p className="text-sm text-gray-700">
                        O(1) insertion and deletion at the beginning, no shifting required
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-gray-700">
                      <div className="font-medium text-green-800 mb-1">Memory Efficiency</div>
                      <p className="text-sm text-gray-700">
                        Allocates memory as needed, no unused allocated space
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 text-gray-700">
                  <h4 className="font-semibold text-red-700 flex items-center">
                    <Minus className="h-5 w-5 mr-2 text-gray-700" />
                    Trade-offs to Consider
                  </h4>
                  <div className="space-y-3 text-gray-700">
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-gray-700">
                      <div className="font-medium text-red-800 mb-1">No Random Access</div>
                      <p className="text-sm text-gray-700">
                        Cannot directly access element by index like arrays[i]
                      </p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-gray-700">
                      <div className="font-medium text-red-800 mb-1">Extra Memory Overhead</div>
                      <p className="text-sm text-gray-700">
                        Each node requires additional memory for storing pointer
                      </p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-gray-700">
                      <div className="font-medium text-red-800 mb-1">Sequential Access Only</div>
                      <p className="text-sm text-gray-700">
                        Must traverse from beginning to reach any element
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4 text-blue-800">Memory Layout Comparison</h3>
              <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                <div className="bg-gray-50 p-6 rounded-lg border text-gray-700">
                  <h4 className="font-semibold mb-4 text-gray-800">Array in Memory</h4>
                  <div className="space-y-2 text-gray-700">
                    <div className="text-sm text-gray-600 mb-2">Contiguous memory locations:</div>
                    <div className="flex space-x-1 text-gray-700">
                      {[10, 20, 30, 40].map((val, i) => (
                        <div key={i} className="bg-blue-200 px-3 py-2 rounded text-sm font-mono border text-gray-600">
                          {val}
                        </div>
                      ))}
                    </div>
                    <div className="flex space-x-1 text-xs text-gray-500">
                      <div className="px-3 py-1 text-gray-700">1000</div>
                      <div className="px-3 py-1 text-gray-700">1004</div>
                      <div className="px-3 py-1 text-gray-700">1008</div>
                      <div className="px-3 py-1 text-gray-700">1012</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border text-gray-700">
                  <h4 className="font-semibold mb-4 text-gray-800">Linked List in Memory</h4>
                  <div className="space-y-3 text-gray-700">
                    <div className="text-sm text-gray-600 mb-2">Non-contiguous memory locations:</div>
                    <div className="space-y-2 text-gray-700">
                      <div className="flex items-center space-x-2 text-gray-700">
                        <div className="bg-blue-200 px-2 py-1 rounded text-sm text-gray-600">10</div>
                        <ArrowRight className="h-3 w-3 text-gray-700" />
                        <div className="text-xs text-gray-500">@2500</div>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-700">
                        <div className="bg-blue-200 px-2 py-1 rounded text-sm text-gray-600">20</div>
                        <ArrowRight className="h-3 w-3 text-gray-700" />
                        <div className="text-xs text-gray-500">@1200</div>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-700">
                        <div className="bg-blue-200 px-2 py-1 rounded text-sm text-gray-600">30</div>
                        <ArrowRight className="h-3 w-3 text-gray-700" />
                        <div className="text-xs text-gray-500">NULL</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Comprehensive Types Section */}
        <motion.section
          id="types"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-8 text-gray-700"
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center text-slate-800">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-3 text-gray-700">
              <Layers className="h-5 w-5 text-black text-gray-700" />
            </div>
            Types of Linked Lists: Detailed Exploration
          </h2>

          <div className="space-y-12 text-gray-700">
            {/* Singly Linked List - Comprehensive */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg border border-blue-200 text-white">
              <h3 className="text-2xl font-semibold mb-6 text-blue-800 flex items-center">
                <ArrowRight className="h-6 w-6 mr-3 text-gray-700" />
                1. Singly Linked List (Unidirectional)
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6 text-gray-700">
                <div>
                  <h4 className="font-semibold mb-3 text-blue-700">Structure & Properties</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start text-gray-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 text-white"></div>
                      <span>Each node contains <strong>data</strong> and <strong>next pointer</strong></span>
                    </li>
                    <li className="flex items-start text-gray-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 text-black"></div>
                      <span>Traversal is <strong>unidirectional</strong> (head to tail only)</span>
                    </li>
                    <li className="flex items-start text-gray-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 text-black"></div>
                      <span>Last node&apos;s next pointer is <strong>NULL</strong></span>
                    </li>
                    <li className="flex items-start text-gray-700">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 text-black"></div>
                      <span>Most <strong>memory efficient</strong> variant</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-blue-700">Node Structure</h4>
                  <div className="bg-gray-900 p-4 rounded-lg text-gray-100">
                    <pre className="text-green-400 text-sm">
{`struct Node {
    int data;      // Data field
    Node* next;    // Pointer to next node
};`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border mb-6 text-gray-700">
                <h4 className="font-semibold mb-4 text-blue-700 flex items-center">
                  <Eye className="h-5 w-5 mr-2 text-gray-700" />
                  Visual Representation
                </h4>
                <div className="flex items-center space-x-3 justify-center text-gray-700">
                  <div className="text-center text-gray-700">
                    <div className="bg-blue-300 px-4 py-3 rounded-lg border-2 border-blue-500 text-white">
                      <div className="font-bold text-blue-900">HEAD</div>
                      <div className="text-sm text-blue-700">First Node</div>
                    </div>
                  </div>
                  <ArrowRight className="h-6 w-6 text-blue-600" />
                  <div className="bg-blue-200 px-4 py-2 rounded border text-black">Data: A</div>
                  <ArrowRight className="h-4 w-4 text-gray-700" />
                  <div className="bg-blue-200 px-4 py-2 rounded border text-black">Data: B</div>
                  <ArrowRight className="h-4 w-4 text-gray-700" />
                  <div className="bg-blue-200 px-4 py-2 rounded border text-black">Data: C</div>
                  <ArrowRight className="h-4 w-4 text-gray-700" />
                  <div className="bg-gray-300 px-3 py-2 rounded border text-gray-700">NULL</div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 text-gray-700">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-gray-700">
                  <h5 className="font-semibold text-green-800 mb-2">✅ Best For</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Simple data storage</li>
                    <li>• Stack implementation</li>
                    <li>• Forward-only traversal</li>
                    <li>• Memory-constrained environments</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-gray-700">
                  <h5 className="font-semibold text-yellow-800 mb-2">⚡ Time Complexity</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Insert at head: <strong>O(1)</strong></li>
                    <li>• Insert at tail: <strong>O(n)</strong></li>
                    <li>• Delete head: <strong>O(1)</strong></li>
                    <li>• Search: <strong>O(n)</strong></li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-white">
                  <h5 className="font-semibold text-blue-800 mb-2">💾 Space Complexity</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Per node: <strong>data + 1 pointer</strong></li>
                    <li>• Most memory efficient</li>
                    <li>• Total: <strong>O(n)</strong></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Doubly Linked List - Comprehensive */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-lg border border-purple-200 text-gray-700">
              <h3 className="text-2xl font-semibold mb-6 text-purple-800 flex items-center">
                <RotateCcw className="h-6 w-6 mr-3 text-gray-700" />
                2. Doubly Linked List (Bidirectional)
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6 text-gray-700">
                <div>
                  <h4 className="font-semibold mb-3 text-purple-700">Enhanced Structure</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start text-gray-700">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 text-gray-700"></div>
                      <span>Each node has <strong>data</strong>, <strong>next</strong>, and <strong>prev</strong> pointers</span>
                    </li>
                    <li className="flex items-start text-gray-700">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 text-gray-700"></div>
                      <span><strong>Bidirectional traversal</strong> (forward and backward)</span>
                    </li>
                    <li className="flex items-start text-gray-700">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 text-gray-700"></div>
                      <span>First node&apos;s prev pointer is <strong>NULL</strong></span>
                    </li>
                    <li className="flex items-start text-gray-700">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 text-gray-700"></div>
                      <span>Often maintains both <strong>head</strong> and <strong>tail</strong> pointers</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-purple-700">Enhanced Node Structure</h4>
                  <div className="bg-gray-900 p-4 rounded-lg text-gray-100">
                    <pre className="text-green-400 text-sm">
{`struct DoublyNode {
    int data;           // Data field
    DoublyNode* next;   // Next node pointer
    DoublyNode* prev;   // Previous node pointer
};`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border mb-6 text-gray-700">
                <h4 className="font-semibold mb-4 text-purple-700 flex items-center">
                  <Eye className="h-5 w-5 mr-2 text-gray-700" />
                  Bidirectional Structure Visualization
                </h4>
                <div className="flex flex-col items-center space-y-4 text-gray-700">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <div className="bg-gray-300 px-3 py-2 rounded text-gray-700 text-sm">NULL</div>
                    <ArrowLeft className="h-4 w-4 text-purple-600" />
                    <div className="bg-purple-200 px-4 py-2 rounded border text-center text-gray-700">
                      <div className="font-bold text-gray-800">A</div>
                    </div>
                    <div className="flex flex-col items-center text-gray-700">
                      <ArrowRight className="h-3 w-3 text-purple-600" />
                      <ArrowLeft className="h-3 w-3 text-purple-600" />
                    </div>
                    <div className="bg-purple-200 px-4 py-2 rounded border text-center text-gray-700">
                      <div className="font-bold text-gray-800">B</div>
                    </div>
                    <div className="flex flex-col items-center text-gray-700">
                      <ArrowRight className="h-3 w-3 text-purple-600" />
                      <ArrowLeft className="h-3 w-3 text-purple-600" />
                    </div>
                    <div className="bg-purple-200 px-4 py-2 rounded border text-center text-gray-700">
                      <div className="font-bold text-gray-800">C</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-purple-600" />
                    <div className="bg-gray-300 px-3 py-2 rounded text-gray-700 text-sm">NULL</div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-purple-700">
                    <div className="bg-purple-100 px-3 py-1 rounded text-gray-700">← Previous Links</div>
                    <div className="bg-purple-100 px-3 py-1 rounded text-gray-700">Next Links →</div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 text-gray-700">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-gray-700">
                  <h5 className="font-semibold text-green-800 mb-2">✅ Perfect For</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Undo/Redo operations</li>
                    <li>• Browser navigation</li>
                    <li>• Deque implementation</li>
                    <li>• Bidirectional traversal</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-gray-700">
                  <h5 className="font-semibold text-yellow-800 mb-2">⚡ Time Complexity</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Insert at head/tail: <strong>O(1)</strong></li>
                    <li>• Delete node: <strong>O(1)*</strong></li>
                    <li>• Search: <strong>O(n)</strong></li>
                    <li>• Reverse traversal: <strong>O(n)</strong></li>
                  </ul>
                  <p className="text-xs text-gray-600 mt-2">*If node reference available</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-gray-700">
                  <h5 className="font-semibold text-red-800 mb-2">💾 Space Overhead</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Per node: <strong>data + 2 pointers</strong></li>
                    <li>• ~33% more memory than singly</li>
                    <li>• Total: <strong>O(n)</strong></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Circular Linked List - Comprehensive */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg border border-green-200 text-gray-700">
              <h3 className="text-2xl font-semibold mb-6 text-green-800 flex items-center">
                <GitBranch className="h-6 w-6 mr-3 text-gray-700" />
                3. Circular Linked List (Endless Loop)
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6 text-gray-700">
                <div>
                  <h4 className="font-semibold mb-3 text-green-700">Circular Structure</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 text-gray-700"></div>
                      <span>Last node points <strong>back to the first node</strong></span>
                    </li>
                    <li className="flex items-start text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 text-gray-700"></div>
                      <span><strong>No NULL pointers</strong> in the structure</span>
                    </li>
                    <li className="flex items-start text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 text-gray-700"></div>
                      <span>Can traverse <strong>infinitely</strong> if not careful</span>
                    </li>
                    <li className="flex items-start text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 text-gray-700"></div>
                      <span>Can be <strong>singly</strong> or <strong>doubly</strong> circular</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-green-700">Circular Node Logic</h4>
                  <div className="bg-gray-900 p-4 rounded-lg text-gray-100">
                    <pre className="text-green-400 text-sm">
{`// Circular condition
if (current->next == head) {
    // We've completed the circle
    break;
}`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border mb-6 text-gray-700">
                <h4 className="font-semibold mb-4 text-green-700 flex items-center">
                  <Eye className="h-5 w-5 mr-2 text-gray-700" />
                  Circular Structure Visualization
                </h4>
                <div className="flex flex-col items-center space-y-4 text-gray-700">
                  <div className="relative text-gray-700">
                    <div className="flex items-center space-x-4 text-gray-700">
                      <div className="bg-green-200 px-4 py-2 rounded border text-center text-gray-700">
                        <div className="font-bold text-gray-800">HEAD</div>
                        <div className="text-sm text-gray-600">Node A</div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-green-600" />
                      <div className="bg-green-200 px-4 py-2 rounded border text-center text-gray-700">
                        <div className="font-bold text-gray-800">B</div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-green-600" />
                      <div className="bg-green-200 px-4 py-2 rounded border text-center text-gray-700">
                        <div className="font-bold text-gray-800">C</div>
                      </div>
                    </div>
                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-gray-700">
                      <div className="flex items-center space-x-2 text-gray-700">
                        <div className="w-32 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin text-gray-700"></div>
                        <span className="text-green-700 font-medium">Points back to HEAD</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 text-gray-700">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-white">
                  <h5 className="font-semibold text-blue-800 mb-2">🎯 Ideal Applications</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Round-robin scheduling</li>
                    <li>• Music playlist loops</li>
                    <li>• Game turn management</li>
                    <li>• Circular buffers</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-gray-700">
                  <h5 className="font-semibold text-yellow-800 mb-2">⚠️ Special Considerations</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Infinite loop risk</li>
                    <li>• Special termination logic</li>
                    <li>• Careful traversal needed</li>
                    <li>• Node counting complexity</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-gray-700">
                  <h5 className="font-semibold text-green-800 mb-2">✨ Unique Benefits</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• No NULL pointer checks</li>
                    <li>• Continuous traversal</li>
                    <li>• Memory efficient loops</li>
                    <li>• Natural for cyclic data</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Comprehensive Operations Section */}
        <motion.section
          id="operations"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-8 text-gray-700"
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center text-slate-800">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center mr-3 text-gray-700">
              <Zap className="h-5 w-5 text-black text-gray-700" />
            </div>
            Comprehensive Operations & Algorithms
          </h2>

          <div className="space-y-10 text-gray-700">
            {/* Insertion Operations - Detailed */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-purple-800 flex items-center">
                <Plus className="h-6 w-6 mr-3 text-gray-700" />
                1. Insertion Operations - Step by Step
              </h3>
              
              <div className="space-y-8 text-gray-700">
                {/* Insert at Beginning */}
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border border-green-200 text-gray-700">
                  <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                    <div>
                      <h4 className="font-semibold mb-3 text-green-800">Insert at Beginning (Head)</h4>
                      <div className="space-y-3 text-gray-700">
                        <div className="bg-white p-4 rounded border text-gray-700">
                          <h5 className="font-medium text-green-700 mb-2">Algorithm Steps:</h5>
                          <ol className="text-sm text-gray-700 space-y-1">
                            <li>1. Create new node with given data</li>
                            <li>2. Set new node&apos;s next = current head</li>
                            <li>3. Update head = new node</li>
                            <li>4. Increment size counter</li>
                          </ol>
                        </div>
                        <div className="bg-green-600 text-black p-3 rounded text-center font-bold text-gray-800">
                          Time: O(1) | Space: O(1)
                        </div>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium text-green-700 mb-3">Code Implementation:</h5>
                      <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-gray-100">
                        <pre className="text-green-400 text-sm">
{`void insertAtHead(int data) {
    Node* newNode = new Node(data);
    newNode->next = head;
    head = newNode;
    size++;
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Insert at End */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200 text-white">
                  <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                    <div>
                      <h4 className="font-semibold mb-3 text-blue-800">Insert at End (Tail)</h4>
                      <div className="space-y-3 text-gray-700">
                        <div className="bg-white p-4 rounded border text-gray-700">
                          <h5 className="font-medium text-blue-700 mb-2">Algorithm Steps:</h5>
                          <ol className="text-sm text-gray-700 space-y-1">
                            <li>1. Create new node with given data</li>
                            <li>2. If list empty, set head = new node</li>
                            <li>3. Else, traverse to last node</li>
                            <li>4. Set lastNode.next = new node</li>
                            <li>5. Increment size counter</li>
                          </ol>
                        </div>
                        <div className="bg-blue-600 text-black p-3 rounded text-center font-bold text-black">
                          Time: O(n) | Space: O(1)
                        </div>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium text-blue-700 mb-3">Code Implementation:</h5>
                      <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-gray-100">
                        <pre className="text-green-400 text-sm">
{`void insertAtTail(int data) {
    Node* newNode = new Node(data);
    if (!head) {
        head = newNode;
        return;
    }
    Node* temp = head;
    while (temp->next) {
        temp = temp->next;
    }
    temp->next = newNode;
    size++;
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Insert at Position */}
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200 text-gray-700">
                  <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                    <div>
                      <h4 className="font-semibold mb-3 text-purple-800">Insert at Specific Position</h4>
                      <div className="space-y-3 text-gray-700">
                        <div className="bg-white p-4 rounded border text-gray-700">
                          <h5 className="font-medium text-purple-700 mb-2">Algorithm Steps:</h5>
                          <ol className="text-sm text-gray-700 space-y-1">
                            <li>1. Validate position (0 ≤ pos ≤ size)</li>
                            <li>2. If pos = 0, insert at head</li>
                            <li>3. Traverse to position-1</li>
                            <li>4. Link new node between current and next</li>
                            <li>5. Increment size counter</li>
                          </ol>
                        </div>
                        <div className="bg-purple-600 text-black p-3 rounded text-center font-bold text-gray-800">
                          Time: O(n) | Space: O(1)
                        </div>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium text-purple-700 mb-3">Code Implementation:</h5>
                      <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-gray-100">
                        <pre className="text-green-400 text-sm">
{`void insertAtPosition(int data, int pos) {
    if (pos < 0 || pos > size) return;
    if (pos == 0) {
        insertAtHead(data);
        return;
    }
    
    Node* newNode = new Node(data);
    Node* temp = head;
    for (int i = 0; i < pos - 1; i++) {
        temp = temp->next;
    }
    newNode->next = temp->next;
    temp->next = newNode;
    size++;
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Deletion Operations - Detailed */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-purple-800 flex items-center">
                <Minus className="h-6 w-6 mr-3 text-gray-700" />
                2. Deletion Operations - Step by Step
              </h3>
              
              <div className="space-y-8 text-gray-700">
                {/* Delete from Beginning */}
                <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-lg border border-red-200 text-gray-700">
                  <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                    <div>
                      <h4 className="font-semibold mb-3 text-red-800">Delete from Beginning</h4>
                      <div className="space-y-3 text-gray-700">
                        <div className="bg-white p-4 rounded border text-gray-700">
                          <h5 className="font-medium text-red-700 mb-2">Algorithm Steps:</h5>
                          <ol className="text-sm text-gray-700 space-y-1">
                            <li>1. Check if list is empty</li>
                            <li>2. Store reference to head node</li>
                            <li>3. Update head = head.next</li>
                            <li>4. Delete the old head node</li>
                            <li>5. Decrement size counter</li>
                          </ol>
                        </div>
                        <div className="bg-red-600 text-black p-3 rounded text-center font-bold text-gray-800">
                          Time: O(1) | Space: O(1)
                        </div>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium text-red-700 mb-3">Code Implementation:</h5>
                      <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-gray-100">
                        <pre className="text-green-400 text-sm">
{`bool deleteFromHead() {
    if (!head) return false;
    
    Node* nodeToDelete = head;
    head = head->next;
    delete nodeToDelete;
    size--;
    return true;
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delete by Value */}
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200 text-gray-700">
                  <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                    <div>
                      <h4 className="font-semibold mb-3 text-orange-800">Delete by Value</h4>
                      <div className="space-y-3 text-gray-700">
                        <div className="bg-white p-4 rounded border text-gray-700">
                          <h5 className="font-medium text-orange-700 mb-2">Algorithm Steps:</h5>
                          <ol className="text-sm text-gray-700 space-y-1">
                            <li>1. Check if head node has target value</li>
                            <li>2. Traverse to find target node</li>
                            <li>3. Keep track of previous node</li>
                            <li>4. Link previous.next = current.next</li>
                            <li>5. Delete target node</li>
                          </ol>
                        </div>
                        <div className="bg-orange-600 text-black p-3 rounded text-center font-bold text-gray-800">
                          Time: O(n) | Space: O(1)
                        </div>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium text-orange-700 mb-3">Code Implementation:</h5>
                      <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-gray-100">
                        <pre className="text-green-400 text-sm">
{`bool deleteByValue(int value) {
    if (!head) return false;
    
    if (head->data == value) {
        return deleteFromHead();
    }
    
    Node* current = head;
    while (current->next && 
           current->next->data != value) {
        current = current->next;
    }
    
    if (current->next) {
        Node* nodeToDelete = current->next;
        current->next = nodeToDelete->next;
        delete nodeToDelete;
        size--;
        return true;
    }
    return false;
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Traversal and Search Operations */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-purple-800 flex items-center">
                <Search className="h-6 w-6 mr-3 text-gray-700" />
                3. Traversal & Search Operations
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-lg border border-indigo-200 text-white">
                  <h4 className="font-semibold mb-4 text-indigo-800">Forward Traversal</h4>
                  <div className="bg-gray-900 p-4 rounded-lg mb-4 text-gray-100">
                    <pre className="text-green-400 text-sm">
{`void traverse() {
    Node* current = head;
    while (current != nullptr) {
        cout << current->data << " -> ";
        current = current->next;
    }
    cout << "NULL" << endl;
}`}
                    </pre>
                  </div>
                  <div className="bg-indigo-600 text-black p-2 rounded text-center text-sm font-bold text-gray-600">
                    Time: O(n) | Space: O(1)
                  </div>
                </div>

                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-6 rounded-lg border border-cyan-200 text-white">
                  <h4 className="font-semibold mb-4 text-cyan-800">Search Operation</h4>
                  <div className="bg-gray-900 p-4 rounded-lg mb-4 text-gray-100">
                    <pre className="text-green-400 text-sm">
{`int search(int value) {
    Node* current = head;
    int position = 0;
    
    while (current != nullptr) {
        if (current->data == value) {
            return position;
        }
        current = current->next;
        position++;
    }
    return -1; // Not found
}`}
                    </pre>
                  </div>
                  <div className="bg-cyan-600 text-black p-2 rounded text-center text-sm font-bold text-gray-600">
                    Time: O(n) | Space: O(1)
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Mini Demo */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-lg text-black text-black">
              <h3 className="text-2xl font-semibold mb-4 flex items-center text-gray-800">
                <PlayCircle className="h-6 w-6 mr-3 text-gray-700" />
                Interactive Operation Demo
              </h3>
              <div className="grid md:grid-cols-3 gap-4 mb-6 text-gray-700">
                <button 
                  onClick={() => startAnimation('insert')}
                  className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-all"
                >
                  <Plus className="h-5 w-5 mx-auto mb-2 text-gray-700" />
                  <div className="text-sm text-gray-600">Insert Demo</div>
                </button>
                <button 
                  onClick={() => startAnimation('delete')}
                  className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-all"
                >
                  <Minus className="h-5 w-5 mx-auto mb-2 text-gray-700" />
                  <div className="text-sm text-gray-600">Delete Demo</div>
                </button>
                <button 
                  onClick={() => startAnimation('search')}
                  className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-all"
                >
                  <Search className="h-5 w-5 mx-auto mb-2 text-gray-700" />
                  <div className="text-sm text-gray-600">Search Demo</div>
                </button>
              </div>
              <div className="bg-white/10 rounded-lg p-4 min-h-16 flex items-center justify-center text-gray-700">
                <div className="text-center text-black/80 text-gray-700">
                  Click any operation above to see it in action!
                </div>
              </div>
            </div>

            {/* Comprehensive Complexity Table */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-purple-800">Complete Time Complexity Analysis</h3>
              <div className="overflow-x-auto text-gray-700">
                <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-lg text-gray-700">
                  <thead>
                    <tr className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-white">
                      <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-800">Operation</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-bold text-gray-800">Singly LL</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-bold text-gray-800">Doubly LL</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-bold text-gray-800">Circular LL</th>
                      <th className="border border-gray-300 px-4 py-3 text-center font-bold text-gray-800">Array (Compare)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-green-50 text-gray-700">
                      <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">Insert at Beginning</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-green-600 font-bold">O(1)</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-green-600 font-bold">O(1)</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-green-600 font-bold">O(1)</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-red-600 font-bold">O(n)</td>
                    </tr>
                    <tr className="bg-white text-gray-700">
                      <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">Insert at End</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-yellow-600 font-bold">O(n)</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-green-600 font-bold">O(1)*</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-yellow-600 font-bold">O(n)</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-green-600 font-bold">O(1)**</td>
                    </tr>
                    <tr className="bg-blue-50 text-white">
                      <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">Insert at Position</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-red-600 font-bold">O(n)</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-red-600 font-bold">O(n)</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-red-600 font-bold">O(n)</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-red-600 font-bold">O(n)</td>
                    </tr>
                    <tr className="bg-white text-gray-700">
                      <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">Delete from Beginning</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-green-600 font-bold">O(1)</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-green-600 font-bold">O(1)</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-green-600 font-bold">O(1)</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-red-600 font-bold">O(n)</td>
                    </tr>
                    <tr className="bg-red-50 text-gray-700">
                      <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">Delete from End</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-red-600 font-bold">O(n)</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-green-600 font-bold">O(1)*</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-red-600 font-bold">O(n)</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-green-600 font-bold">O(1)</td>
                    </tr>
                    <tr className="bg-white text-gray-700">
                      <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">Delete by Value</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-red-600 font-bold">O(n)</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-red-600 font-bold">O(n)</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-red-600 font-bold">O(n)</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-red-600 font-bold">O(n)</td>
                    </tr>
                    <tr className="bg-yellow-50 text-gray-700">
                      <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">Search/Access</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-red-600 font-bold">O(n)</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-red-600 font-bold">O(n)</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-red-600 font-bold">O(n)</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-green-600 font-bold">O(1)***</td>
                    </tr>
                    <tr className="bg-gray-50 text-gray-700">
                      <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">Traversal</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-red-600 font-bold">O(n)</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-red-600 font-bold">O(n)</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-red-600 font-bold">O(n)</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-red-600 font-bold">O(n)</td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-4 space-y-1 text-xs text-gray-600">
                  <p>* With tail pointer maintained</p>
                  <p>** Amortized time for dynamic arrays</p>
                  <p>*** For random access by index</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Implementation Section */}
        <motion.section
          id="implementation"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-8 text-gray-700"
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center text-slate-800">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3 text-white">
              <Code className="h-5 w-5 text-white text-gray-700" />
            </div>
            Implementation & Code Examples
          </h2>

          <div className="space-y-8 text-gray-700">
            {/* Node Structure */}
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-blue-800">Node Structure Definition</h3>
              <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                {/* JavaScript/TypeScript */}
                <div>
                  <h4 className="font-semibold mb-3 text-yellow-600">JavaScript/TypeScript</h4>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto text-gray-100">
                    <pre className="text-green-400 text-sm">
{`class ListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

// Doubly Linked List Node
class DoublyListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}`}
                    </pre>
                  </div>
                </div>

                {/* Python */}
                <div>
                  <h4 className="font-semibold mb-3 text-blue-600">Python</h4>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto text-gray-100">
                    <pre className="text-green-400 text-sm">
{`class ListNode:
    def __init__(self, data):
        self.data = data
        self.next = None

# Doubly Linked List Node
class DoublyListNode:
    def __init__(self, data):
        self.data = data
        self.next = None
        self.prev = None`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Singly Linked List Implementation */}
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-blue-800">Singly Linked List Implementation</h3>
              <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto text-gray-100">
                <pre className="text-green-400 text-sm">
{`class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  // Insert at beginning - O(1)
  insertAtBeginning(data) {
    const newNode = new ListNode(data);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }

  // Insert at end - O(n)
  insertAtEnd(data) {
    const newNode = new ListNode(data);
    
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }

  // Insert at specific position - O(n)
  insertAtPosition(data, position) {
    if (position < 0 || position > this.size) {
      throw new Error('Position out of bounds');
    }
    
    if (position === 0) {
      this.insertAtBeginning(data);
      return;
    }
    
    const newNode = new ListNode(data);
    let current = this.head;
    
    for (let i = 0; i < position - 1; i++) {
      current = current.next;
    }
    
    newNode.next = current.next;
    current.next = newNode;
    this.size++;
  }

  // Delete by value - O(n)
  deleteByValue(value) {
    if (!this.head) return false;
    
    if (this.head.data === value) {
      this.head = this.head.next;
      this.size--;
      return true;
    }
    
    let current = this.head;
    while (current.next && current.next.data !== value) {
      current = current.next;
    }
    
    if (current.next) {
      current.next = current.next.next;
      this.size--;
      return true;
    }
    
    return false;
  }

  // Search - O(n)
  search(value) {
    let current = this.head;
    let position = 0;
    
    while (current) {
      if (current.data === value) {
        return position;
      }
      current = current.next;
      position++;
    }
    
    return -1;
  }

  // Display list
  display() {
    const elements = [];
    let current = this.head;
    
    while (current) {
      elements.push(current.data);
      current = current.next;
    }
    
    return elements.join(' -> ') + ' -> null';
  }
}`}
                </pre>
              </div>
            </div>

            {/* Doubly Linked List Key Operations */}
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-blue-800">Doubly Linked List Key Operations</h3>
              <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto text-gray-100">
                <pre className="text-green-400 text-sm">
{`class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // Insert at beginning - O(1)
  insertAtBeginning(data) {
    const newNode = new DoublyListNode(data);
    
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.size++;
  }

  // Insert at end - O(1) with tail pointer
  insertAtEnd(data) {
    const newNode = new DoublyListNode(data);
    
    if (!this.tail) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.size++;
  }

  // Delete node - O(1) if node reference available
  deleteNode(node) {
    if (!node) return;
    
    if (node.prev) {
      node.prev.next = node.next;
    } else {
      this.head = node.next;
    }
    
    if (node.next) {
      node.next.prev = node.prev;
    } else {
      this.tail = node.prev;
    }
    
    this.size--;
  }

  // Reverse traversal - O(n)
  displayReverse() {
    const elements = [];
    let current = this.tail;
    
    while (current) {
      elements.push(current.data);
      current = current.prev;
    }
    
    return elements.join(' <- ') + ' <- null';
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Advantages & Disadvantages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid md:grid-cols-2 gap-8 mb-8 text-gray-700"
        >
          {/* Advantages */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-gray-700">
            <h3 className="text-2xl font-semibold mb-4 text-green-600 flex items-center">
              <Plus className="h-6 w-6 mr-2 text-gray-700" />
              Advantages
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start text-gray-700">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0 text-gray-700"></div>
                <span><strong>Dynamic Size:</strong> Can grow or shrink during runtime</span>
              </li>
              <li className="flex items-start text-gray-700">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0 text-gray-700"></div>
                <span><strong>Efficient Insertion/Deletion:</strong> O(1) at beginning</span>
              </li>
              <li className="flex items-start text-gray-700">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0 text-gray-700"></div>
                <span><strong>Memory Efficient:</strong> Allocates memory as needed</span>
              </li>
              <li className="flex items-start text-gray-700">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0 text-gray-700"></div>
                <span><strong>No Memory Waste:</strong> Uses exact memory required</span>
              </li>
              <li className="flex items-start text-gray-700">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0 text-gray-700"></div>
                <span><strong>Implementation Flexibility:</strong> Easy to implement stacks, queues</span>
              </li>
            </ul>
          </div>

          {/* Disadvantages */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-gray-700">
            <h3 className="text-2xl font-semibold mb-4 text-red-600 flex items-center">
              <Minus className="h-6 w-6 mr-2 text-gray-700" />
              Disadvantages
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start text-gray-700">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0 text-gray-700"></div>
                <span><strong>No Random Access:</strong> Cannot directly access elements by index</span>
              </li>
              <li className="flex items-start text-gray-700">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0 text-gray-700"></div>
                <span><strong>Extra Memory:</strong> Additional memory for storing pointers</span>
              </li>
              <li className="flex items-start text-gray-700">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0 text-gray-700"></div>
                <span><strong>Sequential Access:</strong> Must traverse from beginning</span>
              </li>
              <li className="flex items-start text-gray-700">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0 text-gray-700"></div>
                <span><strong>Cache Performance:</strong> Poor locality of reference</span>
              </li>
              <li className="flex items-start text-gray-700">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0 text-gray-700"></div>
                <span><strong>Not Binary Search Friendly:</strong> Cannot use binary search</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Applications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-8 text-gray-700"
        >
          <h3 className="text-2xl font-semibold mb-6 text-blue-800">Real-World Applications</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-white">
              <h4 className="font-semibold text-blue-800 mb-2">Web Browsers</h4>
              <p className="text-sm text-gray-700">
                Browser history navigation using doubly linked lists for forward/back functionality.
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-gray-700">
              <h4 className="font-semibold text-green-800 mb-2">Music Players</h4>
              <p className="text-sm text-gray-700">
                Playlist management with next/previous song navigation and shuffle features.
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 text-gray-700">
              <h4 className="font-semibold text-purple-800 mb-2">Undo Operations</h4>
              <p className="text-sm text-gray-700">
                Text editors and IDEs use linked lists to implement undo/redo functionality.
              </p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-gray-700">
              <h4 className="font-semibold text-yellow-800 mb-2">Process Scheduling</h4>
              <p className="text-sm text-gray-700">
                Operating systems use circular linked lists for round-robin scheduling.
              </p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-gray-700">
              <h4 className="font-semibold text-red-800 mb-2">Social Networks</h4>
              <p className="text-sm text-gray-700">
                Friend suggestions and social graphs using linked list structures.
              </p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200 text-white">
              <h4 className="font-semibold text-indigo-800 mb-2">Memory Management</h4>
              <p className="text-sm text-gray-700">
                Dynamic memory allocation systems use linked lists to track free memory blocks.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Applications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-8 text-gray-700"
        >
          <h3 className="text-2xl font-semibold mb-6 text-blue-800 flex items-center">
            <Activity className="h-6 w-6 mr-3 text-gray-700" />
            Real-World Applications & Use Cases
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200 text-white">
              <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                <ArrowLeft className="h-5 w-5 mr-2 text-gray-700" />
                Browser Navigation
              </h4>
              <p className="text-sm text-gray-700 mb-3">
                Web browsers use doubly linked lists to implement forward/back navigation history.
              </p>
              <div className="bg-blue-200 p-2 rounded text-xs text-blue-800">
                Each page is a node with prev/next links for seamless navigation.
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200 text-gray-700">
              <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                <PlayCircle className="h-5 w-5 mr-2 text-gray-700" />
                Media Players
              </h4>
              <p className="text-sm text-gray-700 mb-3">
                Music and video players use circular linked lists for playlist management and continuous play.
              </p>
              <div className="bg-green-200 p-2 rounded text-xs text-green-800">
                Songs in playlist with next/previous and loop functionality.
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200 text-gray-700">
              <h4 className="font-semibold text-purple-800 mb-3 flex items-center">
                <RotateCcw className="h-5 w-5 mr-2 text-gray-700" />
                Undo/Redo Systems
              </h4>
              <p className="text-sm text-gray-700 mb-3">
                Text editors and IDEs implement undo/redo using doubly linked lists of command states.
              </p>
              <div className="bg-purple-200 p-2 rounded text-xs text-purple-800">
                Each edit operation stored as node with backward/forward traversal.
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg border border-yellow-200 text-gray-700">
              <h4 className="font-semibold text-yellow-800 mb-3 flex items-center">
                <Target className="h-5 w-5 mr-2 text-gray-700" />
                Operating System Tasks
              </h4>
              <p className="text-sm text-gray-700 mb-3">
                OS process scheduling uses circular linked lists for round-robin algorithm implementation.
              </p>
              <div className="bg-yellow-200 p-2 rounded text-xs text-yellow-800">
                Processes cycle through CPU time allocation fairly.
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg border border-red-200 text-gray-700">
              <h4 className="font-semibold text-red-800 mb-3 flex items-center">
                <GitBranch className="h-5 w-5 mr-2 text-gray-700" />
                Social Networks
              </h4>
              <p className="text-sm text-gray-700 mb-3">
                Friend connections, news feeds, and social graphs implemented using linked structures.
              </p>
              <div className="bg-red-200 p-2 rounded text-xs text-red-800">
                Dynamic relationships and connections between users.
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-lg border border-indigo-200 text-white">
              <h4 className="font-semibold text-indigo-800 mb-3 flex items-center">
                <Layers className="h-5 w-5 mr-2 text-gray-700" />
                Memory Management
              </h4>
              <p className="text-sm text-gray-700 mb-3">
                Dynamic memory allocators use linked lists to track free and allocated memory blocks.
              </p>
              <div className="bg-indigo-200 p-2 rounded text-xs text-indigo-800">
                Efficient memory allocation and garbage collection systems.
              </div>
            </div>
          </div>
        </motion.div>

        {/* Summary and Key Takeaways */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg p-8 mb-8 text-white text-white"
        >
          <h3 className="text-2xl font-semibold mb-6 flex items-center text-gray-800">
            <BookOpen className="h-6 w-6 mr-3 text-gray-700" />
            Key Takeaways & Summary
          </h3>
          <div className="grid md:grid-cols-2 gap-8 text-gray-700">
            <div>
              <h4 className="font-semibold mb-4 text-indigo-100">Essential Concepts Mastered:</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start text-gray-700">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0 text-gray-700"></div>
                  <span className="text-indigo-100">Understanding pointers and memory addresses</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0 text-gray-700"></div>
                  <span className="text-indigo-100">Dynamic memory allocation vs static arrays</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0 text-gray-700"></div>
                  <span className="text-indigo-100">Three main types: Singly, Doubly, Circular</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0 text-gray-700"></div>
                  <span className="text-indigo-100">O(1) insertion/deletion at head position</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0 text-gray-700"></div>
                  <span className="text-indigo-100">Trade-offs between memory and access speed</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-indigo-100">When to Choose Linked Lists:</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start text-gray-700">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0 text-gray-700"></div>
                  <span className="text-indigo-100">Frequent insertions/deletions at beginning</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0 text-gray-700"></div>
                  <span className="text-indigo-100">Unknown or highly variable data size</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0 text-gray-700"></div>
                  <span className="text-indigo-100">Memory allocation at runtime</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0 text-gray-700"></div>
                  <span className="text-indigo-100">Avoid when: Need random access or tight memory</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex justify-between items-center text-gray-700"
        >
          <Link href="/data-structures/arrays/theory" className="flex items-center text-blue-600 hover:text-blue-700 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2 text-gray-700" />
            Arrays Theory
          </Link>
          <div className="flex space-x-4 text-gray-700">
            <Link href="/data-structures/linked-lists/pseudocode" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-gray-100">
              View Pseudocode
            </Link>
            <Link href="/data-structures/linked-lists/simulation" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-gray-100">
              Try Interactive Simulation →
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
