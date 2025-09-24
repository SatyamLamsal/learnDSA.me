"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, ListOrdered } from 'lucide-react';

export default function LISTheoryPage(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-50">
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="mb-10">
          <Link href="/algorithms/dynamic-programming/lis" className="inline-flex items-center text-red-600 hover:text-red-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2"/>Back to Overview</Link>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">LIS Theory</h1>
          <p className="text-slate-600 max-w-3xl">Comparing quadratic DP with the optimized patience sorting technique.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow text-center"><ListOrdered className="h-10 w-10 text-red-600 mx-auto mb-2"/><h3 className="font-semibold text-slate-800 mb-1">O(n²) DP</h3><p className="text-xs text-slate-600">dp[i] = LIS ending at i</p></div>
          <div className="bg-white p-6 rounded-lg shadow text-center"><BookOpen className="h-10 w-10 text-green-600 mx-auto mb-2"/><h3 className="font-semibold text-slate-800 mb-1">Optimized</h3><p className="text-xs text-slate-600">Binary search piles</p></div>
          <div className="bg-white p-6 rounded-lg shadow text-center"><BookOpen className="h-10 w-10 text-purple-600 mx-auto mb-2"/><h3 className="font-semibold text-slate-800 mb-1">Reconstruction</h3><p className="text-xs text-slate-600">Track parents</p></div>
        </div>

        <section className="space-y-10">
          <article className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center"><BookOpen className="h-6 w-6 text-red-600 mr-2"/>1. O(n²) DP</h2>
            <pre className="bg-slate-900 text-slate-100 p-4 rounded text-sm overflow-x-auto"><code>{`dp[i] = 1
for i in 0..n-1:
  for j in 0..i-1:
    if a[j] < a[i]:
      dp[i] = max(dp[i], dp[j] + 1)`}</code></pre>
          </article>
          <article className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">2. O(n log n) Patience Sorting</h2>
            <pre className="bg-slate-900 text-slate-100 p-4 rounded text-sm overflow-x-auto"><code>{`piles = []
for x in a:
  place x on leftmost pile with top >= x (binary search)
length = len(piles)`}</code></pre>
            <p className="text-sm text-slate-600 mt-3">Piles store minimal tail for subsequences of each length; they are non-decreasing.</p>
          </article>
          <article className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Reconstruction (O(n log n) approach)</h2>
            <p className="text-sm text-slate-700 mb-3">Maintain predecessor indices and an array of pile ends (indices), then backtrack from last pile.</p>
          </article>
          <article className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Variants</h2>
            <ul className="list-disc pl-6 text-sm text-slate-700 space-y-1">
              <li>Non-decreasing variant: use {'>'} instead of {'>='} in binary search condition.</li>
              <li>2D envelopes: sort by one dimension, LIS on second with tie rules.</li>
              <li>Circular sequences: duplicate array and constrain start window.</li>
            </ul>
          </article>
        </section>

        <div className="mt-16 flex justify-between">
          <Link href="/algorithms/dynamic-programming/lis/simulation" className="text-red-600 hover:text-red-700">← Simulation</Link>
          <Link href="/algorithms/dynamic-programming/edit-distance" className="text-red-600 hover:text-red-700">Next: Edit Distance →</Link>
        </div>
      </div>
    </div>
  );
}

