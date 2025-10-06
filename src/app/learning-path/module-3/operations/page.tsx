'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ChevronRight, 
  Play, 
  Search,
  Plus,
  Minus,
  RotateCw,
  Grid3X3,
  CheckCircle,
  AlertTriangle,
  Clock,
  Code2,
  Zap
} from 'lucide-react';
import { SectionProgressIndicator } from '@/components/progress/SectionProgressIndicator';
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton';
import PseudocodeBlock from '@/components/PseudocodeBlock';

// Interactive Array Operations Demo
const ArrayOperationsDemo = () => {
  const [array, setArray] = useState([10, 20, 30, 40, 50]);
  const [inputValue, setInputValue] = useState('');
  const [inputIndex, setInputIndex] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [lastOperation, setLastOperation] = useState('');
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);

  const handleInsert = () => {
    if (!inputValue || !inputIndex) return;
    
    const value = parseInt(inputValue);
    const index = parseInt(inputIndex);
    
    if (index < 0 || index > array.length) {
      setLastOperation(`❌ Invalid index: ${index}`);
      return;
    }

    setAnimatingIndex(index);
    setTimeout(() => {
      const newArray = [...array];
      newArray.splice(index, 0, value);
      setArray(newArray);
      setLastOperation(`✅ Inserted ${value} at index ${index}`);
      setInputValue('');
      setInputIndex('');
      setAnimatingIndex(null);
    }, 500);
  };

  const handleDelete = () => {
    if (!inputIndex) return;
    
    const index = parseInt(inputIndex);
    
    if (index < 0 || index >= array.length) {
      setLastOperation(`❌ Invalid index: ${index}`);
      return;
    }

    setAnimatingIndex(index);
    setTimeout(() => {
      const newArray = [...array];
      const deletedValue = newArray.splice(index, 1)[0];
      setArray(newArray);
      setLastOperation(`✅ Deleted ${deletedValue} from index ${index}`);
      setInputIndex('');
      setAnimatingIndex(null);
    }, 500);
  };

  const handleSearch = () => {
    if (!searchValue) return;
    
    const value = parseInt(searchValue);
    const index = array.indexOf(value);
    
    if (index === -1) {
      setLastOperation(`❌ Value ${value} not found`);
    } else {
      setAnimatingIndex(index);
      setLastOperation(`✅ Found ${value} at index ${index}`);
      setTimeout(() => setAnimatingIndex(null), 1000);
    }
    setSearchValue('');
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <Play className="w-6 h-6 mr-2 text-blue-600" />
        Interactive Array Operations
      </h3>
      
      {/* Array Visualization */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-4 overflow-x-auto">
          {array.map((value, index) => (
            <motion.div
              key={`${index}-${value}`}
              initial={{ scale: 1 }}
              animate={{ 
                scale: animatingIndex === index ? 1.2 : 1,
                backgroundColor: animatingIndex === index ? '#fef3c7' : '#f3f4f6'
              }}
              className="relative min-w-[60px]"
            >
              <div className="w-14 h-14 bg-gray-100 border-2 border-gray-300 rounded-lg flex items-center justify-center font-mono text-lg font-semibold">
                {value}
              </div>
              <div className="text-xs text-gray-500 text-center mt-1">[{index}]</div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-sm text-gray-600 mb-4">
          Array size: {array.length} | Last operation: {lastOperation || 'None'}
        </div>
      </div>

      {/* Controls */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Insert */}
        <div className="p-4 border border-green-200 rounded-lg bg-green-50">
          <h4 className="font-semibold text-green-800 mb-2 flex items-center">
            <Plus className="w-4 h-4 mr-1" />
            Insert
          </h4>
          <div className="space-y-2">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Value"
              className="w-full border rounded px-2 py-1 text-sm"
            />
            <input
              type="number"
              value={inputIndex}
              onChange={(e) => setInputIndex(e.target.value)}
              placeholder="Index"
              className="w-full border rounded px-2 py-1 text-sm"
            />
            <button
              onClick={handleInsert}
              className="w-full bg-green-600 text-white py-1 rounded text-sm hover:bg-green-700"
            >
              Insert
            </button>
          </div>
        </div>

        {/* Delete */}
        <div className="p-4 border border-red-200 rounded-lg bg-red-50">
          <h4 className="font-semibold text-red-800 mb-2 flex items-center">
            <Minus className="w-4 h-4 mr-1" />
            Delete
          </h4>
          <div className="space-y-2">
            <input
              type="number"
              value={inputIndex}
              onChange={(e) => setInputIndex(e.target.value)}
              placeholder="Index"
              className="w-full border rounded px-2 py-1 text-sm"
            />
            <button
              onClick={handleDelete}
              className="w-full bg-red-600 text-white py-1 rounded text-sm hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
          <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
            <Search className="w-4 h-4 mr-1" />
            Search
          </h4>
          <div className="space-y-2">
            <input
              type="number"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Value"
              className="w-full border rounded px-2 py-1 text-sm"
            />
            <button
              onClick={handleSearch}
              className="w-full bg-blue-600 text-white py-1 rounded text-sm hover:bg-blue-700"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Complexity Comparison Component
const ComplexityComparison = () => {
  const operations = [
    { 
      name: 'Access by Index', 
      timeComplexity: 'O(1)', 
      description: 'Direct memory access using base + (index × element_size)',
      color: 'bg-green-100 text-green-800'
    },
    { 
      name: 'Linear Search', 
      timeComplexity: 'O(n)', 
      description: 'Must check each element until found or end reached',
      color: 'bg-yellow-100 text-yellow-800'
    },
    { 
      name: 'Insert at Beginning', 
      timeComplexity: 'O(n)', 
      description: 'Must shift all existing elements to the right',
      color: 'bg-red-100 text-red-800'
    },
    { 
      name: 'Insert at End', 
      timeComplexity: 'O(1)*', 
      description: 'Direct insertion if space available (*amortized for dynamic arrays)',
      color: 'bg-green-100 text-green-800'
    },
    { 
      name: 'Delete from Beginning', 
      timeComplexity: 'O(n)', 
      description: 'Must shift all remaining elements to the left',
      color: 'bg-red-100 text-red-800'
    },
    { 
      name: 'Delete from End', 
      timeComplexity: 'O(1)', 
      description: 'Simply reduce the size, no shifting required',
      color: 'bg-green-100 text-green-800'
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <Clock className="w-6 h-6 mr-2 text-yellow-600" />
        Time Complexity Analysis
      </h3>
      
      <div className="space-y-3">
        {operations.map((op, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
          >
            <div className="flex-1">
              <div className="font-medium text-gray-800">{op.name}</div>
              <div className="text-sm text-gray-600">{op.description}</div>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-mono font-semibold ${op.color}`}>
              {op.timeComplexity}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default function ArrayOperationsPage() {
  const [activeTab, setActiveTab] = useState<'insert' | 'delete' | 'search' | 'traverse'>('insert');

  const pseudocodeExamples = {
    insert: `ALGORITHM: Array Insert at Index
INPUT: array[], size, index, value
OUTPUT: modified array[] with increased size

BEGIN
1. IF index < 0 OR index > size THEN
2.     RETURN "Invalid Index"
3. END IF
4. 
5. FOR i = size DOWN TO index + 1 DO
6.     array[i] = array[i-1]     // Shift elements right
7. END FOR
8. 
9. array[index] = value          // Insert new value
10. size = size + 1              // Increase array size
11. RETURN "Success"
END`,
    
    delete: `ALGORITHM: Array Delete at Index
INPUT: array[], size, index
OUTPUT: modified array[] with decreased size

BEGIN
1. IF index < 0 OR index >= size THEN
2.     RETURN "Invalid Index"
3. END IF
4. 
5. FOR i = index TO size - 2 DO
6.     array[i] = array[i+1]     // Shift elements left
7. END FOR
8. 
9. size = size - 1              // Decrease array size
10. RETURN "Success"
END`,

    search: `ALGORITHM: Linear Search in Array
INPUT: array[], size, target
OUTPUT: index of target or -1 if not found

BEGIN
1. FOR i = 0 TO size - 1 DO
2.     IF array[i] == target THEN
3.         RETURN i             // Found at index i
4.     END IF
5. END FOR
6. 
7. RETURN -1                    // Not found
END`,

    traverse: `ALGORITHM: Array Traversal
INPUT: array[], size
OUTPUT: processed array elements

BEGIN
1. FOR i = 0 TO size - 1 DO
2.     PROCESS(array[i])        // Process current element
3.     PRINT array[i]           // Or any operation
4. END FOR
END

// Time Complexity: O(n)
// Space Complexity: O(1)`
  };

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
              <h1 className="text-4xl font-bold mb-2">Array Operations</h1>
              <p className="text-blue-100">Master insertion, deletion, searching, and traversal with interactive examples</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        {/* Interactive Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ArrayOperationsDemo />
        </motion.div>

        {/* Core Operations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-8 shadow-lg border"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <Code2 className="w-8 h-8 mr-3 text-blue-600" />
            Core Array Operations
          </h2>
          
          {/* Tab Navigation */}
          <div className="flex space-x-2 mb-6 border-b">
            {['insert', 'delete', 'search', 'traverse'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-2 font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Pseudocode Display */}
          <div className="mb-6">
            <PseudocodeBlock code={pseudocodeExamples[activeTab]} />
          </div>

          {/* C++ Implementation */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-3">C++ Implementation:</h4>
            <pre className="bg-gray-800 text-green-400 p-4 rounded text-sm overflow-x-auto">
              {activeTab === 'insert' && `// Insert operation in C++
void insertAt(int arr[], int &size, int index, int value) {
    // Shift elements to the right
    for(int i = size; i > index; i--) {
        arr[i] = arr[i-1];
    }
    arr[index] = value;
    size++;
}`}
              
              {activeTab === 'delete' && `// Delete operation in C++
void deleteAt(int arr[], int &size, int index) {
    // Shift elements to the left
    for(int i = index; i < size-1; i++) {
        arr[i] = arr[i+1];
    }
    size--;
}`}
              
              {activeTab === 'search' && `// Linear search in C++
int linearSearch(int arr[], int size, int target) {
    for(int i = 0; i < size; i++) {
        if(arr[i] == target) {
            return i;  // Found at index i
        }
    }
    return -1;  // Not found
}`}
              
              {activeTab === 'traverse' && `// Array traversal in C++
void traverse(int arr[], int size) {
    for(int i = 0; i < size; i++) {
        cout << arr[i] << " ";
        // Process each element
    }
    cout << endl;
}`}
            </pre>
          </div>
        </motion.div>

        {/* Complexity Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ComplexityComparison />
        </motion.div>

        {/* Common Pitfalls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-8 shadow-lg border"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <AlertTriangle className="w-8 h-8 mr-3 text-yellow-600" />
            Common Pitfalls & Best Practices
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-red-800 mb-4">❌ Common Mistakes</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <AlertTriangle className="w-4 h-4 mr-2 text-red-600 mt-0.5" />
                  <div>
                    <strong>Buffer Overflow:</strong> Inserting beyond array bounds
                    <pre className="text-xs bg-red-100 p-2 mt-1 rounded">arr[1000] = value; // If array size is 100</pre>
                  </div>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-4 h-4 mr-2 text-red-600 mt-0.5" />
                  <div>
                    <strong>Off-by-One Errors:</strong> Incorrect loop bounds
                    <pre className="text-xs bg-red-100 p-2 mt-1 rounded">for(i = 0; i &lt;= size; i++) // Should be i &lt; size</pre>
                  </div>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-4 h-4 mr-2 text-red-600 mt-0.5" />
                  <div>
                    <strong>Not Updating Size:</strong> Forgetting to modify array size after operations
                  </div>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-green-800 mb-4">✅ Best Practices</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600 mt-0.5" />
                  <div>
                    <strong>Bounds Checking:</strong> Always validate indices before access
                    <pre className="text-xs bg-green-100 p-2 mt-1 rounded">if(index &gt;= 0 && index &lt; size) { /* safe */ }</pre>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600 mt-0.5" />
                  <div>
                    <strong>Use const for read-only:</strong> Prevent accidental modifications
                    <pre className="text-xs bg-green-100 p-2 mt-1 rounded">void print(const int arr[], int size)</pre>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600 mt-0.5" />
                  <div>
                    <strong>Consider std::vector:</strong> For dynamic sizing and safety
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
            href="/learning-path/module-2/memory"
            className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Previous: Memory Layout
          </Link>
          
          <Link
            href="/learning-path/module-2/algorithms"
            className="flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
          >
            Next: Array Algorithms
            <ChevronRight className="w-6 h-6 ml-2" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}