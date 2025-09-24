"use client";
'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, SkipForward, RotateCcw } from 'lucide-react';
import PseudocodeBlock from '@/components/PseudocodeBlock';

type Edge = { u:number; v:number; w:number };

export default function PrimMSTPage(){
  const [speed, setSpeed] = useState(700);
  const [n, setN] = useState(5);
  const makeGraph = (N:number): Edge[] => {
    const E: Edge[] = [];
    for (let i=0;i<N;i++){
      for (let j=i+1;j<N;j++){
        if (Math.random()<0.5){ E.push({u:i,v:j,w: Math.floor(Math.random()*9)+1}); }
      }
    }
    if (E.length===0) E.push({u:0,v:1,w:1});
    return E;
  };
  const [edges, setEdges] = useState<Edge[]>(()=> makeGraph(n));
  const nodes = useMemo(()=> Array.from({length:n}, (_,i)=>i), [n]);
  const [inTree, setInTree] = useState<Set<number>>(new Set([0]));
  const [chosen, setChosen] = useState<Edge[]>([]);
  const [running, setRunning] = useState(false);

  const sleep = (ms:number)=> new Promise(res=>setTimeout(res, ms));

  const run = async () => {
    setRunning(true); setInTree(new Set([0])); setChosen([]);
    const tree = new Set<number>([0]);
    while (tree.size < nodes.length){
      let best: Edge | null = null;
      for (const e of edges){
        const a = tree.has(e.u), b = tree.has(e.v);
        if (a && !b || b && !a){ if (!best || e.w < best.w) best = e; }
      }
      if (!best) break;
      setChosen(prev=>[...prev, best!]);
      tree.add(best.u); tree.add(best.v); setInTree(new Set(tree));
      await sleep(speed);
    }
    setRunning(false);
  };

  const randomize = () => { setChosen([]); setInTree(new Set([0])); setEdges(makeGraph(n)); };
  const reset = () => { randomize(); };

  const pseudocode = `procedure PRIM(G)
  choose any start vertex; T ← {start}
  while |T| < |V| do
    choose minimum weight edge (u, v) with exactly one endpoint in T
    add v to T; add (u, v) to MST
  end while
end procedure`;

  const coords = useMemo<Record<number,{x:number;y:number}>>(()=>({0:{x:80,y:100},1:{x:200,y:50},2:{x:200,y:150},3:{x:320,y:100}}),[]);
  const isEdge = (a:number,b:number,list:Edge[]) => list.some(e=> (e.u===a && e.v===b) || (e.u===b && e.v===a));

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
      <div className="container mx-auto px-4 py-12">
        <Link href="/algorithms/greedy" className="inline-flex items-center text-pink-600 hover:text-pink-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2"/>Back to Greedy</Link>
  <h1 className="text-4xl font-bold text-slate-800 mb-2">Prim&apos;s Minimum Spanning Tree</h1>
        <p className="text-lg text-slate-600 mb-6">Grow a tree from any start vertex by repeatedly adding the lightest edge to a new vertex. Greedy is optimal by the cut property.</p>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-3">Algorithm Steps</h2>
          <ol className="list-decimal pl-6 space-y-2 text-slate-700">
            <li>Pick an arbitrary start vertex.</li>
            <li>Choose the minimum-weight edge with one endpoint in the growing tree.</li>
            <li>Add that edge and its new vertex to the tree.</li>
            <li>Repeat until all vertices are included.</li>
          </ol>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-wrap items-end gap-3 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Speed (ms)</label>
              <input type="number" value={speed} onChange={e=>setSpeed(Math.max(100, parseInt(e.target.value)||0))} className="w-24 px-2 py-2 border rounded"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nodes</label>
              <input type="number" value={n} onChange={e=>{ const val = Math.max(3, Math.min(8, parseInt(e.target.value)||3)); setN(val); setEdges(makeGraph(val)); setChosen([]); setInTree(new Set([0])); }} className="w-24 px-2 py-2 border rounded"/>
            </div>
            <button onClick={run} disabled={running} className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded inline-flex items-center disabled:opacity-50"><Play className="h-4 w-4 mr-2"/>Run</button>
            <button onClick={reset} className="px-3 py-2 border rounded inline-flex items-center"><RotateCcw className="h-4 w-4 mr-2"/>Reset (New Graph)</button>
            <button onClick={randomize} className="px-3 py-2 border rounded">Randomize Graph</button>
          </div>

          <svg width="520" height="260" className="bg-gray-50 rounded">
            {edges.map((e, idx)=>{
              const a = coords[e.u] || {x: 60 + e.u*80, y: 60 + (e.u%2)*80};
              const b = coords[e.v] || {x: 60 + e.v*80, y: 60 + (e.v%2)*80};
              const chosenEdge = isEdge(e.u,e.v, chosen);
              const color = chosenEdge? '#db2777' : '#94a3b8';
              const w = chosenEdge? 4 : 2;
              return (
                <g key={idx}>
                  <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={color} strokeWidth={w}/>
                  <text x={(a.x+b.x)/2} y={(a.y+b.y)/2} className="fill-slate-600 text-xs">{e.w}</text>
                </g>
              );
            })}
            {nodes.map(n=>{
              const c = coords[n] || {x: 60 + n*80, y: 60 + (n%2)*80}; const inside = inTree.has(n);
              return (
                <g key={n}>
                  <circle cx={c.x} cy={c.y} r={20} fill={inside? '#fce7f3' : 'white'} stroke="#db2777" strokeWidth={2}/>
                  <text x={c.x} y={c.y+4} textAnchor="middle" className="fill-slate-800 font-mono">{n}</text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Pseudocode</h2>
          <PseudocodeBlock code={pseudocode} autoPlay loop intervalMs={800}/>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Practice Problems</h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li><a className="text-pink-700 hover:underline" href="https://www.geeksforgeeks.org/prims-minimum-spanning-tree-mst-greedy-algo-5/" target="_blank">Prim (GFG)</a></li>
            <li><a className="text-pink-700 hover:underline" href="https://cp-algorithms.com/graph/mst_prim.html" target="_blank">CP-Algorithms: Prim</a></li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mt-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Use Cases</h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li>Designing communication networks with minimal total wiring.</li>
            <li>Approximate graph drawing and mesh generation.</li>
            <li>Serving as a subroutine in network reliability analyses.</li>
          </ul>
        </div>
         {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 flex justify-between items-center"
        >
          <Link
            href="/algorithms/greedy/kruskal-mst"
            className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Kruskal MST
          </Link>
          
          <Link
            href="/algorithms/greedy/dijkstra-shortest-path"
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Next: Dijkstra Shortest Path
            <SkipForward className="h-5 w-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

