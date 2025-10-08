"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Scissors, Layers, Shuffle, GitBranch, Zap, Play, BookOpen } from 'lucide-react';

export default function KruskalOverview(){
  return <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-sky-50 text-gray-700">
  <div className="container max-w-screen-2xl mx-auto px-4 py-12 text-gray-700">
      <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="mb-10 text-gray-700">
        <Link href="\algorithms\graph" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Back to Graph Algorithms</Link>
        <h1 className="text-4xl font-bold text-slate-800 mb-4 flex items-center gap-3">
          <span className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-indigo-600 text-white shadow text-gray-600">
            <Scissors className="h-8 w-8 text-gray-700"/>
          </span>
          Kruskal&apos;s Minimum Spanning Tree
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">Greedy MST formation by selecting safe edges in non-decreasing weight order validated through Disjoint Set Union cycle tests.</p>
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
        <Link href="\algorithms\graph\floyd-warshall" className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Back: floyd-warshall</Link>
        <Link href="\algorithms\graph\prim" className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-gray-100">Next:prim&apos;s <ArrowRight className="h-5 w-5 ml-2 text-gray-700"/></Link>
      </motion.div>
    </div>
  </div>;
}

function Card({children}:{children:React.ReactNode}){ return <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.35}} className="bg-white rounded-2xl shadow-sm border border-indigo-100 p-6 text-gray-700">{children}</motion.div>; }
function Heading({icon,children}:{icon:React.ReactNode;children:React.ReactNode}){ return <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">{icon}{children}</h2>; }

function OverviewCard(){
  return <Card>
    <Heading icon={<GitBranch className="h-6 w-6 text-indigo-600"/>}>Overview</Heading>
    <p className="text-sm text-slate-600 leading-relaxed mb-4">Kruskal&apos;s algorithm builds a <span className="font-semibold text-slate-800">minimum spanning tree</span> by scanning edges in non-decreasing weight order and greedily adding those that do not form a cycle (detected via Disjoint Set Union). It treats the graph as a forest that gradually merges.</p>
    <div className="grid md:grid-cols-3 gap-4 text-xs text-gray-600">
      <Metric color="indigo" label="Category" value="Greedy"/>
      <Metric color="emerald" label="Structure" value="Forest Merge"/>
      <Metric color="rose" label="Cycle Check" value="DSU"/>
    </div>
  </Card>;
}

function CoreStepsCard(){
  return <Card>
    <Heading icon={<Layers className="h-6 w-6 text-indigo-600"/>}>Core Steps</Heading>
    <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600">
      <li>Sort all edges by non-decreasing weight.</li>
      <li>Initialize each vertex as its own set (DSU).</li>
      <li>Scan edges: if endpoints are in different sets, union and add edge.</li>
      <li>Stop after (n−1) edges added (connected graph).</li>
    </ol>
  </Card>;
}

function WhyItWorksCard(){
  return <Card>
    <Heading icon={<Zap className="h-6 w-6 text-indigo-600"/>}>Why It Works</Heading>
    <ul className="text-sm text-slate-600 space-y-2 leading-relaxed list-disc list-inside">
      <li><strong>Cut Property:</strong> The lightest edge crossing any cut belongs to some MST.</li>
      <li><strong>Cycle Property:</strong> The heaviest edge in any cycle is never in an MST.</li>
      <li>Each accepted edge is safe; DSU enforces forest growth without cycles.</li>
    </ul>
  </Card>;
}

function ComplexityCard(){
  return <Card>
    <Heading icon={<Shuffle className="h-6 w-6 text-indigo-600"/>}>Complexity</Heading>
    <div className="grid md:grid-cols-3 gap-4 text-xs mb-4 text-gray-600">
      <Metric color="indigo" label="Sort" value="O(m log m)"/>
      <Metric color="emerald" label="DSU Ops" value="α(n) amort."/>
      <Metric color="rose" label="Total" value="O(m log n)"/>
    </div>
    <p className="text-sm text-slate-600 leading-relaxed">Sorting dominates. With union-find path compression + union by rank, per operation is almost constant (inverse Ackermann).</p>
  </Card>;
}

function ComparisonCard(){
  return <Card>
    <Heading icon={<Scissors className="h-6 w-6 text-indigo-600"/>}>Comparison</Heading>
    <div className="overflow-x-auto text-gray-700">
      <table className="text-xs w-full border border-slate-200 text-gray-600">
        <thead className="bg-slate-100 text-slate-700"><tr><th className="p-2 text-left font-semibold text-gray-800">Algorithm</th><th className="p-2 text-left font-semibold text-gray-800">Best For</th><th className="p-2 text-left font-semibold text-gray-800">Approach</th><th className="p-2 text-left font-semibold text-gray-800">Time</th></tr></thead>
        <tbody className="divide-y divide-slate-200 text-gray-700">
          <tr className="hover:bg-indigo-50/40 text-gray-700"><td className="p-2 font-mono text-gray-700">Prim (Heap)</td><td className="p-2 text-gray-700">Dense graphs</td><td className="p-2 text-gray-700">Grow tree</td><td className="p-2 text-gray-700">O(m log n)</td></tr>
          <tr className="hover:bg-indigo-50/40 text-gray-700"><td className="p-2 font-mono font-semibold text-indigo-700">Kruskal</td><td className="p-2 text-gray-700">Sparse / Edge-sorted reuse</td><td className="p-2 text-gray-700">Merge forests</td><td className="p-2 text-gray-700">O(m log n)</td></tr>
          <tr className="hover:bg-indigo-50/40 text-gray-700"><td className="p-2 font-mono text-gray-700">Borůvka</td><td className="p-2 text-gray-700">Parallelizable</td><td className="p-2 text-gray-700">Component merges</td><td className="p-2 text-gray-700">O(m log n)</td></tr>
        </tbody>
      </table>
    </div>
  </Card>;
}

function QuickFactsCard(){
  return <Card>
    <h2 className="text-xl font-semibold text-slate-800 mb-4">Quick Facts</h2>
    <ul className="text-sm text-slate-600 space-y-2">
      <li><span className="font-semibold text-slate-800">Inventor:</span> Joseph Kruskal (1956)</li>
      <li><span className="font-semibold text-slate-800">Paradigm:</span> Greedy (safe edges)</li>
      <li><span className="font-semibold text-slate-800">Key Tool:</span> Disjoint Set Union</li>
      <li><span className="font-semibold text-slate-800">Result:</span> Minimum spanning forest (MST if connected)</li>
      <li><span className="font-semibold text-slate-800">Tie Handling:</span> Any safe order still MST</li>
    </ul>
  </Card>;
}

function NavigationCard(){
  return <Card>
    <h2 className="text-xl font-semibold text-slate-800 mb-4">Next Steps</h2>
    <p className="text-sm text-slate-600 mb-4">Learn the cut property and DSU mechanics, then watch edges accepted/rejected in order.</p>
    <div className="flex flex-col gap-3 text-gray-700">
      <Link href="/algorithms/graph/kruskal/theory" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 text-gray-100">Theory <ArrowRight className="h-5 w-5 ml-2 text-gray-700"/></Link>
      <Link href="/algorithms/graph/kruskal/simulation" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-slate-800 text-white font-semibold hover:bg-slate-900 text-gray-100">Simulation <ArrowRight className="h-5 w-5 ml-2 text-gray-700"/></Link>
      <Link href="/algorithms/graph" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gray-200 text-slate-700 font-semibold hover:bg-gray-300">All Graph Algorithms</Link>
    </div>
  </Card>;
}

function Metric({color,label,value}:{color:string;label:string;value:string}){
  const map:Record<string,string>={indigo:'indigo',emerald:'emerald',rose:'rose'}; const c = map[color] || 'indigo';
  return <div className={`p-3 rounded-xl bg-${c}-50 border border-${c}-100`}>
    <div className={`font-semibold text-${c}-700 text-[11px] uppercase tracking-wide mb-1`}>{label}</div>
    <div className="font-mono text-gray-700">{value}</div>
  </div>;
}
