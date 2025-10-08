"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, TreePine, Layers, Zap, GitBranch, Cpu, Compass } from 'lucide-react';

export default function PrimOverview(){
  return <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 text-gray-700">
  <div className="container max-w-screen-2xl mx-auto px-4 py-12 text-gray-700">
      <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="mb-10 text-gray-700">
        <Link href="\algorithms\graph" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Back to Graph Algorithms</Link>
        <h1 className="text-4xl font-bold text-slate-800 mb-4 flex items-center gap-3">
          <span className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-emerald-600 text-white shadow text-gray-600">
            <TreePine className="h-8 w-8 text-gray-700"/>
          </span>
          Prim&apos;s Minimum Spanning Tree
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">Tree-expanding greedy MST algorithm leveraging key[] frontier weights and a priority queue to choose the minimum crossing edge each step.</p>
      </motion.div>
      <div className="grid lg:grid-cols-3 gap-8 text-gray-700">
        <div className="lg:col-span-2 space-y-8 text-gray-700">
          <OverviewCard/>
          <CoreStepsCard/>
          <WhyItWorksCard/>
          <ComplexityCard/>
          <ComparisonCard/>
        </div>
        <div className="space-y-8 text-gray-700">
          <QuickFactsCard/>
          <NavigationCard/>
        </div>
      </div>
      <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.4}} className="flex justify-between items-center mt-16 text-gray-700">
        <Link href="\algorithms\graph\kruskal" className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Back: Kruskal</Link>
        <Link href="\algorithms\graph\topological-sort" className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-gray-100">Next:topological-sort <ArrowRight className="h-5 w-5 ml-2 text-gray-700"/></Link>
      </motion.div>
    </div>
  </div>;
}

