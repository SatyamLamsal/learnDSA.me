'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  SkipForward, 
  Network, 
  Route,
  GitBranch,
  Map,
  Users,
  Zap,
  Search,
  Shuffle,
  Target,
  TreePine
} from 'lucide-react';

const GraphTheoryPage: React.FC = () => {
  // Sample graph data for visualizations
  const sampleGraph = {
    vertices: ['A', 'B', 'C', 'D', 'E'],
    edges: [
      { from: 'A', to: 'B', weight: 4 },
      { from: 'A', to: 'C', weight: 2 },
      { from: 'B', to: 'C', weight: 1 },
      { from: 'B', to: 'D', weight: 5 },
      { from: 'C', to: 'D', weight: 8 },
      { from: 'C', to: 'E', weight: 10 },
      { from: 'D', to: 'E', weight: 2 }
    ]
  };

  const GraphDiagram: React.FC<{ title: string; directed?: boolean; weighted?: boolean }> = ({ 
    title, 
    directed = false, 
    weighted = false 
  }) => (
    <div className="bg-gray-50 rounded-lg p-6 border">
      <h4 className="text-lg font-semibold text-center mb-4 text-gray-800">{title}</h4>
      <div className="relative h-80 bg-white rounded border">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 320">
          {/* Define arrowhead marker for directed graphs */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
              fill="#6366f1"
            >
              <polygon points="0 0, 10 3.5, 0 7" />
            </marker>
          </defs>
          
          {/* Draw edges */}
          <g stroke="#6366f1" strokeWidth="2" fill="none">
            <line 
              x1="80" y1="80" x2="160" y2="80" 
              markerEnd={directed ? "url(#arrowhead)" : undefined}
            />
            <line 
              x1="80" y1="80" x2="120" y2="160" 
              markerEnd={directed ? "url(#arrowhead)" : undefined}
            />
            <line 
              x1="160" y1="80" x2="120" y2="160" 
              markerEnd={directed ? "url(#arrowhead)" : undefined}
            />
            <line 
              x1="160" y1="80" x2="240" y2="160" 
              markerEnd={directed ? "url(#arrowhead)" : undefined}
            />
            <line 
              x1="120" y1="160" x2="240" y2="160" 
              markerEnd={directed ? "url(#arrowhead)" : undefined}
            />
            <line 
              x1="120" y1="160" x2="200" y2="240" 
              markerEnd={directed ? "url(#arrowhead)" : undefined}
            />
            <line 
              x1="240" y1="160" x2="200" y2="240" 
              markerEnd={directed ? "url(#arrowhead)" : undefined}
            />
          </g>
          
          {/* Draw weight labels if weighted */}
          {weighted && (
            <g fill="#ef4444" fontSize="12" fontFamily="Arial">
              <text x="115" y="75" textAnchor="middle">4</text>
              <text x="95" y="125" textAnchor="middle">2</text>
              <text x="135" y="125" textAnchor="middle">1</text>
              <text x="205" y="125" textAnchor="middle">5</text>
              <text x="180" y="165" textAnchor="middle">8</text>
              <text x="155" y="205" textAnchor="middle">10</text>
              <text x="225" y="205" textAnchor="middle">2</text>
            </g>
          )}
          
          {/* Draw vertices */}
          <g>
            {[
              { id: 'A', x: 80, y: 80 },
              { id: 'B', x: 160, y: 80 },
              { id: 'C', x: 120, y: 160 },
              { id: 'D', x: 240, y: 160 },
              { id: 'E', x: 200, y: 240 }
            ].map((vertex, index) => (
              <motion.g key={vertex.id} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }}>
                <circle
                  cx={vertex.x}
                  cy={vertex.y}
                  r="20"
                  fill="#6366f1"
                  stroke="#4338ca"
                  strokeWidth="2"
                />
                <text
                  x={vertex.x}
                  y={vertex.y + 5}
                  textAnchor="middle"
                  fill="white"
                  fontSize="16"
                  fontWeight="bold"
                >
                  {vertex.id}
                </text>
              </motion.g>
            ))}
          </g>
        </svg>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Link href="/data-structures/graphs" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Graphs Overview
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Graph Theory</h1>
          <p className="text-xl text-gray-600 max-w-4xl leading-relaxed">
            Master graph theory concepts, representations, algorithms, and real-world applications. 
            Learn about different types of graphs and their use cases in computer science.
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* Basic Concepts */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Network className="h-8 w-8 text-indigo-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Fundamental Concepts</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-indigo-700">What is a Graph?</h3>
                <div className="space-y-4 text-gray-700">
                  <p>
                    A <strong>graph</strong> is a non-linear data structure consisting of vertices (nodes) 
                    connected by edges. Unlike trees, graphs can have cycles and multiple paths between nodes.
                  </p>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">Mathematical Definition:</h4>
                    <p className="text-sm">
                      A graph G = (V, E) where:
                    </p>
                    <ul className="list-disc pl-4 text-sm mt-2 space-y-1">
                      <li><strong>V</strong> is a finite set of vertices</li>
                      <li><strong>E</strong> is a finite set of edges</li>
                      <li>Each edge connects two vertices</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Key Properties:</h4>
                    <ul className="list-disc pl-4 text-sm space-y-1">
                      <li>Can represent any binary relationship</li>
                      <li>May contain cycles</li>
                      <li>Multiple paths between nodes possible</li>
                      <li>Can be connected or disconnected</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-indigo-700">Graph Terminology</h3>
                <div className="space-y-3 text-gray-700">
                  <div className="bg-indigo-50 p-3 rounded border-l-4 border-indigo-500">
                    <strong>Vertex/Node:</strong> A fundamental unit representing an entity
                  </div>
                  <div className="bg-indigo-50 p-3 rounded border-l-4 border-indigo-500">
                    <strong>Edge:</strong> A connection between two vertices
                  </div>
                  <div className="bg-indigo-50 p-3 rounded border-l-4 border-indigo-500">
                    <strong>Adjacent:</strong> Two vertices connected by an edge
                  </div>
                  <div className="bg-indigo-50 p-3 rounded border-l-4 border-indigo-500">
                    <strong>Degree:</strong> Number of edges connected to a vertex
                  </div>
                  <div className="bg-indigo-50 p-3 rounded border-l-4 border-indigo-500">
                    <strong>Path:</strong> Sequence of vertices connected by edges
                  </div>
                  <div className="bg-indigo-50 p-3 rounded border-l-4 border-indigo-500">
                    <strong>Cycle:</strong> Path that starts and ends at the same vertex
                  </div>
                  <div className="bg-indigo-50 p-3 rounded border-l-4 border-indigo-500">
                    <strong>Connected:</strong> Path exists between every pair of vertices
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Graph Types */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <GitBranch className="h-8 w-8 text-indigo-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Types of Graphs</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <GraphDiagram title="Undirected Graph" directed={false} weighted={false} />
              <GraphDiagram title="Directed Graph" directed={true} weighted={false} />
              <GraphDiagram title="Weighted Graph" directed={false} weighted={true} />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-indigo-700">By Direction</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">Undirected Graph</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      Edges have no direction. If vertex A is connected to B, then B is also connected to A.
                    </p>
                    <p className="text-xs text-gray-600">
                      <strong>Examples:</strong> Facebook friendships, road networks
                    </p>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-800 mb-2">Directed Graph (Digraph)</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      Edges have direction. Connection from A to B doesn't imply B to A.
                    </p>
                    <p className="text-xs text-gray-600">
                      <strong>Examples:</strong> Twitter followers, web page links
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-indigo-700">By Weight</h3>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">Unweighted Graph</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      All edges are equal. Only connection matters, not the "cost" of traversal.
                    </p>
                    <p className="text-xs text-gray-600">
                      <strong>Examples:</strong> Social networks, family trees
                    </p>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h4 className="font-semibold text-yellow-800 mb-2">Weighted Graph</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      Edges have weights representing cost, distance, time, or other metrics.
                    </p>
                    <p className="text-xs text-gray-600">
                      <strong>Examples:</strong> GPS navigation, network latency
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h4 className="font-semibold text-gray-800 mb-2">Cyclic Graph</h4>
                <p className="text-sm text-gray-600">Contains at least one cycle</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h4 className="font-semibold text-gray-800 mb-2">Acyclic Graph</h4>
                <p className="text-sm text-gray-600">No cycles present (DAG if directed)</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h4 className="font-semibold text-gray-800 mb-2">Complete Graph</h4>
                <p className="text-sm text-gray-600">Every vertex connected to every other</p>
              </div>
            </div>
          </motion.section>

          {/* Graph Representations */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Map className="h-8 w-8 text-indigo-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Graph Representations</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold mb-3 text-blue-800">Adjacency Matrix</h3>
                <div className="space-y-3 text-sm">
                  <p className="text-gray-700">
                    2D array where element [i][j] indicates if there's an edge between vertex i and j.
                  </p>
                  <div className="bg-blue-100 p-3 rounded">
                    <h4 className="font-semibold text-blue-800 mb-1">Example Matrix:</h4>
                    <div className="font-mono text-xs bg-white p-2 rounded border">
                      <pre>{`    A B C D E
A [ 0 1 1 0 0 ]
B [ 1 0 1 1 0 ]
C [ 1 1 0 1 1 ]
D [ 0 1 1 0 1 ]
E [ 0 0 1 1 0 ]`}</pre>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p><strong>Pros:</strong> O(1) edge lookup, simple implementation</p>
                    <p><strong>Cons:</strong> O(V²) space, inefficient for sparse graphs</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-lg font-semibold mb-3 text-green-800">Adjacency List</h3>
                <div className="space-y-3 text-sm">
                  <p className="text-gray-700">
                    Array of lists where each list contains neighbors of a vertex.
                  </p>
                  <div className="bg-green-100 p-3 rounded">
                    <h4 className="font-semibold text-green-800 mb-1">Example List:</h4>
                    <div className="font-mono text-xs bg-white p-2 rounded border">
                      <pre>{`A: [B, C]
B: [A, C, D]
C: [A, B, D, E]
D: [B, C, E]
E: [C, D]`}</pre>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p><strong>Pros:</strong> O(V + E) space, efficient for sparse graphs</p>
                    <p><strong>Cons:</strong> O(V) edge lookup in worst case</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <h3 className="text-lg font-semibold mb-3 text-purple-800">Edge List</h3>
                <div className="space-y-3 text-sm">
                  <p className="text-gray-700">
                    List of all edges, each represented as a pair (or triple for weighted graphs).
                  </p>
                  <div className="bg-purple-100 p-3 rounded">
                    <h4 className="font-semibold text-purple-800 mb-1">Example List:</h4>
                    <div className="font-mono text-xs bg-white p-2 rounded border">
                      <pre>{`Edges:
(A, B)
(A, C)
(B, C)
(B, D)
(C, D)
(C, E)
(D, E)`}</pre>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p><strong>Pros:</strong> O(E) space, simple for edge operations</p>
                    <p><strong>Cons:</strong> O(E) to find neighbors</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Implementation Example (JavaScript):</h4>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`class Graph {
  constructor() {
    this.adjacencyList = new Map();
  }
  
  addVertex(vertex) {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }
  
  addEdge(vertex1, vertex2) {
    this.adjacencyList.get(vertex1).push(vertex2);
    this.adjacencyList.get(vertex2).push(vertex1); // For undirected
  }
  
  removeEdge(vertex1, vertex2) {
    this.adjacencyList.set(
      vertex1,
      this.adjacencyList.get(vertex1).filter(v => v !== vertex2)
    );
    this.adjacencyList.set(
      vertex2,
      this.adjacencyList.get(vertex2).filter(v => v !== vertex1)
    );
  }
  
  removeVertex(vertex) {
    while (this.adjacencyList.get(vertex).length) {
      const adjacentVertex = this.adjacencyList.get(vertex).pop();
      this.removeEdge(vertex, adjacentVertex);
    }
    this.adjacencyList.delete(vertex);
  }
}`}</pre>
              </div>
            </div>
          </motion.section>

          {/* Graph Traversal Algorithms */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Search className="h-8 w-8 text-indigo-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Graph Traversal Algorithms</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-xl font-semibold mb-4 text-blue-800 flex items-center">
                  <Shuffle className="h-5 w-5 mr-2" />
                  Breadth-First Search (BFS)
                </h3>
                
                <div className="space-y-4 text-sm">
                  <p className="text-gray-700">
                    Explores neighbors level by level, visiting all vertices at distance k before visiting vertices at distance k+1.
                  </p>
                  
                  <div className="bg-blue-100 p-3 rounded">
                    <h4 className="font-semibold text-blue-800 mb-2">Algorithm Steps:</h4>
                    <ol className="list-decimal pl-4 space-y-1 text-xs">
                      <li>Start from a source vertex</li>
                      <li>Add source to queue and mark as visited</li>
                      <li>While queue is not empty:</li>
                      <li className="pl-4">• Dequeue a vertex</li>
                      <li className="pl-4">• For each unvisited neighbor:</li>
                      <li className="pl-8">- Mark as visited</li>
                      <li className="pl-8">- Add to queue</li>
                    </ol>
                  </div>

                  <div className="bg-gray-900 text-blue-400 p-3 rounded text-xs font-mono">
                    <pre>{`function BFS(graph, start) {
  const visited = new Set();
  const queue = [start];
  const result = [];
  
  visited.add(start);
  
  while (queue.length > 0) {
    const vertex = queue.shift();
    result.push(vertex);
    
    for (let neighbor of graph[vertex]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  
  return result;
}`}</pre>
                  </div>

                  <div className="space-y-1">
                    <p><strong>Time Complexity:</strong> O(V + E)</p>
                    <p><strong>Space Complexity:</strong> O(V)</p>
                    <p><strong>Use Cases:</strong> Shortest path (unweighted), level-order traversal</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-xl font-semibold mb-4 text-green-800 flex items-center">
                  <TreePine className="h-5 w-5 mr-2" />
                  Depth-First Search (DFS)
                </h3>
                
                <div className="space-y-4 text-sm">
                  <p className="text-gray-700">
                    Explores as far as possible along each branch before backtracking. Goes deep before going wide.
                  </p>
                  
                  <div className="bg-green-100 p-3 rounded">
                    <h4 className="font-semibold text-green-800 mb-2">Algorithm Steps:</h4>
                    <ol className="list-decimal pl-4 space-y-1 text-xs">
                      <li>Start from a source vertex</li>
                      <li>Mark current vertex as visited</li>
                      <li>For each unvisited neighbor:</li>
                      <li className="pl-4">• Recursively call DFS</li>
                      <li>Backtrack when no unvisited neighbors</li>
                    </ol>
                  </div>

                  <div className="bg-gray-900 text-green-400 p-3 rounded text-xs font-mono">
                    <pre>{`function DFS(graph, start, visited = new Set()) {
  visited.add(start);
  console.log(start);
  
  for (let neighbor of graph[start]) {
    if (!visited.has(neighbor)) {
      DFS(graph, neighbor, visited);
    }
  }
}

// Iterative version using stack
function DFSIterative(graph, start) {
  const visited = new Set();
  const stack = [start];
  const result = [];
  
  while (stack.length > 0) {
    const vertex = stack.pop();
    
    if (!visited.has(vertex)) {
      visited.add(vertex);
      result.push(vertex);
      
      for (let neighbor of graph[vertex]) {
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
        }
      }
    }
  }
  
  return result;
}`}</pre>
                  </div>

                  <div className="space-y-1">
                    <p><strong>Time Complexity:</strong> O(V + E)</p>
                    <p><strong>Space Complexity:</strong> O(V)</p>
                    <p><strong>Use Cases:</strong> Cycle detection, topological sorting, pathfinding</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Advanced Algorithms */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Route className="h-8 w-8 text-indigo-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Advanced Graph Algorithms</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-indigo-700">Shortest Path Algorithms</h3>
                <div className="space-y-4">
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
                      <Target className="h-4 w-4 mr-2" />
                      Dijkstra's Algorithm
                    </h4>
                    <p className="text-sm text-gray-700 mb-2">
                      Finds shortest path from source to all vertices in weighted graphs with non-negative weights.
                    </p>
                    <div className="text-xs space-y-1">
                      <p><strong>Time:</strong> O((V + E) log V) with priority queue</p>
                      <p><strong>Space:</strong> O(V)</p>
                      <p><strong>Use:</strong> GPS navigation, network routing</p>
                    </div>
                  </div>

                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-red-800 mb-2">Bellman-Ford Algorithm</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      Handles negative weights and detects negative cycles. Slower but more versatile than Dijkstra's.
                    </p>
                    <div className="text-xs space-y-1">
                      <p><strong>Time:</strong> O(VE)</p>
                      <p><strong>Space:</strong> O(V)</p>
                      <p><strong>Use:</strong> Currency arbitrage, network optimization</p>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-800 mb-2">Floyd-Warshall Algorithm</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      Finds shortest paths between all pairs of vertices. Uses dynamic programming approach.
                    </p>
                    <div className="text-xs space-y-1">
                      <p><strong>Time:</strong> O(V³)</p>
                      <p><strong>Space:</strong> O(V²)</p>
                      <p><strong>Use:</strong> All-pairs shortest path, transitive closure</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-indigo-700">Minimum Spanning Tree</h3>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">Kruskal's Algorithm</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      Finds MST by sorting edges and adding smallest edges that don't create cycles.
                    </p>
                    <div className="text-xs space-y-1">
                      <p><strong>Time:</strong> O(E log E)</p>
                      <p><strong>Space:</strong> O(V)</p>
                      <p><strong>Uses:</strong> Union-Find data structure</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">Prim's Algorithm</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      Builds MST by starting from a vertex and adding minimum weight edges to unvisited vertices.
                    </p>
                    <div className="text-xs space-y-1">
                      <p><strong>Time:</strong> O(E log V) with priority queue</p>
                      <p><strong>Space:</strong> O(V)</p>
                      <p><strong>Better for:</strong> Dense graphs</p>
                    </div>
                  </div>

                  <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                    <h4 className="font-semibold text-indigo-800 mb-2">Topological Sort</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      Linear ordering of vertices in DAG such that for every directed edge (u,v), u comes before v.
                    </p>
                    <div className="text-xs space-y-1">
                      <p><strong>Time:</strong> O(V + E)</p>
                      <p><strong>Use:</strong> Task scheduling, dependency resolution</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Real-world Applications */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <Users className="h-8 w-8 text-indigo-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Real-World Applications</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Social Networks
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  Model relationships between users, friend recommendations, community detection.
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Facebook friend suggestions</li>
                  <li>• LinkedIn professional networks</li>
                  <li>• Twitter follower graphs</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-3 flex items-center">
                  <Map className="h-5 w-5 mr-2" />
                  Navigation Systems
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  GPS navigation, route optimization, traffic management systems.
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Google Maps routing</li>
                  <li>• Uber/Lyft optimization</li>
                  <li>• Public transport networks</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-6 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-3 flex items-center">
                  <Network className="h-5 w-5 mr-2" />
                  Computer Networks
                </h3>
                <p className="text-sm text-gray-700 mb-3">
                  Internet routing, network topology, bandwidth optimization.
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Internet backbone routing</li>
                  <li>• Network fault tolerance</li>
                  <li>• Load balancing</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-6 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-3">Web Crawling</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Search engines use graphs to model web page relationships and links.
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Google PageRank algorithm</li>
                  <li>• Web scraping strategies</li>
                  <li>• SEO link analysis</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-100 to-red-200 p-6 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-3">Recommendation Systems</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Collaborative filtering, content recommendations, user behavior analysis.
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Netflix movie recommendations</li>
                  <li>• Amazon product suggestions</li>
                  <li>• Spotify music discovery</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 p-6 rounded-lg">
                <h3 className="font-semibold text-indigo-800 mb-3">Game Development</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Pathfinding in games, AI decision trees, game state representation.
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• A* pathfinding in games</li>
                  <li>• Game AI behavior trees</li>
                  <li>• Procedural world generation</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Complexity Summary */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-lg p-8"
          >
            <h2 className="text-3xl font-bold mb-6">Complexity Summary</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Graph Operations</h3>
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="font-semibold">Operation</div>
                    <div className="font-semibold">Adj. List</div>
                    <div className="font-semibold">Adj. Matrix</div>
                    
                    <div>Add Vertex</div>
                    <div className="font-mono">O(1)</div>
                    <div className="font-mono">O(V²)</div>
                    
                    <div>Add Edge</div>
                    <div className="font-mono">O(1)</div>
                    <div className="font-mono">O(1)</div>
                    
                    <div>Check Edge</div>
                    <div className="font-mono">O(V)</div>
                    <div className="font-mono">O(1)</div>
                    
                    <div>Remove Vertex</div>
                    <div className="font-mono">O(V + E)</div>
                    <div className="font-mono">O(V²)</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Graph Algorithms</h3>
                <div className="bg-white bg-opacity-20 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span>BFS/DFS:</span>
                    <span className="font-mono">O(V + E)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dijkstra's:</span>
                    <span className="font-mono">O((V + E) log V)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bellman-Ford:</span>
                    <span className="font-mono">O(VE)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Floyd-Warshall:</span>
                    <span className="font-mono">O(V³)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Kruskal's MST:</span>
                    <span className="font-mono">O(E log E)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Prim's MST:</span>
                    <span className="font-mono">O(E log V)</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex justify-between items-center"
          >
            <Link
              href="/data-structures/graphs"
              className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Overview
            </Link>
            
            <Link
              href="/data-structures/graphs/simulation"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Interactive Simulation
              <SkipForward className="h-5 w-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GraphTheoryPage;