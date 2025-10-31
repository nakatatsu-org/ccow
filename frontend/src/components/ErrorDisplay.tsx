import Link from 'next/link'

interface ErrorDisplayProps {
  errorType: '404' | '500'
  message: string
}

// Server component for displaying error messages
export default function ErrorDisplay({ errorType, message }: ErrorDisplayProps) {
  const title = errorType === '404' ? 'Page Not Found' : 'Something Went Wrong'
  const icon = errorType === '404' ? '🔍' : '⚠️'

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <div className="text-6xl mb-4">{icon}</div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-lg text-gray-600 mb-8">{message}</p>
      <div className="space-x-4">
        <Link
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          Go to Homepage
        </Link>
        {errorType === '404' && (
          <Link
            href="/"
            className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Search Files
          </Link>
        )}
      </div>
    </div>
  )
}
