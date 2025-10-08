'use client';
import Link from 'next/link';
import { getAlgorithm, getPrevNext } from '../../dcAlgorithms';
import { ArrowLeft, ArrowRight, RotateCcw, Shuffle, Play, Pause, Split, Sigma, Activity, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PseudocodeBlock from '@/components/PseudocodeBlock';

interface Frame { lo:number; hi:number; mid:number; stage:'split'|'cross-left'|'cross-right'|'combine'|'base'; arr:number[]; leftBest?:number; rightBest?:number; cross?:number; best?:number; suffixVals?:number[]; prefixVals?:number[]; }

const algo = getAlgorithm('max-subarray');
const { prev, next } = getPrevNext('max-subarray');

function generateArray(n:number){
  return Array.from({length:n},()=> Math.floor(Math.random()*30) - 10); // range -10..19
}

function buildFrames(arr:number[]):Frame[]{
  const frames:Frame[]=[];
  function rec(lo:number, hi:number):number{
    if(lo===hi){
      frames.push({lo,hi,mid:lo,stage:'base',arr:[...arr],best:arr[lo]});
      return arr[lo];
    }
    const mid=Math.floor((lo+hi)/2);
    frames.push({lo,hi,mid,stage:'split',arr:[...arr]});
    const left=rec(lo,mid);
    const right=rec(mid+1,hi);
    // crossing left scan
    let sum=0, leftMax=-Infinity; const suffixVals:number[]=[];
    for(let i=mid;i>=lo;i--){ sum+=arr[i]; leftMax=Math.max(leftMax,sum); suffixVals.unshift(sum); }
    frames.push({lo,hi,mid,stage:'cross-left',arr:[...arr],leftBest:left,suffixVals});
    sum=0; let rightMax=-Infinity; const prefixVals:number[]=[];
    for(let j=mid+1;j<=hi;j++){ sum+=arr[j]; rightMax=Math.max(rightMax,sum); prefixVals.push(sum); }
    frames.push({lo,hi,mid,stage:'cross-right',arr:[...arr],rightBest:right,prefixVals});
    const cross=leftMax+rightMax;
    const best=Math.max(left,right,cross);
    frames.push({lo,hi,mid,stage:'combine',arr:[...arr],leftBest:left,rightBest:right,cross,best});
    return best;
  }
  rec(0,arr.length-1);
  return frames;
}

export default function MaxSubarraySimulation(){
  const [size,setSize]=useState(12);
  const [array,setArray]=useState(()=> generateArray(12));
  const frames=useMemo(()=> buildFrames(array),[array]);
  const [index,setIndex]=useState(0);
  const [playing,setPlaying]=useState(false);
  const timerRef=useRef<number|null>(null);

  const reset=()=>{ const a=generateArray(size); setArray(a); setIndex(0); setPlaying(false); };

  useEffect(()=>{ if(index>=frames.length-1) setPlaying(false); },[index,frames.length]);
  useEffect(()=>{ if(!playing){ if(timerRef.current) window.clearTimeout(timerRef.current); return; } timerRef.current=window.setTimeout(()=> setIndex(i=> Math.min(i+1, frames.length-1)), 800); return ()=> { if(timerRef.current) window.clearTimeout(timerRef.current); }; },[playing,index,frames.length]);

  const f=frames[index];

  const explanation = useMemo(()=>{
    switch(f.stage){
      case 'base': return 'Base case: single element segment best = value itself.';
      case 'split': return 'Split at midpoint; recurse on left and right halves.';
      case 'cross-left': return 'Compute best suffix sum ending at mid via reverse scan.';
      case 'cross-right': return 'Compute best prefix sum starting mid+1 via forward scan.';
      case 'combine': return 'Combine: max(leftBest, rightBest, leftSuffix + rightPrefix).';
      default: return '';
    }
  },[f]);

  return <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 text-gray-700">
  <div className="container mx-auto px-4 py-10 max-w-7xl text-gray-700">
      <Link href="/algorithms/divide-and-conquer/max-subarray" className="inline-flex items-center text-amber-700 hover:text-amber-800 mb-8"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Overview</Link>
      <div className="grid gap-6 text-gray-700">
        {/* Hero */}
        <motion.div initial={{opacity:0,y:26}} animate={{opacity:1,y:0}} transition={{duration:0.55}} className="bg-white rounded-2xl shadow-sm p-8 text-gray-700">
          <h1 className="text-5xl font-bold tracking-tight text-slate-800 mb-3 flex items-center gap-3"><Activity className="h-10 w-10 text-amber-600"/>{algo?.name} Simulation</h1>
          <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">Interactive visualization of recursive segmentation, suffix/prefix crossing scans, and combination decisions forming the maximum subarray value.</p>
        </motion.div>

        {/* Controls */}
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:0.05,duration:0.5}} className="bg-white rounded-2xl shadow-sm p-6 flex flex-wrap items-end gap-5 text-gray-700">
          <div>
            <label className="text-[11px] font-semibold text-slate-600 uppercase tracking-wide">Size</label>
            <input type="range" min={6} max={18} value={size} onChange={e=> {const v=Number(e.target.value); setSize(v); const a=generateArray(v); setArray(a); setIndex(0); setPlaying(false);}} />
            <div className="text-[10px] text-slate-500 mt-1">{size}</div>
          </div>
          <button onClick={()=> setPlaying(p=> !p)} className="inline-flex items-center px-4 py-2 rounded bg-amber-600 text-white hover:bg-amber-700 text-xs font-semibold">{playing? <Pause className="h-4 w-4 mr-2 text-gray-700"/>: <Play className="h-4 w-4 mr-2 text-gray-700"/>}{playing? 'Pause':'Play'}</button>
          <button onClick={()=> setIndex(i=> Math.max(0,i-1))} disabled={index===0} className="px-3 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 text-xs disabled:opacity-40">Prev</button>
          <div className="text-[10px] font-mono text-gray-700">{index+1}/{frames.length}</div>
          <button onClick={()=> setIndex(i=> Math.min(frames.length-1,i+1))} disabled={index===frames.length-1} className="px-3 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 text-xs disabled:opacity-40">Next</button>
          <button onClick={reset} className="inline-flex items-center px-4 py-2 rounded bg-orange-600 text-white hover:bg-orange-700 text-xs font-semibold text-gray-300"><RotateCcw className="h-4 w-4 mr-2 text-gray-700"/>Reset</button>
          <button onClick={()=> { setArray(a=> [...a]); setIndex(0); setPlaying(false); }} className="inline-flex items-center px-4 py-2 rounded bg-yellow-600 text-white hover:bg-yellow-700 text-xs font-semibold"><Shuffle className="h-4 w-4 mr-2 text-gray-700"/>Rebuild</button>
        </motion.div>

        {/* Visualization */}
        <motion.div initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{delay:0.1,duration:0.5}} className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-slate-600"><Split className="h-4 w-4 text-gray-700"/> Segment [{f.lo}, {f.hi}] mid={f.mid}</div>
          <div className="flex gap-2 overflow-x-auto p-3 rounded-lg border bg-gradient-to-br from-white to-amber-50 text-gray-700">
            {f.arr.map((v,i)=> {
              const active = i>=f.lo && i<=f.hi;
              const isMid = i===f.mid;
              return <div key={i} className={`flex flex-col items-center min-w-[50px]`}>
                <div className={`px-2 py-2 rounded-md text-sm font-mono border w-full text-center transition-all duration-300 ${active? 'border-amber-300 bg-amber-100 text-amber-800':'border-gray-300 bg-gray-100 text-gray-500'} ${isMid? 'ring-2 ring-amber-500 font-bold':''}`}>{v}</div>
                <div className="h-4 text-[10px] font-mono text-amber-600 mt-1">{isMid? 'mid':''}</div>
              </div>;
            })}
          </div>
          <div className="mt-3 grid md:grid-cols-3 gap-3 text-[10px] text-gray-700">
            <Legend color="bg-amber-200" label="Active Segment" />
            <Legend color="bg-amber-500" label="Midpoint" />
            <Legend color="bg-amber-100" label="Context" />
          </div>
        </motion.div>

        {/* Step Detail & Aggregation */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.15,duration:0.5}} className="grid md:grid-cols-2 gap-6 text-gray-700">
          <div className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
            <h2 className="text-lg font-semibold text-slate-800 mb-2">Step Detail</h2>
            <div className="text-sm bg-gray-50 border border-gray-200 rounded p-4 leading-relaxed min-h-[84px] text-gray-600">{explanation}</div>
            {f.stage==='cross-left' && <SuffixViz frame={f} />}
            {f.stage==='cross-right' && <PrefixViz frame={f} />}
            {f.stage==='combine' && <CombineViz frame={f} />}
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
            <h2 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2"><Sigma className="h-5 w-5 text-amber-600"/> Aggregation</h2>
            <ul className="text-xs font-mono bg-slate-900 text-amber-100 rounded p-4 space-y-1">
              <li>leftBest: {f.leftBest!==undefined? f.leftBest:'-'}</li>
              <li>rightBest: {f.rightBest!==undefined? f.rightBest:'-'}</li>
              <li>cross: {f.cross!==undefined? f.cross:'-'}</li>
              <li>best: {f.best!==undefined? f.best:'-'}</li>
            </ul>
            <p className="text-[11px] text-slate-500 mt-2">Populate order: left/right after recursion, crossing after scans, final best at combine.</p>
          </div>
        </motion.div>

        {/* Mechanics */}
        <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:0.2,duration:0.5}} className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
          <h2 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2"><Layers className="h-5 w-5 text-amber-600"/> Mechanics</h2>
          <p className="text-sm text-slate-600">Recursive decomposition yields two independent maxima plus crossing built via a linear pass anchored at midpoint. Suffix and prefix partial sums track running best; combining leverages structural exclusivity (exactly one of left/right/cross contains the optimal subarray). Depth ~ log n for balanced splits thus O(log n) stack usage.</p>
        </motion.div>

        {/* Pseudocode */}
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.25,duration:0.5}} className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
          <h2 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2"><Sigma className="h-5 w-5 text-amber-600"/> Pseudocode Reference</h2>
          <PseudocodeBlock code={(algo?.pseudocode||[]).join('\n')} />
        </motion.div>

        {/* Navigation */}
        <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:0.3,duration:0.5}} className="flex justify-between items-center text-gray-700">
          {prev? <Link href={`/algorithms/divide-and-conquer/${prev.slug}/simulation`} className="inline-flex items-center px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"><ArrowLeft className="h-4 w-4 mr-2 text-gray-700"/>{prev.name}</Link>: <span/>}
          <Link href="/algorithms/divide-and-conquer/max-subarray/theory" className="px-6 py-2 rounded bg-amber-600 text-white hover:bg-amber-700 text-gray-100">View Theory</Link>
          {next? <Link href={`/algorithms/divide-and-conquer/${next.slug}/simulation`} className="inline-flex items-center px-4 py-2 rounded bg-amber-600 text-white hover:bg-amber-700 text-gray-100">{next.name}<ArrowRight className="h-4 w-4 ml-2 text-gray-700"/></Link>: <span/>}
        </motion.div>
      </div>
    </div>
  </div>;
}

