'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Search, Trash2, Edit, Play } from 'lucide-react';

interface ArrayElement {
  value: number;
  id: string;
  isHighlighted?: boolean;
  isNew?: boolean;
}

export default function ArraysSimulationPage() {
  const [array, setArray] = useState<ArrayElement[]>([
    { value: 10, id: '1' },
    { value: 23, id: '2' },
    { value: 45, id: '3' },
    { value: 67, id: '4' },
    { value: 89, id: '5' }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [insertIndex, setInsertIndex] = useState('');
  const [message, setMessage] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<number | null>(null);

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const addElement = () => {
    if (!inputValue || isNaN(Number(inputValue))) {
      showMessage('Please enter a valid number');
      return;
    }

    const newElement: ArrayElement = {
      value: Number(inputValue),
      id: Date.now().toString(),
      isNew: true
    };

    setArray(prev => [...prev, newElement]);
    setInputValue('');
    showMessage(`Added ${inputValue} to the array`);
    
    // Remove the new highlight after animation
    setTimeout(() => {
      setArray(prev => prev.map(el => ({ ...el, isNew: false })));
    }, 1000);
  };

  const insertAt = () => {
    if (!inputValue || !insertIndex || isNaN(Number(inputValue)) || isNaN(Number(insertIndex))) {
      showMessage('Please enter valid number and index');
      return;
    }

    const index = Number(insertIndex);
    const value = Number(inputValue);

    if (index < 0 || index > array.length) {
      showMessage(`Index must be between 0 and ${array.length}`);
      return;
    }

    const newElement: ArrayElement = {
      value: value,
      id: Date.now().toString(),
      isNew: true
    };

    const newArray = [...array];
    newArray.splice(index, 0, newElement);
    setArray(newArray);
    setInputValue('');
    setInsertIndex('');
    showMessage(`Inserted ${value} at index ${index}`);
    
    setTimeout(() => {
      setArray(prev => prev.map(el => ({ ...el, isNew: false })));
    }, 1000);
  };

  const deleteElement = (index: number) => {
    const deletedValue = array[index].value;
    setArray(prev => prev.filter((_, i) => i !== index));
    showMessage(`Deleted ${deletedValue} from index ${index}`);
  };

  const searchElement = async () => {
    if (!searchValue || isNaN(Number(searchValue))) {
      showMessage('Please enter a valid number to search');
      return;
    }

    setIsSearching(true);
    setSearchResult(null);
    const target = Number(searchValue);
    
    // Clear previous highlights
    setArray(prev => prev.map(el => ({ ...el, isHighlighted: false })));

    // Animate linear search
    for (let i = 0; i < array.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setArray(prev => prev.map((el, index) => ({
        ...el,
        isHighlighted: index === i
      })));

      if (array[i].value === target) {
        setSearchResult(i);
        showMessage(`Found ${target} at index ${i}`);
        setIsSearching(false);
        return;
      }
    }

    // Not found
    setArray(prev => prev.map(el => ({ ...el, isHighlighted: false })));
    setSearchResult(-1);
    showMessage(`${target} not found in the array`);
    setIsSearching(false);
  };

  const clearArray = () => {
    setArray([]);
    setSearchResult(null);
    showMessage('Array cleared');
  };

  const generateRandomArray = () => {
    const size = Math.floor(Math.random() * 8) + 3; // 3-10 elements
    const newArray: ArrayElement[] = [];
    
    for (let i = 0; i < size; i++) {
      newArray.push({
        value: Math.floor(Math.random() * 100) + 1,
        id: `random-${i}`,
        isNew: true
      });
    }
    
    setArray(newArray);
    setSearchResult(null);
    showMessage(`Generated random array with ${size} elements`);
    
    setTimeout(() => {
      setArray(prev => prev.map(el => ({ ...el, isNew: false })));
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <Link href="/data-structures/arrays" className="inline-flex items-center text-red-600 hover:text-red-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Arrays Overview
          </Link>
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Interactive Array Simulation</h1>
          <p className="text-xl text-slate-600 max-w-3xl">
            Practice array operations with real-time visualization. Add, search, insert, and delete elements to understand how arrays work.
          </p>
        </motion.div>

        {/* Message Display */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-6"
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Array Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">Array Visualization</h2>
          
          <div className="flex justify-center items-center space-x-2 mb-4 flex-wrap gap-2">
            <AnimatePresence>
              {array.map((element, index) => (
                <motion.div
                  key={element.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    backgroundColor: element.isHighlighted ? '#fbbf24' : 
                                   element.isNew ? '#34d399' : '#ef4444'
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`relative w-16 h-16 rounded-lg flex flex-col items-center justify-center text-white font-bold border-2 shadow-md
                    ${element.isHighlighted ? 'border-yellow-600' : 
                      element.isNew ? 'border-green-600' : 'border-red-600'}`}
                  style={{ 
                    backgroundColor: element.isHighlighted ? '#fbbf24' : 
                                   element.isNew ? '#34d399' : '#ef4444'
                  }}
                >
                  <div className="text-lg">{element.value}</div>
                  <button
                    onClick={() => deleteElement(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white text-xs"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {array.length === 0 && (
              <div className="text-gray-500 text-center py-8">
                Array is empty. Add some elements to get started!
              </div>
            )}
          </div>
          
          {/* Index Display */}
          {array.length > 0 && (
            <div className="flex justify-center items-center space-x-2 text-sm text-gray-600 flex-wrap gap-2">
              {array.map((_, index) => (
                <div key={index} className="w-16 text-center">
                  [{index}]
                </div>
              ))}
            </div>
          )}

          {/* Search Result */}
          {searchResult !== null && (
            <div className="text-center mt-4">
              {searchResult >= 0 ? (
                <span className="text-green-600 font-semibold">
                  Found at index {searchResult}
                </span>
              ) : (
                <span className="text-red-600 font-semibold">
                  Element not found
                </span>
              )}
            </div>
          )}
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Add Element */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Plus className="h-6 w-6 text-red-600 mr-2" />
              Add Element
            </h3>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter a number"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button
                  onClick={addElement}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  Add to End
                </button>
              </div>
              
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={insertIndex}
                  onChange={(e) => setInsertIndex(e.target.value)}
                  placeholder="Index"
                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button
                  onClick={insertAt}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  Insert at Index
                </button>
              </div>
            </div>
          </div>

          {/* Search Element */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Search className="h-6 w-6 text-red-600 mr-2" />
              Search Element
            </h3>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search for a number"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button
                  onClick={searchElement}
                  disabled={isSearching}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center"
                >
                  {isSearching ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Searching...
                    </>
                  ) : (
                    'Linear Search'
                  )}
                </button>
              </div>
              <p className="text-sm text-gray-600">
                Watch the linear search algorithm highlight each element as it searches.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Array Operations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-lg shadow-lg p-6 mt-8"
        >
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Play className="h-6 w-6 text-red-600 mr-2" />
            Array Operations
          </h3>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={generateRandomArray}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Generate Random Array
            </button>
            <button
              onClick={clearArray}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Clear Array
            </button>
          </div>
        </motion.div>

        {/* Learning Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-white rounded-lg shadow-lg p-6 mt-8"
        >
          <h3 className="text-xl font-semibold mb-4">💡 Learning Notes</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2">What to Observe:</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• Array elements are indexed starting from 0</li>
                <li>• Access to any element is instant (O(1))</li>
                <li>• Insertion at middle requires shifting elements</li>
                <li>• Linear search checks each element sequentially</li>
                <li>• Deleting elements changes subsequent indices</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Try These Exercises:</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• Add 10 elements and observe the pattern</li>
                <li>• Insert an element at the beginning (index 0)</li>
                <li>• Search for elements that don't exist</li>
                <li>• Compare search times with larger arrays</li>
                <li>• Notice how deletion affects array size</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex justify-between items-center mt-8"
        >
          <Link href="/data-structures/arrays/theory" className="flex items-center text-red-600 hover:text-red-700">
            ← Array Theory
          </Link>
          <Link href="/data-structures/linked-lists" className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Next: Linked Lists →
          </Link>
        </motion.div>
      </div>
    </div>
  );
}