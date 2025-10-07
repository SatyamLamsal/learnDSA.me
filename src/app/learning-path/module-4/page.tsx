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
    { id: 'introduction', name: 'Introduction', icon: BookOpen },
    { id: 'types', name: 'Types of Linked Lists', icon: Layers },
    { id: 'operations', name: 'Core Operations', icon: Settings },
    { id: 'pointers', name: 'Pointers & Memory', icon: Target },
    { id: 'problems', name: 'Problems & Practice', icon: Code }
  ];

  const sectionDetails = [
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
      id: 'pointers',
      title: 'Pointers & Memory',
      description: 'Memory model and pointer manipulation',
      icon: Target,
      href: '/learning-path/module-4/pointers',
      difficulty: 'Intermediate' as const,
      timeEstimate: '15 min'
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
      <div className="space-y-12">
        <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-8 rounded-2xl">
          <div className="flex items-center space-x-4 mb-4">
            <LinkIcon className="w-12 h-12" />
            <div>
              <h1 className="text-4xl font-bold">Module 4: Linked Lists</h1>
              <p className="text-green-100 text-lg">Master dynamic node-based structures</p>
            </div>
          </div>
          <p className="text-green-50 max-w-3xl">
            Learn how linked lists enable flexible memory usage, efficient inserts, and form the basis for higher-level data structures and algorithms.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <ChevronRight className="w-7 h-7 mr-3 text-green-600" />
            Learning Path
          </h2>
          <div className="grid gap-6">
            {sectionDetails.map(section => (
              <div
                key={section.id}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all group cursor-pointer"
                onClick={() => (window.location.href = section.href)}
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <section.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 group-hover:text-green-800">{section.title}</h3>
                    <p className="text-gray-600 text-sm">{section.description}</p>
                  </div>
                  <div className="text-right">
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

        <div className="mt-12 bg-gradient-to-r from-teal-600 to-green-600 text-white p-8 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">Ready to Begin?</h2>
          <p className="text-teal-100 mb-6 max-w-3xl">
            Start with the introduction to understand core structure, then move through types, operations, memory, and practice problems.
          </p>
          <a 
            href="/learning-path/module-4/introduction"
            className="inline-flex items-center bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-teal-50 transition-colors"
          >
            Begin: Introduction
            <ArrowRight className="w-5 h-5 ml-2" />
          </a>
        </div>

        <div className="flex justify-between items-center mt-16 pt-8 border-t border-gray-200">
          <Link 
            href="/learning-path/module-3"
            className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 mr-2 rotate-180" />
            Previous: Module 3 - Searching & Sorting
          </Link>
          <Link 
            href="/learning-path/module-5"
            className="flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            Next: Module 5 - Stacks & Queues
            <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </ModuleLayout>
  );
}