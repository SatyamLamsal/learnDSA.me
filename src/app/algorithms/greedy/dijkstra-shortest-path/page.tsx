"use client";
'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, SkipForward, RotateCcw} from 'lucide-react';
import PseudocodeBlock from '@/components/PseudocodeBlock';

type Edge = { u:number; v:number; w:number };

export default function DijkstraPage(){
  const [speed, setSpeed] = useState(700);
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(0);
  const [n, setN] = useState(5);
  const makeGraph = (N:number): {nodes:number[]; edges:Edge[]} => {
    const nodes = Array.from({length:N}, (_,i)=>i);
    const E: Edge[] = [];
    for (let i=0;i<N;i++){
      for (let j=i+1;j<N;j++){
        if (Math.random()<0.5){ E.push({u:i,v:j,w: Math.floor(Math.random()*6)+1}); }
      }
    }
    if (E.length===0) E.push({u:0,v:1,w:1});
    return { nodes, edges: E };
  };
  const [{nodes, edges}, setGraph] = useState(()=> makeGraph(n));
  const [dist, setDist] = useState<number[]>(()=> Array.from({length:n}, (_,i)=> i===0?0:Infinity));
  const [visited, setVisited] = useState<Set<number>>(new Set());
  const [frontier, setFrontier] = useState<number[]>([0]);

  const sleep = (ms:number)=> new Promise(res=>setTimeout(res, ms));

  const run = async () => {
    setRunning(true); setStep(0); setDist(Array.from({length:n}, (_,i)=> i===0?0:Infinity)); setVisited(new Set()); setFrontier([0]);
    const d = Array.from({length:n}, (_,i)=> i===0?0:Infinity); const vis = new Set<number>();
    for (let k=0;k<nodes.length;k++){
      let u = -1; let best = Infinity;
      for (const n of nodes){ if (!vis.has(n) && d[n] < best){ best = d[n]; u = n; } }
      if (u===-1) break; vis.add(u); setVisited(new Set(vis)); setStep(s=>s+1); await sleep(speed);
      for (const e of edges){
        if (e.u===u){
          if (d[u] + e.w < d[e.v]){
            d[e.v] = d[u] + e.w; setDist([...d]); setFrontier(prev=> Array.from(new Set([...prev, e.v])));
            await sleep(speed);
          }
        }
      }
    }
    setRunning(false);
  };

  const randomize = () => { const g = makeGraph(n); setGraph(g); setDist(Array.from({length:n}, (_,i)=> i===0?0:Infinity)); setVisited(new Set()); setFrontier([0]); };
  const reset = () => { setRunning(false); setStep(0); randomize(); };

  const pseudocode = `procedure DIJKSTRA(G, source)
  for each vertex v do dist[v] ← ∞; dist[source] ← 0
  visited ← ∅
  repeat |V| times:
    u ← unvisited vertex with minimum dist
    mark u visited
    for each edge (u, v, w) outgoing from u do
      if dist[u] + w < dist[v] then
        dist[v] ← dist[u] + w
      end if
    end for
  end repeat
end procedure`;

  const layout = useMemo(()=>{
    const cols = Math.min(5, Math.max(3, n));
    const gapX = 120; const gapY = 90; const startX = 60; const startY = 60;
    const coords: Record<number,{x:number;y:number}> = {};
    for (let i=0;i<n;i++){
      const row = Math.floor(i/cols);
      const col = i%cols;
      coords[i] = { x: startX + col*gapX, y: startY + row*gapY };
    }
    const rows = Math.max(1, Math.ceil(n/cols));
    const width = startX + (cols-1)*gapX + 100;
    const height = startY + (rows-1)*gapY + 120;
    return { coords, width, height };
  }, [n]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 text-white">
      <div className="container mx-auto px-4 py-12 text-gray-700">
        <Link href="/algorithms/greedy" className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Back to Greedy</Link>
  <h1 className="text-4xl font-bold text-slate-800 mb-2">Dijkstra&apos;s Shortest Path</h1>
        <p className="text-lg text-slate-600 mb-6">Find shortest paths from a source in graphs with non-negative edge weights. Greedy picks the closest unvisited node; optimality follows from triangle inequality and non-negative edges.</p>

        <div className="bg-white rounded-lg shadow p-6 mb-8 text-gray-700">
          <h2 className="text-xl font-semibold text-slate-800 mb-3">Algorithm Steps</h2>
          <ol className="list-decimal pl-6 space-y-2 text-slate-700">
            <li>Initialize distances to ∞ except source = 0.</li>
            <li>Pick the unvisited vertex with the smallest distance.</li>
            <li>Relax its outgoing edges.</li>
            <li>Repeat until all vertices visited.</li>
          </ol>
        </div>

        {/* Interactive */}
        <div className="bg-white rounded-lg shadow p-6 mb-8 text-gray-700">
          <div className="flex flex-wrap items-end gap-3 mb-4 text-gray-700">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Speed (ms)</label>
              <input className="w-24 px-2 py-2 border rounded" type="number" value={speed} onChange={e=>setSpeed(Math.max(100, parseInt(e.target.value)||0))}/>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nodes</label>
              <input className="w-24 px-2 py-2 border rounded" type="number" value={n} onChange={e=>{ const val = Math.max(3, Math.min(8, parseInt(e.target.value)||3)); setN(val); const g = makeGraph(val); setGraph(g); setDist(Array.from({length:val}, (_,i)=> i===0?0:Infinity)); setVisited(new Set()); setFrontier([0]); }}/>
            </div>
            <button onClick={run} disabled={running} className="bg-teal-600 hover:bg-teal-700 text-black px-4 py-2 rounded inline-flex items-center disabled:opacity-50 text-black text-black text-black text-black text-black"><Play className="h-4 w-4 mr-2 text-gray-700"/>Run</button>
            <button onClick={reset} className="px-3 py-2 border rounded inline-flex items-center text-gray-800"><RotateCcw className="h-4 w-4 mr-2 text-gray-700"/>Reset (New Graph)</button>
            <button onClick={randomize} className="px-3 py-2 border rounded text-gray-800">Randomize Graph</button>
          </div>

          <div className="overflow-x-auto text-gray-700">
            <svg width={layout.width} height={layout.height} className="bg-gray-50 rounded">
              {edges.map((e, idx)=>{
                const a = layout.coords[e.u]; const b = layout.coords[e.v];
                if (!a || !b) return null;
                const active = frontier.includes(e.v) || visited.has(e.u);
                return (
                  <g key={idx}>
                    <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={active? '#14b8a6' : '#cbd5e1'} strokeWidth={active? 3 : 2}/>
                    <text x={(a.x+b.x)/2} y={(a.y+b.y)/2} className="fill-slate-600 text-xs text-gray-600">{e.w}</text>
                  </g>
                );
              })}
              {nodes.map(n=>{
                const c = layout.coords[n]; if (!c) return null; const isVis = visited.has(n);
                return (
                  <g key={n}>
                    <circle cx={c.x} cy={c.y} r={22} fill={isVis? '#14b8a6' : 'white'} stroke="#14b8a6" strokeWidth={2}/>
                    <text x={c.x} y={c.y-10} textAnchor="middle" className="fill-slate-700 text-xs text-gray-600">{`v${n}`}</text>
                    <text x={c.x} y={c.y+8} textAnchor="middle" className="fill-slate-800 font-mono text-sm text-gray-600">{Number.isFinite(dist[n])? dist[n] : '∞'}</text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8 text-gray-700">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Pseudocode</h2>
          <PseudocodeBlock code={pseudocode} autoPlay loop intervalMs={850}/>
        </div>

        <div className="bg-white rounded-lg shadow p-6 text-gray-700">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Practice Problems</h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li><a className="text-teal-700 hover:underline" href="https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/" target="_blank">Dijkstra (GeeksforGeeks)</a></li>
            <li><a className="text-teal-700 hover:underline" href="https://cp-algorithms.com/graph/dijkstra.html" target="_blank">CP-Algorithms: Dijkstra</a></li>
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow p-6 mt-8 text-gray-700">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Use Cases</h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li>GPS navigation and routing on road networks.</li>
            <li>Network packet routing with non-negative costs.</li>
            <li>Game AI pathfinding on static, weighted maps.</li>
          </ul>
        </div>
         {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 flex justify-between items-center text-gray-700"
        >
          <Link
            href="/algorithms/greedy/prim-mst"
            className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2 text-gray-700" />
            Back to Prim&apos;s MST
          </Link>
          
          <Link
            href="/algorithms/greedy/gas-station"
            className="inline-flex items-center px-6 py-3 bg-red-600 text-black rounded-lg hover:bg-red-700 transition-colors text-gray-800"
          >
            Next: Gas Station
            <SkipForward className="h-5 w-5 ml-2 text-gray-700" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

