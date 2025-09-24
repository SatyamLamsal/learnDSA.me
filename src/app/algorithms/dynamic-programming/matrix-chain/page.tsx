"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Cpu, Zap, BookOpen, Brackets, PlayCircle } from 'lucide-react';

export default function MatrixChainOverviewPage(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-fuchsia-50">
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="mb-10">
          <Link href="/algorithms/dynamic-programming/edit-distance" className="inline-flex items-center text-pink-600 hover:text-pink-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2"/>Prev: Edit Distance</Link>
          <h1 className="text-5xl font-bold text-slate-800 mb-4">Matrix Chain Multiplication</h1>
          <p className="text-lg text-slate-600 max-w-3xl">Choose optimal parenthesization of matrix chain to minimize scalar multiplications (classic interval DP).</p>
        </motion.div>
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.6, delay:0.05}} className="grid md:grid-cols-5 gap-6 mb-14">
          <div className="bg-white rounded-lg shadow p-6 text-center"><Clock className="h-10 w-10 text-pink-600 mx-auto mb-3"/><h3 className="font-semibold text-slate-800 mb-1">Time</h3><div className="text-xl font-bold text-pink-600">O(n³)</div><p className="text-xs text-slate-600 mt-1">length powers</p></div>
          <div className="bg-white rounded-lg shadow p-6 text-center"><Cpu className="h-10 w-10 text-green-600 mx-auto mb-3"/><h3 className="font-semibold text-slate-800 mb-1">Space</h3><div className="text-xl font-bold text-green-600">O(n²)</div><p className="text-xs text-slate-600 mt-1">dp + split</p></div>
          <div className="bg-white rounded-lg shadow p-6 text-center"><Zap className="h-10 w-10 text-purple-600 mx-auto mb-3"/><h3 className="font-semibold text-slate-800 mb-1">Difficulty</h3><div className="text-xl font-bold text-purple-600">Advanced</div><p className="text-xs text-slate-600 mt-1">Interval DP</p></div>
          <div className="bg-white rounded-lg shadow p-6 text-center"><Brackets className="h-10 w-10 text-orange-600 mx-auto mb-3"/><h3 className="font-semibold text-slate-800 mb-1">State</h3><div className="text-lg font-bold text-orange-600">dp[i][j]</div><p className="text-xs text-slate-600 mt-1">min cost</p></div>
          <div className="bg-white rounded-lg shadow p-6 text-center"><BookOpen className="h-10 w-10 text-rose-600 mx-auto mb-3"/><h3 className="font-semibold text-slate-800 mb-1">Output</h3><p className="text-xs text-slate-600">cost + parenthesis</p></div>
        </motion.div>
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.6, delay:0.1}} className="grid md:grid-cols-2 gap-8 mb-16">
          <Link href="/algorithms/dynamic-programming/matrix-chain/simulation" className="group bg-white rounded-xl shadow p-8 border border-pink-100 hover:border-pink-300 transition">
            <PlayCircle className="h-10 w-10 text-pink-600 mb-4 group-hover:scale-110 transition"/>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Interactive Simulation</h3>
            <p className="text-sm text-slate-600">Iterate over chain lengths and inspect best split positions for each interval.</p>
          </Link>
          <Link href="/algorithms/dynamic-programming/matrix-chain/theory" className="group bg-white rounded-xl shadow p-8 border border-pink-100 hover:border-pink-300 transition">
            <BookOpen className="h-10 w-10 text-pink-600 mb-4 group-hover:scale-110 transition"/>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Theory & Recurrence</h3>
            <p className="text-sm text-slate-600">Understand the interval DP transition and how to reconstruct optimal parenthesization.</p>
          </Link>
        </motion.div>
        <div className="flex justify-between">
          <Link href="/algorithms/dynamic-programming/edit-distance" className="text-pink-600 hover:text-pink-700">← Edit Distance</Link>
          <Link href="/algorithms/dynamic-programming/palindrome-partition" className="text-pink-600 hover:text-pink-700">Palindrome Partition →</Link>
        </div>
      </div>
    </div>
  );
}
