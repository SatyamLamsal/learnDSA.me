"use client";
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen } from 'lucide-react';
import PseudocodeBlock from '@/components/PseudocodeBlock';

export default function GraphsPseudocodePage() {
  const examples = {
    bfs: `procedure BFS(G, start)
  create empty queue Q
  mark start as visited
  enqueue(Q, start)
  while Q not empty do
    v ← dequeue(Q)
    visit v
    for each neighbor u of v do
      if u not visited then
        mark u as visited
        enqueue(Q, u)
      end if
    end for
  end while
end procedure`,
    dfs: `procedure DFS(G, v)
  mark v as visited
  visit v
  for each neighbor u of v do
    if u not visited then
      DFS(G, u)
    end if
  end for
end procedure`,
    dijkstra: `procedure DIJKSTRA(G, source)
  for each vertex v in G do
    dist[v] ← ∞
    prev[v] ← NULL
  end for
  dist[source] ← 0
  S ← empty set
  Q ← all vertices of G (min-priority by dist)
  while Q not empty do
    u ← extractMin(Q)
    add u to S
    for each (u, v) with weight w do
      if dist[u] + w < dist[v] then
        dist[v] ← dist[u] + w
        prev[v] ← u
        decreaseKey(Q, v, dist[v])
      end if
    end for
  end while
  return dist, prev
end procedure`,
  } as const;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 text-gray-700">
      <div className="container mx-auto px-4 py-12 text-gray-700">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8 text-gray-700">
          <Link href="/data-structures/graphs" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2 text-gray-700" />
            Back to Graphs Overview
          </Link>
          <h1 className="text-4xl font-bold text-slate-800">Graphs Pseudocode</h1>
          <p className="text-lg text-slate-600 mt-2">Classic traversal and shortest path algorithms.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 text-gray-700">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <PseudocodeBlock title="Breadth-First Search (BFS)" code={examples.bfs} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <PseudocodeBlock title="Depth-First Search (DFS)" code={examples.dfs} />
          </motion.div>
          <motion.div className="md:col-span-2 text-gray-700" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <PseudocodeBlock title="Dijkstra's Algorithm" code={examples.dijkstra} />
          </motion.div>
        </div>

        <div className="mt-10 text-sm text-gray-600 flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-gray-700" />
          <span>See theory and interactive practice from the Graphs page.</span>
        </div>
      </div>
    </div>
  );
}

