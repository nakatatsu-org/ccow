import ErrorDisplay from '@/components/ErrorDisplay'

// Custom 404 page
export default function NotFound() {
  return (
    <ErrorDisplay
      errorType="404"
      message="The page you're looking for doesn't exist or has been moved."
    />
  )
}
