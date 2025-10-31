import { FileMetadata } from '@/lib/files'

// Format file size from bytes to human-readable format
function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

// Format date from ISO string to readable format
function formatDate(isoDate: string): string {
  const date = new Date(isoDate)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Server component displaying file details
export default function FileDetail({ file }: { file: FileMetadata }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">{file.title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-sm text-gray-600">Version</p>
          <p className="text-lg font-medium text-gray-900">{file.version}</p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Release Date</p>
          <p className="text-lg font-medium text-gray-900">{formatDate(file.releaseDate)}</p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Size</p>
          <p className="text-lg font-medium text-gray-900">{formatSize(file.size)}</p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Category</p>
          <p className="text-lg font-medium text-gray-900">{file.category}</p>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">Description</p>
        <p className="text-gray-900">{file.description}</p>
      </div>

      <a
        href={file.downloadUrl}
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        download
      >
        Download
      </a>
    </div>
  )
}
