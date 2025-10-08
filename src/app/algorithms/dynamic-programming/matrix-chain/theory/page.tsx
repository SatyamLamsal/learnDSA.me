"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Brackets } from 'lucide-react';

export default function MatrixChainTheoryPage(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-fuchsia-50 text-gray-700">
      <div className="container mx-auto px-4 py-12 text-gray-700">
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="mb-10 text-gray-700">
          <Link href="/algorithms/dynamic-programming/matrix-chain" className="inline-flex items-center text-pink-600 hover:text-pink-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Back to Overview</Link>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Matrix Chain Theory</h1>
          <p className="text-slate-600 max-w-3xl">Interval DP minimizing scalar multiplications by selecting optimal split point.</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6 mb-12 text-gray-700">
          <div className="bg-white p-6 rounded-lg shadow text-center text-gray-700"><Brackets className="h-10 w-10 text-pink-600 mx-auto mb-2"/><h3 className="font-semibold text-slate-800 mb-1">State</h3><p className="text-xs text-slate-600">dp[i][j] cost</p></div>
          <div className="bg-white p-6 rounded-lg shadow text-center text-gray-700"><BookOpen className="h-10 w-10 text-green-600 mx-auto mb-2"/><h3 className="font-semibold text-slate-800 mb-1">Transition</h3><p className="text-xs text-slate-600">min over k</p></div>
          <div className="bg-white p-6 rounded-lg shadow text-center text-gray-700"><BookOpen className="h-10 w-10 text-purple-600 mx-auto mb-2"/><h3 className="font-semibold text-slate-800 mb-1">Reconstruct</h3><p className="text-xs text-slate-600">store k*</p></div>
        </div>
        <section className="space-y-10 text-gray-700">
          <article className="bg-white p-6 rounded-lg shadow text-gray-700">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center"><BookOpen className="h-6 w-6 text-pink-600 mr-2"/>1. Recurrence</h2>
            <pre className="bg-slate-900 text-slate-100 p-4 rounded text-sm overflow-x-auto"><code>{`dp[i][j] = min_{i<=k<j} dp[i][k] + dp[k+1][j] + p[i]*p[k+1]*p[j+1]`}</code></pre>
          </article>
          <article className="bg-white p-6 rounded-lg shadow text-gray-700">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">2. Complexity</h2>
            <ul className="list-disc pl-6 text-sm text-slate-700 space-y-1">
              <li>O(n³) time iterating all lengths and splits.</li>
              <li>O(n²) space for dp + split table.</li>
            </ul>
          </article>
          <article className="bg-white p-6 rounded-lg shadow text-gray-700">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Reconstruction</h2>
            <p className="text-sm text-slate-700 mb-3">Parenthesization built recursively: if split[i][j] = k then result = (solve(i,k))(solve(k+1,j)).</p>
          </article>
          <article className="bg-white p-6 rounded-lg shadow text-gray-700">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Tips & Patterns</h2>
            <ul className="list-disc pl-6 text-sm text-slate-700 space-y-1">
              <li>Typical interval DP loops: length from 2..n; start index i; j = i+length-1.</li>
              <li>Order ensures subintervals already computed when needed.</li>
              <li>Similar structure appears in polygon triangulation and optimal BST.</li>
            </ul>
          </article>
        </section>
        <div className="mt-16 flex justify-between text-gray-700">
            <Link href="/algorithms/dynamic-programming/matrix-chain/simulation" className="text-pink-600 hover:text-pink-700">← Simulation</Link>
            <Link href="/algorithms/dynamic-programming/palindrome-partition" className="text-pink-600 hover:text-pink-700">Next: Palindrome Partition →</Link>
        </div>
      </div>
    </div>
  );
}

