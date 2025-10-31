---
description: Generate Next.js feature implementation tasks
---

## Input

```text
$ARGUMENTS
```

$ARGUMENTS will contain the working directory.
If not, assume the current directory. Search for spec.md and plan.md.
If they are still not found, stop execution.
Never run without spec.md and plan.md.

## Generate task.md

Creation of task lists only. Execution is strictly prohibited.

1. Load Design Documents (within feature directory):
   - `documents/constitution.md`: Project information
   - `documents/design-principles.md`: Design principles
   - `documents/frontend/coding-standard.md`: Coding standards
   - `${FEATURE_DIR}/spec.md`: Requirements, constraints, success criteria
   - `${FEATURE_DIR}/plan.md`: Architecture, components

2. Load Template:
   - Use `.specify/templates/frontend-tasks-template.md` as the base template
   - Replace `[FEATURE_NAME]` with actual feature name
   - Replace `[feature-path]` with actual feature directory path
   - Replace `[ComponentName]` with actual component names from plan.md

3. Generate Tasks (${FEATURE_DIR}/tasks.md):
   - Customize template based on spec.md and plan.md requirements
   - Mark parallelizable tasks with [P]
   - Include specific file paths (not placeholders)
   - Add detailed dependency information
   - Generate concrete task descriptions from plan.md Components section

4. Output:
   - Path to tasks.md
   - GitHub Issue number
   - Total number of tasks

## Notes

### Deliverable-based Principle
- tasks.md is process information: Do not store in repository, post to Issue only

### Task Granularity
- Parallelizable tasks marked with [P]
- Clarify dependencies

### Issue Integration
- Update checkmarks in Issue upon task completion
