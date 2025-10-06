'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ChevronRight, 
  BookOpen,
  Database,
  Code,
  BarChart3,
  Brain,
  Clock,
  Target,
  CheckCircle,
  Users,
  Award,
  Lightbulb
} from 'lucide-react';

const FoundationCard = ({ 
  title, 
  description, 
  href, 
  icon: Icon, 
  difficulty, 
  timeEstimate,
  completed = false 
}: {
  title: string;
  description: string;
  href: string;
  icon: any;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeEstimate: string;
  completed?: boolean;
}) => (
  <Link href={href}>
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${
        completed 
          ? 'bg-green-50 border-green-200 hover:border-green-300' 
          : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-lg'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${
            completed ? 'bg-green-100' : 'bg-blue-100'
          }`}>
            <Icon className={`w-6 h-6 ${
              completed ? 'text-green-600' : 'text-blue-600'
            }`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <div className="flex items-center space-x-3 text-sm">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {difficulty}
              </span>
              <div className="flex items-center text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                {timeEstimate}
              </div>
            </div>
          </div>
        </div>
        {completed && (
          <CheckCircle className="w-6 h-6 text-green-600" />
        )}
      </div>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">{description}</p>
      <div className="flex items-center text-blue-600 font-medium">
        <span>Start Learning</span>
        <ChevronRight className="w-4 h-4 ml-1" />
      </div>
    </motion.div>
  </Link>
);

export default function FoundationsOverviewPage() {
  const learningPath = [
    {
      title: 'Introduction & Concepts',
      description: 'Understand what data structures and algorithms are, why they matter, and the difference between data and information.',
      href: '/learning-path/foundations/introduction',
      icon: BookOpen,
      difficulty: 'Beginner' as const,
      timeEstimate: '10-12 min',
      completed: false
    },
    {
      title: 'Data Structures Deep Dive',
      description: 'Learn about different types of data structures, their classifications, and common operations performed on them.',
      href: '/learning-path/foundations/data-structures',
      icon: Database,
      difficulty: 'Beginner' as const,
      timeEstimate: '15-18 min',
      completed: false
    },
    {
      title: 'Algorithm Design Paradigms',
      description: 'Master essential algorithm design techniques including greedy, divide-and-conquer, dynamic programming, and more.',
      href: '/learning-path/foundations/algorithms',
      icon: Code,
      difficulty: 'Intermediate' as const,
      timeEstimate: '20-25 min',
      completed: false
    },
    {
      title: 'Complexity Analysis',
      description: 'Master Big O, Omega, and Theta notations with interactive visualizations of different complexity growth rates.',
      href: '/learning-path/foundations/complexity',
      icon: BarChart3,
      difficulty: 'Intermediate' as const,
      timeEstimate: '25-30 min',
      completed: false
    },
    {
      title: 'Abstract Data Types',
      description: 'Understand ADTs, data abstraction, encapsulation, and see practical examples like arrays as ADTs.',
      href: '/learning-path/foundations/adt',
      icon: Brain,
      difficulty: 'Intermediate' as const,
      timeEstimate: '15-18 min',
      completed: false
    }
  ];

  const keyTakeaways = [
    {
      title: 'Problem Solving',
      description: 'Learn systematic approaches to breaking down complex problems into manageable algorithmic solutions.',
      icon: Target
    },
    {
      title: 'Efficiency Analysis',
      description: 'Master the art of analyzing time and space complexity to choose optimal solutions for real-world applications.',
      icon: BarChart3
    },
    {
      title: 'Design Patterns',
      description: 'Understand fundamental algorithm design paradigms that form the backbone of efficient software development.',
      icon: Lightbulb
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-4 mb-6">
            <Link href="/learning-path" className="text-white hover:text-blue-200">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <div className="text-sm font-medium text-blue-200 mb-2">Module 1 • Foundations</div>
              <h1 className="text-5xl font-bold mb-4">Data Structures & Algorithms Fundamentals</h1>
              <p className="text-xl text-blue-100 max-w-3xl">
                Build a rock-solid foundation in computer science fundamentals. Master essential concepts, 
                algorithm design patterns, and complexity analysis that every programmer needs to know.
              </p>
            </div>
          </div>
          
          {/* Module Stats */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Clock className="w-8 h-8 text-blue-200" />
                <div>
                  <div className="text-2xl font-bold">85-100 min</div>
                  <div className="text-blue-200 text-sm">Total Learning Time</div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Target className="w-8 h-8 text-green-200" />
                <div>
                  <div className="text-2xl font-bold">15+</div>
                  <div className="text-blue-200 text-sm">Key Concepts</div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Award className="w-8 h-8 text-yellow-200" />
                <div>
                  <div className="text-2xl font-bold">5</div>
                  <div className="text-blue-200 text-sm">Core Sections</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
        {/* Learning Path */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Learning Journey</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Follow this carefully designed path to master the fundamentals of computer science. 
              Each section builds upon the previous, creating a comprehensive understanding.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {learningPath.map((item, index) => (
              <FoundationCard key={index} {...item} />
            ))}
          </div>
        </motion.div>

        {/* What You'll Master */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 text-white"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">What You'll Master</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
              <BarChart3 className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Complexity Analysis</h3>
              <p className="text-blue-100">Master Big O, Omega, and Theta notations to analyze algorithm efficiency</p>
            </div>
            <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
              <Brain className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Algorithm Design</h3>
              <p className="text-blue-100">Learn paradigms like divide-and-conquer, dynamic programming, and greedy algorithms</p>
            </div>
            <div className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
              <Database className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Data Structures</h3>
              <p className="text-blue-100">Understand arrays, linked lists, trees, graphs, and their applications</p>
            </div>
          </div>
        </motion.div>

        {/* Key Learning Outcomes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-8 shadow-lg border"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <Lightbulb className="w-8 h-8 mr-3 text-yellow-600" />
            Key Learning Outcomes
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {keyTakeaways.map((takeaway, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <takeaway.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{takeaway.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{takeaway.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Prerequisites & Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Prerequisites */}
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
              <CheckCircle className="w-6 h-6 mr-2" />
              Prerequisites
            </h3>
            <ul className="space-y-2 text-blue-800">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Basic programming knowledge (any language)
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Understanding of variables, loops, and functions
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Basic mathematics (high school level)
              </li>
            </ul>
          </div>

          {/* Next Steps */}
          <div className="bg-green-50 rounded-xl p-6 border border-green-200">
            <h3 className="text-xl font-semibold text-green-900 mb-4 flex items-center">
              <ChevronRight className="w-6 h-6 mr-2" />
              What's Next
            </h3>
            <ul className="space-y-2 text-green-800">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                Module 2: Arrays & Linear Structures
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                Module 3: Searching & Sorting Algorithms
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                Module 4: Trees & Hierarchical Data
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-12"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your Foundation?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Start with fundamental concepts and work your way through algorithm design patterns, 
            complexity analysis, and abstract data types.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              href="/learning-path/foundations/introduction"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center"
            >
              <span>Start Learning</span>
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
            
            <Link
              href="/learning-path"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors flex items-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span>Back to Modules</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}