'use client';

import { motion } from 'framer-motion';
import { Settings, BarChart3, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { ModuleLayout } from '@/components/layouts/ModuleLayout';
import { SectionProgressIndicator } from '@/components/progress/SectionProgressIndicator';
import Link from 'next/link';

const linkedListOperations = [
  {
    operation: 'Traversal',
    timeComplexity: 'O(n)',
    description: 'Visit each node from head to tail',
    steps: ['Start at head', 'Visit current node', 'Move to next node', 'Repeat until NULL'],
  },
  {
    operation: 'Insertion',
    timeComplexity: 'O(1) or O(n)',
    description: 'Add new node at beginning, end, or specific position',
    steps: ['Create new node', 'Set data', 'Update pointers', 'Handle edge cases'],
  },
  {
    operation: 'Deletion',
    timeComplexity: 'O(1) or O(n)',
    description: 'Remove node from beginning, end, or specific position',
    steps: ['Find target node', 'Update previous pointers', 'Free memory', 'Handle edge cases'],
  },
  {
    operation: 'Search',
    timeComplexity: 'O(n)',
    description: 'Find node with specific value',
    steps: ['Start at head', 'Compare data', 'Move to next', 'Return position or NULL'],
  }
];

export default function LinkedListOperationsPage() {
  const [activeSection, setActiveSection] = useState('operations');

  const sections = [
    { id: 'operations', name: 'Operations', icon: Settings },
    { id: 'complexity', name: 'Complexity', icon: BarChart3 },
  ];

  return (
    <ModuleLayout
      moduleId="module-4"
      moduleTitle="Module 4: Linked Lists"
      moduleDescription="Core operations and performance"
      sections={sections}
      activeSection={activeSection}
      onSectionChange={(id)=>{ setActiveSection(id); const el=document.getElementById(id); if(el){ el.scrollIntoView({behavior:'smooth'});} }}
      backUrl="/learning-path/module-4"
      estimatedTime="16 minutes"
      difficulty="Intermediate"
      totalSections={sections.length}
      currentSectionIndex={sections.findIndex(s => s.id === activeSection)}
    >
      <motion.div
        id="operations"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
          <div className="bg-white rounded-2xl p-8 shadow-lg border">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                <Settings className="w-8 h-8 mr-3 text-orange-600" />
                Linked List Operations
              </h2>
              <SectionProgressIndicator moduleId="linked-lists" sectionId="operations-overview" />
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {linkedListOperations.map((op, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold text-sm mr-3">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{op.operation}</h3>
                      <div className="text-sm font-mono bg-orange-100 text-orange-800 px-2 py-1 rounded">
                        {op.timeComplexity}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{op.description}</p>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Steps:</h4>
                    <ol className="space-y-1">
                      {op.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="text-sm text-gray-600 flex items-center">
                          <span className="w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs mr-2">
                            {stepIndex + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div id="complexity" className="bg-white rounded-2xl p-8 shadow-lg border">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <BarChart3 className="w-8 h-8 mr-3 text-blue-600" />
              Time Complexity Analysis
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border border-blue-300 px-4 py-3 font-semibold text-blue-600">Operation</th>
                    <th className="border border-blue-300 px-4 py-3 font-semibold text-blue-600">Singly</th>
                    <th className="border border-blue-300 px-4 py-3 font-semibold text-blue-600">Doubly</th>
                    <th className="border border-blue-300 px-4 py-3 font-semibold text-blue-600">Circular</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-blue-300 px-4 py-3 text-blue-600 font-medium">Access (index)</td>
                    <td className="border border-blue-300 px-4 py-3 text-red-600 font-mono">O(n)</td>
                    <td className="border border-blue-300 px-4 py-3 text-red-600 font-mono">O(n)</td>
                    <td className="border border-blue-300 px-4 py-3 text-red-600 font-mono">O(n)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-blue-300 px-4 py-3 text-blue-600 font-medium">Search</td>
                    <td className="border border-blue-300 px-4 py-3 text-red-600 font-mono">O(n)</td>
                    <td className="border border-blue-300 px-4 py-3 text-red-600 font-mono">O(n)</td>
                    <td className="border border-blue-300 px-4 py-3 text-red-600 font-mono">O(n)</td>
                  </tr>
                  <tr>
                    <td className="border border-blue-300 px-4 py-3 text-blue-600 font-medium">Insert (head)</td>
                    <td className="border border-blue-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                    <td className="border border-blue-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                    <td className="border border-blue-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-blue-300 px-4 py-3 text-blue-600 font-medium">Insert (end)</td>
                    <td className="border border-blue-300 px-4 py-3 text-red-600 font-mono">O(n)</td>
                    <td className="border border-blue-300 px-4 py-3 text-green-600 font-mono">O(1)*</td>
                    <td className="border border-blue-300 px-4 py-3 text-green-600 font-mono">O(1)*</td>
                  </tr>
                  <tr>
                    <td className="border border-blue-300 px-4 py-3 text-blue-600 font-medium">Delete (head)</td>
                    <td className="border border-blue-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                    <td className="border border-blue-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                    <td className="border border-blue-300 px-4 py-3 text-green-600 font-mono">O(1)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-blue-300 px-4 py-3 text-blue-600 font-medium">Delete (end)</td>
                    <td className="border border-blue-300 px-4 py-3 text-red-600 font-mono">O(n)</td>
                    <td className="border border-blue-300 px-4 py-3 text-green-600 font-mono">O(1)*</td>
                    <td className="border border-blue-300 px-4 py-3 text-green-600 font-mono">O(1)*</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-gray-600"><strong>*</strong> Assumes a maintained tail pointer.</p>
          </div>
          <div className="flex justify-between items-center mt-8">
            <Link href="/learning-path/module-4/types" className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium">Previous: Types</Link>
            <Link href="/learning-path/module-4/pointers" className="px-6 py-3 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700">Next: Pointers</Link>
          </div>
        </motion.div>
    </ModuleLayout>
  );
}
