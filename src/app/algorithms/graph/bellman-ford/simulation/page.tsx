"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Play, Pause, StepForward, StepBack, RotateCcw, Plus, Shuffle, Info, Sigma, AlertTriangle } from 'lucide-react';

interface Node { id:string; x:number; y:number; }
interface Edge { id:string; from:string; to:string; w:number; }
interface RelaxEdge { from:string; to:string; w:number; improved:boolean; pass:number; index:number; }
interface Frame { step:number; description:string; pass:number; edgeIndex:number; relaxing?:RelaxEdge; distances:Record<string,number>; parents:Record<string,string|null>; updated:boolean; negativeCycle:boolean; cycleEdges?:{from:string;to:string}[]; }

let nodeCounter=0; const nextNodeId=()=> `N${++nodeCounter}`;

export default function BellmanFordSimulationPage(){
  const [nodes,setNodes] = useState<Node[]>(()=> [ {id:nextNodeId(),x:120,y:160},{id:nextNodeId(),x:320,y:80},{id:nextNodeId(),x:320,y:240},{id:nextNodeId(),x:520,y:160} ]);
  const [edges,setEdges] = useState<Edge[]>(()=> [ {id:'e1',from:'N1',to:'N2',w:6},{id:'e2',from:'N1',to:'N3',w:5},{id:'e3',from:'N2',to:'N4',w:-2},{id:'e4',from:'N3',to:'N4',w:1},{id:'e5',from:'N2',to:'N3',w:-1} ]);
  const [source,setSource] = useState('N1');
  const [frames,setFrames] = useState<Frame[]>([]);
  const [index,setIndex] = useState(0);
  const [playing,setPlaying] = useState(false);
  const [speed,setSpeed] = useState(1);
  const [resetKey,setResetKey] = useState(0);

  const buildFrames = useCallback(()=>{
    const frames: Frame[] = [];
    const dist: Record<string,number> = {}; const parent: Record<string,string|null> = {};
    nodes.forEach(n=> { dist[n.id]=Infinity; parent[n.id]=null; }); dist[source]=0;
    const E = edges.slice();

    function snapshot(desc:string, pass:number, edgeIndex:number, relaxing?:RelaxEdge, updated=false, negativeCycle=false, cycleEdges?:{from:string;to:string}[]){
      frames.push({ step:frames.length, description:desc, pass, edgeIndex, relaxing, distances:{...dist}, parents:{...parent}, updated, negativeCycle, cycleEdges });
    }
    snapshot(`Initialize distances: source ${source}=0; others=∞.`, 0, -1);

    let passUpdated = false;
    for(let pass=1; pass <= nodes.length-1; pass++){
      passUpdated = false;
      snapshot(`Start pass ${pass}.`, pass, -1);
      for(let i=0;i<E.length;i++){
        const e = E[i];
        const can = dist[e.from] !== Infinity && dist[e.from] + e.w < dist[e.to];
        snapshot(`Check edge ${e.from}→${e.to} (w=${e.w}) ${can? 'relaxation possible':'no improvement'}.`, pass, i, {from:e.from,to:e.to,w:e.w, improved:can, pass, index:i});
        if(can){
          dist[e.to] = dist[e.from] + e.w; parent[e.to] = e.from; passUpdated = true;
          snapshot(`Relax ${e.to}: dist=${dist[e.to]} parent=${e.from}.`, pass, i, {from:e.from,to:e.to,w:e.w, improved:true, pass, index:i}, true);
        }
      }
      if(!passUpdated){ snapshot(`No updates in pass ${pass}; early stop.`, pass, E.length); break; }
      snapshot(`End pass ${pass}.`, pass, E.length, undefined, passUpdated);
    }
    // negative cycle detection
    let cycleDetected = false; const cycleEdges: {from:string;to:string}[] = [];
    for(let i=0;i<E.length;i++){
      const e=E[i];
      if(dist[e.from] !== Infinity && dist[e.from] + e.w < dist[e.to]){
        cycleDetected = true; cycleEdges.push({from:e.from,to:e.to});
        snapshot(`Negative cycle detected via edge ${e.from}→${e.to}.`, nodes.length, i, {from:e.from,to:e.to,w:e.w, improved:true, pass:nodes.length, index:i}, false, true, [...cycleEdges]);
      }
    }
    if(!cycleDetected) snapshot('All passes complete. No negative cycle reachable from source.', nodes.length, -1);
    return frames;
  },[nodes,edges,source]);

  useEffect(()=> { setFrames(buildFrames()); setIndex(0); setPlaying(false); }, [buildFrames]);
  useEffect(()=> { if(!playing) return; if(index >= frames.length-1){ setPlaying(false); return; } const t=setTimeout(()=> setIndex(i=> i+1), 1000/ speed); return ()=> clearTimeout(t); },[playing,index,frames.length,speed]);
  const current = frames[index];

  function addNode(){ const id=nextNodeId(); setNodes(ns=> [...ns,{id,x:140+Math.random()*360,y:80+Math.random()*240}]); }
  function toggleEdge(a:string,b:string){
    setEdges(es=> {
      const existing = es.find(e=> e.from===a && e.to===b);
      if(existing) return es.filter(e=> e!==existing);
      return [...es,{id:'e'+(es.length+1+Math.random()).toString(36).slice(2,6), from:a,to:b,w: Math.floor(Math.random()*11)-5 }];
    });
  }
  function cycleWeight(id:string){ setEdges(es=> es.map(e=> e.id===id? {...e,w: e.w>=5? -5: e.w+1}: e)); }
  function randomizeGraph(){
    nodeCounter=0; const count = 5 + Math.floor(Math.random()*2); const newNodes:Node[]=[];
    for(let i=0;i<count;i++) newNodes.push({id:nextNodeId(), x: 120 + i*(480/(count-1)), y: 140 + (i%2? -70:70)});
    const newEdges:Edge[]=[];
    for(let i=0;i<count-1;i++) newEdges.push({id:'e'+(newEdges.length+1), from:newNodes[i].id, to:newNodes[i+1].id, w: Math.floor(Math.random()*11)-5});
    for(let tries=0; tries<count*2; tries++){
      const a=newNodes[Math.floor(Math.random()*count)].id; const b=newNodes[Math.floor(Math.random()*count)].id; if(a===b) continue; if(newEdges.some(e=> e.from===a && e.to===b)) continue; if(Math.random()<0.5) continue; newEdges.push({id:'e'+(newEdges.length+1), from:a,to:b,w:Math.floor(Math.random()*11)-5});
    }
    setNodes(newNodes); setEdges(newEdges); setSource(newNodes[0].id); setResetKey(k=> k+1); setPlaying(false); setIndex(0); setFrames([]);
  }
  function reset(){ randomizeGraph(); }

  return <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-emerald-50">
  <div className="container mx-auto px-4 py-12 max-w-screen-2xl">
      <Link href="/algorithms/graph/bellman-ford/theory" className="inline-flex items-center text-rose-600 hover:text-rose-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2"/>Back to Theory</Link>
      <h1 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3"><Sigma className="h-7 w-7 text-rose-600"/> Bellman-Ford Simulation</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Graph & Controls</h2>
            <div className="flex flex-wrap gap-3 mb-4 text-sm">
              <button onClick={addNode} className="px-4 py-2 rounded-lg bg-rose-600 text-white font-semibold hover:bg-rose-700 inline-flex items-center gap-1"><Plus className="h-4 w-4"/>Add Node</button>
              <button onClick={reset} className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 inline-flex items-center gap-1"><RotateCcw className="h-4 w-4"/>Reset</button>
              <button onClick={randomizeGraph} className="px-4 py-2 rounded-lg bg-amber-600 text-white font-semibold hover:bg-amber-700 inline-flex items-center gap-1"><Shuffle className="h-4 w-4"/>Randomize</button>
              <select value={source} onChange={e=> setSource(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-300 text-sm">{nodes.map(n=> <option key={n.id}>{n.id}</option>)}</select>
              <button onClick={()=> setPlaying(p=> !p)} className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 inline-flex items-center gap-1">{playing? <Pause className="h-4 w-4"/>:<Play className="h-4 w-4"/>}{playing? 'Pause':'Play'}</button>
              <button onClick={()=> setIndex(i=> Math.max(0,i-1))} disabled={index===0} className="px-3 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-40"><StepBack className="h-4 w-4"/></button>
              <button onClick={()=> setIndex(i=> Math.min(frames.length-1,i+1))} disabled={index===frames.length-1} className="px-3 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-40"><StepForward className="h-4 w-4"/></button>
              <div className="flex items-center gap-2"><span className="text-xs text-slate-500">Speed</span><input type="range" min={0.5} max={2} step={0.5} value={speed} onChange={e=> setSpeed(Number(e.target.value))} /></div>
              <div className="text-xs font-mono bg-slate-900 text-rose-200 px-3 py-2 rounded-lg">Step {index+1}/{frames.length||1}</div>
            </div>
            <p className="text-[11px] text-slate-500 mb-3">Directed edges. Click two nodes sequentially to toggle edge (random weight in [-5,5]). Click weight badge to cycle value. Red highlight = relaxation improvement; amber = relaxation check with no improvement. Negative cycle detection edges accumulate at end if present.</p>
            <GraphCanvas key={resetKey} nodes={nodes} setNodes={setNodes} edges={edges} setEdges={setEdges} toggleEdge={toggleEdge} cycleWeight={cycleWeight} current={current} />
          </motion.div>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-3">State</h2>
            <StatePanel frame={current} totalPasses={nodes.length-1} />
          </motion.div>
        </div>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-rose-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2"><Info className="h-5 w-5 text-rose-600"/> Explanation</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4 min-h-[90px]">{current?.description}</p>
            <Legend />
          </div>
          <Navigation />
        </motion.div>
      </div>
    </div>
  </div>;
}

function GraphCanvas({nodes,setNodes,edges,setEdges,toggleEdge,cycleWeight,current}:{nodes:Node[];setNodes:React.Dispatch<React.SetStateAction<Node[]>>;edges:Edge[];setEdges:React.Dispatch<React.SetStateAction<Edge[]>>;toggleEdge:(a:string,b:string)=>void;cycleWeight:(id:string)=>void; current?:Frame}){
  const [first,setFirst] = useState<string|null>(null);
  const dragRef = useRef<{id:string; offX:number; offY:number} | null>(null);
  function handleNodeClick(id:string){ if(first===null) setFirst(id); else if(first===id) setFirst(null); else { toggleEdge(first,id); setFirst(null);} }
  function handleMouseDown(e:React.MouseEvent,id:string){ const rect=(e.currentTarget.parentElement as HTMLElement).getBoundingClientRect(); const n=nodes.find(nn=> nn.id===id)!; dragRef.current={id,offX:e.clientX-(rect.left+n.x), offY:e.clientY-(rect.top+n.y)}; }
  function handleMouseMove(e:React.MouseEvent){ if(!dragRef.current) return; const rect=(e.currentTarget as HTMLElement).getBoundingClientRect(); const {id,offX,offY}=dragRef.current; const x=e.clientX-rect.left-offX; const y=e.clientY-rect.top-offY; setNodes(ns=> ns.map(n=> n.id===id? {...n,x:Math.max(40,Math.min(rect.width-40,x)), y:Math.max(40,Math.min(rect.height-40,y))}: n)); }
  function handleMouseUp(){ dragRef.current=null; }
  function handleDoubleClick(e:React.MouseEvent){ if(dragRef.current) return; const rect=(e.currentTarget as HTMLElement).getBoundingClientRect(); const x=e.clientX-rect.left; const y=e.clientY-rect.top; const id=nextNodeId(); setNodes(ns=> [...ns,{id,x,y}]); }
  const relaxing = current?.relaxing; const negCycleEdges = current?.negativeCycle? current.cycleEdges: undefined;
  return <div onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onDoubleClick={handleDoubleClick} className="relative w-full h-[400px] bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 overflow-hidden select-none">
    <svg className="absolute inset-0 w-full h-full">
      {edges.map(e=> { const a=nodes.find(n=> n.id===e.from)!; const b=nodes.find(n=> n.id===e.to)!; const isRelax = relaxing && relaxing.from===e.from && relaxing.to===e.to; const isCycle = negCycleEdges?.some(c=> c.from===e.from && c.to===e.to); const stroke = isCycle? '#dc2626': isRelax? (relaxing!.improved? '#dc2626':'#f59e0b'):'#94a3b8'; const markerId = `arrow-${stroke.replace(/[#]/g,'')}`; return <g key={e.id}> <defs><marker id={markerId} markerWidth="10" markerHeight="10" refX="10" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill={stroke}/></marker></defs><line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={stroke} strokeWidth={ isCycle? 5: isRelax? 4:3 } strokeOpacity={0.85} markerEnd={`url(#${markerId})`} /> </g>; })}
    </svg>
    {edges.map(e=> { const a=nodes.find(n=> n.id===e.from)!; const b=nodes.find(n=> n.id===e.to)!; const mx=(a.x+b.x)/2; const my=(a.y+b.y)/2; return <button key={e.id+"lbl"} onClick={()=> cycleWeight(e.id)} style={{left:mx-18, top:my-16}} className="absolute px-2 py-1 rounded-md bg-white/90 border border-slate-300 shadow text-[11px] font-mono hover:bg-rose-50">{e.w}</button>; })}
    {nodes.map(n=> { const distVal = current? current.distances[n.id]: Infinity; const isSource = n.id=== 'N1'; return <button key={n.id} onMouseDown={(e)=> handleMouseDown(e,n.id)} onClick={()=> handleNodeClick(n.id)} style={{left:n.x-30, top:n.y-30}} className={`absolute h-16 w-16 rounded-full border-2 font-semibold flex flex-col items-center justify-center shadow bg-white text-slate-800 border-slate-300 cursor-move active:scale-95 text-[10px]`}><div>{n.id}</div><div className="font-mono">{distVal===Infinity?'∞':distVal}</div>{first===n.id && <span className="absolute -bottom-5 text-[10px] text-rose-600 font-mono">selecting</span>}</button>; })}
    {first && <div className="absolute top-2 left-2 text-[10px] px-2 py-1 bg-rose-600 text-white rounded">First: {first}</div>}
  </div>;
}

function StatePanel({frame,totalPasses}:{frame?:Frame; totalPasses:number}){
  if(!frame) return <div className="text-sm text-slate-500">Press Play to simulate.</div>;
  return <div className="space-y-4 text-xs">
    <div className="grid md:grid-cols-3 gap-4">
      <div className="p-3 rounded-xl bg-rose-50 border border-rose-200"><div className="font-semibold text-rose-700 text-[11px] uppercase tracking-wide mb-1">Pass</div><div className="font-mono">{frame.pass}/{totalPasses}</div></div>
      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200"><div className="font-semibold text-amber-700 text-[11px] uppercase tracking-wide mb-1">Edge Index</div><div className="font-mono">{frame.edgeIndex < 0? '-' : frame.edgeIndex}</div></div>
      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200"><div className="font-semibold text-emerald-700 text-[11px] uppercase tracking-wide mb-1">Updated This Step</div><div className="font-mono">{frame.relaxing? (frame.relaxing.improved? 'yes':'no'):'-'}</div></div>
    </div>
    <div className="p-3 rounded-xl bg-purple-50 border border-purple-200">
      <div className="font-semibold text-purple-700 text-[11px] uppercase tracking-wide mb-1">Distances</div>
      <div className="flex flex-wrap gap-1 font-mono">{Object.entries(frame.distances).map(([k,v])=> <span key={k} className="px-2 py-1 rounded bg-white border border-purple-300">{k}:{v===Infinity?'∞':v}</span>)}</div>
    </div>
    <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
      <div className="font-semibold text-blue-700 text-[11px] uppercase tracking-wide mb-1">Parents</div>
      <div className="flex flex-wrap gap-1 font-mono">{Object.entries(frame.parents).filter(([k,v])=> v).map(([k,v])=> <span key={k} className="px-2 py-1 rounded bg-white border border-blue-300">{k}←{v}</span>)}</div>
    </div>
    {frame.negativeCycle && <div className="p-3 rounded-xl bg-rose-100 border border-rose-300">
      <div className="font-semibold text-rose-700 text-[11px] uppercase tracking-wide mb-1 flex items-center gap-1"><AlertTriangle className="h-4 w-4"/> Negative Cycle</div>
      <div className="text-[11px] text-rose-700">Further relaxations still possible; distances not well-defined.</div>
      {frame.cycleEdges && <div className="mt-2 flex flex-wrap gap-1 font-mono">{frame.cycleEdges.map((e,i)=> <span key={i} className="px-2 py-1 rounded bg-white border border-rose-400">{e.from}→{e.to}</span>)}</div>}
    </div>}
  </div>;
}

function Legend(){
  return <div className="text-[11px] space-y-2">
    <div className="flex items-center gap-2"><span className="h-3 w-6 rounded bg-rose-600 inline-block"/> Relaxation improvement (edge)</div>
    <div className="flex items-center gap-2"><span className="h-3 w-6 rounded bg-amber-500 inline-block"/> Relaxation check (no improve)</div>
    <div className="flex items-center gap-2"><span className="h-3 w-6 rounded bg-red-600 inline-block"/> Negative cycle edge</div>
  </div>;
}

function Navigation(){
  return <div className="bg-white rounded-2xl shadow-sm p-6">
    <h2 className="text-lg font-semibold text-slate-800 mb-3">Continue Learning</h2>
    <div className="flex flex-wrap gap-3 justify-between items-center">
      <Link href="/algorithms/graph/bellman-ford/theory" className="inline-flex items-center px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"><ArrowLeft className="h-5 w-5 mr-2"/>Theory</Link>
      <Link href="/algorithms/graph" className="inline-flex items-center px-5 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700">Graph Overview <ArrowRight className="h-5 w-5 ml-2"/></Link>
    </div>
  </div>;
}
