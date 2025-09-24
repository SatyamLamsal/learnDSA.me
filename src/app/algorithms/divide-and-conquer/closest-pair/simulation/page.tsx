'use client';
import Link from 'next/link';
import { getAlgorithm, getPrevNext } from '../../dcAlgorithms';
import { ArrowLeft, ArrowRight, RotateCcw, Shuffle, Play, Pause, Minimize2, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import PseudocodeBlock from '@/components/PseudocodeBlock';

interface Pt { x:number; y:number; id:number; }
interface Frame { stage:'split'|'recurse'|'strip'|'compare'|'base'|'done'; lo:number; hi:number; mid:number; midX:number; pts:Pt[]; delta:number; pair?:[Pt,Pt]; strip?:Pt[]; focusPair?:[Pt,Pt]; }

const algo = getAlgorithm('closest-pair');
const { prev, next } = getPrevNext('closest-pair');

function randPoints(n:number,width=100,height=60):Pt[]{
  return Array.from({length:n}, (_,i)=> ({ id:i, x: Math.round(Math.random()*width), y: Math.round(Math.random()*height)}));
}

function dist(a:Pt,b:Pt){ const dx=a.x-b.x, dy=a.y-b.y; return Math.hypot(dx,dy); }

function buildFrames(points:Pt[]):Frame[]{
  const frames:Frame[]=[];
  const pts=[...points].sort((a,b)=> a.x-b.x);
  function rec(lo:number,hi:number):{delta:number; pair:[Pt,Pt]|null}{
    const n=hi-lo+1;
    if(n<=3){
      frames.push({stage:'base',lo,hi,mid:lo,midX:pts[lo].x,pts:[...pts],delta:Infinity});
      let best=Infinity; let bestPair:[Pt,Pt]|null=null;
      for(let i=lo;i<=hi;i++) for(let j=i+1;j<=hi;j++){ const d=dist(pts[i],pts[j]); if(d<best){ best=d; bestPair=[pts[i],pts[j]]; frames.push({stage:'compare',lo,hi,mid:lo,midX:pts[lo].x,pts:[...pts],delta:best,pair:bestPair, focusPair:[pts[i],pts[j]]}); } }
      return {delta: best===Infinity?0:best, pair: bestPair};
    }
    const mid=Math.floor((lo+hi)/2); const midX=pts[mid].x;
    frames.push({stage:'split',lo,hi,mid,midX,pts:[...pts],delta:Infinity});
    const left=rec(lo,mid); const right=rec(mid+1,hi);
    let delta=Math.min(left.delta,right.delta); let bestPair = left.delta<=right.delta? left.pair: right.pair;
    frames.push({stage:'recurse',lo,hi,mid,midX,pts:[...pts],delta, pair: bestPair||undefined});
    // strip
    const strip = pts.filter(p=> Math.abs(p.x - midX) <= delta);
    const stripSorted=[...strip].sort((a,b)=> a.y-b.y);
    frames.push({stage:'strip',lo,hi,mid,midX,pts:[...pts],delta, pair: bestPair||undefined, strip: stripSorted});
    for(let i=0;i<stripSorted.length;i++){
      for(let j=i+1;j<Math.min(i+8, stripSorted.length); j++){
        const d=dist(stripSorted[i], stripSorted[j]);
        frames.push({stage:'compare',lo,hi,mid,midX,pts:[...pts],delta, pair: bestPair||undefined, strip: stripSorted, focusPair:[stripSorted[i], stripSorted[j]]});
        if(d<delta){ delta=d; bestPair=[stripSorted[i], stripSorted[j]]; frames.push({stage:'compare',lo,hi,mid,midX,pts:[...pts],delta, pair: bestPair, strip: stripSorted, focusPair:[stripSorted[i], stripSorted[j]]}); }
      }
    }
    return {delta, pair: bestPair};
  }
  const res=rec(0,pts.length-1);
  frames.push({stage:'done',lo:0,hi:pts.length-1,mid:0,midX:pts[0].x,pts:[...pts],delta:res.delta, pair: res.pair||undefined});
  return frames;
}

export default function ClosestPairSimulation(){
  const [n,setN]=useState(16);
  const [points,setPoints]=useState(()=> randPoints(16));
  const frames=useMemo(()=> buildFrames(points),[points]);
  const [index,setIndex]=useState(0);
  const [playing,setPlaying]=useState(false);
  const timerRef=useRef<number|null>(null);

  useEffect(()=>{ if(index>=frames.length-1) setPlaying(false); },[index,frames.length]);
  useEffect(()=>{ if(!playing){ if(timerRef.current) window.clearTimeout(timerRef.current); return; } timerRef.current=window.setTimeout(()=> setIndex(i=> Math.min(i+1, frames.length-1)), 900); return ()=> { if(timerRef.current) window.clearTimeout(timerRef.current); }; },[playing,index,frames.length]);

  const f=frames[index];

  const explanation = (()=>{
    switch(f.stage){
      case 'split': return 'Splitting points set at median x to recurse left/right.';
      case 'base': return 'Brute forcing small subset (<=3 points).';
      case 'recurse': return 'Combining recursion results; current best delta from halves.';
      case 'strip': return 'Building strip: points within delta of mid vertical line sorted by y.';
      case 'compare': return 'Comparing candidate pair inside strip (only next ~7).';
      case 'done': return 'Finished: best pair found with minimal distance.';
      default: return '';
    }
  })();

  const width=520, height=320, pad=24;
  const maxX = Math.max(...points.map(p=> p.x));
  const maxY = Math.max(...points.map(p=> p.y));

  function scaleX(x:number){ return pad + (x/maxX)*(width-2*pad); }
  function scaleY(y:number){ return pad + (y/maxY)*(height-2*pad); }

  const bestPair = f.pair;
  const focus = f.focusPair;
  const stripXs = f.strip?.map(p=> scaleX(p.x)) || [];
  let stripLeft:number|undefined, stripRight:number|undefined;
  if(stripXs.length){ const minX=Math.min(...stripXs), maxX=Math.max(...stripXs); stripLeft=minX-8; stripRight=maxX+8; }

  return <div className="min-h-screen bg-gradient-to-br from-sky-50 to-cyan-50">
  <div className="container mx-auto px-4 py-16 max-w-7xl">
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="mb-12">
        <Link href="/algorithms/divide-and-conquer/closest-pair" className="inline-flex items-center text-sky-600 hover:text-sky-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2"/>Overview</Link>
        <h1 className="text-5xl font-extrabold text-slate-800 mb-4"><span className="text-sky-600">Closest Pair</span> Simulation</h1>
        <p className="text-xl text-slate-600 max-w-4xl leading-relaxed">Visualize how recursive splitting + strip filtering reduces comparisons from O(n^2) to O(n log n). Follow each phase step-by-step.</p>
      </motion.div>

      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6, delay:0.05}} className="bg-white rounded-2xl shadow-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold text-slate-800 mb-6 flex items-center gap-3"><Target className="h-7 w-7 text-sky-600"/>Controls</h2>
        <div className="flex flex-wrap gap-6 items-end">
          <div>
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Points</label>
            <input type="range" min={6} max={28} value={n} onChange={e=> { const v=Number(e.target.value); setN(v); const pts=randPoints(v); setPoints(pts); setIndex(0); setPlaying(false); }} />
            <div className="text-sm text-slate-700 font-mono mt-1">{n}</div>
          </div>
          <button onClick={()=> setPlaying(p=> !p)} className="inline-flex items-center px-6 py-3 rounded-lg bg-sky-600 text-white hover:bg-sky-700 text-sm font-semibold shadow">{playing? <Pause className="h-4 w-4 mr-2"/>: <Play className="h-4 w-4 mr-2"/>}{playing? 'Pause':'Play'}</button>
          <button onClick={()=> setIndex(i=> Math.max(0,i-1))} disabled={index===0} className="px-4 py-3 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm font-semibold disabled:opacity-40">Prev</button>
          <div className="text-sm font-mono">{index+1}/{frames.length}</div>
          <button onClick={()=> setIndex(i=> Math.min(frames.length-1,i+1))} disabled={index===frames.length-1} className="px-4 py-3 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm font-semibold disabled:opacity-40">Next</button>
          <button onClick={()=> { setPoints(randPoints(n)); setIndex(0); setPlaying(false); }} className="inline-flex items-center px-6 py-3 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 text-sm font-semibold shadow"><RotateCcw className="h-4 w-4 mr-2"/>Reset</button>
          <button onClick={()=> { setPoints(p=> [...p]); setIndex(0); setPlaying(false); }} className="inline-flex items-center px-6 py-3 rounded-lg bg-teal-600 text-white hover:bg-teal-700 text-sm font-semibold shadow"><Shuffle className="h-4 w-4 mr-2"/>Recompute</button>
        </div>
      </motion.div>

      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6, delay:0.1}} className="grid lg:grid-cols-2 gap-12 mb-12">
        <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center">
          <h3 className="text-xl font-semibold text-slate-800 mb-4 w-full">Plane View</h3>
          <div className="relative border rounded-xl bg-gradient-to-br from-white to-sky-50" style={{width:width, height:height}}>
              {stripLeft!==undefined && stripRight!==undefined && f.stage!=='base' && f.stage!=='split' && <div className="absolute top-0 h-full bg-cyan-100/40 border-x border-cyan-300" style={{left:stripLeft, width:stripRight-stripLeft}}/>}
              {bestPair && <svg className="absolute inset-0 w-full h-full pointer-events-none"><line x1={scaleX(bestPair[0].x)} y1={scaleY(bestPair[0].y)} x2={scaleX(bestPair[1].x)} y2={scaleY(bestPair[1].y)} stroke="#0284c7" strokeWidth={2} strokeDasharray="4 4"/></svg>}
              {focus && <svg className="absolute inset-0 w-full h-full pointer-events-none"><line x1={scaleX(focus[0].x)} y1={scaleY(focus[0].y)} x2={scaleX(focus[1].x)} y2={scaleY(focus[1].y)} stroke="#f43f5e" strokeWidth={2} /></svg>}
              {points.map(p=>{
                const inStrip = f.strip?.some(s=> s.id===p.id);
                const isBest = bestPair && (p.id===bestPair[0].id || p.id===bestPair[1].id);
                const isFocus = focus && (p.id===focus[0].id || p.id===focus[1].id);
                return <div key={p.id} className={`absolute flex items-center justify-center rounded-full text-[10px] font-semibold transition-all duration-300 border ${isFocus? 'bg-rose-500 text-white border-rose-600 scale-110': isBest? 'bg-sky-600 text-white border-sky-700': inStrip? 'bg-cyan-200 text-cyan-800 border-cyan-300':'bg-gray-200 text-gray-600 border-gray-300'}`} style={{left:scaleX(p.x)-10, top:scaleY(p.y)-10, width:20, height:20}}>{p.id}</div>;
              })}
              {f.stage!=='base' && <div className="absolute top-0 bottom-0 w-0.5 bg-sky-500 opacity-70" style={{left: ( (scaleX(f.midX)+0) )}}/>}
            </div>
            <div className="mt-4 text-sm text-slate-600 font-mono bg-gray-50 rounded p-2 w-full">stage={f.stage} delta={f.delta===Infinity? '∞': f.delta.toFixed(2)}</div>
        </div>
        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Step Detail</h3>
            <div className="text-base bg-gray-50 border border-gray-200 rounded p-5 leading-relaxed min-h-[120px]">{explanation}</div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2"><Minimize2 className="h-5 w-5"/>Pair Tracking</h3>
            <ul className="text-sm font-mono bg-slate-900 text-sky-100 rounded p-5 space-y-2">
              <li>Current best delta: {f.delta===Infinity? '∞': f.delta.toFixed(3)}</li>
              <li>Best pair: {bestPair? `${bestPair[0].id}-${bestPair[1].id}`:'-'}</li>
              <li>Active compare: {focus? `${focus[0].id}-${focus[1].id}`:'-'}</li>
              <li>Strip size: {f.strip? f.strip.length: '-'}</li>
            </ul>
            <p className="text-xs text-slate-500 mt-3">Only next ~7 y-neighbors can improve delta.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Pseudocode Reference</h3>
            <PseudocodeBlock code={(algo?.pseudocode||[]).join('\n')} />
          </div>
        </div>
      </motion.div>
      <div className="flex justify-between items-center mt-4">
        {prev? <Link href={`/algorithms/divide-and-conquer/${prev.slug}/simulation`} className="inline-flex items-center px-6 py-3 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm font-semibold"><ArrowLeft className="h-4 w-4 mr-2"/>{prev.name}</Link>: <span/>}
        <Link href="/algorithms/divide-and-conquer/closest-pair/theory" className="px-8 py-4 rounded-xl bg-sky-600 text-white hover:bg-sky-700 text-base font-semibold shadow">View Theory</Link>
        {next? <Link href={`/algorithms/divide-and-conquer/${next.slug}/simulation`} className="inline-flex items-center px-6 py-3 rounded-lg bg-sky-600 text-white hover:bg-sky-700 text-sm font-semibold">{next.name}<ArrowRight className="h-4 w-4 ml-2"/></Link>: <span/>}
      </div>
    </div>
  </div>;
}
