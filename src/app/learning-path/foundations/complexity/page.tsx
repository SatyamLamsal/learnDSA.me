'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Clock, 
  Database, 
  Network, 
  Target,
  TrendingUp,
  Calculator,
  CheckCircle,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import { ModuleLayout } from '@/components/layouts/ModuleLayout';
import { ProgressIndicator } from '@/components/progress/ProgressIndicator';
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton';
import { SectionProgressIndicator } from '@/components/progress/SectionProgressIndicator';

const complexityNotations = [
  {
    notation: 'Big O (O)',
    symbol: 'O(g(n))',
    description: 'Upper bound - worst case scenario',
    meaning: 'Algorithm will never perform worse than this',
    mathematicalDef: 'f(n) ≤ c × g(n) for all n ≥ n₀',
    color: 'bg-red-50 border-red-200 text-red-800',
    icon: TrendingUp
  },
  {
    notation: 'Big Omega (Ω)',
    symbol: 'Ω(g(n))',
    description: 'Lower bound - best case scenario',
    meaning: 'Algorithm will never perform better than this',
    mathematicalDef: 'f(n) ≥ c × g(n) for all n ≥ n₀',
    color: 'bg-green-50 border-green-200 text-green-800',
    icon: TrendingUp
  },
  {
    notation: 'Big Theta (Θ)',
    symbol: 'Θ(g(n))',
    description: 'Tight bound - average case scenario',
    meaning: 'Algorithm performs exactly at this rate',
    mathematicalDef: 'c₁ × g(n) ≤ f(n) ≤ c₂ × g(n) for all n ≥ n₀',
    color: 'bg-blue-50 border-blue-200 text-blue-800',
    icon: Target
  }
];

const complexityGrowthRates = [
  { 
    notation: 'O(1)', 
    name: 'Constant Time', 
    description: 'Operations remain constant regardless of input size',
    example: 'Array access: arr[5], Hash table lookup',
    color: 'bg-emerald-500',
    growth: 'Always 1 operation'
  },
  { 
    notation: 'O(log n)', 
    name: 'Logarithmic Time', 
    description: 'Time increases slowly as input grows',
    example: 'Binary search in sorted array',
    color: 'bg-blue-500',
    growth: 'Halves search space each step'
  },
  { 
    notation: 'O(n)', 
    name: 'Linear Time', 
    description: 'Time increases directly with input size',
    example: 'Linear search, finding max in array',
    color: 'bg-yellow-500',
    growth: 'One operation per element'
  },
  { 
    notation: 'O(n log n)', 
    name: 'Linearithmic Time', 
    description: 'Efficient divide-and-conquer algorithms',
    example: 'Merge sort, Heap sort',
    color: 'bg-orange-500',
    growth: 'n × log n operations'
  },
  { 
    notation: 'O(n²)', 
    name: 'Quadratic Time', 
    description: 'Time increases with square of input',
    example: 'Bubble sort, nested loops',
    color: 'bg-red-500',
    growth: 'n² operations for n elements'
  },
  { 
    notation: 'O(2ⁿ)', 
    name: 'Exponential Time', 
    description: 'Time doubles with each addition',
    example: 'Brute force password cracking',
    color: 'bg-purple-500',
    growth: 'Exponential explosion'
  }
];

