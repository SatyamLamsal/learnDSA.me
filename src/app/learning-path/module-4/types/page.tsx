'use client';

import { motion } from 'framer-motion';
import { Layers, Eye, CheckCircle, Info, ArrowRight, BarChart3, Brain } from 'lucide-react';
import { useState } from 'react';
import { ModuleLayout } from '@/components/layouts/ModuleLayout';
import { SectionProgressIndicator } from '@/components/progress/SectionProgressIndicator';
import Link from 'next/link';

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
  const [activeSection, setActiveSection] = useState('types');

  const sections = [
    { id: 'types', name: 'Types', icon: Layers },
    { id: 'visual', name: 'Visual', icon: Eye },
    { id: 'comparison', name: 'Comparison', icon: BarChart3 },
    { id: 'decision', name: 'Decision Guide', icon: Brain },
  ];

  return (
    <ModuleLayout
      moduleId="module-4"
      moduleTitle="Module 4: Linked Lists"
      moduleDescription="Different list variants"
      sections={sections}
      activeSection={activeSection}
      onSectionChange={(id)=>{ setActiveSection(id); const el=document.getElementById(id); if(el){ el.scrollIntoView({behavior:'smooth'});} }}
      backUrl="/learning-path/module-4"
      estimatedTime="18 minutes"
      difficulty="Intermediate"
      totalSections={sections.length}
      currentSectionIndex={sections.findIndex(s => s.id === activeSection)}
    >
      <motion.div
        id="types"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-indigo-100 text-indigo-800 px-6 py-3 rounded-full text-sm font-medium mb-8">
              <Layers className="w-5 h-5 mr-2" />
              Module 4 · Types of Linked Lists
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-8">
              Explore Different
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Linked List Types
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Each type of linked list serves specific purposes. Master the differences between singly, doubly, 
              and circular variants to choose the right tool for your data structure needs.
            </p>
          </motion.div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                <Layers className="w-8 h-8 mr-3 text-indigo-600" />
                Comprehensive Type Guide
              </h2>
              <SectionProgressIndicator moduleId="linked-lists" sectionId="types-overview" />
            </div>
            
            <div className="mb-8 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200">
              <h3 className="text-lg font-semibold text-indigo-900 mb-3">🎯 Understanding the Evolution</h3>
              <p className="text-indigo-800 text-sm leading-relaxed">
                Linked lists evolved to solve different problems. Singly linked lists handle basic dynamic storage, 
                doubly linked lists enable bidirectional traversal, and circular lists create endless loops for 
                scheduling and continuous processing tasks.
              </p>
            </div>
            
            <div className="grid gap-8">
              {linkedListTypes.map((type, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className={`border-2 rounded-xl p-8 ${type.color} hover:shadow-lg transition-all duration-300`}
                >
                  <div className="grid lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-2">
                      <div className="flex items-center mb-4">
                        <h3 className="text-2xl font-bold mr-3">{type.name}</h3>
                        <span className="text-sm bg-white bg-opacity-70 px-3 py-1 rounded-full font-medium">
                          Type #{index + 1}
                        </span>
                      </div>
                      <p className="mb-6 leading-relaxed text-base">{type.description}</p>
                      
                      <div className="mb-6">
                        <h4 className="font-semibold mb-3 text-lg">📋 Node Structure:</h4>
                        <div className="bg-white bg-opacity-50 p-4 rounded-lg">
                          <div className="flex flex-wrap gap-2 mb-3">
                            {type.structure.map((part, partIndex) => (
                              <span key={partIndex} className="px-4 py-2 bg-white rounded-lg text-sm font-mono shadow-sm border">
                                {part}
                              </span>
                            ))}
                          </div>
                          <div className="text-xs opacity-75">Each node contains these components</div>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="font-semibold mb-3 text-lg">🎯 Primary Use Cases:</h4>
                        <div className="bg-white bg-opacity-50 p-4 rounded-lg">
                          <p className="text-sm leading-relaxed">{type.useCase}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-4 text-green-800 text-lg flex items-center">
                        ✅ Advantages
                      </h4>
                      <ul className="space-y-3">
                        {type.advantages.map((adv, advIndex) => (
                          <li key={advIndex} className="flex items-start text-sm">
                            <CheckCircle className="w-4 h-4 mr-3 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="leading-relaxed">{adv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-4 text-red-800 text-lg flex items-center">
                        ⚠️ Trade-offs
                      </h4>
                      <ul className="space-y-3">
                        {type.disadvantages.map((dis, disIndex) => (
                          <li key={disIndex} className="flex items-start text-sm">
                            <Info className="w-4 h-4 mr-3 text-red-600 mt-0.5 flex-shrink-0" />
                            <span className="leading-relaxed">{dis}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-white border-opacity-30">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold">Memory Overhead:</span>
                      <span className="px-3 py-1 bg-white bg-opacity-70 rounded-full font-mono">
                        {index === 0 ? '1 pointer/node' : index === 1 ? '2 pointers/node' : '1 pointer/node + loop'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          
        {/* Visual section always rendered so navigation works by scroll */}
        <div id="visual" className="bg-white rounded-2xl p-8 shadow-lg border">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
            <Eye className="w-8 h-8 mr-3 text-teal-600" />
            Visual Representations
          </h2>
          <p className="text-sm text-gray-600 mb-6">Visualizing layout helps internalize pointer direction and structural differences.</p>
          <div className="grid gap-12">
            {/* Singly */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <h3 className="text-xl font-semibold text-blue-900 mb-6">Singly Linked List</h3>
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="text-sm text-blue-700">HEAD</div>
                {['Node1','Node2','Node3'].map((node,idx)=>(
                  <div key={idx} className="flex items-center">
                    <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md border-2 border-blue-600">
                      <div className="text-sm font-semibold">{node}</div>
                      <div className="text-xs">Data | Next</div>
                    </div>
                    {idx<2 && <ArrowRight className="w-6 h-6 text-blue-600 mx-2" />}
                  </div>
                ))}
                <div className="text-sm text-blue-700">NULL</div>
              </div>
              <p className="text-xs text-blue-700 text-center">Linear forward-only chain.</p>
            </div>
            {/* Doubly */}
            <div className="bg-green-50 p-6 rounded-xl border border-green-200">
              <h3 className="text-xl font-semibold text-green-900 mb-6">Doubly Linked List</h3>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="text-sm text-green-700">HEAD</div>
                {['Node1','Node2','Node3'].map((node,idx)=>(
                  <div key={idx} className="flex items-center">
                    <div className="bg-green-500 text-white p-3 rounded-lg shadow-md border-2 border-green-600">
                      <div className="text-xs font-semibold">{node}</div>
                      <div className="text-xs">Prev|Data|Next</div>
                    </div>
                    {idx<2 && <div className="flex flex-col items-center mx-1">
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
            <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
              <h3 className="text-xl font-semibold text-purple-900 mb-6">Circular Linked List</h3>
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center space-x-4">
                  {['Node1','Node2','Node3','Node4'].map((node,idx)=>(
                    <div key={idx} className="flex items-center">
                      <div className="bg-purple-500 text-white p-3 rounded-lg shadow-md border-2 border-purple-600">
                        <div className="text-xs font-semibold">{node}</div>
                        <div className="text-xs">Data | Next</div>
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
        <div id="comparison" className="bg-white rounded-2xl p-8 shadow-lg border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center"><BarChart3 className="w-8 h-8 mr-3 text-blue-600" />Comparison</h2>
            <SectionProgressIndicator moduleId="linked-lists" sectionId="types-comparison" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-3 border">Aspect</th>
                  <th className="px-4 py-3 border">Singly</th>
                  <th className="px-4 py-3 border">Doubly</th>
                  <th className="px-4 py-3 border">Circular</th>
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
                    {row.map((cell,j)=><td key={j} className="px-4 py-3 border text-xs font-mono">{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-gray-600">* Maintain a tail pointer for O(1) tail operations.</p>
        </div>

        {/* Decision Guide */}
        <div id="decision" className="bg-white rounded-2xl p-8 shadow-lg border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center"><Brain className="w-8 h-8 mr-3 text-purple-600" />Decision Guide</h2>
            <SectionProgressIndicator moduleId="linked-lists" sectionId="types-decision" />
          </div>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
              <h3 className="font-semibold mb-2">Choose Singly When</h3>
              <ul className="space-y-1 list-disc list-inside">
                <li>Memory footprint must be minimal</li>
                <li>Mostly head insert/delete</li>
                <li>Traversal forward-only</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200">
              <h3 className="font-semibold mb-2">Choose Doubly When</h3>
              <ul className="space-y-1 list-disc list-inside">
                <li>Need fast backward traversal</li>
                <li>Delete arbitrary nodes frequently</li>
                <li>Implementing LRU / navigation</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-br from-purple-50 to-fuchsia-100 border border-purple-200">
              <h3 className="font-semibold mb-2">Choose Circular When</h3>
              <ul className="space-y-1 list-disc list-inside">
                <li>Round-robin scheduling</li>
                <li>Continuous cycling through data</li>
                <li>Need sentinel-like loop behavior</li>
              </ul>
            </div>
          </div>
          <p className="mt-6 text-xs text-gray-600">Circular + doubly can be combined for a doubly circular list in some advanced scenarios.</p>
        </div>

        <div className="flex justify-between items-center mt-8">
          <Link href="/learning-path/module-4/introduction" className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium">Previous: Introduction</Link>
          <Link href="/learning-path/module-4/operations" className="px-6 py-3 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">Next: Operations <ArrowRight className="w-4 h-4 ml-2" /></Link>
        </div>
      </motion.div>
    </ModuleLayout>
  );
}
