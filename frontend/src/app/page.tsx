import { getFiles } from '@/lib/files'
import FileListContainer from '@/components/FileListContainer'

// Homepage - Server Component
export default function HomePage() {
  const files = getFiles()

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Available Downloads</h2>
      <FileListContainer files={files} />
    </div>
  )
}
