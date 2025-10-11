'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, BookOpen, Shield } from 'lucide-react';
import Link from 'next/link';

interface LearningPathLayoutProps {
  children: React.ReactNode;
}

export default function LearningPathLayout({ children }: LearningPathLayoutProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=' + encodeURIComponent(window.location.pathname));
    } else if (status === 'authenticated' && session?.user) {
      // Check if this is a first-time user
      const hasVisitedBefore = localStorage.getItem('hasVisitedLearningPath');
      if (!hasVisitedBefore) {
        setShowWelcome(true);
        localStorage.setItem('hasVisitedLearningPath', 'true');
      }
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading Learning Path...</h2>
          <p className="text-gray-600">Preparing your personalized experience</p>
        </motion.div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto text-center p-8"
        >
          <Shield className="w-16 h-16 text-blue-600 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Authentication Required</h2>
          <p className="text-gray-600 mb-6">
            Please sign in to access your personalized learning path and track your progress.
          </p>
          <Link
            href="/auth/signin?callbackUrl=/learning-path"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Sign In to Continue
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      {children}
      
      {/* Welcome Message Modal for First-Time Users */}
      {showWelcome && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowWelcome(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-8 max-w-md mx-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Welcome to LearnDSA! 🎉
              </h3>
              
              <div className="text-left bg-blue-50 rounded-lg p-4 mb-6">
                <p className="text-gray-700 text-sm leading-relaxed">
                  <strong>Hey there!</strong> 👋 We&apos;ve got some solid DSA content ready for you, 
                  but we&apos;re still in construction mode! 🚧
                </p>
                <p className="text-gray-700 text-sm leading-relaxed mt-2">
                  Keep visiting us as we add new modules, interactive exercises, 
                  and cool stuff regularly. Thanks for being an early explorer! 🚀
                </p>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => setShowWelcome(false)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  Let&apos;s Start Learning! 🚀
                </button>
                
                <button
                  onClick={() => setShowWelcome(false)}
                  className="w-full text-gray-500 text-sm hover:text-gray-700 transition-colors"
                >
                  Got it, don&apos;t show again
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}