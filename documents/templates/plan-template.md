# Implementation Plan: [FEATURE]

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input 
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
- **backend**: Load `~/documents/backend/technical-context.md`
- **frontend**: Load `~/documents/frontend/technical-context.md`
- **infrastructure**: Load `~/documents/infrastructure/technical-context.md`
- **contracts**: Load `~/documents/contracts/technical-context.md`

## Constitution Check

## Design & Contracts

Provide the following

* File tree starting from the current directory
* For each definition (e.g., class, function, enum, struct, interface, etc.), provide the name, signature, inputs/outputs, responsibilities, preconditions/postconditions, error handling, asynchronous/I/O behavior, and side effects
* Data models / schemas
* Acceptance criteria

## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [ ] Design complete (/plan command)

**Gate Status**:
- [ ] Initial Constitution Check: PASS
- [ ] Post-Design Constitution Check: PASS
- [ ] All NEEDS CLARIFICATION resolved

