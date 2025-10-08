"use client";
import { ModuleLayout } from '@/components/layouts/ModuleLayout';
import { motion } from 'framer-motion';
import { Cpu, Shield, AlertTriangle, Share2, Wrench, ListChecks, ArrowRight, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import { SectionProgressIndicator } from '@/components/progress/SectionProgressIndicator';

const sections = [
  { id: 'memory-internals', name: 'Memory Internals', icon: Cpu },
  { id: 'sentinel-nodes', name: 'Sentinel Nodes', icon: Shield },
  { id: 'size-tail-optimizations', name: 'Tail & Size', icon: Wrench },
  { id: 'pitfalls-debugging', name: 'Pitfalls & Debugging', icon: AlertTriangle },
  { id: 'real-world', name: 'Real-World Uses', icon: Share2 },
  { id: 'alternatives', name: 'Alternatives', icon: BrainCircuit },
];

export default function LinkedListAdvancedPage(){
  return (
    <ModuleLayout
      moduleId="module-4"
      moduleTitle="Module 4: Linked Lists"
      moduleDescription="Advanced internals & engineering trade-offs"
      sections={sections}
      enableScrollSpy
      backUrl="/learning-path/module-4"
      estimatedTime="20 minutes"
      difficulty="Advanced"
      totalSections={sections.length}
      currentSectionIndex={0}
    >
      <motion.div
        initial={{ opacity:0, y:20 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:0.8 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center bg-gray-900 text-white px-6 py-3 rounded-full text-sm font-medium mb-8">
          Advanced • Linked Lists
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-8">
          Beyond The <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-black">Basics</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Deep dive into engineering considerations: memory behavior, design patterns, safety pitfalls, and when to choose—or avoid—linked lists in production systems.
        </p>
      </motion.div>

      {/* Memory Internals */}
      <div id="memory-internals" className="bg-white rounded-2xl p-8 shadow-lg border mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold flex items-center text-gray-900"><Cpu className="w-8 h-8 mr-3 text-indigo-600"/> Memory Internals</h2>
          <SectionProgressIndicator moduleId="linked-lists" sectionId="advanced-memory-internals" />
        </div>
        <div className="grid lg:grid-cols-3 gap-6 mb-8 text-sm text-gray-700">
          <div className="p-5 border rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50">
            <h3 className="font-semibold text-indigo-800 mb-2 text-sm">Allocation Patterns</h3>
            <p className="text-gray-600 text-xs leading-relaxed">Each node is typically a separate heap allocation. This causes pointer chasing & reduced cache line utilization compared to contiguous arrays.</p>
          </div>
          <div className="p-5 border rounded-xl bg-gradient-to-br from-purple-50 to-fuchsia-50">
            <h3 className="font-semibold text-purple-800 mb-2 text-sm">Pooling / Slabs</h3>
            <p className="text-gray-600 text-xs leading-relaxed">Custom allocators (slabs, pools, arenas) batch allocations to reduce fragmentation & allocation latency; trade-off: lifetime coupling and memory spikes.</p>
          </div>
          <div className="p-5 border rounded-xl bg-gradient-to-br from-rose-50 to-pink-50">
            <h3 className="font-semibold text-rose-800 mb-2 text-sm">Cache Miss Impact</h3>
            <p className="text-gray-600 text-xs leading-relaxed">Pointer chasing results in unpredictable next address → CPU prefetcher less effective → higher average memory latency per element processed.</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-8 text-[11px] text-gray-600">
          <div className="p-4 border rounded bg-gray-50">
            <h4 className="font-semibold text-gray-800 mb-2 text-sm">Node Size Model</h4>
            <p>size(node) ≈ data_size + pointer_count * pointer_size (+ allocator metadata)</p>
            <p className="mt-2">In 64-bit systems pointer_size = 8 bytes. Doubly list storing 32-bit int: node ≈ 4 + (2*8) = 20 (+ alignment).</p>
          </div>
          <div className="p-4 border rounded bg-gray-50">
            <h4 className="font-semibold text-gray-800 mb-2 text-sm">Prefetch Optimization</h4>
            <p>Unrolled lists or array-of-nodes blocks increase spatial locality, reducing cache miss penalties in sequential traversals.</p>
          </div>
        </div>
        <div className="text-[11px] text-gray-600 bg-gray-100 border rounded p-4 leading-relaxed">
          <strong className="text-gray-800">Engineering Insight:</strong> Real benchmarks often show contiguous arrays outperform lists for pure traversal by 2–10x due to cache; use lists when structural flexibility outweighs locality cost.
        </div>
      </div>

      {/* Sentinel Nodes */}
      <div id="sentinel-nodes" className="bg-white rounded-2xl p-8 shadow-lg border mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold flex items-center text-gray-900"><Shield className="w-8 h-8 mr-3 text-green-600"/> Sentinel (Dummy) Nodes</h2>
          <SectionProgressIndicator moduleId="linked-lists" sectionId="advanced-sentinel" />
        </div>
        <p className="text-sm text-gray-600 mb-6 max-w-3xl">A sentinel (dummy head or tail) is a non-data placeholder node simplifying insertion & deletion by eliminating separate empty-list or head-special-case branches.</p>
        <div className="grid md:grid-cols-2 gap-6 mb-8 text-xs">
          <div className="p-5 border rounded-lg bg-gradient-to-br from-green-50 to-emerald-50">
            <h3 className="font-semibold text-emerald-800 mb-2 text-sm">Advantages</h3>
            <ul className="list-disc list-inside space-y-1 text-emerald-800">
              <li>Uniform insertion logic</li>
              <li>Cleaner deletion code</li>
              <li>Reduced conditional branches</li>
            </ul>
          </div>
          <div className="p-5 border rounded-lg bg-gradient-to-br from-red-50 to-orange-50">
            <h3 className="font-semibold text-orange-800 mb-2 text-sm">Trade-offs</h3>
            <ul className="list-disc list-inside space-y-1 text-orange-800">
              <li>One extra node allocation</li>
              <li>Must ensure sentinel not exposed externally</li>
              <li>Invariants rely on sentinel presence</li>
            </ul>
          </div>
        </div>
        <pre className="bg-gray-900 text-[11px] text-green-300 p-4 rounded overflow-x-auto mb-4">{`// Dummy head pattern (singly)
class List { 
  constructor(){ this.head = { next: null }; }
  insertFront(v){ const n={val:v,next:this.head.next}; this.head.next=n; }
  deleteFront(){ if(this.head.next) this.head.next=this.head.next.next; }
}`}</pre>
        <div className="text-[11px] text-gray-600 bg-gray-100 border rounded p-4 leading-relaxed">Use sentinels in production when operation volume is high and branch misprediction shows up in profiles; otherwise keep simpler form.</div>
      </div>

      {/* Tail & Size Optimizations */}
      <div id="size-tail-optimizations" className="bg-white rounded-2xl p-8 shadow-lg border mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold flex items-center text-gray-900"><Wrench className="w-8 h-8 mr-3 text-amber-600"/> Tail Pointer & Size Caching</h2>
          <SectionProgressIndicator moduleId="linked-lists" sectionId="advanced-tail-size" />
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-8 text-xs">
          <div className="p-4 border rounded bg-gradient-to-br from-amber-50 to-yellow-50">
            <h3 className="font-semibold text-amber-800 mb-2 text-sm">Tail Pointer</h3>
            <p className="text-gray-600">Maintains O(1) append. Complexity shift: extra update logic in deletions affecting tail.</p>
          </div>
          <div className="p-4 border rounded bg-gradient-to-br from-blue-50 to-cyan-50">
            <h3 className="font-semibold text-blue-800 mb-2 text-sm">Size Counter</h3>
            <p className="text-gray-600">Avoids O(n) length traversal. Must update on every insert/delete to maintain invariant.</p>
          </div>
          <div className="p-4 border rounded bg-gradient-to-br from-slate-50 to-gray-100">
            <h3 className="font-semibold text-gray-700 mb-2 text-sm">Invariant Discipline</h3>
            <p className="text-gray-600">Use internal helpers to mutate (append/remove) so tail & size remain consistent.</p>
          </div>
        </div>
        <pre className="bg-gray-900 text-[11px] text-green-300 p-4 rounded overflow-x-auto mb-4">{`class List {
  constructor(){ this.head=null; this.tail=null; this.size=0; }
  push(v){ const n={val:v,next:null}; if(!this.head){ this.head=this.tail=n; } else { this.tail.next=n; this.tail=n; } this.size++; }
  popFront(){ if(!this.head) return; this.head=this.head.next; if(!this.head) this.tail=null; this.size--; }
}`}</pre>
        <div className="text-[11px] text-gray-600 bg-gray-100 border rounded p-4 leading-relaxed">Add these only when profiling reveals repeated tail appends or length checks dominate; premature complexity reduces clarity.</div>
      </div>

      {/* Pitfalls & Debugging */}
      <div id="pitfalls-debugging" className="bg-white rounded-2xl p-8 shadow-lg border mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold flex items-center text-gray-900"><AlertTriangle className="w-8 h-8 mr-3 text-red-600"/> Pitfalls & Debugging Techniques</h2>
          <SectionProgressIndicator moduleId="linked-lists" sectionId="advanced-pitfalls" />
        </div>
        <div className="grid lg:grid-cols-2 gap-6 mb-8 text-xs">
          <div className="p-5 border rounded bg-gradient-to-br from-red-50 to-orange-50">
            <h3 className="font-semibold text-red-800 mb-2 text-sm">Common Pitfalls</h3>
            <ul className="list-disc list-inside space-y-1 text-red-800">
              <li>Losing head → memory leak</li>
              <li>Forgetting to update tail on removal</li>
              <li>Infinite loop in circular traversal</li>
              <li>Double free (manual memory)</li>
            </ul>
          </div>
          <div className="p-5 border rounded bg-gradient-to-br from-indigo-50 to-purple-50">
            <h3 className="font-semibold text-indigo-800 mb-2 text-sm">Debugging Strategies</h3>
            <ul className="list-disc list-inside space-y-1 text-indigo-800">
              <li>Add slow/fast assert pass post-mutation</li>
              <li>Log node addresses (lower-level langs)</li>
              <li>Serialize path snapshot for diffing</li>
              <li>Use valgrind / ASan for leaks</li>
            </ul>
          </div>
        </div>
        <div className="text-[11px] text-gray-600 bg-gray-100 border rounded p-4 leading-relaxed">Adopt defensive coding: wrap pointer mutations, centralize node release logic, and add optional debug builds with integrity scans.</div>
      </div>

      {/* Real World Uses */}
      <div id="real-world" className="bg-white rounded-2xl p-8 shadow-lg border mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold flex items-center text-gray-900"><Share2 className="w-8 h-8 mr-3 text-teal-600"/> Real-World Use Cases</h2>
          <SectionProgressIndicator moduleId="linked-lists" sectionId="advanced-real-world" />
        </div>
        <div className="grid md:grid-cols-3 gap-6 text-xs mb-8">
          <div className="p-5 border rounded bg-gradient-to-br from-teal-50 to-green-50">
            <h3 className="font-semibold text-teal-800 mb-2 text-sm">LRU Cache (Doubly)</h3>
            <p className="text-gray-600">Hash map + doubly list for O(1) promote & eviction (move to front / remove tail).</p>
          </div>
          <div className="p-5 border rounded bg-gradient-to-br from-yellow-50 to-amber-50">
            <h3 className="font-semibold text-amber-800 mb-2 text-sm">Undo / Redo Stack</h3>
            <p className="text-gray-600">Bidirectional history navigation with stable node references.</p>
          </div>
          <div className="p-5 border rounded bg-gradient-to-br from-sky-50 to-blue-50">
            <h3 className="font-semibold text-blue-800 mb-2 text-sm">Adjacency Lists</h3>
            <p className="text-gray-600">Dynamic graph edges; often replaced by vectors for cache unless frequent mid-edge mutation.</p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6 text-xs mb-8">
          <div className="p-5 border rounded bg-gradient-to-br from-rose-50 to-pink-50">
            <h3 className="font-semibold text-rose-800 mb-2 text-sm">Free Lists / Allocators</h3>
            <p className="text-gray-600">Track reusable memory blocks quickly with push/pop semantics.</p>
          </div>
          <div className="p-5 border rounded bg-gradient-to-br from-slate-50 to-gray-100">
            <h3 className="font-semibold text-gray-700 mb-2 text-sm">Job Scheduling (Circular)</h3>
            <p className="text-gray-600">Round-robin iteration for cooperative task cycling.</p>
          </div>
          <div className="p-5 border rounded bg-gradient-to-br from-purple-50 to-fuchsia-50">
            <h3 className="font-semibold text-purple-800 mb-2 text-sm">Plugin Chains</h3>
            <p className="text-gray-600">Ordered middleware where insert/remove occurs at boundaries.</p>
          </div>
        </div>
        <div className="text-[11px] text-gray-600 bg-gray-100 border rounded p-4 leading-relaxed">Each use case must justify list complexity vs alternatives (array deque, gap buffer, tree). Profile before committing.</div>
      </div>

      {/* Alternatives */}
      <div id="alternatives" className="bg-white rounded-2xl p-8 shadow-lg border mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold flex items-center text-gray-900"><BrainCircuit className="w-8 h-8 mr-3 text-pink-600"/> Alternatives & Trade Study</h2>
          <SectionProgressIndicator moduleId="linked-lists" sectionId="advanced-alternatives" />
        </div>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-left text-[11px] border-collapse">
            <thead>
              <tr className="bg-gray-100">
                {['Structure','Random Access','Insert Head','Insert Middle','Iteration Speed','Memory Overhead','Best For'].map(h=> <th key={h} className="px-3 py-2 border font-semibold text-gray-700">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {[
                ['Dynamic Array','O(1)','O(n)','O(n)','Fast (cache)','Low','Index-heavy workloads'],
                ['Singly List','O(n)','O(1)','O(n)','Slower (pointer)','High','Frequent head ops'],
                ['Doubly List','O(n)','O(1)','O(n)','Slower','Higher','Bidirectional ops'],
                ['Deque','O(1)','O(1)','O(n)','Fast','Low','Front/back operations'],
                ['Skip List','O(log n)','O(log n)','O(log n)','Moderate','Higher','Ordered sets/maps'],
                ['Unrolled List','O(n)','O(1)','O(n)','Medium','Medium','Large text buffers']
              ].map((row,i)=> (
                <tr key={i} className={i%2? 'bg-gray-50':''}>
                  {row.map((cell,j)=> <td key={j} className="px-3 py-2 border text-gray-600">{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-[11px] text-gray-600 bg-gray-100 border rounded p-4 leading-relaxed">Choose the least complex abstraction meeting all functional + performance needs. Complexity tax compounds across codebase.</div>
      </div>

      <div className="flex justify-between items-center mt-8">
        <Link href="/learning-path/module-4/problems" className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-600">Previous: Problems</Link>
        <Link href="/learning-path/module-4" className="px-6 py-3 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-black">Back to Module Overview <ArrowRight className="w-4 h-4 ml-2" /></Link>
      </div>
    </ModuleLayout>
  );
}
