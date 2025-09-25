"use client";
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Play, Code, Target} from 'lucide-react';

const dataStructures = [
  {
    name: 'Arrays',
    description: 'Learn about contiguous memory storage and indexing',
    path: '/data-structures/arrays',
    color: 'bg-red-500',
    icon: '[]'
  },
  {
    name: 'Linked Lists',
    description: 'Understand dynamic memory allocation and pointers',
    path: '/data-structures/linked-lists',
    color: 'bg-blue-500',
    icon: '→'
  },
  {
    name: 'Stacks',
    description: 'Master Last-In-First-Out (LIFO) data structure',
    path: '/data-structures/stacks',
    color: 'bg-green-500',
    icon: '⇈'
  },
  {
    name: 'Queues',
    description: 'Explore First-In-First-Out (FIFO) operations',
    path: '/data-structures/queues',
    color: 'bg-yellow-500',
    icon: '⇄'
  },
  {
    name: 'Trees',
    description: 'Dive into hierarchical data organization',
    path: '/data-structures/trees',
    color: 'bg-purple-500',
    icon: '⚘'
  },
  {
    name: 'Graphs',
    description: 'Understand networks and relationships',
    path: '/data-structures/graphs',
    color: 'bg-indigo-500',
    icon: '◉'
  },
  {
    name: 'Hash Tables',
    description: 'Learn efficient key-value pair storage',
    path: '/data-structures/hash-tables',
    color: 'bg-pink-500',
    icon: '#'
  }
];

const features = [
  {
    icon: <BookOpen className="h-8 w-8" />,
    title: 'Interactive Learning',
    description: 'Learn through hands-on visualization and step-by-step explanations'
  },
  {
    icon: <Play className="h-8 w-8" />,
    title: 'Live Simulations',
    description: 'Practice with real-time interactive data structure operations'
  },
  {
    icon: <Code className="h-8 w-8" />,
    title: 'Code Examples',
    description: 'See implementation details in multiple programming languages'
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: 'Complexity Analysis',
    description: 'Understand time and space complexity for each operation'
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-slate-800 mb-6">
            Master <span className="text-blue-600">Data Structures</span>
            <br />
            & <span className="text-purple-600">Algorithms</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed">
            Learn through interactive theory, dynamic visualizations, and hands-on simulations. 
            Build your coding skills with comprehensive learning resources for all data structures.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/data-structures/arrays" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-lg">
              Start Learning
            </Link>
            <Link href="/algorithms" className="border-2 border-slate-300 hover:border-slate-400 text-slate-700 px-8 py-4 rounded-lg font-semibold transition-colors text-lg">
              Explore Algorithms
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Why Choose Learn DSA?</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Our platform combines theory with practice to provide the most effective learning experience 
              for mastering data structures and algorithms.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-8 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-xl transition-all duration-300 border border-gray-200"
              >
                <div className="text-blue-600 mb-6 flex justify-center p-4 bg-blue-50 rounded-full w-20 h-20 mx-auto items-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Structures Grid */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Explore Data Structures</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Start your journey with any data structure. Each comes with interactive theory, 
              dynamic visualizations, and hands-on simulations to master the concepts.
            </p>
          </motion.div>

          {/* Centered wrap so last row (with fewer items) is centered, not left-gapped */}
          <div className="flex flex-wrap justify-center gap-6">
            {dataStructures.map((ds, index) => (
              <motion.div
                key={ds.path}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 w-full sm:w-[300px] md:w-[280px] lg:w-[260px]"
              >
                <Link href={ds.path} className="flex flex-col h-full">
                  <div className={`${ds.color} h-24 flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                    <span className="text-5xl text-white font-bold relative z-10">{ds.icon}</span>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-slate-800 mb-3">{ds.name}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed flex-grow">{ds.description}</p>
                    <div className="mt-4 text-blue-600 font-semibold text-sm flex items-center">
                      Learn More →
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-slate-900 to-blue-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 text-white">Ready to Start Learning?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students mastering data structures and algorithms through 
              interactive theory, visualizations, and simulations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/data-structures/arrays" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-lg inline-block">
                Begin Your Journey
              </Link>
              <Link href="/algorithms" className="border-2 border-blue-300 hover:border-blue-200 text-blue-100 hover:text-white px-8 py-4 rounded-lg font-semibold transition-colors text-lg inline-block">
                View All Algorithms
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

