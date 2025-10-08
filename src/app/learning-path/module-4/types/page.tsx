'use client';

import { motion } from 'framer-motion';
import { Layers, Eye, CheckCircle, Info, ArrowRight, BarChart3, Brain } from 'lucide-react';
import { LinkedListDecisionFlowchart } from '@/components/interactive/LinkedListDecisionFlowchart';
import { useState } from 'react';
import { ModuleLayout } from '@/components/layouts/ModuleLayout';
import { SectionProgressIndicator } from '@/components/progress/SectionProgressIndicator';
import Link from 'next/link';
import { QuizCard } from '@/components/interactive/QuizCard';

const linkedListTypes = [
  {
    name: 'Singly Linked List',
    description: 'Each node contains data and a pointer to the next node',
    structure: ['Data', '→ Next'],
    advantages: ['Dynamic size', 'Memory efficient', 'Easy insertion/deletion'],
    disadvantages: ['No backward traversal', 'Extra memory for pointers'],
    useCase: 'Implementation of stacks, queues, and simple lists',
    color: 'bg-blue-100 text-blue-800 border-blue-200'
  },
  {
    name: 'Doubly Linked List',
    description: 'Each node has pointers to both next and previous nodes',
    structure: ['← Prev', 'Data', 'Next →'],
    advantages: ['Bidirectional traversal', 'Easy deletion', 'Navigation flexibility'],
    disadvantages: ['Extra memory overhead', 'More complex operations'],
    useCase: 'Browser history, music playlists, undo functionality',
    color: 'bg-green-100 text-green-800 border-green-200'
  },
  {
    name: 'Circular Linked List',
    description: 'Last node points back to the first node, forming a circle',
    structure: ['Node1 → Node2 → ... → NodeN ↺'],
    advantages: ['Efficient round-robin scheduling', 'No NULL pointers', 'Continuous traversal'],
    disadvantages: ['Infinite loop risk', 'Complex termination conditions'],
    useCase: 'Round-robin CPU scheduling, multiplayer games',
    color: 'bg-purple-100 text-purple-800 border-purple-200'
  }
];

