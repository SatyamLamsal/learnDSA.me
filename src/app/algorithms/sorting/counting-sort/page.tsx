"use client";
'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, RotateCw, StepForward, Cpu } from 'lucide-react';

type Phase = 'count' | 'prefix' | 'output' | 'done';

function generateArray(n = 10, k = 10): number[] {
  const arr: number[] = [];
  for (let i = 0; i < n; i++) arr.push(Math.floor(Math.random() * k));
  return arr;
}

function CountingSortViz() {
  const K = 10; // value range [0..K-1]
  const [input, setInput] = useState<number[]>(() => generateArray(10, K));
  const [count, setCount] = useState<number[]>(() => Array.from({ length: K }, () => 0));
  const [output, setOutput] = useState<number[]>(() => Array.from({ length: input.length }, () => -1));
  const [phase, setPhase] = useState<Phase>('count');
  const [i, setI] = useState<number>(0);

  const reset = (n?: number) => {
    const next = generateArray(n ?? 10, K);
    setInput(next);
    setCount(Array.from({ length: K }, () => 0));
    setOutput(Array.from({ length: next.length }, () => -1));
    setPhase('count');
    setI(0);
  };

  const nextStep = () => {
    if (phase === 'count') {
      if (i < input.length) {
        const v = input[i];
        setCount(prev => {
          const c = [...prev];
          c[v] += 1;
          return c;
        });
        setI(i + 1);
      } else {
        setPhase('prefix');
        setI(1);
      }
    } else if (phase === 'prefix') {
      if (i < count.length) {
        setCount(prev => {
          const c = [...prev];
          c[i] = c[i] + c[i - 1];
          return c;
        });
        setI(i + 1);
      } else {
        setPhase('output');
        setI(input.length - 1);
      }
    } else if (phase === 'output') {
      if (i >= 0) {
        const v = input[i];
        setCount(prev => {
          const c = [...prev];
          const pos = c[v] - 1;
          c[v] = c[v] - 1;
          setOutput(prevOut => {
            const out = [...prevOut];
            out[pos] = v;
            return out;
          });
          return c;
        });
        setI(i - 1);
      } else {
        setPhase('done');
      }
    }
  };

  const phaseLabel = useMemo(() => {
    switch (phase) {
      case 'count':
        return 'Phase 1: Counting occurrences';
      case 'prefix':
        return 'Phase 2: Prefix sums (cumulative counts)';
      case 'output':
        return 'Phase 3: Build output from right to left (stable)';
      case 'done':
        return 'Done: Array sorted';
    }
  }, [phase]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 text-gray-700">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 text-gray-700">
        <div className="text-slate-700 font-semibold">{phaseLabel}</div>
        <div className="flex gap-2 text-gray-700">
          <button onClick={() => reset()} className="inline-flex items-center gap-2 px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 text-slate-700">
            <RotateCw className="w-4 h-4 text-gray-700" /> Reset
          </button>
          <button onClick={nextStep} disabled={phase === 'done'} className="inline-flex items-center gap-2 px-3 py-2 rounded bg-blue-600 text-white disabled:opacity-50 text-gray-800">
            <StepForward className="w-4 h-4 text-gray-700" /> Step
          </button>
        </div>
      </div>

      {/* Input array */}
      <div className="mb-6 text-gray-700">
        <div className="text-sm font-medium text-slate-600 mb-2">Input</div>
        <div className="grid grid-cols-10 gap-2 text-gray-700">
          {input.map((v, idx) => (
            <motion.div
              key={idx}
              layout
              className={`rounded-md p-3 text-center font-semibold ${idx === i && (phase === 'count' || phase === 'output') ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-700'}`}
            >
              {v}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Count array */}
      <div className="mb-6 text-gray-700">
        <div className="text-sm font-medium text-slate-600 mb-2">Count (size {K})</div>
        <div className="grid grid-cols-10 gap-2 text-gray-700">
          {count.map((c, idx) => (
            <motion.div key={idx} layout className={`rounded-md p-3 text-center font-semibold ${
              (phase === 'count' && i > 0 && input[i - 1] === idx) || (phase === 'prefix' && i === idx) || (phase === 'output' && i >= 0 && input[i] === idx)
                ? 'bg-amber-100 text-amber-800'
                : 'bg-slate-100 text-slate-700'
            }`}>
              {c}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Output array */}
      <div>
        <div className="text-sm font-medium text-slate-600 mb-2">Output</div>
        <div className="grid grid-cols-10 gap-2 text-gray-700">
          {output.map((v, idx) => (
            <motion.div key={idx} layout className={`rounded-md p-3 text-center font-semibold ${v !== -1 ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-400'}`}>
              {v !== -1 ? v : '•'}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CountingSortPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 text-gray-700">
      <div className="container mx-auto px-4 py-10 text-gray-700">
        <Link href="/algorithms/sorting" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="h-5 w-5 mr-2 text-gray-700" /> Back to Sorting
        </Link>
        <div className="flex items-center gap-3 mb-2 text-gray-700">
          <Cpu className="w-6 h-6 text-indigo-600" />
          <h1 className="text-3xl font-bold text-slate-800">Counting Sort</h1>
        </div>
        <p className="text-slate-600 mb-8 max-w-3xl">Counting Sort is a non-comparison integer sorting algorithm. It counts the occurrences of each value in a known range, computes prefix sums, and places each element into its correct position, ensuring stability.</p>

        <CountingSortViz />

        <div className="grid md:grid-cols-2 gap-6 mt-8 text-gray-700">
          <div className="bg-white rounded-xl shadow p-6 text-gray-700">
            <h2 className="text-xl font-semibold text-slate-800 mb-3">Complexity</h2>
            <ul className="list-disc list-inside text-slate-700">
              <li>Time: O(n + k)</li>
              <li>Space: O(n + k)</li>
              <li>Stable: Yes</li>
              <li>In-place: No</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-gray-700">
            <h2 className="text-xl font-semibold text-slate-800 mb-3">When to use</h2>
            <ul className="list-disc list-inside text-slate-700">
              <li>Keys are small integers within a known range</li>
              <li>Stability matters (e.g., radix sort digit pass)</li>
              <li>Range k is not much larger than n</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

