"use client";
import Link from 'next/link';
import { ArrowLeft, BookOpen, Brain, Layers, Zap, Workflow, Timer } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FibonacciTheoryPage(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 text-gray-700">
      <div className="container mx-auto px-4 py-12 text-gray-700">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="mb-10 text-gray-700">
          <Link href="/algorithms/dynamic-programming/fibonacci" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Back to Fibonacci</Link>
          <h1 className="text-4xl font-bold text-slate-800 mb-3">Fibonacci Theory</h1>
          <p className="text-lg text-slate-600 max-w-3xl">How the Fibonacci sequence illustrates the evolution from exponential recursion to optimal O(n) and O(1)-space Dynamic Programming solutions.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12 text-gray-700">
          <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center text-center text-gray-700"><BookOpen className="h-10 w-10 text-blue-600 mb-3"/><h3 className="font-semibold mb-1 text-slate-800">Definition</h3><p className="text-sm text-slate-600">F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2)</p></div>
          <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center text-center text-gray-700"><Timer className="h-10 w-10 text-green-600 mb-3"/><h3 className="font-semibold mb-1 text-slate-800">Goal</h3><p className="text-sm text-slate-600">Compute F(n) efficiently for large n.</p></div>
          <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center text-center text-gray-700"><Brain className="h-10 w-10 text-purple-600 mb-3"/><h3 className="font-semibold mb-1 text-slate-800">DP Insight</h3><p className="text-sm text-slate-600">Reuse overlapping subproblem results.</p></div>
        </div>

        <section className="space-y-10 text-gray-700">
          <article className="bg-white p-6 rounded-lg shadow text-gray-700">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center"><Workflow className="h-6 w-6 text-blue-600 mr-2"/>1. Naïve Recursion (Exponential)</h2>
            <p className="text-slate-700 mb-4">The direct translation of the recurrence leads to a binary recursion tree of size roughly 2^n because we recompute the same values many times.</p>
            <pre className="bg-slate-900 text-slate-100 p-4 rounded text-sm overflow-x-auto"><code>{`function fib(n) {
  if (n <= 1) return n;      // F(0)=0, F(1)=1
  return fib(n-1) + fib(n-2); // Recomputes many subproblems
}`}</code></pre>
            <p className="text-sm text-slate-500">Time: O(2^n) — Space (recursion depth): O(n)</p>
          </article>

          <article className="bg-white p-6 rounded-lg shadow text-gray-700">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center"><Brain className="h-6 w-6 text-green-600 mr-2"/>2. Memoization (Top-Down)</h2>
            <p className="text-slate-700 mb-4">Store previously computed results in a cache. Each distinct subproblem F(k) is computed once.</p>
            <pre className="bg-slate-900 text-slate-100 p-4 rounded text-sm overflow-x-auto"><code>{`function fibMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  memo[n] = fibMemo(n-1, memo) + fibMemo(n-2, memo);
  return memo[n];
}`}</code></pre>
            <p className="text-sm text-slate-500">Time: O(n) — Space: O(n) for recursion + cache.</p>
          </article>

          <article className="bg-white p-6 rounded-lg shadow text-gray-700">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center"><Layers className="h-6 w-6 text-purple-600 mr-2"/>3. Tabulation (Bottom-Up)</h2>
            <p className="text-slate-700 mb-4">Build the solution iteratively from base cases upward. Eliminates recursion overhead.</p>
            <pre className="bg-slate-900 text-slate-100 p-4 rounded text-sm overflow-x-auto"><code>{`function fibTab(n) {
  if (n <= 1) return n;
  const dp = Array(n+1).fill(0);
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2];
  }
  return dp[n];
}`}</code></pre>
            <p className="text-sm text-slate-500">Time: O(n) — Space: O(n)</p>
          </article>

          <article className="bg-white p-6 rounded-lg shadow text-gray-700">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center"><Zap className="h-6 w-6 text-orange-600 mr-2"/>4. Space Optimization (Rolling Variables)</h2>
            <p className="text-slate-700 mb-4">Only the last two values are needed at any point, so we can reduce memory to constant space.</p>
            <pre className="bg-slate-900 text-slate-100 p-4 rounded text-sm overflow-x-auto"><code>{`function fibOpt(n) {
  if (n <= 1) return n;
  let a = 0, b = 1;        // F(0), F(1)
  for (let i = 2; i <= n; i++) {
    const c = a + b;       // F(i)
    a = b;                 // shift window
    b = c;
  }
  return b;                // F(n)
}`}</code></pre>
            <p className="text-sm text-slate-500">Time: O(n) — Space: O(1)</p>
          </article>

          <article className="bg-white p-6 rounded-lg shadow text-gray-700">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center"><Timer className="h-6 w-6 text-teal-600 mr-2"/>5. Complexity & Transitions</h2>
            <ul className="list-disc pl-6 text-slate-700 space-y-1 mb-4">
              <li>Naïve recursion explodes: duplicate subtrees for each call.</li>
              <li>Memoization retains recursion structure but trims duplicates.</li>
              <li>Tabulation linearizes evaluation order explicitly.</li>
              <li>Space optimization observes only two previous states matter.</li>
            </ul>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-4 rounded text-gray-700">
              <p className="text-sm text-slate-700"><strong>Pattern Recognition:</strong> The optimization path (Recursion → Memo → Table → Roll) appears in many DP problems (Fibonacci, Climbing Stairs, Tribonacci variations, etc.).</p>
            </div>
          </article>

          <article className="bg-white p-6 rounded-lg shadow text-gray-700">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center"><BookOpen className="h-6 w-6 text-rose-600 mr-2"/>6. When To Use Which</h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="bg-rose-50 border border-rose-100 p-3 rounded text-gray-700">
                <h3 className="font-semibold text-rose-700 mb-1">Start With</h3>
                <ul className="list-disc pl-5 space-y-1 text-rose-700">
                  <li>Naïve recursion to clarify recurrence</li>
                  <li>Add memo to verify overlapping subproblems</li>
                </ul>
              </div>
              <div className="bg-emerald-50 border border-emerald-100 p-3 rounded text-gray-700">
                <h3 className="font-semibold text-emerald-700 mb-1">Optimize To</h3>
                <ul className="list-disc pl-5 space-y-1 text-emerald-700">
                  <li>Tabulation for predictable order & iteration</li>
                  <li>Space compression if only fixed previous states required</li>
                </ul>
              </div>
            </div>
          </article>
        </section>

        <div className="mt-16 flex justify-between text-gray-700">
          <Link href="/algorithms/dynamic-programming/fibonacci/simulation" className="text-blue-600 hover:text-blue-700">← Simulation</Link>
          <Link href="/algorithms/dynamic-programming/knapsack-01" className="text-blue-600 hover:text-blue-700">Next: 0/1 Knapsack →</Link>
        </div>
      </div>
    </div>
  );
}


