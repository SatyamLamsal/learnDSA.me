'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Settings2 } from 'lucide-react';

function useArray(size: number) {
  const [arr, setArr] = useState<number[]>(() => Array.from({ length: size }, () => Math.floor(Math.random()*100)));
  const shuffle = () => setArr(prev => [...prev].sort(() => Math.random() - 0.5));
  const randomize = () => setArr(Array.from({ length: size }, () => Math.floor(Math.random()*100)));
  const sortAsc = () => setArr(prev => [...prev].sort((a,b)=>a-b));
  return { arr, setArr, shuffle, randomize, sortAsc };
}

export default function SearchingVisualizerPage(){
  const { arr, randomize, shuffle, sortAsc } = useArray(24);
  const [target, setTarget] = useState<number>(50);
  const [mode, setMode] = useState<'linear'|'binary'>('linear');
  const [idx, setIdx] = useState(-1);
  const [range, setRange] = useState<[number, number] | null>(null);
  const [running, setRunning] = useState(false);

  const sleep = (ms: number) => new Promise(res=>setTimeout(res, ms));

  const run = async () => {
    setRunning(true); setIdx(-1); setRange(null);
    if (mode==='linear'){
      for (let i=0;i<arr.length;i++){
        setIdx(i); await sleep(200);
        if (arr[i]===target) { setRunning(false); return; }
      }
    } else {
      let l=0, r=arr.length-1; setRange([l,r]); await sleep(200);
      while(l<=r){
        const m = Math.floor((l+r)/2); setIdx(m); await sleep(300);
        if (arr[m]===target){ setRunning(false); return; }
        if (arr[m]<target) l=m+1; else r=m-1; setRange([l,r]); await sleep(200);
      }
    }
    setRunning(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <Link href="/algorithms/searching" className="inline-flex items-center text-green-600 hover:text-green-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2"/>Back to Searching Algorithms</Link>
        <h1 className="text-4xl font-bold text-slate-800 mb-4">Searching Visualizer</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-wrap gap-3 items-end">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Target</label>
              <input type="number" value={target} onChange={e=>setTarget(parseInt(e.target.value)||0)} className="w-28 px-2 py-1 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Mode</label>
              <select value={mode} onChange={e=>setMode(e.target.value as 'linear' | 'binary')} className="px-2 py-1 border rounded">
                <option value="linear">Linear</option>
                <option value="binary">Binary (requires sorted)</option>
              </select>
            </div>
            <button onClick={run} disabled={running} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded inline-flex items-center disabled:opacity-50"><Play className="h-4 w-4 mr-2"/>Run</button>
            <div className="ml-auto flex gap-2">
              <button onClick={randomize} className="px-3 py-2 border rounded inline-flex items-center"><Settings2 className="h-4 w-4 mr-2"/>Randomize</button>
              <button onClick={shuffle} className="px-3 py-2 border rounded">Shuffle</button>
              <button onClick={sortAsc} className="px-3 py-2 border rounded">Sort</button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-wrap gap-1 justify-center mb-2">
            {arr.map((v,i)=>{
              const inRange = range && i>=range[0] && i<=range[1];
              const isMid = i===idx && mode==='binary';
              const isCurr = i===idx && mode==='linear';
              return (
                <motion.div key={i} initial={{scale:1}} animate={{
                  scale: isMid?1.12:isCurr?1.08:inRange?1.03:1,
                  backgroundColor: isMid? '#3b82f6' : isCurr? '#22c55e' : inRange? '#f3f4f6' : '#fff'
                }} className={`w-10 h-10 border-2 rounded flex items-center justify-center text-xs font-bold ${isMid? 'text-white border-blue-700' : isCurr? 'text-white border-emerald-700' : 'text-gray-700 border-gray-200'}`}>{v}</motion.div>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-1 justify-center text-[10px] text-gray-500">
            {arr.map((_,i)=>(<div key={i} className="w-10 text-center">[{i}]</div>))}
          </div>
        </div>
      </div>
    </div>
  );
}
