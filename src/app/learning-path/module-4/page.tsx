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
      prevModuleTitle="Stacks & Queues"
      nextModuleUrl="/learning-path/module-5"
      nextModuleTitle="Trees & Hierarchical Structures"
    >
      {/* Overview content retained from previous implementation */}
      <div className="space-y-12 text-gray-700">

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