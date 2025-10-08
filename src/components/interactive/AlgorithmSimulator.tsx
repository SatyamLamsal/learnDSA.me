"use client";
import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, RefreshCw, Link as LinkIcon, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Algo = 'reverse' | 'cycle';

interface SimNode {
  id: number;
  value: number;
}

interface StepState {
  description: string;
  highlight: number[]; // node ids
  extra?: string;
}

const reverseNodes: SimNode[] = [
  { id: 1, value: 10 },
  { id: 2, value: 20 },
  { id: 3, value: 30 },
  { id: 4, value: 40 }
];

// Precomputed step states for reverse simulation
const reverseSteps: StepState[] = [
  { description: 'Initialize prev = null, curr = head (10)', highlight: [1], extra: 'prev=null' },
  { description: 'Store next (20)', highlight: [1,2], extra: 'next=20' },
  { description: 'Reverse pointer: 10.next -> null', highlight: [1], extra: 'link reversed' },
  { description: 'Advance prev=10, curr=20', highlight: [2], extra: 'prev=10' },
  { description: 'Store next (30)', highlight: [2,3], extra: 'next=30' },
  { description: 'Reverse pointer: 20.next -> 10', highlight: [1,2], extra: '20->10' },
  { description: 'Advance prev=20, curr=30', highlight: [3], extra: 'prev=20' },
  { description: 'Continue process for remaining nodes', highlight: [3,4], extra: 'loop' },
  { description: 'Final head = prev (40)', highlight: [4], extra: 'done' }
];

// For cycle detection (Floyd's algorithm)
const cycleNodes: SimNode[] = [
  { id: 1, value: 1 },
  { id: 2, value: 2 },
  { id: 3, value: 3 },
  { id: 4, value: 4 },
  { id: 5, value: 5 }
];

const cycleSteps: StepState[] = [
  { description: 'Initialize slow=head (1), fast=head (1)', highlight: [1] },
  { description: 'Move slow →2, fast →3', highlight: [2,3] },
  { description: 'Move slow →3, fast →5', highlight: [3,5] },
  { description: 'Move slow →4, fast loops to →2', highlight: [4,2], extra: 'cycle jump' },
  { description: 'Move slow →5, fast →4', highlight: [5,4] },
  { description: 'Move slow →(loop to 2), fast →(loop to 2) → meet', highlight: [2], extra: 'meeting point' },
];

interface AlgorithmSimulatorProps {
  initial?: Algo;
}

