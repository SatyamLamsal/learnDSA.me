'use client'

import { useBookmarks } from '@/hooks/useBookmarks'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { BookmarkCheck, ArrowLeft, Calendar, ExternalLink } from 'lucide-react'

export default function BookmarksPage() {
  const { bookmarks, loading } = useBookmarks()
  const { data: session } = useSession()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-20 text-gray-700">
        <div className="container mx-auto px-4 text-gray-700">
          <div className="max-w-4xl mx-auto text-center text-gray-700">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4 text-gray-700"></div>
            <p className="text-gray-600">Loading your bookmarks...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-20 text-gray-700">
      <div className="container mx-auto px-4 text-gray-700">
        <div className="max-w-4xl mx-auto text-gray-700">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-gray-700"
          >
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2 text-gray-700" />
              Back to Home
            </Link>
            
            <div className="flex items-center space-x-3 mb-4 text-gray-700">
              <div className="bg-blue-100 rounded-full p-3 text-gray-700">
                <BookmarkCheck className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-slate-800">My Bookmarks</h1>
                <p className="text-xl text-slate-600">
                  {bookmarks.length} {bookmarks.length === 1 ? 'topic' : 'topics'} saved for later
                </p>
              </div>
            </div>

            {!session && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-gray-700">
                <p className="text-yellow-800 text-sm">
                  <strong>Note:</strong> You&apos;re viewing locally saved bookmarks. Sign in to sync across devices.
                </p>
              </div>
            )}
          </motion.div>

          {/* Bookmarks Grid */}
          {bookmarks.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700">
              {bookmarks.map((bookmark, index) => (
                <motion.div
                  key={bookmark.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 text-gray-700"
                >
                  <div className="p-6 text-gray-700">
                    <div className="flex items-start justify-between mb-3 text-gray-700">
                      <div className="flex-1 text-gray-700">
                        <h3 className="text-xl font-semibold text-slate-800 mb-2">
                          {bookmark.title}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                          <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium capitalize text-gray-600">
                            {bookmark.category.replace('-', ' ')}
                          </span>
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium capitalize">
                            {bookmark.topicType}
                          </span>
                        </div>
                      </div>
                      <BookmarkCheck className="h-5 w-5 text-blue-500" />
                    </div>

                    <div className="flex items-center justify-between text-gray-700">
                      <div className="flex items-center text-xs text-gray-400">
                        <Calendar className="h-3 w-3 mr-1 text-gray-700" />
                        {new Date(bookmark.createdAt).toLocaleDateString()}
                      </div>
                      <Link 
                        href={bookmark.url}
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                      >
                        Visit
                        <ExternalLink className="h-3 w-3 ml-1 text-gray-700" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center py-16 text-gray-700"
            >
              <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 text-gray-700">
                <BookmarkCheck className="h-12 w-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">No bookmarks yet</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Start exploring topics and bookmark the ones you want to revisit later. 
                Look for the bookmark icon on each topic card.
              </p>
              <Link 
                href="/"
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-gray-100"
              >
                Explore Topics
                <ExternalLink className="h-4 w-4 ml-2 text-gray-700" />
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}