"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Cpu, Zap, Replace, BookOpen, PlayCircle } from 'lucide-react';

export default function EditDistanceOverviewPage(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="mb-10">
          <Link href="/algorithms/dynamic-programming/lis" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2"/>Prev: LIS</Link>
          <h1 className="text-5xl font-bold text-slate-800 mb-4">Edit Distance (Levenshtein)</h1>
          <p className="text-lg text-slate-600 max-w-3xl">Minimum number of single‑character insertions, deletions, or replacements required to transform one string into another.</p>
        </motion.div>

        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6, delay:0.05}} className="grid md:grid-cols-5 gap-6 mb-14">
          <div className="bg-white rounded-lg shadow p-6 text-center"><Clock className="h-10 w-10 text-indigo-600 mx-auto mb-3"/><h3 className="font-semibold text-slate-800 mb-1">Time</h3><div className="text-xl font-bold text-indigo-600">O(m×n)</div><p className="text-xs text-slate-600 mt-1">m,n lengths</p></div>
          <div className="bg-white rounded-lg shadow p-6 text-center"><Cpu className="h-10 w-10 text-green-600 mx-auto mb-3"/><h3 className="font-semibold text-slate-800 mb-1">Space</h3><div className="text-xl font-bold text-green-600">O(m×n)</div><p className="text-xs text-slate-600 mt-1">or O(min)</p></div>
          <div className="bg-white rounded-lg shadow p-6 text-center"><Zap className="h-10 w-10 text-purple-600 mx-auto mb-3"/><h3 className="font-semibold text-slate-800 mb-1">Difficulty</h3><div className="text-xl font-bold text-purple-600">Intermediate</div><p className="text-xs text-slate-600 mt-1">String DP</p></div>
          <div className="bg-white rounded-lg shadow p-6 text-center"><Replace className="h-10 w-10 text-orange-600 mx-auto mb-3"/><h3 className="font-semibold text-slate-800 mb-1">State</h3><div className="text-lg font-bold text-orange-600">dp[i][j]</div><p className="text-xs text-slate-600 mt-1">dist prefix</p></div>
          <div className="bg-white rounded-lg shadow p-6 text-center"><BookOpen className="h-10 w-10 text-rose-600 mx-auto mb-3"/><h3 className="font-semibold text-slate-800 mb-1">Variants</h3><p className="text-xs text-slate-600">Damerau, weighted, similarity</p></div>
        </motion.div>

        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6, delay:0.1}} className="grid md:grid-cols-2 gap-8 mb-16">
          <Link href="/algorithms/dynamic-programming/edit-distance/simulation" className="group bg-white rounded-xl shadow p-8 border border-indigo-100 hover:border-indigo-300 transition">
            <PlayCircle className="h-10 w-10 text-indigo-600 mb-4 group-hover:scale-110 transition"/>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Interactive Simulation</h3>
            <p className="text-sm text-slate-600">Fill the dynamic programming table row by row and watch distance values evolve.</p>
          </Link>
          <Link href="/algorithms/dynamic-programming/edit-distance/theory" className="group bg-white rounded-xl shadow p-8 border border-indigo-100 hover:border-indigo-300 transition">
            <BookOpen className="h-10 w-10 text-indigo-600 mb-4 group-hover:scale-110 transition"/>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Theory & Recurrence</h3>
            <p className="text-sm text-slate-600">Derive the recurrence, optimizations, and explore classical variants of edit distance.</p>
          </Link>
        </motion.div>

        <div className="flex justify-between">
          <Link href="/algorithms/dynamic-programming/lis" className="text-indigo-600 hover:text-indigo-700">← LIS Overview</Link>
          <Link href="/algorithms/dynamic-programming/matrix-chain" className="text-indigo-600 hover:text-indigo-700">Matrix Chain →</Link>
        </div>
      </div>
    </div>
  );
}
