"use client";
import Link from 'next/link';
import { getAlgorithm, getPrevNext } from '../../dcAlgorithms';
import { ArrowLeft, ArrowRight, RotateCcw, Shuffle, Play, Pause, Calculator, Sigma } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import PseudocodeBlock from '@/components/PseudocodeBlock';

interface Step { stage:string; desc:string; x:string; y:string; x1?:string; x0?:string; y1?:string; y0?:string; z0?:bigint; z1?:bigint; z2?:bigint; mid?:number; partial?:bigint; result?:bigint; }

const algo = getAlgorithm('karatsuba');
const { prev, next } = getPrevNext('karatsuba');

function randomBig(digits:number){ let s=''; for(let i=0;i<digits;i++) s+= Math.floor(Math.random()*10); if(s[0]==='0') s='1'+s.slice(1); return s; }

function karatsubaSteps(x:string,y:string):Step[]{
  const steps:Step[]=[];
  function rec(a:string,b:string,depth=0):bigint{
    steps.push({stage:'enter',desc:`Enter segment (len a=${a.length}, len b=${b.length})`,x:a,y:b});
    if(a.length<=3 || b.length<=3){ const val=BigInt(a)*BigInt(b); steps.push({stage:'base',desc:'Base multiply (direct)',x:a,y:b,result:val}); return val; }
    const n=Math.max(a.length,b.length); const m=Math.floor(n/2);
    a=a.padStart(n,'0'); b=b.padStart(n,'0');
    const x1=a.slice(0,n-m), x0=a.slice(n-m); const y1=b.slice(0,n-m), y0=b.slice(n-m);
    steps.push({stage:'split',desc:'Split into high/low halves',x:a,y:b,x1,x0,y1,y0,mid:m});
    const z2=rec(x1,y1,depth+1); steps.push({stage:'z2',desc:'Computed z2 = x1*y1',x:a,y:b,x1,x0,y1,y0,z2});
    const z0=rec(x0,y0,depth+1); steps.push({stage:'z0',desc:'Computed z0 = x0*y0',x:a,y:b,x1,x0,y1,y0,z0});
    const sumX=(BigInt(x1)+BigInt(x0)).toString(); const sumY=(BigInt(y1)+BigInt(y0)).toString();
    const z1raw=rec(sumX,sumY,depth+1); const z1 = z1raw - z2 - z0; steps.push({stage:'z1',desc:'Computed z1 = (x1+x0)(y1+y0)-z2-z0',x:a,y:b,x1,x0,y1,y0,z1});
    const part1 = z2 * BigInt(10)**BigInt(2*m);
    const part2 = z1 * BigInt(10)**BigInt(m);
    const res = part1 + part2 + z0;
    steps.push({stage:'combine',desc:'Combine parts into result',x:a,y:b,x1,x0,y1,y0,z0,z1,z2,result:res});
    return res;
  }
  rec(x,y);
  steps.push({stage:'done',desc:'Final product complete',x,y,result: BigInt(x)*BigInt(y)});
  return steps;
}

function formatBig(b?:bigint){ if(b===undefined) return '-'; const s=b.toString(); return s.length>18? s.slice(0,9)+'…'+s.slice(-6): s; }

