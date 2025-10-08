"use client";
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Code, BookOpen, Zap, Layers, TrendingUp, Clock } from 'lucide-react';

export default function StacksTheoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 text-gray-700">
      <div className="container mx-auto px-4 py-12 text-gray-700">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-gray-700"
        >
          <Link href="/data-structures/stacks" className="inline-flex items-center text-stacks hover:text-green-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2 text-gray-700" />
            Back to Stacks Overview
          </Link>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6 text-slate-800">
            Stacks Theory
          </h1>
          <p className="text-xl text-secondary max-w-4xl leading-relaxed text-gray-700">
            Master the Last-In-First-Out (LIFO) principle and discover how stacks power everything from function calls 
            to expression evaluation and undo operations in modern software.
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
            <BookOpen className="h-6 w-6 text-stacks mr-2 text-gray-700" />
            Quick Navigation
          </h2>
          <div className="grid md:grid-cols-3 gap-4 text-gray-700">
            <a href="#basics" className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors border border-green-200 text-blue-600">
              <div className="w-2 h-2 bg-stacks rounded-full mr-3 text-gray-700"></div>
              <span className="text-gray-800 font-medium">LIFO Principle & Basics</span>
            </a>
            <a href="#operations" className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors border border-green-200 text-blue-600">
              <div className="w-2 h-2 bg-stacks rounded-full mr-3 text-gray-700"></div>
              <span className="text-gray-800 font-medium">Core Operations</span>
            </a>
            <a href="#implementation" className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors border border-green-200 text-blue-600">
              <div className="w-2 h-2 bg-stacks rounded-full mr-3 text-gray-700"></div>
              <span className="text-gray-800 font-medium">Implementation & Code</span>
            </a>
          </div>
        </motion.div>

        {/* Fundamentals Section */}
        <motion.section
          id="basics"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 text-gray-700"
        >
          <div className="bg-white rounded-lg shadow-lg p-8 text-gray-700">
            <h2 className="text-3xl font-bold text-heading-primary mb-6 flex items-center text-slate-800">
              <Layers className="h-8 w-8 text-stacks mr-3 text-gray-700" />
              Stack Fundamentals
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 text-gray-700">
              <div>
                <h3 className="text-xl font-semibold text-heading-secondary mb-4 text-gray-800">What is a Stack?</h3>
                <p className="text-secondary mb-4 text-gray-700">
                  A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle. 
                  Think of it like a stack of plates - you can only add or remove plates from the top.
                </p>
                <ul className="space-y-2 text-secondary text-gray-700">
                  <li>• Elements are added and removed from the same end (top)</li>
                  <li>• The last element added is the first one to be removed</li>
                  <li>• Access is restricted to the top element only</li>
                  <li>• Size can be dynamic or fixed depending on implementation</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg text-gray-700">
                <h3 className="text-xl font-semibold text-heading-secondary mb-4 text-gray-800">Key Characteristics</h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-center text-gray-700">
                    <Clock className="h-5 w-5 text-stacks mr-2 text-gray-700" />
                    <span className="text-secondary text-gray-600">O(1) push and pop operations</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <TrendingUp className="h-5 w-5 text-stacks mr-2 text-gray-700" />
                    <span className="text-secondary text-gray-600">LIFO ordering principle</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Zap className="h-5 w-5 text-stacks mr-2 text-gray-700" />
                    <span className="text-secondary text-gray-600">Memory efficient implementation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Operations Section */}
        <motion.section
          id="operations"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12 text-gray-700"
        >
          <div className="bg-white rounded-lg shadow-lg p-8 text-gray-700">
            <h2 className="text-3xl font-bold text-heading-primary mb-6 flex items-center text-slate-800">
              <Code className="h-8 w-8 text-stacks mr-3 text-gray-700" />
              Core Operations
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 text-gray-700">
              <div className="space-y-6 text-gray-700">
                <div className="border-l-4 border-stacks pl-4 text-gray-700">
                  <h3 className="text-lg font-semibold text-heading-secondary text-gray-800">Push Operation</h3>
                  <p className="text-secondary mt-2 text-gray-700">Add an element to the top of the stack</p>
                  <div className="bg-gray-50 p-3 rounded-lg mt-2 text-gray-700">
                    <code className="text-sm text-gray-600">
                      stack.push(element)<br/>
                      Time: O(1) | Space: O(1)
                    </code>
                  </div>
                </div>
                
                <div className="border-l-4 border-stacks pl-4 text-gray-700">
                  <h3 className="text-lg font-semibold text-heading-secondary text-gray-800">Pop Operation</h3>
                  <p className="text-secondary mt-2 text-gray-700">Remove and return the top element</p>
                  <div className="bg-gray-50 p-3 rounded-lg mt-2 text-gray-700">
                    <code className="text-sm text-gray-600">
                      element = stack.pop()<br/>
                      Time: O(1) | Space: O(1)
                    </code>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6 text-gray-700">
                <div className="border-l-4 border-stacks pl-4 text-gray-700">
                  <h3 className="text-lg font-semibold text-heading-secondary text-gray-800">Peek/Top Operation</h3>
                  <p className="text-secondary mt-2 text-gray-700">View the top element without removing it</p>
                  <div className="bg-gray-50 p-3 rounded-lg mt-2 text-gray-700">
                    <code className="text-sm text-gray-600">
                      element = stack.peek()<br/>
                      Time: O(1) | Space: O(1)
                    </code>
                  </div>
                </div>
                
                <div className="border-l-4 border-stacks pl-4 text-gray-700">
                  <h3 className="text-lg font-semibold text-heading-secondary text-gray-800">isEmpty Operation</h3>
                  <p className="text-secondary mt-2 text-gray-700">Check if the stack has no elements</p>
                  <div className="bg-gray-50 p-3 rounded-lg mt-2 text-gray-700">
                    <code className="text-sm text-gray-600">
                      boolean = stack.isEmpty()<br/>
                      Time: O(1) | Space: O(1)
                    </code>
                  </div>
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
          className="mb-12 text-gray-700"
        >
          <div className="bg-white rounded-lg shadow-lg p-8 text-gray-700">
            <h2 className="text-3xl font-bold text-heading-primary mb-6 text-slate-800">Implementation Methods</h2>
            
            <div className="grid md:grid-cols-2 gap-8 text-gray-700">
              {/* Array Implementation */}
              <div className="bg-green-50 p-6 rounded-lg text-gray-700">
                <h3 className="text-xl font-semibold text-heading-secondary mb-4 text-gray-800">Array Implementation</h3>
                <div className="bg-white p-4 rounded-lg mb-4 text-gray-700">
                  <pre className="text-sm overflow-x-auto text-gray-600">
                    <code>{`class ArrayStack {
  constructor(capacity = 100) {
    this.items = new Array(capacity);
    this.top = -1;
    this.capacity = capacity;
  }
  
  push(element) {
    if (this.top >= this.capacity - 1) {
      throw new Error("Stack Overflow");
    }
    this.items[++this.top] = element;
  }
  
  pop() {
    if (this.isEmpty()) {
      throw new Error("Stack Underflow");
    }
    return this.items[this.top--];
  }
  
  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[this.top];
  }
  
  isEmpty() {
    return this.top === -1;
  }
}`}</code>
                  </pre>
                </div>
                <div className="text-sm text-secondary text-gray-600">
                  <strong>Pros:</strong> Simple, cache-friendly, fixed memory<br/>
                  <strong>Cons:</strong> Fixed size, potential overflow
                </div>
              </div>
              
              {/* Linked List Implementation */}
              <div className="bg-blue-50 p-6 rounded-lg text-gray-700">
                <h3 className="text-xl font-semibold text-heading-secondary mb-4 text-gray-800">Linked List Implementation</h3>
                <div className="bg-white p-4 rounded-lg mb-4 text-gray-700">
                  <pre className="text-sm overflow-x-auto text-gray-600">
                    <code>{`class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedStack {
  constructor() {
    this.top = null;
    this.size = 0;
  }
  
  push(element) {
    const newNode = new Node(element);
    newNode.next = this.top;
    this.top = newNode;
    this.size++;
  }
  
  pop() {
    if (this.isEmpty()) {
      throw new Error("Stack Underflow");
    }
    const data = this.top.data;
    this.top = this.top.next;
    this.size--;
    return data;
  }
  
  peek() {
    return this.isEmpty() ? null : this.top.data;
  }
  
  isEmpty() {
    return this.top === null;
  }
}`}</code>
                  </pre>
                </div>
                <div className="text-sm text-secondary text-gray-600">
                  <strong>Pros:</strong> Dynamic size, no overflow<br/>
                  <strong>Cons:</strong> Extra memory for pointers
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Applications Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-12 text-gray-700"
        >
          <div className="bg-white rounded-lg shadow-lg p-8 text-gray-700">
            <h2 className="text-3xl font-bold text-heading-primary mb-6 text-slate-800">Real-World Applications</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg text-gray-700">
                <h3 className="text-lg font-semibold text-heading-secondary mb-3 text-gray-800">Function Call Management</h3>
                <p className="text-secondary text-sm mb-3 text-gray-600">
                  Programming languages use call stacks to manage function calls, local variables, and return addresses.
                </p>
                <div className="text-xs text-secondary text-gray-600">
                  <strong>Example:</strong> JavaScript call stack, recursive function tracking
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg text-gray-700">
                <h3 className="text-lg font-semibold text-heading-secondary mb-3 text-gray-800">Expression Evaluation</h3>
                <p className="text-secondary text-sm mb-3 text-gray-600">
                  Convert infix expressions to postfix and evaluate mathematical expressions using stacks.
                </p>
                <div className="text-xs text-secondary text-gray-600">
                  <strong>Example:</strong> Calculator apps, compiler expression parsing
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-lg text-gray-700">
                <h3 className="text-lg font-semibold text-heading-secondary mb-3 text-gray-800">Undo Operations</h3>
                <p className="text-secondary text-sm mb-3 text-gray-600">
                  Text editors and applications use stacks to implement undo/redo functionality.
                </p>
                <div className="text-xs text-secondary text-gray-600">
                  <strong>Example:</strong> Word processors, image editors, IDEs
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-lg text-gray-700">
                <h3 className="text-lg font-semibold text-heading-secondary mb-3 text-gray-800">Browser History</h3>
                <p className="text-secondary text-sm mb-3 text-gray-600">
                  Web browsers use stacks to track page navigation and implement back button functionality.
                </p>
                <div className="text-xs text-secondary text-gray-600">
                  <strong>Example:</strong> Browser back/forward, single-page app routing
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-lg text-gray-700">
                <h3 className="text-lg font-semibold text-heading-secondary mb-3 text-gray-800">Parentheses Matching</h3>
                <p className="text-secondary text-sm mb-3 text-gray-600">
                  Validate balanced parentheses, brackets, and braces in code and mathematical expressions.
                </p>
                <div className="text-xs text-secondary text-gray-600">
                  <strong>Example:</strong> Code editors, LaTeX processors
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-lg text-gray-700">
                <h3 className="text-lg font-semibold text-heading-secondary mb-3 text-gray-800">Memory Management</h3>
                <p className="text-secondary text-sm mb-3 text-gray-600">
                  Operating systems use stacks for memory allocation and managing program execution contexts.
                </p>
                <div className="text-xs text-secondary text-gray-600">
                  <strong>Example:</strong> Stack memory segment, context switching
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-between items-center text-gray-700"
        >
          <Link
            href="/data-structures/stacks"
            className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2 text-gray-700" />
            Back to Overview
          </Link>
          
          <Link
            href="/data-structures/stacks/simulation"
            className="inline-flex items-center px-6 py-3 bg-stacks text-white rounded-lg hover:bg-green-700 transition-colors text-gray-100"
          >
            Try Interactive Simulation
            <ArrowRight className="h-5 w-5 ml-2 text-gray-700" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
