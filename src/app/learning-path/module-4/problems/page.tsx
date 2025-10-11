'use client';

import { motion } from 'framer-motion';
import { Code, Clock, Database, CheckCircle, Play, Shuffle } from 'lucide-react';
import { useState } from 'react';
import { EnhancedModuleLayout } from '@/components/layouts/EnhancedModuleLayout';
import { SectionProgressIndicator } from '@/components/progress/SectionProgressIndicator';
import Link from 'next/link';

const commonProblems = [
  {
    problem: "Floyd's Cycle Detection",
    description: 'Detect if a cycle exists in a linked list using two pointers',
    algorithm: 'Tortoise and Hare',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    steps: [
      'Initialize slow and fast pointers at head',
      'Move slow 1 step, fast 2 steps',
      'If they meet, cycle exists',
      'If fast hits NULL, no cycle'
    ],
    applications: ['Memory leak detection', 'Infinite loop prevention']
  },
  {
    problem: 'Reverse Linked List',
    description: 'Reverse pointer direction of the list',
    algorithm: 'Three-pointer technique',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    steps: [
      'prev = NULL, curr = head',
      'Store next',
      'Reverse link',
      'Advance prev & curr'
    ],
    applications: ['Undo operations', 'Path backtracking']
  },
  {
    problem: 'Merge Two Sorted Lists',
    description: 'Combine two increasing ordered lists',
    algorithm: 'Two-pointer merge',
    timeComplexity: 'O(m + n)',
    spaceComplexity: 'O(1)',
    steps: [
      'Create dummy head',
      'Compare front nodes',
      'Append smaller & advance',
      'Append remainder'
    ],
    applications: ['File merging', 'Stream merging']
  }
];

const exercises = [
  { title: 'Find Middle Element', difficulty: 'Easy', description: 'Single pass using slow/fast pointers' },
  { title: 'Remove Duplicates', difficulty: 'Medium', description: 'Skip equal neighbors in sorted list' },
  { title: 'Intersection Point', difficulty: 'Medium', description: 'Use length difference trick' },
  { title: 'Palindrome Check', difficulty: 'Medium', description: 'Reverse second half & compare' },
  { title: 'Add Two Numbers', difficulty: 'Hard', description: 'Digit-by-digit addition with carry' },
  { title: 'Clone Random List', difficulty: 'Hard', description: 'Interleave nodes then split' },
];

