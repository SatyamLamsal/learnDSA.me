'use client';

import { WelcomeModal } from '@/components/auth/WelcomeModal';
import { useWelcomeModal } from '@/hooks/useWelcomeModal';

// Import dev tools in development
if (process.env.NODE_ENV === 'development') {
  import('@/utils/welcomeModalDevTools');
}

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const { showWelcomeModal, hideWelcomeModal } = useWelcomeModal();

  return (
    <>
      {children}
      {showWelcomeModal && <WelcomeModal onClose={hideWelcomeModal} />}
    </>
  );
}