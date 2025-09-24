"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Play, Pause, StepForward, StepBack, RotateCcw, Layers, Info, Plus } from 'lucide-react';

interface Node { id: string; x:number; y:number; }
interface Edge { id:string; from:string; to:string; }
interface Frame { step:number; description:string; stack:string[]; discovered:string[]; finished:string[]; active?:string; times:Record<string,{d?:number; f?:number}>; }

let nodeCounter = 0; const nextNodeId = ()=> `N${++nodeCounter}`;

export default function DFSSimulationPage(){
  const [nodes,setNodes] = useState<Node[]>(()=> [ {id:nextNodeId(),x:100,y:140},{id:nextNodeId(),x:260,y:80},{id:nextNodeId(),x:260,y:200},{id:nextNodeId(),x:420,y:140} ]);
  const [edges,setEdges] = useState<Edge[]>(()=> [ {id:'e1',from:'N1',to:'N2'},{id:'e2',from:'N1',to:'N3'},{id:'e3',from:'N2',to:'N4'},{id:'e4',from:'N3',to:'N4'} ]);
  const [frames,setFrames] = useState<Frame[]>([]);
  const [index,setIndex] = useState(0);
  const [playing,setPlaying] = useState(false);
  const [speed,setSpeed] = useState(1);
  const [resetKey,setResetKey] = useState(0);

  const adjacency = useMemo(()=>{ const m:Record<string,string[]>={}; nodes.forEach(n=> m[n.id]=[]); edges.forEach(e=> { m[e.from].push(e.to); m[e.to].push(e.from); }); return m; },[nodes,edges]);

  const buildFrames = useCallback(()=>{
    const frames:Frame[] = []; let time=0;
    const discovered = new Set<string>(); const finished = new Set<string>();
    const times: Frame['times'] = {}; nodes.forEach(n=> times[n.id]={});

    function snapshot(desc:string, active?:string, stack:string[]=[]){
      frames.push({ step:frames.length, description:desc, stack:[...stack], discovered:[...discovered], finished:[...finished], active, times: JSON.parse(JSON.stringify(times)) });
    }

    const stack: string[] = [];
    function dfs(u:string){
      discovered.add(u); stack.push(u); time++; times[u].d = time; snapshot(`Discover ${u} (d=${time}).`, u, stack);
      for(const v of adjacency[u]){
        if(!discovered.has(v)){
          snapshot(`Tree Edge ${u}→${v}`, u, stack);
          dfs(v);
          snapshot(`Backtrack to ${u} from ${v}.`, u, stack);
        } else if(!finished.has(v)) {
          snapshot(`Back Edge ${u}→${v} (cycle)`, u, stack);
        } else {
          snapshot(`Cross/Forward Edge ${u}→${v}`, u, stack);
        }
      }
      finished.add(u); stack.pop(); time++; times[u].f = time; snapshot(`Finish ${u} (f=${time}).`, u, stack);
    }

    nodes.forEach(n=> { if(!discovered.has(n.id)) { snapshot(`Start new DFS tree at ${n.id}.`); dfs(n.id); } });
    snapshot('DFS complete.');
    return frames;
  },[adjacency,nodes]);

  useEffect(()=> { setFrames(buildFrames()); setIndex(0); setPlaying(false); }, [buildFrames]);

  useEffect(()=> { if(!playing) return; if(index >= frames.length-1){ setPlaying(false); return; } const t = setTimeout(()=> setIndex(i=> i+1), 1000/ speed); return ()=> clearTimeout(t); },[playing,index,frames.length,speed]);

  const current = frames[index];

  function addNode(){ const id=nextNodeId(); setNodes(ns=> [...ns,{id,x:120+Math.random()*400,y:80+Math.random()*200}]); }
  function generateRandomGraph(){
    nodeCounter = 0;
    const baseCount = 4 + Math.floor(Math.random()*3); // 4-6 nodes
    const newNodes: Node[] = [];
    for(let i=0;i<baseCount;i++) newNodes.push({id: nextNodeId(), x: 100 + i* (420/(baseCount-1)), y: 120 + (i%2? -60:60)});
    // Random edges ensuring connectivity via chain + random extras
    const newEdges: Edge[] = [];
    for(let i=0;i<baseCount-1;i++){ newEdges.push({id:'e'+(newEdges.length+1), from:newNodes[i].id, to:newNodes[i+1].id}); }
    for(let tries=0; tries<baseCount; tries++){
      const a = newNodes[Math.floor(Math.random()*baseCount)].id;
      const b = newNodes[Math.floor(Math.random()*baseCount)].id;
      if(a===b) continue;
      if(newEdges.some(e=> (e.from===a && e.to===b)||(e.from===b && e.to===a))) continue;
      if(Math.random()<0.5) continue;
      newEdges.push({id:'e'+(newEdges.length+1), from:a,to:b});
    }
    setNodes(newNodes); setEdges(newEdges);
  }
  function reset(){
    setPlaying(false); setIndex(0); setFrames([]);
    generateRandomGraph();
    setResetKey(k=> k+1);
  }

  return <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50">
  <div className="container mx-auto px-4 py-12 max-w-screen-2xl">
      <Link href="/algorithms/graph/dfs" className="inline-flex items-center text-green-600 hover:text-green-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2"/>Back to DFS</Link>
      <h1 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3"><Layers className="h-7 w-7 text-green-600"/> DFS Simulation</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Graph & Controls</h2>
            <div className="flex flex-wrap gap-3 mb-4 text-sm">
              <button onClick={addNode} className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 inline-flex items-center gap-1"><Plus className="h-4 w-4"/>Add Node</button>
              <button onClick={reset} className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 inline-flex items-center gap-1"><RotateCcw className="h-4 w-4"/>Reset</button>
              <button onClick={()=> setPlaying(p=> !p)} className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 inline-flex items-center gap-1">{playing? <Pause className="h-4 w-4"/>:<Play className="h-4 w-4"/>}{playing? 'Pause':'Play'}</button>
              <button onClick={()=> setIndex(i=> Math.max(0,i-1))} disabled={index===0} className="px-3 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-40"><StepBack className="h-4 w-4"/></button>
              <button onClick={()=> setIndex(i=> Math.min(frames.length-1,i+1))} disabled={index===frames.length-1} className="px-3 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-40"><StepForward className="h-4 w-4"/></button>
              <div className="flex items-center gap-2"><span className="text-xs text-slate-500">Speed</span><input type="range" min={0.5} max={2} step={0.5} value={speed} onChange={e=> setSpeed(Number(e.target.value))} /></div>
              <div className="text-xs font-mono bg-slate-900 text-green-200 px-3 py-2 rounded-lg">Step {index+1}/{frames.length||1}</div>
            </div>
            <p className="text-[11px] text-slate-500 mb-2">Drag nodes, double-click empty space to add, click two nodes (select then another) to toggle edge.</p>
            <GraphCanvas key={resetKey} nodes={nodes} setNodes={setNodes} edges={edges} setEdges={setEdges} current={current} />
          </motion.div>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-3">State</h2>
            <StatePanel frame={current} />
          </motion.div>
        </div>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-green-200">
            <h2 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2"><Info className="h-5 w-5 text-green-600"/> Explanation</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4 min-h-[80px]">{current?.description}</p>
            <Legend />
          </div>
          <Navigation />
        </motion.div>
      </div>
    </div>
  </div>;
}

