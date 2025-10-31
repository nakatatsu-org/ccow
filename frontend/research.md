# Download Site Feature - Research Findings

## Next.js Patterns Researched

### SSG with Static JSON Data
- **Data Source**: Public folder JSON files are accessible at build time
- **Strategy**: Read `/public/data/files.json` during build using Node.js `fs` module
- **generateStaticParams**: Required for dynamic routes `[id]` to prerender all file detail pages
- **Build-time Reading**: Use `fs.readFileSync` in `generateStaticParams` and page components

### Server vs Client Component Strategy
- **Server Components (Default)**: Use for static content, data fetching, SEO-critical content
  - FileList, FileCard, FileDetail, Breadcrumb, ErrorDisplay
  - Benefits: Zero JavaScript bundle, better performance, SEO-friendly
- **Client Components ('use client')**: Required ONLY for interactivity
  - SearchBar (needs useState for search query)
  - CategoryFilter (needs useState for selected category)
  - Parent wrapper component to manage search/filter state and pass to server components as props

### Route Structure for SSG
```
frontend/src/app/
├── page.tsx                    # Homepage with file list (static)
├── files/
│   └── [id]/
│       └── page.tsx           # File detail page (static via generateStaticParams)
├── not-found.tsx              # 404 error page
└── error.tsx                  # Error boundary
```

### Client-Side Filtering Pattern
- **Implementation**:
  1. Server component fetches full dataset at build time
  2. Pass dataset to client component wrapper
  3. Client component filters data based on user input
  4. Client component passes filtered data back to server component children via props


### Error Handling
- **not-found.tsx**: Custom 404 page at app root
- **notFound()**: Call from `[id]/page.tsx` when file ID not found in dataset
- **error.tsx**: Error boundary for runtime errors (optional but recommended)

## Design Decisions

### Decision 1: Hybrid Server/Client Component Architecture
**Context**: Need static generation for performance while supporting interactive search/filter
**Decision**: Use server components for data fetching and display, wrap with client component only for state management
**Rationale**:
- Minimizes JavaScript bundle (only search/filter logic shipped to client)
- Maintains SSG benefits (all pages prerendered)
- Follows Next.js 16 best practices for component composition


### Decision 2: Build-Time JSON Reading
**Context**: Files metadata stored in `/public/data/files.json`
**Decision**: Read JSON at build time using Node.js fs module in server components and generateStaticParams
**Rationale**:
- SSG requirement means data must be available at build time
- Public folder files are accessible during build
- No runtime API needed, simplifies deployment to S3


### Decision 3: generateStaticParams for All File Pages
**Context**: Dynamic route `/files/[id]` needs static generation
**Decision**: Implement generateStaticParams that reads files.json and returns all file IDs
**Rationale**:
- Required for SSG of dynamic routes
- Ensures all file detail pages prerendered at build time
- 404 handling via notFound() for invalid IDs

### Decision 4: Client-Side Filtering Strategy
**Context**: Search and category filter with <1000 files constraint
**Decision**: Bundle full dataset to client, filter in memory
**Rationale**:
- Dataset size suitable for client-side processing
- No API infrastructure needed (SSG-only constraint)
- Instant user feedback, no loading states
- Maintains static generation for initial page load


## Design Decisions2 (move from plan.md)

### Decision 1: Hybrid Server/Client Component Architecture

**Context**: Need static generation for performance while supporting interactive search/filter
**Decision**: Use client components for homepage (FileListContainer, FileList, FileCard, SearchBar, CategoryFilter) and server components for file detail pages (FileDetail, RelatedFiles, Breadcrumb)
**Rationale**:
- Homepage requires client-side interactivity for search/filter, necessitating client components
- Next.js composition rules: Client components cannot import server components directly
- FileList and FileCard must be client components to be imported by FileListContainer
- Maintains SSG benefits (all pages still prerendered at build time)
- File detail pages remain server components (no interactivity needed, better performance)
- Bundle impact is acceptable: FileList/FileCard are simple render components with minimal logic
**Alternatives**:
- Server Component composition pattern (children): Cannot pass filtered data from parent to children, doesn't work for this use case
- Server actions for filtering: Requires API infrastructure, violates SSG constraint

### Decision 2: Build-Time JSON Reading via lib/files.ts

**Context**: Files metadata stored in `/public/data/files.json`
**Decision**: Create utility module `lib/files.ts` that uses Node.js fs module to read JSON at build time
**Rationale**:
- Centralizes data access logic for reuse across pages and generateStaticParams
- SSG requirement means data must be available at build time
- Public folder files are accessible during build via `path.join(process.cwd(), 'public/data/files.json')`
- Type-safe with TypeScript interfaces
**Alternatives**:
- Inline fs reads: Code duplication, harder to maintain
- Bundle JSON in src: Less flexible, requires rebuild for data updates

### Decision 3: generateStaticParams for All File Pages

