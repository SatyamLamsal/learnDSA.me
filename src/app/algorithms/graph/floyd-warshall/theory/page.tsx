"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sigma, PenTool, Cpu, AlertTriangle, GitBranch, Play } from 'lucide-react';
import PseudocodeBlock from '@/components/PseudocodeBlock';

const pseudocode = `FLOYD-WARSHALL(dist, n):
  for i in 1..n:
    dist[i][i] = min(0, dist[i][i])  # allow 0 self
  for k in 1..n:
    for i in 1..n:
      for j in 1..n:
        if dist[i][k] + dist[k][j] < dist[i][j]:
          dist[i][j] = dist[i][k] + dist[k][j]
  # negative cycle detection
  for v in 1..n:
    if dist[v][v] < 0:
      report "negative cycle reachable from v"`;

export default function FloydWarshallTheory(){
  return <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-rose-50 text-gray-100">
  <div className="container max-w-screen-2xl mx-auto px-4 py-12 text-gray-100">
      <Link href="/algorithms/graph/floyd-warshall" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2 text-gray-100"/>Overview</Link>
      <h1 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3"><Sigma className="h-8 w-8 text-indigo-600"/> Floyd–Warshall Theory</h1>
      <div className="grid lg:grid-cols-3 gap-8 text-gray-100">
        <div className="lg:col-span-2 space-y-8 text-gray-100">
          <Section title="Problem & Goal" icon={<Sigma className="h-6 w-6 text-indigo-600"/>}>
            <p className="text-sm text-slate-600 leading-relaxed">Compute shortest path distances between <span className="font-semibold text-slate-800">all ordered pairs</span> of vertices in a directed weighted graph (can include negative edges). Detect whether any <span className="font-semibold text-slate-800">negative cycle</span> is reachable from a vertex.</p>
          </Section>
          <Section title="Dynamic Programming Formulation" icon={<PenTool className="h-6 w-6 text-indigo-600"/>}>
            <ul className="text-sm text-slate-600 space-y-3 leading-relaxed">
              <li><span className="font-semibold text-slate-800">State:</span> <code>dist_k[i][j]</code> shortest distance from i to j using only intermediate vertices in <code>{'{'}1..k{'}'}</code>.</li>
              <li><span className="font-semibold text-slate-800">Base:</span> <code>dist_0[i][j]</code> = direct edge weight (∞ if none); <code>dist_0[i][i] = 0</code>.</li>
              <li><span className="font-semibold text-slate-800">Transition:</span> <code>{'dist_k[i][j] = min(dist_{k-1}[i][j], dist_{k-1}[i][k] + dist_{k-1}[k][j])'}</code></li>
              <li><span className="font-semibold text-slate-800">Optimization:</span> Update in-place: treat matrix as holding <code>{'dist_{k-1}'}</code> then upgrade to <code>dist_k</code>.</li>
              <li><span className="font-semibold text-slate-800">Cycle Detection:</span> After loops, if <code>dist[i][i] &lt; 0</code> a negative cycle is reachable from i.</li>
            </ul>
          </Section>
          <Section title="Pseudocode" icon={<Play className="h-6 w-6 text-indigo-600"/>}>
            <PseudocodeBlock code={pseudocode} />
          </Section>
          <Section title="Complexity" icon={<Cpu className="h-6 w-6 text-indigo-600"/>}>
            <div className="grid md:grid-cols-3 gap-4 text-xs mb-4 text-gray-300">
              <Metric color="indigo" label="Time" value="O(n^3)" />
              <Metric color="rose" label="Space" value="O(n^2)" />
              <Metric color="emerald" label="Updates" value="n^3" />
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">Triple nested loops produce cubic time. Space dominated by distance (and optional successor) matrix. Works best for dense graphs (edge count near <code>n^2</code>).</p>
          </Section>
          <Section title="Negative Cycles" icon={<AlertTriangle className="h-6 w-6 text-indigo-600"/>}>
            <p className="text-sm text-slate-600 leading-relaxed">If <code>dist[i][i] &lt; 0</code> after completion, then there exists a cycle of negative total weight reachable from i. Distances involving that cycle are not well-defined (can be driven arbitrarily low).</p>
          </Section>
          <Section title="Path Reconstruction" icon={<GitBranch className="h-6 w-6 text-indigo-600"/>}>
            <p className="text-sm text-slate-600 leading-relaxed">Maintain a <code>next[i][j]</code> matrix: initialize to j if edge (i,j) exists. When improving <code>dist[i][j]</code> via k, set <code>next[i][j] = next[i][k]</code>. To reconstruct, iterate: i → next[i][j] until reaching j (or detect cycle if repeated).</p>
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

function Section({title, icon, children}:{title:string; icon:React.ReactNode; children:React.ReactNode}){
  return <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5}} className="bg-white rounded-2xl shadow-sm border border-indigo-100 p-6 text-gray-700">
    <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">{icon}{title}</h2>
    {children}
  </motion.div>;
}

function Metric({color,label,value}:{color:string;label:string;value:string}){
  const map:Record<string,string>={indigo:'indigo',rose:'rose',emerald:'emerald'};
  const c = map[color] || 'indigo';
  return <div className={`p-3 rounded-xl bg-${c}-50 border border-${c}-100`}>
    <div className={`font-semibold text-${c}-700 text-[11px] uppercase tracking-wide mb-1`}>{label}</div>
    <div className="font-mono text-gray-100">{value}</div>
  </div>;
}

function SideSummary(){
  return <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5}} className="bg-white rounded-2xl shadow-sm border border-indigo-100 p-6 text-gray-700">
    <h2 className="text-lg font-semibold text-slate-800 mb-4">Summary</h2>
    <ul className="text-sm text-slate-600 space-y-2">
      <li>All-pairs shortest paths in dense graphs</li>
      <li>Handles negative edges & detects cycles</li>
      <li>Dynamic programming over allowed intermediates</li>
      <li>In-place matrix relaxation pattern</li>
      <li>Foundation for transitive closure & APSP variants</li>
    </ul>
  </motion.div>;
}

function Navigation(){
  return <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5}} className="bg-white rounded-2xl shadow-sm border border-indigo-100 p-6 text-gray-700">
    <h2 className="text-lg font-semibold text-slate-800 mb-4">Explore</h2>
    <div className="flex flex-col gap-3 text-gray-100">
      <Link href="/algorithms/graph/floyd-warshall/simulation" className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 text-gray-100">Simulation <ArrowRight className="h-5 w-5 ml-2 text-gray-100"/></Link>
      <Link href="/algorithms/graph/floyd-warshall" className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-gray-200 text-slate-700 font-semibold hover:bg-gray-300">Overview</Link>
      <Link href="/algorithms/graph" className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-slate-800 text-white font-semibold hover:bg-slate-900 text-gray-100">All Graph Algorithms</Link>
    </div>
  </motion.div>;
}
