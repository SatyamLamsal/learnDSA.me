"use client";
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Settings2 } from 'lucide-react';

function useBars(count: number){
  const [bars, setBars] = useState<number[]>(() => Array.from({length: count}, () => Math.floor(Math.random()*95)+5));
  const randomize = () => setBars(Array.from({length: count}, () => Math.floor(Math.random()*95)+5));
  const shuffle = () => setBars(prev => [...prev].sort(()=>Math.random()-0.5));
  const sortAsc = () => setBars(prev => [...prev].sort((a,b)=>a-b));
  return { bars, setBars, randomize, shuffle, sortAsc };
}

export default function SortingVisualizerPage(){
  const { bars, setBars, randomize, shuffle, sortAsc } = useBars(40);
  const [algo, setAlgo] = useState<'bubble'|'selection'|'insertion'>('bubble');
  const [speed, setSpeed] = useState(30);
  const [running, setRunning] = useState(false);
  const [highlight, setHighlight] = useState<{i:number, j:number} | null>(null);

  const sleep = (ms:number)=> new Promise(res=>setTimeout(res, ms));

  const run = async () => {
    setRunning(true);
    const arr = [...bars];
    const n = arr.length;

    if (algo==='bubble'){
      for (let i=0;i<n-1;i++){
        for (let j=0;j<n-i-1;j++){
          setHighlight({i:j, j:j+1}); await sleep(speed);
          if (arr[j] > arr[j+1]){
            [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
            setBars([...arr]);
            await sleep(speed);
          }
        }
      }
    } else if (algo==='selection'){
      for (let i=0;i<n;i++){
        let min = i;
        for (let j=i+1;j<n;j++){
          setHighlight({i:min, j}); await sleep(speed);
          if (arr[j] < arr[min]) min = j;
        }
        if (min!==i){ [arr[i], arr[min]] = [arr[min], arr[i]]; setBars([...arr]); await sleep(speed); }
      }
    } else if (algo==='insertion'){
      for (let i=1;i<n;i++){
        const key = arr[i]; let j = i-1;
        while (j>=0 && arr[j] > key){ setHighlight({i:j, j:j+1}); await sleep(speed); arr[j+1] = arr[j]; j--; setBars([...arr]); }
        arr[j+1] = key; setBars([...arr]); await sleep(speed);
      }
    }

    setHighlight(null); setRunning(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-50 text-gray-700">
      <div className="container mx-auto px-4 py-12 text-gray-700">
        <Link href="/algorithms/sorting" className="inline-flex items-center text-violet-600 hover:text-violet-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Back to Sorting</Link>
        <h1 className="text-4xl font-bold text-slate-800 mb-4">Sorting Visualizer</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6 text-gray-700">
          <div className="flex flex-wrap items-end gap-3 text-gray-700">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Algorithm</label>
              <select value={algo} onChange={e=>setAlgo(e.target.value as 'bubble' | 'selection' | 'insertion')} className="px-3 py-2 border rounded">
                <option value="bubble">Bubble Sort</option>
                <option value="selection">Selection Sort</option>
                <option value="insertion">Insertion Sort</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Speed (ms)</label>
              <input type="number" value={speed} onChange={e=>setSpeed(Math.max(0, parseInt(e.target.value)||0))} className="w-24 px-2 py-2 border rounded" />
            </div>
            <button onClick={run} disabled={running} className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded inline-flex items-center disabled:opacity-50 text-white text-white text-white text-white"><Play className="h-4 w-4 mr-2 text-gray-700"/>Run</button>
            <div className="ml-auto flex gap-2 text-gray-700">
              <button onClick={randomize} className="px-3 py-2 border rounded inline-flex items-center text-gray-800"><Settings2 className="h-4 w-4 mr-2 text-gray-700"/>Randomize</button>
              <button onClick={shuffle} className="px-3 py-2 border rounded text-gray-800">Shuffle</button>
              <button onClick={sortAsc} className="px-3 py-2 border rounded text-gray-800">Sort</button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 text-gray-700">
          <div className="h-64 flex items-end justify-center gap-1 text-gray-700">
            {bars.map((v, idx)=>{
              const active = highlight && (idx===highlight.i || idx===highlight.j);
              return (
                <motion.div key={idx} initial={{height: v+'%'}} animate={{height: v+'%'}} className={`w-4 rounded-t ${active? 'bg-violet-500' : 'bg-slate-400'}`}></motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

