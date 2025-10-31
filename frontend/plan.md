# Download Site Feature - Implementation Plan

## Summary

Implement a static download site using Next.js 16 SSG that allows users to browse, search, filter, and download files. The site will feature a hybrid server/client component architecture where all pages are statically generated at build time, with client-side interactivity for search and filtering. File metadata is sourced from a static JSON file in the public directory, and all file detail pages are prerendered using generateStaticParams.

## Technical Context

Load `documents/frontend/technical-context.md`

## Architecture

In any case, `documents/frontend/coding-standard.md`  has highest priority.


### Component Hierarchy

```
HomePage (page.tsx - Server Component)
└── FileListContainer (Client Component - manages search/filter state)
    ├── SearchBar (Client Component - search input)
    ├── CategoryFilter (Client Component - category dropdown)
    └── FileList (Client Component - displays filtered results)
        └── FileCard (Client Component - individual file card)

FileDetailPage ([id]/page.tsx - Server Component)
├── Breadcrumb (Server Component - navigation breadcrumbs)
├── FileDetail (Server Component - file information and download)
└── RelatedFiles (Server Component - related file suggestions)
    └── FileCard (Client Component - reusable, must be client due to import in FileList)

NotFoundPage (not-found.tsx - Server Component)
└── ErrorDisplay (Server Component - 404 message with navigation)

ErrorPage (error.tsx - Server Component)
└── ErrorDisplay (Server Component - error boundary UI)
```

**Note**: FileCard is used in both client context (homepage FileList) and server context (detail page RelatedFiles). Since it must be a client component to be imported by FileList, it will also be a client component when used in RelatedFiles. This is acceptable as FileCard has minimal logic.

### Server vs Client Components

**Server Components** (default):
- `FileDetail`: Shows complete file information, download button, related files
- `Breadcrumb`: Navigation breadcrumbs (Home > Files > [Title])
- `RelatedFiles`: Displays related files based on relatedFileIds or category fallback
- `ErrorDisplay`: Error messages with recovery links

**Client Components** ('use client'):
- `FileListContainer`: Manages search query and category filter state, passes filtered data to FileList
  - State: searchQuery (string), selectedCategory (string)
  - Props: files (full array from server)
  - Logic: Filters files by search query (title/description) and category
  - Children: SearchBar, CategoryFilter, FileList (with filtered data)
- `FileList`: Receives filtered file array as prop, renders FileCard grid
  - Props: files (filtered array)
  - Renders grid of FileCard components
  - **Rationale for Client Component**: Must be imported by FileListContainer (client component) to receive filtered data. Client components cannot import server components directly.
- `FileCard`: Displays file metadata (title, version, date, size, category), link to detail page
  - Props: file (single file object)
  - **Rationale for Client Component**: Imported by FileList (client component). Although FileCard itself has no interactivity, it must be a client component due to Next.js composition rules.
- `SearchBar`: Search input with onChange handler
  - Props: value, onChange callback
  - UI: Input field with search icon
- `CategoryFilter`: Category dropdown with onChange handler
  - Props: categories (string[]), value, onChange callback
  - UI: Select/dropdown with "All Categories" option

### Route Structure

```
frontend/src/app/
├── page.tsx                           # Homepage - renders FileListContainer with all files
├── files/
│   └── [id]/
│       └── page.tsx                   # File detail page - uses generateStaticParams
├── not-found.tsx                      # Custom 404 page
├── error.tsx                          # Error boundary
└── layout.tsx                         # Root layout (already exists)

frontend/src/components/
├── FileListContainer.tsx              # Client component wrapper
├── FileList.tsx                       # Server component
├── FileCard.tsx                       # Server component
├── FileDetail.tsx                     # Server component
├── RelatedFiles.tsx                   # Server component
├── SearchBar.tsx                      # Client component
├── CategoryFilter.tsx                 # Client component
├── Breadcrumb.tsx                     # Server component
└── ErrorDisplay.tsx                   # Server component

frontend/src/lib/
└── files.ts                           # Data fetching utilities
    - getFiles(): reads and parses files.json
    - getFileById(id): returns single file or null
    - getRelatedFiles(fileId): returns related files array
    - getCategories(): returns unique categories array

frontend/public/data/
└── files.json                         # Static file metadata (provided by user)
```


