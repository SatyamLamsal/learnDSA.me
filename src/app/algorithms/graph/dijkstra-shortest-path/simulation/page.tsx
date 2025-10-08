"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Play, Pause, StepForward, StepBack, RotateCcw, Plus, Info, Map, Shuffle } from 'lucide-react';

interface Node { id:string; x:number; y:number; }
interface Edge { id:string; from:string; to:string; w:number; }
interface RelaxingInfo { from:string; to:string; weight:number; improved:boolean; }
interface QueueEntry { id:string; dist:number; }
interface Frame { step:number; description:string; queue:QueueEntry[]; settled:string[]; distances:Record<string,number>; parents:Record<string,string|null>; current?:string; relaxing?:RelaxingInfo; }

let nodeCounter = 0; const nextNodeId = ()=> `N${++nodeCounter}`;

export default function DijkstraSimulationPage(){
  const [nodes,setNodes] = useState<Node[]>(()=> [ {id:nextNodeId(), x:120,y:160}, {id:nextNodeId(), x:300,y:80}, {id:nextNodeId(), x:300,y:240}, {id:nextNodeId(), x:480,y:160} ]);
  const [edges,setEdges] = useState<Edge[]>(()=> [ {id:'e1',from:'N1',to:'N2',w:4}, {id:'e2',from:'N1',to:'N3',w:2}, {id:'e3',from:'N2',to:'N4',w:1}, {id:'e4',from:'N3',to:'N4',w:5}, {id:'e5',from:'N2',to:'N3',w:3} ]);
  const [source,setSource] = useState('N1');
  const [frames,setFrames] = useState<Frame[]>([]);
  const [index,setIndex] = useState(0);
  const [playing,setPlaying] = useState(false);
  const [speed,setSpeed] = useState(1);
  const [resetKey,setResetKey] = useState(0);

  const adjacency = useMemo(()=>{ const m:Record<string,Edge[]> = {}; nodes.forEach(n=> m[n.id]=[]); edges.forEach(e=> { // undirected for visualization simplicity
    if(!m[e.from]) m[e.from]=[]; if(!m[e.to]) m[e.to]=[]; m[e.from].push(e); m[e.to].push({id:e.id, from:e.to, to:e.from, w:e.w});
  }); return m; },[nodes,edges]);

  const buildFrames = useCallback(()=>{
    const frames: Frame[] = [];
    const dist: Record<string, number> = {}; const parent: Record<string,string|null> = {}; const settled = new Set<string>();
    nodes.forEach(n=> { dist[n.id] = Infinity; parent[n.id] = null; }); dist[source]=0;
    // priority queue via simple array of (id,dist) insertions (lazy duplicates allowed)
    const pq: QueueEntry[] = [{id:source, dist:0}];

    function snapshot(desc:string, current?:string, relaxing?:RelaxingInfo){
      // derive queue snapshot: take latest dist for unsettled vertices present in pq
      const latest: Record<string,number> = {};
      pq.forEach(e=> { if(settled.has(e.id)) return; if(e.dist !== dist[e.id]) return; latest[e.id] = dist[e.id]; });
      const qSnap = Object.entries(latest).map(([id,d])=> ({id, dist:d})).sort((a,b)=> a.dist - b.dist || a.id.localeCompare(b.id));
      frames.push({ step:frames.length, description:desc, queue:qSnap, settled:[...settled], distances:{...dist}, parents:{...parent}, current, relaxing });
    }

    snapshot(`Initialize distances; source ${source} = 0; push into priority queue.`, source);

    while(pq.length){
      // extract-min (linear scan)
      let bestIndex = -1; let bestDist = Infinity; for(let i=0;i<pq.length;i++){ const e=pq[i]; if(settled.has(e.id)) continue; if(dist[e.id] !== e.dist) continue; if(e.dist < bestDist){ bestDist=e.dist; bestIndex=i; } }
      if(bestIndex === -1) break; // only stale entries remain
      const {id:u} = pq[bestIndex]; pq.splice(bestIndex,1);
      if(settled.has(u)) continue;
      snapshot(`Extract-min ${u} (dist=${dist[u]}).`, u);
      settled.add(u);
      snapshot(`Settle ${u}; distance is now final.`, u);
      for(const e of adjacency[u]){
        if(settled.has(e.to)) continue;
        const improved = dist[u] + e.w < dist[e.to];
        snapshot(`Consider edge ${u}→${e.to} (w=${e.w}). ${improved? 'Relax possible.':'No improvement.'}` , u, {from:u,to:e.to,weight:e.w, improved});
        if(improved){
          dist[e.to] = dist[u] + e.w; parent[e.to] = u;
          pq.push({id:e.to, dist: dist[e.to]});
          snapshot(`Relax ${e.to}: set dist=${dist[e.to]} parent=${u} and push to queue.`, u, {from:u,to:e.to,weight:e.w, improved:true});
        }
      }
    }
    snapshot('Dijkstra complete. All reachable nodes settled.');
    return frames;
  },[nodes,source,adjacency]);

  useEffect(()=> { setFrames(buildFrames()); setIndex(0); setPlaying(false); }, [buildFrames]);

  useEffect(()=> { if(!playing) return; if(index >= frames.length-1){ setPlaying(false); return; } const t = setTimeout(()=> setIndex(i=> i+1), 1000/ speed); return ()=> clearTimeout(t); },[playing,index,frames.length,speed]);

  const current = frames[index];

  function addNode(){ const id=nextNodeId(); setNodes(ns=> [...ns,{id,x:140+Math.random()*360,y:80+Math.random()*240}]); }
  function toggleEdge(a:string,b:string){
    setEdges(es=> {
      const existing = es.find(e=> (e.from===a && e.to===b)||(e.from===b && e.to===a));
      if(existing){ // remove
        return es.filter(e=> e!==existing);
      }
      const id='e'+(es.length+1+Math.random()).toString(36).slice(2,6);
      const w = 1 + Math.floor(Math.random()*9);
      return [...es,{id,from:a,to:b,w}];
    });
  }
  function cycleEdgeWeight(edgeId:string){ setEdges(es=> es.map(e=> e.id===edgeId? {...e,w: e.w===9?1:e.w+1}: e)); }
  function randomizeGraph(){
    nodeCounter = 0;
    const count = 5 + Math.floor(Math.random()*3); // 5-7 nodes
    const newNodes: Node[] = [];
    for(let i=0;i<count;i++) newNodes.push({id: nextNodeId(), x: 120 + (i*(480/(count-1))), y: 140 + (i%2? -70:70)});
    const newEdges: Edge[] = [];
    // ensure a path chain for connectivity
    for(let i=0;i<count-1;i++) newEdges.push({id:'e'+(newEdges.length+1), from:newNodes[i].id, to:newNodes[i+1].id, w: 1+Math.floor(Math.random()*8)});
    // add some random extra edges
    for(let tries=0; tries<count*2; tries++){
      const a = newNodes[Math.floor(Math.random()*count)].id;
      const b = newNodes[Math.floor(Math.random()*count)].id;
      if(a===b) continue;
      if(newEdges.some(e=> (e.from===a && e.to===b)||(e.from===b && e.to===a))) continue;
      if(Math.random()<0.5) continue;
      newEdges.push({id:'e'+(newEdges.length+1), from:a,to:b,w:1+Math.floor(Math.random()*9)});
    }
    setNodes(newNodes); setEdges(newEdges); setSource(newNodes[0].id); setResetKey(k=> k+1); setPlaying(false); setIndex(0); setFrames([]);
  }
  function reset(){ randomizeGraph(); }

  return <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 text-gray-700">
  <div className="container mx-auto px-4 py-12 max-w-screen-2xl text-gray-700">
      <Link href="/algorithms/graph/dijkstra-shortest-path/theory" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Back to Theory</Link>
      <h1 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3"><Map className="h-7 w-7 text-blue-600"/> Dijkstra Simulation</h1>
      <div className="grid lg:grid-cols-3 gap-8 text-gray-700">
        <div className="lg:col-span-2 space-y-6 text-gray-700">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Weighted Graph & Controls</h2>
            <div className="flex flex-wrap gap-3 mb-4 text-sm text-gray-600">
              <button onClick={addNode} className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 inline-flex items-center gap-1 text-gray-100"><Plus className="h-4 w-4 text-gray-700"/>Add Node</button>
              <button onClick={reset} className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 inline-flex items-center gap-1"><RotateCcw className="h-4 w-4 text-gray-700"/>Reset</button>
              <button onClick={randomizeGraph} className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 inline-flex items-center gap-1 text-gray-100"><Shuffle className="h-4 w-4 text-gray-700"/>Randomize</button>
              <select value={source} onChange={e=> setSource(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-300 text-sm">
                {nodes.map(n=> <option key={n.id}>{n.id}</option>)}
              </select>
              <button onClick={()=> setPlaying(p=> !p)} className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 inline-flex items-center gap-1">{playing? <Pause className="h-4 w-4 text-gray-700"/>:<Play className="h-4 w-4 text-gray-700"/>}{playing? 'Pause':'Play'}</button>
              <button onClick={()=> setIndex(i=> Math.max(0,i-1))} disabled={index===0} className="px-3 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-40"><StepBack className="h-4 w-4 text-gray-700"/></button>
              <button onClick={()=> setIndex(i=> Math.min(frames.length-1,i+1))} disabled={index===frames.length-1} className="px-3 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-40"><StepForward className="h-4 w-4 text-gray-700"/></button>
              <div className="flex items-center gap-2 text-gray-700"><span className="text-xs text-slate-500">Speed</span><input type="range" min={0.5} max={2} step={0.5} value={speed} onChange={e=> setSpeed(Number(e.target.value))} /></div>
              <div className="text-xs font-mono bg-slate-900 text-blue-200 px-3 py-2 rounded-lg">Step {index+1}/{frames.length||1}</div>
            </div>
            <p className="text-[11px] text-slate-500 mb-3">Drag nodes. Double-click empty space to add a node. Click two nodes to toggle an undirected weighted edge (random weight). Click a weight label to cycle 1-9. Colors: Blue=current, Green=settled, Yellow=frontier (in queue), White=unreached.</p>
            <GraphCanvas key={resetKey} nodes={nodes} setNodes={setNodes} edges={edges} setEdges={setEdges} toggleEdge={toggleEdge} cycleWeight={cycleEdgeWeight} current={current} />
          </motion.div>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
            <h2 className="text-lg font-semibold text-slate-800 mb-3">State</h2>
            <StatePanel frame={current} />
          </motion.div>
        </div>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="space-y-6 text-gray-700">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-blue-200 text-gray-700">
            <h2 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2"><Info className="h-5 w-5 text-blue-600"/> Explanation</h2>
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
  const relaxing = current?.relaxing;
  return <div onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onDoubleClick={handleDoubleClick} className="relative w-full h-[380px] bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 overflow-hidden select-none text-gray-700">
    <svg className="absolute inset-0 w-full h-full">
      {edges.map(e=> { const a=nodes.find(n=> n.id===e.from)!; const b=nodes.find(n=> n.id===e.to)!; const isRelax = relaxing && ((relaxing.from===e.from && relaxing.to===e.to) || (relaxing.from===e.to && relaxing.to===e.from)); const stroke = isRelax? (relaxing!.improved? '#059669':'#2563eb'):'#94a3b8'; return <g key={e.id}> <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={stroke} strokeWidth={ isRelax? 5:3 } strokeOpacity={ isRelax? 0.9:0.6 } /> </g>; })}
    </svg>
    {edges.map(e=> { const a=nodes.find(n=> n.id===e.from)!; const b=nodes.find(n=> n.id===e.to)!; const mx=(a.x+b.x)/2; const my=(a.y+b.y)/2; return <button key={e.id+"lbl"} onClick={()=> cycleWeight(e.id)} style={{left:mx-16, top:my-14}} className="absolute px-2 py-1 rounded-md bg-white/90 border border-slate-300 shadow text-[11px] font-mono hover:bg-blue-50">w={e.w}</button>; })}
    {nodes.map(n=> { const isSettled = current?.settled.includes(n.id); const inQueue = current?.queue.some(q=> q.id===n.id); const isCurrent = current?.current===n.id; const color = isCurrent? 'bg-blue-600 text-white border-blue-700': isSettled? 'bg-green-600 text-white border-green-700': inQueue? 'bg-yellow-400 text-slate-800 border-yellow-500':'bg-white text-slate-800 border-slate-300'; const distVal = current? current.distances[n.id]: Infinity; return <button key={n.id} onMouseDown={(e)=> handleMouseDown(e,n.id)} onClick={()=> handleNodeClick(n.id)} style={{left:n.x-30, top:n.y-30}} className={`absolute h-16 w-16 rounded-full border-2 font-semibold flex flex-col items-center justify-center shadow ${color} transition-colors cursor-move active:scale-95 text-[10px]`}><div>{n.id}</div><div className="font-mono text-gray-700">{distVal===Infinity?'∞':distVal}</div>{first===n.id && <span className="absolute -bottom-5 text-[10px] text-blue-600 font-mono">selecting</span>}</button>; })}
    {first && <div className="absolute top-2 left-2 text-[10px] px-2 py-1 bg-blue-600 text-white rounded text-gray-700">First: {first}</div>}
  </div>;
}

function StatePanel({frame}:{frame?:Frame}){
  if(!frame) return <div className="text-sm text-slate-500">Press Play to build frames.</div>;
  return <div className="grid md:grid-cols-3 gap-4 text-xs text-gray-600">
    <div className="p-3 rounded-xl bg-yellow-50 border border-yellow-300 text-gray-700"><div className="font-semibold text-yellow-700 text-[11px] uppercase tracking-wide mb-1">Frontier (PQ)</div><div className="flex flex-wrap gap-1 font-mono text-gray-700">{frame.queue.map(q=> <span key={q.id} className="px-2 py-1 rounded bg-white border border-yellow-400 text-gray-600">{q.id}:{q.dist===Infinity?'∞':q.dist}</span>)}</div></div>
    <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-gray-700"><div className="font-semibold text-green-700 text-[11px] uppercase tracking-wide mb-1">Settled</div><div className="flex flex-wrap gap-1 font-mono text-gray-700">{frame.settled.map(id=> <span key={id} className="px-2 py-1 rounded bg-white border border-green-300 text-gray-600">{id}</span>)}</div></div>
    <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-gray-700"><div className="font-semibold text-blue-700 text-[11px] uppercase tracking-wide mb-1">Parents</div><div className="flex flex-wrap gap-1 font-mono text-gray-700">{Object.entries(frame.parents).filter(([k])=> frame.distances[k]!==Infinity && k!==frame.parents[k]).map(([k,v])=> <span key={k} className="px-2 py-1 rounded bg-white border border-blue-300 text-gray-600">{k}←{v}</span>)}</div></div>
    <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 md:col-span-3 text-gray-700"><div className="font-semibold text-purple-700 text-[11px] uppercase tracking-wide mb-1">Distances</div><div className="flex flex-wrap gap-1 font-mono text-gray-700">{Object.entries(frame.distances).map(([k,v])=> <span key={k} className="px-2 py-1 rounded bg-white border border-purple-300 text-gray-600">{k}:{v===Infinity?'∞':v}</span>)}</div></div>
    {frame.relaxing && <div className={`p-3 rounded-xl md:col-span-3 ${frame.relaxing.improved? 'bg-emerald-50 border border-emerald-200':'bg-slate-50 border border-slate-200'}`}>
      <div className="font-semibold text-slate-700 text-[11px] uppercase tracking-wide mb-1">Relaxation</div>
      <div className="text-[11px] text-slate-600">Edge {frame.relaxing.from}→{frame.relaxing.to} (w={frame.relaxing.weight}) {frame.relaxing.improved? 'improves distance.':'does not improve.'}</div>
    </div>}
  </div>;
}

function Legend(){
  return <div className="text-[11px] space-y-2 text-gray-700">
    <div className="flex items-center gap-2 text-gray-700"><span className="h-4 w-4 rounded-full bg-blue-600 border-2 border-blue-700 inline-block text-gray-600"/> Current (processing)</div>
    <div className="flex items-center gap-2 text-gray-700"><span className="h-4 w-4 rounded-full bg-yellow-400 border-2 border-yellow-500 inline-block text-gray-600"/> Frontier (in PQ)</div>
    <div className="flex items-center gap-2 text-gray-700"><span className="h-4 w-4 rounded-full bg-green-600 border-2 border-green-700 inline-block text-gray-600"/> Settled (final)</div>
    <div className="flex items-center gap-2 text-gray-700"><span className="h-4 w-4 rounded-full bg-white border-2 border-slate-300 inline-block text-gray-600"/> Unreached</div>
    <div className="flex items-center gap-2 text-gray-700"><span className="h-4 w-4 rounded-sm bg-emerald-500 inline-block text-gray-600" style={{boxShadow:'0 0 0 2px #05966955'}}/> Relaxation success edge</div>
    <div className="flex items-center gap-2 text-gray-700"><span className="h-4 w-4 rounded-sm bg-blue-500 inline-block text-gray-600" style={{boxShadow:'0 0 0 2px #2563eb55'}}/> Relaxation check edge</div>
  </div>;
}

function Navigation(){
  return <div className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
    <h2 className="text-lg font-semibold text-slate-800 mb-3">Continue Learning</h2>
    <div className="flex flex-wrap gap-3 justify-between items-center text-gray-700">
      <Link href="/algorithms/graph/dijkstra-shortest-path/theory" className="inline-flex items-center px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Theory</Link>
      <Link href="/algorithms/graph" className="inline-flex items-center px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-gray-100">Graph Overview <ArrowRight className="h-5 w-5 ml-2 text-gray-700"/></Link>
    </div>
  </div>;
}
