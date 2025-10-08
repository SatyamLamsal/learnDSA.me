'use client';
import Link from 'next/link';
import { getAlgorithm, getPrevNext } from '../../dcAlgorithms';
import { ArrowLeft, ArrowRight, Play, Pause, RotateCcw, Shuffle, Binary as BinaryIcon, Activity, Layers, Gauge } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import PseudocodeBlock from '@/components/PseudocodeBlock';

interface Frame { stage:string; desc:string; array:number[]; l?:number; r?:number; pivotIndex?:number; i?:number; j?:number; pivotVal?:number; depth:number; }

const algo = getAlgorithm('quick-sort');
const { prev, next } = getPrevNext('quick-sort');

function buildFrames(arr:number[]):Frame[]{
  const frames:Frame[]=[];
  function swap(a:number[],i:number,j:number){ const t=a[i]; a[i]=a[j]; a[j]=t; }
  function quick(l:number,r:number,depth:number){
    frames.push({stage:'enter',desc:`Enter segment [${l},${r}]`,array:[...arr],l,r,depth});
    if(l>=r){ frames.push({stage:'base',desc:'Base segment size 1',array:[...arr],l,r,depth}); return; }
    const pivotIndex=r; const pivot=arr[pivotIndex]; frames.push({stage:'pivot',desc:`Choose pivot at index ${pivotIndex}`,array:[...arr],l,r,pivotIndex,pivotVal:pivot,depth});
    let i=l;
    for(let j=l;j<r;j++){
      frames.push({stage:'scan',desc:`Compare arr[${j}] with pivot`,array:[...arr],l,r,pivotIndex,i,j,pivotVal:pivot,depth});
      if(arr[j] <= pivot){ swap(arr,i,j); frames.push({stage:'swap',desc:`Swap indices ${i} and ${j}`,array:[...arr],l,r,pivotIndex,i,j,pivotVal:pivot,depth}); i++; }
    }
    swap(arr,i,pivotIndex);
    frames.push({stage:'place',desc:`Place pivot at index ${i}`,array:[...arr],l,r,pivotIndex:i,pivotVal:pivot,depth});
    const mid=i;
    quick(l,mid-1,depth+1);
    quick(mid+1,r,depth+1);
  }
  quick(0,arr.length-1,0);
  frames.push({stage:'done',desc:'Array fully sorted',array:[...arr],depth:0});
  return frames;
}

