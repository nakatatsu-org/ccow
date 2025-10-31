---
description: Execute Terraform module implementation
---

## Input

```text
$ARGUMENTS
```

Specify the directory containing task.md. If not specified, search the current directory. If task.md is still not found, stop execution.
Do not perform work not listed in task.md. If necessary tasks are missing, report this and stop execution.

## Execution

2. Load Design Documents (within module directory):
   - `documents/infrastructure/coding-standard.md`: Coding standards
   - `${MODULE_DIR}/spec.md`: Requirements, constraints, success criteria
   - `${MODULE_DIR}/plan.md`: Architecture, resources, design decisions

3. Load tasks.md:
   - List of tasks to implement
   - Dependencies, execution order

4. Execute Implementation:
   - Implement tasks in order
   - Verify after each task completion:
     ```bash
     bash (Repository Root Dir)/scripts/check-terraform-code.sh
     ```
Actively use MCP:

* Terraform MCP:
  * Check latest provider versions
  * Search modules and best practices
  * Obtain recommended configurations from registry
Utilize terraform-expert agent

5. Add Issue Comment on Task Completion:

   Report task completion by adding a comment to the Issue.

6. Verification Phase:
   - Implement as described in Testing

7. Execute terraform-docs:
   ```bash
   terraform-docs markdown table . > README.md
   ```

8. Final Verification:
   - Verify all Success Criteria in spec.md are met
   - Verify compliance with documents/infrastructure/coding-standard.md
   - Ensure terraform plan can be executed in tests/

9. Issue Completion Report:

   Comment on github Issue
   ```
   ## Summary of Work Done
   <Write summary>

   ## Work Done
   <Write list>
   ```

10. Output:
    - List of implemented files
    - Verification results
    - GitHub Issue number

## Notes

- Respect `documents/design-principles.md`
- Utilize terraform-expert agent
- Complex resources can be implemented in parallel
- Commit per task. Include Issue number in commit message: `feat(vpc): T001 - Create module structure #123`
- Execute terraform plan only (do not run apply). Deployment is done through a separate approval process
- Not complete until tests pass. Less important items may be omitted in configuration files
