"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ListOrdered, GitBranch, Layers, Cpu, CheckCircle, AlertTriangle, Play, Zap } from 'lucide-react';
import PseudocodeBlock from '@/components/PseudocodeBlock';

const pseudocode = `KAHN_TOPO(G=(V,E)):
  inDeg[v] = 0 for v in V
  for each (u→v) in E: inDeg[v]++
  Q = queue of all v with inDeg[v]=0
  order = []
  while Q not empty:
    u = pop(Q)
    append u to order
    for each (u→w) in Adj[u]:
      inDeg[w]--
      if inDeg[w] == 0: push w
  if |order| < |V|: return "cycle detected"
  return order`;

export default function TopoSortTheory(){
  return <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
  <div className="container max-w-screen-2xl mx-auto px-4 py-12">
      <Link href="/algorithms/graph/topological-sort" className="inline-flex items-center text-amber-600 hover:text-amber-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2"/>Overview</Link>
      <h1 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3"><ListOrdered className="h-8 w-8 text-amber-600"/> Topological Sort Theory</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Section title="Problem" icon={<GitBranch className="h-6 w-6 text-amber-600"/>}>
            <p className="text-sm text-slate-600 leading-relaxed">Given a directed acyclic graph (DAG) produce a linear ordering of vertices such that for every edge u→v, u appears before v. Non-uniqueness arises when independent subgraphs can be interleaved.</p>
          </Section>
          <Section title="Kahn's Algorithm" icon={<Layers className="h-6 w-6 text-amber-600"/>}>
            <ul className="text-sm text-slate-600 space-y-2 leading-relaxed list-disc list-inside">
              <li>Compute initial in-degrees.</li>
              <li>Maintain queue of in-degree 0 vertices.</li>
              <li>Remove (output) a vertex, decrement neighbors, enqueue new zeros.</li>
              <li>If leftover vertices have nonzero in-degree ⇒ cycle.</li>
            </ul>
          </Section>
          <Section title="DFS Method" icon={<Zap className="h-6 w-6 text-amber-600"/>}>
            <ul className="text-sm text-slate-600 space-y-2 leading-relaxed list-disc list-inside">
              <li>Run DFS; push vertex to stack upon finish.</li>
              <li>Reverse postorder yields topological order in DAG.</li>
              <li>Track recursion stack or colors to detect back edge (cycle).</li>
            </ul>
          </Section>
          <Section title="Data Structures" icon={<Layers className="h-6 w-6 text-amber-600"/>}>
            <ul className="text-sm text-slate-600 space-y-2 leading-relaxed list-disc list-inside">
              <li><span className="font-semibold">Adjacency list:</span> Outgoing edges.</li>
              <li><span className="font-semibold">inDeg[v]:</span> Remaining prerequisites count.</li>
              <li><span className="font-semibold">Queue:</span> Ready vertices (in-degree 0).</li>
              <li><span className="font-semibold">Order array:</span> Progressive linearization.</li>
            </ul>
          </Section>
          <Section title="Pseudocode (Kahn)" icon={<Play className="h-6 w-6 text-amber-600"/>}>
            <PseudocodeBlock code={pseudocode} />
          </Section>
          <Section title="Complexity" icon={<Cpu className="h-6 w-6 text-amber-600"/>}>
            <div className="grid md:grid-cols-3 gap-4 text-xs mb-4">
              <Metric color="amber" label="Vertices" value="O(n)" />
              <Metric color="emerald" label="Edges" value="O(m)" />
              <Metric color="rose" label="Total" value="O(n+m)" />
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">Each edge reduces some in-degree exactly once.</p>
          </Section>
          <Section title="Cycle Detection" icon={<AlertTriangle className="h-6 w-6 text-amber-600"/>}>
            <ul className="text-sm text-slate-600 space-y-2 leading-relaxed list-disc list-inside">
              <li>Kahn: leftover vertices after queue exhaustion ⇒ cycle.</li>
              <li>DFS: encountering gray (in-stack) vertex ⇒ back edge.</li>
            </ul>
          </Section>
          <Section title="Edge Cases" icon={<AlertTriangle className="h-6 w-6 text-amber-600"/>}>
            <ul className="text-sm text-slate-600 space-y-2 leading-relaxed list-disc list-inside">
              <li>Multiple valid orders — any is acceptable.</li>
              <li>Disconnected DAG components handled naturally.</li>
              <li>Self-loop instantly implies cycle.</li>
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
  return <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.55}} className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6">
    <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">{icon}{title}</h2>
    {children}
  </motion.div>;
}

function Metric({color,label,value}:{color:string;label:string;value:string}){ const map:Record<string,string>={amber:'amber',emerald:'emerald',rose:'rose'}; const c=map[color]||'amber'; return <div className={`p-3 rounded-xl bg-${c}-50 border border-${c}-100`}><div className={`font-semibold text-${c}-700 text-[11px] uppercase tracking-wide mb-1`}>{label}</div><div className="font-mono">{value}</div></div>; }

function SideSummary(){
  return <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.55}} className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6">
    <h2 className="text-lg font-semibold text-slate-800 mb-4">Summary</h2>
    <ul className="text-sm text-slate-600 space-y-2">
      <li>Linearizes DAG dependencies</li>
      <li>Kahn or DFS methods</li>
      <li>Cycle detection integrated</li>
      <li>Foundation for DAG DP</li>
    </ul>
  </motion.div>;
}

function Navigation(){
  return <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.55}} className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6">
    <h2 className="text-lg font-semibold text-slate-800 mb-4">Explore</h2>
    <div className="flex flex-col gap-3">
      <Link href="/algorithms/graph/topological-sort/simulation" className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-amber-600 text-white font-semibold hover:bg-amber-700">Simulation <ArrowRight className="h-5 w-5 ml-2"/></Link>
      <Link href="/algorithms/graph/topological-sort" className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-gray-200 text-slate-700 font-semibold hover:bg-gray-300">Overview</Link>
      <Link href="/algorithms/graph" className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-slate-800 text-white font-semibold hover:bg-slate-900">All Graph Algorithms</Link>
    </div>
  </motion.div>;
}
