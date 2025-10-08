'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen } from 'lucide-react';
import PseudocodeBlock from '@/components/PseudocodeBlock';

export default function ArraysPseudocodePage() {
  const examples = {
    traversal: `procedure ARRAY_TRAVERSAL(A)
  for i ← 0 to length(A) - 1 do
    visit A[i]
  end for
end procedure`,
    search: `procedure LINEAR_SEARCH(A, key)
  for i ← 0 to length(A) - 1 do
    if A[i] = key then
      return i
    end if
  end for
  return −1
end procedure`,
    insertAt: `procedure INSERT_AT(A, n, index, value)
  // A has capacity ≥ n + 1
  for i ← n down to index + 1 do
    A[i] ← A[i − 1]
  end for
  A[index] ← value
  // new length becomes n + 1
end procedure`,
    deleteAt: `procedure DELETE_AT(A, n, index)
  value ← A[index]
  for i ← index to n − 2 do
    A[i] ← A[i + 1]
  end for
  // logical shrink: new length becomes n − 1
  return value
end procedure`,
    maxSubarray: `procedure MAX_SUBARRAY_SUM_OF_SIZE_K(A, k)
  windowSum ← 0
  for i ← 0 to k − 1 do
    windowSum ← windowSum + A[i]
  end for
  maxSum ← windowSum
  for i ← k to length(A) − 1 do
    windowSum ← windowSum − A[i − k] + A[i]
    if windowSum > maxSum then
      maxSum ← windowSum
    end if
  end for
  return maxSum
end procedure`,
  } as const;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 text-gray-700">
      <div className="container mx-auto px-4 py-12 text-gray-700">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8 text-gray-700">
          <Link href="/data-structures/arrays" className="inline-flex items-center text-red-600 hover:text-red-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2 text-gray-700" />
            Back to Arrays Overview
          </Link>
          <h1 className="text-4xl font-bold text-slate-800">Arrays Pseudocode</h1>
          <p className="text-lg text-slate-600 mt-2">Common array operations and patterns in clear pseudocode.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 text-gray-700">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <PseudocodeBlock title="Traversal" code={examples.traversal} autoPlay loop />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <PseudocodeBlock title="Linear Search" code={examples.search} autoPlay loop intervalMs={950} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <PseudocodeBlock title="Insert At Index" code={examples.insertAt} autoPlay loop intervalMs={1000} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
            <PseudocodeBlock title="Delete At Index" code={examples.deleteAt} autoPlay loop intervalMs={900} />
          </motion.div>
          <motion.div className="md:col-span-2 text-gray-700" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <PseudocodeBlock title="Sliding Window: Max Sum of Size k" code={examples.maxSubarray} autoPlay loop intervalMs={1100} />
          </motion.div>
        </div>

        <div className="mt-10 text-sm text-gray-600 flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-gray-700" />
          <span>See theory and interactive practice from the Arrays page.</span>
        </div>
      </div>
    </div>
  );
}

