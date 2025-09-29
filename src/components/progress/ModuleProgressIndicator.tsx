'use client'

import { useState } from 'react'
import { useProgress } from '@/hooks/useProgress'
import { CheckCircle, Clock, Trophy } from 'lucide-react'
import { motion } from 'framer-motion'

interface ModuleProgressIndicatorProps {
  moduleId: string
  moduleName: string
  className?: string
}

export function ModuleProgressIndicator({ 
  moduleId, 
  moduleName,
  className = '' 
}: ModuleProgressIndicatorProps) {
  const { getTopicProgress, updateModuleProgress, isModuleProgressed, loading } = useProgress()
  const moduleProgress = getTopicProgress(moduleId)
  const hasAnyProgress = isModuleProgressed(moduleId)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleMarkComplete = async () => {
    setIsUpdating(true)
    try {
      await updateModuleProgress(moduleId, !moduleProgress?.completed)
    } catch (error) {
      console.error('Failed to update module progress:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Show completed if module is marked complete OR if any section is completed
  const isCompleted = moduleProgress?.completed || hasAnyProgress

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {isCompleted ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex items-center text-green-600"
        >
          <CheckCircle className="h-5 w-5 mr-1" />
          <span className="text-sm font-medium">
            {moduleProgress?.completed ? 'Completed' : 'In Progress'}
          </span>
        </motion.div>
      ) : (
        <motion.button
          onClick={handleMarkComplete}
          disabled={isUpdating}
          whileHover={{ scale: isUpdating ? 1 : 1.05 }}
          whileTap={{ scale: isUpdating ? 1 : 0.95 }}
          className={`flex items-center px-3 py-1 rounded-full text-sm transition-colors ${
            isUpdating 
              ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
          }`}
        >
          <CheckCircle className="h-4 w-4 mr-1" />
          {isUpdating ? 'Updating...' : 'Complete Module'}
        </motion.button>
      )}
      
      {moduleProgress?.timeSpent && moduleProgress.timeSpent > 60 && (
        <div className="flex items-center text-gray-500 text-sm">
          <Clock className="h-4 w-4 mr-1" />
          {Math.round(moduleProgress.timeSpent / 60)}min
        </div>
      )}
    </div>
  )
}