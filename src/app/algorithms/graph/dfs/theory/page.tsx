"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Layers, BookOpen } from 'lucide-react';
import PseudocodeBlock from '@/components/PseudocodeBlock';

const pseudocode = `DFS(G):
  for each vertex v in G:
    color[v] ← WHITE
    parent[v] ← NIL
  time ← 0
  for each vertex v in G:
    if color[v] = WHITE:
      DFS-Visit(G, v)

DFS-Visit(G, u):
  color[u] ← GRAY
  time ← time + 1
  discover[u] ← time
  for each neighbor v of u:
    if color[v] = WHITE:
      parent[v] ← u
      DFS-Visit(G, v)
  color[u] ← BLACK
  time ← time + 1
  finish[u] ← time`;

export default function DFSTheoryPage(){
  return <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50 text-gray-700">
  <div className="container mx-auto px-4 py-12 max-w-screen-2xl text-gray-700">
      <Header />
      <div className="grid lg:grid-cols-3 gap-8 text-gray-700">
        <div className="lg:col-span-2 space-y-8 text-gray-700">
          <Definition />
          <Steps />
          <Complexity />
          <Pseudocode />
          <Applications />
          <ProsCons />
          <Examples />
        </div>
        <SidePanel />
      </div>
      <Navigation />
    </div>
  </div>;
}

function Header(){
  return <motion.div initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} className="mb-10 text-gray-700">
    <Link href="/algorithms/graph/dfs" className="inline-flex items-center text-green-600 hover:text-green-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Back to DFS Overview</Link>
    <h1 className="text-4xl font-bold text-slate-800 mb-4 flex items-center gap-3"><Layers className="h-8 w-8 text-green-600"/>DFS Theory</h1>
    <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">Depth-First Search performs a systematic exploration of a graph by diving deep along each branch before backtracking. It exposes structural properties like discovery/finish times, back edges (cycles), and enables multiple fundamental algorithms.</p>
  </motion.div>;
}

function Card({title, children}:{title:string; children:React.ReactNode}){
  return <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5}} className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
    <h2 className="text-xl font-semibold text-slate-800 mb-4">{title}</h2>
    {children}
  </motion.div>;
}

const Definition = ()=> <Card title="Definition"><p className="text-sm text-slate-600 leading-relaxed">Given a graph G = (V, E), DFS explores edges out of the most recently discovered vertex that still has unexplored neighbors. It produces a depth-first forest of rooted trees capturing parent relationships of the traversal.</p></Card>;

const Steps = ()=> <Card title="Algorithm Steps"><ol className="list-decimal pl-5 text-sm text-slate-600 space-y-2"><li>Initialize all vertices WHITE (undiscovered), parent NIL.</li><li>Iterate vertices; for each WHITE vertex start a DFS-Visit.</li><li>Mark vertex GRAY upon discovery (active in recursion stack).</li><li>Recursively visit each WHITE neighbor, setting parent.</li><li>After exploring neighbors, mark vertex BLACK and assign finish time.</li><li>Repeat until all vertices processed; forest may have multiple trees.</li></ol></Card>;

const Complexity = ()=> <Card title="Time & Space Complexity"><div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600"><div className="p-3 rounded-xl bg-green-50 border border-green-200 text-gray-700"><div className="font-semibold text-green-700 text-[11px] uppercase tracking-wide">Time</div><div className="font-mono mt-1 text-gray-700">O(V + E)</div></div><div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-gray-700"><div className="font-semibold text-emerald-700 text-[11px] uppercase tracking-wide">Space</div><div className="font-mono mt-1 text-gray-700">O(V)</div></div><div className="p-3 rounded-xl bg-lime-50 border border-lime-200 text-gray-700"><div className="font-semibold text-lime-700 text-[11px] uppercase tracking-wide">Recursion Depth</div><div className="font-mono mt-1 text-gray-700">O(h) ≤ O(V)</div></div></div><p className="text-xs text-slate-600 mt-4">Each vertex discovered and finished once; each edge examined at most twice (undirected) or once (directed).</p></Card>;

const Pseudocode = ()=> <Card title="Pseudocode"><PseudocodeBlock code={pseudocode} /></Card>;

const Applications = ()=> <Card title="Applications"><ul className="list-disc pl-5 text-sm text-slate-600 space-y-2"><li>Topological sorting</li><li>Detect cycles (back edges)</li><li>Find articulation points & bridges</li><li>Compute strongly connected components (Kosaraju/Tarjan)</li><li>Maze/path generation & solving variants</li></ul></Card>;

const ProsCons = ()=> <Card title="Advantages & Disadvantages"><div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600"><div><h3 className="font-semibold text-emerald-700 mb-2">Advantages</h3><ul className="list-disc pl-5 space-y-1 text-slate-600"><li>Low overhead; simple recursion</li><li>Reveals rich structural info</li><li>Foundation for many graph algorithms</li></ul></div><div><h3 className="font-semibold text-rose-700 mb-2">Disadvantages</h3><ul className="list-disc pl-5 space-y-1 text-slate-600"><li>Deep recursion may overflow stack</li><li>Not inherently shortest paths</li><li>Edge classification requires timestamps</li></ul></div></div></Card>;

const Examples = ()=> <Card title="Example Problems"><ul className="list-disc pl-5 text-sm text-slate-600 space-y-2"><li>Order tasks with dependencies (topological sort)</li><li>Detect cycles in course prerequisite graph</li><li>Enumerate connected components</li><li>Identify articulation points in a network</li><li>Compute strongly connected components</li></ul></Card>;

const SidePanel = ()=> <div className="space-y-6 text-gray-700"><motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="bg-white rounded-2xl shadow-sm p-6 text-gray-700"><h2 className="text-lg font-semibold text-slate-800 mb-2">Key Properties</h2><ul className="text-xs text-slate-600 space-y-1"><li>Discovery/finish timestamps</li><li>Back edges imply cycles</li><li>Finishing order → topological sort</li><li>Depth-first forest structure</li><li>Supports SCC algorithms</li></ul></motion.div><motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="bg-white rounded-2xl shadow-sm p-6 text-gray-700"><h2 className="text-lg font-semibold text-slate-800 mb-2">Next Steps</h2><p className="text-xs text-slate-600 mb-3">Interact with DFS to visualize recursion stack and edge classification.</p><Link href="/algorithms/graph/dfs/simulation" className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold text-gray-300">Go to Simulation</Link></motion.div></div>;

function Navigation(){
  return <motion.div initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} className="mt-14 flex justify-between items-center text-gray-700">
    <Link href="/algorithms/graph/dfs" className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Overview</Link>
    <div className="flex gap-4 text-gray-700">
      <Link href="/algorithms/graph/dfs/simulation" className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-gray-100">Simulation <ArrowRight className="h-5 w-5 ml-2 text-gray-700"/></Link>
    </div>
  </motion.div>;
}
