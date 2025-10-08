'use client';
import Link from 'next/link';
import { getAlgorithm, getPrevNext } from '../../dcAlgorithms';
import { ArrowLeft, ArrowRight, Info, Lightbulb, Sigma, Layers, Binary as BinaryIcon, Activity, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import PseudocodeBlock from '@/components/PseudocodeBlock';

const algo = getAlgorithm('max-subarray');
const { prev, next } = getPrevNext('max-subarray');

export default function MaxSubarrayTheory(){
  return <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 text-gray-700">
  <div className="container mx-auto px-4 py-10 max-w-screen-2xl text-gray-700">
      <Link href="/algorithms/divide-and-conquer/max-subarray" className="inline-flex items-center text-amber-700 hover:text-amber-800 mb-8"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Overview</Link>
      <div className="grid gap-6 text-gray-700">
        {/* Hero */}
        <motion.div initial={{opacity:0,y:26}} animate={{opacity:1,y:0}} transition={{duration:0.55}} className="bg-white rounded-2xl shadow-sm p-8 text-gray-700">
          <h1 className="text-5xl font-bold tracking-tight text-slate-800 mb-4 flex items-center gap-3"><Activity className="h-10 w-10 text-amber-600"/>{algo?.name} Theory</h1>
          <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">Compute the maximum contiguous subarray sum using the divide & conquer strategy. Illustrates combining local segment solutions via a crossing structure (suffix + prefix) and contrasts with linear DP (Kadane). Useful for mastering recurrence derivation and boundary reasoning.</p>
        </motion.div>

        {/* Structure */}
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:0.05,duration:0.5}} className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
            <h2 className="text-xl font-semibold text-slate-800 mb-3 flex items-center gap-2"><Layers className="h-5 w-5 text-amber-600"/> Divide & Conquer Structure</h2>
            <ol className="list-decimal pl-6 space-y-2 text-sm text-slate-600">
              <li>Split at midpoint m.</li>
              <li>Solve left half best.</li>
              <li>Solve right half best.</li>
              <li>Compute best crossing: suffix(left) + prefix(right).</li>
              <li>Take maximum of (left, right, crossing).</li>
            </ol>
            <div className="mt-4 grid md:grid-cols-3 gap-3 text-xs text-gray-600">
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-100 flex gap-2 text-gray-700"><BinaryIcon className="h-4 w-4 text-amber-600"/><span><b>Cross Composition:</b> O(n) outward scans from midpoint.</span></div>
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-100 flex gap-2 text-gray-700"><Zap className="h-4 w-4 text-amber-600"/><span><b>Contrast:</b> Kadane avoids recursion via running prefix optimization.</span></div>
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-100 flex gap-2 text-gray-700"><Activity className="h-4 w-4 text-amber-600"/><span><b>Teaching Value:</b> Mirrors crossing logic used in closest pair & merges.</span></div>
            </div>
        </motion.div>

        {/* Recurrence */}
        <motion.div initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{delay:0.1,duration:0.5}} className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
          <h2 className="text-xl font-semibold text-slate-800 mb-3 flex items-center gap-2"><Sigma className="h-5 w-5 text-amber-600"/> Recurrence</h2>
          <p className="font-mono text-xs bg-slate-900 text-amber-200 px-4 py-2 rounded inline-block">T(n)=2T(n/2)+O(n) → O(n log n)</p>
          <ul className="list-disc pl-6 text-sm text-slate-600 space-y-1 mt-4">
            <li>Linear crossing computation dominates merge step.</li>
            <li>Master theorem case 2 with a=2, b=2, f(n)=n.</li>
            <li>Stack depth O(log n) from balanced splits.</li>
          </ul>
        </motion.div>

        {/* Pseudocode */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.15,duration:0.5}} className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
          <h2 className="text-xl font-semibold text-slate-800 mb-3 flex items-center gap-2"><BinaryIcon className="h-5 w-5 text-amber-600"/> Pseudocode</h2>
          <PseudocodeBlock code={(algo?.pseudocode||[]).join('\n')} />
        </motion.div>

        {/* Comparison with Kadane */}
        <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:0.2,duration:0.5}} className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
          <h2 className="text-xl font-semibold text-slate-800 mb-3 flex items-center gap-2"><Lightbulb className="h-5 w-5 text-amber-600"/> Comparing With Kadane</h2>
          <ul className="list-disc pl-6 space-y-1 text-sm text-slate-600">
            <li>Kadane runs in O(n) maintaining best ending-at-i prefix.</li>
            <li>Divide & conquer clarifies structural case partition (left/right/cross).</li>
            <li>Pedagogical: sets stage for DP vs structural recursion tradeoffs.</li>
            <li>Crossing computation idea generalizes to other combination schemes.</li>
          </ul>
        </motion.div>

        {/* Edge Considerations */}
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.25,duration:0.5}} className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
          <h2 className="text-xl font-semibold text-slate-800 mb-3 flex items-center gap-2"><Info className="h-5 w-5 text-amber-600"/> Edge Considerations</h2>
          <ul className="list-disc pl-6 space-y-1 text-sm text-slate-600">
            <li>All negative: correct answer is largest (least negative) element.</li>
            <li>Ensure crossing includes one element from each side (avoid double counting).</li>
            <li>Indices often tracked for reconstruction (store start/end from each scan).</li>
          </ul>
        </motion.div>

        {/* Navigation */}
        <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:0.3,duration:0.5}} className="flex justify-between items-center text-gray-700">
          {prev? <Link href={`/algorithms/divide-and-conquer/${prev.slug}/theory`} className="inline-flex items-center px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"><ArrowLeft className="h-4 w-4 mr-2 text-gray-700"/>{prev.name}</Link>: <span/>}
          <Link href="/algorithms/divide-and-conquer/max-subarray/simulation" className="px-6 py-2 rounded bg-amber-600 text-white hover:bg-amber-700 text-gray-100">Simulation</Link>
          {next? <Link href={`/algorithms/divide-and-conquer/${next.slug}/theory`} className="inline-flex items-center px-4 py-2 rounded bg-amber-600 text-white hover:bg-amber-700 text-gray-100">{next.name}<ArrowRight className="h-4 w-4 ml-2 text-gray-700"/></Link>: <span/>}
        </motion.div>
      </div>
    </div>
  </div>;
}
