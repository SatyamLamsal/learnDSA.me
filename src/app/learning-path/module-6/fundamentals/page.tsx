'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Network, Users, ArrowRight, Play, CheckCircle, Clock, BookOpen, ArrowLeft } from 'lucide-react';

type GraphType = 'directed' | 'undirected' | 'weighted';

interface GraphEdge {
  from: string;
  to: string;
  weight?: number;
}

export default function GraphFundamentalsPage() {
  const [activeVisualization, setActiveVisualization] = useState<GraphType>('undirected');

  const graphExamples = {
    undirected: {
      title: "Undirected Graph",
      description: "Edges have no direction - connections go both ways",
      nodes: [
        { id: 'A', x: 100, y: 100 },
        { id: 'B', x: 200, y: 50 },
        { id: 'C', x: 250, y: 150 },
        { id: 'D', x: 150, y: 200 }
      ],
      edges: [
        { from: 'A', to: 'B' },
        { from: 'B', to: 'C' },
        { from: 'C', to: 'D' },
        { from: 'A', to: 'D' }
      ] as GraphEdge[]
    },
    directed: {
      title: "Directed Graph", 
      description: "Edges have direction - one-way connections",
      nodes: [
        { id: 'A', x: 100, y: 100 },
        { id: 'B', x: 200, y: 50 },
        { id: 'C', x: 250, y: 150 },
        { id: 'D', x: 150, y: 200 }
      ],
      edges: [
        { from: 'A', to: 'B' },
        { from: 'B', to: 'C' },
        { from: 'C', to: 'D' },
        { from: 'D', to: 'A' }
      ] as GraphEdge[]
    },
    weighted: {
      title: "Weighted Graph",
      description: "Edges have weights representing cost, distance, or capacity",
      nodes: [
        { id: 'A', x: 100, y: 100 },
        { id: 'B', x: 200, y: 50 },
        { id: 'C', x: 250, y: 150 },
        { id: 'D', x: 150, y: 200 }
      ],
      edges: [
        { from: 'A', to: 'B', weight: 4 },
        { from: 'B', to: 'C', weight: 2 },
        { from: 'C', to: 'D', weight: 3 },
        { from: 'A', to: 'D', weight: 5 }
      ] as GraphEdge[]
    }
  };

  const currentGraph = graphExamples[activeVisualization];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/learning-path/module-6" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Module 6
            </Link>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              45 minutes
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Network className="w-8 h-8 mr-3 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">Graph Fundamentals</h1>
          </div>
          <p className="text-lg text-gray-600">
            Learn the basic concepts, terminology, and representations of graphs
          </p>
        </div>
      <div className="space-y-8">
        {/* Interactive Graph Visualization */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Network className="w-7 h-7 mr-3 text-indigo-600" />
            Interactive Graph Types
          </h2>
          
          <div className="mb-6">
            <div className="flex space-x-4 mb-4">
              {Object.entries(graphExamples).map(([type, graph]) => (
                <button
                  key={type}
                  onClick={() => setActiveVisualization(type as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeVisualization === type
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {graph.title}
                </button>
              ))}
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{currentGraph.title}</h3>
              <p className="text-gray-600 mb-4">{currentGraph.description}</p>
              
              {/* SVG Graph Visualization */}
              <div className="bg-white rounded-lg p-4 border">
                <svg width="350" height="250" viewBox="0 0 350 250">
                  {/* Draw edges first (so they appear behind nodes) */}
                  {currentGraph.edges.map((edge, index) => {
                    const fromNode = currentGraph.nodes.find(n => n.id === edge.from);
                    const toNode = currentGraph.nodes.find(n => n.id === edge.to);
                    if (!fromNode || !toNode) return null;
                    
                    return (
                      <g key={index}>
                        <line
                          x1={fromNode.x}
                          y1={fromNode.y}
                          x2={toNode.x}
                          y2={toNode.y}
                          stroke="#6366f1"
                          strokeWidth="2"
                          markerEnd={activeVisualization === 'directed' ? "url(#arrowhead)" : ""}
                        />
                        {edge.weight && (
                          <text
                            x={(fromNode.x + toNode.x) / 2}
                            y={(fromNode.y + toNode.y) / 2 - 5}
                            textAnchor="middle"
                            fontSize="12"
                            fill="#4f46e5"
                            fontWeight="bold"
                          >
                            {edge.weight}
                          </text>
                        )}
                      </g>
                    );
                  })}
                  
                  {/* Arrow marker for directed graphs */}
                  {activeVisualization === 'directed' && (
                    <defs>
                      <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="7"
                        refX="9"
                        refY="3.5"
                        orient="auto"
                      >
                        <polygon
                          points="0 0, 10 3.5, 0 7"
                          fill="#6366f1"
                        />
                      </marker>
                    </defs>
                  )}
                  
                  {/* Draw nodes */}
                  {currentGraph.nodes.map((node) => (
                    <g key={node.id}>
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="20"
                        fill="#4f46e5"
                        stroke="#ffffff"
                        strokeWidth="3"
                      />
                      <text
                        x={node.x}
                        y={node.y + 5}
                        textAnchor="middle"
                        fontSize="14"
                        fontWeight="bold"
                        fill="white"
                      >
                        {node.id}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Graph Terminology */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Essential Graph Terminology</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="border-l-4 border-indigo-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900">Vertex (Node)</h3>
                <p className="text-gray-600 text-sm">A fundamental unit that represents an entity in the graph.</p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900">Edge</h3>
                <p className="text-gray-600 text-sm">A connection between two vertices, representing a relationship.</p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900">Degree</h3>
                <p className="text-gray-600 text-sm">The number of edges connected to a vertex.</p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900">Path</h3>
                <p className="text-gray-600 text-sm">A sequence of vertices connected by edges.</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900">Cycle</h3>
                <p className="text-gray-600 text-sm">A path that starts and ends at the same vertex.</p>
              </div>
              
              <div className="border-l-4 border-yellow-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900">Connected Graph</h3>
                <p className="text-gray-600 text-sm">A graph where every vertex is reachable from every other vertex.</p>
              </div>
              
              <div className="border-l-4 border-pink-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900">Subgraph</h3>
                <p className="text-gray-600 text-sm">A graph formed from a subset of vertices and edges.</p>
              </div>
              
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900">Complete Graph</h3>
                <p className="text-gray-600 text-sm">A graph where every vertex is connected to every other vertex.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Graph Representations */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Graph Representations</h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Adjacency Matrix */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <div className="w-3 h-3 bg-indigo-600 rounded-full mr-2"></div>
                Adjacency Matrix
              </h3>
              <p className="text-gray-600">A 2D array where entry (i,j) indicates if there's an edge between vertex i and j.</p>
              
              <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
                <table className="w-full text-center text-sm">
                  <thead>
                    <tr>
                      <th className="p-2 border-b border-gray-300"></th>
                      <th className="p-2 border-b border-gray-300 font-semibold">A</th>
                      <th className="p-2 border-b border-gray-300 font-semibold">B</th>
                      <th className="p-2 border-b border-gray-300 font-semibold">C</th>
                      <th className="p-2 border-b border-gray-300 font-semibold">D</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border-r border-gray-300 font-semibold">A</td>
                      <td className="p-2 bg-red-100">0</td>
                      <td className="p-2 bg-green-100">1</td>
                      <td className="p-2 bg-red-100">0</td>
                      <td className="p-2 bg-green-100">1</td>
                    </tr>
                    <tr>
                      <td className="p-2 border-r border-gray-300 font-semibold">B</td>
                      <td className="p-2 bg-green-100">1</td>
                      <td className="p-2 bg-red-100">0</td>
                      <td className="p-2 bg-green-100">1</td>
                      <td className="p-2 bg-red-100">0</td>
                    </tr>
                    <tr>
                      <td className="p-2 border-r border-gray-300 font-semibold">C</td>
                      <td className="p-2 bg-red-100">0</td>
                      <td className="p-2 bg-green-100">1</td>
                      <td className="p-2 bg-red-100">0</td>
                      <td className="p-2 bg-green-100">1</td>
                    </tr>
                    <tr>
                      <td className="p-2 border-r border-gray-300 font-semibold">D</td>
                      <td className="p-2 bg-green-100">1</td>
                      <td className="p-2 bg-red-100">0</td>
                      <td className="p-2 bg-green-100">1</td>
                      <td className="p-2 bg-red-100">0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="text-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-100 border mr-2"></div>
                    <span className="text-gray-600">Edge exists (1)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-100 border mr-2"></div>
                    <span className="text-gray-600">No edge (0)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Adjacency List */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <div className="w-3 h-3 bg-purple-600 rounded-full mr-2"></div>
                Adjacency List
              </h3>
              <p className="text-gray-600">An array of lists where each vertex stores a list of its adjacent vertices.</p>
              
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex items-center">
                  <span className="font-semibold text-indigo-600 w-8">A:</span>
                  <div className="flex space-x-2">
                    <span className="bg-indigo-100 px-2 py-1 rounded text-sm">B</span>
                    <span className="bg-indigo-100 px-2 py-1 rounded text-sm">D</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-purple-600 w-8">B:</span>
                  <div className="flex space-x-2">
                    <span className="bg-purple-100 px-2 py-1 rounded text-sm">A</span>
                    <span className="bg-purple-100 px-2 py-1 rounded text-sm">C</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-blue-600 w-8">C:</span>
                  <div className="flex space-x-2">
                    <span className="bg-blue-100 px-2 py-1 rounded text-sm">B</span>
                    <span className="bg-blue-100 px-2 py-1 rounded text-sm">D</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-green-600 w-8">D:</span>
                  <div className="flex space-x-2">
                    <span className="bg-green-100 px-2 py-1 rounded text-sm">A</span>
                    <span className="bg-green-100 px-2 py-1 rounded text-sm">C</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="mt-8 overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-left font-semibold">Aspect</th>
                  <th className="p-4 text-center font-semibold">Adjacency Matrix</th>
                  <th className="p-4 text-center font-semibold">Adjacency List</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-4 font-medium">Space Complexity</td>
                  <td className="p-4 text-center">O(V²)</td>
                  <td className="p-4 text-center">O(V + E)</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="p-4 font-medium">Edge Lookup</td>
                  <td className="p-4 text-center">O(1)</td>
                  <td className="p-4 text-center">O(degree)</td>
                </tr>
                <tr className="border-t">
                  <td className="p-4 font-medium">Add/Remove Edge</td>
                  <td className="p-4 text-center">O(1)</td>
                  <td className="p-4 text-center">O(1) / O(degree)</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="p-4 font-medium">Best for</td>
                  <td className="p-4 text-center">Dense graphs</td>
                  <td className="p-4 text-center">Sparse graphs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Real-World Examples */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Graphs in the Real World</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Social Networks</h3>
              <p className="text-gray-600 text-sm">
                People as vertices, friendships as edges. Used for friend recommendations and community detection.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Network className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Computer Networks</h3>
              <p className="text-gray-600 text-sm">
                Devices as vertices, connections as edges. Essential for routing and network topology design.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <ArrowRight className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Transportation</h3>
              <p className="text-gray-600 text-sm">
                Cities as vertices, roads/flights as edges. Powers GPS navigation and route optimization.
              </p>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Check Your Understanding</h2>
          
          <div className="space-y-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-xl">
              <h3 className="font-semibold text-gray-900 mb-2">Quick Quiz</h3>
              <p className="text-gray-700 mb-4">
                In a social network with 1000 users where each user has an average of 150 friends, 
                which representation would be more memory efficient?
              </p>
              <div className="space-y-2">
                <button className="block w-full text-left p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  A) Adjacency Matrix (1000 × 1000 = 1M entries)
                </button>
                <button className="block w-full text-left p-3 bg-green-50 border border-green-200 rounded-lg">
                  B) Adjacency List (1000 vertices + ~150K edges) ✓
                </button>
              </div>
              <p className="text-green-700 text-sm mt-2">
                Correct! The adjacency list uses O(V + E) = O(1000 + 150,000) space, 
                much less than the matrix's O(V²) = O(1,000,000) space.
              </p>
            </div>
          </div>
        </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-200">
          <Link 
            href="/learning-path/module-6" 
            className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Module 6
          </Link>
          <Link 
            href="/learning-path/module-6/traversal" 
            className="flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            Next: Graph Traversal
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}