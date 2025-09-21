'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, RotateCcw, Plus, Minus, Search, Code, BookOpen, Zap } from 'lucide-react';

export default function LinkedListsTheoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <Link href="/data-structures/linked-lists" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Linked Lists Overview
          </Link>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Linked Lists Theory
          </h1>
          <p className="text-xl text-slate-600 max-w-4xl leading-relaxed">
            Master the fundamentals of linked lists - dynamic data structures that provide efficient insertion and deletion 
            operations through pointer-based connections between nodes.
          </p>
        </motion.div>

        {/* Quick Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <BookOpen className="h-6 w-6 text-blue-600 mr-2" />
            Quick Navigation
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="#basics" className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
              <span className="text-gray-800 font-medium">Fundamentals & Types</span>
            </a>
            <a href="#operations" className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
              <span className="text-gray-800 font-medium">Operations & Algorithms</span>
            </a>
            <a href="#implementation" className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
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
          className="bg-white rounded-lg shadow-lg p-8 mb-8"
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            Linked List Fundamentals
          </h2>

          <div className="space-y-8">
            {/* What is a Linked List */}
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-blue-800">What is a Linked List?</h3>
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
                <p className="text-gray-700 mb-4">
                  A <strong>linked list</strong> is a linear data structure where elements (called nodes) are stored in sequence, 
                  but unlike arrays, they are not stored in contiguous memory locations. Each node contains data and a reference 
                  (or pointer) to the next node in the sequence.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-blue-700">Key Characteristics:</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Dynamic size - grows and shrinks during runtime</li>
                      <li>• Non-contiguous memory allocation</li>
                      <li>• Sequential access through pointers</li>
                      <li>• Efficient insertion and deletion</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-blue-700">Node Structure:</h4>
                    <div className="bg-white p-4 rounded border">
                      <div className="flex items-center space-x-2">
                        <div className="bg-blue-200 px-3 py-2 rounded">Data</div>
                        <ArrowRight className="h-4 w-4" />
                        <div className="bg-green-200 px-3 py-2 rounded">Next Pointer</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Types of Linked Lists */}
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-blue-800">Types of Linked Lists</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Singly Linked List */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                  <h4 className="font-semibold mb-3 text-blue-800 flex items-center">
                    <ArrowRight className="h-5 w-5 mr-2" />
                    Singly Linked List
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="bg-blue-300 px-2 py-1 rounded">A</div>
                      <ArrowRight className="h-3 w-3" />
                      <div className="bg-blue-300 px-2 py-1 rounded">B</div>
                      <ArrowRight className="h-3 w-3" />
                      <div className="bg-blue-300 px-2 py-1 rounded">C</div>
                      <ArrowRight className="h-3 w-3" />
                      <span className="text-xs">NULL</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      Each node points to the next node. Traversal is unidirectional from head to tail.
                    </p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Simple structure</li>
                      <li>• Memory efficient</li>
                      <li>• Forward traversal only</li>
                    </ul>
                  </div>
                </div>

                {/* Doubly Linked List */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
                  <h4 className="font-semibold mb-3 text-purple-800 flex items-center">
                    <RotateCcw className="h-5 w-5 mr-2" />
                    Doubly Linked List
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-1 text-sm">
                      <div className="bg-purple-300 px-2 py-1 rounded text-xs">A</div>
                      <div className="flex flex-col items-center">
                        <ArrowRight className="h-2 w-2" />
                        <ArrowLeft className="h-2 w-2" />
                      </div>
                      <div className="bg-purple-300 px-2 py-1 rounded text-xs">B</div>
                      <div className="flex flex-col items-center">
                        <ArrowRight className="h-2 w-2" />
                        <ArrowLeft className="h-2 w-2" />
                      </div>
                      <div className="bg-purple-300 px-2 py-1 rounded text-xs">C</div>
                    </div>
                    <p className="text-sm text-gray-700">
                      Each node has pointers to both next and previous nodes. Bidirectional traversal.
                    </p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Bidirectional traversal</li>
                      <li>• More memory overhead</li>
                      <li>• Easier deletion</li>
                    </ul>
                  </div>
                </div>

                {/* Circular Linked List */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
                  <h4 className="font-semibold mb-3 text-green-800 flex items-center">
                    <RotateCcw className="h-5 w-5 mr-2" />
                    Circular Linked List
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="bg-green-300 px-2 py-1 rounded">A</div>
                      <ArrowRight className="h-3 w-3" />
                      <div className="bg-green-300 px-2 py-1 rounded">B</div>
                      <ArrowRight className="h-3 w-3" />
                      <div className="bg-green-300 px-2 py-1 rounded">C</div>
                      <div className="text-xs ml-2">↺</div>
                    </div>
                    <p className="text-sm text-gray-700">
                      Last node points back to the first node, forming a circular structure.
                    </p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Circular traversal</li>
                      <li>• No NULL pointers</li>
                      <li>• Useful for round-robin</li>
                    </ul>
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
          className="bg-white rounded-lg shadow-lg p-8 mb-8"
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
              <Zap className="h-5 w-5 text-white" />
            </div>
            Operations & Algorithms
          </h2>

          <div className="space-y-8">
            {/* Basic Operations */}
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-blue-800">Core Operations</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Insertion Operations */}
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <h4 className="font-semibold mb-3 text-green-800 flex items-center">
                    <Plus className="h-5 w-5 mr-2" />
                    Insertion Operations
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-green-700">1. Insert at Beginning</h5>
                      <p className="text-sm text-gray-600 mb-2">Create new node and update head pointer</p>
                      <div className="bg-white p-3 rounded border text-xs">
                        <div className="text-green-600">Time: O(1) | Space: O(1)</div>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium text-green-700">2. Insert at End</h5>
                      <p className="text-sm text-gray-600 mb-2">Traverse to end and add new node</p>
                      <div className="bg-white p-3 rounded border text-xs">
                        <div className="text-green-600">Time: O(n) | Space: O(1)</div>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium text-green-700">3. Insert at Position</h5>
                      <p className="text-sm text-gray-600 mb-2">Traverse to position and insert node</p>
                      <div className="bg-white p-3 rounded border text-xs">
                        <div className="text-green-600">Time: O(n) | Space: O(1)</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Deletion Operations */}
                <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                  <h4 className="font-semibold mb-3 text-red-800 flex items-center">
                    <Minus className="h-5 w-5 mr-2" />
                    Deletion Operations
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-red-700">1. Delete from Beginning</h5>
                      <p className="text-sm text-gray-600 mb-2">Update head to next node</p>
                      <div className="bg-white p-3 rounded border text-xs">
                        <div className="text-red-600">Time: O(1) | Space: O(1)</div>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium text-red-700">2. Delete from End</h5>
                      <p className="text-sm text-gray-600 mb-2">Traverse to second last node</p>
                      <div className="bg-white p-3 rounded border text-xs">
                        <div className="text-red-600">Time: O(n) | Space: O(1)</div>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium text-red-700">3. Delete by Value</h5>
                      <p className="text-sm text-gray-600 mb-2">Search and remove node</p>
                      <div className="bg-white p-3 rounded border text-xs">
                        <div className="text-red-600">Time: O(n) | Space: O(1)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Traversal Operations */}
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-blue-800">Traversal & Search</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h4 className="font-semibold mb-3 text-blue-800 flex items-center">
                    <Search className="h-5 w-5 mr-2" />
                    Linear Search
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Traverse from head to find target element
                  </p>
                  <div className="bg-white p-3 rounded border text-xs">
                    <div className="text-blue-600">Time: O(n) | Space: O(1)</div>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                  <h4 className="font-semibold mb-3 text-purple-800 flex items-center">
                    <ArrowRight className="h-5 w-5 mr-2" />
                    Forward Traversal
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Visit each node from head to tail
                  </p>
                  <div className="bg-white p-3 rounded border text-xs">
                    <div className="text-purple-600">Time: O(n) | Space: O(1)</div>
                  </div>
                </div>

                <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
                  <h4 className="font-semibold mb-3 text-indigo-800 flex items-center">
                    <RotateCcw className="h-5 w-5 mr-2" />
                    Reverse Traversal
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Available in doubly linked lists
                  </p>
                  <div className="bg-white p-3 rounded border text-xs">
                    <div className="text-indigo-600">Time: O(n) | Space: O(1)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Complexity Comparison */}
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-blue-800">Time Complexity Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 rounded-lg">
                  <thead>
                    <tr className="bg-blue-600 text-white">
                      <th className="border border-gray-300 px-4 py-3 text-left">Operation</th>
                      <th className="border border-gray-300 px-4 py-3 text-center">Singly LL</th>
                      <th className="border border-gray-300 px-4 py-3 text-center">Doubly LL</th>
                      <th className="border border-gray-300 px-4 py-3 text-center">Array (Comparison)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-green-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Insert at Beginning</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-green-600 font-semibold">O(1)</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-green-600 font-semibold">O(1)</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-red-600">O(n)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Insert at End</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-yellow-600">O(n)</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-green-600 font-semibold">O(1)*</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-green-600 font-semibold">O(1)</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Delete from Beginning</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-green-600 font-semibold">O(1)</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-green-600 font-semibold">O(1)</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-red-600">O(n)</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Search</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-red-600">O(n)</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-red-600">O(n)</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-red-600">O(n)</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Random Access</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-red-600">O(n)</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-red-600">O(n)</td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-green-600 font-semibold">O(1)</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-xs text-gray-600 mt-2">
                  * With tail pointer maintained
                </p>
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
          className="bg-white rounded-lg shadow-lg p-8 mb-8"
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
              <Code className="h-5 w-5 text-white" />
            </div>
            Implementation & Code Examples
          </h2>

          <div className="space-y-8">
            {/* Node Structure */}
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-blue-800">Node Structure Definition</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {/* JavaScript/TypeScript */}
                <div>
                  <h4 className="font-semibold mb-3 text-yellow-600">JavaScript/TypeScript</h4>
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
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
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
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
              <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
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
              <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
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
          className="grid md:grid-cols-2 gap-8 mb-8"
        >
          {/* Advantages */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-semibold mb-4 text-green-600 flex items-center">
              <Plus className="h-6 w-6 mr-2" />
              Advantages
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Dynamic Size:</strong> Can grow or shrink during runtime</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Efficient Insertion/Deletion:</strong> O(1) at beginning</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Memory Efficient:</strong> Allocates memory as needed</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>No Memory Waste:</strong> Uses exact memory required</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Implementation Flexibility:</strong> Easy to implement stacks, queues</span>
              </li>
            </ul>
          </div>

          {/* Disadvantages */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-semibold mb-4 text-red-600 flex items-center">
              <Minus className="h-6 w-6 mr-2" />
              Disadvantages
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>No Random Access:</strong> Cannot directly access elements by index</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Extra Memory:</strong> Additional memory for storing pointers</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Sequential Access:</strong> Must traverse from beginning</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Cache Performance:</strong> Poor locality of reference</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
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
          className="bg-white rounded-lg shadow-lg p-8 mb-8"
        >
          <h3 className="text-2xl font-semibold mb-6 text-blue-800">Real-World Applications</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Web Browsers</h4>
              <p className="text-sm text-gray-700">
                Browser history navigation using doubly linked lists for forward/back functionality.
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Music Players</h4>
              <p className="text-sm text-gray-700">
                Playlist management with next/previous song navigation and shuffle features.
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-2">Undo Operations</h4>
              <p className="text-sm text-gray-700">
                Text editors and IDEs use linked lists to implement undo/redo functionality.
              </p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-2">Process Scheduling</h4>
              <p className="text-sm text-gray-700">
                Operating systems use circular linked lists for round-robin scheduling.
              </p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-800 mb-2">Social Networks</h4>
              <p className="text-sm text-gray-700">
                Friend suggestions and social graphs using linked list structures.
              </p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
              <h4 className="font-semibold text-indigo-800 mb-2">Memory Management</h4>
              <p className="text-sm text-gray-700">
                Dynamic memory allocation systems use linked lists to track free memory blocks.
              </p>
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
          <Link href="/data-structures/arrays/theory" className="flex items-center text-blue-600 hover:text-blue-700">
            ← Arrays Theory
          </Link>
          <Link href="/data-structures/linked-lists/simulation" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Try Interactive Simulation →
          </Link>
        </motion.div>
      </div>
    </div>
  );
}