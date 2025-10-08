"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Network, GitBranch, Layers, Zap, Cpu, CheckCircle, Merge, Split, Info } from 'lucide-react';

export default function SCCOverview(){
  return <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 via-pink-50 to-rose-50 text-gray-700">
  <div className="container max-w-screen-2xl mx-auto px-4 py-12 text-gray-700">
      <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="mb-10 text-gray-700">
        <Link href="\algorithms\graph" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Back to Graph Algorithms</Link>
        <h1 className="text-4xl font-bold text-slate-800 mb-4 flex items-center gap-3">
          <span className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-fuchsia-600 text-white shadow text-gray-600">
            <Network className="h-8 w-8 text-gray-700"/>
          </span>
          Strongly Connected Components (SCC)
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">Decomposition of a directed graph into maximal mutually reachable sets; condensation graph reveals high-level dependency DAG.</p>
      </motion.div>
      <div className="grid lg:grid-cols-3 gap-8 text-gray-700">
        <div className="lg:col-span-2 space-y-8 text-gray-700">
          <OverviewCard/>
          <DefinitionCard/>
            <AlgorithmsCard/>
          <ApplicationsCard/>
          <ComplexityCard/>
          <ComparisonCard/>
        </div>
        <div className="space-y-8 text-gray-700">
          <QuickFactsCard/>
          <NavigationCard/>
        </div>
      </div>
      <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.4}} className="flex justify-between items-center mt-16 text-gray-700">
        <Link href="\algorithms\graph\topological-sort" className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Back: topological-sort</Link>
      </motion.div>
    </div>
  </div>;
}

