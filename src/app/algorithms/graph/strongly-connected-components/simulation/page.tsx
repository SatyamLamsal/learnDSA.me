"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Play, Pause, StepForward, StepBack, RotateCcw, Plus, Info, Network, Shuffle } from 'lucide-react';

interface Node { id:string; x:number; y:number; }
interface Edge { id:string; from:string; to:string; }
interface Frame { step:number; description:string; stage:'first-dfs'|'transpose'|'second-dfs'|'done'; order:string[]; stack:string[]; visited:Set<string>; current?:string; exploringEdge?:{from:string;to:string}; componentMap:Record<string,number>; finishedComponent?:number; }

let nodeCounter=0; const nextNodeId=()=> `V${++nodeCounter}`;

export default function SCCSimulationPage(){
  const [nodes,setNodes] = useState<Node[]>(()=> [ {id:nextNodeId(),x:140,y:160},{id:nextNodeId(),x:320,y:80},{id:nextNodeId(),x:320,y:240},{id:nextNodeId(),x:500,y:160} ]);
  const [edges,setEdges] = useState<Edge[]>(()=> [ {id:'e1',from:'V1',to:'V2'}, {id:'e2',from:'V2',to:'V3'}, {id:'e3',from:'V3',to:'V1'}, {id:'e4',from:'V2',to:'V4'} ]);
  const [frames,setFrames] = useState<Frame[]>([]);
  const [index,setIndex] = useState(0);
  const [playing,setPlaying] = useState(false);
  const [speed,setSpeed] = useState(1);
  const [resetKey,setResetKey] = useState(0);

  const adjacency = useMemo(()=>{ const m:Record<string,Edge[]>={}; nodes.forEach(n=> m[n.id]=[]); edges.forEach(e=> { if(!m[e.from]) m[e.from]=[]; m[e.from].push(e); }); return m; },[nodes,edges]);
  const transpose = useMemo(()=>{ const m:Record<string,Edge[]>={}; nodes.forEach(n=> m[n.id]=[]); edges.forEach(e=> { if(!m[e.to]) m[e.to]=[]; m[e.to].push({id:e.id, from:e.to, to:e.from}); }); return m; },[nodes,edges]);

  const buildFrames = useCallback(()=>{
    const frames: Frame[] = [];
    const visited1 = new Set<string>(); const order: string[] = []; const callStack: string[] = []; function snapshot(desc:string, stage:Frame['stage'], current?:string, exploring?:{from:string;to:string}, finishedComponent?:number, componentMap:Record<string,number>={}){ frames.push({ step:frames.length, description:desc, stage, order:[...order], stack:[...callStack], visited:new Set(stage==='second-dfs'? new Set(Object.keys(componentMap)) : new Set(visited1)), current, exploringEdge:exploring, componentMap:{...componentMap}, finishedComponent }); }

    // First DFS
    function dfs1(u:string){ visited1.add(u); callStack.push(u); snapshot(`Enter ${u} (first DFS).`, 'first-dfs', u, undefined, undefined, {}); for(const e of adjacency[u]){ snapshot(`Explore edge ${e.from}→${e.to}.`, 'first-dfs', u, {from:e.from,to:e.to}, undefined, {}); if(!visited1.has(e.to)) dfs1(e.to); }
      callStack.pop(); order.push(u); snapshot(`Finish ${u}; push to order stack.`, 'first-dfs', u, undefined, undefined, {}); }

    for(const v of nodes.map(n=> n.id)){ if(!visited1.has(v)) { snapshot(`Start DFS1 at ${v}.`, 'first-dfs', v); dfs1(v); } }
    snapshot('First pass complete. Order stack ready.', 'first-dfs');
    snapshot('Compute transpose graph.', 'transpose');

    // Second DFS
    const assigned: Record<string,number> = {}; let compId=0; function snapshot2(desc:string, current?:string, exploring?:{from:string;to:string}, finishedComponent?:number){ snapshot(desc, 'second-dfs', current, exploring, finishedComponent, assigned); }
    function dfs2(u:string){ assigned[u]=compId; callStack.push(u); snapshot2(`Enter ${u} on transpose (component ${compId}).`, u); for(const e of transpose[u]){ snapshot2(`Transpose edge ${e.from}→${e.to}.`, u, {from:e.from,to:e.to}); if(assigned[e.to]===undefined) dfs2(e.to); }
      callStack.pop(); snapshot2(`Finish ${u}.`, u); }

    for(const v of order.slice().reverse()){ if(assigned[v]===undefined){ compId++; snapshot2(`Start DFS2 at ${v}; new component ${compId}.`, v); dfs2(v); snapshot2(`Component ${compId} complete.`, undefined, undefined, compId); } }
    snapshot('All components identified.', 'done', undefined, undefined, undefined, assigned);

    return frames;
  },[nodes,adjacency,transpose]);

  useEffect(()=> { setFrames(buildFrames()); setIndex(0); setPlaying(false); }, [buildFrames]);
  useEffect(()=> { if(!playing) return; if(index >= frames.length-1){ setPlaying(false); return; } const t=setTimeout(()=> setIndex(i=> i+1), 1000/ speed); return ()=> clearTimeout(t); },[playing,index,frames.length,speed]);
  const current = frames[index];

  function addNode(){ const id=nextNodeId(); setNodes(ns=> [...ns,{id,x:150+Math.random()*340,y:80+Math.random()*240}]); }
  function toggleEdge(a:string,b:string){ setEdges(es=> { const forward = es.find(e=> e.from===a && e.to===b); const backward = es.find(e=> e.from===b && e.to===a); if(!forward && !backward) return [...es,{id:'e'+(es.length+1+Math.random()).toString(36).slice(2,6), from:a,to:b}]; if(forward && !backward) return es.filter(e=> e!==forward).concat({id:forward.id, from:b,to:a}); if(!forward && backward) return es.filter(e=> e!==backward); return es; }); }
  function randomizeGraph(){ nodeCounter=0; const count=5+Math.floor(Math.random()*2); const newNodes:Node[]=[]; for(let i=0;i<count;i++) newNodes.push({id:nextNodeId(), x:140+i*(480/(count-1)), y: 140 + (i%2? -70:70)}); const newEdges:Edge[]=[]; for(let tries=0; tries<count*3; tries++){ const a=newNodes[Math.floor(Math.random()*count)].id; const b=newNodes[Math.floor(Math.random()*count)].id; if(a===b) continue; if(newEdges.some(e=> e.from===a && e.to===b)) continue; if(Math.random()<0.5) continue; newEdges.push({id:'e'+(newEdges.length+1), from:a,to:b}); } setNodes(newNodes); setEdges(newEdges); setResetKey(k=> k+1); setPlaying(false); setIndex(0); setFrames([]); }
  function reset(){ randomizeGraph(); }

  return <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 via-pink-50 to-rose-50 text-gray-700">
  <div className="container mx-auto px-4 py-12 max-w-screen-2xl text-gray-700">
      <Link href="/algorithms/graph/strongly-connected-components/theory" className="inline-flex items-center text-fuchsia-600 hover:text-fuchsia-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Back to Theory</Link>
      <h1 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3"><Network className="h-7 w-7 text-fuchsia-600"/> SCC Simulation (Kosaraju)</h1>
      <div className="grid lg:grid-cols-3 gap-8 text-gray-700">
        <div className="lg:col-span-2 space-y-6 text-gray-700">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Directed Graph & Controls</h2>
            <div className="flex flex-wrap gap-3 mb-4 text-sm text-gray-600">
              <button onClick={addNode} className="px-4 py-2 rounded-lg bg-fuchsia-600 text-white font-semibold hover:bg-fuchsia-700 inline-flex items-center gap-1 text-gray-100"><Plus className="h-4 w-4 text-gray-700"/>Add Node</button>
              <button onClick={reset} className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 inline-flex items-center gap-1"><RotateCcw className="h-4 w-4 text-gray-700"/>Reset</button>
              <button onClick={randomizeGraph} className="px-4 py-2 rounded-lg bg-rose-600 text-white font-semibold hover:bg-rose-700 inline-flex items-center gap-1 text-gray-100"><Shuffle className="h-4 w-4 text-gray-700"/>Randomize</button>
              <button onClick={()=> setPlaying(p=> !p)} className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 inline-flex items-center gap-1">{playing? <Pause className="h-4 w-4 text-gray-700"/>:<Play className="h-4 w-4 text-gray-700"/>}{playing? 'Pause':'Play'}</button>
              <button onClick={()=> setIndex(i=> Math.max(0,i-1))} disabled={index===0} className="px-3 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-40"><StepBack className="h-4 w-4 text-gray-700"/></button>
              <button onClick={()=> setIndex(i=> Math.min(frames.length-1,i+1))} disabled={index===frames.length-1} className="px-3 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-40"><StepForward className="h-4 w-4 text-gray-700"/></button>
              <div className="flex items-center gap-2 text-gray-700"><span className="text-xs text-slate-500">Speed</span><input type="range" min={0.5} max={2} step={0.5} value={speed} onChange={e=> setSpeed(Number(e.target.value))} /></div>
              <div className="text-xs font-mono bg-slate-900 text-fuchsia-200 px-3 py-2 rounded-lg">Step {index+1}/{frames.length||1}</div>
            </div>
            <p className="text-[11px] text-slate-500 mb-3">Click two nodes successively to cycle edge states: none → a→b → b→a → none. Drag nodes. Colors: Blue=current DFS vertex, Yellow=active recursion stack, Green=finished order (first pass) or assigned component (second pass, tinted). Edge highlight during exploration. Stages: First DFS, Transpose, Second DFS.</p>
            <GraphCanvas key={resetKey} nodes={nodes} setNodes={setNodes} edges={edges} setEdges={setEdges} toggleEdge={toggleEdge} current={current} />
          </motion.div>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
            <h2 className="text-lg font-semibold text-slate-800 mb-3">State</h2>
            <StatePanel frame={current} />
          </motion.div>
        </div>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="space-y-6 text-gray-700">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-fuchsia-200 text-gray-700">
            <h2 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2"><Info className="h-5 w-5 text-fuchsia-600"/> Explanation</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4 min-h-[90px]">{current?.description}</p>
            <Legend />
          </div>
          <Navigation />
        </motion.div>
      </div>
    </div>
  </div>;
}