export default function LinkedListTypesPage() {
  // Scroll spy will handle active section highlight; keep minimal state only if needed later

  const sections = [
    { id: 'types', name: 'Types', icon: Layers },
    { id: 'visual', name: 'Visual', icon: Eye },
    { id: 'comparison', name: 'Comparison', icon: BarChart3 },
    { id: 'decision', name: 'Decision Guide', icon: Brain },
    { id: 'flowchart', name: 'Flowchart', icon: Brain },
  ];

  return (
    <ModuleLayout
      moduleId="module-4"
      moduleTitle="Module 4: Linked Lists"
      moduleDescription="Different list variants"
      sections={sections}
      enableScrollSpy
      backUrl="/learning-path/module-4"
      estimatedTime="18 minutes"
      difficulty="Intermediate"
      totalSections={sections.length}
      currentSectionIndex={0}
    >
      <motion.div
        id="types"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12 text-gray-700"
      >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 text-gray-700"
          >
            <div className="inline-flex items-center bg-indigo-100 text-indigo-800 px-6 py-3 rounded-full text-sm font-medium mb-8">
              <Layers className="w-5 h-5 mr-2 text-gray-700" />
              Module 4 · Types of Linked Lists
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-8">
              Explore Different
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 text-gray-600">
                Linked List Types
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Each type of linked list serves specific purposes. Master the differences between singly, doubly, 
              and circular variants to choose the right tool for your data structure needs.
            </p>
          </motion.div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border text-gray-700">
            <div className="flex items-center justify-between mb-8 text-gray-700">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                <Layers className="w-8 h-8 mr-3 text-indigo-600" />
                Comprehensive Type Guide
              </h2>
              <SectionProgressIndicator moduleId="linked-lists" sectionId="types-overview" />
            </div>
            
            <div className="mb-8 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200 text-white">
              <h3 className="text-lg font-semibold text-indigo-900 mb-3">🎯 Understanding the Evolution</h3>
              <p className="text-indigo-800 text-sm leading-relaxed">
                Linked lists evolved to solve different problems. Singly linked lists handle basic dynamic storage, 
                doubly linked lists enable bidirectional traversal, and circular lists create endless loops for 
                scheduling and continuous processing tasks.
              </p>
            </div>
            
            <div className="grid gap-8 text-gray-700">
              {linkedListTypes.map((type, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className={`border-2 rounded-xl p-8 ${type.color} hover:shadow-lg transition-all duration-300`}
                >
                  <div className="grid lg:grid-cols-4 gap-6 text-gray-700">
                    <div className="lg:col-span-2 text-gray-700">
                      <div className="flex items-center mb-4 text-gray-700">
                        <h3 className="text-2xl font-bold mr-3 text-gray-800">{type.name}</h3>
                        <span className="text-sm bg-white bg-opacity-70 px-3 py-1 rounded-full font-medium text-gray-600">
                          Type #{index + 1}
                        </span>
                      </div>
                      <p className="mb-6 leading-relaxed text-base text-gray-700">{type.description}</p>
                      
                      <div className="mb-6 text-gray-700">
                        <h4 className="font-semibold mb-3 text-lg text-gray-800">📋 Node Structure:</h4>
                        <div className="bg-white bg-opacity-50 p-4 rounded-lg text-gray-700">
                          <div className="flex flex-wrap gap-2 mb-3 text-gray-700">
                            {type.structure.map((part, partIndex) => (
                              <span key={partIndex} className="px-4 py-2 bg-white rounded-lg text-sm font-mono shadow-sm border text-gray-600">
                                {part}
                              </span>
                            ))}
                          </div>
                          <div className="text-xs opacity-75 text-gray-600">Each node contains these components</div>
                        </div>
                      </div>
                      
                      <div className="mb-6 text-gray-700">
                        <h4 className="font-semibold mb-3 text-lg text-gray-800">🎯 Primary Use Cases:</h4>
                        <div className="bg-white bg-opacity-50 p-4 rounded-lg text-gray-700">
                          <p className="text-sm leading-relaxed text-gray-600">{type.useCase}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-4 text-green-800 text-lg flex items-center">
                        ✅ Advantages
                      </h4>
                      <ul className="space-y-3 text-gray-700">
                        {type.advantages.map((adv, advIndex) => (
                          <li key={advIndex} className="flex items-start text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 mr-3 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="leading-relaxed text-gray-600">{adv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-4 text-red-800 text-lg flex items-center">
                        ⚠️ Trade-offs
                      </h4>
                      <ul className="space-y-3 text-gray-700">
                        {type.disadvantages.map((dis, disIndex) => (
                          <li key={disIndex} className="flex items-start text-sm text-gray-600">
                            <Info className="w-4 h-4 mr-3 text-red-600 mt-0.5 flex-shrink-0" />
                            <span className="leading-relaxed text-gray-600">{dis}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-white border-opacity-30 text-gray-700">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span className="font-semibold text-gray-800">Memory Overhead:</span>
                      <span className="px-3 py-1 bg-white bg-opacity-70 rounded-full font-mono text-gray-600">
                        {index === 0 ? '1 pointer/node' : index === 1 ? '2 pointers/node' : '1 pointer/node + loop'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          
        {/* Visual section always rendered so navigation works by scroll */}
        <div id="visual" className="bg-white rounded-2xl p-8 shadow-lg border text-gray-700">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Eye className="w-8 h-8 mr-3 text-teal-600" />
            Visual Representations
          </h2>
          <p className="text-sm text-gray-600 mb-6">Visualizing layout helps internalize pointer direction and structural differences.</p>
          <div className="grid gap-12 text-gray-700">
            {/* Singly */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 text-white">
              <h3 className="text-xl font-semibold text-blue-900 mb-6">Singly Linked List</h3>
              <div className="flex items-center justify-center space-x-4 mb-4 text-gray-700">
                <div className="text-sm text-blue-700">HEAD</div>
                {['Node1','Node2','Node3'].map((node,idx)=>(
                  <div key={idx} className="flex items-center text-gray-700">
                    <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md border-2 border-blue-600 text-white">
                      <div className="text-sm font-semibold text-gray-600">{node}</div>
                      <div className="text-xs text-gray-600">Data | Next</div>
                    </div>
                    {idx<2 && <ArrowRight className="w-6 h-6 text-blue-600 mx-2" />}
                  </div>
                ))}
                <div className="text-sm text-blue-700">NULL</div>
              </div>
              <p className="text-xs text-blue-700 text-center">Linear forward-only chain.</p>
            </div>
            {/* Doubly */}
            <div className="bg-green-50 p-6 rounded-xl border border-green-200 text-gray-700">
              <h3 className="text-xl font-semibold text-green-900 mb-6">Doubly Linked List</h3>
              <div className="flex items-center justify-center space-x-2 mb-4 text-gray-700">
                <div className="text-sm text-green-700">HEAD</div>
                {['Node1','Node2','Node3'].map((node,idx)=>(
                  <div key={idx} className="flex items-center text-gray-700">
                    <div className="bg-green-500 text-white p-3 rounded-lg shadow-md border-2 border-green-600 text-gray-700">
                      <div className="text-xs font-semibold text-gray-600">{node}</div>
                      <div className="text-xs text-gray-600">Prev|Data|Next</div>
                    </div>
                    {idx<2 && <div className="flex flex-col items-center mx-1 text-gray-700">
                      <ArrowRight className="w-4 h-4 text-green-600" />
                      <ArrowRight className="w-4 h-4 text-green-600 rotate-180" />
                    </div>}
                  </div>
                ))}
                <div className="text-sm text-green-700">NULL</div>
              </div>
              <p className="text-xs text-green-700 text-center">Bidirectional traversal enabled by prev pointers.</p>
            </div>
            {/* Circular */}
            <div className="bg-purple-50 p-6 rounded-xl border border-purple-200 text-gray-700">
              <h3 className="text-xl font-semibold text-purple-900 mb-6">Circular Linked List</h3>
              <div className="flex items-center justify-center mb-4 text-gray-700">
                <div className="flex items-center space-x-4 text-gray-700">
                  {['Node1','Node2','Node3','Node4'].map((node,idx)=>(
                    <div key={idx} className="flex items-center text-gray-700">
                      <div className="bg-purple-500 text-white p-3 rounded-lg shadow-md border-2 border-purple-600 text-gray-700">
                        <div className="text-xs font-semibold text-gray-600">{node}</div>
                        <div className="text-xs text-gray-600">Data | Next</div>
                      </div>
                      {idx<3 && <ArrowRight className="w-4 h-4 text-purple-600 mx-2" />}
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-xs text-purple-700 text-center">Tail points back to head forming a loop.</p>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div id="comparison" className="bg-white rounded-2xl p-8 shadow-lg border text-gray-700">
          <div className="flex items-center justify-between mb-6 text-gray-700">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center"><BarChart3 className="w-8 h-8 mr-3 text-blue-600" />Comparison</h2>
            <SectionProgressIndicator moduleId="linked-lists" sectionId="types-comparison" />
          </div>
          <div className="overflow-x-auto text-gray-700">
            <table className="w-full text-left border-collapse text-sm text-gray-600">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="px-4 py-3 border text-gray-700">Aspect</th>
                  <th className="px-4 py-3 border text-gray-700">Singly</th>
                  <th className="px-4 py-3 border text-gray-700">Doubly</th>
                  <th className="px-4 py-3 border text-gray-700">Circular</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Extra Pointers','1 (next)','2 (prev,next)','1 (next)'],
                  ['Backward Traversal','No','Yes','Depends (if doubly circular)'],
                  ['Insert @ Head','O(1)','O(1)','O(1)'],
                  ['Insert @ Tail','O(n) or O(1*)','O(1*)','O(1*)','* with tail pointer'],
                  ['Delete Known Node','O(n)','O(1)','O(1)'],
                  ['Typical Use','Simple dynamic list','Navigation, LRU','Scheduling / cycles']
                ].map((row,i)=>(
                  <tr key={i} className={i%2?'bg-gray-50':''}>
                    {row.map((cell,j)=><td key={j} className="px-4 py-3 border text-xs font-mono text-gray-600">{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-gray-600">* Maintain a tail pointer for O(1) tail operations.</p>
        </div>

        {/* Decision Guide */}
        <div id="decision" className="bg-white rounded-2xl p-8 shadow-lg border text-gray-700">
          <div className="flex items-center justify-between mb-6 text-gray-700">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center"><Brain className="w-8 h-8 mr-3 text-purple-600" />Decision Guide</h2>
            <SectionProgressIndicator moduleId="linked-lists" sectionId="types-decision" />
          </div>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 text-white">
              <h3 className="font-semibold mb-2 text-gray-800">Choose Singly When</h3>
              <ul className="space-y-1 list-disc list-inside text-gray-700">
                <li>Memory footprint must be minimal</li>
                <li>Mostly head insert/delete</li>
                <li>Traversal forward-only</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200 text-gray-700">
              <h3 className="font-semibold mb-2 text-gray-800">Choose Doubly When</h3>
              <ul className="space-y-1 list-disc list-inside text-gray-700">
                <li>Need fast backward traversal</li>
                <li>Delete arbitrary nodes frequently</li>
                <li>Implementing LRU / navigation</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-purple-50 to-fuchsia-100 border border-purple-200 text-gray-700">
              <h3 className="font-semibold mb-2 text-gray-800">Choose Circular When</h3>
              <ul className="space-y-1 list-disc list-inside text-gray-700">
                <li>Round-robin scheduling</li>
                <li>Continuous cycling through data</li>
                <li>Need sentinel-like loop behavior</li>
              </ul>
            </div>
          </div>
          <p className="mt-6 text-xs text-gray-600">Circular + doubly can be combined for a doubly circular list in some advanced scenarios.</p>
        </div>

        {/* Flowchart Section */}
        <div id="flowchart" className="bg-white rounded-2xl p-8 shadow-lg border text-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center">
              <Brain className="w-8 h-8 mr-3 text-indigo-600" />
              Selection Flowchart
            </h2>
            <SectionProgressIndicator moduleId="linked-lists" sectionId="types-decision-flowchart" />
          </div>
          <p className="text-sm text-gray-600 mb-6 max-w-3xl">
            Use this quick visual to decide whether a basic array suffices or a linked list variant (or advanced form)
            is justified. Always begin with the simplest structure that meets performance requirements—upgrade only after
            profiling reveals a clear bottleneck.
          </p>
          <LinkedListDecisionFlowchart />
          <div className="mt-6 grid md:grid-cols-3 gap-4 text-[11px] text-gray-600">
            <div className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 border rounded">Prefer arrays for dense data, predictable size growth, and frequent indexing.</div>
            <div className="p-3 bg-gradient-to-br from-blue-50 to-cyan-50 border rounded">Pick singly lists when modifications cluster at the head and memory footprint matters.</div>
            <div className="p-3 bg-gradient-to-br from-purple-50 to-pink-50 border rounded">Explore advanced variants only after measuring real-world performance gaps.</div>
          </div>
        </div>

        {/* Advanced Variants */}
        <div id="advanced-variants" className="bg-white rounded-2xl p-8 shadow-lg border text-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Advanced Variants & Specialized Lists</h2>
            <SectionProgressIndicator moduleId="linked-lists" sectionId="types-advanced-variants" />
          </div>
          <p className="text-sm text-gray-600 mb-8 max-w-3xl">Beyond the classic three, engineers and researchers adapt linked list concepts to improve cache locality, enhance search efficiency, or reduce overhead in special domains.</p>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Skip List */}
            <div className="border rounded-xl p-5 bg-gradient-to-br from-blue-50 to-cyan-50">
              <h3 className="font-semibold text-blue-800 mb-2">Skip List</h3>
              <p className="text-xs text-gray-600 mb-3 leading-relaxed">Multiple forward pointer “express lanes” layered on a sorted singly list enabling <span className="font-mono">O(log n)</span> expected search/insertion.</p>
              <ul className="text-[11px] text-blue-700 space-y-1 mb-3 list-disc list-inside">
                <li>Probabilistic balancing</li>
                <li>Alternative to balanced trees</li>
                <li>Great for concurrent access</li>
              </ul>
              <div className="text-[10px] font-mono bg-white/70 px-2 py-1 rounded inline-block">Search ≈ log n</div>
            </div>
            {/* Unrolled List */}
            <div className="border rounded-xl p-5 bg-gradient-to-br from-indigo-50 to-purple-50">
              <h3 className="font-semibold text-indigo-800 mb-2">Unrolled Linked List</h3>
              <p className="text-xs text-gray-600 mb-3 leading-relaxed">Each node stores an array (block) of elements to improve cache locality and reduce pointer overhead.</p>
              <ul className="text-[11px] text-indigo-700 space-y-1 mb-3 list-disc list-inside">
                <li>Better cache utilization</li>
                <li>Fewer allocations</li>
                <li>Good for large text buffers</li>
              </ul>
              <div className="text-[10px] font-mono bg-white/70 px-2 py-1 rounded inline-block">Block size tuned empirically</div>
            </div>
            {/* XOR List */}
            <div className="border rounded-xl p-5 bg-gradient-to-br from-amber-50 to-yellow-50">
              <h3 className="font-semibold text-amber-800 mb-2">XOR Linked List</h3>
              <p className="text-xs text-gray-600 mb-3 leading-relaxed">Stores XOR(prev, next) to cut pointer memory in half. Traversal requires previous address at each step.</p>
              <ul className="text-[11px] text-amber-700 space-y-1 mb-3 list-disc list-inside">
                <li>Space optimization trick</li>
                <li>Hard to debug</li>
                <li>Unsafe in GC languages</li>
              </ul>
              <div className="text-[10px] font-mono bg-white/70 px-2 py-1 rounded inline-block">Mostly educational</div>
            </div>
            {/* Intrusive List */}
            <div className="border rounded-xl p-5 bg-gradient-to-br from-green-50 to-emerald-50">
              <h3 className="font-semibold text-emerald-800 mb-2">Intrusive List</h3>
              <p className="text-xs text-gray-600 mb-3 leading-relaxed">Nodes embed linkage fields inside host objects—no wrapper node allocation.</p>
              <ul className="text-[11px] text-emerald-700 space-y-1 mb-3 list-disc list-inside">
                <li>Zero extra allocations</li>
                <li>Used in kernels (Linux)</li>
                <li>Manual lifecycle management</li>
              </ul>
              <div className="text-[10px] font-mono bg-white/70 px-2 py-1 rounded inline-block">Perf-critical systems</div>
            </div>
            {/* Rope */}
            <div className="border rounded-xl p-5 bg-gradient-to-br from-rose-50 to-pink-50">
              <h3 className="font-semibold text-rose-800 mb-2">Rope (Hybrid)</h3>
              <p className="text-xs text-gray-600 mb-3 leading-relaxed">Tree/list hybrid for huge strings or text editors; concatenation & splits in logarithmic time.</p>
              <ul className="text-[11px] text-rose-700 space-y-1 mb-3 list-disc list-inside">
                <li>Balanced node blocks</li>
                <li>Ideal for large edits</li>
                <li>Non-linear traversal cost</li>
              </ul>
              <div className="text-[10px] font-mono bg-white/70 px-2 py-1 rounded inline-block">Used in editors</div>
            </div>
            {/* Lock-Free */}
            <div className="border rounded-xl p-5 bg-gradient-to-br from-slate-50 to-gray-100">
              <h3 className="font-semibold text-gray-800 mb-2">Lock-Free List</h3>
              <p className="text-xs text-gray-600 mb-3 leading-relaxed">Uses atomic compare-and-swap primitives to avoid coarse locks in concurrent environments.</p>
              <ul className="text-[11px] text-gray-700 space-y-1 mb-3 list-disc list-inside">
                <li>Scales under contention</li>
                <li>Complex ABA pitfalls</li>
                <li>Requires memory reclamation scheme</li>
              </ul>
              <div className="text-[10px] font-mono bg-white/70 px-2 py-1 rounded inline-block">Advanced concurrency</div>
            </div>
          </div>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-gray-50 border">
              <h4 className="font-semibold text-gray-800 mb-2">Why Not Always These?</h4>
              <ul className="text-[11px] text-gray-600 space-y-1 list-disc list-inside">
                <li>Extra complexity rarely justified</li>
                <li>Harder maintenance & onboarding cost</li>
                <li>Modern hardware favors contiguous arrays</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-indigo-50 border border-indigo-200">
              <h4 className="font-semibold text-indigo-800 mb-2">When to Explore</h4>
              <ul className="text-[11px] text-indigo-700 space-y-1 list-disc list-inside">
                <li>Performance profiling reveals pointer overhead</li>
                <li>Frequent middle insertions & large datasets</li>
                <li>Special memory constraints (embedded / kernel)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Types Quiz */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border mt-12 text-gray-700" id="types-quiz">
          <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-900">
            <Brain className="w-6 h-6 mr-2 text-indigo-600" /> Quick Type Differentiation Quiz
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <QuizCard
              question="When is a doubly linked list worth the extra memory?"
              difficulty="medium"
              options={[
                { id: 'A', label: 'When you only insert at the head' },
                { id: 'B', label: 'When backward traversal and frequent deletions of internal nodes are needed', correct: true, explanation: 'Doubly lists enable O(1) deletion given a node and efficient backward navigation.' },
                { id: 'C', label: 'When you never remove nodes' },
                { id: 'D', label: 'To reduce pointer memory' }
              ]}
            />
            <QuizCard
              question="Primary practical risk with circular lists?"
              difficulty="easy"
              options={[
                { id: 'A', label: 'They cannot be iterated' },
                { id: 'B', label: 'Infinite loops if termination is mishandled', correct: true, explanation: 'You must explicitly stop after full cycle; missing termination condition causes endless traversal.' },
                { id: 'C', label: 'They require doubly links' },
                { id: 'D', label: 'Memory cannot be freed' }
              ]}
            />
          </div>
           <div className="flex justify-between items-center mt-8 text-gray-700">
          <Link href="/learning-path/module-4/introduction" className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-600">Previous: Introduction</Link>
          <Link href="/learning-path/module-4/operations" className="px-6 py-3 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 text-gray-300">Next: Operations <ArrowRight className="w-4 h-4 ml-2 text-gray-700" /></Link>
        </div>
        </div>
      </motion.div>
    </ModuleLayout>
  );
}
