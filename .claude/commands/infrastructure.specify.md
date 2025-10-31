---
description: Create Terraform module requirements (spec.md)
---

MUST comply with `documents/design-principles.md`. Especially `To minimize inconsistencies between spec, plan, and code`.

## Input

```text
$ARGUMENTS
```

## Execution

1. Create Module Name:
   - Requirements are passed in natural language, so create an appropriate module name

2. Create Directory:
   MUST USE `scripts/prepare-terraform-module.sh <module_name>`.

3. Create spec.md:
   - Template: `.specify/templates/infrastructure-spec-template.md`
   - Output: `${MODULE_DIR}/spec.md`
   - Strictly follow the template format. Refer to the template for content details.

4. Create GitHub Issue:
   Title should be "Create Terraform module <module_name>".

5. Check:
   Verify compliance with `documents/design-principles.md`