### Data Flow

**Build Time**:
1. `generateStaticParams` in `/files/[id]/page.tsx` calls `getFiles()` from `lib/files.ts`
2. `getFiles()` reads `/public/data/files.json` using Node.js `fs.readFileSync`
3. Returns array of file IDs for static generation
4. Each file detail page is prerendered with file data

**Runtime (Homepage)**:
1. `page.tsx` (server component) calls `getFiles()` at build time
2. Full file array passed as prop to `FileListContainer` (client component)
3. `FileListContainer` manages search/filter state, filters array in memory
4. Filtered array passed to `FileList` (server component) as prop
5. `FileList` maps to `FileCard` components

**Runtime (File Detail Page)**:
1. `[id]/page.tsx` receives `params.id`
2. Calls `getFileById(id)` - if null, calls `notFound()`
3. Calls `getRelatedFiles(id)` for related files section
4. Renders `FileDetail` with file data and `RelatedFiles` with related array

**Search/Filter Logic** (client-side):
1. User types in SearchBar → updates FileListContainer state
2. User selects category → updates FileListContainer state
3. FileListContainer filters files array:
   - Search: case-insensitive match on title and description
   - Category: exact match (or "All" shows everything)
   - Combined: both filters applied (AND logic)
4. Filtered array passed to FileList for rendering

**Related Files Logic** (server-side):
1. Check if file has `relatedFileIds` array
2. If yes: fetch files by IDs, take first 5
3. If no or empty: fetch files in same category, sort by releaseDate DESC, take first 5
4. Exclude current file from results

## Success Criteria Mapping

### Functional Requirements Coverage

- **DOWNLOAD-FR-001** (view file list with metadata): HomePage with FileList component displaying all metadata fields from files.json
- **DOWNLOAD-FR-002** (filter by category): CategoryFilter component in FileListContainer, client-side filtering
- **DOWNLOAD-FR-003** (search files): SearchBar component in FileListContainer, searches title and description
- **DOWNLOAD-FR-004** (view file details): FileDetailPage at /files/[id] with FileDetail component showing all fields
- **DOWNLOAD-FR-005** (download files): Download button in FileDetail with href to downloadUrl from JSON
- **DOWNLOAD-FR-006** (navigate related files): RelatedFiles component with FileCard links, uses relatedFileIds or category fallback

### UI/UX Requirements Coverage

- **DOWNLOAD-UX-001** (fast page load with SSG): All pages statically generated via generateStaticParams, no runtime data fetching
- **DOWNLOAD-UX-002** (responsive design): Tailwind CSS responsive classes (mobile-first approach), tested on mobile/tablet/desktop
- **DOWNLOAD-UX-003** (breadcrumbs on detail pages): Breadcrumb component on FileDetailPage showing Home > Files > [Title]
- **DOWNLOAD-UX-004** (error pages): not-found.tsx with ErrorDisplay, notFound() call for invalid IDs, links back to homepage

### Quality Gates

- TypeScript compilation: All components properly typed, FileMetadata interface matching JSON schema
- ESLint: Passes with no errors (Next.js recommended config)
- Build success: `npm run build` completes without errors, all pages prerendered
- Unit tests: All Jest tests pass
- E2E tests: All Playwright tests pass
- Security: No high/critical vulnerabilities in npm audit
- Local execution: All checks pass via `scripts/test-pr.sh`

## Testing Infrastructure

### Test Script Design

**Location**: `scripts/test-pr.sh` (repository root)

**Purpose**: Single entry point for all PR quality checks, executable locally and in CI

