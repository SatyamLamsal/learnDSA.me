'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { User, LogOut, BookmarkCheck, Trophy } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { useProgress } from '@/hooks/useProgress'
import { useBookmarks } from '@/hooks/useBookmarks'
import Image from 'next/image'
import Link from 'next/link'

export function SignInButton({ className = '' }: { className?: string }) {
  const { data: session, status } = useSession()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { getCategoryProgress } = useProgress()
  const { bookmarks } = useBookmarks()

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (status === 'loading') {
    return (
      <div className={`w-10 h-10 rounded-full bg-gray-200 animate-pulse ${className}`} />
    )
  }

  const handleSignIn = () => {
    setIsDropdownOpen(false)
    // This redirects to Google's OAuth domain for secure authentication
    signIn('google', { callbackUrl: window.location.href })
  }

  if (session?.user) {
    // Define specific topic IDs for accurate progress calculation
    const dataStructureTopics = [
      'arrays-overview', 'linked-lists-overview', 'stacks-overview', 
      'queues-overview', 'trees-overview', 'graphs-overview', 'hash-tables-overview'
    ]
    const algorithmTopics = [
      'sorting-overview', 'searching-overview', 'dynamic-programming-overview',
      'divide-and-conquer-overview', 'greedy-overview', 'graph-algorithms-overview'
    ]
    
    const dsProgress = getCategoryProgress('data-structures')
    const algProgress = getCategoryProgress('algorithms')
    
    // Calculate completion based on specific topics
    const dsCompleted = dataStructureTopics.filter(topicId => 
      dsProgress.find(p => p.topicId === topicId)?.completed
    ).length
    const algCompleted = algorithmTopics.filter(topicId => 
      algProgress.find(p => p.topicId === topicId)?.completed
    ).length
    
    const dsPercentage = Math.round((dsCompleted / dataStructureTopics.length) * 100)
    const algPercentage = Math.round((algCompleted / algorithmTopics.length) * 100)
    
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt="Profile"
              width={40}
              height={40}
              className="w-full h-full object-cover text-gray-700"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
              <User className="h-6 w-6 text-white text-gray-700" />
            </div>
          )}
        </button>

        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 py-4 z-50 text-gray-700"
            >
              {/* User Info */}
              <div className="px-4 pb-4 border-b border-gray-100 text-gray-700">
                <div className="flex items-center space-x-3 text-gray-700">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 text-gray-700">
                    {session.user.image ? (
                      <Image
                        src={session.user.image}
                        alt="Profile"
                        width={48}
                        height={48}
                        className="w-full h-full object-cover text-gray-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                        <User className="h-6 w-6 text-white text-gray-700" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{session.user.name}</p>
                    <p className="text-sm text-gray-600">{session.user.email}</p>
                  </div>
                </div>
              </div>

              {/* Progress Overview */}
              <div className="px-4 py-4 border-b border-gray-100 text-gray-700">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Trophy className="h-4 w-4 text-yellow-500 mr-2" />
                  Learning Progress
                </h3>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between items-center text-gray-700">
                    <span className="text-sm text-gray-600">Data Structures</span>
                    <div className="flex items-center space-x-2 text-gray-700">
                      <div className="w-16 bg-gray-200 rounded-full h-2 text-gray-700">
                        <div 
                          className="bg-red-500 h-2 rounded-full transition-all text-gray-700" 
                          style={{ width: `${dsPercentage}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-500">
                        {dsPercentage}%
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-gray-700">
                    <span className="text-sm text-gray-600">Algorithms</span>
                    <div className="flex items-center space-x-2 text-gray-700">
                      <div className="w-16 bg-gray-200 rounded-full h-2 text-gray-700">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all text-white" 
                          style={{ width: `${algPercentage}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-500">
                        {algPercentage}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 text-gray-700">
                  <div className="flex items-center text-sm text-gray-600">
                    <BookmarkCheck className="h-4 w-4 mr-1 text-gray-700" />
                    <span>{bookmarks.length} bookmarks</span>
                  </div>
                  <Link 
                    href="/bookmarks"
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    View All →
                  </Link>
                </div>
              </div>

              {/* Sign Out Button */}
              <div className="px-4 pt-2 text-gray-700">
                <button
                  onClick={() => {
                    setIsDropdownOpen(false)
                    signOut()
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-3 text-gray-700" />
                  Sign Out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  // Not signed in - show profile icon with dropdown
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center border-2 border-gray-300 hover:border-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <User className="h-6 w-6 text-white text-gray-700" />
      </button>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 py-4 z-50 text-gray-700"
          >
            <div className="px-4 text-gray-700">
              <div className="text-center mb-4 text-gray-700">
                <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 text-white">
                  <Trophy className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Save Your Progress</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Sign in to sync your learning progress and bookmarks across devices.
                </p>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 text-gray-700">
                  <p className="text-xs text-yellow-800">
                    <strong>Note:</strong> Your current progress is saved locally and will be synced when you sign in.
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-gray-700">
                <button
                  onClick={handleSignIn}
                  className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-3"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Sign in with Google</span>
                </button>
                
                <button
                  onClick={() => setIsDropdownOpen(false)}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-medium transition-colors text-sm"
                >
                  Continue as Guest
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-3">
                Secure authentication powered by Google OAuth
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}