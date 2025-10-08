"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Play, Pause, StepForward, StepBack, RotateCcw, Plus, Trash2, Network, Info } from 'lucide-react';

interface Node { id: string; x: number; y: number; }
interface Edge { id: string; from: string; to: string; }
interface Frame { step: number; description: string; queue: string[]; discovered: string[]; processed: string[]; distances: Record<string, number>; front?: string; }

let nodeCounter = 0;
const nextNodeId = () => `N${++nodeCounter}`;

export default function BFSSimulationPage(){
  const [nodes,setNodes] = useState<Node[]>(()=> [ {id: nextNodeId(), x:100,y:140}, {id: nextNodeId(), x:260,y:80}, {id: nextNodeId(), x:260,y:200}, {id: nextNodeId(), x:420,y:140} ]);
  const [edges,setEdges] = useState<Edge[]>(()=> [ {id:'e1', from:'N1', to:'N2'}, {id:'e2', from:'N1', to:'N3'}, {id:'e3', from:'N2', to:'N4'}, {id:'e4', from:'N3', to:'N4'} ]);
  const [source,setSource] = useState('N1');
  const [frames,setFrames] = useState<Frame[]>([]);
  const [index,setIndex] = useState(0);
  const [playing,setPlaying] = useState(false);
  const [speed,setSpeed] = useState(1);
  const [resetKey,setResetKey] = useState(0); // force remount of canvas internal state

  // Build adjacency
  const adjacency = useMemo(()=>{
    const map: Record<string,string[]> = {};
    nodes.forEach(n=> map[n.id] = []);
    edges.forEach(e=> { map[e.from].push(e.to); map[e.to].push(e.from); }); // treat as undirected for BFS demo
    return map;
  },[nodes,edges]);

  const buildFrames = useCallback(()=>{
    const q: string[] = [];
    const discovered: Set<string> = new Set();
    const processed: Set<string> = new Set();
    const dist: Record<string, number> = {};
    nodes.forEach(n=> dist[n.id] = Infinity);

    const frames: Frame[] = [];
    function snapshot(desc: string, front?: string){
      frames.push({ step: frames.length, description: desc, queue: [...q], discovered: [...discovered], processed: [...processed], distances: {...dist}, front });
    }

    // init
    dist[source] = 0; discovered.add(source); q.push(source);
    snapshot(`Initialize: enqueue source ${source} (distance 0).`, source);

    while(q.length){
      const u = q.shift()!;
      snapshot(`Dequeue ${u}. Explore its neighbors.`, u);
      for(const v of adjacency[u]){
        if(!discovered.has(v)){
          discovered.add(v);
          dist[v] = dist[u] + 1;
          q.push(v);
          snapshot(`Discover ${v} from ${u}; set dist=${dist[v]} and enqueue.`, u);
        }
      }
      processed.add(u);
      snapshot(`Finished processing ${u}.`, u);
    }
    snapshot('BFS complete. All reachable nodes processed.');
    return frames;
  },[adjacency, nodes, source]);

  useEffect(()=> { setFrames(buildFrames()); setIndex(0); setPlaying(false); }, [buildFrames]);

  // autoplay
  useEffect(()=> {
    if(!playing) return; if(index >= frames.length-1){ setPlaying(false); return; }
    const t = setTimeout(()=> setIndex(i=> i+1), 1000/ speed);
    return ()=> clearTimeout(t);
  },[playing,index,frames.length,speed]);

  const current = frames[index];

  // Node events (add/reset)
  function addNode(){
    const id = nextNodeId();
    setNodes(ns=> [...ns, {id, x: 100 + ns.length*120, y: 140 + (ns.length%2?70:-70)}]);
    setEdges(es=> es);
  }
  function resetGraph(){
    nodeCounter = 0;
    setPlaying(false);
    setIndex(0);
    setFrames([]);
    setNodes([ {id: nextNodeId(), x:100,y:140}, {id: nextNodeId(), x:260,y:80}, {id: nextNodeId(), x:260,y:200}, {id: nextNodeId(), x:420,y:140} ]);
    setEdges([ {id:'e1', from:'N1', to:'N2'}, {id:'e2', from:'N1', to:'N3'}, {id:'e3', from:'N2', to:'N4'}, {id:'e4', from:'N3', to:'N4'} ]);
    setSource('N1');
    setResetKey(k=> k+1);
  }

  function toggleEdge(a:string,b:string){
    setEdges(es=> {
      const existing = es.find(e=> (e.from===a && e.to===b) || (e.from===b && e.to===a));
      if(existing){ return es.filter(e=> e!==existing); }
      const id = 'e'+(es.length+1+Math.random()).toString(36).slice(2,6);
      return [...es, {id, from:a, to:b}];
    });
  }

  return <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 text-gray-700">
  <div className="container mx-auto px-4 py-12 max-w-screen-2xl text-gray-700">
      <Link href="/algorithms/graph/bfs" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Back to BFS</Link>
      <h1 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3"><Network className="h-7 w-7 text-blue-600"/> BFS Simulation</h1>

      <div className="grid lg:grid-cols-3 gap-8 text-gray-700">
        <div className="lg:col-span-2 space-y-6 text-gray-700">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Graph Editor & Controls</h2>
            <div className="flex flex-wrap gap-3 mb-4 text-sm text-gray-600">
              <button onClick={addNode} className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 inline-flex items-center gap-1 text-gray-100"><Plus className="h-4 w-4 text-gray-700"/>Add Node</button>
              <button onClick={resetGraph} className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 inline-flex items-center gap-1"><RotateCcw className="h-4 w-4 text-gray-700"/>Reset</button>
              <select value={source} onChange={e=> setSource(e.target.value)} className="px-3 py-2 rounded-lg border border-gray-300 text-sm">
                {nodes.map(n=> <option key={n.id}>{n.id}</option>)}
              </select>
              <button onClick={()=> setPlaying(p=> !p)} className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 inline-flex items-center gap-1">{playing? <Pause className="h-4 w-4 text-gray-700"/>:<Play className="h-4 w-4 text-gray-700"/>}{playing? 'Pause':'Play'}</button>
              <button onClick={()=> setIndex(i=> Math.max(0,i-1))} disabled={index===0} className="px-3 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-40"><StepBack className="h-4 w-4 text-gray-700"/></button>
              <button onClick={()=> setIndex(i=> Math.min(frames.length-1,i+1))} disabled={index===frames.length-1} className="px-3 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-40"><StepForward className="h-4 w-4 text-gray-700"/></button>
              <div className="flex items-center gap-2 text-gray-700"><span className="text-xs text-slate-500">Speed</span><input type="range" min={0.5} max={2} step={0.5} value={speed} onChange={e=> setSpeed(Number(e.target.value))} /></div>
              <div className="text-xs font-mono bg-slate-900 text-blue-200 px-3 py-2 rounded-lg">Step {index+1}/{frames.length||1}</div>
            </div>
            <p className="text-[11px] text-slate-500 mb-3">Drag nodes to reposition. Double-click empty space to add a node. Click two nodes to toggle an undirected edge.</p>
            <GraphCanvas key={resetKey} nodes={nodes} setNodes={setNodes} edges={edges} toggleEdge={toggleEdge} current={current} />
          </motion.div>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
            <h2 className="text-lg font-semibold text-slate-800 mb-3">State</h2>
            <StatePanel frame={current} />
          </motion.div>
        </div>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="space-y-6 text-gray-700">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-blue-200 text-gray-700">
            <h2 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2"><Info className="h-5 w-5 text-blue-600"/> Explanation</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4 min-h-[80px]">{current?.description}</p>
            <Legend />
          </div>
          <Navigation />
        </motion.div>
      </div>
    </div>
  </div>;
}

