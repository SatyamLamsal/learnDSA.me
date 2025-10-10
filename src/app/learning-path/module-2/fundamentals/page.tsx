'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { EnhancedModuleLayout } from '@/components/layouts/EnhancedModuleLayout';
import { 
  ArrowLeft, 
  ChevronRight, 
  BookOpen,
  MemoryStick,
  Code2,
  Brain,
  Grid3X3,
  List,
  Database,
  Layers,
  Zap,
  Target,
  CheckCircle,
  AlertCircle,
  Info,
  TrendingUp,
  ArrowRight,
  Square,
  Hash
} from 'lucide-react';

export default function ArrayFundamentalsPage() {
  const [activeVisualization, setActiveVisualization] = useState<'static' | 'dynamic'>('static');
  const [selectedArrayType, setSelectedArrayType] = useState<'1d' | '2d' | 'jagged'>('1d');

  const arrayDefinitions = [
    {
      term: "Array",
      definition: "A collection of elements of the same data type stored in contiguous memory locations",
      example: "int arr[5] = {10, 20, 30, 40, 50}",
      icon: Grid3X3,
      color: "blue"
    },
    {
      term: "Index",
      definition: "A numerical position that identifies each element in an array (typically starts from 0)",
      example: "arr[0] = 10, arr[1] = 20",
      icon: Hash,
      color: "green"
    },
    {
      term: "Element",
      definition: "An individual data item stored at a specific position within the array",
      example: "In {10, 20, 30}, each number is an element",
      icon: Square,
      color: "purple"
    },
    {
      term: "Length/Size",
      definition: "The total number of elements that an array can hold",
      example: "Array of size 5 can hold 5 elements",
      icon: List,
      color: "orange"
    }
  ];

  const arrayTypes = [
    {
      name: "Static Arrays",
      description: "Fixed size arrays allocated at compile time",
      characteristics: [
        "Size determined at compile time",
        "Memory allocated on stack",
        "Faster access due to stack allocation",
        "Cannot resize during runtime"
      ],
      syntax: "int arr[10]; // C/C++\nint[] arr = new int[10]; // Java",
      pros: ["Fast access", "No memory overhead", "Cache-friendly"],
      cons: ["Fixed size", "Memory waste if underutilized", "Stack overflow risk"],
      icon: Database,
      color: "blue"
    },
    {
      name: "Dynamic Arrays",
      description: "Resizable arrays allocated at runtime",
      characteristics: [
        "Size can change during runtime",
        "Memory allocated on heap",
        "Automatic resizing when needed",
        "Slight performance overhead"
      ],
      syntax: "vector<int> arr; // C++\nArrayList<Integer> arr; // Java\nlist = [] // Python",
      pros: ["Flexible size", "No upfront size declaration", "Automatic memory management"],
      cons: ["Slower than static", "Memory overhead", "Heap fragmentation"],
      icon: TrendingUp,
      color: "green"
    }
  ];

  const arrayDimensions = [
    {
      name: "1D Array (Linear)",
      description: "A single row of elements accessed by one index",
      visualization: "[10][20][30][40][50]",
      example: "int arr[5] = {10, 20, 30, 40, 50};",
      accessPattern: "arr[index]",
      useCase: "Simple lists, sequences, basic data storage",
      icon: ArrowRight,
      color: "blue"
    },
    {
      name: "2D Array (Matrix)",
      description: "A grid of elements accessed by row and column indices",
      visualization: `[10][20][30]
[40][50][60]
[70][80][90]`,
      example: "int arr[3][3] = {{10,20,30}, {40,50,60}, {70,80,90}};",
      accessPattern: "arr[row][col]",
      useCase: "Images, matrices, game boards, tables",
      icon: Grid3X3,
      color: "green"
    },
    {
      name: "Jagged Array",
      description: "Array of arrays where each sub-array can have different lengths",
      visualization: `[10][20]
[30][40][50][60]
[70]`,
      example: "int[][] arr = {{10,20}, {30,40,50,60}, {70}};",
      accessPattern: "arr[row][col]",
      useCase: "Sparse data, variable-length records",
      icon: Layers,
      color: "purple"
    }
  ];

  const memoryLayout = {
    static: {
      title: "Static Array Memory Layout",
      description: "Elements stored in contiguous memory locations on the stack",
      addresses: ["0x1000", "0x1004", "0x1008", "0x100C", "0x1010"],
      values: [10, 20, 30, 40, 50],
      characteristics: [
        "Contiguous memory allocation",
        "Fixed memory addresses",
        "Stack-based allocation",
        "Fast access due to locality"
      ]
    },
    dynamic: {
      title: "Dynamic Array Memory Layout",
      description: "Elements stored in heap with pointer-based access",
      addresses: ["0x2000", "0x2004", "0x2008", "0x200C", "0x2010"],
      values: [10, 20, 30, 40, 50],
      characteristics: [
        "Heap-based allocation",
        "Pointer indirection",
        "Resizable structure",
        "Additional metadata overhead"
      ]
    }
  };

  return (
    <EnhancedModuleLayout
      moduleId="module-2"
      moduleTitle="Module 2: Arrays & Memory Fundamentals"
      moduleDescription="Master array structures and memory optimization techniques"
      sections={[
        { id: 'fundamentals', name: 'Array Fundamentals', icon: BookOpen, href: '/learning-path/module-2/fundamentals' },
        { id: 'memory', name: 'Memory Layout', icon: MemoryStick, href: '/learning-path/module-2/memory' },
        { id: 'operations', name: 'Basic Operations', icon: Code2, href: '/learning-path/module-2/operations' },
        { id: 'algorithms', name: 'Array Algorithms', icon: Brain, href: '/learning-path/module-2/algorithms' }
      ]}
      activeSection="fundamentals"
      backUrl="/learning-path/module-2"
      estimatedTime="20 minutes"
      difficulty="Beginner"
      totalSections={4}
      currentPath="/learning-path/module-2/fundamentals"
      showFullCourseStructure={true}
      enableScrollSpy={true}
    >
      {/* Array Definitions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 shadow-lg border mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <BookOpen className="w-8 h-8 mr-3 text-blue-600" />
          What is an Array?
        </h2>
        
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl mb-8 border border-blue-200">
          <p className="text-lg text-gray-700 leading-relaxed">
            An <strong>array</strong> is a fundamental data structure that stores multiple elements of the same type 
            in contiguous memory locations. Think of it as a row of boxes, where each box can hold one piece of data, 
            and each box has a numbered address (index) for easy access.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {arrayDefinitions.map((def, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-${def.color}-50 p-6 rounded-xl border border-${def.color}-200`}
            >
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 bg-${def.color}-500 text-white rounded-full flex items-center justify-center mr-4`}>
                  <def.icon className="w-6 h-6" />
                </div>
                <h3 className={`text-xl font-bold text-${def.color}-900`}>{def.term}</h3>
              </div>
              <p className={`text-${def.color}-800 mb-4 leading-relaxed`}>{def.definition}</p>
              <div className={`bg-white p-3 rounded-lg border border-${def.color}-200`}>
                <p className="text-sm font-medium text-gray-700 mb-1">Example:</p>
                <code className="text-sm text-gray-600 font-mono">{def.example}</code>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Array Types Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-8 shadow-lg border mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <Database className="w-8 h-8 mr-3 text-green-600" />
          Static vs Dynamic Arrays
        </h2>

        <div className="grid lg:grid-cols-2 gap-8">
          {arrayTypes.map((type, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`bg-${type.color}-50 rounded-xl p-6 border border-${type.color}-200`}
            >
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 bg-${type.color}-500 text-white rounded-full flex items-center justify-center mr-4`}>
                  <type.icon className="w-6 h-6" />
                </div>
                <h3 className={`text-2xl font-bold text-${type.color}-900`}>{type.name}</h3>
              </div>

              <p className={`text-${type.color}-800 mb-6 leading-relaxed`}>{type.description}</p>

              <div className="space-y-4">
                <div>
                  <h4 className={`font-semibold text-${type.color}-900 mb-2`}>Characteristics:</h4>
                  <ul className="space-y-1">
                    {type.characteristics.map((char, idx) => (
                      <li key={idx} className={`text-${type.color}-700 text-sm flex items-start`}>
                        <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500" />
                        {char}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Syntax Examples:</h4>
                  <pre className="text-sm text-gray-600 font-mono whitespace-pre-wrap">{type.syntax}</pre>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Pros
                    </h4>
                    <ul className="space-y-1">
                      {type.pros.map((pro, idx) => (
                        <li key={idx} className="text-green-600 text-sm">• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-700 mb-2 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      Cons
                    </h4>
                    <ul className="space-y-1">
                      {type.cons.map((con, idx) => (
                        <li key={idx} className="text-red-600 text-sm">• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Array Dimensions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl p-8 shadow-lg border mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <Grid3X3 className="w-8 h-8 mr-3 text-purple-600" />
          Array Dimensions
        </h2>

        <div className="mb-6">
          <div className="flex space-x-4 mb-6">
            {['1d', '2d', 'jagged'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedArrayType(type as '1d' | '2d' | 'jagged')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedArrayType === type
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type === '1d' ? '1D Array' : type === '2d' ? '2D Array' : 'Jagged Array'}
              </button>
            ))}
          </div>

          {arrayDimensions.map((dim, index) => {
            if ((selectedArrayType === '1d' && dim.name.includes('1D')) ||
                (selectedArrayType === '2d' && dim.name.includes('2D')) ||
                (selectedArrayType === 'jagged' && dim.name.includes('Jagged'))) {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`bg-${dim.color}-50 rounded-xl p-6 border border-${dim.color}-200`}
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 bg-${dim.color}-500 text-white rounded-full flex items-center justify-center mr-4`}>
                      <dim.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className={`text-2xl font-bold text-${dim.color}-900`}>{dim.name}</h3>
                      <p className={`text-${dim.color}-700`}>{dim.description}</p>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Visual Representation:</h4>
                      <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm whitespace-pre">
                        {dim.visualization}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Declaration:</h4>
                        <code className="bg-gray-100 text-gray-800 p-2 rounded text-sm block">{dim.example}</code>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Access Pattern:</h4>
                        <code className="bg-gray-100 text-gray-800 p-2 rounded text-sm block">{dim.accessPattern}</code>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Common Use Cases:</h4>
                        <p className="text-gray-700 text-sm">{dim.useCase}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            }
            return null;
          })}
        </div>
      </motion.div>

      {/* Memory Layout Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl p-8 shadow-lg border mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <MemoryStick className="w-8 h-8 mr-3 text-indigo-600" />
          Memory Layout Visualization
        </h2>

        <div className="mb-6">
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveVisualization('static')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeVisualization === 'static'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Static Array
            </button>
            <button
              onClick={() => setActiveVisualization('dynamic')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeVisualization === 'dynamic'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Dynamic Array
            </button>
          </div>

          <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-200">
            <h3 className="text-xl font-bold text-indigo-900 mb-4">
              {memoryLayout[activeVisualization].title}
            </h3>
            <p className="text-indigo-800 mb-6">{memoryLayout[activeVisualization].description}</p>

            <div className="space-y-4">
              <div className="flex items-center space-x-2 overflow-x-auto pb-4">
                {memoryLayout[activeVisualization].addresses.map((addr, index) => (
                  <div key={index} className="flex-shrink-0">
                    <div className="bg-white border-2 border-indigo-300 rounded-lg p-3 text-center min-w-[80px]">
                      <div className="text-xs text-gray-500 mb-1">Address</div>
                      <div className="font-mono text-sm font-medium text-indigo-700">{addr}</div>
                      <div className="border-t border-indigo-200 mt-2 pt-2">
                        <div className="text-xs text-gray-500 mb-1">Value</div>
                        <div className="font-mono text-lg font-bold text-indigo-900">
                          {memoryLayout[activeVisualization].values[index]}
                        </div>
                      </div>
                    </div>
                    {index < memoryLayout[activeVisualization].addresses.length - 1 && (
                      <div className="flex justify-center mt-2">
                        <ArrowRight className="w-4 h-4 text-indigo-400" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="bg-white p-4 rounded-lg border border-indigo-200">
                <h4 className="font-semibold text-indigo-900 mb-3">Key Characteristics:</h4>
                <ul className="space-y-2">
                  {memoryLayout[activeVisualization].characteristics.map((char, index) => (
                    <li key={index} className="flex items-start text-indigo-700">
                      <Info className="w-4 h-4 mr-2 mt-0.5 text-indigo-500" />
                      {char}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Key Takeaways */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200 mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <Target className="w-8 h-8 mr-3 text-green-600" />
          Key Takeaways
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold text-green-900">Arrays are Foundation</h3>
                <p className="text-green-700 text-sm">Arrays form the basis for more complex data structures like strings, matrices, and dynamic lists.</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold text-green-900">Memory Efficiency</h3>
                <p className="text-green-700 text-sm">Contiguous memory layout makes arrays cache-friendly and memory-efficient for sequential data.</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold text-green-900">Index-Based Access</h3>
                <p className="text-green-700 text-sm">Direct access to any element using its index makes arrays perfect for random access patterns.</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold text-green-900">Trade-offs Matter</h3>
                <p className="text-green-700 text-sm">Choose between static (fast, fixed) and dynamic (flexible, overhead) based on your needs.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="flex justify-between items-center mt-12"
      >
        <Link
          href="/learning-path/module-2"
          className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Module 2
        </Link>
        <Link
          href="/learning-path/module-2/memory"
          className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Next: Memory Layout
          <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </motion.div>
    </EnhancedModuleLayout>
  );
}