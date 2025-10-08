"use client";
import React from 'react';
import { Brain } from 'lucide-react';

// A lightweight, responsive SVG-based decision flowchart guiding data structure choice
// Focus: Array vs Singly vs Doubly vs Circular vs Advanced Variant
export const LinkedListDecisionFlowchart: React.FC = () => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-start gap-6 min-w-[900px] mx-auto">
        {/* Column: Start */}
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-300 shadow-sm text-center w-44">
            <div className="flex items-center justify-center mb-2"><Brain className="w-5 h-5 text-slate-600" /></div>
            <h4 className="font-semibold text-slate-800 text-sm leading-tight">Start</h4>
            <p className="text-[11px] text-slate-600 mt-1">Need dynamic collection?</p>
          </div>
          <div className="text-xs text-slate-500">If NO → Use Array</div>
        </div>

        {/* Column: Mutation Pattern */}
        <div className="flex flex-col items-center gap-4">
          <Arrow />
          <DecisionBox title="Primary Operations" color="blue">
            <ul className="text-[11px] space-y-1 text-blue-800">
              <li>Mostly head insert/delete?</li>
              <li>Rare middle ops?</li>
            </ul>
          </DecisionBox>
          <SmallHint>If YES → Singly</SmallHint>
          <Connector />
          <DecisionBox title="Need backward traversal?" color="emerald" />
          <SmallHint>If YES → Doubly</SmallHint>
        </div>

        {/* Column: Cyclic Need */}
        <div className="flex flex-col items-center gap-4">
          <Arrow />
            <DecisionBox title="Cyclic iteration (round-robin)?" color="purple" />
            <SmallHint>If YES → Circular (or doubly circular)</SmallHint>
          <Connector />
          <DecisionBox title="Perf concern: cache / search?" color="amber" />
          <SmallHint>If YES → See Advanced</SmallHint>
        </div>

        {/* Column: Advanced Variants */}
        <div className="flex flex-col items-center gap-4">
          <Arrow />
          <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-300 shadow-sm w-48">
            <h4 className="font-semibold text-indigo-800 text-sm mb-2">Advanced Variants</h4>
            <ul className="text-[11px] text-indigo-700 space-y-1">
              <li><span className="font-mono">Skip List</span> → faster search</li>
              <li><span className="font-mono">Unrolled</span> → cache locality</li>
              <li><span className="font-mono">XOR</span> → pointer space</li>
              <li><span className="font-mono">Intrusive</span> → zero alloc</li>
            </ul>
            <p className="text-[10px] text-indigo-600 mt-2">Validate with profiling first.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Arrow: React.FC = () => (
  <div className="w-8 h-8 flex items-center justify-center mt-6">
    <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-slate-400" />
  </div>
);

const Connector: React.FC = () => (
  <div className="w-px h-6 bg-slate-300" />
);

const SmallHint: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="text-[10px] font-medium text-slate-500 tracking-wide">{children}</div>
);

const DecisionBox: React.FC<{ title: string; color: string; children?: React.ReactNode }> = ({ title, color, children }) => {
  const palette: Record<string,string> = {
    blue: 'from-blue-50 to-cyan-50 border-blue-300 text-blue-800',
    emerald: 'from-emerald-50 to-green-50 border-emerald-300 text-emerald-800',
    purple: 'from-purple-50 to-fuchsia-50 border-purple-300 text-purple-800',
    amber: 'from-amber-50 to-yellow-50 border-amber-300 text-amber-800'
  };
  return (
    <div className={`p-4 rounded-xl bg-gradient-to-br ${palette[color]} shadow-sm w-48`}> 
      <h4 className="font-semibold text-sm mb-2 leading-snug">{title}</h4>
      {children}
    </div>
  );
};

export default LinkedListDecisionFlowchart;