# ccow-test

This repository provides a sample project demonstrating how to use Claude Code on the Web.

## Prerequisite

### MCP Install

```
claude mcp add --transport http aws-knowledge https://knowledge-mcp.global.api.aws
claude mcp add next-devtools npx next-devtools-mcp@latest
claude mcp add terraform -s user -t stdio -- docker run -i --rm hashicorp/terraform-mcp-server
```

#### Confirm

Enter `/mcp` in Claude Code to verify.

<img src="resources/mcp.png">


### Codex

#### install


```
npm install -g @openai/codex
```

### Ask exec mode

```
codex exec 'Read ./specs/001-static-site-infrastructure/spec.md carefully. Audit the document and provide overall findings and concise impressions '
```

### etc

And there are some other small tools needed, but sorry —— please take care of those yourself...

