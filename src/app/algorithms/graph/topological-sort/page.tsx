"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ListOrdered, GitBranch, Layers, Zap, AlertTriangle, CheckCircle, Cpu, Info } from 'lucide-react';

export default function TopoSortOverview(){
  return <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 text-gray-700">
  <div className="container max-w-screen-2xl mx-auto px-4 py-12 text-gray-700">
      <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="mb-10 text-gray-700">
        <Link href="\algorithms\graph" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Back to Graph Algorithms</Link>
        <h1 className="text-4xl font-bold text-slate-800 mb-4 flex items-center gap-3">
          <span className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-amber-500 text-white shadow text-gray-600">
            <ListOrdered className="h-8 w-8 text-gray-700"/>
          </span>
          Topological Sorting (DAG Ordering)
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">Linear ordering of DAG nodes respecting edge directions; basis for dependency resolution and DAG dynamic programming.</p>
      </motion.div>
      <div className="grid lg:grid-cols-3 gap-8 text-gray-700">
        <div className="lg:col-span-2 space-y-8 text-gray-700">
          <OverviewCard/>
          <ApproachesCard/>
          <UseCasesCard/>
          <ComplexityCard/>
          <CycleCard/>
          <ComparisonCard/>
        </div>
        <div className="space-y-8 text-gray-700">
          <QuickFactsCard/>
          <NavigationCard/>
        </div>
      </div>
      <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.4}} className="flex justify-between items-center mt-16 text-gray-700">
        <Link href="\algorithms\graph\prim" className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Back: Prim&apos;s</Link>
  <Link href="/algorithms/graph/strongly-connected-components" className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-gray-100">Next: SCC <ArrowRight className="h-5 w-5 ml-2 text-gray-700"/></Link>
      </motion.div>
    </div>
  </div>;
}

