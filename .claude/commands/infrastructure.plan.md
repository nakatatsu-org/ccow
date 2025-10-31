---
description: Design Terraform module
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

   * Load existing specifications
   * Understand requirements, constraints, and goals

2. Load constitution.md:

   * Refer to `documents/constitution.md`
   * Confirm design principles and quality standards

3. Research:

Actively use MCP:

* AWS Knowledge MCP:
  * Verify service specifications
  * Check regional availability
  * Reference latest documentation
* Terraform MCP:
  * Check latest provider versions
  * Search modules and best practices
  * Obtain recommended configurations from registry
* Deliverable: research.md (<module_dir>/research.md):
   - MUST USE `.specify/templates/infrastructure-research-template.md`
   - Write only the research results and decisions, not design meant for plan.md.

4. Conduct human review of research.md

5. Create/Update plan.md:

   * Template: `.specify/templates/infrastructure-plan-template.md`
   * Output: `${MODULE_DIR}/plan.md` (same directory as spec.md)
   * Document design that meets spec.md requirements:

     * Architecture: Specific configuration diagrams, component details
     * Design Decisions: Rationale for technical choices in research.md.
     * Components: Required Terraform resources, inputs/outputs
     * References: AWS/Terraform documentation links
   * Write only the design, not code.

6. Conduct human review of plan.md

7. Post to GitHub Issue:
   Report design completion to the Issue

## Design Documents

* Specification: `${SPEC_FILE}`
* Design: `${PLAN_FILE}`

## Design Highlights

* Architecture: [key points]
* Key Decisions: [summarize]
* Technologies: [list]


8. Constitution Check:

   * Verify security requirements compliance
   * Verify coding standards compliance
   * Verify performance goal validity
   * If violations exist, document justification in plan.md

9. Output:

   * Path to spec.md
   * Path to plan.md
   * GitHub Issue number
   * List of generated process documents

## Notes

Strictly comply with CLAUDE.md and documents/design-principles.md.
