"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, Cpu, Zap, ListOrdered, BookOpen } from 'lucide-react';

export default function LISOverviewPage(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-50">
      <div className="container mx-auto px-4 py-14">
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="mb-10">
          <Link href="/algorithms/dynamic-programming/coin-change" className="inline-flex items-center text-red-600 hover:text-red-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2"/>Prev: Coin Change</Link>
          <h1 className="text-5xl font-bold text-slate-800 mb-4">Longest Increasing Subsequence (LIS)</h1>
          <p className="text-lg text-slate-600 max-w-4xl">Two paradigms: quadratic DP for clarity and O(n log n) patience sorting for performance. Shows evolution of optimization.</p>
        </motion.div>
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.6, delay:0.05}} className="grid md:grid-cols-5 gap-6 mb-14">
          <div className="bg-white rounded-lg shadow p-6 text-center"><Clock className="h-10 w-10 text-red-600 mx-auto mb-3"/><h3 className="font-semibold text-slate-800 mb-1">Time</h3><div className="text-xl font-bold text-red-600">O(n log n)</div><p className="text-[11px] text-slate-600 mt-1">or O(n²)</p></div>
          <div className="bg-white rounded-lg shadow p-6 text-center"><Cpu className="h-10 w-10 text-green-600 mx-auto mb-3"/><h3 className="font-semibold text-slate-800 mb-1">Space</h3><div className="text-xl font-bold text-green-600">O(n)</div><p className="text-[11px] text-slate-600 mt-1">piles/parents</p></div>
          <div className="bg-white rounded-lg shadow p-6 text-center"><Zap className="h-10 w-10 text-purple-600 mx-auto mb-3"/><h3 className="font-semibold text-slate-800 mb-1">Pattern</h3><div className="text-sm font-bold text-purple-600">Sequence DP</div></div>
          <div className="bg-white rounded-lg shadow p-6 text-center"><ListOrdered className="h-10 w-10 text-orange-600 mx-auto mb-3"/><h3 className="font-semibold text-slate-800 mb-1">State</h3><div className="text-sm font-bold text-orange-600">dp[i] / piles</div></div>
          <div className="bg-white rounded-lg shadow p-6 text-center"><BookOpen className="h-10 w-10 text-rose-600 mx-auto mb-3"/><h3 className="font-semibold text-slate-800 mb-1">Variants</h3><div className="text-xs font-semibold text-rose-600 leading-tight">Non‑decreasing<br/>2D Envelopes<br/>Circular</div></div>
        </motion.div>
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.6, delay:0.1}} className="grid md:grid-cols-2 gap-8 mb-16">
          <Link href="/algorithms/dynamic-programming/lis/simulation" className="group bg-white rounded-xl shadow hover:shadow-lg transition p-6 border border-transparent hover:border-red-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-rose-100 opacity-0 group-hover:opacity-70 transition"/>
            <div className="relative z-10">
              <h3 className="text-xl font-semibold flex items-center mb-2 text-slate-800"><ListOrdered className="h-5 w-5 mr-2 text-red-600"/>Interactive Simulation</h3>
              <p className="text-sm text-slate-600">Patience sorting piles evolution and placement positions per element.</p>
              <div className="mt-4 inline-block text-red-600 text-sm font-medium group-hover:translate-x-1 transition">Open →</div>
            </div>
          </Link>
          <Link href="/algorithms/dynamic-programming/lis/theory" className="group bg-white rounded-xl shadow hover:shadow-lg transition p-6 border border-transparent hover:border-red-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-rose-100 opacity-0 group-hover:opacity-70 transition"/>
            <div className="relative z-10">
              <h3 className="text-xl font-semibold flex items-center mb-2 text-slate-800"><BookOpen className="h-5 w-5 mr-2 text-red-600"/>Theory & Approaches</h3>
              <p className="text-sm text-slate-600">Compare O(n²) dp with O(n log n) method, reconstruction notes and variants.</p>
              <div className="mt-4 inline-block text-red-600 text-sm font-medium group-hover:translate-x-1 transition">Study →</div>
            </div>
          </Link>
        </motion.div>
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.6, delay:0.15}} className="flex justify-between items-center">
          <Link href="/algorithms/dynamic-programming/coin-change" className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"><ArrowLeft className="h-5 w-5 mr-2"/>Prev: Coin Change</Link>
          <Link href="/algorithms/dynamic-programming/edit-distance" className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">Next: Edit Distance <ArrowRight className="h-5 w-5 ml-2"/></Link>
        </motion.div>
      </div>
    </div>
  );
}
