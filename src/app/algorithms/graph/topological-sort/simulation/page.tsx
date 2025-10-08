"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Play, Pause, StepForward, StepBack, RotateCcw, Plus, Info, ListOrdered, Shuffle, RefreshCw } from 'lucide-react';

interface Node { id:string; x:number; y:number; }
interface Edge { id:string; from:string; to:string; }
interface Frame { step:number; description:string; inDegree:Record<string,number>; queue:string[]; order:string[]; current?:string; removedEdge?:{from:string;to:string}; cycle:boolean; }

let nodeCounter=0; const nextNodeId=()=> `V${++nodeCounter}`;

export default function TopoSortSimulationPage(){
  const [nodes,setNodes] = useState<Node[]>(()=> [ {id:nextNodeId(),x:120,y:160},{id:nextNodeId(),x:300,y:80},{id:nextNodeId(),x:300,y:240},{id:nextNodeId(),x:480,y:160} ]);
  const [edges,setEdges] = useState<Edge[]>(()=> [ {id:'e1',from:'V1',to:'V2'}, {id:'e2',from:'V1',to:'V3'}, {id:'e3',from:'V2',to:'V4'}, {id:'e4',from:'V3',to:'V4'} ]);
  const [frames,setFrames] = useState<Frame[]>([]);
  const [index,setIndex] = useState(0);
  const [playing,setPlaying] = useState(false);
  const [speed,setSpeed] = useState(1);
  const [resetKey,setResetKey] = useState(0);

  const adjacency = useMemo(()=>{ const m:Record<string,Edge[]>={}; nodes.forEach(n=> m[n.id]=[]); edges.forEach(e=> { if(!m[e.from]) m[e.from]=[]; m[e.from].push(e); }); return m; },[nodes,edges]);

  const buildFrames = useCallback(()=>{
    const frames: Frame[] = [];
    const inDeg: Record<string,number> = {}; nodes.forEach(n=> inDeg[n.id]=0); edges.forEach(e=> inDeg[e.to]++);
    const q: string[] = Object.keys(inDeg).filter(v=> inDeg[v]===0).sort();
    const order: string[] = [];
    function snapshot(desc:string, current?:string, removedEdge?:{from:string;to:string}, cycle=false){ frames.push({ step:frames.length, description:desc, inDegree:{...inDeg}, queue:[...q], order:[...order], current, removedEdge, cycle }); }
    snapshot('Initialize in-degrees and queue of 0 in-degree vertices.');
    while(q.length){
      const u = q.shift()!; snapshot(`Pop ${u} from queue; append to ordering.`, u);
      order.push(u);
      snapshot(`Process outgoing edges from ${u}.`, u);
      for(const e of adjacency[u]){
        inDeg[e.to]--; snapshot(`Remove edge ${u}→${e.to}; decrement in-degree of ${e.to} to ${inDeg[e.to]}.`, u, {from:u,to:e.to});
        if(inDeg[e.to]===0){ q.push(e.to); q.sort(); snapshot(`${e.to} now has in-degree 0; enqueue.`, u); }
      }
    }
    if(order.length < nodes.length){ snapshot('Cycle detected: leftover vertices with nonzero in-degree.', undefined, undefined, true); }
    else snapshot('Topological order complete.', undefined, undefined, false);
    return frames;
  },[nodes,adjacency,edges]);

  useEffect(()=> { setFrames(buildFrames()); setIndex(0); setPlaying(false); }, [buildFrames]);
  useEffect(()=> { if(!playing) return; if(index >= frames.length-1){ setPlaying(false); return; } const t=setTimeout(()=> setIndex(i=> i+1), 1000/ speed); return ()=> clearTimeout(t); },[playing,index,frames.length,speed]);
  const current = frames[index];

  function addNode(){ const id=nextNodeId(); setNodes(ns=> [...ns,{id,x:140+Math.random()*360,y:80+Math.random()*240}]); }
  function toggleEdge(a:string,b:string){ setEdges(es=> { // directed toggle cycle among: none -> a->b -> b->a -> none
    const forward = es.find(e=> e.from===a && e.to===b); const backward = es.find(e=> e.from===b && e.to===a);
    if(!forward && !backward){ return [...es,{id:'e'+(es.length+1+Math.random()).toString(36).slice(2,6), from:a,to:b}]; }
    if(forward && !backward){ return es.filter(e=> e!==forward).concat({id:forward.id, from:b,to:a}); }
    if(!forward && backward){ return es.filter(e=> e!==backward); }
    return es; }); }
  function randomizeGraph(){ nodeCounter=0; const count=5+Math.floor(Math.random()*2); const newNodes:Node[]=[]; for(let i=0;i<count;i++) newNodes.push({id:nextNodeId(), x:120+i*(480/(count-1)), y: 140 + (i%2? -70:70)}); const newEdges:Edge[]=[]; // attempt acyclic layering
    for(let i=0;i<count-1;i++){ if(Math.random()<0.8) newEdges.push({id:'e'+(newEdges.length+1), from:newNodes[i].id, to:newNodes[i+1].id}); }
    for(let tries=0; tries<count*2; tries++){ const aIndex=Math.floor(Math.random()*count); const bIndex=aIndex+1+Math.floor(Math.random()*(count-aIndex-1)); if(bIndex>=count) continue; const a=newNodes[aIndex].id; const b=newNodes[bIndex].id; if(newEdges.some(e=> e.from===a && e.to===b)) continue; if(Math.random()<0.5) continue; newEdges.push({id:'e'+(newEdges.length+1), from:a,to:b}); }
    setNodes(newNodes); setEdges(newEdges); setResetKey(k=> k+1); setPlaying(false); setIndex(0); setFrames([]); }
  function introduceCycle(){ // add back edge from later to earlier if possible
    setEdges(es=> { for(const e of es){ /* check existing */ } const sorted=nodes.slice(); if(sorted.length<2) return es; const a=sorted[sorted.length-1].id; const b=sorted[0].id; if(es.some(e=> e.from===a && e.to===b)) return es; return [...es,{id:'e'+(es.length+1+Math.random()).toString(36).slice(2,6), from:a,to:b}]; }); }
  function reset(){ randomizeGraph(); }

  return <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 text-gray-700">
  <div className="container mx-auto px-4 py-12 max-w-screen-2xl text-gray-700">
      <Link href="/algorithms/graph/topological-sort/theory" className="inline-flex items-center text-amber-600 hover:text-amber-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Back to Theory</Link>
      <h1 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3"><ListOrdered className="h-7 w-7 text-amber-600"/> Topological Sort Simulation (Kahn)</h1>
      <div className="grid lg:grid-cols-3 gap-8 text-gray-700">
        <div className="lg:col-span-2 space-y-6 text-gray-700">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Directed Graph & Controls</h2>
            <div className="flex flex-wrap gap-3 mb-4 text-sm text-gray-600">
              <button onClick={addNode} className="px-4 py-2 rounded-lg bg-amber-600 text-white font-semibold hover:bg-amber-700 inline-flex items-center gap-1 text-gray-100"><Plus className="h-4 w-4 text-gray-700"/>Add Node</button>
              <button onClick={reset} className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 inline-flex items-center gap-1"><RotateCcw className="h-4 w-4 text-gray-700"/>Reset</button>
              <button onClick={randomizeGraph} className="px-4 py-2 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-700 inline-flex items-center gap-1 text-gray-100"><Shuffle className="h-4 w-4 text-gray-700"/>Randomize</button>
              <button onClick={introduceCycle} className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 inline-flex items-center gap-1 text-gray-100"><RefreshCw className="h-4 w-4 text-gray-700"/>Add Cycle</button>
              <button onClick={()=> setPlaying(p=> !p)} className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 inline-flex items-center gap-1">{playing? <Pause className="h-4 w-4 text-gray-700"/>:<Play className="h-4 w-4 text-gray-700"/>}{playing? 'Pause':'Play'}</button>
              <button onClick={()=> setIndex(i=> Math.max(0,i-1))} disabled={index===0} className="px-3 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-40"><StepBack className="h-4 w-4 text-gray-700"/></button>
              <button onClick={()=> setIndex(i=> Math.min(frames.length-1,i+1))} disabled={index===frames.length-1} className="px-3 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-40"><StepForward className="h-4 w-4 text-gray-700"/></button>
              <div className="flex items-center gap-2 text-gray-700"><span className="text-xs text-slate-500">Speed</span><input type="range" min={0.5} max={2} step={0.5} value={speed} onChange={e=> setSpeed(Number(e.target.value))} /></div>
              <div className="text-xs font-mono bg-slate-900 text-amber-200 px-3 py-2 rounded-lg">Step {index+1}/{frames.length||1}</div>
            </div>
            <p className="text-[11px] text-slate-500 mb-3">Directed graph: Click two nodes successively to cycle through edge states none → a→b → b→a → none. Drag nodes. Add cycle button forces a back edge to test detection. Colors: Green=placed in order, Yellow=in queue ready, Blue=current processing, Gray=unseen. Edge highlight during removal.</p>
            <GraphCanvas key={resetKey} nodes={nodes} setNodes={setNodes} edges={edges} setEdges={setEdges} toggleEdge={toggleEdge} current={current} />
          </motion.div>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
            <h2 className="text-lg font-semibold text-slate-800 mb-3">State</h2>
            <StatePanel frame={current} />
          </motion.div>
        </div>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="space-y-6 text-gray-700">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-amber-200 text-gray-700">
            <h2 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2"><Info className="h-5 w-5 text-amber-600"/> Explanation</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4 min-h-[90px]">{current?.description}</p>
            <Legend />
          </div>
          <Navigation />
        </motion.div>
      </div>
    </div>
  </div>;
}

