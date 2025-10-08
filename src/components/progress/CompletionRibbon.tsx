'use client'

import { useProgress } from '@/hooks/useProgress'
import { CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

interface CompletionRibbonProps {
  topicId: string
}

export function CompletionRibbon({ topicId }: CompletionRibbonProps) {
  const { getTopicProgress } = useProgress()
  const progress = getTopicProgress(topicId)
  const isCompleted = progress?.completed || false

  if (!isCompleted) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute top-0 right-0 z-30 text-gray-700"
    >
      <div className="bg-green-500 text-black px-3 py-1 rounded-bl-lg rounded-tr-xl flex items-center space-x-1 shadow-lg text-gray-700">
        <CheckCircle className="h-3 w-3 fill-current text-gray-700" />
        <span className="text-xs font-bold text-gray-600">COMPLETED</span>
      </div>
    </motion.div>
  )
}