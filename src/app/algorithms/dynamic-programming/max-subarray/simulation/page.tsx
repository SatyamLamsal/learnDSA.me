"use client";
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Activity } from 'lucide-react';

interface Step { idx:number; val:number; current:number; best:number; }

export default function MaxSubarraySimulationPage(){
  const [arrInput, setArrInput] = useState('-2,1,-3,4,-1,2,1,-5,4');
  const [steps, setSteps] = useState<Step[]>([]);

  const run = ()=>{
    const arr = arrInput.split(',').map(s=> parseInt(s.trim())).filter(n=>!isNaN(n)).slice(0,60);
    if (arr.length===0) return;
    let current = arr[0]; let best = arr[0];
    const local:Step[] = [{idx:0,val:arr[0],current,best}];
    for (let i=1;i<arr.length;i++){
      current = Math.max(arr[i], current + arr[i]);
      best = Math.max(best, current);
      local.push({idx:i,val:arr[i],current,best});
    }
    setSteps(local);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-sky-50 text-gray-700">
      <div className="container mx-auto px-4 py-12 text-gray-700">
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="mb-8 text-gray-700">
          <Link href="/algorithms/dynamic-programming/max-subarray" className="inline-flex items-center text-cyan-600 hover:text-cyan-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Back to Overview</Link>
          <h1 className="text-4xl font-bold text-slate-800 mb-2 flex items-center"><Activity className="h-8 w-8 text-cyan-600 mr-2"/>Kadane Simulation</h1>
          <p className="text-slate-600 max-w-3xl">Step through current and global best updates.</p>
        </motion.div>
        <div className="bg-white rounded-lg shadow p-6 mb-10 text-gray-700">
          <div className="flex flex-wrap gap-4 mb-4 items-end text-gray-700">
            <div className="flex-1 min-w-[260px] text-gray-700">
              <label className="block text-sm font-medium text-slate-700 mb-1">Array</label>
              <input value={arrInput} onChange={e=> setArrInput(e.target.value)} className="px-2 py-1 border rounded w-full"/>
            </div>
            <button onClick={run} className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded text-white text-white text-white text-white">Run</button>
          </div>
          <div className="space-y-2 text-xs text-gray-600">
            {steps.map(s=> <div key={s.idx} className="flex items-center gap-3 text-gray-700">
              <span className="px-2 py-1 rounded bg-cyan-50 text-cyan-700 border">{s.val}</span>
              <span className="px-2 py-1 rounded bg-blue-50 text-blue-700 border">cur={s.current}</span>
              <span className="px-2 py-1 rounded bg-green-50 text-green-700 border">best={s.best}</span>
            </div>)}
          </div>
          {steps.length>0 && <div className="mt-4 text-sm text-slate-700">Max Subarray Sum: <span className="font-semibold text-cyan-600">{steps[steps.length-1].best}</span></div>}
        </div>
        <div className="flex justify-between text-gray-700">
          <span />
          <Link href="/algorithms/dynamic-programming/max-subarray/theory" className="text-cyan-600 hover:text-cyan-700">Theory →</Link>
        </div>
      </div>
    </div>
  );
}

