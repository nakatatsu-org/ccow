---
description: Execute Next.js feature implementation
---

## Input

```text
$ARGUMENTS
```

Specify the directory containing task.md. If task.md does not exist, stop execution

## Execution

2. Load Design Documents:
   - `documents/coding-standard.md`: Common coding standards
   - `documents/frontend/coding-standard.md`: Web coding standards
   - `${ARGUMENTS}/spec.md`: Requirements, constraints, success criteria
   - `${ARGUMENTS}/plan.md`: Architecture, components, design decisions

3. Load tasks.md:
   - List of tasks to implement
   - Dependencies, execution order

4. Execute Implementation:
   * Implement tasks in order
   * Verify after each task completion:
     ```bash
     npx tsc --noEmit
     npm run lint
     ```
   * Actively use MCP:
      * Next.js DevTools MCP:
         * Verify runtime information
         * Verify best practices
   * Actively use `frontend-expert` agent

5. Report:
   Report task completion by adding a comment to the Issue

6. Verification Phase:
   - Implement as described in Testing in task.md

7. Final Verification:
   - Verify compliance with spec.md. Especially, make sure all Success Criteria are met.
   - Verify compliance with documents/frontend/coding-standard.md

8. Issue Completion Report:
   Comment on the GitHub Issue
   ```
   ## Summary of Work Done
   <Write summary>

   ## Work Done
   <Write list>
   ```

9. Output:
   - List of implemented files
   - Verification results
   - GitHub Issue number

## Important

- Comply `documents/design-principles.md`
- Complex components can be implemented in parallel
- Commit per task. Include Issue number in commit message: `feat(frontend): T001 - Create route structure #123`
- Not complete until tests pass
