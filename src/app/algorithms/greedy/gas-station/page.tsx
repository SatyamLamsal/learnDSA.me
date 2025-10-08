"use client";
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, RotateCcw } from 'lucide-react';
import PseudocodeBlock from '@/components/PseudocodeBlock';

export default function GasStationPage(){
  const [gas, setGas] = useState<number[]>([1,2,3,4,5]);
  const [cost, setCost] = useState<number[]>([3,4,5,1,2]);
  const [speed, setSpeed] = useState(700);
  const [start, setStart] = useState(0);
  const [surplus, setSurplus] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [running, setRunning] = useState(false);
  const [iStep, setIStep] = useState<number>(-1);

  const sleep = (ms:number)=> new Promise(res=>setTimeout(res, ms));

  const run = async () => {
    setRunning(true); setStart(0); setSurplus(0); setTotal(0); setIStep(-1);
    let s = 0, t = 0, st = 0;
    for (let i=0;i<gas.length;i++){
      setIStep(i);
      const diff = gas[i]-cost[i];
      t += diff; s += diff; setTotal(t); setSurplus(s); await sleep(speed);
      if (s < 0){ s = 0; st = i+1; setStart(st); await sleep(Math.max(150, speed/2)); }
    }
    setIStep(-1);
    setRunning(false);
  };

  const reset = () => { setStart(0); setSurplus(0); setTotal(0); setIStep(-1); };
  const randomize = () => {
    const n = Math.floor(Math.random()*3)+5; // 5-7 stations
    const g = Array.from({length:n}, ()=> Math.floor(Math.random()*6)+1);
    const c = Array.from({length:n}, ()=> Math.floor(Math.random()*6)+1);
    setGas(g); setCost(c); reset();
  };

  const pseudocode = `procedure GAS_STATION(gas, cost)
  start ← 0; surplus ← 0; total ← 0
  for i from 0 to n-1 do
    diff ← gas[i] − cost[i]
    surplus ← surplus + diff; total ← total + diff
    if surplus < 0 then
      start ← i + 1; surplus ← 0
    end if
  end for
  if total ≥ 0 return start else return −1
end procedure`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-emerald-50 text-gray-700">
      <div className="container mx-auto px-4 py-12 text-gray-700">
        <Link href="/algorithms/greedy" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Back to Greedy</Link>
        <h1 className="text-4xl font-bold text-slate-800 mb-2">Gas Station Problem</h1>
        <p className="text-lg text-slate-600 mb-6">Find a starting station to complete the tour. Reset start whenever the running surplus becomes negative. If total gas ≥ total cost, the solution exists.</p>

        <div className="bg-white rounded-lg shadow p-6 mb-8 text-gray-700">
          <h2 className="text-xl font-semibold text-slate-800 mb-3">Algorithm Steps</h2>
          <ol className="list-decimal pl-6 space-y-2 text-slate-700">
            <li>Track running surplus of gas-cost.</li>
            <li>When surplus &lt; 0, reset start to next station and surplus to 0.</li>
            <li>At end, if total ≥ 0, return start; else no solution.</li>
          </ol>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8 text-gray-700">
          <div className="flex flex-wrap items-end gap-3 mb-4 text-gray-700">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Speed (ms)</label>
              <input type="number" value={speed} onChange={e=>setSpeed(Math.max(100, parseInt(e.target.value)||0))} className="w-24 px-2 py-2 border rounded"/>
            </div>
            <button onClick={run} disabled={running} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded inline-flex items-center disabled:opacity-50 text-white text-white text-white text-white"><Play className="h-4 w-4 mr-2 text-gray-700"/>Run</button>
            <button onClick={reset} className="px-3 py-2 border rounded inline-flex items-center text-gray-800"><RotateCcw className="h-4 w-4 mr-2 text-gray-700"/>Reset</button>
            <button onClick={randomize} className="px-3 py-2 border rounded text-gray-800">Randomize</button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 text-gray-700">
            <div className="space-y-2 text-gray-700">
              {gas.map((g,i)=>{
                const diff = g - cost[i]; const active = i===iStep;
                return (
                  <motion.div key={i} initial={{opacity:0, y:6}} animate={{opacity:1,y:0}} className={`p-3 border rounded bg-gray-50`}> 
                    <div className="flex items-center justify-between text-gray-700">
                      <div className="text-sm text-slate-700">Station {i} {active && <span className="text-emerald-600">(visiting)</span>}</div>
                      <div className="text-xs text-slate-500">gas={g}, cost={cost[i]}, diff={diff}</div>
                    </div>
                    <div className="mt-2 h-2 bg-gray-200 rounded overflow-hidden text-gray-700">
                      <motion.div className={`h-2 ${diff>=0? 'bg-emerald-500':'bg-rose-500'}`} initial={{width:'0%'}} animate={{width: `${Math.min(100, Math.abs(diff)*15)}%`}}/>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <div className="p-4 border rounded text-gray-700">
              <div className="text-sm text-slate-700">Start index: <span className="font-semibold text-gray-800">{start}</span></div>
              <div className="text-sm text-slate-700">Running surplus: <span className="font-semibold text-gray-800">{surplus}</span></div>
              <div className="text-sm text-slate-700">Total (sum diffs): <span className="font-semibold text-gray-800">{total}</span></div>
              <div className="mt-3 h-3 bg-gray-100 rounded overflow-hidden text-gray-700"><motion.div className="h-3 bg-emerald-500 text-gray-700" initial={{width:'0%'}} animate={{width: `${Math.max(0, Math.min(100, (surplus+20)/40*100))}%`}}/></div>
              <div className="text-xs text-slate-500 mt-1">When surplus goes below 0, start moves to next station.</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8 text-gray-700">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Pseudocode</h2>
          <PseudocodeBlock code={pseudocode} autoPlay loop intervalMs={850}/>
        </div>

        <div className="bg-white rounded-lg shadow p-6 text-gray-700">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Practice Problems</h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li><a className="text-emerald-700 hover:underline" href="https://leetcode.com/problems/gas-station/" target="_blank">LeetCode 134: Gas Station</a></li>
            <li><a className="text-emerald-700 hover:underline" href="https://www.geeksforgeeks.org/find-a-tour-that-visits-all-stations/" target="_blank">GFG: Circular Tour</a></li>
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow p-6 mt-8 text-gray-700">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Use Cases</h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li>Round-trip feasibility with refueling constraints.</li>
            <li>Battery range checks for delivery/EV routing loops.</li>
            <li>Production lines balancing (surplus/deficit propagation).</li>
          </ul>
        </div>
         {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 flex justify-between items-center text-gray-700"
        >
          <Link
            href="\algorithms\greedy\dijkstra-shortest-path"
            className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2 text-gray-700" />
            Back to Dijkstra Shortest Path
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

