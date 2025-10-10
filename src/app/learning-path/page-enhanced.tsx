'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, BookOpen, Users, Award, TrendingUp, Target } from 'lucide-react';
import { LearningPathNavigation } from '@/components/navigation/LearningPathNavigation';

export default function LearningPathPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Master Data Structures & Algorithms
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Complete step-by-step learning path from fundamentals to advanced concepts. 
            Build problem-solving skills through hands-on practice and real-world applications.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="bg-white p-4 rounded-xl shadow-lg border">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-blue-600 mr-2" />
                <span className="font-medium text-gray-700">12-16 weeks</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-lg border">
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 text-green-600 mr-2" />
                <span className="font-medium text-gray-700">6 Modules</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-lg border">
              <div className="flex items-center">
                <Users className="w-5 h-5 text-purple-600 mr-2" />
                <span className="font-medium text-gray-700">50+ Lessons</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-lg border">
              <div className="flex items-center">
                <Award className="w-5 h-5 text-orange-600 mr-2" />
                <span className="font-medium text-gray-700">Certificate</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {["Problem Solving", "Algorithm Design", "Code Optimization", "System Design", "Technical Interviews"].map((skill, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Enhanced Navigation */}
          <div className="lg:col-span-2">
            <LearningPathNavigation 
              showProgress={true}
              currentPath={typeof window !== 'undefined' ? window.location.pathname : ''}
            />
          </div>

          {/* Quick Stats & Info */}
          <div className="space-y-6">
            {/* Progress Overview */}
            <div className="bg-white rounded-2xl shadow-lg border p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
                Your Progress
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Overall Completion</span>
                  <span className="font-bold text-green-600">15%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">5</div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">45+</div>
                    <div className="text-sm text-gray-600">Remaining</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Start Guide */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Target className="w-6 h-6 mr-2" />
                Quick Start Guide
              </h3>
              <div className="space-y-3 text-blue-100">
                <div className="flex items-start">
                  <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
                  <div>
                    <div className="font-semibold text-white">Start with Foundations</div>
                    <div className="text-sm">Learn core concepts and complexity analysis</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
                  <div>
                    <div className="font-semibold text-white">Practice Interactive Demos</div>
                    <div className="text-sm">Use visualizations to understand concepts</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
                  <div>
                    <div className="font-semibold text-white">Build Real Projects</div>
                    <div className="text-sm">Apply knowledge through hands-on coding</div>
                  </div>
                </div>
              </div>
              <Link 
                href="/learning-path/foundations" 
                className="inline-block mt-4 bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Begin Learning Path
              </Link>
            </div>

            {/* Learning Tips */}
            <div className="bg-white rounded-2xl shadow-lg border p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">💡 Learning Tips</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Complete lessons in order for best understanding</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Use interactive demos to visualize concepts</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Practice coding examples in your preferred language</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Review complexity analysis for each structure</span>
                </div>
              </div>
            </div>

            {/* Achievement Preview */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Award className="w-6 h-6 mr-2 text-green-600" />
                What You&apos;ll Achieve
              </h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span>Master 10+ essential data structures</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span>Learn 20+ fundamental algorithms</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span>Build 8+ coding projects</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span>Ace technical interviews</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span>Earn completion certificate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}