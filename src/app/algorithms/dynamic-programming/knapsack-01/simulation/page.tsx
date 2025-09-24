"use client";
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface Item { id:string; w:number; v:number; }
interface Cell { i:number; w:number; val:number; take:boolean; }

export default function KnapsackSimulationPage(){
  const [items] = useState<Item[]>([
    {id:'A', w:2, v:6}, {id:'B', w:2, v:4}, {id:'C', w:4, v:5}, {id:'D', w:5, v:8}
  ]);
  const [capacity, setCapacity] = useState(10);
  const [running, setRunning] = useState(false);
  const [table, setTable] = useState<Cell[]>([]);
  const [bestSet, setBestSet] = useState<Set<string>>(new Set());

  const sleep = (ms:number)=> new Promise(r=>setTimeout(r,ms));

  const run = async ()=>{
    setRunning(true); setTable([]); setBestSet(new Set());
    const n = items.length;
    const dp: number[][] = Array.from({length:n+1}, ()=> Array(capacity+1).fill(0));
    const local: Cell[] = [];
    for (let i=1;i<=n;i++){
      for (let w=0; w<=capacity; w++){
        if (items[i-1].w <= w){
          const take = items[i-1].v + dp[i-1][w-items[i-1].w];
            const skip = dp[i-1][w];
            if (take > skip){ dp[i][w] = take; local.push({i,w,val:dp[i][w], take:true}); }
            else { dp[i][w] = skip; local.push({i,w,val:dp[i][w], take:false}); }
        } else {
          dp[i][w] = dp[i-1][w]; local.push({i,w,val:dp[i][w], take:false});
        }
      }
      setTable([...local]); await sleep(120);
    }
    let w = capacity; const chosen = new Set<string>();
    for (let i=n; i>=1; i--){
      if (dp[i][w] !== dp[i-1][w]){ chosen.add(items[i-1].id); w -= items[i-1].w; }
    }
    setBestSet(chosen); setRunning(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="mb-8">
          <Link href="/algorithms/dynamic-programming/knapsack-01" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2"/>Back to Overview</Link>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Knapsack Simulation</h1>
          <p className="text-slate-600 max-w-3xl">Step through table filling and highlight when taking an item improves value versus skipping.</p>
        </motion.div>
        <div className="bg-white rounded-lg shadow p-6 mb-10">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">0/1 Knapsack Table</h3>
          <div className="flex flex-wrap gap-4 mb-4 items-end">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Capacity</label>
              <input type="number" value={capacity} onChange={e=> setCapacity(Math.min(40, Math.max(1, parseInt(e.target.value)||1)))} className="w-28 px-2 py-1 border rounded" disabled={running}/>
            </div>
            <button onClick={run} disabled={running} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded disabled:opacity-50">{running? 'Running…' : 'Run DP'}</button>
          </div>
          <div className="mb-4 text-sm">
            <span className="font-semibold">Items:</span> {items.map(it=> <span key={it.id} className={`ml-2 px-2 py-1 rounded border ${bestSet.has(it.id)? 'bg-indigo-600 text-white border-indigo-600':'bg-gray-50'}`}>{it.id}(w{it.w},v{it.v})</span>)}
          </div>
          <div className="overflow-x-auto">
            <div className="inline-block border rounded bg-gray-50 p-2">
              <table className="text-xs border-collapse">
                <thead>
                  <tr>
                    <th className="border px-2 py-1 bg-white">i/w</th>
                    {Array.from({length:capacity+1}, (_,w)=> <th key={w} className="border px-2 py-1 bg-white">{w}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({length: items.length+1}, (_,i)=> (
                    <tr key={i}>
                      <td className="border px-2 py-1 bg-white font-semibold">{i}</td>
                      {Array.from({length: capacity+1}, (_,w)=>{
                        const cell = table.find(c=> c.i===i && c.w===w);
                        const val = cell? cell.val : 0;
                        const take = cell?.take;
                        return <td key={w} className={`border px-2 py-1 text-center ${take? 'bg-indigo-100 text-indigo-700':'bg-white'}`}>{val}</td>;
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {bestSet.size>0 && <div className="mt-4 text-sm text-slate-700">Chosen Set: {[...bestSet].sort().join(', ')} (Value = {Array.from(bestSet).reduce((s,id)=> s + items.find(it=>it.id===id)!.v,0)})</div>}
        </div>
      </div>
    </div>
  );
}

