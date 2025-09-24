"use client";
import Link from 'next/link';
import { getAlgorithm, getPrevNext } from '../../dcAlgorithms';
import { ArrowLeft, ArrowRight, RotateCcw, Shuffle, Play, Pause, Grid3x3, Sigma } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import PseudocodeBlock from '@/components/PseudocodeBlock';

interface Mat { data:number[][]; }
interface Frame { stage:string; desc:string; A:number[][]; B:number[][]; M?:Record<string,number[][]>; C?:number[][]; highlight?:string; }

const algo = getAlgorithm('strassen');
const { prev, next } = getPrevNext('strassen');

function randMatrix(n:number){ return Array.from({length:n},()=> Array.from({length:n},()=> Math.floor(Math.random()*9)-4)); }
function add(A:number[][],B:number[][]){ return A.map((r,i)=> r.map((v,j)=> v+B[i][j])); }
function sub(A:number[][],B:number[][]){ return A.map((r,i)=> r.map((v,j)=> v-B[i][j])); }

function split(M:number[][]){ const n=M.length, h=n/2; return [
  M.slice(0,h).map(r=> r.slice(0,h)), M.slice(0,h).map(r=> r.slice(h)),
  M.slice(h).map(r=> r.slice(0,h)), M.slice(h).map(r=> r.slice(h))
]; }
function join(C11:number[][],C12:number[][],C21:number[][],C22:number[][]){ const h=C11.length; const n=h*2; const R=Array.from({length:n},()=> Array(n).fill(0)); for(let i=0;i<h;i++){ for(let j=0;j<h;j++){ R[i][j]=C11[i][j]; R[i][j+h]=C12[i][j]; R[i+h][j]=C21[i][j]; R[i+h][j+h]=C22[i][j]; } } return R; }

function buildFrames(A:number[][], B:number[][]):Frame[]{
  const frames:Frame[]=[];
  const n=A.length;
  if(n===2){
    frames.push({stage:'start',desc:'Initial 2x2 matrices',A,B});
    const [a,b,c,d] = [A[0][0],A[0][1],A[1][0],A[1][1]];
    const [e,f,g,h] = [B[0][0],B[0][1],B[1][0],B[1][1]];
    frames.push({stage:'M1',desc:'M1 = (a+d)(e+h)',A,B,M:{M1:[[ (a+d)*(e+h) ]]},highlight:'M1'});
    const M1=(a+d)*(e+h);
    const M2=(c+d)*e; frames.push({stage:'M2',desc:'M2 = (c+d)e',A,B,M:{M2:[[M2]]},highlight:'M2'});
    const M3=a*(f-h); frames.push({stage:'M3',desc:'M3 = a(f-h)',A,B,M:{M3:[[M3]]},highlight:'M3'});
    const M4=d*(g-e); frames.push({stage:'M4',desc:'M4 = d(g-e)',A,B,M:{M4:[[M4]]},highlight:'M4'});
    const M5=(a+b)*h; frames.push({stage:'M5',desc:'M5 = (a+b)h',A,B,M:{M5:[[M5]]},highlight:'M5'});
    const M6=(c-a)*(e+f); frames.push({stage:'M6',desc:'M6 = (c-a)(e+f)',A,B,M:{M6:[[M6]]},highlight:'M6'});
    const M7=(b-d)*(g+h); frames.push({stage:'M7',desc:'M7 = (b-d)(g+h)',A,B,M:{M7:[[M7]]},highlight:'M7'});
    const C11 = M1 + M4 - M5 + M7;
    const C12 = M3 + M5;
    const C21 = M2 + M4;
    const C22 = M1 - M2 + M3 + M6;
    const C = [[C11,C12],[C21,C22]];
    frames.push({stage:'combine',desc:'Combine C blocks from M1..M7',A,B,M:{M1:[[M1]],M2:[[M2]],M3:[[M3]],M4:[[M4]],M5:[[M5]],M6:[[M6]],M7:[[M7]]},C});
    frames.push({stage:'done',desc:'Final product matrix',A,B,C});
    return frames;
  }
  // n>2 single recursion level to 2x2 base for clarity
  frames.push({stage:'start',desc:`Initial ${n}x${n} matrices`,A,B});
  const [A11,A12,A21,A22]=split(A); const [B11,B12,B21,B22]=split(B);
  frames.push({stage:'split',desc:'Split into quadrants A11..A22, B11..B22',A,B});
  // compute M1..M7 using recursive (actually base strassen on 2x2 after one more split if size>2)
  function rStr(m1:number[][],m2:number[][]):number[][]{ if(m1.length===2){
    const [a,b,c,d]=[m1[0][0],m1[0][1],m1[1][0],m1[1][1]]; const [e,f,g,h]=[m2[0][0],m2[0][1],m2[1][0],m2[1][1]];
    const M1=(a+d)*(e+h); const M2=(c+d)*e; const M3=a*(f-h); const M4=d*(g-e); const M5=(a+b)*h; const M6=(c-a)*(e+f); const M7=(b-d)*(g+h);
    const C11 = M1 + M4 - M5 + M7; const C12 = M3 + M5; const C21 = M2 + M4; const C22 = M1 - M2 + M3 + M6; return [[C11,C12],[C21,C22]]; }
    // fallback classical for any other size (should not hit here for chosen n)
    const n=m1.length; const C=Array.from({length:n},()=> Array(n).fill(0)); for(let i=0;i<n;i++) for(let k=0;k<n;k++) for(let j=0;j<n;j++) C[i][j]+=m1[i][k]*m2[k][j]; return C;
  }
  const M1 = rStr(add(A11,A22), add(B11,B22)); frames.push({stage:'M1',desc:'M1 computed',A,B,M:{M1}});
  const M2 = rStr(add(A21,A22), B11); frames.push({stage:'M2',desc:'M2 computed',A,B,M:{M2}});
  const M3 = rStr(A11, sub(B12,B22)); frames.push({stage:'M3',desc:'M3 computed',A,B,M:{M3}});
  const M4 = rStr(A22, sub(B21,B11)); frames.push({stage:'M4',desc:'M4 computed',A,B,M:{M4}});
  const M5 = rStr(add(A11,A12), B22); frames.push({stage:'M5',desc:'M5 computed',A,B,M:{M5}});
  const M6 = rStr(sub(A21,A11), add(B11,B12)); frames.push({stage:'M6',desc:'M6 computed',A,B,M:{M6}});
  const M7 = rStr(sub(A12,A22), add(B21,B22)); frames.push({stage:'M7',desc:'M7 computed',A,B,M:{M7}});
  const C11=add(sub(add(M1,M4),M5),M7); const C12=add(M3,M5); const C21=add(M2,M4); const C22=add(sub(add(M1,M3),M2),M6);
  const C=join(C11,C12,C21,C22); frames.push({stage:'combine',desc:'Combine C blocks',A,B,M:{M1,M2,M3,M4,M5,M6,M7},C});
  frames.push({stage:'done',desc:'Final product matrix',A,B,C});
  return frames;
}

