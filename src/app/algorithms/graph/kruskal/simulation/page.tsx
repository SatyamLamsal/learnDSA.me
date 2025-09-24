"use client";
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Play, Pause, StepForward, StepBack, RotateCcw, Shuffle, Info, Scissors } from 'lucide-react';

interface Node { id:string; x:number; y:number; }
interface Edge { id:string; u:string; v:string; w:number; }
interface Frame { step:number; description:string; edgeIndex:number; considering?:Edge; chosen:Set<string>; skipped:Set<string>; parents:Record<string,string>; ranks:Record<string,number>; }

let nodeCounter=0; const nextNodeId=()=> `N${++nodeCounter}`;

export default function KruskalSimulationPage(){
  const [nodes,setNodes] = useState<Node[]>(()=> [ {id:nextNodeId(),x:120,y:160},{id:nextNodeId(),x:300,y:80},{id:nextNodeId(),x:300,y:240},{id:nextNodeId(),x:480,y:160} ]);
  const [edges,setEdges] = useState<Edge[]>(()=> generateInitial());
  const [frames,setFrames] = useState<Frame[]>([]);
  const [index,setIndex] = useState(0);
  const [playing,setPlaying] = useState(false);
  const [speed,setSpeed] = useState(1);
  const [resetKey,setResetKey] = useState(0);

  function generateInitial():Edge[]{
    const ids = ['e1','e2','e3','e4','e5'];
    return [
      {id:ids[0],u:'N1',v:'N2',w:4},
      {id:ids[1],u:'N1',v:'N3',w:2},
      {id:ids[2],u:'N2',v:'N4',w:6},
      {id:ids[3],u:'N3',v:'N4',w:3},
      {id:ids[4],u:'N2',v:'N3',w:5},
    ].sort((a,b)=> a.w - b.w || a.id.localeCompare(b.id));
  }

  const buildFrames = useCallback(()=>{
    const frames: Frame[] = [];
    const es = edges.slice().sort((a,b)=> a.w - b.w || a.id.localeCompare(b.id));
    const parent: Record<string,string> = {}; const rank: Record<string,number>={}; nodes.forEach(n=> { parent[n.id]=n.id; rank[n.id]=0; });
    const chosen = new Set<string>(); const skipped = new Set<string>();

    const find = (x:string):string => parent[x]===x? x: (parent[x]=find(parent[x]));
    function unite(a:string,b:string){ a=find(a); b=find(b); if(a===b) return false; if(rank[a] < rank[b]) [a,b]=[b,a]; parent[b]=a; if(rank[a]===rank[b]) rank[a]++; return true; }
    function snapshot(desc:string, edgeIndex:number, considering?:Edge){ frames.push({ step:frames.length, description:desc, edgeIndex, considering, chosen:new Set(chosen), skipped:new Set(skipped), parents:{...parent}, ranks:{...rank} }); }

    snapshot('Sort edges by non-decreasing weight.', -1);
    es.forEach((e,i)=>{
      const ru = find(e.u), rv = find(e.v);
      snapshot(`Consider edge ${e.u}-${e.v} (w=${e.w}). Components: ${ru} vs ${rv}.`, i, e);
      if(ru!==rv){ unite(ru,rv); chosen.add(e.id); snapshot(`Accept edge ${e.u}-${e.v}; merge sets -> MST size ${chosen.size}.`, i, e); }
      else { skipped.add(e.id); snapshot(`Skip edge ${e.u}-${e.v}; would form cycle.`, i, e); }
    });
    snapshot('Kruskal complete. Chosen edges form MST (or forest).', es.length);
    return frames;
  },[edges,nodes]);

  useEffect(()=> { setFrames(buildFrames()); setIndex(0); setPlaying(false); }, [buildFrames]);
  useEffect(()=> { if(!playing) return; if(index >= frames.length-1){ setPlaying(false); return; } const t=setTimeout(()=> setIndex(i=> i+1), 1000/ speed); return ()=> clearTimeout(t); },[playing,index,frames.length,speed]);
  const current = frames[index];

  function addNode(){ const id=nextNodeId(); setNodes(ns=> [...ns,{id,x:140+Math.random()*360,y:80+Math.random()*240}]); }
  function toggleEdge(a:string,b:string){ setEdges(es=> { const existing = es.find(e=> (e.u===a && e.v===b)||(e.u===b && e.v===a)); if(existing) return es.filter(e=> e!==existing); return [...es,{id:'e'+(es.length+1+Math.random()).toString(36).slice(2,6), u:a,v:b,w:1+Math.floor(Math.random()*9)}].sort((x,y)=> x.w-y.w || x.id.localeCompare(y.id)); }); }
  function cycleWeight(id:string){ setEdges(es=> es.map(e=> e.id===id? {...e,w: e.w===9?1:e.w+1}: e).sort((a,b)=> a.w-b.w || a.id.localeCompare(b.id))); }
  function randomizeGraph(){ nodeCounter=0; const count=5+Math.floor(Math.random()*2); const newNodes:Node[]=[]; for(let i=0;i<count;i++) newNodes.push({id:nextNodeId(), x:120+i*(480/(count-1)), y: 140 + (i%2? -70:70)}); const newEdges:Edge[]=[]; for(let i=0;i<count-1;i++) newEdges.push({id:'e'+(newEdges.length+1), u:newNodes[i].id, v:newNodes[i+1].id, w:1+Math.floor(Math.random()*9)}); for(let tries=0; tries<count*2; tries++){ const a=newNodes[Math.floor(Math.random()*count)].id; const b=newNodes[Math.floor(Math.random()*count)].id; if(a===b) continue; if(newEdges.some(e=> (e.u===a && e.v===b)||(e.u===b && e.v===a))) continue; if(Math.random()<0.5) continue; newEdges.push({id:'e'+(newEdges.length+1), u:a,v:b,w:1+Math.floor(Math.random()*9)}); } setNodes(newNodes); setEdges(newEdges.sort((a,b)=> a.w-b.w || a.id.localeCompare(b.id))); setResetKey(k=> k+1); setPlaying(false); setIndex(0); setFrames([]); }
  function reset(){ randomizeGraph(); }

  return <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-sky-50">
  <div className="container mx-auto px-4 py-12 max-w-screen-2xl">
      <Link href="/algorithms/graph/kruskal/theory" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2"/>Back to Theory</Link>
      <h1 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3"><Scissors className="h-7 w-7 text-indigo-600"/> Kruskal Simulation</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Graph & Controls</h2>
            <div className="flex flex-wrap gap-3 mb-4 text-sm">
              <button onClick={addNode} className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 inline-flex items-center gap-1">Add Node</button>
              <button onClick={reset} className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 inline-flex items-center gap-1">Reset</button>
              <button onClick={randomizeGraph} className="px-4 py-2 rounded-lg bg-sky-600 text-white font-semibold hover:bg-sky-700 inline-flex items-center gap-1">Randomize</button>
              <button onClick={()=> setPlaying(p=> !p)} className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 inline-flex items-center gap-1">{playing? <Pause className="h-4 w-4"/>:<Play className="h-4 w-4"/>}{playing? 'Pause':'Play'}</button>
              <button onClick={()=> setIndex(i=> Math.max(0,i-1))} disabled={index===0} className="px-3 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-40"><StepBack className="h-4 w-4"/></button>
              <button onClick={()=> setIndex(i=> Math.min(frames.length-1,i+1))} disabled={index===frames.length-1} className="px-3 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-40"><StepForward className="h-4 w-4"/></button>
              <div className="flex items-center gap-2"><span className="text-xs text-slate-500">Speed</span><input type="range" min={0.5} max={2} step={0.5} value={speed} onChange={e=> setSpeed(Number(e.target.value))} /></div>
              <div className="text-xs font-mono bg-slate-900 text-indigo-200 px-3 py-2 rounded-lg">Step {index+1}/{frames.length||1}</div>
            </div>
            <p className="text-[11px] text-slate-500 mb-3">Undirected graph. Click two nodes to toggle edge (1-9 weight). Click weight to cycle. Purple=considering, Green=chosen, Orange=skipped. Frame sequence follows sorted edge order.</p>
            <GraphCanvas key={resetKey} nodes={nodes} setNodes={setNodes} edges={edges} toggleEdge={toggleEdge} cycleWeight={cycleWeight} current={current} />
          </motion.div>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-3">State</h2>
            <StatePanel frame={current} />
          </motion.div>
        </div>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-indigo-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2"><Info className="h-5 w-5 text-indigo-600"/> Explanation</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4 min-h-[90px]">{current?.description}</p>
            <Legend />
          </div>
          <Navigation />
        </motion.div>
      </div>
    </div>
  </div>;
}

