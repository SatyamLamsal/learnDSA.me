'use client'

import { useProgress } from '@/hooks/useProgress'
import { ReactNode } from 'react'
import { CheckCircle } from 'lucide-react'

interface CompletionCardWrapperProps {
  topicId: string
  children: ReactNode
  className?: string
}

export function CompletionCardWrapper({ 
  topicId, 
  children, 
  className = '' 
}: CompletionCardWrapperProps) {
  const { getTopicProgress } = useProgress()
  const progress = getTopicProgress(topicId)
  const isCompleted = progress?.completed || false

  const completionClasses = isCompleted 
    ? 'border-green-200 bg-gradient-to-br from-green-50/40 to-white' 
    : 'border-gray-100'

  return (
    <div className={`${className} border-2 ${completionClasses} transition-all duration-300 relative`}>
      {isCompleted && (
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-green-500 text-white rounded-full p-1.5 shadow-md">
            <CheckCircle className="h-4 w-4 fill-current" />
          </div>
        </div>
      )}
      {children}
    </div>
  )
}