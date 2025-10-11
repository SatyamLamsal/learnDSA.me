'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Network, Globe, ArrowRight, Play, ArrowLeft, Target, Clock, Users, Zap, Brain, Building } from 'lucide-react';

type ApplicationType = 'social-network' | 'recommendation' | 'dependency' | 'network-flow';

export default function GraphApplicationsPage() {
  const [activeDemo, setActiveDemo] = useState<ApplicationType>('social-network');

  const socialNetworkData = {
    nodes: [
      { id: 'Alice', x: 200, y: 100, connections: 4 },
      { id: 'Bob', x: 120, y: 180, connections: 3 },
      { id: 'Carol', x: 280, y: 180, connections: 2 },
      { id: 'Dave', x: 160, y: 260, connections: 2 },
      { id: 'Eve', x: 240, y: 260, connections: 1 }
    ],
    edges: [
      { from: 'Alice', to: 'Bob' },
      { from: 'Alice', to: 'Carol' },
      { from: 'Bob', to: 'Dave' },
      { from: 'Carol', to: 'Eve' },
      { from: 'Dave', to: 'Eve' }
    ]
  };

  const dependencyData = {
    nodes: [
      { id: 'App', x: 200, y: 80, level: 0 },
      { id: 'UI', x: 120, y: 160, level: 1 },
      { id: 'Auth', x: 280, y: 160, level: 1 },
      { id: 'Utils', x: 80, y: 240, level: 2 },
      { id: 'HTTP', x: 200, y: 240, level: 2 },
      { id: 'DB', x: 320, y: 240, level: 2 }
    ],
    edges: [
      { from: 'App', to: 'UI' },
      { from: 'App', to: 'Auth' },
      { from: 'UI', to: 'Utils' },
      { from: 'UI', to: 'HTTP' },
      { from: 'Auth', to: 'HTTP' },
      { from: 'Auth', to: 'DB' }
    ]
  };

  const getNodeColor = (nodeType: string) => {
    switch (nodeType) {
      case 'social': return '#10b981';
      case 'dependency': return '#6366f1';
      default: return '#6b7280';
    }
  };

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
              90 minutes
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Network className="w-8 h-8 mr-3 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">Graph Applications</h1>
          </div>
          <p className="text-lg text-gray-600">
            Explore real-world applications where graphs solve complex problems
          </p>
        </div>

        <div className="space-y-8">
          {/* Interactive Applications Demo */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Globe className="w-7 h-7 mr-3 text-green-600" />
              Interactive Applications
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Demo Selection */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <button
                    onClick={() => setActiveDemo('social-network')}
                    className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                      activeDemo === 'social-network'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Users className="w-4 h-4 mx-auto mb-1" />
                    Social Network
                  </button>
                  <button
                    onClick={() => setActiveDemo('recommendation')}
                    className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                      activeDemo === 'recommendation'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Brain className="w-4 h-4 mx-auto mb-1" />
                    Recommendations
                  </button>
                  <button
                    onClick={() => setActiveDemo('dependency')}
                    className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                      activeDemo === 'dependency'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Building className="w-4 h-4 mx-auto mb-1" />
                    Dependencies
                  </button>
                  <button
                    onClick={() => setActiveDemo('network-flow')}
                    className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                      activeDemo === 'network-flow'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Zap className="w-4 h-4 mx-auto mb-1" />
                    Network Flow
                  </button>
                </div>

                {/* Application Details */}
                <div className="bg-gray-50 rounded-lg p-4">
                  {activeDemo === 'social-network' && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Social Network Analysis</h3>
                      <p className="text-gray-700 text-sm mb-3">
                        Find mutual friends, suggest connections, and analyze influence.
                      </p>
                      <div className="space-y-2 text-sm">
                        <div><strong>Graph Type:</strong> Undirected, Unweighted</div>
                        <div><strong>Key Algorithms:</strong> BFS, Connected Components</div>
                        <div><strong>Metrics:</strong> Centrality, Clustering Coefficient</div>
                      </div>
                    </div>
                  )}

                  {activeDemo === 'recommendation' && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Recommendation Systems</h3>
                      <p className="text-gray-700 text-sm mb-3">
                        Suggest products, friends, or content based on graph patterns.
                      </p>
                      <div className="space-y-2 text-sm">
                        <div><strong>Graph Type:</strong> Bipartite (Users-Items)</div>
                        <div><strong>Key Algorithms:</strong> Random Walk, PageRank</div>
                        <div><strong>Applications:</strong> Netflix, Amazon, Spotify</div>
                      </div>
                    </div>
                  )}

                  {activeDemo === 'dependency' && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Dependency Resolution</h3>
                      <p className="text-gray-700 text-sm mb-3">
                        Determine build order and detect circular dependencies.
                      </p>
                      <div className="space-y-2 text-sm">
                        <div><strong>Graph Type:</strong> Directed Acyclic Graph (DAG)</div>
                        <div><strong>Key Algorithms:</strong> Topological Sort, DFS</div>
                        <div><strong>Applications:</strong> Package managers, Build systems</div>
                      </div>
                    </div>
                  )}

                  {activeDemo === 'network-flow' && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Network Flow Problems</h3>
                      <p className="text-gray-700 text-sm mb-3">
                        Optimize resource allocation and find maximum flow.
                      </p>
                      <div className="space-y-2 text-sm">
                        <div><strong>Graph Type:</strong> Directed, Weighted (Capacities)</div>
                        <div><strong>Key Algorithms:</strong> Ford-Fulkerson, Edmonds-Karp</div>
                        <div><strong>Applications:</strong> Transportation, Network routing</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Visualization */}
              <div className="bg-gray-50 rounded-xl p-6">
                {activeDemo === 'social-network' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-center">Social Network Graph</h3>
                    <svg width="400" height="320" viewBox="0 0 400 320" className="mx-auto">
                      {/* Draw edges */}
                      {socialNetworkData.edges.map((edge, index) => {
                        const fromNode = socialNetworkData.nodes.find(n => n.id === edge.from);
                        const toNode = socialNetworkData.nodes.find(n => n.id === edge.to);
                        if (!fromNode || !toNode) return null;
                        
                        return (
                          <line
                            key={index}
                            x1={fromNode.x}
                            y1={fromNode.y}
                            x2={toNode.x}
                            y2={toNode.y}
                            stroke="#10b981"
                            strokeWidth="2"
                          />
                        );
                      })}
                      
                      {/* Draw nodes */}
                      {socialNetworkData.nodes.map((node) => (
                        <g key={node.id}>
                          <circle
                            cx={node.x}
                            cy={node.y}
                            r={15 + node.connections * 3}
                            fill="#10b981"
                            stroke="#ffffff"
                            strokeWidth="3"
                          />
                          <text
                            x={node.x}
                            y={node.y + 4}
                            textAnchor="middle"
                            fontSize="12"
                            fontWeight="bold"
                            fill="white"
                          >
                            {node.id.charAt(0)}
                          </text>
                          <text
                            x={node.x}
                            y={node.y + 40}
                            textAnchor="middle"
                            fontSize="10"
                            fill="#374151"
                          >
                            {node.id}
                          </text>
                        </g>
                      ))}
                    </svg>
                    <p className="text-center text-sm text-gray-600 mt-2">
                      Node size represents connection count (influence)
                    </p>
                  </div>
                )}

                {activeDemo === 'dependency' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-center">Dependency Graph</h3>
                    <svg width="400" height="320" viewBox="0 0 400 320" className="mx-auto">
                      {/* Draw edges with arrows */}
                      {dependencyData.edges.map((edge, index) => {
                        const fromNode = dependencyData.nodes.find(n => n.id === edge.from);
                        const toNode = dependencyData.nodes.find(n => n.id === edge.to);
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
                              markerEnd="url(#arrowhead)"
                            />
                          </g>
                        );
                      })}
                      
                      {/* Arrow marker definition */}
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
                      
                      {/* Draw nodes */}
                      {dependencyData.nodes.map((node) => (
                        <g key={node.id}>
                          <rect
                            x={node.x - 25}
                            y={node.y - 15}
                            width="50"
                            height="30"
                            rx="8"
                            fill="#6366f1"
                            stroke="#ffffff"
                            strokeWidth="2"
                          />
                          <text
                            x={node.x}
                            y={node.y + 4}
                            textAnchor="middle"
                            fontSize="12"
                            fontWeight="bold"
                            fill="white"
                          >
                            {node.id}
                          </text>
                        </g>
                      ))}
                    </svg>
                    <p className="text-center text-sm text-gray-600 mt-2">
                      Build order: App → UI/Auth → Utils/HTTP/DB
                    </p>
                  </div>
                )}

                {(activeDemo === 'recommendation' || activeDemo === 'network-flow') && (
                  <div className="flex items-center justify-center h-80">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Brain className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {activeDemo === 'recommendation' ? 'Recommendation Engine' : 'Network Flow Optimization'}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {activeDemo === 'recommendation' 
                          ? 'Complex bipartite graphs connecting users to items with weighted preferences'
                          : 'Flow networks with capacity constraints and source-sink optimization'
                        }
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Major Application Categories */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Major Application Categories</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Web & Internet */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                <div className="flex items-center mb-3">
                  <Globe className="w-6 h-6 text-blue-600 mr-2" />
                  <h3 className="font-semibold text-blue-900">Web & Internet</h3>
                </div>
                <ul className="space-y-2 text-blue-800 text-sm">
                  <li>• Web crawling and indexing</li>
                  <li>• PageRank algorithm</li>
                  <li>• Link analysis</li>
                  <li>• Internet routing protocols</li>
                  <li>• DNS resolution</li>
                </ul>
              </div>

              {/* Social Networks */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                <div className="flex items-center mb-3">
                  <Users className="w-6 h-6 text-green-600 mr-2" />
                  <h3 className="font-semibold text-green-900">Social Networks</h3>
                </div>
                <ul className="space-y-2 text-green-800 text-sm">
                  <li>• Friend recommendations</li>
                  <li>• Community detection</li>
                  <li>• Influence propagation</li>
                  <li>• Social media analytics</li>
                  <li>• Network visualization</li>
                </ul>
              </div>

              {/* Transportation */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                <div className="flex items-center mb-3">
                  <Target className="w-6 h-6 text-purple-600 mr-2" />
                  <h3 className="font-semibold text-purple-900">Transportation</h3>
                </div>
                <ul className="space-y-2 text-purple-800 text-sm">
                  <li>• GPS navigation</li>
                  <li>• Traffic optimization</li>
                  <li>• Route planning</li>
                  <li>• Public transit systems</li>
                  <li>• Supply chain logistics</li>
                </ul>
              </div>

              {/* Computer Science */}
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6">
                <div className="flex items-center mb-3">
                  <Brain className="w-6 h-6 text-indigo-600 mr-2" />
                  <h3 className="font-semibold text-indigo-900">Computer Science</h3>
                </div>
                <ul className="space-y-2 text-indigo-800 text-sm">
                  <li>• Compiler design</li>
                  <li>• Dependency resolution</li>
                  <li>• Database query optimization</li>
                  <li>• Circuit design</li>
                  <li>• Operating system scheduling</li>
                </ul>
              </div>

              {/* Biology & Chemistry */}
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-6">
                <div className="flex items-center mb-3">
                  <Zap className="w-6 h-6 text-teal-600 mr-2" />
                  <h3 className="font-semibold text-teal-900">Biology & Chemistry</h3>
                </div>
                <ul className="space-y-2 text-teal-800 text-sm">
                  <li>• Protein structure analysis</li>
                  <li>• Gene regulatory networks</li>
                  <li>• Drug discovery</li>
                  <li>• Molecular interactions</li>
                  <li>• Phylogenetic trees</li>
                </ul>
              </div>

              {/* Business & Finance */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6">
                <div className="flex items-center mb-3">
                  <Building className="w-6 h-6 text-orange-600 mr-2" />
                  <h3 className="font-semibold text-orange-900">Business & Finance</h3>
                </div>
                <ul className="space-y-2 text-orange-800 text-sm">
                  <li>• Fraud detection</li>
                  <li>• Risk assessment</li>
                  <li>• Market analysis</li>
                  <li>• Organizational structures</li>
                  <li>• Project dependencies</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Advanced Graph Problems */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Advanced Graph Problems</h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* NP-Hard Problems */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">NP-Hard Graph Problems</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-medium text-red-800">Traveling Salesman Problem (TSP)</h4>
                    <p className="text-red-700 text-sm">Find shortest route visiting all cities exactly once</p>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-medium text-orange-800">Graph Coloring</h4>
                    <p className="text-orange-700 text-sm">Assign colors to vertices so no adjacent vertices share colors</p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h4 className="font-medium text-yellow-800">Maximum Clique</h4>
                    <p className="text-yellow-700 text-sm">Find largest complete subgraph</p>
                  </div>
                  <div className="border-l-4 border-pink-500 pl-4">
                    <h4 className="font-medium text-pink-800">Hamiltonian Path</h4>
                    <p className="text-pink-700 text-sm">Find path visiting each vertex exactly once</p>
                  </div>
                </div>
              </div>

              {/* Polynomial Solutions */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Efficiently Solvable Problems</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-medium text-green-800">Minimum Spanning Tree</h4>
                    <p className="text-green-700 text-sm">Kruskal's or Prim's algorithm - O(E log V)</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium text-blue-800">Maximum Flow</h4>
                    <p className="text-blue-700 text-sm">Ford-Fulkerson algorithm - O(E²V)</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-medium text-purple-800">Bipartite Matching</h4>
                    <p className="text-purple-700 text-sm">Hungarian algorithm - O(V³)</p>
                  </div>
                  <div className="border-l-4 border-indigo-500 pl-4">
                    <h4 className="font-medium text-indigo-800">Strongly Connected Components</h4>
                    <p className="text-indigo-700 text-sm">Tarjan's algorithm - O(V + E)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Industry Case Studies */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Industry Case Studies</h2>
            
            <div className="space-y-6">
              {/* Google PageRank */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">Google PageRank</h3>
                    <p className="text-blue-800 mb-3">
                      Revolutionary algorithm that ranks web pages based on link structure, treating the web as a massive directed graph.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong className="text-blue-900">Graph Model:</strong>
                        <p className="text-blue-700">Web pages as nodes, hyperlinks as edges</p>
                      </div>
                      <div>
                        <strong className="text-blue-900">Algorithm:</strong>
                        <p className="text-blue-700">Random walk with damping factor</p>
                      </div>
                    </div>
                  </div>
                  <Globe className="w-12 h-12 text-blue-600 ml-4" />
                </div>
              </div>

              {/* Facebook Social Graph */}
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-green-900 mb-2">Facebook Social Graph</h3>
                    <p className="text-green-800 mb-3">
                      Manages billions of users and their relationships, enabling friend suggestions, news feed ranking, and targeted advertising.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong className="text-green-900">Scale:</strong>
                        <p className="text-green-700">3+ billion nodes, 200+ billion edges</p>
                      </div>
                      <div>
                        <strong className="text-green-900">Applications:</strong>
                        <p className="text-green-700">Recommendations, privacy, community detection</p>
                      </div>
                    </div>
                  </div>
                  <Users className="w-12 h-12 text-green-600 ml-4" />
                </div>
              </div>

              {/* Uber/Lyft Route Optimization */}
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-purple-900 mb-2">Ride-sharing Route Optimization</h3>
                    <p className="text-purple-800 mb-3">
                      Real-time route planning considering traffic, driver locations, and passenger destinations using dynamic graph algorithms.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong className="text-purple-900">Challenge:</strong>
                        <p className="text-purple-700">Dynamic weights, real-time updates</p>
                      </div>
                      <div>
                        <strong className="text-purple-900">Solution:</strong>
                        <p className="text-purple-700">Modified Dijkstra's with heuristics</p>
                      </div>
                    </div>
                  </div>
                  <Target className="w-12 h-12 text-purple-600 ml-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-200">
          <Link 
            href="/learning-path/module-6/shortest-paths" 
            className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Previous: Shortest Paths
          </Link>
          <Link 
            href="/learning-path/module-7" 
            className="flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            Next: Module 7 - Hash Tables
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}