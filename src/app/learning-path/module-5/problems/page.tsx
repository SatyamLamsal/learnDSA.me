'use client';

import { motion } from 'framer-motion';
import { Code, Clock, Database, CheckCircle, Play, Shuffle, TreePine, Network, Search, Target, Award } from 'lucide-react';
import { useState } from 'react';
import { EnhancedModuleLayout } from '@/components/layouts/EnhancedModuleLayout';
import { SectionProgressIndicator } from '@/components/progress/SectionProgressIndicator';
import Link from 'next/link';

const commonProblems = [
  {
    problem: "Binary Tree Traversal",
    description: 'Visit all nodes in specific order using DFS or BFS',
    algorithm: 'Recursive DFS / Iterative BFS',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h) - height of tree',
    steps: [
      'Choose traversal order (in/pre/post/level)',
      'For DFS: recursively visit left, process, visit right',
      'For BFS: use queue to process level by level',
      'Handle null nodes appropriately'
    ],
    applications: ['File system traversal', 'Expression tree evaluation', 'Syntax tree processing']
  },
  {
    problem: 'Binary Search Tree Operations',
    description: 'Insert, search, delete maintaining BST property',
    algorithm: 'Recursive comparison',
    timeComplexity: 'O(log n) average, O(n) worst',
    spaceComplexity: 'O(h) - recursion stack',
    steps: [
      'Compare value with current node',
      'Go left if smaller, right if larger',
      'For insert: add at null position',
      'For delete: handle 3 cases (0,1,2 children)'
    ],
    applications: ['Database indexing', 'Symbol tables', 'Auto-complete systems']
  },
  {
    problem: 'Tree Height & Depth',
    description: 'Calculate maximum depth from root to leaf',
    algorithm: 'Recursive depth calculation',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    steps: [
      'Base case: null node has height 0',
      'Recursively get left subtree height',
      'Recursively get right subtree height',
      'Return 1 + max(left_height, right_height)'
    ],
    applications: ['Tree balancing', 'Memory estimation', 'Visualization layouts']
  },
  {
    problem: 'Lowest Common Ancestor',
    description: 'Find deepest node that is ancestor of both given nodes',
    algorithm: 'Post-order traversal with path tracking',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    steps: [
      'Search for both nodes in left and right subtrees',
      'If both found in different subtrees, current is LCA',
      'If both in same subtree, recurse into that subtree',
      'Return the LCA when found'
    ],
    applications: ['Version control systems', 'Organizational hierarchies', 'Network routing']
  }
];

const exercises = [
  { title: 'Maximum Depth', difficulty: 'Easy', description: 'Find height of binary tree recursively' },
  { title: 'Same Tree', difficulty: 'Easy', description: 'Compare two trees for structural equality' },
  { title: 'Invert Binary Tree', difficulty: 'Easy', description: 'Swap left and right children recursively' },
  { title: 'Path Sum', difficulty: 'Medium', description: 'Check if root-to-leaf path equals target' },
  { title: 'Level Order Traversal', difficulty: 'Medium', description: 'BFS traversal returning levels as arrays' },
  { title: 'Validate BST', difficulty: 'Medium', description: 'Ensure in-order traversal is sorted' },
  { title: 'Binary Tree Maximum Path Sum', difficulty: 'Hard', description: 'Find path with maximum sum between any nodes' },
  { title: 'Serialize/Deserialize Tree', difficulty: 'Hard', description: 'Convert tree to string and back' },
];

