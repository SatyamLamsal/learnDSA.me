'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle, Clock, BookOpen, Target, Star, Code2, Play, ChevronDown, ChevronUp } from 'lucide-react';
import { SectionProgressIndicator } from '@/components/progress/SectionProgressIndicator';
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton';

export default function Module3Page() {
  const [currentSection, setCurrentSection] = useState('introduction');
  const [expandedSection, setExpandedSection] = useState<string | null>('introduction');

  const sections = [
    {
      id: 'introduction',
      title: 'Searching & Sorting Introduction',
      duration: '15 min',
      completed: false,
    },
    {
      id: 'linear-search',
      title: 'Linear Search',
      duration: '20 min',
      completed: false,
    },
    {
      id: 'binary-search',
      title: 'Binary Search',
      duration: '30 min',
      completed: false,
    },
    {
      id: 'bubble-sort',
      title: 'Bubble Sort',
      duration: '25 min',
      completed: false,
    },
    {
      id: 'selection-sort',
      title: 'Selection Sort',
      duration: '25 min',
      completed: false,
    },
    {
      id: 'insertion-sort',
      title: 'Insertion Sort',
      duration: '25 min',
      completed: false,
    },
    {
      id: 'merge-sort',
      title: 'Merge Sort',
      duration: '40 min',
      completed: false,
    },
    {
      id: 'quick-sort',
      title: 'Quick Sort',
      duration: '40 min',
      completed: false,
    },
    {
      id: 'heap-sort',
      title: 'Heap Sort',
      duration: '35 min',
      completed: false,
    },
    {
      id: 'advanced-topics',
      title: 'Advanced Sorting Techniques',
      duration: '45 min',
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
                <h1 className="text-2xl font-bold text-gray-800">Module 3: Searching & Sorting Algorithms</h1>
                <p className="text-gray-600">Master fundamental searching and sorting techniques</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Module 3 of 10</div>
              <div className="text-sm font-medium">2 weeks • 18 lessons</div>
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
                            moduleId="module-3"
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
                      <h2 className="text-3xl font-bold text-gray-800 mb-2">Searching & Sorting Algorithms</h2>
                      <p className="text-gray-600">Essential algorithms that form the backbone of computer science</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <SectionProgressIndicator 
                        sectionId="introduction"
                        moduleId="module-3" 
                      />
                      <BookmarkButton
                        topicId="module-3-introduction"
                        topicType="module"
                        category="learning-path"
                        title="Searching & Sorting Introduction"
                        url="/learning-path/module-3#introduction"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="font-semibold text-gray-800">Duration</div>
                      <div className="text-blue-600">2 weeks</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="font-semibold text-gray-800">Lessons</div>
                      <div className="text-green-600">18 lessons</div>
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
                          Linear and Binary Search algorithms
                        </div>
                        <div className="flex items-center text-gray-700">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          Basic sorting: Bubble, Selection, Insertion
                        </div>
                        <div className="flex items-center text-gray-700">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          Advanced sorting: Merge Sort, Quick Sort
                        </div>
                        <div className="flex items-center text-gray-700">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          Heap Sort and priority queues
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-700">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          Time and space complexity analysis
                        </div>
                        <div className="flex items-center text-gray-700">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          When to use which algorithm
                        </div>
                        <div className="flex items-center text-gray-700">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          Stability and in-place concepts
                        </div>
                        <div className="flex items-center text-gray-700">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          Counting and Radix sort techniques
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="prose max-w-none">
                    <h3>Why Searching & Sorting Matter</h3>
                    <p>
                      Searching and sorting are fundamental operations in computer science. They&apos;re used everywhere - 
                      from organizing data in databases to powering search engines and recommendation systems. 
                      Understanding these algorithms deeply will:
                    </p>

                    <ul>
                      <li><strong>Build Algorithmic Thinking:</strong> Learn to analyze trade-offs between time and space</li>
                      <li><strong>Interview Preparation:</strong> These are the most commonly asked algorithm questions</li>
                      <li><strong>Foundation for Advanced Topics:</strong> Many complex algorithms build on these basics</li>
                      <li><strong>Real-world Applications:</strong> Direct application in software development</li>
                    </ul>

                    <h3>Learning Approach</h3>
                    <p>
                      We&apos;ll progress from simple to complex algorithms, with each section including:
                    </p>
                    <ul>
                      <li>Visual step-by-step demonstrations</li>
                      <li>Complexity analysis and comparison</li>
                      <li>When to use each algorithm</li>
                      <li>Implementation in multiple programming languages</li>
                      <li>Practice problems and real-world applications</li>
                    </ul>

                    <h3>Prerequisites</h3>
                    <p>
                      Before starting this module, ensure you&apos;ve completed:
                    </p>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 my-4 space-y-2">
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2 text-orange-600" />
                        <Link href="/learning-path/foundations" className="text-orange-700 hover:text-orange-800 font-medium">
                          Module 1: Foundations & Complexity Analysis
                        </Link>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2 text-orange-600" />
                        <Link href="/learning-path/module-2" className="text-orange-700 hover:text-orange-800 font-medium">
                          Module 2: Arrays & Basic Operations
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
                                moduleId="module-3"
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
                                Coming soon - This section will include interactive visualizations, 
                                complexity analysis, and hands-on coding exercises.
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
                  <p className="text-gray-600">This section is coming soon with interactive visualizations and step-by-step tutorials.</p>
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
              href="/learning-path/module-2"
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Arrays & Basic Operations
            </Link>
            <Link
              href="/data-structures/linked-lists"
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              Next: Linked Lists & Pointers
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}