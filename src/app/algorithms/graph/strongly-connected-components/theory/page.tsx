"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Network, GitBranch, Layers, Cpu, CheckCircle, AlertTriangle, Play, Zap, Blocks, Repeat } from 'lucide-react';
import PseudocodeBlock from '@/components/PseudocodeBlock';

const kosaraju = `KOSARAJU(G=(V,E)):
  visited = { }
  order = []
  // 1st DFS: record finish order
  for v in V:
    if v not visited:
      DFS1(v)
  // transpose graph
  GT = transpose(G)
  visited = { }
  components = []
  // 2nd DFS on GT in reverse finish order
  for v in reverse(order):
    if v not visited:
      C = []
      DFS2(v, C)
      components.push(C)
  return components

DFS1(u):
  visited.add(u)
  for each (u->v) in Adj[u]:
    if v not visited:
      DFS1(v)
  order.push(u)

DFS2(u, C):
  visited.add(u); C.push(u)
  for each (u->v) in AdjT[u]:
    if v not visited:
      DFS2(v, C)`;

const tarjan = `TARJAN(G):
  index = 0
  stack = []
  onStack = {}
  indices[v] = -1 for v
  low[v] = 0
  components = []
  for v in V:
    if indices[v] == -1:
      STRONGCONNECT(v)
  return components

STRONGCONNECT(v):
  indices[v] = index; low[v] = index; index++
  stack.push(v); onStack.add(v)
  for (v->w) in Adj[v]:
    if indices[w] == -1:
      STRONGCONNECT(w)
      low[v] = min(low[v], low[w])
    else if w in onStack:
      low[v] = min(low[v], indices[w])
  if low[v] == indices[v]:
    // root of SCC
    component = []
    repeat:
      w = stack.pop(); onStack.remove(w)
      component.push(w)
    until w == v
    components.push(component)`;

export default function SCCTheory(){
  return <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 via-pink-50 to-rose-50">
  <div className="container max-w-screen-2xl mx-auto px-4 py-12">
      <Link href="/algorithms/graph/strongly-connected-components" className="inline-flex items-center text-fuchsia-600 hover:text-fuchsia-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2"/>Overview</Link>
      <h1 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3"><Network className="h-8 w-8 text-fuchsia-600"/> Strongly Connected Components Theory</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Section title="Problem" icon={<GitBranch className="h-6 w-6 text-fuchsia-600"/>}>
            <p className="text-sm text-slate-600 leading-relaxed">Partition a directed graph into maximal subsets where each pair of vertices is mutually reachable. Collapse each SCC to produce a condensation DAG enabling higher-level analyses (e.g., layering, DP across components).</p>
          </Section>
          <Section title="Kosaraju's Two-Pass Method" icon={<Layers className="h-6 w-6 text-fuchsia-600"/>}>
            <ul className="text-sm text-slate-600 space-y-2 leading-relaxed list-disc list-inside">
              <li>First DFS: push vertices by finish time (postorder).</li>
              <li>Transpose graph (reverse all edges).</li>
              <li>Second DFS in reverse finish order; each DFS tree = one SCC.</li>
              <li>Correctness hinges on finish-time ordering exposing source components first in GT.</li>
            </ul>
          </Section>
          <Section title="Tarjan's Lowlink Method" icon={<Blocks className="h-6 w-6 text-fuchsia-600"/>}>
            <ul className="text-sm text-slate-600 space-y-2 leading-relaxed list-disc list-inside">
              <li>Single DFS assigns index (discovery time) and lowlink.</li>
              <li>lowlink[v] = smallest index reachable from v (following tree + back edges).</li>
              <li>When lowlink[v] == index[v], v is root of an SCC; pop stack until v.</li>
              <li>Stack membership distinguishes back edges from cross/forward edges.</li>
            </ul>
          </Section>
          <Section title="Pseudocode (Kosaraju)" icon={<Play className="h-6 w-6 text-fuchsia-600"/>}>
            <PseudocodeBlock code={kosaraju} />
          </Section>
          <Section title="Pseudocode (Tarjan)" icon={<Play className="h-6 w-6 text-fuchsia-600"/>}>
            <PseudocodeBlock code={tarjan} />
          </Section>
          <Section title="Lowlink Intuition" icon={<Repeat className="h-6 w-6 text-fuchsia-600"/>}>
            <ul className="text-sm text-slate-600 space-y-2 leading-relaxed list-disc list-inside">
              <li>Tracks earliest ancestor reachable via at most one back edge + tree edges.</li>
              <li>Root of SCC has lowlink == its own discovery index — no path to earlier active vertex.</li>
              <li>Back edges update lowlink allowing collapse detection.</li>
            </ul>
          </Section>
          <Section title="Complexity" icon={<Cpu className="h-6 w-6 text-fuchsia-600"/>}>
            <div className="grid md:grid-cols-3 gap-4 text-xs mb-4">
              <Metric color="fuchsia" label="Kosaraju" value="O(n+m)" />
              <Metric color="emerald" label="Tarjan" value="O(n+m)" />
              <Metric color="rose" label="Space" value="O(n)" />
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">All edges/vertices processed constant times; Tarjan avoids explicit transpose pass.</p>
          </Section>
          <Section title="Edge Cases" icon={<AlertTriangle className="h-6 w-6 text-fuchsia-600"/>}>
            <ul className="text-sm text-slate-600 space-y-2 leading-relaxed list-disc list-inside">
              <li>Singleton vertex with no edges forms its own SCC.</li>
              <li>Self-loop vertex is an SCC of size 1 (loop does not enlarge component).</li>
              <li>Multiple identical edges do not affect partition.</li>
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
  return <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.55}} className="bg-white rounded-2xl shadow-sm border border-fuchsia-100 p-6">
    <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">{icon}{title}</h2>
    {children}
  </motion.div>;
}

function Metric({color,label,value}:{color:string;label:string;value:string}){ const map:Record<string,string>={fuchsia:'fuchsia',emerald:'emerald',rose:'rose'}; const c=map[color]||'fuchsia'; return <div className={`p-3 rounded-xl bg-${c}-50 border border-${c}-100`}><div className={`font-semibold text-${c}-700 text-[11px] uppercase tracking-wide mb-1`}>{label}</div><div className="font-mono">{value}</div></div>; }

function SideSummary(){
  return <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.55}} className="bg-white rounded-2xl shadow-sm border border-fuchsia-100 p-6">
    <h2 className="text-lg font-semibold text-slate-800 mb-4">Summary</h2>
    <ul className="text-sm text-slate-600 space-y-2">
      <li>SCCs partition directed graph</li>
      <li>Kosaraju: 2 DFS passes</li>
      <li>Tarjan: lowlink single pass</li>
      <li>Condensation forms DAG</li>
    </ul>
  </motion.div>;
}

function Navigation(){
  return <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.55}} className="bg-white rounded-2xl shadow-sm border border-fuchsia-100 p-6">
    <h2 className="text-lg font-semibold text-slate-800 mb-4">Explore</h2>
    <div className="flex flex-col gap-3">
      <Link href="/algorithms/graph/strongly-connected-components/simulation" className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-fuchsia-600 text-white font-semibold hover:bg-fuchsia-700">Simulation <ArrowRight className="h-5 w-5 ml-2"/></Link>
      <Link href="/algorithms/graph/strongly-connected-components" className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-gray-200 text-slate-700 font-semibold hover:bg-gray-300">Overview</Link>
      <Link href="/algorithms/graph" className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-slate-800 text-white font-semibold hover:bg-slate-900">All Graph Algorithms</Link>
    </div>
  </motion.div>;
}
