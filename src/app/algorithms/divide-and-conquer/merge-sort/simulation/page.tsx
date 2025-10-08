"use client";
import Link from 'next/link';
import { getAlgorithm, getPrevNext } from '../../dcAlgorithms';
import { ArrowLeft, ArrowRight, Play, Pause, RotateCcw, Shuffle, Layers, Sigma } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import PseudocodeBlock from '@/components/PseudocodeBlock';

interface Frame { stage:string; desc:string; array:number[]; left?:number[]; right?:number[]; merged?:number[]; depth:number; range?:[number,number]; }

const algo = getAlgorithm('merge-sort');
const { prev, next } = getPrevNext('merge-sort');

function buildFrames(arr:number[]):Frame[]{
  const frames:Frame[]=[];
  function mergeSort(a:number[], depth:number, start:number):number[]{
    frames.push({stage:'enter',desc:`Enter segment length ${a.length}`,array:[...a],depth,range:[start,start+a.length-1]});
    if(a.length<=1){ frames.push({stage:'base',desc:'Size 1 segment',array:[...a],depth,range:[start,start]}); return a; }
    const mid=Math.floor(a.length/2); const left=a.slice(0,mid); const right=a.slice(mid);
    frames.push({stage:'split',desc:'Split into left/right',array:[...a],left:[...left],right:[...right],depth,range:[start,start+a.length-1]});
    const sortedLeft=mergeSort(left,depth+1,start);
    const sortedRight=mergeSort(right,depth+1,start+mid);
    const merged:number[]=[]; let i=0,j=0;
    while(i<sortedLeft.length || j<sortedRight.length){
      if(j>=sortedRight.length || (i<sortedLeft.length && sortedLeft[i] <= sortedRight[j])){ merged.push(sortedLeft[i++]); }
      else { merged.push(sortedRight[j++]); }
      frames.push({stage:'merge-progress',desc:'Merging',array:[...a],left:[...sortedLeft],right:[...sortedRight],merged:[...merged],depth,range:[start,start+a.length-1]});
    }
    frames.push({stage:'merged',desc:'Merged segment',array:[...merged],depth,range:[start,start+a.length-1]});
    return merged;
  }
  const res=mergeSort(arr,0,0);
  frames.push({stage:'done',desc:'Fully sorted',array:[...res],depth:0,range:[0,res.length-1]});
  return frames;
}

