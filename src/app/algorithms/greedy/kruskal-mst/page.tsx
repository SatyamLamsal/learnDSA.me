"use client";
'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, SkipForward, RotateCcw } from 'lucide-react';
import PseudocodeBlock from '@/components/PseudocodeBlock';

type Edge = { u:number; v:number; w:number };

export default function KruskalMSTPage(){
  const [speed, setSpeed] = useState(700);
  const [n, setN] = useState(5);
  const makeGraph = (N:number): Edge[] => {
    const E: Edge[] = [];
    for (let i=0;i<N;i++){
      for (let j=i+1;j<N;j++){
        if (Math.random() < 0.5){ E.push({u:i,v:j,w: Math.floor(Math.random()*9)+1}); }
      }
    }
    if (E.length===0) E.push({u:0,v:1,w:1});
    return E.sort((a,b)=>a.w-b.w);
  };
  const [edges, setEdges] = useState<Edge[]>(()=> makeGraph(n));
  const nodes = useMemo(()=> Array.from({length:n}, (_,i)=>i), [n]);
  const [chosen, setChosen] = useState<Edge[]>([]);
  const [skipped, setSkipped] = useState<Edge[]>([]);
  const [runId, setRunId] = useState(0);
  const [running, setRunning] = useState(false);

  const sleep = (ms:number)=> new Promise(res=>setTimeout(res, ms));

  let parentRef = useMemo(()=> Array.from({length: n}, (_,i)=>i), [n]);
  const find = (x:number):number => parentRef[x]===x? x : (parentRef[x]=find(parentRef[x]));
  const unite = (a:number,b:number)=>{ a=find(a); b=find(b); if (a!==b) parentRef[b]=a; };

  const run = async () => {
    setRunning(true); setChosen([]); setSkipped([]); setRunId(id=>id+1); parentRef = Array.from({length:n}, (_,i)=>i);
    for (const e of edges){
      const ru = find(e.u), rv = find(e.v);
      if (ru!==rv){ unite(ru,rv); setChosen(prev=>[...prev, e]); }
      else { setSkipped(prev=>[...prev, e]); }
      await sleep(speed);
    }
    setRunning(false);
  };

  const randomize = () => { setChosen([]); setSkipped([]); setEdges(makeGraph(n)); setRunId(id=>id+1); };
  const reset = () => { setChosen([]); setSkipped([]); setEdges(makeGraph(n)); setRunId(id=>id+1); };

  const pseudocode = `procedure KRUSKAL(G)
  sort all edges by weight
  create DSU for vertices
  MST ← ∅
  for each edge (u, v, w) in increasing weight do
    if find(u) ≠ find(v) then
      MST ← MST ∪ {(u, v)}; union(u, v)
    else
      skip edge // would form cycle
    end if
  end for
  return MST
end procedure`;

  const coords = useMemo<Record<number,{x:number;y:number}>>(()=>({0:{x:80,y:100},1:{x:200,y:50},2:{x:200,y:150},3:{x:320,y:100}}),[]);

  const isEdge = (a:number,b:number, list:Edge[]) => list.some(e=> (e.u===a && e.v===b) || (e.u===b && e.v===a));

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <Link href="/algorithms/greedy" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2"/>Back to Greedy</Link>
  <h1 className="text-4xl font-bold text-slate-800 mb-2">Kruskal&apos;s Minimum Spanning Tree</h1>
        <p className="text-lg text-slate-600 mb-6">Add edges in increasing weight, skipping those that form a cycle. Greedy is optimal by the cut property: the lightest edge crossing any cut belongs to an MST.</p>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-3">Algorithm Steps</h2>
          <ol className="list-decimal pl-6 space-y-2 text-slate-700">
            <li>Sort edges by increasing weight.</li>
            <li>Initialize DSU (disjoint set union).</li>
            <li>Scan edges: add if endpoints are in different components.</li>
            <li>Stop after V−1 edges added.</li>
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
              <input type="number" value={n} onChange={e=>{ const val = Math.max(3, Math.min(8, parseInt(e.target.value)||3)); setN(val); setEdges(makeGraph(val)); setChosen([]); setSkipped([]); }} className="w-24 px-2 py-2 border rounded"/>
            </div>
            <button onClick={run} disabled={running} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded inline-flex items-center disabled:opacity-50"><Play className="h-4 w-4 mr-2"/>Run</button>
            <button onClick={reset} className="px-3 py-2 border rounded inline-flex items-center"><RotateCcw className="h-4 w-4 mr-2"/>Reset (New Example)</button>
            <button onClick={randomize} className="px-3 py-2 border rounded">Randomize Graph</button>
          </div>

          <svg width="520" height="260" className="bg-gray-50 rounded">
            {edges.map((e, idx)=>{
              const a = coords[e.u] || {x: 60 + e.u*80, y: 60 + (e.u%2)*80};
              const b = coords[e.v] || {x: 60 + e.v*80, y: 60 + (e.v%2)*80};
              const chosenEdge = isEdge(e.u,e.v, chosen);
              const skippedEdge = isEdge(e.u,e.v, skipped);
              const color = chosenEdge? '#4f46e5' : skippedEdge? '#f97316' : '#94a3b8';
              const w = chosenEdge? 4 : 2;
              return (
                <g key={idx}>
                  <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={color} strokeWidth={w}/>
                  <text x={(a.x+b.x)/2} y={(a.y+b.y)/2} className="fill-slate-600 text-xs">{e.w}</text>
                </g>
              );
            })}
            {nodes.map(n=>{
              const c = coords[n] || {x: 60 + n*80, y: 60 + (n%2)*80};
              return (
                <g key={n}>
                  <circle cx={c.x} cy={c.y} r={20} fill={'white'} stroke="#4f46e5" strokeWidth={2}/>
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
            <li><a className="text-indigo-700 hover:underline" href="https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/" target="_blank">Kruskal (GFG)</a></li>
            <li><a className="text-indigo-700 hover:underline" href="https://cp-algorithms.com/graph/mst_kruskal.html" target="_blank">CP-Algorithms: Kruskal</a></li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mt-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Use Cases</h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li>Network design: laying cables/roads to connect cities at minimum cost.</li>
            <li>Cluster analysis: building hierarchical clusters (single-linkage).</li>
            <li>Approximation algorithms (e.g., for TSP variants).</li>
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
            href="/algorithms/greedy/coin-change-greedy"
            className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Coin Change Greedy
          </Link>
          
          <Link
            href="/algorithms/greedy/prim-mst"
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Next: Prim&apos;s MST
            <SkipForward className="h-5 w-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

