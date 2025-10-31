import { notFound } from 'next/navigation'
import { getFiles, getFileById, getRelatedFiles } from '@/lib/files'
import Breadcrumb from '@/components/Breadcrumb'
import FileDetail from '@/components/FileDetail'
import RelatedFiles from '@/components/RelatedFiles'
import type { Metadata } from 'next'

// Generate static params for all files
export async function generateStaticParams() {
  const files = getFiles()
  return files.map((file) => ({
    id: file.id,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const file = getFileById(id)

  if (!file) {
    return {
      title: 'File Not Found',
    }
  }

  return {
    title: `${file.title} - Download`,
    description: file.description,
  }
}

// File Detail Page - Server Component
export default async function FileDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const file = getFileById(id)

  if (!file) {
    notFound()
  }

  const relatedFiles = getRelatedFiles(id)

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Files', href: '/' },
    { label: file.title },
  ]

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <FileDetail file={file} />
      <RelatedFiles relatedFiles={relatedFiles} />
    </div>
  )
}
