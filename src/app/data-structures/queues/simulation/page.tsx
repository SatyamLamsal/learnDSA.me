'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Minus, Eye, RotateCcw, Play, Pause, SkipForward, AlertCircle, Users, ArrowRight, Star } from 'lucide-react';

interface QueueItem {
  id: number;
  value: string;
  priority?: number;
  isAnimating?: boolean;
}

type QueueType = 'linear' | 'circular' | 'priority' | 'deque';

export default function QueuesSimulationPage() {
  const [queueType, setQueueType] = useState<QueueType>('linear');
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [inputPriority, setInputPriority] = useState('1');
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentOperation, setCurrentOperation] = useState<string>('');
  const [operationHistory, setOperationHistory] = useState<string[]>([]);
  const [maxSize] = useState(8);
  const [autoPlay, setAutoPlay] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1000);

  // Demo operations for different queue types
  const getDemoOperations = () => {
    switch (queueType) {
      case 'linear':
        return [
          () => enqueue('A'),
          () => enqueue('B'),
          () => enqueue('C'),
          () => dequeue(),
          () => enqueue('D'),
          () => front(),
          () => dequeue(),
          () => dequeue(),
        ];
      case 'priority':
        return [
          () => enqueue('Low', 3),
          () => enqueue('High', 1),
          () => enqueue('Medium', 2),
          () => dequeue(),
          () => enqueue('Urgent', 1),
          () => dequeue(),
          () => dequeue(),
        ];
      case 'deque':
        return [
          () => enqueue('A'),
          () => enqueueRear('B'),
          () => enqueueFront('Front'),
          () => dequeue(),
          () => dequeueRear(),
          () => enqueueFront('New'),
        ];
      default:
        return [
          () => enqueue('1'),
          () => enqueue('2'),
          () => enqueue('3'),
          () => dequeue(),
          () => enqueue('4'),
        ];
    }
  };

  const [demoIndex, setDemoIndex] = useState(0);

  useEffect(() => {
    if (autoPlay) {
      const demoOps = getDemoOperations();
      if (demoIndex < demoOps.length) {
        const timer = setTimeout(() => {
          demoOps[demoIndex]();
          setDemoIndex(prev => prev + 1);
        }, playbackSpeed);

        return () => clearTimeout(timer);
      } else {
        setAutoPlay(false);
        setDemoIndex(0);
      }
    }
  }, [autoPlay, demoIndex, playbackSpeed, queueType]);

  const enqueue = async (value?: string, priority?: number) => {
    const enqueueValue = value || inputValue.trim();
    if (!enqueueValue) return;
    
    if (queue.length >= maxSize) {
      setCurrentOperation(`Queue Overflow! Cannot enqueue '${enqueueValue}' - maximum size (${maxSize}) reached`);
      return;
    }

    setIsAnimating(true);
    
    const newItem: QueueItem = {
      id: Date.now(),
      value: enqueueValue,
      priority: queueType === 'priority' ? (priority || parseInt(inputPriority)) : undefined,
      isAnimating: true
    };

    if (queueType === 'priority') {
      setCurrentOperation(`Enqueuing '${enqueueValue}' with priority ${newItem.priority}...`);
      // Insert based on priority (lower number = higher priority)
      const newQueue = [...queue];
      let insertIndex = newQueue.findIndex(item => (item.priority || 0) > (newItem.priority || 0));
      if (insertIndex === -1) insertIndex = newQueue.length;
      newQueue.splice(insertIndex, 0, newItem);
      setQueue(newQueue);
    } else {
      setCurrentOperation(`Enqueuing '${enqueueValue}' to rear...`);
      setQueue(prev => [...prev, newItem]);
    }
    
    setTimeout(() => {
      setQueue(prev => prev.map(item => ({ ...item, isAnimating: false })));
      setIsAnimating(false);
      setCurrentOperation(`Successfully enqueued '${enqueueValue}'${queueType === 'priority' ? ` with priority ${newItem.priority}` : ''}`);
      setOperationHistory(prev => [...prev, `ENQUEUE: ${enqueueValue}${queueType === 'priority' ? ` (P:${newItem.priority})` : ''}`]);
      if (!value) {
        setInputValue('');
        setInputPriority('1');
      }
    }, 600);
  };

  const enqueueFront = async (value?: string) => {
    if (queueType !== 'deque') return;
    
    const enqueueValue = value || inputValue.trim();
    if (!enqueueValue) return;
    
    if (queue.length >= maxSize) {
      setCurrentOperation(`Queue Overflow! Cannot enqueue '${enqueueValue}' - maximum size reached`);
      return;
    }

    setIsAnimating(true);
    setCurrentOperation(`Enqueuing '${enqueueValue}' to front...`);

    const newItem: QueueItem = {
      id: Date.now(),
      value: enqueueValue,
      isAnimating: true
    };

    setQueue(prev => [newItem, ...prev]);
    
    setTimeout(() => {
      setQueue(prev => prev.map(item => ({ ...item, isAnimating: false })));
      setIsAnimating(false);
      setCurrentOperation(`Successfully enqueued '${enqueueValue}' to front`);
      setOperationHistory(prev => [...prev, `ENQUEUE_FRONT: ${enqueueValue}`]);
      if (!value) setInputValue('');
    }, 600);
  };

  const enqueueRear = async (value?: string) => {
    await enqueue(value);
  };

  const dequeue = async () => {
    if (queue.length === 0) {
      setCurrentOperation('Queue Underflow! Cannot dequeue from empty queue');
      return;
    }

    setIsAnimating(true);
    const frontItem = queue[0];
    setCurrentOperation(`Dequeuing '${frontItem.value}' from front...`);

    setQueue(prev => prev.map((item, index) => 
      index === 0 ? { ...item, isAnimating: true } : item
    ));

    setTimeout(() => {
      setQueue(prev => prev.slice(1));
      setIsAnimating(false);
      setCurrentOperation(`Successfully dequeued '${frontItem.value}' from queue`);
      setOperationHistory(prev => [...prev, `DEQUEUE: ${frontItem.value}`]);
    }, 600);
  };

  const dequeueRear = async () => {
    if (queueType !== 'deque') return;
    
    if (queue.length === 0) {
      setCurrentOperation('Queue Underflow! Cannot dequeue from empty queue');
      return;
    }

    setIsAnimating(true);
    const rearItem = queue[queue.length - 1];
    setCurrentOperation(`Dequeuing '${rearItem.value}' from rear...`);

    setQueue(prev => prev.map((item, index) => 
      index === prev.length - 1 ? { ...item, isAnimating: true } : item
    ));

    setTimeout(() => {
      setQueue(prev => prev.slice(0, -1));
      setIsAnimating(false);
      setCurrentOperation(`Successfully dequeued '${rearItem.value}' from rear`);
      setOperationHistory(prev => [...prev, `DEQUEUE_REAR: ${rearItem.value}`]);
    }, 600);
  };

  const front = () => {
    if (queue.length === 0) {
      setCurrentOperation('Cannot peek - queue is empty');
      return;
    }

    const frontItem = queue[0];
    setCurrentOperation(`Front: '${frontItem.value}'${queueType === 'priority' ? ` (Priority: ${frontItem.priority})` : ''}`);
    setOperationHistory(prev => [...prev, `FRONT: ${frontItem.value}`]);
    
    // Highlight the front element
    setQueue(prev => prev.map((item, index) => 
      index === 0 ? { ...item, isAnimating: true } : item
    ));

    setTimeout(() => {
      setQueue(prev => prev.map(item => ({ ...item, isAnimating: false })));
    }, 1000);
  };

  const clearQueue = () => {
    setQueue([]);
    setCurrentOperation('Queue cleared');
    setOperationHistory([]);
    setInputValue('');
    setInputPriority('1');
    setAutoPlay(false);
    setDemoIndex(0);
  };

  const startAutoPlay = () => {
    clearQueue();
    setAutoPlay(true);
    setDemoIndex(0);
  };

  const changeQueueType = (newType: QueueType) => {
    setQueueType(newType);
    clearQueue();
    setCurrentOperation(`Switched to ${newType.charAt(0).toUpperCase() + newType.slice(1)} Queue`);
  };

  const getQueueTypeDescription = () => {
    switch (queueType) {
      case 'linear': return 'Basic FIFO queue - First In, First Out';
      case 'circular': return 'Circular queue - Rear connects to front for efficient memory usage';
      case 'priority': return 'Priority queue - Elements served based on priority (lower number = higher priority)';
      case 'deque': return 'Double-ended queue - Operations allowed at both ends';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 text-gray-700">
      <div className="container mx-auto px-4 py-12 text-gray-700">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-gray-700"
        >
          <Link href="/data-structures/queues" className="inline-flex items-center text-queues hover:text-orange-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2 text-gray-700" />
            Back to Queues Overview
          </Link>
          <h1 className="text-4xl font-bold text-heading-primary mb-4 text-slate-800">Interactive Queues Simulation</h1>
          <p className="text-xl text-secondary max-w-4xl leading-relaxed text-gray-700">
            Explore different queue types and their operations. Practice with linear, circular, priority, 
            and double-ended queues to understand their unique behaviors and use cases.
          </p>
        </motion.div>

        {/* Queue Type Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8 text-gray-700"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 text-gray-700">
            <h2 className="text-xl font-semibold text-heading-primary mb-4 text-slate-800">Select Queue Type</h2>
            <div className="grid md:grid-cols-4 gap-4 mb-4 text-gray-700">
              {[
                { type: 'linear', label: 'Linear Queue', icon: Users },
                { type: 'circular', label: 'Circular Queue', icon: RotateCcw },
                { type: 'priority', label: 'Priority Queue', icon: Star },
                { type: 'deque', label: 'Double-Ended Queue', icon: ArrowRight }
              ].map(({ type, label, icon: Icon }) => (
                <button
                  key={type}
                  onClick={() => changeQueueType(type as QueueType)}
                  className={`flex items-center justify-center p-4 rounded-lg border-2 transition-all ${
                    queueType === type
                      ? 'bg-queues text-white border-queues'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-queues'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2 text-gray-700" />
                  <span className="font-medium text-gray-600">{label}</span>
                </button>
              ))}
            </div>
            <p className="text-secondary text-sm text-gray-600">{getQueueTypeDescription()}</p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 text-gray-700">
          {/* Controls Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1 text-gray-700"
          >
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4 text-gray-700">
              <h2 className="text-2xl font-semibold text-heading-primary mb-6 text-slate-800">Controls</h2>
              
              {/* Manual Operations */}
              <div className="space-y-4 mb-6 text-gray-700">
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2 text-gray-600">
                    Element to {queueType === 'deque' ? 'Add' : 'Enqueue'}
                  </label>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && enqueue()}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-queues"
                    placeholder="Enter value..."
                    disabled={isAnimating}
                  />
                </div>

                {queueType === 'priority' && (
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2 text-gray-600">
                      Priority (1 = highest)
                    </label>
                    <input
                      type="number"
                      value={inputPriority}
                      onChange={(e) => setInputPriority(e.target.value)}
                      min="1"
                      max="10"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-queues"
                      disabled={isAnimating}
                    />
                  </div>
                )}
                
                {/* Different controls based on queue type */}
                {queueType === 'deque' ? (
                  <div className="grid grid-cols-2 gap-2 text-gray-700">
                    <button
                      onClick={() => enqueueFront()}
                      disabled={isAnimating || !inputValue.trim() || queue.length >= maxSize}
                      className="flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm"
                    >
                      <Plus className="h-4 w-4 mr-1 text-gray-700" />
                      Add Front
                    </button>
                    
                    <button
                      onClick={() => enqueueRear()}
                      disabled={isAnimating || !inputValue.trim() || queue.length >= maxSize}
                      className="flex items-center justify-center px-3 py-2 bg-queues text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm"
                    >
                      <Plus className="h-4 w-4 mr-1 text-gray-700" />
                      Add Rear
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => enqueue()}
                    disabled={isAnimating || !inputValue.trim() || queue.length >= maxSize}
                    className="w-full flex items-center justify-center px-4 py-2 bg-queues text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-1 text-gray-700" />
                    Enqueue
                  </button>
                )}
                
                {queueType === 'deque' ? (
                  <div className="grid grid-cols-2 gap-2 text-gray-700">
                    <button
                      onClick={dequeue}
                      disabled={isAnimating || queue.length === 0}
                      className="flex items-center justify-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm text-gray-300"
                    >
                      <Minus className="h-4 w-4 mr-1 text-gray-700" />
                      Remove Front
                    </button>
                    
                    <button
                      onClick={dequeueRear}
                      disabled={isAnimating || queue.length === 0}
                      className="flex items-center justify-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm text-gray-300"
                    >
                      <Minus className="h-4 w-4 mr-1 text-gray-700" />
                      Remove Rear
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={dequeue}
                    disabled={isAnimating || queue.length === 0}
                    className="w-full flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-white text-white text-white text-white"
                  >
                    <Minus className="h-4 w-4 mr-1 text-gray-700" />
                    Dequeue
                  </button>
                )}
                
                <div className="grid grid-cols-2 gap-2 text-gray-700">
                  <button
                    onClick={front}
                    disabled={isAnimating || queue.length === 0}
                    className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-white text-white text-white text-white"
                  >
                    <Eye className="h-4 w-4 mr-1 text-gray-700" />
                    Front
                  </button>
                  
                  <button
                    onClick={clearQueue}
                    disabled={isAnimating}
                    className="flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-white text-white text-white text-white"
                  >
                    <RotateCcw className="h-4 w-4 mr-1 text-gray-700" />
                    Clear
                  </button>
                </div>
              </div>

              {/* Auto-play Controls */}
              <div className="border-t pt-6 text-gray-700">
                <h3 className="text-lg font-semibold text-heading-secondary mb-4 text-gray-800">Auto-play Demo</h3>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2 text-gray-600">
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
                        <Pause className="h-4 w-4 mr-2 text-gray-700" />
                        Stop Demo
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2 text-gray-700" />
                        Start Demo
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Queue Info */}
              <div className="border-t pt-6 text-gray-700">
                <h3 className="text-lg font-semibold text-heading-secondary mb-4 text-gray-800">Queue Info</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between text-gray-700">
                    <span className="text-secondary text-gray-600">Type:</span>
                    <span className="font-medium capitalize text-gray-600">{queueType}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span className="text-secondary text-gray-600">Size:</span>
                    <span className="font-medium text-gray-600">{queue.length}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span className="text-secondary text-gray-600">Capacity:</span>
                    <span className="font-medium text-gray-600">{maxSize}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span className="text-secondary text-gray-600">Is Empty:</span>
                    <span className="font-medium text-gray-600">{queue.length === 0 ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span className="text-secondary text-gray-600">Is Full:</span>
                    <span className="font-medium text-gray-600">{queue.length >= maxSize ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2 text-gray-700"
          >
            <div className="bg-white rounded-lg shadow-lg p-8 text-gray-700">
              <h2 className="text-2xl font-semibold text-heading-primary mb-6 text-center text-slate-800">
                {queueType.charAt(0).toUpperCase() + queueType.slice(1)} Queue Visualization
              </h2>
              
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
                  <div className="flex items-center text-gray-700">
                    {(currentOperation.includes('Overflow') || currentOperation.includes('Underflow') || currentOperation.includes('empty')) && (
                      <AlertCircle className="h-5 w-5 mr-2 text-gray-700" />
                    )}
                    <span className="font-medium text-gray-600">{currentOperation}</span>
                  </div>
                </motion.div>
              )}

              {/* Queue Container */}
              <div className="flex flex-col items-center text-gray-700">
                <div className="flex items-center space-x-4 mb-4 text-gray-700">
                  <div className="text-sm text-secondary font-medium text-gray-600">FRONT</div>
                  <ArrowRight className="h-4 w-4 text-secondary text-gray-700" />
                  <div className="text-sm text-secondary font-medium text-gray-600">REAR</div>
                </div>
                
                <div className="relative bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[200px] w-full text-gray-700">
                  <AnimatePresence>
                    {queue.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center text-secondary text-gray-700"
                      >
                        Queue is empty
                      </motion.div>
                    ) : (
                      <div className="flex flex-wrap gap-2 justify-center text-gray-700">
                        {queue.map((item, index) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.8, y: -20 }}
                            animate={{ 
                              opacity: 1, 
                              scale: item.isAnimating ? 1.1 : 1,
                              y: 0,
                              backgroundColor: item.isAnimating ? '#f59e0b' : queueType === 'priority' ? 
                                `hsl(${240 - (item.priority || 1) * 40}, 70%, 60%)` : '#3b82f6'
                            }}
                            exit={{ opacity: 0, scale: 0.8, y: -20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className={`
                              relative px-4 py-3 text-white text-center font-semibold rounded-lg shadow-md min-w-[60px]
                              ${index === 0 ? 'ring-2 ring-green-400' : ''}
                              ${queueType === 'deque' && index === queue.length - 1 ? 'ring-2 ring-blue-400' : ''}
                            `}
                          >
                            {item.value}
                            {queueType === 'priority' && (
                              <div className="absolute -top-2 -right-2 bg-yellow-500 text-xs px-1 rounded-full text-gray-600">
                                P{item.priority}
                              </div>
                            )}
                            {index === 0 && (
                              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-green-600 text-xs font-medium">
                                FRONT
                              </div>
                            )}
                            {queueType === 'deque' && index === queue.length - 1 && queue.length > 1 && (
                              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-blue-600 text-xs font-medium">
                                REAR
                              </div>
                            )}
                            {queueType !== 'deque' && index === queue.length - 1 && queue.length > 1 && (
                              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-orange-600 text-xs font-medium">
                                REAR
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Queue Type Specific Info */}
                {queueType === 'circular' && queue.length > 0 && (
                  <div className="mt-4 text-sm text-secondary text-center text-gray-600">
                    <p>In a circular queue, when the rear reaches the end, it wraps around to the beginning</p>
                  </div>
                )}
                
                {queueType === 'priority' && (
                  <div className="mt-4 text-sm text-secondary text-center text-gray-600">
                    <p>Elements are ordered by priority (lower number = higher priority)</p>
                  </div>
                )}
              </div>

              {/* Queue Capacity Indicator */}
              <div className="mt-6 text-gray-700">
                <div className="flex justify-between text-sm text-secondary mb-2 text-gray-600">
                  <span>Capacity Usage</span>
                  <span>{queue.length}/{maxSize}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 text-gray-700">
                  <motion.div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      queue.length >= maxSize ? 'bg-red-500' : 
                      queue.length >= maxSize * 0.75 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(queue.length / maxSize) * 100}%` }}
                  />
                </div>
              </div>

              {/* Operation History */}
              {operationHistory.length > 0 && (
                <div className="mt-6 text-gray-700">
                  <h3 className="text-lg font-semibold text-heading-secondary mb-3 text-gray-800">Operation History</h3>
                  <div className="bg-gray-50 rounded-lg p-4 max-h-32 overflow-y-auto text-gray-700">
                    <div className="space-y-1 text-gray-700">
                      {operationHistory.slice(-5).map((operation, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-sm text-secondary text-gray-600"
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
          className="mt-8 bg-white rounded-lg shadow-lg p-6 text-gray-700"
        >
          <h2 className="text-2xl font-semibold text-heading-primary mb-4 text-slate-800">Time & Space Complexity</h2>
          <div className="grid md:grid-cols-4 gap-4 text-gray-700">
            <div className="text-center p-4 bg-yellow-50 rounded-lg text-gray-700">
              <h3 className="font-semibold text-queues mb-2 text-gray-800">Enqueue</h3>
              <p className="text-sm text-secondary text-gray-600">
                Time: {queueType === 'priority' ? 'O(log n)' : 'O(1)'}<br/>
                Space: O(1)
              </p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg text-gray-700">
              <h3 className="font-semibold text-red-600 mb-2">Dequeue</h3>
              <p className="text-sm text-secondary text-gray-600">
                Time: {queueType === 'priority' ? 'O(log n)' : 'O(1)'}<br/>
                Space: O(1)
              </p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg text-gray-700">
              <h3 className="font-semibold text-blue-600 mb-2">Front</h3>
              <p className="text-sm text-secondary text-gray-600">Time: O(1)<br/>Space: O(1)</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg text-gray-700">
              <h3 className="font-semibold text-gray-600 mb-2">isEmpty</h3>
              <p className="text-sm text-secondary text-gray-600">Time: O(1)<br/>Space: O(1)</p>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 flex justify-between items-center text-gray-700"
        >
          <Link
            href="/data-structures/queues/theory"
            className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2 text-gray-700" />
            Back to Theory
          </Link>
          
          <Link
            href="/data-structures/trees"
            className="inline-flex items-center px-6 py-3 bg-queues text-white rounded-lg hover:bg-orange-700 transition-colors text-gray-100"
          >
            Next: Trees
            <SkipForward className="h-5 w-5 ml-2 text-gray-700" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}