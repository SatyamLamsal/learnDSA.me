'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle, Clock, BookOpen, Target, Star, Code2, Play, ChevronDown, ChevronUp } from 'lucide-react';
import { SectionProgressIndicator } from '@/components/progress/SectionProgressIndicator';
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton';

export default function Module2Page() {
  const [currentSection, setCurrentSection] = useState('introduction');
  const [expandedSection, setExpandedSection] = useState<string | null>('introduction');

  const sections = [
    {
      id: 'introduction',
      title: 'Arrays & Basic Operations Introduction',
      duration: '15 min',
      completed: false,
    },
    {
      id: 'array-basics',
      title: 'Array Fundamentals',
      duration: '25 min',
      completed: false,
    },
    {
      id: 'array-operations',
      title: 'Basic Array Operations',
      duration: '30 min',
      completed: false,
    },
    {
      id: 'two-pointer',
      title: 'Two Pointer Technique',
      duration: '35 min',
      completed: false,
    },
    {
      id: 'sliding-window',
      title: 'Sliding Window Pattern',
      duration: '40 min',
      completed: false,
    },
    {
      id: 'practice',
      title: 'Practice Problems',
      duration: '60 min',
      completed: false,
    },
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const goToSection = (sectionId: string) => {
    setCurrentSection(sectionId);
    setExpandedSection(sectionId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/learning-path" className="text-blue-600 hover:text-blue-800">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Module 2: Arrays & Basic Operations</h1>
                <p className="text-gray-600">Master the foundation of data structures</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Module 2 of 10</div>
              <div className="text-sm font-medium">1-2 weeks • 15 lessons</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h3 className="font-semibold text-gray-800 mb-4">Module Content</h3>
              <nav className="space-y-2">
                {sections.map((section, index) => (
                  <div key={section.id}>
                    <button
                      onClick={() => goToSection(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        currentSection === section.id
                          ? 'bg-blue-100 text-blue-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{index + 1}. {section.title}</span>
                        <div className="flex items-center space-x-1">
                          <SectionProgressIndicator 
                            sectionId={section.id}
                            moduleId="module-2"
                          />
                        </div>
                      </div>
                    </button>
                  </div>
                ))}
              </nav>
              
              <div className="mt-6 pt-4 border-t">
                <div className="text-xs text-gray-500 mb-2">Overall Progress</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">0 of {sections.length} completed</div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {currentSection === 'introduction' && (
              <div className="space-y-8">
                {/* Introduction Section */}
                <div className="bg-white rounded-xl shadow-sm p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-800 mb-2">Arrays & Basic Operations</h2>
                      <p className="text-gray-600">Building on your foundation, let&apos;s explore the most fundamental data structure</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <SectionProgressIndicator 
                        sectionId="introduction"
                        moduleId="module-2" 
                      />
                      <BookmarkButton
                        topicId="module-2-introduction"
                        topicType="module"
                        category="learning-path"
                        title="Arrays Introduction"
                        url="/learning-path/module-2#introduction"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="font-semibold text-gray-800">Duration</div>
                      <div className="text-blue-600">1-2 weeks</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="font-semibold text-gray-800">Lessons</div>
                      <div className="text-green-600">15 lessons</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <div className="font-semibold text-gray-800">Difficulty</div>
                      <div className="text-purple-600">Beginner</div>
                    </div>
                  </div>

                  {/* What You'll Master */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <Star className="w-5 h-5 mr-2 text-yellow-500" />
                      What You&apos;ll Master in This Module
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-700">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          Array fundamentals and memory layout
                        </div>
                        <div className="flex items-center text-gray-700">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          Basic array operations (insert, delete, search)
                        </div>
                        <div className="flex items-center text-gray-700">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          Two-pointer technique mastery
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-700">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          Sliding window pattern
                        </div>
                        <div className="flex items-center text-gray-700">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          Prefix sum techniques
                        </div>
                        <div className="flex items-center text-gray-700">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          Array rotation algorithms
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="prose max-w-none">
                    <h3>Why Arrays Matter</h3>
                    <p>
                      Arrays are the foundation of computer science data structures. Every advanced data structure, from dynamic arrays to hash tables, builds upon array concepts. In this module, we&apos;ll dive deep into:
                    </p>

                    <ul>
                      <li><strong>Memory and Performance:</strong> Understanding how arrays work at the hardware level</li>
                      <li><strong>Core Operations:</strong> Insertion, deletion, searching, and traversal</li>
                      <li><strong>Problem-Solving Patterns:</strong> Two pointers, sliding window, and prefix sums</li>
                      <li><strong>Real-world Applications:</strong> From image processing to database indexing</li>
                    </ul>

                    <h3>Prerequisites</h3>
                    <p>
                      Before starting this module, make sure you&apos;ve completed:
                    </p>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 my-4">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2 text-orange-600" />
                        <Link href="/learning-path/foundations" className="text-orange-700 hover:text-orange-800 font-medium">
                          Module 1: Foundations & Complexity Analysis
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Learning Path */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Module Content</h3>
                  <div className="space-y-3">
                    {sections.slice(1).map((section, index) => (
                      <div key={section.id} className="border border-gray-200 rounded-lg">
                        <button
                          onClick={() => toggleSection(section.id)}
                          className="w-full text-left p-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                                {index + 1}
                              </div>
                              <div>
                                <div className="font-medium text-gray-800">{section.title}</div>
                                <div className="text-sm text-gray-500">{section.duration}</div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <SectionProgressIndicator 
                                sectionId={section.id}
                                moduleId="module-2"
                              />
                              {expandedSection === section.id ? (
                                <ChevronUp className="w-5 h-5 text-gray-400" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-gray-400" />
                              )}
                            </div>
                          </div>
                        </button>

                        {expandedSection === section.id && (
                          <div className="px-4 pb-4 border-t border-gray-100 bg-gray-50">
                            <div className="pt-4">
                              <p className="text-gray-600 mb-4">
                                Coming soon - This section is being developed with interactive examples and practice problems.
                              </p>
                              <button
                                onClick={() => goToSection(section.id)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                              >
                                <Play className="w-4 h-4 inline mr-1" />
                                Start Section
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Other sections placeholder */}
            {currentSection !== 'introduction' && (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <div className="mb-4">
                  <Code2 className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {sections.find(s => s.id === currentSection)?.title}
                  </h2>
                  <p className="text-gray-600">This section is coming soon with interactive content and exercises.</p>
                </div>
                
                <div className="space-y-4">
                  <button 
                    onClick={() => goToSection('introduction')}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Back to Introduction
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-t">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link
              href="/learning-path/foundations"
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Foundations
            </Link>
            <Link
              href="/learning-path/module-3"
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              Next: Searching & Sorting
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}