'use client';
import Link from 'next/link';
import { getAlgorithm, getPrevNext } from '../../dcAlgorithms';
import { ArrowLeft, ArrowRight, Shuffle, RotateCcw, Play, Pause, Search, Binary as BinaryIcon, Activity, Gauge } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import PseudocodeBlock from '@/components/PseudocodeBlock';

const algo = getAlgorithm('binary-search');
const { prev, next } = getPrevNext('binary-search');

interface Step { lo:number; hi:number; mid:number; cmp:number; arr:number[]; target:number; found:boolean; }

function generateData(size:number){
  const base = Array.from({length:size},()=> Math.floor(Math.random()*90)+10);
  base.sort((a,b)=> a-b);
  const target = base[Math.floor(Math.random()*base.length)];
  return { base, target };
}

function buildSteps(arr:number[], target:number): Step[]{
  const steps:Step[]=[];
  let lo=0, hi=arr.length-1; let found=false;
  while(lo<=hi){
    const mid = Math.floor((lo+hi)/2);
    let cmp = 0;
    if(arr[mid] === target){ cmp=0; found=true; steps.push({lo,hi,mid,cmp,arr:[...arr],target,found:true}); break; }
    if(arr[mid] < target){ cmp=-1; steps.push({lo,hi,mid,cmp,arr:[...arr],target,found:false}); lo=mid+1; }
    else { cmp=1; steps.push({lo,hi,mid,cmp,arr:[...arr],target,found:false}); hi=mid-1; }
  }
  if(!found){ steps.push({lo,hi,mid:-1,cmp:99,arr:[...arr],target,found:false}); }
  return steps;
}

