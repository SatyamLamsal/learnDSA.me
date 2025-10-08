"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Cpu, Zap, Scissors, BookOpen, PlayCircle } from 'lucide-react';

export default function PalindromePartitionOverviewPage(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 text-white">
      <div className="container mx-auto px-4 py-12 text-gray-700">
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="mb-10 text-gray-700">
          <Link href="/algorithms/dynamic-programming/matrix-chain" className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Prev: Matrix Chain</Link>
          <h1 className="text-5xl font-bold text-slate-800 mb-4">Palindrome Partitioning (Min Cuts)</h1>
          <p className="text-lg text-slate-600 max-w-3xl">Minimum cuts to split a string into palindromic substrings using palindrome table + prefix DP.</p>
        </motion.div>
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.6, delay:0.05}} className="grid md:grid-cols-5 gap-6 mb-14 text-gray-700">
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-700"><Clock className="h-10 w-10 text-teal-600 mx-auto mb-3"/><h3 className="font-semibold text-slate-800 mb-1">Time</h3><div className="text-xl font-bold text-teal-600">O(n²)</div><p className="text-xs text-slate-600 mt-1">with table</p></div>
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-700"><Cpu className="h-10 w-10 text-green-600 mx-auto mb-3"/><h3 className="font-semibold text-slate-800 mb-1">Space</h3><div className="text-xl font-bold text-green-600">O(n²)</div><p className="text-xs text-slate-600 mt-1">pal table</p></div>
            <div className="bg-white rounded-lg shadow p-6 text-center text-gray-700"><Zap className="h-10 w-10 text-purple-600 mx-auto mb-3"/><h3 className="font-semibold text-slate-800 mb-1">Difficulty</h3><div className="text-xl font-bold text-purple-600">Advanced</div><p className="text-xs text-slate-600 mt-1">Prefix DP</p></div>
            <div className="bg-white rounded-lg shadow p-6 text-center text-gray-700"><Scissors className="h-10 w-10 text-orange-600 mx-auto mb-3"/><h3 className="font-semibold text-slate-800 mb-1">State</h3><div className="text-lg font-bold text-orange-600">dp[i]</div><p className="text-xs text-slate-600 mt-1">min cuts</p></div>
            <div className="bg-white rounded-lg shadow p-6 text-center text-gray-700"><BookOpen className="h-10 w-10 text-rose-600 mx-auto mb-3"/><h3 className="font-semibold text-slate-800 mb-1">Optimization</h3><p className="text-xs text-slate-600">center expand</p></div>
        </motion.div>
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.6, delay:0.1}} className="grid md:grid-cols-2 gap-8 mb-16 text-gray-700">
          <Link href="/algorithms/dynamic-programming/palindrome-partition/simulation" className="group bg-white rounded-xl shadow p-8 border border-teal-100 hover:border-teal-300 transition text-gray-700">
            <PlayCircle className="h-10 w-10 text-teal-600 mb-4 group-hover:scale-110 transition"/>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Interactive Simulation</h3>
            <p className="text-sm text-slate-600">Build palindrome table then compute dp[i] cuts sequentially.</p>
          </Link>
          <Link href="/algorithms/dynamic-programming/palindrome-partition/theory" className="group bg-white rounded-xl shadow p-8 border border-teal-100 hover:border-teal-300 transition text-gray-700">
            <BookOpen className="h-10 w-10 text-teal-600 mb-4 group-hover:scale-110 transition"/>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Theory & Recurrence</h3>
            <p className="text-sm text-slate-600">Understand palindrome precomputation and prefix cut transitions.</p>
          </Link>
        </motion.div>
        <div className="flex justify-between text-gray-700">
          <Link href="/algorithms/dynamic-programming/matrix-chain" className="text-teal-600 hover:text-teal-700">← Matrix Chain</Link>
          <Link href="/algorithms/dynamic-programming/max-subarray" className="text-teal-600 hover:text-teal-700">Maximum Subarray →</Link>
        </div>
      </div>
    </div>
  );
}
