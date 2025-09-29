"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Play, Code, Target, ArrowRight, CheckCircle, Zap, Map, Compass } from 'lucide-react';
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton';
import { CompletionCardWrapper } from '@/components/progress/CompletionCardWrapper';
import { useProgress } from '@/hooks/useProgress';

const dataStructures = [
  {
    id: 'arrays-overview',
    name: 'Arrays',
    description: 'Contiguous memory storage and efficient indexing operations',
    path: '/data-structures/arrays',
    category: 'data-structures',
    color: 'bg-gradient-to-br from-red-400 to-red-600',
    icon: '□',
    difficulty: 'Beginner'
  },
  {
    id: 'linked-lists-overview',
    name: 'Linked Lists',
    description: 'Dynamic memory allocation with pointer-based structures',
    path: '/data-structures/linked-lists',
    category: 'data-structures',
    color: 'bg-gradient-to-br from-blue-400 to-blue-600',
    icon: '⟶',
    difficulty: 'Beginner'
  },
  {
    id: 'stacks-overview',
    name: 'Stacks',
    description: 'Last-In-First-Out (LIFO) data structure operations',
    path: '/data-structures/stacks',
    category: 'data-structures',
    color: 'bg-gradient-to-br from-green-400 to-green-600',
    icon: '⬍',
    difficulty: 'Beginner'
  },
  {
    id: 'queues-overview',
    name: 'Queues',
    description: 'First-In-First-Out (FIFO) processing and scheduling',
    path: '/data-structures/queues',
    category: 'data-structures',
    color: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
    icon: '⟷',
    difficulty: 'Beginner'
  },
  {
    id: 'trees-overview',
    name: 'Trees',
    description: 'Hierarchical data organization and tree traversals',
    path: '/data-structures/trees',
    category: 'data-structures',
    color: 'bg-gradient-to-br from-purple-400 to-purple-600',
    icon: '⚡',
    difficulty: 'Intermediate'
  },
  {
    id: 'graphs-overview',
    name: 'Graphs',
    description: 'Complex networks and relationship representations',
    path: '/data-structures/graphs',
    category: 'data-structures',
    color: 'bg-gradient-to-br from-indigo-400 to-indigo-600',
    icon: '◉',
    difficulty: 'Advanced'
  }
];