function Card({children}:{children:React.ReactNode}){ return <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.35}} className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6 text-gray-700">{children}</motion.div>; }
function Heading({icon,children}:{icon:React.ReactNode;children:React.ReactNode}){ return <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">{icon}{children}</h2>; }

function OverviewCard(){
  return <Card>
    <Heading icon={<GitBranch className="h-6 w-6 text-emerald-600"/>}>Overview</Heading>
    <p className="text-sm text-slate-600 leading-relaxed mb-4">Prim&apos;s algorithm grows a <span className="font-semibold text-slate-800">minimum spanning tree</span> from an arbitrary start vertex by repeatedly taking the minimum-weight edge that connects the current tree to a new vertex (the cut frontier). It parallels Dijkstra&apos;s style but tracks edge weights instead of distances.</p>
    <div className="grid md:grid-cols-3 gap-4 text-xs text-gray-600">
      <Metric color="emerald" label="Category" value="Greedy"/>
      <Metric color="sky" label="Structure" value="Growing Tree"/>
      <Metric color="rose" label="Data" value="Priority Queue"/>
    </div>
  </Card>;
}

function CoreStepsCard(){
  return <Card>
    <Heading icon={<Layers className="h-6 w-6 text-emerald-600"/>}>Core Steps</Heading>
    <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600">
      <li>Pick arbitrary start vertex; set key[start]=0.</li>
      <li>Push start into priority queue by key.</li>
      <li>Extract-min vertex u not yet in tree.</li>
      <li>For each edge (u,v), if v not in tree and w &lt; key[v], update key[v], parent[v].</li>
      <li>Repeat until all vertices added (n−1 edges chosen).</li>
    </ol>
  </Card>;
}

function WhyItWorksCard(){
  return <Card>
    <Heading icon={<Zap className="h-6 w-6 text-emerald-600"/>}>Why It Works</Heading>
    <ul className="text-sm text-slate-600 space-y-2 leading-relaxed list-disc list-inside">
      <li><strong>Cut Property:</strong> Each step chooses the lightest edge crossing the frontier cut.</li>
      <li>Keys maintain current best crossing edge per outside vertex.</li>
      <li>Extract-min yields a safe vertex addition.</li>
    </ul>
  </Card>;
}

function ComplexityCard(){
  return <Card>
    <Heading icon={<Cpu className="h-6 w-6 text-emerald-600"/>}>Complexity</Heading>
    <div className="grid md:grid-cols-3 gap-4 text-xs mb-4 text-gray-600">
      <Metric color="emerald" label="Binary Heap" value="O(m log n)"/>
      <Metric color="sky" label="Fib Heap" value="O(m + n log n)"/>
      <Metric color="rose" label="Dense Adj Matrix" value="O(n^2)"/>
    </div>
    <p className="text-sm text-slate-600 leading-relaxed">Choice of priority queue structure changes time bounds similarly to Dijkstra. For dense graphs, a simple array (O(n^2)) is competitive.</p>
  </Card>;
}

function ComparisonCard(){
  return <Card>
    <Heading icon={<Compass className="h-6 w-6 text-emerald-600"/>}>Comparison</Heading>
    <div className="overflow-x-auto text-gray-700">
      <table className="text-xs w-full border border-slate-200 text-gray-600">
        <thead className="bg-slate-100 text-slate-700"><tr><th className="p-2 text-left font-semibold text-gray-800">Algorithm</th><th className="p-2 text-left font-semibold text-gray-800">Approach</th><th className="p-2 text-left font-semibold text-gray-800">Best For</th><th className="p-2 text-left font-semibold text-gray-800">Time</th></tr></thead>
        <tbody className="divide-y divide-slate-200 text-gray-700">
          <tr className="hover:bg-emerald-50/40 text-gray-700"><td className="p-2 font-mono text-gray-700">Prim (Heap)</td><td className="p-2 text-gray-700">Grow tree</td><td className="p-2 text-gray-700">Dense / general</td><td className="p-2 text-gray-700">O(m log n)</td></tr>
          <tr className="hover:bg-emerald-50/40 text-gray-700"><td className="p-2 font-mono text-gray-700">Prim (Matrix)</td><td className="p-2 text-gray-700">Scan keys</td><td className="p-2 text-gray-700">Very dense</td><td className="p-2 text-gray-700">O(n^2)</td></tr>
          <tr className="hover:bg-emerald-50/40 text-gray-700"><td className="p-2 font-mono text-gray-700">Kruskal</td><td className="p-2 text-gray-700">Merge forests</td><td className="p-2 text-gray-700">Sparse / sorted reuse</td><td className="p-2 text-gray-700">O(m log n)</td></tr>
        </tbody>
      </table>
    </div>
  </Card>;
}

function QuickFactsCard(){
  return <Card>
    <h2 className="text-xl font-semibold text-slate-800 mb-4">Quick Facts</h2>
    <ul className="text-sm text-slate-600 space-y-2">
      <li><span className="font-semibold text-slate-800">Inventor:</span> Robert C. Prim (1957)</li>
      <li><span className="font-semibold text-slate-800">Also Known:</span> Jarník–Prim–Dijkstra</li>
      <li><span className="font-semibold text-slate-800">Paradigm:</span> Greedy cut expansion</li>
      <li><span className="font-semibold text-slate-800">Key Array:</span> key[v] = best edge weight into tree</li>
      <li><span className="font-semibold text-slate-800">Supports:</span> Negative weights</li>
    </ul>
  </Card>;
}

function NavigationCard(){
  return <Card>
    <h2 className="text-xl font-semibold text-slate-800 mb-4">Next Steps</h2>
    <p className="text-sm text-slate-600 mb-4">Study the priority queue updates and then watch the dynamic frontier evolve.</p>
    <div className="flex flex-col gap-3 text-gray-700">
      <Link href="/algorithms/graph/prim/theory" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 text-gray-100">Theory <ArrowRight className="h-5 w-5 ml-2 text-gray-700"/></Link>
      <Link href="/algorithms/graph/prim/simulation" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-slate-800 text-white font-semibold hover:bg-slate-900 text-gray-100">Simulation <ArrowRight className="h-5 w-5 ml-2 text-gray-700"/></Link>
      <Link href="/algorithms/graph" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gray-200 text-slate-700 font-semibold hover:bg-gray-300">All Graph Algorithms</Link>
    </div>
  </Card>;
}

function Metric({color,label,value}:{color:string;label:string;value:string}){
  const map:Record<string,string>={emerald:'emerald',sky:'sky',rose:'rose'}; const c = map[color] || 'emerald';
  return <div className={`p-3 rounded-xl bg-${c}-50 border border-${c}-100`}>
    <div className={`font-semibold text-${c}-700 text-[11px] uppercase tracking-wide mb-1`}>{label}</div>
    <div className="font-mono text-gray-700">{value}</div>
  </div>;
}
