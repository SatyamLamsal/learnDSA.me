'use client';

import { motion } from 'framer-motion';
import { Link as LinkIcon, Database, Play, Target, Code, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { SectionProgressIndicator } from '@/components/progress/SectionProgressIndicator';
import { ModuleLayout } from '@/components/layouts/ModuleLayout';
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton';
import { ProgressIndicator } from '@/components/progress/ProgressIndicator';
import { useState, useEffect } from 'react';
import { QuizCard } from '@/components/interactive/QuizCard';
import { useScrollSpy } from '@/hooks/useScrollSpy';

export default function LinkedListsIntroductionPage() {
  const sections = [
    { id: 'overview', name: 'Overview', icon: LinkIcon },
    { id: 'why', name: 'Why Linked Lists?', icon: Database },
    { id: 'objectives', name: 'Learning Objectives', icon: Target },
  ];
  const activeSection = useScrollSpy(sections.map(s=>s.id), { rootMargin: '-40% 0px -40% 0px' });

  return (
    <ModuleLayout
      moduleId="module-4"
      moduleTitle="Module 4: Linked Lists"
      moduleDescription="Dynamic nodes, flexible memory"
  sections={sections}
  enableScrollSpy
      backUrl="/learning-path/module-4"
      estimatedTime="12 minutes"
      difficulty="Intermediate"
      totalSections={sections.length}
      currentSectionIndex={sections.findIndex(s => s.id === activeSection)}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 relative text-gray-700"
      >
        <div className="absolute top-0 right-0 flex items-center space-x-4 text-gray-700">
          <ProgressIndicator 
            topicId="linked-lists-introduction" 
            topicType="module"
            category="learning-path"
          />
          <BookmarkButton 
            topicId="linked-lists-introduction"
            topicType="module"
            title="Linked Lists Introduction"
            category="learning-path"
            url="/learning-path/module-4/introduction"
          />
        </div>
        <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full text-sm font-medium mb-8">
          <LinkIcon className="w-5 h-5 mr-2 text-gray-700" />
          Module 4 · Introduction
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-8">
          Introduction to
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600 text-gray-600">
            Linked Lists
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Linked lists unlock dynamic memory usage. They allow constant-time insertions and deletions at the head and flexible growth—critical for implementing stacks, queues, and more advanced structures.
        </p>
      </motion.div>

      {/* Mini In-Page TOC */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 mb-10 text-sm">
        <div className="font-semibold text-green-900 mb-3">On this page</div>
        <ul className="space-y-2">
          {sections.map(s => (
            <li key={s.id}>
              <a href={`#${s.id}`} className={`flex items-center gap-2 group transition-colors ${activeSection===s.id ? 'text-green-700 font-medium' : 'text-gray-600 hover:text-green-700'}`}>
                <span className={`w-2 h-2 rounded-full ${activeSection===s.id ? 'bg-green-600' : 'bg-green-300 group-hover:bg-green-500'}`} />
                {s.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div id="overview" className="bg-white rounded-2xl p-8 shadow-lg border mb-12 text-gray-700">
        <div className="flex items-center justify-between mb-6 text-gray-700">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <LinkIcon className="w-8 h-8 mr-3 text-green-600" />
            What is a Linked List?
          </h2>
          <SectionProgressIndicator moduleId="linked-lists" sectionId="introduction-overview" />
        </div>
        <p className="text-lg leading-relaxed text-gray-700 mb-6">
          A linked list is a sequence of nodes where each node stores a piece of data and a reference to the next node (and optionally the previous one). Unlike arrays, elements are not stored in contiguous memory; this enables flexible insertion and removal without shifting elements.
        </p>
        <div className="grid lg:grid-cols-2 gap-8 text-gray-700">
          <div className="bg-red-50 p-6 rounded-xl border border-red-200 text-gray-700">
            <h3 className="text-xl font-semibold text-red-900 mb-4">Arrays (Static)</h3>
            <ul className="space-y-2 text-sm text-red-800">
              <li>• Fixed capacity</li>
              <li>• Contiguous memory layout</li>
              <li>• O(1) indexed access</li>
              <li>• Costly insert/delete in middle</li>
            </ul>
          </div>
          <div className="bg-green-50 p-6 rounded-xl border border-green-200 text-gray-700">
            <h3 className="text-xl font-semibold text-green-900 mb-4">Linked Lists (Dynamic)</h3>
            <ul className="space-y-2 text-sm text-green-800">
              <li>• Dynamic growth</li>
              <li>• Non-contiguous nodes</li>
              <li>• O(1) head operations</li>
              <li>• Sequential access only</li>
            </ul>
          </div>
        </div>
      </div>

      <div id="why" className="bg-white rounded-2xl p-8 shadow-lg border mb-12 text-gray-700">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <Database className="w-8 h-8 mr-3 text-blue-600" />
          Why Use Linked Lists?
        </h2>
        <div className="grid md:grid-cols-2 gap-8 text-gray-700">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-green-900">Advantages</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start text-sm text-gray-600"><CheckCircle className="w-5 h-5 text-green-500 mr-2" /> Dynamic size with no reallocation</li>
              <li className="flex items-start text-sm text-gray-600"><CheckCircle className="w-5 h-5 text-green-500 mr-2" /> Efficient insert/delete at head</li>
              <li className="flex items-start text-sm text-gray-600"><CheckCircle className="w-5 h-5 text-green-500 mr-2" /> Memory usage grows as needed</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-red-900">Trade-offs</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>• Extra pointer/reference per node</li>
              <li>• Poor cache locality</li>
              <li>• No random indexing</li>
            </ul>
          </div>
        </div>
      </div>

      <div id="objectives" className="bg-white rounded-2xl p-8 shadow-lg border mb-16 text-gray-700">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <Target className="w-8 h-8 mr-3 text-purple-600" />
          Learning Objectives
        </h2>
        <div className="grid md:grid-cols-3 gap-6 text-gray-700">
          {[ 'Structure & Nodes', 'Dynamic Memory', 'Head/Tail Operations', 'Traversal Basics', 'Use Cases', 'Trade-offs'].map((item, i) => (
            <div key={i} className="bg-gradient-to-br from-green-50 to-teal-50 p-5 rounded-xl border border-green-200 text-sm font-medium text-gray-600">
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Introduction Quiz */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border mb-16 text-gray-700" id="intro-quiz">
        <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-900">
          <CheckCircle className="w-6 h-6 mr-2 text-green-600" /> Quick Knowledge Check
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <QuizCard
            question="What makes linked lists better than arrays for frequent head insertions?"
            difficulty="easy"
            options={[
              { id: 'A', label: 'They allow O(1) head insertion without shifting', correct: true, explanation: 'Array head insertions require shifting elements (O(n)); linked list head insertion adjusts one pointer.' },
              { id: 'B', label: 'They use less memory overall' },
              { id: 'C', label: 'They support random access in O(1)' },
              { id: 'D', label: 'They automatically stay sorted' }
            ]}
          />
          <QuizCard
            question="Primary trade-off of using a linked list instead of a dynamic array?"
            difficulty="medium"
            options={[
              { id: 'A', label: 'No ability to grow' },
              { id: 'B', label: 'Extra per-node pointer overhead', correct: true, explanation: 'Each node stores at least one pointer which increases memory and reduces cache friendliness.' },
              { id: 'C', label: 'Cannot delete elements' },
              { id: 'D', label: 'Insertion at head is O(n)' }
            ]}
          />
        </div>
      </div>

      <div className="flex justify-between items-center mt-8 text-gray-700">
        <Link href="/learning-path/module-4/pointers" className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium flex items-center text-gray-600">
          Previous: Pointers & Memory
        </Link>
        <Link href="/learning-path/module-4/types" className="px-6 py-3 bg-green-600 text-white rounded-lg text-sm font-medium flex items-center hover:bg-green-700 text-gray-300">
          Next: Types <ArrowRight className="w-4 h-4 ml-2 text-gray-700" />
        </Link>
      </div>
    </ModuleLayout>
  );
}
