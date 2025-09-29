'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export function useWelcomeModal() {
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    // Only show modal after session check is complete
    if (status === 'loading') return;

    // Don't show if user is already signed in
    if (session) return;

    // Check if user has seen the welcome modal before
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    
    if (hasSeenWelcome) return;

    // Check if this seems like a first visit by looking for any site-related data
    const siteRelatedKeys = [
      'hasSeenWelcome',
      'theme', 
      'bookmarks',
      'progress',
      'learndsa-',  // Any keys that start with our app prefix
      'nextauth'    // NextAuth session data
    ];

    const hasAnyAppData = Object.keys(localStorage).some(key => 
      siteRelatedKeys.some(appKey => key.toLowerCase().includes(appKey.toLowerCase()))
    );

    // Also check sessionStorage for any app-related data
    const hasSessionData = Object.keys(sessionStorage).some(key => 
      siteRelatedKeys.some(appKey => key.toLowerCase().includes(appKey.toLowerCase()))
    );

    // Check if there are any cookies that suggest they've been here before
    const hasReturningUserCookies = document.cookie.includes('next-auth') || 
                                   document.cookie.includes('learndsa');

    // Show modal only if:
    // 1. No localStorage data related to our app
    // 2. No sessionStorage data related to our app  
    // 3. No returning user cookies
    // 4. Not signed in
    if (!hasAnyAppData && !hasSessionData && !hasReturningUserCookies) {
      // Add small delay for better UX - let the page load first
      const timer = setTimeout(() => {
        setShowWelcomeModal(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [session, status]);

  const hideWelcomeModal = () => {
    setShowWelcomeModal(false);
    // Mark that user has seen the welcome modal
    localStorage.setItem('hasSeenWelcome', 'true');
  };

  return {
    showWelcomeModal,
    hideWelcomeModal
  };
}