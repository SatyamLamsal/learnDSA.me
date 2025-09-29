'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle, Clock, BookOpen, Play, Star, Users, Award, ChevronDown, ChevronUp } from 'lucide-react';

interface LearningModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  lessons: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  topics: string[];
  completed: boolean;
  prerequisites?: string[];
}

interface LearningPath {
  title: string;
  description: string;
  totalDuration: string;
  modules: LearningModule[];
  skills: string[];
  projects: number;
  certificate: boolean;
}

const learningPath: LearningPath = {
  title: "Complete Data Structures & Algorithms Mastery",
  description: "Master DSA from fundamentals to advanced concepts. Build problem-solving skills through hands-on practice and real-world applications.",
  totalDuration: "12-16 weeks",
  skills: ["Problem Solving", "Algorithm Design", "Code Optimization", "System Design", "Technical Interviews"],
  projects: 8,
  certificate: true,
  modules: [
    {
      id: "foundations",
      title: "Foundations & Complexity Analysis",
      description: "Master algorithmic thinking, complexity analysis, and fundamental design paradigms that power all computer science problem-solving.",
      duration: "1-2 weeks",
      lessons: 18,
      difficulty: "Beginner",
      completed: false,
      topics: [
        "Big O, Omega, Theta Notations", 
        "Time & Space Complexity", 
        "Best/Worst/Average Case Analysis", 
        "Divide & Conquer Strategy",
        "Dynamic Programming Basics",
        "Greedy Algorithm Design",
        "Backtracking Approach",
        "Recursion vs Iteration",
        "Mathematical Foundations",
        "Algorithm Correctness Proofs",
        "Top-Down vs Bottom-Up Design",
        "Problem-Solving Techniques"
      ]
    },
    {
      id: "arrays",
      title: "Arrays & Basic Operations",
      description: "Now that you understand the foundations, let&apos;s dive into data structures starting with Arrays and Strings.",
      duration: "1-2 weeks", 
      lessons: 15,
      difficulty: "Beginner",
      completed: false,
      prerequisites: ["foundations"],
      topics: ["Array Traversal", "Two Pointer Technique", "Sliding Window", "Prefix Sums", "Array Rotations"]
    },
    {
      id: "searching-sorting",
      title: "Searching & Sorting Algorithms",
      description: "Learn essential sorting algorithms and efficient searching techniques.",
      duration: "2 weeks",
      lessons: 18,
      difficulty: "Beginner",
      completed: false,
      prerequisites: ["arrays"],
      topics: ["Binary Search", "Merge Sort", "Quick Sort", "Heap Sort", "Counting Sort", "Search Optimizations"]
    },
    {
      id: "linked-lists",
      title: "Linked Lists & Pointers",
      description: "Understand dynamic data structures and pointer manipulations.",
      duration: "1-2 weeks",
      lessons: 14,
      difficulty: "Intermediate",
      completed: false,
      prerequisites: ["arrays"],
      topics: ["Singly Linked Lists", "Doubly Linked Lists", "Circular Lists", "Floyd's Cycle Detection", "List Reversal"]
    },
    {
      id: "stacks-queues",
      title: "Stacks & Queues",
      description: "Master LIFO and FIFO data structures with practical applications.",
      duration: "1-2 weeks",
      lessons: 16,
      difficulty: "Intermediate", 
      completed: false,
      prerequisites: ["linked-lists"],
      topics: ["Stack Operations", "Queue Implementations", "Deque", "Priority Queues", "Expression Evaluation"]
    },
    {
      id: "trees",
      title: "Trees & Binary Trees",
      description: "Explore hierarchical data structures and tree algorithms.",
      duration: "2-3 weeks",
      lessons: 22,
      difficulty: "Intermediate",
      completed: false,
      prerequisites: ["stacks-queues"],
      topics: ["Binary Trees", "BST Operations", "Tree Traversals", "AVL Trees", "Tree Construction", "LCA Problems"]
    },
    {
      id: "hash-tables",
      title: "Hash Tables & Hashing",
      description: "Learn efficient key-value storage and collision resolution techniques.",
      duration: "1-2 weeks",
      lessons: 13,
      difficulty: "Intermediate",
      completed: false,
      prerequisites: ["arrays"],
      topics: ["Hash Functions", "Collision Resolution", "Load Factor", "Hash Maps", "Hash Sets", "Consistent Hashing"]
    },
    {
      id: "graphs",
      title: "Graphs & Graph Algorithms",
      description: "Master graph algorithms - the backbone of modern networking, AI, and optimization problems. From Dijkstra&apos;s to advanced flow algorithms.",
      duration: "2-3 weeks",
      lessons: 25,
      difficulty: "Advanced",
      completed: false,
      prerequisites: ["trees"],
      topics: ["Graph Representations", "DFS/BFS", "Shortest Paths", "MST", "Topological Sort", "Strongly Connected Components"]
    },
    {
      id: "dynamic-programming",
      title: "Dynamic Programming",
      description: "Learn optimization techniques and solve complex recursive problems.",
      duration: "2-3 weeks",
      lessons: 20,
      difficulty: "Advanced",
      completed: false,
      prerequisites: ["graphs"],
      topics: ["Memoization", "Tabulation", "Knapsack Problems", "LCS/LIS", "Matrix Chain", "DP on Trees"]
    },
    {
      id: "advanced-topics",
      title: "Advanced Algorithms & Techniques",
      description: "Explore advanced algorithmic techniques and competitive programming concepts.",
      duration: "2-3 weeks",
      lessons: 18,
      difficulty: "Advanced",
      completed: false,
      prerequisites: ["dynamic-programming"],
      topics: ["Greedy Algorithms", "Divide & Conquer", "Backtracking", "Bit Manipulation", "String Algorithms", "Advanced Data Structures"]
    }
  ]
};

