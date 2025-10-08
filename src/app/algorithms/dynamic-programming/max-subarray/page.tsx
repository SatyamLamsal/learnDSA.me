"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Cpu, Zap, Activity, BookOpen, PlayCircle } from 'lucide-react';

export default function MaxSubarrayOverviewPage(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-sky-50 text-gray-700">
      <div className="container mx-auto px-4 py-12 text-gray-700">
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="mb-10 text-gray-700">
          <Link href="/algorithms/dynamic-programming/palindrome-partition" className="inline-flex items-center text-cyan-600 hover:text-cyan-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Prev: Palindrome Partition</Link>
          <h1 className="text-5xl font-bold text-slate-800 mb-4">Maximum Subarray (Kadane)</h1>
          <p className="text-lg text-slate-600 max-w-3xl">Linear DP that maintains best subarray ending at current index and global maximum.</p>
        </motion.div>
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.6, delay:0.05}} className="grid md:grid-cols-5 gap-6 mb-14 text-gray-700">
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-700"><Clock className="h-10 w-10 text-cyan-600 mx-auto mb-3"/><h3 className="font-semibold text-slate-800 mb-1">Time</h3><div className="text-xl font-bold text-cyan-600">O(n)</div><p className="text-xs text-slate-600 mt-1">single pass</p></div>
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-700"><Cpu className="h-10 w-10 text-green-600 mx-auto mb-3"/><h3 className="font-semibold text-slate-800 mb-1">Space</h3><div className="text-xl font-bold text-green-600">O(1)</div><p className="text-xs text-slate-600 mt-1">constant</p></div>
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-700"><Zap className="h-10 w-10 text-purple-600 mx-auto mb-3"/><h3 className="font-semibold text-slate-800 mb-1">Difficulty</h3><div className="text-xl font-bold text-purple-600">Beginner</div><p className="text-xs text-slate-600 mt-1">Linear DP</p></div>
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-700"><Activity className="h-10 w-10 text-orange-600 mx-auto mb-3"/><h3 className="font-semibold text-slate-800 mb-1">State</h3><div className="text-lg font-bold text-orange-600">current</div><p className="text-xs text-slate-600 mt-1">best ending here</p></div>
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-700"><BookOpen className="h-10 w-10 text-rose-600 mx-auto mb-3"/><h3 className="font-semibold text-slate-800 mb-1">Variants</h3><p className="text-xs text-slate-600">circular, product</p></div>
        </motion.div>
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.6, delay:0.1}} className="grid md:grid-cols-2 gap-8 mb-16 text-gray-700">
          <Link href="/algorithms/dynamic-programming/max-subarray/simulation" className="group bg-white rounded-xl shadow p-8 border border-cyan-100 hover:border-cyan-300 transition text-gray-700">
            <PlayCircle className="h-10 w-10 text-cyan-600 mb-4 group-hover:scale-110 transition"/>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Interactive Simulation</h3>
            <p className="text-sm text-slate-600">Step through updates of current and global best values.</p>
          </Link>
          <Link href="/algorithms/dynamic-programming/max-subarray/theory" className="group bg-white rounded-xl shadow p-8 border border-cyan-100 hover:border-cyan-300 transition text-gray-700">
            <BookOpen className="h-10 w-10 text-cyan-600 mb-4 group-hover:scale-110 transition"/>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Theory & Recurrence</h3>
            <p className="text-sm text-slate-600">Kadane derivation, edge cases with negatives, and common variants.</p>
          </Link>
        </motion.div>
        <div className="flex justify-between text-gray-700">
          <Link href="/algorithms/dynamic-programming/palindrome-partition" className="text-cyan-600 hover:text-cyan-700">← Palindrome Partition</Link>
          <Link href="/algorithms/dynamic-programming/space-optimization" className="text-cyan-600 hover:text-cyan-700">Space Optimization →</Link>
        </div>
      </div>
    </div>
  );
}
