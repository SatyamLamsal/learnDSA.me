'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Minus, Eye, RotateCcw, Play, Pause, SkipForward, AlertCircle } from 'lucide-react';

interface StackItem {
  id: number;
  value: string;
  isAnimating?: boolean;
}

export default function StacksSimulationPage() {
  const [stack, setStack] = useState<StackItem[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentOperation, setCurrentOperation] = useState<string>('');
  const [operationHistory, setOperationHistory] = useState<string[]>([]);
  const [maxSize] = useState(8);
  const [autoPlay, setAutoPlay] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1000);

  // Auto-play demo operations
  const demoOperations = [
    () => pushToStack('10'),
    () => pushToStack('20'),
    () => pushToStack('30'),
    () => popFromStack(),
    () => pushToStack('40'),
    () => peekAtTop(),
    () => popFromStack(),
    () => popFromStack(),
  ];

  const [demoIndex, setDemoIndex] = useState(0);

  useEffect(() => {
    if (autoPlay && demoIndex < demoOperations.length) {
      const timer = setTimeout(() => {
        demoOperations[demoIndex]();
        setDemoIndex(prev => prev + 1);
      }, playbackSpeed);

      return () => clearTimeout(timer);
    } else if (autoPlay && demoIndex >= demoOperations.length) {
      setAutoPlay(false);
      setDemoIndex(0);
    }
  }, [autoPlay, demoIndex, playbackSpeed]);

  const pushToStack = async (value?: string) => {
    const pushValue = value || inputValue.trim();
    if (!pushValue) return;
    
    if (stack.length >= maxSize) {
      setCurrentOperation(`Stack Overflow! Cannot push '${pushValue}' - maximum size (${maxSize}) reached`);
      return;
    }

    setIsAnimating(true);
    setCurrentOperation(`Pushing '${pushValue}' to stack...`);

    const newItem: StackItem = {
      id: Date.now(),
      value: pushValue,
      isAnimating: true
    };

    setStack(prev => [...prev, newItem]);
    
    setTimeout(() => {
      setStack(prev => prev.map(item => ({ ...item, isAnimating: false })));
      setIsAnimating(false);
      setCurrentOperation(`Successfully pushed '${pushValue}' to top of stack`);
      setOperationHistory(prev => [...prev, `PUSH: ${pushValue}`]);
      if (!value) setInputValue('');
    }, 600);
  };

  const popFromStack = async () => {
    if (stack.length === 0) {
      setCurrentOperation('Stack Underflow! Cannot pop from empty stack');
      return;
    }

    setIsAnimating(true);
    const topItem = stack[stack.length - 1];
    setCurrentOperation(`Popping '${topItem.value}' from stack...`);

    setStack(prev => prev.map((item, index) => 
      index === prev.length - 1 ? { ...item, isAnimating: true } : item
    ));

    setTimeout(() => {
      setStack(prev => prev.slice(0, -1));
      setIsAnimating(false);
      setCurrentOperation(`Successfully popped '${topItem.value}' from stack`);
      setOperationHistory(prev => [...prev, `POP: ${topItem.value}`]);
    }, 600);
  };

  const peekAtTop = () => {
    if (stack.length === 0) {
      setCurrentOperation('Cannot peek - stack is empty');
      return;
    }

    const topItem = stack[stack.length - 1];
    setCurrentOperation(`Peek: Top element is '${topItem.value}'`);
    setOperationHistory(prev => [...prev, `PEEK: ${topItem.value}`]);
    
    // Highlight the top element
    setStack(prev => prev.map((item, index) => 
      index === prev.length - 1 ? { ...item, isAnimating: true } : item
    ));

    setTimeout(() => {
      setStack(prev => prev.map(item => ({ ...item, isAnimating: false })));
    }, 1000);
  };

  const clearStack = () => {
    setStack([]);
    setCurrentOperation('Stack cleared');
    setOperationHistory([]);
    setInputValue('');
    setAutoPlay(false);
    setDemoIndex(0);
  };

  const startAutoPlay = () => {
    clearStack();
    setAutoPlay(true);
    setDemoIndex(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Link href="/data-structures/stacks" className="inline-flex items-center text-stacks hover:text-green-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Stacks Overview
          </Link>
          <h1 className="text-4xl font-bold text-heading-primary mb-4">Interactive Stack Simulation</h1>
          <p className="text-xl text-secondary max-w-4xl leading-relaxed">
            Visualize stack operations in real-time. Practice push, pop, and peek operations to understand 
            the Last-In-First-Out (LIFO) principle.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Controls Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h2 className="text-2xl font-semibold text-heading-primary mb-6">Controls</h2>
              
              {/* Manual Operations */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Element to Push
                  </label>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && pushToStack()}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stacks"
                    placeholder="Enter value..."
                    disabled={isAnimating}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => pushToStack()}
                    disabled={isAnimating || !inputValue.trim() || stack.length >= maxSize}
                    className="flex items-center justify-center px-4 py-2 bg-stacks text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Push
                  </button>
                  
                  <button
                    onClick={popFromStack}
                    disabled={isAnimating || stack.length === 0}
                    className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    <Minus className="h-4 w-4 mr-1" />
                    Pop
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={peekAtTop}
                    disabled={isAnimating || stack.length === 0}
                    className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Peek
                  </button>
                  
                  <button
                    onClick={clearStack}
                    disabled={isAnimating}
                    className="flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Clear
                  </button>
                </div>
              </div>

              {/* Auto-play Controls */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-heading-secondary mb-4">Auto-play Demo</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                      Speed: {playbackSpeed}ms
                    </label>
                    <input
                      type="range"
                      min="500"
                      max="3000"
                      step="250"
                      value={playbackSpeed}
                      onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                      className="w-full"
                      disabled={autoPlay}
                    />
                  </div>
                  
                  <button
                    onClick={autoPlay ? () => setAutoPlay(false) : startAutoPlay}
                    className="w-full flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    {autoPlay ? (
                      <>
                        <Pause className="h-4 w-4 mr-2" />
                        Stop Demo
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Start Demo
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Stack Info */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-heading-secondary mb-4">Stack Info</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-secondary">Size:</span>
                    <span className="font-medium">{stack.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Capacity:</span>
                    <span className="font-medium">{maxSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Is Empty:</span>
                    <span className="font-medium">{stack.length === 0 ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Is Full:</span>
                    <span className="font-medium">{stack.length >= maxSize ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-heading-primary mb-6 text-center">Stack Visualization</h2>
              
              {/* Current Operation Display */}
              {currentOperation && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-6 p-4 rounded-lg ${
                    currentOperation.includes('Overflow') || currentOperation.includes('Underflow') || currentOperation.includes('empty')
                      ? 'bg-red-50 border border-red-200 text-red-700'
                      : 'bg-green-50 border border-green-200 text-green-700'
                  }`}
                >
                  <div className="flex items-center">
                    {(currentOperation.includes('Overflow') || currentOperation.includes('Underflow') || currentOperation.includes('empty')) && (
                      <AlertCircle className="h-5 w-5 mr-2" />
                    )}
                    <span className="font-medium">{currentOperation}</span>
                  </div>
                </motion.div>
              )}

              {/* Stack Container */}
              <div className="flex flex-col items-center">
                <div className="text-sm text-secondary mb-2 font-medium">TOP</div>
                
                <div className="relative bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[400px] w-full max-w-md">
                  <AnimatePresence>
                    {stack.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center text-secondary"
                      >
                        Stack is empty
                      </motion.div>
                    ) : (
                      <div className="space-y-2">
                        {stack.map((item, index) => (
                          <motion.div
                            key={item.id}
                            initial={index === stack.length - 1 ? { opacity: 0, y: -20, scale: 0.8 } : {}}
                            animate={{ 
                              opacity: 1, 
                              y: 0, 
                              scale: item.isAnimating ? 1.1 : 1,
                              backgroundColor: item.isAnimating ? '#10b981' : '#3b82f6'
                            }}
                            exit={{ opacity: 0, y: -20, scale: 0.8 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className={`
                              w-full p-4 text-white text-center font-semibold rounded-lg shadow-md
                              ${index === stack.length - 1 ? 'ring-2 ring-yellow-400' : ''}
                            `}
                            style={{
                              position: 'relative',
                              zIndex: stack.length - index
                            }}
                          >
                            {item.value}
                            {index === stack.length - 1 && (
                              <div className="absolute -right-16 top-1/2 transform -translate-y-1/2 text-yellow-600 font-medium text-sm">
                                ← TOP
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </AnimatePresence>
                </div>
                
                <div className="text-sm text-secondary mt-2 font-medium">BOTTOM</div>
              </div>

              {/* Stack Capacity Indicator */}
              <div className="mt-6">
                <div className="flex justify-between text-sm text-secondary mb-2">
                  <span>Capacity Usage</span>
                  <span>{stack.length}/{maxSize}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      stack.length >= maxSize ? 'bg-red-500' : 
                      stack.length >= maxSize * 0.75 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(stack.length / maxSize) * 100}%` }}
                  />
                </div>
              </div>

              {/* Operation History */}
              {operationHistory.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-heading-secondary mb-3">Operation History</h3>
                  <div className="bg-gray-50 rounded-lg p-4 max-h-32 overflow-y-auto">
                    <div className="space-y-1">
                      {operationHistory.slice(-5).map((operation, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-sm text-secondary"
                        >
                          {operationHistory.length - 4 + index}. {operation}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Algorithm Complexity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-2xl font-semibold text-heading-primary mb-4">Time & Space Complexity</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-stacks mb-2">Push</h3>
              <p className="text-sm text-secondary">Time: O(1)<br/>Space: O(1)</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <h3 className="font-semibold text-red-600 mb-2">Pop</h3>
              <p className="text-sm text-secondary">Time: O(1)<br/>Space: O(1)</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-600 mb-2">Peek</h3>
              <p className="text-sm text-secondary">Time: O(1)<br/>Space: O(1)</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-600 mb-2">isEmpty</h3>
              <p className="text-sm text-secondary">Time: O(1)<br/>Space: O(1)</p>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 flex justify-between items-center"
        >
          <Link
            href="/data-structures/stacks/theory"
            className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Theory
          </Link>
          
          <Link
            href="/data-structures/queues"
            className="inline-flex items-center px-6 py-3 bg-stacks text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Next: Queues
            <SkipForward className="h-5 w-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}