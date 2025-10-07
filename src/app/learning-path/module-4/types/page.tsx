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
          <div className="bg-white rounded-2xl p-8 shadow-lg border">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                <Layers className="w-8 h-8 mr-3 text-indigo-600" />
                Types of Linked Lists
              </h2>
              <SectionProgressIndicator moduleId="linked-lists" sectionId="types-overview" />
            </div>
            <div className="grid gap-8">
              {linkedListTypes.map((type, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className={`border-2 rounded-xl p-6 ${type.color}`}
                >
                  <div className="grid lg:grid-cols-3 gap-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-3">{type.name}</h3>
                      <p className="mb-4 leading-relaxed">{type.description}</p>
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2">Structure:</h4>
                        <div className="flex flex-wrap gap-2">
                          {type.structure.map((part, partIndex) => (
                            <span key={partIndex} className="px-3 py-1 bg-white rounded-full text-sm font-medium">
                              {part}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2">Use Case:</h4>
                        <p className="text-sm">{type.useCase}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-green-800">Advantages:</h4>
                      <ul className="space-y-2">
                        {type.advantages.map((adv, advIndex) => (
                          <li key={advIndex} className="flex items-center text-sm">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                            {adv}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-red-800">Disadvantages:</h4>
                      <ul className="space-y-2">
                        {type.disadvantages.map((dis, disIndex) => (
                          <li key={disIndex} className="flex items-center text-sm">
                            <Info className="w-4 h-4 mr-2 text-red-600" />
                            {dis}
                          </li>
                        ))}
                      </ul>
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
          <Link href="/learning-path/module-4/operations" className="px-6 py-3 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">Next: Operations</Link>
        </div>
      </motion.div>
    </ModuleLayout>
  );
}
