"use client";
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Brackets } from 'lucide-react';

interface Split { l:number; r:number; k:number; cost:number; }

export default function MatrixChainSimulationPage(){
  const [dimsInput, setDimsInput] = useState('10,30,5,60');
  const [running, setRunning] = useState(false);
  const [steps, setSteps] = useState<Split[]>([]);
  const [finalCost, setFinalCost] = useState<number|null>(null);

  const sleep = (ms:number)=> new Promise(r=>setTimeout(r,ms));

  const run = async ()=>{
    const dims = dimsInput.split(',').map(s=> parseInt(s.trim())).filter(n=>!isNaN(n) && n>0).slice(0,9);
    if (dims.length < 2) return;
    setRunning(true); setSteps([]); setFinalCost(null);
    const n = dims.length-1;
    const dp:number[][] = Array.from({length:n}, ()=> Array(n).fill(0));
    const bestK:number[][] = Array.from({length:n}, ()=> Array(n).fill(-1));
    const local:Split[] = [];
    for (let len=2; len<=n; len++){
      for (let i=0; i+len-1 < n; i++){
        const j = i+len-1;
        dp[i][j] = Infinity;
        for (let k=i; k<j; k++){
          const c = dp[i][k] + dp[k+1][j] + dims[i]*dims[k+1]*dims[j+1];
          if (c < dp[i][j]){ dp[i][j]=c; bestK[i][j]=k; }
        }
        local.push({l:i,r:j,k:bestK[i][j],cost:dp[i][j]});
      }
      setSteps([...local]); await sleep(130);
    }
    setFinalCost(dp[0][n-1]); setRunning(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-fuchsia-50 text-gray-700">
      <div className="container mx-auto px-4 py-12 text-gray-700">
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="mb-8 text-gray-700">
          <Link href="/algorithms/dynamic-programming/matrix-chain" className="inline-flex items-center text-pink-600 hover:text-pink-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Back to Overview</Link>
          <h1 className="text-4xl font-bold text-slate-800 mb-2 flex items-center"><Brackets className="h-8 w-8 text-pink-600 mr-2"/>Matrix Chain Simulation</h1>
          <p className="text-slate-600 max-w-3xl">See interval lengths expand and best split positions chosen.</p>
        </motion.div>
        <div className="bg-white rounded-lg shadow p-6 mb-10 text-gray-700">
          <div className="flex flex-wrap gap-4 mb-4 items-end text-gray-700">
            <div className="flex-1 min-w-[260px] text-gray-700">
              <label className="block text-sm font-medium text-slate-700 mb-1">Dimensions (p0,p1,...,pn)</label>
              <input value={dimsInput} onChange={e=> setDimsInput(e.target.value)} className="px-2 py-1 border rounded w-full" disabled={running}/>
            </div>
            <button onClick={run} disabled={running} className="bg-pink-600 hover:bg-pink-700 text-black px-4 py-2 rounded disabled:opacity-50 text-black text-black text-black text-black">{running? 'Running...' : 'Run'}</button>
          </div>
          <div className="space-y-2 text-xs max-h-[340px] overflow-y-auto pr-2 text-gray-600">
            {steps.map((s,i)=> <div key={i} className="px-2 py-1 rounded border bg-pink-50 text-pink-700">[{s.l},{s.r}] k={s.k} cost={s.cost}</div>)}
          </div>
          {finalCost!==null && <div className="mt-4 text-sm text-slate-700">Min Scalar Multiplications: <span className="font-semibold text-pink-600">{finalCost}</span></div>}
        </div>
        <div className="flex justify-between text-gray-700">
          <span />
          <Link href="/algorithms/dynamic-programming/matrix-chain/theory" className="text-pink-600 hover:text-pink-700">Theory →</Link>
        </div>
      </div>
    </div>
  );
}