function Card({children}:{children:React.ReactNode}){ return <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.35}} className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6 text-gray-700">{children}</motion.div>; }
function Heading({icon,children}:{icon:React.ReactNode;children:React.ReactNode}){ return <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">{icon}{children}</h2>; }

function OverviewCard(){
  return <Card>
    <Heading icon={<GitBranch className="h-6 w-6 text-amber-600"/>}>Overview</Heading>
    <p className="text-sm text-slate-600 leading-relaxed mb-4">A <span className="font-semibold text-slate-800">topological order</span> of a directed acyclic graph (DAG) arranges vertices linearly so every directed edge u→v places u before v. It exists <em>iff</em> the graph has no directed cycle.</p>
    <div className="grid md:grid-cols-3 gap-4 text-xs text-gray-600">
      <Metric color="amber" label="Applies To" value="DAGs"/>
      <Metric color="emerald" label="Output" value="Linear order"/>
      <Metric color="rose" label="Variants" value="Kahn / DFS"/>
    </div>
  </Card>;
}

function ApproachesCard(){
  return <Card>
    <Heading icon={<Layers className="h-6 w-6 text-amber-600"/>}>Core Approaches</Heading>
    <ul className="text-sm text-slate-600 space-y-2 leading-relaxed list-disc list-inside">
      <li><span className="font-semibold text-gray-800">Kahn&apos;s Algorithm:</span> Maintain vertices with in-degree 0 in queue; remove layer by layer.</li>
      <li><span className="font-semibold text-gray-800">DFS Postorder:</span> Reverse finishing times of DFS on DAG.</li>
      <li>Kahn gives natural cycle detection (leftover vertices).</li>
    </ul>
  </Card>;
}

function UseCasesCard(){
  return <Card>
    <Heading icon={<Zap className="h-6 w-6 text-amber-600"/>}>Use Cases</Heading>
    <ul className="text-sm text-slate-600 space-y-2 leading-relaxed list-disc list-inside">
      <li>Build / compile dependency resolution</li>
      <li>Task scheduling with prerequisites</li>
      <li>Course prerequisite ordering</li>
      <li>Linearization before DP on DAG (longest path, etc.)</li>
    </ul>
  </Card>;
}

function ComplexityCard(){
  return <Card>
    <Heading icon={<Cpu className="h-6 w-6 text-amber-600"/>}>Complexity</Heading>
    <div className="grid md:grid-cols-3 gap-4 text-xs mb-4 text-gray-600">
      <Metric color="amber" label="Time" value="O(n + m)"/>
      <Metric color="emerald" label="Space" value="O(n + m)"/>
      <Metric color="rose" label="Queue / Stack" value="O(n)"/>
    </div>
    <p className="text-sm text-slate-600 leading-relaxed">Both Kahn and DFS traverse each vertex and edge once ignoring constant overheads.</p>
  </Card>;
}

function CycleCard(){
  return <Card>
    <Heading icon={<AlertTriangle className="h-6 w-6 text-amber-600"/>}>Cycle Detection</Heading>
    <ul className="text-sm text-slate-600 space-y-2 leading-relaxed list-disc list-inside">
      <li>Kahn: If queue empties early and not all vertices output ⇒ cycle exists.</li>
      <li>DFS: Detect back edges using color/recursion stack.</li>
    </ul>
  </Card>;
}

function ComparisonCard(){
  return <Card>
    <Heading icon={<CheckCircle className="h-6 w-6 text-amber-600"/>}>Comparison</Heading>
    <div className="overflow-x-auto text-gray-700">
      <table className="text-xs w-full border border-slate-200 text-gray-600">
        <thead className="bg-slate-100 text-slate-700"><tr><th className="p-2 text-left font-semibold text-gray-800">Method</th><th className="p-2 text-left font-semibold text-gray-800">Mechanism</th><th className="p-2 text-left font-semibold text-gray-800">Cycle Signal</th><th className="p-2 text-left font-semibold text-gray-800">Stability</th></tr></thead>
        <tbody className="divide-y divide-slate-200 text-gray-700">
          <tr className="hover:bg-amber-50/40 text-gray-700"><td className="p-2 font-mono text-gray-700">Kahn</td><td className="p-2 text-gray-700">Queue of in-degree 0</td><td className="p-2 text-gray-700">Remaining vertices</td><td className="p-2 text-gray-700">Depends on queue order</td></tr>
          <tr className="hover:bg-amber-50/40 text-gray-700"><td className="p-2 font-mono text-gray-700">DFS</td><td className="p-2 text-gray-700">Reverse finish times</td><td className="p-2 text-gray-700">Back edge</td><td className="p-2 text-gray-700">Depends on DFS order</td></tr>
        </tbody>
      </table>
    </div>
  </Card>;
}

function QuickFactsCard(){
  return <Card>
    <h2 className="text-xl font-semibold text-slate-800 mb-4">Quick Facts</h2>
    <ul className="text-sm text-slate-600 space-y-2">
      <li><span className="font-semibold text-slate-800">Graph Type:</span> Directed Acyclic (DAG)</li>
      <li><span className="font-semibold text-slate-800">Multiple Orders:</span> Usually non-unique</li>
      <li><span className="font-semibold text-slate-800">Detects Cycles:</span> Yes (implicitly)</li>
      <li><span className="font-semibold text-slate-800">Foundation For:</span> DP on DAG</li>
    </ul>
  </Card>;
}

function NavigationCard(){
  return <Card>
    <h2 className="text-xl font-semibold text-slate-800 mb-4">Next Steps</h2>
    <p className="text-sm text-slate-600 mb-4">Understand the degree decay process (Kahn) then animate queue evolution.</p>
    <div className="flex flex-col gap-3 text-gray-700">
      <Link href="/algorithms/graph/topological-sort/theory" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-amber-600 text-white font-semibold hover:bg-amber-700 text-gray-100">Theory <ArrowRight className="h-5 w-5 ml-2 text-gray-700"/></Link>
      <Link href="/algorithms/graph/topological-sort/simulation" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-slate-800 text-white font-semibold hover:bg-slate-900 text-gray-100">Simulation <ArrowRight className="h-5 w-5 ml-2 text-gray-700"/></Link>
      <Link href="/algorithms/graph" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gray-200 text-slate-700 font-semibold hover:bg-gray-300">All Graph Algorithms</Link>
    </div>
  </Card>;
}

function Metric({color,label,value}:{color:string;label:string;value:string}){ const map:Record<string,string>={amber:'amber',emerald:'emerald',rose:'rose'}; const c = map[color] || 'amber'; return <div className={`p-3 rounded-xl bg-${c}-50 border border-${c}-100`}><div className={`font-semibold text-${c}-700 text-[11px] uppercase tracking-wide mb-1`}>{label}</div><div className="font-mono text-gray-700">{value}</div></div>; }
