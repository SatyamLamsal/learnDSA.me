"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Map, ListOrdered, BrainCircuit, Route, Gauge, Layers, AlertTriangle, Database } from 'lucide-react';
import PseudocodeBlock from '@/components/PseudocodeBlock';

const pseudocode = `Dijkstra(G, source):
  for each vertex v in G:
    dist[v] ← ∞
    parent[v] ← NIL
    visited[v] ← false          // settled / finalized flag
  dist[source] ← 0
  PQ ← empty min-priority queue (key = dist)
  insert (source, 0) into PQ
  while PQ not empty:
    (u, du) ← extract-min(PQ)   // smallest tentative distance
    if visited[u]:              // stale entry check (optional optimization)
      continue
    visited[u] ← true           // u is now settled; dist[u] is final
    for each edge (u, v, w) outgoing from u:
      if visited[v]:
        continue                // already finalized
      if dist[u] + w < dist[v]:  // relaxation
        dist[v] ← dist[u] + w
        parent[v] ← u
        insert (v, dist[v]) into PQ   // may create duplicate stale entries
  return dist, parent`;

export default function DijkstraTheoryPage(){
  return <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100">
  <div className="container mx-auto px-4 py-12 max-w-screen-2xl">
      <Header />
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <DefinitionCard />
            <KeyConceptsCard />
            <StepsCard />
            <DataStructuresCard />
            <ComplexityCard />
            <PseudocodeCard />
            <ApplicationsCard />
            <PitfallsCard />
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
    <Link href="/algorithms/graph/dijkstra-shortest-path" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2"/>Back to Dijkstra Overview</Link>
    <h1 className="text-4xl font-bold text-slate-800 mb-4 flex items-center gap-3"><span className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-blue-600 text-white shadow"><Map className="h-8 w-8"/></span>Dijkstra Theory</h1>
    <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">Dijkstra&apos;s algorithm computes single-source shortest paths in graphs with non‑negative edge weights by repeatedly <em>settling</em> the closest unsettled vertex and relaxing its outgoing edges using a priority queue.</p>
  </motion.div>;
}

function Card({children,title,icon}:{children:React.ReactNode;title:string;icon?:React.ReactNode}){
  return <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5}} className="bg-white rounded-2xl shadow-sm p-6">
    <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">{icon}{title}</h2>
    {children}
  </motion.div>;
}

function DefinitionCard(){
  return <Card title="Definition" icon={<Route className="h-5 w-5 text-blue-600"/>}>
    <p className="text-sm text-slate-600 leading-relaxed">Given a weighted graph G = (V, E) with non‑negative edge weights w(u,v) ≥ 0 and a source vertex s, Dijkstra&apos;s algorithm computes the shortest path distance dist[v] from s to every vertex reachable from s. It maintains a <span className="font-medium text-slate-700">frontier</span> of tentative distances and progressively finalizes (settles) the minimum one.</p>
  </Card>;
}

function KeyConceptsCard(){
  return <Card title="Key Concepts" icon={<BrainCircuit className="h-5 w-5 text-indigo-600"/>}>
    <ul className="list-disc pl-5 text-sm text-slate-600 space-y-2">
      <li><span className="font-semibold">Relaxation:</span> Attempt to improve a tentative distance via an edge (u,v) by checking if dist[u] + w(u,v) &lt; dist[v].</li>
      <li><span className="font-semibold">Settled Set:</span> Vertices whose shortest distances are finalized; no future relaxation can improve them.</li>
      <li><span className="font-semibold">Priority Queue:</span> Orders frontier vertices by current tentative distance.</li>
      <li><span className="font-semibold">Stale Entries:</span> Older queue items with outdated distances; skipped when extracted.</li>
      <li><span className="font-semibold">Greedy Choice:</span> Always settle the closest unsettled vertex first—safe due to non‑negative weights.</li>
    </ul>
  </Card>;
}

function StepsCard(){
  return <Card title="Algorithm Steps" icon={<ListOrdered className="h-5 w-5 text-blue-600"/>}>
    <ol className="list-decimal pl-5 text-sm text-slate-600 space-y-2">
      <li>Initialize dist[v] = ∞, parent[v] = NIL for all vertices; dist[source] = 0.</li>
      <li>Push (source,0) into a min-priority queue keyed by distance.</li>
      <li>While queue not empty extract the vertex u with minimum tentative distance.</li>
      <li>If u already settled (visited) skip (stale entry).</li>
      <li>Mark u settled; its distance is now final.</li>
      <li>For each outgoing edge (u,v,w) perform relaxation: if dist[u] + w &lt; dist[v], update dist[v], parent[v]=u, push (v, dist[v]) into queue.</li>
      <li>Repeat until queue empty or target settled (early exit for single-destination queries).</li>
      <li>Reconstruct paths by following parent pointers backwards from a destination.</li>
    </ol>
  </Card>;
}

