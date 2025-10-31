# [WORKFLOW_NAME] Workflow

> **Deliverable**: This is the specification for the [WORKFLOW_NAME] GitHub Actions workflow.
> Process information is tracked in GitHub Issues.

## Purpose

[Why this workflow exists - automation goal and business value]

## Requirements

### Workflow Requirements

- **[WORKFLOW]-WR-001**: [Trigger condition, e.g., "Workflow triggers on push to main branch"]
- **[WORKFLOW]-WR-002**: [Execution requirement, e.g., "Runs tests on Node.js 18 and 20"]
- **[WORKFLOW]-WR-003**: [Output/artifact requirement]

### Performance Requirements

- **[WORKFLOW]-PR-001**: Workflow completes within [X] minutes
- **[WORKFLOW]-PR-002**: Cache hit rate > [X]%

### Security Requirements

- **[WORKFLOW]-SR-001**: All secrets stored in GitHub Secrets
- **[WORKFLOW]-SR-002**: Third-party actions pinned to specific SHA
- **[WORKFLOW]-SR-003**: Minimum required permissions only

## Workflow Scenarios

### Scenario 1: [Primary Trigger, e.g., "Pull Request"]

**Trigger**: [Event that starts the workflow]
**Purpose**: [What this scenario achieves]

**Steps**:
1. [Job 1]: [Purpose]
2. [Job 2]: [Purpose]
3. [Job 3]: [Purpose]

**Success**: [What successful completion looks like]
**Failure Handling**: [What happens on failure]

### Scenario 2: [Secondary Trigger, e.g., "Manual Deployment"]

**Trigger**:
**Purpose**:
**Steps**:
**Success**:
**Failure Handling**:

## Architecture

### Job Dependencies

```
[Job 1: Setup]
    ↓
[Job 2: Build] → [Job 3: Test]
    ↓              ↓
    [Job 4: Deploy]
```

### Jobs

**[Job 1: Setup]**:
- Purpose: [What it does]
- Runs on: [ubuntu-latest / self-hosted / etc.]
- Steps: [Key steps overview]
- Outputs: [What it provides to next jobs]

**[Job 2: Build]**:
- Purpose:
- Runs on:
- Steps:
- Outputs:

**[Job 3: Test]**:
- Purpose:
- Runs on:
- Steps:
- Outputs:

## Technical Stack

**Platform**: GitHub Actions
**Runners**: [ubuntu-latest / macos-latest / self-hosted]
**Languages/Tools**: [Node.js 20, Terraform 1.12, etc.]
**Actions Used**:
- `actions/checkout@v4`
- `actions/setup-node@v4`
- [Other actions]

## Design Decisions

### Decision 1: [Title, e.g., "Caching Strategy"]

**Context**: [Why this decision was needed]
**Decision**: [What was chosen, e.g., "Cache npm dependencies with package-lock.json hash"]
**Rationale**: [Why - speed, cost, reliability]
**Alternatives Considered**: [No cache, yarn cache, etc.]

### Decision 2: [Title]

**Context**:
**Decision**:
**Rationale**:
**Alternatives Considered**:

## Triggers

### Events

```yaml
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
  workflow_dispatch:
```

### Concurrency

```yaml
concurrency:
  group: [concurrency-group]
  cancel-in-progress: [true/false]
```

## Secrets and Variables

### Required Secrets

- `SECRET_NAME_1`: [Purpose, e.g., "AWS access key for deployment"]
- `SECRET_NAME_2`: [Purpose]

### Environment Variables

- `VAR_NAME_1`: [Purpose and value]
- `VAR_NAME_2`: [Purpose and value]

## Caching Strategy

### Cache Keys

- **npm**: `${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}`
- **terraform**: `${{ runner.os }}-terraform-${{ hashFiles('**/.terraform.lock.hcl') }}`

### Cache Paths

- npm: `~/.npm`
- terraform: `.terraform`

## Success Criteria

### Functional

- Workflow completes successfully on valid input
- All jobs complete in correct order
- Artifacts/deployments created as expected

### Performance

- Total execution time < [X] minutes
- Cache hit rate > [X]%
- [Specific step] completes in < [X] seconds

### Reliability

- Retry logic handles transient failures
- Notifications sent on failure
- Rollback mechanism works (if applicable)

## Error Handling

### Retry Strategy

- [Step/job name]: Retry up to [X] times on failure
- Backoff: [exponential / fixed]

### Notifications

- On failure: [GitHub notification / Slack / email]
- On success: [Optional notification]

### Rollback

- If deployment fails: [Rollback mechanism]

## Usage

### Manual Trigger

```bash
gh workflow run [workflow-name].yml
```

### Monitoring

```bash
# View workflow runs
gh run list --workflow=[workflow-name].yml

# View specific run
gh run view [run-id]
```

### Testing

1. Create test PR
2. Verify workflow triggers
3. Check job execution order
4. Validate artifacts/outputs
5. Confirm failure handling

## References

- GitHub Actions Documentation: [links]
- Actions Used: [links to action repos]
- Related Workflows: [links to related workflow specifications]
