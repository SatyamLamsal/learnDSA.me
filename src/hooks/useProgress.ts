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
        setProgress(data)
        
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
          await fetchProgress() // Refresh progress
        }
      } catch (error) {
        console.error('Failed to update progress:', error)
      }
    } else {
      // Save to local storage
      const newProgress = [...progress.filter(p => p.id !== progressItem.id), progressItem]
      setProgress(newProgress)
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