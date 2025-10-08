'use client';
import Link from 'next/link';
import { getAlgorithm, getPrevNext } from '../../dcAlgorithms';
import { ArrowLeft, ArrowRight, Info, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import PseudocodeBlock from '@/components/PseudocodeBlock';

const algo = getAlgorithm('closest-pair');
const { prev, next } = getPrevNext('closest-pair');

export default function ClosestPairTheory(){
  return <div className="min-h-screen bg-gradient-to-br from-sky-50 to-cyan-50 text-white">
  <div className="container mx-auto px-4 py-16 max-w-7xl text-gray-700">
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="mb-12 text-gray-700">
        <Link href="/algorithms/divide-and-conquer/closest-pair" className="inline-flex items-center text-sky-600 hover:text-sky-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Overview</Link>
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-800 mb-4"><span className="text-sky-600">Closest Pair</span> Theory</h1>
        <p className="text-xl text-slate-600 max-w-4xl leading-relaxed">Divide-and-conquer refinement of the brute force O(n^2) pairwise check. Spatial ordering + geometric constraints bring time to O(n log n).</p>
      </motion.div>

      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6, delay:0.05}} className="bg-white rounded-2xl shadow-xl p-10 mb-12 text-gray-700">
        <h2 className="text-3xl font-bold text-slate-800 mb-6">Problem</h2>
        <p className="text-lg text-slate-700 leading-relaxed">Given n points in 2D, find the pair with minimum Euclidean distance. A brute force O(n^2) approach compares all pairs; divide and conquer reduces this to O(n log n) by pruning comparisons via geometric constraints in a narrow vertical strip around the splitting line.</p>
      </motion.div>

      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6, delay:0.1}} className="bg-white rounded-2xl shadow-xl p-10 mb-12 text-gray-700">
        <h2 className="text-3xl font-bold text-slate-800 mb-8">Algorithm Phases</h2>
        <ol className="list-decimal pl-8 space-y-4 text-base text-slate-700">
          <li>Sort points by x once (preprocessing).</li>
          <li>Recursively split by median x into left/right subsets.</li>
          <li>Compute best distances dl, dr from halves.</li>
          <li>delta = min(dl, dr); collect strip points with |x - midX| &lt;= delta.</li>
          <li>Sort strip by y and compare each to next ≤ 7 points.</li>
          <li>Answer = min(delta, best strip distance).</li>
        </ol>
      </motion.div>

      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6, delay:0.15}} className="bg-white rounded-2xl shadow-xl p-10 mb-12 text-gray-700">
        <h2 className="text-3xl font-bold text-slate-800 mb-6">Why At Most 7 Comparisons?</h2>
        <p className="text-lg text-slate-700 leading-relaxed">Packing argument: Inside a delta × 2delta rectangle you cannot pack more than 8 points mutually farther than delta apart. After y-sorting, only the next 7 neighbors can beat delta; further points exceed delta vertically.</p>
      </motion.div>

      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6, delay:0.2}} className="bg-white rounded-2xl shadow-xl p-10 mb-12 text-gray-700">
        <h2 className="text-3xl font-bold text-slate-800 mb-6">Pseudocode</h2>
        <PseudocodeBlock code={(algo?.pseudocode||[]).join('\n')} />
      </motion.div>

      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6, delay:0.3}} className="bg-white rounded-2xl shadow-xl p-10 mb-12 text-gray-700">
        <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3"><Lightbulb className="h-7 w-7 text-amber-500"/>Key Insights</h2>
        <ul className="list-disc pl-8 space-y-3 text-lg text-slate-700">
          <li>Spatial ordering drastically reduces candidate pairs.</li>
          <li>Strip stage mirrors merge step conceptually (ordered by y).</li>
          <li>Packing bound enables constant comparisons per point.</li>
          <li>Illustrates multi-axis ordering synergy (x then y).</li>
        </ul>
      </motion.div>

      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6, delay:0.35}} className="bg-white rounded-2xl shadow-xl p-10 mb-12 text-gray-700">
        <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3"><Info className="h-7 w-7 text-sky-600"/>Edge Considerations</h2>
        <ul className="list-disc pl-8 space-y-3 text-lg text-slate-700">
          <li>Duplicate points: distance 0 early exit.</li>
          <li>n ≤ 3 handled by brute force fallback.</li>
          <li>Stable merge-by-y maintains consistent global ordering.</li>
        </ul>
      </motion.div>

      <div className="flex justify-between items-center mt-4 text-gray-700">
        {prev? <Link href={`/algorithms/divide-and-conquer/${prev.slug}/theory`} className="inline-flex items-center px-6 py-3 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm font-semibold"><ArrowLeft className="h-4 w-4 mr-2 text-gray-700"/>{prev.name}</Link>: <span/>}
        <Link href="/algorithms/divide-and-conquer/closest-pair/simulation" className="px-8 py-4 rounded-xl bg-sky-600 text-white hover:bg-sky-700 text-base font-semibold shadow text-gray-100">Simulation</Link>
        {next? <Link href={`/algorithms/divide-and-conquer/${next.slug}/theory`} className="inline-flex items-center px-6 py-3 rounded-lg bg-sky-600 text-white hover:bg-sky-700 text-sm font-semibold text-gray-300">{next.name}<ArrowRight className="h-4 w-4 ml-2 text-gray-700"/></Link>: <span/>}
      </div>
    </div>
  </div>;
}
