"use client";
import React, { useState, useCallback } from 'react';
import { Plus, Trash2, RefreshCw, ArrowRight, ArrowLeftRight, Repeat, ToggleLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type ListType = 'singly' | 'doubly' | 'circular';

interface NodeData {
  id: number;
  value: number;
}

let idCounter = 1;

export const LinkedListPlayground: React.FC = () => {
  const [nodes, setNodes] = useState<NodeData[]>([ { id: idCounter++, value: 10 }, { id: idCounter++, value: 20 } ]);
  const [listType, setListType] = useState<ListType>('singly');
  const [inputVal, setInputVal] = useState('');

  const addNodeHead = useCallback(() => {
    if (inputVal.trim() === '' || isNaN(Number(inputVal))) return;
    const val = Number(inputVal);
    setNodes(prev => [{ id: idCounter++, value: val }, ...prev]);
    setInputVal('');
  }, [inputVal]);

  const addNodeTail = useCallback(() => {
    if (inputVal.trim() === '' || isNaN(Number(inputVal))) return;
    const val = Number(inputVal);
    setNodes(prev => [...prev, { id: idCounter++, value: val }]);
    setInputVal('');
  }, [inputVal]);

  const removeHead = useCallback(() => {
    setNodes(prev => prev.slice(1));
  }, []);

  const removeTail = useCallback(() => {
    setNodes(prev => prev.slice(0, -1));
  }, []);

  const reset = () => {
    idCounter = 1;
    setNodes([ { id: idCounter++, value: 10 }, { id: idCounter++, value: 20 } ]);
  };

  const switchType = (type: ListType) => setListType(type);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 items-end">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Value</label>
          <input
            className="border rounded px-3 py-2 text-sm w-28 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            placeholder="e.g. 42"
          />
        </div>
        <button onClick={addNodeHead} className="inline-flex items-center px-3 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700">
          <Plus className="w-4 h-4 mr-1" /> Add Head
        </button>
        <button onClick={addNodeTail} className="inline-flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-1" /> Add Tail
        </button>
        <button disabled={!nodes.length} onClick={removeHead} className="inline-flex items-center px-3 py-2 text-sm bg-orange-600 text-white rounded disabled:opacity-40 hover:bg-orange-700">
          <Trash2 className="w-4 h-4 mr-1" /> Pop Head
        </button>
        <button disabled={!nodes.length} onClick={removeTail} className="inline-flex items-center px-3 py-2 text-sm bg-amber-600 text-white rounded disabled:opacity-40 hover:bg-amber-700">
          <Trash2 className="w-4 h-4 mr-1" /> Pop Tail
        </button>
        <button onClick={reset} className="inline-flex items-center px-3 py-2 text-sm bg-gray-600 text-white rounded hover:bg-gray-700">
          <RefreshCw className="w-4 h-4 mr-1" /> Reset
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {(['singly','doubly','circular'] as ListType[]).map(type => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={`px-4 py-2 rounded text-xs font-medium border transition ${
              listType === type ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-400'
            }`}
          >
            {type === 'singly' && 'Singly'}
            {type === 'doubly' && 'Doubly'}
            {type === 'circular' && 'Circular'}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border p-6 shadow-inner">
        <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          {listType === 'singly' && <ArrowRight className="w-4 h-4 text-indigo-600" />}
          {listType === 'doubly' && <ArrowLeftRight className="w-4 h-4 text-indigo-600" />}
          {listType === 'circular' && <Repeat className="w-4 h-4 text-indigo-600" />}
          {listType.charAt(0).toUpperCase() + listType.slice(1)} Linked List Visualization
        </h4>
        <div className="flex items-center flex-wrap gap-4">
          <span className="text-xs px-2 py-1 bg-indigo-50 text-indigo-600 rounded border">HEAD</span>
          <AnimatePresence>
            {nodes.map((node, idx) => (
              <motion.div
                layout
                key={node.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.25 }}
                className="relative bg-gradient-to-br from-indigo-50 to-white border border-indigo-200 rounded-lg px-4 py-3 shadow-sm"
              >
                <div className="text-sm font-semibold text-gray-800">{node.value}</div>
                <div className="text-[10px] text-gray-500 font-mono">@{node.id}</div>
                {listType !== 'singly' && idx === 0 && listType === 'doubly' && (
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400">NULL</div>
                )}
                {listType === 'doubly' && idx > 0 && (
                  <div className="absolute -left-4 top-1/2 -translate-y-1/2 text-indigo-500"><ArrowRight className="w-4 h-4 rotate-180" /></div>
                )}
                {idx < nodes.length - 1 && (
                  <div className="absolute -right-4 top-1/2 -translate-y-1/2 text-indigo-500"><ArrowRight className="w-4 h-4" /></div>
                )}
                {listType === 'circular' && idx === nodes.length - 1 && nodes.length > 1 && (
                  <div className="absolute -right-10 top-1/2 -translate-y-1/2 text-indigo-500 flex items-center gap-1">
                    <Repeat className="w-4 h-4" />
                    <span className="text-[10px]">HEAD</span>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {nodes.length === 0 && (
            <div className="text-xs text-gray-500 italic">(empty list)</div>
          )}
          {listType !== 'doubly' && nodes.length > 0 && (
            <span className="text-xs px-2 py-1 bg-gray-50 text-gray-500 rounded border">NULL</span>
          )}
          {listType === 'doubly' && nodes.length > 0 && (
            <span className="text-xs px-2 py-1 bg-gray-50 text-gray-500 rounded border">NULL</span>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 text-sm">
        <div className="p-4 bg-indigo-50 rounded border border-indigo-200">
            <h5 className="font-semibold mb-2 text-indigo-800">Characteristics</h5>
            {listType === 'singly' && <ul className="list-disc list-inside space-y-1 text-indigo-700">
              <li>1 pointer per node</li>
              <li>Forward-only traversal</li>
              <li>Lower memory overhead</li>
            </ul>}
            {listType === 'doubly' && <ul className="list-disc list-inside space-y-1 text-indigo-700">
              <li>2 pointers per node</li>
              <li>Bidirectional traversal</li>
              <li>Faster arbitrary deletion</li>
            </ul>}
            {listType === 'circular' && <ul className="list-disc list-inside space-y-1 text-indigo-700">
              <li>Tail points to head</li>
              <li>Great for round-robin</li>
              <li>No NULL termination</li>
            </ul>}
        </div>
        <div className="p-4 bg-white rounded border shadow-sm">
            <h5 className="font-semibold mb-2 text-gray-800">Suggested Uses</h5>
            {listType === 'singly' && <p className="text-gray-600">Lightweight dynamic collections, simple stacks/queues.</p>}
            {listType === 'doubly' && <p className="text-gray-600">LRU caches, navigation (previous/next), undo/redo chains.</p>}
            {listType === 'circular' && <p className="text-gray-600">Schedulers, game loops, cyclic buffers.</p>}
        </div>
        <div className="p-4 bg-gray-50 rounded border border-gray-200">
            <h5 className="font-semibold mb-2 text-gray-800">Complexities (typical)</h5>
            <table className="w-full text-[11px]">
              <thead>
                <tr className="text-gray-500"><th className="text-left font-medium">Op</th><th className="text-left font-medium">Head</th><th className="text-left font-medium">Tail</th></tr>
              </thead>
              <tbody className="text-gray-600">
                <tr><td>Insert</td><td>O(1)</td><td>{listType==='singly'?'O(n)*':'O(1)'}</td></tr>
                <tr><td>Delete</td><td>O(1)</td><td>{listType==='singly'?'O(n)':'O(1)'}</td></tr>
                <tr><td>Search</td><td colSpan={2}>O(n)</td></tr>
              </tbody>
            </table>
            {listType==='singly' && <p className="mt-1 text-[10px] text-gray-500">* O(1) if tail pointer maintained.</p>}
        </div>
      </div>
    </div>
  );
};
