'use client'

import { useState, useMemo } from 'react'
import { FileMetadata, getCategories } from '@/lib/files'
import SearchBar from './SearchBar'
import CategoryFilter from './CategoryFilter'
import FileList from './FileList'

// Client component managing search and filter state
export default function FileListContainer({ files }: { files: FileMetadata[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  // Get unique categories
  const categories = useMemo(() => getCategories(), [])

  // Filter files based on search and category
  const filteredFiles = useMemo(() => {
    return files.filter((file) => {
      // Search filter: case-insensitive match on title and description
      const matchesSearch =
        searchQuery === '' ||
        file.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        file.description.toLowerCase().includes(searchQuery.toLowerCase())

      // Category filter: exact match
      const matchesCategory =
        selectedCategory === '' || file.category === selectedCategory

      // Combined AND logic
      return matchesSearch && matchesCategory
    })
  }, [files, searchQuery, selectedCategory])

  return (
    <div>
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <CategoryFilter
          categories={categories}
          value={selectedCategory}
          onChange={setSelectedCategory}
        />
      </div>
      <FileList files={filteredFiles} />
    </div>
  )
}
