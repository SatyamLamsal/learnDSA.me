"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Play, Pause, StepForward, StepBack, RotateCcw, Plus, Info, TreePine, Shuffle } from 'lucide-react';

interface Node { id:string; x:number; y:number; }
interface Edge { id:string; from:string; to:string; w:number; }
interface QueueEntry { id:string; key:number; parent:string|null; }
interface ConsideringEdge { from:string; to:string; weight:number; improved:boolean; }
interface Frame { step:number; description:string; queue:QueueEntry[]; inTree:Set<string>; keys:Record<string,number>; parents:Record<string,string|null>; current?:string; considering?:ConsideringEdge; chosenEdges:Set<string>; }

let nodeCounter=0; const nextNodeId=()=> `N${++nodeCounter}`;

export default function PrimSimulationPage(){
  const [nodes,setNodes] = useState<Node[]>(()=> [ {id:nextNodeId(),x:120,y:160},{id:nextNodeId(),x:300,y:80},{id:nextNodeId(),x:300,y:240},{id:nextNodeId(),x:480,y:160} ]);
  const [edges,setEdges] = useState<Edge[]>(()=> [ {id:'e1',from:'N1',to:'N2',w:4}, {id:'e2',from:'N1',to:'N3',w:2}, {id:'e3',from:'N2',to:'N4',w:6}, {id:'e4',from:'N3',to:'N4',w:3}, {id:'e5',from:'N2',to:'N3',w:5} ]);
  const [start,setStart] = useState('N1');
  const [frames,setFrames] = useState<Frame[]>([]);
  const [index,setIndex] = useState(0);
  const [playing,setPlaying] = useState(false);
  const [speed,setSpeed] = useState(1);
  const [resetKey,setResetKey] = useState(0);

  const adjacency = useMemo(()=> { const m:Record<string,Edge[]> = {}; nodes.forEach(n=> m[n.id]=[]); edges.forEach(e=> { if(!m[e.from]) m[e.from]=[]; if(!m[e.to]) m[e.to]=[]; // undirected
    m[e.from].push(e); m[e.to].push({id:e.id, from:e.to, to:e.from, w:e.w}); }); return m; },[nodes,edges]);

  const buildFrames = useCallback(()=>{
    const frames: Frame[] = [];
    const key: Record<string,number> = {}; const parent: Record<string,string|null> = {}; const inTree = new Set<string>(); const chosenEdges = new Set<string>();
    nodes.forEach(n=> { key[n.id] = Infinity; parent[n.id] = null; }); key[start]=0;
    // PQ represented as array of candidate vertices (lazy duplicates allowed) keyed by key[v]
    const pq: {id:string; val:number}[] = [{id:start, val:0}];

    function snapshot(desc:string, current?:string, considering?:ConsideringEdge){
      // derive queue snapshot: include for each not-in-tree vertex its current key if it matches an active pq entry
      const active: Record<string,number> = {};
      pq.forEach(e=> { if(inTree.has(e.id)) return; if(key[e.id]!==e.val) return; if(active[e.id]===undefined || key[e.id] < active[e.id]) active[e.id] = key[e.id]; });
      const qSnap: QueueEntry[] = Object.entries(active).map(([id,k])=> ({id, key:k, parent: parent[id]})).sort((a,b)=> a.key-b.key || a.id.localeCompare(b.id));
      frames.push({ step:frames.length, description:desc, queue:qSnap, inTree:new Set(inTree), keys:{...key}, parents:{...parent}, current, considering, chosenEdges:new Set(chosenEdges) });
    }

    snapshot(`Initialize keys (start ${start} = 0). All vertices in PQ.` , start);

    while(true){
      // extract-min among candidates respecting current key[]
      let bestId: string | null = null; let bestVal = Infinity; let bestIdx=-1;
      for(let i=0;i<pq.length;i++){ const e=pq[i]; if(inTree.has(e.id)) continue; if(key[e.id] !== e.val) continue; if(e.val < bestVal){ bestVal = e.val; bestId = e.id; bestIdx=i; } }
      if(bestId===null) break; // done
      const u = bestId; pq.splice(bestIdx,1);
      snapshot(`Extract-min vertex ${u} (key=${key[u]===Infinity?'∞':key[u]}).`, u);
      inTree.add(u);
      if(parent[u]!==null){ chosenEdges.add(edgeIdBetween(u,parent[u]!, edges)); snapshot(`Add edge (${parent[u]}-${u}) to MST.`, u); }
      snapshot(`Finalize ${u}; update frontier keys.`, u);
      for(const e of adjacency[u]){
        if(inTree.has(e.to)) continue;
        const improved = e.w < key[e.to];
        snapshot(`Consider edge ${u}−${e.to} (w=${e.w}). ${improved? 'Better key found.':'No improvement.'}`, u, {from:u,to:e.to,weight:e.w, improved});
        if(improved){ key[e.to] = e.w; parent[e.to] = u; pq.push({id:e.to, val:key[e.to]}); snapshot(`Decrease-key: set key[${e.to}]=${e.w}; parent=${u}.`, u, {from:u,to:e.to,weight:e.w, improved:true}); }
      }
    }
    snapshot('Prim complete. Chosen edges form MST component(s).');
    return frames;
  },[nodes,start,adjacency,edges]);

  useEffect(()=> { setFrames(buildFrames()); setIndex(0); setPlaying(false); }, [buildFrames]);
  useEffect(()=> { if(!playing) return; if(index >= frames.length-1){ setPlaying(false); return; } const t=setTimeout(()=> setIndex(i=> i+1), 1000/ speed); return ()=> clearTimeout(t); },[playing,index,frames.length,speed]);
  const current = frames[index];

  function edgeIdBetween(a:string,b:string, es:Edge[]){ const e = es.find(e=> (e.from===a && e.to===b) || (e.from===b && e.to===a)); return e? e.id: `${a}_${b}`; }
  function addNode(){ const id=nextNodeId(); setNodes(ns=> [...ns,{id,x:140+Math.random()*360,y:80+Math.random()*240}]); }
  function toggleEdge(a:string,b:string){ setEdges(es=> { const ex = es.find(e=> (e.from===a && e.to===b)||(e.from===b && e.to===a)); if(ex) return es.filter(e=> e!==ex); return [...es,{id:'e'+(es.length+1+Math.random()).toString(36).slice(2,6), from:a,to:b,w:1+Math.floor(Math.random()*9)}]; }); }
  function cycleWeight(id:string){ setEdges(es=> es.map(e=> e.id===id? {...e,w:e.w===9?1:e.w+1}: e)); }
  function randomizeGraph(){ nodeCounter=0; const count=5+Math.floor(Math.random()*2); const newNodes:Node[]=[]; for(let i=0;i<count;i++) newNodes.push({id:nextNodeId(), x:120 + i*(480/(count-1)), y: 140 + (i%2? -70:70)}); const newEdges:Edge[]=[]; for(let i=0;i<count-1;i++) newEdges.push({id:'e'+(newEdges.length+1), from:newNodes[i].id, to:newNodes[i+1].id, w:1+Math.floor(Math.random()*9)}); for(let tries=0; tries<count*2; tries++){ const a=newNodes[Math.floor(Math.random()*count)].id; const b=newNodes[Math.floor(Math.random()*count)].id; if(a===b) continue; if(newEdges.some(e=> (e.from===a && e.to===b)||(e.from===b && e.to===a))) continue; if(Math.random()<0.5) continue; newEdges.push({id:'e'+(newEdges.length+1), from:a,to:b,w:1+Math.floor(Math.random()*9)}); } setNodes(newNodes); setEdges(newEdges); setStart(newNodes[0].id); setResetKey(k=> k+1); setPlaying(false); setIndex(0); setFrames([]); }
  function reset(){ randomizeGraph(); }

  return <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
  <div className="container mx-auto px-4 py-12 max-w-screen-2xl">
      <Link href="/algorithms/graph/prim/theory" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2"/>Back to Theory</Link>
      <h1 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3"><TreePine className="h-7 w-7 text-emerald-600"/> Prim Simulation</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Graph & Controls</h2>
            <div className="flex flex-wrap gap-3 mb-4 text-sm">
              <button onClick={addNode} className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 inline-flex items-center gap-1"><Plus className="h-4 w-4"/>Add Node</button>
              <button onClick={reset} className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 inline-flex items-center gap-1"><RotateCcw className="h-4 w-4"/>Reset</button>
              <button onClick={randomizeGraph} className="px-4 py-2 rounded-lg bg-teal-600 text-white font-semibold hover:bg-teal-700 inline-flex items-center gap-1"><Shuffle className="h-4 w-4"/>Randomize</button>
              <select value={start} onChange={e=> setStart(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-300 text-sm">
                {nodes.map(n=> <option key={n.id}>{n.id}</option>)}
              </select>
              <button onClick={()=> setPlaying(p=> !p)} className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 inline-flex items-center gap-1">{playing? <Pause className="h-4 w-4"/>:<Play className="h-4 w-4"/>}{playing? 'Pause':'Play'}</button>
              <button onClick={()=> setIndex(i=> Math.max(0,i-1))} disabled={index===0} className="px-3 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-40"><StepBack className="h-4 w-4"/></button>
              <button onClick={()=> setIndex(i=> Math.min(frames.length-1,i+1))} disabled={index===frames.length-1} className="px-3 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-40"><StepForward className="h-4 w-4"/></button>
              <div className="flex items-center gap-2"><span className="text-xs text-slate-500">Speed</span><input type="range" min={0.5} max={2} step={0.5} value={speed} onChange={e=> setSpeed(Number(e.target.value))} /></div>
              <div className="text-xs font-mono bg-slate-900 text-emerald-200 px-3 py-2 rounded-lg">Step {index+1}/{frames.length||1}</div>
            </div>
            <p className="text-[11px] text-slate-500 mb-3">Undirected graph. Drag nodes. Click two nodes to toggle an edge. Click an edge weight to cycle 1-9. Colors: Green=in MST, Yellow=frontier (in PQ), Blue=current extraction, Gray=unreached. Edge colors: Emerald=chosen MST, Indigo=considering, Slate=idle.</p>
            <GraphCanvas key={resetKey} nodes={nodes} setNodes={setNodes} edges={edges} setEdges={setEdges} toggleEdge={toggleEdge} cycleWeight={cycleWeight} current={current} />
          </motion.div>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-3">State</h2>
            <StatePanel frame={current} />
          </motion.div>
        </div>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-emerald-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2"><Info className="h-5 w-5 text-emerald-600"/> Explanation</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4 min-h-[90px]">{current?.description}</p>
            <Legend />
          </div>
          <Navigation />
        </motion.div>
      </div>
    </div>
  </div>;
}

function GraphCanvas({nodes,setNodes,edges,setEdges,toggleEdge,cycleWeight,current}:{nodes:Node[]; setNodes:React.Dispatch<React.SetStateAction<Node[]>>; edges:Edge[]; setEdges:React.Dispatch<React.SetStateAction<Edge[]>>; toggleEdge:(a:string,b:string)=>void; cycleWeight:(id:string)=>void; current?:Frame}){
  const [first,setFirst] = useState<string|null>(null);
  const dragRef = useRef<{id:string; offX:number; offY:number} | null>(null);
  function handleNodeClick(id:string){ if(first===null) setFirst(id); else if(first===id) setFirst(null); else { toggleEdge(first,id); setFirst(null);} }
  function handleMouseDown(e:React.MouseEvent,id:string){ const rect=(e.currentTarget.parentElement as HTMLElement).getBoundingClientRect(); const n=nodes.find(nn=> nn.id===id)!; dragRef.current={id,offX:e.clientX-(rect.left+n.x), offY:e.clientY-(rect.top+n.y)}; }
  function handleMouseMove(e:React.MouseEvent){ if(!dragRef.current) return; const rect=(e.currentTarget as HTMLElement).getBoundingClientRect(); const {id,offX,offY}=dragRef.current; const x=e.clientX-rect.left-offX; const y=e.clientY-rect.top-offY; setNodes(ns=> ns.map(n=> n.id===id? {...n,x:Math.max(40,Math.min(rect.width-40,x)), y:Math.max(40,Math.min(rect.height-40,y))}: n)); }
  function handleMouseUp(){ dragRef.current=null; }
  function handleDoubleClick(e:React.MouseEvent){ if(dragRef.current) return; const rect=(e.currentTarget as HTMLElement).getBoundingClientRect(); const x=e.clientX-rect.left; const y=e.clientY-rect.top; const id=nextNodeId(); setNodes(ns=> [...ns,{id,x,y}]); }
  const considering = current?.considering; const chosenEdges = current? current.chosenEdges: new Set<string>();
  function isChosenEdge(e:Edge){ return chosenEdges.has(e.id); }
  return <div onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onDoubleClick={handleDoubleClick} className="relative w-full h-[400px] bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 overflow-hidden select-none">
    <svg className="absolute inset-0 w-full h-full">
      {edges.map(e=> { const a=nodes.find(n=> n.id===e.from)!; const b=nodes.find(n=> n.id===e.to)!; let stroke='#94a3b8'; let width=3; if(considering && ((considering.from===e.from && considering.to===e.to)||(considering.from===e.to && considering.to===e.from))) { stroke='#6366f1'; width=5; } if(isChosenEdge(e)) { stroke='#059669'; width=5; } return <line key={e.id} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={stroke} strokeWidth={width} strokeOpacity={0.85} />; })}
    </svg>
    {edges.map(e=> { const a=nodes.find(n=> n.id===e.from)!; const b=nodes.find(n=> n.id===e.to)!; const mx=(a.x+b.x)/2; const my=(a.y+b.y)/2; return <button key={e.id+"lbl"} onClick={()=> cycleWeight(e.id)} style={{left:mx-18, top:my-16}} className="absolute px-2 py-1 rounded-md bg-white/90 border border-slate-300 shadow text-[11px] font-mono hover:bg-emerald-50">{e.w}</button>; })}
    {nodes.map(n=> { const inTree = current?.inTree.has(n.id); const isCurrent = current?.current===n.id; const inQueue = current?.queue.some(q=> q.id===n.id); const color = isCurrent? 'bg-blue-600 text-white border-blue-700': inTree? 'bg-green-600 text-white border-green-700': inQueue? 'bg-yellow-400 text-slate-800 border-yellow-500':'bg-white text-slate-800 border-slate-300'; const keyVal = current? current.keys[n.id]: Infinity; return <button key={n.id} onMouseDown={(e)=> handleMouseDown(e,n.id)} onClick={()=> handleNodeClick(n.id)} style={{left:n.x-30, top:n.y-30}} className={`absolute h-16 w-16 rounded-full border-2 font-semibold flex flex-col items-center justify-center shadow ${color} transition-colors cursor-move active:scale-95 text-[10px]`}><div>{n.id}</div><div className="font-mono">{keyVal===Infinity?'∞':keyVal}</div>{first===n.id && <span className="absolute -bottom-5 text-[10px] text-emerald-600 font-mono">selecting</span>}</button>; })}
    {first && <div className="absolute top-2 left-2 text-[10px] px-2 py-1 bg-emerald-600 text-white rounded">First: {first}</div>}
  </div>;
}

function StatePanel({frame}:{frame?:Frame}){
  if(!frame) return <div className="text-sm text-slate-500">Press Play to simulate.</div>;
  return <div className="space-y-4 text-xs">
    <div className="grid md:grid-cols-3 gap-4">
      <div className="p-3 rounded-xl bg-green-50 border border-green-200"><div className="font-semibold text-green-700 text-[11px] uppercase tracking-wide mb-1">In Tree</div><div className="flex flex-wrap gap-1 font-mono">{Array.from(frame.inTree).map(id=> <span key={id} className="px-2 py-1 rounded bg-white border border-green-300">{id}</span>)}</div></div>
      <div className="p-3 rounded-xl bg-yellow-50 border border-yellow-200"><div className="font-semibold text-yellow-700 text-[11px] uppercase tracking-wide mb-1">Frontier (PQ)</div><div className="flex flex-wrap gap-1 font-mono">{frame.queue.map(q=> <span key={q.id} className="px-2 py-1 rounded bg-white border border-yellow-400">{q.id}:{q.key===Infinity?'∞':q.key}</span>)}</div></div>
      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200"><div className="font-semibold text-emerald-700 text-[11px] uppercase tracking-wide mb-1">Chosen Edges</div><div className="flex flex-wrap gap-1 font-mono">{Array.from(frame.chosenEdges).map(id=> <span key={id} className="px-2 py-1 rounded bg-white border border-emerald-300">{id}</span>)}</div></div>
    </div>
    <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 overflow-x-auto"><div className="font-semibold text-blue-700 text-[11px] uppercase tracking-wide mb-1">Parents</div><div className="flex flex-wrap gap-1 font-mono">{Object.entries(frame.parents).filter(([k])=> frame.parents[k]!==null).map(([k,v])=> <span key={k} className="px-2 py-1 rounded bg-white border border-blue-300">{k}←{v}</span>)}</div></div>
    <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 overflow-x-auto"><div className="font-semibold text-purple-700 text-[11px] uppercase tracking-wide mb-1">Keys</div><div className="flex flex-wrap gap-1 font-mono">{Object.entries(frame.keys).map(([k,v])=> <span key={k} className="px-2 py-1 rounded bg-white border border-purple-300">{k}:{v===Infinity?'∞':v}</span>)}</div></div>
    {frame.considering && <div className={`p-3 rounded-xl ${frame.considering.improved? 'bg-emerald-50 border border-emerald-200':'bg-slate-50 border border-slate-200'}`}>
      <div className="font-semibold text-slate-700 text-[11px] uppercase tracking-wide mb-1">Edge Check</div>
      <div className="text-[11px] text-slate-600">Edge {frame.considering.from}−{frame.considering.to} (w={frame.considering.weight}) {frame.considering.improved? 'improves key.':'no improvement.'}</div>
    </div>}
  </div>;
}

function Legend(){
  return <div className="text-[11px] space-y-2">
    <div className="flex items-center gap-2"><span className="h-4 w-4 rounded-full bg-blue-600 border-2 border-blue-700 inline-block"/> Current extraction</div>
    <div className="flex items-center gap-2"><span className="h-4 w-4 rounded-full bg-green-600 border-2 border-green-700 inline-block"/> In MST</div>
    <div className="flex items-center gap-2"><span className="h-4 w-4 rounded-full bg-yellow-400 border-2 border-yellow-500 inline-block"/> Frontier (PQ)</div>
    <div className="flex items-center gap-2"><span className="h-4 w-4 rounded-sm bg-emerald-500 inline-block" style={{boxShadow:'0 0 0 2px #05966955'}}/> Chosen MST edge</div>
    <div className="flex items-center gap-2"><span className="h-4 w-4 rounded-sm bg-indigo-500 inline-block" style={{boxShadow:'0 0 0 2px #6366f155'}}/> Considering edge</div>
  </div>;
}

function Navigation(){
  return <div className="bg-white rounded-2xl shadow-sm p-6">
    <h2 className="text-lg font-semibold text-slate-800 mb-3">Continue Learning</h2>
    <div className="flex flex-wrap gap-3 justify-between items-center">
      <Link href="/algorithms/graph/prim/theory" className="inline-flex items-center px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"><ArrowLeft className="h-5 w-5 mr-2"/>Theory</Link>
      <Link href="/algorithms/graph" className="inline-flex items-center px-5 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">Graph Overview <ArrowRight className="h-5 w-5 ml-2"/></Link>
    </div>
  </div>;
}
