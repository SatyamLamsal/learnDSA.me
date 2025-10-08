'use client';
import Link from 'next/link';
import { getAlgorithm, getPrevNext } from '../../dcAlgorithms';
import { ArrowLeft, ArrowRight, Layers, Target, Sigma, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import PseudocodeBlock from '@/components/PseudocodeBlock';

const algo = getAlgorithm('merge-sort');
const { prev, next } = getPrevNext('merge-sort');

export default function MergeSortTheory(){
  return <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 text-white">
  <div className="container mx-auto px-4 py-16 max-w-7xl text-gray-700">
      {/* Hero */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55}} className="mb-14 text-gray-700">
        <Link href="/algorithms/divide-and-conquer/merge-sort" className="inline-flex items-center text-sky-600 hover:text-sky-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Overview</Link>
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-800 mb-5">Merge Sort Theory</h1>
        <p className="text-lg text-slate-600 max-w-4xl leading-relaxed">Recursive halving builds a perfectly balanced recursion tree; linear merges at each level aggregate into the classic deterministic O(n log n) bound while preserving stability.</p>
      </motion.div>

      {/* Recurrence & Work */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.05}} className="grid lg:grid-cols-2 gap-10 mb-16 text-gray-700">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-gray-700">
          <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center"><Sigma className="h-6 w-6 mr-3 text-sky-600"/>Recurrence</h2>
          <p className="text-slate-700 text-sm leading-relaxed mb-4">T(n) = 2T(n/2) + n. Master Theorem (a=2, b=2, f(n)=n) ⇒ T(n)=Θ(n log n). Every level combines n elements; there are log n levels from halving.</p>
          <div className="text-[11px] font-mono bg-slate-900 text-sky-100 rounded px-4 py-3">level work: n × log n → n log n</div>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 text-gray-700">
          <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center"><Layers className="h-6 w-6 mr-3 text-sky-600"/>Structure</h2>
          <ul className="list-disc pl-5 text-slate-700 space-y-2 text-sm mb-2">
            <li>Perfectly balanced binary recursion</li>
            <li>Linear merge cost per level</li>
            <li>Stable ordering via left-first tie resolution</li>
            <li>Auxiliary array reused per merge pass</li>
          </ul>
          <p className="text-[12px] text-slate-500">Bottom-up variant iteratively merges runs of size 1,2,4,... eliminating recursion depth.</p>
        </div>
      </motion.div>

      {/* Pseudocode */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.1}} className="bg-white rounded-2xl shadow-xl p-8 mb-16 text-gray-700">
        <h2 className="text-2xl font-bold text-slate-800 mb-5 flex items-center"><Target className="h-6 w-6 mr-3 text-sky-600"/>Pseudocode</h2>
        <PseudocodeBlock code={(algo?.pseudocode||[]).join('\n')} />
        <p className="text-[12px] text-slate-500 mt-4">Stability arises because equal elements from left half are consumed before right half in typical two-pointer merge.</p>
      </motion.div>

      {/* Notes & Properties */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.15}} className="bg-white rounded-2xl shadow-xl p-8 mb-16 text-gray-700">
        <h2 className="text-2xl font-bold text-slate-800 mb-5 flex items-center"><Info className="h-6 w-6 mr-3 text-sky-600"/>Properties & Practical Notes</h2>
        <div className="grid md:grid-cols-2 gap-10 text-gray-700">
          <ul className="list-disc pl-5 text-slate-700 space-y-2 text-sm">
            <li>Predictable performance (no pathologies)</li>
            <li>Parallelizable at upper tree levels</li>
            <li>Good cache locality with blocked merges</li>
            <li>External sorting foundation (k-way merge)</li>
          </ul>
          <div className="text-sm text-slate-600 space-y-4 leading-relaxed">
            <p><strong className="text-slate-800">Cutoff optimization:</strong> Switch to insertion sort below a small threshold (like 8–16) to reduce overhead.</p>
            <p><strong className="text-slate-800">Memory reuse:</strong> Allocate one auxiliary buffer and alternate source/destination roles per level to halve copying.</p>
          </div>
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-4 text-gray-700">
        {prev? <Link href={`/algorithms/divide-and-conquer/${prev.slug}/theory`} className="inline-flex items-center px-5 py-2.5 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 text-xs font-semibold"><ArrowLeft className="h-4 w-4 mr-2 text-gray-700"/>{prev.name}</Link>: <span/>}
        <Link href="/algorithms/divide-and-conquer/merge-sort/simulation" className="inline-flex items-center px-6 py-3 rounded-md bg-sky-600 text-white hover:bg-sky-700 text-sm font-semibold text-gray-300">Run Simulation</Link>
        {next? <Link href={`/algorithms/divide-and-conquer/${next.slug}/theory`} className="inline-flex items-center px-5 py-2.5 rounded-md bg-sky-600 text-white hover:bg-sky-700 text-xs font-semibold text-gray-300">{next.name}<ArrowRight className="h-4 w-4 ml-2 text-gray-700"/></Link>: <span/>}
      </div>
    </div>
  </div>;
}
