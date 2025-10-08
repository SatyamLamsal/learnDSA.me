'use client'

import { getProviders, signIn } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { AlertCircle, ArrowLeft, Trophy } from 'lucide-react'
import type { ClientSafeProvider } from 'next-auth/react'

export default function SignInPage() {
  const [providers, setProviders] = useState<Record<string, ClientSafeProvider> | null>(null)
  const [error, setError] = useState('')
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const errorParam = searchParams.get('error')

  useEffect(() => {
    const setupProviders = async () => {
      const providers = await getProviders()
      setProviders(providers)
    }
    setupProviders()
  }, [])

  useEffect(() => {
    if (errorParam) {
      switch (errorParam) {
        case 'OAuthSignin':
          setError('Error occurred during OAuth sign-in. Please check your Google OAuth configuration.')
          break
        case 'OAuthCallback':
          setError('Error occurred during OAuth callback. Please try again.')
          break
        case 'OAuthCreateAccount':
          setError('Could not create OAuth account. Please try again.')
          break
        case 'EmailCreateAccount':
          setError('Could not create account with that email address.')
          break
        case 'Callback':
          setError('Error occurred during callback. Please try again.')
          break
        case 'OAuthAccountNotLinked':
          setError('Email already exists with different provider.')
          break
        case 'SessionRequired':
          setError('Please sign in to access this page.')
          break
        case 'AccessDenied':
          setError('Access denied. Please try again.')
          break
        default:
          setError('An unexpected error occurred. Please try again.')
      }
    }
  }, [errorParam])

  const handleGoogleSignIn = async () => {
    try {
      await signIn('google', { callbackUrl })
    } catch (error) {
      console.error('Sign-in error:', error)
      setError('Failed to sign in. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4 text-gray-700">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-gray-700"
      >
        {/* Header */}
        <div className="text-center mb-8 text-gray-700">
          <div className="bg-blue-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 text-gray-700">
            <Trophy className="h-10 w-10 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Learn DSA</h1>
          <p className="text-gray-600">
            Sign in to save your progress and sync across all devices
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start space-x-3 text-gray-700"
          >
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-red-800">Authentication Error</h3>
              <p className="text-sm text-red-600 mt-1">{error}</p>
              {errorParam === 'OAuthSignin' && (
                <div className="mt-3 text-xs text-red-500">
                  <p><strong>Common solutions:</strong></p>
                  <ul className="list-disc list-inside mt-1 space-y-1 text-gray-700">
                    <li>Check that GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are set in .env.local</li>
                    <li>Verify that your Google OAuth app is configured correctly</li>
                    <li>Ensure redirect URI includes: http://localhost:3000/api/auth/callback/google</li>
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Sign In Options */}
        <div className="space-y-4 text-gray-700">
          {providers?.google ? (
            <button
              onClick={handleGoogleSignIn}
              className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-3"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continue with Google</span>
            </button>
          ) : (
            <div className="text-center text-gray-500">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2 text-gray-700"></div>
              <p>Loading...</p>
            </div>
          )}

          <div className="relative text-gray-700">
            <div className="absolute inset-0 flex items-center text-gray-700">
              <div className="w-full border-t border-gray-200 text-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm text-gray-600">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          <Link
            href={callbackUrl}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4 text-gray-700" />
            <span>Continue as Guest</span>
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-700">
          <p className="text-xs text-gray-500">
            By signing in, you agree to our{' '}
            <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>
            {' '}and{' '}
            <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
          </p>
        </div>

        {/* Development Helper */}
        {process.env.NODE_ENV === 'development' && !providers?.google && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-gray-700"
          >
            <h4 className="font-medium text-yellow-800 mb-2">Development Setup Required</h4>
            <p className="text-sm text-yellow-700 mb-2">
              Google OAuth is not configured. Please set up your environment variables:
            </p>
            <ol className="text-xs text-yellow-600 list-decimal list-inside space-y-1">
              <li>Add GOOGLE_CLIENT_ID to .env.local</li>
              <li>Add GOOGLE_CLIENT_SECRET to .env.local</li>
              <li>Add NEXTAUTH_SECRET to .env.local</li>
              <li>Restart your development server</li>
            </ol>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}