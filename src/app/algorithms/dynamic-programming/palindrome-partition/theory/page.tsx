"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Scissors } from 'lucide-react';

export default function PalindromePartitionTheoryPage(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 text-gray-700">
      <div className="container mx-auto px-4 py-12 text-gray-700">
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="mb-10 text-gray-700">
          <Link href="/algorithms/dynamic-programming/palindrome-partition" className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Back to Overview</Link>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Palindrome Partition Theory</h1>
          <p className="text-slate-600 max-w-3xl">Exploring palindrome preprocessing and minimum cut transitions.</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6 mb-12 text-gray-700">
          <div className="bg-white p-6 rounded-lg shadow text-center text-gray-700"><Scissors className="h-10 w-10 text-teal-600 mx-auto mb-2"/><h3 className="font-semibold text-slate-800 mb-1">State</h3><p className="text-xs text-slate-600">dp[i] cuts</p></div>
          <div className="bg-white p-6 rounded-lg shadow text-center text-gray-700"><BookOpen className="h-10 w-10 text-green-600 mx-auto mb-2"/><h3 className="font-semibold text-slate-800 mb-1">Pal Table</h3><p className="text-xs text-slate-600">pal[i][j] bool</p></div>
          <div className="bg-white p-6 rounded-lg shadow text-center text-gray-700"><BookOpen className="h-10 w-10 text-purple-600 mx-auto mb-2"/><h3 className="font-semibold text-slate-800 mb-1">Transition</h3><p className="text-xs text-slate-600">min over j</p></div>
        </div>
        <section className="space-y-10 text-gray-700">
          <article className="bg-white p-6 rounded-lg shadow text-gray-700">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center"><BookOpen className="h-6 w-6 text-teal-600 mr-2"/>1. Preprocessing</h2>
            <p className="text-sm text-slate-700 mb-3">Fill palindrome table by length; each check O(1) using inner substring.</p>
            <pre className="bg-slate-900 text-slate-100 p-4 rounded text-sm overflow-x-auto"><code>{`for len in 1..n:
  for i in 0..n-len:
    j = i+len-1
    if s[i]==s[j] and (len<=2 or pal[i+1][j-1]):
      pal[i][j] = True`}</code></pre>
          </article>
          <article className="bg-white p-6 rounded-lg shadow text-gray-700">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">2. Recurrence</h2>
            <pre className="bg-slate-900 text-slate-100 p-4 rounded text-sm overflow-x-auto"><code>{`if pal[0][i]:
  dp[i] = 0
else:
  dp[i] = min(dp[j] + 1) for 0<=j<i if pal[j+1][i]`}</code></pre>
          </article>
          <article className="bg-white p-6 rounded-lg shadow text-gray-700">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Complexity</h2>
            <ul className="list-disc pl-6 text-sm text-slate-700 space-y-1">
              <li>O(n²) time / space with table (vs O(n³) naive).</li>
              <li>Space can be reduced using center expansion but code complexity rises.</li>
            </ul>
          </article>
          <article className="bg-white p-6 rounded-lg shadow text-gray-700">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Notes & Variants</h2>
            <ul className="list-disc pl-6 text-sm text-slate-700 space-y-1">
              <li>Return partitions: track predecessor j giving best cut.</li>
              <li>All partitions: backtrack exploring pal substrings (exponential enumeration).</li>
              <li>Manacher can precompute palindrome radii in O(n) for optimization tasks.</li>
            </ul>
          </article>
        </section>
        <div className="mt-16 flex justify-between text-gray-700">
          <Link href="/algorithms/dynamic-programming/palindrome-partition/simulation" className="text-teal-600 hover:text-teal-700">← Simulation</Link>
          <Link href="/algorithms/dynamic-programming/max-subarray" className="text-teal-600 hover:text-teal-700">Next: Maximum Subarray →</Link>
        </div>
      </div>
    </div>
  );
}