export default function KaratsubaSimulation(){
  const [digits,setDigits]=useState(8);
  const [nums,setNums]=useState(()=> ({x:randomBig(8), y:randomBig(8)}));
  const frames=useMemo(()=> karatsubaSteps(nums.x, nums.y),[nums]);
  const [index,setIndex]=useState(0);
  const [playing,setPlaying]=useState(false);
  const timerRef=useRef<number|null>(null);

  useEffect(()=>{ if(index>=frames.length-1) setPlaying(false); },[index,frames.length]);
  useEffect(()=>{ if(!playing){ if(timerRef.current) window.clearTimeout(timerRef.current); return; } timerRef.current=window.setTimeout(()=> setIndex(i=> Math.min(i+1, frames.length-1)), 850); return ()=> { if(timerRef.current) window.clearTimeout(timerRef.current); }; },[playing,index,frames.length]);

  const f=frames[index];

  return <div className="min-h-screen bg-gradient-to-br from-lime-50 to-green-50 text-gray-700">
    <div className="container mx-auto px-4 py-16 max-w-7xl text-gray-700">
      {/* Hero */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55}} className="mb-14 text-gray-700">
        <Link href="/algorithms/divide-and-conquer/karatsuba" className="inline-flex items-center text-lime-600 hover:text-lime-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Overview</Link>
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-800 mb-5">Karatsuba Simulation</h1>
        <p className="text-xl text-slate-600 max-w-4xl leading-relaxed">Step through recursive splits and three-product reconstruction to see sub-quadratic multiplication unfold.</p>
      </motion.div>

      {/* Controls */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.05}} className="bg-white rounded-2xl shadow-xl p-8 mb-12 text-gray-700">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Controls</h2>
        <div className="flex flex-wrap gap-5 items-end text-gray-700">
          <div>
            <label className="text-xs font-semibold text-slate-600">Digits</label>
            <input type="range" min={4} max={12} value={digits} onChange={e=> {const v=Number(e.target.value); setDigits(v); setNums({x:randomBig(v), y:randomBig(v)}); setIndex(0); setPlaying(false);}} />
            <div className="text-xs text-slate-500 mt-1">{digits}</div>
          </div>
          <button onClick={()=> setPlaying(p=> !p)} className="inline-flex items-center px-5 py-2.5 rounded-lg bg-lime-600 text-black hover:bg-lime-700 text-xs font-semibold shadow">{playing? <Pause className="h-4 w-4 mr-2 text-gray-700"/>: <Play className="h-4 w-4 mr-2 text-gray-700"/>}{playing? 'Pause':'Play'}</button>
          <button onClick={()=> setIndex(i=> Math.max(0,i-1))} disabled={index===0} className="px-4 py-2.5 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 text-xs font-semibold disabled:opacity-40">Prev</button>
            <div className="text-[11px] font-mono tracking-tight text-gray-700">{index+1}/{frames.length}</div>
          <button onClick={()=> setIndex(i=> Math.min(frames.length-1,i+1))} disabled={index===frames.length-1} className="px-4 py-2.5 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 text-xs font-semibold disabled:opacity-40">Next</button>
          <button onClick={()=> { setNums({x:randomBig(digits), y:randomBig(digits)}); setIndex(0); setPlaying(false); }} className="inline-flex items-center px-5 py-2.5 rounded-lg bg-green-600 text-white hover:bg-green-700 text-xs font-semibold shadow"><RotateCcw className="h-4 w-4 mr-2 text-gray-700"/>Reset</button>
          <button onClick={()=> { setNums(n=> ({...n})); setIndex(0); setPlaying(false); }} className="inline-flex items-center px-5 py-2.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-semibold shadow"><Shuffle className="h-4 w-4 mr-2 text-gray-700"/>Rebuild</button>
        </div>
      </motion.div>

      {/* Visualization */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.1}} className="bg-white rounded-2xl shadow-xl p-8 mb-12 text-gray-700">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3"><Calculator className="h-6 w-6 text-gray-700"/> Current Frame</h2>
        <div className="text-xs font-mono bg-slate-900 text-lime-100 rounded p-5 space-y-1">
          <div>x = {f.x}</div>
          <div>y = {f.y}</div>
          {f.x1 && <div className="text-gray-700"><span className="text-lime-300">x1</span> = {f.x1}  <span className="text-emerald-300">x0</span> = {f.x0}</div>}
          {f.y1 && <div className="text-gray-700"><span className="text-lime-300">y1</span> = {f.y1}  <span className="text-emerald-300">y0</span> = {f.y0}</div>}
          {f.z2!==undefined && <div className="text-lime-200">z2 = {formatBig(f.z2)}</div>}
          {f.z0!==undefined && <div className="text-emerald-200">z0 = {formatBig(f.z0)}</div>}
          {f.z1!==undefined && <div className="text-green-200">z1 = {formatBig(f.z1)}</div>}
          {f.result!==undefined && <div className="text-fuchsia-200">result = {formatBig(f.result)}</div>}
        </div>
        <p className="text-[11px] text-slate-500 mt-3">Colors: z2 (high), z0 (low), z1 (middle adjustment). Splits highlight operand halves.</p>
      </motion.div>

      {/* Step + Pseudocode */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.15}} className="bg-white rounded-2xl shadow-xl p-8 mb-12 text-gray-700">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3"><Sigma className="h-6 w-6 text-gray-700"/> Step Detail</h2>
        <div className="text-sm bg-gray-50 border border-gray-200 rounded p-5 leading-relaxed min-h-[110px] mb-8 text-gray-600">{f.desc}</div>
        <h3 className="text-xl font-bold text-slate-800 mb-4">Pseudocode</h3>
        <PseudocodeBlock code={(algo?.pseudocode||[]).join('\n')} />
      </motion.div>

      {/* Mechanism */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.2}} className="bg-white rounded-2xl shadow-xl p-8 mb-14 text-gray-700">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Mechanism</h2>
        <p className="text-sm text-slate-700">Two direct products (high/high, low/low) plus one aggregated mixed product derive the middle term: z1 = (x1+x0)(y1+y0) - z2 - z0. This reduces multiplications, giving O(n^1.585) growth.</p>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-4 text-gray-700">
        {prev? <Link href={`/algorithms/divide-and-conquer/${prev.slug}/simulation`} className="inline-flex items-center px-5 py-2.5 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 text-xs font-semibold"><ArrowLeft className="h-4 w-4 mr-2 text-gray-700"/>{prev.name}</Link>: <span/>}
        <Link href="/algorithms/divide-and-conquer/karatsuba/theory" className="inline-flex items-center px-6 py-3 rounded-md bg-lime-600 text-black hover:bg-lime-700 text-sm font-semibold text-gray-300">View Theory</Link>
        {next? <Link href={`/algorithms/divide-and-conquer/${next.slug}/simulation`} className="inline-flex items-center px-5 py-2.5 rounded-md bg-lime-600 text-black hover:bg-lime-700 text-xs font-semibold text-gray-300">{next.name}<ArrowRight className="h-4 w-4 ml-2 text-gray-700"/></Link>: <span/>}
      </div>
    </div>
  </div>;
}