function GraphCanvas({nodes,setNodes,edges,setEdges,toggleEdge,current}:{nodes:Node[]; setNodes:React.Dispatch<React.SetStateAction<Node[]>>; edges:Edge[]; setEdges:React.Dispatch<React.SetStateAction<Edge[]>>; toggleEdge:(a:string,b:string)=>void; current?:Frame}){
  const [first,setFirst] = useState<string|null>(null);
  const dragRef = useRef<{id:string; offX:number; offY:number} | null>(null);
  function handleNodeClick(id:string){ if(first===null) setFirst(id); else if(first===id) setFirst(null); else { toggleEdge(first,id); setFirst(null);} }
  function handleMouseDown(e:React.MouseEvent,id:string){ const rect=(e.currentTarget.parentElement as HTMLElement).getBoundingClientRect(); const n=nodes.find(nn=> nn.id===id)!; dragRef.current={id,offX:e.clientX-(rect.left+n.x), offY:e.clientY-(rect.top+n.y)}; }
  function handleMouseMove(e:React.MouseEvent){ if(!dragRef.current) return; const rect=(e.currentTarget as HTMLElement).getBoundingClientRect(); const {id,offX,offY}=dragRef.current; const x=e.clientX-rect.left-offX; const y=e.clientY-rect.top-offY; setNodes(ns=> ns.map(n=> n.id===id? {...n,x:Math.max(40,Math.min(rect.width-40,x)), y:Math.max(40,Math.min(rect.height-40,y))}: n)); }
  function handleMouseUp(){ dragRef.current=null; }
  function handleDoubleClick(e:React.MouseEvent){ if(dragRef.current) return; const rect=(e.currentTarget as HTMLElement).getBoundingClientRect(); const x=e.clientX-rect.left; const y=e.clientY-rect.top; const id=nextNodeId(); setNodes(ns=> [...ns,{id,x,y}]); }
  const exploring = current?.exploringEdge;
  return <div onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onDoubleClick={handleDoubleClick} className="relative w-full h-[420px] bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 overflow-hidden select-none text-gray-700">
    <svg className="absolute inset-0 w-full h-full">
      {edges.map(e=> { const a=nodes.find(n=> n.id===e.from)!; const b=nodes.find(n=> n.id===e.to)!; const isExploring = exploring && exploring.from===e.from && exploring.to===e.to; const stroke = isExploring? '#6366f1':'#94a3b8'; const markerId='arrow'; return <g key={e.id}><defs><marker id={markerId} viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill={stroke}/></marker></defs><line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={stroke} strokeWidth={ isExploring?5:3 } markerEnd={`url(#${markerId})`} strokeOpacity={0.85} /></g>; })}
    </svg>
    {nodes.map(n=> { const inOrder = current?.order.includes(n.id); const inStack = current?.stack.includes(n.id); const comp = current?.componentMap[n.id]; const isCurrent = current?.current===n.id; let color='bg-white text-slate-800 border-slate-300'; if(inStack) color='bg-yellow-400 text-slate-800 border-yellow-500'; if(inOrder) color='bg-green-600 text-white border-green-700'; if(comp) color=`bg-fuchsia-500 text-white border-fuchsia-600`; if(isCurrent) color='bg-blue-600 text-white border-blue-700'; return <button key={n.id} onMouseDown={(e)=> handleMouseDown(e,n.id)} onClick={()=> handleNodeClick(n.id)} style={{left:n.x-30, top:n.y-30}} className={`absolute h-16 w-16 rounded-full border-2 font-semibold flex flex-col items-center justify-center shadow ${color} transition-colors cursor-move active:scale-95 text-[10px]`}><div>{n.id}</div>{comp && <div className="font-mono text-[9px] text-gray-700">C{comp}</div>}{first===n.id && <span className="absolute -bottom-5 text-[10px] text-fuchsia-600 font-mono">selecting</span>}</button>; })}
    {first && <div className="absolute top-2 left-2 text-[10px] px-2 py-1 bg-fuchsia-600 text-white rounded text-gray-700">First: {first}</div>}
  </div>;
}