function GraphCanvas({nodes,setNodes,edges,toggleEdge,cycleWeight,current}:{nodes:Node[]; setNodes:React.Dispatch<React.SetStateAction<Node[]>>; edges:Edge[]; toggleEdge:(a:string,b:string)=>void; cycleWeight:(id:string)=>void; current?:Frame}){
  const [first,setFirst] = useState<string|null>(null);
  const dragRef = useRef<{id:string; offX:number; offY:number} | null>(null);
  function handleNodeClick(id:string){ if(first===null) setFirst(id); else if(first===id) setFirst(null); else { toggleEdge(first,id); setFirst(null);} }
  function handleMouseDown(e:React.MouseEvent,id:string){ const rect=(e.currentTarget.parentElement as HTMLElement).getBoundingClientRect(); const n=nodes.find(nn=> nn.id===id)!; dragRef.current={id,offX:e.clientX-(rect.left+n.x), offY:e.clientY-(rect.top+n.y)}; }
  function handleMouseMove(e:React.MouseEvent){ if(!dragRef.current) return; const rect=(e.currentTarget as HTMLElement).getBoundingClientRect(); const {id,offX,offY}=dragRef.current; const x=e.clientX-rect.left-offX; const y=e.clientY-rect.top-offY; setNodes(ns=> ns.map(n=> n.id===id? {...n,x:Math.max(40,Math.min(rect.width-40,x)), y:Math.max(40,Math.min(rect.height-40,y))}: n)); }
  function handleMouseUp(){ dragRef.current=null; }
  function handleDoubleClick(e:React.MouseEvent){ if(dragRef.current) return; const rect=(e.currentTarget as HTMLElement).getBoundingClientRect(); const x=e.clientX-rect.left; const y=e.clientY-rect.top; const id=nextNodeId(); setNodes(ns=> [...ns,{id,x,y}]); }
  const considering = current?.considering; const chosen = current? current.chosen: new Set<string>(); const skipped = current? current.skipped: new Set<string>();
  return <div onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onDoubleClick={handleDoubleClick} className="relative w-full h-[400px] bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 overflow-hidden select-none">
    <svg className="absolute inset-0 w-full h-full">
      {edges.map(e=> { const a=nodes.find(n=> n.id===e.u)!; const b=nodes.find(n=> n.id===e.v)!; let stroke='#94a3b8'; let width=3; if(considering && considering.id===e.id) { stroke='#6366f1'; width=5; } if(chosen.has(e.id)) { stroke='#059669'; width=5; } if(skipped.has(e.id)) { stroke='#f97316'; width=4; } return <line key={e.id} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={stroke} strokeWidth={width} strokeOpacity={0.85} />; })}
    </svg>
    {edges.map(e=> { const a=nodes.find(n=> n.id===e.u)!; const b=nodes.find(n=> n.id===e.v)!; const mx=(a.x+b.x)/2; const my=(a.y+b.y)/2; return <button key={e.id+"lbl"} onClick={()=> cycleWeight(e.id)} style={{left:mx-18, top:my-16}} className="absolute px-2 py-1 rounded-md bg-white/90 border border-slate-300 shadow text-[11px] font-mono hover:bg-indigo-50">{e.w}</button>; })}
    {nodes.map(n=> { return <button key={n.id} onMouseDown={(e)=> handleMouseDown(e,n.id)} onClick={()=> handleNodeClick(n.id)} style={{left:n.x-26, top:n.y-26}} className={`absolute h-14 w-14 rounded-full border-2 font-semibold flex flex-col items-center justify-center shadow bg-white text-slate-800 border-slate-300 cursor-move active:scale-95 text-[11px]`}><div>{n.id}</div>{first===n.id && <span className="absolute -bottom-5 text-[10px] text-indigo-600 font-mono">selecting</span>}</button>; })}
    {first && <div className="absolute top-2 left-2 text-[10px] px-2 py-1 bg-indigo-600 text-white rounded">First: {first}</div>}
  </div>;
}

