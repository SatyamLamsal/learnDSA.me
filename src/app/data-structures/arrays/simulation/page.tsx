'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Search, Trash2, Edit, Play, ChevronRight } from 'lucide-react';

interface ArrayElement {
  value: number;
  id: string;
  isHighlighted?: boolean;
  isNew?: boolean;
  isShifting?: boolean;
  isBeingDeleted?: boolean;
}

interface AnimationStep {
  message: string;
  highlightedIndices?: number[];
  action?: 'compare' | 'shift' | 'insert' | 'delete' | 'found';
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
  const [isAnimating, setIsAnimating] = useState(false);
  const [searchResult, setSearchResult] = useState<number | null>(null);
  const [animationSteps, setAnimationSteps] = useState<AnimationStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [showSteps, setShowSteps] = useState(false);

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const resetHighlights = () => {
    setArray(prev => prev.map(el => ({ 
      ...el, 
      isHighlighted: false, 
      isNew: false, 
      isShifting: false, 
      isBeingDeleted: false 
    })));
  };

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const addElement = async () => {
    if (!inputValue || isNaN(Number(inputValue))) {
      showMessage('Please enter a valid number');
      return;
    }

    if (isAnimating) return;
    setIsAnimating(true);
    setShowSteps(true);
    
    const value = Number(inputValue);
    const steps: AnimationStep[] = [
      { message: `Step 1: Creating new element with value ${value}` },
      { message: `Step 2: Adding element to the end of array (index ${array.length})` },
      { message: `Step 3: Array size increased from ${array.length} to ${array.length + 1}` }
    ];
    
    setAnimationSteps(steps);
    setCurrentStep(0);
    
    // Step 1: Show we're creating the element
    await delay(1000);
    setCurrentStep(1);
    
    // Step 2: Add the element with animation
    await delay(1000);
    const newElement: ArrayElement = {
      value: value,
      id: Date.now().toString(),
      isNew: true
    };
    setArray(prev => [...prev, newElement]);
    setCurrentStep(2);
    
    // Step 3: Complete
    await delay(1000);
    setArray(prev => prev.map(el => ({ ...el, isNew: false })));
    setInputValue('');
    showMessage(`Successfully added ${value} to the array`);
    setIsAnimating(false);
    setShowSteps(false);
  };

  const insertAt = async () => {
    if (!inputValue || !insertIndex || isNaN(Number(inputValue)) || isNaN(Number(insertIndex))) {
      showMessage('Please enter valid number and index');
      return;
    }

    if (isAnimating) return;
    const index = Number(insertIndex);
    const value = Number(inputValue);

    if (index < 0 || index > array.length) {
      showMessage(`Index must be between 0 and ${array.length}`);
      return;
    }

    setIsAnimating(true);
    setShowSteps(true);
    resetHighlights();
    
    const steps: AnimationStep[] = [
      { message: `Step 1: Insert ${value} at index ${index}` },
      { message: `Step 2: Shifting elements from index ${index} to right` },
      { message: `Step 3: Making space for new element` },
      { message: `Step 4: Placing ${value} at index ${index}` },
      { message: `Step 5: Insertion complete! Array size: ${array.length + 1}` }
    ];
    
    setAnimationSteps(steps);
    setCurrentStep(0);
    await delay(1000);
    
    // Step 1: Highlight insertion point
    setCurrentStep(1);
    if (index < array.length) {
      setArray(prev => prev.map((el, i) => ({ 
        ...el, 
        isHighlighted: i >= index 
      })));
    }
    await delay(1500);
    
    // Step 2: Show shifting animation
    setCurrentStep(2);
    setArray(prev => prev.map((el, i) => ({ 
      ...el, 
      isShifting: i >= index,
      isHighlighted: false
    })));
    await delay(1500);
    
    // Step 3: Insert the element
    setCurrentStep(3);
    const newElement: ArrayElement = {
      value: value,
      id: Date.now().toString(),
      isNew: true
    };
    
    const newArray = [...array];
    newArray.splice(index, 0, newElement);
    setArray(newArray.map(el => ({ ...el, isShifting: false })));
    await delay(1500);
    
    // Step 4: Complete
    setCurrentStep(4);
    setArray(prev => prev.map(el => ({ ...el, isNew: false })));
    setInputValue('');
    setInsertIndex('');
    showMessage(`Successfully inserted ${value} at index ${index}`);
    setIsAnimating(false);
    setShowSteps(false);
  };

