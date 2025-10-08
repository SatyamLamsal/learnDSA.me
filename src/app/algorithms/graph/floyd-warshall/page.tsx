"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Grid3x3, Sigma, Layers, Activity, Cpu } from 'lucide-react';

export default function FloydWarshallOverview(){
  return <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-rose-50 text-gray-100">
  <div className="container max-w-screen-2xl mx-auto px-4 py-12 text-gray-100">
      <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="mb-10 text-gray-100">
        <Link href="\algorithms\graph" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2 text-gray-100"/>Back to Graph Algorithms</Link>
        <h1 className="text-4xl font-bold text-slate-800 mb-4 flex items-center gap-3">
          <span className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-indigo-600 text-white shadow text-gray-200">
            <Grid3x3 className="h-8 w-8 text-gray-100"/>
          </span>
          Floyd–Warshall Algorithm
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">All-pairs shortest paths via dynamic programming over allowed intermediates; handles negative edges and detects negative cycles by diagonal inspection.</p>
      </motion.div>
      <div className="grid lg:grid-cols-3 gap-8 text-gray-100">
        <div className="lg:col-span-2 space-y-8 text-gray-100">
          <OverviewCard/>
          <CoreIdeasCard/>
          <WhenToUseCard/>
          <ComplexityCard/>
          <ComparisonCard/>
        </div>
        <div className="space-y-8 text-gray-800">
          <QuickFactsCard/>
          <NavigationCard/>
        </div>
      </div>
      <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.4}} className="flex justify-between items-center mt-16 text-gray-100">
        <Link href="\algorithms\graph\bellman-ford" className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"><ArrowLeft className="h-5 w-5 mr-2 text-gray-800"/>Back: bellman-ford </Link>
        <Link href="\algorithms\graph\kruskal" className="inline-flex items-center px-6 py-3 bg-blue-600 text-black rounded-lg hover:bg-blue-700 transition-colors text-gray-800">Next:Kruskal <ArrowRight className="h-5 w-5 ml-2 text-gray-800"/></Link>
      </motion.div>
    </div>
  </div>;
}

function Card({children, className=""}:{children:React.ReactNode; className?:string}){
  return <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.35}} className={"bg-white rounded-2xl shadow-sm border border-indigo-100 p-6 " + className}>{children}</motion.div>;
}

function Heading({icon, children}:{icon:React.ReactNode; children:React.ReactNode}){
  return <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">{icon}{children}</h2>;
}

function OverviewCard(){
  return <Card>
    <Heading icon={<Sigma className="h-6 w-6 text-indigo-600"/>}>Overview</Heading>
    <p className="text-sm text-slate-600 leading-relaxed mb-4">Floyd–Warshall is a classic dynamic programming algorithm that computes <span className="font-semibold text-slate-800">shortest path distances between every pair of vertices</span> in a weighted directed graph (including negative edge weights) in <code>O(n^3)</code> time. It incrementally improves an <code>n×n</code> distance matrix by allowing intermediate vertices in increasing order. After the main triple loop, a negative value on the diagonal indicates a negative cycle reachable for that vertex.</p>
    <div className="grid md:grid-cols-3 gap-4 text-xs text-gray-300">
      <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100 text-gray-100"><div className="font-semibold text-indigo-700 text-[11px] uppercase tracking-wide mb-1">Category</div><div className="font-mono text-gray-100">DP / APSP</div></div>
      <div className="p-3 rounded-xl bg-rose-50 border border-rose-100 text-gray-100"><div className="font-semibold text-rose-700 text-[11px] uppercase tracking-wide mb-1">Handles Negatives</div><div className="font-mono text-gray-100">Yes (cycles flagged)</div></div>
      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-gray-100"><div className="font-semibold text-emerald-700 text-[11px] uppercase tracking-wide mb-1">Graph Type</div><div className="font-mono text-gray-100">Directed / Weighted</div></div>
    </div>
  </Card>;
}

