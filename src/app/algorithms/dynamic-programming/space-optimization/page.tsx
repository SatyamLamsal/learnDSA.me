"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Layers, MemoryStick, HardDrive, BookOpen, Cpu, Clock } from 'lucide-react';

export default function SpaceOptimizationOverviewPage(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 text-gray-700">
      <div className="container mx-auto px-4 py-12 text-gray-700">
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="mb-10 text-gray-700">
          <Link href="/algorithms/dynamic-programming/max-subarray" className="inline-flex items-center text-slate-700 hover:text-slate-900 mb-6"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Prev: Maximum Subarray</Link>
          <h1 className="text-5xl font-bold text-slate-800 mb-4">DP Space Optimization Techniques</h1>
          <p className="text-lg text-slate-600 max-w-3xl">Reduce memory usage in dynamic programming via rolling arrays, dimension reduction, bit tricks, and algebraic shortcuts.</p>
        </motion.div>
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.6, delay:0.05}} className="grid md:grid-cols-5 gap-6 mb-14 text-gray-700">
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-700"><Layers className="h-10 w-10 text-blue-600 mx-auto mb-3"/><h3 className="font-semibold text-slate-800 mb-1">Rolling</h3><p className="text-xs text-slate-600">keep prev row</p></div>
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-700"><MemoryStick className="h-10 w-10 text-green-600 mx-auto mb-3"/><h3 className="font-semibold text-slate-800 mb-1">Bitmask</h3><p className="text-xs text-slate-600">subset states</p></div>
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-700"><HardDrive className="h-10 w-10 text-purple-600 mx-auto mb-3"/><h3 className="font-semibold text-slate-800 mb-1">Prefix</h3><p className="text-xs text-slate-600">range reuse</p></div>
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-700"><Cpu className="h-10 w-10 text-orange-600 mx-auto mb-3"/><h3 className="font-semibold text-slate-800 mb-1">Dimension</h3><p className="text-xs text-slate-600">windowing</p></div>
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-700"><Clock className="h-10 w-10 text-rose-600 mx-auto mb-3"/><h3 className="font-semibold text-slate-800 mb-1">Closed Form</h3><p className="text-xs text-slate-600">math formula</p></div>
        </motion.div>
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.6, delay:0.1}} className="grid md:grid-cols-1 gap-8 mb-16 text-gray-700">
          <Link href="/algorithms/dynamic-programming/space-optimization/theory" className="group bg-white rounded-xl shadow p-8 border border-slate-200 hover:border-slate-400 transition text-gray-700">
            <BookOpen className="h-10 w-10 text-blue-600 mb-4 group-hover:scale-110 transition"/>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Theory & Patterns</h3>
            <p className="text-sm text-slate-600">Explore common transformations that collapse memory while preserving correctness.</p>
          </Link>
        </motion.div>
        <div className="flex justify-start text-gray-700">
          <Link href="/algorithms/dynamic-programming" className="text-blue-600 hover:text-blue-700">← Back to DP Overview</Link>
        </div>
      </div>
    </div>
  );
}