function StatePanel({frame}:{frame?:Frame}){
  if(!frame) return <div className="text-sm text-slate-500">Press Play to simulate.</div>;
  return <div className="space-y-4 text-xs">
    <div className="grid md:grid-cols-3 gap-4">
      <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200"><div className="font-semibold text-indigo-700 text-[11px] uppercase tracking-wide mb-1">Edge Index</div><div className="font-mono">{frame.edgeIndex < 0? '-' : frame.edgeIndex}</div></div>
      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200"><div className="font-semibold text-emerald-700 text-[11px] uppercase tracking-wide mb-1">Chosen Count</div><div className="font-mono">{frame.chosen.size}</div></div>
      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200"><div className="font-semibold text-amber-700 text-[11px] uppercase tracking-wide mb-1">Skipped</div><div className="font-mono">{frame.skipped.size}</div></div>
    </div>
    {frame.considering && <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200"><div className="font-semibold text-indigo-700 text-[11px] uppercase tracking-wide mb-1">Considering</div><div className="text-[11px] font-mono">{frame.considering.u}-{frame.considering.v} w={frame.considering.w}</div></div>}
    <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 overflow-x-auto">
      <div className="font-semibold text-purple-700 text-[11px] uppercase tracking-wide mb-1">Parents (DSU)</div>
      <div className="flex flex-wrap gap-1 font-mono">{Object.entries(frame.parents).map(([k,v])=> <span key={k} className="px-2 py-1 rounded bg-white border border-purple-300">{k}:{v}</span>)}</div>
    </div>
    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 overflow-x-auto">
      <div className="font-semibold text-rose-700 text-[11px] uppercase tracking-wide mb-1">Ranks</div>
      <div className="flex flex-wrap gap-1 font-mono">{Object.entries(frame.ranks).map(([k,v])=> <span key={k} className="px-2 py-1 rounded bg-white border border-rose-300">{k}:{v}</span>)}</div>
    </div>
    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
      <div className="font-semibold text-slate-600 text-[11px] uppercase tracking-wide mb-1">Chosen Edges</div>
      <div className="flex flex-wrap gap-1 font-mono">{Array.from(frame.chosen).map(id=> <span key={id} className="px-2 py-1 rounded bg-white border border-emerald-300">{id}</span>)}</div>
    </div>
  </div>;
}

function Legend(){
  return <div className="text-[11px] space-y-2">
    <div className="flex items-center gap-2"><span className="h-3 w-6 rounded bg-indigo-500 inline-block"/> Considering edge</div>
    <div className="flex items-center gap-2"><span className="h-3 w-6 rounded bg-emerald-600 inline-block"/> Chosen (MST)</div>
    <div className="flex items-center gap-2"><span className="h-3 w-6 rounded bg-amber-500 inline-block"/> Skipped (cycle)</div>
  </div>;
}

function Navigation(){
  return <div className="bg-white rounded-2xl shadow-sm p-6">
    <h2 className="text-lg font-semibold text-slate-800 mb-3">Continue Learning</h2>
    <div className="flex flex-wrap gap-3 justify-between items-center">
      <Link href="/algorithms/graph/kruskal/theory" className="inline-flex items-center px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"><ArrowLeft className="h-5 w-5 mr-2"/>Theory</Link>
      <Link href="/algorithms/graph" className="inline-flex items-center px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Graph Overview <ArrowRight className="h-5 w-5 ml-2"/></Link>
    </div>
  </div>;
}
