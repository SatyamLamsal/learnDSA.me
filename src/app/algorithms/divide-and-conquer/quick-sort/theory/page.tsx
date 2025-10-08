'use client';
import Link from 'next/link';
import { getAlgorithm, getPrevNext } from '../../dcAlgorithms';
import { ArrowLeft, ArrowRight, Sigma, Layers, Shuffle as ShuffleIcon, Gauge, Shield, Zap, Binary as BinaryIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import PseudocodeBlock from '@/components/PseudocodeBlock';

const algo = getAlgorithm('quick-sort');
const { prev, next } = getPrevNext('quick-sort');

export default function QuickSortTheory(){
  return <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50 text-gray-700">
  <div className="container mx-auto px-4 py-10 max-w-7xl text-gray-700">
      <Link href="/algorithms/divide-and-conquer/quick-sort" className="inline-flex items-center text-amber-700 hover:text-amber-800 mb-8"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Overview</Link>
      <div className="grid gap-6 text-gray-700">
        {/* Hero */}
        <motion.div initial={{opacity:0,y:26}} animate={{opacity:1,y:0}} transition={{duration:0.55}} className="bg-white rounded-2xl shadow-sm p-8 text-gray-700">
          <h1 className="text-5xl font-bold tracking-tight text-slate-800 mb-4 flex items-center gap-3"><ShuffleIcon className="h-10 w-10 text-amber-600"/>{algo?.name} Theory</h1>
          <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">Quick Sort partitions the array in-place around a pivot establishing two subproblems separated by the pivot&apos;s final position. Average behavior yields O(n log n) work due to near-balanced splits in expectation; worst-case O(n^2) arises only with persistently extreme pivot placements.</p>
        </motion.div>

        {/* Recurrence & Partition Analysis */}
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:0.05,duration:0.5}} className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
          <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2"><Sigma className="h-5 w-5 text-amber-600"/> Recurrence & Partitioning</h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-slate-600">
            <div className="space-y-3 text-gray-700">
              <p><span className="font-semibold text-slate-700">General:</span> T(n) = T(k) + T(n-k-1) + O(n) where k is pivot final index shift.</p>
              <p><span className="font-semibold text-slate-700">Average / Random:</span> Expected k ≈ n/2 → T(n) ≈ 2T(n/2)+O(n) → O(n log n).</p>
              <p><span className="font-semibold text-slate-700">Worst:</span> k ∈ {'{'}0, n-1{'}'} repeatedly → T(n)=T(n-1)+O(n)=O(n^2).</p>
              <p><span className="font-semibold text-slate-700">Depth:</span> Balanced height ≈ log n; degenerate height n.</p>
            </div>
            <div className="grid gap-3 text-xs text-gray-600">
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-100 flex gap-2 text-gray-700"><Layers className="h-4 w-4 text-amber-600"/><span><b>Partition Scan:</b> Maintains boundary i of ≤ pivot region; scans j and swaps qualifying elements forward.</span></div>
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-100 flex gap-2 text-gray-700"><Gauge className="h-4 w-4 text-amber-600"/><span><b>Cost per Level:</b> Each level touches every element once → O(n) work per level.</span></div>
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-100 flex gap-2 text-gray-700"><Zap className="h-4 w-4 text-amber-600"/><span><b>Randomization:</b> Probability of ≥90% skew repeatedly shrinks exponentially.</span></div>
            </div>
          </div>
        </motion.div>

        {/* Pseudocode */}
        <motion.div initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{delay:0.1,duration:0.5}} className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
          <h2 className="text-xl font-semibold text-slate-800 mb-3 flex items-center gap-2"><BinaryIcon className="h-5 w-5 text-amber-600"/> Pseudocode</h2>
          <PseudocodeBlock code={(algo?.pseudocode||[]).join('\n')} />
        </motion.div>

        {/* Complexity & Properties */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.15,duration:0.5}} className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
          <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2"><Gauge className="h-5 w-5 text-amber-600"/> Complexity & Properties</h2>
          <div className="grid md:grid-cols-3 gap-4 text-xs text-gray-600">
            <Property label="Best" value="O(n log n)" />
            <Property label="Average" value="O(n log n)" />
            <Property label="Worst" value="O(n^2)" />
            <Property label="Space" value="O(log n) expected" />
            <Property label="In-Place" value="Yes (stack aside)" />
            <Property label="Stable" value="No" />
          </div>
          <ul className="list-disc pl-6 text-sm text-slate-600 space-y-1 mt-4">
            <li>Cache friendly sequential partition sweeps.</li>
            <li>Tail call elimination reduces stack usage on one side.</li>
            <li>Introspective hybrids cap worst-case by switching when depth &gt; 2 log n.</li>
          </ul>
        </motion.div>

        {/* Notes & Navigation */}
        <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:0.2,duration:0.5}} className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
          <h2 className="text-xl font-semibold text-slate-800 mb-3 flex items-center gap-2"><Shield className="h-5 w-5 text-amber-600"/> Practical Notes</h2>
          <ul className="list-disc pl-6 text-sm text-slate-600 space-y-1 mb-4">
            <li>Median-of-three reduces vulnerability to presorted inputs.</li>
            <li>Three-way partitioning improves duplicate-heavy datasets.</li>
            <li>Switching to insertion sort for small segments lowers constant factors.</li>
          </ul>
        </motion.div>

        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.25,duration:0.5}} className="flex justify-between items-center text-gray-700">
          {prev? <Link href={`/algorithms/divide-and-conquer/${prev.slug}/theory`} className="inline-flex items-center px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"><ArrowLeft className="h-4 w-4 mr-2 text-gray-700"/>{prev.name}</Link>: <span/>}
          <Link href="/algorithms/divide-and-conquer/quick-sort/simulation" className="px-6 py-2 rounded bg-amber-600 text-white hover:bg-amber-700 text-sm font-semibold text-gray-300">Run Simulation</Link>
          {next? <Link href={`/algorithms/divide-and-conquer/${next.slug}/theory`} className="inline-flex items-center px-4 py-2 rounded bg-amber-600 text-white hover:bg-amber-700 text-gray-100">{next.name}<ArrowRight className="h-4 w-4 ml-2 text-gray-700"/></Link>: <span/>}
        </motion.div>
      </div>
    </div>
  </div>;
}

function Property({label,value}:{label:string;value:string}){
  return <div className="p-3 rounded-lg bg-amber-50 border border-amber-100 text-gray-700">
    <div className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider">{label}</div>
    <div className="mt-1 font-mono text-gray-700">{value}</div>
  </div>;
}
