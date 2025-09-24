'use client';
import Link from 'next/link';
import { getAlgorithm, getPrevNext } from '../../dcAlgorithms';
import { ArrowLeft, ArrowRight, RotateCcw, Shuffle, Play, Pause, Activity, Sigma } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import PseudocodeBlock from '@/components/PseudocodeBlock';

interface C { re:number; im:number; }
interface StageFrame { stage:number; pair:[number,number]; k:number; N:number; data:C[]; desc:string; w:C; upper:C; lower:C; }

const algo = getAlgorithm('fft');
const { prev, next } = getPrevNext('fft');

function randSignal(n:number):C[]{ return Array.from({length:n},()=> ({re: +(Math.random()*4-2).toFixed(2), im:0})); }
function clone(a:C[]):C[]{ return a.map(z=> ({...z})); }
function add(a:C,b:C):C{ return {re:a.re+b.re, im:a.im+b.im}; }
function sub(a:C,b:C):C{ return {re:a.re-b.re, im:a.im-b.im}; }
function mul(a:C,b:C):C{ return {re:a.re*b.re - a.im*b.im, im:a.re*b.im + a.im*b.re}; }
function twiddle(k:number,n:number):C{ const ang = -2*Math.PI*k/n; return {re: Math.cos(ang), im: Math.sin(ang)}; }

function bitReverseIndices(n:number){ const bits=Math.log2(n); const res:number[]=[]; for(let i=0;i<n;i++){ let r=0; for(let b=0;b<bits;b++) if(i & (1<<b)) r |= 1<<(bits-1-b); res.push(r);} return res; }

function buildFrames(input:C[]):StageFrame[]{
  const n=input.length; const frames:StageFrame[]=[]; const data=clone(input);
  // bit reversal copy
  const rev = bitReverseIndices(n); const temp=Array<C>(n);
  for(let i=0;i<n;i++) temp[i]=data[rev[i]]; for(let i=0;i<n;i++) data[i]=temp[i];
  // iterative stages
  for(let s=1;s<=Math.log2(n);s++){
    const m=1<<s; const half=m>>1; for(let k=0;k<n;k+=m){ for(let j=0;j<half;j++){
      const idx1=k+j, idx2=k+j+half; const w = twiddle(j, m); const a=data[idx1]; const b=data[idx2];
      const t=mul(w,b); const upper=add(a,t); const lower=sub(a,t); const snapshot=clone(data); snapshot[idx1]=upper; snapshot[idx2]=lower;
      frames.push({stage:s, pair:[idx1,idx2], k:j, N:m, data:snapshot, desc:`Stage ${s}: combine indices ${idx1} & ${idx2} (m=${m})`, w, upper, lower});
      data[idx1]=upper; data[idx2]=lower;
    }}
  }
  return frames;
}

function formatC(z:C){ const r=z.re.toFixed(2); const i=z.im.toFixed(2); return `${r}${z.im>=0?'+':''}${i}i`; }

