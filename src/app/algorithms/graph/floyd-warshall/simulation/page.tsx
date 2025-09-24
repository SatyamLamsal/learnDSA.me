"use client";
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Play, Pause, StepForward, StepBack, Shuffle, RotateCcw, Grid3x3, AlertTriangle } from 'lucide-react';

interface Frame { k:number; i:number; j:number; improved:boolean; dist:number[][]; description:string; negativeCycle:boolean; }

const INF = 1e9;

export default function FloydWarshallSimulation(){
  const [n,setN] = useState(5);
  const [matrix,setMatrix] = useState<number[][]>(()=> initialRandom(5));
  const [frames,setFrames] = useState<Frame[]>([]);
  const [idx,setIdx] = useState(0);
  const [playing,setPlaying] = useState(false);
  const [speed,setSpeed] = useState(1);

  const build = useCallback(()=>{
    const dist = matrix.map(r=> r.slice());
    for(let v=0; v<n; v++) dist[v][v] = Math.min(0, dist[v][v]);
    const frames:Frame[] = [];
    frames.push({k:0,i:-1,j:-1,improved:false, dist: dist.map(r=> r.slice()), description:'Initialization (diagonal set to 0).', negativeCycle:false});
    for(let k=0;k<n;k++){
      frames.push({k:k+1,i:-1,j:-1,improved:false, dist: dist.map(r=> r.slice()), description:`Start allowing vertex ${k} as intermediate (k=${k}).`, negativeCycle:false});
      for(let i=0;i<n;i++){
        for(let j=0;j<n;j++){
          const via = (dist[i][k] >= INF || dist[k][j] >= INF)? INF : dist[i][k] + dist[k][j];
          const improved = via < dist[i][j];
            frames.push({k:k+1,i,j,improved, dist: dist.map(r=> r.slice()), description:`Check i=${i}, j=${j}: current=${fmt(dist[i][j])}, via k=${k} gives ${fmt(via)} ${improved? '→ improvement':''}`, negativeCycle:false});
          if(improved){
            dist[i][j]=via;
            frames.push({k:k+1,i,j,improved:true, dist: dist.map(r=> r.slice()), description:`Update dist[${i}][${j}] = ${fmt(via)}`, negativeCycle:false});
          }
        }
      }
    }
    // negative cycle detection
    let neg = false;
    for(let v=0; v<n; v++) if(dist[v][v] < 0){ neg=true; break; }
    frames.push({k:n,i:-1,j:-1,improved:false, dist: dist.map(r=> r.slice()), description: neg? 'Negative cycle detected (dist[v][v] < 0).':'No negative cycle detected (all dist[v][v] ≥ 0).', negativeCycle:neg});
    return frames;
  },[matrix,n]);

  useEffect(()=> { const f=build(); setFrames(f); setIdx(0); setPlaying(false); },[build]);
  useEffect(()=> { if(!playing) return; if(idx>=frames.length-1){ setPlaying(false); return; } const t=setTimeout(()=> setIdx(i=> i+1), 900/ speed); return ()=> clearTimeout(t); },[playing,idx,frames.length,speed]);
  const current = frames[idx];

  function randomize(){ setMatrix(initialRandom(n)); }
  function reset(){ setMatrix(m=> m.map(r=> r.map(v=> v))); }

  return <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-rose-50">
  <div className="container max-w-screen-2xl mx-auto px-4 py-12">
      <Link href="/algorithms/graph/floyd-warshall/theory" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2"/>Theory</Link>
      <h1 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3"><Grid3x3 className="h-8 w-8 text-indigo-600"/> Floyd–Warshall Simulation</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} className="bg-white rounded-2xl shadow-sm border border-indigo-100 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Controls</h2>
            <div className="flex flex-wrap gap-3 items-center text-sm mb-4">
              <button onClick={()=> setPlaying(p=> !p)} className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 inline-flex items-center gap-1">{playing? <Pause className="h-4 w-4"/> : <Play className="h-4 w-4"/>}{playing? 'Pause':'Play'}</button>
              <button onClick={()=> setIdx(i=> Math.max(0,i-1))} disabled={idx===0} className="px-3 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-40"><StepBack className="h-4 w-4"/></button>
              <button onClick={()=> setIdx(i=> Math.min(frames.length-1,i+1))} disabled={idx===frames.length-1} className="px-3 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-40"><StepForward className="h-4 w-4"/></button>
              <div className="flex items-center gap-2"><span className="text-xs text-slate-500">Speed</span><input type="range" min={0.5} max={2} step={0.5} value={speed} onChange={e=> setSpeed(Number(e.target.value))}/></div>
              <div className="text-xs font-mono bg-slate-900 text-indigo-200 px-3 py-2 rounded-lg">Step {idx+1}/{frames.length || 1}</div>
              <select value={n} onChange={e=> setN(Number(e.target.value))} className="px-3 py-2 rounded-lg border text-sm">
                {[4,5,6].map(v=> <option key={v} value={v}>{v}x{v}</option>)}
              </select>
              <button onClick={randomize} className="px-4 py-2 rounded-lg bg-rose-600 text-white font-semibold hover:bg-rose-700 inline-flex items-center gap-1"><Shuffle className="h-4 w-4"/>Random</button>
              <button onClick={reset} className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 inline-flex items-center gap-1"><RotateCcw className="h-4 w-4"/>Reset</button>
            </div>
            <p className="text-[11px] text-slate-500 mb-4">Weights in [-5,9]; '∞' indicates no direct edge. k-iteration groups separate matrix states. Improved entries flash highlight. Negative cycle flagged if any dist[v][v] &lt; 0 at end.</p>
            <MatrixView frame={current} />
          </motion.div>
          <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} className="bg-white rounded-2xl shadow-sm border border-indigo-100 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Explanation</h2>
            <p className="text-sm text-slate-600 min-h-[60px]">{current?.description}</p>
            {current?.negativeCycle && <div className="mt-4 p-3 rounded-lg bg-rose-100 border border-rose-300 text-rose-700 text-sm inline-flex items-center gap-2"><AlertTriangle className="h-5 w-5"/> Negative Cycle Detected</div>}
          </motion.div>
        </div>
        <div className="space-y-8">
          <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} className="bg-white rounded-2xl shadow-sm border border-indigo-100 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Legend</h2>
            <ul className="text-[11px] space-y-2 text-slate-600">
              <li><span className="inline-block w-4 h-4 rounded bg-indigo-200 border border-indigo-400 mr-2"/> Current (i,j) under consideration</li>
              <li><span className="inline-block w-4 h-4 rounded bg-emerald-300 border border-emerald-500 mr-2"/> Improvement applied</li>
              <li><span className="inline-block w-4 h-4 rounded bg-rose-300 border border-rose-500 mr-2"/> Negative cycle (diagonal &lt; 0)</li>
            </ul>
          </motion.div>
          <Navigation />
        </div>
      </div>
    </div>
  </div>;
}

