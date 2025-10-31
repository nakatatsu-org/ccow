# Coding Standard for Infrastructure

## General

* Implementation should consider the AWS Well-Architected Framework, though strict compliance is not required.
* Define calls to other modules in `main.tf`.
* Define variable blocks in `variables.tf`.
* Include descriptions in variable and output blocks.
* Include type definitions in variable blocks.
* Use variable blocks when parameter values differ between environments (e.g., production → CPU 4096, development → CPU 1024).
* Do not set default values in variable blocks.
* Minimize the use of `locals` blocks. If used, define them in `locals.tf`.
* Minimize the use of `data` blocks. If used, place them immediately above the resource block that references them.
* The order of attributes in a resource block must be as follows:
  1. `count` or `for_each` meta-argument (if required)
  2. Resource-specific non-block arguments
  3. Resource-specific block arguments
  4. `lifecycle` block (if required)
  5. `depends_on` argument (if required)
* The order of attributes in a variable block must be as follows:
  1. `type`
  2. `description`
  3. `default` (optional)
  4. `sensitive` (optional)
  5. `validation` blocks
* Avoid abbreviations, use full names (e.g., `cg` → `coding_guidelines`). However, abbreviations used as proper nouns (e.g., RDS, id) may be used.
* Do not use embedded attributes as possible. (e.g.,  `ingress`/`egress` within security groups)
* Common tags such as `Environment` and `Service` must be set only in `aws_default_tags`. Do not define them in any individual resource block.
* Use `aws_default_tags` for common tags such as `Environment` and `Service`. Never duplicate these tags in individual resource blocks.
* Name resources using the `${environment}-${project}-` prefix, followed by the resource’s role (e.g., api, db).
* Use `snake_case` for resource names (e.g., `web_server`).
* A single resource within a module should be named `main` (e.g., `resource "aws_vpc" "main"`).
* Multiple resources within a module should be named according to their role (e.g., `primary`, `read_replica`).
* Do not use plural forms in resource names.
* Do not include the resource type name in the resource name (e.g., avoid `aws_instance.ec2_instance`).
* Include units in numerical variable names (e.g., `size_gb`, `ram_size_gb`).
* Use `MiB`/`GiB` for storage units, and `MB`/`GB` (decimal units) for others.
* Name boolean variables affirmatively (e.g., `enable_external_access`).
* Place `terraform.tfvars.json` in the root module (the module where `terraform apply` is executed) instead of submodules.
* Do not use variable blocks unless strictly necessary. They may be used only when there are actual parameter differences between environments (e.g., development vs. production). 
* Do not use variable blocks for values that remain the same across environments.
* Fixed values may be coded directly in resource definitions. (e.g., `t4g.micro`)
* Keep comments in *.tf files to a minimum. Do not include header blocks or specifications that belong in documentation.
* Do not add comments describing what is already clear from the code.
* In the root module, ensure `terraform.tfvars.json` stores:
  1. values that other modules might also reuse
  2. sensitive information that must never be hard-coded (e.g., private keys)
* Do not include `provider` or `terraform` in submodules.


## Directory Structure

```
infrastructure/
  scripts/
  terraform/
    development/
    production/
    modules/
      <module_name>/
```
