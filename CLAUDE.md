# CLAUDE.md

This repository provides a sample project demonstrating how to use Claude Code on the Web.

## Mandatory

* Check the CLAUDE.md file in each working directory, especially when working in `frontend/`, `infrastructure/`, or `.github/`.
* MUST NOT delete and modify `principles.md`,  `constitution.md`, `coding-standard.md`, `design-principles.md` unless order.
* MUST NOT delete and modify CLAUDE.md unless order.
* Do not skip any steps. Refer to the relevant document if instructed.
* Always follow issue-driven development. Document your work in a GitHub issue by commenting on or creating an issue using the `gh` command. If you cannot find an appropriate issue to comment on, create a new one. Additionally, use Japanese when writing commit messages, comments, issue descriptions, and pull request descriptions on GitHub.
* Never work directly on the `main` branch. Always work on a separate branch.
* After completing your work and pushing the changes, always create a Pull Request using `gh pr create`. The PR description must include the related issue number (e.g., "Closes #123" or "Fixes #123").


### [Mandatory] Eliminate Verbose Text

In issues, pull requests, and all specifications, comply with the following rules. 
 
* Never include unimportant details in specifications.
* Never repeat the same content in different words.
* Avoid excessive decoration.
* Delete template comments and examples.
* Never write again what is already written in another document. Replace duplicate content with references.

When using `speckit.*` commands to generate documents, strictly comply with the above. After creation, check and fix all.

## Main Directories

* **infrastructure/**: Infrastructure as Code (IaC). AWS / Terraform
* **frontend/**: Website source code. Next.js 16
* **.github/**: CI/CD pipeline definitions. GitHub Actions

## Proactive Use of MCP

Use MCP proactively when available.

* **AWS Knowledge MCP Server** for AWS-related implementations and researchs.
* **Terraform MCP Server** for Terraform tasks.
* **Next.js DevTools MCP** for Next.js tasks.
