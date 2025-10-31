---
description: Create Frontend requirements (spec.md)
---

MUST comply with `documents/design-principles.md`.

## Input

```text
$ARGUMENTS
```

$ARGUMENTS will contain the working directory. If not specified, use the current directory.

## Execution

1. Create Feature Name:
   - Requirements are passed in natural language, so create an appropriate feature name

2. Create Directory:
   Comply with documents/frontend/coding-standard.md

3. Create spec.md:
   - Template: `.specify/templates/frontend-specification-template.md`
   - Output: `${ARGUMENTS}/spec.md`
   - Strictly follow the template format

4. Search (or create) GitHub Issue:
   Search existing GitHub issues.
   If none exists, create one with an appropriate title based on the requirements.

5. Check:
   Verify compliance with `documents/design-principles.md` and `documents/frontend/coding-standard.md`

6. Have codex review
   Consult with codex and receive a review
