'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, SkipForward, RotateCcw } from 'lucide-react';
import PseudocodeBlock from '@/components/PseudocodeBlock';

export default function CoinChangeGreedyPage(){
  const [amount, setAmount] = useState(63);
  const [denoms, setDenoms] = useState<number[]>([25,10,5,1]);
  const [speed, setSpeed] = useState(600);
  const [take, setTake] = useState<Record<number, number>>({});
  const [remaining, setRemaining] = useState<number>(63);
  const [active, setActive] = useState<number|null>(null);
  const [running, setRunning] = useState(false);

  const sleep = (ms:number)=> new Promise(res=>setTimeout(res, ms));

  const run = async () => {
    setRunning(true); setTake({}); setRemaining(amount); setActive(null);
    let rem = amount;
    for (const d of [...denoms].sort((a,b)=>b-a)){
      setActive(d);
      const cnt = Math.floor(rem/d);
      if (cnt>0){ setTake(prev=>({...prev, [d]: cnt})); rem -= cnt*d; setRemaining(rem); }
      await sleep(speed);
    }
    setActive(null);
    setRunning(false);
  };

  const reset = () => { setTake({}); setRemaining(amount); setActive(null); };
  const randomize = () => { const base = [1,5,10,25,50]; const pick = base.slice(0, Math.floor(Math.random()*3)+3).sort((a,b)=>b-a); setDenoms(pick); setTake({}); setRemaining(amount); };

  const pseudocode = `procedure COIN_CHANGE_GREEDY(denoms, A)
  sort denoms in decreasing order
  for each coin d in denoms do
    take floor(A / d) coins of d
    A ← A mod d
  end for
end procedure`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50">
      <div className="container mx-auto px-4 py-12">
        <Link href="/algorithms/greedy" className="inline-flex items-center text-rose-600 hover:text-rose-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2"/>Back to Greedy</Link>
        <h1 className="text-4xl font-bold text-slate-800 mb-2">Coin Change (Greedy)</h1>
        <p className="text-lg text-slate-600 mb-6">Pick the largest denomination ≤ remaining amount. Greedy is optimal for canonical systems (like US coins) but can fail for arbitrary sets.</p>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-3">Algorithm Steps</h2>
          <ol className="list-decimal pl-6 space-y-2 text-slate-700">
            <li>Sort denominations descending.</li>
            <li>Take as many as possible of the current coin.</li>
            <li>Reduce remaining amount and continue.</li>
          </ol>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-wrap items-end gap-3 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Amount</label>
              <input type="number" value={amount} onChange={e=>setAmount(Math.max(0, parseInt(e.target.value)||0))} className="w-28 px-2 py-2 border rounded"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Speed (ms)</label>
              <input type="number" value={speed} onChange={e=>setSpeed(Math.max(100, parseInt(e.target.value)||0))} className="w-24 px-2 py-2 border rounded"/>
            </div>
            <button onClick={run} disabled={running} className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded inline-flex items-center disabled:opacity-50"><Play className="h-4 w-4 mr-2"/>Run</button>
            <button onClick={reset} className="px-3 py-2 border rounded inline-flex items-center"><RotateCcw className="h-4 w-4 mr-2"/>Reset</button>
            <button onClick={randomize} className="px-3 py-2 border rounded">Randomize Denoms</button>
          </div>
          <div className="flex gap-3 flex-wrap items-start">
            {denoms.sort((a,b)=>b-a).map((d)=>{
              const cnt = take[d]||0; const isActive = active===d;
              return (
                <motion.div key={d} initial={{opacity:0, y:6}} animate={{opacity:1, y:0}} className={`p-4 border rounded w-44 ${isActive? 'bg-rose-50 border-rose-300' : 'bg-gray-50'}`}>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-slate-700">Coin {d}</div>
                    <button className="text-xs underline" onClick={()=>{
                      const val = Math.max(1, d);
                      const next = denoms.filter(x=>x!==d);
                      setDenoms([...next, val].sort((a,b)=>b-a));
                    }}></button>
                  </div>
                  <div className="text-xs text-slate-500">Take: {cnt}</div>
                  <div className="mt-2 h-2 bg-gray-200 rounded overflow-hidden">
                    <motion.div className="h-2 bg-rose-500" initial={{width:'0%'}} animate={{width: `${Math.min(100, cnt*20)}%`}}/>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="mt-4 p-3 border rounded bg-white/70">
            <div className="text-sm text-slate-700">Remaining amount: <span className="font-semibold">{remaining}</span></div>
            <div className="mt-2 h-3 bg-gray-100 rounded overflow-hidden">
              <motion.div className="h-3 bg-emerald-500" initial={{width:'0%'}} animate={{width: `${amount===0?0:Math.max(0, Math.min(100, ((amount-remaining)/amount)*100))}%`}}/>
            </div>
            <div className="text-xs text-slate-500 mt-1">Progress towards paying the target amount.</div>
          </div>
          <div className="text-xs text-slate-600 mt-3">Note: For non-canonical sets (e.g., [1,3,4]), greedy may not produce optimal solutions. Try changing denominations to see counterexamples.</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Pseudocode</h2>
          <PseudocodeBlock code={pseudocode} autoPlay loop intervalMs={800}/>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Practice Problems</h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li><a className="text-rose-700 hover:underline" href="https://www.geeksforgeeks.org/greedy-algorithm-to-find-minimum-number-of-coins/" target="_blank">Minimum Coins (GFG)</a></li>
            <li><a className="text-rose-700 hover:underline" href="https://cp-algorithms.com/greedy/change.html" target="_blank">CP-Algorithms: Change Problem</a></li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mt-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Use Cases</h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li>Making change in canonical coin systems (cashiers, vending machines).</li>
            <li>Resource allocation where largest units are preferred.</li>
            <li>Greedy baselines for comparison against DP exact solutions.</li>
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
            href="\algorithms\greedy\job-scheduling"
            className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Job Scheduling
          </Link>
          
          <Link
            href="\algorithms\greedy\kruskal-mst"
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Next: Kruskal MST
            <SkipForward className="h-5 w-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
