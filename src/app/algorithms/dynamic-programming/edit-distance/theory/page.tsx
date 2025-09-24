"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Replace } from 'lucide-react';

export default function EditDistanceTheoryPage(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="mb-10">
          <Link href="/algorithms/dynamic-programming/edit-distance" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2"/>Back to Overview</Link>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Edit Distance Theory</h1>
          <p className="text-slate-600 max-w-3xl">Classical dynamic programming formulation for measuring similarity between strings.</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow text-center"><Replace className="h-10 w-10 text-indigo-600 mx-auto mb-2"/><h3 className="font-semibold text-slate-800 mb-1">State</h3><p className="text-xs text-slate-600">dp[i][j] distance</p></div>
          <div className="bg-white p-6 rounded-lg shadow text-center"><BookOpen className="h-10 w-10 text-green-600 mx-auto mb-2"/><h3 className="font-semibold text-slate-800 mb-1">Base</h3><p className="text-xs text-slate-600">dp[i][0]=i dp[0][j]=j</p></div>
          <div className="bg-white p-6 rounded-lg shadow text-center"><BookOpen className="h-10 w-10 text-purple-600 mx-auto mb-2"/><h3 className="font-semibold text-slate-800 mb-1">Transitions</h3><p className="text-xs text-slate-600">match/insert/delete/replace</p></div>
        </div>
        <section className="space-y-10">
          <article className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center"><BookOpen className="h-6 w-6 text-indigo-600 mr-2"/>1. Recurrence</h2>
            <pre className="bg-slate-900 text-slate-100 p-4 rounded text-sm overflow-x-auto"><code>{`if a[i-1] == b[j-1]:
  dp[i][j] = dp[i-1][j-1]
else:
  dp[i][j] = 1 + min(dp[i-1][j],   # delete
                      dp[i][j-1],   # insert
                      dp[i-1][j-1]) # replace`}</code></pre>
          </article>
          <article className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">2. Space Optimization</h2>
            <p className="text-sm text-slate-700 mb-3">Only previous row needed → O(min(m,n)) by iterating over shorter string horizontally.</p>
          </article>
          <article className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Variants</h2>
            <ul className="list-disc pl-6 text-sm text-slate-700 space-y-1">
              <li>Damerau-Levenshtein: allow adjacent transposition (check i{'>'}1,j{'>'}1,a[i-1]==b[j-2],a[i-2]==b[j-1]).</li>
              <li>Weighted operations: assign cost to insert/delete/replace.</li>
              <li>Similarity ratios: 1 - distance / max(m,n).</li>
            </ul>
          </article>
        </section>
        <div className="mt-16 flex justify-between">
          <Link href="/algorithms/dynamic-programming/edit-distance/simulation" className="text-indigo-600 hover:text-indigo-700">← Simulation</Link>
          <Link href="/algorithms/dynamic-programming/matrix-chain" className="text-indigo-600 hover:text-indigo-700">Next: Matrix Chain →</Link>
        </div>
      </div>
    </div>
  );
}
