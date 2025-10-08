'use client';

import { motion } from 'framer-motion';
import { Target, Database, ArrowRight, Code, Eye, Zap } from 'lucide-react';
import { useState } from 'react';
import { ModuleLayout } from '@/components/layouts/ModuleLayout';
import { SectionProgressIndicator } from '@/components/progress/SectionProgressIndicator';
import Link from 'next/link';

const pointerConcepts = [
  {
    concept: 'Memory Address',
    description: 'Every variable has a location in memory - this location has an address',
    example: 'int x = 42;\nint *ptr = &x;  // ptr stores address of x',
    importance: 'Foundation of dynamic data structures',
    visual: 'Variable x stored at memory address 1000'
  },
  {
    concept: 'Dereferencing',
    description: 'Using * operator to access the value stored at the memory address',
    example: 'int value = *ptr;  // Gets value 42\n*ptr = 100;       // Changes x to 100',
    importance: 'Read/write data through pointers',
    visual: 'Access the actual data through the pointer'
  },
  {
    concept: 'NULL Pointer',
    description: 'Special pointer value indicating no valid memory location',
    example: 'Node *head = NULL;\nif (head != NULL) {\n    // Safe to use\n}',
    importance: 'Marks list boundaries and prevents crashes',
    visual: 'Points to "nothing" - marks end of list'
  },
  {
    concept: 'Dynamic Allocation',
    description: 'Allocating memory during program execution (runtime)',
    example: 'Node *newNode = malloc(sizeof(Node));\n// or in C++:\nNode *newNode = new Node();',
    importance: 'Enables flexible runtime-sized structures',
    visual: 'Create memory space when needed'
  }
];

