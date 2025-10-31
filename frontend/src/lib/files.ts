import filesData from '../../public/data/files.json'

// FileMetadata interface matching the JSON schema
export interface FileMetadata {
  id: string
  title: string
  version: string
  releaseDate: string
  size: number
  category: string
  description: string
  downloadUrl: string
  relatedFileIds?: string[]
}

// Get all files from the JSON file
export function getFiles(): FileMetadata[] {
  return filesData as FileMetadata[]
}

// Get a single file by ID
export function getFileById(id: string): FileMetadata | null {
  const files = getFiles()
  const file = files.find((f) => f.id === id)
  return file || null
}

// Get related files for a given file ID
export function getRelatedFiles(fileId: string): FileMetadata[] {
  const files = getFiles()
  const currentFile = files.find((f) => f.id === fileId)

  if (!currentFile) {
    return []
  }

  let relatedFiles: FileMetadata[] = []

  // First, try to get files by relatedFileIds
  if (currentFile.relatedFileIds && currentFile.relatedFileIds.length > 0) {
    relatedFiles = files.filter((f) =>
      currentFile.relatedFileIds?.includes(f.id) && f.id !== fileId
    )
  }

  // If no related files found, fallback to same category
  if (relatedFiles.length === 0) {
    relatedFiles = files
      .filter((f) => f.category === currentFile.category && f.id !== fileId)
      .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
  }

  // Return maximum 5 files
  return relatedFiles.slice(0, 5)
}

// Get unique categories
export function getCategories(): string[] {
  const files = getFiles()
  const categories = files.map((f) => f.category)
  return Array.from(new Set(categories))
}