function GraphCanvas({nodes,setNodes,edges,toggleEdge,current}:{nodes:Node[];setNodes:React.Dispatch<React.SetStateAction<Node[]>>;edges:Edge[];toggleEdge:(a:string,b:string)=>void;current?:Frame}){
  const [first,setFirst] = useState<string | null>(null);
  const dragRef = useRef<{id:string; offsetX:number; offsetY:number} | null>(null);

  function handleNodeClick(id:string){
    if(first===null){ setFirst(id); } else if(first===id){ setFirst(null); } else { toggleEdge(first,id); setFirst(null);} }

  function handleMouseDown(e:React.MouseEvent, id:string){
    const rect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
    const node = nodes.find(n=> n.id===id)!;
    dragRef.current = { id, offsetX: e.clientX - (rect.left + node.x), offsetY: e.clientY - (rect.top + node.y) };
  }
  function handleMouseMove(e:React.MouseEvent){
    if(!dragRef.current) return; e.preventDefault();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const {id, offsetX, offsetY} = dragRef.current;
    const x = e.clientX - rect.left - offsetX; const y = e.clientY - rect.top - offsetY;
    setNodes(ns=> ns.map(n=> n.id===id? {...n, x: Math.max(40, Math.min(rect.width-40, x)), y: Math.max(40, Math.min(rect.height-40, y))}: n));
  }
  function handleMouseUp(){ dragRef.current = null; }

  function handleDoubleClick(e:React.MouseEvent){
    if(dragRef.current) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left; const y = e.clientY - rect.top;
    const id = nextNodeId();
    setNodes(ns=> [...ns, {id, x, y}]);
  }

  return <div onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onDoubleClick={handleDoubleClick} className="relative w-full h-[360px] bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 overflow-hidden select-none text-gray-700">
    <svg className="absolute inset-0 w-full h-full">
      {edges.map(e=> {
        const a = nodes.find(n=> n.id===e.from)!; const b = nodes.find(n=> n.id===e.to)!;
        return <line key={e.id} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#94a3b8" strokeWidth={3} strokeOpacity={0.6} />;
      })}
    </svg>
    {nodes.map(n=> {
      const isDiscovered = current?.discovered.includes(n.id);
      const isProcessed = current?.processed.includes(n.id);
      const isFront = current?.front === n.id;
      const color = isFront? 'bg-blue-600 text-white border-blue-700': isProcessed? 'bg-green-600 text-white border-green-700': isDiscovered? 'bg-yellow-400 text-slate-800 border-yellow-500':'bg-white text-slate-800 border-slate-300';
      return <button key={n.id} onMouseDown={(e)=> handleMouseDown(e,n.id)} onClick={()=> handleNodeClick(n.id)} style={{left:n.x-28, top:n.y-28}} className={`absolute h-14 w-14 rounded-full border-2 font-semibold flex items-center justify-center shadow ${color} transition-colors cursor-move active:scale-95`}>{n.id}{first===n.id && <span className="absolute -bottom-5 text-[10px] text-blue-600 font-mono">selecting</span>}</button>;
    })}
    {first && <div className="absolute top-2 left-2 text-[10px] px-2 py-1 bg-blue-600 text-white rounded text-gray-700">First: {first}</div>}
  </div>;
}