export default function FoundationsComplexityPage() {
  const [activeSection, setActiveSection] = useState('why-analyze');
  const [selectedComplexity, setSelectedComplexity] = useState(0);

  const sections = [
    { id: 'why-analyze', name: 'Why Analyze?', icon: BarChart3 },
    { id: 'notations', name: 'Asymptotic Notations', icon: Target },
    { id: 'growth-rates', name: 'Growth Rates', icon: TrendingUp },
    { id: 'tradeoffs', name: 'Time-Space Tradeoff', icon: Calculator },
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
      estimatedTime="25-30 minutes"
      difficulty="Intermediate"
      totalSections={5}
      currentSectionIndex={3}
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
            topicId="foundations-complexity" 
            topicType="foundations"
            category="learning-path"
          />
          <BookmarkButton 
            topicId="foundations-complexity"
            topicType="foundations"
            title="Complexity Analysis Mastery"
            category="learning-path"
            url="/learning-path/foundations/complexity"
          />
        </div>
        
        <div className="inline-flex items-center bg-blue-100 text-blue-800 px-6 py-3 rounded-full text-sm font-medium mb-8">
          <BarChart3 className="w-5 h-5 mr-2" />
          Chapter 4: Algorithm Complexity and Performance Analysis
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-8">
          Complexity
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Analysis
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Master the art of analyzing algorithm performance with Big O, Omega, and Theta notations. 
          Learn to predict and compare the efficiency of different algorithms with interactive visualizations.
        </p>
      </motion.div>

      {/* Why Analyze Algorithms */}
      <div id="why-analyze" className="bg-white rounded-2xl p-8 shadow-lg border mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <BarChart3 className="w-8 h-8 mr-3 text-red-600" />
          Why Analyze Algorithms?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-6 bg-red-50 rounded-xl border border-red-200">
            <Clock className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Computational Time</h3>
            <p className="text-gray-600">Predict CPU consumption and execution time</p>
          </div>
          <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-200">
            <Database className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Memory Space</h3>
            <p className="text-gray-600">Analyze RAM consumption and space requirements</p>
          </div>
          <div className="text-center p-6 bg-green-50 rounded-xl border border-green-200">
            <Network className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Communication</h3>
            <p className="text-gray-600">Evaluate bandwidth consumption for data transfer</p>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
          <h3 className="text-xl font-semibold text-blue-900 mb-3">Running Time Definition</h3>
          <p className="text-blue-800 mb-4">
            The running time of an algorithm is the total number of primitive operations executed 
            (machine independent steps). This is also known as algorithm complexity.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-blue-900">Time Factor:</h4>
              <p className="text-blue-700">Measured by counting key operations like comparisons</p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-900">Space Factor:</h4>
              <p className="text-blue-700">Measured by maximum memory space required</p>
            </div>
          </div>
        </div>
      </div>

      {/* Asymptotic Notations */}
      <div id="notations" className="bg-white rounded-2xl p-8 shadow-lg border mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
          <Target className="w-8 h-8 mr-3 text-purple-600" />
          Asymptotic Notations
        </h2>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {complexityNotations.map((notation, index) => {
            const IconComponent = notation.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className={`p-6 rounded-xl border-2 ${notation.color}`}
              >
                <div className="text-center mb-4">
                  <IconComponent className="w-12 h-12 mx-auto mb-3" />
                  <h3 className="text-2xl font-bold">{notation.notation}</h3>
                  <code className="text-lg font-mono">{notation.symbol}</code>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold">Description:</h4>
                    <p className="text-sm">{notation.description}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Meaning:</h4>
                    <p className="text-sm">{notation.meaning}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Mathematical:</h4>
                    <code className="text-sm font-mono block bg-white p-2 rounded">
                      {notation.mathematicalDef}
                    </code>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Growth Rates Visualization */}
      <div id="growth-rates" className="bg-white rounded-2xl p-8 shadow-lg border mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
          <TrendingUp className="w-8 h-8 mr-3 text-green-600" />
          Complexity Growth Rates & Interactive Analysis
        </h2>
        
        {/* Interactive Complexity Graph */}
        <div className="mb-12 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-8 border">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Interactive Complexity Comparison
          </h3>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Graph Visualization */}
            <div className="bg-white rounded-lg p-6 border shadow-sm">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Growth Rate Comparison</h4>
              <div className="relative h-64 bg-gray-50 rounded-lg overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 400 250">
                  {/* Grid lines */}
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                    <g key={i}>
                      <line 
                        x1={i * 40} 
                        y1="10" 
                        x2={i * 40} 
                        y2="240" 
                        stroke="#e5e7eb" 
                        strokeWidth="1"
                      />
                      <line 
                        x1="10" 
                        y1={i * 24} 
                        x2="390" 
                        y2={i * 24} 
                        stroke="#e5e7eb" 
                        strokeWidth="1"
                      />
                    </g>
                  ))}
                  
                  {/* Axes */}
                  <line x1="10" y1="240" x2="390" y2="240" stroke="#374151" strokeWidth="2"/>
                  <line x1="10" y1="10" x2="10" y2="240" stroke="#374151" strokeWidth="2"/>
                  
                  {/* O(1) - Constant */}
                  <line x1="10" y1="200" x2="390" y2="200" stroke="#10B981" strokeWidth="3"/>
                  
                  {/* O(log n) - Logarithmic */}
                  <path 
                    d="M 10 240 Q 100 180 200 150 T 390 120" 
                    fill="none" 
                    stroke="#3B82F6" 
                    strokeWidth="3"
                  />
                  
                  {/* O(n) - Linear */}
                  <line x1="10" y1="240" x2="390" y2="50" stroke="#EAB308" strokeWidth="3"/>
                  
                  {/* O(n log n) - Linearithmic */}
                  <path 
                    d="M 10 240 Q 150 120 250 80 T 390 30" 
                    fill="none" 
                    stroke="#F97316" 
                    strokeWidth="3"
                  />
                  
                  {/* O(n²) - Quadratic */}
                  <path 
                    d="M 10 240 Q 100 180 200 100 Q 300 40 390 15" 
                    fill="none" 
                    stroke="#EF4444" 
                    strokeWidth="3"
                  />
                  
                  {/* O(2ⁿ) - Exponential */}
                  <path 
                    d="M 10 240 Q 50 220 100 180 Q 150 120 200 60 Q 250 20 300 10 L 390 5" 
                    fill="none" 
                    stroke="#8B5CF6" 
                    strokeWidth="3"
                  />
                  
                  {/* Labels */}
                  <text x="20" y="25" className="fill-gray-700 text-xs font-medium">Time</text>
                  <text x="360" y="235" className="fill-gray-700 text-xs font-medium">Input Size (n)</text>
                </svg>
                
                {/* Legend */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <div className="w-3 h-0.5 bg-green-500 mr-2"></div>
                      <span>O(1)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-0.5 bg-blue-500 mr-2"></div>
                      <span>O(log n)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-0.5 bg-yellow-500 mr-2"></div>
                      <span>O(n)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-0.5 bg-orange-500 mr-2"></div>
                      <span>O(n log n)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-0.5 bg-red-500 mr-2"></div>
                      <span>O(n²)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-0.5 bg-purple-500 mr-2"></div>
                      <span>O(2ⁿ)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Interactive Operations Counter */}
            <div className="bg-white rounded-lg p-6 border shadow-sm">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Operations Calculator</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Input Size (n): {selectedComplexity + 1}
                  </label>
                  <input 
                    type="range" 
                    min="0" 
                    max="9" 
                    value={selectedComplexity}
                    onChange={(e) => setSelectedComplexity(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                
                <div className="space-y-3">
                  {complexityGrowthRates.map((complexity, index) => {
                    const n = selectedComplexity + 1
                    let operations = 1
                    
                    switch(complexity.notation) {
                      case 'O(1)': operations = 1; break;
                      case 'O(log n)': operations = Math.max(1, Math.floor(Math.log2(n))); break;
                      case 'O(n)': operations = n; break;
                      case 'O(n log n)': operations = n * Math.max(1, Math.floor(Math.log2(n))); break;
                      case 'O(n²)': operations = n * n; break;
                      case 'O(2ⁿ)': operations = Math.pow(2, Math.min(n, 10)); break;
                    }
                    
                    return (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full ${complexity.color} mr-3`}></div>
                          <span className="font-medium">{complexity.notation}</span>
                        </div>
                        <span className="text-lg font-bold text-gray-900">
                          {operations.toLocaleString()} ops
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {complexityGrowthRates.map((complexity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              onClick={() => setSelectedComplexity(index)}
            >
              <div className="text-center mb-4">
                <div className={`w-16 h-16 ${complexity.color} rounded-full mx-auto mb-3 flex items-center justify-center`}>
                  <span className="text-white font-bold text-lg">{complexity.notation}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{complexity.name}</h3>
              </div>
              
              {/* Mini growth visualization */}
              <div className="mb-4">
                <div className="h-16 bg-gray-50 rounded-lg flex items-end justify-center p-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => {
                    let height = 4
                    switch(complexity.notation) {
                      case 'O(1)': height = 8; break;
                      case 'O(log n)': height = Math.log2(n) * 4; break;
                      case 'O(n)': height = n * 2; break;
                      case 'O(n log n)': height = n * Math.log2(n); break;
                      case 'O(n²)': height = Math.min(n * n * 0.5, 48); break;
                      case 'O(2ⁿ)': height = Math.min(Math.pow(2, n * 0.5), 48); break;
                    }
                    
                    return (
                      <div 
                        key={n}
                        className={`w-2 mx-0.5 ${complexity.color} rounded-t`}
                        style={{ height: `${Math.max(height, 4)}px` }}
                      ></div>
                    )
                  })}
                </div>
              </div>
              
              <div className="space-y-3">
                <p className="text-gray-600 text-sm">{complexity.description}</p>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Example:</h4>
                  <p className="text-gray-600 text-sm">{complexity.example}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">Growth Pattern:</h4>
                  <p className="text-gray-600 text-sm">{complexity.growth}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Time-Space Tradeoff */}
      <div id="tradeoffs" className="bg-white rounded-2xl p-8 shadow-lg border mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <Calculator className="w-8 h-8 mr-3 text-orange-600" />
          Time-Space Tradeoff
        </h2>
        
        <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
          <p className="text-lg text-orange-900 leading-relaxed mb-4">
            A <strong>time-space tradeoff</strong> is a situation where memory use can be reduced at 
            the cost of slower program execution, and conversely, computation time can be reduced 
            at the cost of increased memory use.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-orange-900 mb-2">Key Considerations:</h4>
              <ul className="space-y-1 text-orange-800 text-sm">
                <li>• Relative costs of CPU cycles vs RAM space</li>
                <li>• Hard drive space becoming cheaper over time</li>
                <li>• Changing hardware cost dynamics</li>
                <li>• Program performance requirements</li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-orange-900 mb-2">Benefits:</h4>
              <ul className="space-y-1 text-orange-800 text-sm">
                <li>• Programs can run much faster</li>
                <li>• Memory efficiency can be optimized</li>
                <li>• Adaptation to hardware constraints</li>
                <li>• Performance tuning opportunities</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="flex justify-between items-center mt-12"
      >
        <Link
          href="/learning-path/foundations/algorithms"
          className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Previous: Algorithm Paradigms
        </Link>
        <Link
          href="/learning-path/foundations/adt"
          className="flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
        >
          Next: Abstract Data Types
          <ChevronRight className="w-6 h-6 ml-2" />
        </Link>
      </motion.div>
    </ModuleLayout>
  );
}