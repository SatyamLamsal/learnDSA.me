'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Play, Pause, StepForward, StepBack, RotateCcw, Shuffle, Timer, Split, Layers, Merge, Info } from 'lucide-react';

/*
  Divide & Conquer Visualizer (Merge Sort Based)
  Features:
  - Custom / random array
  - Build full recursion frame sequence capturing phases: divide, conquer (sorted subarrays), merge
  - Playback controls (play/pause, step prev/next, reset, random)
  - Speed control (slider) influences autoplay delay
  - Highlight current phase (blue: divide, orange: conquer (post recursion), green: merge)
  - Explanation panel with dynamic messaging
  - Responsive tree layout using recursive grid/flex
*/

interface FrameNode {
  id: string;
  depth: number;
  segment: number[];
  left?: FrameNode;
  right?: FrameNode;
  phase: 'divide' | 'conquer' | 'merge';
  merged?: number[]; // after merge
  index?: number; // optional index marker inside merge
  leftSeg?: number[]; // sorted left snapshot
  rightSeg?: number[]; // sorted right snapshot
}

interface Frame {
  step: number;
  phase: 'divide' | 'conquer' | 'merge';
  depth: number;
  description: string;
  root: FrameNode; // full tree snapshot for rendering
  focusId: string; // node in focus for this frame
}

