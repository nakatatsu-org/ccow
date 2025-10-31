# Download Site Feature - Implementation Tasks

## Phase 1: Setup & Infrastructure

### T003: Create Sample Data File
- **Files**: `frontend/app/public/data/files.json`
- **Dependencies**: None
- **Actions**:
  - Create JSON array with sample file objects matching schema from spec.md
  - Include fields: id, title, version, releaseDate, size, category, description, downloadUrl, relatedFileIds
  - Add at least 10 sample files across 3 categories for testing

## Phase 2: Data Layer

### T010 [P]: Implement Data Fetching Utilities
- **Files**: `frontend/app/src/lib/files.ts`
- **Dependencies**: T003
- **Actions**:
  - Implement getFiles(): read files.json with fs.readFileSync, parse and return array
  - Implement getFileById(id): find file by id, return file or null
  - Implement getRelatedFiles(fileId): fetch by relatedFileIds or fallback to same category, max 5, exclude current
  - Implement getCategories(): return unique categories from files array
  - Add TypeScript FileMetadata interface matching JSON schema

## Phase 3: Server Components

### T020 [P]: Implement FileDetail Component
- **Files**: `frontend/app/src/components/FileDetail.tsx`
- **Dependencies**: T010
- **Actions**:
  - Server component displaying file title, version, releaseDate, size, category, description
  - Download button with href to downloadUrl
  - Format size (bytes to KB/MB) and date (ISO to readable format)
  - Tailwind responsive styling

### T021 [P]: Implement Breadcrumb Component
- **Files**: `frontend/app/src/components/Breadcrumb.tsx`
- **Dependencies**: None
- **Actions**:
  - Server component accepting items array prop
  - Render Home > Files > [Title] navigation path
  - Use Next.js Link for navigation
  - Tailwind styling with separators

### T022 [P]: Implement RelatedFiles Component
- **Files**: `frontend/app/src/components/RelatedFiles.tsx`
- **Dependencies**: T010, T030 (FileCard)
- **Actions**:
  - Server component accepting relatedFiles array prop
  - Render grid of FileCard components (max 5)
  - Show "Related Files" heading
  - Handle empty state gracefully

### T023 [P]: Implement ErrorDisplay Component
- **Files**: `frontend/app/src/components/ErrorDisplay.tsx`
- **Dependencies**: None
- **Actions**:
  - Server component with errorType (404 | 500) and message props
  - Display error message with icon
  - Link back to homepage or search
  - Tailwind error styling

## Phase 4: Client Components

### T030 [P]: Implement FileCard Component
- **Files**: `frontend/app/src/components/FileCard.tsx`
- **Dependencies**: None
- **Actions**:
  - Client component ("use client") accepting file prop
  - Display title, version, releaseDate, size, category
  - Link to /files/[id] detail page
  - Card layout with hover effects (Tailwind)
  - Format date and size for display

### T031: Implement SearchBar Component
- **Files**: `frontend/app/src/components/SearchBar.tsx`
- **Dependencies**: None
- **Actions**:
  - Client component with value and onChange props
  - Input field with search icon
  - Tailwind styling with focus states
  - Accessibility labels

### T032: Implement CategoryFilter Component
- **Files**: `frontend/app/src/components/CategoryFilter.tsx`
- **Dependencies**: None
- **Actions**:
  - Client component with categories, value, onChange props
  - Select/dropdown with "All Categories" option
  - Tailwind styling
  - Accessibility labels

### T033: Implement FileList Component
- **Files**: `frontend/app/src/components/FileList.tsx`
- **Dependencies**: T030
- **Actions**:
  - Client component accepting files array prop
  - Map files to FileCard grid
  - Responsive grid layout (1-2-3 columns based on breakpoints)
  - Empty state when no files match filters

### T034: Implement FileListContainer Component
- **Files**: `frontend/app/src/components/FileListContainer.tsx`
- **Dependencies**: T031, T032, T033
- **Actions**:
  - Client component managing searchQuery and selectedCategory state
  - Accept files array prop from server
  - Filter logic: case-insensitive search on title/description, exact category match, combined AND
  - Render SearchBar, CategoryFilter, FileList with filtered data
  - Layout with filter controls above file grid

## Phase 5: Routes & Pages

### T040: Implement Homepage Route
- **Files**: `frontend/app/src/app/page.tsx`
- **Dependencies**: T010, T034
- **Actions**:
  - Server component calling getFiles() at build time
  - Pass full files array to FileListContainer
  - Page title and meta tags
  - Layout wrapper

### T041: Implement File Detail Route
- **Files**: `frontend/app/src/app/files/[id]/page.tsx`
- **Dependencies**: T010, T020, T021, T022
- **Actions**:
  - Server component with generateStaticParams using getFiles()
  - Extract params.id, call getFileById() and getRelatedFiles()
  - Call notFound() if file is null
  - Render Breadcrumb, FileDetail, RelatedFiles components
  - Generate metadata for SEO

### T042: Implement Not Found Page
- **Files**: `frontend/app/src/app/not-found.tsx`
- **Dependencies**: T023
- **Actions**:
  - Server component rendering ErrorDisplay with 404 type
  - Custom 404 message
  - Link back to homepage

### T043: Implement Error Boundary
- **Files**: `frontend/app/src/app/error.tsx`
- **Dependencies**: T023
- **Actions**:
  - Error boundary component
  - Render ErrorDisplay with 500 type
  - Reset button to retry
