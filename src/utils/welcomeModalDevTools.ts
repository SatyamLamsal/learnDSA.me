/**
 * Development utility functions for testing the welcome modal
 * These can be called from browser console during development
 */

declare global {
  interface Window {
    testWelcomeModal: {
      clearFirstVisitData: () => void;
      showWelcomeModal: () => void;
      checkFirstVisitStatus: () => void;
    };
  }
}

// Development utilities - only available in development mode
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  window.testWelcomeModal = {
    // Clear all data to simulate first visit
    clearFirstVisitData: () => {
      localStorage.clear();
      sessionStorage.clear();
      console.log('✅ Cleared all local/session storage. Refresh page to test first visit.');
    },
    
    // Force show welcome modal
    showWelcomeModal: () => {
      localStorage.removeItem('hasSeenWelcome');
      localStorage.removeItem('userChoice');
      console.log('✅ Removed welcome flags. Refresh page to see welcome modal.');
    },
    
    // Check current first visit status
    checkFirstVisitStatus: () => {
      const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
      const userChoice = localStorage.getItem('userChoice');
      const hasAppData = Object.keys(localStorage).some(key => 
        ['hasSeenWelcome', 'theme', 'bookmarks', 'progress', 'learndsa-', 'nextauth'].some(appKey => 
          key.toLowerCase().includes(appKey.toLowerCase())
        )
      );
      
      console.log('🔍 First Visit Status:', {
        hasSeenWelcome: !!hasSeenWelcome,
        userChoice,
        hasAppData,
        localStorage: Object.keys(localStorage),
        sessionStorage: Object.keys(sessionStorage)
      });
    }
  };

  console.log(`
🎯 Welcome Modal Dev Tools Available:
- testWelcomeModal.clearFirstVisitData() - Clear all data to simulate first visit
- testWelcomeModal.showWelcomeModal() - Force show welcome modal
- testWelcomeModal.checkFirstVisitStatus() - Check current status
  `);
}

export {};