function generateRandomArray(len: number, min=-20, max=99): number[] {
  return Array.from({length: len}, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

let nodeCounter = 0;
function nextId(){ return `n${nodeCounter++}`; }

/* Build full frame sequence for merge sort */
type FrameOrdering = 'dfs' | 'phase';

function buildFrames(arr: number[], ordering: FrameOrdering = 'dfs'): Frame[] {
  nodeCounter = 0;
  const frames: Frame[] = [];
  // Declare root upfront to avoid temporal dead zone in snapshot()
  let root: FrameNode | null = null;

  function cloneNode(n: FrameNode | undefined): FrameNode | undefined {
    if(!n) return undefined;
    return {
      id: n.id,
      depth: n.depth,
      segment: [...n.segment],
      phase: n.phase,
      merged: n.merged ? [...n.merged] : undefined,
      index: n.index,
      leftSeg: n.leftSeg ? [...n.leftSeg] : undefined,
      rightSeg: n.rightSeg ? [...n.rightSeg] : undefined,
      left: cloneNode(n.left),
      right: cloneNode(n.right)
    };
  }

  function snapshot(phase: 'divide'|'conquer'|'merge', depth: number, node: FrameNode, description: string){
    // Guard: root may not yet be fully assigned when first base case fires
    const safeRoot = root ? cloneNode(root) : cloneNode(node); // fallback to current node
    frames.push({
      step: frames.length,
      phase,
      depth,
      description,
      root: safeRoot!,
      focusId: node.id
    });
  }

  function mergeSort(segment: number[], depth: number): FrameNode {
    const node: FrameNode = { id: nextId(), depth, segment: [...segment], phase: 'divide' };
    // If this is the very first call, assign root early
    if(root === null) root = node;
    if(segment.length <= 1){
      node.phase = 'conquer';
      snapshot('conquer', depth, node, `Base case: segment [${segment.join(', ')}] is already sorted.`);
      return node;
    }
    snapshot('divide', depth, node, `Divide: split segment [${segment.join(', ')}] at mid = ${Math.floor(segment.length/2)}.`);
    const mid = Math.floor(segment.length/2);
    node.left = mergeSort(segment.slice(0, mid), depth+1);
    node.right = mergeSort(segment.slice(mid), depth+1);

    // Conquer phase (children solved) before merge
    node.phase = 'conquer';
    node.leftSeg = node.left.segment.length === 1 ? node.left.segment : (node.left.merged || node.left.segment);
    node.rightSeg = node.right.segment.length === 1 ? node.right.segment : (node.right.merged || node.right.segment);
    snapshot('conquer', depth, node, `Conquer: both halves solved => left [${node.leftSeg.join(', ')}], right [${node.rightSeg.join(', ')}].`);

    // Merge process (stepwise)
    const merged: number[] = [];
    let i=0,j=0; const L=node.leftSeg, R=node.rightSeg;
    while(i < L.length || j < R.length){
      if(j>=R.length || (i<L.length && L[i] <= R[j])){
        merged.push(L[i]); i++;
      } else {
        merged.push(R[j]); j++;
      }
      node.merged = [...merged, ...L.slice(i), ...R.slice(j)];
      node.phase = 'merge';
      snapshot('merge', depth, node, `Merge: building [${node.merged.join(', ')}]; chose next from ${i>0 && merged[merged.length-1]===L[i-1] ? 'left' : 'right'} segment.`);
    }
    if(node.merged) node.segment = [...node.merged];
    return node;
  }

  root = mergeSort(arr, 0);
  // Final frame emphasising completion (ensure last)
  snapshot('merge', 0, root, `Complete: array sorted → [${root.segment.join(', ')}].`);

  if(ordering === 'phase') {
    const divides = frames.filter(f=> f.phase==='divide');
    const conquers = frames.filter(f=> f.phase==='conquer');
    const merges = frames.filter(f=> f.phase==='merge');
    const reordered: Frame[] = [...divides, ...conquers, ...merges].map((f,i)=> ({...f, step: i}));
    return reordered;
  }
  return frames;
}

function useAutoplay(active: boolean, delay: number, onAdvance: ()=>void){
  const ref = useRef<number | null>(null);
  useEffect(()=>{
    if(!active){ if(ref.current) window.clearTimeout(ref.current); return; }
    ref.current = window.setTimeout(onAdvance, delay);
    return ()=> { if(ref.current) window.clearTimeout(ref.current); };
  },[active, delay, onAdvance]);
}

export default function DivideConquerVisualizerPage(){
  const [input,setInput] = useState('12,5,7,3,9,1');
  const [array,setArray] = useState<number[]>(()=> input.split(',').map(v=> parseInt(v.trim(),10)).filter(n=> !Number.isNaN(n)));
  const [ordering,setOrdering] = useState<FrameOrdering>('dfs');
  const [frames,setFrames] = useState<Frame[]>(()=> buildFrames(array, ordering));
  const [index,setIndex] = useState(0);
  const [playing,setPlaying] = useState(false);
  const [speed,setSpeed] = useState(1); // 0.5 slow, 1 normal, 2 fast

  const current = frames[index];

  // derived delay
  const delay = useMemo(()=> 1200 / speed, [speed]);

  const randomize = useCallback((len?:number)=>{
    const length = len ?? Math.floor(Math.random()*4)+6; // 6..9 length
    const arr = generateRandomArray(length,-20,40);
    setArray(arr);
    setInput(arr.join(','));
    const f = buildFrames(arr, ordering);
    setFrames(f); setIndex(0); setPlaying(false);
  },[ordering]);

  const rebuildFromInput = useCallback(()=>{
    const parsed = input.split(',').map(v=> parseInt(v.trim(),10)).filter(n=> !Number.isNaN(n));
    if(parsed.length === 0) return;
    setArray(parsed);
    const f = buildFrames(parsed, ordering);
    setFrames(f); setIndex(0); setPlaying(false);
  },[input, ordering]);

  // Rebuild frames if ordering toggled without changing array
  useEffect(()=> {
    setFrames(buildFrames(array, ordering));
    setIndex(0);
    setPlaying(false);
  }, [ordering, array]);

  useAutoplay(playing, delay, ()=> setIndex(i=> i < frames.length-1 ? i+1 : (setPlaying(false), i)));

  useEffect(()=>{ if(index === frames.length-1) setPlaying(false); },[index,frames.length]);

  const phaseColor = current?.phase === 'divide' ? 'border-blue-400 ring-blue-300' : current?.phase === 'conquer' ? 'border-orange-400 ring-orange-300' : 'border-green-400 ring-green-300';

  return <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 text-gray-700">
    <div className="container mx-auto px-4 py-10 max-w-7xl text-gray-700">
      <Link href="/algorithms/divide-and-conquer" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Back</Link>
      <div className="grid lg:grid-cols-3 gap-6 text-gray-700">
        {/* Left / Main Visualization Column spans 2 */}
        <div className="lg:col-span-2 space-y-6 text-gray-700">
          {/* Controls Card */}
          <motion.div initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
            <h1 className="text-3xl font-bold text-slate-800 mb-4 flex items-center gap-3"><Split className="h-8 w-8 text-blue-600"/>Divide & Conquer Visualizer</h1>
            <div className="flex flex-wrap gap-4 items-end mb-4 text-gray-700">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-600">Array Input</label>
                <input value={input} onChange={e=> setInput(e.target.value)} className="mt-1 w-64 text-sm px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 font-mono" placeholder="e.g. 5,3,8,1" />
              </div>
              <button onClick={rebuildFromInput} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold text-gray-300">Build</button>
              <button onClick={()=> randomize()} className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold inline-flex items-center"><Shuffle className="h-4 w-4 mr-2 text-gray-700"/>Random</button>
              <div className="flex items-center gap-2 text-gray-700">
                <button onClick={()=> setPlaying(p=> !p)} className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-semibold inline-flex items-center">{playing? <Pause className="h-4 w-4 mr-2 text-gray-700"/>: <Play className="h-4 w-4 mr-2 text-gray-700"/>}{playing? 'Pause':'Play'}</button>
                <button onClick={()=> setIndex(i=> Math.max(0,i-1))} disabled={index===0} className="px-3 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm disabled:opacity-40 inline-flex items-center"><StepBack className="h-4 w-4 text-gray-700"/></button>
                <button onClick={()=> setIndex(i=> Math.min(frames.length-1,i+1))} disabled={index===frames.length-1} className="px-3 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm disabled:opacity-40 inline-flex items-center"><StepForward className="h-4 w-4 text-gray-700"/></button>
                <button onClick={()=> { randomize(array.length); }} className="px-3 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-sm inline-flex items-center"><RotateCcw className="h-4 w-4 text-gray-700"/></button>
              </div>
              <div className="flex flex-col text-gray-700">
                <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-600 flex items-center gap-1"><Timer className="h-3 w-3 text-gray-700"/> Speed</label>
                <input type="range" min={0.5} max={2} step={0.5} value={speed} onChange={e=> setSpeed(Number(e.target.value))} />
                <div className="text-[10px] text-slate-500 text-center">{speed===0.5? 'Slow': speed===1? 'Normal':'Fast'}</div>
              </div>
              <div className="flex flex-col text-gray-700">
                <label className="text-[11px] font-semibold uppercase tracking-wide text-slate-600">Ordering</label>
                <div className="flex bg-slate-100 rounded-lg overflow-hidden text-gray-700">
                  <button onClick={()=> setOrdering('dfs')} className={`px-3 py-1 text-[11px] font-semibold ${ordering==='dfs'? 'bg-blue-600 text-white':'text-slate-600 hover:bg-slate-200'}`}>DFS</button>
                  <button onClick={()=> setOrdering('phase')} className={`px-3 py-1 text-[11px] font-semibold ${ordering==='phase'? 'bg-blue-600 text-white':'text-slate-600 hover:bg-slate-200'}`}>Phase</button>
                </div>
              </div>
              <div className="text-xs font-mono bg-slate-900 text-blue-200 px-3 py-2 rounded-lg self-start">Step {index+1}/{frames.length}</div>
            </div>
            <div className="flex flex-wrap gap-3 text-[11px] text-gray-700">
              <PhaseBadge label="Divide" color="bg-blue-600" active={current?.phase==='divide'} />
              <PhaseBadge label="Conquer" color="bg-orange-500" active={current?.phase==='conquer'} />
              <PhaseBadge label="Merge" color="bg-green-600" active={current?.phase==='merge'} />
            </div>
          </motion.div>

          {/* Visualization Tree */}
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
            <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><Layers className="h-5 w-5 text-blue-600"/> Recursive Decomposition</h2>
            <div className="overflow-x-auto text-gray-700">
              {current && <Tree root={current.root} focusId={current.focusId} />}
            </div>
          </motion.div>

          {/* Final Array (if finished) */}
          <AnimatePresence>
            {index===frames.length-1 && <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} exit={{opacity:0,y:10}} className="bg-white rounded-2xl shadow-sm p-6 border border-green-200 text-gray-700">
              <h2 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2"><Merge className="h-5 w-5 text-green-600"/> Sorted Result</h2>
              <ArrayBar segment={current.root.segment} highlight className="ring-2 ring-green-300 text-gray-700" />
            </motion.div>}
          </AnimatePresence>
        </div>

        {/* Explanation & Details */}
        <motion.div initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} className="space-y-6 text-gray-700">
          <div className={`bg-white rounded-2xl shadow-sm p-6 border ${phaseColor} ring-1`}> 
            <h2 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2"><Info className="h-5 w-5 text-gray-700"/> Explanation</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">{current?.description}</p>
            <DepthStats frame={current} />
          </div>
          <LegendCard />
          <ConceptCard />
        </motion.div>
      </div>
    </div>
  </div>;
}

