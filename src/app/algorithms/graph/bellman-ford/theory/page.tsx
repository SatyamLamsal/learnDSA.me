"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sigma, BookOpen, Repeat2, AlertTriangle, Gauge, Timer } from 'lucide-react';
import PseudocodeBlock from '@/components/PseudocodeBlock';

const pseudocode = `BellmanFord(G, w, source):
  for each vertex v in G.V:
    dist[v] ← ∞
    parent[v] ← NIL
  dist[source] ← 0
  // |V|-1 relaxation passes
  for i from 1 to |V|-1:
    updated ← false
    for each edge (u, v) in G.E:
      if dist[u] + w(u,v) < dist[v]:
        dist[v] ← dist[u] + w(u,v)
        parent[v] ← u
        updated ← true
    if not updated:      // early stop optimization
      break
  // Negative cycle detection
  for each edge (u, v) in G.E:
    if dist[u] + w(u,v) < dist[v]:
      return "NEGATIVE CYCLE" // or mark cycle vertices
  return dist, parent`;

export default function BellmanFordTheoryPage(){
  return <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-emerald-50 text-gray-700">
  <div className="container mx-auto px-4 py-12 max-w-screen-2xl text-gray-700">
      <Header />
      <div className="grid lg:grid-cols-3 gap-8 text-gray-700">
        <div className="lg:col-span-2 space-y-8 text-gray-700">
          <DefinitionCard />
          <KeyConceptsCard />
          <StepsCard />
          <OptimizationCard />
          <ComplexityCard />
          <PseudocodeCard />
          <ApplicationsCard />
          <ComparisonCard />
          <PitfallsCard />
        </div>
        <SideSummary />
      </div>
      <Navigation />
    </div>
  </div>;
}

function Header(){
  return <motion.div initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} className="mb-10 text-gray-700">
    <Link href="/algorithms/graph/bellman-ford" className="inline-flex items-center text-rose-600 hover:text-rose-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Back to Bellman-Ford Overview</Link>
    <h1 className="text-4xl font-bold text-slate-800 mb-4 flex items-center gap-3"><span className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-rose-600 text-black shadow text-gray-600"><Sigma className="h-8 w-8 text-gray-700"/></span>Bellman-Ford Theory</h1>
    <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">Bellman-Ford generalizes Dijkstra by working with negative edge weights and detecting negative weight cycles through repeated global relaxation passes over all edges.</p>
  </motion.div>;
}

function Card({children,title,icon}:{children:React.ReactNode;title:string;icon?:React.ReactNode}){
  return <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5}} className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
    <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">{icon}{title}</h2>
    {children}
  </motion.div>;
}

function DefinitionCard(){
  return <Card title="Definition">
    <p className="text-sm text-slate-600 leading-relaxed">Given a weighted directed graph G=(V,E) that may contain negative edge weights (but no negative cycles reachable from the source), Bellman-Ford computes the shortest path distances from a source vertex s to every other vertex. It uses at most |V|−1 passes to propagate shortest path improvements progressively along edges.</p>
  </Card>;
}

function KeyConceptsCard(){
  return <Card title="Key Concepts" icon={<Repeat2 className="h-5 w-5 text-amber-600"/>}>
    <ul className="list-disc pl-5 text-sm text-slate-600 space-y-2">
      <li><span className="font-semibold text-gray-800">Relaxation:</span> Attempt to improve dist[v] via edge (u,v): if dist[u] + w &lt; dist[v] then update.</li>
      <li><span className="font-semibold text-gray-800">Pass:</span> One full iteration over all edges; after k passes shortest paths using ≤ k edges are found.</li>
      <li><span className="font-semibold text-gray-800">Negative Cycle Detection:</span> A further improvement after |V|−1 passes implies a cycle of overall negative weight.</li>
      <li><span className="font-semibold text-gray-800">Early Exit:</span> If no edge relaxes in a pass, algorithm can terminate early.</li>
      <li><span className="font-semibold text-gray-800">Edge List Friendly:</span> Works directly from edge list without adjacency priority logic.</li>
    </ul>
  </Card>;
}

function StepsCard(){
  return <Card title="Algorithm Steps">
    <ol className="list-decimal pl-5 text-sm text-slate-600 space-y-2">
      <li>Initialize dist[source]=0; others = ∞; parent[v]=NIL.</li>
      <li>Repeat |V|−1 times: for each edge (u,v,w) perform relaxation.</li>
      <li>If in a pass no relaxation occurs, break early.</li>
  <li>Run final pass: if any edge can still relax -&gt; negative cycle detected.</li>
      <li>Reconstruct path by following parent pointers.</li>
    </ol>
  </Card>;
}

function OptimizationCard(){
  return <Card title="Optimizations" icon={<Timer className="h-5 w-5 text-emerald-600"/>}>
    <ul className="list-disc pl-5 text-sm text-slate-600 space-y-2">
      <li><span className="font-semibold text-gray-800">Early Stop:</span> Track if any relaxation occurred in a pass.</li>
      <li><span className="font-semibold text-gray-800">Queue-Based Variant (SPFA):</span> Only process vertices that had improved distances (not worst-case safe, can degrade).</li>
      <li><span className="font-semibold text-gray-800">Cycle Tracking:</span> On detection mark vertices reachable from a relaxing chain for cycle reporting.</li>
      <li><span className="font-semibold text-gray-800">Edge Bucketing:</span> Group edges by from-vertex for slight locality gain.</li>
    </ul>
  </Card>;
}

