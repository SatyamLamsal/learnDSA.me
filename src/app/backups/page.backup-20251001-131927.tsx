"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Play, Code, Target, ArrowRight, CheckCircle, Zap, Map, Compass, Users, Clock, Star, Award, TrendingUp, Brain, Monitor, Globe, BookmarkIcon, Activity, Calendar, ChevronRight } from 'lucide-react';
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton';
import { CompletionCardWrapper } from '@/components/progress/CompletionCardWrapper';
import { useProgress } from '@/hooks/useProgress';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

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
    icon: <BookOpen className="h-8 w-8 text-gray-700" />,
    title: 'Interactive Learning',
    description: 'Learn through hands-on visualization and step-by-step explanations',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: <Play className="h-8 w-8 text-gray-700" />,
    title: 'Live Simulations',
    description: 'Practice with real-time interactive data structure operations',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: <Code className="h-8 w-8 text-gray-700" />,
    title: 'Code Examples',
    description: 'See implementation details in multiple programming languages',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: <Target className="h-8 w-8 text-gray-700" />,
    title: 'Complexity Analysis',
    description: 'Understand time and space complexity for each operation',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: <Brain className="h-8 w-8 text-gray-700" />,
    title: 'Problem Solving',
    description: 'Master algorithmic thinking with guided problem-solving techniques',
    color: 'from-indigo-500 to-blue-500'
  },
  {
    icon: <Award className="h-8 w-8 text-gray-700"  style={{ color: '#ffffff' }}/>,
    title: 'Progress Tracking',
    description: 'Track your learning journey with detailed progress analytics',
    color: 'from-yellow-500 to-orange-500'
  }
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Computer Science Student',
    avatar: '👩‍💻',
    content: 'The interactive visualizations helped me finally understand how binary trees work. Amazing platform!',
    rating: 5
  },
  {
    name: 'Marcus Johnson',
    role: 'Software Engineer',
    avatar: '👨‍💼',
    content: 'Perfect for interview prep. The step-by-step explanations are incredibly clear and detailed.',
    rating: 5
  },
  {
    name: 'Priya Patel',
    role: 'Bootcamp Graduate',
    avatar: '👩‍🎓',
    content: 'LearnDSA.me made complex algorithms accessible. Highly recommend for anyone learning CS!',
    rating: 5
  }
];

const stats = [
  { label: 'Data Structures', value: '10+', icon: <Monitor className="h-6 w-6 text-gray-700" />, delay: 0 },
  { label: 'Algorithm Topics', value: '50+', icon: <Code className="h-6 w-6 text-gray-700" />, delay: 0.1 },
  { label: 'Interactive Examples', value: '100+', icon: <Play className="h-6 w-6 text-gray-700" />, delay: 0.2 },
  { label: 'Learning Modules', value: '25+', icon: <BookOpen className="h-6 w-6 text-gray-700" />, delay: 0.3 }
];

