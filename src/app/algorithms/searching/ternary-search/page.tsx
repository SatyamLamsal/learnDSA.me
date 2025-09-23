'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, ArrowLeft, ArrowRight, Clock, Cpu, Eye, CheckCircle, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

// Ternary Search works best for unimodal functions; here we demonstrate element search on sorted arrays
// Note: For finding a specific value in a sorted array, binary search is usually faster in practice.

const TernarySearchVisualization = () => {
  const [array, setArray] = useState([1, 2, 4, 4, 7, 9, 12, 15, 17, 18, 21, 24, 27, 30, 32, 35, 40, 42, 45, 50]);
  const [target, setTarget] = useState(24);
  const [left, setLeft] = useState(-1);
  const [right, setRight] = useState(-1);
  const [mid1, setMid1] = useState(-1);
  const [mid2, setMid2] = useState(-1);
  const [foundIndex, setFoundIndex] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);
  const [comparisons, setComparisons] = useState(0);
  type Step = { l: number; r: number; m1: number; m2: number; a1?: number; a2?: number; action: string };
  const [steps, setSteps] = useState<Step[]>([]);

  const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const reset = () => {
    setLeft(-1);
    setRight(-1);
    setMid1(-1);
    setMid2(-1);
    setFoundIndex(-1);
    setIsSearching(false);
    setComparisons(0);
    setSteps([]);
  };

  const generateArray = () => {
    // Generate a sorted array with mild duplicates
    const base = Array.from({ length: 14 }, (_, i) => i * 3 + 1);
    const dup = [7, 12, 24, 30, 40];
    const arr = [...base, ...dup].sort((a, b) => a - b);
    setArray(arr);
    reset();
  };

  const ternarySearch = async () => {
    reset();
    setIsSearching(true);

    let l = 0;
    let r = array.length - 1;
    setLeft(l);
    setRight(r);

    await sleep(400);

  let comps = 0;
  const localSteps: Step[] = [];

    while (l <= r) {
      const third = Math.floor((r - l) / 3);
      const m1 = l + third;
      const m2 = r - third;

      setMid1(m1);
      setMid2(m2);
      comps += 2; // we'll compare target with arr[m1] and arr[m2]
      setComparisons(comps);

      localSteps.push({
        l, r, m1, m2,
        a1: array[m1],
        a2: array[m2],
        action: `Check mid1=${m1} (=${array[m1]}) and mid2=${m2} (=${array[m2]})`
      });
      setSteps([...localSteps]);
      await sleep(700);

      if (array[m1] === target) {
        localSteps.push({ l, r, m1, m2, action: `Found at mid1 (${m1})` });
        setSteps([...localSteps]);
        setFoundIndex(m1);
        break;
      }
      if (array[m2] === target) {
        localSteps.push({ l, r, m1, m2, action: `Found at mid2 (${m2})` });
        setSteps([...localSteps]);
        setFoundIndex(m2);
        break;
      }

      if (target < array[m1]) {
        // Target in left third
        localSteps.push({ l, r, m1, m2, action: `Target < arr[mid1]; search left segment [${l}, ${m1 - 1}]` });
        setSteps([...localSteps]);
        r = m1 - 1;
      } else if (target > array[m2]) {
        // Target in right third
        localSteps.push({ l, r, m1, m2, action: `Target > arr[mid2]; search right segment [${m2 + 1}, ${r}]` });
        setSteps([...localSteps]);
        l = m2 + 1;
      } else {
        // Target in middle third
        localSteps.push({ l, r, m1, m2, action: `Target in middle; search [${m1 + 1}, ${m2 - 1}]` });
        setSteps([...localSteps]);
        l = m1 + 1;
        r = m2 - 1;
      }

      setLeft(l);
      setRight(r);
      await sleep(500);
    }

    setIsSearching(false);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      {/* Controls */}
      <div className="flex flex-wrap gap-3 items-end mb-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Target</label>
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(parseInt(e.target.value) || 0)}
            className="w-24 px-2 py-1 border border-gray-300 rounded"
            disabled={isSearching}
          />
        </div>
        <button
          onClick={ternarySearch}
          disabled={isSearching}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded font-medium disabled:opacity-50"
        >
          {isSearching ? 'Searching...' : 'Start Search'}
        </button>
        <button onClick={reset} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded font-medium">Reset</button>
        <button onClick={generateArray} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium">New Array</button>
        <div className="ml-auto text-sm">
          <div className="font-semibold text-slate-700">Comparisons</div>
          <div className="text-xl font-bold text-orange-600">{comparisons}</div>
        </div>
      </div>

      {/* Array */}
      <div className="space-y-2">
        <div className="flex justify-center items-center gap-1 flex-wrap">
          {array.map((val, idx) => {
            const inRange = left !== -1 && right !== -1 && idx >= left && idx <= right;
            const isM1 = idx === mid1;
            const isM2 = idx === mid2;
            const isFound = idx === foundIndex;

            return (
              <motion.div
                key={idx}
                initial={{ scale: 1 }}
                animate={{
                  scale: isFound ? 1.15 : isM1 || isM2 ? 1.1 : inRange ? 1.03 : 1,
                  backgroundColor: isFound
                    ? '#10b981'
                    : isM1
                    ? '#3b82f6'
                    : isM2
                    ? '#a855f7'
                    : inRange
                    ? '#f3f4f6'
                    : '#ffffff'
                }}
                className={`w-11 h-11 flex items-center justify-center rounded border-2 text-xs font-bold ${
                  isFound
                    ? 'border-emerald-700 text-white'
                    : isM1
                    ? 'border-blue-600 text-blue-700'
                    : isM2
                    ? 'border-purple-600 text-purple-700'
                    : inRange
                    ? 'border-gray-300 text-gray-700'
                    : 'border-gray-200 text-gray-600'
                }`}
              >
                {val}
              </motion.div>
            );
          })}
        </div>
        <div className="flex justify-center items-center gap-1 flex-wrap text-[10px] text-gray-500">
          {array.map((_, idx) => (
            <div key={idx} className="w-11 text-center">[{idx}]</div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4 text-xs">
        <div className="flex items-center"><span className="w-3 h-3 bg-blue-500 rounded mr-2"></span>mid1</div>
        <div className="flex items-center"><span className="w-3 h-3 bg-purple-500 rounded mr-2"></span>mid2</div>
        <div className="flex items-center"><span className="w-3 h-3 bg-gray-300 rounded mr-2"></span>Range</div>
        <div className="flex items-center"><span className="w-3 h-3 bg-emerald-500 rounded mr-2"></span>Found</div>
      </div>

      {/* Steps */}
      {steps.length > 0 && (
        <div className="mt-6 bg-gray-50 p-4 rounded">
          <h4 className="font-semibold text-slate-800 mb-2">Steps</h4>
          <div className="space-y-2 max-h-44 overflow-auto text-sm">
            {steps.map((s, i) => (
              <div key={i} className="text-gray-700">
                <span className="font-medium">Iter {i + 1}:</span>
                <span className="ml-2">[l={s.l}, r={s.r}] m1={s.m1} (={s.a1}), m2={s.m2} (={s.a2})</span>
                <span className="ml-2 text-gray-600">→ {s.action}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Result */}
      <div className="mt-4 text-center">
        {foundIndex !== -1 && (
          <div className="bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded">
            ✅ Found target {target} at index {foundIndex} in {comparisons} comparisons
          </div>
        )}
        {foundIndex === -1 && !isSearching && comparisons > 0 && (
          <div className="bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded">
            ❌ Target {target} not found after {comparisons} comparisons
          </div>
        )}
      </div>
    </div>
  );
};

const CodeExample = () => {
  const [tab, setTab] = useState<'python' | 'java' | 'cpp' | 'javascript'>('python');

  const python = `def ternary_search(arr, target):
    l, r = 0, len(arr) - 1
    comparisons = 0
    while l <= r:
        third = (r - l) // 3
        m1 = l + third
        m2 = r - third
        comparisons += 2
        if arr[m1] == target:
            return m1
        if arr[m2] == target:
            return m2
        if target < arr[m1]:
            r = m1 - 1
        elif target > arr[m2]:
            l = m2 + 1
        else:
            l = m1 + 1
            r = m2 - 1
    return -1

arr = [1, 2, 4, 4, 7, 9, 12, 15, 17, 18, 21, 24, 27, 30, 32, 35, 40, 42, 45, 50]
print(ternary_search(arr, 24))`;

  const java = `public class TernarySearch {
  public static int search(int[] arr, int target) {
    int l = 0, r = arr.length - 1;
    while (l <= r) {
      int third = (r - l) / 3;
      int m1 = l + third;
      int m2 = r - third;
      if (arr[m1] == target) return m1;
      if (arr[m2] == target) return m2;
      if (target < arr[m1]) {
        r = m1 - 1;
      } else if (target > arr[m2]) {
        l = m2 + 1;
      } else {
        l = m1 + 1;
        r = m2 - 1;
      }
    }
    return -1;
  }
}`;

  const cpp = `#include <vector>
int ternary_search(const std::vector<int>& a, int target) {
  int l = 0, r = (int)a.size() - 1;
  while (l <= r) {
    int third = (r - l) / 3;
    int m1 = l + third;
    int m2 = r - third;
    if (a[m1] == target) return m1;
    if (a[m2] == target) return m2;
    if (target < a[m1]) r = m1 - 1;
    else if (target > a[m2]) l = m2 + 1;
    else { l = m1 + 1; r = m2 - 1; }
  }
  return -1;
}`;

  const js = `function ternarySearch(arr, target) {
  let l = 0, r = arr.length - 1;
  while (l <= r) {
    const third = Math.floor((r - l) / 3);
    const m1 = l + third;
    const m2 = r - third;
    if (arr[m1] === target) return m1;
    if (arr[m2] === target) return m2;
    if (target < arr[m1]) r = m1 - 1;
    else if (target > arr[m2]) l = m2 + 1;
    else { l = m1 + 1; r = m2 - 1; }
  }
  return -1;
}
console.log(ternarySearch([1,2,4,4,7,9,12,15,17,18,21,24,27,30,32,35,40,42,45,50], 24));`;

  const code = { python, java, cpp, javascript: js } as const;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold text-slate-800 mb-4">Implementation</h3>
      <div className="flex border-b border-gray-200 mb-4">
        {(['python','java','cpp','javascript'] as const).map((k) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={`px-4 py-2 font-medium text-sm ${tab === k ? 'border-b-2 border-emerald-500 text-emerald-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {k[0].toUpperCase() + k.slice(1)}
          </button>
        ))}
      </div>
      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
        <pre className="text-sm">
          <code>{code[tab]}</code>
        </pre>
      </div>
      <p className="mt-3 text-xs text-gray-500">Note: For locating a specific value in sorted arrays, binary search typically performs fewer comparisons overall.</p>
    </div>
  );
};

export default function TernarySearchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-8">
          <Link href="/algorithms/searching" className="inline-flex items-center text-pink-600 hover:text-pink-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Searching Algorithms
          </Link>
          <h1 className="text-5xl font-bold text-slate-800 mb-4">
            <span className="text-pink-600">Ternary Search</span> Algorithm
          </h1>
          <p className="text-lg text-slate-600 max-w-4xl">
            Ternary search divides the search interval into three parts using two midpoints. It is mostly used to find the extremum (minimum/maximum) of a unimodal function. For searching a specific value in a sorted array, binary search is generally preferred.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Clock className="h-12 w-12 text-pink-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Time Complexity</h3>
            <div className="text-2xl font-bold text-pink-600">O(log n)</div>
            <p className="text-xs text-slate-600 mt-1">Base change doesn&apos;t affect Big-O</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Cpu className="h-12 w-12 text-rose-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Space Complexity</h3>
            <div className="text-2xl font-bold text-rose-600">O(1)</div>
            <p className="text-xs text-slate-600 mt-1">Iterative approach</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Eye className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Comparisons/Iter</h3>
            <div className="text-2xl font-bold text-purple-600">2</div>
            <p className="text-xs text-slate-600 mt-1">Versus 1 for binary search</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-amber-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Practical Note</h3>
            <div className="text-sm font-semibold text-amber-700">Often slower than binary search</div>
          </div>
        </motion.div>

        {/* Visualization */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mb-12">
          <TernarySearchVisualization />
        </motion.div>

        {/* How it works */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="bg-white rounded-lg shadow-lg p-6 mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6 flex items-center"><BookOpen className="h-6 w-6 mr-2 text-pink-600" />How Ternary Search Works</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Steps</h3>
              <ol className="space-y-2 text-slate-700">
                <li>1. Compute two midpoints m1 and m2 splitting [l, r] into thirds</li>
                <li>2. If target equals arr[m1] or arr[m2], return index</li>
                <li>3. If target &lt; arr[m1], search left third [l, m1-1]</li>
                <li>4. Else if target &gt; arr[m2], search right third [m2+1, r]</li>
                <li>5. Otherwise search middle third [m1+1, m2-1]</li>
              </ol>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">When to Use</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• Optimizing unimodal functions (continuous ternary search)</li>
                <li>• Educational comparison with binary search</li>
                <li>• Rarely recommended for exact lookups in arrays</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Code */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="mb-12">
          <CodeExample />
        </motion.div>

        {/* Navigation */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="flex justify-between items-center">
          <Link href="/algorithms/searching/exponential-search" className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Previous: Exponential Search
          </Link>
          <Link href="/algorithms/searching" className="inline-flex items-center px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
            Back to Searching Index
            <ArrowRight className="h-5 w-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
