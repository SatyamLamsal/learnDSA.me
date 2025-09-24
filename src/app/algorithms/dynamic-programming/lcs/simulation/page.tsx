"use client";
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Table } from 'lucide-react';

interface Cell { i:number; j:number; val:number; from?:string; }

export default function LCSSimulationPage(){
  const [a, setA] = useState('ABCBDAB');
  const [b, setB] = useState('BDCAB');
  const [running, setRunning] = useState(false);
  const [table, setTable] = useState<Cell[]>([]);
  const [lcs, setLCS] = useState('');

  const sleep = (ms:number)=> new Promise(r=>setTimeout(r,ms));

  const run = async ()=>{
    setRunning(true); setTable([]); setLCS('');
    const m = a.length, n = b.length;
    const dp:number[][] = Array.from({length:m+1}, ()=> Array(n+1).fill(0));
    const local:Cell[] = [];
    for (let i=1;i<=m;i++){
      for (let j=1;j<=n;j++){
        if (a[i-1] === b[j-1]){ dp[i][j] = dp[i-1][j-1]+1; local.push({i,j,val:dp[i][j], from:'diag'}); }
        else if (dp[i-1][j] >= dp[i][j-1]){ dp[i][j] = dp[i-1][j]; local.push({i,j,val:dp[i][j], from:'up'}); }
        else { dp[i][j] = dp[i][j-1]; local.push({i,j,val:dp[i][j], from:'left'}); }
      }
      setTable([...local]); await sleep(120);
    }
    let i=m,j=n; let res='';
    while (i>0 && j>0){
      if (a[i-1] === b[j-1]){ res = a[i-1] + res; i--; j--; }
      else if (dp[i-1][j] >= dp[i][j-1]) i--; else j--;
    }
    setLCS(res); setRunning(false);
  };

  const getCell = (i:number,j:number)=> table.find(c=> c.i===i && c.j===j);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="mb-8">
          <Link href="/algorithms/dynamic-programming/lcs" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2"/>Back to Overview</Link>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">LCS Simulation</h1>
          <p className="text-slate-600 max-w-3xl">Animated filling of the dynamic programming table with directional provenance hints.</p>
        </motion.div>
        <div className="bg-white rounded-lg shadow p-6 mb-10">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center"><Table className="h-5 w-5 mr-2 text-indigo-600"/>LCS Table</h3>
          <div className="flex flex-wrap gap-4 mb-4 items-end">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">String A</label>
              <input value={a} onChange={e=> setA(e.target.value.toUpperCase().slice(0,12))} className="px-2 py-1 border rounded" disabled={running}/>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">String B</label>
              <input value={b} onChange={e=> setB(e.target.value.toUpperCase().slice(0,12))} className="px-2 py-1 border rounded" disabled={running}/>
            </div>
            <button onClick={run} disabled={running} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded disabled:opacity-50">{running? 'Running…' : 'Run DP'}</button>
          </div>
          <div className="overflow-x-auto">
            <div className="inline-block border rounded bg-gray-50 p-2">
              <table className="text-xs border-collapse">
                <thead>
                  <tr>
                    <th className="border px-2 py-1 bg-white"> </th>
                    <th className="border px-2 py-1 bg-white"> </th>
                    {b.split('').map((ch,j)=> <th key={j} className="border px-2 py-1 bg-white">{ch}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({length: a.length+1}, (_,i)=> (
                    <tr key={i}>
                      <td className="border px-2 py-1 bg-white font-semibold">{i===0? '' : a[i-1]}</td>
                      {Array.from({length: b.length+1}, (_,j)=>{
                        const cell = getCell(i,j); const val = cell? cell.val : 0;
                        const arrow = cell?.from==='diag'? '↖' : cell?.from==='up'? '↑' : cell?.from==='left'? '←' : '';
                        return <td key={j} className={`border px-2 py-1 text-center ${cell?.from==='diag'?'bg-indigo-100': cell?.from==='up'?'bg-blue-100': cell?.from==='left'?'bg-purple-100':'bg-white'}`}>{val}{arrow && <span className="ml-1 text-[10px] text-slate-500">{arrow}</span>}</td>;
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {lcs && <div className="mt-4 text-sm text-slate-700">LCS: <span className="font-semibold text-indigo-700">{lcs}</span> (length {lcs.length})</div>}
        </div>
      </div>
    </div>
  );
}

