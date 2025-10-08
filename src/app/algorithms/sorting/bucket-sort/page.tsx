"use client";
'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, RotateCw, StepForward, Cpu } from 'lucide-react';

type Phase = 'distribute' | 'sort-buckets' | 'gather' | 'done';

function generateArray(n = 12): number[] {
  // generate floats in [0,1)
  return Array.from({ length: n }, () => Math.round(Math.random() * 100) / 100);
}

function insertionSortStep(bucket: number[], idx: number): number[] {
  // One insertion step to visualize stabilization within bucket
  const arr = [...bucket];
  let i = idx;
  while (i > 0 && arr[i] < arr[i - 1]) {
    const tmp = arr[i];
    arr[i] = arr[i - 1];
    arr[i - 1] = tmp;
    i--;
  }
  return arr;
}

function BucketSortViz() {
  const B = 6; // number of buckets in [0,1)
  const [arr, setArr] = useState<number[]>(() => generateArray());
  const [phase, setPhase] = useState<Phase>('distribute');
  const [i, setI] = useState<number>(0);
  const [buckets, setBuckets] = useState<number[][]>(() => Array.from({ length: B }, () => []));
  const [sortBucketIdx, setSortBucketIdx] = useState<number>(0);
  const [innerIdx, setInnerIdx] = useState<number>(1);

  const reset = () => {
    setArr(generateArray());
    setPhase('distribute');
    setI(0);
    setBuckets(Array.from({ length: B }, () => []));
    setSortBucketIdx(0);
    setInnerIdx(1);
  };

  const bucketIndex = (v: number) => Math.min(B - 1, Math.floor(v * B));

  const nextStep = () => {
    if (phase === 'distribute') {
      if (i < arr.length) {
        const v = arr[i];
        const b = bucketIndex(v);
        setBuckets(prev => {
          const copy = prev.map(x => [...x]);
          copy[b].push(v);
          return copy;
        });
        setI(i + 1);
      } else {
        setPhase('sort-buckets');
        setSortBucketIdx(0);
        setInnerIdx(1);
      }
    } else if (phase === 'sort-buckets') {
      if (sortBucketIdx < B) {
        const bucket = buckets[sortBucketIdx];
        if (bucket.length <= 1 || innerIdx >= bucket.length) {
          setSortBucketIdx(sortBucketIdx + 1);
          setInnerIdx(1);
        } else {
          setBuckets(prev => {
            const copy = prev.map(x => [...x]);
            copy[sortBucketIdx] = insertionSortStep(copy[sortBucketIdx], innerIdx);
            return copy;
          });
          setInnerIdx(innerIdx + 1);
        }
      } else {
        setPhase('gather');
      }
    } else if (phase === 'gather') {
      const flat = ([] as number[]).concat(...buckets);
      setArr(flat);
      setPhase('done');
    }
  };

  const phaseLabel = useMemo(() => {
    switch (phase) {
      case 'distribute':
        return 'Phase: Distribute into buckets based on value in [0,1)';
      case 'sort-buckets':
        return `Phase: Sort each bucket (insertion) — Bucket ${sortBucketIdx + 1}/${B}`;
      case 'gather':
        return 'Phase: Concatenate buckets in order';
      case 'done':
        return 'Done: Array sorted';
    }
  }, [phase, sortBucketIdx]);

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
        <div className="grid grid-cols-6 md:grid-cols-12 gap-2 text-gray-700">
          {arr.map((v, idx) => (
            <motion.div
              key={idx}
              layout
              className={`rounded-md p-2 text-center font-semibold text-sm ${idx === i && phase === 'distribute' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-700'}`}
            >
              {v.toFixed(2)}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Buckets */}
      <div className="space-y-3 text-gray-700">
        <div className="text-sm font-medium text-slate-600">Buckets [0,1) split into {B} ranges</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
          {buckets.map((bucket, bIdx) => (
            <div key={bIdx} className={`border rounded-lg p-3 ${phase === 'sort-buckets' && bIdx === sortBucketIdx ? 'border-blue-400' : 'border-slate-200'}`}>
              <div className="text-xs font-semibold text-slate-500 mb-2">Bucket {bIdx} (≈ [{(bIdx/B).toFixed(2)}, {((bIdx+1)/B).toFixed(2)}))</div>
              <div className="flex flex-wrap gap-2 text-gray-700">
                {bucket.map((v, j) => (
                  <motion.div key={`${bIdx}-${j}`} layout className="px-2 py-1 rounded bg-emerald-100 text-emerald-800 text-sm font-semibold">
                    {v.toFixed(2)}
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

export default function BucketSortPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 text-gray-700">
      <div className="container mx-auto px-4 py-10 text-gray-700">
        <Link href="/algorithms/sorting" className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-6">
          <ArrowLeft className="h-5 w-5 mr-2 text-gray-700" /> Back to Sorting
        </Link>
        <div className="flex items-center gap-3 mb-2 text-gray-700">
          <Cpu className="w-6 h-6 text-teal-600" />
          <h1 className="text-3xl font-bold text-slate-800">Bucket Sort</h1>
        </div>
        <p className="text-slate-600 mb-8 max-w-3xl">Bucket Sort distributes uniformly random numbers into buckets by range, sorts each bucket (often with insertion sort), and concatenates them. It performs well when inputs are evenly distributed.</p>

        <BucketSortViz />

        <div className="grid md:grid-cols-2 gap-6 mt-8 text-gray-700">
          <div className="bg-white rounded-xl shadow p-6 text-gray-700">
            <h2 className="text-xl font-semibold text-slate-800 mb-3">Complexity</h2>
            <ul className="list-disc list-inside text-slate-700">
              <li>Expected Time: O(n + k)</li>
              <li>Worst Time: O(n²) if buckets become imbalanced</li>
              <li>Space: O(n + k)</li>
              <li>Stable: Yes (if in-bucket sort is stable)</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-gray-700">
            <h2 className="text-xl font-semibold text-slate-800 mb-3">Notes</h2>
            <ul className="list-disc list-inside text-slate-700">
              <li>Assumes near-uniform distribution in [0,1)</li>
              <li>Commonly used as a building block for specialized domains</li>
              <li>Number of buckets influences performance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

