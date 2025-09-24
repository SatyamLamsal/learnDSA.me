"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Coins, Sigma, Layers } from 'lucide-react';

export default function CoinChangeTheoryPage(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="mb-10">
          <Link href="/algorithms/dynamic-programming/coin-change" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2"/>Back to Overview</Link>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Coin Change Theory</h1>
          <p className="text-slate-600 max-w-3xl">Deriving the recurrence, space choices, and exploring variants: minimum coins, counting ways, and order-sensitive formulations.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow text-center"><Coins className="h-10 w-10 text-orange-600 mx-auto mb-2"/><h3 className="font-semibold text-slate-800 mb-1">State</h3><p className="text-xs text-slate-600">dp[a] = min coins to form a</p></div>
          <div className="bg-white p-6 rounded-lg shadow text-center"><Layers className="h-10 w-10 text-green-600 mx-auto mb-2"/><h3 className="font-semibold text-slate-800 mb-1">Transition</h3><p className="text-xs text-slate-600">dp[a] = min(dp[a-c]+1)</p></div>
          <div className="bg-white p-6 rounded-lg shadow text-center"><Sigma className="h-10 w-10 text-purple-600 mx-auto mb-2"/><h3 className="font-semibold text-slate-800 mb-1">Counting Variant</h3><p className="text-xs text-slate-600">Add ways via accumulation</p></div>
        </div>

        <section className="space-y-10">
          <article className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center"><BookOpen className="h-6 w-6 text-orange-600 mr-2"/>1. Minimum Coins Recurrence</h2>
            <pre className="bg-slate-900 text-slate-100 p-4 rounded text-sm overflow-x-auto"><code>{`dp[0] = 0
for a in 1..A:
  dp[a] = INF
  for coin in coins:
    if coin <= a:
      dp[a] = min(dp[a], dp[a-coin] + 1)`}</code></pre>
            <p className="text-sm text-slate-600 mt-4">Use a large sentinel (Infinity) to represent unreachable states. Answer is dp[A] unless still Infinity.</p>
          </article>

          <article className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">2. Complexity</h2>
            <ul className="list-disc pl-6 text-slate-700 text-sm space-y-1">
              <li>Time: O(n × A) where n = number of coin types.</li>
              <li>Space: O(A)</li>
              <li>Optimization: early break when coin &gt; a if coins sorted.</li>
            </ul>
          </article>

          <article className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Counting Ways Variant</h2>
            <pre className="bg-slate-900 text-slate-100 p-4 rounded text-sm overflow-x-auto"><code>{`ways[0] = 1
for coin in coins:
  for a in coin..A:
    ways[a] += ways[a-coin]`}</code></pre>
            <p className="text-sm text-slate-600 mt-4">Iterating coins outermost prevents counting permutations multiple times (combinations). Swap loop order (amount outer, coins inner) to count ordered sequences.</p>
          </article>

          <article className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Edge Cases & Notes</h2>
            <ul className="list-disc pl-6 text-slate-700 text-sm space-y-1">
              <li>Duplicate denominations: remove or ignore (no benefit).</li>
              <li>Zero or negative coins: validate input.</li>
              <li>Large target: consider pruning unreachable by gcd of coins.</li>
              <li>When greedy (like canonical US coins) works, DP still generalizes.</li>
            </ul>
          </article>
        </section>

        <div className="mt-16 flex justify-between">
          <Link href="/algorithms/dynamic-programming/coin-change/simulation" className="text-orange-600 hover:text-orange-700">← Simulation</Link>
          <Link href="/algorithms/dynamic-programming/lis" className="text-orange-600 hover:text-orange-700">Next: LIS →</Link>
        </div>
      </div>
    </div>
  );
}