function MatView({M,label,highlight}:{M:number[][]; label:string; highlight?:boolean;}){
  return <div className={`inline-block mr-4 mb-4 rounded border ${highlight? 'border-indigo-500 bg-indigo-50':'border-gray-300 bg-white'} shadow-sm`}>
    <div className="text-[10px] font-semibold px-2 py-1 bg-gray-100 rounded-t">{label}</div>
    <table className="text-[11px] font-mono">
      <tbody>{M.map((r,i)=><tr key={i}>{r.map((v,j)=><td key={j} className="px-2 py-1 border border-gray-200 text-center">{v}</td>)}</tr>)}</tbody>
    </table>
  </div>;
}

export default function StrassenSimulation(){
  const [size,setSize]=useState(2);
  const [A,setA]=useState(()=> randMatrix(2));
  const [B,setB]=useState(()=> randMatrix(2));
  const [index,setIndex]=useState(0);
  const [playing,setPlaying]=useState(false);
  const frames=useMemo(()=> buildFrames(A,B),[A,B]);
  const timerRef=useRef<number|null>(null);

  useEffect(()=>{ if(index>=frames.length-1) setPlaying(false); },[index,frames.length]);
  useEffect(()=>{ if(!playing){ if(timerRef.current) window.clearTimeout(timerRef.current); return; } timerRef.current=window.setTimeout(()=> setIndex(i=> Math.min(i+1, frames.length-1)), 800); return ()=> { if(timerRef.current) window.clearTimeout(timerRef.current); }; },[playing,index,frames.length]);

  const f=frames[index];

  return <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-violet-50">
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      {/* Hero */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55}} className="mb-12">
        <Link href="/algorithms/divide-and-conquer/strassen" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2"/>Overview</Link>
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-800 mb-5">Strassen Simulation</h1>
        <p className="text-xl text-slate-600 max-w-4xl leading-relaxed">Interactively observe computation of M1..M7 and how they recombine to form the result matrix.</p>
      </motion.div>

      {/* Controls */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.05}} className="bg-white rounded-2xl shadow-xl p-8 mb-10">
        <h2 className="text-2xl font-bold text-slate-800 mb-5">Controls</h2>
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="text-xs font-semibold text-slate-600">Size</label>
            <select value={size} onChange={e=> { const v=Number(e.target.value); setSize(v); setA(randMatrix(v)); setB(randMatrix(v)); setIndex(0); setPlaying(false); }} className="text-sm border rounded px-2 py-2 ml-2 bg-white">
              <option value={2}>2x2</option>
              <option value={4}>4x4</option>
            </select>
          </div>
          <button onClick={()=> setPlaying(p=> !p)} className="inline-flex items-center px-5 py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 text-xs font-semibold shadow">{playing? <Pause className="h-4 w-4 mr-2"/>: <Play className="h-4 w-4 mr-2"/>}{playing? 'Pause':'Play'}</button>
          <button onClick={()=> setIndex(i=> Math.max(0,i-1))} disabled={index===0} className="px-4 py-2.5 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 text-xs font-semibold disabled:opacity-40">Prev</button>
          <div className="text-xs font-mono bg-gray-100 px-3 py-2 rounded">{index+1}/{frames.length}</div>
          <button onClick={()=> setIndex(i=> Math.min(frames.length-1,i+1))} disabled={index===frames.length-1} className="px-4 py-2.5 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 text-xs font-semibold disabled:opacity-40">Next</button>
          <button onClick={()=> { setA(randMatrix(size)); setB(randMatrix(size)); setIndex(0); setPlaying(false); }} className="inline-flex items-center px-5 py-2.5 rounded-lg bg-violet-600 text-white hover:bg-violet-700 text-xs font-semibold shadow"><RotateCcw className="h-4 w-4 mr-2"/>Reset</button>
          <button onClick={()=> { setA(a=> [...a]); setIndex(0); setPlaying(false); }} className="inline-flex items-center px-5 py-2.5 rounded-lg bg-purple-600 text-white hover:bg-purple-700 text-xs font-semibold shadow"><Shuffle className="h-4 w-4 mr-2"/>Rebuild</button>
        </div>
      </motion.div>

      {/* Visualization */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.1}} className="bg-white rounded-2xl shadow-xl p-8 mb-10">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3"><Grid3x3 className="h-5 w-5"/> Matrices</h2>
        <div className="flex flex-wrap mb-6">
          <MatView M={f.A} label="A" />
          <MatView M={f.B} label="B" />
          {f.C && <MatView M={f.C} label="C" highlight />}
        </div>
        {f.M && <div className="mb-4">
          <h3 className="text-xs font-semibold uppercase mb-3 text-indigo-700">Intermediate Products</h3>
          <div className="flex flex-wrap">
            {Object.entries(f.M).map(([key,mat])=> <MatView key={key} M={mat} label={key} highlight={f.highlight===key} />)}
          </div>
        </div>}
        <div className="text-xs text-slate-600 font-mono">stage = {f.stage}</div>
      </motion.div>

      {/* Step Detail */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.15}} className="bg-white rounded-2xl shadow-xl p-8 mb-10">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3"><Sigma className="h-5 w-5"/> Step Explanation</h2>
        <div className="text-sm bg-gray-50 border border-gray-200 rounded p-5 leading-relaxed min-h-[120px]">{f.desc}</div>
      </motion.div>

      {/* Pseudocode */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.2}} className="bg-white rounded-2xl shadow-xl p-8 mb-10">
        <h2 className="text-2xl font-bold text-slate-800 mb-5">Pseudocode Reference</h2>
        <PseudocodeBlock code={(algo?.pseudocode||[]).join('\n')} />
      </motion.div>

      {/* Mechanism Notes */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.25}} className="bg-white rounded-2xl shadow-xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Mechanism</h2>
        <p className="text-sm text-slate-700">Eight naive sub-matrix multiplications become seven via pre-combined sums/differences forming M1..M7; additional additions/subtractions are offset for large n. This visualization limits recursion depth for clarity (4x4 performs one split then 2x2 base).</p>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-4">
        {prev? <Link href={`/algorithms/divide-and-conquer/${prev.slug}/simulation`} className="inline-flex items-center px-5 py-2.5 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 text-xs font-semibold"><ArrowLeft className="h-4 w-4 mr-2"/>{prev.name}</Link>: <span/>}
        <Link href="/algorithms/divide-and-conquer/strassen/theory" className="inline-flex items-center px-6 py-3 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 text-sm font-semibold">View Theory</Link>
        {next? <Link href={`/algorithms/divide-and-conquer/${next.slug}/simulation`} className="inline-flex items-center px-5 py-2.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 text-xs font-semibold">{next.name}<ArrowRight className="h-4 w-4 ml-2"/></Link>: <span/>}
      </div>
    </div>
  </div>;
}