function DataStructuresCard(){
  return <Card title="Data Structures" icon={<Database className="h-5 w-5 text-indigo-600"/>}>
    <div className="grid md:grid-cols-2 gap-5 text-sm text-slate-600">
      <div>
        <h3 className="font-semibold text-slate-700 mb-1">Core Arrays</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li><span className="font-medium">dist[v]</span>: current best known distance</li>
          <li><span className="font-medium">parent[v]</span>: predecessor for path reconstruction</li>
          <li><span className="font-medium">visited[v]</span>: boolean settled flag</li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold text-slate-700 mb-1">Priority Queue</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Min-heap of (vertex, distance)</li>
          <li>Supports insert & extract-min in O(log V)</li>
          <li>Decrease-key optional: can push duplicate entries instead</li>
        </ul>
      </div>
    </div>
    <p className="text-xs text-slate-500 mt-4">Using duplicate insertions (lazy deletion) avoids implementing decrease-key at cost of extra heap size.</p>
  </Card>;
}

function ComplexityCard(){
  return <Card title="Time & Space Complexity" icon={<Gauge className="h-5 w-5 text-indigo-600"/>}>
    <div className="grid md:grid-cols-3 gap-4 text-sm">
      <div className="p-3 rounded-xl bg-blue-50 border border-blue-200"><div className="font-semibold text-blue-700 text-[11px] uppercase tracking-wide">Time (Binary Heap)</div><div className="font-mono mt-1">O((V+E) log V)</div></div>
      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200"><div className="font-semibold text-emerald-700 text-[11px] uppercase tracking-wide">Space</div><div className="font-mono mt-1">O(V)</div></div>
      <div className="p-3 rounded-xl bg-purple-50 border border-purple-200"><div className="font-semibold text-purple-700 text-[11px] uppercase tracking-wide">Optimized PQ</div><div className="font-mono mt-1">O(E + V log V)</div></div>
    </div>
    <p className="text-xs text-slate-600 mt-4">Fibonacci heap achieves O(E + V log V); rarely worth complexity in practice. With dense graphs, adjacency matrix + simple selection yields O(V^2).</p>
  </Card>;
}

function PseudocodeCard(){
  return <Card title="Pseudocode">
    <PseudocodeBlock code={pseudocode} />
  </Card>;
}

function ApplicationsCard(){
  return <Card title="Applications" icon={<Layers className="h-5 w-5 text-blue-600"/>}>
    <ul className="list-disc pl-5 text-sm text-slate-600 space-y-2">
      <li>GPS / road network routing (non‑negative distances)</li>
      <li>Network latency / bandwidth path optimization</li>
      <li>Game AI pathfinding (when weights non‑negative)</li>
      <li>Preprocessing for Johnson&apos;s algorithm (reweight + run)</li>
      <li>Emergency response / logistics planning</li>
      <li>Telecom routing & QoS calculations</li>
    </ul>
  </Card>;
}

function PitfallsCard(){
  return <Card title="Edge Cases & Pitfalls" icon={<AlertTriangle className="h-5 w-5 text-rose-600"/>}>
    <ul className="list-disc pl-5 text-sm text-slate-600 space-y-2">
      <li><span className="font-semibold">Negative Edge:</span> Invalidates correctness; use Bellman-Ford or Johnson.</li>
      <li><span className="font-semibold">Negative Cycle:</span> Not detectable by Dijkstra; distances undefined.</li>
      <li><span className="font-semibold">Unreachable Vertices:</span> Remain dist = ∞ (retain NIL parent).</li>
      <li><span className="font-semibold">Overflow:</span> Use large sentinel instead of Number.MAX_VALUE to avoid addition overflow in JS.</li>
      <li><span className="font-semibold">Dense Graph Choice:</span> O(V^2) array implementation might outperform heap.</li>
    </ul>
  </Card>;
}

function ExampleProblemsCard(){
  return <Card title="Example Problems">
    <ul className="list-disc pl-5 text-sm text-slate-600 space-y-2">
      <li>Find shortest driving time between two cities</li>
      <li>Compute routing table from a source router</li>
      <li>Minimum energy path in weighted grid (non‑negative)</li>
      <li>Game map navigation with terrain cost modifiers</li>
      <li>Delivery path planning with road distances</li>
    </ul>
  </Card>;
}

function SideSummary(){
  return <div className="space-y-6">
    <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-2">Key Properties</h2>
      <ul className="text-xs text-slate-600 space-y-1">
        <li>Greedy frontier expansion</li>
        <li>Non‑negative weights only</li>
        <li>Relaxation-based updates</li>
        <li>Settled set = finalized</li>
        <li>Parent tree: shortest paths</li>
      </ul>
    </motion.div>
    <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-2">Next Steps</h2>
      <p className="text-xs text-slate-600 mb-3">Interactively watch relaxation and priority queue evolution.</p>
      <Link href="/algorithms/graph/dijkstra-shortest-path/simulation" className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold">Go to Simulation</Link>
    </motion.div>
  </div>;
}

function Navigation(){
  return <motion.div initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} className="mt-14 flex justify-between items-center">
    <Link href="/algorithms/graph/dijkstra-shortest-path" className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"><ArrowLeft className="h-5 w-5 mr-2"/>Overview</Link>
    <div className="flex gap-4">
      <Link href="/algorithms/graph/dijkstra-shortest-path/simulation" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Simulation <ArrowRight className="h-5 w-5 ml-2"/></Link>
    </div>
  </motion.div>;
}
