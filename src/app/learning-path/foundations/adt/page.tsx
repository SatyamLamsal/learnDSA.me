'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Code, 
  Shield, 
  Eye, 
  CheckCircle,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import { ModuleLayout } from '@/components/layouts/ModuleLayout';
import { ProgressIndicator } from '@/components/progress/ProgressIndicator';
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton';
import { SectionProgressIndicator } from '@/components/progress/SectionProgressIndicator';

const adtConcepts = [
  {
    title: 'Data Abstraction',
    description: 'Think about what you can do with data, not how it\'s implemented',
    benefits: ['Separation of concerns', 'Code reusability', 'Easier maintenance'],
    icon: Brain
  },
  {
    title: 'Encapsulation',
    description: 'Data and operations are bundled together, hiding internal details',
    benefits: ['Data protection', 'Interface consistency', 'Implementation flexibility'],
    icon: Shield
  },
  {
    title: 'Information Hiding',
    description: 'Internal representation is hidden from users',
    benefits: ['Security', 'Modularity', 'Reduced complexity'],
    icon: Eye
  }
];

export default function FoundationsADTPage() {
  const [activeSection, setActiveSection] = useState('introduction');

  const sections = [
    { id: 'introduction', name: 'What are ADTs?', icon: Brain },
    { id: 'concepts', name: 'Core Concepts', icon: Shield },
    { id: 'array-example', name: 'Array as ADT Example', icon: Code },
  ];

  return (
    <ModuleLayout
      moduleId="foundations"
      moduleTitle="Module 1: Foundations"
      moduleDescription="Jump to any section"
      sections={sections}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      backUrl="/learning-path/foundations"
      estimatedTime="15-18 minutes"
      difficulty="Intermediate"
      totalSections={5}
      currentSectionIndex={4}
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 relative"
      >
        <div className="absolute top-0 right-0 flex items-center space-x-4">
          <ProgressIndicator 
            topicId="foundations-adt" 
            topicType="foundations"
            category="learning-path"
          />
          <BookmarkButton 
            topicId="foundations-adt"
            topicType="foundations"
            title="Abstract Data Types"
            category="learning-path"
            url="/learning-path/foundations/adt"
          />
        </div>
        
        <div className="inline-flex items-center bg-blue-100 text-blue-800 px-6 py-3 rounded-full text-sm font-medium mb-8">
          <Brain className="w-5 h-5 mr-2" />
          Chapter 5: Abstract Data Types and Encapsulation
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-8">
          Abstract Data
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Types (ADT)
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Understand the power of abstraction in computer science. Learn how ADTs provide a clean interface 
          between data and operations, enabling modular and maintainable software design.
        </p>
      </motion.div>

      {/* ADT Introduction */}
      <div id="introduction" className="bg-white rounded-2xl p-8 shadow-lg border mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <Brain className="w-8 h-8 mr-3 text-indigo-600" />
          Abstract Data Types (ADT)
        </h2>
        
        <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-200 mb-8">
          <p className="text-lg text-indigo-900 leading-relaxed mb-4">
            An <strong>Abstract Data Type (ADT)</strong> is composed of a collection of data and 
            a set of operations on that data. It emphasizes what operations can be performed 
            rather than how they are implemented.
          </p>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold text-indigo-900 mb-3">ADT Components:</h4>
            <ul className="space-y-2 text-indigo-800">
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                Declaration of data
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                Declaration of operations
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                Encapsulation of data and operations
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ADT Concepts */}
      <div id="concepts" className="bg-white rounded-2xl p-8 shadow-lg border mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <Shield className="w-8 h-8 mr-3 text-green-600" />
          Core ADT Concepts
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {adtConcepts.map((concept, index) => {
            const IconComponent = concept.icon;
            return (
              <div key={index} className="bg-gray-50 p-6 rounded-xl border">
                <div className="flex items-center mb-4">
                  <IconComponent className="w-8 h-8 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">{concept.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{concept.description}</p>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Benefits:</h4>
                  <ul className="space-y-1">
                    {concept.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="text-gray-600 text-sm flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Array as ADT Example */}
      <div id="array-example" className="bg-white rounded-2xl p-8 shadow-lg border mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <Code className="w-8 h-8 mr-3 text-green-600" />
          Array as ADT Example
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Value Definition:</h3>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <code className="text-sm">
                {`abstract typedef <element_type, index_type> Array

//definition clause
element_type A [max_size]
index_type i

//condition clause
index_type == integer`}
              </code>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Implementation Requirements:</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                <div>
                  <h4 className="font-semibold">Data Representation</h4>
                  <p className="text-gray-600 text-sm">Must represent all necessary ADT values and be private</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                <div>
                  <h4 className="font-semibold">Algorithm for Operations</h4>
                  <p className="text-gray-600 text-sm">Consistent with chosen representation, private helpers</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Operator Definitions:</h3>
            
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Extract Operation (A[i]):</h4>
                <code className="text-sm text-blue-800 block mb-2">
                  abstract &lt;element_type&gt; Extract (A, i)
                </code>
                <div className="text-sm text-blue-700">
                  <p><strong>Precondition:</strong> 0 ≤ i &lt; max_size</p>
                  <p><strong>Postcondition:</strong> Extract == A[i]</p>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2">Store Operation:</h4>
                <code className="text-sm text-green-800 block mb-2">
                  abstract Store(A, i, value)
                </code>
                <div className="text-sm text-green-700">
                  <p><strong>Precondition:</strong> 0 ≤ i &lt; max_size</p>
                  <p><strong>Postcondition:</strong> A[i] == value</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="flex justify-between items-center mt-12"
      >
        <Link
          href="/learning-path/foundations/complexity"
          className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Previous: Complexity Analysis
        </Link>
        <div className="text-center">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl shadow-lg">
            <div className="flex items-center">
              <CheckCircle className="w-6 h-6 mr-2" />
              <span className="font-semibold text-lg">Foundations Complete!</span>
            </div>
            <p className="text-green-100 text-sm mt-1">Ready for practical implementation</p>
            <Link 
              href="/learning-path/module-2"
              className="mt-3 inline-flex items-center text-white hover:text-green-100 font-medium"
            >
              Start Module 2: Arrays & Linear Structures
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </motion.div>
    </ModuleLayout>
  );
}