function CoreIdeasCard(){
  return <Card>
    <Heading icon={<Layers className="h-6 w-6 text-indigo-600"/>}>Core Dynamic Programming Idea</Heading>
    <ul className="space-y-3 text-sm text-slate-600 leading-relaxed">
      <li><span className="font-semibold text-slate-800">State:</span> <code>dist_k[i][j]</code> = shortest distance from i to j using only intermediate vertices from the set {`{1..k}`}</li>
  <li><span className="font-semibold text-slate-800">Transition:</span> <code>{'dist_k[i][j] = min(dist_{k-1}[i][j], dist_{k-1}[i][k] + dist_{k-1}[k][j])'}</code></li>
      <li><span className="font-semibold text-slate-800">In-Place Optimization:</span> We can reuse a single matrix updating entries as each k becomes available.</li>
      <li><span className="font-semibold text-slate-800">Cycle Detection:</span> Any <code>dist[i][i] &lt; 0</code> after completion indicates a negative cycle reachable from i.</li>
      <li><span className="font-semibold text-slate-800">Path Reconstruction:</span> Maintain a <code>next[i][j]</code> matrix (successor) updated on improvement.</li>
    </ul>
  </Card>;
}

function WhenToUseCard(){
  return <Card>
    <Heading icon={<Activity className="h-6 w-6 text-indigo-600"/>}>When to Use</Heading>
    <div className="grid md:grid-cols-2 gap-6 text-sm text-slate-600">
      <div>
        <h3 className="font-semibold text-slate-800 mb-2">Great For</h3>
        <ul className="space-y-2 list-disc list-inside text-gray-100">
          <li>Dense graphs with up to a few hundred vertices</li>
          <li>All-pairs distance queries (many queries, one precomputation)</li>
          <li>Graphs containing negative edges (but need detection)</li>
          <li>Transitive closure (by adapting to boolean semi-ring)</li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold text-slate-800 mb-2">Avoid When</h3>
        <ul className="space-y-2 list-disc list-inside text-gray-100">
          <li>Sparse huge graphs (use repeated Dijkstra + heap or Johnson)</li>
          <li>You only need single-source paths (Bellman-Ford / Dijkstra)</li>
          <li>Memory constraints make O(n^2) storage prohibitive</li>
        </ul>
      </div>
    </div>
  </Card>;
}

function ComplexityCard(){
  return <Card>
    <Heading icon={<Cpu className="h-6 w-6 text-indigo-600"/>}>Complexity</Heading>
    <div className="grid md:grid-cols-3 gap-4 text-xs mb-4 text-gray-300">
      <div className="p-3 rounded-xl bg-sky-50 border border-sky-100 text-gray-100"><div className="font-semibold text-sky-700 text-[11px] uppercase tracking-wide mb-1">Time</div><div className="font-mono text-gray-100">O(n^3)</div></div>
      <div className="p-3 rounded-xl bg-green-50 border border-green-100 text-gray-100"><div className="font-semibold text-green-700 text-[11px] uppercase tracking-wide mb-1">Space</div><div className="font-mono text-gray-100">O(n^2)</div></div>
      <div className="p-3 rounded-xl bg-rose-50 border border-rose-100 text-gray-100"><div className="font-semibold text-rose-700 text-[11px] uppercase tracking-wide mb-1">Updates</div><div className="font-mono text-gray-100">n^3 relax checks</div></div>
    </div>
    <p className="text-sm text-slate-600 leading-relaxed">The cubic time arises from the triple nested loops over k, i, j. For n ≤ ~400 this can still be practical in educational or moderate analytic contexts. Space is dominated by the distance (and optional next) matrices.</p>
  </Card>;
}

