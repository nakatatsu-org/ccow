'use client'

import Link from 'next/link'
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

// Client component for individual file card
export default function FileCard({ file }: { file: FileMetadata }) {
  return (
    <Link href={`/files/${file.id}`}>
      <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer h-full">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{file.title}</h3>

        <div className="space-y-1 text-sm mb-3">
          <p className="text-gray-600">
            <span className="font-medium">Version:</span> {file.version}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Date:</span> {formatDate(file.releaseDate)}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Size:</span> {formatSize(file.size)}
          </p>
        </div>

        <div className="mt-2">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
            {file.category}
          </span>
        </div>
      </div>
    </Link>
  )
}
