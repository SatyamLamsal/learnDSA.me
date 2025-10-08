'use client';
import Link from 'next/link';
import { getAlgorithm, getPrevNext } from '../dcAlgorithms';
import { ArrowLeft, ArrowRight, BookOpen, Play, Search, Sigma, Layers, Gauge, Shield, Info, Binary as BinaryIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const algo = getAlgorithm('binary-search');
const { prev, next } = getPrevNext('binary-search');

export default function BinarySearchOverview() {
  if(!algo) return null;
  return <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 text-gray-700">
  <div className="container mx-auto px-4 py-10 max-w-screen-2xl text-gray-700">
      <Link href="/algorithms/divide-and-conquer" className="inline-flex items-center text-emerald-700 hover:text-emerald-800 mb-8"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>All Divide & Conquer</Link>
      <div className="grid gap-6 text-gray-700">
        {/* Hero */}
        <motion.div initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{duration:0.55}} className="bg-white rounded-2xl shadow-sm p-8 text-gray-700">
          <h1 className="text-5xl font-bold tracking-tight text-slate-800 mb-4 flex items-center gap-3"><Search className="h-10 w-10 text-emerald-600"/>{algo.name}</h1>
          <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">{algo.description} Core idea: compare mid; discard half. Logarithmic growth in comparisons makes it foundational for higher-level searching, decision problems, and answer-space exploration.</p>
        </motion.div>

        {/* Metrics */}
        <motion.div initial={{opacity:0,y:26}} animate={{opacity:1,y:0}} transition={{delay:0.05,duration:0.5}} className="grid sm:grid-cols-3 gap-4 text-gray-700">
          <StatCard label="Time" value={algo.time} />
          <StatCard label="Space" value={algo.space} />
          <StatCard label="Recurrence" value={algo.recurrence||'T(n)=T(n/2)+O(1)'} />
        </motion.div>

        {/* Mechanics */}
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:0.1,duration:0.5}} className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
          <h2 className="text-xl font-semibold text-slate-800 mb-3 flex items-center gap-2"><Layers className="h-5 w-5 text-emerald-600"/> Mechanics</h2>
          <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-600">
            <li>Compute midpoint mid = ⌊(lo+hi)/2⌋.</li>
            <li>If arr[mid] == target: return mid.</li>
            <li>If arr[mid] {'<'} target: lo = mid + 1 else hi = mid - 1.</li>
            <li>Repeat while lo ≤ hi; return -1 if exhausted.</li>
          </ol>
        </motion.div>

        {/* Recurrence & Properties */}
        <motion.div initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{delay:0.15,duration:0.5}} className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
          <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2"><Sigma className="h-5 w-5 text-emerald-600"/> Recurrence & Properties</h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-slate-600">
            <div className="space-y-3 text-gray-700">
              <p><span className="font-semibold text-slate-700">Recurrence:</span> T(n)=T(n/2)+O(1) → O(log n).</p>
              <p><span className="font-semibold text-slate-700">Halving:</span> Search interval size halves each iteration.</p>
              <p><span className="font-semibold text-slate-700">Monotonic Need:</span> Requires sorted/monotonic predicate space.</p>
            </div>
            <div className="grid gap-3 text-xs text-gray-600">
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100 flex gap-2 text-gray-700"><Gauge className="h-4 w-4 text-emerald-600"/><span><b>Cost per step:</b> Single comparison + pointer move.</span></div>
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100 flex gap-2 text-gray-700"><Shield className="h-4 w-4 text-emerald-600"/><span><b>Overflow safe:</b> mid = lo + ((hi - lo) {'>>'} 1).</span></div>
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100 flex gap-2 text-gray-700"><BinaryIcon className="h-4 w-4 text-emerald-600"/><span><b>Variants:</b> lower/upper bound, first true, binary on answer.</span></div>
            </div>
          </div>
        </motion.div>

        {/* Applications & Tradeoffs */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2,duration:0.5}} className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
          <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2"><Info className="h-5 w-5 text-emerald-600"/> Applications & Tradeoffs</h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">
            <ListBlock title="Applications" items={algo.applications} />
            <ListBlock title="Advantages" items={algo.advantages} />
            <ListBlock title="Disadvantages" items={algo.disadvantages} />
          </div>
          <div className="mt-4 p-4 rounded-lg bg-emerald-50 border border-emerald-100 text-xs text-emerald-800">Pattern: {algo.pattern}</div>
        </motion.div>

        {/* Performance Notes */}
        <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:0.25,duration:0.5}} className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
          <h2 className="text-xl font-semibold text-slate-800 mb-3 flex items-center gap-2"><Gauge className="h-5 w-5 text-emerald-600"/> Performance Notes</h2>
          <ul className="list-disc pl-6 text-sm text-slate-600 space-y-1">
            <li>Binary searching the answer space generalizes to optimization via monotonic predicate.</li>
            <li>On modern CPUs branch prediction affects constant factors; interpolation or exponential variants can reduce comparisons for specific distributions.</li>
            <li>Cache-friendly due to logarithmic probes (but not strictly sequential like linear scan).</li>
          </ul>
        </motion.div>

        {/* Actions */}
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.3,duration:0.5}} className="bg-white rounded-2xl shadow-sm p-6 flex flex-wrap gap-4 text-gray-700">
          <Link href="/algorithms/divide-and-conquer/binary-search/theory" className="inline-flex items-center px-6 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700 text-sm font-semibold text-gray-300"><BookOpen className="h-5 w-5 mr-2 text-gray-700"/>Theory</Link>
          <Link href="/algorithms/divide-and-conquer/binary-search/simulation" className="inline-flex items-center px-6 py-2 rounded bg-slate-200 text-slate-700 hover:bg-slate-300 text-sm font-semibold"><Play className="h-5 w-5 mr-2 text-gray-700"/>Simulation</Link>
        </motion.div>

        {/* Navigation */}
        <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:0.35,duration:0.5}} className="flex justify-between items-center text-gray-700">
          {prev? <Link href={`/algorithms/divide-and-conquer/${prev.slug}`} className="inline-flex items-center px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"><ArrowLeft className="h-4 w-4 mr-2 text-gray-700"/>{prev.name}</Link>: <span/>}
          {next? <Link href={`/algorithms/divide-and-conquer/${next.slug}`} className="inline-flex items-center px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700 text-gray-100">{next.name}<ArrowRight className="h-4 w-4 ml-2 text-gray-700"/></Link>: <span/>}
        </motion.div>
      </div>
    </div>
  </div>;
}

function StatCard({label,value}:{label:string;value:string}){
  return <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-gray-700">
    <div className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider">{label}</div>
    <div className="text-sm font-mono mt-1 text-gray-600">{value}</div>
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