function ComparisonCard(){
  return <Card>
    <Heading icon={<Grid3x3 className="h-6 w-6 text-indigo-600"/>}>Comparison with Other Shortest Path Algorithms</Heading>
    <div className="overflow-x-auto text-gray-100">
      <table className="text-xs w-full border border-slate-200 text-gray-300">
        <thead className="bg-slate-100 text-slate-700">
          <tr>
            <th className="p-2 text-left font-semibold text-gray-100">Algorithm</th>
            <th className="p-2 text-left font-semibold text-gray-100">Use Case</th>
            <th className="p-2 text-left font-semibold text-gray-100">Neg Edges?</th>
            <th className="p-2 text-left font-semibold text-gray-100">Negative Cycles?</th>
            <th className="p-2 text-left font-semibold text-gray-100">Time</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-gray-100">
          <tr className="hover:bg-indigo-50/40 text-gray-100"><td className="p-2 font-mono text-gray-100">BFS</td><td className="p-2 text-gray-100">Unweighted SSSP</td><td className="p-2 text-gray-100">N/A</td><td className="p-2 text-gray-100">No</td><td className="p-2 text-gray-100">O(n+m)</td></tr>
          <tr className="hover:bg-indigo-50/40 text-gray-100"><td className="p-2 font-mono text-gray-100">Dijkstra</td><td className="p-2 text-gray-100">Non-negative SSSP</td><td className="p-2 text-gray-100">No</td><td className="p-2 text-gray-100">No</td><td className="p-2 text-gray-100">O(m log n)</td></tr>
          <tr className="hover:bg-indigo-50/40 text-gray-100"><td className="p-2 font-mono text-gray-100">Bellman-Ford</td><td className="p-2 text-gray-100">Negative edges SSSP</td><td className="p-2 text-gray-100">Yes</td><td className="p-2 text-gray-100">Detects</td><td className="p-2 text-gray-100">O(n·m)</td></tr>
          <tr className="hover:bg-indigo-50/40 text-gray-100"><td className="p-2 font-mono font-semibold text-indigo-700">Floyd–Warshall</td><td className="p-2 text-gray-100">All-pairs, dense, negatives</td><td className="p-2 text-gray-100">Yes</td><td className="p-2 text-gray-100">Detects (diag&lt;0)</td><td className="p-2 text-gray-100">O(n^3)</td></tr>
          <tr className="hover:bg-indigo-50/40 text-gray-100"><td className="p-2 font-mono text-gray-100">Johnson</td><td className="p-2 text-gray-100">All-pairs sparse</td><td className="p-2 text-gray-100">Reweighted</td><td className="p-2 text-gray-100">Detects (BF stage)</td><td className="p-2 text-gray-100">O(n·m log n)</td></tr>
        </tbody>
      </table>
    </div>
  </Card>;
}

function QuickFactsCard(){
  return <Card>
    <h2 className="text-xl font-semibold text-slate-800 mb-4">Quick Facts</h2>
    <ul className="text-sm text-slate-600 space-y-2">
      <li><span className="font-semibold text-slate-800">Inventors:</span> Robert Floyd, Stephen Warshall</li>
      <li><span className="font-semibold text-slate-800">Paradigm:</span> Dynamic Programming</li>
      <li><span className="font-semibold text-slate-800">Detects Negative Cycles:</span> Yes (diag &lt; 0)</li>
      <li><span className="font-semibold text-slate-800">Extensions:</span> Transitive closure, min-plus matrix multiplication pattern</li>
      <li><span className="font-semibold text-slate-800">Path Retrieval:</span> Maintain successor matrix</li>
    </ul>
  </Card>;
}

function NavigationCard(){
  return <Card>
    <h2 className="text-xl font-semibold text-slate-800 mb-4">Next Steps</h2>
    <p className="text-sm text-slate-600 mb-4">Dive deeper into the DP formulation and see a matrix-evolution simulation of k-layer expansions.</p>
    <div className="flex flex-col gap-3 text-gray-100">
      <Link href="/algorithms/graph/floyd-warshall/theory" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 text-gray-100">Theory <ArrowRight className="h-5 w-5 ml-2 text-gray-100"/></Link>
      <Link href="/algorithms/graph/floyd-warshall/simulation" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-slate-800 text-white font-semibold hover:bg-slate-900 text-gray-100">Simulation <ArrowRight className="h-5 w-5 ml-2 text-gray-100"/></Link>
    </div>
  </Card>;
}
