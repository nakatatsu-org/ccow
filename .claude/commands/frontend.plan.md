---
description: Design Next.js feature
---

## Input

```text
$ARGUMENTS
```

The argument should specify spec.md.
If not specified, search for spec.md in the current directory. If still not found, stop execution.
Never work without spec.md.

## Execution

1. Load spec.md:
   - Load existing specifications
   - Understand requirements, constraints, and goals

2. Load constitution.md:
   - Refer to `documents/constitution.md`
   - Confirm design principles and quality standards

3. Research:
   * Actively use MCP:
      * Next.js DevTools MCP:
         * Verify Next.js 16 best practices
   * Deliverable: research.md (`<same directory as spec.md>/research.md`):
      - MUST USE `.specify/templates/frontend-research-template.md`
      - Document only research results and decisions. Do not write any design that should be written in plan.md.

4. Have codex review research.md

5. Have human review research.md

6. Create/Update plan.md:
   - Template: `.specify/templates/frontend-plan-template.md`
   - Output: `<same directory as spec.md>/plan.md`
   - Document design that meets spec.md requirements:
     * Architecture: Component structure, route structure
     * Design Decisions: Rationale for technical choices in research.md
     * Components: Server/Client Component classification, data flow
     * References: Next.js documentation links
   - Document design only, do not write code

7. Have codex review plan.md

8. Have human review plan.md

9. Post to GitHub Issue:
   Report design completion to the Issue

10. Constitution Check:
   - Verify security requirements compliance
   - Verify coding standards compliance
   - If violations exist, document justification in plan.md

11. Output:
   - Path to spec.md
   - Path to plan.md
   - GitHub Issue number

## Notes

Strictly comply with CLAUDE.md, documents/design-principles.md, and documents/frontend/coding-standard.md.
