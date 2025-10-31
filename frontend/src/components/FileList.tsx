'use client'

import { FileMetadata } from '@/lib/files'
import FileCard from './FileCard'

// Client component for displaying grid of file cards
export default function FileList({ files }: { files: FileMetadata[] }) {
  if (files.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No files found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {files.map((file) => (
        <FileCard key={file.id} file={file} />
      ))}
    </div>
  )
}
