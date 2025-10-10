'use client';

import { WelcomeModal } from '@/components/auth/WelcomeModal';
import { useWelcomeModal } from '@/hooks/useWelcomeModal';
import { useCanonicalUrl } from '@/hooks/useCanonicalUrl';

// Import dev tools in development
if (process.env.NODE_ENV === 'development') {
  import('@/utils/welcomeModalDevTools');
}

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const { showWelcomeModal, hideWelcomeModal } = useWelcomeModal();
  
  // Set canonical URL for all pages
  useCanonicalUrl();

  return (
    <>
      {children}
      {showWelcomeModal && <WelcomeModal onClose={hideWelcomeModal} />}
    </>
  );
}