export default function MergeSortSimulation(){
  const [n,setN]=useState(12);
  const [data,setData]=useState(()=> Array.from({length:12},()=> Math.floor(Math.random()*99)+1));
  const frames=useMemo(()=> buildFrames(data),[data]);
  const [idx,setIdx]=useState(0);
  const [playing,setPlaying]=useState(false);
  const ref=useRef<number|null>(null);

  useEffect(()=>{ if(idx>=frames.length-1) setPlaying(false); },[idx,frames.length]);
  useEffect(()=>{ if(!playing){ if(ref.current) window.clearTimeout(ref.current); return; } ref.current=window.setTimeout(()=> setIdx(i=> Math.min(frames.length-1,i+1)), 650); return ()=> { if(ref.current) window.clearTimeout(ref.current); }; },[playing,idx,frames.length]);

  const f=frames[idx];

  return <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 text-gray-700">
    <div className="container mx-auto px-4 py-16 max-w-7xl text-gray-700">
      {/* Hero */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55}} className="mb-14 text-gray-700">
        <Link href="/algorithms/divide-and-conquer/merge-sort" className="inline-flex items-center text-sky-600 hover:text-sky-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Overview</Link>
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-800 mb-5">Merge Sort Simulation</h1>
        <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">Step through balanced recursive splits and linear-time merges to see O(n log n) formation.</p>
      </motion.div>

      {/* Controls */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.05}} className="bg-white rounded-2xl shadow-xl p-8 mb-12 text-gray-700">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Controls</h2>
        <div className="flex flex-wrap gap-6 items-end text-gray-700">
          <div>
            <label className="text-xs font-semibold text-slate-600">Elements</label>
            <input type="range" min={5} max={24} value={n} onChange={e=> { const v=Number(e.target.value); setN(v); const arr=Array.from({length:v},()=> Math.floor(Math.random()*99)+1); setData(arr); setIdx(0); setPlaying(false); }} />
            <div className="text-xs text-slate-500 mt-1">{n}</div>
          </div>
          <button onClick={()=> setPlaying(p=> !p)} className="inline-flex items-center px-5 py-2.5 rounded-lg bg-sky-600 text-white hover:bg-sky-700 text-xs font-semibold shadow">{playing? <Pause className="h-4 w-4 mr-2 text-gray-700"/>: <Play className="h-4 w-4 mr-2 text-gray-700"/>}{playing? 'Pause':'Play'}</button>
          <button onClick={()=> setIdx(i=> Math.max(0,i-1))} disabled={idx===0} className="px-4 py-2.5 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 text-xs font-semibold disabled:opacity-40">Prev</button>
          <div className="text-[11px] font-mono tracking-tight text-gray-700">{idx+1}/{frames.length}</div>
          <button onClick={()=> setIdx(i=> Math.min(frames.length-1,i+1))} disabled={idx===frames.length-1} className="px-4 py-2.5 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 text-xs font-semibold disabled:opacity-40">Next</button>
          <button onClick={()=> { const arr=Array.from({length:n},()=> Math.floor(Math.random()*99)+1); setData(arr); setIdx(0); setPlaying(false); }} className="inline-flex items-center px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-xs font-semibold shadow"><RotateCcw className="h-4 w-4 mr-2 text-gray-700"/>Reset</button>
          <button onClick={()=> { setData(d=> [...d]); setIdx(0); setPlaying(false); }} className="inline-flex items-center px-5 py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 text-xs font-semibold shadow"><Shuffle className="h-4 w-4 mr-2 text-gray-700"/>Rebuild</button>
        </div>
      </motion.div>

      {/* Visualization */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.1}} className="bg-white rounded-2xl shadow-xl p-8 mb-12 text-gray-700">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3"><Layers className="h-6 w-6 text-gray-700"/> Current Frame</h2>
        <div className="flex flex-wrap gap-1 mb-5 text-gray-700">
          {f.array.map((v,i)=> {
            const inRange = f.range && i>=f.range[0] && i<=f.range[1];
            const cls = inRange? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-700';
            return <div key={i} className={`px-2 py-1 rounded text-[11px] font-mono ${cls}`}>{v}</div>;
          })}
        </div>
        {f.left && f.right && <div className="flex gap-6 mb-6 text-gray-700">
          <div className="flex flex-col gap-1 text-gray-700"><div className="text-[10px] uppercase font-semibold text-slate-500">Left</div><div className="flex flex-wrap gap-1 text-gray-700">{f.left.map((v,i)=> <span key={i} className="px-2 py-1 rounded bg-slate-100 text-[11px] font-mono text-gray-600">{v}</span>)}</div></div>
          <div className="flex flex-col gap-1 text-gray-700"><div className="text-[10px] uppercase font-semibold text-slate-500">Right</div><div className="flex flex-wrap gap-1 text-gray-700">{f.right.map((v,i)=> <span key={i} className="px-2 py-1 rounded bg-slate-100 text-[11px] font-mono text-gray-600">{v}</span>)}</div></div>
        </div>}
        {f.merged && <div className="mb-4 text-gray-700"><div className="text-[10px] uppercase font-semibold text-slate-500 mb-1">Merged</div><div className="flex flex-wrap gap-1 text-gray-700">{f.merged.map((v,i)=> <span key={i} className="px-2 py-1 rounded bg-sky-100 text-[11px] font-mono text-gray-600">{v}</span>)}</div></div>}
        {f.stage==='done' && <div className="text-sm font-semibold text-sky-700">Sorted complete</div>}
        <div className="text-[11px] text-slate-400 mt-4">Depth {f.depth} | Stage: {f.stage}</div>
      </motion.div>

      {/* Step Detail + Pseudocode */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.15}} className="bg-white rounded-2xl shadow-xl p-8 mb-12 text-gray-700">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3"><Sigma className="h-6 w-6 text-gray-700"/> Step Detail</h2>
        <div className="text-sm bg-gray-50 border border-gray-200 rounded p-5 leading-relaxed min-h-[110px] mb-8 text-gray-600">{f.desc}</div>
        <h3 className="text-xl font-bold text-slate-800 mb-4">Pseudocode</h3>
        <PseudocodeBlock code={(algo?.pseudocode||[]).join('\n')} />
      </motion.div>

      {/* Mechanics */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.2}} className="bg-white rounded-2xl shadow-xl p-8 mb-14 text-gray-700">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Mechanics</h2>
        <p className="text-sm text-slate-700">Balanced halves give depth log n; merging walks two sorted streams, appending the smaller head, producing linear work per level.</p>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-4 text-gray-700">
        {prev? <Link href={`/algorithms/divide-and-conquer/${prev.slug}/simulation`} className="inline-flex items-center px-5 py-2.5 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 text-xs font-semibold"><ArrowLeft className="h-4 w-4 mr-2 text-gray-700"/>{prev.name}</Link>: <span/>}
        <Link href="/algorithms/divide-and-conquer/merge-sort/theory" className="inline-flex items-center px-6 py-3 rounded-md bg-sky-600 text-white hover:bg-sky-700 text-sm font-semibold text-gray-300">View Theory</Link>
        {next? <Link href={`/algorithms/divide-and-conquer/${next.slug}/simulation`} className="inline-flex items-center px-5 py-2.5 rounded-md bg-sky-600 text-white hover:bg-sky-700 text-xs font-semibold text-gray-300">{next.name}<ArrowRight className="h-4 w-4 ml-2 text-gray-700"/></Link>: <span/>}
      </div>
    </div>
  </div>;
}