export default function FFTSimulation(){
  const [n,setN]=useState(8);
  const [signal,setSignal]=useState(()=> randSignal(8));
  const frames=useMemo(()=> buildFrames(signal),[signal]);
  const [index,setIndex]=useState(0);
  const [playing,setPlaying]=useState(false);
  const timerRef=useRef<number|null>(null);

  useEffect(()=>{ if(index>=frames.length-1) setPlaying(false); },[index,frames.length]);
  useEffect(()=>{ if(!playing){ if(timerRef.current) window.clearTimeout(timerRef.current); return; } timerRef.current=window.setTimeout(()=> setIndex(i=> Math.min(i+1, frames.length-1)), 750); return ()=> { if(timerRef.current) window.clearTimeout(timerRef.current); }; },[playing,index,frames.length]);

  const f=frames[index];

  return <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 to-pink-50">
  <div className="container mx-auto px-4 py-10 max-w-7xl">
      <Link href="/algorithms/divide-and-conquer/fft" className="inline-flex items-center text-fuchsia-700 hover:text-fuchsia-800 mb-8"><ArrowLeft className="h-5 w-5 mr-2"/>Overview</Link>
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55}} className="bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">{algo?.name} Simulation</h1>
        <p className="text-slate-600 text-sm mb-6 leading-relaxed">Iterative radix-2 FFT on length 8 input: bit-reversal reordering then stage-wise butterfly operations combining pairs with twiddle factors.</p>

        <div className="flex flex-wrap gap-4 mb-6 items-end">
          <button onClick={()=> setPlaying(p=> !p)} className="inline-flex items-center px-4 py-2 rounded bg-fuchsia-600 text-white hover:bg-fuchsia-700 text-sm font-semibold">{playing? <Pause className="h-4 w-4 mr-2"/>: <Play className="h-4 w-4 mr-2"/>}{playing? 'Pause':'Play'}</button>
          <button onClick={()=> setIndex(i=> Math.max(0,i-1))} disabled={index===0} className="px-3 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm disabled:opacity-40">Prev</button>
          <div className="text-xs font-mono">{index+1}/{frames.length}</div>
          <button onClick={()=> setIndex(i=> Math.min(frames.length-1,i+1))} disabled={index===frames.length-1} className="px-3 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm disabled:opacity-40">Next</button>
          <button onClick={()=> { setSignal(randSignal(n)); setIndex(0); setPlaying(false); }} className="inline-flex items-center px-4 py-2 rounded bg-pink-600 text-white hover:bg-pink-700 text-sm font-semibold"><RotateCcw className="h-4 w-4 mr-2"/>Reset</button>
          <button onClick={()=> { setSignal(s=> [...s]); setIndex(0); setPlaying(false); }} className="inline-flex items-center px-4 py-2 rounded bg-rose-600 text-white hover:bg-rose-700 text-sm font-semibold"><Shuffle className="h-4 w-4 mr-2"/>Rebuild</button>
        </div>

        <div className="overflow-x-auto border rounded-lg p-4 bg-gradient-to-br from-white to-fuchsia-50 mb-6">
          <div className="flex gap-3">
            {f.data.map((z,i)=> {
              const involved = (i===f.pair[0] || i===f.pair[1]);
              return <div key={i} className={`flex flex-col items-center min-w-[68px]`}>
                <div className={`px-2 py-2 rounded-md text-[11px] font-mono border text-center transition-all duration-300 ${involved? 'bg-fuchsia-600 text-white border-fuchsia-700 scale-105':'bg-gray-100 text-gray-700 border-gray-300'}`}>{formatC(z)}</div>
                <div className="h-4 text-[10px] font-mono text-fuchsia-600 mt-1">{involved? 'pair':''}</div>
              </div>;
            })}
          </div>
          <div className="mt-4 text-xs text-slate-600 font-mono">stage={f.stage} pair=({f.pair[0]},{f.pair[1]}) w={formatC(f.w)}</div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2"><Activity className="h-5 w-5"/> Butterfly Computation</h2>
            <ul className="text-xs font-mono bg-slate-900 text-fuchsia-100 rounded p-4 space-y-1">
              <li>a' = a + w*b</li>
              <li>b' = a - w*b</li>
              <li>w = exp(-2*pi*i*j/m)</li>
              <li>m = {`2^stage segment size`}</li>
            </ul>
            <p className="text-[11px] text-slate-500 mt-2">Each stage doubles m, halving remaining recursion depth.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2"><Sigma className="h-5 w-5"/> Step Detail</h2>
            <div className="text-sm bg-gray-50 border border-gray-200 rounded p-4 leading-relaxed min-h-[110px]">{f.desc}</div>
            <h2 className="text-lg font-semibold text-slate-800 mt-6 mb-2">Pseudocode Reference</h2>
            <PseudocodeBlock code={(algo?.pseudocode||[]).join('\n')} />
          </div>
        </div>

        <h2 className="text-lg font-semibold text-slate-800 mt-10 mb-3">Mechanism</h2>
        <p className="text-sm text-slate-600">Bit-reversal reorders input so that in-place butterflies can be applied contiguously. Each stage s performs n/2 butterflies over blocks of size 2^s with stride doubling every level.</p>
      </motion.div>
      <div className="flex justify-between items-center mt-8">
        {prev? <Link href={`/algorithms/divide-and-conquer/${prev.slug}/simulation`} className="inline-flex items-center px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"><ArrowLeft className="h-4 w-4 mr-2"/>{prev.name}</Link>: <span/>}
        <Link href="/algorithms/divide-and-conquer/fft/theory" className="px-6 py-2 rounded bg-fuchsia-600 text-white hover:bg-fuchsia-700">View Theory</Link>
        {next? <Link href={`/algorithms/divide-and-conquer/${next.slug}/simulation`} className="inline-flex items-center px-4 py-2 rounded bg-fuchsia-600 text-white hover:bg-fuchsia-700">{next.name}<ArrowRight className="h-4 w-4 ml-2"/></Link>: <span/>}
      </div>
    </div>
  </div>;
}
