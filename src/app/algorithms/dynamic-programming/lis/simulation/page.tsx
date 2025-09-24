"use client";
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ListOrdered } from 'lucide-react';

interface Step { idx:number; val:number; piles:number[]; placed:number; }

export default function LISSimulationPage(){
  const [arrInput, setArrInput] = useState('10,9,2,5,3,7,101,18');
  const [running, setRunning] = useState(false);
  const [steps, setSteps] = useState<Step[]>([]);
  const [length, setLength] = useState<number|null>(null);

  const sleep = (ms:number)=> new Promise(r=>setTimeout(r,ms));

  const run = async ()=>{
    const arr = arrInput.split(',').map(s=> parseInt(s.trim())).filter(n=>!isNaN(n)).slice(0,40);
    if (arr.length===0) return;
    setRunning(true); setSteps([]); setLength(null);
    const piles:number[] = []; const local:Step[] = [];
    for (let i=0;i<arr.length;i++){
      const x = arr[i];
      let l=0, r=piles.length;
      while (l<r){ const m=(l+r)>>1; if (piles[m] >= x) r=m; else l=m+1; }
      const pos = l;
      if (pos===piles.length) piles.push(x); else piles[pos]=x;
      local.push({idx:i,val:x,piles:[...piles], placed:pos});
      setSteps([...local]); await sleep(120);
    }
    setLength(piles.length); setRunning(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-50">
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="mb-8">
          <Link href="/algorithms/dynamic-programming/lis" className="inline-flex items-center text-red-600 hover:text-red-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2"/>Back to Overview</Link>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">LIS Simulation</h1>
          <p className="text-slate-600 max-w-3xl">Patience sorting pile evolution using binary search placement.</p>
        </motion.div>
        <div className="bg-white rounded-lg shadow p-6 mb-10">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center"><ListOrdered className="h-5 w-5 mr-2 text-red-600"/>Patience Sorting Visualization</h3>
          <div className="flex flex-wrap gap-4 mb-4 items-end">
            <div className="flex-1 min-w-[260px]">
              <label className="block text-sm font-medium text-slate-700 mb-1">Array</label>
              <input value={arrInput} onChange={e=> setArrInput(e.target.value)} className="px-2 py-1 border rounded w-full" disabled={running}/>
            </div>
            <button onClick={run} disabled={running} className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded disabled:opacity-50">{running? 'Running…' : 'Run'}</button>
          </div>
          <div className="space-y-3">
            {steps.map(s=> (
              <div key={s.idx} className="text-xs flex items-center gap-3">
                <span className="px-2 py-1 rounded bg-red-100 text-red-700">{s.val}</span>
                <div className="flex gap-2">
                  {s.piles.map((p,i)=> <div key={i} className={`px-2 py-1 rounded border ${i===s.placed? 'bg-red-600 text-white border-red-600':'bg-gray-50'}`}>{p}</div>)}
                </div>
              </div>
            ))}
          </div>
          {length!==null && <div className="mt-4 text-sm text-slate-700">LIS Length: <span className="font-semibold text-red-600">{length}</span></div>}
        </div>
      </div>
    </div>
  );
}

