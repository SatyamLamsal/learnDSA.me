'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

interface Bookmark {
  id: string
  topicId: string
  topicType: string
  category: string
  title: string
  url: string
  createdAt: string
}

const LOCAL_STORAGE_KEY = 'learndsa_bookmarks'

export function useBookmarks() {
  const { data: session } = useSession()
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session?.user) {
      fetchBookmarks()
    } else {
      loadLocalBookmarks()
    }
  }, [session])

  const loadLocalBookmarks = () => {
    try {
      const localData = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (localData) {
        setBookmarks(JSON.parse(localData))
      }
    } catch (error) {
      console.error('Failed to load local bookmarks:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveLocalBookmarks = (newBookmarks: Bookmark[]) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newBookmarks))
    } catch (error) {
      console.error('Failed to save local bookmarks:', error)
    }
  }

  const fetchBookmarks = async () => {
    try {
      const response = await fetch('/api/bookmarks')
      if (response.ok) {
        const data = await response.json()
        setBookmarks(data)

        // Merge local bookmarks if switching from local to authenticated
        const localData = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (localData) {
          const _localBookmarks = JSON.parse(localData)
          // TODO: Merge local bookmarks with server bookmarks
          localStorage.removeItem(LOCAL_STORAGE_KEY)
        }
      }
    } catch (error) {
      console.error('Failed to fetch bookmarks:', error)
    } finally {
      setLoading(false)
    }
  }

  const addBookmark = async (
    topicId: string,
    topicType: string,
    category: string,
    title: string,
    url: string
  ) => {
    if (session?.user) {
      try {
        const response = await fetch('/api/bookmarks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            topicId,
            topicType,
            category,
            title,
            url
          })
        })

        if (response.ok) {
          await fetchBookmarks()
          return true
        }
      } catch (error) {
        console.error('Failed to add bookmark:', error)
      }
      return false
    } else {
      // Local storage bookmark management
      const newBookmark: Bookmark = {
        id: `${topicId}-${topicType}`,
        topicId,
        topicType,
        category,
        title,
        url,
        createdAt: new Date().toISOString()
      }
      const newBookmarks = [...bookmarks, newBookmark]
      setBookmarks(newBookmarks)
      saveLocalBookmarks(newBookmarks)
      return true
    }
  }

  // NEW: Atomic module bookmark
  const addModuleBookmark = async (
    moduleId: string,
    title: string,
    url: string
  ) => {
    return await addBookmark(moduleId, 'module', 'learning-path', title, url)
  }

  // NEW: Check if module is bookmarked (if any section is bookmarked)
  const isModuleBookmarked = (moduleId: string) => {
    // Check if the module itself is bookmarked
    const moduleBookmarked = bookmarks.some(b => b.topicId === moduleId && b.topicType === 'module')
    if (moduleBookmarked) return true
    
    // Check if any section in the module is bookmarked
    const sections = ['introduction', 'data-structures', 'algorithms', 'complexity', 'adt']
    return sections.some(sectionId => {
      return bookmarks.some(b => b.topicId === `${moduleId}-${sectionId}`)
    })
  }

  const removeBookmark = async (topicId: string) => {
    if (session?.user) {
      try {
        const response = await fetch(`/api/bookmarks?topicId=${topicId}`, {
          method: 'DELETE'
        })

        if (response.ok) {
          await fetchBookmarks()
          return true
        }
      } catch (error) {
        console.error('Failed to remove bookmark:', error)
      }
      return false
    } else {
      // Local storage bookmark management
      const newBookmarks = bookmarks.filter(b => b.topicId !== topicId)
      setBookmarks(newBookmarks)
      saveLocalBookmarks(newBookmarks)
      return true
    }
  }

  const isBookmarked = (topicId: string) => {
    return bookmarks.some(b => b.topicId === topicId)
  }

  return {
    bookmarks,
    loading,
    addBookmark,
    addModuleBookmark,
    isModuleBookmarked,
    removeBookmark,
    isBookmarked,
    refetch: fetchBookmarks
  }
}