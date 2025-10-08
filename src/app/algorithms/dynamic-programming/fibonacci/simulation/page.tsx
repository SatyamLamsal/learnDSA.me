"use client";
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Cpu, Zap, Layers } from 'lucide-react';

interface Step { method: string; n: number; value: number; note: string; }

export default function FibonacciSimulationPage(){
  const [n, setN] = useState(12);
  const [running, setRunning] = useState(false);
  const [steps, setSteps] = useState<Step[]>([]);

  const sleep = (ms:number)=> new Promise(r=>setTimeout(r,ms));

  const run = async ()=>{
    setRunning(true); setSteps([]);
    const dp: number[] = Array(n+1).fill(0); dp[1]=1;
    const local: Step[] = [
      {method:'tabulation', n:0, value:0, note:'Base'},
      {method:'tabulation', n:1, value:1, note:'Base'}
    ];
    for (let i=2;i<=n;i++){
      dp[i] = dp[i-1] + dp[i-2];
      local.push({method:'tabulation', n:i, value:dp[i], note:`dp[${i}] = ${dp[i-1]} + ${dp[i-2]}`});
      if (i<=30){ setSteps([...local]); await sleep(100);} 
    }
    // space optimization
    let a=0,b=1; local.push({method:'space', n:0, value:a, note:'a'}); local.push({method:'space', n:1, value:b, note:'b'});
    for (let i=2;i<=n;i++){
      const c = a + b; a = b; b = c;
      local.push({method:'space', n:i, value:b, note:`a,b = b,a+b -> ${b}`});
    }
    setSteps([...local]); setRunning(false);
  };

  const tabSteps = steps.filter(s=> s.method==='tabulation');
  const spaceSteps = steps.filter(s=> s.method==='space');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 text-gray-700">
      <div className="container mx-auto px-4 py-12 text-gray-700">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="mb-8 text-gray-700">
          <Link href="/algorithms/dynamic-programming/fibonacci" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Back to Fibonacci</Link>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Fibonacci Simulation</h1>
          <p className="text-lg text-slate-600 max-w-3xl">Watch bottom-up tabulation and rolling (space optimized) methods build values. Compare sequences and notes for each step.</p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6 mb-10 text-gray-700">
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-700"><Clock className="h-10 w-10 text-blue-600 mx-auto mb-3"/><h3 className="font-semibold text-slate-800 mb-1">Time</h3><div className="text-xl font-bold text-blue-600">O(n)</div></div>
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-700"><Cpu className="h-10 w-10 text-green-600 mx-auto mb-3"/><h3 className="font-semibold text-slate-800 mb-1">Space</h3><div className="text-xl font-bold text-green-600">O(1–n)</div></div>
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-700"><Zap className="h-10 w-10 text-purple-600 mx-auto mb-3"/><h3 className="font-semibold text-slate-800 mb-1">Methods</h3><div className="text-sm font-bold text-purple-600">Tabulation / Rolling</div></div>
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-700"><Layers className="h-10 w-10 text-orange-600 mx-auto mb-3"/><h3 className="font-semibold text-slate-800 mb-1">Recurrence</h3><div className="text-sm font-bold text-orange-600">F(n)=F(n-1)+F(n-2)</div></div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-10 text-gray-700">
          <div className="flex flex-wrap items-end gap-4 mb-6 text-gray-700">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">n (0-60)</label>
              <input type="number" value={n} onChange={e=> setN(Math.min(60, Math.max(0, parseInt(e.target.value)||0)))} className="w-28 px-2 py-1 border rounded" disabled={running}/>
            </div>
            <button onClick={run} disabled={running} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded disabled:opacity-50 text-white text-white text-white text-white">{running? 'Running…' : 'Run'}</button>
          </div>
          <div className="grid md:grid-cols-2 gap-8 text-gray-700">
            <div>
              <h3 className="font-semibold text-slate-700 mb-2">Tabulation</h3>
              <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                {tabSteps.map(s=> <div key={`t-${s.n}`} className="px-2 py-1 rounded bg-blue-100 text-blue-700">F{s.n}={s.value}</div>)}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 mb-2">Space Optimized</h3>
              <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                {spaceSteps.map(s=> <div key={`s-${s.n}`} className="px-2 py-1 rounded bg-indigo-100 text-indigo-700">F{s.n}={s.value}</div>)}
              </div>
            </div>
          </div>
          {steps.length>0 && (
            <div className="mt-6 max-h-44 overflow-y-auto text-[11px] bg-gray-50 p-3 rounded border font-mono space-y-1 text-gray-700">
              {steps.slice(-40).map((st,i)=> (
                <div key={i}>[{st.method}] F({st.n}) = {st.value} <span className="text-slate-400">{st.note}</span></div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

