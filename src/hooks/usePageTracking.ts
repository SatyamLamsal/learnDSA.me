'use client'

import { useEffect } from 'react'
import { useProgress } from './useProgress'

interface UsePageTrackingProps {
  topicId: string
  topicType: string
  category: string
  autoTrackTime?: boolean
}

export function usePageTracking({ 
  topicId, 
  topicType, 
  category, 
  autoTrackTime = true 
}: UsePageTrackingProps) {
  const { updateProgress } = useProgress()

  useEffect(() => {
    if (!topicId || !topicType || !category) return

    // Track page visit
    const startTime = Date.now()

    // Mark as visited (but not necessarily completed)
    updateProgress(topicId, topicType, category, false, 0)

    return () => {
      if (autoTrackTime) {
        // Track time spent on page
        const timeSpent = Math.floor((Date.now() - startTime) / 1000)
        if (timeSpent > 5) { // Only track if spent more than 5 seconds
          updateProgress(topicId, topicType, category, false, timeSpent)
        }
      }
    }
  }, [topicId, topicType, category, updateProgress, autoTrackTime])
}