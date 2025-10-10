'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function useCanonicalUrl() {
  const pathname = usePathname()

  useEffect(() => {
    // Only set canonical URL in production
    if (process.env.NODE_ENV !== 'production') return

    const canonicalUrl = `https://learndsa.app${pathname}`
    
    // Remove existing canonical link if any
    const existingCanonical = document.querySelector('link[rel="canonical"]')
    if (existingCanonical) {
      existingCanonical.remove()
    }

    // Add new canonical link
    const canonicalLink = document.createElement('link')
    canonicalLink.rel = 'canonical'
    canonicalLink.href = canonicalUrl
    document.head.appendChild(canonicalLink)

    // Cleanup function
    return () => {
      const linkToRemove = document.querySelector(`link[rel="canonical"][href="${canonicalUrl}"]`)
      if (linkToRemove) {
        linkToRemove.remove()
      }
    }
  }, [pathname])
}