'use client';
import Link from 'next/link';
import { getAlgorithm, getPrevNext } from '../dcAlgorithms';
import { ArrowLeft, ArrowRight, Brain, BarChart2, Layers, Sigma, Activity, Zap, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const algo = getAlgorithm('max-subarray');
const { prev, next } = getPrevNext('max-subarray');

export default function MaxSubarrayOverview(){
  return <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
  <div className="container mx-auto px-4 py-10 max-w-7xl">
      <Link href="/algorithms/divide-and-conquer" className="inline-flex items-center text-amber-700 hover:text-amber-800 mb-8"><ArrowLeft className="h-5 w-5 mr-2"/>All Divide & Conquer</Link>
      <div className="grid gap-6">
        {/* Hero */}
        <motion.div initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{duration:0.55}} className="bg-white rounded-2xl shadow-sm p-8">
          <h1 className="text-5xl font-bold tracking-tight text-slate-800 mb-4 flex items-center gap-3"><Brain className="h-10 w-10 text-amber-600"/>{algo?.name}</h1>
          <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">Finds the contiguous subarray with maximum sum. Divide & conquer variant reveals structural decomposition (left, right, crossing) although Kadane achieves linear time. Useful for teaching recurrence construction and crossing computations.</p>
        </motion.div>

        {/* Metrics */}
        <motion.div initial={{opacity:0,y:26}} animate={{opacity:1,y:0}} transition={{delay:0.05,duration:0.5}} className="grid sm:grid-cols-3 gap-4">
          <StatCard label="Time (D&C)" value="O(n log n)" />
          <StatCard label="Time (Kadane)" value="O(n)" />
          <StatCard label="Space" value="O(log n) stack" />
        </motion.div>

        {/* Insight Cards */}
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:0.1,duration:0.5}} className="grid md:grid-cols-3 gap-6">
          <Insight icon={<Layers className="h-5 w-5"/>} title="Structural Cases" color="bg-amber-600">Max subarray lies left, right, or crosses the midpoint.</Insight>
          <Insight icon={<Activity className="h-5 w-5"/>} title="Cross Assembly" color="bg-orange-600">Crossing sum = best suffix left + best prefix right.</Insight>
          <Insight icon={<BarChart2 className="h-5 w-5"/>} title="Contrast" color="bg-yellow-600">Kadane linear; D&C clarifies recurrence and merge-like scan.</Insight>
        </motion.div>

        {/* Recurrence & Intuition */}
        <motion.div initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{delay:0.15,duration:0.5}} className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-3 flex items-center gap-2"><Sigma className="h-5 w-5 text-amber-600"/> Recurrence & Intuition</h2>
          <p className="text-sm text-slate-600 mb-3">Split into halves; solve recursively; compute crossing in linear time by scanning outward from midpoint. Master theorem on T(n)=2T(n/2)+O(n) gives O(n log n).</p>
          <p className="font-mono text-xs bg-slate-900 text-amber-200 px-4 py-2 rounded inline-block">T(n)=2T(n/2)+O(n) → O(n log n)</p>
        </motion.div>

        {/* Applications */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2,duration:0.5}} className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-3 flex items-center gap-2"><Info className="h-5 w-5 text-amber-600"/> Applications</h2>
          <ul className="text-sm text-slate-600 space-y-1 list-disc pl-6">
            <li>Financial time series: peak contiguous gain window.</li>
            <li>Signal/noise analysis: strongest burst detection.</li>
            <li>Dynamic programming primer (transition to Kadane).</li>
            <li>Teaching crossing combination patterns in recurrences.</li>
          </ul>
        </motion.div>

        {/* Actions */}
        <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:0.25,duration:0.5}} className="bg-white rounded-2xl shadow-sm p-6 flex flex-wrap gap-4">
          <Link href="/algorithms/divide-and-conquer/max-subarray/theory" className="px-6 py-2 rounded bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold">Deep Theory</Link>
          <Link href="/algorithms/divide-and-conquer/max-subarray/simulation" className="px-6 py-2 rounded bg-slate-200 text-slate-700 hover:bg-slate-300 text-sm font-semibold">Simulation</Link>
        </motion.div>

        {/* Navigation */}
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:0.3,duration:0.5}} className="flex justify-between items-center">
          {prev? <Link href={`/algorithms/divide-and-conquer/${prev.slug}`} className="inline-flex items-center px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"><ArrowLeft className="h-4 w-4 mr-2"/>{prev.name}</Link>: <span/>}
          {next? <Link href={`/algorithms/divide-and-conquer/${next.slug}`} className="inline-flex items-center px-4 py-2 rounded bg-amber-600 text-white hover:bg-amber-700">{next.name}<ArrowRight className="h-4 w-4 ml-2"/></Link>: <span/>}
        </motion.div>
      </div>
    </div>
  </div>;
}

function StatCard({label,value}:{label:string;value:string}){
  return <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100">
    <div className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider">{label}</div>
    <div className="text-sm font-mono mt-1">{value}</div>
  </div>;
}

function Insight({icon,title,children,color}:{icon:React.ReactNode; title:string; children:React.ReactNode; color:string;}){
  return <div className="bg-white rounded-2xl border border-amber-100 p-5 flex flex-col shadow-sm">
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white mb-3 ${color}`}>{icon}</div>
    <h3 className="font-semibold text-slate-800 mb-1 text-sm">{title}</h3>
    <p className="text-xs text-slate-600 leading-relaxed">{children}</p>
  </div>;
}
