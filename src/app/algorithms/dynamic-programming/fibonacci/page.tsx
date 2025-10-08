"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, Cpu, Zap, Layers, Play, BookOpen } from 'lucide-react';

export default function FibonacciOverviewPage(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 text-gray-700">
      <div className="container mx-auto px-4 py-12 text-gray-700">
        {/* Header */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="text-center mb-12 text-gray-700">
          <Link href="/algorithms/dynamic-programming" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Back to DP Overview
          </Link>
          <h1 className="text-5xl font-bold text-slate-800 mb-4">Fibonacci Sequence</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">Your first Dynamic Programming problem: understand overlapping subproblems & optimal substructure via recursion → memoization → tabulation → space optimization.</p>
        </motion.div>

        {/* Key Metrics */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6, delay:0.1}} className="grid md:grid-cols-4 gap-6 mb-16 text-gray-700">
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-700"><Clock className="h-10 w-10 text-blue-600 mx-auto mb-3"/><h3 className="font-semibold mb-1 text-slate-800">Time</h3><div className="text-2xl font-bold text-blue-600">O(n)</div><p className="text-xs text-slate-600 mt-1">after DP</p></div>
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-700"><Cpu className="h-10 w-10 text-green-600 mx-auto mb-3"/><h3 className="font-semibold mb-1 text-slate-800">Space</h3><div className="text-2xl font-bold text-green-600">O(1–n)</div><p className="text-xs text-slate-600 mt-1">rolling vs table</p></div>
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-700"><Zap className="h-10 w-10 text-purple-600 mx-auto mb-3"/><h3 className="font-semibold mb-1 text-slate-800">Difficulty</h3><div className="text-2xl font-bold text-purple-600">Beginner</div><p className="text-xs text-slate-600 mt-1">starter DP</p></div>
            <div className="bg-white rounded-lg shadow p-6 text-center text-gray-700"><Layers className="h-10 w-10 text-orange-600 mx-auto mb-3"/><h3 className="font-semibold mb-1 text-slate-800">Recurrence</h3><div className="text-lg font-bold text-orange-600">F(n)=F(n-1)+F(n-2)</div><p className="text-xs text-slate-600 mt-1">F0=0, F1=1</p></div>
        </motion.div>

        {/* Navigation Cards */}
        <div className="grid md:grid-cols-2 gap-10 text-gray-700">
          <motion.div whileHover={{scale:1.02}} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6, delay:0.2}}>
            <Link href="/algorithms/dynamic-programming/fibonacci/simulation" className="block bg-white rounded-lg shadow p-8 hover:shadow-lg transition text-gray-700">
              <div className="flex items-center justify-between mb-4 text-gray-700"><Play className="h-8 w-8 text-blue-600"/><ArrowRight className="h-6 w-6 text-slate-400"/></div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Interactive Simulation</h3>
              <p className="text-slate-600 text-sm">Generate Fibonacci numbers with tabulation and watch space optimization side‑by‑side.</p>
            </Link>
          </motion.div>
          <motion.div whileHover={{scale:1.02}} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6, delay:0.25}}>
            <Link href="/algorithms/dynamic-programming/fibonacci/theory" className="block bg-white rounded-lg shadow p-8 hover:shadow-lg transition text-gray-700">
              <div className="flex items-center justify-between mb-4 text-gray-700"><BookOpen className="h-8 w-8 text-blue-600"/><ArrowRight className="h-6 w-6 text-slate-400"/></div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Theory & Approaches</h3>
              <p className="text-slate-600 text-sm">From naive recursion to memoization, tabulation, and O(1) space improvements with complexity analysis.</p>
            </Link>
          </motion.div>
        </div>

        {/* Next / Prev */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6, delay:0.35}} className="mt-16 flex justify-between items-center text-gray-700">
          <Link href="/algorithms/dynamic-programming" className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Back Overview</Link>
          <Link href="/algorithms/dynamic-programming/knapsack-01" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-gray-100">Next: 0/1 Knapsack <ArrowRight className="h-5 w-5 ml-2 text-gray-700"/></Link>
        </motion.div>
      </div>
    </div>
  );
}
