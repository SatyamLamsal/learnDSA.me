'use client';

import { motion } from 'framer-motion';
import { Target, Database, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { ModuleLayout } from '@/components/layouts/ModuleLayout';
import { SectionProgressIndicator } from '@/components/progress/SectionProgressIndicator';
import Link from 'next/link';

const pointerConcepts = [
  {
    concept: 'Memory Address',
    description: 'Location in memory where data is stored',
    example: 'int *ptr = &variable;',
    importance: 'Foundation of dynamic data structures'
  },
  {
    concept: 'Dereferencing',
    description: 'Accessing the value stored at the memory address',
    example: '*ptr = 10;',
    importance: 'Read/write data through pointers'
  },
  {
    concept: 'NULL Pointer',
    description: 'Special pointer indicating absence of valid memory',
    example: 'Node *head = NULL;',
    importance: 'Marks list boundaries and prevents misuse'
  },
  {
    concept: 'Dynamic Allocation',
    description: 'Allocating memory during program execution',
    example: 'Node *n = malloc(sizeof(Node));',
    importance: 'Enables flexible runtime-sized structures'
  }
];

export default function LinkedListPointersPage() {
  const [activeSection, setActiveSection] = useState('pointers');

  const sections = [
    { id: 'pointers', name: 'Pointer Concepts', icon: Target },
    { id: 'memory', name: 'Memory Layout', icon: Database },
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
        id="pointers"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
          <div className="bg-white rounded-2xl p-8 shadow-lg border">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                <Target className="w-8 h-8 mr-3 text-purple-600" />
                Understanding Pointers
              </h2>
              <SectionProgressIndicator moduleId="linked-lists" sectionId="pointers-overview" />
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {pointerConcepts.map((concept, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-200"
                >
                  <h3 className="text-xl font-bold text-purple-900 mb-3">{concept.concept}</h3>
                  <p className="text-gray-700 mb-4">{concept.description}</p>
                  <div className="bg-white p-3 rounded-lg border mb-4">
                    <code className="text-sm text-purple-800">{concept.example}</code>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-1">Why Important:</h4>
                    <p className="text-purple-800 text-sm">{concept.importance}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div id="memory" className="bg-white rounded-2xl p-8 shadow-lg border">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <Database className="w-8 h-8 mr-3 text-teal-600" />
              Memory Layout Visualization
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-teal-50 p-6 rounded-xl border border-teal-200">
                <h3 className="text-xl font-semibold text-teal-900 mb-4">Array in Memory</h3>
                <div className="grid grid-cols-5 gap-1 mb-4">
                  {['100', '101', '102', '103', '104'].map((addr, idx) => (
                    <div key={idx} className="text-center">
                      <div className="bg-teal-500 text-white p-2 rounded text-sm font-bold">
                        {10 + idx * 10}
                      </div>
                      <div className="text-xs text-teal-700 mt-1">{addr}</div>
                    </div>
                  ))}
                </div>
                <p className="text-center text-teal-700 text-sm">Contiguous memory addresses.</p>
              </div>
              <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
                <h3 className="text-xl font-semibold text-orange-900 mb-4">Linked List in Memory</h3>
                <div className="space-y-2 mb-4">
                  {[
                    { data: 10, next: '→ 205', addr: '100' },
                    { data: 20, next: '→ 312', addr: '205' },
                    { data: 30, next: '→ NULL', addr: '312' }
                  ].map((node, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-orange-500 text-white p-2 rounded">
                      <span className="text-xs">@{node.addr}</span>
                      <span className="font-bold">{node.data}</span>
                      <span className="text-xs">{node.next}</span>
                    </div>
                  ))}
                </div>
                <p className="text-center text-orange-700 text-sm">Non-contiguous memory addresses.</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-8">
            <Link href="/learning-path/module-4/operations" className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium">Previous: Operations</Link>
            <Link href="/learning-path/module-4/problems" className="px-6 py-3 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700">Next: Problems</Link>
          </div>
        </motion.div>
    </ModuleLayout>
  );
}
