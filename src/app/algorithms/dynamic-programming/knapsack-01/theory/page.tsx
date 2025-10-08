"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Grid2x2, Layers } from 'lucide-react';

export default function KnapsackTheoryPage(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 text-gray-700">
      <div className="container mx-auto px-4 py-12 text-gray-700">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="mb-10 text-gray-700">
          <Link href="/algorithms/dynamic-programming/knapsack-01" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Back to Overview</Link>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">0/1 Knapsack Theory</h1>
          <p className="text-slate-600 max-w-3xl">Binary decision per item (take or skip) across capacities. Foundation for many resource allocation problems.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12 text-gray-700">
          <div className="bg-white p-6 rounded-lg shadow text-center text-gray-700"><Grid2x2 className="h-10 w-10 text-indigo-600 mx-auto mb-2"/><h3 className="font-semibold text-slate-800 mb-1">State</h3><p className="text-xs text-slate-600">dp[i][w] best value using first i items</p></div>
          <div className="bg-white p-6 rounded-lg shadow text-center text-gray-700"><Layers className="h-10 w-10 text-green-600 mx-auto mb-2"/><h3 className="font-semibold text-slate-800 mb-1">Transition</h3><p className="text-xs text-slate-600">take vs skip item i-1</p></div>
          <div className="bg-white p-6 rounded-lg shadow text-center text-gray-700"><BookOpen className="h-10 w-10 text-purple-600 mx-auto mb-2"/><h3 className="font-semibold text-slate-800 mb-1">Compression</h3><p className="text-xs text-slate-600">1D array backward iterate</p></div>
        </div>

        <section className="space-y-10 text-gray-700">
          <article className="bg-white p-6 rounded-lg shadow text-gray-700">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center"><BookOpen className="h-6 w-6 text-indigo-600 mr-2"/>1. Recurrence</h2>
            <pre className="bg-slate-900 text-slate-100 p-4 rounded text-sm overflow-x-auto"><code>{`if weight[i] <= w:
  dp[i][w] = max(dp[i-1][w], dp[i-1][w-weight[i]] + value[i])
else:
  dp[i][w] = dp[i-1][w]`}</code></pre>
          </article>
          <article className="bg-white p-6 rounded-lg shadow text-gray-700">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">2. Complexity</h2>
            <ul className="list-disc pl-6 text-sm text-slate-700 space-y-1">
              <li>Time: O(n×W)</li>
              <li>Space: O(n×W) → O(W) with rolling 1D</li>
              <li>Backwards iteration prevents reusing updated states prematurely.</li>
            </ul>
          </article>
          <article className="bg-white p-6 rounded-lg shadow text-gray-700">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">3. 1D Space Optimization</h2>
            <pre className="bg-slate-900 text-slate-100 p-4 rounded text-sm overflow-x-auto"><code>{`for each item i:
  for w from W down to weight[i]:
    dp[w] = max(dp[w], dp[w-weight[i]] + value[i])`}</code></pre>
            <p className="text-sm text-slate-600 mt-3">Descending w ensures dp[w-weight[i]] refers to previous item row.</p>
          </article>
          <article className="bg-white p-6 rounded-lg shadow text-gray-700">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Reconstruction</h2>
            <p className="text-sm text-slate-700 mb-3">Walk backwards: if value changed from previous row at capacity w, item was taken, subtract weight and continue.</p>
          </article>
          <article className="bg-white p-6 rounded-lg shadow text-gray-700">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">5. Variants & Related</h2>
            <ul className="list-disc pl-6 text-sm text-slate-700 space-y-1">
              <li>Unbounded / Complete Knapsack (iterate w ascending)</li>
              <li>Multiple Constraints (multi-dimensional capacity)</li>
              <li>Subset Sum (boolean feasibility version)</li>
              <li>Count number of solutions (replace max with sum)</li>
            </ul>
          </article>
        </section>

        <div className="mt-16 flex justify-between text-gray-700">
          <Link href="/algorithms/dynamic-programming/knapsack-01/simulation" className="text-indigo-600 hover:text-indigo-700">← Simulation</Link>
          <Link href="/algorithms/dynamic-programming/lcs" className="text-indigo-600 hover:text-indigo-700">Next: LCS →</Link>
        </div>
      </div>
    </div>
  );
}
