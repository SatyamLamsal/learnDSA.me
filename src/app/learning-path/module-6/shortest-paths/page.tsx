'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navigation, Route, ArrowRight, Play, ArrowLeft, Target, Clock, Zap } from 'lucide-react';

type AlgorithmType = 'dijkstra' | 'bellman-ford' | 'floyd-warshall';

interface Node {
  id: string;
  x: number;
  y: number;
  distance?: number;
  isSource?: boolean;
  isTarget?: boolean;
}

interface Edge {
  from: string;
  to: string;
  weight: number;
  isPartOfPath?: boolean;
}

export default function ShortestPathsPage() {
  const [activeAlgorithm, setActiveAlgorithm] = useState<AlgorithmType>('dijkstra');
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const graphData = {
    nodes: [
      { id: 'A', x: 80, y: 120, isSource: true, distance: 0 },
      { id: 'B', x: 200, y: 80 },
      { id: 'C', x: 200, y: 160 },
      { id: 'D', x: 320, y: 80 },
      { id: 'E', x: 320, y: 160, isTarget: true },
      { id: 'F', x: 440, y: 120 }
    ] as Node[],
    edges: [
      { from: 'A', to: 'B', weight: 4 },
      { from: 'A', to: 'C', weight: 2 },
      { from: 'B', to: 'D', weight: 3 },
      { from: 'B', to: 'C', weight: 1 },
      { from: 'C', to: 'E', weight: 4 },
      { from: 'D', to: 'E', weight: 2 },
      { from: 'D', to: 'F', weight: 6 },
      { from: 'E', to: 'F', weight: 1 }
    ] as Edge[]
  };

  const getNodeColor = (node: Node) => {
    if (node.isSource) return '#10b981'; // Green for source
    if (node.isTarget) return '#ef4444'; // Red for target
    if (node.distance !== undefined && node.distance < Infinity) return '#6366f1'; // Blue for processed
    return '#9ca3af'; // Gray for unprocessed
  };

  const getEdgeColor = (edge: Edge) => {
    return edge.isPartOfPath ? '#ef4444' : '#6b7280';
  };

  const resetAnimation = () => {
    setCurrentStep(0);
    setIsAnimating(false);
    // Reset node distances and edge highlights
    graphData.nodes.forEach(node => {
      if (!node.isSource) node.distance = undefined;
    });
    graphData.edges.forEach(edge => {
      edge.isPartOfPath = false;
    });
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
              75 minutes
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Navigation className="w-8 h-8 mr-3 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Shortest Path Algorithms</h1>
          </div>
          <p className="text-lg text-gray-600">
            Learn how to find the shortest paths in weighted graphs using classic algorithms
          </p>
        </div>

        <div className="space-y-8">
          {/* Interactive Visualization */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Route className="w-7 h-7 mr-3 text-blue-600" />
              Interactive Shortest Path Finder
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Controls */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  <button
                    onClick={() => setActiveAlgorithm('dijkstra')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeAlgorithm === 'dijkstra'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Dijkstra's
                  </button>
                  <button
                    onClick={() => setActiveAlgorithm('bellman-ford')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeAlgorithm === 'bellman-ford'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Bellman-Ford
                  </button>
                  <button
                    onClick={() => setActiveAlgorithm('floyd-warshall')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeAlgorithm === 'floyd-warshall'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Floyd-Warshall
                  </button>
                </div>
                
                <div className="flex space-x-4">
                  <button
                    onClick={() => {/* Implement animation */}}
                    disabled={isAnimating}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isAnimating ? 'Running...' : 'Find Shortest Path'}
                  </button>
                  <button
                    onClick={resetAnimation}
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Reset
                  </button>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Algorithm Summary:</h3>
                  
                  {activeAlgorithm === 'dijkstra' && (
                    <div className="space-y-2 text-sm">
                      <p><strong>Purpose:</strong> Single-source shortest paths</p>
                      <p><strong>Constraint:</strong> Non-negative edge weights</p>
                      <p><strong>Time:</strong> O((V + E) log V) with min-heap</p>
                      <p><strong>Space:</strong> O(V)</p>
                    </div>
                  )}
                  
                  {activeAlgorithm === 'bellman-ford' && (
                    <div className="space-y-2 text-sm">
                      <p><strong>Purpose:</strong> Single-source shortest paths</p>
                      <p><strong>Constraint:</strong> Handles negative weights</p>
                      <p><strong>Time:</strong> O(V × E)</p>
                      <p><strong>Space:</strong> O(V)</p>
                    </div>
                  )}
                  
                  {activeAlgorithm === 'floyd-warshall' && (
                    <div className="space-y-2 text-sm">
                      <p><strong>Purpose:</strong> All-pairs shortest paths</p>
                      <p><strong>Constraint:</strong> Handles negative weights</p>
                      <p><strong>Time:</strong> O(V³)</p>
                      <p><strong>Space:</strong> O(V²)</p>
                    </div>
                  )}
                </div>

                <div className="text-sm">
                  <div className="flex items-center space-x-4 mb-2">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-gray-600">Source (A)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                      <span className="text-gray-600">Target (F)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-gray-600">Processed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Graph Visualization */}
              <div className="bg-gray-50 rounded-xl p-6">
                <svg width="520" height="240" viewBox="0 0 520 240" className="mx-auto">
                  {/* Draw edges with weights */}
                  {graphData.edges.map((edge, index) => {
                    const fromNode = graphData.nodes.find(n => n.id === edge.from);
                    const toNode = graphData.nodes.find(n => n.id === edge.to);
                    if (!fromNode || !toNode) return null;
                    
                    const midX = (fromNode.x + toNode.x) / 2;
                    const midY = (fromNode.y + toNode.y) / 2;
                    
                    return (
                      <g key={index}>
                        <line
                          x1={fromNode.x}
                          y1={fromNode.y}
                          x2={toNode.x}
                          y2={toNode.y}
                          stroke={getEdgeColor(edge)}
                          strokeWidth={edge.isPartOfPath ? "4" : "2"}
                          className="transition-all duration-500"
                        />
                        {/* Weight label */}
                        <circle
                          cx={midX}
                          cy={midY}
                          r="12"
                          fill="white"
                          stroke="#e5e7eb"
                          strokeWidth="2"
                        />
                        <text
                          x={midX}
                          y={midY + 4}
                          textAnchor="middle"
                          fontSize="12"
                          fontWeight="bold"
                          fill="#374151"
                        >
                          {edge.weight}
                        </text>
                      </g>
                    );
                  })}
                  
                  {/* Draw nodes */}
                  {graphData.nodes.map((node) => (
                    <g key={node.id}>
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="25"
                        fill={getNodeColor(node)}
                        stroke="#ffffff"
                        strokeWidth="3"
                        className="transition-colors duration-500"
                      />
                      <text
                        x={node.x}
                        y={node.y + 6}
                        textAnchor="middle"
                        fontSize="16"
                        fontWeight="bold"
                        fill="white"
                      >
                        {node.id}
                      </text>
                      {/* Distance label */}
                      {node.distance !== undefined && (
                        <text
                          x={node.x}
                          y={node.y - 35}
                          textAnchor="middle"
                          fontSize="12"
                          fontWeight="bold"
                          fill="#374151"
                        >
                          d: {node.distance === Infinity ? '∞' : node.distance}
                        </text>
                      )}
                    </g>
                  ))}
                </svg>
              </div>
            </div>
          </div>

          {/* Algorithm Comparison */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Algorithm Comparison</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Algorithm</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Time Complexity</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Space</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Negative Weights</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 font-medium text-blue-600">Dijkstra's</td>
                    <td className="py-4 px-4 text-gray-700">Single-source</td>
                    <td className="py-4 px-4 text-gray-700">O((V+E) log V)</td>
                    <td className="py-4 px-4 text-gray-700">O(V)</td>
                    <td className="py-4 px-4 text-red-600">No</td>
                    <td className="py-4 px-4 text-gray-700">GPS, routing</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 font-medium text-green-600">Bellman-Ford</td>
                    <td className="py-4 px-4 text-gray-700">Single-source</td>
                    <td className="py-4 px-4 text-gray-700">O(V × E)</td>
                    <td className="py-4 px-4 text-gray-700">O(V)</td>
                    <td className="py-4 px-4 text-green-600">Yes</td>
                    <td className="py-4 px-4 text-gray-700">Currency exchange</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 font-medium text-purple-600">Floyd-Warshall</td>
                    <td className="py-4 px-4 text-gray-700">All-pairs</td>
                    <td className="py-4 px-4 text-gray-700">O(V³)</td>
                    <td className="py-4 px-4 text-gray-700">O(V²)</td>
                    <td className="py-4 px-4 text-green-600">Yes</td>
                    <td className="py-4 px-4 text-gray-700">Dense graphs</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Dijkstra's Algorithm Deep Dive */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Zap className="w-7 h-7 mr-3 text-blue-600" />
              Dijkstra's Algorithm Deep Dive
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* How it Works */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">How It Works</h3>
                <ol className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="bg-blue-100 text-blue-800 text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">1</span>
                    Initialize distances: source = 0, all others = ∞
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 text-blue-800 text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">2</span>
                    Create a min-heap with all vertices
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 text-blue-800 text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">3</span>
                    Extract vertex with minimum distance
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 text-blue-800 text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">4</span>
                    Update distances to all neighbors
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 text-blue-800 text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">5</span>
                    Repeat until all vertices processed
                  </li>
                </ol>
              </div>

              {/* Key Insights */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <Target className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span><strong>Greedy Choice:</strong> Always picks the closest unvisited vertex</span>
                  </li>
                  <li className="flex items-start">
                    <Target className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span><strong>Relaxation:</strong> Updates distances when shorter path found</span>
                  </li>
                  <li className="flex items-start">
                    <Target className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span><strong>Optimal Substructure:</strong> Shortest path contains shortest subpaths</span>
                  </li>
                  <li className="flex items-start">
                    <Target className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span><strong>Non-negative:</strong> Requires all edge weights ≥ 0</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Pseudocode */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Dijkstra's Pseudocode</h3>
              <div className="bg-gray-900 rounded-lg p-6 text-sm font-mono text-green-400 overflow-x-auto">
                <pre>{`function dijkstra(graph, source):
    // Initialize distances and visited set
    distances = {}
    visited = set()
    pq = MinHeap()  // Priority queue
    
    // Set all distances to infinity, source to 0
    for each vertex v in graph:
        distances[v] = INFINITY
    distances[source] = 0
    pq.insert(source, 0)
    
    while pq is not empty:
        current = pq.extractMin()
        
        if current in visited:
            continue
            
        visited.add(current)
        
        // Relax all neighbors
        for each neighbor of current:
            weight = graph.getWeight(current, neighbor)
            newDistance = distances[current] + weight
            
            if newDistance < distances[neighbor]:
                distances[neighbor] = newDistance
                pq.insert(neighbor, newDistance)
    
    return distances`}</pre>
              </div>
            </div>
          </div>

          {/* Applications */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Real-World Applications</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                <h3 className="font-semibold text-blue-900 mb-3">GPS Navigation</h3>
                <p className="text-blue-800 text-sm mb-3">
                  Finding shortest routes between locations considering road weights (distance, time, traffic).
                </p>
                <div className="text-xs text-blue-700">
                  <strong>Algorithm:</strong> Dijkstra's with dynamic weights
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                <h3 className="font-semibold text-green-900 mb-3">Network Routing</h3>
                <p className="text-green-800 text-sm mb-3">
                  Internet packet routing protocols like OSPF use shortest path algorithms.
                </p>
                <div className="text-xs text-green-700">
                  <strong>Algorithm:</strong> Dijkstra's with link costs
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                <h3 className="font-semibold text-purple-900 mb-3">Social Networks</h3>
                <p className="text-purple-800 text-sm mb-3">
                  Finding degrees of separation and suggesting connections between users.
                </p>
                <div className="text-xs text-purple-700">
                  <strong>Algorithm:</strong> BFS for unweighted, Dijkstra's for weighted
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-200">
          <Link 
            href="/learning-path/module-6/traversal" 
            className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Previous: Graph Traversal
          </Link>
          <Link 
            href="/learning-path/module-6/applications" 
            className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Next: Graph Applications
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}