"use client";
import Link from 'next/link';
import { getAlgorithm, getPrevNext } from '../dcAlgorithms';
import { ArrowLeft, ArrowRight, SplitSquareHorizontal, Calculator, Layers, Activity, Sigma, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const _algo = getAlgorithm('karatsuba');
const { prev, next } = getPrevNext('karatsuba');

export default function KaratsubaOverview(){
  return <div className="min-h-screen bg-gradient-to-br from-lime-50 to-green-50 text-gray-700">
    <div className="container mx-auto px-4 py-16 max-w-7xl text-gray-700">
      {/* Hero */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55}} className="mb-14 text-gray-700">
        <Link href="/algorithms/divide-and-conquer" className="inline-flex items-center text-lime-600 hover:text-lime-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>All Divide & Conquer</Link>
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-800 mb-5">Karatsuba Multiplication</h1>
        <p className="text-xl text-slate-600 max-w-4xl leading-relaxed">Sub-quadratic integer multiplication using three recursive multiplications instead of four via clever algebraic rearrangement.</p>
      </motion.div>

      {/* Metrics */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.05}} className="grid md:grid-cols-3 gap-8 mb-16 text-gray-700">
        <MetricCard title="Time" accent="bg-lime-100" badge="O(n^{1.585})" detail="T(n)=3T(n/2)+O(n)" icon={<Activity className="h-5 w-5 text-lime-600"/>} />
        <MetricCard title="Space" accent="bg-green-100" badge="O(n)" detail="Recursion + temps" icon={<Layers className="h-5 w-5 text-green-600"/>} />
        <MetricCard title="Pattern" accent="bg-emerald-100" badge="Split-Recombine" detail="Reduce 4 to 3 products" icon={<SplitSquareHorizontal className="h-5 w-5 text-emerald-600"/>} />
      </motion.div>

      {/* Mechanics */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.1}} className="grid lg:grid-cols-3 gap-10 mb-20 text-gray-700">
        <Feature icon={<SplitSquareHorizontal className="h-6 w-6 text-gray-700"/>} title="Digit Splitting" color="bg-lime-600">Split operands into high and low halves around midpoint digit length m.</Feature>
        <Feature icon={<Calculator className="h-6 w-6 text-gray-700"/>} title="Three Products" color="bg-green-600">Compute z2 = x1*y1, z0 = x0*y0, and mid via (x1+x0)(y1+y0)-z2-z0.</Feature>
        <Feature icon={<Layers className="h-6 w-6 text-gray-700"/>} title="Reconstruction" color="bg-emerald-600">Assemble: z2 * B^(2m) + z1 * B^m + z0 with base-power shifts.</Feature>
      </motion.div>

      {/* Use + Recurrence */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.15}} className="grid lg:grid-cols-2 gap-12 mb-20 text-gray-700">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-gray-700">
          <h2 className="text-3xl font-bold text-slate-800 mb-6">Use Cases</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm text-slate-700">
            <li>Big integer arithmetic (crypto, number theory).</li>
            <li>Arbitrary precision (bignum) libraries.</li>
            <li>Intermediate sizes before FFT methods dominate.</li>
          </ul>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 text-gray-700">
          <h2 className="text-3xl font-bold text-slate-800 mb-6">Recurrence</h2>
          <p className="font-mono text-lime-700 text-sm mb-2">T(n) = 3T(n/2) + O(n)</p>
          <p className="text-xs text-slate-600">Master Theorem =&gt; n^(log2 3) ~ n^1.585. Break-even vs classical occurs at moderate digit lengths depending on constants.</p>
        </div>
      </motion.div>

      {/* Performance Notes */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.2}} className="bg-white rounded-2xl shadow-xl p-8 mb-20 text-gray-700">
        <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3"><Info className="h-6 w-6 text-gray-700"/> Performance Notes</h2>
        <ul className="list-disc pl-6 space-y-2 text-sm text-slate-700">
          <li>Threshold hybrid: switch to classical O(n^2) below small n to reduce overhead.</li>
          <li>Add/subtract cost linear; memory reuse lowers allocations in optimized library versions.</li>
          <li>Stepping stone to Toom-Cook splits and FFT-based multiplication (lower exponents).</li>
        </ul>
      </motion.div>

      {/* Actions */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.55, delay:0.25}} className="flex flex-wrap gap-5 mb-14 text-gray-700">
        <Link href="/algorithms/divide-and-conquer/karatsuba/theory" className="px-7 py-3.5 rounded-xl bg-lime-600 hover:bg-lime-700 text-white text-sm font-semibold shadow text-gray-300">Deep Theory</Link>
        <Link href="/algorithms/divide-and-conquer/karatsuba/simulation" className="px-7 py-3.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-semibold shadow text-gray-300">Interactive Simulation</Link>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between items-center text-gray-700">
        {prev? <Link href={`/algorithms/divide-and-conquer/${prev.slug}`} className="inline-flex items-center px-5 py-2.5 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 text-xs font-semibold"><ArrowLeft className="h-4 w-4 mr-2 text-gray-700"/>{prev.name}</Link>: <span/>}
        {next? <Link href={`/algorithms/divide-and-conquer/${next.slug}`} className="inline-flex items-center px-5 py-2.5 rounded-md bg-lime-600 text-white hover:bg-lime-700 text-xs font-semibold text-gray-300">{next.name}<ArrowRight className="h-4 w-4 ml-2 text-gray-700"/></Link>: <span/>}
      </div>
    </div>
  </div>;
}

function MetricCard({title,badge,detail,icon,accent}:{title:string; badge:string; detail:string; icon:React.ReactNode; accent:string;}){
  return <div className={`rounded-2xl shadow-xl p-6 border border-lime-200 relative overflow-hidden ${accent}`}>
    <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-white to-transparent text-gray-700" />
    <div className="flex items-center justify-between mb-5 text-gray-700">
      <h3 className="text-sm font-semibold tracking-wide uppercase text-slate-700">{title}</h3>
      {icon}
    </div>
    <div className="text-lg font-mono text-slate-800 mb-1">{badge}</div>
    <div className="text-[11px] text-slate-600">{detail}</div>
  </div>;
}
function Feature({icon,title,children,color}:{icon:React.ReactNode; title:string; children:React.ReactNode; color:string;}){
  return <div className="bg-white/70 backdrop-blur border border-lime-200 rounded-xl p-4 flex flex-col shadow-sm text-gray-700">
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white mb-3 ${color}`}>{icon}</div>
    <h3 className="font-semibold text-slate-800 mb-1 text-sm">{title}</h3>
    <p className="text-xs text-slate-600 leading-relaxed">{children}</p>
  </div>;
}
