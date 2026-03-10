# MCP Runbook

## Add Or Change An MCP

1. Confirm the bottleneck the MCP should remove.
2. Check whether an existing local skill or MCP already covers the job.
3. Add or update the server entry in `C:\Users\Grigorii\.codex\config.toml`.
4. Restart Codex so the MCP is actually registered.
5. Run a minimal smoke test before using it in a real workflow.

## Required Smoke Test Pattern

- Config smoke: confirm the server entry exists and the command path is valid.
- Registration smoke: verify the MCP tools appear in session.
- Action smoke: run the smallest useful call against a safe target.
- Failure smoke: note the first likely auth or runtime error and the fallback.

## Current High-Value MCPs

- `chrome-devtools-mcp`
  - Smoke: open a page, list requests, list console messages, run a Lighthouse audit.
- `playwright`
  - Smoke: navigate to a page, resize viewport, read a snapshot, perform one interaction.
- `linear`
  - Smoke: list one issue set or fetch one issue.
- `notion`
  - Smoke: fetch one page or search one query.

## Failure Handling

- If the tool is missing from session, restart Codex first.
- If the command exists but the tool fails, verify config path and shell command.
- If auth fails, document the missing token or account requirement before retrying.
- If a browser MCP works intermittently, fall back to the other browser MCP for critical checks.
- If the MCP duplicates a stronger local skill, defer the install.

## Decision Rules

- Keep MCPs that remove repeated manual work and have a stable smoke test.
- Skip MCPs that add complexity without a repeated workflow.
- Prefer a smaller reliable stack over a large brittle one.