function PhaseBadge({label,color,active}:{label:string;color:string;active:boolean}){
  return <div className={`px-3 py-1 rounded-full text-white font-semibold ${color} ${active? 'opacity-100':'opacity-40'}`}>{label}</div>;
}

function ArrayBar({segment,highlight,className}:{segment:number[];highlight?:boolean;className?:string}){
  return <div className={`flex flex-wrap gap-1 ${highlight? '': ''} ${className||''}`}>
    {segment.map((v,i)=> <div key={i} className={`px-2 py-1 rounded-md text-xs font-mono bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-300 ${highlight? 'text-green-700 font-semibold':''}`}>{v}</div>)}
  </div>;
}

function Tree({root, focusId}:{root:FrameNode; focusId:string}){
  return <div className="w-full text-gray-700">
    <Node node={root} focusId={focusId} />
  </div>;
}

function Node({node, focusId}:{node:FrameNode; focusId:string}){
  const isFocus = node.id === focusId;
  const phaseStyles = node.phase==='divide'? 'ring-blue-300 border-blue-300': node.phase==='conquer'? 'ring-orange-300 border-orange-300':'ring-green-300 border-green-300';
  const showMerged = node.phase==='merge' && node.merged;
  const content = showMerged? node.merged!: (node.segment.length===1? node.segment : node.segment);
  return <div className="flex flex-col items-center text-gray-700">
    <motion.div layout initial={{opacity:0,scale:0.85}} animate={{opacity:1,scale:1}} transition={{duration:0.3}} className={`mb-3 px-3 py-2 rounded-xl bg-white border ${phaseStyles} ${isFocus? 'shadow-lg ring-2':'shadow-sm'} min-w-[70px]`}>
      <div className="flex flex-wrap gap-1 justify-center text-gray-700">
        {content.map((v,i)=><span key={i} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-gray-600">{v}</span>)}
      </div>
      <div className="text-[9px] text-center mt-1 font-semibold uppercase tracking-wide text-slate-500">{node.phase}</div>
    </motion.div>
    {(node.left || node.right) && <div className="flex gap-8 text-gray-700">
      {node.left && <Node node={node.left} focusId={focusId} />}
      {node.right && <Node node={node.right} focusId={focusId} />}
    </div>}
  </div>;
}

function DepthStats({frame}:{frame:Frame}){
  if(!frame) return null;
  const depth = frame.depth;
  return <div className="grid grid-cols-2 gap-3 text-xs text-gray-600">
    <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-gray-700">
      <div className="font-semibold text-blue-700 text-[11px] uppercase tracking-wide">Phase</div>
      <div className="font-mono mt-1 text-gray-700">{frame.phase}</div>
    </div>
    <div className="p-3 rounded-lg bg-purple-50 border border-purple-200 text-gray-700">
      <div className="font-semibold text-purple-700 text-[11px] uppercase tracking-wide">Depth</div>
      <div className="font-mono mt-1 text-gray-700">{depth}</div>
    </div>
  </div>;
}

function LegendCard(){
  return <div className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
    <h2 className="text-lg font-semibold text-slate-800 mb-3">Legend</h2>
    <div className="grid grid-cols-3 gap-3 text-[11px] text-gray-700">
      <div className="p-2 rounded-lg bg-blue-50 border border-blue-200 text-gray-700">
        <div className="font-semibold text-blue-700 mb-1">Divide</div>
        <p className="text-slate-600">Splitting segment at midpoint.</p>
      </div>
      <div className="p-2 rounded-lg bg-orange-50 border border-orange-200 text-gray-700">
        <div className="font-semibold text-orange-700 mb-1">Conquer</div>
        <p className="text-slate-600">Solved subproblems; ready to merge.</p>
      </div>
      <div className="p-2 rounded-lg bg-green-50 border border-green-200 text-gray-700">
        <div className="font-semibold text-green-700 mb-1">Merge</div>
        <p className="text-slate-600">Combining sorted halves.</p>
      </div>
    </div>
  </div>;
}

function ConceptCard(){
  return <div className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
    <h2 className="text-lg font-semibold text-slate-800 mb-3">Concept</h2>
    <p className="text-sm text-slate-600 leading-relaxed">This visualizer demonstrates the classic divide & conquer pattern by animating merge sort. The array breaks into single-element base cases (conquer), then merges upward rebuilding sorted segments. Each frame highlights: <span className="font-semibold text-blue-600">Divide</span>, <span className="font-semibold text-orange-600">Conquer</span>, or <span className="font-semibold text-green-600">Merge</span>. Experiment by entering custom arrays, adjusting speed, and stepping through frames to observe recursion structure and merge dynamics.</p>
  </div>;
}