export default function LearningPathPage() {
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  const toggleModule = (moduleId: string) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const totalLessons = learningPath.modules.reduce((acc, module) => acc + module.lessons, 0);
  const completedModules = learningPath.modules.filter(m => m.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">{learningPath.title}</h1>
            <p className="text-xl text-blue-100 mb-6 max-w-3xl mx-auto">
              {learningPath.description}
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold">{learningPath.totalDuration}</div>
                <div className="text-blue-200">Duration</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{totalLessons}</div>
                <div className="text-blue-200">Lessons</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{learningPath.modules.length}</div>
                <div className="text-blue-200">Modules</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{learningPath.projects}</div>
                <div className="text-blue-200">Projects</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center">
            <Link 
              href="/learning-path/foundations"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors mr-4 inline-flex items-center"
            >
              <Play className="inline-block w-5 h-5 mr-2" />
              Start Learning
            </Link>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors">
              <BookOpen className="inline-block w-5 h-5 mr-2" />
              Preview Course
            </button>
          </div>
        </div>
      </div>

      {/* Skills & Certificate Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-500" />
              Skills You&apos;ll Gain
            </h3>
            <div className="flex flex-wrap gap-2">
              {learningPath.skills.map((skill, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2 text--500" />
              What You&apos;ll Get
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-700">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                {learningPath.projects} hands-on projects
              </li>
              <li className="flex items-center text-gray-700">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                Interactive coding exercises
              </li>
              <li className="flex items-center text-gray-700">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                Progress tracking & analytics
              </li>
              {learningPath.certificate && (
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Certificate of completion
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Learning Modules */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Learning Path</h2>
          
          {/* Difficulty Filter */}
          <select 
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Overall Progress</h3>
            <span className="text-sm text-gray-600">{completedModules}/{learningPath.modules.length} modules completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedModules / learningPath.modules.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Module Cards */}
        <div className="space-y-4">
          {learningPath.modules
            .filter(module => selectedDifficulty === 'All' || module.difficulty === selectedDifficulty)
            .map((module, index) => (
            <div key={module.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div 
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleModule(module.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-semibold">
                      {index + 1}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-800">{module.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(module.difficulty)}`}>
                          {module.difficulty}
                        </span>
                        {module.completed && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                      <p className="text-gray-600 mb-2">{module.description}</p>
                      
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {module.duration}
                        </span>
                        <span className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-1" />
                          {module.lessons} lessons
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {expandedModule === module.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>

              {expandedModule === module.id && (
                <div className="px-6 pb-6 border-t border-gray-100 bg-gray-50">
                  <div className="pt-4">
                    <h4 className="font-medium text-gray-800 mb-3">Topics Covered:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                      {module.topics.map((topic, topicIndex) => (
                        <div key={topicIndex} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                          {topic}
                        </div>
                      ))}
                    </div>
                    
                    {module.prerequisites && (
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-800 mb-2">Prerequisites:</h4>
                        <div className="flex flex-wrap gap-2">
                          {module.prerequisites.map((prereq, prereqIndex) => (
                            <span key={prereqIndex} className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">
                              {learningPath.modules.find(m => m.id === prereq)?.title || prereq}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex gap-3">
                      <button 
                        onClick={() => {
                          const moduleRoutes: { [key: string]: string } = {
                            'foundations': '/learning-path/foundations',
                            'arrays': '/data-structures/arrays',
                            'searching-sorting': '/algorithms/sorting',
                            'linked-lists': '/data-structures/linked-lists',
                            'stacks-queues': '/data-structures/stacks',
                            'trees': '/data-structures/trees',
                            'hash-tables': '/data-structures/hash-tables',
                            'graphs': '/data-structures/graphs',
                            'dynamic-programming': '/algorithms/dynamic-programming',
                            'advanced-topics': '/algorithms/greedy'
                          };
                          window.location.href = moduleRoutes[module.id] || '/data-structures/arrays';
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        <Play className="w-4 h-4 inline mr-1" />
                        Start Module
                      </button>
                      <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                        Preview
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}