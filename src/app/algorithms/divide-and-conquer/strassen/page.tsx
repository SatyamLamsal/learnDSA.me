"use client";
import Link from 'next/link';
import { getAlgorithm, getPrevNext } from '../dcAlgorithms';
import { ArrowLeft, ArrowRight, Grid3x3, Cpu, Layers, Calculator, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const _algo = getAlgorithm('strassen');
const { prev, next } = getPrevNext('strassen');

export default function StrassenOverview(){
  return <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-violet-50">
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      {/* Hero */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55}} className="mb-12">
        <Link href="/algorithms/divide-and-conquer" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2"/>All Divide & Conquer</Link>
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-800 mb-5"><span className="text-indigo-600">Strassen&apos;s</span> Matrix Multiplication</h1>
  <p className="text-xl text-slate-600 max-w-4xl leading-relaxed">Reduce 8 naive block multiplications to <span className="font-semibold text-indigo-700">7 strategically combined</span> products — cutting complexity to <span className="font-semibold text-indigo-700">O(n^(log2 7)) ~ O(n^2.807)</span> by trading multiplies for additions.</p>
      </motion.div>

      {/* Metrics */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.05}} className="grid md:grid-cols-3 gap-6 mb-14">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <Calculator className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-800 mb-2">Time Complexity</h3>
          <div className="text-3xl font-bold text-indigo-600">O(n^(log2 7))</div>
          <p className="text-sm text-slate-600 mt-2">≈ O(n^{2.807}) via 7 products</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <Layers className="h-12 w-12 text-violet-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-800 mb-2">Space Complexity</h3>
          <div className="text-3xl font-bold text-violet-600">O(n²)</div>
          <p className="text-sm text-slate-600 mt-2">Temporary sum/diff buffers</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <Cpu className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-800 mb-2">Core Pattern</h3>
          <div className="text-xl font-bold text-purple-600">Algebraic D&C</div>
          <p className="text-sm text-slate-600 mt-2">Rewrite to cut multiplies</p>
        </div>
      </motion.div>

      {/* Mechanics */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.1}} className="bg-white rounded-2xl shadow-xl p-8 mb-14">
        <h2 className="text-3xl font-bold text-slate-800 mb-8">Key Mechanics</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Feature icon={<Grid3x3 className="h-5 w-5"/>} title="Block Partition" color="bg-indigo-600">Split A and B into 4 n/2 submatrices each (A11..A22, B11..B22).</Feature>
          <Feature icon={<Calculator className="h-5 w-5"/>} title="Seven Products" color="bg-violet-600">M1..M7 formed from strategic sums/differences (e.g. M1=(A11+A22)(B11+B22)).</Feature>
          <Feature icon={<Activity className="h-5 w-5"/>} title="Recombination" color="bg-purple-600">C blocks reconstructed using linear combos of M1..M7.</Feature>
        </div>
      </motion.div>

      {/* Trade-offs & Usage */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.15}} className="grid lg:grid-cols-2 gap-10 mb-14">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-5">When to Use</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-slate-700">
            <li>Large dense matrices (n above hybrid cutoff).</li>
            <li>Educational showcase of algebraic speedups.</li>
            <li>Foundation layer for advanced algorithms.</li>
            <li>CPU-bound multiply dominated workloads.</li>
          </ul>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-5">Trade-offs</h2>
            <ul className="list-disc pl-6 space-y-2 text-base text-slate-700">
              <li>More additions increases constant factors.</li>
              <li>Higher memory traffic (temp buffers).</li>
              <li>Numerical stability slightly worse (add/sub churn).</li>
              <li>Cross-over point varies (cache architecture).</li>
            </ul>
        </div>
      </motion.div>

      {/* Recurrence */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.2}} className="bg-white rounded-2xl shadow-xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Recurrence & Complexity</h2>
  <p className="font-mono text-xl text-indigo-700 mb-3">T(n) = 7T(n/2) + O(n^2)</p>
  <p className="text-base text-slate-700 mb-2">Master Theorem =&gt; <span className="font-semibold text-indigo-700">O(n^(log2 7)) ~ O(n^2.807)</span>.</p>
        <p className="text-sm text-slate-600">Naive is 8 sub-multiplies + recombination; Strassen removes one multiply at cost of extra additions.</p>
      </motion.div>

      {/* Actions */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.25}} className="flex flex-wrap gap-5 mb-10">
        <Link href="/algorithms/divide-and-conquer/strassen/theory" className="inline-flex items-center px-7 py-3.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-semibold shadow">Deep Theory</Link>
        <Link href="/algorithms/divide-and-conquer/strassen/simulation" className="inline-flex items-center px-7 py-3.5 bg-violet-600 text-white rounded-lg hover:bg-violet-700 text-sm font-semibold shadow">Interactive Simulation</Link>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-4">
        {prev? <Link href={`/algorithms/divide-and-conquer/${prev.slug}`} className="inline-flex items-center px-5 py-2.5 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 text-xs font-semibold"><ArrowLeft className="h-4 w-4 mr-2"/>{prev.name}</Link>: <span/>}
        {next? <Link href={`/algorithms/divide-and-conquer/${next.slug}`} className="inline-flex items-center px-5 py-2.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 text-xs font-semibold">{next.name}<ArrowRight className="h-4 w-4 ml-2"/></Link>: <span/>}
      </div>
    </div>
  </div>;
}

function Feature({icon,title,children,color}:{icon:React.ReactNode; title:string; children:React.ReactNode; color:string;}){
  return <div className="bg-white/70 backdrop-blur border border-indigo-200 rounded-xl p-4 flex flex-col shadow-sm">
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white mb-3 ${color}`}>{icon}</div>
    <h3 className="font-semibold text-slate-800 mb-1 text-sm">{title}</h3>
    <p className="text-xs text-slate-600 leading-relaxed">{children}</p>
  </div>;
}