const algorithmCategories = [
  {
    name: 'Sorting',
    description: 'Bubble, Merge, Quick, Heap Sort',
    path: '/algorithms/sorting',
    color: 'bg-gradient-to-br from-orange-400 to-orange-600',
    icon: '⟸',
    count: '8+ algorithms'
  },
  {
    name: 'Searching',
    description: 'Linear, Binary, Tree Search',
    path: '/algorithms/searching',
    color: 'bg-gradient-to-br from-teal-400 to-teal-600',
    icon: '⚲',
    count: '6+ algorithms'
  },
  {
    name: 'Graph Algorithms',
    description: 'DFS, BFS, Dijkstra, MST',
    path: '/algorithms/graph',
    color: 'bg-gradient-to-br from-rose-400 to-rose-600',
    icon: '◈',
    count: '12+ algorithms'
  },
  {
    name: 'Dynamic Programming',
    description: 'Optimization & Memoization',
    path: '/algorithms/dynamic-programming',
    color: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
    icon: '◆',
    count: '15+ problems'
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
  const { getTopicProgress } = useProgress()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4 mr-2" />
            Interactive Learning Platform
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6">
            Master{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Data Structures
            </span>
            {" "}&{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Algorithms
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 mb-12 leading-relaxed max-w-3xl mx-auto">
            Choose your path: Follow our structured learning journey or explore individual topics. 
            Learn through interactive visualizations, step-by-step explanations, and hands-on practice.
          </p>
        </motion.div>
      </section>

      {/* Learning Paths Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Choose Your Learning Style</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Start with our guided learning path or jump into any topic that interests you
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Structured Learning Path */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white h-full">
              <div className="flex items-center mb-6">
                <div className="bg-white/20 p-3 rounded-full mr-4">
                  <Map className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Structured Learning Path</h3>
                  <p className="text-blue-100">Complete 10-module curriculum</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-300" />
                  <span>Step-by-step progression from basics to advanced</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-300" />
                  <span>Progress tracking and completion certificates</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-300" />
                  <span>Curated practice problems and projects</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-300" />
                  <span>12-16 weeks of comprehensive content</span>
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-4 mb-6">
                <div className="text-sm font-medium mb-2">Sample modules include:</div>
                <div className="text-sm text-blue-100 space-y-1">
                  <div>• Foundations & Complexity Analysis</div>
                  <div>• Arrays & Basic Operations</div>
                  <div>• Searching & Sorting Algorithms</div>
                  <div>• Trees & Graph Algorithms</div>
                </div>
              </div>

              <Link
                href="/learning-path"
                className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors group"
              >
                Start Learning Path
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Individual Topics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 text-white h-full">
              <div className="flex items-center mb-6">
                <div className="bg-white/20 p-3 rounded-full mr-4">
                  <Compass className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Explore Individual Topics</h3>
                  <p className="text-emerald-100">Learn at your own pace</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-300" />
                  <span>Jump to any data structure or algorithm</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-300" />
                  <span>Interactive visualizations for each topic</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-300" />
                  <span>Focused deep-dives into specific concepts</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-300" />
                  <span>Perfect for targeted learning and review</span>
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-4 mb-6">
                <div className="text-sm font-medium mb-2">Popular topics include:</div>
                <div className="text-sm text-emerald-100 space-y-1">
                  <div>• Arrays, Linked Lists, Stacks, Queues</div>
                  <div>• Binary Trees & Graph Algorithms</div>
                  <div>• Dynamic Programming Solutions</div>
                  <div>• Sorting & Searching Techniques</div>
                </div>
              </div>

              <div className="flex gap-3">
                <Link
                  href="/data-structures"
                  className="flex-1 inline-flex items-center justify-center bg-white text-emerald-600 px-4 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors text-center"
                >
                  Data Structures
                </Link>
                <Link
                  href="/algorithms"
                  className="flex-1 inline-flex items-center justify-center bg-emerald-600 border-2 border-white text-white px-4 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors text-center"
                >
                  Algorithms
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Popular Data Structures */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Popular Data Structures</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Master the fundamental building blocks of computer science
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {dataStructures.map((ds, index) => (
            <motion.div
              key={ds.path}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group"
            >
              <CompletionCardWrapper
                topicId={ds.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full relative border border-gray-100"
              >
                <div className="absolute top-4 right-4 z-20">
                  <BookmarkButton 
                    topicId={ds.id}
                    topicType="overview"
                    category={ds.category}
                    title={ds.name}
                    url={ds.path}
                  />
                </div>
                
                <Link href={ds.path} className="flex flex-col h-full">
                  <div className={`${ds.color} h-20 flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-black/20"></div>
                    <span className="text-4xl text-white font-bold relative z-10 group-hover:scale-110 transition-transform duration-300">
                      {ds.icon}
                    </span>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {ds.name}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        ds.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                        ds.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {ds.difficulty}
                      </span>
                    </div>
                    
                    <p className="text-slate-600 text-sm leading-relaxed flex-grow mb-4">
                      {ds.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-blue-600 font-semibold text-sm flex items-center group-hover:text-blue-700">
                        Explore
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                      {getTopicProgress(ds.id)?.completed && (
                        <div className="flex items-center text-green-600 text-xs font-medium">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Completed
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </CompletionCardWrapper>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Algorithm Categories */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Algorithm Categories</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Explore different types of algorithms and their real-world applications
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {algorithmCategories.map((category, index) => (
              <motion.div
                key={category.path}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Link href={category.path}>
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 text-center group">
                    <div className={`${category.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-2xl text-white font-bold">{category.icon}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-slate-600 text-sm mb-3">{category.description}</p>
                    <div className="text-xs text-blue-600 font-medium">{category.count}</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Choose LearnDSA.me?</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Experience the most effective way to learn data structures and algorithms
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
            >
              <div className="text-blue-600 mb-4 flex justify-center p-4 bg-blue-50 rounded-full w-20 h-20 mx-auto items-center group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold mb-2">10+</div>
              <div className="text-blue-100">Data Structures</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Algorithm Topics</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-blue-100">Interactive Examples</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl p-12 text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students mastering DSA through interactive learning. 
            Choose your path and start building your programming expertise today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Link 
              href="/learning-path" 
              className="flex-1 bg-white text-slate-900 px-6 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center justify-center group"
            >
              <Map className="w-5 h-5 mr-2" />
              Learning Path
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/data-structures" 
              className="flex-1 border-2 border-white text-white hover:bg-white/10 px-6 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center group"
            >
              <Compass className="w-5 h-5 mr-2" />
              Explore Topics
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

