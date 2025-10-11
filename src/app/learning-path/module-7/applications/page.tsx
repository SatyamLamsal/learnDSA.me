'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Rocket, ArrowRight, ArrowLeft, Database, Lock, Zap, Globe, Code, Target, CheckCircle } from 'lucide-react';

type ApplicationCategory = 'databases' | 'security' | 'compilers' | 'systems';

export default function HashTableApplicationsPage() {
  const [activeCategory, setActiveCategory] = useState<ApplicationCategory>('databases');

  const applications = {
    databases: {
      name: 'Database Systems',
      icon: Database,
      color: 'blue',
      description: 'Hash tables are fundamental to database indexing and query optimization',
      examples: [
        {
          title: 'B+ Tree Index Lookup',
          description: 'Database engines use hash tables for quick index page location',
          code: `// Hash-based index lookup
Map<PageId, IndexPage> pageCache = new HashMap<>();
IndexPage page = pageCache.get(hashKey(searchValue));`
        },
        {
          title: 'Join Operations',
          description: 'Hash joins are one of the most efficient join algorithms',
          code: `// Hash join implementation
HashMap<Key, List<Row>> buildTable = new HashMap<>();
// Build phase: hash smaller table
// Probe phase: lookup matching rows`
        },
        {
          title: 'Query Result Caching',
          description: 'Cache query results using SQL statement hash as key',
          code: `String sqlHash = hashFunction(sqlStatement);
QueryResult cached = queryCache.get(sqlHash);
if (cached != null) return cached;`
        }
      ]
    },
    security: {
      name: 'Security & Cryptography',
      icon: Lock,
      color: 'red',
      description: 'Hash functions provide integrity verification and secure storage',
      examples: [
        {
          title: 'Password Storage',
          description: 'Store salted password hashes instead of plaintext passwords',
          code: `// Secure password hashing
String salt = generateSalt();
String hash = bcrypt(password + salt);
store(username, salt, hash);`
        },
        {
          title: 'Digital Signatures',
          description: 'Hash messages before signing to ensure integrity',
          code: `// Message signing process
String messageHash = sha256(message);
String signature = sign(messageHash, privateKey);
verify(messageHash, signature, publicKey);`
        },
        {
          title: 'Blockchain Mining',
          description: 'Proof-of-work systems use hash functions for mining',
          code: `// Bitcoin-style mining
while (true) {
  String hash = sha256(blockHeader + nonce);
  if (hash.startsWith("0000")) break;
  nonce++;
}`
        }
      ]
    },
    compilers: {
      name: 'Compilers & Interpreters',
      icon: Code,
      color: 'green',
      description: 'Symbol tables and lexical analysis rely heavily on hash tables',
      examples: [
        {
          title: 'Symbol Table',
          description: 'Store variable declarations and their metadata',
          code: `// Compiler symbol table
HashMap<String, Symbol> symbolTable = new HashMap<>();
symbolTable.put("variable", new Symbol(type, scope, offset));`
        },
        {
          title: 'String Interning',
          description: 'Deduplicate string literals to save memory',
          code: `// String interning in compiler
HashMap<String, StringLiteral> internTable = new HashMap<>();
StringLiteral intern(String str) {
  return internTable.computeIfAbsent(str, StringLiteral::new);
}`
        },
        {
          title: 'Constant Folding',
          description: 'Cache computed constant expressions',
          code: `// Expression evaluation cache
HashMap<Expression, Value> constCache = new HashMap<>();
Value evaluate(Expression expr) {
  return constCache.computeIfAbsent(expr, this::compute);
}`
        }
      ]
    },
    systems: {
      name: 'System Programming',
      icon: Globe,
      color: 'purple',
      description: 'Operating systems and networks use hash tables extensively',
      examples: [
        {
          title: 'Process Table',
          description: 'Operating systems track processes using PID hash tables',
          code: `// OS process management
HashMap<ProcessId, ProcessControlBlock> processTable;
ProcessControlBlock pcb = processTable.get(pid);`
        },
        {
          title: 'DNS Resolution',
          description: 'Domain name to IP address mapping and caching',
          code: `// DNS cache implementation
HashMap<String, IPAddress> dnsCache = new HashMap<>();
IPAddress resolve(String domain) {
  return dnsCache.computeIfAbsent(domain, this::lookup);
}`
        },
        {
          title: 'Memory Management',
          description: 'Virtual memory systems use hash tables for page tables',
          code: `// Virtual memory page table
HashMap<VirtualAddress, PhysicalAddress> pageTable;
PhysicalAddress translate(VirtualAddress vaddr) {
  return pageTable.get(vaddr.getPageNumber());
}`
        }
      ]
    }
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-50 border-blue-200',
      red: 'text-red-600 bg-red-50 border-red-200',
      green: 'text-green-600 bg-green-50 border-green-200',
      purple: 'text-purple-600 bg-purple-50 border-purple-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/learning-path/module-7" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Module 7
            </Link>
            <div className="flex items-center text-sm text-gray-500">
              <Target className="w-4 h-4 mr-1" />
              Lesson 4 of 4
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Rocket className="w-8 h-8 mr-3 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">Real-World Applications</h1>
          </div>
          <p className="text-lg text-gray-600">
            Discover how hash tables power the systems and applications we use every day
          </p>
        </div>

        <div className="space-y-8">
          {/* Overview */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Zap className="w-7 h-7 mr-3 text-indigo-600" />
              Why Hash Tables Matter
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-gray-700">
                  Hash tables are one of the most practical and widely-used data structures in computer science. Their O(1) average-case performance makes them ideal for applications requiring fast lookups.
                </p>
                
                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                  <h3 className="font-semibold text-indigo-900 mb-2">Key Benefits:</h3>
                  <ul className="space-y-1 text-indigo-800 text-sm">
                    <li>• <strong>Speed:</strong> Constant-time average performance</li>
                    <li>• <strong>Flexibility:</strong> Handle various data types as keys</li>
                    <li>• <strong>Scalability:</strong> Efficient with large datasets</li>
                    <li>• <strong>Simplicity:</strong> Easy to implement and understand</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h3 className="font-semibold text-yellow-900 mb-2">Common Use Cases:</h3>
                  <ul className="space-y-1 text-yellow-800 text-sm">
                    <li>• Caching and memoization</li>
                    <li>• Database indexing</li>
                    <li>• Symbol tables in compilers</li>
                    <li>• Set operations and deduplication</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-center">Industry Impact</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white p-4 rounded-lg border text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">100%</div>
                    <div className="text-gray-600">of databases use hash indices</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">99%</div>
                    <div className="text-gray-600">of web servers use hash tables</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">95%</div>
                    <div className="text-gray-600">of programming languages</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border text-center">
                    <div className="text-2xl font-bold text-red-600 mb-1">∞</div>
                    <div className="text-gray-600">daily hash operations</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Application Categories */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Application Categories</h2>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {Object.entries(applications).map(([key, app]) => {
                const IconComponent = app.icon;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveCategory(key as ApplicationCategory)}
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeCategory === key
                        ? `bg-${app.color}-600 text-white`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {app.name}
                  </button>
                );
              })}
            </div>

            <div className="space-y-6">
              <div className={`p-4 rounded-lg border ${getColorClasses(applications[activeCategory].color)}`}>
                <h3 className="text-xl font-semibold mb-2">
                  {applications[activeCategory].name}
                </h3>
                <p className="text-gray-700">
                  {applications[activeCategory].description}
                </p>
              </div>

              <div className="grid lg:grid-cols-1 gap-6">
                {applications[activeCategory].examples.map((example, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {example.title}
                    </h4>
                    <p className="text-gray-700 mb-4">
                      {example.description}
                    </p>
                    
                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap">
                        {example.code}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance in Practice */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Performance in Practice</h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Benchmarks</h3>
                
                <div className="space-y-3">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-2">Web Server Cache</h4>
                    <p className="text-green-800 text-sm mb-2">
                      Redis (hash table based): 100,000+ operations/second
                    </p>
                    <div className="w-full bg-green-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full w-11/12"></div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">Database Index</h4>
                    <p className="text-blue-800 text-sm mb-2">
                      PostgreSQL hash index: 50,000+ lookups/second
                    </p>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full w-4/5"></div>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2">Compiler Symbol Table</h4>
                    <p className="text-purple-800 text-sm mb-2">
                      GCC: 1M+ symbol lookups during compilation
                    </p>
                    <div className="w-full bg-purple-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full w-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Design Considerations</h3>
                
                <div className="space-y-3">
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <h4 className="font-semibold text-gray-900 mb-2">Load Factor Management</h4>
                    <p className="text-gray-700 text-sm">
                      Most implementations resize at 75% capacity to maintain O(1) performance
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <h4 className="font-semibold text-gray-900 mb-2">Hash Function Choice</h4>
                    <p className="text-gray-700 text-sm">
                      Production systems often use MurmurHash or CityHash for speed and distribution
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <h4 className="font-semibold text-gray-900 mb-2">Memory Layout</h4>
                    <p className="text-gray-700 text-sm">
                      Cache-friendly implementations group related data and minimize pointer chasing
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Implementation Examples */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Implementations</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Language Built-ins</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="font-medium">Python</span>
                    <code className="text-blue-600">dict</code>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="font-medium">JavaScript</span>
                    <code className="text-blue-600">Map, Object</code>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="font-medium">Java</span>
                    <code className="text-blue-600">HashMap</code>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="font-medium">C++</span>
                    <code className="text-blue-600">unordered_map</code>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="font-medium">Go</span>
                    <code className="text-blue-600">map</code>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">System Components</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>CPU instruction caches</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Operating system page tables</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Network routing tables</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>File system metadata</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Memory allocators</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-200">
          <Link 
            href="/learning-path/module-7/collision-resolution" 
            className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Previous: Collision Resolution
          </Link>
          <Link 
            href="/learning-path/module-8" // Next module placeholder
            className="flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105"
          >
            Next Module: Dynamic Programming 🚀
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}