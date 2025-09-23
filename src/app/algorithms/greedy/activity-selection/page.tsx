'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Play,ArrowUpDown,SkipForward, RotateCcw, Timer, CheckCircle2, XCircle } from 'lucide-react';
import PseudocodeBlock from '@/components/PseudocodeBlock';

type Interval = { id: string; start: number; end: number };

export default function ActivitySelectionPage() {
  const [speed, setSpeed] = useState(600);
  const [playing, setPlaying] = useState(false);
  const [step, setStep] = useState(0);
  const [chosen, setChosen] = useState<Set<string>>(new Set());
  const [skipped, setSkipped] = useState<Set<string>>(new Set());

  const EXAMPLES: Interval[][] = [
    [
      { id: 'A', start: 1, end: 3 },
      { id: 'B', start: 2, end: 5 },
      { id: 'C', start: 4, end: 7 },
      { id: 'D', start: 1, end: 8 },
      { id: 'E', start: 8, end: 10 },
    ],
    [
      { id: 'A', start: 0, end: 6 },
      { id: 'B', start: 3, end: 4 },
      { id: 'C', start: 1, end: 2 },
      { id: 'D', start: 5, end: 9 },
      { id: 'E', start: 5, end: 7 },
      { id: 'F', start: 8, end: 9 },
    ],
  ];

  const sortByEnd = (arr: Interval[]) => [...arr].sort((a,b)=> a.end - b.end);

  const randomIntervals = (n=5): Interval[] => {
    const arr: Interval[] = [];
    for (let i=0;i<n;i++){
      const s = Math.floor(Math.random()*9);
      const e = s + 1 + Math.floor(Math.random()* (10 - s));
      arr.push({ id: String.fromCharCode(65+i), start: s, end: Math.min(10, e) });
    }
    return sortByEnd(arr);
  };

  const [data, setData] = useState<Interval[]>(()=> sortByEnd(EXAMPLES[0]));

  const sleep = (ms:number)=> new Promise(res=>setTimeout(res, ms));

  const run = async () => {
    setPlaying(true);
    setStep(0); setChosen(new Set()); setSkipped(new Set());
    let lastEnd = -Infinity;
    for (let i=0;i<data.length;i++){
      setStep(i+1); await sleep(speed);
      if (data[i].start >= lastEnd){
        setChosen(prev => new Set(prev).add(data[i].id));
        lastEnd = data[i].end;
      } else {
        setSkipped(prev => new Set(prev).add(data[i].id));
      }
      await sleep(speed);
    }
    setPlaying(false);
  };

  const reset = () => { setPlaying(false); setStep(0); setChosen(new Set()); setSkipped(new Set()); setData(randomIntervals(Math.floor(Math.random()*2)+5)); };

  const randomize = () => { setData(randomIntervals(Math.floor(Math.random()*2)+5)); setChosen(new Set()); setSkipped(new Set()); setStep(0); };

  const pseudocode = `procedure ACTIVITY_SELECTION(intervals)
  sort intervals by increasing finish time
  lastFinish ← −∞
  chosen ← ∅
  for each interval (s, f) in intervals do
    if s ≥ lastFinish then
      add interval to chosen
      lastFinish ← f
    else
      skip interval
    end if
  end for
  return chosen
end procedure`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      <div className="container mx-auto px-4 py-12">
        <Link href="/algorithms/greedy" className="inline-flex items-center text-green-600 hover:text-green-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2"/>Back to Greedy</Link>
        <h1 className="text-4xl font-bold text-slate-800 mb-2">Activity Selection</h1>
        <p className="text-lg text-slate-600 mb-6">Pick the maximum number of non-overlapping activities by always choosing the earliest finishing compatible activity.</p>

        {/* Why Greedy Works */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-3">Why Greedy Works</h2>
          <p className="text-slate-600">Greedy Choice Property holds: picking the activity with the earliest finish time leaves the most room for the rest. Optimal Substructure: after choosing one activity, the remaining problem is the same on the filtered intervals.</p>
        </div>

        {/* Steps */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Algorithm Steps</h2>
          <ol className="list-decimal pl-6 space-y-2 text-slate-700">
            <li>Sort activities by increasing finish time.</li>
            <li>Initialize <code>lastFinish = -∞</code>.</li>
            <li>Scan in order; choose activity if start ≥ lastFinish, then update lastFinish.</li>
            <li>Otherwise, skip the activity.</li>
          </ol>
          <div className="mt-3 text-sm text-slate-600">See: Greedy Choice Property, Optimal Substructure on the Greedy overview page.</div>
        </div>

        {/* Interactive Animation */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-wrap items-end gap-3 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Speed (ms)</label>
              <input type="number" value={speed} onChange={e=>setSpeed(Math.max(100, parseInt(e.target.value)||0))} className="w-24 px-2 py-2 border rounded" />
            </div>
            <button onClick={run} disabled={playing} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded inline-flex items-center disabled:opacity-50"><Play className="h-4 w-4 mr-2"/>Run</button>
            <button onClick={reset} className="px-3 py-2 border rounded inline-flex items-center"><RotateCcw className="h-4 w-4 mr-2"/>Reset</button>
            <button onClick={randomize} className="px-3 py-2 border rounded">Randomize</button>
            <div className="ml-auto flex items-center gap-2 text-slate-600"><Timer className="h-4 w-4"/> Sorted by finish time</div>
          </div>

          <div className="relative overflow-hidden">
            <div className="h-48 w-full grid" style={{ gridTemplateRows: `repeat(${data.length}, minmax(0, 1fr))`, rowGap: '0.75rem' }}>
              {data.map((iv, idx)=>{
                const left = iv.start * 20; const width = (iv.end-iv.start) * 20;
                const isChosen = chosen.has(iv.id);
                const isSkipped = skipped.has(iv.id);
                return (
                  <motion.div key={iv.id} initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay: idx*0.05}} className="relative flex items-center">
                    <div className="w-10 text-right pr-2 text-sm text-slate-600">{iv.id}</div>
                    <div className="relative flex-1 h-6 bg-gray-100 rounded">
                      <motion.div className={`absolute h-6 rounded ${isChosen? 'bg-green-500' : isSkipped? 'bg-red-300' : 'bg-yellow-400'}`} style={{ left, width }} />
                    </div>
                    <div className="w-28 text-sm text-right pl-2">
                      {isChosen && <span className="inline-flex items-center text-green-700"><CheckCircle2 className="h-4 w-4 mr-1"/>Chosen</span>}
                      {isSkipped && <span className="inline-flex items-center text-red-700"><XCircle className="h-4 w-4 mr-1"/>Skipped</span>}
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <div className="mt-2 flex justify-between text-xs text-slate-500 px-12">
              <span>0</span><span>5</span><span>10</span>
            </div>
            <div className="mt-3 text-sm text-slate-600">
              Try examples:
              <button className="ml-2 text-green-700 underline" onClick={()=> setData(sortByEnd(EXAMPLES[0]))}>Example 1</button>
              <button className="ml-3 text-green-700 underline" onClick={()=> setData(sortByEnd(EXAMPLES[1]))}>Example 2</button>
            </div>
          </div>
        </div>

        {/* Code Snippet */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Pseudocode</h2>
          <PseudocodeBlock code={pseudocode} autoPlay loop intervalMs={800} />
        </div>

        {/* Practice Problems */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Practice Problems</h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li><a className="text-green-700 hover:underline" href="https://www.geeksforgeeks.org/activity-selection-problem-greedy-algo-1/" target="_blank">Activity Selection (GeeksforGeeks)</a></li>
            <li><a className="text-green-700 hover:underline" href="https://cp-algorithms.com/greedy/interval-scheduling.html" target="_blank">Interval Scheduling (CP-Algorithms)</a></li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mt-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Use Cases</h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-700">
            <li>Scheduling non-overlapping meetings/lectures in a single room.</li>
            <li>Ad slot selection and TV commercial scheduling.</li>
            <li>CPU interval scheduling for non-preemptive tasks.</li>
            <li>Choosing maximum compatible bookings/reservations.</li>
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
            href="/algorithms/greedy"
            className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Greedy
          </Link>
          
          <Link
            href="/algorithms/greedy/fractional-knapsack"
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Next: Fractional Knapsack
            <SkipForward className="h-5 w-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
