# Design Principles

## General

In this project, good code is defined as "code that is easy to modify under AI-driven development." This is achieved primarily through prompt minimization, secondarily through traceability of intent, and thirdly through automatic context acquisition.

### Prompt Minimization

The best prompt contains everything necessary and nothing more. To achieve this, the scope of concern should be divided into the smallest possible units. The basic principles are as follows:

1. Separation of concerns
2. Encapsulation
3. Polymorphism

The directory structure should also be optimized accordingly. Specifically, work should be completed as much as possible within a specific directory (for example, at the module level), and sufficient context should be obtainable from within that directory alone. In other words, there should be no need to search for code or specifications in other directories.

### Traceability

Prompts must be clear. To facilitate later analysis or modification of the code, intentions that cannot be inferred from the code itself should be easily retrievable.

Common know-how should be stored in a fixed location — for example, coding standards.
Domain-specific intentions should be stored within each directory — for example, module specifications.

In addition to these stock-type documents, flow-type documents should also be stored.

### Automatic Context Acquisition

Requirements, know-how, and development results should be acquired by AI itself as much as possible, without human mediation. To achieve this, tools such as MCP should be actively utilized, and AI should be granted appropriate authority.
However, authority that could lead to serious accidents must never be granted.

## Basic workflow with AI Driven

The foundation of this project is AI-driven development + SpecDriven.
The basic workflow is as follows. Documents for the development such as coding standards will be prepared separately.

1. Create or update requirement, `spec.md`. Save it and do not delete it.
2. Create or update design, `plan.md`. Save it and do not delete it.
3. Document the work steps, `task.md`. No need to save it.

Generally, a work follows as below.

1. Generation by AI
2. Mechanical checks (tools and automated tests)
3. Automated review by AI
4. Human review
5. Merge and release

For example,

1. Create an issue
2. Create the specification and code based on the context (spec.md + plan.md + task.md + coding-standard.md + MCP + instructions -> code). Related code and documents are kept in sync as much as possible.
3. Tool checks
4. Unit tests
5. Commit
6. AI review by another generative AI (Codex, because the main is Claude Code)
7. Commit, push, and open a pull request.
8. Human review
9. Merge
10. Close the issue when all the PRs are finished
11. Automated tests and deployment via CI/CD
12. E2E tests (for development accounts only)

### To minimize inconsistencies between spec, plan, and code

100% consistency is not the goal. It is better to prevent inconsistencies among the spec, plan, and code. However, such processes or systems are too costly and are not realistic for many projects. Therefore, reducing inconsistencies through AI and human review is a best-effort approach.

Write in code if sufficient, not in the specification. Do not include unimportant details in the specification. If a summary of the code is needed, generate it (e.g., terraform-docs).

Keep documents DRY. Never write again what is already written in another document. Never repeat the same content in different words.

Do not define a mechanical priority. Generative AI often fixes only the code. Never change correct code to match a wrong specification.


## Deliverable-based 

Evaluate based on the deliverable, not the process. Ultimately, it does not matter what process was used — even if a disordered process could produce a deliverable of sufficient quality.

Only deliverables are required to be stored, not the process. The process should be traceable, but keeping it outside the repository is sufficient.
