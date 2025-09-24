"use client";
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen } from 'lucide-react';
import PseudocodeBlock from '@/components/PseudocodeBlock';

export default function QueuesPseudocodePage() {
  const examples = {
    enqueue: `procedure ENQUEUE(Q, x)
  rear ← rear + 1
  Q[rear] ← x
end procedure`,
    dequeue: `procedure DEQUEUE(Q)
  if front > rear then
    error "UNDERFLOW"
  end if
  x ← Q[front]
  front ← front + 1
  return x
end procedure`,
    peek: `procedure FRONT(Q)
  if front > rear then
    error "EMPTY"
  end if
  return Q[front]
end procedure`,
    circular: `procedure ENQUEUE_CIRC(Q, x)
  if (rear + 1) mod size = front then error "FULL"
  if front = −1 then
    front ← 0
  end if
  rear ← (rear + 1) mod size
  Q[rear] ← x
end procedure`,
  } as const;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
          <Link href="/data-structures/queues" className="inline-flex items-center text-yellow-600 hover:text-yellow-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Queues Overview
          </Link>
          <h1 className="text-4xl font-bold text-slate-800">Queues Pseudocode</h1>
          <p className="text-lg text-slate-600 mt-2">Core queue operations and circular queue logic.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <PseudocodeBlock title="Enqueue" code={examples.enqueue} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <PseudocodeBlock title="Dequeue" code={examples.dequeue} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <PseudocodeBlock title="Front/Peek" code={examples.peek} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
            <PseudocodeBlock title="Circular Queue Enqueue" code={examples.circular} />
          </motion.div>
        </div>

        <div className="mt-10 text-sm text-gray-600 flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          <span>See theory and interactive practice from the Queues page.</span>
        </div>
      </div>
    </div>
  );
}

