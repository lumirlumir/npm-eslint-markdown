# Copilot Instructions

## Repository Context

- This repository is a **monorepo managed with npm workspaces**.
- Main code lives in `packages/`. Documentation and site content live in `website/`.
- Follow repository standards from `CONTRIBUTING.md` when making changes.

## High-Value Working Rules for AI Agents

- Keep changes **small, focused, and local** to the requested scope.
- Refer to existing code and patterns in the repository for guidance.
- Prefer editing existing files/patterns instead of introducing new abstractions.
- When touching package code, check for related workspace dependencies in sibling packages under `packages/`.

## Test/Build/Lint Workflow (required before finalizing)

Run from repo root:

- `npm run test`
- `npm run build`
- `npm run lint`

For faster iteration, use workspace-scoped commands when appropriate:

- `npm run test -w <workspace-name>`
- `npm run build -w <workspace-name>`

## Monorepo Conventions

- Treat each directory under `packages/` as an independently testable/buildable unit within the workspace graph.
- Keep package-level changes aligned with root tooling and scripts (do not bypass root conventions).
- If a change affects behavior documented on the site, update relevant docs in `website/` in the same PR.

## Pull Request Workflow

- When preparing or opening a PR, use the `/pull-request` prompt.

## Documentation & Communication Policy

- Public-facing GitHub content (PRs, issues, review comments, commit titles/descriptions) must be **English**.
- Local/offline communication language is flexible.

## Change Quality Bar

- Include only discoverable, codebase-backed changes.
- Avoid speculative refactors and broad formatting churn.
- Call out any assumptions when code context is incomplete.
- Prefer explicit file references in explanations (for example: `packages/...`, `website/...`, `CONTRIBUTING.md`).