function StatePanel({frame}:{frame?:Frame}){
  if(!frame) return <div className="text-sm text-slate-500">Press Play to simulate.</div>;
  return <div className="space-y-4 text-xs text-gray-600">
    <div className="grid md:grid-cols-4 gap-4 text-gray-700">
      <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-gray-700"><div className="font-semibold text-blue-700 text-[11px] uppercase tracking-wide mb-1">Stage</div><div className="font-mono text-gray-700">{frame.stage}</div></div>
      <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-gray-700"><div className="font-semibold text-green-700 text-[11px] uppercase tracking-wide mb-1">Order Size</div><div className="font-mono text-gray-700">{frame.order.length}</div></div>
      <div className="p-3 rounded-xl bg-yellow-50 border border-yellow-200 text-gray-700"><div className="font-semibold text-yellow-700 text-[11px] uppercase tracking-wide mb-1">Stack Depth</div><div className="font-mono text-gray-700">{frame.stack.length}</div></div>
      <div className="p-3 rounded-xl bg-fuchsia-50 border border-fuchsia-200 text-gray-700"><div className="font-semibold text-fuchsia-700 text-[11px] uppercase tracking-wide mb-1">Components</div><div className="font-mono text-gray-700">{Object.values(frame.componentMap).reduce((m,v)=> Math.max(m,v),0)}</div></div>
    </div>
    <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 overflow-x-auto text-gray-700"><div className="font-semibold text-purple-700 text-[11px] uppercase tracking-wide mb-1">Order Stack (postorder)</div><div className="flex flex-wrap gap-1 font-mono text-gray-700">{frame.order.map(v=> <span key={v} className="px-2 py-1 rounded bg-white border border-purple-300 text-gray-600">{v}</span>)}</div></div>
    {frame.stage==='second-dfs' && <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 overflow-x-auto text-gray-700"><div className="font-semibold text-rose-700 text-[11px] uppercase tracking-wide mb-1">Component Map</div><div className="flex flex-wrap gap-1 font-mono text-gray-700">{Object.entries(frame.componentMap).map(([k,v])=> <span key={k} className="px-2 py-1 rounded bg-white border border-rose-300 text-gray-600">{k}:C{v}</span>)}</div></div>}
    {frame.exploringEdge && <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-gray-700"><div className="font-semibold text-indigo-700 text-[11px] uppercase tracking-wide mb-1">Exploring</div><div className="font-mono text-[11px] text-gray-700">{frame.exploringEdge.from}→{frame.exploringEdge.to}</div></div>}
    {frame.finishedComponent && <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-gray-700"><div className="font-semibold text-emerald-700 text-[11px] uppercase tracking-wide mb-1">Completed Component</div><div className="font-mono text-[11px] text-gray-700">C{frame.finishedComponent}</div></div>}
  </div>;
}

function Legend(){
  return <div className="text-[11px] space-y-2 text-gray-700">
    <div className="flex items-center gap-2 text-gray-700"><span className="h-4 w-4 rounded-full bg-blue-600 border-2 border-blue-700 inline-block text-gray-600"/> Current DFS node</div>
    <div className="flex items-center gap-2 text-gray-700"><span className="h-4 w-4 rounded-full bg-yellow-400 border-2 border-yellow-500 inline-block text-gray-600"/> Active recursion stack</div>
    <div className="flex items-center gap-2 text-gray-700"><span className="h-4 w-4 rounded-full bg-green-600 border-2 border-green-700 inline-block text-gray-600"/> Finished (first pass)</div>
    <div className="flex items-center gap-2 text-gray-700"><span className="h-4 w-4 rounded-full bg-fuchsia-500 border-2 border-fuchsia-600 inline-block text-gray-600"/> Assigned component</div>
    <div className="flex items-center gap-2 text-gray-700"><span className="h-4 w-6 rounded bg-indigo-500 inline-block text-gray-600"/> Exploring edge</div>
  </div>;
}

function Navigation(){
  return <div className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
    <h2 className="text-lg font-semibold text-slate-800 mb-3">Continue Learning</h2>
    <div className="flex flex-wrap gap-3 justify-between items-center text-gray-700">
      <Link href="/algorithms/graph/strongly-connected-components/theory" className="inline-flex items-center px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Theory</Link>
      <Link href="/algorithms/graph" className="inline-flex items-center px-5 py-2 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-700 text-gray-100">Graph Overview <ArrowRight className="h-5 w-5 ml-2 text-gray-700"/></Link>
    </div>
  </div>;
}
