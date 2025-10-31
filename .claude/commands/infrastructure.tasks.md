---
description: Generate Terraform module implementation tasks
---

## Input

```text
$ARGUMENTS
```

A module directory is specified. If not specified, use the current directory as the module directory.
If spec.md and plan.md do not exist in the module directory, never work. Must stop execution.
Also, create tasks.md in the specified module directory.


## Generate task.md

Create execution plan only. Task execution is strictly prohibited.

1. Load Design Documents (within module directory):
   - `documents/constitution.md`: Project information
   - `documents/design-principles.md`: Design principles
   - `${MODULE_DIR}/spec.md`: Requirements, constraints, success criteria
   - `${MODULE_DIR}/plan.md`: Architecture, resources, design decisions
   - `${MODULE_DIR}/data-model.md`: Resource dependencies (if exists)

2. Load Template:
   - Use `.specify/templates/infrastructure-tasks-template.md` as the base template
   - Replace `[MODULE_NAME]` with actual module name
   - Replace `[module-dir]` with actual module directory path
   - Replace `[main-resource]`, `[supporting-resource]`, etc. with actual resource names from plan.md

3. Generate Tasks (${MODULE_DIR}/tasks.md):
   - Customize template based on spec.md and plan.md requirements
   - Mark parallelizable tasks with [P]
   - Include specific file paths (not placeholders)
   - Add detailed dependency information based on resource relationships
   - Generate concrete task descriptions from plan.md Resources section

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
- Update checkmarks in Issue upon task completion (manual or script)
