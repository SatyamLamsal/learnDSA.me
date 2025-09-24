"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Layers, MemoryStick, HardDrive, Cpu, Clock, BookOpen } from 'lucide-react';

export default function SpaceOptimizationTheoryPage(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100">
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="mb-10">
          <Link href="/algorithms/dynamic-programming/space-optimization" className="inline-flex items-center text-slate-700 hover:text-slate-900 mb-6"><ArrowLeft className="h-5 w-5 mr-2"/>Back to Overview</Link>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Space Optimization Patterns</h1>
          <p className="text-slate-600 max-w-3xl">Catalog of common dynamic programming memory reductions with examples.</p>
        </motion.div>
        <div className="grid md:grid-cols-5 gap-4 mb-12 text-center">
          <div className="bg-white p-4 rounded shadow"><Layers className="h-8 w-8 text-blue-600 mx-auto mb-1"/><div className="text-xs font-medium">Rolling</div></div>
          <div className="bg-white p-4 rounded shadow"><MemoryStick className="h-8 w-8 text-green-600 mx-auto mb-1"/><div className="text-xs font-medium">Bitmask</div></div>
          <div className="bg-white p-4 rounded shadow"><HardDrive className="h-8 w-8 text-purple-600 mx-auto mb-1"/><div className="text-xs font-medium">Prefix</div></div>
          <div className="bg-white p-4 rounded shadow"><Cpu className="h-8 w-8 text-orange-600 mx-auto mb-1"/><div className="text-xs font-medium">Window</div></div>
          <div className="bg-white p-4 rounded shadow"><Clock className="h-8 w-8 text-rose-600 mx-auto mb-1"/><div className="text-xs font-medium">Closed Form</div></div>
        </div>
        <section className="space-y-10">
          <article className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center"><BookOpen className="h-6 w-6 text-blue-600 mr-2"/>1. Rolling Arrays</h2>
            <pre className="bg-slate-900 text-slate-100 p-4 rounded text-sm overflow-x-auto"><code>{`for i in rows:
  cur = [...]
  for j in cols:
    cur[j] = f(prev[j], prev[j-1], cur[j-1])
  prev = cur`}</code></pre>
          </article>
          <article className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">2. Bitmask Compression</h2>
            <p className="text-sm text-slate-700 mb-3">Represent subset / boolean states in integer bits. Iterate masks and submasks efficiently.</p>
            <pre className="bg-slate-900 text-slate-100 p-4 rounded text-sm overflow-x-auto"><code>{`mask = (1<<n)-1
sub = mask
while sub:
  process(sub)
  sub = (sub-1) & mask`}</code></pre>
          </article>
          <article className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Prefix / Difference Arrays</h2>
            <p className="text-sm text-slate-700 mb-3">Use prefix sums to collapse an extra dimension of range-dependent transitions.</p>
          </article>
          <article className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Windowed States</h2>
            <p className="text-sm text-slate-700 mb-3">Maintain only k previous rows/columns with deque or circular buffer if transition depends on bounded window.</p>
          </article>
          <article className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">5. Closed Forms</h2>
            <p className="text-sm text-slate-700 mb-3">Some recurrences reduce to math formula (e.g., Fibonacci, sums of arithmetic/geometric progressions) removing DP entirely.</p>
          </article>
        </section>
      </div>
    </div>
  );
}