function Card({children}:{children:React.ReactNode}){ return <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.35}} className="bg-white rounded-2xl shadow-sm border border-fuchsia-100 p-6 text-gray-700">{children}</motion.div>; }
function Heading({icon,children}:{icon:React.ReactNode;children:React.ReactNode}){ return <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">{icon}{children}</h2>; }

function OverviewCard(){
  return <Card>
    <Heading icon={<GitBranch className="h-6 w-6 text-fuchsia-600"/>}>Overview</Heading>
    <p className="text-sm text-slate-600 leading-relaxed mb-4">A <span className="font-semibold text-slate-800">strongly connected component</span> (SCC) in a directed graph is a maximal set of vertices mutually reachable. Collapsing each SCC yields a DAG (condensation graph).</p>
    <div className="grid md:grid-cols-3 gap-4 text-xs text-gray-600">
      <Metric color="fuchsia" label="Graph" value="Directed"/>
      <Metric color="emerald" label="Output" value="Component sets"/>
      <Metric color="rose" label="Condensation" value="DAG"/>
    </div>
  </Card>;
}

function DefinitionCard(){
  return <Card>
    <Heading icon={<Layers className="h-6 w-6 text-fuchsia-600"/>}>Definition</Heading>
    <ul className="text-sm text-slate-600 space-y-2 leading-relaxed list-disc list-inside">
      <li>u and v are strongly connected if u→v and v→u (path-wise).</li>
      <li>SCC partitions vertex set.</li>
      <li>Resulting condensation graph is acyclic.</li>
    </ul>
  </Card>;
}

function AlgorithmsCard(){
  return <Card>
    <Heading icon={<Zap className="h-6 w-6 text-fuchsia-600"/>}>Algorithms</Heading>
    <ul className="text-sm text-slate-600 space-y-2 leading-relaxed list-disc list-inside">
      <li><span className="font-semibold text-gray-800">Kosaraju:</span> DFS order + transpose DFS.</li>
      <li><span className="font-semibold text-gray-800">Tarjan:</span> Single DFS with stack & lowlink.</li>
      <li><span className="font-semibold text-gray-800">Gabow:</span> Two stacks variant.</li>
    </ul>
  </Card>;
}

function ApplicationsCard(){
  return <Card>
    <Heading icon={<Merge className="h-6 w-6 text-fuchsia-600"/>}>Applications</Heading>
    <ul className="text-sm text-slate-600 space-y-2 leading-relaxed list-disc list-inside">
      <li>Cycle detection & grouping</li>
      <li>Program module dependency condensation</li>
      <li>2-SAT implication graph components</li>
      <li>Deadlock / strongly coupled system analysis</li>
    </ul>
  </Card>;
}

function ComplexityCard(){
  return <Card>
    <Heading icon={<Cpu className="h-6 w-6 text-fuchsia-600"/>}>Complexity</Heading>
    <div className="grid md:grid-cols-3 gap-4 text-xs mb-4 text-gray-600">
      <Metric color="fuchsia" label="Kosaraju" value="O(n+m)"/>
      <Metric color="emerald" label="Tarjan" value="O(n+m)"/>
      <Metric color="rose" label="Space" value="O(n)"/>
    </div>
    <p className="text-sm text-slate-600 leading-relaxed">Linear time: each edge & vertex processed constant number of times.</p>
  </Card>;
}

function ComparisonCard(){
  return <Card>
    <Heading icon={<CheckCircle className="h-6 w-6 text-fuchsia-600"/>}>Comparison</Heading>
    <div className="overflow-x-auto text-gray-700">
      <table className="text-xs w-full border border-slate-200 text-gray-600">
        <thead className="bg-slate-100 text-slate-700"><tr><th className="p-2 text-left font-semibold text-gray-800">Algorithm</th><th className="p-2 text-left font-semibold text-gray-800">Passes</th><th className="p-2 text-left font-semibold text-gray-800">Key Structure</th><th className="p-2 text-left font-semibold text-gray-800">When Preferred</th></tr></thead>
        <tbody className="divide-y divide-slate-200 text-gray-700">
          <tr className="hover:bg-fuchsia-50/40 text-gray-700"><td className="p-2 font-mono text-gray-700">Kosaraju</td><td className="p-2 text-gray-700">2 DFS + transpose</td><td className="p-2 text-gray-700">Stack (finish order)</td><td className="p-2 text-gray-700">Clarity, teaching</td></tr>
          <tr className="hover:bg-fuchsia-50/40 text-gray-700"><td className="p-2 font-mono text-gray-700">Tarjan</td><td className="p-2 text-gray-700">1 DFS</td><td className="p-2 text-gray-700">Lowlink + stack</td><td className="p-2 text-gray-700">Performance simplicity</td></tr>
          <tr className="hover:bg-fuchsia-50/40 text-gray-700"><td className="p-2 font-mono text-gray-700">Gabow</td><td className="p-2 text-gray-700">1 DFS</td><td className="p-2 text-gray-700">Two stacks</td><td className="p-2 text-gray-700">Alternate lowlink avoidance</td></tr>
        </tbody>
      </table>
    </div>
  </Card>;
}

function QuickFactsCard(){
  return <Card>
    <h2 className="text-xl font-semibold text-slate-800 mb-4">Quick Facts</h2>
    <ul className="text-sm text-slate-600 space-y-2">
      <li><span className="font-semibold text-slate-800">Output Form:</span> Partition of V</li>
      <li><span className="font-semibold text-slate-800">Condensation:</span> Always DAG</li>
      <li><span className="font-semibold text-slate-800">Edge Types:</span> All directed edges processed</li>
      <li><span className="font-semibold text-slate-800">2-SAT:</span> Uses SCC + implications</li>
    </ul>
  </Card>;
}

function NavigationCard(){
  return <Card>
    <h2 className="text-xl font-semibold text-slate-800 mb-4">Next Steps</h2>
    <p className="text-sm text-slate-600 mb-4">Learn the two-pass Kosaraju process and lowlink intuition for Tarjan, then animate SCC discovery.</p>
    <div className="flex flex-col gap-3 text-gray-700">
      <Link href="/algorithms/graph/strongly-connected-components/theory" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-fuchsia-600 text-white font-semibold hover:bg-fuchsia-700 text-gray-100">Theory <ArrowRight className="h-5 w-5 ml-2 text-gray-700"/></Link>
      <Link href="/algorithms/graph/strongly-connected-components/simulation" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-slate-800 text-white font-semibold hover:bg-slate-900 text-gray-100">Simulation <ArrowRight className="h-5 w-5 ml-2 text-gray-700"/></Link>
      <Link href="/algorithms/graph" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gray-200 text-slate-700 font-semibold hover:bg-gray-300">All Graph Algorithms</Link>
    </div>
  </Card>;
}

function Metric({color,label,value}:{color:string;label:string;value:string}){ const map:Record<string,string>={fuchsia:'fuchsia',emerald:'emerald',rose:'rose'}; const c=map[color]||'fuchsia'; return <div className={`p-3 rounded-xl bg-${c}-50 border border-${c}-100`}><div className={`font-semibold text-${c}-700 text-[11px] uppercase tracking-wide mb-1`}>{label}</div><div className="font-mono text-gray-700">{value}</div></div>; }
