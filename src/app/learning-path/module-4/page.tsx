"use client";

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
import { StandardModulePage } from '@/components/layouts/StandardModulePage';
import type { EnhancedSection } from '@/components/layouts/EnhancedModuleLayout';

export default function Module4Overview() {
  const sections: EnhancedSection[] = [
    { 
      id: 'pointers', 
      name: 'Pointers & Memory', 
      icon: Target,
      href: '/learning-path/module-4/pointers',
      description: 'Memory model, addresses & pointer fundamentals',
      duration: '15 min',
      difficulty: 'Intermediate',
      type: 'lesson'
    },
    { 
      id: 'introduction', 
      name: 'Introduction', 
      icon: BookOpen,
      href: '/learning-path/module-4/introduction',
      description: 'What linked lists are and when to use them',
      duration: '12 min',
      difficulty: 'Intermediate',
      type: 'lesson'
    },
    { 
      id: 'types', 
      name: 'Types of Linked Lists', 
      icon: Layers,
      href: '/learning-path/module-4/types',
      description: 'Singly, doubly & circular variations',
      duration: '14 min',
      difficulty: 'Intermediate',
      type: 'lesson'
    },
    { 
      id: 'operations', 
      name: 'Core Operations', 
      icon: Settings,
      href: '/learning-path/module-4/operations',
      description: 'Insert, delete, traverse & complexity',
      duration: '16 min',
      difficulty: 'Intermediate',
      type: 'lesson'
    },
    { 
      id: 'problems', 
      name: 'Problems & Practice', 
      icon: Code,
      href: '/learning-path/module-4/problems',
      description: 'Classic problems & practice set',
      duration: '18 min',
      difficulty: 'Intermediate',
      type: 'practice'
    }
  ];

  return (
    <StandardModulePage
      moduleId="module-4"
      moduleTitle="Module 4: Linked Lists"
      moduleDescription="Build dynamic, pointer-based structures"
      moduleIcon={LinkIcon}
      sections={sections}
      estimatedTime="75 minutes"
      difficulty="Intermediate"
      prevModuleUrl="/learning-path/module-3"
      prevModuleTitle="Advanced Structures"
      nextModuleUrl="/learning-path/module-5"
      nextModuleTitle="Stacks & Queues"
    >
      {/* Overview content retained from previous implementation */}
      <div className="space-y-12 text-gray-700">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-8 rounded-2xl">
          <div className="flex items-center space-x-4 mb-6">
            <LinkIcon className="w-12 h-12" />
            <div>
              <h1 className="text-4xl font-bold">Module 4: Linked Lists</h1>
              <p className="text-emerald-100 text-lg">Master dynamic node-based structures</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-emerald-50 mb-4 leading-relaxed">
                Linked lists are fundamental dynamic data structures where elements (nodes) are connected through pointers.
                Unlike arrays, they don't require contiguous memory and can grow/shrink during runtime.
              </p>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <h3 className="font-semibold text-emerald-100 mb-2">What you'll master</h3>
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
              <h3 className="font-semibold text-emerald-100 mb-4 flex items-center">Real-World Applications</h3>
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

        {/* Quick links list */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <ChevronRight className="w-7 h-7 mr-3 text-green-600" />
            Start Learning
          </h2>
          <div className="grid gap-6">
            {sections.map(section => (
              <div
                key={section.id}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all group cursor-pointer"
                onClick={() => section.href && (window.location.href = section.href)}
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <section.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 group-hover:text-green-800">{section.name}</h3>
                    <p className="text-gray-600 text-sm">{section.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">{section.duration}</div>
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
      </div>
    </StandardModulePage>
  );
}