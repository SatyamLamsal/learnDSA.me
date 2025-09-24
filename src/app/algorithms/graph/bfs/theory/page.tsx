"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, BookOpen, Network, ListOrdered } from 'lucide-react';
import PseudocodeBlock from '@/components/PseudocodeBlock';

const pseudocode = `BFS(G, s):
  for each vertex v in G:
    color[v] ← WHITE
    dist[v] ← ∞
    parent[v] ← NIL
  color[s] ← GRAY
  dist[s] ← 0
  enqueue(Q, s)
  while Q not empty:
    u ← dequeue(Q)
    for each neighbor v of u:
      if color[v] = WHITE:
        color[v] ← GRAY
        dist[v] ← dist[u] + 1
        parent[v] ← u
        enqueue(Q, v)
    color[u] ← BLACK`;

export default function BFSTheoryPage(){
  return <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50">
  <div className="container mx-auto px-4 py-12 max-w-screen-2xl">
      <Header />
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <DefinitionCard />
          <StepsCard />
          <ComplexityCard />
          <PseudocodeCard />
          <ApplicationsCard />
          <ProsConsCard />
          <ExampleProblemsCard />
        </div>
        <SideSummary />
      </div>
      <Navigation />
    </div>
  </div>;
}

function Header(){
  return <motion.div initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} className="mb-10">
    <Link href="/algorithms/graph/bfs" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2"/>Back to BFS Overview</Link>
    <h1 className="text-4xl font-bold text-slate-800 mb-4 flex items-center gap-3">
      <span className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-blue-600 text-white shadow">
        <Network className="h-8 w-8"/>
      </span>
      BFS Theory
    </h1>
    <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">Breadth-First Search is a fundamental graph traversal that explores all vertices in order of their distance (in edges) from a starting source. It is the backbone for many unweighted shortest path, connectivity, and level-structure algorithms.</p>
  </motion.div>;
}

function Card({children,title,icon}:{children:React.ReactNode;title:string;icon?:React.ReactNode}){
  return <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5}} className="bg-white rounded-2xl shadow-sm p-6">
    <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">{icon}{title}</h2>
    {children}
  </motion.div>;
}

function DefinitionCard(){
  return <Card title="Definition">
    <p className="text-sm text-slate-600 leading-relaxed">Given a graph G = (V, E) and a source vertex s, BFS systematically explores the edges of G to discover every vertex reachable from s. It computes the shortest path distance (in number of edges) from s to every discovered vertex and records a breadth-first tree (parent pointers) that captures shortest paths.</p>
  </Card>;
}

function StepsCard(){
  return <Card title="Algorithm Steps" icon={<ListOrdered className="h-5 w-5 text-blue-600"/>}>
    <ol className="list-decimal pl-5 text-sm text-slate-600 space-y-2">
      <li>Initialize all vertices as undiscovered (WHITE) with infinite distance.</li>
      <li>Mark source s as GRAY (discovered), distance 0, and enqueue it.</li>
      <li>While queue not empty: dequeue front u.</li>
      <li>For each neighbor v of u: if WHITE, mark GRAY, set parent, distance = dist[u] + 1, enqueue v.</li>
      <li>After exploring all neighbors of u, mark u BLACK (fully processed).</li>
      <li>Continue until queue empty. Parents form shortest path tree.</li>
    </ol>
  </Card>;
}

function ComplexityCard(){
  return <Card title="Time & Space Complexity">
    <div className="grid md:grid-cols-3 gap-4 text-sm">
      <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
        <div className="font-semibold text-blue-700 text-[11px] uppercase tracking-wide">Time</div>
        <div className="font-mono mt-1">O(V + E)</div>
      </div>
      <div className="p-3 rounded-xl bg-purple-50 border border-purple-200">
        <div className="font-semibold text-purple-700 text-[11px] uppercase tracking-wide">Space</div>
        <div className="font-mono mt-1">O(V)</div>
      </div>
      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
        <div className="font-semibold text-emerald-700 text-[11px] uppercase tracking-wide">Shortest Paths</div>
        <div className="font-mono mt-1">Yes (Unweighted)</div>
      </div>
    </div>
    <p className="text-xs text-slate-600 mt-4">Each vertex enqueued at most once; each edge considered at most twice (undirected) or once (directed).</p>
  </Card>;
}

function PseudocodeCard(){
  return <Card title="Pseudocode">
    <PseudocodeBlock code={pseudocode} />
  </Card>;
}

function ApplicationsCard(){
  return <Card title="Applications">
    <ul className="list-disc pl-5 text-sm text-slate-600 space-y-2">
      <li>Shortest path in unweighted graphs</li>
      <li>Level-order traversal of trees</li>
      <li>Finding connected components (with repeated BFS/DFS)</li>
      <li>Checking bipartiteness</li>
      <li>Peer-to-peer network distance / social graphs</li>
      <li>Web crawlers exploring outward from a seed</li>
    </ul>
  </Card>;
}

function ProsConsCard(){
  return <Card title="Advantages & Disadvantages">
    <div className="grid md:grid-cols-2 gap-6 text-sm">
      <div>
        <h3 className="font-semibold text-emerald-700 mb-2">Advantages</h3>
        <ul className="list-disc pl-5 space-y-1 text-slate-600">
          <li>Guarantees shortest path in unweighted graphs</li>
          <li>Linear time relative to input size</li>
          <li>Simple to implement</li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold text-rose-700 mb-2">Disadvantages</h3>
        <ul className="list-disc pl-5 space-y-1 text-slate-600">
          <li>Requires O(V) additional memory for queue & metadata</li>
          <li>Not suitable for weighted shortest paths</li>
          <li>Less cache-friendly than simple array scans</li>
        </ul>
      </div>
    </div>
  </Card>;
}

function ExampleProblemsCard(){
  return <Card title="Example Problems">
    <ul className="list-disc pl-5 text-sm text-slate-600 space-y-2">
      <li>Minimum number of moves in a board game (unweighted state graph)</li>
      <li>Shortest path in a maze/grid (4-direction or 8-direction)</li>
      <li>Friend-of-friend distance in social network</li>
      <li>Detect if graph is bipartite</li>
      <li>Compute distances from multiple sources (multi-source BFS)</li>
    </ul>
  </Card>;
}

function SideSummary(){
  return <div className="space-y-6">
    <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-2">Key Properties</h2>
      <ul className="text-xs text-slate-600 space-y-1">
        <li>Layered exploration</li>
        <li>Queue-based frontier</li>
        <li>Parent tree = shortest paths</li>
        <li>Distances monotonically nondecreasing</li>
        <li>Great for unweighted reachability</li>
      </ul>
    </motion.div>
    <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-2">Next Steps</h2>
      <p className="text-xs text-slate-600 mb-3">Practice BFS interactively to see queue evolution, frontier layers, and path reconstruction.</p>
      <Link href="/algorithms/graph/bfs/simulation" className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold">Go to Simulation</Link>
    </motion.div>
  </div>;
}

function Navigation(){
  return <motion.div initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} className="mt-14 flex justify-between items-center">
    <Link href="/algorithms/graph" className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"><ArrowLeft className="h-5 w-5 mr-2"/>Graph Overview</Link>
    <div className="flex gap-4">
      <Link href="/algorithms/graph/bfs/simulation" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Simulation <ArrowRight className="h-5 w-5 ml-2"/></Link>
      <Link href="/algorithms/graph/dfs" className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">Next: DFS <ArrowRight className="h-5 w-5 ml-2"/></Link>
    </div>
  </motion.div>;
}
