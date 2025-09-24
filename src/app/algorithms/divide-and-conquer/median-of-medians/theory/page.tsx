"use client";
import Link from 'next/link';
import { getAlgorithm, getPrevNext } from '../../dcAlgorithms';
import { ArrowLeft, ArrowRight, Target, Sigma, Info, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import PseudocodeBlock from '@/components/PseudocodeBlock';

const algo = getAlgorithm('median-of-medians');
const { prev, next } = getPrevNext('median-of-medians');

export default function MedianOfMediansTheory(){
  return <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      {/* Hero */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55}} className="mb-14">
        <Link href="/algorithms/divide-and-conquer/median-of-medians" className="inline-flex items-center text-rose-600 hover:text-rose-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2"/>Overview</Link>
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-800 mb-5 flex items-center gap-3"><Target className="h-10 w-10 text-rose-600"/>{algo?.name} Theory</h1>
        <p className="text-xl text-slate-600 max-w-4xl leading-relaxed">Guaranteeing linear-time selection by ensuring every pivot discards a constant fraction of elements.</p>
      </motion.div>

      {/* Pivot Quality */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.05}} className="bg-white rounded-2xl shadow-xl p-8 mb-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-5">Pivot Quality Argument</h2>
        <p className="text-base text-slate-700 mb-5">Group the n elements into ⌈n/5⌉ blocks of 5. Sorting each small block yields its median. Selecting the median of these medians gives a pivot p with the guarantee that at least 3n/10 elements are &gt;= p and at least 3n/10 are &lt;= p.</p>
        <div className="text-xs font-mono bg-slate-900 text-rose-200 rounded px-4 py-3 mb-5">Discard ≥ 30% each partition ⇒ geometric shrinkage</div>
        <p className="text-sm text-slate-600">Half of the block medians ≥ p. Each such median dominates (is ≥) at least two elements in its block, giving ≥ (n/10)*3 = 3n/10 elements ≥ p (handling uneven last group). Symmetry for ≤ p.</p>
      </motion.div>

      {/* Recurrence */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.1}} className="bg-white rounded-2xl shadow-xl p-8 mb-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-5">Recurrence</h2>
        <p className="font-mono text-rose-700 text-sm mb-3">T(n) = T(n/5) + T(7n/10) + O(n)</p>
        <p className="text-sm text-slate-700 mb-3">First term chooses pivot (select median among block medians). Second term recurses into the larger side (≤ 7n/10 elements). Linear term groups, sorts tiny blocks, partitions.</p>
        <p className="text-xs text-slate-500">Solves to O(n); constants higher than randomized quickselect.</p>
      </motion.div>

      {/* Pseudocode */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.15}} className="bg-white rounded-2xl shadow-xl p-8 mb-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-6">Pseudocode</h2>
        <PseudocodeBlock code={(algo?.pseudocode||[]).join('\n')} />
      </motion.div>

      {/* Complexity */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.2}} className="grid lg:grid-cols-2 gap-10 mb-14">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-5 flex items-center gap-2"><Sigma className="h-5 w-5"/> Complexity</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm text-slate-700 mb-2">
            <li>Time: O(n) worst / avg / best (deterministic)</li>
            <li>Space: O(1) extra (in-place grouping feasible)</li>
            <li>Pivots: Guaranteed constant-factor shrink</li>
          </ul>
          <p className="text-xs text-slate-500">Higher constant vs typical randomized approach; used when guarantees trump average speed.</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-5 flex items-center gap-2"><Lightbulb className="h-5 w-5"/> Notes</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm text-slate-700">
            <li>Group size 5 gives clean 30% bound.</li>
            <li>Used inside Introselect / introspective algorithms.</li>
            <li>Practical hybrids switch to random pivot after depth threshold.</li>
          </ul>
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-4">
        {prev? <Link href={`/algorithms/divide-and-conquer/${prev.slug}/theory`} className="inline-flex items-center px-5 py-2.5 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 text-xs font-semibold"><ArrowLeft className="h-4 w-4 mr-2"/>{prev.name}</Link>: <span/>}
        <Link href="/algorithms/divide-and-conquer/median-of-medians/simulation" className="inline-flex items-center px-6 py-3 rounded-md bg-rose-600 text-white hover:bg-rose-700 text-sm font-semibold">Simulation</Link>
        {next? <Link href={`/algorithms/divide-and-conquer/${next.slug}/theory`} className="inline-flex items-center px-5 py-2.5 rounded-md bg-rose-600 text-white hover:bg-rose-700 text-xs font-semibold">{next.name}<ArrowRight className="h-4 w-4 ml-2"/></Link>: <span/>}
      </div>
    </div>
  </div>;
}
