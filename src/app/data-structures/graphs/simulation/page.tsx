'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  RotateCcw, 
  Plus, 
  Minus,
  Zap,
  Route,
  Network,
  Search,
  TreePine,
  Target,
  GitBranch,
  Shuffle
} from 'lucide-react';

interface GraphNode {
  id: string;
  x: number;
  y: number;
  visited?: boolean;
  distance?: number;
  previous?: string | null;
  inPath?: boolean;
}

interface GraphEdge {
  from: string;
  to: string;
  weight: number;
  highlighted?: boolean;
}

interface GraphState {
  nodes: GraphNode[];
  edges: GraphEdge[];
  directed: boolean;
  weighted: boolean;
}

const GraphSimulation: React.FC = () => {
  const [graph, setGraph] = useState<GraphState>({
    nodes: [
      { id: 'A', x: 150, y: 100 },
      { id: 'B', x: 300, y: 100 },
      { id: 'C', x: 225, y: 200 },
      { id: 'D', x: 375, y: 200 },
      { id: 'E', x: 300, y: 300 }
    ],
    edges: [
      { from: 'A', to: 'B', weight: 4 },
      { from: 'A', to: 'C', weight: 2 },
      { from: 'B', to: 'C', weight: 1 },
      { from: 'B', to: 'D', weight: 5 },
      { from: 'C', to: 'D', weight: 8 },
      { from: 'C', to: 'E', weight: 10 },
      { from: 'D', to: 'E', weight: 2 }
    ],
    directed: false,
    weighted: true
  });

  const [algorithm, setAlgorithm] = useState<'BFS' | 'DFS' | 'Dijkstra' | 'None'>('None');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [startNode, setStartNode] = useState('A');
  const [endNode, setEndNode] = useState('E');
  const [speed, setSpeed] = useState(1000);
  const [mode, setMode] = useState<'view' | 'add-node' | 'add-edge' | 'remove'>('view');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [newNodeId, setNewNodeId] = useState('');
  const [newEdgeWeight, setNewEdgeWeight] = useState(1);

  // Algorithm state
  const [queue, setQueue] = useState<string[]>([]);
  const [stack, setStack] = useState<string[]>([]);
  const [distances, setDistances] = useState<Map<string, number>>(new Map());
  const [previous, setPrevious] = useState<Map<string, string | null>>(new Map());
  const [visitedOrder, setVisitedOrder] = useState<string[]>([]);
  const [algorithmSteps, setAlgorithmSteps] = useState<{
    type: string;
    current?: string;
    neighbor?: string;
    queue?: string[];
    stack?: string[];
    visited?: Set<string>;
    distances?: Map<string, number>;
    previous?: Map<string, string | null>;
    unvisited?: Set<string>;
    edge?: GraphEdge;
    newDistance?: number;
    message: string;
  }[]>([]);

  // Reset algorithm state
  const resetAlgorithmState = useCallback(() => {
    setQueue([]);
    setStack([]);
    setDistances(new Map());
    setPrevious(new Map());
    setVisitedOrder([]);
    setAlgorithmSteps([]);
    setCurrentStep(0);
    setIsPlaying(false);
    
    setGraph(prev => ({
      ...prev,
      nodes: prev.nodes.map(node => ({ 
        ...node, 
        visited: false, 
        distance: undefined, 
        previous: undefined, 
        inPath: false 
      })),
      edges: prev.edges.map(edge => ({ ...edge, highlighted: false }))
    }));
  }, []);

  // Generate algorithm steps
  const generateBFSSteps = useCallback((startNodeId: string) => {
    const steps = [];
    const visited = new Set<string>();
    const queue = [startNodeId];
    const nodeDistances = new Map<string, number>();
    const nodePrevious = new Map<string, string | null>();
    
    nodeDistances.set(startNodeId, 0);
    nodePrevious.set(startNodeId, null);
    
      steps.push({
        type: 'init',
        queue: [startNodeId],
        visited: new Set<string>(),
        distances: new Map(nodeDistances),
        previous: new Map(nodePrevious),
        message: `Initialize BFS from node ${startNodeId}`
      });    while (queue.length > 0) {
      const current = queue.shift()!;
      
      if (visited.has(current)) continue;
      
      visited.add(current);
      
      steps.push({
        type: 'visit',
        current,
        queue: [...queue],
        visited: new Set(visited),
        distances: new Map(nodeDistances),
        previous: new Map(nodePrevious),
        message: `Visit node ${current}`
      });

      // Find neighbors
      const neighbors = graph.edges
        .filter(edge => 
          (edge.from === current || (!graph.directed && edge.to === current)) &&
          !visited.has(edge.from === current ? edge.to : edge.from)
        )
        .map(edge => edge.from === current ? edge.to : edge.from);

      for (const neighbor of neighbors) {
        if (!visited.has(neighbor) && !queue.includes(neighbor)) {
          queue.push(neighbor);
          nodeDistances.set(neighbor, (nodeDistances.get(current) || 0) + 1);
          nodePrevious.set(neighbor, current);
          
          steps.push({
            type: 'discover',
            current,
            neighbor,
            queue: [...queue],
            visited: new Set(visited),
            distances: new Map(nodeDistances),
            previous: new Map(nodePrevious),
            message: `Discover neighbor ${neighbor} of ${current}`
          });
        }
      }
    }

    return steps;
  }, [graph.edges, graph.directed]);

  const generateDFSSteps = useCallback((startNodeId: string) => {
    const steps = [];
    const visited = new Set<string>();
    const stack = [startNodeId];
    
    steps.push({
      type: 'init',
      stack: [startNodeId],
      visited: new Set<string>(),
      message: `Initialize DFS from node ${startNodeId}`
    });

    while (stack.length > 0) {
      const current = stack.pop()!;
      
      if (visited.has(current)) continue;
      
      visited.add(current);
      
      steps.push({
        type: 'visit',
        current,
        stack: [...stack],
        visited: new Set(visited),
        message: `Visit node ${current}`
      });

      // Find neighbors (add in reverse order for correct DFS order)
      const neighbors = graph.edges
        .filter(edge => 
          (edge.from === current || (!graph.directed && edge.to === current)) &&
          !visited.has(edge.from === current ? edge.to : edge.from)
        )
        .map(edge => edge.from === current ? edge.to : edge.from)
        .reverse();

      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
          
          steps.push({
            type: 'discover',
            current,
            neighbor,
            stack: [...stack],
            visited: new Set(visited),
            message: `Push neighbor ${neighbor} onto stack`
          });
        }
      }
    }

    return steps;
  }, [graph.edges, graph.directed]);

  const generateDijkstraSteps = useCallback((startNodeId: string) => {
    const steps = [];
    const distances = new Map<string, number>();
    const previous = new Map<string, string | null>();
    const visited = new Set<string>();
    const unvisited = new Set(graph.nodes.map(node => node.id));
    
    // Initialize distances
    for (const node of graph.nodes) {
      distances.set(node.id, node.id === startNodeId ? 0 : Infinity);
      previous.set(node.id, null);
    }
    
    steps.push({
      type: 'init',
      distances: new Map(distances),
      previous: new Map(previous),
      visited: new Set<string>(),
      unvisited: new Set(unvisited),
      message: `Initialize Dijkstra from node ${startNodeId}`
    });

    while (unvisited.size > 0) {
      // Find unvisited node with minimum distance
      let current = '';
      let minDistance = Infinity;
      
      for (const nodeId of unvisited) {
        const dist = distances.get(nodeId) || Infinity;
        if (dist < minDistance) {
          minDistance = dist;
          current = nodeId;
        }
      }
      
      if (minDistance === Infinity) break;
      
      unvisited.delete(current);
      visited.add(current);
      
      steps.push({
        type: 'visit',
        current,
        distances: new Map(distances),
        previous: new Map(previous),
        visited: new Set(visited),
        unvisited: new Set(unvisited),
        message: `Visit node ${current} with distance ${minDistance}`
      });

      // Update distances to neighbors
      const neighbors = graph.edges.filter(edge => 
        edge.from === current || (!graph.directed && edge.to === current)
      );

      for (const edge of neighbors) {
        const neighbor = edge.from === current ? edge.to : edge.from;
        
        if (!visited.has(neighbor)) {
          const newDistance = (distances.get(current) || 0) + edge.weight;
          const currentDistance = distances.get(neighbor) || Infinity;
          
          if (newDistance < currentDistance) {
            distances.set(neighbor, newDistance);
            previous.set(neighbor, current);
            
            steps.push({
              type: 'update',
              current,
              neighbor,
              edge,
              newDistance,
              distances: new Map(distances),
              previous: new Map(previous),
              visited: new Set(visited),
              unvisited: new Set(unvisited),
              message: `Update distance to ${neighbor}: ${newDistance}`
            });
          }
        }
      }
    }

    return steps;
  }, [graph.nodes, graph.edges, graph.directed]);

  // Start algorithm
  const startAlgorithm = useCallback(() => {
    resetAlgorithmState();
    
    let steps: {
      type: string;
      current?: string;
      neighbor?: string;
      queue?: string[];
      stack?: string[];
      visited?: Set<string>;
      distances?: Map<string, number>;
      previous?: Map<string, string | null>;
      unvisited?: Set<string>;
      edge?: GraphEdge;
      newDistance?: number;
      message: string;
    }[] = [];
    switch (algorithm) {
      case 'BFS':
        steps = generateBFSSteps(startNode);
        break;
      case 'DFS':
        steps = generateDFSSteps(startNode);
        break;
      case 'Dijkstra':
        steps = generateDijkstraSteps(startNode);
        break;
    }
    
    setAlgorithmSteps(steps);
    setIsPlaying(true);
  }, [algorithm, startNode, generateBFSSteps, generateDFSSteps, generateDijkstraSteps, resetAlgorithmState]);

  // Execute algorithm step
  useEffect(() => {
    if (!isPlaying || currentStep >= algorithmSteps.length) {
      setIsPlaying(false);
      return;
    }

    const timer = setTimeout(() => {
      const step = algorithmSteps[currentStep];
      
      // Update graph visualization based on step
      setGraph(prev => ({
        ...prev,
        nodes: prev.nodes.map(node => ({
          ...node,
          visited: step.visited?.has(node.id) || false,
          distance: step.distances?.get(node.id),
          previous: step.previous?.get(node.id),
          inPath: false
        })),
        edges: prev.edges.map(edge => ({
          ...edge,
          highlighted: step.type === 'discover' && 
            ((edge.from === step.current && edge.to === step.neighbor) ||
             (edge.to === step.current && edge.from === step.neighbor))
        }))
      }));

      // Update algorithm state
      if (step.queue) setQueue(step.queue);
      if (step.stack) setStack(step.stack);
      if (step.distances) setDistances(step.distances);
      if (step.previous) setPrevious(step.previous);
      if (step.visited) setVisitedOrder(Array.from(step.visited));

      setCurrentStep(prev => prev + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, algorithmSteps, speed]);

  // Graph interaction handlers
  const handleNodeClick = (nodeId: string) => {
    if (mode === 'remove') {
      setGraph(prev => ({
        ...prev,
        nodes: prev.nodes.filter(node => node.id !== nodeId),
        edges: prev.edges.filter(edge => edge.from !== nodeId && edge.to !== nodeId)
      }));
    } else if (mode === 'add-edge') {
      if (selectedNode === null) {
        setSelectedNode(nodeId);
      } else if (selectedNode !== nodeId) {
        const edgeExists = graph.edges.some(edge => 
          (edge.from === selectedNode && edge.to === nodeId) ||
          (edge.from === nodeId && edge.to === selectedNode)
        );
        
        if (!edgeExists) {
          setGraph(prev => ({
            ...prev,
            edges: [...prev.edges, { from: selectedNode, to: nodeId, weight: newEdgeWeight }]
          }));
        }
        setSelectedNode(null);
      }
    }
  };

  const handleSVGClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (mode === 'add-node' && newNodeId.trim()) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const nodeExists = graph.nodes.some(node => node.id === newNodeId.trim());
      if (!nodeExists) {
        setGraph(prev => ({
          ...prev,
          nodes: [...prev.nodes, { id: newNodeId.trim(), x, y }]
        }));
        setNewNodeId('');
      }
    }
  };

  const getShortestPath = (endNodeId: string) => {
    const path = [];
    let current: string | null = endNodeId;
    
    while (current !== null && previous.has(current)) {
      path.unshift(current);
      current = previous.get(current) || null;
    }
    
    return path;
  };

  // Highlight shortest path for Dijkstra
  useEffect(() => {
    if (algorithm === 'Dijkstra' && !isPlaying && algorithmSteps.length > 0 && endNode) {
      const path = getShortestPath(endNode);
      
      setGraph(prev => ({
        ...prev,
        nodes: prev.nodes.map(node => ({
          ...node,
          inPath: path.includes(node.id)
        })),
        edges: prev.edges.map(edge => ({
          ...edge,
          highlighted: path.some((nodeId, index) => 
            index < path.length - 1 && 
            ((edge.from === nodeId && edge.to === path[index + 1]) ||
             (edge.to === nodeId && edge.from === path[index + 1]))
          )
        }))
      }));
    }
  }, [algorithm, isPlaying, algorithmSteps, endNode, previous]);

  const currentMessage = algorithmSteps[currentStep - 1]?.message || '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 text-white">
      <div className="container mx-auto px-4 py-12 text-gray-700">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-gray-700"
        >
          <Link href="/data-structures/graphs" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2 text-gray-700" />
            Back to Graphs Overview
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Graph Algorithm Simulation</h1>
          <p className="text-xl text-gray-600 max-w-4xl leading-relaxed">
            Interact with graph algorithms and see how BFS, DFS, and Dijkstra&apos;s algorithm work step by step.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8 text-gray-700">
          {/* Controls Panel */}
          <div className="lg:col-span-1 space-y-6 text-gray-700">
            {/* Algorithm Selection */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Algorithm</h3>
              <div className="space-y-3 text-gray-700">
                {(['BFS', 'DFS', 'Dijkstra'] as const).map(algo => (
                  <button
                    key={algo}
                    onClick={() => {
                      setAlgorithm(algo);
                      resetAlgorithmState();
                    }}
                    className={`w-full p-3 rounded-lg border-2 transition-all ${
                      algorithm === algo
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-center text-gray-700">
                      {algo === 'BFS' && <Shuffle className="h-4 w-4 mr-2 text-gray-700" />}
                      {algo === 'DFS' && <TreePine className="h-4 w-4 mr-2 text-gray-700" />}
                      {algo === 'Dijkstra' && <Target className="h-4 w-4 mr-2 text-gray-700" />}
                      {algo}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Algorithm Controls */}
            {algorithm !== 'None' && (
              <div className="bg-white rounded-lg shadow-lg p-6 text-gray-700">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Controls</h3>
                
                <div className="space-y-4 text-gray-700">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Node
                    </label>
                    <select
                      value={startNode}
                      onChange={(e) => setStartNode(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    >
                      {graph.nodes.map(node => (
                        <option key={node.id} value={node.id}>{node.id}</option>
                      ))}
                    </select>
                  </div>

                  {algorithm === 'Dijkstra' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Node (for path highlighting)
                      </label>
                      <select
                        value={endNode}
                        onChange={(e) => setEndNode(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      >
                        {graph.nodes.map(node => (
                          <option key={node.id} value={node.id}>{node.id}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Speed: {speed}ms
                    </label>
                    <input
                      type="range"
                      min="200"
                      max="2000"
                      step="200"
                      value={speed}
                      onChange={(e) => setSpeed(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div className="flex space-x-2 text-gray-700">
                    <button
                      onClick={startAlgorithm}
                      disabled={isPlaying}
                      className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center text-white text-white text-white text-white text-white"
                    >
                      <Play className="h-4 w-4 mr-2 text-gray-700" />
                      Start
                    </button>
                    
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      disabled={algorithmSteps.length === 0}
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50"
                    >
                      {isPlaying ? <Pause className="h-4 w-4 text-gray-700" /> : <Play className="h-4 w-4 text-gray-700" />}
                    </button>
                    
                    <button
                      onClick={resetAlgorithmState}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-white text-white text-white text-white"
                    >
                      <RotateCcw className="h-4 w-4 text-gray-700" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Graph Controls */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Graph Controls</h3>
              
              <div className="space-y-4 text-gray-700">
                <div className="flex space-x-2 text-gray-700">
                  <button
                    onClick={() => setGraph(prev => ({ ...prev, directed: !prev.directed }))}
                    className={`flex-1 p-2 rounded-lg border-2 transition-all ${
                      graph.directed ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'
                    }`}
                  >
                    <GitBranch className="h-4 w-4 mx-auto text-gray-700" />
                    <span className="text-xs block mt-1 text-gray-600">Directed</span>
                  </button>
                  
                  <button
                    onClick={() => setGraph(prev => ({ ...prev, weighted: !prev.weighted }))}
                    className={`flex-1 p-2 rounded-lg border-2 transition-all ${
                      graph.weighted ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'
                    }`}
                  >
                    <span className="font-bold text-sm text-gray-600">W</span>
                    <span className="text-xs block text-gray-600">Weighted</span>
                  </button>
                </div>

                <div className="space-y-2 text-gray-700">
                  <label className="block text-sm font-medium text-gray-700">Mode</label>
                  <select
                    value={mode}
                    onChange={(e) => {
                      setMode(e.target.value as 'view' | 'add-node' | 'add-edge' | 'remove');
                      setSelectedNode(null);
                    }}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="view">View</option>
                    <option value="add-node">Add Node</option>
                    <option value="add-edge">Add Edge</option>
                    <option value="remove">Remove</option>
                  </select>
                </div>

                {mode === 'add-node' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Node ID
                    </label>
                    <input
                      type="text"
                      value={newNodeId}
                      onChange={(e) => setNewNodeId(e.target.value)}
                      placeholder="Enter node ID"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    <p className="text-xs text-gray-500 mt-1">Click on canvas to place node</p>
                  </div>
                )}

                {mode === 'add-edge' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Edge Weight
                    </label>
                    <input
                      type="number"
                      value={newEdgeWeight}
                      onChange={(e) => setNewEdgeWeight(Number(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Click two nodes to create edge
                      {selectedNode && ` (selected: ${selectedNode})`}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Algorithm State */}
            {algorithm !== 'None' && (
              <div className="bg-white rounded-lg shadow-lg p-6 text-gray-700">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Algorithm State</h3>
                
                {algorithm === 'BFS' && queue.length > 0 && (
                  <div className="mb-4 text-gray-700">
                    <h4 className="font-medium text-sm text-gray-700 mb-2">Queue:</h4>
                    <div className="flex space-x-1 text-gray-700">
                      {queue.map((nodeId, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
                        >
                          {nodeId}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {algorithm === 'DFS' && stack.length > 0 && (
                  <div className="mb-4 text-gray-700">
                    <h4 className="font-medium text-sm text-gray-700 mb-2">Stack:</h4>
                    <div className="flex flex-wrap space-x-1 text-gray-700">
                      {stack.map((nodeId, index) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm"
                        >
                          {nodeId}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {algorithm === 'Dijkstra' && distances.size > 0 && (
                  <div className="mb-4 text-gray-700">
                    <h4 className="font-medium text-sm text-gray-700 mb-2">Distances:</h4>
                    <div className="space-y-1 text-gray-700">
                      {Array.from(distances.entries()).map(([nodeId, distance]) => (
                        <div key={nodeId} className="flex justify-between text-sm text-gray-600">
                          <span>{nodeId}:</span>
                          <span className="font-mono text-gray-600">
                            {distance === Infinity ? '∞' : distance}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {visitedOrder.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-2">Visited Order:</h4>
                    <div className="flex flex-wrap space-x-1 text-gray-700">
                      {visitedOrder.map((nodeId, index) => (
                        <span
                          key={index}
                          className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm"
                        >
                          {index + 1}. {nodeId}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {currentMessage && (
                  <div className="mt-4 p-3 bg-indigo-50 rounded-lg text-white">
                    <p className="text-sm text-indigo-800">{currentMessage}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Graph Visualization */}
          <div className="lg:col-span-3 text-gray-700">
            <div className="bg-white rounded-lg shadow-lg p-6 text-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Graph Visualization</h3>
              
              <div className="relative text-gray-700">
                <svg
                  width="100%"
                  height="600"
                  className="border border-gray-200 rounded-lg bg-gray-50"
                  onClick={handleSVGClick}
                  style={{ cursor: mode === 'add-node' ? 'crosshair' : 'default' }}
                >
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
                    <marker
                      id="arrowhead-highlighted"
                      markerWidth="10"
                      markerHeight="7"
                      refX="9"
                      refY="3.5"
                      orient="auto"
                      fill="#ef4444"
                    >
                      <polygon points="0 0, 10 3.5, 0 7" />
                    </marker>
                  </defs>
                  
                  {/* Draw edges */}
                  <g>
                    {graph.edges.map((edge, index) => {
                      const fromNode = graph.nodes.find(n => n.id === edge.from);
                      const toNode = graph.nodes.find(n => n.id === edge.to);
                      
                      if (!fromNode || !toNode) return null;

                      const isHighlighted = edge.highlighted;
                      
                      return (
                        <g key={index}>
                          <motion.line
                            x1={fromNode.x}
                            y1={fromNode.y}
                            x2={toNode.x}
                            y2={toNode.y}
                            stroke={isHighlighted ? '#ef4444' : '#6366f1'}
                            strokeWidth={isHighlighted ? 3 : 2}
                            markerEnd={graph.directed ? (isHighlighted ? "url(#arrowhead-highlighted)" : "url(#arrowhead)") : undefined}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                          
                          {/* Edge weight label */}
                          {graph.weighted && (
                            <text
                              x={(fromNode.x + toNode.x) / 2}
                              y={(fromNode.y + toNode.y) / 2 - 5}
                              textAnchor="middle"
                              fill={isHighlighted ? '#ef4444' : '#ef4444'}
                              fontSize="12"
                              fontWeight="bold"
                              className="bg-white text-gray-700"
                            >
                              {edge.weight}
                            </text>
                          )}
                        </g>
                      );
                    })}
                  </g>
                  
                  {/* Draw nodes */}
                  <g>
                    {graph.nodes.map((node, index) => {
                      const isSelected = selectedNode === node.id;
                      const isStart = startNode === node.id;
                      const isEnd = endNode === node.id && algorithm === 'Dijkstra';
                      
                      let nodeColor = '#6366f1';
                      if (node.inPath) nodeColor = '#22c55e';
                      else if (node.visited) nodeColor = '#8b5cf6';
                      else if (isStart) nodeColor = '#f59e0b';
                      else if (isEnd) nodeColor = '#ef4444';
                      
                      return (
                        <motion.g
                          key={node.id}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleNodeClick(node.id)}
                        >
                          <circle
                            cx={node.x}
                            cy={node.y}
                            r={isSelected ? 25 : 20}
                            fill={nodeColor}
                            stroke={isSelected ? '#000' : '#4338ca'}
                            strokeWidth={isSelected ? 3 : 2}
                          />
                          <text
                            x={node.x}
                            y={node.y + 5}
                            textAnchor="middle"
                            fill="white"
                            fontSize="14"
                            fontWeight="bold"
                          >
                            {node.id}
                          </text>
                          
                          {/* Distance label for Dijkstra */}
                          {algorithm === 'Dijkstra' && node.distance !== undefined && (
                            <text
                              x={node.x}
                              y={node.y - 30}
                              textAnchor="middle"
                              fill="#374151"
                              fontSize="12"
                              fontWeight="bold"
                            >
                              {node.distance === Infinity ? '∞' : node.distance}
                            </text>
                          )}
                        </motion.g>
                      );
                    })}
                  </g>
                </svg>

                {/* Legend */}
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 p-3 rounded-lg text-sm text-gray-600">
                  <h4 className="font-semibold mb-2 text-gray-800">Legend</h4>
                  <div className="space-y-1 text-gray-700">
                    <div className="flex items-center text-gray-700">
                      <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2 text-gray-700"></div>
                      <span>Start Node</span>
                    </div>
                    {algorithm === 'Dijkstra' && (
                      <div className="flex items-center text-gray-700">
                        <div className="w-4 h-4 bg-red-500 rounded-full mr-2 text-gray-700"></div>
                        <span>End Node</span>
                      </div>
                    )}
                    <div className="flex items-center text-gray-700">
                      <div className="w-4 h-4 bg-purple-500 rounded-full mr-2 text-gray-700"></div>
                      <span>Visited</span>
                    </div>
                    {algorithm === 'Dijkstra' && (
                      <div className="flex items-center text-gray-700">
                        <div className="w-4 h-4 bg-green-500 rounded-full mr-2 text-gray-700"></div>
                        <span>Shortest Path</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="mt-4 p-4 bg-blue-50 rounded-lg text-white">
                <h4 className="font-semibold text-blue-800 mb-2">Instructions</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Select an algorithm and click &quot;Start&quot; to see the step-by-step execution</li>
                  <li>• Use the mode selector to add nodes, edges, or remove elements</li>
                  <li>• Toggle between directed/undirected and weighted/unweighted graphs</li>
                  <li>• BFS finds shortest path in unweighted graphs</li>
                  <li>• DFS explores deeply before backtracking</li>
                  <li>• Dijkstra finds shortest path in weighted graphs</li>
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
            href="/data-structures/graphs/theory"
            className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2 text-gray-700" />
            Theory
          </Link>
          
          <Link
            href="/data-structures/hash-tables"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-black rounded-lg hover:bg-indigo-700 transition-colors text-gray-800"
          >
            Next: Hash Tables
            <ArrowLeft className="h-5 w-5 ml-2 rotate-180 text-gray-700" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default GraphSimulation;