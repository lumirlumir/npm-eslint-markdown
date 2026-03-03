---
name: pull-request
description: This prompt is designed to assist in generating a pull request title and description for a GitHub repository. It can help summarize the changes made, the purpose of the pull request, and any relevant details that reviewers should be aware of.
---

# Pull Request Prompt

Use this prompt when preparing any PR in this repository.

## 1. PR Title (required)

- Title format is validated by `.github/workflows/pull-request.yml`.
- Use Conventional Commits: `<type>[scope]: <description>`

### `type` rules

- `feat`, `fix`, `build`, `chore`, `ci`, `docs`, `perf`, `refactor`, `revert`, `style`, `test` are the only allowed types. Do not invent new types or use non-standard ones.

### `scope` rules

- For AI-generated changes, use:
  - `eslint-markdown` for package-specific changes, or
  - `*` for repo-wide/docs/tooling changes.

### `description` rules

- Imperative mood (`add`, `fix`, `update`, not `added`, `fixed`, `updated`)
- First letter must be lowercase
- Keep concise and specific

### Title examples

- feat(eslint-markdown): add `no-foo` rule
- fix(eslint-markdown): handle empty code blocks
- docs(*): update `CONTRIBUTING.md`

## 2. PR Description (required)

Follow the repository PR template exactly and keep content concise.

Include:

- **summary**: what changed and why
- **scope**: affected packages/directories (e.g., `packages/...`, `website/...`)
- **validation**: commands run and results (e.g., `npm run test`, `npm run build`, `npm run lint`)
- **notes**: any limitations or follow-up items

## 3. Quality checks before submitting

- Title matches the required format.
- Description is complete and aligned with actual changes.
- Test/Build/Lint status is explicitly documented.
- No unrelated or speculative changes are included.
