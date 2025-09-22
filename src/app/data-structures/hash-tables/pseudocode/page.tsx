'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen } from 'lucide-react';
import PseudocodeBlock from '@/components/PseudocodeBlock';

export default function HashTablesPseudocodePage() {
  const examples = {
    insert: `procedure INSERT(H, key, value)
  i ← hash(key) mod size(H)
  if H[i] is empty then
    H[i] ← new list
  end if
  append (key, value) to H[i]
end procedure`,
    search: `procedure SEARCH(H, key)
  i ← hash(key) mod size(H)
  for each (k, v) in H[i] do
    if k = key then return v
  end for
  return NOT_FOUND
end procedure`,
    deleteOp: `procedure DELETE(H, key)
  i ← hash(key) mod size(H)
  for each (k, v) in H[i] with index j do
    if k = key then
      remove H[i][j]
      return
    end if
  end for
end procedure`,
  } as const;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
          <Link href="/data-structures/hash-tables" className="inline-flex items-center text-pink-600 hover:text-pink-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Hash Tables Overview
          </Link>
          <h1 className="text-4xl font-bold text-slate-800">Hash Tables Pseudocode</h1>
          <p className="text-lg text-slate-600 mt-2">Operations using chaining collision resolution.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <PseudocodeBlock title="Insert (Chaining)" code={examples.insert} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <PseudocodeBlock title="Search" code={examples.search} />
          </motion.div>
          <motion.div className="md:col-span-2" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <PseudocodeBlock title="Delete" code={examples.deleteOp} />
          </motion.div>
        </div>

        <div className="mt-10 text-sm text-gray-600 flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          <span>See theory and interactive practice from the Hash Tables page.</span>
        </div>
      </div>
    </div>
  );
}
