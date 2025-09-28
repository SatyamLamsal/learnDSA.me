'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

interface UserProgress {
  id: string
  topicId: string
  topicType: string
  category: string
  completed: boolean
  timeSpent: number
  lastVisited: string
}

const LOCAL_STORAGE_KEY = 'learndsa_progress'

export function useProgress() {
  const { data: session } = useSession()
  const [progress, setProgress] = useState<UserProgress[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session?.user) {
      fetchProgress()
    } else {
      loadLocalProgress()
    }
  }, [session])

  const loadLocalProgress = () => {
    try {
      const localData = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (localData) {
        setProgress(JSON.parse(localData))
      }
    } catch (error) {
      console.error('Failed to load local progress:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveLocalProgress = (newProgress: UserProgress[]) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newProgress))
    } catch (error) {
      console.error('Failed to save local progress:', error)
    }
  }

  const fetchProgress = async () => {
    try {
      const response = await fetch('/api/progress')
      if (response.ok) {
        const data = await response.json()
        // Handle both array response and object with progress property
        const progressData = Array.isArray(data) ? data : (data.progress || [])
        setProgress(progressData)
        
        // Merge local progress if switching from local to authenticated
        const localData = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (localData) {
          const localProgress = JSON.parse(localData)
          // TODO: Merge local progress with server progress
          localStorage.removeItem(LOCAL_STORAGE_KEY)
        }
      }
    } catch (error) {
      console.error('Failed to fetch progress:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateProgress = async (
    topicId: string,
    topicType: string,
    category: string,
    completed: boolean = false,
    timeSpent: number = 0
  ) => {
    const progressItem: UserProgress = {
      id: `${topicId}-${topicType}`,
      topicId,
      topicType,
      category,
      completed,
      timeSpent,
      lastVisited: new Date().toISOString()
    }

    // Immediately update local state for better UX
    const newProgress = [...progress.filter(p => p.topicId !== topicId), progressItem]
    setProgress(newProgress)

    if (session?.user) {
      // Save to server
      try {
        const response = await fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            topicId,
            topicType,
            category,
            completed,
            timeSpent
          })
        })

        if (response.ok) {
          // Don't refetch, just trust our local update
          console.log('Progress saved to server')
        } else {
          console.error('Failed to save progress to server')
          // Revert local changes if server save failed
          await fetchProgress()
        }
      } catch (error) {
        console.error('Failed to update progress:', error)
        // Revert local changes if request failed
        await fetchProgress()
      }
    } else {
      // Save to local storage
      saveLocalProgress(newProgress)
    }
  }

  const getTopicProgress = (topicId: string) => {
    return progress.find(p => p.topicId === topicId)
  }

  const getCategoryProgress = (category: string) => {
    return progress.filter(p => p.category === category)
  }

  const getTotalProgress = () => {
    const completed = progress.filter(p => p.completed).length
    const total = progress.length
    return { completed, total, percentage: total ? (completed / total) * 100 : 0 }
  }

  return {
    progress,
    loading,
    updateProgress,
    getTopicProgress,
    getCategoryProgress,
    getTotalProgress,
    refetch: fetchProgress
  }
}