function Legend({color,label}:{color:string;label:string}){
  return <div className="flex items-center gap-2 text-gray-700">
    <span className={`w-4 h-4 rounded ${color} border border-amber-300`}></span>
    <span>{label}</span>
  </div>;
}

function SuffixViz({frame}:{frame:Frame}){
  return <div className="mt-4 text-gray-700">
    <h3 className="text-xs font-semibold uppercase mb-1 text-amber-700">Left Suffix Scan</h3>
    <div className="flex gap-1 flex-wrap text-[10px] font-mono text-gray-700">
      {(frame.suffixVals||[]).map((v,i)=><span key={i} className="px-2 py-1 rounded bg-amber-100 border border-amber-300 text-gray-600">{v}</span>)}
    </div>
  </div>;
}
function PrefixViz({frame}:{frame:Frame}){
  return <div className="mt-4 text-gray-700">
    <h3 className="text-xs font-semibold uppercase mb-1 text-amber-700">Right Prefix Scan</h3>
    <div className="flex gap-1 flex-wrap text-[10px] font-mono text-gray-700">
      {(frame.prefixVals||[]).map((v,i)=><span key={i} className="px-2 py-1 rounded bg-orange-100 border border-orange-300 text-gray-600">{v}</span>)}
    </div>
  </div>;
}
function CombineViz({frame}:{frame:Frame}){
  return <div className="mt-4 text-gray-700">
    <h3 className="text-xs font-semibold uppercase mb-1 text-amber-700">Combine Decision</h3>
    <p className="text-[11px] text-slate-600">best = max(leftBest, rightBest, cross)</p>
  </div>;
}