export default function QuickSortSimulation(){
  const [n,setN]=useState(12);
  const [data,setData]=useState(()=> Array.from({length:12},()=> Math.floor(Math.random()*99)+1));
  const frames=useMemo(()=> buildFrames([...data]),[data]);
  const [idx,setIdx]=useState(0);
  const [playing,setPlaying]=useState(false);
  const ref=useRef<number|null>(null);

  useEffect(()=>{ if(idx>=frames.length-1) setPlaying(false); },[idx,frames.length]);
  useEffect(()=>{ if(!playing){ if(ref.current) window.clearTimeout(ref.current); return; } ref.current=window.setTimeout(()=> setIdx(i=> Math.min(frames.length-1,i+1)), 520); return ()=> { if(ref.current) window.clearTimeout(ref.current); }; },[playing,idx,frames.length]);

  const f=frames[idx];

  return <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50 text-gray-700">
    <div className="container mx-auto px-4 py-10 max-w-7xl text-gray-700">
      <Link href="/algorithms/divide-and-conquer/quick-sort" className="inline-flex items-center text-amber-700 hover:text-amber-800 mb-8"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Overview</Link>
      <div className="grid gap-6 text-gray-700">
        {/* Hero */}
        <motion.div initial={{opacity:0,y:26}} animate={{opacity:1,y:0}} transition={{duration:0.55}} className="bg-white rounded-2xl shadow-sm p-8 text-gray-700">
          <h1 className="text-5xl font-bold tracking-tight text-slate-800 mb-4 flex items-center gap-3"><BinaryIcon className="h-10 w-10 text-amber-600"/>{algo?.name} Simulation</h1>
          <p className="text-sm text-slate-600 max-w-3xl">Interactive walk through the in-place partition process: scanning pointer j advances, boundary i grows the ≤ pivot prefix, then a final swap positions the pivot.</p>
        </motion.div>

        {/* Controls */}
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:0.05,duration:0.5}} className="bg-white rounded-2xl shadow-sm p-6 flex flex-wrap gap-6 items-end text-gray-700">
          <div>
            <label className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">Elements</label>
            <input type="range" min={5} max={24} value={n} onChange={e=> { const v=Number(e.target.value); setN(v); const arr=Array.from({length:v},()=> Math.floor(Math.random()*99)+1); setData(arr); setIdx(0); setPlaying(false); }} />
            <div className="text-xs text-slate-500 text-center mt-1">{n}</div>
          </div>
          <button onClick={()=> setPlaying(p=> !p)} className="inline-flex items-center px-5 py-2 rounded bg-amber-600 text-black hover:bg-amber-700 text-sm font-semibold shadow-sm">{playing? <Pause className="h-4 w-4 mr-2 text-gray-700"/>: <Play className="h-4 w-4 mr-2 text-gray-700"/>}{playing? 'Pause':'Play'}</button>
          <button onClick={()=> setIdx(i=> Math.max(0,i-1))} disabled={idx===0} className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm disabled:opacity-40">Prev</button>
            <div className="text-xs font-mono text-gray-600">{idx+1}/{frames.length}</div>
          <button onClick={()=> setIdx(i=> Math.min(frames.length-1,i+1))} disabled={idx===frames.length-1} className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm disabled:opacity-40">Next</button>
          <button onClick={()=> { const arr=Array.from({length:n},()=> Math.floor(Math.random()*99)+1); setData(arr); setIdx(0); setPlaying(false); }} className="inline-flex items-center px-5 py-2 rounded bg-amber-600 text-white hover:bg-amber-700 text-sm font-semibold"><RotateCcw className="h-4 w-4 mr-2 text-gray-700"/>Reset</button>
          <button onClick={()=> { setData(d=> [...d]); setIdx(0); setPlaying(false); }} className="inline-flex items-center px-5 py-2 rounded bg-yellow-600 text-white hover:bg-yellow-700 text-sm font-semibold"><Shuffle className="h-4 w-4 mr-2 text-gray-700"/>Rebuild</button>
        </motion.div>

        {/* Visualization */}
        <motion.div initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{delay:0.1,duration:0.5}} className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
          <div className="flex flex-wrap items-center gap-4 mb-4 text-xs font-mono text-slate-600">
            <span className="px-2 py-1 bg-amber-600 text-white rounded text-gray-600">Pivot</span>
            <span className="px-2 py-1 bg-yellow-500 text-white rounded text-gray-600">Boundary i</span>
            <span className="px-2 py-1 bg-amber-300 text-slate-800 rounded">Scan j</span>
            <span className="px-2 py-1 bg-slate-200 text-slate-700 rounded">Unclassified</span>
            <span className="px-2 py-1 bg-emerald-500 text-white rounded text-gray-600">Placed</span>
          </div>
          <h2 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2"><Layers className="h-5 w-5 text-amber-600"/> Current Frame</h2>
          <div className="flex flex-wrap gap-1 mb-3 text-gray-700">
            {f.array.map((v,i)=> {
              let cls='bg-slate-200 text-slate-700';
              if(f.stage==='place' && f.pivotIndex===i) cls='bg-emerald-500 text-white';
              else if(f.pivotIndex===i) cls='bg-amber-600 text-white';
              else if(f.i===i) cls='bg-yellow-500 text-white';
              else if(f.j===i) cls='bg-amber-300 text-slate-800';
              return <div key={i} className={`px-2 py-1 rounded text-xs font-mono transition-colors ${cls}`}>{v}</div>;
            })}
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-600 mt-2">
            <span className="font-semibold text-gray-800">Stage:</span><span>{f.stage}</span>
            {f.depth!==undefined && <><span className="font-semibold text-gray-800">Depth:</span><span>{f.depth}</span></>}
            {f.pivotVal!==undefined && <><span className="font-semibold text-gray-800">Pivot:</span><span>{f.pivotVal}</span></>}
          </div>
          {f.stage==='done' && <div className="text-sm font-semibold text-amber-700 mt-3">Array fully sorted</div>}
        </motion.div>

        {/* Step Detail & Pseudocode */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.15,duration:0.5}} className="bg-white rounded-2xl shadow-sm p-6 grid lg:grid-cols-2 gap-8 text-gray-700">
          <div>
            <h2 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2"><Activity className="h-5 w-5 text-amber-600"/> Step Detail</h2>
            <div className="text-sm bg-gray-50 border border-gray-200 rounded p-4 leading-relaxed min-h-[120px] whitespace-pre-wrap text-gray-600">{f.desc}</div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2"><BinaryIcon className="h-5 w-5 text-amber-600"/> Pseudocode</h2>
            <PseudocodeBlock code={(algo?.pseudocode||[]).join('\n')} />
          </div>
        </motion.div>

        {/* Mechanics */}
        <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:0.2,duration:0.5}} className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
          <h2 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2"><Gauge className="h-5 w-5 text-amber-600"/> Mechanics</h2>
          <p className="text-sm text-slate-600">Partition grows a contiguous ≤ pivot prefix via conditional swaps; pivot swap finalizes its location; recursion applies the same scheme to left and right segments until base segments of size ≤1 remain.</p>
        </motion.div>

        {/* Navigation */}
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.25,duration:0.5}} className="flex justify-between items-center text-gray-700">
          {prev? <Link href={`/algorithms/divide-and-conquer/${prev.slug}/simulation`} className="inline-flex items-center px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"><ArrowLeft className="h-4 w-4 mr-2 text-gray-700"/>{prev.name}</Link>: <span/>}
          <Link href="/algorithms/divide-and-conquer/quick-sort/theory" className="px-6 py-2 rounded bg-amber-600 text-black hover:bg-amber-700 text-gray-800">View Theory</Link>
          {next? <Link href={`/algorithms/divide-and-conquer/${next.slug}/simulation`} className="inline-flex items-center px-4 py-2 rounded bg-amber-600 text-black hover:bg-amber-700 text-gray-800">{next.name}<ArrowRight className="h-4 w-4 ml-2 text-gray-700"/></Link>: <span/>}
        </motion.div>
      </div>
    </div>
  </div>;
}