function GraphCanvas({nodes,setNodes,edges,setEdges,current}:{nodes:Node[];setNodes:React.Dispatch<React.SetStateAction<Node[]>>;edges:Edge[];setEdges:React.Dispatch<React.SetStateAction<Edge[]>>;current?:Frame}){
  const [first,setFirst] = useState<string|null>(null);
  const dragRef = useRef<{id:string; offX:number; offY:number} | null>(null);
  function toggleEdge(a:string,b:string){
    setEdges(es=> {
      const existing = es.find(e=> (e.from===a && e.to===b)||(e.from===b && e.to===a));
      if(existing) return es.filter(e=> e!==existing);
      return [...es, {id:'e'+(es.length+1+Math.random()).toString(36).slice(2,6), from:a,to:b}];
    });
  }
  function handleNodeClick(id:string){ if(first===null) setFirst(id); else if(first===id) setFirst(null); else { toggleEdge(first,id); setFirst(null);} }
  function handleMouseDown(e:React.MouseEvent,id:string){ const rect=(e.currentTarget.parentElement as HTMLElement).getBoundingClientRect(); const node=nodes.find(n=> n.id===id)!; dragRef.current={id, offX:e.clientX-(rect.left+node.x), offY:e.clientY-(rect.top+node.y)}; }
  function handleMouseMove(e:React.MouseEvent){ if(!dragRef.current) return; const rect=(e.currentTarget as HTMLElement).getBoundingClientRect(); const {id,offX,offY}=dragRef.current; const x=e.clientX-rect.left-offX; const y=e.clientY-rect.top-offY; setNodes(ns=> ns.map(n=> n.id===id? {...n,x:Math.max(40,Math.min(rect.width-40,x)), y:Math.max(40,Math.min(rect.height-40,y))}: n)); }
  function handleMouseUp(){ dragRef.current=null; }
  function handleDoubleClick(e:React.MouseEvent){ if(dragRef.current) return; const rect=(e.currentTarget as HTMLElement).getBoundingClientRect(); const x=e.clientX-rect.left; const y=e.clientY-rect.top; const id=nextNodeId(); setNodes(ns=> [...ns,{id,x,y}]); }
  return <div onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onDoubleClick={handleDoubleClick} className="relative w-full h-[360px] bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 overflow-hidden select-none">
    <svg className="absolute inset-0 w-full h-full">
      {edges.map(e=> { const a=nodes.find(n=> n.id===e.from)!; const b=nodes.find(n=> n.id===e.to)!; return <line key={e.id} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#94a3b8" strokeWidth={3} strokeOpacity={0.6} />; })}
    </svg>
    {nodes.map(n=> { const isActive = current?.active===n.id; const isDiscovered = current?.discovered.includes(n.id); const isFinished = current?.finished.includes(n.id); const color = isActive? 'bg-blue-600 text-white border-blue-700': isFinished? 'bg-green-600 text-white border-green-700': isDiscovered? 'bg-yellow-400 text-slate-800 border-yellow-500':'bg-white text-slate-800 border-slate-300'; const t = current?.times[n.id]; return <button key={n.id} onMouseDown={(e)=> handleMouseDown(e,n.id)} onClick={()=> handleNodeClick(n.id)} style={{left:n.x-28, top:n.y-28}} className={`absolute h-14 w-14 rounded-full border-2 font-semibold flex flex-col items-center justify-center shadow ${color} transition-colors cursor-move active:scale-95 text-[10px]`}><div>{n.id}</div><div className="font-mono">{t?.d??''}/{t?.f??''}</div>{first===n.id && <span className="absolute -bottom-5 text-[10px] text-green-600 font-mono">selecting</span>}</button>; })}
    {first && <div className="absolute top-2 left-2 text-[10px] px-2 py-1 bg-green-600 text-white rounded">First: {first}</div>}
  </div>;
}

function StatePanel({frame}:{frame?:Frame}){
  if(!frame) return <div className="text-sm text-slate-500">Press Play to simulate DFS.</div>;
  return <div className="grid md:grid-cols-3 gap-4 text-xs">
    <div className="p-3 rounded-xl bg-yellow-50 border border-yellow-300"><div className="font-semibold text-yellow-700 text-[11px] uppercase tracking-wide mb-1">Discovered</div><div className="flex flex-wrap gap-1 font-mono">{frame.discovered.map(v=> <span key={v} className="px-2 py-1 rounded bg-white border border-yellow-400">{v}</span>)}</div></div>
    <div className="p-3 rounded-xl bg-green-50 border border-green-200"><div className="font-semibold text-green-700 text-[11px] uppercase tracking-wide mb-1">Finished</div><div className="flex flex-wrap gap-1 font-mono">{frame.finished.map(v=> <span key={v} className="px-2 py-1 rounded bg-white border border-green-300">{v}</span>)}</div></div>
    <div className="p-3 rounded-xl bg-blue-50 border border-blue-200"><div className="font-semibold text-blue-700 text-[11px] uppercase tracking-wide mb-1">Stack</div><div className="flex flex-wrap gap-1 font-mono">{frame.stack.map(v=> <span key={v} className="px-2 py-1 rounded bg-white border border-blue-300">{v}</span>)}</div></div>
    <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 md:col-span-3"><div className="font-semibold text-purple-700 text-[11px] uppercase tracking-wide mb-1">Times (d/f)</div><div className="flex flex-wrap gap-1 font-mono">{Object.entries(frame.times).map(([k,v])=> <span key={k} className="px-2 py-1 rounded bg-white border border-purple-300">{k}:{v.d??''}/{v.f??''}</span>)}</div></div>
  </div>;
}

function Legend(){
  return <div className="text-[11px] space-y-2">
    <div className="flex items-center gap-2"><span className="h-4 w-4 rounded-full bg-blue-600 border-2 border-blue-700 inline-block"/> Active (current recursion)</div>
    <div className="flex items-center gap-2"><span className="h-4 w-4 rounded-full bg-yellow-400 border-2 border-yellow-500 inline-block"/> Discovered (GRAY)</div>
    <div className="flex items-center gap-2"><span className="h-4 w-4 rounded-full bg-green-600 border-2 border-green-700 inline-block"/> Finished (BLACK)</div>
    <div className="flex items-center gap-2"><span className="h-4 w-4 rounded-full bg-white border-2 border-slate-300 inline-block"/> Undiscovered (WHITE)</div>
  </div>;
}

function Navigation(){
  return <div className="bg-white rounded-2xl shadow-sm p-6">
    <h2 className="text-lg font-semibold text-slate-800 mb-3">Continue Learning</h2>
    <div className="flex justify-between items-center flex-wrap gap-3">
      <Link href="/algorithms/graph/dfs/theory" className="inline-flex items-center px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"><ArrowLeft className="h-5 w-5 mr-2"/>Theory</Link>
      <Link href="/algorithms/graph" className="inline-flex items-center px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Graph Overview <ArrowRight className="h-5 w-5 ml-2"/></Link>
    </div>
  </div>;
}
