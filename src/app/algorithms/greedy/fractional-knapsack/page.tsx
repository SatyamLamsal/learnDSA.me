"use client";
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Play,SkipForward, RotateCcw, Percent } from 'lucide-react';
import PseudocodeBlock from '@/components/PseudocodeBlock';

type Item = { id: string; value: number; weight: number; ratio: number; take?: number };

export default function FractionalKnapsackPage(){
  const [capacity, setCapacity] = useState(15);
  const [speed, setSpeed] = useState(600);
  const [items, setItems] = useState<Item[]>([
    { id: 'A', value: 60, weight: 10, ratio: 6 },
    { id: 'B', value: 100, weight: 20, ratio: 5 },
    { id: 'C', value: 120, weight: 30, ratio: 4 },
  ].sort((a,b)=>b.ratio-a.ratio));
  const [taking, setTaking] = useState<Record<string, number>>({});
  const [running, setRunning] = useState(false);

  const sleep = (ms:number)=> new Promise(res=>setTimeout(res, ms));

  const run = async () => {
    setRunning(true); setTaking({});
    let cap = capacity; let total = 0;
    for (const it of items){
      if (cap<=0) break;
      if (it.weight <= cap){
        setTaking(prev=>({...prev, [it.id]: 1}));
        cap -= it.weight; total += it.value; await sleep(speed);
      } else {
        const frac = cap / it.weight; // take fraction
        setTaking(prev=>({...prev, [it.id]: frac}));
        total += it.value * frac; cap = 0; await sleep(speed);
      }
    }
    setRunning(false);
  };

  const reset = () => { setTaking({}); };

  const pseudocode = `procedure FRACTIONAL_KNAPSACK(items, W)
  sort items by value/weight in decreasing order
  total ← 0
  for each item in items do
    if W = 0 then break
    if item.weight ≤ W then
      take 100% of item; W ← W − item.weight; total ← total + item.value
    else
      take fraction = W / item.weight; total ← total + item.value * fraction; W ← 0
    end if
  end for
  return total
end procedure`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-12">
        <Link href="/algorithms/greedy" className="inline-flex items-center text-amber-600 hover:text-amber-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2"/>Back to Greedy</Link>
        <h1 className="text-4xl font-bold text-slate-800 mb-2">Fractional Knapsack</h1>
        <p className="text-lg text-slate-600 mb-6">Maximize total value by taking items greedily by highest value-to-weight ratio. Greedy works here because fractions are allowed, making the ratio choice provably optimal.</p>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-3">Algorithm Steps</h2>
          <ol className="list-decimal pl-6 space-y-2 text-slate-700">
            <li>Compute ratio value/weight for each item.</li>
            <li>Sort by decreasing ratio.</li>
            <li>Take fully while capacity allows; otherwise take fraction of next item.</li>
          </ol>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-wrap items-end gap-3 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Capacity</label>
              <input type="number" value={capacity} onChange={e=>setCapacity(Math.max(1, parseInt(e.target.value)||0))} className="w-24 px-2 py-2 border rounded"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Speed (ms)</label>
              <input type="number" value={speed} onChange={e=>setSpeed(Math.max(100, parseInt(e.target.value)||0))} className="w-24 px-2 py-2 border rounded"/>
            </div>
            <button onClick={run} disabled={running} className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded inline-flex items-center disabled:opacity-50"><Play className="h-4 w-4 mr-2"/>Run</button>
            <button onClick={reset} className="px-3 py-2 border rounded inline-flex items-center"><RotateCcw className="h-4 w-4 mr-2"/>Reset</button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="space-y-3">
                {items.map((it, idx)=>{
                  const frac = taking[it.id] ?? 0;
                  return (
                    <motion.div key={it.id} initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay: idx*0.05}} className="p-3 border rounded">
                      <div className="flex justify-between text-sm text-slate-700">
                        <span className="font-medium">Item {it.id}</span>
                        <span>v={it.value}, w={it.weight}, r={it.ratio}</span>
                      </div>
                      <div className="mt-2 h-3 bg-gray-100 rounded overflow-hidden">
                        <motion.div className="h-3 bg-amber-500" initial={{width: '0%'}} animate={{width: `${frac*100}%`}}/>
                      </div>
                      <div className="text-xs text-slate-500 mt-1 inline-flex items-center"><Percent className="h-3 w-3 mr-1"/>Taken: {(frac*100).toFixed(0)}%</div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            <div className="p-4 border rounded">
              <div className="text-sm text-slate-600 mb-2">Capacity usage</div>
              <div className="h-8 bg-gray-100 rounded overflow-hidden">
                <motion.div className="h-8 bg-amber-500" initial={{width:'0%'}} animate={{width: `${Math.min(100, (Object.entries(taking).reduce((a,[id,f])=> a + f* (items.find(x=>x.id===id)?.weight||0), 0)/capacity)*100 || 0)}%`}} />
              </div>
              <div className="text-xs text-slate-500 mt-1">Bars indicate fraction of each item added.</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Pseudocode</h2>
          <PseudocodeBlock code={pseudocode} autoPlay loop intervalMs={800}/>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Practice Problems</h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li><a className="text-amber-700 hover:underline" href="https://www.geeksforgeeks.org/fractional-knapsack-problem/" target="_blank">Fractional Knapsack (GFG)</a></li>
            <li><a className="text-amber-700 hover:underline" href="https://cp-algorithms.com/greedy/fractional-knapsack.html" target="_blank">CP-Algorithms: Fractional Knapsack</a></li>
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow p-6 mt-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Use Cases</h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li>Bandwidth allocation where partial usage is allowed.</li>
            <li>Cutting-stock and blending problems with fractional items.</li>
            <li>Greedy baseline for 0/1 knapsack (contrast case).</li>
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
            href="\algorithms\greedy\activity-selection"
            className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Activity Selection
          </Link>
          
          <Link
            href="/algorithms/greedy/huffman-coding"
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Next: Huffman Coding
            <SkipForward className="h-5 w-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

