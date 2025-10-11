'use client';

import { motion } from 'framer-motion';
import { TreePine, Network, Search, Users, Database, CheckCircle, Info, Target, BookOpen, Lightbulb } from 'lucide-react';
import { useState } from 'react';
import { EnhancedModuleLayout } from '@/components/layouts/EnhancedModuleLayout';
import { SectionProgressIndicator } from '@/components/progress/SectionProgressIndicator';
import Link from 'next/link';

export default function TreeBasicsPage() {
  const [activeVisualization, setActiveVisualization] = useState('basic');

  const sections = [
    { id: 'introduction', name: 'What are Trees?', icon: TreePine },
    { id: 'terminology', name: 'Tree Terminology', icon: BookOpen },
    { id: 'types', name: 'Types of Trees', icon: Network },
    { id: 'properties', name: 'Tree Properties', icon: Target },
  ];

  return (
    <EnhancedModuleLayout
      moduleId="module-6"
      moduleTitle="Module 6: Trees"
      moduleDescription="Hierarchical data structures fundamentals"
      sections={sections}
      enableScrollSpy
      backUrl="/learning-path/module-6"
      estimatedTime="20 minutes"
      difficulty="Advanced"
      totalSections={sections.length}
      currentPath="/learning-path/module-6/basics"
      showFullCourseStructure={true}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12 text-gray-700"
      >
        {/* Introduction */}
        <div id="introduction" className="bg-white rounded-2xl p-8 shadow-lg border text-gray-700">
          <div className="flex items-center justify-between mb-8 text-gray-700">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center">
              <TreePine className="w-8 h-8 mr-3 text-green-600" />
              What are Trees?
            </h2>
            <SectionProgressIndicator moduleId="trees" sectionId="introduction" />
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Trees are hierarchical data structures that consist of nodes connected by edges. 
                Unlike linear structures (arrays, linked lists), trees represent data in a parent-child relationship, 
                making them perfect for organizing hierarchical information.
              </p>
              
              <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                <h4 className="font-semibold text-green-900 mb-3">Key Characteristics:</h4>
                <div className="space-y-2 text-green-800">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>Hierarchical structure with parent-child relationships</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>One root node at the top</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>No cycles (acyclic graph)</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>Each node has zero or more children</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-3">Real-World Examples:</h4>
                <div className="space-y-2 text-blue-800 text-sm">
                  <div>🗂️ <strong>File Systems:</strong> Folders containing files and subfolders</div>
                  <div>🏢 <strong>Organization Charts:</strong> Company hierarchy structure</div>
                  <div>🧬 <strong>Family Trees:</strong> Genealogical relationships</div>
                  <div>📚 <strong>Decision Trees:</strong> AI/ML decision making processes</div>
                  <div>🌐 <strong>HTML DOM:</strong> Web page element hierarchy</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
              <h4 className="font-semibold text-green-900 mb-4">Basic Tree Visualization</h4>
              
              {/* Simple tree diagram */}
              <div className="relative mx-auto w-64 h-48 mb-4">
                <svg className="w-full h-full" viewBox="0 0 200 150">
                  {/* Edges */}
                  <line x1="100" y1="30" x2="60" y2="70" stroke="#10b981" strokeWidth="2"/>
                  <line x1="100" y1="30" x2="140" y2="70" stroke="#10b981" strokeWidth="2"/>
                  <line x1="60" y1="70" x2="40" y2="110" stroke="#10b981" strokeWidth="2"/>
                  <line x1="60" y1="70" x2="80" y2="110" stroke="#10b981" strokeWidth="2"/>
                  <line x1="140" y1="70" x2="160" y2="110" stroke="#10b981" strokeWidth="2"/>
                  
                  {/* Nodes */}
                  <circle cx="100" cy="30" r="15" fill="#059669" />
                  <circle cx="60" cy="70" r="12" fill="#10b981" />
                  <circle cx="140" cy="70" r="12" fill="#10b981" />
                  <circle cx="40" cy="110" r="10" fill="#34d399" />
                  <circle cx="80" cy="110" r="10" fill="#34d399" />
                  <circle cx="160" cy="110" r="10" fill="#34d399" />
                  
                  {/* Labels */}
                  <text x="100" y="35" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">A</text>
                  <text x="60" y="75" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">B</text>
                  <text x="140" y="75" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">C</text>
                  <text x="40" y="115" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">D</text>
                  <text x="80" y="115" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">E</text>
                  <text x="160" y="115" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">F</text>
                </svg>
              </div>
              
              <div className="space-y-2 text-sm text-green-800">
                <div><strong>Root:</strong> Node A (top level)</div>
                <div><strong>Parents:</strong> A is parent of B,C; B is parent of D,E</div>
                <div><strong>Children:</strong> B,C are children of A</div>
                <div><strong>Leaves:</strong> D, E, F (no children)</div>
                <div><strong>Height:</strong> 3 levels from root to leaves</div>
              </div>
            </div>
          </div>
        </div>

        {/* Terminology */}
        <div id="terminology" className="bg-white rounded-2xl p-8 shadow-lg border text-gray-700">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center">
              <BookOpen className="w-8 h-8 mr-3 text-blue-600" />
              Essential Tree Terminology
            </h2>
            <SectionProgressIndicator moduleId="trees" sectionId="terminology" />
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                term: "Node",
                definition: "Basic unit containing data and links to children",
                example: "Each circle in the tree diagram above"
              },
              {
                term: "Root",
                definition: "Top-most node with no parent",
                example: "Node A in our example tree"
              },
              {
                term: "Parent",
                definition: "Node with one or more children",
                example: "A is parent of B and C"
              },
              {
                term: "Child",
                definition: "Node connected below another node",
                example: "B and C are children of A"
              },
              {
                term: "Leaf",
                definition: "Node with no children (terminal node)",
                example: "Nodes D, E, F in our example"
              },
              {
                term: "Sibling",
                definition: "Nodes sharing the same parent",
                example: "B and C are siblings"
              },
              {
                term: "Ancestor",
                definition: "Node on the path from root to current node",
                example: "A is ancestor of all nodes"
              },
              {
                term: "Descendant",
                definition: "Node reachable by going down the tree",
                example: "D and E are descendants of B"
              },
              {
                term: "Subtree",
                definition: "Tree formed by a node and all its descendants",
                example: "Node B with D,E forms a subtree"
              },
              {
                term: "Height",
                definition: "Maximum number of edges from root to leaf",
                example: "Our example tree has height 2"
              },
              {
                term: "Depth/Level",
                definition: "Number of edges from root to a node",
                example: "Node B is at depth 1"
              },
              {
                term: "Degree",
                definition: "Number of children a node has",
                example: "Node A has degree 2"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200"
              >
                <h4 className="font-bold text-blue-900 mb-2">{item.term}</h4>
                <p className="text-sm text-blue-800 mb-2">{item.definition}</p>
                <div className="text-xs text-blue-600 bg-white/70 p-2 rounded border">
                  <strong>Example:</strong> {item.example}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Types of Trees */}
        <div id="types" className="bg-white rounded-2xl p-8 shadow-lg border text-gray-700">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center">
              <Network className="w-8 h-8 mr-3 text-purple-600" />
              Types of Trees
            </h2>
            <SectionProgressIndicator moduleId="trees" sectionId="types" />
          </div>
          
          <div className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {[
                {
                  name: "Binary Tree",
                  description: "Each node has at most 2 children (left and right)",
                  properties: ["Max 2 children per node", "Left and right child distinction", "Most common tree type"],
                  uses: ["Expression trees", "Decision trees", "Heap data structure"],
                  color: "red"
                },
                {
                  name: "Binary Search Tree (BST)",
                  description: "Binary tree where left child < parent < right child",
                  properties: ["Sorted structure", "Fast search/insert/delete", "In-order gives sorted sequence"],
                  uses: ["Database indexing", "Search algorithms", "Symbol tables"],
                  color: "green"
                },
                {
                  name: "Complete Binary Tree",
                  description: "All levels filled except possibly the last (filled left to right)",
                  properties: ["Efficient array representation", "Height is log(n)", "Used in heaps"],
                  uses: ["Priority queues", "Heap sort", "Binary heaps"],
                  color: "blue"
                },
                {
                  name: "Perfect Binary Tree",
                  description: "All internal nodes have 2 children, all leaves at same level",
                  properties: ["2^h - 1 total nodes", "Perfectly balanced", "Rare in practice"],
                  uses: ["Theoretical analysis", "Memory layout", "Parallel algorithms"],
                  color: "purple"
                },
                {
                  name: "AVL Tree",
                  description: "Self-balancing BST where heights of subtrees differ by at most 1",
                  properties: ["Automatically balanced", "Guaranteed O(log n) operations", "Rotations on insert/delete"],
                  uses: ["Databases", "Memory management", "Compiler symbol tables"],
                  color: "orange"
                },
                {
                  name: "N-ary Tree",
                  description: "Tree where each node can have up to N children",
                  properties: ["Variable number of children", "More than 2 children allowed", "Flexible structure"],
                  uses: ["File systems", "Organization charts", "Game trees"],
                  color: "teal"
                }
              ].map((tree, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className={`bg-gradient-to-br from-${tree.color}-50 to-${tree.color}-100 p-6 rounded-xl border border-${tree.color}-200`}
                >
                  <h4 className={`font-bold text-${tree.color}-900 text-lg mb-3`}>{tree.name}</h4>
                  <p className={`text-sm text-${tree.color}-800 mb-4`}>{tree.description}</p>
                  
                  <div className="mb-4">
                    <h5 className={`font-semibold text-${tree.color}-800 mb-2 text-sm`}>Key Properties:</h5>
                    <ul className={`text-xs text-${tree.color}-700 space-y-1`}>
                      {tree.properties.map((prop, i) => (
                        <li key={i} className="flex items-center">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                          {prop}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className={`font-semibold text-${tree.color}-800 mb-2 text-sm`}>Common Uses:</h5>
                    <div className="flex flex-wrap gap-1">
                      {tree.uses.map((use, i) => (
                        <span key={i} className={`text-xs px-2 py-1 bg-white/70 rounded border border-${tree.color}-300 text-${tree.color}-700`}>
                          {use}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Tree Properties */}
        <div id="properties" className="bg-white rounded-2xl p-8 shadow-lg border text-gray-700">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center">
              <Target className="w-8 h-8 mr-3 text-indigo-600" />
              Important Tree Properties
            </h2>
            <SectionProgressIndicator moduleId="trees" sectionId="properties" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-200">
                <h4 className="font-semibold text-indigo-900 mb-4">Mathematical Properties:</h4>
                <div className="space-y-3 text-sm text-indigo-800">
                  <div className="bg-white/70 p-3 rounded border">
                    <strong>Number of Nodes:</strong> In a complete binary tree of height h: 2^h - 1 to 2^(h+1) - 1 nodes
                  </div>
                  <div className="bg-white/70 p-3 rounded border">
                    <strong>Number of Leaves:</strong> In a binary tree with n internal nodes: n + 1 leaves
                  </div>
                  <div className="bg-white/70 p-3 rounded border">
                    <strong>Maximum Nodes:</strong> At level i: 2^i nodes (starting from level 0)
                  </div>
                  <div className="bg-white/70 p-3 rounded border">
                    <strong>Minimum Height:</strong> For n nodes: ⌊log₂(n)⌋ (perfectly balanced tree)
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
                <h4 className="font-semibold text-yellow-900 mb-4">Performance Characteristics:</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b-2 border-yellow-300">
                        <th className="text-left p-2">Operation</th>
                        <th className="text-left p-2">Balanced</th>
                        <th className="text-left p-2">Worst Case</th>
                      </tr>
                    </thead>
                    <tbody className="text-yellow-800">
                      <tr className="border-b border-yellow-200">
                        <td className="p-2 font-medium">Search</td>
                        <td className="p-2 text-green-600">O(log n)</td>
                        <td className="p-2 text-red-600">O(n)</td>
                      </tr>
                      <tr className="border-b border-yellow-200">
                        <td className="p-2 font-medium">Insert</td>
                        <td className="p-2 text-green-600">O(log n)</td>
                        <td className="p-2 text-red-600">O(n)</td>
                      </tr>
                      <tr className="border-b border-yellow-200">
                        <td className="p-2 font-medium">Delete</td>
                        <td className="p-2 text-green-600">O(log n)</td>
                        <td className="p-2 text-red-600">O(n)</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-medium">Traversal</td>
                        <td className="p-2 text-blue-600">O(n)</td>
                        <td className="p-2 text-blue-600">O(n)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                <h4 className="font-semibold text-green-900 mb-4">Tree vs Other Structures:</h4>
                <div className="space-y-3 text-sm">
                  <div className="bg-white/70 p-3 rounded border border-green-300">
                    <strong>vs Arrays:</strong>
                    <div className="text-green-700 mt-1">
                      ✅ Dynamic size, efficient insertion/deletion<br/>
                      ❌ No direct indexing, more memory overhead
                    </div>
                  </div>
                  <div className="bg-white/70 p-3 rounded border border-green-300">
                    <strong>vs Linked Lists:</strong>
                    <div className="text-green-700 mt-1">
                      ✅ Faster search (O(log n) vs O(n))<br/>
                      ❌ More complex implementation
                    </div>
                  </div>
                  <div className="bg-white/70 p-3 rounded border border-green-300">
                    <strong>vs Hash Tables:</strong>
                    <div className="text-green-700 mt-1">
                      ✅ Ordered data, range queries<br/>
                      ❌ Slower average case access
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                <h4 className="font-semibold text-red-900 mb-4">Common Pitfalls:</h4>
                <div className="space-y-2 text-sm text-red-800">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                    <div>
                      <strong>Unbalanced Trees:</strong> Can degrade to O(n) performance
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                    <div>
                      <strong>Memory Overhead:</strong> Each node needs extra pointer storage
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                    <div>
                      <strong>Recursion Depth:</strong> Stack overflow risk with deep trees
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                    <div>
                      <strong>Not Cache-Friendly:</strong> Nodes may be scattered in memory
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 text-gray-700 flex-wrap gap-4">
          <Link href="/learning-path/module-6" className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-600">Back to Module Overview</Link>
          <Link href="/learning-path/module-6/binary-trees" className="ml-auto px-6 py-3 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">Next: Binary Trees</Link>
        </div>
      </motion.div>
    </EnhancedModuleLayout>
  );
}