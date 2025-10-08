"use client";
import React, { useState } from 'react';
import { Code2 } from 'lucide-react';
import { motion } from 'framer-motion';

type Lang = 'typescript' | 'c' | 'python';

const snippets: Record<Lang, { title: string; code: string; notes: string[] }> = {
  typescript: {
    title: 'TypeScript Implementation',
    code: `class ListNode<T> {\n  constructor(\n    public data: T,\n    public next: ListNode<T> | null = null\n  ) {}\n}\n\nclass SinglyLinkedList<T> {\n  head: ListNode<T> | null = null;\n\n  insertHead(data: T) {\n    const node = new ListNode(data, this.head);\n    this.head = node;\n  }\n\n  search(target: T): ListNode<T> | null {\n    let cur = this.head;\n    while (cur) {\n      if (cur.data === target) return cur;\n      cur = cur.next;\n    }\n    return null;\n  }\n\n  reverse() {\n    let prev: ListNode<T> | null = null;\n    let cur = this.head;\n    while (cur) {\n      const next = cur.next;\n      cur.next = prev;\n      prev = cur;\n      cur = next;\n    }\n    this.head = prev;\n  }\n}`,
    notes: ['GC handles memory; no manual free()', 'Generics for type safety', 'Methods run in O(n) where appropriate']
  },
  c: {
    title: 'C Implementation',
    code: `typedef struct Node {\n    int data;\n    struct Node *next;\n} Node;\n\nNode* create_node(int value) {\n    Node *n = (Node*)malloc(sizeof(Node));\n    n->data = value;\n    n->next = NULL;\n    return n;\n}\n\nvoid insert_head(Node **head, int value) {\n    Node *n = create_node(value);\n    n->next = *head;\n    *head = n;\n}\n\nvoid reverse(Node **head) {\n    Node *prev = NULL, *cur = *head, *next = NULL;\n    while (cur) {\n        next = cur->next;\n        cur->next = prev;\n        prev = cur;\n        cur = next;\n    }\n    *head = prev;\n}\n\nvoid free_list(Node *head) {\n    while (head) {\n        Node *tmp = head;\n        head = head->next;\n        free(tmp);\n    }\n}`,
    notes: ['Manual memory management required', 'Double pointer for head mutation', 'Reverse runs in-place O(1) extra space']
  },
  python: {
    title: 'Python Implementation',
    code: `class Node:\n    def __init__(self, data, next=None):\n        self.data = data\n        self.next = next\n\nclass SinglyLinkedList:\n    def __init__(self):\n        self.head = None\n\n    def insert_head(self, data):\n        self.head = Node(data, self.head)\n\n    def search(self, target):\n        cur = self.head\n        while cur:\n            if cur.data == target: return cur\n            cur = cur.next\n        return None\n\n    def reverse(self):\n        prev = None\n        cur = self.head\n        while cur:\n            nxt = cur.next\n            cur.next = prev\n            prev = cur\n            cur = nxt\n        self.head = prev`,
    notes: ['Python objects add overhead per node', 'Simple syntax improves readability', 'Garbage collector reclaims unreferenced nodes']
  }
};

export const ImplementationGallery: React.FC = () => {
  const [lang, setLang] = useState<Lang>('typescript');
  const languages: { id: Lang; label: string }[] = [
    { id: 'typescript', label: 'TypeScript' },
    { id: 'c', label: 'C' },
    { id: 'python', label: 'Python' }
  ];

  const active = snippets[lang];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-800"><Code2 className="w-5 h-5 text-indigo-600" /> Implementation Gallery</h3>
        <div className="flex gap-2">
          {languages.map(l => (
            <button
              key={l.id}
              onClick={() => setLang(l.id)}
              className={`px-4 py-2 rounded text-xs font-medium border transition ${lang===l.id ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white border-gray-300 hover:border-indigo-400'}`}
            >{l.label}</button>
          ))}
        </div>
      </div>
      <motion.div
        key={lang}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="rounded-lg border bg-gray-900 overflow-hidden"
      >
        <div className="px-4 py-2 text-xs uppercase tracking-wide text-gray-300 bg-gray-800 flex items-center justify-between">
          <span>{active.title}</span>
          <span className="font-mono text-[10px] text-indigo-300">{lang}</span>
        </div>
        <pre className="p-4 overflow-x-auto text-sm text-green-300 font-mono whitespace-pre leading-relaxed min-h-[260px]">{active.code}</pre>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-4 text-xs">
        {active.notes.map((n, i) => (
          <div key={i} className="p-3 rounded border bg-indigo-50 border-indigo-200 text-indigo-800">{n}</div>
        ))}
      </div>
    </div>
  );
};
