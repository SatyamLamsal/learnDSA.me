'use client'

import { useBookmarks } from '@/hooks/useBookmarks'
import { Bookmark, BookmarkCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'

interface ModuleBookmarkButtonProps {
  moduleId: string
  moduleName: string
  moduleUrl: string
  className?: string
}

export function ModuleBookmarkButton({
  moduleId,
  moduleName,
  moduleUrl,
  className = ''
}: ModuleBookmarkButtonProps) {
  const { data: session } = useSession()
  const { isModuleBookmarked, addModuleBookmark, removeBookmark } = useBookmarks()
  const isBookmarked = isModuleBookmarked(moduleId)

  const handleBookmark = async () => {
    if (!session) return
    
    if (isBookmarked) {
      await removeBookmark(moduleId)
    } else {
      await addModuleBookmark(moduleId, moduleName, moduleUrl)
    }
  }

  if (!session) return null

  return (
    <motion.button
      onClick={handleBookmark}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`p-2 rounded-full transition-colors ${
        isBookmarked 
          ? 'text-yellow-500 bg-yellow-50 hover:bg-yellow-100' 
          : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
      } ${className}`}
      title={isBookmarked ? 'Remove from bookmarks' : 'Bookmark this module'}
    >
      {isBookmarked ? (
        <BookmarkCheck className="h-5 w-5" />
      ) : (
        <Bookmark className="h-5 w-5" />
      )}
    </motion.button>
  )
}