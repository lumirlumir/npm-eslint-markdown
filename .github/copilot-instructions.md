# Copilot Instructions

## Repository Context

- This repository is a **monorepo managed with npm workspaces**.
- Main code lives in `packages/`. Documentation and site content live in `website/`.
- Follow repository standards from `CONTRIBUTING.md` when making changes.

## Monorepo Conventions

- Treat each directory under `packages/` as an independently testable/buildable unit within the workspace graph.
- Keep package-level changes aligned with root tooling and scripts (do not bypass root conventions).
- If a change affects behavior documented on the site, update relevant docs in `website/` in the same PR.

## High-Value Working Rules for AI Agents

- Keep changes **small, focused, and local** to the requested scope.
- Refer to at least three similar existing code examples and patterns in the repository for guidance.
- Prefer editing existing files/patterns instead of introducing new abstractions.
- When touching package code, check for related workspace dependencies in sibling packages under `packages/`.

## Test/Build/Lint Workflow (required before finalizing)

Run from repo root:

- `npm run test`
- `npm run build`
- `npm run lint`

Sandbox note:

- If `npm run lint` fails only because `editorconfig-checker` cannot download its binary due to the DNS proxy in this environment, treat that specific failure as ignorable and continue with the remaining validation results.

For faster iteration, use workspace-scoped commands when appropriate:

- `npm run test -w <workspace-name>`
- `npm run build -w <workspace-name>`

## Testing Style

- All tests should be DAMP (Descriptive And Meaningful Phrase).
- Do not use `for` iteration to generate test cases. Prefer individually named tests that clearly describe the scenario.

## Pull Request Workflow

Use this guide when preparing any PR in this repository.

### 1. PR Title (required)

- Title format is validated by `.github/workflows/pull-request.yml`.
- Use Conventional Commits: `<type>[scope]: <description>`

#### `type` rules

- `feat`, `fix`, `build`, `chore`, `ci`, `docs`, `perf`, `refactor`, `revert`, `style`, `test` are the only allowed types. Do not invent new types or use non-standard ones.

#### `scope` rules

- For AI-generated changes, use:
  - `eslint-markdown` for package-specific changes, or
  - `*` for repo-wide/docs/tooling changes.

#### `description` rules

- Imperative mood (`add`, `fix`, `update`, not `added`, `fixed`, `updated`)
- First letter must be lowercase
- Keep concise and specific

#### Title examples

- feat(eslint-markdown): add `no-foo` rule
- fix(eslint-markdown): handle empty code blocks
- docs(*): update `CONTRIBUTING.md`

### 2. PR Description (required)

Follow the repository PR template exactly and keep content concise.

Include:

- **summary**: what changed and why
- **scope**: affected packages/directories (e.g., `packages/...`, `website/...`)
- **validation**: commands run and results (e.g., `npm run test`, `npm run build`, `npm run lint`)
- **notes**: any limitations or follow-up items

### 3. Quality checks before submitting

- Title matches the required format.
- Description is complete and aligned with actual changes.
- Test/Build/Lint status is explicitly documented.
- No unrelated or speculative changes are included.

## Documentation & Communication Policy

- Public-facing GitHub content (PRs, issues, review comments, commit titles/descriptions) must be **English**.
- Local/offline communication language is flexible.

## Change Quality Bar

- Include only discoverable, codebase-backed changes.
- Avoid speculative refactors and broad formatting churn.
- Call out any assumptions when code context is incomplete.
- Prefer explicit file references in explanations (for example: `packages/...`, `website/...`, `CONTRIBUTING.md`).
