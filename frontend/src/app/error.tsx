'use client'

import { useEffect } from 'react'
import ErrorDisplay from '@/components/ErrorDisplay'

// Error boundary component
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div>
      <ErrorDisplay
        errorType="500"
        message="An unexpected error occurred. Please try again."
      />
      <div className="text-center mt-4">
        <button
          onClick={reset}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}
