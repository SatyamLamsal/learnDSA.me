'use client'

import { createContext, useContext, ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'

interface AuthContextProviderProps {
  children: ReactNode
}

const AuthContext = createContext({})

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export const useAuthContext = () => useContext(AuthContext)