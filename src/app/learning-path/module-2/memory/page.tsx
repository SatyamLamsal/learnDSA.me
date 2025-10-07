'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ChevronRight, 
  Cpu, 
  MemoryStick, 
  Layers,
  Zap,
  Grid3X3,
  AlertTriangle,
  CheckCircle,
  Monitor,
  HardDrive,
  Clock
} from 'lucide-react';
import { SectionProgressIndicator } from '@/components/progress/SectionProgressIndicator';
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton';

// Memory Layout Visualization Component
const MemoryLayoutVisualization = () => {
  const [selectedType, setSelectedType] = useState<'stack' | 'heap'>('stack');

  const stackMemory = [
    { address: '0x7FFF', data: 'main()', type: 'function' },
    { address: '0x7FFE', data: 'int arr[5]', type: 'static-array' },
    { address: '0x7FFD', data: '[0] = 10', type: 'array-element' },
    { address: '0x7FFC', data: '[1] = 20', type: 'array-element' },
    { address: '0x7FFB', data: '[2] = 30', type: 'array-element' },
    { address: '0x7FFA', data: '[3] = 40', type: 'array-element' },
    { address: '0x7FF9', data: '[4] = 50', type: 'array-element' },
    { address: '0x7FF8', data: 'int x = 100', type: 'variable' },
  ];

  const heapMemory = [
    { address: '0x1000', data: 'Header', type: 'metadata' },
    { address: '0x1004', data: 'Size: 20 bytes', type: 'metadata' },
    { address: '0x1008', data: '[0] = 10', type: 'array-element' },
    { address: '0x100C', data: '[1] = 20', type: 'array-element' },
    { address: '0x1010', data: '[2] = 30', type: 'array-element' },
    { address: '0x1014', data: '[3] = 40', type: 'array-element' },
    { address: '0x1018', data: '[4] = 50', type: 'array-element' },
    { address: '0x101C', data: 'Free space', type: 'free' },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'function': return 'bg-blue-100 border-blue-300';
      case 'static-array': return 'bg-green-100 border-green-300';
      case 'array-element': return 'bg-yellow-100 border-yellow-300';
      case 'variable': return 'bg-purple-100 border-purple-300';
      case 'metadata': return 'bg-red-100 border-red-300';
      case 'free': return 'bg-gray-100 border-gray-300';
      default: return 'bg-gray-100 border-gray-300';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <MemoryStick className="w-6 h-6 mr-2 text-blue-600" />
        Memory Layout Visualization
      </h3>
      
      <div className="mb-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedType('stack')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedType === 'stack' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Stack Memory
          </button>
          <button
            onClick={() => setSelectedType('heap')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedType === 'heap' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Heap Memory
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">
            {selectedType === 'stack' ? 'Stack Layout (Static Array)' : 'Heap Layout (Dynamic Array)'}
          </h4>
          <div className="space-y-1">
            {(selectedType === 'stack' ? stackMemory : heapMemory).map((item, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-2 rounded border-2 text-sm ${getTypeColor(item.type)}`}
              >
                <span className="font-mono text-xs">{item.address}</span>
                <span className="flex-1 mx-2">{item.data}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-3">
            {selectedType === 'stack' ? 'Stack Characteristics' : 'Heap Characteristics'}
          </h4>
          {selectedType === 'stack' ? (
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• LIFO (Last In, First Out) allocation</li>
              <li>• Automatic memory management</li>
              <li>• Fast allocation/deallocation</li>
              <li>• Limited size (typically ~8MB)</li>
              <li>• Memory addresses decrease</li>
              <li>• No memory fragmentation</li>
            </ul>
          ) : (
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Manual memory management</li>
              <li>• Larger available space</li>
              <li>• Slower allocation/deallocation</li>
              <li>• Can cause memory fragmentation</li>
              <li>• Risk of memory leaks</li>
              <li>• Supports dynamic sizing</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

// Cache Performance Visualization
const CachePerformanceDemo = () => {
  const [accessPattern, setAccessPattern] = useState<'sequential' | 'random'>('sequential');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cacheHits, setCacheHits] = useState(0);
  const [cacheMisses, setCacheMisses] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const array = Array.from({ length: 16 }, (_, i) => i + 1);
  const cacheLineSize = 4; // 4 elements per cache line
  
  const simulateAccess = () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setCacheHits(0);
    setCacheMisses(0);
    
    const pattern = accessPattern === 'sequential' 
      ? Array.from({ length: 8 }, (_, i) => i)
      : [0, 4, 8, 12, 1, 5, 9, 13]; // Random pattern
    
    let hits = 0;
    let misses = 0;
    const loadedCacheLines = new Set<number>();
    
    pattern.forEach((index, step) => {
      setTimeout(() => {
        setCurrentIndex(index);
        const cacheLineIndex = Math.floor(index / cacheLineSize);
        
        if (loadedCacheLines.has(cacheLineIndex)) {
          hits++;
          setCacheHits(hits);
        } else {
          misses++;
          setCacheMisses(misses);
          loadedCacheLines.add(cacheLineIndex);
        }
        
        if (step === pattern.length - 1) {
          setTimeout(() => setIsRunning(false), 500);
        }
      }, step * 800);
    });
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <Zap className="w-6 h-6 mr-2 text-yellow-600" />
        Cache Performance Demo
      </h3>
      
      <div className="mb-4">
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setAccessPattern('sequential')}
              className={`px-3 py-1 rounded text-sm ${
                accessPattern === 'sequential' ? 'bg-green-600 text-white' : 'bg-gray-200'
              }`}
            >
              Sequential Access
            </button>
            <button
              onClick={() => setAccessPattern('random')}
              className={`px-3 py-1 rounded text-sm ${
                accessPattern === 'random' ? 'bg-red-600 text-white' : 'bg-gray-200'
              }`}
            >
              Random Access
            </button>
          </div>
          
          <button
            onClick={simulateAccess}
            disabled={isRunning}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isRunning ? 'Running...' : 'Simulate Access'}
          </button>
        </div>
        
        <div className="grid grid-cols-4 gap-2 mb-4">
          {array.map((value, index) => {
            const cacheLineIndex = Math.floor(index / cacheLineSize);
            const isCurrentlyAccessed = currentIndex === index;
            const cacheLineColor = ['bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-purple-100'][cacheLineIndex];
            
            return (
              <div
                key={index}
                className={`w-12 h-12 border-2 rounded flex items-center justify-center text-sm font-mono ${
                  isCurrentlyAccessed 
                    ? 'border-red-500 bg-red-200 animate-pulse' 
                    : `border-gray-300 ${cacheLineColor}`
                }`}
              >
                {value}
              </div>
            );
          })}
        </div>
        
        <div className="flex justify-between text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-200 border mr-2"></div>
            <span>Cache Hits: {cacheHits}</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-200 border mr-2"></div>
            <span>Cache Misses: {cacheMisses}</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">Cache Line Concept:</h4>
        <p className="text-sm text-gray-600">
          CPUs load data in chunks called cache lines (typically 64 bytes). Sequential array access 
          is faster because multiple elements are loaded together, while random access causes more cache misses.
        </p>
      </div>
    </div>
  );
};

export default function ArrayMemoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4 mb-4">
            <Link href="/learning-path/module-2" className="text-white hover:text-blue-200">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-4xl font-bold mb-2">Array Memory Layout</h1>
              <p className="text-blue-100">Understanding memory allocation, cache performance, and optimization strategies</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        {/* Memory Allocation Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 shadow-lg border"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <Cpu className="w-8 h-8 mr-3 text-blue-600" />
            Memory Allocation in C/C++
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Stack Allocation</h3>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                <pre className="text-sm font-mono text-blue-800">
{`// Static array - Stack allocated
int arr[1000];           // 4KB on stack
char buffer[256];        // 256 bytes on stack

// Automatic cleanup when scope ends`}
                </pre>
              </div>
              
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                  Fast allocation (single instruction)
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                  Automatic memory management
                </li>
                <li className="flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2 text-yellow-600" />
                  Limited size (~8MB typical)
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Heap Allocation</h3>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
                <pre className="text-sm font-mono text-green-800">
{`// Dynamic array - Heap allocated
int* arr = new int[size];     // Runtime size
int* buffer = malloc(1000 * sizeof(int));

// Manual cleanup required
delete[] arr;
free(buffer);`}
                </pre>
              </div>
              
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                  Large memory available
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                  Runtime size determination
                </li>
                <li className="flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2 text-red-600" />
                  Manual memory management
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Interactive Visualizations */}
        <div className="grid md:grid-cols-1 gap-8">
          <MemoryLayoutVisualization />
          <CachePerformanceDemo />
        </div>

        {/* Memory Performance Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-8 shadow-lg border"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <Clock className="w-8 h-8 mr-3 text-yellow-600" />
            Performance Comparison
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-3 text-left">Operation</th>
                  <th className="border border-gray-300 px-4 py-3 text-center">Stack Array</th>
                  <th className="border border-gray-300 px-4 py-3 text-center">Heap Array</th>
                  <th className="border border-gray-300 px-4 py-3 text-center">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">Allocation</td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-green-600">~1 cycle</td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-red-600">~100+ cycles</td>
                  <td className="border border-gray-300 px-4 py-3 text-sm">Stack pointer increment vs heap search</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">Access Speed</td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-green-600">Faster</td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-yellow-600">Slightly slower</td>
                  <td className="border border-gray-300 px-4 py-3 text-sm">Cache locality matters more</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 font-medium">Memory Limit</td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-red-600">~8MB</td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-green-600">GB+ available</td>
                  <td className="border border-gray-300 px-4 py-3 text-sm">OS and system dependent</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">Fragmentation</td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-green-600">None</td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-red-600">Possible</td>
                  <td className="border border-gray-300 px-4 py-3 text-sm">Heap can become fragmented</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Best Practices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-8 shadow-lg border"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Memory Optimization Best Practices</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-green-800 mb-4">✅ Do</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600 mt-0.5" />
                  <div>
                    <strong>Use stack arrays for small, fixed sizes</strong>
                    <div className="text-gray-600">Better performance for arrays under 1KB</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600 mt-0.5" />
                  <div>
                    <strong>Access arrays sequentially when possible</strong>
                    <div className="text-gray-600">Maximizes cache locality and performance</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600 mt-0.5" />
                  <div>
                    <strong>Align data structures properly</strong>
                    <div className="text-gray-600">Use compiler alignment for optimal performance</div>
                  </div>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-red-800 mb-4">❌ Don&apos;t</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <AlertTriangle className="w-4 h-4 mr-2 text-red-600 mt-0.5" />
                  <div>
                    <strong>Allocate large arrays on stack</strong>
                    <div className="text-gray-600">Risk of stack overflow for arrays &gt; 1MB</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-4 h-4 mr-2 text-red-600 mt-0.5" />
                  <div>
                    <strong>Forget to free heap-allocated memory</strong>
                    <div className="text-gray-600">Causes memory leaks and system issues</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-4 h-4 mr-2 text-red-600 mt-0.5" />
                  <div>
                    <strong>Use random access patterns unnecessarily</strong>
                    <div className="text-gray-600">Poor cache performance and slower execution</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-between items-center"
        >
          <Link
            href="/learning-path/module-2/types"
            className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Previous: Array Types
          </Link>
          
          <Link
            href="/learning-path/module-2/operations"
            className="flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
          >
            Next: Basic Operations
            <ChevronRight className="w-6 h-6 ml-2" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}