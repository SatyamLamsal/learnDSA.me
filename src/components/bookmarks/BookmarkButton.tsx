'use client'

import { useBookmarks } from '@/hooks/useBookmarks'
import { Bookmark, BookmarkCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'

interface BookmarkButtonProps {
  topicId: string
  topicType: string
  category: string
  title: string
  url: string
  className?: string
}

export function BookmarkButton({
  topicId,
  topicType,
  category,
  title,
  url,
  className = ''
}: BookmarkButtonProps) {
  const { data: session } = useSession()
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks()
  const bookmarked = isBookmarked(topicId)

  const handleBookmark = async () => {
    if (!session) return
    
    if (bookmarked) {
      await removeBookmark(topicId)
    } else {
      await addBookmark(topicId, topicType, category, title, url)
    }
  }

  if (!session) return null

  return (
    <motion.button
      onClick={handleBookmark}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`p-2 rounded-full transition-colors ${
        bookmarked 
          ? 'text-yellow-500 bg-yellow-50 hover:bg-yellow-100' 
          : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
      } ${className}`}
    >
      {bookmarked ? (
        <BookmarkCheck className="h-5 w-5" />
      ) : (
        <Bookmark className="h-5 w-5" />
      )}
    </motion.button>
  )
}