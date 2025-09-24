'use client';
import Link from 'next/link';
import { getAlgorithm, getPrevNext } from '../dcAlgorithms';
import { ArrowLeft, ArrowRight, Shuffle as ShuffleIcon, Activity, Binary as BinaryIcon, Sigma, Shield, Info, Layers, Gauge, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const algo = getAlgorithm('quick-sort');
const { prev, next } = getPrevNext('quick-sort');

export default function QuickSortOverview(){
  return <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50">
  <div className="container mx-auto px-4 py-10 max-w-7xl">
      <Link href="/algorithms/divide-and-conquer" className="inline-flex items-center text-amber-700 hover:text-amber-800 mb-8"><ArrowLeft className="h-5 w-5 mr-2"/>All Divide & Conquer</Link>

      <div className="grid gap-6">
        {/* Hero */}
        <motion.div initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{duration:0.55}} className="bg-white rounded-2xl shadow-sm p-8">
          <h1 className="text-5xl font-bold tracking-tight text-slate-800 mb-4 flex items-center gap-3"><ShuffleIcon className="h-10 w-10 text-amber-600"/>{algo?.name}</h1>
          <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">In-place partition-based divide & conquer sorting algorithm. Average case O(n log n) with tiny constants, dominating practical workloads. Worst-case O(n^2) occurs only under systematically bad pivot choices. Randomization or median-of-three heuristics make such degeneracy extremely unlikely.</p>
        </motion.div>

        {/* Metrics */}
        <motion.div initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{delay:0.05,duration:0.5}} className="grid sm:grid-cols-3 gap-4">
          <StatCard label="Average" value="O(n log n)" accent="bg-amber-50" />
          <StatCard label="Worst" value="O(n^2)" accent="bg-amber-50" />
          <StatCard label="Space" value="O(log n) stack" accent="bg-amber-50" />
        </motion.div>

        {/* Mechanics */}
        <motion.div initial={{opacity:0,y:26}} animate={{opacity:1,y:0}} transition={{delay:0.1,duration:0.5}} className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-3 flex items-center gap-2"><Activity className="h-5 w-5 text-amber-600"/> Mechanics</h2>
          <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-600">
            <li>Select a pivot element.</li>
            <li>Partition elements: values &lt;= pivot before, larger after.</li>
            <li>Pivot lands in final position.</li>
            <li>Recurse on left/right segments.</li>
          </ol>
        </motion.div>

        {/* Partition Behavior */}
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:0.15,duration:0.5}} className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-3 flex items-center gap-2"><Layers className="h-5 w-5 text-amber-600"/> Partition Behavior</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">Partition scanning walks the segment once, expanding a prefix of elements less than or equal to the pivot. Each qualifying element is swapped into the growing prefix. Finally the pivot is swapped into the boundary slot producing two subproblems with the pivot fixed.</p>
          <div className="grid sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-100"><span className="font-semibold text-amber-700">Balanced split:</span> ~n/2 | ~n/2 → height ≈ log n</div>
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-100"><span className="font-semibold text-amber-700">Skewed split:</span> 1 | n-1 → height n</div>
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-100"><span className="font-semibold text-amber-700">Random pivot:</span> Skew probability decays exponentially</div>
          </div>
        </motion.div>

        {/* Recurrence & Guarantees */}
        <motion.div initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{delay:0.2,duration:0.5}} className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2"><Sigma className="h-5 w-5 text-amber-600"/> Recurrence & Guarantees</h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-slate-600">
            <div>
              <p className="mb-2"><span className="font-semibold text-slate-700">Average / Randomized:</span> T(n) ≈ 2T(n/2) + O(n) → O(n log n).</p>
              <p className="mb-2"><span className="font-semibold text-slate-700">Worst:</span> T(n) = T(n-1) + O(n) → O(n^2) (pathological pivot chain).</p>
              <p className="mb-0"><span className="font-semibold text-slate-700">Tail recursion:</span> last call often optimized / manually looped to reduce stack.</p>
            </div>
            <div className="space-y-2 text-xs leading-relaxed">
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-100 flex gap-2"><Shield className="h-4 w-4 text-amber-600"/><span><b>Stability:</b> Not stable by default (partition swaps disrupt equal element order).</span></div>
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-100 flex gap-2"><Gauge className="h-4 w-4 text-amber-600"/><span><b>Practical Speed:</b> Sequential linear scans & in-place operations yield excellent cache utilization.</span></div>
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-100 flex gap-2"><Zap className="h-4 w-4 text-amber-600"/><span><b>Heuristics:</b> Median-of-three, ninther, or random pivot reduce variance.</span></div>
            </div>
          </div>
        </motion.div>

        {/* Performance Notes */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.25,duration:0.5}} className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-3 flex items-center gap-2"><Info className="h-5 w-5 text-amber-600"/> Performance Notes</h2>
          <ul className="list-disc pl-6 text-sm text-slate-600 space-y-1 mb-2">
            <li>Switch to insertion sort for tiny (≤16) segments to cut overhead.</li>
            <li>Randomization converts adversarial inputs into typical performance.</li>
            <li>Three-way partitioning (Dutch flag) handles duplicates efficiently.</li>
            <li>Introsort monitors depth & falls back to Heap Sort if degeneration approaches.</li>
          </ul>
        </motion.div>

        {/* Actions */}
        <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:0.3,duration:0.5}} className="bg-white rounded-2xl shadow-sm p-6 flex flex-wrap gap-4">
          <Link href="/algorithms/divide-and-conquer/quick-sort/theory" className="px-6 py-2 rounded bg-amber-600 text-white hover:bg-amber-700 text-sm font-semibold">View Theory</Link>
          <Link href="/algorithms/divide-and-conquer/quick-sort/simulation" className="px-6 py-2 rounded bg-slate-200 text-slate-700 hover:bg-slate-300 text-sm font-semibold">Run Simulation</Link>
        </motion.div>

        {/* Navigation */}
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.35,duration:0.5}} className="flex justify-between items-center">
          {prev? <Link href={`/algorithms/divide-and-conquer/${prev.slug}`} className="inline-flex items-center px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"><ArrowLeft className="h-4 w-4 mr-2"/>{prev.name}</Link>: <span/>}
          {next? <Link href={`/algorithms/divide-and-conquer/${next.slug}`} className="inline-flex items-center px-4 py-2 rounded bg-amber-600 text-white hover:bg-amber-700">{next.name}<ArrowRight className="h-4 w-4 ml-2"/></Link>: <span/>}
        </motion.div>
      </div>
    </div>
  </div>;
}

function StatCard({label,value,accent}:{label:string;value:string;accent?:string}){
  return <div className={`${accent||'bg-amber-50'} border border-amber-100 rounded-2xl p-4`}>
    <div className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider">{label}</div>
    <div className="text-sm font-mono mt-1">{value}</div>
  </div>;
}