  const deleteElement = async (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setShowSteps(true);
    resetHighlights();
    
    const deletedValue = array[index].value;
    const steps: AnimationStep[] = [
      { message: `Step 1: Deleting element ${deletedValue} at index ${index}` },
      { message: `Step 2: Marking element for deletion` },
      { message: `Step 3: Shifting remaining elements left` },
      { message: `Step 4: Array size reduced from ${array.length} to ${array.length - 1}` }
    ];
    
    setAnimationSteps(steps);
    setCurrentStep(0);
    await delay(1000);
    
    // Step 1: Highlight element to delete
    setCurrentStep(1);
    setArray(prev => prev.map((el, i) => ({ 
      ...el, 
      isBeingDeleted: i === index 
    })));
    await delay(1500);
    
    // Step 2: Show shifting animation
    setCurrentStep(2);
    setArray(prev => prev.map((el, i) => ({ 
      ...el, 
      isShifting: i > index,
      isBeingDeleted: false
    })));
    await delay(1500);
    
    // Step 3: Remove element
    setCurrentStep(3);
    setArray(prev => prev.filter((_, i) => i !== index).map(el => ({ ...el, isShifting: false })));
    await delay(1000);
    
    showMessage(`Successfully deleted ${deletedValue} from index ${index}`);
    setIsAnimating(false);
    setShowSteps(false);
  };

  const searchElement = async () => {
    if (!searchValue || isNaN(Number(searchValue))) {
      showMessage('Please enter a valid number to search');
      return;
    }

    if (isAnimating) return;
    setIsAnimating(true);
    setShowSteps(true);
    setSearchResult(null);
    resetHighlights();
    
    const target = Number(searchValue);
    const steps: AnimationStep[] = [
      { message: `Step 1: Starting linear search for ${target}` },
      { message: `Step 2: Checking each element sequentially` },
      { message: `Step 3: Comparing current element with target` }
    ];
    
    setAnimationSteps(steps);
    setCurrentStep(0);
    await delay(1000);
    setCurrentStep(1);
    await delay(1000);

    // Animate linear search
    for (let i = 0; i < array.length; i++) {
      setCurrentStep(2);
      setAnimationSteps(prev => [
        ...prev.slice(0, 2),
        { message: `Step 3: Checking index ${i}: ${array[i].value} === ${target}?` }
      ]);
      
      setArray(prev => prev.map((el, index) => ({
        ...el,
        isHighlighted: index === i,
        isNew: false
      })));

      await delay(1200);

      if (array[i].value === target) {
        setAnimationSteps(prev => [
          ...prev,
          { message: `Step 4: Found! ${target} is at index ${i}`, action: 'found' }
        ]);
        setCurrentStep(3);
        setSearchResult(i);
        showMessage(`Found ${target} at index ${i}`);
        setIsAnimating(false);
        setShowSteps(false);
        return;
      }
    }

    // Not found
    setAnimationSteps(prev => [
      ...prev,
      { message: `Step 4: Search complete. ${target} not found in array`, action: 'found' }
    ]);
    setCurrentStep(3);
    resetHighlights();
    setSearchResult(-1);
    showMessage(`${target} not found in the array`);
    setIsAnimating(false);
    setShowSteps(false);
  };

  const clearArray = () => {
    if (isAnimating) return;
    setArray([]);
    setSearchResult(null);
    resetHighlights();
    showMessage('Array cleared');
  };

  const generateRandomArray = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setShowSteps(true);
    
    const size = Math.floor(Math.random() * 8) + 3; // 3-10 elements
    const steps: AnimationStep[] = [
      { message: `Step 1: Generating random array with ${size} elements` },
      { message: `Step 2: Creating random values between 1-100` },
      { message: `Step 3: Populating array with generated values` }
    ];
    
    setAnimationSteps(steps);
    setCurrentStep(0);
    await delay(1000);
    
    setCurrentStep(1);
    await delay(1000);
    
    const newArray: ArrayElement[] = [];
    for (let i = 0; i < size; i++) {
      newArray.push({
        value: Math.floor(Math.random() * 100) + 1,
        id: `random-${i}`,
        isNew: true
      });
    }
    
    setCurrentStep(2);
    setArray(newArray);
    await delay(1500);
    
    setArray(prev => prev.map(el => ({ ...el, isNew: false })));
    setSearchResult(null);
    showMessage(`Generated random array with ${size} elements`);
    setIsAnimating(false);
    setShowSteps(false);
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

