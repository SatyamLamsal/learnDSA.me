"use client";
'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, SkipForward,  RotateCcw } from 'lucide-react';
import PseudocodeBlock from '@/components/PseudocodeBlock';

type Job = { id:string; profit:number; deadline:number };

export default function JobSchedulingPage(){
  const [speed, setSpeed] = useState(700);
  const jobs: Job[] = [
    {id:'A', profit:100, deadline:2},
    {id:'B', profit:19, deadline:1},
    {id:'C', profit:27, deadline:2},
    {id:'D', profit:25, deadline:1},
    {id:'E', profit:15, deadline:3},
  ].sort((a,b)=>b.profit-a.profit);
  const maxSlot = useMemo(()=> Math.max(...jobs.map(j=>j.deadline)), [jobs]);
  const [slots, setSlots] = useState<(string|null)[]>(Array.from({length: maxSlot}, ()=>null));
  const [running, setRunning] = useState(false);

  const sleep = (ms:number)=> new Promise(res=>setTimeout(res, ms));

  const run = async () => {
    setRunning(true); setSlots(Array.from({length: maxSlot}, ()=>null));
    const s = Array<string|null>(maxSlot).fill(null);
    for (const job of jobs){
      for (let t = Math.min(maxSlot, job.deadline)-1; t>=0; t--){
        if (s[t]===null){ s[t]=job.id; setSlots([...s]); await sleep(speed); break; }
      }
    }
    setRunning(false);
  };

  const reset = () => setSlots(Array.from({length: maxSlot}, ()=>null));

  const pseudocode = `procedure JOB_SCHEDULING(jobs)
  sort jobs by decreasing profit
  let slots[1..maxDeadline] ← empty
  for each job j in jobs do
    for t ← min(maxDeadline, j.deadline) down to 1 do
      if slots[t] is empty then
        slots[t] ← j; break
      end if
    end for
  end for
  return slots
end procedure`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-12">
        <Link href="/algorithms/greedy" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2"/>Back to Greedy</Link>
        <h1 className="text-4xl font-bold text-slate-800 mb-2">Job Scheduling with Deadlines</h1>
        <p className="text-lg text-slate-600 mb-6">Schedule jobs to maximize total profit by placing each job into the latest available slot before its deadline. Greedy is optimal by exchange arguments.</p>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-3">Algorithm Steps</h2>
          <ol className="list-decimal pl-6 space-y-2 text-slate-700">
            <li>Sort jobs by decreasing profit.</li>
            <li>For each job, try to place it at its latest free slot ≤ deadline.</li>
            <li>Skip if no slot free.</li>
          </ol>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-wrap items-end gap-3 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Speed (ms)</label>
              <input type="number" value={speed} onChange={e=>setSpeed(Math.max(100, parseInt(e.target.value)||0))} className="w-24 px-2 py-2 border rounded"/>
            </div>
            <button onClick={run} disabled={running} className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded inline-flex items-center disabled:opacity-50"><Play className="h-4 w-4 mr-2"/>Run</button>
            <button onClick={reset} className="px-3 py-2 border rounded inline-flex items-center"><RotateCcw className="h-4 w-4 mr-2"/>Reset</button>
          </div>

          <div className="flex gap-3">
            {slots.map((jid, idx)=> (
              <motion.div key={idx} initial={{opacity:0, y:6}} animate={{opacity:1, y:0}} className="w-24 h-20 border rounded flex flex-col items-center justify-center bg-gray-50">
                <div className="text-xs text-slate-500">Slot {idx+1}</div>
                <div className="text-sm font-semibold text-slate-700">{jid ?? '-'}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Pseudocode</h2>
          <PseudocodeBlock code={pseudocode} autoPlay loop intervalMs={800}/>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Practice Problems</h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li><a className="text-orange-700 hover:underline" href="https://www.geeksforgeeks.org/job-sequencing-problem/" target="_blank">Job Sequencing (GFG)</a></li>
            <li><a className="text-orange-700 hover:underline" href="https://cp-algorithms.com/greedy/job_scheduling.html" target="_blank">CP-Algorithms: Job Scheduling</a></li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mt-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Use Cases</h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li>Manufacturing job sequencing on a single machine.</li>
            <li>Content publishing with deadlines and priorities.</li>
            <li>Ad campaign scheduling with time windows.</li>
          </ul>
        </div>
         {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 flex justify-between items-center"
        >
          <Link
            href="\algorithms\greedy\huffman-coding"
            className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Huffman Coding
          </Link>
          
          <Link
            href="\algorithms\greedy\coin-change-greedy"
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Next: Coin Change Greedy
            <SkipForward className="h-5 w-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

