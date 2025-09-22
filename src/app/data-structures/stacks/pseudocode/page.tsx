'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen } from 'lucide-react';
import PseudocodeBlock from '@/components/PseudocodeBlock';

export default function StacksPseudocodePage() {
  const examples = {
    push: `procedure PUSH(S, x)
  top ← top + 1
  S[top] ← x
end procedure`,
    pop: `procedure POP(S)
  if top < 0 then
    error "UNDERFLOW"
  end if
  x ← S[top]
  top ← top − 1
  return x
end procedure`,
    peek: `procedure PEEK(S)
  if top < 0 then
    error "EMPTY"
  end if
  return S[top]
end procedure`,
    isBalanced: `procedure IS_BALANCED(expr)
  create empty stack S
  for each ch in expr do
    if ch in '(', '[', '{' then
      push(S, ch)
    else if ch in ')', ']', '}' then
      if S is empty then return false
      open ← pop(S)
      if NOT matches(open, ch) then return false
    end if
  end for
  return S is empty
end procedure`,
  } as const;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50">
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
          <Link href="/data-structures/stacks" className="inline-flex items-center text-green-600 hover:text-green-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Stacks Overview
          </Link>
          <h1 className="text-4xl font-bold text-slate-800">Stacks Pseudocode</h1>
          <p className="text-lg text-slate-600 mt-2">Key stack operations and a classic parentheses check.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <PseudocodeBlock title="Push" code={examples.push} autoPlay loop />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            <PseudocodeBlock title="Pop" code={examples.pop} autoPlay loop intervalMs={950} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <PseudocodeBlock title="Peek" code={examples.peek} autoPlay loop intervalMs={1000} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
            <PseudocodeBlock title="Balanced Parentheses" code={examples.isBalanced} autoPlay loop intervalMs={1050} />
          </motion.div>
        </div>

        <div className="mt-10 text-sm text-gray-600 flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          <span>See theory and interactive practice from the Stacks page.</span>
        </div>
      </div>
    </div>
  );
}
