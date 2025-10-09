'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Target, 
  Info, 
  CheckCircle, 
  ArrowDown, 
  Settings,
  Users,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import { ModuleLayout } from '@/components/layouts/ModuleLayout';
import { ProgressIndicator } from '@/components/progress/ProgressIndicator';
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton';
import { SectionProgressIndicator } from '@/components/progress/SectionProgressIndicator';

export default function FoundationsIntroductionPage() {
  const [activeSection, setActiveSection] = useState('why-study');

  const sections = [
    { id: 'why-study', name: 'Why Study DSA?', icon: Target },
    { id: 'data-info', name: 'Data vs Information', icon: Info },
    { id: 'atomic-composite', name: 'Data Types', icon: BookOpen },
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
      estimatedTime="10-12 minutes"
      difficulty="Beginner"
      totalSections={5}
      currentSectionIndex={0}
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
            topicId="foundations-introduction" 
            topicType="foundations"
            category="learning-path"
          />
          <BookmarkButton 
            topicId="foundations-introduction"
            topicType="foundations"
            title="DSA Introduction & Concepts"
            category="learning-path"
            url="/learning-path/foundations/introduction"
          />
        </div>
        
        <div className="inline-flex items-center bg-blue-100 text-blue-800 px-6 py-3 rounded-full text-sm font-medium mb-8">
          <BookOpen className="w-5 h-5 mr-2 text-gray-700" />
          Chapter 1: Introduction to Data Structure and Algorithm
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-8">
          Introduction &
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-gray-600">
            Core Concepts
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Discover what data structures and algorithms are, why they&apos;re fundamental to computer science, 
          and understand the key distinctions between data and information that every programmer should know.
        </p>
      </motion.div>

      {/* What You&apos;ll Master - Only in Introduction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.8 }}
        className="mb-12 text-gray-700"
      >
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 text-white mb-8 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">What You&apos;ll Master in This Module</h2>
          <div className="grid md:grid-cols-3 gap-6 text-white">
            <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm text-gray-700">
              <Target className="w-12 h-12 mx-auto mb-4 text-white" />
              <h3 className="text-lg font-semibold mb-2 text-white">Problem Solving</h3>
              <p className="text-blue-100">Learn systematic approaches to computational problems</p>
            </div>
            <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm text-gray-700">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-white" />
              <h3 className="text-lg font-semibold mb-2 text-white">Core Concepts</h3>
              <p className="text-blue-100">Understand fundamental building blocks of computer science</p>
            </div>
            <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm text-gray-700">
              <Users className="w-12 h-12 mx-auto mb-4 text-white" />
              <h3 className="text-lg font-semibold mb-2 text-white">Best Practices</h3>
              <p className="text-blue-100">Apply industry-standard approaches to software development</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Why Study DSA */}
      <div id="why-study" className="bg-white rounded-2xl p-8 shadow-lg border mb-12 text-gray-700">
        <div className="flex items-center justify-between mb-6 text-gray-700">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <Target className="w-8 h-8 mr-3 text-blue-600" />
            Why Study Data Structures and Algorithms?
          </h2>
          <SectionProgressIndicator 
            moduleId="foundations"
            sectionId="why-study"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-8 text-gray-700">
          <div className="space-y-4 text-gray-700">
            <div className="flex items-start space-x-3 text-gray-700">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Efficient Solutions</h4>
                <p className="text-gray-600">Apply best practices for developing optimal solutions using programming</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 text-gray-700">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Right Tool for Job</h4>
                <p className="text-gray-600">Understand concepts to apply the best-fit data structure for requirements</p>
              </div>
            </div>
          </div>
          <div className="space-y-4 text-gray-700">
            <div className="flex items-start space-x-3 text-gray-700">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">System Architecture</h4>
                <p className="text-gray-600">Design, develop and optimize applications using computer programming</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 text-gray-700">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Reliable Solutions</h4>
                <p className="text-gray-600">Develop effective and reliable software solutions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data vs Information */}
      <div id="data-info" className="bg-white rounded-2xl p-8 shadow-lg border mb-12 text-gray-700">
        <div className="flex items-center justify-between mb-6 text-gray-700">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <Info className="w-8 h-8 mr-3 text-purple-600" />
            Understanding Data and Information
          </h2>
          <SectionProgressIndicator 
            moduleId="foundations"
            sectionId="data-information"
          />
        </div>
        <div className="grid lg:grid-cols-3 gap-8 text-gray-700">
          <div className="lg:col-span-1 text-gray-700">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 text-white">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">Input → Processing → Output</h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-center text-gray-700">
                  <div className="w-16 h-8 bg-gray-300 rounded mr-3 text-gray-700"></div>
                  <span className="text-sm text-gray-600">Raw Data</span>
                </div>
                <ArrowDown className="w-5 h-5 text-blue-600 mx-auto" />
                <div className="flex items-center text-gray-700">
                  <Settings className="w-8 h-8 text-blue-600 mr-3" />
                  <span className="text-sm text-gray-600">Processing</span>
                </div>
                <ArrowDown className="w-5 h-5 text-blue-600 mx-auto" />
                <div className="flex items-center text-gray-700">
                  <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
                  <span className="text-sm text-gray-600">Information</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 space-y-6 text-gray-700">
            <div className="grid md:grid-cols-2 gap-6 text-gray-700">
              <div className="bg-green-50 p-6 rounded-xl border border-green-200 text-gray-700">
                <h4 className="font-semibold text-green-900 mb-3">Data</h4>
                <p className="text-green-700 mb-3">Raw facts and figures without context or meaning</p>
                <div className="space-y-2 text-gray-700">
                  <code className="bg-white px-2 py-1 rounded text-sm block text-gray-600">42</code>
                  <code className="bg-white px-2 py-1 rounded text-sm block text-gray-600">&quot;John Smith&quot;</code>
                  <code className="bg-white px-2 py-1 rounded text-sm block text-gray-600">2024-10-06</code>
                </div>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-xl border border-purple-200 text-gray-700">
                <h4 className="font-semibold text-purple-900 mb-3">Information</h4>
                <p className="text-purple-700 mb-3">Processed data that has meaning and context</p>
                <div className="space-y-2 text-gray-700">
                  <div className="bg-white px-2 py-1 rounded text-sm text-gray-600">Age: 42 years</div>
                  <div className="bg-white px-2 py-1 rounded text-sm text-gray-600">Customer: John Smith</div>
                  <div className="bg-white px-2 py-1 rounded text-sm text-gray-600">Today&apos;s Date</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Atomic vs Composite Data */}
      <div id="atomic-composite" className="bg-white rounded-2xl p-8 shadow-lg border mb-12 text-gray-700">
        <div className="flex items-center justify-between mb-6 text-gray-700">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <BookOpen className="w-8 h-8 mr-3 text-indigo-600" />
            Types of Data: Atomic vs Composite
          </h2>
          <SectionProgressIndicator 
            moduleId="foundations"
            sectionId="data-types"
          />
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 text-gray-700">
          <div className="bg-green-50 p-6 rounded-xl border border-green-200 text-gray-700">
            <h4 className="font-semibold text-green-900 mb-3">Atomic Data</h4>
            <p className="text-green-700 mb-3">Single, indivisible value that cannot be broken down further</p>
            <div className="space-y-2 text-gray-700">
              <code className="bg-white px-2 py-1 rounded text-sm block text-gray-600">integer: 123</code>
              <code className="bg-white px-2 py-1 rounded text-sm block text-gray-600">float: 45.67</code>
              <code className="bg-white px-2 py-1 rounded text-sm block text-gray-600">char: &apos;A&apos;</code>
              <code className="bg-white px-2 py-1 rounded text-sm block text-gray-600">boolean: true</code>
            </div>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-xl border border-purple-200 text-gray-700">
            <h4 className="font-semibold text-purple-900 mb-3">Composite Data</h4>
            <p className="text-purple-700 mb-3">Can be broken into subfields or contains multiple values</p>
            <div className="space-y-2 text-gray-700">
              <code className="bg-white px-2 py-1 rounded text-sm block text-gray-600">Student {`{`}</code>
              <code className="bg-white px-2 py-1 rounded text-sm block ml-4 text-gray-600">roll_no: 123</code>
              <code className="bg-white px-2 py-1 rounded text-sm block ml-4 text-gray-600">name: &quot;John&quot;</code>
              <code className="bg-white px-2 py-1 rounded text-sm block ml-4 text-gray-600">faculty: &quot;CS&quot;</code>
              <code className="bg-white px-2 py-1 rounded text-sm block text-gray-600">{`}`}</code>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="flex justify-between items-center mt-12 text-gray-700"
      >
        <Link
          href="/learning-path/foundations"
          className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700"
        >
          <ArrowLeft className="w-5 h-5 mr-2 text-gray-700" />
          Back to Overview
        </Link>
        <Link
          href="/learning-path/foundations/data-structures"
          className="flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold text-gray-100"
        >
          Next: Data Structures Deep Dive
          <ChevronRight className="w-6 h-6 ml-2 text-gray-700" />
        </Link>
      </motion.div>
    </ModuleLayout>
  );
}