"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Layers, BookOpen, Play, Network } from 'lucide-react';

export default function DFSOverviewPage(){
  return <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50">
  <div className="container mx-auto px-4 py-12 max-w-screen-2xl">
      <motion.div initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="mb-10">
       <Link href="\algorithms\graph" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2"/>Back to Graph Algorithms</Link>
        <h1 className="text-4xl font-bold text-slate-800 mb-4 flex items-center gap-3">
          <span className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-green-600 text-white shadow">
            <Layers className="h-8 w-8"/>
          </span>
          Depth-First Search (DFS)
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">Depth-First Search explores as far as possible along each branch before backtracking. It naturally reveals recursive structure, discovery/finish times, and supports topological sorting and strongly connected components detection.</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <InfoCard title="Traversal Style" value="Deep-Branch" color="bg-green-100 text-green-700" description="Go deep then backtrack" />
        <InfoCard title="Data Structure" value="Stack/Recursion" color="bg-emerald-100 text-emerald-700" description="Call stack or explicit stack" />
        <InfoCard title="Cycle Detection" value="Yes" color="bg-lime-100 text-lime-700" description="Detects back edges" />
      </div>

      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="grid lg:grid-cols-3 gap-8 mb-16">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-3">When to Use DFS</h2>
            <ul className="list-disc pl-5 text-sm text-slate-600 space-y-2">
              <li>Exploring connectivity and components</li>
              <li>Topological sorting (DAGs)</li>
              <li>Detecting cycles in directed/undirected graphs</li>
              <li>Finding articulation points & bridges</li>
              <li>Generating mazes / pathfinding variants</li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-3">Core Idea</h2>
            <p className="text-sm text-slate-600 leading-relaxed">Recursively visit an undiscovered vertex, then explore each undiscovered neighbor. Backtracking unwinds recursion revealing finishing order. Edge classification (tree, back, forward, cross) emerges from discovery/finish timestamps.</p>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-3">Algorithm Metrics</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <Metric label="Time" value="O(V + E)" />
              <Metric label="Space" value="O(V)" />
              <Metric label="Traversal" value="Depthwise" />
              <Metric label="Edge Types" value="Yes" />
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Actions</h2>
            <div className="flex flex-col gap-3">
              <Link href="/algorithms/graph/dfs/theory" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"><BookOpen className="h-5 w-5"/> Dive into Theory</Link>
              <Link href="/algorithms/graph/dfs/simulation" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"><Play className="h-5 w-5"/> Try Simulation</Link>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="flex justify-between items-center">
        <Link href="\algorithms\graph\bfs" className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"><ArrowLeft className="h-5 w-5 mr-2"/>Back: BFS</Link>
  <Link href="/algorithms/graph/dijkstra-shortest-path" className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">Next: Dijkstra Algorithm <ArrowRight className="h-5 w-5 ml-2"/></Link>
      </motion.div>
    </div>
  </div>;
}

function InfoCard({title,value,color,description}:{title:string;value:string;color:string;description:string}){
  return <div className="bg-white rounded-2xl shadow-sm p-6">
    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">{title}</div>
    <div className={`text-lg font-bold mb-1 inline-flex items-center px-2 py-1 rounded-lg ${color}`}>{value}</div>
    <p className="text-xs text-slate-600">{description}</p>
  </div>;
}
function Metric({label,value}:{label:string;value:string}){
  return <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
    <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{label}</div>
    <div className="font-mono text-sm mt-1 text-slate-800">{value}</div>
  </div>;
}
