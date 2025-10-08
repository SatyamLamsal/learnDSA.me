"use client";
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Scissors } from 'lucide-react';

interface Step { i:number; cuts:number; }

export default function PalindromePartitionSimulationPage(){
  const [s, setS] = useState('aabccb');
  const [running, setRunning] = useState(false);
  const [steps, setSteps] = useState<Step[]>([]);
  const [result, setResult] = useState<number|null>(null);

  const sleep = (ms:number)=> new Promise(r=>setTimeout(r,ms));

  const run = async ()=>{
    const n = s.length; if (n===0) return;
    setRunning(true); setSteps([]); setResult(null);
    const pal:boolean[][] = Array.from({length:n}, ()=> Array(n).fill(false));
    for (let len=1; len<=n; len++){
      for (let i=0; i+len-1<n; i++){
        const j=i+len-1;
        if (s[i]===s[j] && (len<=2 || pal[i+1][j-1])) pal[i][j]=true;
      }
    }
    const dp:number[] = Array(n).fill(0);
    const local:Step[] = [];
    for (let i=0;i<n;i++){
      if (pal[0][i]) dp[i]=0; else {
        dp[i]=Infinity;
        for (let j=0;j<i;j++) if (pal[j+1][i] && dp[j]+1 < dp[i]) dp[i]=dp[j]+1;
      }
      local.push({i,cuts:dp[i]}); setSteps([...local]); await sleep(120);
    }
    setResult(dp[n-1]); setRunning(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 text-white">
      <div className="container mx-auto px-4 py-12 text-gray-700">
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="mb-8 text-gray-700">
          <Link href="/algorithms/dynamic-programming/palindrome-partition" className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Back to Overview</Link>
          <h1 className="text-4xl font-bold text-slate-800 mb-2 flex items-center"><Scissors className="h-8 w-8 text-teal-600 mr-2"/>Palindrome Partition Simulation</h1>
          <p className="text-slate-600 max-w-3xl">Observe palindrome preprocessing and incremental cut computation.</p>
        </motion.div>
        <div className="bg-white rounded-lg shadow p-6 mb-10 text-gray-700">
          <div className="flex flex-wrap gap-4 mb-4 items-end text-gray-700">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">String</label>
              <input value={s} onChange={e=> setS(e.target.value.slice(0,20))} className="px-2 py-1 border rounded" disabled={running}/>
            </div>
            <button onClick={run} disabled={running} className="bg-teal-600 hover:bg-teal-700 text-black px-4 py-2 rounded disabled:opacity-50 text-black text-black text-black text-black text-black">{running? 'Running...' : 'Run'}</button>
          </div>
          <div className="flex flex-wrap gap-2 text-xs mb-4 text-gray-600">
            {steps.map(st=> <div key={st.i} className="px-2 py-1 rounded border bg-teal-50 text-teal-700">i={st.i} cuts={st.cuts}</div>)}
          </div>
          {result!==null && <div className="text-sm text-slate-700">Minimum Cuts: <span className="font-semibold text-teal-600">{result}</span></div>}
        </div>
        <div className="flex justify-between text-gray-700">
          <span />
          <Link href="/algorithms/dynamic-programming/palindrome-partition/theory" className="text-teal-600 hover:text-teal-700">Theory →</Link>
        </div>
      </div>
    </div>
  );
}