        {/* Algorithm Steps Display */}
        <AnimatePresence>
          {showSteps && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-300 rounded-lg p-6 mb-6"
            >
              <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center">
                <Play className="h-5 w-5 mr-2" />
                Algorithm Execution Steps
              </h3>
              <div className="space-y-2">
                {animationSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: index <= currentStep ? 1 : 0.4,
                      x: 0,
                      scale: index === currentStep ? 1.02 : 1
                    }}
                    className={`flex items-center p-3 rounded-lg transition-all ${
                      index === currentStep 
                        ? 'bg-purple-200 border border-purple-400 font-semibold' 
                        : index < currentStep
                        ? 'bg-green-100 border border-green-300'
                        : 'bg-gray-100 border border-gray-300'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 ${
                      index === currentStep 
                        ? 'bg-purple-600 text-white' 
                        : index < currentStep
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-400 text-white'
                    }`}>
                      {index < currentStep ? '✓' : index + 1}
                    </div>
                    <span className={index === currentStep ? 'text-purple-800' : 'text-gray-700'}>
                      {step.message}
                    </span>
                    {index === currentStep && (
                      <ChevronRight className="h-4 w-4 ml-auto text-purple-600 animate-pulse" />
                    )}
                  </motion.div>
                ))}
              </div>
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
                    scale: element.isBeingDeleted ? 0.8 : 1,
                    x: element.isShifting ? 10 : 0,
                    backgroundColor: element.isHighlighted ? '#fbbf24' : 
                                   element.isNew ? '#34d399' : 
                                   element.isBeingDeleted ? '#f87171' :
                                   element.isShifting ? '#a78bfa' : '#ef4444'
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ 
                    duration: 0.5,
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                  }}
                  className={`relative w-16 h-16 rounded-lg flex flex-col items-center justify-center text-white font-bold border-2 shadow-md cursor-pointer
                    ${element.isHighlighted ? 'border-yellow-600 ring-2 ring-yellow-300' : 
                      element.isNew ? 'border-green-600 ring-2 ring-green-300' : 
                      element.isBeingDeleted ? 'border-red-600 ring-2 ring-red-300' :
                      element.isShifting ? 'border-purple-600 ring-2 ring-purple-300' :
                      'border-red-600'}`}
                  style={{ 
                    backgroundColor: element.isHighlighted ? '#fbbf24' : 
                                   element.isNew ? '#34d399' : 
                                   element.isBeingDeleted ? '#f87171' :
                                   element.isShifting ? '#a78bfa' : '#ef4444'
                  }}
                >
                  <div className="text-lg">{element.value}</div>
                  {!isAnimating && (
                    <button
                      onClick={() => deleteElement(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white text-xs transition-colors"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  )}
                  
                  {/* Animation state indicators */}
                  {element.isHighlighted && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-yellow-600 text-white text-xs px-2 py-1 rounded">
                      Checking
                    </div>
                  )}
                  {element.isNew && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                      New
                    </div>
                  )}
                  {element.isShifting && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white text-xs px-2 py-1 rounded">
                      Shifting
                    </div>
                  )}
                  {element.isBeingDeleted && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                      Deleting
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            
            {array.length === 0 && (
              <div className="text-gray-700 text-center py-8 font-medium">
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
                  disabled={isAnimating}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
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
                  disabled={isAnimating}
                  className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
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
                  disabled={isAnimating}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center"
                >
                  {isAnimating ? (
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
              disabled={isAnimating}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Generate Random Array
            </button>
            <button
              onClick={clearArray}
              disabled={isAnimating}
              className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Clear Array
            </button>
          </div>
        </motion.div>

        {/* Color Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-white rounded-lg shadow-lg p-6 mt-8"
        >
          <h3 className="text-xl font-semibold mb-4">🎨 Animation Legend</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded border"></div>
              <span>Normal Element</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500 rounded border"></div>
              <span>Currently Checking</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded border"></div>
              <span>New Element</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-purple-500 rounded border"></div>
              <span>Shifting Element</span>
            </div>
          </div>
        </motion.div>

        {/* Learning Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="bg-white rounded-lg shadow-lg p-6 mt-8"
        >
          <h3 className="text-xl font-semibold mb-4">💡 Learning Notes</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2 text-red-600">What to Observe:</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• Array elements are indexed starting from 0</li>
                <li>• Access to any element is instant (O(1))</li>
                <li>• Insertion requires shifting elements to the right</li>
                <li>• Linear search checks each element sequentially</li>
                <li>• Deletion requires shifting elements to the left</li>
                <li>• Each operation shows step-by-step execution</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-blue-600">Algorithm Complexity:</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• <strong>Access:</strong> O(1) - Direct index access</li>
                <li>• <strong>Search:</strong> O(n) - Linear scan required</li>
                <li>• <strong>Insert at end:</strong> O(1) - Direct append</li>
                <li>• <strong>Insert at middle:</strong> O(n) - Shifting required</li>
                <li>• <strong>Delete:</strong> O(n) - Shifting after removal</li>
                <li>• <strong>Space:</strong> O(n) - Linear space usage</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-semibold mb-2 text-yellow-800">💭 Try These Exercises:</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
              <ul className="space-y-1">
                <li>• Watch insertion animation at different positions</li>
                <li>• Observe how deletion affects remaining elements</li>
                <li>• Compare search performance with array size</li>
              </ul>
              <ul className="space-y-1">
                <li>• Insert multiple elements and see the pattern</li>
                <li>• Search for elements that don&apos;t exist</li>
                <li>• Notice the step-by-step algorithm execution</li>
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