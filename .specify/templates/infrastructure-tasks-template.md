# [MODULE_NAME] - Implementation Tasks

## Phase 1: Module Structure

### T001: Create Module Directory Structure
- **Command**: `scripts/prepare-terraform-module.sh [module-name]`
- **Files**: Module directory with standard structure
- **Dependencies**: None

### T002 [P]: Define Variables
- **Files**: `[module-dir]/variables.tf`
- **Dependencies**: T001
- **Validation**: Run `terraform validate`
- **Note**: Define input variables with descriptions, types, and defaults

### T003 [P]: Define Outputs
- **Files**: `[module-dir]/outputs.tf`
- **Dependencies**: T001
- **Validation**: Outputs are properly typed
- **Note**: Define output values that will be used by other modules

## Phase 2: Core Resources

### T010 [P]: Implement Primary Resources
- **Files**: `[module-dir]/[main-resource].tf` (e.g., `s3.tf`, `lambda.tf`)
- **Dependencies**: T002
- **Validation**: `terraform validate` passes
- **Note**: Implement core AWS resources from plan.md

### T011 [P]: Implement Supporting Resources
- **Files**: `[module-dir]/[supporting-resource].tf`
- **Dependencies**: T002
- **Validation**: `terraform validate` passes
- **Note**: Can be implemented in parallel with T010 if no dependencies

### T012: Implement Dependent Resources
- **Files**: `[module-dir]/[dependent-resource].tf`
- **Dependencies**: T010, T011
- **Validation**: `terraform validate` passes
- **Note**: Resources that depend on primary or supporting resources

## Phase 3: Security & Compliance

### T020: Implement Security Controls
- **Files**: IAM policies, security groups, encryption settings
- **Dependencies**: T010, T011, T012
- **Validation**: Security best practices applied
- **Note**: Follow AWS security best practices

### T021: Add Compliance Checks
- **Files**: Resource tags, monitoring configurations
- **Dependencies**: T020
- **Validation**: All resources properly tagged
- **Note**: Ensure compliance with organizational policies

## Phase 4: Testing

### T030: Run check-terraform-code.sh
- **Command**: `scripts/check-terraform-code.sh` at module directory
- **Dependencies**: T020, T021
- **Validation**: Script passes all checks

### T031: Create Test Configuration
- **Files**: `[module-dir]/tests/terraform.tfvars.json`, `[module-dir]/tests/main.tf`
- **Dependencies**: T030
- **Validation**: Test files are valid Terraform code

### T032: Run terraform plan
- **Command**: `terraform plan` at `[module-dir]/tests`
- **Dependencies**: T031
- **Validation**: Plan succeeds with no errors

### T033: Review with Codex
- **Command**: `codex exec "Review the Terraform module at [module-dir]"`
- **Dependencies**: T032
- **Validation**: Address any issues found by Codex

## Phase 5: Documentation

### T040: Generate README.md
- **Command**: `terraform-docs markdown table [module-dir] > [module-dir]/README.md`
- **Dependencies**: T033
- **Files**: `[module-dir]/README.md`

### T041: Verify Design Documents
- **Files**: `[module-dir]/spec.md`, `[module-dir]/plan.md`
- **Dependencies**: T040
- **Validation**: Documents reflect actual implementation

### T042: Add Usage Examples
- **Files**: `[module-dir]/examples/` directory
- **Dependencies**: T041
- **Note**: Provide practical usage examples

## Dependencies Summary

- T002, T003 can run in parallel (marked with [P])
- T010, T011 can run in parallel if no inter-dependencies
- T012 depends on T010, T011
- T020 depends on T010, T011, T012
- T021 depends on T020
- T030-T033 must run sequentially
- T040-T042 depend on T030-T033

## Notes

- Replace `[MODULE_NAME]` with actual module name
- Replace `[module-dir]` with actual module directory path
- Replace `[main-resource]`, `[supporting-resource]`, etc. with actual resource names
- Mark tasks with [P] if they can be implemented in parallel
- Always include specific file paths, not placeholders
