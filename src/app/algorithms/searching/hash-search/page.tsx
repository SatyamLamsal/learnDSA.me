"use client";
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { useMemo, useState } from 'react';

// Simple hash table demo with chaining
function useHashTable(size: number) {
  const [buckets, setBuckets] = useState<string[][]>(() => Array.from({ length: size }, () => []));

  const hash = (key: string) => {
    let h = 0;
    for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
    return h % size;
  };

  const insert = (key: string) => {
    const idx = hash(key);
    setBuckets(prev => {
      const copy = prev.map(b => [...b]);
      if (!copy[idx].includes(key)) copy[idx].push(key);
      return copy;
    });
    return idx;
  };

  const search = (key: string) => {
    const idx = hash(key);
    const found = buckets[idx].includes(key);
    return { idx, found };
  };

  const remove = (key: string) => {
    const idx = hash(key);
    setBuckets(prev => {
      const copy = prev.map(b => [...b]);
      copy[idx] = copy[idx].filter(k => k !== key);
      return copy;
    });
    return idx;
  };

  const loadFactor = useMemo(() => {
    const total = buckets.reduce((sum, b) => sum + b.length, 0);
    return total / size;
  }, [buckets, size]);

  return { buckets, hash, insert, search, remove, loadFactor };
}

export default function HashSearchPage(){
  const TABLE_SIZE = 13;
  const { buckets, insert, search, remove, loadFactor } = useHashTable(TABLE_SIZE);
  const [key, setKey] = useState('apple');
  const [lastOp, setLastOp] = useState<{type: 'insert'|'search'|'remove', idx: number, found?: boolean}|null>(null);

  const onInsert = () => setLastOp({ type: 'insert', idx: insert(key) });
  const onSearch = () => {
    const res = search(key);
    setLastOp({ type: 'search', idx: res.idx, found: res.found });
  };
  const onRemove = () => setLastOp({ type: 'remove', idx: remove(key) });

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 text-white">
      <div className="container mx-auto px-4 py-12 text-gray-700">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8}} className="mb-8 text-gray-700">
          <Link href="/algorithms/searching" className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-6"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Back to Searching Algorithms</Link>
          <h1 className="text-5xl font-bold text-slate-800 mb-3"><span className="text-teal-600">Hash Table</span> Search</h1>
          <p className="text-lg text-slate-600 max-w-3xl">Average-case O(1) lookup with a good hash function and load factor. This demo uses chaining for collision resolution.</p>
        </motion.div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow p-6 mb-8 text-gray-700">
          <div className="flex flex-wrap gap-3 items-end text-gray-700">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Key</label>
              <input value={key} onChange={e=>setKey(e.target.value)} className="px-3 py-2 border rounded w-56" placeholder="Enter a string key" />
            </div>
            <button onClick={onInsert} className="bg-emerald-600 hover:bg-emerald-700 text-black px-4 py-2 rounded text-black text-black text-black text-black">Insert</button>
            <button onClick={onSearch} className="bg-blue-600 hover:bg-blue-700 text-black px-4 py-2 rounded text-black text-black text-black text-black text-black">Search</button>
            <button onClick={onRemove} className="bg-rose-600 hover:bg-rose-700 text-black px-4 py-2 rounded text-black text-black text-black text-black">Remove</button>
            <div className="ml-auto text-right text-gray-700">
              <div className="text-sm text-slate-600">Load Factor</div>
              <div className="text-2xl font-bold text-emerald-700">{loadFactor.toFixed(2)}</div>
            </div>
          </div>
        </div>

        {/* Buckets */}
        <div className="bg-white rounded-lg shadow p-6 text-gray-700">
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 text-gray-700">
            {buckets.map((bucket, idx) => {
              const highlight = lastOp && lastOp.idx === idx;
              return (
                <div key={idx} className={`border-2 rounded p-3 ${highlight ? 'border-emerald-600 bg-emerald-50' : 'border-gray-200'}`}>
                  <div className="text-xs text-gray-500 mb-2">Bucket #{idx}</div>
                  <div className="flex flex-wrap gap-2 text-gray-700">
                    {bucket.length === 0 ? (
                      <span className="text-xs text-gray-400">(empty)</span>
                    ) : bucket.map((k, i) => (
                      <span key={i} className="px-2 py-1 text-xs bg-gray-100 rounded border border-gray-200 text-gray-600">{k}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          {lastOp && lastOp.type==='search' && (
            <div className={`mt-4 inline-flex items-center px-4 py-2 rounded border ${lastOp.found ? 'bg-green-50 text-green-800 border-green-300' : 'bg-red-50 text-red-800 border-red-300'}`}>
              {lastOp.found ? <CheckCircle2 className="h-5 w-5 mr-2 text-gray-700"/> : <XCircle className="h-5 w-5 mr-2 text-gray-700"/>}
              {lastOp.found ? 'Key found' : 'Key not found'} in bucket {lastOp.idx}
            </div>
          )}
        </div>

        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8, delay:0.2}} className="flex justify-between items-center mt-10 text-gray-700">
          <Link href="/algorithms/searching/fibonacci-search" className="inline-flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"><ArrowLeft className="h-5 w-5 mr-2 text-gray-700"/>Previous: Fibonacci Search</Link>
          <Link href="/algorithms/searching" className="inline-flex items-center px-6 py-3 bg-teal-600 text-black rounded-lg hover:bg-teal-700 transition-colors text-gray-800">Back to Searching Index<ArrowRight className="h-5 w-5 ml-2 text-gray-700"/></Link>
        </motion.div>
      </div>
    </div>
  );
}