export default function BinarySearchSimulation(){
  const [size,setSize]=useState(10);
  const [{base,target},setDataset]=useState(()=> generateData(10));
  const steps = useMemo(()=> buildSteps(base,target),[base,target]);
  const [idx,setIdx]=useState(0);
  const [playing,setPlaying]=useState(false);
  const timerRef=useRef<number|null>(null);

  const reset=()=>{ const d=generateData(size); setDataset(d); setIdx(0); setPlaying(false); };

  useEffect(()=>{ if(idx>=steps.length-1) setPlaying(false); },[idx,steps.length]);
  useEffect(()=>{ if(!playing){ if(timerRef.current) window.clearTimeout(timerRef.current); return; } timerRef.current=window.setTimeout(()=> setIdx(i=> Math.min(i+1, steps.length-1)), 750); return ()=> { if(timerRef.current) window.clearTimeout(timerRef.current); }; },[playing,idx,steps.length]);

  const s = steps[idx];

  return <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 text-gray-700">
  <div className="container mx-auto px-4 py-10 max-w-screen-2xl text-gray-700">
      <Link href="/algorithms/divide-and-conquer/binary-search" className="inline-flex items-center text-emerald-700 hover:text-emerald-800 mb-8"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Overview</Link>
      <div className="grid gap-6 text-gray-700">
        {/* Hero */}
        <motion.div initial={{opacity:0,y:26}} animate={{opacity:1,y:0}} transition={{duration:0.55}} className="bg-white rounded-2xl shadow-sm p-8 text-gray-700">
          <h1 className="text-5xl font-bold tracking-tight text-slate-800 mb-4 flex items-center gap-3"><BinaryIcon className="h-10 w-10 text-emerald-600"/>{algo?.name} Simulation</h1>
          <p className="text-sm text-slate-600 max-w-3xl">Explore shrinking intervals: the active range, midpoint selection, and directional decisions until target is found or interval collapses.</p>
        </motion.div>

        {/* Controls */}
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:0.05,duration:0.5}} className="bg-white rounded-2xl shadow-sm p-6 flex flex-wrap gap-6 items-end text-gray-700">
          <div>
            <label className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider">Size</label>
            <input type="range" min={5} max={32} value={size} onChange={e=> {const v=Number(e.target.value); setSize(v); const d=generateData(v); setDataset(d); setIdx(0); setPlaying(false);}} />
            <div className="text-xs text-slate-500 text-center mt-1">{size}</div>
          </div>
          <button onClick={()=> setPlaying(p=> !p)} className="inline-flex items-center px-5 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700 text-sm font-semibold shadow-sm">{playing? <Pause className="h-4 w-4 mr-2 text-gray-700"/>: <Play className="h-4 w-4 mr-2 text-gray-700"/>}{playing? 'Pause':'Play'}</button>
          <button onClick={()=> setIdx(i=> Math.max(0,i-1))} disabled={idx===0} className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm disabled:opacity-40">Prev</button>
          <div className="text-xs font-mono text-gray-600">{idx+1}/{steps.length}</div>
          <button onClick={()=> setIdx(i=> Math.min(steps.length-1,i+1))} disabled={idx===steps.length-1} className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm disabled:opacity-40">Next</button>
          <button onClick={reset} className="inline-flex items-center px-5 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 text-sm font-semibold text-gray-300"><RotateCcw className="h-4 w-4 mr-2 text-gray-700"/>Reset Data</button>
          <button onClick={()=> { const sorted=[...base]; const t=sorted[Math.floor(Math.random()*sorted.length)]; setDataset({base:sorted,target:t}); setIdx(0); setPlaying(false); }} className="inline-flex items-center px-5 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700 text-sm font-semibold"><Shuffle className="h-4 w-4 mr-2 text-gray-700"/>New Target</button>
        </motion.div>

        {/* Visualization */}
        <motion.div initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{delay:0.1,duration:0.5}} className="bg-white rounded-2xl shadow-sm p-6 overflow-x-auto text-gray-700">
          <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-mono text-slate-600">
            <span className="px-2 py-1 bg-emerald-600 text-white rounded text-gray-600">Found</span>
            <span className="px-2 py-1 bg-pink-500 text-white rounded text-gray-600">mid</span>
            <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded">active range</span>
            <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded">inactive</span>
          </div>
          <h2 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2"><Search className="h-5 w-5 text-emerald-600"/> Current Interval</h2>
          <div className="flex gap-2 items-end text-gray-700">
            {s.arr.map((v,i)=> {
              const inRange = i>=s.lo && i<=s.hi && s.mid!==-1;
              const isMid = i===s.mid;
              const isFound = s.found && isMid;
              return <div key={i} className="flex flex-col items-center text-gray-700" style={{minWidth:'44px'}}>
                <div className={`px-2 py-2 rounded-md text-sm font-mono transition-all duration-300 border w-full text-center ${isFound? 'bg-emerald-600 text-white border-emerald-700': isMid? 'bg-pink-500 text-white border-pink-600': inRange? 'bg-emerald-100 border-emerald-300 text-emerald-800':'bg-gray-100 border-gray-300 text-gray-600'}`}>{v}</div>
                <div className="h-5 text-[10px] font-mono text-slate-500 mt-1">{isMid? 'mid':''}</div>
              </div>;
            })}
          </div>
          <div className="mt-4 text-xs text-slate-600 font-mono">lo={s.lo} hi={s.hi} mid={s.mid} target={s.target}</div>
        </motion.div>

        {/* Step Detail & Pseudocode */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.15,duration:0.5}} className="bg-white rounded-2xl shadow-sm p-6 grid lg:grid-cols-2 gap-8 text-gray-700">
          <div>
            <h2 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2"><Activity className="h-5 w-5 text-emerald-600"/> Step Detail</h2>
            <div className="text-sm bg-gray-50 border border-gray-200 rounded p-4 leading-relaxed min-h-[110px] text-gray-600">
              {s.found? 'Target found at mid index.' : s.mid===-1? 'Search terminated. Target not present.' : s.cmp===-1? 'Middle value less than target → shift lo right.' : s.cmp===1? 'Middle value greater than target → shift hi left.' : 'Checking middle element.'}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2"><BinaryIcon className="h-5 w-5 text-emerald-600"/> Pseudocode</h2>
            <PseudocodeBlock code={(algo?.pseudocode||[]).join('\n')} />
          </div>
        </motion.div>

        {/* Mechanics */}
        <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:0.2,duration:0.5}} className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
          <h2 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2"><Gauge className="h-5 w-5 text-emerald-600"/> Mechanics</h2>
          <p className="text-sm text-slate-600">Each decision halves the interval, guaranteeing logarithmic steps. Visualization emphasizes interval contraction, mid repositioning, and termination condition.</p>
        </motion.div>

        {/* Navigation */}
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.25,duration:0.5}} className="flex justify-between items-center text-gray-700">
          {prev? <Link href={`/algorithms/divide-and-conquer/${prev.slug}/simulation`} className="inline-flex items-center px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"><ArrowLeft className="h-4 w-4 mr-2 text-gray-700"/>{prev.name}</Link>: <span/>}
          <Link href="/algorithms/divide-and-conquer/binary-search/theory" className="px-6 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700 text-gray-100">View Theory</Link>
          {next? <Link href={`/algorithms/divide-and-conquer/${next.slug}/simulation`} className="inline-flex items-center px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700 text-gray-100">{next.name}<ArrowRight className="h-4 w-4 ml-2 text-gray-700"/></Link>: <span/>}
        </motion.div>
      </div>
    </div>
  </div>;
}
