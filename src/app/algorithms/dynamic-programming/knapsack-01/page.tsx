"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, Cpu, Zap, Grid2x2, BookOpen } from 'lucide-react';

export default function KnapsackOverviewPage(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="container mx-auto px-4 py-14">
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="mb-10">
          <Link href="/algorithms/dynamic-programming/fibonacci" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2"/>Prev: Fibonacci</Link>
          <h1 className="text-5xl font-bold text-slate-800 mb-4">0/1 Knapsack</h1>
          <p className="text-lg text-slate-600 max-w-4xl">Select a subset of items maximizing value without exceeding capacity. Canonical 2D DP with classic 1D space compression.</p>
        </motion.div>
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.6, delay:0.05}} className="grid md:grid-cols-5 gap-6 mb-14">
          <div className="bg-white rounded-lg shadow p-6 text-center"><Clock className="h-10 w-10 text-indigo-600 mx-auto mb-3"/><h3 className="font-semibold text-slate-800 mb-1">Time</h3><div className="text-xl font-bold text-indigo-600">O(n×W)</div><p className="text-[11px] text-slate-600 mt-1">n items</p></div>
          <div className="bg-white rounded-lg shadow p-6 text-center"><Cpu className="h-10 w-10 text-green-600 mx-auto mb-3"/><h3 className="font-semibold text-slate-800 mb-1">Space</h3><div className="text-xl font-bold text-green-600">O(n×W)</div><p className="text-[11px] text-slate-600 mt-1">or O(W)</p></div>
          <div className="bg-white rounded-lg shadow p-6 text-center"><Zap className="h-10 w-10 text-purple-600 mx-auto mb-3"/><h3 className="font-semibold text-slate-800 mb-1">Pattern</h3><div className="text-sm font-bold text-purple-600">Binary Choice</div></div>
          <div className="bg-white rounded-lg shadow p-6 text-center"><Grid2x2 className="h-10 w-10 text-orange-600 mx-auto mb-3"/><h3 className="font-semibold text-slate-800 mb-1">State</h3><div className="text-sm font-bold text-orange-600">dp[i][w]</div></div>
          <div className="bg-white rounded-lg shadow p-6 text-center"><BookOpen className="h-10 w-10 text-rose-600 mx-auto mb-3"/><h3 className="font-semibold text-slate-800 mb-1">Variants</h3><div className="text-xs font-semibold text-rose-600 leading-tight">Unbounded<br/>Multiple Constraints<br/>Subset Sum</div></div>
        </motion.div>
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.6, delay:0.1}} className="grid md:grid-cols-2 gap-8 mb-16">
          <Link href="/algorithms/dynamic-programming/knapsack-01/simulation" className="group bg-white rounded-xl shadow hover:shadow-lg transition p-6 border border-transparent hover:border-indigo-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-100 opacity-0 group-hover:opacity-70 transition"/>
            <div className="relative z-10">
              <h3 className="text-xl font-semibold flex items-center mb-2 text-slate-800"><Grid2x2 className="h-5 w-5 mr-2 text-indigo-600"/>Interactive Simulation</h3>
              <p className="text-sm text-slate-600">Visual table fill, decisions (take/skip), and reconstruction of optimal set.</p>
              <div className="mt-4 inline-block text-indigo-600 text-sm font-medium group-hover:translate-x-1 transition">Open →</div>
            </div>
          </Link>
          <Link href="/algorithms/dynamic-programming/knapsack-01/theory" className="group bg-white rounded-xl shadow hover:shadow-lg transition p-6 border border-transparent hover:border-indigo-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-100 opacity-0 group-hover:opacity-70 transition"/>
            <div className="relative z-10">
              <h3 className="text-xl font-semibold flex items-center mb-2 text-slate-800"><BookOpen className="h-5 w-5 mr-2 text-indigo-600"/>Theory & Complexity</h3>
              <p className="text-sm text-slate-600">Recurrence, space compression trick, reconstruction logic, use cases.</p>
              <div className="mt-4 inline-block text-indigo-600 text-sm font-medium group-hover:translate-x-1 transition">Study →</div>
            </div>
          </Link>
        </motion.div>
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.6, delay:0.15}} className="flex justify-between items-center">
          <Link href="/algorithms/dynamic-programming/fibonacci" className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"><ArrowLeft className="h-5 w-5 mr-2"/>Prev: Fibonacci</Link>
          <Link href="/algorithms/dynamic-programming/lcs" className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">Next: LCS <ArrowRight className="h-5 w-5 ml-2"/></Link>
        </motion.div>
      </div>
    </div>
  );
}
