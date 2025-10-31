# Download Site Feature

This is the specification for the download site.

## Purpose

It is demo mock site. The site looks like:

> Provide users with a simple and efficient way to browse and download available files through a clean, static site interface.

## Requirements

### Functional Requirements

- **DOWNLOAD-FR-001**: Users can view a list of downloadable files with metadata (title, version, date, size)
- **DOWNLOAD-FR-002**: Users can filter files by category
- **DOWNLOAD-FR-003**: Users can search for specific files
- **DOWNLOAD-FR-004**: Users can view detailed information about a file
- **DOWNLOAD-FR-005**: Users can download files via download button
- **DOWNLOAD-FR-006**: Users can navigate to related files from detail page

### UI/UX Requirements

- **DOWNLOAD-UX-001**: Fast page load with SSG (static generation)
- **DOWNLOAD-UX-002**: Responsive design for mobile, tablet, and desktop
- **DOWNLOAD-UX-003**: Clear navigation with breadcrumbs on detail pages
- **DOWNLOAD-UX-004**: Error pages guide users back to valid content

### Quality Assurance Requirements

- **DOWNLOAD-QA-001**: Unit tests cover critical business logic (file filtering, search, related files)
- **DOWNLOAD-QA-002**: E2E tests verify user scenarios (browse, search, filter, download)
- **DOWNLOAD-QA-003**: Type safety enforced via TypeScript with strict mode
- **DOWNLOAD-QA-004**: Code quality enforced via ESLint (Next.js recommended config)
- **DOWNLOAD-QA-005**: Build verification ensures deployable artifact
- **DOWNLOAD-QA-006**: Security scan prevents vulnerable dependencies

### CI/CD Requirements

- **DOWNLOAD-CI-001**: PR checks run automatically on pull request open/update
- **DOWNLOAD-CI-002**: PR checks include: lint, type check, build, audit, unit tests, E2E tests
- **DOWNLOAD-CI-003**: PR checks executable locally via single script (`scripts/test-pr.sh`)
- **DOWNLOAD-CI-004**: All checks must pass before merge allowed
- **DOWNLOAD-CI-005**: Checks fail fast (stop on first error)

## User Scenarios

### Scenario 1: Browse and Download File

**User Goal**: Find and download a specific file

**Steps**:
1. User lands on homepage showing file list
2. System displays files with metadata (title, version, date, size)
3. User optionally uses search or category filter
4. User clicks on a file to view details
5. System shows file detail page with description and download button
6. User clicks download button
7. System initiates file download

**Success**: User successfully downloads the desired file

### Scenario 2: Explore Related Files

**User Goal**: Discover related files after viewing one file

**Steps**:
1. User views a file detail page
2. System displays related files in sidebar
3. User clicks on a related file
4. System navigates to that file's detail page

**Success**: User finds additional relevant files

### Scenario 3: Handle Errors

**User Goal**: Recover from invalid URL or missing file

**Steps**:
1. User navigates to invalid URL or deleted file
2. System displays error page with message
3. User clicks link to return to homepage or search
4. System navigates to valid page

**Success**: User returns to browsing without confusion

## Data Source

### File Metadata
- **Location**: `/public/data/files.json` (static JSON file in public directory)
- **Format**: Array of file objects
- **Schema**:
  ```typescript
  {
    id: string;
    title: string;
    version: string;
    releaseDate: string; // ISO 8601 format
    size: number; // bytes
    category: string;
    description: string;
    downloadUrl: string;
    relatedFileIds?: string[];
  }
  ```
- **Update Strategy**: Manual update and rebuild (static mock data)
- **Build Integration**: Read at build time for static generation

### Related Files Logic
- Related files determined by `relatedFileIds` array in file metadata
- If `relatedFileIds` is empty/undefined, fallback to showing files in same category ordered by release date (newest first)
- Maximum 5 related files displayed

### Search and Filter Implementation
- **Strategy**: Client-side filtering with full dataset bundled
- **Dataset Size Constraint**: Suitable for small to medium catalogs (< 1000 files)
- **Implementation**:
  - Full file list passed to client component as prop
  - Search filters by title and description (case-insensitive)
  - Category filter shows only matching categories
  - Both filters can be combined

## Architecture

### Components

documents/frontend/coding-standard.md に準拠すること。

**FileList** (Server Component):
- Purpose: Display list of files with metadata
- Props: files (array of file objects)
- State: None (server component)

**FileCard** (Server Component):
- Purpose: Display individual file summary in list
- Props: file (file object with id, title, version, date, size, category)
- State: None

**FileDetail** (Server Component):
- Purpose: Display complete file information and download button
- Props: file (detailed file object)
- State: None

**SearchBar** (Client Component):
- Purpose: Allow users to search files
- Props: onSearch (callback)
- State: searchQuery (string)

**CategoryFilter** (Client Component):
- Purpose: Filter files by category
- Props: categories (array), onFilter (callback)
- State: selectedCategory (string)

**Breadcrumb** (Server Component):
- Purpose: Show navigation path on detail pages
- Props: items (array of breadcrumb items)
- State: None

**ErrorDisplay** (Server Component):
- Purpose: Show error messages with recovery options
- Props: errorType (404 | 500), message (string)
- State: None

## Technical Stack

documents/frontend/technical-context.md 参照

## Success Criteria

### Functional

- User can browse file list on homepage
- User can search and filter files
- User can view file details and download
- User can navigate between related files
- Error pages display for invalid routes
- No console errors or warnings

### Quality

- TypeScript compilation passes with no errors
- ESLint passes with no errors
- All unit tests pass (Jest)
- All E2E tests pass (Playwright)
- Build succeeds without errors
- No high/critical security vulnerabilities (npm audit)

## References

- Next.js Documentation: https://nextjs.org/docs
- Design System: Tailwind CSS v3, shadcn/ui
- Related Features: frontend/list-of-screens.md