function StatePanel({frame}:{frame?:Frame}){
  if(!frame) return <div className="text-sm text-slate-500">Build frames by pressing Play.</div>;
  return <div className="grid md:grid-cols-3 gap-4 text-xs text-gray-600">
    <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-gray-700">
      <div className="font-semibold text-blue-700 text-[11px] uppercase tracking-wide mb-1">Queue</div>
      <div className="flex flex-wrap gap-1 font-mono text-gray-700">{frame.queue.map(q=> <span key={q} className="px-2 py-1 rounded bg-white border border-blue-300 text-gray-600">{q}</span>)}</div>
    </div>
    <div className="p-3 rounded-xl bg-yellow-50 border border-yellow-300 text-gray-700">
      <div className="font-semibold text-yellow-700 text-[11px] uppercase tracking-wide mb-1">Discovered</div>
      <div className="flex flex-wrap gap-1 font-mono text-gray-700">{frame.discovered.map(q=> <span key={q} className="px-2 py-1 rounded bg-white border border-yellow-400 text-gray-600">{q}</span>)}</div>
    </div>
    <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-gray-700">
      <div className="font-semibold text-green-700 text-[11px] uppercase tracking-wide mb-1">Processed</div>
      <div className="flex flex-wrap gap-1 font-mono text-gray-700">{frame.processed.map(q=> <span key={q} className="px-2 py-1 rounded bg-white border border-green-300 text-gray-600">{q}</span>)}</div>
    </div>
    <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 md:col-span-3 text-gray-700">
      <div className="font-semibold text-purple-700 text-[11px] uppercase tracking-wide mb-1">Distances</div>
      <div className="flex flex-wrap gap-1 font-mono text-gray-700">{Object.entries(frame.distances).map(([k,v])=> <span key={k} className="px-2 py-1 rounded bg-white border border-purple-300 text-gray-600">{k}:{v===Infinity? '∞':v}</span>)}</div>
    </div>
  </div>;
}

function Legend(){
  return <div className="text-[11px] space-y-2 text-gray-700">
    <div className="flex items-center gap-2 text-gray-700"><span className="h-4 w-4 rounded-full bg-blue-600 border-2 border-blue-700 inline-block text-gray-600"/> Current (front)</div>
    <div className="flex items-center gap-2 text-gray-700"><span className="h-4 w-4 rounded-full bg-yellow-400 border-2 border-yellow-500 inline-block text-gray-600"/> Discovered (queued)</div>
    <div className="flex items-center gap-2 text-gray-700"><span className="h-4 w-4 rounded-full bg-green-600 border-2 border-green-700 inline-block text-gray-600"/> Processed (done)</div>
    <div className="flex items-center gap-2 text-gray-700"><span className="h-4 w-4 rounded-full bg-white border-2 border-slate-300 inline-block text-gray-600"/> Undiscovered</div>
  </div>;
}

function Navigation(){
  return <div className="bg-white rounded-2xl shadow-sm p-6 text-gray-700">
    <h2 className="text-lg font-semibold text-slate-800 mb-3">Continue Learning</h2>
    <div className="flex flex-wrap gap-3 justify-between items-center text-gray-700">
      <Link href="/algorithms/graph/bfs/theory" className="inline-flex items-center px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Theory</Link>
      <Link href="/algorithms/graph/dfs" className="inline-flex items-center px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-gray-100">Next: DFS <ArrowRight className="h-5 w-5 ml-2 text-gray-700"/></Link>
      <Link href="/algorithms/graph" className="inline-flex items-center px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-gray-100">Graph Overview <ArrowRight className="h-5 w-5 ml-2 text-gray-700"/></Link>
    </div>
  </div>;
}
