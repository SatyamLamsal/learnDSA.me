"use client";
import Link from 'next/link';
import { getAlgorithm, getPrevNext } from '../../dcAlgorithms';
import { ArrowLeft, ArrowRight, Info, Lightbulb, Sigma } from 'lucide-react';
import { motion } from 'framer-motion';
import PseudocodeBlock from '@/components/PseudocodeBlock';

const algo = getAlgorithm('karatsuba');
const { prev, next } = getPrevNext('karatsuba');

export default function KaratsubaTheory(){
  return <div className="min-h-screen bg-gradient-to-br from-lime-50 to-green-50 text-gray-700">
    <div className="container mx-auto px-4 py-16 max-w-7xl text-gray-700">
      {/* Hero */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55}} className="mb-14 text-gray-700">
        <Link href="/algorithms/divide-and-conquer/karatsuba" className="inline-flex items-center text-lime-600 hover:text-lime-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Overview</Link>
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-800 mb-5">Karatsuba Theory</h1>
        <p className="text-xl text-slate-600 max-w-4xl leading-relaxed">Algebraic trick: replace four size n/2 multiplications with three plus linear overhead to achieve sub-quadratic complexity.</p>
      </motion.div>

      {/* Problem */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.05}} className="bg-white rounded-2xl shadow-xl p-8 mb-12 text-gray-700">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Problem</h2>
        <p className="text-base text-slate-700">Multiply large integers faster than classical O(n^2) by reducing the count of recursive multiplications using digit split and recombine.</p>
      </motion.div>

      {/* Derivation */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.1}} className="bg-white rounded-2xl shadow-xl p-8 mb-12 text-gray-700">
        <h2 className="text-3xl font-bold text-slate-800 mb-6">Algebraic Derivation</h2>
        <p className="text-base text-slate-700 mb-4">Represent operands in base B, splitting at midpoint m:</p>
        <div className="text-xs font-mono bg-slate-900 text-lime-200 rounded px-4 py-3 mb-4">x = x1 * B^m + x0\ny = y1 * B^m + y0</div>
        <p className="text-base text-slate-700 mb-4">Classical method needs four products (x1y1, x1y0, x0y1, x0y0). Use the identity:</p>
        <div className="text-xs font-mono bg-slate-900 text-lime-200 rounded px-4 py-3 mb-4">(x1 + x0)(y1 + y0) = x1y1 + x0y0 + (x1y0 + x0y1)</div>
        <p className="text-base text-slate-700 mb-4">Compute only:</p>
        <div className="text-xs font-mono bg-slate-900 text-lime-200 rounded px-4 py-3 mb-4">z2 = x1*y1\nz0 = x0*y0\nz1 = (x1 + x0)(y1 + y0) - z2 - z0</div>
        <p className="text-base text-slate-700">Reconstruct product:</p>
        <div className="text-xs font-mono bg-slate-900 text-lime-200 rounded px-4 py-3 mb-2">xy = z2 * B^(2m) + z1 * B^m + z0</div>
        <p className="text-xs text-slate-500">Each level: 3 multiplications on n/2 digits + O(n) additions.</p>
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
          <li>Trade one multiplication for several additions/subtractions.</li>
          <li>Threshold hybridization improves constant factors.</li>
          <li>Foundation for Toom-Cook and FFT approaches.</li>
          <li>Exponent log2 3 ≈ 1.585 gives sub-quadratic performance.</li>
        </ul>
      </motion.div>

      {/* Edge + Complexity */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.3}} className="grid lg:grid-cols-2 gap-10 mb-14 text-gray-700">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-gray-700">
          <h2 className="text-2xl font-bold text-slate-800 mb-5 flex items-center gap-2"><Info className="h-5 w-5 text-gray-700"/> Edge Considerations</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm text-slate-700">
            <li>Pad unequal lengths to align splits.</li>
            <li>Tune base-case cutoff for environment.</li>
            <li>Reuse buffers to minimize allocations.</li>
          </ul>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 text-gray-700">
          <h2 className="text-2xl font-bold text-slate-800 mb-5 flex items-center gap-2"><Sigma className="h-5 w-5 text-gray-700"/> Complexity</h2>
          <p className="font-mono text-lime-700 text-sm mb-2">T(n) = 3T(n/2) + O(n)</p>
          <p className="text-sm text-slate-700">Master Theorem =&gt; O(n^(log2 3)) ~ O(n^1.585).</p>
          <p className="text-xs text-slate-600">Addition/subtraction overhead linear; depth is log2 n.</p>
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-4 text-gray-700">
        {prev? <Link href={`/algorithms/divide-and-conquer/${prev.slug}/theory`} className="inline-flex items-center px-5 py-2.5 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 text-xs font-semibold"><ArrowLeft className="h-4 w-4 mr-2 text-gray-700"/>{prev.name}</Link>: <span/>}
        <Link href="/algorithms/divide-and-conquer/karatsuba/simulation" className="inline-flex items-center px-6 py-3 rounded-md bg-lime-600 text-black hover:bg-lime-700 text-sm font-semibold text-gray-300">Simulation</Link>
        {next? <Link href={`/algorithms/divide-and-conquer/${next.slug}/theory`} className="inline-flex items-center px-5 py-2.5 rounded-md bg-lime-600 text-black hover:bg-lime-700 text-xs font-semibold text-gray-300">{next.name}<ArrowRight className="h-4 w-4 ml-2 text-gray-700"/></Link>: <span/>}
      </div>
    </div>
  </div>;
}
