"use client";
import Link from 'next/link';
import { getAlgorithm, getPrevNext } from '../dcAlgorithms';
import { ArrowLeft, ArrowRight, Info, Target, Layers, Activity, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const algo = getAlgorithm('median-of-medians');
const { prev, next } = getPrevNext('median-of-medians');

export default function MedianOfMediansOverview(){
  return <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      {/* Hero */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55}} className="mb-14">
        <Link href="/algorithms/divide-and-conquer" className="inline-flex items-center text-rose-600 hover:text-rose-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2"/>All Divide & Conquer</Link>
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-800 mb-5 flex items-center gap-3"><Target className="h-10 w-10 text-rose-600"/>{algo?.name}</h1>
        <p className="text-xl text-slate-600 max-w-4xl leading-relaxed">Deterministic selection producing a worst-case linear pivot quality by recursively selecting the median of group medians.</p>
      </motion.div>

      {/* Metrics */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.05}} className="grid md:grid-cols-3 gap-8 mb-16">
        <MetricCard label="Goal" value="k-th smallest" note="Selection target" />
        <MetricCard label="Worst-Case" value="O(n)" note="T(n)=T(n/5)+T(7n/10)+O(n)" />
        <MetricCard label="Discard" value=">=30%" note="Each iteration min shrink" />
      </motion.div>

      {/* Stages */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.1}} className="bg-white rounded-2xl shadow-xl p-8 mb-16">
        <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3"><Activity className="h-6 w-6 text-rose-600"/> Key Stages</h2>
        <ol className="list-decimal pl-6 space-y-2 text-sm text-slate-700">
          <li>Group elements into blocks of 5.</li>
          <li>Sort each group and extract its median.</li>
          <li>Select the median of these medians (pivot).</li>
          <li>Partition original array by pivot.</li>
          <li>Recurse only into side containing index k.</li>
        </ol>
      </motion.div>

      {/* Guarantee */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.15}} className="grid lg:grid-cols-2 gap-12 mb-20">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3"><Shield className="h-6 w-6 text-rose-600"/> Guarantee Logic</h2>
          <p className="text-sm text-slate-700 mb-4">At least half of group medians are &gt;= pivot and each such median is &gt;= two elements in its group. Similarly for &lt;= pivot. This yields &gt;= 3n/10 elements eliminated every partition.</p>
          <p className="text-xs text-slate-500">Symmetry and floor/ceiling rounding preserve a linear discard factor.</p>
        </div>
        <div className="bg-rose-50 border border-rose-100 rounded-2xl p-8">
          <h3 className="text-lg font-semibold text-rose-700 mb-4">Why 5?</h3>
          <ul className="list-disc pl-6 text-xs text-rose-800 space-y-2">
            <li>Smaller groups reduce discard percentage.</li>
            <li>Larger groups increase sorting overhead.</li>
            <li>Size 5 balances pivot quality and constant factors.</li>
          </ul>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.2}} className="flex flex-wrap gap-6 mb-16">
        <Link href="/algorithms/divide-and-conquer/median-of-medians/theory" className="px-7 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold shadow">View Theory</Link>
        <Link href="/algorithms/divide-and-conquer/median-of-medians/simulation" className="px-7 py-3.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-sm font-semibold shadow">Run Simulation</Link>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        {prev? <Link href={`/algorithms/divide-and-conquer/${prev.slug}`} className="inline-flex items-center px-5 py-2.5 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 text-xs font-semibold"><ArrowLeft className="h-4 w-4 mr-2"/>{prev.name}</Link>: <span/>}
        {next? <Link href={`/algorithms/divide-and-conquer/${next.slug}`} className="inline-flex items-center px-5 py-2.5 rounded-md bg-rose-600 text-white hover:bg-rose-700 text-xs font-semibold">{next.name}<ArrowRight className="h-4 w-4 ml-2"/></Link>: <span/>}
      </div>
    </div>
  </div>;
}

function MetricCard({label,value,note}:{label:string; value:string; note:string;}){
  return <div className="bg-white rounded-2xl shadow-xl p-6 border border-rose-100 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-rose-50 to-transparent opacity-60" />
    <div className="relative">
      <div className="text-xs font-semibold tracking-wide uppercase text-rose-600 mb-2">{label}</div>
      <div className="text-lg font-mono text-slate-800 mb-1">{value}</div>
      <div className="text-[11px] text-slate-600">{note}</div>
    </div>
  </div>;
}
