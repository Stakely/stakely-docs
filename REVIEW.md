# REVIEW.md — Stakely Docs review checklist

Use this checklist in automated or human review pipelines before approving changes to this repository.

## Critical review rule: LLM files must match the docs

Every review must verify that the public AI context files are updated when documentation changes:

- `static/llms.txt`
- `static/staking-api/llms-full.txt`

If the PR changes documentation, routes, product coverage, API behavior, supported networks, endpoint lists, authentication, signing guidance, AI integration guidance, or public links, the reviewer must compare those changes against both LLM files.

Do not approve the change if the docs and LLM files are out of sync.

## Review path

1. Read `AGENTS.md` first for repository context and non-negotiable rules.
2. Inspect the changed files with `git diff --stat` and `git diff`.
3. Check whether the change affects documentation or public AI context.
4. Verify `static/llms.txt` and `static/staking-api/llms-full.txt` are updated or confirm they genuinely do not need changes.
5. Run the smallest useful verification command.
6. Report blockers separately from suggestions.

## LLM sync checklist

For every documentation change, verify:

- [ ] `static/llms.txt` still routes agents to the right product docs and public URLs.
- [ ] `static/staking-api/llms-full.txt` reflects current Staking API docs, endpoints, networks, signing rules, and security guidance.
- [ ] New or renamed pages are represented in the LLM files when they are relevant to AI consumers.
- [ ] Removed or outdated links are also removed from the LLM files.
- [ ] `build/llms.txt` and `build/staking-api/llms-full.txt` were not edited directly; source files under `static/` are the files to review.

## What to block

Block approval when any of these are true:

- Documentation changed but relevant LLM files were not updated and no clear reason is given.
- LLM files contradict the documentation.
- Staking API docs imply users should send private keys, seed phrases, mnemonics, or custody secrets to Stakely.
- API schemas, endpoint names, headers, or network values are asserted without matching the OpenAPI/source docs.
- Generated folders such as `build/` or `.docusaurus/` are edited as source.
- Broken Markdown links, route changes, or Docusaurus config changes are not verified with a build when verification is feasible.

## Review output format

Return a concise review with this shape:

```md
## Verdict
Approved | Blocked | Approved with comments

## Required fixes
- ...

## LLM file sync
- Checked `static/llms.txt`: yes/no, notes
- Checked `static/staking-api/llms-full.txt`: yes/no, notes

## Verification
- Command: result
```
