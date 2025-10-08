"use client";
import Link from 'next/link';
import { getAlgorithm, getPrevNext } from '../../dcAlgorithms';
import { ArrowLeft, ArrowRight, Info, Lightbulb, Sigma, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import PseudocodeBlock from '@/components/PseudocodeBlock';

const algo = getAlgorithm('strassen');
const { prev, next } = getPrevNext('strassen');

export default function StrassenTheory(){
  return <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-violet-50 text-gray-700">
    <div className="container mx-auto px-4 py-16 max-w-7xl text-gray-700">
      {/* Hero */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55}} className="mb-14 text-gray-700">
        <Link href="/algorithms/divide-and-conquer/strassen" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Overview</Link>
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-800 mb-5">Strassen Theory</h1>
        <p className="text-xl text-slate-600 max-w-4xl leading-relaxed">How 7 cleverly chosen block products replace 8 naive multiplications to break the O(n^3) barrier.</p>
      </motion.div>

      {/* Problem */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.05}} className="bg-white rounded-2xl shadow-xl p-8 mb-12 text-gray-700">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Problem</h2>
        <p className="text-base text-slate-700">Multiply two n x n matrices faster than classical triple-loop O(n^3). Use algebraic decomposition on 2 x 2 block matrices to reduce multiplication count.</p>
      </motion.div>

      {/* Decomposition */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.1}} className="bg-white rounded-2xl shadow-xl p-8 mb-12 text-gray-700">
        <h2 className="text-3xl font-bold text-slate-800 mb-6">Block Decomposition</h2>
        <p className="text-base text-slate-700 mb-4">Partition A and B into 4 submatrices each (quadrants):</p>
        <div className="text-xs font-mono bg-slate-900 text-indigo-200 rounded px-4 py-3 mb-6">A = [A11 A12; A21 A22]\nB = [B11 B12; B21 B22]</div>
        <p className="text-base text-slate-700 mb-4">Classical approach requires 8 sub-matrix multiplies (Aij * Bij combos). Strassen derives 7 products M1..M7 using sums/differences which still span all necessary combinations.</p>
        <div className="text-[11px] font-mono bg-indigo-50 border border-indigo-200 rounded p-4 space-y-1 mb-6 text-gray-700">
          <div>M1 = (A11 + A22)(B11 + B22)</div>
          <div>M2 = (A21 + A22) B11</div>
          <div>M3 = A11 (B12 - B22)</div>
          <div>M4 = A22 (B21 - B11)</div>
          <div>M5 = (A11 + A12) B22</div>
          <div>M6 = (A21 - A11)(B11 + B12)</div>
          <div>M7 = (A12 - A22)(B21 + B22)</div>
        </div>
        <p className="text-base text-slate-700 mb-3">Recombine into result quadrants:</p>
        <div className="text-[11px] font-mono bg-violet-50 border border-violet-200 rounded p-4 space-y-1 text-gray-700">
          <div>C11 = M1 + M4 - M5 + M7</div>
          <div>C12 = M3 + M5</div>
          <div>C21 = M2 + M4</div>
          <div>C22 = M1 - M2 + M3 + M6</div>
        </div>
      </motion.div>

      {/* Pseudocode */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.15}} className="bg-white rounded-2xl shadow-xl p-8 mb-12 text-gray-700">
        <h2 className="text-3xl font-bold text-slate-800 mb-6">Pseudocode</h2>
        <PseudocodeBlock code={(algo?.pseudocode||[]).join('\n')} />
      </motion.div>

      {/* Insights */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.2}} className="bg-white rounded-2xl shadow-xl p-8 mb-12 text-gray-700">
        <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3"><Lightbulb className="h-6 w-6 text-gray-700"/> Key Insights</h2>
        <ul className="list-disc pl-6 space-y-2 text-sm text-slate-700">
          <li>Algebraic substitution reduces multiplication count from 8 to 7.</li>
          <li>Hybrid strategy: switch to classical below cutoff to reduce overhead.</li>
          <li>Add/sub operations inflate constant factors vs naive for small n.</li>
          <li>Sets foundation for later theoretical improvements.</li>
        </ul>
      </motion.div>

      {/* Edge Considerations & Complexity */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.25}} className="grid lg:grid-cols-2 gap-10 mb-14 text-gray-700">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-gray-700">
          <h2 className="text-2xl font-bold text-slate-800 mb-5 flex items-center gap-2"><Info className="h-5 w-5 text-gray-700"/> Edge Considerations</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm text-slate-700">
            <li>Pad matrices when n not power of 2 (zero-extension).</li>
            <li>Careful memory reuse needed to avoid large temp blowup.</li>
            <li>Floating point roundoff slightly affected by extra adds.</li>
          </ul>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 text-gray-700">
          <h2 className="text-2xl font-bold text-slate-800 mb-5 flex items-center gap-2"><Sigma className="h-5 w-5 text-gray-700"/> Complexity</h2>
          <p className="font-mono text-indigo-700 text-sm mb-2">T(n) = 7T(n/2) + O(n^2)</p>
          <p className="text-sm text-slate-700 mb-2">Master Theorem =&gt; O(n^(log2 7)) ~ O(n^2.807).</p>
          <p className="text-xs text-slate-600">Benefit emerges for sufficiently large n due to added overhead in additions.</p>
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-4 text-gray-700">
        {prev? <Link href={`/algorithms/divide-and-conquer/${prev.slug}/theory`} className="inline-flex items-center px-5 py-2.5 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 text-xs font-semibold"><ArrowLeft className="h-4 w-4 mr-2 text-gray-700"/>{prev.name}</Link>: <span/>}
        <Link href="/algorithms/divide-and-conquer/strassen/simulation" className="inline-flex items-center px-6 py-3 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 text-sm font-semibold text-gray-300">Simulation</Link>
        {next? <Link href={`/algorithms/divide-and-conquer/${next.slug}/theory`} className="inline-flex items-center px-5 py-2.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 text-xs font-semibold text-gray-300">{next.name}<ArrowRight className="h-4 w-4 ml-2 text-gray-700"/></Link>: <span/>}
      </div>
    </div>
  </div>;
}
