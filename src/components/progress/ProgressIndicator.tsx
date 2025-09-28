'use client'

import { useProgress } from '@/hooks/useProgress'
import { CheckCircle, Clock, Trophy } from 'lucide-react'
import { motion } from 'framer-motion'

interface ProgressIndicatorProps {
  topicId: string
  topicType: string
  category: string
  title?: string
  className?: string
}

export function ProgressIndicator({ 
  topicId, 
  topicType, 
  category, 
  title,
  className = '' 
}: ProgressIndicatorProps) {
  const { getTopicProgress, updateProgress } = useProgress()
  const progress = getTopicProgress(topicId)

  const handleMarkComplete = () => {
    updateProgress(topicId, topicType, category, !progress?.completed)
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {progress?.completed ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex items-center text-green-600"
        >
          <CheckCircle className="h-5 w-5 mr-1" />
          <span className="text-sm font-medium">Completed</span>
        </motion.div>
      ) : (
        <motion.button
          onClick={handleMarkComplete}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
        >
          <CheckCircle className="h-4 w-4 mr-1" />
          Mark Complete
        </motion.button>
      )}
      
      {progress?.timeSpent && progress.timeSpent > 60 && (
        <div className="flex items-center text-gray-500 text-sm">
          <Clock className="h-4 w-4 mr-1" />
          {Math.round(progress.timeSpent / 60)}min
        </div>
      )}
    </div>
  )
}

export function CategoryProgress({ category }: { category: string }) {
  const { getCategoryProgress } = useProgress()
  const categoryProgress = getCategoryProgress(category)
  const completed = categoryProgress.filter(p => p.completed).length
  const total = categoryProgress.length

  if (total === 0) return null

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center space-x-2 text-sm"
    >
      <Trophy className="h-4 w-4 text-yellow-500" />
      <span className="text-gray-600">
        {completed}/{total} completed
      </span>
      <div className="w-16 h-2 bg-gray-200 rounded-full">
        <div 
          className="h-2 bg-yellow-500 rounded-full transition-all duration-300"
          style={{ width: `${total ? (completed / total) * 100 : 0}%` }}
        />
      </div>
    </motion.div>
  )
}