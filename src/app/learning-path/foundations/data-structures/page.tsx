'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Database, 
  GitBranch, 
  Settings, 
  Play, 
  ArrowDown, 
  Search, 
  Target, 
  AlertCircle, 
  BarChart3,
  CheckCircle,
  Users,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import { ModuleLayout } from '@/components/layouts/ModuleLayout';
import { ProgressIndicator } from '@/components/progress/ProgressIndicator';
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton';
import { SectionProgressIndicator } from '@/components/progress/SectionProgressIndicator';

const dataStructureClassification = [
  {
    category: 'By Organization',
    types: [
      { name: 'Linear', desc: 'Elements in sequence with unique predecessor/successor', examples: ['Array', 'Linked List', 'Stack', 'Queue'] },
      { name: 'Non-Linear', desc: 'Elements not in sequence, hierarchical relationships', examples: ['Tree', 'Graph', 'Hash Table'] }
    ]
  },
  {
    category: 'By Memory',
    types: [
      { name: 'Static', desc: 'Fixed size during compilation', examples: ['Array'] },
      { name: 'Dynamic', desc: 'Size can change during execution', examples: ['Linked List', 'Dynamic Array'] }
    ]
  },
  {
    category: 'By Access',
    types: [
      { name: 'Sequential', desc: 'Must access elements in order', examples: ['Linked List', 'Stack', 'Queue'] },
      { name: 'Random', desc: 'Can directly access any element', examples: ['Array'] }
    ]
  },
  {
    category: 'By Data Type',
    types: [
      { name: 'Homogeneous', desc: 'All elements of same type', examples: ['Array', 'Linked List'] },
      { name: 'Heterogeneous', desc: 'Elements of different types', examples: ['Structure', 'Class'] }
    ]
  }
];

export default function FoundationsDataStructuresPage() {
  const [activeSection, setActiveSection] = useState('definition');

  const sections = [
    { id: 'definition', name: 'What is a Data Structure?', icon: Database },
    { id: 'classification', name: 'Types & Classification', icon: GitBranch },
    { id: 'operations', name: 'Common Operations', icon: Settings },
  ];

  return (
    <ModuleLayout
      moduleId="foundations"
      moduleTitle="Foundations"
      moduleDescription="Jump to any section"
      sections={sections}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      backUrl="/learning-path/foundations"
      estimatedTime="15-18 minutes"
      difficulty="Beginner"
      totalSections={5}
      currentSectionIndex={1}
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 relative text-gray-700"
      >
        <div className="absolute top-0 right-0 flex items-center space-x-4 text-gray-700">
          <ProgressIndicator 
            topicId="foundations-data-structures" 
            topicType="foundations"
            category="learning-path"
          />
          <BookmarkButton 
            topicId="foundations-data-structures"
            topicType="foundations"
            title="Data Structures Deep Dive"
            category="learning-path"
            url="/learning-path/foundations/data-structures"
          />
        </div>
        
        <div className="inline-flex items-center bg-blue-100 text-blue-800 px-6 py-3 rounded-full text-sm font-medium mb-8">
          <Database className="w-5 h-5 mr-2 text-gray-700" />
          Chapter 2: Data Structure Classifications and Operations
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-8">
          Data Structures
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-gray-600">
            Deep Dive
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Learn about different types of data structures, their classifications, and the fundamental 
          operations that can be performed on them. Understand how to choose the right structure for your needs.
        </p>
      </motion.div>

      {/* Data Structure Definition */}
      <div id="definition" className="bg-white rounded-2xl p-8 shadow-lg border mb-12 text-gray-700">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <Database className="w-8 h-8 mr-3 text-blue-600" />
          What is a Data Structure?
        </h2>
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 mb-8 text-white">
          <p className="text-lg text-blue-900 leading-relaxed">
            A <strong>data structure</strong> is a particular way of storing and organizing data in a computer 
            so that it can be used efficiently. It represents the logical relationship existing between 
            individual elements of data and considers not only the elements stored but also their 
            relationship to each other.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 text-gray-700">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Functions:</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                <span>Depicts logical representation of data in memory</span>
              </li>
              <li className="flex items-center text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                <span>Represents relationships between data elements</span>
              </li>
              <li className="flex items-center text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                <span>Enables efficient manipulation of stored data</span>
              </li>
              <li className="flex items-center text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                <span>Allows programs to process data efficiently</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl text-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Example: Student Data Storage</h3>
            <div className="space-y-3 text-gray-700">
              <p className="text-gray-700"><strong>Data Structures:</strong> Arrays, Linked Lists</p>
              <p className="text-gray-700"><strong>Key Issues:</strong></p>
              <ul className="ml-4 space-y-1 text-gray-600">
                <li>• Space needed for storage</li>
                <li>• Operation efficiency (time required)</li>
                <li>• Retrieval, Insertion, Deletion performance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Data Structure Classification */}
      <div id="classification" className="bg-white rounded-2xl p-8 shadow-lg border mb-12 text-gray-700">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
          <GitBranch className="w-8 h-8 mr-3 text-purple-600" />
          Types of Data Structures
        </h2>
        
        <div className="space-y-8 text-gray-700">
          {dataStructureClassification.map((category, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-6 text-gray-700">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">{category.category}</h3>
              <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                {category.types.map((type, typeIndex) => (
                  <div key={typeIndex} className="bg-gray-50 p-6 rounded-xl text-gray-700">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{type.name}</h4>
                    <p className="text-gray-600 mb-3">{type.desc}</p>
                    <div className="flex flex-wrap gap-2 text-gray-700">
                      {type.examples.map((example, exampleIndex) => (
                        <span 
                          key={exampleIndex}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Structure Operations */}
      <div id="operations" className="bg-white rounded-2xl p-8 shadow-lg border mb-12 text-gray-700">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <Settings className="w-8 h-8 mr-3 text-green-600" />
          Common Operations on Data Structures
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700">
          {[
            { name: 'Creating', desc: 'Make/Create new data structure', icon: Play },
            { name: 'Inserting', desc: 'Adding new record to structure', icon: ArrowDown },
            { name: 'Traversing', desc: 'Accessing each record exactly once', icon: Search },
            { name: 'Searching', desc: 'Find location of record with specific key', icon: Target },
            { name: 'Deleting', desc: 'Removing existing record from structure', icon: AlertCircle },
            { name: 'Sorting', desc: 'Arranging data in specific order', icon: BarChart3 },
            { name: 'Merging', desc: 'Combining sorted records into single set', icon: GitBranch }
          ].map((operation, index) => {
            const IconComponent = operation.icon
            return (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border text-white">
                <div className="flex items-center mb-3 text-gray-700">
                  <IconComponent className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">{operation.name}</h3>
                </div>
                <p className="text-gray-600">{operation.desc}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="flex justify-between items-center mt-12 text-gray-700"
      >
        <Link
          href="/learning-path/foundations/introduction"
          className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700"
        >
          <ArrowLeft className="w-5 h-5 mr-2 text-gray-700" />
          Previous: Introduction
        </Link>
        <Link
          href="/learning-path/foundations/algorithms"
          className="flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold text-gray-100"
        >
          Next: Algorithm Design Paradigms
          <ChevronRight className="w-6 h-6 ml-2 text-gray-700" />
        </Link>
      </motion.div>
    </ModuleLayout>
  );
}