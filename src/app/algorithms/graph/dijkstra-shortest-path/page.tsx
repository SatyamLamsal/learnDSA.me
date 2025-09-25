"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Map, BookOpen, Play, Timer, Gauge, Route } from 'lucide-react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


export default function DijkstraOverviewPage(){
  return <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100">
  <div className="container mx-auto px-4 py-12 max-w-screen-2xl">
      <motion.div initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="mb-10">
       <Link href="\algorithms\graph" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2"/>Back to Graph Algorithms</Link>
        <h1 className="text-4xl font-bold text-slate-800 mb-4 flex items-center gap-3">
          <span className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-blue-600 text-white shadow">
            <Map className="h-8 w-8"/>
          </span>
          Dijkstra&apos;s Shortest Path
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">Dijkstra&apos;s algorithm finds shortest path distances from a single source in a weighted graph with non‑negative edges using a greedy frontier guided by a priority queue that always settles the closest tentative vertex.</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <InfoCard title="Strategy" value="Greedy Expansion" color="bg-blue-100 text-blue-700" description="Choose nearest unsettled" />
        <InfoCard title="Frontier" value="Priority Queue" color="bg-emerald-100 text-emerald-700" description="Min-distance ordering" />
        <InfoCard title="Relaxation" value="Dist Updates" color="bg-indigo-100 text-indigo-700" description="Improve tentative paths" />
      </div>

      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="grid lg:grid-cols-3 gap-8 mb-16">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-3">When to Use Dijkstra</h2>
            <ul className="list-disc pl-5 text-sm text-slate-600 space-y-2">
              <li>Shortest path with non‑negative edge weights</li>
              <li>Routing (road networks, latency graphs)</li>
              <li>Weighted grid pathfinding (terrain cost)</li>
              <li>As a subroutine in Johnson&apos;s algorithm</li>
              <li>Incremental expansion for partial queries</li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-3">Core Idea</h2>
            <p className="text-sm text-slate-600 leading-relaxed">Maintain a set of settled vertices whose distances are finalized. Keep a priority queue of frontier vertices keyed by tentative dist. Extract the minimum, settle it, and relax all outgoing edges—updating neighbors&apos; tentative distances if a shorter path is found. Non‑negative weights guarantee greedy correctness: once extracted, a vertex cannot later receive a shorter path.</p>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-3">Algorithm Metrics</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <Metric label="Time" value="O((V+E) log V)" />
              <Metric label="Space" value="O(V)" />
              <Metric label="Optimal" value="Yes" />
              <Metric label="Weights" value=">= 0" />
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Actions</h2>
            <div className="flex flex-col gap-3">
              <Link href="/algorithms/graph/dijkstra-shortest-path/theory" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"><BookOpen className="h-5 w-5"/> Dive into Theory</Link>
              <Link href="/algorithms/graph/dijkstra-shortest-path/simulation" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"><Play className="h-5 w-5"/> Try Simulation</Link>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="flex justify-between items-center">
        <Link href="/algorithms/graph/dfs" className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"><ArrowLeft className="h-5 w-5 mr-2"/>Back: DFS </Link>
        <Link href="\algorithms\graph\bellman-ford" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Next:bellman-ford <ArrowRight className="h-5 w-5 ml-2"/></Link>
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
