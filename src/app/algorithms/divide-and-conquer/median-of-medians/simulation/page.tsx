'use client';
import Link from 'next/link';
import { getAlgorithm, getPrevNext } from '../../dcAlgorithms';
import { ArrowLeft, ArrowRight, Play, Pause, RotateCcw, Shuffle, Layers, Target, Split, Shield, Flag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import PseudocodeBlock from '@/components/PseudocodeBlock';

interface Frame { stage:string; desc:string; arr:number[]; groups?:number[][]; groupMedians?:number[]; pivot?:number; k?:number; left?:number[]; right?:number[]; equal?:number[]; depth:number; }

const algo = getAlgorithm('median-of-medians');
const { prev, next } = getPrevNext('median-of-medians');

// Build frames capturing recursive selection and grouping logic
function buildFrames(values:number[], k:number):Frame[]{
  const frames:Frame[]=[];
  function select(arr:number[], k:number, depth:number):number{
    frames.push({stage:'enter',desc:`Select k=${k} (depth ${depth}) in array length ${arr.length}`,arr:[...arr],depth});
    if(arr.length<=5){
      const sorted=[...arr].sort((a,b)=>a-b); frames.push({stage:'base',desc:'Base case: sort small array directly',arr:[...arr],depth});
      const val=sorted[k]; frames.push({stage:'found',desc:`Return element ${val}`,arr:[...arr],depth});
      return val;
    }
    const groups: number[][]=[]; for(let i=0;i<arr.length;i+=5) groups.push(arr.slice(i,i+5));
    frames.push({stage:'group',desc:'Partition into 5-element groups',arr:[...arr],groups:groups.map(g=>[...g]),depth});
    const medians=groups.map(g=> [...g].sort((a,b)=>a-b)[Math.floor(g.length/2)] );
    frames.push({stage:'medians',desc:'Select median of each group',arr:[...arr],groups:groups.map(g=>[...g]),groupMedians:[...medians],depth});
    const pivot = select(medians, Math.floor(medians.length/2), depth+1);
    frames.push({stage:'pivot',desc:`Median-of-medians pivot chosen = ${pivot}`,arr:[...arr],groups:groups.map(g=>[...g]),groupMedians:[...medians],pivot,depth});
    const left:number[]=[]; const right:number[]=[]; const equal:number[]=[]; for(const v of arr){ if(v<pivot) left.push(v); else if(v>pivot) right.push(v); else equal.push(v); }
    frames.push({stage:'partition',desc:'Partition around pivot',arr:[...arr],pivot,left:[...left],right:[...right],equal:[...equal],depth});
    if(k<left.length){ frames.push({stage:'recurse-left',desc:'k in left side (< pivot)',arr:[...left],k,depth}); return select(left,k,depth+1); }
    if(k<left.length+equal.length){ frames.push({stage:'found',desc:`k within pivot duplicates -> ${pivot}`,arr:[...arr],pivot,k,depth}); return pivot; }
    const newK = k - left.length - equal.length;
    frames.push({stage:'recurse-right',desc:'k in right side (> pivot)',arr:[...right],k:newK,depth});
    return select(right,newK,depth+1);
  }
  select(values,k,0);
  return frames;
}

const GROUP_COLORS = [
  'bg-rose-100 text-rose-700','bg-pink-100 text-pink-700','bg-fuchsia-100 text-fuchsia-700','bg-purple-100 text-purple-700','bg-violet-100 text-violet-700',
  'bg-indigo-100 text-indigo-700','bg-blue-100 text-blue-700','bg-sky-100 text-sky-700','bg-cyan-100 text-cyan-700','bg-teal-100 text-teal-700'
];

export default function MedianOfMediansSimulation(){
  const [n,setN]=useState(25);
  const [data,setData]=useState(()=> Array.from({length:25},()=> Math.floor(Math.random()*100)));
  const [k,setK]=useState(12);
  const frames=useMemo(()=> buildFrames(data,k),[data,k]);
  const [idx,setIdx]=useState(0);
  const [playing,setPlaying]=useState(false);
  const ref=useRef<number|null>(null);

  useEffect(()=>{ if(idx>=frames.length-1) setPlaying(false); },[idx,frames.length]);
  useEffect(()=>{ if(!playing){ if(ref.current) window.clearTimeout(ref.current); return; } ref.current=window.setTimeout(()=> setIdx(i=> Math.min(frames.length-1,i+1)), 900); return ()=> { if(ref.current) window.clearTimeout(ref.current); }; },[playing,idx,frames.length]);

  const frame=frames[idx];
  const isPartitioned = frame.stage==='partition' || frame.stage.startsWith('recurse') || frame.stage==='found';
  const discardRight = frame.stage==='recurse-left';
  const discardLeft = frame.stage==='recurse-right';

  function groupIndex(i:number){ if(!frame.groups) return -1; let count=0; for(let gi=0; gi<frame.groups.length; gi++){ const g=frame.groups[gi]; if(i < count+g.length) return gi; count+=g.length; } return -1; }

  return <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 text-gray-700">
    <div className="container mx-auto px-4 py-16 max-w-7xl text-gray-700">
      {/* Hero */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55}} className="mb-14 text-gray-700">
        <Link href="/algorithms/divide-and-conquer/median-of-medians" className="inline-flex items-center text-rose-600 hover:text-rose-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Overview</Link>
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-800 mb-5">Median of Medians Simulation</h1>
        <p className="text-xl text-slate-600 max-w-4xl leading-relaxed">Watch deterministic pivot selection refine search space and enforce linear-time guarantees.</p>
      </motion.div>

      {/* Controls */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.05}} className="bg-white rounded-2xl shadow-xl p-8 mb-12 text-gray-700">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Controls</h2>
        <div className="flex flex-wrap gap-6 items-end text-gray-700">
          <div>
            <label className="text-xs font-semibold text-slate-600">Elements</label>
            <input type="range" min={10} max={50} value={n} onChange={e=> { const v=Number(e.target.value); setN(v); const arr=Array.from({length:v},()=> Math.floor(Math.random()*100)); setData(arr); setK(Math.floor(v/2)); setIdx(0); setPlaying(false); }} />
            <div className="text-xs text-slate-500 mt-1">{n}</div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">k (0-based)</label>
            <input type="range" min={0} max={n-1} value={k} onChange={e=> { setK(Number(e.target.value)); setIdx(0); setPlaying(false); }} />
            <div className="text-xs text-slate-500 mt-1">{k}</div>
          </div>
          <button onClick={()=> setPlaying(p=> !p)} className="inline-flex items-center px-5 py-2.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700 text-xs font-semibold shadow">{playing? <Pause className="h-4 w-4 mr-2 text-gray-700"/>: <Play className="h-4 w-4 mr-2 text-gray-700"/>}{playing? 'Pause':'Play'}</button>
          <button onClick={()=> setIdx(i=> Math.max(0,i-1))} disabled={idx===0} className="px-4 py-2.5 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 text-xs font-semibold disabled:opacity-40">Prev</button>
          <div className="text-[11px] font-mono tracking-tight text-gray-700">{idx+1}/{frames.length}</div>
          <button onClick={()=> setIdx(i=> Math.min(frames.length-1,i+1))} disabled={idx===frames.length-1} className="px-4 py-2.5 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 text-xs font-semibold disabled:opacity-40">Next</button>
          <button onClick={()=> { const arr=Array.from({length:n},()=> Math.floor(Math.random()*100)); setData(arr); setK(Math.floor(n/2)); setIdx(0); setPlaying(false); }} className="inline-flex items-center px-5 py-2.5 rounded-lg bg-pink-600 text-white hover:bg-pink-700 text-xs font-semibold shadow"><RotateCcw className="h-4 w-4 mr-2 text-gray-700"/>Reset</button>
          <button onClick={()=> { setData(d=> [...d]); setIdx(0); setPlaying(false); }} className="inline-flex items-center px-5 py-2.5 rounded-lg bg-fuchsia-600 text-white hover:bg-fuchsia-700 text-xs font-semibold shadow"><Shuffle className="h-4 w-4 mr-2 text-gray-700"/>Rebuild</button>
        </div>
      </motion.div>

      {/* Visualization */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.1}} className="bg-white rounded-2xl shadow-xl p-8 mb-12 text-gray-700">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3"><Layers className="h-6 w-6 text-gray-700"/> Current Frame</h2>
        <div className="flex flex-wrap gap-1 mb-5 text-gray-700">
          {frame.arr.map((v,i)=> {
            const pivot = frame.pivot;
            const inLeft = frame.left?.includes(v);
            const inRight = frame.right?.includes(v);
            const inEqual = frame.equal?.includes(v) && pivot!==undefined && v===pivot;
            const gi = groupIndex(i);
            let cls = 'bg-slate-200 text-slate-700';
            if(gi>=0 && frame.groups){ cls = GROUP_COLORS[gi % GROUP_COLORS.length]; }
            if(frame.groupMedians && gi>=0){ // highlight group median
              const g = frame.groups![gi];
              const med = [...g].sort((a,b)=>a-b)[Math.floor(g.length/2)];
              if(v===med) cls='bg-pink-600 text-white';
            }
            if(inEqual) cls='bg-rose-600 text-white';
            if(isPartitioned){
              if(discardRight && inRight) cls+=' opacity-30';
              if(discardLeft && inLeft) cls+=' opacity-30';
            }
            return <div key={i} className={`px-2 py-1 rounded text-[11px] font-mono ${cls}`}>{v}</div>;
          })}
        </div>

        {frame.groups && <div className="space-y-2 mb-6 text-gray-700">
          {frame.groups.map((g,gi)=> <div key={gi} className="flex gap-1 items-center flex-wrap text-gray-700">
            {g.map((v,idx2)=> {
              const med = [...g].sort((a,b)=>a-b)[Math.floor(g.length/2)];
              const isMed = v===med;
              let cls = GROUP_COLORS[gi % GROUP_COLORS.length];
              if(isMed) cls='bg-pink-600 text-white';
              return <div key={idx2} className={`px-2 py-1 rounded text-[10px] font-mono ${cls}`}>{v}</div>;
            })}
            <span className="text-[10px] text-slate-400 ml-1">g{gi+1}</span>
          </div>)}
        </div>}

        {frame.pivot!==undefined && <div className="mb-5 text-xs text-rose-700">Pivot: <span className="font-semibold text-gray-800">{frame.pivot}</span> {frame.stage.startsWith('recurse') && <span className="text-slate-500 ml-2">(discarding {discardRight? 'right':'left'} side)</span>}</div>}

        {frame.left && frame.right && <div className="grid md:grid-cols-3 gap-4 mb-6 text-gray-700">
          <div>
            <div className="text-[10px] font-semibold text-slate-500 mb-1">Left (&lt; pivot)</div>
            <div className="flex flex-wrap gap-1 text-gray-700">{frame.left.map((v,i)=> <span key={i} className={`px-2 py-1 rounded bg-rose-100 text-[10px] font-mono ${discardLeft? 'opacity-30':''}`}>{v}</span>)}</div>
          </div>
          <div>
            <div className="text-[10px] font-semibold text-slate-500 mb-1">Equal (pivot)</div>
            <div className="flex flex-wrap gap-1 text-gray-700">{(frame.equal||[]).map((v,i)=> <span key={i} className="px-2 py-1 rounded bg-rose-600 text-white text-[10px] font-mono text-gray-600">{v}</span>)}</div>
          </div>
            <div>
            <div className="text-[10px] font-semibold text-slate-500 mb-1">Right (&gt; pivot)</div>
            <div className="flex flex-wrap gap-1 text-gray-700">{frame.right.map((v,i)=> <span key={i} className={`px-2 py-1 rounded bg-fuchsia-100 text-[10px] font-mono ${discardRight? 'opacity-30':''}`}>{v}</span>)}</div>
          </div>
        </div>}

        {frame.stage.startsWith('recurse') && <div className="text-[11px] text-slate-500 mb-3">Recursing into {frame.stage==='recurse-left'? 'left':'right'} subset (depth {frame.depth+1})</div>}
        {frame.stage==='found' && <div className="text-sm font-semibold text-rose-700 mb-2">Found k-th value: {frame.pivot!==undefined? frame.pivot : frame.arr.sort((a,b)=>a-b)[frame.k||0]}</div>}

        <div className="text-[11px] text-slate-400">Depth indicator: current depth {frame.depth}</div>
      </motion.div>

      {/* Step Detail + Pseudocode */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.15}} className="bg-white rounded-2xl shadow-xl p-8 mb-12 text-gray-700">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3"><Split className="h-6 w-6 text-gray-700"/> Step Detail</h2>
        <div className="text-sm bg-gray-50 border border-gray-200 rounded p-5 leading-relaxed min-h-[110px] mb-8 text-gray-600">{frame.desc}</div>
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2"><Target className="h-5 w-5 text-gray-700"/> Pseudocode</h3>
        <PseudocodeBlock code={(algo?.pseudocode||[]).join('\n')} />
      </motion.div>

      {/* Guarantee */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.2}} className="bg-white rounded-2xl shadow-xl p-8 mb-14 text-gray-700">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3"><Shield className="h-6 w-6 text-gray-700"/> Guarantee Mechanism</h2>
        <p className="text-sm text-slate-700 leading-relaxed mb-4">Grouping by 5 ensures the pivot is never among the worst 30% nor best 30% of remaining elements: at least 3/10 are &lt;= pivot and 3/10 are &gt;= pivot, shrinking the problem linearly. This yields recurrence T(n) = T(n/5) + T(7n/10) + O(n) ⇒ linear time.</p>
        {frame.left && frame.right && frame.equal && <div className="text-[11px] text-slate-500">Current partition sizes: left {frame.left.length}, equal {frame.equal.length}, right {frame.right.length} (n={frame.arr.length})</div>}
        <div className="mt-4 flex flex-wrap gap-3 text-[10px] text-slate-500">
          <span className="inline-flex items-center gap-1 text-gray-600"><span className="w-3 h-3 rounded bg-pink-600 text-gray-600"/>Group median</span>
          <span className="inline-flex items-center gap-1 text-gray-600"><span className="w-3 h-3 rounded bg-rose-600 text-gray-600"/>Pivot</span>
          <span className="inline-flex items-center gap-1 text-gray-600"><span className="w-3 h-3 rounded bg-rose-100 text-gray-600"/>Left subset</span>
          <span className="inline-flex items-center gap-1 text-gray-600"><span className="w-3 h-3 rounded bg-fuchsia-100 text-gray-600"/>Right subset</span>
          <span className="inline-flex items-center gap-1 text-gray-600"><span className="w-3 h-3 rounded bg-slate-300 text-gray-600"/>Other / unclassified</span>
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-4 text-gray-700">
        {prev? <Link href={`/algorithms/divide-and-conquer/${prev.slug}/simulation`} className="inline-flex items-center px-5 py-2.5 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 text-xs font-semibold"><ArrowLeft className="h-4 w-4 mr-2 text-gray-700"/>{prev.name}</Link>: <span/>}
        <Link href="/algorithms/divide-and-conquer/median-of-medians/theory" className="inline-flex items-center px-6 py-3 rounded-md bg-rose-600 text-white hover:bg-rose-700 text-sm font-semibold text-gray-300">View Theory</Link>
        {next? <Link href={`/algorithms/divide-and-conquer/${next.slug}/simulation`} className="inline-flex items-center px-5 py-2.5 rounded-md bg-rose-600 text-white hover:bg-rose-700 text-xs font-semibold text-gray-300">{next.name}<ArrowRight className="h-4 w-4 ml-2 text-gray-700"/></Link>: <span/>}
      </div>
    </div>
  </div>;
}
