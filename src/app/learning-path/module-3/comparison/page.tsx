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
  Brain
} from 'lucide-react';
import Link from 'next/link';
import { EnhancedModuleLayout } from '@/components/layouts/EnhancedModuleLayout';
import { ProgressIndicator } from '@/components/progress/ProgressIndicator';
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton';
import { SectionProgressIndicator } from '@/components/progress/SectionProgressIndicator';

export default function ComparisonPage() {
  const [activeSection, setActiveSection] = useState('key-differences');
  const [selectedScenario, setSelectedScenario] = useState<keyof typeof scenarios>('undo-redo');

  const sections = [
    { id: 'key-differences', name: 'Key Differences', icon: Scale },
    { id: 'use-case-analysis', name: 'Use Case Analysis', icon: Brain },
    { id: 'decision-matrix', name: 'Decision Matrix', icon: Target },
    { id: 'performance-comparison', name: 'Performance', icon: Zap },
  ];

  const scenarios: Record<string, {
    name: string;
    description: string;
    recommendation: string;
    reason: string;
    implementation: string;
  }> = {
    'undo-redo': {
      name: 'Undo/Redo Operations',
      description: 'Text editor implementing undo and redo functionality',
      recommendation: 'Stack',
      reason: 'LIFO behavior matches natural undo/redo expectations',
      implementation: 'Two stacks: undo stack and redo stack'
    },
    'bfs-traversal': {
      name: 'Graph Traversal (BFS)',
      description: 'Finding shortest path in unweighted graph',
      recommendation: 'Queue',
      reason: 'FIFO ensures level-by-level exploration',
      implementation: 'Simple queue with visited set'
    },
    'function-calls': {
      name: 'Function Call Management',
      description: 'Managing function calls and returns in programming language',
      recommendation: 'Stack',
      reason: 'Last called function should return first',
      implementation: 'Call stack with activation records'
    },
    'task-scheduling': {
      name: 'Task Scheduling',
      description: 'Operating system scheduling processes fairly',
      recommendation: 'Queue',
      reason: 'First-come, first-served fairness',
      implementation: 'Ready queue with process control blocks'
    },
    'expression-evaluation': {
      name: 'Expression Evaluation',
      description: 'Evaluating mathematical expressions with operators',
      recommendation: 'Stack',
      reason: 'Operator precedence and parentheses handling',
      implementation: 'Operator stack and operand stack'
    },
    'printer-spooling': {
      name: 'Print Job Management',
      description: 'Managing print jobs in order received',
      recommendation: 'Queue',
      reason: 'Jobs should be printed in order of submission',
      implementation: 'Print queue with job priority options'
    }
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
      estimatedTime="20-25 minutes"
      difficulty="Intermediate"
      totalSections={8}
      currentPath="/learning-path/module-3/comparison"
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
            topicId="comparison" 
            topicType="stacks-queues"
            category="learning-path"
          />
          <BookmarkButton 
            topicId="comparison"
            topicType="stacks-queues"
            title="Stacks vs Queues Comparison"
            category="learning-path"
            url="/learning-path/module-3/comparison"
          />
        </div>
        
        <div className="inline-flex items-center bg-indigo-100 text-indigo-800 px-6 py-3 rounded-full text-sm font-medium mb-8">
          <Scale className="w-5 h-5 mr-2" />
          Lesson 7: Stacks vs Queues Analysis
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-8">
          Stacks
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">
            vs Queues
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Master the art of choosing the right data structure. Compare LIFO vs FIFO behavior, 
          analyze performance characteristics, and learn decision-making frameworks for 
          real-world applications.
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
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Learning Objectives</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="flex items-start space-x-3">
              <Scale className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">Key Differences</h3>
                <p className="text-sm text-gray-600">LIFO vs FIFO behavior patterns</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Brain className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">Use Case Analysis</h3>
                <p className="text-sm text-gray-600">When to choose which structure</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Target className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">Decision Framework</h3>
                <p className="text-sm text-gray-600">Systematic selection criteria</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Zap className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">Performance</h3>
                <p className="text-sm text-gray-600">Time & space complexity analysis</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Key Differences */}
      <div id="key-differences" className="bg-white rounded-2xl p-8 shadow-lg border mb-12 text-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <Scale className="w-8 h-8 mr-3 text-indigo-600" />
            Key Structural Differences
          </h2>
          <SectionProgressIndicator 
            moduleId="module-3"
            sectionId="key-differences"
          />
        </div>
        
        <div className="space-y-8">
          {/* Visual Comparison */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl border border-red-200">
              <h4 className="font-bold text-red-900 mb-4 text-center">Stack (LIFO - Last In, First Out)</h4>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded border">
                  <div className="text-center mb-3">
                    <div className="text-sm text-red-600 mb-2">Push ↓ | ↑ Pop</div>
                    {['TOP', 'C', 'B', 'A', 'BOTTOM'].map((item, index) => (
                      <div 
                        key={index} 
                        className={`h-8 flex items-center justify-center text-sm font-bold mb-1 rounded ${
                          item === 'TOP' ? 'bg-red-200 text-red-800' :
                          item === 'BOTTOM' ? 'bg-red-200 text-red-800' :
                          'bg-red-500 text-white'
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <span>Access Pattern:</span>
                    <span className="font-bold text-red-600">One end only (top)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <span>Order:</span>
                    <span className="font-bold text-red-600">Reverse of insertion</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <span>Memory:</span>
                    <span className="font-bold text-red-600">Continuous block</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-xl border border-blue-200">
              <h4 className="font-bold text-blue-900 mb-4 text-center">Queue (FIFO - First In, First Out)</h4>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded border">
                  <div className="text-center mb-3">
                    <div className="text-sm text-blue-600 mb-2">Enqueue → | ← Dequeue</div>
                    <div className="flex justify-center space-x-1">
                      <div className="w-12 h-8 bg-blue-200 text-blue-800 flex items-center justify-center text-xs font-bold rounded">REAR</div>
                      {['A', 'B', 'C'].map((item, index) => (
                        <div key={index} className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center text-sm font-bold rounded">
                          {item}
                        </div>
                      ))}
                      <div className="w-12 h-8 bg-blue-200 text-blue-800 flex items-center justify-center text-xs font-bold rounded">FRONT</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <span>Access Pattern:</span>
                    <span className="font-bold text-blue-600">Two ends (front & rear)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <span>Order:</span>
                    <span className="font-bold text-blue-600">Same as insertion</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border">
                    <span>Memory:</span>
                    <span className="font-bold text-blue-600">May be circular</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Behavioral Differences */}
          <div className="bg-gray-50 p-8 rounded-xl">
            <h4 className="font-semibold text-gray-900 mb-6">Behavioral Differences</h4>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded border">
                <h5 className="font-semibold text-gray-800 mb-3">Access Pattern</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                    <span>Stack: Restricted to top</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                    <span>Queue: Front for removal, rear for insertion</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded border">
                <h5 className="font-semibold text-gray-800 mb-3">Processing Order</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                    <span>Stack: Newest first (reverse)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                    <span>Queue: Oldest first (natural)</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded border">
                <h5 className="font-semibold text-gray-800 mb-3">Typical Usage</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                    <span>Stack: Recursive problems, backtracking</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                    <span>Queue: Scheduling, breadth-first algorithms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Use Case Analysis */}
      <div id="use-case-analysis" className="bg-white rounded-2xl p-8 shadow-lg border mb-12 text-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <Brain className="w-8 h-8 mr-3 text-purple-600" />
            Use Case Analysis
          </h2>
          <SectionProgressIndicator 
            moduleId="module-3"
            sectionId="use-case-analysis"
          />
        </div>
        
        <div className="space-y-8">
          <p className="text-gray-600 text-lg leading-relaxed text-center">
            The choice between stacks and queues depends on the natural flow of data in your problem. 
            Analyze these real-world scenarios to understand the decision process.
          </p>
          
          {/* Scenario Selector */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <h4 className="font-semibold text-gray-900 mb-4">Interactive Scenario Analysis</h4>
            <div className="grid md:grid-cols-3 gap-3 mb-6">
              {Object.entries(scenarios).map(([key, scenario]) => (
                <button
                  key={key}
                  onClick={() => setSelectedScenario(key)}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                    selectedScenario === key
                      ? 'bg-purple-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-purple-100'
                  }`}
                >
                  {scenario.name}
                </button>
              ))}
            </div>
            
            {/* Selected Scenario Details */}
            <div className="bg-white p-6 rounded-xl border">
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h5 className="font-bold text-gray-900">{scenarios[selectedScenario].name}</h5>
                  <p className="text-gray-600">{scenarios[selectedScenario].description}</p>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-800">Recommended Structure:</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                        scenarios[selectedScenario].recommendation === 'Stack' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {scenarios[selectedScenario].recommendation}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <strong>Why:</strong> {scenarios[selectedScenario].reason}
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="font-medium text-green-800 mb-1">Implementation Approach:</div>
                    <div className="text-sm text-green-700">
                      {scenarios[selectedScenario].implementation}
                    </div>
                  </div>
                </div>
                
                {/* Visual representation for selected scenario */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
                  <h6 className="font-bold text-purple-900 mb-3">Scenario Visualization</h6>
                  
                  {selectedScenario === 'undo-redo' && (
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded border">
                        <div className="text-sm font-medium mb-2">Text Editor Actions:</div>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span>Type "Hello"</span>
                            <span className="text-red-600">→ Push to Undo Stack</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Type " World"</span>
                            <span className="text-red-600">→ Push to Undo Stack</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Undo (Ctrl+Z)</span>
                            <span className="text-red-600">→ Pop from Undo Stack</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-center text-xs text-purple-600">
                        Stack's LIFO behavior matches user expectations perfectly!
                      </div>
                    </div>
                  )}
                  
                  {selectedScenario === 'bfs-traversal' && (
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded border">
                        <div className="text-sm font-medium mb-2">BFS Exploration:</div>
                        <div className="space-y-1 text-xs">
                          <div>Start: Add A to queue</div>
                          <div>Visit A: Add neighbors B, C to queue</div>
                          <div>Visit B: Add neighbors D, E to queue</div>
                          <div>Visit C: Process level-by-level</div>
                        </div>
                      </div>
                      <div className="text-center text-xs text-purple-600">
                        Queue's FIFO ensures breadth-first exploration!
                      </div>
                    </div>
                  )}
                  
                  {selectedScenario === 'task-scheduling' && (
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded border">
                        <div className="text-sm font-medium mb-2">Process Scheduling:</div>
                        <div className="space-y-1 text-xs">
                          <div>Task A arrives → Add to queue</div>
                          <div>Task B arrives → Add to queue</div>
                          <div>CPU free → Process Task A first</div>
                          <div>Task A done → Process Task B next</div>
                        </div>
                      </div>
                      <div className="text-center text-xs text-purple-600">
                        Queue ensures fairness in task execution!
                      </div>
                    </div>
                  )}
                  
                  {/* Default visualization for other scenarios */}
                  {!['undo-redo', 'bfs-traversal', 'task-scheduling'].includes(selectedScenario) && (
                    <div className="text-center text-sm text-purple-600 py-6">
                      {scenarios[selectedScenario].recommendation} structure provides the optimal 
                      behavior pattern for this use case.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decision Matrix */}
      <div id="decision-matrix" className="bg-white rounded-2xl p-8 shadow-lg border mb-12 text-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <Target className="w-8 h-8 mr-3 text-green-600" />
            Decision Matrix & Selection Criteria
          </h2>
          <SectionProgressIndicator 
            moduleId="module-3"
            sectionId="decision-matrix"
          />
        </div>
        
        <div className="space-y-8">
          {/* Decision Flowchart */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
            <h4 className="font-semibold text-green-900 mb-6 text-center">Decision Flowchart: Choose Your Data Structure</h4>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border text-center">
                <div className="font-bold text-gray-900 mb-2">Start: Analyze Your Problem</div>
                <ArrowDown className="w-5 h-5 text-gray-600 mx-auto" />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-300">
                  <h5 className="font-bold text-yellow-900 mb-3">Ask These Questions:</h5>
                  <div className="space-y-2 text-sm text-yellow-800">
                    <div>• Do I need most recent item first?</div>
                    <div>• Is this a recursive problem?</div>
                    <div>• Do I need to backtrack?</div>
                    <div>• Are operations nested/hierarchical?</div>
                  </div>
                  <div className="mt-3 p-2 bg-yellow-100 rounded text-center">
                    <ArrowDown className="w-4 h-4 text-yellow-600 mx-auto mb-1" />
                    <div className="text-xs text-yellow-700">If YES to any</div>
                  </div>
                  <div className="mt-2 bg-red-500 text-white p-2 rounded text-center font-bold">
                    Choose STACK
                  </div>
                </div>
                
                <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-300">
                  <h5 className="font-bold text-cyan-900 mb-3">Ask These Questions:</h5>
                  <div className="space-y-2 text-sm text-cyan-800">
                    <div>• Do I need first item first?</div>
                    <div>• Is fairness important?</div>
                    <div>• Am I processing in order?</div>
                    <div>• Is this level-by-level processing?</div>
                  </div>
                  <div className="mt-3 p-2 bg-cyan-100 rounded text-center">
                    <ArrowDown className="w-4 h-4 text-cyan-600 mx-auto mb-1" />
                    <div className="text-xs text-cyan-700">If YES to any</div>
                  </div>
                  <div className="mt-2 bg-blue-500 text-white p-2 rounded text-center font-bold">
                    Choose QUEUE
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Detailed Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-4 font-semibold">Criteria</th>
                  <th className="text-left p-4 font-semibold">Stack (LIFO)</th>
                  <th className="text-left p-4 font-semibold">Queue (FIFO)</th>
                  <th className="text-left p-4 font-semibold">Best For</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-t border-gray-200">
                  <td className="p-4 font-medium">Processing Order</td>
                  <td className="p-4">Reverse order (newest first)</td>
                  <td className="p-4">Same order (oldest first)</td>
                  <td className="p-4">Depends on problem nature</td>
                </tr>
                <tr className="border-t border-gray-200 bg-gray-50">
                  <td className="p-4 font-medium">Memory Access</td>
                  <td className="p-4">Single end (top only)</td>
                  <td className="p-4">Two ends (front & rear)</td>
                  <td className="p-4">Stack simpler to implement</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="p-4 font-medium">Recursion Support</td>
                  <td className="p-4 text-green-600">Excellent</td>
                  <td className="p-4 text-red-600">Not suitable</td>
                  <td className="p-4">Stack for recursive problems</td>
                </tr>
                <tr className="border-t border-gray-200 bg-gray-50">
                  <td className="p-4 font-medium">Fair Processing</td>
                  <td className="p-4 text-red-600">Not fair</td>
                  <td className="p-4 text-green-600">Very fair</td>
                  <td className="p-4">Queue for fair scheduling</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="p-4 font-medium">Undo Operations</td>
                  <td className="p-4 text-green-600">Perfect fit</td>
                  <td className="p-4 text-red-600">Wrong order</td>
                  <td className="p-4">Stack matches user expectations</td>
                </tr>
                <tr className="border-t border-gray-200 bg-gray-50">
                  <td className="p-4 font-medium">BFS Traversal</td>
                  <td className="p-4 text-red-600">Gives DFS instead</td>
                  <td className="p-4 text-green-600">Perfect fit</td>
                  <td className="p-4">Queue ensures level-order</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="p-4 font-medium">Expression Parsing</td>
                  <td className="p-4 text-green-600">Handles precedence</td>
                  <td className="p-4 text-red-600">Cannot handle precedence</td>
                  <td className="p-4">Stack for operator precedence</td>
                </tr>
                <tr className="border-t border-gray-200 bg-gray-50">
                  <td className="p-4 font-medium">Buffer Management</td>
                  <td className="p-4 text-red-600">Reverses data order</td>
                  <td className="p-4 text-green-600">Maintains data order</td>
                  <td className="p-4">Queue preserves sequence</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Quick Reference Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl border border-red-200">
              <h5 className="font-bold text-red-900 mb-4">Choose Stack When:</h5>
              <div className="space-y-2 text-sm text-red-800">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>You need to reverse the order of operations</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>The problem involves recursion or backtracking</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>You need to match opening/closing pairs</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Operations are nested or hierarchical</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Most recent item needs priority</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-xl border border-blue-200">
              <h5 className="font-bold text-blue-900 mb-4">Choose Queue When:</h5>
              <div className="space-y-2 text-sm text-blue-800">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>You need to maintain the order of arrival</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Fairness in processing is important</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>You're implementing breadth-first algorithms</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Managing resources or scheduling tasks</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Buffering data streams</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Comparison */}
      <div id="performance-comparison" className="bg-white rounded-2xl p-8 shadow-lg border mb-12 text-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <Zap className="w-8 h-8 mr-3 text-yellow-600" />
            Performance Analysis
          </h2>
          <SectionProgressIndicator 
            moduleId="module-3"
            sectionId="performance-comparison"
          />
        </div>
        
        <div className="space-y-8">
          {/* Time Complexity Comparison */}
          <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
            <h4 className="font-semibold text-yellow-900 mb-4">Time Complexity Comparison</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-yellow-300">
                    <th className="text-left p-3 font-semibold">Operation</th>
                    <th className="text-left p-3 font-semibold">Stack</th>
                    <th className="text-left p-3 font-semibold">Queue (Array)</th>
                    <th className="text-left p-3 font-semibold">Queue (Linked List)</th>
                    <th className="text-left p-3 font-semibold">Circular Queue</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-yellow-200">
                    <td className="p-3 font-medium">Push/Enqueue</td>
                    <td className="p-3 text-green-600 font-bold">O(1)</td>
                    <td className="p-3 text-green-600 font-bold">O(1)</td>
                    <td className="p-3 text-green-600 font-bold">O(1)</td>
                    <td className="p-3 text-green-600 font-bold">O(1)</td>
                  </tr>
                  <tr className="border-b border-yellow-200">
                    <td className="p-3 font-medium">Pop/Dequeue</td>
                    <td className="p-3 text-green-600 font-bold">O(1)</td>
                    <td className="p-3 text-red-600 font-bold">O(n)</td>
                    <td className="p-3 text-green-600 font-bold">O(1)</td>
                    <td className="p-3 text-green-600 font-bold">O(1)</td>
                  </tr>
                  <tr className="border-b border-yellow-200">
                    <td className="p-3 font-medium">Peek/Front</td>
                    <td className="p-3 text-green-600 font-bold">O(1)</td>
                    <td className="p-3 text-green-600 font-bold">O(1)</td>
                    <td className="p-3 text-green-600 font-bold">O(1)</td>
                    <td className="p-3 text-green-600 font-bold">O(1)</td>
                  </tr>
                  <tr className="border-b border-yellow-200">
                    <td className="p-3 font-medium">Size/Length</td>
                    <td className="p-3 text-green-600 font-bold">O(1)</td>
                    <td className="p-3 text-green-600 font-bold">O(1)</td>
                    <td className="p-3 text-green-600 font-bold">O(1)</td>
                    <td className="p-3 text-green-600 font-bold">O(1)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Search</td>
                    <td className="p-3 text-red-600 font-bold">O(n)</td>
                    <td className="p-3 text-red-600 font-bold">O(n)</td>
                    <td className="p-3 text-red-600 font-bold">O(n)</td>
                    <td className="p-3 text-red-600 font-bold">O(n)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-4 bg-white rounded border">
              <div className="text-sm text-yellow-800">
                <strong>Key Insight:</strong> Simple array-based queues have O(n) dequeue due to element shifting. 
                Linked lists and circular arrays maintain O(1) for all operations.
              </div>
            </div>
          </div>
          
          {/* Space Complexity */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-4">Space Complexity</h4>
              <div className="space-y-3 text-sm">
                <div className="bg-white p-3 rounded border">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Stack (Array):</span>
                    <span className="text-blue-600 font-bold">O(n)</span>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Fixed size allocation</div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Stack (Linked):</span>
                    <span className="text-blue-600 font-bold">O(n)</span>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Dynamic allocation + pointers</div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Queue (Array):</span>
                    <span className="text-blue-600 font-bold">O(n)</span>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">May waste space in simple implementation</div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Circular Queue:</span>
                    <span className="text-green-600 font-bold">O(n)</span>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Optimal space utilization</div>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-6 rounded-xl border border-green-200">
              <h4 className="font-semibold text-green-900 mb-4">Performance Considerations</h4>
              <div className="space-y-3 text-sm text-green-800">
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium mb-1">Cache Performance</div>
                  <div className="text-xs text-gray-600">
                    Arrays have better cache locality than linked structures
                  </div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium mb-1">Memory Overhead</div>
                  <div className="text-xs text-gray-600">
                    Linked implementations require extra memory for pointers
                  </div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium mb-1">Dynamic Resizing</div>
                  <div className="text-xs text-gray-600">
                    Dynamic arrays can resize but may cause temporary O(n) operations
                  </div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="font-medium mb-1">Thread Safety</div>
                  <div className="text-xs text-gray-600">
                    Both structures need synchronization in multi-threaded environments
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Implementation Recommendations */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <h4 className="font-semibold text-gray-900 mb-4">Implementation Recommendations</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded border">
                <h5 className="font-semibold text-gray-800 mb-2">Simple Stack</h5>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>✓ Array-based for simplicity</div>
                  <div>✓ Fixed size acceptable</div>
                  <div>✓ Single-threaded usage</div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded border">
                <h5 className="font-semibold text-gray-800 mb-2">Dynamic Stack</h5>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>✓ Linked list for flexibility</div>
                  <div>✓ Unknown size requirements</div>
                  <div>✓ Memory-conscious applications</div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded border">
                <h5 className="font-semibold text-gray-800 mb-2">Simple Queue</h5>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>✓ Circular array for efficiency</div>
                  <div>✓ Known maximum size</div>
                  <div>✓ High-performance requirements</div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded border">
                <h5 className="font-semibold text-gray-800 mb-2">Dynamic Queue</h5>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>✓ Linked list for flexibility</div>
                  <div>✓ Variable size requirements</div>
                  <div>✓ Producer-consumer patterns</div>
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
          href="/learning-path/module-3/queue-applications"
          className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Previous: Queue Applications
        </Link>
        <Link
          href="/learning-path/module-3/practice-problems"
          className="flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
        >
          Next: Practice Problems
          <ChevronRight className="w-6 h-6 ml-2" />
        </Link>
      </motion.div>
    </EnhancedModuleLayout>
  );
}