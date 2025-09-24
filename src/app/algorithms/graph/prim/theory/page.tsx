"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, TreePine, Shield, Layers, Cpu, CheckCircle, AlertTriangle, Play, KeyRound, GitBranch } from 'lucide-react';
import PseudocodeBlock from '@/components/PseudocodeBlock';

const pseudocode = `PRIM(G=(V,E), w, start):
  for each v in V:
    key[v] = +∞
    parent[v] = NIL
  key[start] = 0
  PQ = min-priority-queue keyed by key[]
  insert all vertices into PQ
  inMST = ∅
  while PQ not empty:
    u = extract-min(PQ)
    add u to inMST
    if parent[u] ≠ NIL: add edge (parent[u], u) to MST
    for each (u,v) in Adj[u]:
      if v ∉ inMST and w(u,v) < key[v]:
        key[v] = w(u,v)
        parent[v] = u
        decrease-key(PQ, v)
  return MST`;

export default function PrimTheory(){
  return <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
  <div className="container max-w-screen-2xl mx-auto px-4 py-12">
      <Link href="/algorithms/graph/prim" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2"/>Overview</Link>
      <h1 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3"><TreePine className="h-8 w-8 text-emerald-600"/> Prim's Algorithm Theory</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Section title="Problem" icon={<GitBranch className="h-6 w-6 text-emerald-600"/>}>
            <p className="text-sm text-slate-600 leading-relaxed">Given a connected, undirected, weighted graph G, construct a spanning tree of minimum total weight. If the graph is disconnected, Prim's run from one start vertex builds an MST for that component only (can repeat to get a minimum spanning forest).</p>
          </Section>
          <Section title="Greedy Strategy & Cut Property" icon={<Shield className="h-6 w-6 text-emerald-600"/>}>
            <ul className="text-sm text-slate-600 space-y-2 leading-relaxed list-disc list-inside">
              <li>Maintain a partition (Tree set T, Remaining set V−T).</li>
              <li>At each step choose the lightest edge crossing the cut (T, V−T).</li>
              <li>Cut Property guarantees this edge is safe (belongs to some MST).</li>
              <li>Prim operationalizes this locally (frontier edges only) vs Kruskal's global ordering.</li>
            </ul>
          </Section>
          <Section title="Data Structures" icon={<Layers className="h-6 w-6 text-emerald-600"/>}>
            <ul className="text-sm text-slate-600 space-y-2 leading-relaxed list-disc list-inside">
              <li><span className="font-semibold">key[v]:</span> Weight of best edge connecting v to current tree (∞ if none).</li>
              <li><span className="font-semibold">parent[v]:</span> Predecessor forming chosen MST edge.</li>
              <li><span className="font-semibold">PQ:</span> Min-priority queue keyed by key[v] (supports decrease-key).</li>
              <li><span className="font-semibold">inMST set:</span> Vertices already fixed (frontier boundary maintained implicitly by keys).</li>
            </ul>
          </Section>
          <Section title="Pseudocode" icon={<Play className="h-6 w-6 text-emerald-600"/>}>
            <PseudocodeBlock code={pseudocode} />
          </Section>
          <Section title="Complexity" icon={<Cpu className="h-6 w-6 text-emerald-600"/>}>
            <div className="grid md:grid-cols-3 gap-4 text-xs mb-4">
              <Metric color="emerald" label="Binary Heap" value="O(m log n)" />
              <Metric color="sky" label="Fib Heap" value="O(m + n log n)" />
              <Metric color="rose" label="Adj Matrix" value="O(n^2)" />
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">Decrease-key operations dominate with heaps. For dense graphs (m ≈ n^2) the simple O(n^2) implementation is practical and often faster in practice.</p>
          </Section>
          <Section title="Correctness Sketch" icon={<CheckCircle className="h-6 w-6 text-emerald-600"/>}>
            <ul className="text-sm text-slate-600 space-y-2 leading-relaxed list-disc list-inside">
              <li>Invariant: key[v] always equals lightest crossing edge weight for v (if any explored).</li>
              <li>Extracted vertex u has minimal key among V−T; its incident chosen edge is safe by cut property.</li>
              <li>After n−1 extractions (or PQ empty) the accumulated edges form an MST (or forest component).</li>
            </ul>
          </Section>
          <Section title="Edge Cases" icon={<AlertTriangle className="h-6 w-6 text-emerald-600"/>}>
            <ul className="text-sm text-slate-600 space-y-2 leading-relaxed list-disc list-inside">
              <li><span className="font-semibold">Disconnected:</span> Need to restart from unvisited vertex to cover all components.</li>
              <li><span className="font-semibold">Negative Weights:</span> Supported (no cycles added; minimal crossing edge logic unaffected).</li>
              <li><span className="font-semibold">Parallel Edges:</span> Best one influences key updates naturally.</li>
              <li><span className="font-semibold">Self-loops:</span> Ignored (never connect new vertex).</li>
            </ul>
          </Section>
        </div>
        <div className="space-y-8">
          <SideSummary />
          <Navigation />
        </div>
      </div>
    </div>
  </div>;
}

function Section({title,icon,children}:{title:string;icon:React.ReactNode;children:React.ReactNode}){
  return <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.55}} className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6">
    <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">{icon}{title}</h2>
    {children}
  </motion.div>;
}

function Metric({color,label,value}:{color:string;label:string;value:string}){
  const map:Record<string,string>={emerald:'emerald',sky:'sky',rose:'rose'}; const c=map[color]||'emerald';
  return <div className={`p-3 rounded-xl bg-${c}-50 border border-${c}-100`}>
    <div className={`font-semibold text-${c}-700 text-[11px] uppercase tracking-wide mb-1`}>{label}</div>
    <div className="font-mono">{value}</div>
  </div>;
}

function SideSummary(){
  return <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.55}} className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6">
    <h2 className="text-lg font-semibold text-slate-800 mb-4">Summary</h2>
    <ul className="text-sm text-slate-600 space-y-2">
      <li>Greedy cut expansion</li>
      <li>Priority queue frontier</li>
      <li>Local choices safe globally</li>
      <li>Supports negative weights</li>
      <li>MST / forest across components</li>
    </ul>
  </motion.div>;
}

function Navigation(){
  return <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.55}} className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6">
    <h2 className="text-lg font-semibold text-slate-800 mb-4">Explore</h2>
    <div className="flex flex-col gap-3">
      <Link href="/algorithms/graph/prim/simulation" className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700">Simulation <ArrowRight className="h-5 w-5 ml-2"/></Link>
      <Link href="/algorithms/graph/prim" className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-gray-200 text-slate-700 font-semibold hover:bg-gray-300">Overview</Link>
      <Link href="/algorithms/graph" className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-slate-800 text-white font-semibold hover:bg-slate-900">All Graph Algorithms</Link>
    </div>
  </motion.div>;
}