**Execution Order** (fail-fast with `set -e`):
1. ESLint check (`npm run lint`)
2. TypeScript type check (`tsc --noEmit`)
3. Build verification (`npm run build`)
4. Security audit (`npm audit --audit-level=high`)
5. Unit tests (`npm run test:unit`)
6. E2E tests (`npm run test:e2e`)

**Script Structure**:
```bash
#!/bin/bash
set -e  # Exit on first error

cd "$(dirname "$0")/../frontend/app"

echo "=== PR Quality Checks ==="
echo "Working directory: $(pwd)"
echo ""

echo "[1/6] Running ESLint..."
npm run lint

echo "[2/6] Running TypeScript type check..."
npx tsc --noEmit

echo "[3/6] Running build verification..."
npm run build

echo "[4/6] Running security audit..."
npm audit --audit-level=high

echo "[5/6] Running unit tests..."
npm run test:unit

echo "[6/6] Running E2E tests..."
npm run test:e2e

echo ""
echo "✅ All PR checks passed!"
```

### Unit Testing (Jest)

**Framework**: Jest (standard testing framework, excellent Next.js integration)

**Configuration**: `frontend/app/jest.config.ts`
```typescript
import type { Config } from 'jest'
import nextJest from 'next/jest'

const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/tests/**/*.test.ts?(x)'],
}

export default createJestConfig(config)
```

**Test Files Location**: `frontend/app/tests/unit/`

**Coverage Requirements**:
- `lib/files.ts`: All functions (getFiles, getFileById, getRelatedFiles, getCategories)
- Component logic: FileListContainer filtering/search logic

**Test Files**:
```
frontend/app/tests/
├── setup.ts                     # Jest setup (testing-library, matchers)
├── unit/
│   ├── lib/
│   │   └── files.test.ts        # Data fetching utilities
│   └── components/
│       └── FileListContainer.test.tsx  # Client component logic
└── e2e/
    ├── homepage.spec.ts         # Browse, search, filter scenarios
    ├── file-detail.spec.ts      # Detail page, download, related files
    └── error-handling.spec.ts   # 404, error boundaries
```

**Dependencies** (add to `frontend/app/package.json`):
```json
{
  "devDependencies": {
    "jest": "latest",
    "jest-environment-jsdom": "latest",
    "@testing-library/react": "latest",
    "@testing-library/jest-dom": "latest",
    "@types/jest": "latest"
  },
  "scripts": {
    "test:unit": "jest",
    "test:unit:watch": "jest --watch"
  }
}
```

### E2E Testing (Playwright)

**Framework**: Playwright (official Next.js recommendation)

**Configuration**: `frontend/app/playwright.config.ts`
```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'npm run build && npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

**Test Coverage**:
- **homepage.spec.ts**: User Scenario 1 (browse, search, filter, navigate to detail)
- **file-detail.spec.ts**: Detail page rendering, download button, related files navigation
- **error-handling.spec.ts**: User Scenario 3 (404 page, invalid URLs)

**Dependencies** (add to `frontend/app/package.json`):
```json
{
  "devDependencies": {
    "@playwright/test": "latest"
  },
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  }
}
```

### CI/CD Integration

**GitHub Actions Workflow**: `.github/workflows/pr-test.yml`

**Trigger**: Pull request (opened, synchronize, reopened) targeting main branch

**Workflow Structure**:
```yaml
name: PR Tests

on:
  pull_request:
    types: [opened, synchronize, reopened]
    paths:
      - 'frontend/app/**'
      - 'scripts/test-pr.sh'
      - '.github/workflows/pr-test.yml'

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '24'
          cache: 'npm'
          cache-dependency-path: frontend/app/package-lock.json
      - run: npm ci --prefix frontend/app
      - run: npx playwright install --with-deps chromium
      - run: bash scripts/test-pr.sh
```

**Key Features**:
- Minimal workflow (delegates to script)
- Playwright browser installation
- npm caching for faster runs
- Single job (fail-fast via script)
