"use client";
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen } from 'lucide-react';
import PseudocodeBlock from '@/components/PseudocodeBlock';

export default function TreesPseudocodePage() {
  const examples = {
    inorder: `procedure INORDER(node)
  if node = NULL then return
  INORDER(node.left)
  visit node.value
  INORDER(node.right)
end procedure`,
    preorder: `procedure PREORDER(node)
  if node = NULL then return
  visit node.value
  PREORDER(node.left)
  PREORDER(node.right)
end procedure`,
    postorder: `procedure POSTORDER(node)
  if node = NULL then return
  POSTORDER(node.left)
  POSTORDER(node.right)
  visit node.value
end procedure`,
    bstInsert: `procedure BST_INSERT(root, key)
  if root = NULL then
    return new Node(key)
  end if
  if key < root.value then
    root.left ← BST_INSERT(root.left, key)
  else if key > root.value then
    root.right ← BST_INSERT(root.right, key)
  end if
  return root
end procedure`,
  } as const;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 text-gray-700">
      <div className="container mx-auto px-4 py-12 text-gray-700">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8 text-gray-700">
          <Link href="/data-structures/trees" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2 text-gray-700" />
            Back to Trees Overview
          </Link>
          <h1 className="text-4xl font-bold text-slate-800">Trees Pseudocode</h1>
          <p className="text-lg text-slate-600 mt-2">Traversals and basic BST operations.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 text-gray-700">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <PseudocodeBlock title="Inorder Traversal" code={examples.inorder} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <PseudocodeBlock title="Preorder Traversal" code={examples.preorder} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <PseudocodeBlock title="Postorder Traversal" code={examples.postorder} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
            <PseudocodeBlock title="BST Insert" code={examples.bstInsert} />
          </motion.div>
        </div>

        <div className="mt-10 text-sm text-gray-600 flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-gray-700" />
          <span>See theory and interactive practice from the Trees page.</span>
        </div>
      </div>
    </div>
  );
}

