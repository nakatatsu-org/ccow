# Download Site Feature - Implementation Tasks

## Phase 1: Setup & Infrastructure

### T001: Setup Project Dependencies
- **Files**: `frontend/app/package.json`
- **Dependencies**: None
- **Actions**:
  - Add Vitest and testing dependencies (@vitejs/plugin-react, @testing-library/react, @testing-library/jest-dom, jsdom)
  - Add Playwright (@playwright/test)
  - Add test scripts: test:unit, test:unit:watch, test:e2e, test:e2e:ui

### T002: Create Testing Configuration Files
- **Files**:
  - `frontend/app/vitest.config.ts`
  - `frontend/app/playwright.config.ts`
  - `frontend/app/tests/setup.ts`
- **Dependencies**: T001
- **Actions**:
  - Configure Vitest with jsdom environment and path aliases
  - Configure Playwright for chromium with webServer settings
  - Setup testing-library matchers

### T003: Create Sample Data File
- **Files**: `frontend/app/public/data/files.json`
- **Dependencies**: None
- **Actions**:
  - Create JSON array with sample file objects matching schema from spec.md
  - Include fields: id, title, version, releaseDate, size, category, description, downloadUrl, relatedFileIds
  - Add at least 10 sample files across 3 categories for testing

### T004: Create Test Script
- **Files**: `scripts/test-pr.sh`
- **Dependencies**: T002
- **Actions**:
  - Create bash script with fail-fast execution (set -e)
  - Add 6 sequential checks: lint, type check, build, audit, unit tests, E2E tests
  - Make script executable (chmod +x)

### T005: Create CI/CD Workflow
- **Files**: `.github/workflows/pr-test.yml`
- **Dependencies**: T004
- **Actions**:
  - Configure workflow to trigger on PR (opened, synchronize, reopened)
  - Add path filters: frontend/app/**, scripts/test-pr.sh, .github/workflows/pr-test.yml
  - Setup Node.js 24, npm cache, Playwright installation
  - Execute test-pr.sh script

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

### T011 [P]: Write Unit Tests for Data Layer
- **Files**: `frontend/app/tests/unit/lib/files.test.ts`
- **Dependencies**: T002, T010
- **Actions**:
  - Test getFiles() returns correct array structure
  - Test getFileById() with valid and invalid IDs
  - Test getRelatedFiles() with relatedFileIds and category fallback
  - Test getCategories() returns unique array
  - Mock files.json data for deterministic tests

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

## Phase 6: Unit Testing

### T050 [P]: Write FileListContainer Tests
- **Files**: `frontend/app/tests/unit/components/FileListContainer.test.tsx`
- **Dependencies**: T002, T034
- **Actions**:
  - Test search filtering on title and description
  - Test category filtering
  - Test combined search + category filtering
  - Test empty results state
  - Use testing-library for user interactions

## Phase 7: E2E Testing

### T060 [P]: Write Homepage E2E Tests
- **Files**: `frontend/app/tests/e2e/homepage.spec.ts`
- **Dependencies**: T002, T040
- **Actions**:
  - Test file list renders with all files
  - Test search functionality filters results
  - Test category filter updates list
  - Test clicking file card navigates to detail page
  - Cover User Scenario 1 from spec.md

### T061 [P]: Write File Detail E2E Tests
- **Files**: `frontend/app/tests/e2e/file-detail.spec.ts`
- **Dependencies**: T002, T041
- **Actions**:
  - Test file detail page renders all metadata
  - Test download button has correct href
  - Test breadcrumbs navigation
  - Test related files display and navigation
  - Cover User Scenario 2 from spec.md

### T062 [P]: Write Error Handling E2E Tests
- **Files**: `frontend/app/tests/e2e/error-handling.spec.ts`
- **Dependencies**: T002, T042, T043
- **Actions**:
  - Test 404 page for invalid file ID
  - Test error page displays on runtime error
  - Test recovery links navigate correctly
  - Cover User Scenario 3 from spec.md

## Phase 8: Quality Gates

### T070: Run TypeScript Check
- **Command**: `cd frontend/app && npx tsc --noEmit`
- **Dependencies**: T040-T043
- **Actions**:
  - Verify all TypeScript compilation errors are resolved
  - Ensure strict mode compliance

### T071: Run ESLint
- **Command**: `cd frontend/app && npm run lint`
- **Dependencies**: T070
- **Actions**:
  - Fix all ESLint errors
  - Follow Next.js recommended config

### T072: Run Build Verification
- **Command**: `cd frontend/app && npm run build`
- **Dependencies**: T071
- **Actions**:
  - Ensure build completes without errors
  - Verify all file detail pages are statically generated

### T073: Verify SSG Output
- **Check**: `frontend/app/.next/server/app/**/*.html` files exist
- **Dependencies**: T072
- **Actions**:
  - Confirm homepage HTML exists
  - Confirm all file detail pages have prerendered HTML
  - Verify no dynamic rendering fallbacks

### T074: Run Security Audit
- **Command**: `cd frontend/app && npm audit --audit-level=high`
- **Dependencies**: T072
- **Actions**:
  - Address any high/critical vulnerabilities
  - Update dependencies if needed

### T075: Run Unit Tests
- **Command**: `cd frontend/app && npm run test:unit`
- **Dependencies**: T011, T050
- **Actions**:
  - Ensure all unit tests pass
  - Verify test coverage meets requirements

### T076: Run E2E Tests
- **Command**: `cd frontend/app && npm run test:e2e`
- **Dependencies**: T060, T061, T062, T072
- **Actions**:
  - Ensure all E2E tests pass on built application
  - Verify all user scenarios work end-to-end

### T077: Run Complete PR Check Script
- **Command**: `bash scripts/test-pr.sh`
- **Dependencies**: T070-T076
- **Actions**:
  - Execute full PR check locally
  - Verify all 6 checks pass sequentially
  - Confirm script exits on first error as expected

## Dependencies Summary

**Phase 1 (Setup)**: T001 → T002 → [T004, T005], T003 standalone
**Phase 2 (Data)**: T010 [P], T011 [P] (depends on T002, T010)
**Phase 3 (Server Components)**: T020 [P], T021 [P], T023 [P] (all depend on T010), T022 (depends on T030)
**Phase 4 (Client Components)**: T030 [P], T031 [P], T032 [P] → T033 (depends on T030) → T034 (depends on T031, T032, T033)
**Phase 5 (Routes)**: T040 (depends on T010, T034), T041 (depends on T010, T020, T021, T022), T042 (depends on T023), T043 (depends on T023)
**Phase 6 (Unit Tests)**: T050 [P] (depends on T002, T034)
**Phase 7 (E2E Tests)**: T060 [P] (depends on T002, T040), T061 [P] (depends on T002, T041), T062 [P] (depends on T002, T042, T043)
**Phase 8 (Quality)**: T070 → T071 → T072 → [T073, T074, T075 [P], T076] → T077

**Parallelizable Tasks**: Marked with [P] can run concurrently within same phase
