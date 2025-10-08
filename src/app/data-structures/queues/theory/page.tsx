"use client";
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Code, BookOpen, Zap, Clock, Users, TrendingUp, Shuffle } from 'lucide-react';

export default function QueuesTheoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 text-gray-700">
      <div className="container mx-auto px-4 py-12 text-gray-700">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-gray-700"
        >
          <Link href="/data-structures/queues" className="inline-flex items-center text-queues hover:text-orange-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2 text-gray-700" />
            Back to Queues Overview
          </Link>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-6 text-slate-800">
            Queues Theory
          </h1>
          <p className="text-xl text-secondary max-w-4xl leading-relaxed text-gray-700">
            Master the First-In-First-Out (FIFO) principle and explore different queue types including linear, 
            circular, priority, and double-ended queues used in real-world applications.
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
            <BookOpen className="h-6 w-6 text-queues mr-2 text-gray-700" />
            Quick Navigation
          </h2>
          <div className="grid md:grid-cols-4 gap-4 text-gray-700">
            <a href="#basics" className="flex items-center p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors border border-yellow-200 text-blue-600">
              <div className="w-2 h-2 bg-queues rounded-full mr-3 text-gray-700"></div>
              <span className="text-gray-800 font-medium">FIFO Principle</span>
            </a>
            <a href="#types" className="flex items-center p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors border border-yellow-200 text-blue-600">
              <div className="w-2 h-2 bg-queues rounded-full mr-3 text-gray-700"></div>
              <span className="text-gray-800 font-medium">Queue Types</span>
            </a>
            <a href="#operations" className="flex items-center p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors border border-yellow-200 text-blue-600">
              <div className="w-2 h-2 bg-queues rounded-full mr-3 text-gray-700"></div>
              <span className="text-gray-800 font-medium">Operations</span>
            </a>
            <a href="#implementation" className="flex items-center p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors border border-yellow-200 text-blue-600">
              <div className="w-2 h-2 bg-queues rounded-full mr-3 text-gray-700"></div>
              <span className="text-gray-800 font-medium">Implementation</span>
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
              <Users className="h-8 w-8 text-queues mr-3 text-gray-700" />
              Queue Fundamentals
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 text-gray-700">
              <div>
                <h3 className="text-xl font-semibold text-heading-secondary mb-4 text-gray-800">What is a Queue?</h3>
                <p className="text-secondary mb-4 text-gray-700">
                  A queue is a linear data structure that follows the First-In-First-Out (FIFO) principle. 
                  Think of it like a line of people waiting - the first person to join is the first to be served.
                </p>
                <ul className="space-y-2 text-secondary text-gray-700">
                  <li>• Elements are added at the rear (enqueue)</li>
                  <li>• Elements are removed from the front (dequeue)</li>
                  <li>• The first element added is the first one to be removed</li>
                  <li>• Access is restricted to front and rear elements only</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 p-6 rounded-lg text-gray-700">
                <h3 className="text-xl font-semibold text-heading-secondary mb-4 text-gray-800">Key Characteristics</h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-center text-gray-700">
                    <Clock className="h-5 w-5 text-queues mr-2 text-gray-700" />
                    <span className="text-secondary text-gray-600">O(1) enqueue and dequeue operations</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <TrendingUp className="h-5 w-5 text-queues mr-2 text-gray-700" />
                    <span className="text-secondary text-gray-600">FIFO ordering principle</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Zap className="h-5 w-5 text-queues mr-2 text-gray-700" />
                    <span className="text-secondary text-gray-600">Efficient for sequential processing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Queue Types Section */}
        <motion.section
          id="types"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12 text-gray-700"
        >
          <div className="bg-white rounded-lg shadow-lg p-8 text-gray-700">
            <h2 className="text-3xl font-bold text-heading-primary mb-6 flex items-center text-slate-800">
              <Shuffle className="h-8 w-8 text-queues mr-3 text-gray-700" />
              Types of Queues
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 text-gray-700">
              {/* Linear Queue */}
              <div className="bg-blue-50 p-6 rounded-lg text-black">
                <h3 className="text-xl font-semibold text-heading-secondary mb-4 text-gray-800">Linear Queue</h3>
                <p className="text-secondary mb-4 text-gray-700">
                  Basic queue implementation where elements are stored in a linear fashion.
                </p>
                <div className="space-y-2 text-sm text-secondary text-gray-600">
                  <div>• Simple array or linked list implementation</div>
                  <div>• Front and rear pointers track positions</div>
                  <div>• Can suffer from false overflow in array implementation</div>
                  <div>• Used in: CPU scheduling, print spooling</div>
                </div>
              </div>

              {/* Circular Queue */}
              <div className="bg-green-50 p-6 rounded-lg text-gray-700">
                <h3 className="text-xl font-semibold text-heading-secondary mb-4 text-gray-800">Circular Queue</h3>
                <p className="text-secondary mb-4 text-gray-700">
                  Queue where the rear connects to the front, forming a circle.
                </p>
                <div className="space-y-2 text-sm text-secondary text-gray-600">
                  <div>• Efficient memory utilization</div>
                  <div>• Rear pointer wraps around to beginning</div>
                  <div>• Eliminates false overflow problem</div>
                  <div>• Used in: Buffer management, CPU scheduling</div>
                </div>
              </div>

              {/* Priority Queue */}
              <div className="bg-purple-50 p-6 rounded-lg text-gray-700">
                <h3 className="text-xl font-semibold text-heading-secondary mb-4 text-gray-800">Priority Queue</h3>
                <p className="text-secondary mb-4 text-gray-700">
                  Elements are served based on priority, not insertion order.
                </p>
                <div className="space-y-2 text-sm text-secondary text-gray-600">
                  <div>• Higher priority elements dequeued first</div>
                  <div>• Can be implemented using heaps</div>
                  <div>• FIFO for elements with same priority</div>
                  <div>• Used in: Dijkstra&apos;s algorithm, task scheduling</div>
                </div>
              </div>

              {/* Double-Ended Queue (Deque) */}
              <div className="bg-orange-50 p-6 rounded-lg text-gray-700">
                <h3 className="text-xl font-semibold text-heading-secondary mb-4 text-gray-800">Double-Ended Queue (Deque)</h3>
                <p className="text-secondary mb-4 text-gray-700">
                  Allows insertion and deletion at both front and rear ends.
                </p>
                <div className="space-y-2 text-sm text-secondary text-gray-600">
                  <div>• Operations at both ends</div>
                  <div>• Can function as both stack and queue</div>
                  <div>• More flexible than regular queues</div>
                  <div>• Used in: Palindrome checking, sliding window</div>
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
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12 text-gray-700"
        >
          <div className="bg-white rounded-lg shadow-lg p-8 text-gray-700">
            <h2 className="text-3xl font-bold text-heading-primary mb-6 flex items-center text-slate-800">
              <Code className="h-8 w-8 text-queues mr-3 text-gray-700" />
              Core Operations
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 text-gray-700">
              <div className="space-y-6 text-gray-700">
                <div className="border-l-4 border-queues pl-4 text-gray-700">
                  <h3 className="text-lg font-semibold text-heading-secondary text-gray-800">Enqueue Operation</h3>
                  <p className="text-secondary mt-2 text-gray-700">Add an element to the rear of the queue</p>
                  <div className="bg-gray-50 p-3 rounded-lg mt-2 text-gray-700">
                    <code className="text-sm text-gray-600">
                      queue.enqueue(element)<br/>
                      Time: O(1) | Space: O(1)
                    </code>
                  </div>
                </div>
                
                <div className="border-l-4 border-queues pl-4 text-gray-700">
                  <h3 className="text-lg font-semibold text-heading-secondary text-gray-800">Dequeue Operation</h3>
                  <p className="text-secondary mt-2 text-gray-700">Remove and return element from the front</p>
                  <div className="bg-gray-50 p-3 rounded-lg mt-2 text-gray-700">
                    <code className="text-sm text-gray-600">
                      element = queue.dequeue()<br/>
                      Time: O(1) | Space: O(1)
                    </code>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6 text-gray-700">
                <div className="border-l-4 border-queues pl-4 text-gray-700">
                  <h3 className="text-lg font-semibold text-heading-secondary text-gray-800">Front/Peek Operation</h3>
                  <p className="text-secondary mt-2 text-gray-700">View the front element without removing it</p>
                  <div className="bg-gray-50 p-3 rounded-lg mt-2 text-gray-700">
                    <code className="text-sm text-gray-600">
                      element = queue.front()<br/>
                      Time: O(1) | Space: O(1)
                    </code>
                  </div>
                </div>
                
                <div className="border-l-4 border-queues pl-4 text-gray-700">
                  <h3 className="text-lg font-semibold text-heading-secondary text-gray-800">isEmpty Operation</h3>
                  <p className="text-secondary mt-2 text-gray-700">Check if the queue has no elements</p>
                  <div className="bg-gray-50 p-3 rounded-lg mt-2 text-gray-700">
                    <code className="text-sm text-gray-600">
                      boolean = queue.isEmpty()<br/>
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
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-12 text-gray-700"
        >
          <div className="bg-white rounded-lg shadow-lg p-8 text-gray-700">
            <h2 className="text-3xl font-bold text-heading-primary mb-6 text-slate-800">Implementation Methods</h2>
            
            <div className="space-y-8 text-gray-700">
              {/* Array Implementation */}
              <div className="bg-yellow-50 p-6 rounded-lg text-gray-700">
                <h3 className="text-xl font-semibold text-heading-secondary mb-4 text-gray-800">Array Implementation (Circular Queue)</h3>
                <div className="bg-white p-4 rounded-lg mb-4 overflow-x-auto text-gray-700">
                  <pre className="text-sm text-gray-600">
                    <code>{`class CircularQueue {
  constructor(capacity = 100) {
    this.items = new Array(capacity);
    this.front = -1;
    this.rear = -1;
    this.capacity = capacity;
    this.size = 0;
  }
  
  enqueue(element) {
    if (this.isFull()) {
      throw new Error("Queue Overflow");
    }
    
    if (this.isEmpty()) {
      this.front = 0;
      this.rear = 0;
    } else {
      this.rear = (this.rear + 1) % this.capacity;
    }
    
    this.items[this.rear] = element;
    this.size++;
  }
  
  dequeue() {
    if (this.isEmpty()) {
      throw new Error("Queue Underflow");
    }
    
    const element = this.items[this.front];
    this.items[this.front] = null;
    
    if (this.size === 1) {
      this.front = -1;
      this.rear = -1;
    } else {
      this.front = (this.front + 1) % this.capacity;
    }
    
    this.size--;
    return element;
  }
  
  front() {
    return this.isEmpty() ? null : this.items[this.front];
  }
  
  isEmpty() {
    return this.size === 0;
  }
  
  isFull() {
    return this.size === this.capacity;
  }
}`}</code>
                  </pre>
                </div>
                <div className="text-sm text-secondary text-gray-600">
                  <strong>Pros:</strong> Fixed memory, cache-friendly, O(1) operations<br/>
                  <strong>Cons:</strong> Fixed size, potential overflow
                </div>
              </div>
              
              {/* Linked List Implementation */}
              <div className="bg-blue-50 p-6 rounded-lg text-white">
                <h3 className="text-xl font-semibold text-heading-secondary mb-4 text-gray-800">Linked List Implementation</h3>
                <div className="bg-white p-4 rounded-lg mb-4 overflow-x-auto text-gray-700">
                  <pre className="text-sm text-gray-600">
                    <code>{`class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedQueue {
  constructor() {
    this.front = null;
    this.rear = null;
    this.size = 0;
  }
  
  enqueue(element) {
    const newNode = new Node(element);
    
    if (this.isEmpty()) {
      this.front = newNode;
      this.rear = newNode;
    } else {
      this.rear.next = newNode;
      this.rear = newNode;
    }
    
    this.size++;
  }
  
  dequeue() {
    if (this.isEmpty()) {
      throw new Error("Queue Underflow");
    }
    
    const data = this.front.data;
    this.front = this.front.next;
    
    if (this.front === null) {
      this.rear = null;
    }
    
    this.size--;
    return data;
  }
  
  front() {
    return this.isEmpty() ? null : this.front.data;
  }
  
  isEmpty() {
    return this.front === null;
  }
}`}</code>
                  </pre>
                </div>
                <div className="text-sm text-secondary text-gray-600">
                  <strong>Pros:</strong> Dynamic size, no overflow, memory efficient<br/>
                  <strong>Cons:</strong> Extra memory for pointers, cache misses
                </div>
              </div>

              {/* Priority Queue Implementation */}
              <div className="bg-purple-50 p-6 rounded-lg text-gray-700">
                <h3 className="text-xl font-semibold text-heading-secondary mb-4 text-gray-800">Priority Queue Implementation (Min-Heap)</h3>
                <div className="bg-white p-4 rounded-lg mb-4 overflow-x-auto text-gray-700">
                  <pre className="text-sm text-gray-600">
                    <code>{`class PriorityQueue {
  constructor() {
    this.heap = [];
  }
  
  enqueue(element, priority) {
    const node = { element, priority };
    this.heap.push(node);
    this.heapifyUp(this.heap.length - 1);
  }
  
  dequeue() {
    if (this.isEmpty()) {
      throw new Error("Queue Underflow");
    }
    
    const min = this.heap[0];
    const end = this.heap.pop();
    
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.heapifyDown(0);
    }
    
    return min.element;
  }
  
  heapifyUp(index) {
    const parentIndex = Math.floor((index - 1) / 2);
    
    if (parentIndex >= 0 && 
        this.heap[parentIndex].priority > this.heap[index].priority) {
      [this.heap[parentIndex], this.heap[index]] = 
      [this.heap[index], this.heap[parentIndex]];
      this.heapifyUp(parentIndex);
    }
  }
  
  heapifyDown(index) {
    const leftChild = 2 * index + 1;
    const rightChild = 2 * index + 2;
    let smallest = index;
    
    if (leftChild < this.heap.length && 
        this.heap[leftChild].priority < this.heap[smallest].priority) {
      smallest = leftChild;
    }
    
    if (rightChild < this.heap.length && 
        this.heap[rightChild].priority < this.heap[smallest].priority) {
      smallest = rightChild;
    }
    
    if (smallest !== index) {
      [this.heap[index], this.heap[smallest]] = 
      [this.heap[smallest], this.heap[index]];
      this.heapifyDown(smallest);
    }
  }
  
  isEmpty() {
    return this.heap.length === 0;
  }
}`}</code>
                  </pre>
                </div>
                <div className="text-sm text-secondary text-gray-600">
                  <strong>Time Complexity:</strong> Enqueue O(log n), Dequeue O(log n)<br/>
                  <strong>Use Cases:</strong> Task scheduling, Dijkstra&apos;s algorithm
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Applications Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12 text-gray-700"
        >
          <div className="bg-white rounded-lg shadow-lg p-8 text-gray-700">
            <h2 className="text-3xl font-bold text-heading-primary mb-6 text-slate-800">Real-World Applications</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg text-black">
                <h3 className="text-lg font-semibold text-heading-secondary mb-3 text-gray-800">CPU Scheduling</h3>
                <p className="text-secondary text-sm mb-3 text-gray-600">
                  Operating systems use queues to manage process scheduling and resource allocation.
                </p>
                <div className="text-xs text-secondary text-gray-600">
                  <strong>Example:</strong> Round-robin scheduling, priority scheduling
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg text-gray-700">
                <h3 className="text-lg font-semibold text-heading-secondary mb-3 text-gray-800">Breadth-First Search</h3>
                <p className="text-secondary text-sm mb-3 text-gray-600">
                  BFS algorithm uses queues to explore nodes level by level in graphs and trees.
                </p>
                <div className="text-xs text-secondary text-gray-600">
                  <strong>Example:</strong> Social network analysis, shortest path finding
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-lg text-gray-700">
                <h3 className="text-lg font-semibold text-heading-secondary mb-3 text-gray-800">Print Queue Management</h3>
                <p className="text-secondary text-sm mb-3 text-gray-600">
                  Printers use queues to manage multiple print jobs in the order they were received.
                </p>
                <div className="text-xs text-secondary text-gray-600">
                  <strong>Example:</strong> Office printers, network print servers
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-lg text-gray-700">
                <h3 className="text-lg font-semibold text-heading-secondary mb-3 text-gray-800">Buffer for Data Streams</h3>
                <p className="text-secondary text-sm mb-3 text-gray-600">
                  Handle data transfer between devices with different processing speeds.
                </p>
                <div className="text-xs text-secondary text-gray-600">
                  <strong>Example:</strong> Keyboard buffer, network data streaming
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-lg text-gray-700">
                <h3 className="text-lg font-semibold text-heading-secondary mb-3 text-gray-800">Task Scheduling</h3>
                <p className="text-secondary text-sm mb-3 text-gray-600">
                  Priority queues manage tasks based on urgency and importance in applications.
                </p>
                <div className="text-xs text-secondary text-gray-600">
                  <strong>Example:</strong> Emergency response systems, job schedulers
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-lg text-black">
                <h3 className="text-lg font-semibold text-heading-secondary mb-3 text-gray-800">Web Server Request Handling</h3>
                <p className="text-secondary text-sm mb-3 text-gray-600">
                  Web servers use queues to handle incoming HTTP requests in order.
                </p>
                <div className="text-xs text-secondary text-gray-600">
                  <strong>Example:</strong> Load balancers, request processing pipelines
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex justify-between items-center text-gray-700"
        >
          <Link
            href="/data-structures/queues"
            className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2 text-gray-700" />
            Back to Overview
          </Link>
          
          <Link
            href="/data-structures/queues/simulation"
            className="inline-flex items-center px-6 py-3 bg-queues text-black rounded-lg hover:bg-orange-700 transition-colors text-gray-800"
          >
            Try Interactive Simulation
            <ArrowRight className="h-5 w-5 ml-2 text-gray-700" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
