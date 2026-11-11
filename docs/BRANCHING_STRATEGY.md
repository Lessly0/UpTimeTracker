# Branching strategy

## Branches

| Branch | Purpose | Protected |
|--------|---------|-----------|
| `main` | Production-ready code. Deploys are made from this branch. | Yes |
| `feat/*` | New features, branched from `main`, merged into `main` via PR. | No |
| `fix/*` | Bug fixes, branched from `main`, merged into `main` via PR. | No |
| `chore/*` | Maintenance tasks (setup, dependencies, docs), branched from `main`, merged into `main` via PR. | No |
| `release/*` | Release preparation, branched from `main`. | No |

All work happens on topic branches off `main`. Direct pushes to `main` are not allowed.

## Naming convention

Use lowercase, hyphen-separated names:

```
feat/<short-description>
fix/<short-description>
chore/<short-description>
```

Examples: `feat/login-page`, `fix/api-timeout`, `chore/frontend-project-setup`.

## Commits

Use [conventional commits](https://www.conventionalcommits.org/):

```
<type>(<optional-scope>): <description>
```

Types: `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `test`, `ci`.

Example: `feat: add uptime dashboard component`

## Pull requests

1. Open the PR against `main` from your topic branch.
2. Include a clear description of the changes and any linked issue.
3. Ensure `npm run lint` and `npm run build` pass.
4. Request review from at least one team member.
5. After approval, squash and merge (or rebase and merge) into `main`.
6. Delete the topic branch after merging.