function ComplexityCard(){
  return <Card title="Time & Space Complexity" icon={<Gauge className="h-5 w-5 text-indigo-600"/>}>
    <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
      <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-gray-700"><div className="font-semibold text-rose-700 text-[11px] uppercase tracking-wide">Time (Worst)</div><div className="font-mono mt-1 text-gray-700">O(V·E)</div></div>
      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-gray-700"><div className="font-semibold text-amber-700 text-[11px] uppercase tracking-wide">Time (Early Stop)</div><div className="font-mono mt-1 text-gray-700">≤ O(K·E)</div></div>
      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-gray-700"><div className="font-semibold text-emerald-700 text-[11px] uppercase tracking-wide">Space</div><div className="font-mono mt-1 text-gray-700">O(V)</div></div>
    </div>
    <p className="text-xs text-slate-600 mt-4">K = number of passes until convergence (K ≤ V−1). Better for sparse graphs or when shortest paths use few edges.</p>
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
      <li>Shortest paths with negative weights (no negative cycles)</li>
      <li>Negative cycle detection (arbitrage, fraud loops)</li>
      <li>Preprocessing for Johnson&apos;s all-pairs algorithm</li>
      <li>Distance constraints analysis in scheduling</li>
      <li>Evaluating feasibility in difference constraints systems</li>
    </ul>
  </Card>;
}

function ComparisonCard(){
  return <Card title="Comparison with Dijkstra">
    <table className="w-full text-xs text-left border border-slate-200 rounded overflow-hidden text-gray-600">
      <thead className="bg-slate-100 text-slate-700">
        <tr><th className="p-2 font-semibold text-gray-800">Aspect</th><th className="p-2 font-semibold text-gray-800">Bellman-Ford</th><th className="p-2 font-semibold text-gray-800">Dijkstra</th></tr>
      </thead>
      <tbody className="divide-y divide-slate-200 text-gray-700">
        <tr><td className="p-2 text-gray-700">Edge Weights</td><td className="p-2 text-gray-700">Negative allowed</td><td className="p-2 text-gray-700">Must be ≥ 0</td></tr>
        <tr><td className="p-2 text-gray-700">Time Complexity</td><td className="p-2 text-gray-700">O(V·E)</td><td className="p-2 text-gray-700">O((V+E) log V)</td></tr>
        <tr><td className="p-2 text-gray-700">Data Structure</td><td className="p-2 text-gray-700">Edge list loops</td><td className="p-2 text-gray-700">Priority queue</td></tr>
        <tr><td className="p-2 text-gray-700">Negative Cycle Detection</td><td className="p-2 text-gray-700">Yes (extra pass)</td><td className="p-2 text-gray-700">No</td></tr>
        <tr><td className="p-2 text-gray-700">Early Exit Potential</td><td className="p-2 text-gray-700">Yes (no updates)</td><td className="p-2 text-gray-700">Implicit via queue exhaustion</td></tr>
      </tbody>
    </table>
  </Card>;
}

function PitfallsCard(){
  return <Card title="Edge Cases & Pitfalls" icon={<AlertTriangle className="h-5 w-5 text-rose-600"/>}>
    <ul className="list-disc pl-5 text-sm text-slate-600 space-y-2">
      <li><span className="font-semibold text-gray-800">Negative Cycle:</span> Distances undefined; mark nodes or report cycle path.</li>
      <li><span className="font-semibold text-gray-800">Large Edge Count:</span> O(V·E) becomes prohibitive for dense graphs; consider reweight + Dijkstra.</li>
      <li><span className="font-semibold text-gray-800">Floating Precision:</span> Repeated additions can accumulate error; use tolerance for comparisons.</li>
      <li><span className="font-semibold text-gray-800">SPFA Worst Case:</span> Queue-based optimization can degrade to O(V·E).</li>
    </ul>
  </Card>;
}

function SideSummary(){
  return <div className="space-y-6 text-gray-700">
    <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
      <h2 className="text-lg font-semibold text-slate-800 mb-2">Key Properties</h2>
      <ul className="text-xs text-slate-600 space-y-1">
        <li>Handles negative edges</li>
        <li>Detects negative cycles</li>
        <li>|V|−1 passes max</li>
        <li>Edge-based relaxation</li>
        <li>Early stop possible</li>
      </ul>
    </motion.div>
    <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
      <h2 className="text-lg font-semibold text-slate-800 mb-2">Next Steps</h2>
      <p className="text-xs text-slate-600 mb-3">Observe relaxation passes and cycle detection in action.</p>
      <Link href="/algorithms/graph/bellman-ford/simulation" className="inline-flex items-center px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-sm font-semibold text-gray-300">Go to Simulation</Link>
    </motion.div>
  </div>;
}

function Navigation(){
  return <motion.div initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} className="mt-14 flex justify-between items-center text-gray-700">
    <Link href="/algorithms/graph/bellman-ford" className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Overview</Link>
    <div className="flex gap-4 text-gray-700">
      <Link href="/algorithms/graph/bellman-ford/simulation" className="inline-flex items-center px-6 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors text-gray-100">Simulation <ArrowRight className="h-5 w-5 ml-2 text-gray-700"/></Link>
    </div>
  </motion.div>;
}
