"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Table } from 'lucide-react';

export default function LCSTheoryPage(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 text-gray-700">
      <div className="container mx-auto px-4 py-12 text-gray-700">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="mb-10 text-gray-700">
          <Link href="/algorithms/dynamic-programming/lcs" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Back to Overview</Link>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">LCS Theory</h1>
          <p className="text-slate-600 max-w-3xl">Derivation of recurrence, reconstruction, space reductions, and classic variants.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12 text-gray-700">
          <div className="bg-white p-6 rounded-lg shadow text-center text-gray-700"><Table className="h-10 w-10 text-indigo-600 mx-auto mb-2"/><h3 className="font-semibold text-slate-800 mb-1">State</h3><p className="text-xs text-slate-600">dp[i][j] length LCS of prefixes</p></div>
          <div className="bg-white p-6 rounded-lg shadow text-center text-gray-700"><BookOpen className="h-10 w-10 text-green-600 mx-auto mb-2"/><h3 className="font-semibold text-slate-800 mb-1">Transition</h3><p className="text-xs text-slate-600">Match → diag+1 else max(up,left)</p></div>
          <div className="bg-white p-6 rounded-lg shadow text-center text-gray-700"><BookOpen className="h-10 w-10 text-purple-600 mx-auto mb-2"/><h3 className="font-semibold text-slate-800 mb-1">Space Cut</h3><p className="text-xs text-slate-600">Keep 2 rows</p></div>
        </div>

        <section className="space-y-10 text-gray-700">
          <article className="bg-white p-6 rounded-lg shadow text-gray-700">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center"><BookOpen className="h-6 w-6 text-indigo-600 mr-2"/>1. Recurrence</h2>
            <pre className="bg-slate-900 text-slate-100 p-4 rounded text-sm overflow-x-auto"><code>{`if A[i-1] == B[j-1]:
  dp[i][j] = 1 + dp[i-1][j-1]
else:
  dp[i][j] = max(dp[i-1][j], dp[i][j-1])`}</code></pre>
          </article>
          <article className="bg-white p-6 rounded-lg shadow text-gray-700">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">2. Complexity</h2>
            <ul className="list-disc pl-6 text-sm text-slate-700 space-y-1">
              <li>Time: O(m×n)</li>
              <li>Space: O(m×n) → O(min(m,n)) for length only</li>
              <li>Reconstruction needs full or directional info.</li>
            </ul>
          </article>
          <article className="bg-white p-6 rounded-lg shadow text-gray-700">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Reconstruction Strategy</h2>
            <p className="text-sm text-slate-700 mb-3">Start bottom-right, move diagonally on match, else move to the larger predecessor.</p>
          </article>
          <article className="bg-white p-6 rounded-lg shadow text-gray-700">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Variants</h2>
            <ul className="list-disc pl-6 text-sm text-slate-700 space-y-1">
              <li>Longest Common Substring (reset to 0 on mismatch).</li>
              <li>Shortest Common Supersequence (length m+n-LCS).</li>
              <li>Diff / patch generation (store operations).</li>
            </ul>
          </article>
        </section>

        <div className="mt-16 flex justify-between text-gray-700">
          <Link href="/algorithms/dynamic-programming/lcs/simulation" className="text-indigo-600 hover:text-indigo-700">← Simulation</Link>
          <Link href="/algorithms/dynamic-programming/coin-change" className="text-indigo-600 hover:text-indigo-700">Next: Coin Change →</Link>
        </div>
      </div>
    </div>
  );
}

