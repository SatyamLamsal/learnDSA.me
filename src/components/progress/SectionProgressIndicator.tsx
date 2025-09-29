'use client'

import { useState } from 'react'
import { useProgress } from '@/hooks/useProgress'
import { CheckCircle, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

interface SectionProgressIndicatorProps {
  moduleId: string
  sectionId: string
  sectionName: string
  className?: string
}

export function SectionProgressIndicator({ 
  moduleId,
  sectionId, 
  sectionName,
  className = '' 
}: SectionProgressIndicatorProps) {
  const { getTopicProgress, updateProgress, updateModuleProgress, loading } = useProgress()
  const fullSectionId = `${moduleId}-${sectionId}`
  const sectionProgress = getTopicProgress(fullSectionId)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleMarkComplete = async () => {
    setIsUpdating(true)
    try {
      // Mark this section as completed
      await updateProgress(fullSectionId, 'section', 'learning-path', !sectionProgress?.completed)
      
      // If marking as completed, also update module progress to indicate it's been started/progressed
      if (!sectionProgress?.completed) {
        const moduleProgress = getTopicProgress(moduleId)
        if (!moduleProgress?.completed) {
          // Don't mark module as fully completed, but indicate progress
          await updateProgress(moduleId, 'module', 'learning-path', false, 1)
        }
      }
    } catch (error) {
      console.error('Failed to update section progress:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {sectionProgress?.completed ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex items-center text-green-600"
        >
          <CheckCircle className="h-4 w-4 mr-1" />
          <span className="text-xs font-medium">Completed</span>
        </motion.div>
      ) : (
        <motion.button
          onClick={handleMarkComplete}
          disabled={isUpdating}
          whileHover={{ scale: isUpdating ? 1 : 1.05 }}
          whileTap={{ scale: isUpdating ? 1 : 0.95 }}
          className={`flex items-center px-2 py-1 rounded-full text-xs transition-colors ${
            isUpdating 
              ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
          }`}
        >
          <CheckCircle className="h-3 w-3 mr-1" />
          {isUpdating ? 'Updating...' : 'Complete'}
        </motion.button>
      )}
    </div>
  )
}