**Context**: Dynamic route `/files/[id]` needs static generation for all files
**Decision**: Implement generateStaticParams that reads files.json and returns all file IDs, with notFound() for invalid IDs
**Rationale**:
- Required for SSG of dynamic routes in Next.js App Router
- Ensures all file detail pages prerendered at build time (meets DOWNLOAD-UX-001)
- Handles invalid IDs gracefully via notFound() function (meets DOWNLOAD-UX-004)
- Build fails if data is unavailable (fail-fast)
**Alternatives**:
- Dynamic rendering: Violates SSG-only constraint
- Catch-all routes: More complex, harder to validate

### Decision 4: Client-Side Filtering Strategy

**Context**: Search (DOWNLOAD-FR-003) and category filter (DOWNLOAD-FR-002) with <1000 files constraint
**Decision**: Bundle full dataset to client, filter in memory using JavaScript array methods
**Rationale**:
- Dataset size suitable for client-side processing (<1000 files per spec)
- No API infrastructure needed (maintains SSG-only deployment)
- Instant user feedback, no loading states (meets DOWNLOAD-UX-001)
- Maintains static generation for initial page load
- Simple implementation with useState and filter/includes
**Alternatives**:
- Server-side filtering: Requires API, violates SSG constraint, adds complexity
- Separate static pages per filter: Page explosion, poor UX, not scalable

### Decision 5: Reusable FileCard Component

**Context**: File cards displayed on homepage and related files section
**Decision**: Create single FileCard server component used in both contexts
**Rationale**:
- DRY principle - single source of truth for file display
- Consistency in UI across different pages
- Easier maintenance and styling updates
**Alternatives**:
- Separate components: Code duplication, inconsistent UI risk

### Decision 6: Related Files Fallback Strategy

**Context**: Related files logic per spec (relatedFileIds or same category)
**Decision**: Check relatedFileIds first, fallback to same category sorted by date, max 5 results
**Rationale**:
- Provides curated relationships when available
- Automatic discovery when not specified (better UX than empty section)
- Date sorting shows most recent files (likely more relevant)
- Limit of 5 prevents UI clutter
**Alternatives**:
- No fallback: Poor UX when relatedFileIds empty
- Algorithm-based: Too complex for static site, violates YAGNI

### Decision 7: Error Handling Strategy

**Context**: Handle invalid routes and runtime errors gracefully (DOWNLOAD-UX-004)
**Decision**: Use not-found.tsx for 404s, error.tsx for error boundary, notFound() function in [id]/page.tsx
**Rationale**:
- Next.js built-in conventions for error handling
- notFound() allows programmatic 404 from server components
- Error boundaries catch runtime errors without crashing app
- ErrorDisplay component reused for consistent error UI
**Alternatives**:
- Redirect to home: Loses URL context, worse UX
- No error pages: Default Next.js errors, less user-friendly

## References

- Next.js 16 generateStaticParams: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
- Server vs Client Components: https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns
- notFound() function: https://nextjs.org/docs/app/api-reference/functions/not-found
- Public folder serving: https://nextjs.org/docs/app/building-your-application/optimizing/static-assets


## Constitution Check (move from plan.md)

### Security (Principle I)
- **Static site**: No server-side vulnerabilities, no database, no authentication
- **XSS protection**: React auto-escapes content, no dangerouslySetInnerHTML
- **External links**: downloadUrl is user data - add rel="noopener noreferrer" for security
- ✅ Compliant: Static generation eliminates most security risks

### Code Quality (Principle II)
- **TypeScript**: All components typed, interfaces for file metadata matching spec schema
- **ESLint**: Next.js recommended config enforced
- **Component structure**: Follows coding-standard.md directory structure (src/components, src/lib)
- ✅ Compliant: TypeScript + ESLint + documented structure

### Standardization (Principle III)
- **Component patterns**: Follows Next.js 16 conventions (Server Components default, 'use client' minimal)
- **Directory structure**: Adheres to documents/frontend/coding-standard.md structure
- **File naming**: Consistent kebab-case for files, PascalCase for components
- ✅ Compliant: Follows Next.js and project conventions

### Test Automation (Principle IV)
- **Testing strategy**: Unit tests for lib/files.ts utilities (data parsing, filtering logic)
- **Component tests**: React Testing Library for client components (SearchBar, CategoryFilter, FileListContainer)
- **Coverage target**: 80% overall, 100% for critical path (file retrieval, filtering)
- ⚠️ Deferred to implementation phase: Test setup required in tasks.md

### Performance (Principle V)
- **SSG optimization**: All pages prerendered, zero runtime data fetching (meets DOWNLOAD-UX-001)
- **Bundle size**: Client components minimal (only search/filter state management)
- **Image optimization**: Not applicable (no images in spec)
- **Metrics**: Lighthouse score target >90 for performance
- ✅ Compliant: SSG ensures optimal performance

### Observability (Principle VI)
- **Static site**: Limited observability needs (no backend to monitor)
- **Client-side errors**: Error boundaries catch React errors
- **Build-time validation**: JSON parsing errors fail build
- ✅ Compliant: Appropriate for static site scope

### Cost Optimization (Principle VII)
- **Deployment**: S3 + CloudFront (per technical-context.md), minimal cost for static files
- **No backend**: Zero compute costs, only storage and CDN bandwidth
- **Build optimization**: Single build generates all pages, no incremental builds needed
- ✅ Compliant: Static site is cost-optimal
