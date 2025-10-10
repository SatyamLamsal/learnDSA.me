'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { EnhancedModuleLayout } from '@/components/layouts/EnhancedModuleLayout';
import { ProgressIndicator } from '@/components/progress/ProgressIndicator';
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton';
import { 
  ArrowLeft,
  Cpu,
  MemoryStick, 
  HardDrive,
  Zap,
  Database,
  Clock,
  Info,
  Gauge,
  Activity,
  Layers,
  ChevronRight
} from 'lucide-react';

export default function MemoryHierarchyPage() {
  const [activeLevel, setActiveLevel] = useState(0);
  const [isAutoCycling, setIsAutoCycling] = useState(true);

  const memoryLevels = [
    {
      name: "CPU Registers",
      size: "64-1024 bytes",
      speed: "1 cycle",
      cost: "Extremely High",
      location: "Inside CPU",
      description: "Ultra-fast storage directly in the processor core",
      icon: Cpu,
      color: "red",
      details: {
        characteristics: [
          "Fastest possible access speed",
          "Extremely limited capacity",
          "Directly accessed by CPU instructions",
          "No cache miss penalty"
        ],
        usage: [
          "Store currently executing instruction operands",
          "Hold intermediate calculation results", 
          "Function call stack management",
          "Loop counters and temporary variables"
        ],
        examples: [
          "x86-64: RAX, RBX, RCX, RDX registers",
          "ARM: R0-R15 general purpose registers",
          "RISC-V: x0-x31 integer registers"
        ]
      }
    },
    {
      name: "L1 Cache",
      size: "32-128 KB",
      speed: "3-4 cycles", 
      cost: "Very High",
      location: "On CPU chip",
      description: "First level cache split into instruction and data caches",
      icon: Zap,
      color: "orange",
      details: {
        characteristics: [
          "Split into instruction (L1i) and data (L1d) caches",
          "Typically 32KB each for instruction and data",
          "Direct-mapped or 2-way associative",
          "1-3 cycle access latency"
        ],
        usage: [
          "Cache recently used instructions",
          "Store frequently accessed data",
          "Reduce memory access latency",
          "Improve instruction fetch bandwidth"
        ],
        examples: [
          "Intel Core: 32KB L1d + 32KB L1i per core",
          "AMD Ryzen: 32KB L1d + 32KB L1i per core", 
          "Apple M1: 128KB L1d + 192KB L1i per core"
        ]
      }
    },
    {
      name: "L2 Cache",
      size: "256KB - 2MB",
      speed: "10-12 cycles",
      cost: "High", 
      location: "On CPU chip",
      description: "Unified cache shared between instruction and data",
      icon: Zap,
      color: "yellow",
      details: {
        characteristics: [
          "Unified cache (instructions + data)",
          "Higher associativity (4-way to 16-way)",
          "Larger capacity than L1",
          "Victim cache for L1 evictions"
        ],
        usage: [
          "Cache L1 misses",
          "Store larger working sets",
          "Buffer between L1 and L3/memory",
          "Reduce L3 cache pressure"
        ],
        examples: [
          "Intel Core: 1MB L2 per core",
          "AMD Ryzen: 512KB L2 per core",
          "Apple M1: 12MB unified L2"
        ]
      }
    },
    {
      name: "L3 Cache",
      size: "8-64 MB",
      speed: "30-40 cycles",
      cost: "Medium",
      location: "On CPU chip",
      description: "Last level cache shared across all CPU cores", 
      icon: Zap,
      color: "green",
      details: {
        characteristics: [
          "Shared across all CPU cores",
          "Much larger capacity",
          "Higher associativity (16-way+)",
          "NUMA-aware on multi-socket systems"
        ],
        usage: [
          "Cache data shared between cores",
          "Reduce main memory accesses", 
          "Store larger data structures",
          "Inter-core communication buffer"
        ],
        examples: [
          "Intel Core i9: 20-36MB L3",
          "AMD Ryzen: 32-96MB L3",
          "Server CPUs: Up to 256MB L3"
        ]
      }
    },
    {
      name: "Main Memory (RAM)",
      size: "8-128 GB",
      speed: "200-300 cycles",
      cost: "Low",
      location: "System board",
      description: "Primary system memory for active programs and data",
      icon: MemoryStick,
      color: "blue", 
      details: {
        characteristics: [
          "DRAM technology (DDR4/DDR5)",
          "Volatile storage (loses data on power off)",
          "High bandwidth, higher latency", 
          "Supports virtual memory systems"
        ],
        usage: [
          "Store active program code and data",
          "Operating system kernel and drivers",
          "Application working sets", 
          "File system buffers and caches"
        ],
        examples: [
          "DDR4-3200: 25.6 GB/s bandwidth",
          "DDR5-4800: 38.4 GB/s bandwidth",
          "Gaming PCs: 16-32GB typical",
          "Servers: 128GB-1TB+"
        ]
      }
    },
    {
      name: "SSD Storage", 
      size: "256GB - 8TB",
      speed: "25,000 cycles",
      cost: "Very Low",
      location: "Storage bay",
      description: "Fast non-volatile storage using flash memory",
      icon: Database,
      color: "purple",
      details: {
        characteristics: [
          "NAND flash memory technology",
          "Non-volatile (retains data without power)",
          "No moving parts (solid state)",
          "Wear leveling and error correction"
        ],
        usage: [
          "Operating system and application storage",
          "Fast boot and application loading", 
          "Virtual memory swap files",
          "Database and file system storage"
        ],
        examples: [
          "SATA SSD: 500-600 MB/s sequential",
          "NVMe SSD: 3,000-7,000 MB/s sequential", 
          "Random 4K: 50K-100K IOPS",
          "Laptops: 256GB-2TB typical"
        ]
      }
    },
    {
      name: "Hard Disk (HDD)",
      size: "500GB - 20TB", 
      speed: "10M+ cycles",
      cost: "Extremely Low",
      location: "Storage bay",
      description: "High-capacity mechanical storage with spinning platters",
      icon: HardDrive,
      color: "gray",
      details: {
        characteristics: [
          "Mechanical spinning platters",
          "Magnetic read/write heads",
          "High capacity, low cost per GB",
          "Susceptible to physical shock"
        ],
        usage: [
          "Bulk data storage and archival",
          "Media files and backups",
          "Cold data storage", 
          "Cost-effective large capacity"
        ],
        examples: [
          "7200 RPM: 150-200 MB/s sequential",
          "Random 4K: 100-200 IOPS",
          "Desktop: 1-4TB typical", 
          "Enterprise: Up to 20TB per drive"
        ]
      }
    }
  ];

  useEffect(() => {
    if (!isAutoCycling) return;
    
    const interval = setInterval(() => {
      setActiveLevel((prev) => (prev + 1) % memoryLevels.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [memoryLevels.length, isAutoCycling]);

  const sections = [
    { id: 'hierarchy', name: 'Memory Levels', icon: Layers },
    { id: 'tradeoffs', name: 'Speed vs Capacity', icon: Gauge },
    { id: 'impact', name: 'Performance Impact', icon: Zap },
  ];

  return (
    <EnhancedModuleLayout
      moduleId="module-1"
      moduleTitle="Module 1: Memory & Efficiency"
      moduleDescription="Understand why data structures matter through memory systems"
      sections={sections}
      estimatedTime="25 minutes"
      difficulty="Beginner"
      totalSections={4}
      currentPath="/learning-path/module-1/memory-hierarchy"
      showFullCourseStructure={true}
    >
      <div className="space-y-8 text-gray-700">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 relative"
        >
          <div className="absolute top-0 right-0 flex items-center space-x-4">
            <ProgressIndicator 
              topicId="module-1-memory-hierarchy" 
              topicType="module"
              category="learning-path"
            />
            <BookmarkButton 
              topicId="module-1-memory-hierarchy"
              topicType="module"
              title="Memory Hierarchy"
              category="learning-path"
              url="/learning-path/module-1/memory-hierarchy"
            />
          </div>
          
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-6 py-3 rounded-full text-sm font-medium mb-8">
            <Layers className="w-5 h-5 mr-2" />
            Memory Hierarchy & Performance
          </div>
          
          <h1 className="text-6xl font-bold text-gray-900 mb-8">
            Computer Memory
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Hierarchy
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Understanding the speed-capacity tradeoff that shapes how we design data structures and optimize algorithm performance.
          </p>
        </motion.div>

        {/* Interactive Memory Pyramid */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border mb-8 text-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Layers className="w-7 h-7 mr-3 text-indigo-600" />
            Interactive Memory Hierarchy
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8 text-gray-700">
            {/* Pyramid Visualization */}
            <div className="space-y-2 text-gray-700">
              {memoryLevels.map((level, index) => {
                const IconComponent = level.icon;
                const isActive = activeLevel === index;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                      isActive 
                        ? `bg-${level.color}-500 text-white shadow-lg scale-105` 
                        : `bg-${level.color}-100 text-${level.color}-800 hover:bg-${level.color}-200`
                    }`}
                    style={{ 
                      marginLeft: `${index * 12}px`,
                      marginRight: `${index * 12}px`
                    }}
                    onClick={() => {
                      setActiveLevel(index);
                      setIsAutoCycling(false);
                    }}
                  >
                    <div className="flex items-center justify-between text-gray-700">
                      <div className="flex items-center space-x-3 text-gray-700">
                        <IconComponent className="w-6 h-6 text-gray-700" />
                        <div>
                          <h3 className="font-bold text-gray-800">{level.name}</h3>
                          <p className={`text-sm ${isActive ? 'text-white opacity-90' : `text-${level.color}-600`}`}>
                            {level.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <div className="font-mono font-bold text-gray-800">{level.speed}</div>
                        <div className={`${isActive ? 'text-white opacity-75' : `text-${level.color}-600`}`}>
                          {level.size}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Detailed Information */}
            <div className="space-y-6 text-gray-700">
              <div className={`bg-${memoryLevels[activeLevel].color}-50 p-6 rounded-xl border border-${memoryLevels[activeLevel].color}-200`}>
                <div className="flex items-center mb-4 text-gray-700">
                  {React.createElement(memoryLevels[activeLevel].icon, {
                    className: `w-8 h-8 mr-3 text-${memoryLevels[activeLevel].color}-600`
                  })}
                  <h3 className={`text-2xl font-bold text-${memoryLevels[activeLevel].color}-900`}>
                    {memoryLevels[activeLevel].name}
                  </h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6 text-gray-700">
                  <div className={`text-${memoryLevels[activeLevel].color}-800`}>
                    <div className="font-semibold text-gray-800">Access Speed</div>
                    <div className="font-mono text-lg text-gray-700">{memoryLevels[activeLevel].speed}</div>
                  </div>
                  <div className={`text-${memoryLevels[activeLevel].color}-800`}>
                    <div className="font-semibold text-gray-800">Typical Size</div>
                    <div className="font-mono text-lg text-gray-700">{memoryLevels[activeLevel].size}</div>
                  </div>
                  <div className={`text-${memoryLevels[activeLevel].color}-800`}>
                    <div className="font-semibold text-gray-800">Cost per GB</div>
                    <div className="text-lg text-gray-700">{memoryLevels[activeLevel].cost}</div>
                  </div>
                  <div className={`text-${memoryLevels[activeLevel].color}-800`}>
                    <div className="font-semibold text-gray-800">Location</div>
                    <div className="text-lg text-gray-700">{memoryLevels[activeLevel].location}</div>
                  </div>
                </div>

                <div className="space-y-4 text-gray-700">
                  <div>
                    <h4 className={`font-semibold text-${memoryLevels[activeLevel].color}-900 mb-2`}>
                      Characteristics
                    </h4>
                    <ul className={`space-y-1 text-sm text-${memoryLevels[activeLevel].color}-800`}>
                      {memoryLevels[activeLevel].details.characteristics.map((char, idx) => (
                        <li key={idx} className="flex items-start text-gray-700">
                          <ChevronRight className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0 text-gray-700" />
                          {char}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className={`font-semibold text-${memoryLevels[activeLevel].color}-900 mb-2`}>
                      Primary Usage
                    </h4>
                    <ul className={`space-y-1 text-sm text-${memoryLevels[activeLevel].color}-800`}>
                      {memoryLevels[activeLevel].details.usage.map((usage, idx) => (
                        <li key={idx} className="flex items-start text-gray-700">
                          <ChevronRight className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0 text-gray-700" />
                          {usage}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg text-gray-700">
                <h4 className="font-semibold text-gray-900 mb-2">Real Examples</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  {memoryLevels[activeLevel].details.examples.map((example, idx) => (
                    <li key={idx} className="font-mono text-gray-700">• {example}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Comparison */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border mb-8 text-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Gauge className="w-7 h-7 mr-3 text-green-600" />
            Speed Comparison
          </h2>
          
          <div className="space-y-6 text-gray-700">
            <p className="text-gray-600">
              If accessing a CPU register took 1 second, here&apos;s how long other memory accesses would take:
            </p>
            
            <div className="space-y-4 text-gray-700">
              {[
                { name: "CPU Register", time: "1 second", multiplier: 1, color: "green" },
                { name: "L1 Cache", time: "3 seconds", multiplier: 3, color: "yellow" },
                { name: "L2 Cache", time: "10 seconds", multiplier: 10, color: "orange" },
                { name: "L3 Cache", time: "30 seconds", multiplier: 30, color: "red" },
                { name: "Main Memory", time: "3-5 minutes", multiplier: 200, color: "purple" },
                { name: "SSD Storage", time: "7 hours", multiplier: 25000, color: "blue" },
                { name: "Hard Drive", time: "4+ months", multiplier: 10000000, color: "gray" }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-4 text-gray-700">
                  <div className="w-32 font-semibold text-gray-900">{item.name}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden text-gray-700">
                    <motion.div
                      className={`h-full bg-${item.color}-500`}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (item.multiplier / 100) * 100)}%` }}
                      transition={{ delay: index * 0.2, duration: 1 }}
                    />
                  </div>
                  <div className="w-24 text-right font-mono text-sm font-semibold text-gray-600">
                    {item.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cache Behavior Simulation */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border text-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Activity className="w-7 h-7 mr-3 text-blue-600" />
            Cache Behavior Impact
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 text-gray-700">
            <div className="space-y-4 text-gray-700">
              <h3 className="text-xl font-semibold text-green-900">Sequential Access (Cache-Friendly)</h3>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-gray-700">
                <div className="font-mono text-sm space-y-2 text-gray-600">
                  <div>for (i = 0; i {'<'} 1000000; i++) {'{'}</div>
                  <div className="ml-4 text-gray-700">array[i] = array[i] + 1;</div>
                  <div>{'}'}</div>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between text-gray-700">
                  <span>Cache hits:</span>
                  <span className="font-mono text-green-600">~99%</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Performance:</span>
                  <span className="font-mono text-green-600">Excellent</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Why:</span>
                  <span className="text-green-700">Predictable access pattern</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-gray-700">
              <h3 className="text-xl font-semibold text-red-900">Random Access (Cache-Unfriendly)</h3>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-gray-700">
                <div className="font-mono text-sm space-y-2 text-gray-600">
                  <div>for (i = 0; i {'<'} 1000000; i++) {'{'}</div>
                  <div className="ml-4 text-gray-700">idx = random() % size;</div>
                  <div className="ml-4 text-gray-700">array[idx] = array[idx] + 1;</div>
                  <div>{'}'}</div>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between text-gray-700">
                  <span>Cache hits:</span>
                  <span className="font-mono text-red-600">~10%</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Performance:</span>
                  <span className="font-mono text-red-600">Poor</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Why:</span>
                  <span className="text-red-700">Unpredictable access pattern</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-200 text-white">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Key Insights for Data Structures</h3>
            <ul className="space-y-2 text-blue-800">
              <li className="flex items-start text-gray-700">
                <Info className="w-5 h-5 mr-2 mt-0.5 text-blue-600" />
                <span><strong>Arrays:</strong> Excellent cache performance due to contiguous memory layout</span>
              </li>
              <li className="flex items-start text-gray-700">
                <Info className="w-5 h-5 mr-2 mt-0.5 text-blue-600" />
                <span><strong>Linked Lists:</strong> Poor cache performance due to scattered memory locations</span>
              </li>
              <li className="flex items-start text-gray-700">
                <Info className="w-5 h-5 mr-2 mt-0.5 text-blue-600" />
                <span><strong>Hash Tables:</strong> Mixed performance depending on collision handling</span>
              </li>
              <li className="flex items-start text-gray-700">
                <Info className="w-5 h-5 mr-2 mt-0.5 text-blue-600" />
                <span><strong>Trees:</strong> Moderate performance, better with locality-aware implementations</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="flex justify-between items-center mt-12"
      >
        <Link
          href="/learning-path/module-1"
          className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Module 1
        </Link>
        <Link
          href="/learning-path/module-1/data-structures"
          className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Next: Data Structures Overview
          <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </motion.div>
    </EnhancedModuleLayout>
  );
}