function MatrixView({frame}:{frame?:Frame}){
  if(!frame) return <div className="text-sm text-slate-500">Generating...</div>;
  const { dist, i, j, k, improved } = frame;
  return <div className="overflow-x-auto">
    <table className="text-xs border-collapse">
      <thead>
        <tr><th></th>{dist.map((_,c)=><th key={c} className="px-2 py-1 font-semibold text-slate-600">{c}</th>)}</tr>
      </thead>
      <tbody>
        {dist.map((row,r)=> <tr key={r}>
          <th className="pr-2 text-slate-600 font-semibold">{r}</th>
          {row.map((val,c)=> {
            const isDiag = r===c && val < 0;
            const isCurrent = r===i && c===j;
            const cls = isDiag? 'bg-rose-300 border-rose-500 text-slate-900': isCurrent? (improved? 'bg-emerald-300 border-emerald-500 text-slate-900':'bg-indigo-200 border-indigo-400 text-slate-800') : 'bg-white border-slate-200';
            return <td key={c} className={`px-3 py-2 border text-center font-mono transition-colors ${cls}`}>{val >= INF/2? '∞': fmt(val)}</td>; })}
        </tr>)}
      </tbody>
    </table>
    <div className="text-[11px] text-slate-500 mt-2">k-progress: {k-1} / {dist.length-1}</div>
  </div>;
}

function Navigation(){
  return <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} className="bg-white rounded-2xl shadow-sm border border-indigo-100 p-6">
    <h2 className="text-lg font-semibold text-slate-800 mb-4">Continue</h2>
    <div className="flex flex-col gap-3">
      <Link href="/algorithms/graph/floyd-warshall/theory" className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-gray-200 text-slate-700 font-semibold hover:bg-gray-300"><ArrowLeft className="h-5 w-5 mr-2"/>Theory</Link>
      <Link href="/algorithms/graph" className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700">All Graph Algorithms <ArrowRight className="h-5 w-5 ml-2"/></Link>
    </div>
  </motion.div>;
}

function initialRandom(n:number){
  const m:number[][]=[]; for(let i=0;i<n;i++){ const row:number[]=[]; for(let j=0;j<n;j++){ if(i===j){ row.push(0); continue; } if(Math.random()<0.45){ row.push(INF); } else { row.push(Math.floor(Math.random()*15)-5); } } m.push(row); }
  return m;
}

function fmt(x:number){ return x.toString(); }
