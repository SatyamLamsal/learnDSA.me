'use client'

import { useEffect, useCallback, useRef } from 'react'
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
  const startTimeRef = useRef<number>(0)
  const hasTrackedVisit = useRef<boolean>(false)

  // Memoize the tracking function to prevent re-creation
  const trackVisit = useCallback(() => {
    if (!topicId || !topicType || !category || hasTrackedVisit.current) return
    
    hasTrackedVisit.current = true
    startTimeRef.current = Date.now()
    
    // Mark as visited (but not necessarily completed)
    updateProgress(topicId, topicType, category, false, 0)
  }, [topicId, topicType, category, updateProgress])

  const trackTimeSpent = useCallback(() => {
    if (!autoTrackTime || !hasTrackedVisit.current) return
    
    // Track time spent on page
    const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000)
    if (timeSpent > 5) { // Only track if spent more than 5 seconds
      updateProgress(topicId, topicType, category, false, timeSpent)
    }
  }, [topicId, topicType, category, updateProgress, autoTrackTime])

  useEffect(() => {
    // Reset tracking state when params change
    hasTrackedVisit.current = false
    
    // Track page visit
    trackVisit()

    return () => {
      trackTimeSpent()
    }
  }, [topicId, topicType, category, trackVisit, trackTimeSpent])
}