export const AlgorithmSimulator: React.FC<AlgorithmSimulatorProps> = ({ initial='reverse' }) => {
  const [algo, setAlgo] = useState<Algo>(initial);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1400); // ms

  const steps = algo === 'reverse' ? reverseSteps : cycleSteps;
  const max = steps.length - 1;

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => {
      setStep(s => (s >= max ? 0 : s + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [playing, step, speed, max]);

  const reset = () => { setStep(0); setPlaying(false); };
  const toggle = () => setPlaying(p => !p);
  const next = () => setStep(s => Math.min(max, s + 1));
  const prev = () => setStep(s => Math.max(0, s - 1));

  const isHighlighted = (id: number) => steps[step].highlight.includes(id);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex gap-2">
          <button onClick={() => { setAlgo('reverse'); reset(); }} className={`px-4 py-2 rounded text-xs font-medium border ${algo==='reverse'?'bg-orange-600 text-white border-orange-600':'bg-white border-gray-300 hover:border-orange-400'}`}>Reverse List</button>
          <button onClick={() => { setAlgo('cycle'); reset(); }} className={`px-4 py-2 rounded text-xs font-medium border ${algo==='cycle'?'bg-purple-600 text-white border-purple-600':'bg-white border-gray-300 hover:border-purple-400'}`}>Cycle Detection</button>
        </div>
        <div className="flex gap-2">
          <button onClick={prev} disabled={step===0} className="px-2 py-2 text-xs bg-gray-100 rounded disabled:opacity-40">◀</button>
          <button onClick={toggle} className={`px-3 py-2 text-xs rounded flex items-center gap-1 ${playing?'bg-red-600 text-white':'bg-green-600 text-white'}`}>{playing ? <Pause className="w-3 h-3"/> : <Play className="w-3 h-3"/>}{playing?'Pause':'Play'}</button>
          <button onClick={next} disabled={step===max} className="px-2 py-2 text-xs bg-gray-100 rounded disabled:opacity-40">▶</button>
          <button onClick={reset} className="px-2 py-2 text-xs bg-gray-200 rounded"><RotateCcw className="w-3 h-3"/></button>
        </div>
        <div className="flex items-center gap-2 text-xs ml-2">
          <span>Speed</span>
          <input type="range" min={400} max={2400} step={200} value={speed} onChange={e=>setSpeed(Number(e.target.value))} />
        </div>
      </div>

      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2 text-sm font-medium text-indigo-700">
          {algo==='reverse'?<RefreshCw className="w-4 h-4"/>:<Activity className="w-4 h-4"/>}
          <span>{steps[step].description}</span>
          {steps[step].extra && <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">{steps[step].extra}</span>}
        </div>
        {/* Visualization */}
        <div className="flex items-center flex-wrap gap-4">
          <span className="text-xs px-2 py-1 bg-indigo-50 text-indigo-600 rounded border">HEAD</span>
          <AnimatePresence>
            {(algo==='reverse'? reverseNodes : cycleNodes).map((node, idx, arr) => (
              <motion.div
                key={node.id + '-' + algo}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.35 }}
                className={`relative border rounded-lg px-4 py-3 min-w-[70px] text-center shadow-sm ${isHighlighted(node.id) ? 'bg-yellow-200 border-yellow-400' : 'bg-gray-50 border-gray-300'}`}
              >
                <div className="text-sm font-semibold text-gray-800">{node.value}</div>
                <div className="text-[10px] text-gray-500 font-mono">id:{node.id}</div>
                {/* Pointer arrows */}
                {idx < arr.length - 1 && (
                  <div className="absolute -right-5 top-1/2 -translate-y-1/2 text-indigo-500">
                    →
                  </div>
                )}
                {algo==='reverse' && step >= 2 && step < reverseSteps.length -1 && idx === 0 && (
                  <div className="absolute -left-10 top-1/2 -translate-y-1/2 text-green-600 text-xs">null</div>
                )}
                {algo==='cycle' && idx === arr.length -1 && (
                  <div className="absolute -right-10 top-1/2 -translate-y-1/2 text-purple-500 flex items-center gap-1 text-xs">
                    <LinkIcon className="w-3 h-3" /> loop
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="mt-4 text-xs text-gray-500">
          {algo==='reverse' ? 'Demonstrating iterative in-place reversal using three-pointer technique.' : 'Demonstrating Floyd\'s Tortoise & Hare cycle detection pattern.'}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 text-xs">
        <div className="p-4 bg-indigo-50 rounded border border-indigo-200">
          <h5 className="font-semibold mb-2 text-indigo-800">Pseudocode ({algo==='reverse'?'Reverse':'Cycle Detection'})</h5>
          <pre className="whitespace-pre-wrap font-mono text-[11px] text-gray-700">
{algo==='reverse' ? `prev = null
curr = head
while curr != null:
  next = curr.next
  curr.next = prev
  prev = curr
  curr = next
head = prev` : `slow = head
fast = head
while fast and fast.next:
  slow = slow.next
  fast = fast.next.next
  if slow == fast:
    return true
return false`}
          </pre>
        </div>
        <div className="p-4 bg-white rounded border shadow-sm">
          <h5 className="font-semibold mb-2 text-gray-800">Key Insights</h5>
          <ul className="space-y-1 text-gray-600">
            {algo==='reverse' ? (
              <>
                <li>Reversal is O(n) time, O(1) extra space.</li>
                <li>Order of pointer re-assignment prevents loss of remaining list.</li>
                <li>Head update happens only once at end.</li>
              </>
            ) : (
              <>
                <li>Fast moves 2×; if loop exists they meet.</li>
                <li>Time: O(n), Space: O(1) vs hash set method.</li>
                <li>Meeting does not directly give entry point (extra phase needed).</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
