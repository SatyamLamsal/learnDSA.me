'use client'

import { useProgress } from '@/hooks/useProgress'
import { CheckCircle, Circle } from 'lucide-react'
import { motion } from 'framer-motion'

interface CompletionBadgeProps {
  topicId: string
  className?: string
}

export function CompletionBadge({ topicId, className = '' }: CompletionBadgeProps) {
  const { getTopicProgress } = useProgress()
  const progress = getTopicProgress(topicId)
  const isCompleted = progress?.completed || false

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      className={`inline-flex items-center justify-center ${className}`}
    >
      {isCompleted ? (
        <div className="bg-green-500 text-black rounded-full p-2 shadow-lg border-2 border-white text-gray-700">
          <CheckCircle className="h-5 w-5 fill-current text-gray-700" />
        </div>
      ) : (
        <div className="bg-white/90 text-gray-500 rounded-full p-2 shadow-md border-2 border-gray-200">
          <Circle className="h-5 w-5" />
        </div>
      )}
    </motion.div>
  )
}