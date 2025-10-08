"use client";
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Replace } from 'lucide-react';

interface Cell { i:number; j:number; val:number; }

export default function EditDistanceSimulationPage(){
  const [a, setA] = useState('kitten');
  const [b, setB] = useState('sitting');
  const [running, setRunning] = useState(false);
  const [table, setTable] = useState<Cell[]>([]);
  const [dist, setDist] = useState<number|null>(null);

  const sleep = (ms:number)=> new Promise(r=>setTimeout(r,ms));

  const run = async ()=>{
    setRunning(true); setTable([]); setDist(null);
    const m=a.length, n=b.length;
    const dp:number[][] = Array.from({length:m+1}, ()=> Array(n+1).fill(0));
    for (let i=0;i<=m;i++) dp[i][0]=i;
    for (let j=0;j<=n;j++) dp[0][j]=j;
    const local:Cell[] = [];
    for (let i=1;i<=m;i++){
      for (let j=1;j<=n;j++){
        if (a[i-1]===b[j-1]) dp[i][j] = dp[i-1][j-1];
        else dp[i][j] = 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
        local.push({i,j,val:dp[i][j]});
      }
      setTable([...local]); await sleep(110);
    }
    setDist(dp[m][n]); setRunning(false);
  };

  const getCell = (i:number,j:number)=> table.find(c=> c.i===i && c.j===j);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 text-gray-700">
      <div className="container mx-auto px-4 py-12 text-gray-700">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="mb-8 text-gray-700">
          <Link href="/algorithms/dynamic-programming/edit-distance" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Back to Overview</Link>
          <h1 className="text-4xl font-bold text-slate-800 mb-2 flex items-center"><Replace className="h-8 w-8 text-indigo-600 mr-2"/>Edit Distance Simulation</h1>
          <p className="text-slate-600 max-w-3xl">Watch the dynamic programming table fill row by row.</p>
        </motion.div>
        <div className="bg-white rounded-lg shadow p-6 mb-10 text-gray-700">
          <div className="flex flex-wrap gap-4 mb-4 items-end text-gray-700">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">String A</label>
              <input value={a} onChange={e=> setA(e.target.value.slice(0,12))} className="px-2 py-1 border rounded" disabled={running}/>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">String B</label>
              <input value={b} onChange={e=> setB(e.target.value.slice(0,12))} className="px-2 py-1 border rounded" disabled={running}/>
            </div>
            <button onClick={run} disabled={running} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded disabled:opacity-50 text-white text-white text-white text-white">{running? 'Running...' : 'Run'}</button>
          </div>
          <div className="overflow-x-auto text-gray-700">
            <div className="inline-block border rounded bg-gray-50 p-2 text-gray-700">
              <table className="text-xs border-collapse text-gray-600">
                <thead>
                  <tr>
                    <th className="border px-2 py-1 bg-white text-gray-700"></th>
                    <th className="border px-2 py-1 bg-white text-gray-700"></th>
                    {b.split('').map((ch,j)=> <th key={j} className="border px-2 py-1 bg-white text-gray-700">{ch}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({length: a.length+1}, (_,i)=> (
                    <tr key={i}>
                      <td className="border px-2 py-1 bg-white font-semibold text-gray-800">{i===0? '' : a[i-1]}</td>
                      {Array.from({length: b.length+1}, (_,j)=>{
                        let val: number;
                        if (i===0) val = j; else if (j===0) val = i; else val = getCell(i,j)?.val ?? 0;
                        return <td key={j} className="border px-2 py-1 text-center bg-white text-gray-700">{val}</td>;
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {dist!==null && <div className="mt-4 text-sm text-slate-700">Edit Distance: <span className="font-semibold text-indigo-600">{dist}</span></div>}
        </div>
        <div className="flex justify-between text-gray-700">
          <span />
          <Link href="/algorithms/dynamic-programming/edit-distance/theory" className="text-indigo-600 hover:text-indigo-700">Theory →</Link>
        </div>
      </div>
    </div>
  );
}

