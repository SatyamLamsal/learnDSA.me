'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, Cpu, BookOpen, Eye } from 'lucide-react';
import { useState } from 'react';

const FibonacciSearchViz = () => {
  const [array, setArray] = useState(Array.from({ length: 20 }, (_, i) => i * 3 + (i % 3)));
  const [target, setTarget] = useState(27);
  const [i, setI] = useState(-1); // fib index position
  const [offset, setOffset] = useState(-1);
  const [idx, setIdx] = useState(-1);
  const [found, setFound] = useState(-1);
  const [steps, setSteps] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);

  const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

  const reset = () => {
    setI(-1); setOffset(-1); setIdx(-1); setFound(-1); setSteps([]); setSearching(false);
  };

  const fibonacciSearch = async () => {
    reset(); setSearching(true);
    // Generate smallest Fibonacci number >= n
    const n = array.length;
    let fibMm2 = 0; // (m-2)'th Fibonacci No.
    let fibMm1 = 1; // (m-1)'th Fibonacci No.
    let fibM = fibMm2 + fibMm1; // m'th Fibonacci

    const local: any[] = [];
    while (fibM < n) { fibMm2 = fibMm1; fibMm1 = fibM; fibM = fibMm2 + fibMm1; }

    let off = -1;
    setOffset(off);

    while (fibM > 1) {
      const i = Math.min(off + fibMm2, n - 1);
      setIdx(i);
      local.push({ fibM, fibMm1, fibMm2, off, i, val: array[i], action: `Compare arr[${i}]=${array[i]} with ${target}` });
      setSteps([...local]);
      await sleep(700);

      if (array[i] < target) {
        fibM = fibMm1; fibMm1 = fibMm2; fibMm2 = fibM - fibMm1; off = i;
        local.push({ action: 'Move right', off });
      } else if (array[i] > target) {
        fibM = fibMm2; fibMm1 = fibMm1 - fibMm2; fibMm2 = fibM - fibMm1;
        local.push({ action: 'Move left' });
      } else {
        setFound(i); setSearching(false); return;
      }
      setOffset(off); setSteps([...local]);
      await sleep(500);
    }

    // compare the last element
    if (fibMm1 && array[off + 1] === target) {
      setFound(off + 1);
    }
    setSearching(false);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="flex flex-wrap gap-3 items-end mb-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Target</label>
          <input type="number" value={target} onChange={e=>setTarget(parseInt(e.target.value)||0)} className="w-24 px-2 py-1 border rounded" />
        </div>
        <button onClick={fibonacciSearch} disabled={searching} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded disabled:opacity-50">{searching ? 'Searching...' : 'Start Search'}</button>
        <button onClick={reset} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">Reset</button>
      </div>

      <div className="flex flex-wrap justify-center gap-1 mb-2">
        {array.map((v, index) => (
          <div key={index} className={`w-10 h-10 border-2 rounded flex items-center justify-center text-xs font-bold ${
            index === found ? 'bg-green-500 text-white border-green-700' : index === idx ? 'bg-indigo-500 text-white border-indigo-700' : 'border-gray-200 text-gray-700'
          }`}>
            {v}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-1 text-[10px] text-gray-500">
        {array.map((_, index) => (<div key={index} className="w-10 text-center">[{index}]</div>))}
      </div>

      {steps.length>0 && (
        <div className="bg-gray-50 rounded p-3 mt-4 max-h-44 overflow-auto text-sm">
          <h4 className="font-semibold text-slate-800 mb-2">Steps</h4>
          {steps.map((s, i)=>(
            <div key={i} className="text-gray-700">• {s.action}</div>
          ))}
        </div>
      )}

      <div className="mt-4 text-center">
        {found !== -1 ? (
          <div className="bg-green-100 text-green-800 border border-green-400 rounded px-4 py-2">Found at index {found}</div>
        ) : !searching && steps.length>0 ? (
          <div className="bg-red-100 text-red-800 border border-red-400 rounded px-4 py-2">Not found</div>
        ) : null}
      </div>
    </div>
  );
};

export default function FibonacciSearchPage(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8}} className="mb-8">
          <Link href="/algorithms/searching" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2"/>Back to Searching Algorithms</Link>
          <h1 className="text-5xl font-bold text-slate-800 mb-3"><span className="text-indigo-600">Fibonacci Search</span> Algorithm</h1>
          <p className="text-lg text-slate-600 max-w-3xl">Fibonacci Search uses Fibonacci numbers to split the array, avoiding division. It performs O(log n) comparisons and is comparable to binary search on random-access arrays.</p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-lg p-6 shadow text-center"><Clock className="h-10 w-10 text-indigo-600 mx-auto mb-2"/><div className="font-semibold text-slate-800">Time</div><div className="text-2xl font-bold text-indigo-600">O(log n)</div></div>
          <div className="bg-white rounded-lg p-6 shadow text-center"><Cpu className="h-10 w-10 text-blue-600 mx-auto mb-2"/><div className="font-semibold text-slate-800">Space</div><div className="text-2xl font-bold text-blue-600">O(1)</div></div>
          <div className="bg-white rounded-lg p-6 shadow text-center"><Eye className="h-10 w-10 text-purple-600 mx-auto mb-2"/><div className="font-semibold text-slate-800">Divisions</div><div className="text-2xl font-bold text-purple-600">None</div></div>
          <div className="bg-white rounded-lg p-6 shadow text-center"><BookOpen className="h-10 w-10 text-emerald-600 mx-auto mb-2"/><div className="font-semibold text-slate-800">Prereq</div><div className="text-2xl font-bold text-emerald-600">Sorted</div></div>
        </div>

        <FibonacciSearchViz />

        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8, delay:0.2}} className="flex justify-between items-center mt-10">
          <Link href="/algorithms/searching/ternary-search" className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"><ArrowLeft className="h-5 w-5 mr-2"/>Previous: Ternary Search</Link>
          <Link href="/algorithms/searching/hash-search" className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">Next: Hash Table Search<ArrowRight className="h-5 w-5 ml-2"/></Link>
        </motion.div>
      </div>
    </div>
  );
}
