"use client";
import Link from 'next/link';
import { getAlgorithm, getPrevNext } from '../../dcAlgorithms';
import { ArrowLeft, ArrowRight, Info, Lightbulb, Sigma } from 'lucide-react';
import { motion } from 'framer-motion';
import PseudocodeBlock from '@/components/PseudocodeBlock';

const algo = getAlgorithm('fft');
const { prev, next } = getPrevNext('fft');

export default function FFTTheory(){
  return <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 to-pink-50 text-gray-700">
    <div className="container mx-auto px-4 py-16 max-w-7xl text-gray-700">
      {/* Hero */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55}} className="mb-14 text-gray-700">
        <Link href="/algorithms/divide-and-conquer/fft" className="inline-flex items-center text-fuchsia-600 hover:text-fuchsia-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Overview</Link>
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-800 mb-5">FFT Theory</h1>
        <p className="text-xl text-slate-600 max-w-4xl leading-relaxed">Radix-2 divide & conquer DFT using symmetry and periodicity to reduce cost.</p>
      </motion.div>

      {/* Problem */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.05}} className="bg-white rounded-2xl shadow-xl p-8 mb-12 text-gray-700">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Problem</h2>
  <p className="text-base text-slate-700">Compute length-n DFT faster than naive O(n^2) summation: X[k] = sum a[j] * exp(-2*pi*i*j*k / n). Use parity split to form two size n/2 transforms.</p>
      </motion.div>

      {/* Decomposition */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.1}} className="bg-white rounded-2xl shadow-xl p-8 mb-12 text-gray-700">
        <h2 className="text-3xl font-bold text-slate-800 mb-6">Recursive Decomposition</h2>
        <p className="text-base text-slate-700 mb-4">Polynomial view: A(x) = Σ a_j x^j. Partition indices by parity:</p>
        <div className="text-xs font-mono bg-slate-900 text-fuchsia-200 rounded px-4 py-3 mb-5">A(x) = A_even(x^2) + x A_odd(x^2)</div>
        <p className="text-base text-slate-700 mb-4">Evaluate at roots of unity ω_n^k gives two n/2 transforms E[k], O[k] plus combination with twiddle factors:</p>
        <div className="text-xs font-mono bg-slate-900 text-fuchsia-200 rounded px-4 py-3 mb-5">X[k] = E[k] + ω_n^k O[k]\nX[k + n/2] = E[k] - ω_n^k O[k]</div>
        <p className="text-sm text-slate-600">Each level performs O(n) twiddle multiplies; height log2 n.</p>
      </motion.div>

      {/* Pseudocode */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.15}} className="bg-white rounded-2xl shadow-xl p-8 mb-12 text-gray-700">
        <h2 className="text-3xl font-bold text-slate-800 mb-6">Pseudocode</h2>
        <PseudocodeBlock code={(algo?.pseudocode||[]).join('\n')} />
      </motion.div>

      {/* Insights */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.25}} className="bg-white rounded-2xl shadow-xl p-8 mb-12 text-gray-700">
        <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3"><Lightbulb className="h-6 w-6 text-gray-700"/> Key Insights</h2>
        <ul className="list-disc pl-6 space-y-2 text-sm text-slate-700">
          <li>Symmetry: w_n^(k + n/2) = -w_n^k halves needed evaluations.</li>
          <li>Iterative form uses bit-reversal reordering for in-place layout.</li>
          <li>Inverse FFT differs only by conjugation and scaling 1/n.</li>
          <li>Extensions: mixed radix, Bluestein for prime lengths.</li>
        </ul>
      </motion.div>

      {/* Edge + Complexity */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.3}} className="grid lg:grid-cols-2 gap-10 mb-14 text-gray-700">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-gray-700">
          <h2 className="text-2xl font-bold text-slate-800 mb-5 flex items-center gap-2"><Info className="h-5 w-5 text-gray-700"/> Edge Considerations</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm text-slate-700">
            <li>Pad to power of 2 for radix-2 variant.</li>
            <li>Floating point error accumulates in deep recursion.</li>
            <li>Use iterative in-place for memory efficiency.</li>
          </ul>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 text-gray-700">
          <h2 className="text-2xl font-bold text-slate-800 mb-5 flex items-center gap-2"><Sigma className="h-5 w-5 text-gray-700"/> Complexity</h2>
          <p className="font-mono text-fuchsia-700 text-sm mb-2">T(n) = 2T(n/2) + O(n)</p>
          <p className="text-sm text-slate-700">Master Theorem =&gt; O(n log n).</p>
          <p className="text-xs text-slate-600">Bit-reversal: O(n). Butterfly stages: log2 n each with n/2 butterflies.</p>
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-4 text-gray-700">
        {prev? <Link href={`/algorithms/divide-and-conquer/${prev.slug}/theory`} className="inline-flex items-center px-5 py-2.5 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 text-xs font-semibold"><ArrowLeft className="h-4 w-4 mr-2 text-gray-700"/>{prev.name}</Link>: <span/>}
        <Link href="/algorithms/divide-and-conquer/fft/simulation" className="inline-flex items-center px-6 py-3 rounded-md bg-fuchsia-600 text-white hover:bg-fuchsia-700 text-sm font-semibold text-gray-300">Simulation</Link>
        {next? <Link href={`/algorithms/divide-and-conquer/${next.slug}/theory`} className="inline-flex items-center px-5 py-2.5 rounded-md bg-fuchsia-600 text-white hover:bg-fuchsia-700 text-xs font-semibold text-gray-300">{next.name}<ArrowRight className="h-4 w-4 ml-2 text-gray-700"/></Link>: <span/>}
      </div>
    </div>
  </div>;
}
