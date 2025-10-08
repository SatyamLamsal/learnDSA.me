"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, BookOpen, Play, Network, Shuffle } from 'lucide-react';

export default function BFSOverviewPage(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 text-white">
  <div className="container mx-auto px-4 py-12 max-w-screen-2xl text-gray-700">
        <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.7}} className="mb-10 text-gray-700">
          <Link href="\algorithms\graph" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Back to Graph Algorithms</Link>
          <h1 className="text-4xl font-bold text-slate-800 mb-4 flex items-center gap-3">
            <span className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-blue-600 text-white shadow text-gray-600">
              <Network className="h-8 w-8 text-gray-700"/>
            </span>
            Breadth-First Search (BFS)
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
            Breadth-First Search explores a graph level by level. Starting from a source node, it visits all neighbors, then neighbors of neighbors, ensuring the first time a node is discovered is via the shortest number of edges from the source (in unweighted graphs).
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12 text-gray-700">
          <InfoCard title="Traversal Style" value="Level-Order" color="bg-blue-100 text-blue-700" description="Expands frontier layer by layer" />
          <InfoCard title="Shortest Paths" value="Yes (Unweighted)" color="bg-emerald-100 text-emerald-700" description="First discovery gives min edge count" />
          <InfoCard title="Data Structure" value="Queue" color="bg-purple-100 text-purple-700" description="FIFO ensures level ordering" />
        </div>

        <motion.div initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{delay:0.15}} className="grid lg:grid-cols-3 gap-8 mb-16 text-gray-700">
          <div className="lg:col-span-2 space-y-6 text-gray-700">
            <div className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
              <h2 className="text-xl font-semibold text-slate-800 mb-3">When to Use BFS</h2>
              <ul className="list-disc pl-5 text-sm text-slate-600 space-y-2">
                <li>Finding shortest path in unweighted graphs</li>
                <li>Checking bipartiteness</li>
                <li>Level-order traversal in trees</li>
                <li>Finding connected components (with repeated BFS)</li>
                <li>Web crawler / friend-of-friend expansions</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
              <h2 className="text-xl font-semibold text-slate-800 mb-3">Core Idea</h2>
              <p className="text-sm text-slate-600 leading-relaxed">Maintain a queue of the current frontier. Dequeue a node, process it, and enqueue all undiscovered neighbors. Mark nodes when enqueued to avoid duplicates. Track distance by storing level = parent level + 1.</p>
            </div>
          </div>
          <div className="space-y-6 text-gray-700">
            <div className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
              <h2 className="text-xl font-semibold text-slate-800 mb-3">Algorithm Metrics</h2>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <Metric label="Time" value="O(V + E)" />
                <Metric label="Space" value="O(V)" />
                <Metric label="Shortest Path" value="Yes" />
                <Metric label="Traversal" value="Layered" />
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Actions</h2>
              <div className="flex flex-col gap-3 text-gray-700">
                <Link href="/algorithms/graph/bfs/theory" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-black font-semibold hover:bg-blue-700 transition-colors text-gray-800">
                  <BookOpen className="h-5 w-5 text-gray-700"/> Dive into Theory
                </Link>
                <Link href="/algorithms/graph/bfs/simulation" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-green-600 text-black font-semibold hover:bg-green-700 transition-colors text-gray-800">
                  <Play className="h-5 w-5 text-gray-700"/> Try Simulation
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="flex justify-end items-center text-gray-700">
  <Link href="/algorithms/graph/dfs" className="inline-flex items-center px-6 py-3 bg-blue-600 text-black rounded-lg hover:bg-blue-700 transition-colors text-gray-800">
    Next: DFS <ArrowRight className="h-5 w-5 ml-2 text-gray-700" /></Link>
</motion.div>

      </div>
    </div>
  );
}

function InfoCard({title,value,color,description}:{title:string;value:string;color:string;description:string}){
  return <div className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">{title}</div>
    <div className={`text-lg font-bold mb-1 inline-flex items-center px-2 py-1 rounded-lg ${color}`}>{value}</div>
    <p className="text-xs text-slate-600">{description}</p>
  </div>;
}

function Metric({label,value}:{label:string;value:string}){
  return <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-gray-700">
    <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{label}</div>
    <div className="font-mono text-sm mt-1 text-slate-800">{value}</div>
  </div>;
}
