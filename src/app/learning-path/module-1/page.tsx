'use client';

import { ModuleLayout } from '@/components/layouts/ModuleLayout';
import { 
  Cpu,
  HardDrive,
  MemoryStick,
  Zap,
  Clock,
  Target,
  CheckCircle,
  Award,
  Grid3X3,
  ChevronRight,
  Info,
  Layers,
  TrendingUp,
  Database,
  Gauge
} from 'lucide-react';

export default function Module1Page() {
  const sections = [
    { 
      id: 'memory-hierarchy', 
      name: 'Memory Hierarchy', 
      icon: Layers,
      href: '/learning-path/module-1/memory-hierarchy',
      description: 'Explore CPU cache, RAM, SSD, and HDD speed differences',
      duration: '25 min'
    },
    { 
      id: 'performance', 
      name: 'Performance Impact', 
      icon: Gauge,
      href: '/learning-path/module-1/performance', 
      description: 'See how memory access patterns affect performance',
      duration: '20 min'
    },
    { 
      id: 'data-structures', 
      name: 'Why Data Structures?', 
      icon: Database,
      href: '/learning-path/module-1/data-structures',
      description: 'Understand the purpose behind different data structures', 
      duration: '25 min'
    },
    { 
      id: 'efficiency', 
      name: 'Efficiency Principles', 
      icon: TrendingUp,
      href: '/learning-path/module-1/efficiency',
      description: 'Learn time vs space tradeoffs and optimization strategies',
      duration: '20 min'
    }
  ];

  return (
    <ModuleLayout
      moduleId="module-1"
      moduleTitle="Module 1: Memory & Efficiency"
      moduleDescription="Understand why data structures matter through memory systems"
      sections={sections}
      estimatedTime="90 minutes"
      difficulty="Beginner"
      totalSections={4}
    >
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-8 rounded-2xl">
          <div className="flex items-center space-x-4 mb-4">
            <MemoryStick className="w-12 h-12" />
            <div>
              <h1 className="text-4xl font-bold">Memory Systems & Efficiency</h1>
              <p className="text-indigo-100 text-lg">The foundation of data structure design</p>
            </div>
          </div>
          <p className="text-indigo-50">
            Discover why data structures exist by understanding how computers manage memory and why efficiency matters.
          </p>
        </div>

        {/* Learning Objectives */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Target className="w-7 h-7 mr-3 text-green-600" />
            What You&apos;ll Understand
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Memory Hierarchy</h3>
                  <p className="text-gray-600 text-sm">CPU cache, RAM, SSD, HDD - how they work together</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Performance Impact</h3>
                  <p className="text-gray-600 text-sm">Why some operations are 1000x faster than others</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Data Structure Purpose</h3>
                  <p className="text-gray-600 text-sm">Why arrays, lists, trees, and hash tables exist</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Efficiency Principles</h3>
                  <p className="text-gray-600 text-sm">Time vs space tradeoffs and optimization strategies</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Memory Hierarchy Visualization */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Layers className="w-7 h-7 mr-3 text-blue-600" />
            Computer Memory Hierarchy
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Visual Hierarchy */}
            <div className="space-y-4">
              <div className="text-center mb-6">
                <p className="text-gray-600 text-sm mb-4">From Fastest/Smallest to Slowest/Largest</p>
              </div>
              
              {/* CPU Registers */}
              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Cpu className="w-6 h-6" />
                    <div>
                      <h3 className="font-bold">CPU Registers</h3>
                      <p className="text-red-100 text-sm">Inside the processor</p>
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <div className="font-mono">~1 cycle</div>
                    <div className="text-red-100">64-1024 bytes</div>
                  </div>
                </div>
              </div>

              {/* L1 Cache */}
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-xl ml-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Zap className="w-6 h-6" />
                    <div>
                      <h3 className="font-bold">L1 Cache</h3>
                      <p className="text-orange-100 text-sm">On-chip cache</p>
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <div className="font-mono">~3 cycles</div>
                    <div className="text-orange-100">32-128 KB</div>
                  </div>
                </div>
              </div>

              {/* L2 Cache */}
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-4 rounded-xl ml-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Zap className="w-6 h-6" />
                    <div>
                      <h3 className="font-bold">L2 Cache</h3>
                      <p className="text-yellow-100 text-sm">Shared cache</p>
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <div className="font-mono">~10 cycles</div>
                    <div className="text-yellow-100">256KB - 2MB</div>
                  </div>
                </div>
              </div>

              {/* L3 Cache */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl ml-12">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Zap className="w-6 h-6" />
                    <div>
                      <h3 className="font-bold">L3 Cache</h3>
                      <p className="text-green-100 text-sm">Last level cache</p>
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <div className="font-mono">~30 cycles</div>
                    <div className="text-green-100">8-64 MB</div>
                  </div>
                </div>
              </div>

              {/* RAM */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MemoryStick className="w-6 h-6" />
                    <div>
                      <h3 className="font-bold">Main Memory (RAM)</h3>
                      <p className="text-blue-100 text-sm">System memory</p>
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <div className="font-mono">~200 cycles</div>
                    <div className="text-blue-100">8-128 GB</div>
                  </div>
                </div>
              </div>

              {/* SSD */}
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Database className="w-6 h-6" />
                    <div>
                      <h3 className="font-bold">SSD Storage</h3>
                      <p className="text-purple-100 text-sm">Flash memory</p>
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <div className="font-mono">~25,000 cycles</div>
                    <div className="text-purple-100">256GB - 8TB</div>
                  </div>
                </div>
              </div>

              {/* HDD */}
              <div className="bg-gradient-to-r from-gray-500 to-gray-600 text-white p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <HardDrive className="w-6 h-6" />
                    <div>
                      <h3 className="font-bold">Hard Disk (HDD)</h3>
                      <p className="text-gray-100 text-sm">Mechanical storage</p>
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <div className="font-mono">~10M cycles</div>
                    <div className="text-gray-100">500GB - 20TB</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Comparison */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Performance Impact</h3>
              
              <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                <h4 className="font-semibold text-red-900 mb-3 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Speed Differences
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-red-800">CPU Register → L1 Cache:</span>
                    <span className="font-mono bg-red-100 px-2 py-1 rounded">3x slower</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-red-800">L1 Cache → RAM:</span>
                    <span className="font-mono bg-red-100 px-2 py-1 rounded">67x slower</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-red-800">RAM → SSD:</span>
                    <span className="font-mono bg-red-100 px-2 py-1 rounded">125x slower</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-red-800">SSD → HDD:</span>
                    <span className="font-mono bg-red-100 px-2 py-1 rounded">400x slower</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  Real-World Impact
                </h4>
                <div className="space-y-3 text-sm text-blue-800">
                  <p><strong>Cache Hit:</strong> Data found in cache - super fast access</p>
                  <p><strong>Cache Miss:</strong> Must fetch from slower memory - significant delay</p>
                  <p><strong>Locality of Reference:</strong> Accessing nearby data is much faster</p>
                  <p><strong>Sequential vs Random:</strong> Sequential access can be 100x faster</p>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                <h4 className="font-semibold text-green-900 mb-3">Why This Matters</h4>
                <ul className="space-y-2 text-sm text-green-800">
                  <li className="flex items-start">
                    <ChevronRight className="w-4 h-4 mr-1 mt-0.5 text-green-600" />
                    <span>Arrays are cache-friendly (contiguous memory)</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-4 h-4 mr-1 mt-0.5 text-green-600" />
                    <span>Linked lists can cause cache misses (scattered memory)</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-4 h-4 mr-1 mt-0.5 text-green-600" />
                    <span>Hash tables optimize for memory access patterns</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-4 h-4 mr-1 mt-0.5 text-green-600" />
                    <span>Trees balance memory usage with search efficiency</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Why Data Structures Matter */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Database className="w-7 h-7 mr-3 text-purple-600" />
            Why Do Data Structures Exist?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                icon: Gauge,
                title: "Performance",
                description: "Different operations need different speeds",
                examples: ["Search: O(1) vs O(n)", "Insert: Beginning vs end", "Memory access patterns"],
                color: "blue"
              },
              {
                icon: MemoryStick,
                title: "Memory Efficiency",
                description: "Optimize how data is stored and accessed",
                examples: ["Contiguous vs scattered", "Cache-friendly layouts", "Memory overhead"],
                color: "green"
              },
              {
                icon: Layers,
                title: "Organization",
                description: "Structure data for specific use cases",
                examples: ["Hierarchical data (trees)", "Priority-based (heaps)", "Key-value pairs (maps)"],
                color: "purple"
              },
              {
                icon: TrendingUp,
                title: "Scalability",
                description: "Handle growing amounts of data efficiently",
                examples: ["1,000 items vs 1M items", "Linear vs logarithmic growth", "Resource usage"],
                color: "orange"
              }
            ].map((reason, index) => (
              <div key={index} className={`bg-${reason.color}-50 p-6 rounded-xl border border-${reason.color}-200`}>
                <div className={`w-12 h-12 bg-${reason.color}-500 text-white rounded-full flex items-center justify-center mb-4`}>
                  <reason.icon className="w-6 h-6" />
                </div>
                <h3 className={`font-bold text-${reason.color}-900 mb-2`}>{reason.title}</h3>
                <p className={`text-${reason.color}-800 text-sm mb-3`}>{reason.description}</p>
                <ul className={`space-y-1 text-xs text-${reason.color}-700`}>
                  {reason.examples.map((example, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="w-1 h-1 bg-current rounded-full mr-2 mt-1.5"></span>
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">The Big Picture</h3>
            <p className="text-gray-700 mb-4">
              Data structures aren&apos;t arbitrary - they&apos;re engineered solutions to specific problems. 
              Each structure optimizes for different trade-offs between time complexity, space complexity, 
              and memory access patterns.
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-semibold text-gray-900 mb-2">Arrays</h4>
                <p className="text-gray-600">Optimize for cache performance and random access</p>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-semibold text-gray-900 mb-2">Linked Lists</h4>
                <p className="text-gray-600">Optimize for dynamic sizing and insertion flexibility</p>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-semibold text-gray-900 mb-2">Hash Tables</h4>
                <p className="text-gray-600">Optimize for near-constant lookup time</p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Examples */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="w-7 h-7 mr-3 text-green-600" />
            Real Performance Examples
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Finding an Item</h3>
              
              <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                  <h4 className="font-semibold text-red-900 mb-2">Unsorted Array (Linear Search)</h4>
                  <div className="text-sm text-red-800 space-y-1">
                    <p><strong>1,000 items:</strong> Check up to 1,000 items</p>
                    <p><strong>1,000,000 items:</strong> Check up to 1,000,000 items</p>
                    <p className="font-mono bg-red-100 px-2 py-1 rounded inline-block">O(n) - Linear time</p>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">Sorted Array (Binary Search)</h4>
                  <div className="text-sm text-green-800 space-y-1">
                    <p><strong>1,000 items:</strong> Check at most 10 items</p>
                    <p><strong>1,000,000 items:</strong> Check at most 20 items</p>
                    <p className="font-mono bg-green-100 px-2 py-1 rounded inline-block">O(log n) - Logarithmic time</p>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Hash Table</h4>
                  <div className="text-sm text-blue-800 space-y-1">
                    <p><strong>1,000 items:</strong> Usually 1 check</p>
                    <p><strong>1,000,000 items:</strong> Usually 1 check</p>
                    <p className="font-mono bg-blue-100 px-2 py-1 rounded inline-block">O(1) - Constant time</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Memory Access Patterns</h3>
              
              <div className="space-y-4">
                <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                  <h4 className="font-semibold text-yellow-900 mb-2">Sequential Access (Array)</h4>
                  <div className="text-sm text-yellow-800 space-y-2">
                    <p>Accessing elements one after another:</p>
                    <div className="font-mono bg-yellow-100 p-2 rounded">
                      arr[0] → arr[1] → arr[2] → arr[3]
                    </div>
                    <p><strong>Cache friendly:</strong> Next elements likely already loaded</p>
                  </div>
                </div>

                <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                  <h4 className="font-semibold text-orange-900 mb-2">Random Access (Linked List)</h4>
                  <div className="text-sm text-orange-800 space-y-2">
                    <p>Following pointers to scattered locations:</p>
                    <div className="font-mono bg-orange-100 p-2 rounded text-xs">
                      node₁ → [random memory] → node₂ → [random memory]
                    </div>
                    <p><strong>Cache unfriendly:</strong> Each access might miss cache</p>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-2">Impact on Performance</h4>
                  <div className="text-sm text-purple-800 space-y-1">
                    <p><strong>Best case:</strong> Cache hit - 1-3 CPU cycles</p>
                    <p><strong>Worst case:</strong> RAM access - 200+ CPU cycles</p>
                    <p><strong>Really worst:</strong> Disk access - millions of cycles</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Module Statistics */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">4</div>
                <div className="text-green-100">Sections</div>
              </div>
              <Grid3X3 className="w-8 h-8 text-green-100" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">90</div>
                <div className="text-blue-100">Minutes</div>
              </div>
              <Clock className="w-8 h-8 text-blue-100" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold">Beginner</div>
                <div className="text-purple-100">Level</div>
              </div>
              <Award className="w-8 h-8 text-purple-100" />
            </div>
          </div>
        </div>

        {/* Key Takeaways */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-8 rounded-2xl border border-indigo-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Takeaways</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-indigo-900">Memory Hierarchy Matters</h3>
              <ul className="space-y-2 text-sm text-indigo-800">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-indigo-600" />
                  Cache is 100x faster than RAM
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-indigo-600" />
                  RAM is 1000x faster than storage
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-indigo-600" />
                  Sequential access beats random access
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-indigo-900">Data Structures Are Solutions</h3>
              <ul className="space-y-2 text-sm text-indigo-800">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-indigo-600" />
                  Each structure solves specific problems
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-indigo-600" />
                  Performance differences can be dramatic
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-indigo-600" />
                  Choose based on your use case
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Next Module Navigation */}
        <div className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">Ready to Explore Data Structures?</h2>
          <p className="text-indigo-100 mb-6">
            Now that you understand why data structures exist and how memory works, let&apos;s start building them! 
            We&apos;ll begin with Arrays - the foundation of most data structures.
          </p>
          <a 
            href="/learning-path/module-3"
            className="inline-flex items-center bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
          >
            Continue to Module 3: Arrays & Basic Operations
            <ChevronRight className="w-5 h-5 ml-2" />
          </a>
        </div>
      </div>
    </ModuleLayout>
  );
}