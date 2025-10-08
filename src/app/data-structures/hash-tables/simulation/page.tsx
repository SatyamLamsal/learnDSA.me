'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Trash2,
  RotateCcw,
  Settings,
  Hash,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Zap
} from 'lucide-react';

interface HashEntry {
  key: string;
  value: string;
  id: string;
}

interface HashBucket {
  entries: HashEntry[];
}

const HashTableSimulation: React.FC = () => {
  const [tableSize, setTableSize] = useState(7);
  const [hashTable, setHashTable] = useState<HashBucket[]>([]);
  const [hashFunction, setHashFunction] = useState<'division' | 'multiplication' | 'djb2'>('division');
  const [collisionMethod, setCollisionMethod] = useState<'chaining' | 'linear' | 'quadratic'>('chaining');
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const [highlightedBucket, setHighlightedBucket] = useState<number | null>(null);
  const [animatingEntry, setAnimatingEntry] = useState<string | null>(null);
  const [operation, setOperation] = useState<'insert' | 'search' | 'delete' | null>(null);
  const [operationSteps, setOperationSteps] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  // Initialize hash table
  useEffect(() => {
    initializeTable();
  }, [tableSize, collisionMethod]);

  const initializeTable = () => {
    const newTable: HashBucket[] = [];
    for (let i = 0; i < tableSize; i++) {
      newTable.push({ entries: [] });
    }
    setHashTable(newTable);
    setHighlightedBucket(null);
    setAnimatingEntry(null);
    setOperationSteps([]);
    setCurrentStep(0);
  };

  // Hash functions
  const hash = useCallback((key: string): number => {
    switch (hashFunction) {
      case 'division':
        return divisionHash(key);
      case 'multiplication':
        return multiplicationHash(key);
      case 'djb2':
        return djb2Hash(key);
      default:
        return divisionHash(key);
    }
  }, [hashFunction, tableSize]);

  const divisionHash = (key: string): number => {
    let sum = 0;
    for (let i = 0; i < key.length; i++) {
      sum += key.charCodeAt(i);
    }
    return sum % tableSize;
  };

  const multiplicationHash = (key: string): number => {
    let sum = 0;
    for (let i = 0; i < key.length; i++) {
      sum += key.charCodeAt(i);
    }
    const A = 0.6180339887; // Golden ratio - 1
    return Math.floor(tableSize * ((sum * A) % 1));
  };

  const djb2Hash = (key: string): number => {
    let hash = 5381;
    for (let i = 0; i < key.length; i++) {
      hash = ((hash << 5) + hash) + key.charCodeAt(i);
    }
    return Math.abs(hash) % tableSize;
  };

  // Probing for open addressing
  const findSlot = (key: string, isDelete = false): { index: number; steps: string[] } => {
    const initialHash = hash(key);
    const steps = [`Initial hash: h("${key}") = ${initialHash}`];
    
    if (collisionMethod === 'chaining') {
      return { index: initialHash, steps };
    }

    // Open addressing
    let index = initialHash;
    let i = 0;
    
    while (i < tableSize) {
      const currentEntries = hashTable[index]?.entries || [];
      const existingEntry = currentEntries.find(entry => entry.key === key);
      
      if (isDelete) {
        if (existingEntry) {
          steps.push(`Found "${key}" at index ${index}`);
          return { index, steps };
        }
      } else {
        // For insert/search
        if (currentEntries.length === 0 || existingEntry) {
          if (i > 0) {
            steps.push(`Found slot at index ${index} after ${i} probe(s)`);
          }
          return { index, steps };
        }
      }
      
      // Collision occurred, probe next slot
      steps.push(`Collision at index ${index}, probing...`);
      
      switch (collisionMethod) {
        case 'linear':
          index = (initialHash + i + 1) % tableSize;
          steps.push(`Linear probe: (${initialHash} + ${i + 1}) % ${tableSize} = ${index}`);
          break;
        case 'quadratic':
          index = (initialHash + Math.pow(i + 1, 2)) % tableSize;
          steps.push(`Quadratic probe: (${initialHash} + ${i + 1}²) % ${tableSize} = ${index}`);
          break;
      }
      
      i++;
    }
    
    steps.push('Table is full!');
    return { index: -1, steps };
  };

  // Insert operation
  const insertEntry = () => {
    if (!newKey.trim() || !newValue.trim()) return;
    
    setOperation('insert');
    setCurrentStep(0);
    
    const { index, steps } = findSlot(newKey.trim());
    
    if (index === -1) {
      setOperationSteps([...steps, 'Cannot insert: table is full']);
      return;
    }
    
    const entryId = Date.now().toString();
    const newEntry: HashEntry = {
      key: newKey.trim(),
      value: newValue.trim(),
      id: entryId
    };
    
    setOperationSteps([...steps, `Inserting ("${newKey.trim()}", "${newValue.trim()}") at index ${index}`]);
    
    // Animate the insertion
    setTimeout(() => {
      setHighlightedBucket(index);
      setAnimatingEntry(entryId);
      
      setHashTable(prev => {
        const newTable = [...prev];
        const existingEntryIndex = newTable[index].entries.findIndex(entry => entry.key === newKey.trim());
        
        if (existingEntryIndex >= 0) {
          // Update existing entry
          newTable[index].entries[existingEntryIndex] = newEntry;
        } else {
          // Add new entry
          newTable[index].entries.push(newEntry);
        }
        
        return newTable;
      });
      
      setTimeout(() => {
        setAnimatingEntry(null);
        setNewKey('');
        setNewValue('');
      }, 1000);
    }, 500);
  };

  // Search operation
  const searchEntry = () => {
    if (!searchKey.trim()) return;
    
    setOperation('search');
    setCurrentStep(0);
    
    const { index, steps } = findSlot(searchKey.trim());
    
    if (index === -1) {
      setOperationSteps([...steps, `Key "${searchKey.trim()}" not found`]);
      setHighlightedBucket(null);
      return;
    }
    
    const bucket = hashTable[index];
    const foundEntry = bucket.entries.find(entry => entry.key === searchKey.trim());
    
    if (foundEntry) {
      setOperationSteps([...steps, `Found: "${searchKey.trim()}" = "${foundEntry.value}"`]);
      setHighlightedBucket(index);
      setAnimatingEntry(foundEntry.id);
      
      setTimeout(() => {
        setAnimatingEntry(null);
      }, 2000);
    } else {
      setOperationSteps([...steps, `Key "${searchKey.trim()}" not found in bucket ${index}`]);
      setHighlightedBucket(index);
      
      setTimeout(() => {
        setHighlightedBucket(null);
      }, 2000);
    }
  };

  // Delete operation
  const deleteEntry = () => {
    if (!searchKey.trim()) return;
    
    setOperation('delete');
    setCurrentStep(0);
    
    const { index, steps } = findSlot(searchKey.trim(), true);
    
    if (index === -1) {
      setOperationSteps([...steps, `Key "${searchKey.trim()}" not found`]);
      return;
    }
    
    const bucket = hashTable[index];
    const entryIndex = bucket.entries.findIndex(entry => entry.key === searchKey.trim());
    
    if (entryIndex >= 0) {
      setOperationSteps([...steps, `Deleting "${searchKey.trim()}" from index ${index}`]);
      setHighlightedBucket(index);
      setAnimatingEntry(bucket.entries[entryIndex].id);
      
      setTimeout(() => {
        setHashTable(prev => {
          const newTable = [...prev];
          newTable[index].entries.splice(entryIndex, 1);
          return newTable;
        });
        
        setAnimatingEntry(null);
        setSearchKey('');
      }, 1000);
    } else {
      setOperationSteps([...steps, `Key "${searchKey.trim()}" not found in bucket ${index}`]);
      setHighlightedBucket(index);
      
      setTimeout(() => {
        setHighlightedBucket(null);
      }, 2000);
    }
  };

  // Calculate statistics
  const getStatistics = () => {
    const totalEntries = hashTable.reduce((sum, bucket) => sum + bucket.entries.length, 0);
    const loadFactor = totalEntries / tableSize;
    const usedBuckets = hashTable.filter(bucket => bucket.entries.length > 0).length;
    const collisions = hashTable.filter(bucket => bucket.entries.length > 1).length;
    const maxChainLength = Math.max(...hashTable.map(bucket => bucket.entries.length));
    
    return { totalEntries, loadFactor, usedBuckets, collisions, maxChainLength };
  };

  const stats = getStatistics();

  // Demo data
  const loadDemoData = () => {
    const demoEntries = [
      { key: 'Alice', value: '25' },
      { key: 'Bob', value: '30' },
      { key: 'Charlie', value: '22' },
      { key: 'David', value: '28' },
      { key: 'Eve', value: '26' }
    ];
    
    initializeTable();
    
    demoEntries.forEach((entry, index) => {
      setTimeout(() => {
        setNewKey(entry.key);
        setNewValue(entry.value);
        setTimeout(() => {
          insertEntry();
        }, 100);
      }, index * 800);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 text-gray-700">
      <div className="container mx-auto px-4 py-12 text-gray-700">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-gray-700"
        >
          <Link href="/data-structures/hash-tables" className="inline-flex items-center text-pink-600 hover:text-pink-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2 text-gray-700" />
            Back to Hash Tables Overview
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Hash Table Simulation</h1>
          <p className="text-xl text-gray-600 max-w-4xl leading-relaxed">
            Experiment with different hash functions and collision resolution strategies. 
            See how hash tables work step by step.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8 text-gray-700">
          {/* Controls Panel */}
          <div className="lg:col-span-1 space-y-6 text-gray-700">
            {/* Configuration */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-gray-700">
              <div className="flex items-center mb-4 text-gray-700">
                <Settings className="h-5 w-5 text-pink-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Configuration</h3>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Table Size
                  </label>
                  <select
                    value={tableSize}
                    onChange={(e) => setTableSize(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value={5}>5</option>
                    <option value={7}>7</option>
                    <option value={11}>11</option>
                    <option value={13}>13</option>
                    <option value={17}>17</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hash Function
                  </label>
                  <select
                    value={hashFunction}
                    onChange={(e) => setHashFunction(e.target.value as 'division' | 'multiplication' | 'djb2')}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="division">Division Method</option>
                    <option value="multiplication">Multiplication Method</option>
                    <option value="djb2">DJB2 Hash</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Collision Resolution
                  </label>
                  <select
                    value={collisionMethod}
                    onChange={(e) => setCollisionMethod(e.target.value as 'chaining' | 'linear' | 'quadratic')}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="chaining">Separate Chaining</option>
                    <option value="linear">Linear Probing</option>
                    <option value="quadratic">Quadratic Probing</option>
                  </select>
                </div>

                <div className="flex space-x-2 text-gray-700">
                  <button
                    onClick={initializeTable}
                    className="flex-1 bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 flex items-center justify-center text-white text-white text-white text-white"
                  >
                    <RotateCcw className="h-4 w-4 mr-1 text-gray-700" />
                    Reset
                  </button>
                  
                  <button
                    onClick={loadDemoData}
                    className="flex-1 bg-pink-600 text-white px-3 py-2 rounded-lg hover:bg-pink-700 flex items-center justify-center text-white text-white text-white text-white"
                  >
                    <Zap className="h-4 w-4 mr-1 text-gray-700" />
                    Demo
                  </button>
                </div>
              </div>
            </div>

            {/* Operations */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Operations</h3>
              
              <div className="space-y-4 text-gray-700">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Insert Key-Value Pair
                  </label>
                  <div className="space-y-2 text-gray-700">
                    <input
                      type="text"
                      value={newKey}
                      onChange={(e) => setNewKey(e.target.value)}
                      placeholder="Key"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                      placeholder="Value"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    <button
                      onClick={insertEntry}
                      disabled={!newKey.trim() || !newValue.trim()}
                      className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-white text-white text-white text-white"
                    >
                      <Plus className="h-4 w-4 mr-2 text-gray-700" />
                      Insert
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search / Delete by Key
                  </label>
                  <div className="space-y-2 text-gray-700">
                    <input
                      type="text"
                      value={searchKey}
                      onChange={(e) => setSearchKey(e.target.value)}
                      placeholder="Key to search/delete"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    <div className="flex space-x-2 text-gray-700">
                      <button
                        onClick={searchEntry}
                        disabled={!searchKey.trim()}
                        className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-white text-white text-white text-white text-white"
                      >
                        <Search className="h-4 w-4 mr-1 text-gray-700" />
                        Search
                      </button>
                      
                      <button
                        onClick={deleteEntry}
                        disabled={!searchKey.trim()}
                        className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-white text-white text-white text-white"
                      >
                        <Trash2 className="h-4 w-4 mr-1 text-gray-700" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-gray-700">
              <div className="flex items-center mb-4 text-gray-700">
                <TrendingUp className="h-5 w-5 text-pink-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Statistics</h3>
              </div>
              
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between text-gray-700">
                  <span>Total Entries:</span>
                  <span className="font-semibold text-gray-800">{stats.totalEntries}</span>
                </div>
                
                <div className="flex justify-between text-gray-700">
                  <span>Load Factor:</span>
                  <span className={`font-semibold ${
                    stats.loadFactor <= 0.75 ? 'text-green-600' : 
                    stats.loadFactor <= 1.0 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {stats.loadFactor.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex justify-between text-gray-700">
                  <span>Used Buckets:</span>
                  <span className="font-semibold text-gray-800">{stats.usedBuckets}/{tableSize}</span>
                </div>
                
                <div className="flex justify-between text-gray-700">
                  <span>Collisions:</span>
                  <span className={`font-semibold ${stats.collisions > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {stats.collisions}
                  </span>
                </div>
                
                {collisionMethod === 'chaining' && (
                  <div className="flex justify-between text-gray-700">
                    <span>Max Chain:</span>
                    <span className={`font-semibold ${
                      stats.maxChainLength <= 2 ? 'text-green-600' : 
                      stats.maxChainLength <= 4 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {stats.maxChainLength}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Operation Steps */}
            {operationSteps.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6 text-gray-700">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Operation Steps</h3>
                <div className="space-y-2 text-gray-700">
                  {operationSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`text-sm p-2 rounded ${
                        index === operationSteps.length - 1 
                          ? 'bg-pink-100 text-pink-800 font-semibold' 
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {index + 1}. {step}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Hash Table Visualization */}
          <div className="lg:col-span-3 text-gray-700">
            <div className="bg-white rounded-lg shadow-lg p-6 text-gray-700">
              <div className="flex items-center justify-between mb-6 text-gray-700">
                <div className="flex items-center text-gray-700">
                  <Hash className="h-6 w-6 text-pink-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Hash Table Visualization</h3>
                </div>
                
                <div className="text-sm text-gray-600">
                  {hashFunction === 'division' && 'h(k) = sum(ASCII) % m'}
                  {hashFunction === 'multiplication' && 'h(k) = floor(m × ((k × A) mod 1))'}
                  {hashFunction === 'djb2' && 'h(k) = ((hash << 5) + hash + c) % m'}
                </div>
              </div>
              
              <div className="space-y-3 text-gray-700">
                {hashTable.map((bucket, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex items-center transition-all duration-300 ${
                      highlightedBucket === index ? 'bg-pink-100 rounded-lg p-2' : ''
                    }`}
                  >
                    {/* Bucket Index */}
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-black mr-4 ${
                      highlightedBucket === index 
                        ? 'bg-pink-600' 
                        : bucket.entries.length > 0 
                          ? 'bg-pink-500' 
                          : 'bg-gray-400'
                    }`}>
                      {index}
                    </div>
                    
                    {/* Bucket Contents */}
                    <div className="flex-1 min-h-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center px-4 text-gray-700">
                      {bucket.entries.length > 0 ? (
                        <div className="flex items-center space-x-2 w-full text-gray-700">
                          {bucket.entries.map((entry, entryIndex) => (
                            <React.Fragment key={entry.id}>
                              <motion.div
                                initial={animatingEntry === entry.id ? { scale: 0, opacity: 0 } : false}
                                animate={animatingEntry === entry.id ? { scale: 1, opacity: 1 } : {}}
                                exit={animatingEntry === entry.id ? { scale: 0, opacity: 0 } : {}}
                                className={`bg-pink-200 text-pink-800 px-3 py-1 rounded font-semibold text-sm transition-all duration-300 ${
                                  animatingEntry === entry.id ? 'ring-2 ring-pink-500 bg-pink-300' : ''
                                }`}
                              >
                                {entry.key}: {entry.value}
                              </motion.div>
                              
                              {collisionMethod === 'chaining' && entryIndex < bucket.entries.length - 1 && (
                                <span className="text-gray-400 font-bold">→</span>
                              )}
                            </React.Fragment>
                          ))}
                          
                          {collisionMethod === 'chaining' && bucket.entries.length > 1 && (
                            <div className="flex items-center ml-2 text-gray-700">
                              <AlertTriangle className="h-4 w-4 text-yellow-500 mr-1" />
                              <span className="text-yellow-700 text-xs font-medium">
                                Collision ({bucket.entries.length} items)
                              </span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm font-medium">Empty</span>
                      )}
                    </div>
                    
                    {/* Status Indicator */}
                    <div className="ml-4 text-gray-700">
                      {bucket.entries.length === 0 ? (
                        <div className="w-6 h-6 rounded-full bg-gray-300 text-gray-700"></div>
                      ) : bucket.entries.length === 1 ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-500" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Hash Function Details */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg text-gray-700">
                <h4 className="font-semibold text-gray-800 mb-2">Hash Function Details:</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div>
                    <strong>Current Function:</strong>
                    <div className="text-gray-600">
                      {hashFunction === 'division' && 'Simple division method with ASCII sum'}
                      {hashFunction === 'multiplication' && 'Multiplication method with golden ratio'}
                      {hashFunction === 'djb2' && 'DJB2 hash algorithm'}
                    </div>
                  </div>
                  
                  <div>
                    <strong>Collision Resolution:</strong>
                    <div className="text-gray-600">
                      {collisionMethod === 'chaining' && 'Separate chaining with arrays'}
                      {collisionMethod === 'linear' && 'Linear probing'}
                      {collisionMethod === 'quadratic' && 'Quadratic probing'}
                    </div>
                  </div>
                  
                  <div>
                    <strong>Performance:</strong>
                    <div className="text-gray-600">
                      Load Factor: {stats.loadFactor.toFixed(2)}<br/>
                      Efficiency: {stats.loadFactor <= 0.75 ? 'Optimal' : stats.loadFactor <= 1.0 ? 'Good' : 'Poor'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg text-white">
                <h4 className="font-semibold text-blue-800 mb-2">Instructions:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Insert key-value pairs to see how they are hashed and stored</li>
                  <li>• Try different hash functions to see how distribution changes</li>
                  <li>• Experiment with collision resolution strategies</li>
                  <li>• Watch the load factor and collision statistics</li>
                  <li>• Use the demo button to load sample data</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 flex justify-between items-center text-gray-700"
        >
          <Link
            href="/data-structures/hash-tables/theory"
            className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2 text-gray-700" />
            Theory
          </Link>
          
          <Link
            href="/algorithms/sorting"
            className="inline-flex items-center px-6 py-3 bg-pink-600 text-black rounded-lg hover:bg-pink-700 transition-colors text-gray-800"
          >
            Next: Sorting Algorithms
            <ArrowLeft className="h-5 w-5 ml-2 rotate-180 text-gray-700" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default HashTableSimulation;