'use client';
import Link from 'next/link';
import { getAlgorithm, getPrevNext } from '../dcAlgorithms';
import { ArrowLeft, ArrowRight, Ruler, Radar, Layers, Clock, Database, BoxSelect } from 'lucide-react';
import { motion } from 'framer-motion';

const _algo = getAlgorithm('closest-pair');
const { prev, next } = getPrevNext('closest-pair');

export default function ClosestPairOverview(){
  return <div className="min-h-screen bg-gradient-to-br from-sky-50 to-cyan-50">
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      {/* Hero */}
  <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="mb-12">
        <Link href="/algorithms/divide-and-conquer" className="inline-flex items-center text-sky-600 hover:text-sky-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2"/>All Divide & Conquer</Link>
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-800 mb-5"><span className="text-sky-600">Closest Pair</span> of Points</h1>
        <p className="text-xl text-slate-600 max-w-4xl leading-relaxed">Divide the plane, solve halves, then examine a narrow y-sorted strip to achieve optimal <span className="font-semibold text-sky-700">O(n log n)</span> versus naive O(n²) brute force.</p>
      </motion.div>

      {/* Metrics */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6, delay:0.05}} className="grid md:grid-cols-3 gap-6 mb-14">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <Clock className="h-12 w-12 text-sky-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-800 mb-2">Time Complexity</h3>
            <div className="text-3xl font-bold text-sky-600">O(n log n)</div>
          <p className="text-sm text-slate-600 mt-2">Strip scan stays linear</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <Database className="h-12 w-12 text-cyan-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-800 mb-2">Space Complexity</h3>
          <div className="text-3xl font-bold text-cyan-600">O(n)</div>
          <p className="text-sm text-slate-600 mt-2">Auxiliary ordering by y</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <BoxSelect className="h-12 w-12 text-teal-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-800 mb-2">Core Pattern</h3>
          <div className="text-xl font-bold text-teal-600">Divide • Recurse • Strip</div>
          <p className="text-sm text-slate-600 mt-2">Constant candidate checks</p>
        </div>
      </motion.div>

      {/* Features */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6, delay:0.1}} className="bg-white rounded-2xl shadow-xl p-8 mb-14">
        <h2 className="text-3xl font-bold text-slate-800 mb-8">Key Mechanics</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Feature icon={<Ruler className="h-5 w-5"/>} title="Geometric Pruning" color="bg-sky-600">Y-sorted strip caps neighbors to 7 candidates.</Feature>
          <Feature icon={<Radar className="h-5 w-5"/>} title="Threshold Delta" color="bg-cyan-600">Best distance delta narrows mid region.</Feature>
          <Feature icon={<Layers className="h-5 w-5"/>} title="Structured Merge" color="bg-teal-600">Merge-by-y keeps strip build linear.</Feature>
        </div>
      </motion.div>

      {/* Applications & Recurrence */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6, delay:0.15}} className="grid lg:grid-cols-2 gap-10 mb-14">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-5">Applications</h2>
          <ul className="list-disc pl-6 space-y-2 text-base text-slate-700">
            <li>GIS spatial preprocessing & proximity indexing.</li>
            <li>Clustering seeding hints.</li>
            <li>Collision detection broad-phase pruning.</li>
            <li>Nearest-neighbor baseline demo.</li>
          </ul>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-5">Recurrence</h2>
          <p className="font-mono text-xl text-sky-700 mb-3">T(n) = 2T(n/2) + O(n)</p>
          <p className="text-base text-slate-700">Master Theorem ⇒ <span className="font-semibold text-sky-700">O(n log n)</span>. Linear strip merge plus constant candidate bound.</p>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6, delay:0.2}} className="flex flex-wrap gap-5 mb-10">
        <Link href="/algorithms/divide-and-conquer/closest-pair/theory" className="inline-flex items-center px-7 py-3.5 bg-sky-600 text-white rounded-lg hover:bg-sky-700 text-sm font-semibold shadow">Deep Theory</Link>
        <Link href="/algorithms/divide-and-conquer/closest-pair/simulation" className="inline-flex items-center px-7 py-3.5 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 text-sm font-semibold shadow">Interactive Simulation</Link>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-4">
        {prev? <Link href={`/algorithms/divide-and-conquer/${prev.slug}`} className="inline-flex items-center px-5 py-2.5 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 text-xs font-semibold"><ArrowLeft className="h-4 w-4 mr-2"/>{prev.name}</Link>: <span/>}
        {next? <Link href={`/algorithms/divide-and-conquer/${next.slug}`} className="inline-flex items-center px-5 py-2.5 rounded-md bg-sky-600 text-white hover:bg-sky-700 text-xs font-semibold">{next.name}<ArrowRight className="h-4 w-4 ml-2"/></Link>: <span/>}
      </div>
    </div>
  </div>;
}

function Feature({icon,title,children,color}:{icon:React.ReactNode; title:string; children:React.ReactNode; color:string;}){
  return <div className="bg-white/70 backdrop-blur border border-sky-200 rounded-xl p-4 flex flex-col shadow-sm">
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white mb-3 ${color}`}>{icon}</div>
    <h3 className="font-semibold text-slate-800 mb-1 text-sm">{title}</h3>
    <p className="text-xs text-slate-600 leading-relaxed">{children}</p>
  </div>;
}