export default function LinkedListProblemsPage() {

  const sections = [
    { id: 'problems', name: 'Classic Problems', icon: Code },
    { id: 'patterns', name: 'Patterns', icon: Shuffle },
    { id: 'practice', name: 'Practice', icon: Play },
  ];

  return (
    <EnhancedModuleLayout
      moduleId="module-4"
      moduleTitle="Module 4: Linked Lists"
      moduleDescription="Problem solving & practice"
      sections={sections}
      enableScrollSpy
      backUrl="/learning-path/module-4"
      estimatedTime="18 minutes"
      difficulty="Intermediate"
      totalSections={sections.length}
      currentPath="/learning-path/module-4/problems"
      showFullCourseStructure={true}
    >
      <motion.div
        id="problems"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12 text-gray-700"
      >
          <div className="bg-white rounded-2xl p-8 shadow-lg border text-gray-700">
            <div className="flex items-center justify-between mb-8 text-gray-700">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                <Code className="w-8 h-8 mr-3 text-indigo-600" />
                Classic Linked List Problems
              </h2>
              <SectionProgressIndicator moduleId="linked-lists" sectionId="problems-overview" />
            </div>
            <div className="space-y-8 text-gray-700">
              {commonProblems.map((problem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="border-2 border-gray-200 rounded-xl p-6 text-gray-700"
                >
                  <div className="grid lg:grid-cols-3 gap-6 text-gray-700">
                    <div>
                      <h3 className="text-2xl font-bold text-indigo-900 mb-3">{problem.problem}</h3>
                      <p className="text-gray-700 mb-4">{problem.description}</p>
                      <div className="space-y-2 text-gray-700">
                        <div className="flex items-center text-sm text-gray-600"><Clock className="w-4 h-4 text-green-600 mr-2" /><strong>Time:</strong>&nbsp;{problem.timeComplexity}</div>
                        <div className="flex items-center text-sm text-gray-600"><Database className="w-4 h-4 text-blue-600 mr-2" /><strong>Space:</strong>&nbsp;{problem.spaceComplexity}</div>
                        <div className="flex items-center text-sm text-gray-600"><Code className="w-4 h-4 text-purple-600 mr-2" /><strong>Algorithm:</strong>&nbsp;{problem.algorithm}</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Algorithm Steps:</h4>
                      <ol className="space-y-2 text-gray-700">
                        {problem.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="text-sm text-gray-600 flex items-start">
                            <span className="w-5 h-5 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0 text-gray-600">
                              {stepIndex + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Applications:</h4>
                      <ul className="space-y-2 text-gray-700">
                        {problem.applications.map((app, appIndex) => (
                          <li key={appIndex} className="text-sm text-gray-600 flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            {app}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          {/* Patterns Catalog */}
          <div id="patterns" className="bg-white rounded-2xl p-8 shadow-lg border text-gray-700">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                <Shuffle className="w-8 h-8 mr-3 text-purple-600" /> Algorithmic Patterns Catalog
              </h2>
              <SectionProgressIndicator moduleId="linked-lists" sectionId="problems-patterns" />
            </div>
            <p className="text-sm text-gray-600 mb-8 max-w-4xl">
              Many linked list problems reduce to a handful of reusable pointer movement patterns. Master these and most
              interview questions become mechanical applications rather than puzzles.
            </p>
            <div className="grid lg:grid-cols-2 gap-6">
              {[
                {
                  name: 'Two-Pointer (Runner)',
                  idea: 'Maintain slow and fast pointers advancing at different speeds',
                  solves: ['Cycle detection','Middle element','Kth from end','Palindrome check (half split)'],
                  complexity: 'O(n) time, O(1) space',
                  snippet: 'slow = head; fast = head; while(fast && fast.next){ slow = slow.next; fast = fast.next.next; }'
                },
                {
                  name: 'In-Place Reversal',
                  idea: 'Iteratively reverse next pointers to flip list direction',
                  solves: ['Reverse list','Reverse sublist','Palindrome check (second half)'],
                  complexity: 'O(n) time, O(1) space',
                  snippet: 'prev=null; cur=head; while(cur){ nxt=cur.next; cur.next=prev; prev=cur; cur=nxt; }'
                },
                {
                  name: 'Merge Technique',
                  idea: 'Select smaller head from two sorted lists repeatedly',
                  solves: ['Merge sorted lists','Merge K via heap','External merge sort phase'],
                  complexity: 'O(m+n) time',
                  snippet: 'while(a && b){ if(a.val<b.val){ tail.next=a; a=a.next; } else { tail.next=b; b=b.next;} tail=tail.next; }'
                },
                {
                  name: 'Cycle Entry (Floyd)',
                  idea: 'After meet, reset one pointer to head and move both 1 step to find entry',
                  solves: ['Cycle entry node'],
                  complexity: 'O(n) time',
                  snippet: 'while(fast&&fast.next){ slow=slow.next; fast=fast.next.next; if(slow===fast){ slow=head; while(slow!==fast){ slow=slow.next; fast=fast.next;} break; }}'
                },
                {
                  name: 'Splitting / Partitioning',
                  idea: 'Divide list into two based on condition, then recombine',
                  solves: ['Partition list around value','Stable separation tasks'],
                  complexity: 'O(n) time',
                  snippet: 'before/after lists; iterate nodes; append to bucket; join'                
                },
                {
                  name: 'Fast/Slow with Reconnect',
                  idea: 'Use middle discovery then modify second half then reconnect',
                  solves: ['Reorder list','Rearrange alternating nodes'],
                  complexity: 'O(n) time',
                  snippet: 'mid via slow/fast; reverse second; weave first & reversed'                
                }
              ].map((pat,i)=>(
                <div key={i} className="border rounded-xl p-5 bg-gradient-to-br from-purple-50 to-fuchsia-50 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-purple-900">{pat.name}</h3>
                    <span className="text-[10px] px-2 py-1 rounded-full bg-white/70 border text-purple-600 font-mono">{pat.complexity}</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-3 leading-relaxed">{pat.idea}</p>
                  <div className="mb-3">
                    <div className="text-[10px] font-semibold text-purple-700 mb-1">Common Uses</div>
                    <ul className="flex flex-wrap gap-1 text-[10px] text-purple-800">
                      {pat.solves.map((s,si)=>(<li key={si} className="px-2 py-1 bg-white/70 rounded border border-purple-200">{s}</li>))}
                    </ul>
                  </div>
                  <pre className="text-[10px] bg-gray-900 text-green-300 p-3 rounded mt-auto overflow-x-auto">{pat.snippet}</pre>
                </div>
              ))}
            </div>
          </div>

          <div id="practice" className="bg-white rounded-2xl p-8 shadow-lg border text-gray-700">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <Play className="w-8 h-8 mr-3 text-green-600" />
              Practice Exercises
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700">
              {exercises.map((exercise, index) => (
                <div key={index} className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl border border-green-200 text-white">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{exercise.title}</h3>
                  <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-3 ${
                    exercise.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    exercise.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {exercise.difficulty}
                  </div>
                  <p className="text-gray-600 text-sm">{exercise.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center mt-8 text-gray-700 flex-wrap gap-4">
            <Link href="/learning-path/module-4/operations" className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-600">
              ← Previous: Operations
            </Link>
            <Link href="/learning-path/module-5" className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold">
              Next Module: Trees & Hierarchical Structures →
            </Link>
          </div>
        </motion.div>
    </EnhancedModuleLayout>
  );
}
