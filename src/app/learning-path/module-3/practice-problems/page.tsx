'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Target, 
  Info, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Package,
  ChevronRight,
  Code,
  Play,
  RotateCcw,
  Settings,
  Star,
  Shuffle,
  RefreshCw,
  ArrowUpDown,
  Network,
  Cpu,
  Globe,
  Database,
  Users,
  Clock,
  Calendar,
  Printer,
  Download,
  Upload,
  Layers,
  ArrowDown,
  ArrowUp,
  Scale,
  Zap,
  Brain,
  Award,
  Trophy,
  Lightbulb,
  BookmarkCheck,
  PlayCircle,
  Eye,
  EyeOff,
  Copy,
  Check
} from 'lucide-react';
import Link from 'next/link';
import { EnhancedModuleLayout } from '@/components/layouts/EnhancedModuleLayout';
import { ProgressIndicator } from '@/components/progress/ProgressIndicator';
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton';
import { SectionProgressIndicator } from '@/components/progress/SectionProgressIndicator';

export default function PracticeProblemsPage() {
  const [activeSection, setActiveSection] = useState('easy-problems');
  const [selectedProblem, setSelectedProblem] = useState('valid-parentheses');
  const [showSolution, setShowSolution] = useState<Record<string, boolean>>({});
  const [copiedCode, setCopiedCode] = useState('');

  const sections = [
    { id: 'easy-problems', name: 'Easy Problems', icon: Star },
    { id: 'medium-problems', name: 'Medium Problems', icon: Award },
    { id: 'hard-problems', name: 'Hard Problems', icon: Trophy },
    { id: 'coding-challenges', name: 'Coding Challenges', icon: Code },
  ];

  const problems = {
    easy: [
      {
        id: 'valid-parentheses',
        title: 'Valid Parentheses',
        difficulty: 'Easy',
        description: 'Given a string containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
        examples: [
          { input: '"()"', output: 'true' },
          { input: '"()[]{}"', output: 'true' },
          { input: '"(]"', output: 'false' }
        ],
        dataStructure: 'Stack',
        approach: 'Use stack to match opening and closing brackets',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        solution: `function isValid(s) {
    const stack = [];
    const mapping = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    
    for (let char of s) {
        if (char in mapping) {
            // Closing bracket
            const topElement = stack.length === 0 ? '#' : stack.pop();
            if (mapping[char] !== topElement) {
                return false;
            }
        } else {
            // Opening bracket
            stack.push(char);
        }
    }
    
    return stack.length === 0;
}`
      },
      {
        id: 'implement-queue-using-stacks',
        title: 'Implement Queue using Stacks',
        difficulty: 'Easy',
        description: 'Implement a first in first out (FIFO) queue using only two stacks.',
        examples: [
          { input: 'push(1), push(2), peek(), pop()', output: '2, 1' }
        ],
        dataStructure: 'Stack + Queue',
        approach: 'Use two stacks - one for input, one for output',
        timeComplexity: 'O(1) amortized',
        spaceComplexity: 'O(n)',
        solution: `class MyQueue {
    constructor() {
        this.inputStack = [];
        this.outputStack = [];
    }
    
    push(x) {
        this.inputStack.push(x);
    }
    
    pop() {
        this.peek();
        return this.outputStack.pop();
    }
    
    peek() {
        if (this.outputStack.length === 0) {
            while (this.inputStack.length > 0) {
                this.outputStack.push(this.inputStack.pop());
            }
        }
        return this.outputStack[this.outputStack.length - 1];
    }
    
    empty() {
        return this.inputStack.length === 0 && this.outputStack.length === 0;
    }
}`
      },
      {
        id: 'first-unique-character',
        title: 'First Unique Character in a String',
        difficulty: 'Easy',
        description: 'Given a string s, find the first non-repeating character in it and return its index.',
        examples: [
          { input: '"leetcode"', output: '0' },
          { input: '"loveleetcode"', output: '2' }
        ],
        dataStructure: 'Queue + HashMap',
        approach: 'Use queue to maintain order and map for frequency',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        solution: `function firstUniqChar(s) {
    const charCount = {};
    const queue = [];
    
    // Count frequency of each character
    for (let char of s) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    // Find first character with count 1
    for (let i = 0; i < s.length; i++) {
        if (charCount[s[i]] === 1) {
            return i;
        }
    }
    
    return -1;
}`
      }
    ],
    medium: [
      {
        id: 'evaluate-postfix',
        title: 'Evaluate Reverse Polish Notation',
        difficulty: 'Medium',
        description: 'Evaluate the value of an arithmetic expression in Reverse Polish Notation.',
        examples: [
          { input: '["2","1","+","3","*"]', output: '9' },
          { input: '["4","13","5","/","+"]', output: '6' }
        ],
        dataStructure: 'Stack',
        approach: 'Push operands to stack, pop for operators',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        solution: `function evalRPN(tokens) {
    const stack = [];
    const operators = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => Math.trunc(a / b)
    };
    
    for (let token of tokens) {
        if (token in operators) {
            const b = stack.pop();
            const a = stack.pop();
            stack.push(operators[token](a, b));
        } else {
            stack.push(parseInt(token));
        }
    }
    
    return stack[0];
}`
      },
      {
        id: 'daily-temperatures',
        title: 'Daily Temperatures',
        difficulty: 'Medium',
        description: 'Given an array of integers temperatures, return an array where each element is the number of days you have to wait for a warmer temperature.',
        examples: [
          { input: '[73,74,75,71,69,72,76,73]', output: '[1,1,4,2,1,1,0,0]' }
        ],
        dataStructure: 'Stack',
        approach: 'Monotonic stack to find next greater element',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        solution: `function dailyTemperatures(temperatures) {
    const result = new Array(temperatures.length).fill(0);
    const stack = []; // Stack stores indices
    
    for (let i = 0; i < temperatures.length; i++) {
        while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            const prevIndex = stack.pop();
            result[prevIndex] = i - prevIndex;
        }
        stack.push(i);
    }
    
    return result;
}`
      },
      {
        id: 'sliding-window-maximum',
        title: 'Sliding Window Maximum',
        difficulty: 'Medium',
        description: 'Given an array and a sliding window of size k, find the maximum for each window.',
        examples: [
          { input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3', output: '[3,3,5,5,6,7]' }
        ],
        dataStructure: 'Deque',
        approach: 'Monotonic deque to maintain maximum',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(k)',
        solution: `function maxSlidingWindow(nums, k) {
    const result = [];
    const deque = []; // Store indices
    
    for (let i = 0; i < nums.length; i++) {
        // Remove elements outside window
        while (deque.length > 0 && deque[0] <= i - k) {
            deque.shift();
        }
        
        // Remove smaller elements from rear
        while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
            deque.pop();
        }
        
        deque.push(i);
        
        // Add to result once window is formed
        if (i >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }
    
    return result;
}`
      }
    ],
    hard: [
      {
        id: 'largest-rectangle-histogram',
        title: 'Largest Rectangle in Histogram',
        difficulty: 'Hard',
        description: 'Given an array of integers heights representing the histogram\'s bar height, find the area of the largest rectangle.',
        examples: [
          { input: '[2,1,5,6,2,3]', output: '10' },
          { input: '[2,4]', output: '4' }
        ],
        dataStructure: 'Stack',
        approach: 'Stack to find previous and next smaller elements',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        solution: `function largestRectangleArea(heights) {
    const stack = [];
    let maxArea = 0;
    
    for (let i = 0; i <= heights.length; i++) {
        const currentHeight = i === heights.length ? 0 : heights[i];
        
        while (stack.length > 0 && currentHeight < heights[stack[stack.length - 1]]) {
            const height = heights[stack.pop()];
            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, height * width);
        }
        
        stack.push(i);
    }
    
    return maxArea;
}`
      },
      {
        id: 'trapping-rain-water',
        title: 'Trapping Rain Water',
        difficulty: 'Hard',
        description: 'Given n non-negative integers representing an elevation map, compute how much water it can trap after raining.',
        examples: [
          { input: '[0,1,0,2,1,0,1,3,2,1,2,1]', output: '6' },
          { input: '[4,2,0,3,2,5]', output: '9' }
        ],
        dataStructure: 'Stack',
        approach: 'Stack to calculate trapped water level by level',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        solution: `function trap(height) {
    const stack = [];
    let water = 0;
    
    for (let i = 0; i < height.length; i++) {
        while (stack.length > 0 && height[i] > height[stack[stack.length - 1]]) {
            const top = stack.pop();
            
            if (stack.length === 0) break;
            
            const distance = i - stack[stack.length - 1] - 1;
            const boundedHeight = Math.min(height[i], height[stack[stack.length - 1]]) - height[top];
            water += distance * boundedHeight;
        }
        
        stack.push(i);
    }
    
    return water;
}`
      }
    ]
  };

  const toggleSolution = (problemId: string) => {
    setShowSolution(prev => ({
      ...prev,
      [problemId]: !prev[problemId]
    }));
  };

  const copyCode = (code: string, problemId: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(problemId);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  return (
    <EnhancedModuleLayout
      moduleId="module-3"
      moduleTitle="Stacks & Queues"
      moduleDescription="Master LIFO and FIFO data structures"
      sections={sections}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      backUrl="/learning-path/module-3"
      estimatedTime="45-60 minutes"
      difficulty="Intermediate"
      totalSections={8}
      currentPath="/learning-path/module-3/practice-problems"
      showFullCourseStructure={true}
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
            topicId="practice-problems" 
            topicType="stacks-queues"
            category="learning-path"
          />
          <BookmarkButton 
            topicId="practice-problems"
            topicType="stacks-queues"
            title="Practice Problems"
            category="learning-path"
            url="/learning-path/module-3/practice-problems"
          />
        </div>
        
        <div className="inline-flex items-center bg-indigo-100 text-indigo-800 px-6 py-3 rounded-full text-sm font-medium mb-8">
          <Code className="w-5 h-5 mr-2" />
          Lesson 8: Practice Problems & Coding Challenges
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-8">
          Practice
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Problems
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Test your understanding with carefully selected problems from easy to hard. 
          Each problem includes detailed solutions, complexity analysis, and step-by-step explanations 
          to help you master stacks and queues.
        </p>
      </motion.div>

      {/* Learning Objectives */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.8 }}
        className="mb-12"
      >
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Practice Objectives</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="flex items-start space-x-3">
              <Star className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">Easy Problems</h3>
                <p className="text-sm text-gray-600">Build confidence with basics</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Award className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">Medium Problems</h3>
                <p className="text-sm text-gray-600">Apply advanced techniques</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Trophy className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">Hard Problems</h3>
                <p className="text-sm text-gray-600">Master complex scenarios</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Code className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">Coding Skills</h3>
                <p className="text-sm text-gray-600">Interview preparation</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Easy Problems */}
      <div id="easy-problems" className="bg-white rounded-2xl p-8 shadow-lg border mb-12 text-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <Star className="w-8 h-8 mr-3 text-green-600" />
            Easy Problems
          </h2>
          <SectionProgressIndicator 
            moduleId="module-3"
            sectionId="easy-problems"
          />
        </div>
        
        <div className="space-y-6">
          <p className="text-gray-600 text-lg leading-relaxed">
            Start with these fundamental problems to build confidence and understand core concepts. 
            Each problem focuses on basic stack and queue operations.
          </p>
          
          {problems.easy.map((problem) => (
            <div key={problem.id} className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <h4 className="font-bold text-green-900 text-lg">{problem.title}</h4>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    {problem.difficulty}
                  </span>
                </div>
                <button
                  onClick={() => toggleSolution(problem.id)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  {showSolution[problem.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  <span>{showSolution[problem.id] ? 'Hide Solution' : 'Show Solution'}</span>
                </button>
              </div>
              
              <p className="text-green-800 mb-4">{problem.description}</p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div className="bg-white p-4 rounded-lg border">
                  <h5 className="font-semibold text-gray-800 mb-2">Examples:</h5>
                  <div className="space-y-2 text-sm">
                    {problem.examples.map((example, index) => (
                      <div key={index} className="bg-gray-50 p-2 rounded font-mono text-xs">
                        <div><strong>Input:</strong> {example.input}</div>
                        <div><strong>Output:</strong> {example.output}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <h5 className="font-semibold text-gray-800 mb-2">Problem Details:</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Data Structure:</span>
                      <span className="font-medium text-green-600">{problem.dataStructure}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time Complexity:</span>
                      <span className="font-medium text-blue-600">{problem.timeComplexity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Space Complexity:</span>
                      <span className="font-medium text-purple-600">{problem.spaceComplexity}</span>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-gray-50 rounded">
                    <div className="text-sm text-gray-700">
                      <strong>Approach:</strong> {problem.approach}
                    </div>
                  </div>
                </div>
              </div>
              
              {showSolution[problem.id] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-gray-900 rounded-lg p-4 relative"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-semibold text-white">Solution:</h5>
                    <button
                      onClick={() => copyCode(problem.solution, problem.id)}
                      className="flex items-center space-x-2 px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
                    >
                      {copiedCode === problem.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedCode === problem.id ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="text-green-300 text-sm overflow-x-auto">
                    <code>{problem.solution}</code>
                  </pre>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Medium Problems */}
      <div id="medium-problems" className="bg-white rounded-2xl p-8 shadow-lg border mb-12 text-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <Award className="w-8 h-8 mr-3 text-orange-600" />
            Medium Problems
          </h2>
          <SectionProgressIndicator 
            moduleId="module-3"
            sectionId="medium-problems"
          />
        </div>
        
        <div className="space-y-6">
          <p className="text-gray-600 text-lg leading-relaxed">
            Challenge yourself with these intermediate problems that require deeper understanding 
            of stack and queue properties. Perfect for interview preparation.
          </p>
          
          {problems.medium.map((problem) => (
            <div key={problem.id} className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-xl border border-orange-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <h4 className="font-bold text-orange-900 text-lg">{problem.title}</h4>
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                    {problem.difficulty}
                  </span>
                </div>
                <button
                  onClick={() => toggleSolution(problem.id)}
                  className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  {showSolution[problem.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  <span>{showSolution[problem.id] ? 'Hide Solution' : 'Show Solution'}</span>
                </button>
              </div>
              
              <p className="text-orange-800 mb-4">{problem.description}</p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div className="bg-white p-4 rounded-lg border">
                  <h5 className="font-semibold text-gray-800 mb-2">Examples:</h5>
                  <div className="space-y-2 text-sm">
                    {problem.examples.map((example, index) => (
                      <div key={index} className="bg-gray-50 p-2 rounded font-mono text-xs">
                        <div><strong>Input:</strong> {example.input}</div>
                        <div><strong>Output:</strong> {example.output}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <h5 className="font-semibold text-gray-800 mb-2">Problem Details:</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Data Structure:</span>
                      <span className="font-medium text-orange-600">{problem.dataStructure}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time Complexity:</span>
                      <span className="font-medium text-blue-600">{problem.timeComplexity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Space Complexity:</span>
                      <span className="font-medium text-purple-600">{problem.spaceComplexity}</span>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-gray-50 rounded">
                    <div className="text-sm text-gray-700">
                      <strong>Approach:</strong> {problem.approach}
                    </div>
                  </div>
                </div>
              </div>
              
              {showSolution[problem.id] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-gray-900 rounded-lg p-4 relative"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-semibold text-white">Solution:</h5>
                    <button
                      onClick={() => copyCode(problem.solution, problem.id)}
                      className="flex items-center space-x-2 px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
                    >
                      {copiedCode === problem.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedCode === problem.id ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="text-green-300 text-sm overflow-x-auto">
                    <code>{problem.solution}</code>
                  </pre>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Hard Problems */}
      <div id="hard-problems" className="bg-white rounded-2xl p-8 shadow-lg border mb-12 text-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <Trophy className="w-8 h-8 mr-3 text-red-600" />
            Hard Problems
          </h2>
          <SectionProgressIndicator 
            moduleId="module-3"
            sectionId="hard-problems"
          />
        </div>
        
        <div className="space-y-6">
          <p className="text-gray-600 text-lg leading-relaxed">
            Master the most challenging stack and queue problems. These require advanced techniques 
            and deep understanding of data structure properties.
          </p>
          
          {problems.hard.map((problem) => (
            <div key={problem.id} className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-xl border border-red-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <h4 className="font-bold text-red-900 text-lg">{problem.title}</h4>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                    {problem.difficulty}
                  </span>
                </div>
                <button
                  onClick={() => toggleSolution(problem.id)}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  {showSolution[problem.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  <span>{showSolution[problem.id] ? 'Hide Solution' : 'Show Solution'}</span>
                </button>
              </div>
              
              <p className="text-red-800 mb-4">{problem.description}</p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div className="bg-white p-4 rounded-lg border">
                  <h5 className="font-semibold text-gray-800 mb-2">Examples:</h5>
                  <div className="space-y-2 text-sm">
                    {problem.examples.map((example, index) => (
                      <div key={index} className="bg-gray-50 p-2 rounded font-mono text-xs">
                        <div><strong>Input:</strong> {example.input}</div>
                        <div><strong>Output:</strong> {example.output}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <h5 className="font-semibold text-gray-800 mb-2">Problem Details:</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Data Structure:</span>
                      <span className="font-medium text-red-600">{problem.dataStructure}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time Complexity:</span>
                      <span className="font-medium text-blue-600">{problem.timeComplexity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Space Complexity:</span>
                      <span className="font-medium text-purple-600">{problem.spaceComplexity}</span>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-gray-50 rounded">
                    <div className="text-sm text-gray-700">
                      <strong>Approach:</strong> {problem.approach}
                    </div>
                  </div>
                </div>
              </div>
              
              {showSolution[problem.id] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-gray-900 rounded-lg p-4 relative"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-semibold text-white">Solution:</h5>
                    <button
                      onClick={() => copyCode(problem.solution, problem.id)}
                      className="flex items-center space-x-2 px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
                    >
                      {copiedCode === problem.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedCode === problem.id ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="text-green-300 text-sm overflow-x-auto">
                    <code>{problem.solution}</code>
                  </pre>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Coding Challenges */}
      <div id="coding-challenges" className="bg-white rounded-2xl p-8 shadow-lg border mb-12 text-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <Code className="w-8 h-8 mr-3 text-purple-600" />
            Additional Coding Challenges
          </h2>
          <SectionProgressIndicator 
            moduleId="module-3"
            sectionId="coding-challenges"
          />
        </div>
        
        <div className="space-y-8">
          <p className="text-gray-600 text-lg leading-relaxed text-center">
            Ready for more? Here are additional challenges and resources to further strengthen 
            your stack and queue skills. Perfect for interview preparation!
          </p>
          
          {/* Challenge Categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
              <div className="flex items-center mb-4">
                <Lightbulb className="w-8 h-8 text-blue-600 mr-3" />
                <h4 className="font-bold text-blue-900">Pattern Recognition</h4>
              </div>
              <div className="space-y-3 text-sm text-blue-800">
                <div>• Monotonic Stack Problems</div>
                <div>• Next Greater/Smaller Element</div>
                <div>• Parentheses Matching Variations</div>
                <div>• Expression Evaluation Types</div>
                <div>• Stack-based Tree Traversals</div>
              </div>
              <div className="mt-4 p-3 bg-blue-100 rounded border border-blue-300 text-xs text-blue-700">
                Focus on recognizing when to use stack vs queue based on problem patterns.
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
              <div className="flex items-center mb-4">
                <PlayCircle className="w-8 h-8 text-green-600 mr-3" />
                <h4 className="font-bold text-green-900">Optimization Techniques</h4>
              </div>
              <div className="space-y-3 text-sm text-green-800">
                <div>• Space-optimized Solutions</div>
                <div>• Amortized Analysis</div>
                <div>• Two-pointer with Stack/Queue</div>
                <div>• Dynamic Programming + Stack</div>
                <div>• Multiple Data Structure Combo</div>
              </div>
              <div className="mt-4 p-3 bg-green-100 rounded border border-green-300 text-xs text-green-700">
                Learn advanced techniques that combine stacks/queues with other algorithms.
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
              <div className="flex items-center mb-4">
                <Target className="w-8 h-8 text-purple-600 mr-3" />
                <h4 className="font-bold text-purple-900">Interview Focus</h4>
              </div>
              <div className="space-y-3 text-sm text-purple-800">
                <div>• Time/Space Complexity Analysis</div>
                <div>• Edge Case Handling</div>
                <div>• Code Optimization</div>
                <div>• Alternative Approaches</div>
                <div>• Real-world Applications</div>
              </div>
              <div className="mt-4 p-3 bg-purple-100 rounded border border-purple-300 text-xs text-purple-700">
                Practice explaining your solutions and discussing trade-offs clearly.
              </div>
            </div>
          </div>
          
          {/* Recommended Practice Platforms */}
          <div className="bg-gray-50 p-8 rounded-xl">
            <h4 className="font-semibold text-gray-900 mb-6 text-center">Recommended Practice Platforms</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-4 rounded-lg border text-center">
                <div className="font-bold text-gray-800 mb-2">LeetCode</div>
                <div className="text-sm text-gray-600 mb-3">500+ Stack/Queue problems</div>
                <div className="text-xs text-green-600">★ Recommended for interviews</div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border text-center">
                <div className="font-bold text-gray-800 mb-2">HackerRank</div>
                <div className="text-sm text-gray-600 mb-3">Data Structures section</div>
                <div className="text-xs text-blue-600">★ Good for beginners</div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border text-center">
                <div className="font-bold text-gray-800 mb-2">CodeForces</div>
                <div className="text-sm text-gray-600 mb-3">Competitive programming</div>
                <div className="text-xs text-purple-600">★ Advanced problems</div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border text-center">
                <div className="font-bold text-gray-800 mb-2">GeeksforGeeks</div>
                <div className="text-sm text-gray-600 mb-3">Comprehensive tutorials</div>
                <div className="text-xs text-orange-600">★ Theory + Practice</div>
              </div>
            </div>
          </div>
          
          {/* Study Plan */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200">
            <h4 className="font-semibold text-indigo-900 mb-4">Suggested Study Plan</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-indigo-800 mb-1">Week 1-2: Foundations</div>
                  <div className="text-sm text-indigo-600">Master basic operations and simple problems</div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-indigo-800 mb-1">Week 3-4: Pattern Recognition</div>
                  <div className="text-sm text-indigo-600">Identify common problem patterns and approaches</div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-indigo-800 mb-1">Week 5-6: Advanced Problems</div>
                  <div className="text-sm text-indigo-600">Tackle medium and hard difficulty challenges</div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium text-indigo-800 mb-1">Week 7-8: Interview Prep</div>
                  <div className="text-sm text-indigo-600">Practice explaining solutions and optimizations</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="flex justify-between items-center mt-16 pt-8 border-t border-gray-200"
      >
        <Link
          href="/learning-path/module-3/comparison"
          className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Previous: Stacks vs Queues
        </Link>
        <Link
          href="/learning-path/module-4"
          className="flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
        >
          Next: Module 4 - Linked Lists
          <ChevronRight className="w-6 h-6 ml-2" />
        </Link>
      </motion.div>
    </EnhancedModuleLayout>
  );
}