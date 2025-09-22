'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen } from 'lucide-react';
import PseudocodeBlock from '@/components/PseudocodeBlock';

export default function LinkedListsPseudocodePage() {
  const examples = {
    traverse: `procedure TRAVERSE(head)
  current ← head
  while current ≠ NULL do
    visit current.data
    current ← current.next
  end while
end procedure`,
    insertHead: `procedure INSERT_HEAD(head, value)
  node ← new Node(value)
  node.next ← head
  head ← node
  return head
end procedure`,
    insertAfter: `procedure INSERT_AFTER(node, value)
  if node = NULL then return
  newNode ← new Node(value)
  newNode.next ← node.next
  node.next ← newNode
end procedure`,
    deleteValue: `procedure DELETE_VALUE(head, value)
  if head = NULL then return head
  if head.data = value then
    head ← head.next
    return head
  end if
  prev ← head
  current ← head.next
  while current ≠ NULL do
    if current.data = value then
      prev.next ← current.next
      break
    end if
    prev ← current
    current ← current.next
  end while
  return head
end procedure`,
    reverse: `procedure REVERSE(head)
  prev ← NULL
  current ← head
  while current ≠ NULL do
    next ← current.next
    current.next ← prev
    prev ← current
    current ← next
  end while
  head ← prev
  return head
end procedure`,
    AddBeforeNode: `Algorithm InsertBeforeNode(head, targetValue, newData):
    newNode ← CreateNode(newData)
    if head != NULL AND head.data == targetValue:
        newNode.next ← head
        head ← newNode
        return head
    current ← head
    while current != NULL AND current.next != NULL AND current.next.data != targetValue:
        current ← current.next
    if current == NULL OR current.next == NULL:
        PRINT "Target node not found"
        return head
    newNode.next ← current.next
    current.next ← newNode
    return head
`
  } as const;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
          <Link href="/data-structures/linked-lists" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Linked Lists Overview
          </Link>
          <h1 className="text-4xl font-bold text-slate-800">Linked Lists Pseudocode</h1>
          <p className="text-lg text-slate-600 mt-2">Core singly-linked list operations in pseudocode.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <PseudocodeBlock title="Traversal" code={examples.traverse} autoPlay loop />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <PseudocodeBlock title="Insert at Head" code={examples.insertHead} autoPlay loop intervalMs={1000} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <PseudocodeBlock title="Insert After Node" code={examples.insertAfter} autoPlay loop intervalMs={1100} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
            <PseudocodeBlock title="Delete by Value" code={examples.deleteValue} autoPlay loop intervalMs={900} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <PseudocodeBlock title="Insert before Node" code={examples.AddBeforeNode} autoPlay loop intervalMs={900} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <PseudocodeBlock title="Reverse Linked List" code={examples.reverse} autoPlay loop intervalMs={950} />
          </motion.div>
        </div>

        <div className="mt-10 text-sm text-gray-600 flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          <span>See theory and interactive practice from the Linked Lists page.</span>
        </div>
      </div>
    </div>
  );
}
