'use client';
import Link from 'next/link';
import { getAlgorithm, getPrevNext } from '../../dcAlgorithms';
import { ArrowLeft, ArrowRight, Sigma, Layers, Binary as BinaryIcon, Gauge, Zap, Shield } from 'lucide-react';
import PseudocodeBlock from '@/components/PseudocodeBlock';
import { motion } from 'framer-motion';

const algo = getAlgorithm('binary-search');
const { prev, next } = getPrevNext('binary-search');

const pythonCode = `def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        if arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1`;

const tsCode = `export function binarySearch(arr: number[], target: number): number {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid + 1; else hi = mid - 1;
  }
  return -1;
}`;

export default function BinarySearchTheory(){
  if(!algo) return null;
  return <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
  <div className="container mx-auto px-4 py-10 max-w-7xl">
      <Link href="/algorithms/divide-and-conquer/binary-search" className="inline-flex items-center text-emerald-700 hover:text-emerald-800 mb-8"><ArrowLeft className="h-5 w-5 mr-2"/>Overview</Link>
      <div className="grid gap-6">
        {/* Hero */}
        <motion.div initial={{opacity:0,y:26}} animate={{opacity:1,y:0}} transition={{duration:0.55}} className="bg-white rounded-2xl shadow-sm p-8">
          <h1 className="text-5xl font-bold tracking-tight text-slate-800 mb-4 flex items-center gap-3"><BinaryIcon className="h-10 w-10 text-emerald-600"/>{algo.name} Theory</h1>
          <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">Binary Search repeatedly halves the search interval on sorted or monotonic domains. Its tight logarithmic complexity underpins numerous higher-level algorithms and optimization strategies.</p>
        </motion.div>

        {/* Divide Conquer Frame */}
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:0.05,duration:0.5}} className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-3 flex items-center gap-2"><Layers className="h-5 w-5 text-emerald-600"/> Divide / Conquer / Combine</h2>
          <ul className="list-disc pl-6 text-sm text-slate-600 space-y-1">
            <li><b>Divide:</b> Choose midpoint mid of [lo, hi].</li>
            <li><b>Conquer:</b> Recurse (or iterate) into half containing target.</li>
            <li><b>Combine:</b> No work; propagate found index or -1.</li>
          </ul>
        </motion.div>

        {/* Recurrence & Correctness */}
        <motion.div initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{delay:0.1,duration:0.5}} className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2"><Sigma className="h-5 w-5 text-emerald-600"/> Recurrence & Correctness</h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-slate-600">
            <div className="space-y-3">
              <p><span className="font-semibold text-slate-700">Recurrence:</span> T(n) = T(n/2) + O(1) → O(log n).</p>
              <p><span className="font-semibold text-slate-700">Invariant:</span> Target (if present) always lies within [lo, hi].</p>
              <p><span className="font-semibold text-slate-700">Termination:</span> Interval shrinks until found or lo &gt; hi.</p>
            </div>
            <div className="grid gap-3 text-xs">
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100 flex gap-2"><Gauge className="h-4 w-4 text-emerald-600"/><span><b>Comparisons:</b> ⌊log2 n⌋ + O(1) worst.</span></div>
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100 flex gap-2"><Shield className="h-4 w-4 text-emerald-600"/><span><b>Overflow safe mid:</b> lo + ((hi - lo) {'>>'} 1).</span></div>
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100 flex gap-2"><Zap className="h-4 w-4 text-emerald-600"/><span><b>Answer-space use:</b> Search monotonic predicates (e.g., feasibility tests).</span></div>
            </div>
          </div>
        </motion.div>

        {/* Pseudocode */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.15,duration:0.5}} className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-3 flex items-center gap-2"><BinaryIcon className="h-5 w-5 text-emerald-600"/> Recursive Pseudocode</h2>
          <PseudocodeBlock code={algo.pseudocode.join('\n')} />
        </motion.div>

        {/* Iterative Implementations */}
        <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:0.2,duration:0.5}} className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Iterative Implementations</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-slate-700 mb-2 text-sm uppercase tracking-wide">Python</h3>
              <PseudocodeBlock code={pythonCode} languageLabel="Python" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-700 mb-2 text-sm uppercase tracking-wide">TypeScript</h3>
              <PseudocodeBlock code={tsCode} languageLabel="TypeScript" />
            </div>
          </div>
        </motion.div>

        {/* Edge Cases & Variants */}
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.25,duration:0.5}} className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-3">Edge Cases & Variants</h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-slate-600">
            <ul className="list-disc pl-5 space-y-1">
              <li>Empty array → -1.</li>
              <li>Out-of-range target prunes quickly.</li>
              <li>Duplicates: use lower/upper bound modifications.</li>
              <li>Floating / continuous domains: guard infinite loops with epsilon.</li>
            </ul>
            <ul className="list-disc pl-5 space-y-1">
              <li>Binary search on answer (optimize monotonic metric).</li>
              <li>First true predicate (boolean monotonic sequence).</li>
              <li>Ternary search (unimodal functions).</li>
              <li>Exponential + binary (unknown length / unbounded range).</li>
            </ul>
          </div>
        </motion.div>

        {/* Applications */}
        <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:0.3,duration:0.5}} className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-3">Applications & Use Cases</h2>
          <div className="grid md:grid-cols-3 gap-6 text-xs">
            <ListBlock title="Applications" items={algo.applications} />
            <ListBlock title="Use Cases" items={algo.useCases} />
            <ListBlock title="Advantages" items={algo.advantages} />
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.35,duration:0.5}} className="flex justify-between items-center">
          {prev? <Link href={`/algorithms/divide-and-conquer/${prev.slug}/theory`} className="inline-flex items-center px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"><ArrowLeft className="h-4 w-4 mr-2"/>{prev.name}</Link>: <span/>}
          <Link href="/algorithms/divide-and-conquer/binary-search/simulation" className="px-6 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700 text-sm font-semibold">Go to Simulation</Link>
          {next? <Link href={`/algorithms/divide-and-conquer/${next.slug}/theory`} className="inline-flex items-center px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700">{next.name}<ArrowRight className="h-4 w-4 ml-2"/></Link>: <span/>}
        </motion.div>
      </div>
    </div>
  </div>;
}

function ListBlock({title,items}:{title:string;items:string[]}){
  return <div>
    <h3 className="font-semibold text-slate-700 mb-2 text-sm uppercase tracking-wide">{title}</h3>
    <ul className="space-y-1 text-xs text-slate-600 list-disc list-inside">
      {items.map(i=> <li key={i}>{i}</li>)}
    </ul>
  </div>;
}
