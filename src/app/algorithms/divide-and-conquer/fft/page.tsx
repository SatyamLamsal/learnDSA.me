"use client";
import Link from 'next/link';
import { getAlgorithm, getPrevNext } from '../dcAlgorithms';
import { ArrowLeft, ArrowRight, Waves, Signal, Activity, Clock, Database } from 'lucide-react';
import { motion } from 'framer-motion';

const _algo = getAlgorithm('fft');
const { prev, next } = getPrevNext('fft');

export default function FFTOverview(){
  return <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 to-pink-50 text-gray-700">
    <div className="container mx-auto px-4 py-16 max-w-7xl text-gray-700">
      {/* Hero */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55}} className="mb-12 text-gray-700">
        <Link href="/algorithms/divide-and-conquer" className="inline-flex items-center text-fuchsia-600 hover:text-fuchsia-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>All Divide & Conquer</Link>
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-800 mb-5">Fast Fourier Transform</h1>
        <p className="text-xl text-slate-600 max-w-4xl leading-relaxed">Cooley–Tukey radix-2 FFT splits a sequence into even and odd sub-problems then merges with twiddle factors to drop DFT cost from O(n^2) to <span className="font-semibold text-fuchsia-700">O(n log n)</span>.</p>
      </motion.div>

      {/* Metrics */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.05}} className="grid md:grid-cols-3 gap-6 mb-14 text-gray-700">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center text-gray-700">
          <Clock className="h-12 w-12 text-fuchsia-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-800 mb-2">Time Complexity</h3>
          <div className="text-3xl font-bold text-fuchsia-600">O(n log n)</div>
          <p className="text-sm text-slate-600 mt-2">Even / odd recursion</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center text-gray-700">
          <Database className="h-12 w-12 text-pink-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-800 mb-2">Space Complexity</h3>
          <div className="text-3xl font-bold text-pink-600">O(n)</div>
          <p className="text-sm text-slate-600 mt-2">Aux arrays or in-place</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center text-gray-700">
          <Activity className="h-12 w-12 text-rose-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-800 mb-2">Core Pattern</h3>
          <div className="text-xl font-bold text-rose-600">Butterfly Merge</div>
          <p className="text-sm text-slate-600 mt-2">Twiddle factor combine</p>
        </div>
      </motion.div>

      {/* Mechanics */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.1}} className="bg-white rounded-2xl shadow-xl p-8 mb-14 text-gray-700">
        <h2 className="text-3xl font-bold text-slate-800 mb-8">Key Mechanics</h2>
        <div className="grid md:grid-cols-3 gap-8 text-gray-700">
          <Feature icon={<Waves className="h-5 w-5 text-gray-700"/>} title="Frequency Domain" color="bg-fuchsia-600">Transforms time-domain samples into frequency spectrum.</Feature>
          <Feature icon={<Signal className="h-5 w-5 text-gray-700"/>} title="Convolution Power" color="bg-pink-600">Fast polynomial & signal convolution via pointwise multiply.</Feature>
          <Feature icon={<Activity className="h-5 w-5 text-gray-700"/>} title="Butterflies" color="bg-rose-600">Pair operations reuse partial sums / differences.</Feature>
        </div>
      </motion.div>

      {/* Uses & Recurrence */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.15}} className="grid lg:grid-cols-2 gap-10 mb-14 text-gray-700">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-gray-700">
          <h2 className="text-2xl font-bold text-slate-800 mb-5">Core Uses</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-slate-700">
            <li>Spectral analysis (DSP).</li>
            <li>Fast convolution / polynomial multiplication.</li>
            <li>Compression & filtering (e.g. audio/image transforms).</li>
            <li>Numerical methods & PDE solving.</li>
          </ul>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 text-gray-700">
          <h2 className="text-2xl font-bold text-slate-800 mb-5">Recurrence</h2>
          <p className="font-mono text-fuchsia-700 text-sm mb-2">T(n) = 2T(n/2) + O(n)</p>
          <p className="text-sm text-slate-700">Master Theorem =&gt; O(n log n). Linear twiddle merge dominates after two sub-transforms.</p>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.2}} className="flex flex-wrap gap-5 mb-10 text-gray-700">
        <Link href="/algorithms/divide-and-conquer/fft/theory" className="inline-flex items-center px-7 py-3.5 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-700 text-sm font-semibold shadow text-gray-300">Deep Theory</Link>
        <Link href="/algorithms/divide-and-conquer/fft/simulation" className="inline-flex items-center px-7 py-3.5 bg-pink-600 text-white rounded-lg hover:bg-pink-700 text-sm font-semibold shadow text-gray-300">Interactive Simulation</Link>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-4 text-gray-700">
        {prev? <Link href={`/algorithms/divide-and-conquer/${prev.slug}`} className="inline-flex items-center px-5 py-2.5 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 text-xs font-semibold"><ArrowLeft className="h-4 w-4 mr-2 text-gray-700"/>{prev.name}</Link>: <span/>}
        {next? <Link href={`/algorithms/divide-and-conquer/${next.slug}`} className="inline-flex items-center px-5 py-2.5 rounded-md bg-fuchsia-600 text-white hover:bg-fuchsia-700 text-xs font-semibold text-gray-300">{next.name}<ArrowRight className="h-4 w-4 ml-2 text-gray-700"/></Link>: <span/>}
      </div>
    </div>
  </div>;
}

function Feature({icon,title,children,color}:{icon:React.ReactNode; title:string; children:React.ReactNode; color:string;}){
  return <div className="bg-white/70 backdrop-blur border border-fuchsia-200 rounded-xl p-4 flex flex-col shadow-sm text-gray-700">
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white mb-3 ${color}`}>{icon}</div>
    <h3 className="font-semibold text-slate-800 mb-1 text-sm">{title}</h3>
    <p className="text-xs text-slate-600 leading-relaxed">{children}</p>
  </div>;
}