export default function TreeProblemsPage() {

  const sections = [
    { id: 'problems', name: 'Classic Problems', icon: Code },
    { id: 'patterns', name: 'Patterns', icon: Shuffle },
    { id: 'practice', name: 'Practice', icon: Play },
  ];

  return (
    <EnhancedModuleLayout
      moduleId="module-6"
      moduleTitle="Module 6: Trees"
      moduleDescription="Problem solving & practice"
      sections={sections}
      enableScrollSpy
      backUrl="/learning-path/module-6"
      estimatedTime="25 minutes"
      difficulty="Advanced"
      totalSections={sections.length}
      currentPath="/learning-path/module-6/problems"
      showFullCourseStructure={true}
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
                <TreePine className="w-8 h-8 mr-3 text-green-600" />
                Classic Tree Problems
              </h2>
              <SectionProgressIndicator moduleId="trees" sectionId="problems-overview" />
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
                      <h3 className="text-2xl font-bold text-green-900 mb-3">{problem.problem}</h3>
                      <p className="text-gray-700 mb-4">{problem.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600"><Clock className="w-4 h-4 text-green-600 mr-2" /><strong>Time:</strong>&nbsp;{problem.timeComplexity}</div>
                        <div className="flex items-center text-sm text-gray-600"><Database className="w-4 h-4 text-blue-600 mr-2" /><strong>Space:</strong>&nbsp;{problem.spaceComplexity}</div>
                        <div className="flex items-center text-sm text-gray-600"><Code className="w-4 h-4 text-purple-600 mr-2" /><strong>Algorithm:</strong>&nbsp;{problem.algorithm}</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Algorithm Steps:</h4>
                      <ol className="space-y-2">
                        {problem.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="text-sm text-gray-600 flex items-start">
                            <span className="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">
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
          
          {/* Patterns Catalog */}
          <div id="patterns" className="bg-white rounded-2xl p-8 shadow-lg border">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                <Network className="w-8 h-8 mr-3 text-blue-600" /> Tree Algorithm Patterns
              </h2>
              <SectionProgressIndicator moduleId="trees" sectionId="problems-patterns" />
            </div>
            <p className="text-sm text-gray-600 mb-8 max-w-4xl">
              Tree problems follow predictable patterns based on traversal methods and recursive thinking. 
              Master these core patterns and most tree interview questions become straightforward applications.
            </p>
            <div className="grid lg:grid-cols-2 gap-6">
              {[
                {
                  name: 'DFS Traversal (Recursive)',
                  idea: 'Process node and recursively visit children in specific order',
                  solves: ['In/Pre/Post-order traversal','Tree validation','Path finding','Tree modification'],
                  complexity: 'O(n) time, O(h) space',
                  snippet: 'function dfs(node) { if(!node) return; process(node); dfs(node.left); dfs(node.right); }'
                },
                {
                  name: 'BFS Traversal (Queue)',
                  idea: 'Use queue to process nodes level by level from top to bottom',
                  solves: ['Level-order traversal','Minimum depth','Level-wise processing','Tree width'],
                  complexity: 'O(n) time, O(w) space (w=width)',
                  snippet: 'queue = [root]; while(queue.length) { node = queue.shift(); process(node); if(node.left) queue.push(node.left); if(node.right) queue.push(node.right); }'
                },
                {
                  name: 'Divide & Conquer',
                  idea: 'Solve problem by combining solutions from left and right subtrees',
                  solves: ['Tree height','Diameter','Balanced tree check','Path sums'],
                  complexity: 'O(n) time typically',
                  snippet: 'function solve(node) { if(!node) return baseCase; left = solve(node.left); right = solve(node.right); return combine(left, right, node); }'
                },
                {
                  name: 'Path Tracking',
                  idea: 'Maintain current path during traversal to check conditions',
                  solves: ['Root-to-leaf paths','Path sum problems','Ancestor problems'],
                  complexity: 'O(n) time, O(h) space',
                  snippet: 'function findPath(node, path) { if(!node) return; path.push(node.val); if(isLeaf(node)) checkCondition(path); findPath(node.left, path); findPath(node.right, path); path.pop(); }'
                },
                {
                  name: 'Tree Reconstruction',
                  idea: 'Build tree from traversal arrays or serialized format',
                  solves: ['Build from inorder+preorder','Deserialize tree','Clone tree'],
                  complexity: 'O(n) time',
                  snippet: 'function buildTree(inorder, preorder) { if(!preorder.length) return null; root = new Node(preorder[0]); idx = inorder.indexOf(root.val); root.left = buildTree(inorder.slice(0,idx), preorder.slice(1,idx+1)); root.right = buildTree(inorder.slice(idx+1), preorder.slice(idx+1)); return root; }'
                },
                {
                  name: 'Tree Comparison',
                  idea: 'Compare two trees node by node with synchronized traversal',
                  solves: ['Same tree','Subtree check','Mirror tree','Isomorphic trees'],
                  complexity: 'O(min(m,n)) time',
                  snippet: 'function isSame(p, q) { if(!p && !q) return true; if(!p || !q) return false; return p.val === q.val && isSame(p.left, q.left) && isSame(p.right, q.right); }'                
                }
              ].map((pat,i)=>(
                <div key={i} className="border rounded-xl p-5 bg-gradient-to-br from-green-50 to-emerald-50 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-green-900">{pat.name}</h3>
                    <span className="text-[10px] px-2 py-1 rounded-full bg-white/70 border text-green-600 font-mono">{pat.complexity}</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-3 leading-relaxed">{pat.idea}</p>
                  <div className="mb-3">
                    <div className="text-[10px] font-semibold text-green-700 mb-1">Common Uses</div>
                    <ul className="flex flex-wrap gap-1 text-[10px] text-green-800">
                      {pat.solves.map((s,si)=>(<li key={si} className="px-2 py-1 bg-white/70 rounded border border-green-200">{s}</li>))}
                    </ul>
                  </div>
                  <pre className="text-[10px] bg-gray-900 text-green-300 p-3 rounded mt-auto overflow-x-auto">{pat.snippet}</pre>
                </div>
              ))}
            </div>
          </div>

          <div id="practice" className="bg-white rounded-2xl p-8 shadow-lg border">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <Play className="w-8 h-8 mr-3 text-purple-600" />
              Practice Exercises
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exercises.map((exercise, index) => (
                <div key={index} className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-200">
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
          
          <div className="flex justify-between items-center mt-8 flex-wrap gap-4">
            <Link href="/learning-path/module-5/traversal" className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-600">Previous: Tree Traversal</Link>
            <Link href="/learning-path/module-6" className="ml-auto px-6 py-3 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">Next Module: Graphs</Link>
          </div>
        </motion.div>
    </EnhancedModuleLayout>
  );
}