export default function LinkedListPointersPage() {
  const [activeSection, setActiveSection] = useState('fundamentals');
  const [currentDemo, setCurrentDemo] = useState(0);

  const sections = [
    { id: 'fundamentals', name: 'Pointer Fundamentals', icon: Target },
    { id: 'memory', name: 'Memory Layout', icon: Database },
    { id: 'interactive', name: 'Interactive Demo', icon: Eye },
    { id: 'preparation', name: 'Ready for Lists', icon: Zap },
  ];

  return (
    <ModuleLayout
      moduleId="module-4"
      moduleTitle="Module 4: Linked Lists"
      moduleDescription="Pointers & memory model"
      sections={sections}
      activeSection={activeSection}
      onSectionChange={(id)=>{ setActiveSection(id); const el=document.getElementById(id); if(el){ el.scrollIntoView({behavior:'smooth'});} }}
      backUrl="/learning-path/module-4"
      estimatedTime="15 minutes"
      difficulty="Intermediate"
      totalSections={sections.length}
      currentSectionIndex={sections.findIndex(s => s.id === activeSection)}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 text-gray-700"
      >
        <div className="inline-flex items-center bg-purple-100 text-purple-800 px-6 py-3 rounded-full text-sm font-medium mb-8">
          <Target className="w-5 h-5 mr-2 text-gray-700" />
          Module 4 · Pointers & Memory Fundamentals
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-8">
          Master
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 text-gray-600">
            Pointers & Memory
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Before diving into linked lists, we need to understand pointers - the building blocks that make dynamic data structures possible. Master these fundamentals first!
        </p>
      </motion.div>

      <motion.div
        id="fundamentals"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12 text-gray-700"
      >
          <div className="bg-white rounded-2xl p-8 shadow-lg border text-gray-700">
            <div className="flex items-center justify-between mb-8 text-gray-700">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                <Target className="w-8 h-8 mr-3 text-purple-600" />
                Pointer Fundamentals
              </h2>
              <SectionProgressIndicator moduleId="linked-lists" sectionId="pointers-overview" />
            </div>
            <div className="mb-8 bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-200 text-gray-700">
              <h3 className="text-lg font-semibold text-purple-900 mb-3">🎯 Why Start with Pointers?</h3>
              <p className="text-purple-800 text-sm leading-relaxed">
                Linked lists are built entirely on pointer relationships. Without understanding how pointers work, 
                memory addresses, and dynamic allocation, linked list operations will seem like magic. Let&apos;s demystify it!
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-8 text-gray-700">
              {pointerConcepts.map((concept, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-200 text-gray-700"
                >
                  <h3 className="text-xl font-bold text-purple-900 mb-3">{concept.concept}</h3>
                  <p className="text-gray-700 mb-4">{concept.description}</p>
                  <div className="bg-white p-4 rounded-lg border mb-4 text-gray-700">
                    <pre className="text-sm text-purple-800 whitespace-pre-wrap font-mono">{concept.example}</pre>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg mb-3 text-gray-700">
                    <h4 className="font-semibold text-purple-900 mb-1">Visual Concept:</h4>
                    <p className="text-purple-800 text-sm">{concept.visual}</p>
                  </div>
                  <div className="bg-indigo-100 p-3 rounded-lg text-gray-700">
                    <h4 className="font-semibold text-indigo-900 mb-1">Why Important:</h4>
                    <p className="text-indigo-800 text-sm">{concept.importance}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div id="memory" className="bg-white rounded-2xl p-8 shadow-lg border text-gray-700">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <Database className="w-8 h-8 mr-3 text-teal-600" />
              Memory Layout Deep Dive
            </h2>
            <div className="mb-8 bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-xl border border-teal-200 text-gray-700">
              <h3 className="text-lg font-semibold text-teal-900 mb-3">🧠 Memory Mental Model</h3>
              <p className="text-teal-800 text-sm leading-relaxed">
                Think of computer memory like a huge apartment building. Each apartment has a unique address (like 0x1000), 
                and can store data. Pointers are like sticky notes that have the address written on them!
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 mb-8 text-gray-700">
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 text-gray-700">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">📍 Variable & Address</h3>
                <div className="space-y-3 text-gray-700">
                  <div className="bg-white p-3 rounded border-2 border-blue-300 text-gray-700">
                    <div className="text-xs text-blue-600 mb-1">Memory Address: 0x1000</div>
                    <div className="text-lg font-bold text-blue-900">int x = 42;</div>
                  </div>
                  <div className="text-center text-xs text-blue-700">
                    Variable x lives at memory address 0x1000<br/>
                    Contains the value 42
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-xl border border-purple-200 text-gray-700">
                <h3 className="text-xl font-semibold text-purple-900 mb-4">👉 Pointer to Variable</h3>
                <div className="space-y-3 text-gray-700">
                  <div className="bg-white p-3 rounded border-2 border-purple-300 text-gray-700">
                    <div className="text-xs text-purple-600 mb-1">Memory Address: 0x2000</div>
                    <div className="text-lg font-bold text-purple-900">int *ptr = &x;</div>
                    <div className="text-sm text-purple-700">stores: 0x1000</div>
                  </div>
                  <div className="text-center text-xs text-purple-700">
                    Pointer ptr stores the address of x<br/>
                    ptr &quot;points to&quot; x
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-6 rounded-xl border border-green-200 text-gray-700">
                <h3 className="text-xl font-semibold text-green-900 mb-4">⭐ Dereferencing</h3>
                <div className="space-y-3 text-gray-700">
                  <div className="bg-white p-3 rounded border-2 border-green-300 text-gray-700">
                    <div className="text-lg font-bold text-green-900">*ptr</div>
                    <div className="text-sm text-green-700">follows pointer to get: 42</div>
                  </div>
                  <div className="text-center text-xs text-green-700">
                    *ptr means &quot;go to address stored in ptr<br/>
                    and get the value there&quot;
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 text-gray-700">
              <div className="bg-teal-50 p-6 rounded-xl border border-teal-200 text-gray-700">
                <h3 className="text-xl font-semibold text-teal-900 mb-4">Arrays: Contiguous Memory</h3>
                <div className="grid grid-cols-4 gap-1 mb-4 text-gray-700">
                  {[
                    {addr: '1000', val: '10'}, 
                    {addr: '1004', val: '20'}, 
                    {addr: '1008', val: '30'}, 
                    {addr: '1012', val: '40'}
                  ].map(({addr, val}, idx) => (
                    <div key={idx} className="text-center text-gray-700">
                      <div className="bg-teal-500 text-white p-2 rounded text-sm font-bold text-gray-600">
                        {val}
                      </div>
                      <div className="text-xs text-teal-700 mt-1">{addr}</div>
                    </div>
                  ))}
                </div>
                <div className="text-center text-xs text-teal-700 bg-teal-100 p-2 rounded">
                  Elements next to each other in memory<br/>
                  Easy to calculate: arr[2] = start_address + 2*sizeof(int)
                </div>
              </div>
              
              <div className="bg-orange-50 p-6 rounded-xl border border-orange-200 text-gray-700">
                <h3 className="text-xl font-semibold text-orange-900 mb-4">Linked Lists: Scattered Memory</h3>
                <div className="space-y-2 mb-4 text-gray-700">
                  {[
                    { data: '10', next: '→ 2048', addr: '1000' },
                    { data: '20', next: '→ 3072', addr: '2048' },
                    { data: '30', next: '→ NULL', addr: '3072' }
                  ].map((node, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-orange-500 text-white p-3 rounded text-gray-700">
                      <span className="text-xs font-mono text-gray-600">@{node.addr}</span>
                      <span className="font-bold text-lg text-gray-800">{node.data}</span>
                      <span className="text-xs font-mono text-gray-600">{node.next}</span>
                    </div>
                  ))}
                </div>
                <div className="text-center text-xs text-orange-700 bg-orange-100 p-2 rounded">
                  Nodes can be anywhere in memory!<br/>
                  Must follow pointers to traverse: O(n) access
                </div>
              </div>
            </div>
          </div>

          <div id="interactive" className="bg-white rounded-2xl p-8 shadow-lg border text-gray-700">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <Eye className="w-8 h-8 mr-3 text-indigo-600" />
              Interactive Pointer Demo
            </h2>
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200 mb-6 text-gray-700">
              <div className="flex items-center justify-between mb-4 text-gray-700">
                <h3 className="text-lg font-semibold text-indigo-900">Step-by-Step Pointer Operations</h3>
                <div className="flex space-x-2 text-gray-700">
                  <button 
                    onClick={() => setCurrentDemo(Math.max(0, currentDemo - 1))}
                    className="px-3 py-1 bg-indigo-200 text-indigo-800 rounded hover:bg-indigo-300 text-sm"
                    disabled={currentDemo === 0}
                  >
                    ← Prev
                  </button>
                  <button 
                    onClick={() => setCurrentDemo(Math.min(3, currentDemo + 1))}
                    className="px-3 py-1 bg-indigo-200 text-indigo-800 rounded hover:bg-indigo-300 text-sm"
                    disabled={currentDemo === 3}
                  >
                    Next →
                  </button>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                <div className="bg-white p-4 rounded-lg border text-gray-700">
                  <h4 className="font-semibold mb-3 text-gray-800">Code Step {currentDemo + 1}/4</h4>
                  <pre className="text-sm font-mono text-gray-800">
                    {[
                      `// Step 1: Create variable
int x = 42;
printf("x = %d", x);`,
                      `// Step 2: Get address  
int x = 42;
printf("Address of x: %p", &x);
// Output: Address of x: 0x1000`,
                      `// Step 3: Create pointer
int x = 42;
int *ptr = &x;
printf("ptr points to: %p", ptr);
// Output: ptr points to: 0x1000`,
                      `// Step 4: Dereference
int x = 42;
int *ptr = &x;
printf("Value at ptr: %d", *ptr);
// Output: Value at ptr: 42`
                    ][currentDemo]}
                  </pre>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg text-gray-700">
                  <h4 className="font-semibold mb-3 text-gray-800">Memory Visualization</h4>
                  <div className="space-y-3 text-gray-700">
                    {currentDemo >= 0 && (
                      <div className="bg-blue-200 p-3 rounded border-2 border-blue-400 text-gray-700">
                        <div className="text-xs text-blue-600">Address: 0x1000</div>
                        <div className="font-mono font-bold text-gray-800">x = 42</div>
                      </div>
                    )}
                    {currentDemo >= 2 && (
                      <div className="bg-purple-200 p-3 rounded border-2 border-purple-400 text-gray-700">
                        <div className="text-xs text-purple-600">Address: 0x2000</div>
                        <div className="font-mono font-bold text-gray-800">ptr = 0x1000</div>
                        <div className="text-xs text-purple-700 mt-1">↑ points to x</div>
                      </div>
                    )}
                    {currentDemo >= 3 && (
                      <div className="bg-green-200 p-3 rounded border-2 border-green-400 text-gray-700">
                        <div className="font-mono font-bold text-gray-800">*ptr → follows pointer → gets 42</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="preparation" className="bg-white rounded-2xl p-8 shadow-lg border text-gray-700">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <Zap className="w-8 h-8 mr-3 text-yellow-600" />
              Ready for Linked Lists!
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-gray-700">
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-200 text-gray-700">
                <h3 className="text-xl font-semibold text-yellow-900 mb-4">🎯 What You&apos;ve Mastered</h3>
                <ul className="space-y-2 text-sm text-yellow-800">
                  <li className="flex items-center text-gray-700"><Code className="w-4 h-4 mr-2 text-gray-700" /> Memory addresses & pointer syntax</li>
                  <li className="flex items-center text-gray-700"><Code className="w-4 h-4 mr-2 text-gray-700" /> Dereferencing with * operator</li>
                  <li className="flex items-center text-gray-700"><Code className="w-4 h-4 mr-2 text-gray-700" /> NULL pointers for boundaries</li>
                  <li className="flex items-center text-gray-700"><Code className="w-4 h-4 mr-2 text-gray-700" /> Dynamic memory allocation</li>
                  <li className="flex items-center text-gray-700"><Code className="w-4 h-4 mr-2 text-gray-700" /> Non-contiguous memory layout</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl border border-green-200 text-gray-700">
                <h3 className="text-xl font-semibold text-green-900 mb-4">🚀 Next: Apply to Linked Lists</h3>
                <p className="text-green-800 text-sm mb-4">
                  Now you understand the foundation! In linked lists, each node will be a dynamically allocated 
                  piece of memory, connected to the next through pointers.
                </p>
                <div className="bg-white p-3 rounded border border-green-300 text-gray-700">
                  <pre className="text-xs font-mono text-green-800">
{`struct Node {
    int data;      // The value
    Node* next;    // Pointer to next node
};`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-8 text-gray-700">
            <Link href="/learning-path/module-4" className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-600">Back to Module Overview</Link>
            <Link href="/learning-path/module-4/introduction" className="px-6 py-3 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 text-gray-300">Next: Introduction <ArrowRight className="w-4 h-4 ml-2 text-gray-700" /></Link>
          </div>
        </motion.div>
    </ModuleLayout>
  );
}