function GraphCanvas({nodes,setNodes,edges,setEdges,toggleEdge,current}:{nodes:Node[];setNodes:React.Dispatch<React.SetStateAction<Node[]>>;edges:Edge[];setEdges:React.Dispatch<React.SetStateAction<Edge[]>>;toggleEdge:(a:string,b:string)=>void; current?:Frame}){
  const [first,setFirst] = useState<string|null>(null);
  const dragRef = useRef<{id:string; offX:number; offY:number} | null>(null);
  function handleNodeClick(id:string){ if(first===null) setFirst(id); else if(first===id) setFirst(null); else { toggleEdge(first,id); setFirst(null);} }
  function handleMouseDown(e:React.MouseEvent,id:string){ const rect=(e.currentTarget.parentElement as HTMLElement).getBoundingClientRect(); const n=nodes.find(nn=> nn.id===id)!; dragRef.current={id,offX:e.clientX-(rect.left+n.x), offY:e.clientY-(rect.top+n.y)}; }
  function handleMouseMove(e:React.MouseEvent){ if(!dragRef.current) return; const rect=(e.currentTarget as HTMLElement).getBoundingClientRect(); const {id,offX,offY}=dragRef.current; const x=e.clientX-rect.left-offX; const y=e.clientY-rect.top-offY; setNodes(ns=> ns.map(n=> n.id===id? {...n,x:Math.max(40,Math.min(rect.width-40,x)), y:Math.max(40,Math.min(rect.height-40,y))}: n)); }
  function handleMouseUp(){ dragRef.current=null; }
  function handleDoubleClick(e:React.MouseEvent){ if(dragRef.current) return; const rect=(e.currentTarget as HTMLElement).getBoundingClientRect(); const x=e.clientX-rect.left; const y=e.clientY-rect.top; const id=nextNodeId(); setNodes(ns=> [...ns,{id,x,y}]); }
  const removedEdge = current?.removedEdge;
  return <div onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onDoubleClick={handleDoubleClick} className="relative w-full h-[400px] bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 overflow-hidden select-none text-gray-700">
    <svg className="absolute inset-0 w-full h-full">
      {edges.map(e=> { const a=nodes.find(n=> n.id===e.from)!; const b=nodes.find(n=> n.id===e.to)!; const isRemoved = removedEdge && removedEdge.from===e.from && removedEdge.to===e.to; const isCurrent = current?.current===e.from; const stroke = isRemoved? '#dc2626': isCurrent? '#2563eb':'#94a3b8'; const markerId = 'arrow'; return <g key={e.id}><defs><marker id={markerId} viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill={stroke}/></marker></defs><line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={stroke} strokeWidth={ isRemoved? 5:3 } markerEnd={`url(#${markerId})`} strokeOpacity={0.85} /></g>; })}
    </svg>
    {nodes.map(n=> { const inOrder = current?.order.includes(n.id); const inQueue = current?.queue.includes(n.id); const isCurrent = current?.current===n.id; const color = isCurrent? 'bg-blue-600 text-white border-blue-700': inOrder? 'bg-green-600 text-white border-green-700': inQueue? 'bg-yellow-400 text-slate-800 border-yellow-500':'bg-white text-slate-800 border-slate-300'; const degVal = current? current.inDegree[n.id]:0; return <button key={n.id} onMouseDown={(e)=> handleMouseDown(e,n.id)} onClick={()=> handleNodeClick(n.id)} style={{left:n.x-30, top:n.y-30}} className={`absolute h-16 w-16 rounded-full border-2 font-semibold flex flex-col items-center justify-center shadow ${color} transition-colors cursor-move active:scale-95 text-[10px]`}><div>{n.id}</div><div className="font-mono text-gray-700">deg:{degVal}</div>{first===n.id && <span className="absolute -bottom-5 text-[10px] text-amber-600 font-mono">selecting</span>}</button>; })}
    {first && <div className="absolute top-2 left-2 text-[10px] px-2 py-1 bg-amber-600 text-white rounded text-gray-700">First: {first}</div>}
  </div>;
}

