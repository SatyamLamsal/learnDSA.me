'use client';

import { motion } from 'framer-motion';
import { Code, Clock, Database, CheckCircle, Play } from 'lucide-react';
import { useState } from 'react';
import { ModuleLayout } from '@/components/layouts/ModuleLayout';
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
  const [activeSection, setActiveSection] = useState('problems');

  const sections = [
    { id: 'problems', name: 'Classic Problems', icon: Code },
    { id: 'practice', name: 'Practice', icon: Play },
  ];

  return (
    <ModuleLayout
      moduleId="module-4"
      moduleTitle="Module 4: Linked Lists"
      moduleDescription="Problem solving & practice"
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
        id="problems"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
          <div className="bg-white rounded-2xl p-8 shadow-lg border">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                <Code className="w-8 h-8 mr-3 text-indigo-600" />
                Classic Linked List Problems
              </h2>
              <SectionProgressIndicator moduleId="linked-lists" sectionId="problems-overview" />
            </div>
            <div className="space-y-8">
              {commonProblems.map((problem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="border-2 border-gray-200 rounded-xl p-6"
                >
                  <div className="grid lg:grid-cols-3 gap-6">
                    <div>
                      <h3 className="text-2xl font-bold text-indigo-900 mb-3">{problem.problem}</h3>
                      <p className="text-gray-700 mb-4">{problem.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm"><Clock className="w-4 h-4 text-green-600 mr-2" /><strong>Time:</strong>&nbsp;{problem.timeComplexity}</div>
                        <div className="flex items-center text-sm"><Database className="w-4 h-4 text-blue-600 mr-2" /><strong>Space:</strong>&nbsp;{problem.spaceComplexity}</div>
                        <div className="flex items-center text-sm"><Code className="w-4 h-4 text-purple-600 mr-2" /><strong>Algorithm:</strong>&nbsp;{problem.algorithm}</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Algorithm Steps:</h4>
                      <ol className="space-y-2">
                        {problem.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="text-sm text-gray-600 flex items-start">
                            <span className="w-5 h-5 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">
                              {stepIndex + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Applications:</h4>
                      <ul className="space-y-2">
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
          <div id="practice" className="bg-white rounded-2xl p-8 shadow-lg border">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <Play className="w-8 h-8 mr-3 text-green-600" />
              Practice Exercises
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exercises.map((exercise, index) => (
                <div key={index} className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
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
          <div className="flex justify-between items-center mt-8">
            <Link href="/learning-path/module-4/pointers" className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium">Previous: Pointers</Link>
            <Link href="/learning-path/module-5" className="px-6 py-3 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">Next Module</Link>
          </div>
        </motion.div>
    </ModuleLayout>
  );
}
