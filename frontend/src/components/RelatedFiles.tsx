import { FileMetadata } from '@/lib/files'
import FileCard from './FileCard'

// Server component displaying related files
export default function RelatedFiles({ relatedFiles }: { relatedFiles: FileMetadata[] }) {
  if (relatedFiles.length === 0) {
    return null
  }

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Related Files</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedFiles.map((file) => (
          <FileCard key={file.id} file={file} />
        ))}
      </div>
    </div>
  )
}
