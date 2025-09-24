"use client";
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Coins } from 'lucide-react';

interface Step { amount:number; val:number; }

export default function CoinChangeSimulationPage(){
  const [coinsInput, setCoinsInput] = useState('1,2,5');
  const [amount, setAmount] = useState(11);
  const [running, setRunning] = useState(false);
  const [steps, setSteps] = useState<Step[]>([]);
  const [result, setResult] = useState<number|null>(null);

  const sleep = (ms:number)=> new Promise(r=>setTimeout(r,ms));

  const run = async ()=>{
    const coins = coinsInput.split(',').map(s=> parseInt(s.trim())).filter(n=>!isNaN(n) && n>0).slice(0,8);
    if (coins.length===0) return;
    setRunning(true); setSteps([]); setResult(null);
    const INF = Infinity;
    const dp:number[] = Array(amount+1).fill(INF); dp[0]=0;
    const local:Step[] = [{amount:0,val:0}];
    for (let a=1;a<=amount;a++){
      for (const c of coins){
        if (c <= a && dp[a-c] + 1 < dp[a]){ dp[a] = dp[a-c] + 1; }
      }
      local.push({amount:a,val:dp[a]===INF? -1: dp[a]});
      if (a<=220){ setSteps([...local]); await sleep(70);} // animate moderate sizes
    }
    setSteps([...local]); setResult(dp[amount]===INF? -1: dp[amount]);
    setRunning(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="mb-8">
          <Link href="/algorithms/dynamic-programming/coin-change" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2"/>Back to Overview</Link>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Coin Change Simulation</h1>
          <p className="text-slate-600 max-w-3xl">Bottom-up construction of minimum coins needed for each amount. Impossible positions shown as -1 until resolved.</p>
        </motion.div>
        <div className="bg-white rounded-lg shadow p-6 mb-10">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center"><Coins className="h-5 w-5 mr-2 text-orange-600"/>Min Coins DP</h3>
          <div className="flex flex-wrap gap-4 mb-4 items-end">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Coins</label>
              <input value={coinsInput} onChange={e=> setCoinsInput(e.target.value)} className="px-2 py-1 border rounded" disabled={running}/>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Amount</label>
              <input type="number" value={amount} onChange={e=> setAmount(Math.min(300, Math.max(1, parseInt(e.target.value)||1)))} className="px-2 py-1 border rounded w-24" disabled={running}/>
            </div>
            <button onClick={run} disabled={running} className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded disabled:opacity-50">{running? 'Running…' : 'Run'}</button>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px] mb-4">
            {steps.map(s=> <div key={s.amount} className={`px-2 py-1 rounded border ${s.val===-1? 'bg-white text-slate-400':'bg-orange-100 text-orange-700'}`}>{s.amount}:{s.val}</div>)}
          </div>
          {result!==null && <div className="text-sm text-slate-700">Result for {amount}: {result===-1? <span className="text-red-600 font-semibold">Impossible</span> : <span className="text-orange-600 font-semibold">{result} coin(s)</span>}</div>}
        </div>
      </div>
    </div>
  );
}