function StatePanel({frame}:{frame?:Frame}){
  if(!frame) return <div className="text-sm text-slate-500">Press Play to simulate.</div>;
  return <div className="space-y-4 text-xs text-gray-600">
    <div className="grid md:grid-cols-3 gap-4 text-gray-700">
      <div className="p-3 rounded-xl bg-yellow-50 border border-yellow-200 text-gray-700"><div className="font-semibold text-yellow-700 text-[11px] uppercase tracking-wide mb-1">Queue</div><div className="flex flex-wrap gap-1 font-mono text-gray-700">{frame.queue.map(id=> <span key={id} className="px-2 py-1 rounded bg-white border border-yellow-400 text-gray-600">{id}</span>)}</div></div>
      <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-gray-700"><div className="font-semibold text-green-700 text-[11px] uppercase tracking-wide mb-1">Order</div><div className="flex flex-wrap gap-1 font-mono text-gray-700">{frame.order.map(id=> <span key={id} className="px-2 py-1 rounded bg-white border border-green-300 text-gray-600">{id}</span>)}</div></div>
      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-gray-700"><div className="font-semibold text-amber-700 text-[11px] uppercase tracking-wide mb-1">Cycle</div><div className="font-mono text-gray-700">{frame.cycle? 'Yes':'No'}</div></div>
    </div>
    <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 overflow-x-auto text-gray-700"><div className="font-semibold text-purple-700 text-[11px] uppercase tracking-wide mb-1">In-Degrees</div><div className="flex flex-wrap gap-1 font-mono text-gray-700">{Object.entries(frame.inDegree).map(([k,v])=> <span key={k} className="px-2 py-1 rounded bg-white border border-purple-300 text-gray-600">{k}:{v}</span>)}</div></div>
    {frame.removedEdge && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-gray-700"><div className="font-semibold text-red-700 text-[11px] uppercase tracking-wide mb-1">Removed Edge</div><div className="text-[11px] font-mono text-gray-700">{frame.removedEdge.from}→{frame.removedEdge.to}</div></div>}
  </div>;
}

function Legend(){
  return <div className="text-[11px] space-y-2 text-gray-700">
    <div className="flex items-center gap-2 text-gray-700"><span className="h-4 w-4 rounded-full bg-blue-600 border-2 border-blue-700 inline-block text-gray-600"/> Current processing</div>
    <div className="flex items-center gap-2 text-gray-700"><span className="h-4 w-4 rounded-full bg-green-600 border-2 border-green-700 inline-block text-gray-600"/> Added to order</div>
    <div className="flex items-center gap-2 text-gray-700"><span className="h-4 w-4 rounded-full bg-yellow-400 border-2 border-yellow-500 inline-block text-gray-600"/> In queue (ready)</div>
    <div className="flex items-center gap-2 text-gray-700"><span className="h-4 w-6 rounded bg-red-600 inline-block text-gray-600"/> Edge removal</div>
  </div>;
}

function Navigation(){
  return <div className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
    <h2 className="text-lg font-semibold text-slate-800 mb-3">Continue Learning</h2>
    <div className="flex flex-wrap gap-3 justify-between items-center text-gray-700">
      <Link href="/algorithms/graph/topological-sort/theory" className="inline-flex items-center px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Theory</Link>
      <Link href="/algorithms/graph" className="inline-flex items-center px-5 py-2 bg-amber-600 text-black rounded-lg hover:bg-amber-700 text-gray-800">Graph Overview <ArrowRight className="h-5 w-5 ml-2 text-gray-700"/></Link>
    </div>
  </div>;
}
