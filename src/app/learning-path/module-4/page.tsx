"use client";

import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Link as LinkIcon, 
  Layers, 
  Settings, 
  Target, 
  Code, 
  ArrowRight, 
  ChevronRight 
} from 'lucide-react';
import Link from 'next/link';
import { ModuleLayout } from '@/components/layouts/ModuleLayout';

export default function Module4Overview() {
  const sections = [
    { id: 'pointers', name: 'Pointers & Memory', icon: Target },
    { id: 'introduction', name: 'Introduction', icon: BookOpen },
    { id: 'types', name: 'Types of Linked Lists', icon: Layers },
    { id: 'operations', name: 'Core Operations', icon: Settings },
    { id: 'problems', name: 'Problems & Practice', icon: Code }
  ];

  const sectionDetails = [
    {
      id: 'pointers',
      title: 'Pointers & Memory',
      description: 'Memory model, addresses & pointer fundamentals',
      icon: Target,
      href: '/learning-path/module-4/pointers',
      difficulty: 'Intermediate' as const,
      timeEstimate: '15 min'
    },
    {
      id: 'introduction',
      title: 'Introduction',
      description: 'What linked lists are and when to use them',
      icon: BookOpen,
      href: '/learning-path/module-4/introduction',
      difficulty: 'Intermediate' as const,
      timeEstimate: '12 min'
    },
    {
      id: 'types',
      title: 'Types of Linked Lists',
      description: 'Singly, doubly & circular forms with trade-offs',
      icon: Layers,
      href: '/learning-path/module-4/types',
      difficulty: 'Intermediate' as const,
      timeEstimate: '14 min'
    },
    {
      id: 'operations',
      title: 'Core Operations',
      description: 'Insert, delete, traverse & analyze complexity',
      icon: Settings,
      href: '/learning-path/module-4/operations',
      difficulty: 'Intermediate' as const,
      timeEstimate: '16 min'
    },
    {
      id: 'problems',
      title: 'Problems & Practice',
      description: 'Classic problems & practice set',
      icon: Code,
      href: '/learning-path/module-4/problems',
      difficulty: 'Intermediate' as const,
      timeEstimate: '18 min'
    }
  ];

  return (
    <ModuleLayout
      moduleId="module-4"
      moduleTitle="Module 4: Linked Lists"
      moduleDescription="Build dynamic, pointer-based structures"
      sections={sections}
      estimatedTime="75 minutes"
      difficulty="Intermediate"
      totalSections={sections.length}
    >
      <div className="space-y-12 text-gray-700">
  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-8 rounded-2xl">
          <div className="flex items-center space-x-4 mb-6 text-gray-700">
            <LinkIcon className="w-12 h-12 text-gray-700" />
            <div>
              <h1 className="text-4xl font-bold text-slate-800">Module 4: Linked Lists</h1>
              <p className="text-green-100 text-lg">Master dynamic node-based structures</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 text-gray-700">
            <div>
              <p className="text-green-50 mb-4 leading-relaxed">
                Linked lists are fundamental dynamic data structures where elements (nodes) are connected through pointers. 
                Unlike arrays, they don&apos;t require contiguous memory and can grow/shrink during runtime.
              </p>
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
          <h3 className="font-semibold text-emerald-100 mb-2">🎯 What You&apos;ll Master:</h3>
          <ul className="text-emerald-50 text-sm space-y-1">
                  <li>• Pointer fundamentals & memory management</li>
                  <li>• Dynamic node creation & linking</li>
                  <li>• Singly, doubly, and circular variations</li>
                  <li>• Efficient insertion/deletion operations</li>
                  <li>• Classic algorithms like cycle detection</li>
                </ul>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <h3 className="font-semibold text-emerald-100 mb-4 flex items-center">🚀 Real-World Applications</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  {title:'Browser History',desc:'Back/Forward navigation'},
                  {title:'Music Playlists',desc:'Next/Previous songs'},
                  {title:'Undo/Redo',desc:'Command history'},
                  {title:'Memory Pools',desc:'Dynamic allocation'}
                ].map((app,i)=>(
                  <div key={i} className="group relative p-3 rounded-md bg-white/15 hover:bg-white/25 transition border border-white/10">
                    <div className="font-medium text-emerald-50 group-hover:text-white text-sm">{app.title}</div>
                    <div className="text-[11px] text-emerald-200 group-hover:text-emerald-100">{app.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border mb-12 text-gray-700">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">📊 Linked Lists vs Arrays: The Complete Picture</h2>
          <div className="grid lg:grid-cols-2 gap-8 mb-8 text-gray-700">
            <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-xl border border-red-200 text-gray-700">
              <h3 className="text-2xl font-bold text-red-900 mb-4 flex items-center">
                📋 Arrays
                <span className="ml-3 text-sm bg-red-200 text-red-800 px-3 py-1 rounded-full">Static</span>
              </h3>
              <div className="space-y-4 text-gray-700">
                <div className="bg-white p-4 rounded-lg border border-red-200 text-gray-700">
                  <h4 className="font-semibold text-red-800 mb-2">Memory Layout</h4>
                  <div className="flex space-x-1 mb-2 text-gray-700">
                    {[10, 20, 30, 40].map((val, i) => (
                      <div key={i} className="bg-red-500 text-white p-2 rounded text-sm font-mono text-center min-w-[40px] text-gray-600">
                        {val}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-red-700">Contiguous memory addresses</p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                  <div className="bg-green-100 p-3 rounded border border-green-300 text-gray-700">
                    <div className="font-semibold text-green-800">✅ Advantages</div>
                    <ul className="text-green-700 text-xs mt-1 space-y-1">
                      <li>• O(1) random access</li>
                      <li>• Cache-friendly</li>
                      <li>• Memory efficient</li>
                    </ul>
                  </div>
                  <div className="bg-red-100 p-3 rounded border border-red-300 text-gray-700">
                    <div className="font-semibold text-red-800">❌ Limitations</div>
                    <ul className="text-red-700 text-xs mt-1 space-y-1">
                      <li>• Fixed size</li>
                      <li>• Expensive insertions</li>
                      <li>• Memory waste</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl border border-green-200 text-white">
              <h3 className="text-2xl font-bold text-green-900 mb-4 flex items-center">
                🔗 Linked Lists
                <span className="ml-3 text-sm bg-green-200 text-green-800 px-3 py-1 rounded-full">Dynamic</span>
              </h3>
              <div className="space-y-4 text-gray-700">
                <div className="bg-white p-4 rounded-lg border border-green-200 text-gray-700">
                  <h4 className="font-semibold text-green-800 mb-2">Memory Layout</h4>
                  <div className="space-y-2 mb-2 text-gray-700">
                    {[
                      { data: 10, addr: '1000', next: '→2048' },
                      { data: 20, addr: '2048', next: '→3012' },
                      { data: 30, addr: '3012', next: '→NULL' }
                    ].map((node, i) => (
                      <div key={i} className="flex items-center justify-between bg-green-500 text-white p-2 rounded text-xs font-mono text-gray-600">
                        <span>@{node.addr}</span>
                        <span className="font-bold text-gray-800">{node.data}</span>
                        <span>{node.next}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-green-700">Scattered memory locations</p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                  <div className="bg-green-100 p-3 rounded border border-green-300 text-gray-700">
                    <div className="font-semibold text-green-800">✅ Advantages</div>
                    <ul className="text-green-700 text-xs mt-1 space-y-1">
                      <li>• Dynamic sizing</li>
                      <li>• O(1) head operations</li>
                      <li>• Memory efficient</li>
                    </ul>
                  </div>
                  <div className="bg-orange-100 p-3 rounded border border-orange-300 text-gray-700">
                    <div className="font-semibold text-orange-800">⚠️ Trade-offs</div>
                    <ul className="text-orange-700 text-xs mt-1 space-y-1">
                      <li>• O(n) random access</li>
                      <li>• Extra pointer memory</li>
                      <li>• Poor cache locality</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 text-white">
            <h3 className="text-xl font-bold text-blue-900 mb-4 text-center">🎯 When to Choose What?</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="bg-white p-4 rounded-lg border border-blue-300 text-gray-700">
                <h4 className="font-semibold text-blue-800 mb-2">Choose Arrays When:</h4>
                <ul className="text-blue-700 space-y-1">
                  <li>• Need fast element access</li>
                  <li>• Size is mostly fixed</li>
                  <li>• Mathematical operations</li>
                  <li>• Cache performance matters</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg border border-green-300 text-gray-700">
                <h4 className="font-semibold text-green-800 mb-2">Choose Linked Lists When:</h4>
                <ul className="text-green-700 space-y-1">
                  <li>• Frequent insertions/deletions</li>
                  <li>• Unknown or varying size</li>
                  <li>• Implementing other structures</li>
                  <li>• Memory usage optimization</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg border border-purple-300 text-gray-700">
                <h4 className="font-semibold text-purple-800 mb-2">Consider Hybrids:</h4>
                <ul className="text-purple-700 space-y-1">
                  <li>• Deque (double-ended queue)</li>
                  <li>• Dynamic arrays (vectors)</li>
                  <li>• B+ trees for databases</li>
                  <li>• Hash tables with chaining</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border text-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <ChevronRight className="w-7 h-7 mr-3 text-green-600" />
            Learning Path
          </h2>
          <div className="grid gap-6 text-gray-700">
            {sectionDetails.map(section => (
              <div
                key={section.id}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all group cursor-pointer text-gray-700"
                onClick={() => (window.location.href = section.href)}
              >
                <div className="flex items-center space-x-4 flex-1 text-gray-700">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors text-gray-700">
                    <section.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1 text-gray-700">
                    <h3 className="font-semibold text-gray-800 group-hover:text-green-800">{section.title}</h3>
                    <p className="text-gray-600 text-sm">{section.description}</p>
                  </div>
                  <div className="text-right text-gray-700">
                    <div className="text-sm text-gray-500">{section.timeEstimate}</div>
                    <div className="text-xs px-2 py-1 rounded mt-1 bg-yellow-100 text-yellow-800">
                      {section.difficulty}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-teal-600 to-green-600 text-white p-8 rounded-2xl text-white">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">Ready to Begin?</h2>
          <p className="text-teal-100 mb-6 max-w-3xl">
            Start with pointers & memory fundamentals, then understand linked lists structure, explore types, learn operations, and practice problems.
          </p>
          <a 
            href="/learning-path/module-4/pointers"
            className="inline-flex items-center bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-teal-50 transition-colors"
          >
            Begin: Pointers & Memory
            <ArrowRight className="w-5 h-5 ml-2 text-gray-700" />
          </a>
        </div>

        <div className="flex justify-between items-center mt-16 pt-8 border-t border-gray-200 text-gray-700">
          <Link 
            href="/learning-path/module-3"
            className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700"
          >
            <ChevronRight className="w-5 h-5 mr-2 rotate-180 text-gray-700" />
            Previous: Module 3 - Searching & Sorting
          </Link>
          <Link 
            href="/learning-path/module-5"
            className="flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-gray-100"
          >
            Next: Module 5 - Stacks & Queues
            <ChevronRight className="w-5 h-5 ml-2 text-gray-700" />
          </Link>
        </div>
      </div>
    </ModuleLayout>
  );
}