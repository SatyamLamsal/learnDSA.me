"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Scissors, GitBranch, Shield, Layers, Cpu, CheckCircle, AlertTriangle, Play } from 'lucide-react';
import PseudocodeBlock from '@/components/PseudocodeBlock';

const pseudocode = `KRUSKAL(G=(V,E), w):
  sort E by non-decreasing w
  make-set(v) for each v in V
  MST ← ∅
  for each (u,v) in E (in order):
    if find(u) ≠ find(v):
      MST ← MST ∪ {(u,v)}
      union(u,v)
    // else discard (cycle)
  return MST`;

export default function KruskalTheory(){
  return <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-sky-50 text-gray-100">
  <div className="container max-w-screen-2xl mx-auto px-4 py-12 text-gray-100">
      <Link href="/algorithms/graph/kruskal" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2 text-gray-100"/>Overview</Link>
      <h1 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3"><Scissors className="h-8 w-8 text-indigo-600"/> Kruskal&apos;s Algorithm Theory</h1>
      <div className="grid lg:grid-cols-3 gap-8 text-gray-100">
        <div className="lg:col-span-2 space-y-8 text-gray-100">
          <Section title="Problem" icon={<GitBranch className="h-6 w-6 text-indigo-600"/>}>
            <p className="text-sm text-slate-600 leading-relaxed">Given a connected, undirected, weighted graph, find a subset of edges forming a spanning tree of minimum total weight. For disconnected graphs, Kruskal yields a minimum spanning forest.</p>
          </Section>
          <Section title="Cut Property" icon={<Shield className="h-6 w-6 text-indigo-600"/>}>
            <ul className="text-sm text-slate-600 space-y-2 leading-relaxed list-disc list-inside">
              <li>For any partition (cut) of vertices, the minimum-weight edge crossing that cut is safe to add to some MST.</li>
              <li>Kruskal simulates picking <em>globally</em> safe edges by scanning weights in order.</li>
            </ul>
          </Section>
          <Section title="Disjoint Set Union (DSU)" icon={<Layers className="h-6 w-6 text-indigo-600"/>}>
            <p className="text-sm text-slate-600 leading-relaxed mb-3">Efficiently maintains components as edges are added.</p>
            <ul className="text-sm text-slate-600 space-y-2 leading-relaxed list-disc list-inside">
              <li><span className="font-semibold text-gray-100">make-set(x):</span> Initialize singleton.</li>
              <li><span className="font-semibold text-gray-100">find(x):</span> Return representative (with path compression).</li>
              <li><span className="font-semibold text-gray-100">union(a,b):</span> Merge roots (union by rank/size).</li>
              <li>Amortized near-constant: α(n) (inverse Ackermann).</li>
            </ul>
          </Section>
          <Section title="Pseudocode" icon={<Play className="h-6 w-6 text-indigo-600"/>}>
            <PseudocodeBlock code={pseudocode} />
          </Section>
          <Section title="Complexity" icon={<Cpu className="h-6 w-6 text-indigo-600"/>}>
            <div className="grid md:grid-cols-3 gap-4 text-xs mb-4 text-gray-300">
              <Metric color="indigo" label="Sort" value="O(m log m)" />
              <Metric color="emerald" label="DSU Ops" value="O(m α(n))" />
              <Metric color="rose" label="Total" value="O(m log n)" />
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">Since m ≤ n^2, log m = O(log n). Sorting dominates for typical implementations.</p>
          </Section>
          <Section title="Correctness Sketch" icon={<CheckCircle className="h-6 w-6 text-indigo-600"/>}>
            <ul className="text-sm text-slate-600 space-y-2 leading-relaxed list-disc list-inside">
              <li>Invariant: chosen edges always form a forest.</li>
              <li>Each added edge is safe by cut property (it’s the minimum crossing some cut).</li>
              <li>When |T| = n−1 edges, forest is connected ⇒ an MST.</li>
            </ul>
          </Section>
          <Section title="Edge Cases" icon={<AlertTriangle className="h-6 w-6 text-indigo-600"/>}>
            <ul className="text-sm text-slate-600 space-y-2 leading-relaxed list-disc list-inside">
              <li><span className="font-semibold text-gray-100">Disconnected:</span> Produces minimum spanning forest (one per component).</li>
              <li><span className="font-semibold text-gray-100">Duplicate Weights:</span> Any order among equal weights still yields an MST.</li>
              <li><span className="font-semibold text-gray-100">Negative Weights:</span> Fully supported; sorting handles them.</li>
            </ul>
          </Section>
        </div>
        <div className="space-y-8 text-gray-100">
          <SideSummary />
          <Navigation />
        </div>
      </div>
    </div>
  </div>;
}

function Section({title,icon,children}:{title:string;icon:React.ReactNode;children:React.ReactNode}){
  return <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.55}} className="bg-white rounded-2xl shadow-sm border border-indigo-100 p-6 text-gray-700">
    <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">{icon}{title}</h2>
    {children}
  </motion.div>;
}

function Metric({color,label,value}:{color:string;label:string;value:string}){
  const map:Record<string,string>={indigo:'indigo',emerald:'emerald',rose:'rose'}; const c = map[color] || 'indigo';
  return <div className={`p-3 rounded-xl bg-${c}-50 border border-${c}-100`}>
    <div className={`font-semibold text-${c}-700 text-[11px] uppercase tracking-wide mb-1`}>{label}</div>
    <div className="font-mono text-gray-100">{value}</div>
  </div>;
}

function SideSummary(){
  return <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.55}} className="bg-white rounded-2xl shadow-sm border border-indigo-100 p-6 text-gray-700">
    <h2 className="text-lg font-semibold text-slate-800 mb-4">Summary</h2>
    <ul className="text-sm text-slate-600 space-y-2">
      <li>Greedy by global edge order</li>
      <li>Uses DSU for cycle tests</li>
      <li>Safe edges via cut property</li>
      <li>Handles negative weights</li>
      <li>Yields MST / forest</li>
    </ul>
  </motion.div>;
}

function Navigation(){
  return <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.55}} className="bg-white rounded-2xl shadow-sm border border-indigo-100 p-6 text-gray-700">
    <h2 className="text-lg font-semibold text-slate-800 mb-4">Explore</h2>
    <div className="flex flex-col gap-3 text-gray-100">
      <Link href="/algorithms/graph/kruskal/simulation" className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 text-gray-100">Simulation <ArrowRight className="h-5 w-5 ml-2 text-gray-100"/></Link>
      <Link href="/algorithms/graph/kruskal" className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-gray-200 text-slate-700 font-semibold hover:bg-gray-300">Overview</Link>
      <Link href="/algorithms/graph" className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-slate-800 text-white font-semibold hover:bg-slate-900 text-gray-100">All Graph Algorithms</Link>
    </div>
  </motion.div>;
}
