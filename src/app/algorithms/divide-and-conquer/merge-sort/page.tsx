'use client';
import Link from 'next/link';
import { getAlgorithm, getPrevNext } from '../dcAlgorithms';
import { ArrowLeft, ArrowRight, Activity, Clock, Database, Shield, Layers, Info, Sigma } from 'lucide-react';
import { motion } from 'framer-motion';

const algo = getAlgorithm('merge-sort');
const { prev, next } = getPrevNext('merge-sort');

function StatCard({icon:Icon,title,value,subtitle,color}:{icon:any; title:string; value:string; subtitle:string; color:string;}){
  return <div className="bg-white rounded-2xl shadow-xl p-7 text-center">
    <Icon className={`h-12 w-12 mx-auto mb-4 ${color}`} />
    <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
    <div className={`text-3xl font-bold ${color}`}>{value}</div>
    <p className="text-sm text-slate-600 mt-2">{subtitle}</p>
  </div>;
}

export default function MergeSortOverview(){
  return <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50">
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      {/* Hero */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55}} className="mb-16">
        <Link href="/algorithms/divide-and-conquer" className="inline-flex items-center text-sky-600 hover:text-sky-700 mb-7"><ArrowLeft className="h-5 w-5 mr-2"/>Back to Divide & Conquer</Link>
  <h1 className="text-5xl font-extrabold tracking-tight text-slate-800 mb-5"><span className="text-sky-600">Merge Sort</span> Overview</h1>
  <p className="text-xl text-slate-600 max-w-5xl leading-relaxed">Stable divide-and-conquer sorting: split in halves until size 1, then perform linear merges level by level. Each element participates in log n merge passes giving deterministic O(n log n) time.</p>
      </motion.div>

      {/* Metrics */}
  <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.05}} className="grid md:grid-cols-4 gap-8 mb-16">
        <StatCard icon={Clock} title="Time" value="O(n log n)" subtitle="All inputs" color="text-sky-600" />
        <StatCard icon={Database} title="Space" value="O(n)" subtitle="Aux buffer" color="text-blue-600" />
        <StatCard icon={Shield} title="Stability" value="Stable" subtitle="Preserves ties" color="text-emerald-600" />
        <StatCard icon={Sigma} title="Recurrence" value="2T(n/2)+n" subtitle="Master: n log n" color="text-fuchsia-600" />
      </motion.div>

      {/* Mechanics / Stages */}
      <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.1}} className="bg-white rounded-2xl shadow-xl p-9 mb-14">
        <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center tracking-tight"><Activity className="h-8 w-8 mr-4 text-sky-600"/>Mechanics</h2>
        <div className="grid lg:grid-cols-2 gap-14">
          <div>
            <h3 className="text-xl font-semibold text-slate-800 mb-5">Stages</h3>
            <ol className="space-y-6 text-slate-700 text-base">
              <li className="flex items-start"><span className="bg-sky-100 text-sky-800 rounded-full w-9 h-9 flex items-center justify-center text-sm font-bold mr-4 mt-0.5">1</span>Divide sequence into two halves recursively</li>
              <li className="flex items-start"><span className="bg-sky-100 text-sky-800 rounded-full w-9 h-9 flex items-center justify-center text-sm font-bold mr-4 mt-0.5">2</span>Reach base single-element segments (already sorted)</li>
              <li className="flex items-start"><span className="bg-sky-100 text-sky-800 rounded-full w-9 h-9 flex items-center justify-center text-sm font-bold mr-4 mt-0.5">3</span>Merge sibling sorted runs via two-pointer scan</li>
              <li className="flex items-start"><span className="bg-sky-100 text-sky-800 rounded-full w-9 h-9 flex items-center justify-center text-sm font-bold mr-4 mt-0.5">4</span>Ascend levels building larger sorted runs until full array</li>
            </ol>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-800 mb-5">Key Characteristics</h3>
            <ul className="space-y-5 text-base">
              <li className="flex items-start"><span className="text-sky-600 mr-3 text-xl leading-none">•</span><span className="text-slate-700">Predictable O(n log n) regardless of input ordering</span></li>
              <li className="flex items-start"><span className="text-sky-600 mr-3 text-xl leading-none">•</span><span className="text-slate-700">Stable: equal keys keep original relative order</span></li>
              <li className="flex items-start"><span className="text-sky-600 mr-3 text-xl leading-none">•</span><span className="text-slate-700">Good for linked lists (can merge in-place with pointers)</span></li>
              <li className="flex items-start"><span className="text-sky-600 mr-3 text-xl leading-none">•</span><span className="text-slate-700">External merge (k-way) scales to large disk datasets</span></li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Recurrence & Guarantee */}
      <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.15}} className="grid lg:grid-cols-2 gap-8 mb-14">
        <div className="bg-white rounded-2xl shadow-xl p-7">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center"><Layers className="h-6 w-6 mr-3 text-sky-600"/>Recurrence</h3>
          <p className="text-slate-700 text-base leading-relaxed mb-4">T(n) = 2T(n/2) + n. Master Theorem (a=2, b=2, f(n)=n) gives T(n) = Θ(n log n). Each of the log n levels performs linear merging over n total elements.</p>
          <div className="text-xs font-mono bg-slate-900 text-sky-100 rounded px-4 py-3">Level work: n + n + ... (log n levels) → n log n</div>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-7">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center"><Shield className="h-6 w-6 mr-3 text-emerald-600"/>Guarantees & Stability</h3>
          <ul className="list-disc pl-5 text-slate-700 space-y-3 text-base mb-5">
            <li>No worst-case degradation (contrast quicksort pivot path)</li>
            <li>Stable ordering keeps secondary key precedence intact</li>
            <li>Deterministic memory footprint ~ n auxiliary</li>
            <li>Parallelizable: independent merges on same level</li>
          </ul>
          <p className="text-sm text-slate-600">Practical tweak: switch to insertion sort on tiny subarrays to reduce overhead; bottom-up variant avoids recursion stack.</p>
        </div>
      </motion.div>

      {/* Notes */}
  <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.2}} className="bg-white rounded-2xl shadow-xl p-9 mb-14">
        <div className="flex gap-6 items-start">
          <Info className="h-8 w-8 text-sky-600 mt-1"/>
          <div className="text-lg text-slate-700 leading-relaxed space-y-6">
            <p><strong className="text-slate-800">Bottom-up strategy:</strong> Iteratively merge runs of size 1,2,4,... eliminating recursion and enabling easy adaptive detection of presorted runs.</p>
            <p><strong className="text-slate-800">Parallelization:</strong> Higher-level splits farm out work to threads; merging can be balanced by splitting large runs at proportional ranks.</p>
          </div>
        </div>
      </motion.div>

      {/* Actions */}
  <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.25}} className="flex flex-wrap gap-5 mb-12">
        <Link href="/algorithms/divide-and-conquer/merge-sort/theory" className="inline-flex items-center px-8 py-4 bg-sky-600 text-white rounded-xl hover:bg-sky-700 text-base font-semibold shadow-md">View Theory</Link>
        <Link href="/algorithms/divide-and-conquer/merge-sort/simulation" className="inline-flex items-center px-8 py-4 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 text-base font-semibold shadow-md">Run Simulation</Link>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-4">
        {prev? <Link href={`/algorithms/divide-and-conquer/${prev.slug}`} className="inline-flex items-center px-5 py-2.5 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 text-xs font-semibold"><ArrowLeft className="h-4 w-4 mr-2"/>{prev.name}</Link>: <span/>}
        {next? <Link href={`/algorithms/divide-and-conquer/${next.slug}`} className="inline-flex items-center px-5 py-2.5 rounded-md bg-sky-600 text-white hover:bg-sky-700 text-xs font-semibold">{next.name}<ArrowRight className="h-4 w-4 ml-2"/></Link>: <span/>}
      </div>
    </div>
  </div>;
}
