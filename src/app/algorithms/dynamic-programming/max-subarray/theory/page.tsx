"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Activity } from 'lucide-react';

export default function MaxSubarrayTheoryPage(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-sky-50 text-white">
      <div className="container mx-auto px-4 py-12 text-gray-700">
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="mb-10 text-gray-700">
          <Link href="/algorithms/dynamic-programming/max-subarray" className="inline-flex items-center text-cyan-600 hover:text-cyan-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Back to Overview</Link>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Maximum Subarray Theory</h1>
          <p className="text-slate-600 max-w-3xl">Derivation of Kadane&apos;s algorithm and common extensions.</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6 mb-12 text-gray-700">
          <div className="bg-white p-6 rounded-lg shadow text-center text-gray-700"><Activity className="h-10 w-10 text-cyan-600 mx-auto mb-2"/><h3 className="font-semibold text-slate-800 mb-1">State</h3><p className="text-xs text-slate-600">current / best</p></div>
          <div className="bg-white p-6 rounded-lg shadow text-center text-gray-700"><BookOpen className="h-10 w-10 text-green-600 mx-auto mb-2"/><h3 className="font-semibold text-slate-800 mb-1">Transition</h3><p className="text-xs text-slate-600">current = max(a[i], current+a[i])</p></div>
          <div className="bg-white p-6 rounded-lg shadow text-center text-gray-700"><BookOpen className="h-10 w-10 text-purple-600 mx-auto mb-2"/><h3 className="font-semibold text-slate-800 mb-1">Update</h3><p className="text-xs text-slate-600">best = max(best,current)</p></div>
        </div>
        <section className="space-y-10 text-gray-700">
          <article className="bg-white p-6 rounded-lg shadow text-gray-700">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center"><BookOpen className="h-6 w-6 text-cyan-600 mr-2"/>1. Linear Recurrence</h2>
            <pre className="bg-slate-900 text-slate-100 p-4 rounded text-sm overflow-x-auto"><code>{`current = max(a[i], current + a[i])
best = max(best, current)`}</code></pre>
          </article>
          <article className="bg-white p-6 rounded-lg shadow text-gray-700">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">2. All-Negative Arrays</h2>
            <p className="text-sm text-slate-700 mb-3">Initialize current and best with first element to handle all negatives gracefully.</p>
          </article>
          <article className="bg-white p-6 rounded-lg shadow text-gray-700">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Variants</h2>
            <ul className="list-disc pl-6 text-sm text-slate-700 space-y-1">
              <li>Circular array: max(kadane(arr), total - minSubarray).</li>
              <li>Max product: maintain max and min product states.</li>
              <li>2D max sub-rectangle: apply 1D Kadane over compressed column sums.</li>
            </ul>
          </article>
        </section>
        <div className="mt-16 flex justify-between text-gray-700">
          <Link href="/algorithms/dynamic-programming/max-subarray/simulation" className="text-cyan-600 hover:text-cyan-700">← Simulation</Link>
          <Link href="/algorithms/dynamic-programming/space-optimization" className="text-cyan-600 hover:text-cyan-700">Next: Space Optimization →</Link>
        </div>
      </div>
    </div>
  );
}

