'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Users, ArrowRight, Play, ArrowLeft, Target, Info, Clock } from 'lucide-react';

type TraversalType = 'dfs' | 'bfs';

interface Node {
  id: string;
  x: number;
  y: number;
  visited?: boolean;
  visiting?: boolean;
}

interface Edge {
  from: string;
  to: string;
}

export default function GraphTraversalPage() {
  const [activeAlgorithm, setActiveAlgorithm] = useState<TraversalType>('dfs');
  const [isAnimating, setIsAnimating] = useState(false);
  const [visitedNodes, setVisitedNodes] = useState<string[]>([]);
  const [currentNode, setCurrentNode] = useState<string>('');

  const graphData = {
    nodes: [
      { id: 'A', x: 150, y: 80 },
      { id: 'B', x: 80, y: 150 },
      { id: 'C', x: 220, y: 150 },
      { id: 'D', x: 80, y: 220 },
      { id: 'E', x: 220, y: 220 },
      { id: 'F', x: 150, y: 290 }
    ] as Node[],
    edges: [
      { from: 'A', to: 'B' },
      { from: 'A', to: 'C' },
      { from: 'B', to: 'D' },
      { from: 'C', to: 'E' },
      { from: 'D', to: 'F' },
      { from: 'E', to: 'F' }
    ] as Edge[]
  };

  const resetAnimation = () => {
    setVisitedNodes([]);
    setCurrentNode('');
    setIsAnimating(false);
  };

  const animateTraversal = async (algorithm: TraversalType) => {
    if (isAnimating) return;
    
    resetAnimation();
    setIsAnimating(true);

    const visited = new Set<string>();
    const sequence: string[] = [];

    if (algorithm === 'dfs') {
      // DFS Animation
      const dfs = async (nodeId: string) => {
        if (visited.has(nodeId)) return;
        
        visited.add(nodeId);
        sequence.push(nodeId);
        setCurrentNode(nodeId);
        setVisitedNodes([...sequence]);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Find neighbors
        const neighbors = graphData.edges
          .filter(edge => edge.from === nodeId || edge.to === nodeId)
          .map(edge => edge.from === nodeId ? edge.to : edge.from)
          .filter(neighbor => !visited.has(neighbor));
        
        for (const neighbor of neighbors) {
          await dfs(neighbor);
        }
      };
      
      await dfs('A');
    } else {
      // BFS Animation
      const queue = ['A'];
      visited.add('A');
      
      while (queue.length > 0) {
        const nodeId = queue.shift()!;
        sequence.push(nodeId);
        setCurrentNode(nodeId);
        setVisitedNodes([...sequence]);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Find neighbors
        const neighbors = graphData.edges
          .filter(edge => edge.from === nodeId || edge.to === nodeId)
          .map(edge => edge.from === nodeId ? edge.to : edge.from)
          .filter(neighbor => !visited.has(neighbor));
        
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            queue.push(neighbor);
          }
        }
      }
    }
    
    setCurrentNode('');
    setIsAnimating(false);
  };

  const getNodeColor = (nodeId: string) => {
    if (currentNode === nodeId) return '#ef4444'; // Red for current
    if (visitedNodes.includes(nodeId)) return '#10b981'; // Green for visited
    return '#6366f1'; // Blue for unvisited
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
              60 minutes
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <MapPin className="w-8 h-8 mr-3 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900">Graph Traversal</h1>
          </div>
          <p className="text-lg text-gray-600">
            Master DFS and BFS - the fundamental algorithms for exploring graphs
          </p>
        </div>

        <div className="space-y-8">
          {/* Interactive Traversal Visualization */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Play className="w-7 h-7 mr-3 text-purple-600" />
              Interactive Graph Traversal
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Controls */}
              <div className="space-y-4">
                <div className="flex space-x-4 mb-4">
                  <button
                    onClick={() => setActiveAlgorithm('dfs')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeAlgorithm === 'dfs'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Depth-First Search (DFS)
                  </button>
                  <button
                    onClick={() => setActiveAlgorithm('bfs')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeAlgorithm === 'bfs'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Breadth-First Search (BFS)
                  </button>
                </div>
                
                <div className="flex space-x-4">
                  <button
                    onClick={() => animateTraversal(activeAlgorithm)}
                    disabled={isAnimating}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isAnimating ? 'Running...' : 'Start Animation'}
                  </button>
                  <button
                    onClick={resetAnimation}
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Reset
                  </button>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Traversal Order:</h3>
                  <div className="flex flex-wrap gap-2">
                    {visitedNodes.map((nodeId, index) => (
                      <span
                        key={nodeId}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-lg text-sm font-medium"
                      >
                        {index + 1}. {nodeId}
                      </span>
                    ))}
                  </div>
                  {currentNode && (
                    <div className="mt-2">
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-lg text-sm font-medium">
                        Currently visiting: {currentNode}
                      </span>
                    </div>
                  )}
                </div>

                <div className="text-sm">
                  <div className="flex items-center space-x-4 mb-2">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-gray-600">Unvisited</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                      <span className="text-gray-600">Current</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-gray-600">Visited</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Graph Visualization */}
              <div className="bg-gray-50 rounded-xl p-6">
                <svg width="320" height="380" viewBox="0 0 320 380" className="mx-auto">
                  {/* Draw edges */}
                  {graphData.edges.map((edge, index) => {
                    const fromNode = graphData.nodes.find(n => n.id === edge.from);
                    const toNode = graphData.nodes.find(n => n.id === edge.to);
                    if (!fromNode || !toNode) return null;
                    
                    return (
                      <line
                        key={index}
                        x1={fromNode.x}
                        y1={fromNode.y}
                        x2={toNode.x}
                        y2={toNode.y}
                        stroke="#9ca3af"
                        strokeWidth="2"
                      />
                    );
                  })}
                  
                  {/* Draw nodes */}
                  {graphData.nodes.map((node) => (
                    <g key={node.id}>
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="25"
                        fill={getNodeColor(node.id)}
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
                    </g>
                  ))}
                </svg>
              </div>
            </div>
          </div>

          {/* Algorithm Comparison */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">DFS vs BFS Comparison</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* DFS */}
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Depth-First Search (DFS)</h3>
                <p className="text-gray-600 mb-4">
                  Explores as far as possible along each branch before backtracking.
                </p>
                
                <div className="space-y-3">
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-purple-800 text-sm mb-1">Algorithm</h4>
                    <p className="text-purple-700 text-sm">Uses a stack (or recursion). Go deep first, then backtrack when stuck.</p>
                  </div>
                  
                  <div className="bg-green-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-green-800 text-sm mb-1">Time & Space</h4>
                    <p className="text-green-700 text-sm">O(V + E) time, O(V) space for recursion stack</p>
                  </div>
                  
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-blue-800 text-sm mb-1">Best For</h4>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Topological sorting</li>
                      <li>• Cycle detection</li>
                      <li>• Path finding (any path)</li>
                      <li>• Connected components</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* BFS */}
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Breadth-First Search (BFS)</h3>
                <p className="text-gray-600 mb-4">
                  Explores all neighbors at the current depth before moving to the next level.
                </p>
                
                <div className="space-y-3">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-blue-800 text-sm mb-1">Algorithm</h4>
                    <p className="text-blue-700 text-sm">Uses a queue. Explore level by level, breadth first.</p>
                  </div>
                  
                  <div className="bg-green-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-green-800 text-sm mb-1">Time & Space</h4>
                    <p className="text-green-700 text-sm">O(V + E) time, O(V) space for queue</p>
                  </div>
                  
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-orange-800 text-sm mb-1">Best For</h4>
                    <ul className="text-orange-700 text-sm space-y-1">
                      <li>• Shortest path (unweighted)</li>
                      <li>• Level-order traversal</li>
                      <li>• Connected components</li>
                      <li>• Bipartite testing</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pseudocode */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Implementation</h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* DFS Pseudocode */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">DFS Pseudocode</h3>
                <div className="bg-gray-900 rounded-lg p-4 text-sm font-mono text-green-400 overflow-x-auto">
                  <pre>{`function DFS(graph, start):
    visited = set()
    stack = [start]
    
    while stack is not empty:
        node = stack.pop()
        
        if node not in visited:
            visited.add(node)
            process(node)
            
            for neighbor in graph[node]:
                if neighbor not in visited:
                    stack.push(neighbor)

// Recursive version
function DFS_Recursive(graph, node, visited):
    visited.add(node)
    process(node)
    
    for neighbor in graph[node]:
        if neighbor not in visited:
            DFS_Recursive(graph, neighbor, visited)`}</pre>
                </div>
              </div>

              {/* BFS Pseudocode */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">BFS Pseudocode</h3>
                <div className="bg-gray-900 rounded-lg p-4 text-sm font-mono text-blue-400 overflow-x-auto">
                  <pre>{`function BFS(graph, start):
    visited = set()
    queue = [start]
    visited.add(start)
    
    while queue is not empty:
        node = queue.dequeue()
        process(node)
        
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.enqueue(neighbor)

// Distance tracking version
function BFS_Distances(graph, start):
    distances = {start: 0}
    queue = [start]
    
    while queue is not empty:
        node = queue.dequeue()
        
        for neighbor in graph[node]:
            if neighbor not in distances:
                distances[neighbor] = distances[node] + 1
                queue.enqueue(neighbor)`}</pre>
                </div>
              </div>
            </div>
          </div>

          {/* Applications */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Real-World Applications</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <h3 className="font-semibold text-purple-800 mb-2">DFS Applications</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex items-start">
                      <Target className="w-4 h-4 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                      Maze solving and pathfinding
                    </li>
                    <li className="flex items-start">
                      <Target className="w-4 h-4 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                      Topological sorting for scheduling
                    </li>
                    <li className="flex items-start">
                      <Target className="w-4 h-4 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                      Detecting cycles in graphs
                    </li>
                    <li className="flex items-start">
                      <Target className="w-4 h-4 text-purple-600 mt-0.5 mr-2 flex-shrink-0" />
                      Finding strongly connected components
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <h3 className="font-semibold text-blue-800 mb-2">BFS Applications</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex items-start">
                      <Target className="w-4 h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                      Shortest path in unweighted graphs
                    </li>
                    <li className="flex items-start">
                      <Target className="w-4 h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                      Social network friend suggestions
                    </li>
                    <li className="flex items-start">
                      <Target className="w-4 h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                      Web crawling and indexing
                    </li>
                    <li className="flex items-start">
                      <Target className="w-4 h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                      GPS navigation systems
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-gray-200">
          <Link 
            href="/learning-path/module-6/fundamentals" 
            className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Previous: Graph Fundamentals
          </Link>
          <Link 
            href="/learning-path/module-6/shortest-paths" 
            className="flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            Next: Shortest Paths
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}