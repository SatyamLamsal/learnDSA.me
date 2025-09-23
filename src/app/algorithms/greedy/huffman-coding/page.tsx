'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, SkipForward, RotateCcw, Binary } from 'lucide-react';
import PseudocodeBlock from '@/components/PseudocodeBlock';

type Node = { id: string; freq: number; left?: Node; right?: Node };

export default function HuffmanCodingPage(){
  const [speed, setSpeed] = useState(700);
  const [symbols, setSymbols] = useState<Node[]>([ {id:'A',freq:5},{id:'B',freq:9},{id:'C',freq:12},{id:'D',freq:13},{id:'E',freq:16},{id:'F',freq:45} ]);
  const [steps, setSteps] = useState<Node[][]>([]);
  const [running, setRunning] = useState(false);
  const queue = useMemo(()=> [...symbols].sort((a,b)=>a.freq-b.freq), [symbols]);

  const sleep = (ms:number)=> new Promise(res=>setTimeout(res, ms));

  const run = async () => {
    setRunning(true); setSteps([]);
    let q = [...queue];
    while (q.length>1){
      q.sort((a,b)=>a.freq-b.freq);
      const a = q.shift()!; const b = q.shift()!;
      const parent: Node = { id: `${a.id}${b.id}`, freq: a.freq + b.freq, left: a, right: b };
  q.push(parent);
  setSteps(prev=>[...prev, [...q].sort((x,y)=>x.freq-y.freq)]);
      await sleep(speed);
    }
    setRunning(false);
  };
  const randomize = () => {
    const n = Math.floor(Math.random()*3)+5; // 5-7 symbols
    const syms: Node[] = Array.from({length:n}, (_,i)=>({ id: String.fromCharCode(65+i), freq: Math.floor(Math.random()*40)+5 }));
    setSymbols(syms);
  };
  const reset = () => { setSteps([]); randomize(); };

  const pseudocode = `procedure HUFFMAN(freqs)
  create min-heap Q from freqs
  while |Q| > 1 do
    x ← extract-min(Q)
    y ← extract-min(Q)
    z ← new node with freq = x.freq + y.freq
    z.left ← x; z.right ← y
    insert(Q, z)
  end while
  return extract-min(Q) // root of tree
end procedure`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-fuchsia-50">
      <div className="container mx-auto px-4 py-12">
        <Link href="/algorithms/greedy" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2"/>Back to Greedy</Link>
        <h1 className="text-4xl font-bold text-slate-800 mb-2">Huffman Coding</h1>
        <p className="text-lg text-slate-600 mb-6">Build an optimal prefix-free binary code by repeatedly merging the two least frequent symbols. Greedy is optimal via the greedy choice and optimal substructure.</p>

  <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-3">Algorithm Steps</h2>
          <ol className="list-decimal pl-6 space-y-2 text-slate-700">
            <li>Initialize a min-heap with character frequencies.</li>
            <li>Extract two smallest, merge into a new node.</li>
            <li>Insert merged node back, repeat until one node left.</li>
            <li>Assign 0/1 along left/right edges to get codes.</li>
          </ol>
        </div>

  <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-wrap items-end gap-3 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Speed (ms)</label>
              <input type="number" value={speed} onChange={e=>setSpeed(Math.max(100, parseInt(e.target.value)||0))} className="w-24 px-2 py-2 border rounded"/>
            </div>
            <button onClick={run} disabled={running} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded inline-flex items-center disabled:opacity-50"><Play className="h-4 w-4 mr-2"/>Run</button>
            <button onClick={reset} className="px-3 py-2 border rounded inline-flex items-center"><RotateCcw className="h-4 w-4 mr-2"/>Reset (New Example)</button>
            <button onClick={randomize} className="px-3 py-2 border rounded">Randomize Symbols</button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-slate-700 mb-2">Symbols (editable)</h3>
              <div className="space-y-2 mb-4">
                {symbols.map((s, i)=> (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <input value={s.id} onChange={e=>{
                      const v = e.target.value.slice(0,1).toUpperCase();
                      setSymbols(prev=> prev.map((x,idx)=> idx===i? {...x, id: v||x.id} : x));
                    }} className="w-14 px-2 py-1 border rounded"/>
                    <input type="number" value={s.freq} onChange={e=>{
                      const num = Math.max(1, parseInt(e.target.value)||1);
                      setSymbols(prev=> prev.map((x,idx)=> idx===i? {...x, freq: num} : x));
                    }} className="w-24 px-2 py-1 border rounded"/>
                    <button className="text-xs px-2 py-1 border rounded" onClick={()=> setSymbols(prev=> prev.filter((_,idx)=> idx!==i))}>Remove</button>
                  </div>
                ))}
                <button className="text-xs px-2 py-1 border rounded" onClick={()=> setSymbols(prev=> [...prev, { id: String.fromCharCode(65+(prev.length%26)), freq: Math.floor(Math.random()*40)+5 }])}>Add Symbol</button>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 mb-2">Min-Heap Levels</h3>
              <div className="space-y-3 min-h-[4rem]">
                {steps.length===0 && (
                  <div className="text-sm text-slate-600">Press Run to start merging smallest frequencies.</div>
                )}
                {steps.map((q, idx)=> (
                  <div key={idx} className="p-3 border rounded">
                    <div className="text-xs text-slate-500 mb-2">After merge {idx+1}</div>
                    <div className="flex gap-2 flex-wrap">
                      {q.map((n, i)=> (
                        <motion.div key={i} initial={{opacity:0, y:6}} animate={{opacity:1, y:0}} className="px-3 py-2 rounded bg-purple-100 text-purple-800 text-sm">
                          {n.id}:{n.freq}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Pseudocode</h2>
          <PseudocodeBlock code={pseudocode} autoPlay loop intervalMs={850}/>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Practice Problems</h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li><a className="text-purple-700 hover:underline" href="https://www.geeksforgeeks.org/huffman-coding-greedy-algo-3/" target="_blank">Huffman Coding (GFG)</a></li>
            <li><a className="text-purple-700 hover:underline" href="https://leetcode.com/problems/sort-characters-by-frequency/" target="_blank">LeetCode 451: Sort Characters by Frequency</a></li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mt-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Use Cases</h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li>Lossless compression (ZIP, GZIP, DEFLATE stages).</li>
            <li>Compression in image formats (e.g., JPEG entropy coding).</li>
            <li>Efficient prefix-free encoding in compilers and data transfer.</li>
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
            href="\algorithms\greedy\fractional-knapsack"
            className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Fractional Knapsack
          </Link>
          
          <Link
            href="\algorithms\greedy\job-scheduling"
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Next: Job Scheduling
            <SkipForward className="h-5 w-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