export default function Home() {
  const { getTopicProgress } = useProgress();
  const { bookmarks } = useBookmarks();
  const { data: session } = useSession();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Get recent progress and bookmarks for signed-in users
  const getRecentActivity = () => {
    if (!session) return null;
    
    // Get recent bookmarks (limit to 3)
    const recentBookmarks = bookmarks.slice(0, 3);
    
    // Get topics with progress (simulate recent activity)
    const topicsWithProgress = dataStructures.filter(ds => {
      const progress = getTopicProgress(ds.id);
      return progress && progress.completed;
    }).slice(0, 3);

    return {
      bookmarks: recentBookmarks,
      inProgress: topicsWithProgress,
      totalCompleted: dataStructures.filter(ds => getTopicProgress(ds.id)?.completed).length
    };
  };

  const recentActivity = getRecentActivity();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 text-gray-700">
      {/* Hero Section */}
      <section className="relative container mx-auto px-4 py-16 md:py-20 pb-8 text-gray-700">
        <div className="absolute inset-0 -z-10 text-gray-700">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob text-gray-700"></div>
          <div className="absolute top-40 right-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000 text-gray-700"></div>
          <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000 text-gray-700"></div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto text-gray-700"
        >
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4 mr-2 text-gray-700" />
            Interactive Learning Platform
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6" style={{ color: '#ffffff' }}>
            Master{" "}
            <motion.span 
              className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-gray-700"
              animate={{ backgroundPosition: ['0%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
            >
              Data Structures
            </motion.span>
            {" "}&{" "}
            <motion.span 
              className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent text-gray-700"
              animate={{ backgroundPosition: ['0%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', delay: 1.5 }}
            >
              Algorithms
            </motion.span>
          </h1>
          
          <motion.p 
            className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Choose your path: Follow our structured learning journey or explore individual topics. 
            Learn through interactive visualizations, step-by-step explanations, and hands-on practice.
          </motion.p>

          {/* Quick Stats */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 mb-12 text-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg text-gray-700">
              <Users className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-slate-700">10,000+ Learners</span>
            </div>
            <div className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg text-gray-700">
              <Star className="w-5 h-5 text-yellow-500 mr-2" />
              <span className="text-sm font-medium text-slate-700">4.9/5 Rating</span>
            </div>
            <div className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg text-gray-700">
              <Globe className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-sm font-medium text-slate-700">100% Free</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Personalized Continue Learning Section - For Signed In Users */}
      {session && (
        <section className="container mx-auto px-4 pb-8 text-gray-700">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-gradient-to-br from-white/90 to-blue-50/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 text-gray-700"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 text-gray-700">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2" style={{ backgroundColor: '#fef3c7', color: '#ffffff' }}>
                  Welcome back, {session.user?.name?.split(' ')[0] || 'Learner'}! 👋
                </h2>
                <p className="text-slate-600">
                  Ready to continue your data structures and algorithms journey?
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-2xl shadow-lg text-gray-700" style={{ color: '#ffffff' }}>
                <Award className="w-5 h-5 mr-2 text-gray-700" />
                <span className="font-semibold text-gray-800">{recentActivity?.totalCompleted || 0} Topics Completed</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700">
              {/* Continue Learning Card */}
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white relative overflow-hidden text-gray-700">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10 text-gray-700"></div>
                <div className="relative z-10 text-gray-700">
                  <div className="flex items-center mb-4 text-gray-700" style={{ color: '#ffffff' }}>
                    <Play className="w-6 h-6 mr-3 text-gray-700" />
                    <h3 className="text-lg font-semibold text-gray-800">Continue Learning</h3>
                  </div>
                  <p className="text-blue-100 text-sm mb-4" style={{ color: '#ffffff' }}>
                    Pick up where you left off
                  </p>
                  <Link 
                    href="/learning-path"
                    className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/30 transition-all duration-300 text-gray-600"
                   style={{ color: '#ffffff' }}>
                    Resume Path
                    <ChevronRight className="w-4 h-4 ml-1 text-gray-700" />
                  </Link>
                </div>
              </div>

              {/* Recent Bookmarks */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-gray-700">
                <div className="flex items-center mb-4 text-gray-700" style={{ color: '#ffffff' }}>
                  <BookmarkIcon className="w-6 h-6 mr-3 text-orange-500" />
                  <h3 className="text-lg font-semibold text-slate-800">Your Bookmarks</h3>
                </div>
                <div className="space-y-3 text-gray-700">
                  {recentActivity?.bookmarks && recentActivity.bookmarks.length > 0 ? (
                    recentActivity.bookmarks.map((bookmark, index) => (
                      <Link
                        key={index}
                        href={bookmark.url}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group text-gray-700"
                      >
                        <div className="flex items-center text-gray-700">
                          <div className="w-2 h-2 bg-orange-400 rounded-full mr-3 text-gray-700"></div>
                          <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600">
                            {bookmark.title}
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600"  style={{ color: '#ffffff' }}/>
                      </Link>
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-700">
                      <BookmarkIcon className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">No bookmarks yet</p>
                      <Link href="/data-structures" className="text-blue-600 text-sm hover:underline">
                        Explore topics
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Stats & Actions */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100 text-gray-700">
                <div className="flex items-center mb-4 text-gray-700" style={{ color: '#ffffff' }}>
                  <Activity className="w-6 h-6 mr-3 text-emerald-600" />
                  <h3 className="text-lg font-semibold text-slate-800">Quick Actions</h3>
                </div>
                <div className="space-y-3 text-gray-700">
                  <Link
                    href="/algorithms"
                    className="flex items-center p-3 bg-white/80 backdrop-blur-sm rounded-lg hover:bg-white transition-all duration-300 group text-gray-700"
                   style={{ color: '#ffffff' }}>
                    <Code className="w-5 h-5 text-emerald-600 mr-3" />
                    <div className="flex-1 text-gray-700">
                      <div className="text-sm font-medium text-slate-700 group-hover:text-emerald-600">Practice Algorithms</div>
                      <div className="text-xs text-slate-500">Solve coding challenges</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600" />
                  </Link>
                  <Link
                    href="/bookmarks"
                    className="flex items-center p-3 bg-white/80 backdrop-blur-sm rounded-lg hover:bg-white transition-all duration-300 group text-gray-700"
                  >
                    <BookmarkIcon className="w-5 h-5 text-orange-500 mr-3" />
                    <div className="flex-1 text-gray-700">
                      <div className="text-sm font-medium text-slate-700 group-hover:text-orange-600">View All Bookmarks</div>
                      <div className="text-xs text-slate-500">{recentActivity?.bookmarks?.length || 0} saved topics</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-orange-600" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Progress Indicator */}
            {recentActivity?.totalCompleted && recentActivity.totalCompleted > 0 && (
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 text-gray-700">
                <div className="flex items-center justify-between mb-2 text-gray-700">
                  <span className="text-sm font-semibold text-slate-700">Learning Progress</span>
                  <span className="text-sm text-green-600">
                    {Math.round((recentActivity.totalCompleted / dataStructures.length) * 100)}% Complete
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 text-gray-700">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-500 text-gray-700"
                    style={{ width: `${(recentActivity.totalCompleted / dataStructures.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </motion.div>
        </section>
      )}

      {/* Learning Paths Section - New Design */}
      <section className="relative pt-8 pb-20 overflow-hidden text-gray-700">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-gray-700"></div>
        <div className="absolute inset-0 text-gray-700">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full filter blur-3xl text-gray-700"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-200/30 to-orange-200/30 rounded-full filter blur-3xl text-gray-700"></div>
        </div>

        <div className="relative container mx-auto px-4 text-gray-700">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 text-gray-700"
          >
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm border border-blue-200/50 rounded-full mb-6 text-gray-700">
              <Target className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-blue-700 font-medium">Choose Your Learning Journey</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6 text-white text-white text-white text-white" style={{ fontFamily: 'Georgia, serif', color: '#000000' }}>
              Two Paths to Mastery
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Whether you prefer structured guidance or flexible exploration, we&apos;ve designed the perfect learning experience for you
            </p>
          </motion.div>

          {/* Path Selection Cards */}
          <div className="max-w-7xl mx-auto text-gray-700">
            <div className="grid lg:grid-cols-2 gap-12 items-center text-gray-700">
              
              {/* Guided Path */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="group text-gray-700"
              >
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 text-gray-700">
                  {/* Badge */}
                  <div className="absolute -top-4 left-8 text-gray-700">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg text-gray-600">
                      🎯 Recommended for Beginners
                    </div>
                  </div>

                  {/* Header */}
                  <div className="flex items-center mb-8 mt-4 text-gray-700">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl mr-6 shadow-lg group-hover:scale-110 transition-transform duration-300 text-gray-700">
                      <Map className="w-10 h-10 text-white text-gray-700" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-slate-800 mb-2" style={{ color: '#ffffff' }}>Guided Learning Path</h3>
                      <p className="text-slate-500 text-lg">Structured • 12-16 weeks • Certificate</p>
                    </div>
                  </div>

                  {/* Progress Visualization */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8 text-gray-700">
                    <div className="flex items-center justify-between mb-4 text-gray-700" style={{ color: '#ffffff' }}>
                      <span className="text-sm font-semibold text-slate-700">Learning Progress</span>
                      <span className="text-sm text-blue-600">Module 1 → 10</span>
                    </div>
                    <div className="flex space-x-2 text-gray-700">
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-2 flex-1 rounded-full ${
                            i < 3 ? 'bg-gradient-to-r from-blue-400 to-purple-500' : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 mt-2">
                      <span>Foundations</span>
                      <span>Advanced Topics</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8 text-gray-700">
                    {[
                      'Curated curriculum from basics to advanced',
                      'Weekly milestones and progress tracking',
                      'Interactive projects and coding exercises',
                      'Peer community and discussion forums'
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center text-gray-700">
                        <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-gray-700">
                          <CheckCircle className="w-4 h-4 text-white text-gray-700" />
                        </div>
                        <span className="text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={session ? "/learning-path" : "/auth/signin?callbackUrl=/learning-path"}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-8 rounded-2xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center group shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-gray-100"
                    onClick={(e) => {
                      if (!session) {
                        e.preventDefault();
                        // Show sign-in prompt
                        if (confirm('Sign in to track your progress, save bookmarks, and get personalized recommendations. Continue to sign in?')) {
                          window.location.href = '/auth/signin?callbackUrl=/learning-path';
                        }
                      }
                    }}
                  >
                    {session ? 'Continue Guided Journey' : 'Start Guided Journey'}
                    <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform text-gray-700" />
                  </Link>
                </div>
              </motion.div>

              {/* Flexible Path */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="group text-gray-700"
              >
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 text-gray-700">
                  {/* Badge */}
                  <div className="absolute -top-4 left-8 text-gray-700">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg text-gray-600">
                      ⚡ Perfect for Self-Directed Learners
                    </div>
                  </div>

                  {/* Header */}
                  <div className="flex items-center mb-8 mt-4 text-gray-700">
                    <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-4 rounded-2xl mr-6 shadow-lg group-hover:scale-110 transition-transform duration-300 text-gray-700">
                      <Compass className="w-10 h-10 text-white text-gray-700" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-slate-800 mb-2" style={{ color: '#ffffff' }}>Flexible Exploration</h3>
                      <p className="text-slate-500 text-lg">Self-paced • Any topic • Instant access</p>
                    </div>
                  </div>

                  {/* Topic Grid Visualization */}
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 mb-8 text-gray-700">
                    <div className="mb-4 text-gray-700" style={{ color: '#ffffff' }}>
                      <span className="text-sm font-semibold text-slate-700">Available Topics</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-gray-700">
                      {['Arrays', 'Linked Lists', 'Trees', 'Graphs', 'Sorting', 'Dynamic Programming'].map((topic, index) => (
                        <div
                          key={index}
                          className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center text-sm font-medium text-slate-700 hover:bg-emerald-100 transition-colors cursor-pointer"
                        >
                          {topic}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8 text-gray-700">
                    {[
                      'Jump to any topic that interests you',
                      'Deep-dive explanations with visualizations',
                      'Practice problems for each concept',
                      'Build custom learning sequences'
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center text-gray-700">
                        <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-gray-700">
                          <CheckCircle className="w-4 h-4 text-white text-gray-700" />
                        </div>
                        <span className="text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-gray-700">
                    <Link
                      href="/data-structures"
                      className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 px-6 rounded-2xl font-semibold text-center hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-gray-100"
                     style={{ color: '#ffffff' }}>
                      Data Structures
                    </Link>
                    <Link
                      href="/algorithms"
                      className="border-2 border-emerald-500 text-emerald-600 py-4 px-6 rounded-2xl font-semibold text-center hover:bg-emerald-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                     style={{ color: '#ffffff' }}>
                      Algorithms
                    </Link>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-16 text-gray-700"
          >
            <p className="text-slate-600 text-lg mb-6">
              Not sure which path to choose? Start with our quick assessment
            </p>
            <button className="bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:shadow-lg transition-all duration-300">
              Take Learning Style Quiz
            </button>
          </motion.div>
        </div>
      </section>

      {/* Popular Data Structures */}
      <section className="container mx-auto px-4 pt-8 pb-16 text-gray-700">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 text-gray-700"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4" style={{ color: '#ffffff' }}>Popular Data Structures</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Master the fundamental building blocks of computer science
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto text-gray-700">
          {dataStructures.map((ds, index) => (
            <motion.div
              key={ds.path}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group text-gray-700"
            >
              <CompletionCardWrapper
                topicId={ds.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full relative border border-gray-100 text-gray-700"
              >
                <div className="absolute top-4 right-4 z-20 text-gray-700">
                  <BookmarkButton 
                    topicId={ds.id}
                    topicType="overview"
                    category={ds.category}
                    title={ds.name}
                    url={ds.path}
                  />
                </div>
                
                <Link href={ds.path} className="flex flex-col h-full text-gray-700">
                  <div className={`${ds.color} h-20 flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-black/20 text-gray-700"></div>
                    <span className="text-4xl text-white font-bold relative z-10 group-hover:scale-110 transition-transform duration-300 text-gray-800" style={{ color: '#ffffff' }}>
                      {ds.icon}
                    </span>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow text-gray-700">
                    <div className="flex items-center justify-between mb-3 text-gray-700">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors" style={{ color: '#ffffff' }}>
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
                    
                    <p className="text-slate-600 text-sm leading-relaxed flex-grow mb-4" style={{ color: '#ffffff' }}>
                      {ds.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-gray-700">
                      <div className="text-blue-600 font-semibold text-sm flex items-center group-hover:text-blue-700">
                        Explore
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform text-gray-700" />
                      </div>
                      {getTopicProgress(ds.id)?.completed && (
                        <div className="flex items-center text-green-600 text-xs font-medium">
                          <CheckCircle className="w-4 h-4 mr-1 text-gray-700" />
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
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-16 text-gray-700">
        <div className="container mx-auto px-4 text-gray-700">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 text-gray-700"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4" style={{ color: '#ffffff' }}>Algorithm Categories</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Explore different types of algorithms and their real-world applications
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto text-gray-700">
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
                  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 text-center group text-gray-700">
                    <div className={`${category.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-2xl text-white font-bold text-gray-800" style={{ color: '#ffffff' }}>{category.icon}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors" style={{ color: '#ffffff' }}>
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
      <section className="container mx-auto px-4 py-16 text-gray-700">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 text-gray-700"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4" style={{ color: '#ffffff' }}>Why Choose LearnDSA.me?</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Experience the most effective way to learn data structures and algorithms
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto text-gray-700">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group relative overflow-hidden text-gray-700"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              <div className={`relative mb-4 flex justify-center p-4 bg-gradient-to-br ${feature.color} bg-opacity-10 rounded-full w-20 h-20 mx-auto items-center group-hover:scale-110 transition-transform duration-300`}>
                <div className={`text-transparent bg-gradient-to-br ${feature.color} bg-clip-text`}>
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors relative z-10">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm relative z-10">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50 text-gray-700">
        <div className="container mx-auto px-4 text-gray-700">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 text-gray-700"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4" style={{ color: '#ffffff' }}>What Students Say</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Join thousands of successful learners who&apos;ve mastered DSA with our platform
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto text-gray-700">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 text-center text-gray-700"
            >
              <div className="text-6xl mb-4 text-gray-700" style={{ color: '#ffffff' }}>{testimonials[currentTestimonial].avatar}</div>
              <div className="flex justify-center mb-4 text-gray-700" style={{ color: '#ffffff' }}>
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-lg md:text-xl text-slate-700 mb-6 italic leading-relaxed">
                &ldquo;{testimonials[currentTestimonial].content}&rdquo;
              </blockquote>
              <div className="font-semibold text-slate-900">{testimonials[currentTestimonial].name}</div>
              <div className="text-slate-500 text-sm">{testimonials[currentTestimonial].role}</div>
            </motion.div>

            {/* Testimonial indicators */}
            <div className="flex justify-center mt-8 space-x-2 text-gray-700">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-16 relative overflow-hidden text-gray-700">
        <div className="absolute inset-0 bg-black/10 text-gray-100"></div>
        <div className="container mx-auto px-4 relative z-10 text-gray-700">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 text-gray-700"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-slate-800" style={{ color: '#ffffff' }}>Platform Statistics</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Comprehensive learning resources backed by real results
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white max-w-4xl mx-auto text-gray-700">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: stat.delay }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-gray-700"
              >
                <div className="flex justify-center mb-3 text-gray-700">
                  <div className="bg-white/20 p-3 rounded-full text-gray-700">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2 text-gray-800" style={{ color: '#ffffff' }}>{stat.value}</div>
                <div className="text-blue-100 text-sm font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16 text-gray-700">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 text-gray-700"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4" style={{ color: '#ffffff' }}>How It Works</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto" style={{ color: '#ffffff' }}>
            Three simple steps to master data structures and algorithms
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto text-gray-700">
          <div className="grid md:grid-cols-3 gap-8 text-gray-700">
            {[
              {
                step: '01',
                title: 'Choose Your Path',
                description: 'Start with structured learning or explore individual topics based on your needs and goals.',
                icon: <Map className="w-8 h-8 text-gray-700" />,
                color: 'from-blue-500 to-cyan-500'
              },
              {
                step: '02',
                title: 'Interactive Learning',
                description: 'Engage with visual simulations, step-by-step explanations, and hands-on practice exercises.',
                icon: <Play className="w-8 h-8 text-gray-700" />,
                color: 'from-green-500 to-emerald-500'
              },
              {
                step: '03',
                title: 'Track Progress',
                description: 'Monitor your learning journey with detailed analytics and earn completion certificates.',
                icon: <TrendingUp className="w-8 h-8 text-gray-700" />,
                color: 'from-purple-500 to-pink-500'
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative text-center group text-gray-700"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full text-gray-700">
                  {/* Step number */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${step.color} text-white font-bold text-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {step.step}
                  </div>
                  
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${step.color} bg-opacity-10 text-transparent bg-clip-text mb-4`}>
                    {step.icon}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors" style={{ color: '#ffffff' }}>
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connecting line */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-gray-200 to-gray-300 transform -translate-y-1/2 z-10 text-gray-700">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-300 rounded-full text-gray-700"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="container mx-auto px-4 py-16 text-gray-700">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 rounded-3xl p-12 text-center text-white overflow-hidden text-gray-100"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 text-gray-700"></div>
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse text-gray-700"></div>
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-2000 text-gray-700"></div>

          <div className="relative z-10 text-gray-700">
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-800" style={{ color: '#ffffff' }}>
                Ready to Start Learning?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join thousands of students mastering DSA through interactive learning. 
                Choose your path and start building your programming expertise today.
              </p>
              
              {/* Quick benefits */}
              <div className="flex flex-wrap justify-center gap-4 mb-8 text-gray-700">
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-gray-700">
                  <Clock className="w-4 h-4 mr-2 text-gray-700" />
                  <span className="text-sm text-gray-600">Learn at your pace</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-gray-700">
                  <Award className="w-4 h-4 mr-2 text-gray-700" />
                  <span className="text-sm text-gray-600">Get certified</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-gray-700">
                  <Globe className="w-4 h-4 mr-2 text-gray-700" />
                  <span className="text-sm text-gray-600">100% Free</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto text-gray-700">
                <Link 
                  href="/learning-path" 
                  className="flex-1 bg-white text-slate-900 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 inline-flex items-center justify-center group shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <Map className="w-5 h-5 mr-2 text-gray-700" />
                  Learning Path
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform text-gray-700" />
                </Link>
                <Link 
                  href="/data-structures" 
                  className="flex-1 border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-xl font-semibold transition-all duration-300 inline-flex items-center justify-center group shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <Compass className="w-5 h-5 mr-2 text-gray-700" />
                  Explore Topics
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

