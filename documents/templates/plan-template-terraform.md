# Implementation Plan infractructure: [FEATURE]

For terraform module creation only.  

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input and `~/documents/infrastructure/coding-standard.md`
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
3. Fill the Constitution Check section based on the content of the constitution document.
4. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
5. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
```



## Summary
[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context
Load `~/documents/infrastructure/technical-context.md`

## Constitution Check

## Design & Contracts

**Required Terraform Files**: All terraform modules must include `main.tf`, `outputs.tf`, and `variables.tf` files regardless of complexity.

### terraform test and check

After generating code for Terraform, always check and pass the following:

- Check compliance with `~/documents/infrastructure/coding-standard.md`
- Run `terraform fmt -recursive`.
- Run `terraform validate`.
- Run `tflint --recursive --config [repository_root]/.tflint.hcl`.
- Run `checkov -d . --config-file [repository_root]/.checkov.yml`.
- Create a directory tests/ (<module_name>/tests/) in the current directory, then run `terraform init` and `terraform plan` there, and make sure they pass. It is acceptable to create `<module_name>/tests/terraform.tfvars.json` or other files if needed.

### Provide the following

~~~
prompt: |
  Please <<PURPOSE>>.

  Follow these steps:

  1. <<STEP1>>
  2. <<STEP2>>
  3. <<STEP3>>
  ...
intent: >
  Generate a concise, English-only instruction that follows the exact format above,
  renumbering the provided steps from 1 and adding no extra text or decoration.
context: >
  The user supplies a single-line purpose (<<PURPOSE>>) and a dash-delimited list of steps (<<STEPS>>).
  The output must keep each step’s wording intact (except for renumbering and dash removal).
criteria: >
  • Output is strictly in English.  
  • Starts with “Please …” and then a blank line followed by “Follow these steps:”.  
  • Steps are numbered sequentially from 1.  
  • No code fences, markdown headers, or additional commentary.  
  • All requirements listed in the instruction section are satisfied.
boundary: >
  Do not alter the substance of <<PURPOSE>> or any individual step.
  Do not add, remove, reorder, or merge steps.
  Do not wrap the output in code blocks.
process: >
  1. Split <<STEPS>> into individual items using line breaks or leading dashes.  
  2. Trim whitespace while preserving inline formatting such as back-ticked code.  
  3. Replace the placeholders in the prompt section and output the final text.
~~~

## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [ ] Design complete (/plan command)

**Gate Status**:
- [ ] Initial Constitution Check: PASS
- [ ] Post-Design Constitution Check: PASS
- [ ] All NEEDS CLARIFICATION resolved

