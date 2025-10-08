"use client";
'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, RotateCw, StepForward, Cpu } from 'lucide-react';

type Phase = 'bucket' | 'gather' | 'advance' | 'done';

function generateArray(n = 10, maxVal = 999): number[] {
  const arr: number[] = [];
  for (let i = 0; i < n; i++) arr.push(Math.floor(Math.random() * (maxVal + 1)));
  return arr;
}

// LSD Radix Sort base-10 visualization using counting per digit
function RadixSortViz() {
  const [arr, setArr] = useState<number[]>(() => generateArray(10, 999));
  const [digit, setDigit] = useState<number>(0); // 0 => units, 1 => tens, 2 => hundreds ...
  const [phase, setPhase] = useState<Phase>('bucket');
  const [i, setI] = useState<number>(0);
  const [buckets, setBuckets] = useState<number[][]>(() => Array.from({ length: 10 }, () => []));

  const maxDigits = useMemo(() => {
    const maxVal = Math.max(...arr);
    return Math.max(1, Math.floor(Math.log10(maxVal || 1)) + 1);
  }, [arr]);

  const reset = () => {
    setArr(generateArray(10, 999));
    setDigit(0);
    setPhase('bucket');
    setI(0);
    setBuckets(Array.from({ length: 10 }, () => []));
  };

  const getDigit = (val: number, d: number) => Math.floor(val / Math.pow(10, d)) % 10;

  const nextStep = () => {
    if (phase === 'bucket') {
      if (i < arr.length) {
        const v = arr[i];
        const d = getDigit(v, digit);
        setBuckets(prev => {
          const copy = prev.map(b => [...b]);
          copy[d].push(v);
          return copy;
        });
        setI(i + 1);
      } else {
        setPhase('gather');
        setI(0);
      }
    } else if (phase === 'gather') {
      // flatten buckets in order
      const flat: number[] = ([] as number[]).concat(...buckets);
      setArr(flat);
      setBuckets(Array.from({ length: 10 }, () => []));
      setPhase('advance');
    } else if (phase === 'advance') {
      if (digit + 1 < maxDigits) {
        setDigit(digit + 1);
        setPhase('bucket');
        setI(0);
      } else {
        setPhase('done');
      }
    }
  };

  const phaseLabel = useMemo(() => {
    switch (phase) {
      case 'bucket':
        return `Phase: Distribute by digit ${digit} (0 = units)`;
      case 'gather':
        return 'Phase: Gather buckets (stable)';
      case 'advance':
        return 'Phase: Advance to next digit';
      case 'done':
        return 'Done: Array sorted';
    }
  }, [phase, digit]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 text-gray-700">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 text-gray-700">
        <div className="text-slate-700 font-semibold">{phaseLabel}</div>
        <div className="flex gap-2 text-gray-700">
          <button onClick={reset} className="inline-flex items-center gap-2 px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 text-slate-700">
            <RotateCw className="w-4 h-4 text-gray-700" /> Reset
          </button>
          <button onClick={nextStep} disabled={phase === 'done'} className="inline-flex items-center gap-2 px-3 py-2 rounded bg-blue-600 text-white disabled:opacity-50 text-gray-800">
            <StepForward className="w-4 h-4 text-gray-700" /> Step
          </button>
        </div>
      </div>

      {/* Current array */}
      <div className="mb-6 text-gray-700">
        <div className="text-sm font-medium text-slate-600 mb-2">Array</div>
        <div className="grid grid-cols-10 gap-2 text-gray-700">
          {arr.map((v, idx) => (
            <motion.div
              key={idx}
              layout
              className={`rounded-md p-3 text-center font-semibold ${idx === i && phase === 'bucket' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-700'}`}
            >
              {v}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Buckets */}
      <div className="space-y-3 text-gray-700">
        <div className="text-sm font-medium text-slate-600">Buckets by digit {digit}</div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-gray-700">
          {buckets.map((bucket, bIdx) => (
            <div key={bIdx} className="border rounded-lg p-3 text-gray-700">
              <div className="text-xs font-semibold text-slate-500 mb-2">Bucket {bIdx}</div>
              <div className="flex flex-wrap gap-2 text-gray-700">
                {bucket.map((v, j) => (
                  <motion.div key={`${bIdx}-${j}`} layout className="px-2 py-1 rounded bg-amber-100 text-amber-800 text-sm font-semibold">
                    {v}
                  </motion.div>
                ))}
                {bucket.length === 0 && <div className="text-slate-400 text-sm">empty</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function RadixSortPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 text-gray-700">
      <div className="container mx-auto px-4 py-10 text-gray-700">
        <Link href="/algorithms/sorting" className="inline-flex items-center text-pink-600 hover:text-pink-700 mb-6">
          <ArrowLeft className="h-5 w-5 mr-2 text-gray-700" /> Back to Sorting
        </Link>
        <div className="flex items-center gap-3 mb-2 text-gray-700">
          <Cpu className="w-6 h-6 text-pink-600" />
          <h1 className="text-3xl font-bold text-slate-800">Radix Sort (LSD)</h1>
        </div>
        <p className="text-slate-600 mb-8 max-w-3xl">Radix Sort processes numbers digit by digit using a stable subroutine (often counting sort) per digit. LSD variant starts from least significant digit, preserving stability across passes.</p>

        <RadixSortViz />

        <div className="grid md:grid-cols-2 gap-6 mt-8 text-gray-700">
          <div className="bg-white rounded-xl shadow p-6 text-gray-700">
            <h2 className="text-xl font-semibold text-slate-800 mb-3">Complexity</h2>
            <ul className="list-disc list-inside text-slate-700">
              <li>Time: O(d × (n + k)) where d = digits, k = base</li>
              <li>Space: O(n + k)</li>
              <li>Stable: Yes (with stable per-digit sort)</li>
              <li>In-place: No</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-gray-700">
            <h2 className="text-xl font-semibold text-slate-800 mb-3">Notes</h2>
            <ul className="list-disc list-inside text-slate-700">
              <li>Works well for integers with bounded digits or fixed-length strings</li>
              <li>Choose base to trade iterations vs bucket space</li>
              <li>Stable distribution is essential</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

