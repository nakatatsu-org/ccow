# [FEATURE_NAME] - Implementation Tasks

## Phase 1: Setup

### T001: Create Feature Directory Structure
- **Files**: `app/[feature-path]/`, `app/[feature-path]/components/`
- **Dependencies**: None
- **Note**: Replace `[feature-path]` with actual feature directory path

### T002: Create Route Files
- **Files**: `app/[feature-path]/page.tsx`, `app/[feature-path]/layout.tsx`
- **Dependencies**: T001

## Phase 2: Components

### T010 [P]: Implement Primary Server Components
- **Files**: `app/[feature-path]/components/[ComponentName].tsx`
- **Dependencies**: T002
- **Note**: Mark with [P] if can be implemented in parallel

### T011 [P]: Implement Secondary Server Components
- **Files**: `app/[feature-path]/components/[ComponentName].tsx`
- **Dependencies**: T002

### T012: Implement Client Components
- **Files**: `app/[feature-path]/components/[ComponentName].tsx` (with "use client")
- **Dependencies**: T010, T011

## Phase 3: Integration

### T020: Connect Components
- **Files**: `app/[feature-path]/page.tsx`
- **Dependencies**: T010, T011, T012

### T021: Implement Data Fetching (SSG)
- **Files**: `app/[feature-path]/page.tsx`, API route files if needed
- **Dependencies**: T020
- **Note**: Specify fetch strategy (SSG/ISR/SSR)

### T022: Add Error Boundaries
- **Files**: `app/[feature-path]/error.tsx`
- **Dependencies**: T021

## Phase 4: Testing

### T030: Run TypeScript Check
- **Command**: `npx tsc --noEmit`
- **Dependencies**: T020-T022

### T031: Run ESLint
- **Command**: `npm run lint`
- **Dependencies**: T030

### T032: Run Build
- **Command**: `npm run build`
- **Dependencies**: T031

### T033: Verify SSG Output
- **Check**: `.next/server/app/[feature-path]/**/*.html` exists
- **Dependencies**: T032

### T034: Run Lighthouse (if configured)
- **Dependencies**: T033

## Phase 5: Documentation

### T040: Add Component Documentation
- **Files**: Component JSDoc comments, inline documentation
- **Dependencies**: T030-T034

### T041: Add Usage Examples
- **Files**: README sections or example code
- **Dependencies**: T040

## Dependencies Summary

- T002 depends on T001
- T010, T011 can run in parallel (marked with [P])
- T012 depends on T010, T011
- T020 depends on T010, T011, T012
- T021 depends on T020
- T022 depends on T021
- T030-T034 must run sequentially
- T040, T041 depend on T030-T034
