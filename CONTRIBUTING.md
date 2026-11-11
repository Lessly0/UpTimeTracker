# Contributing to UpTime Tracker

Thank you for contributing! Please read the following guidelines before submitting changes.

## How to contribute

1. Fork the repository or create a branch from `main`.
2. Name your branch according to [docs/BRANCHING_STRATEGY.md](./docs/BRANCHING_STRATEGY.md) (e.g. `feat/`, `fix/`, `chore/`).
3. Install dependencies (`npm install`) and run the app (`npm run dev`).
4. Make your changes, then verify with `npm run lint` and `npm run build`.
5. Commit using conventional commits (e.g. `feat:`, `fix:`, `chore:`).
6. Push your branch and open a pull request against `main`.

## Pull request requirements

- The PR title should follow the conventional commit format.
- All checks (lint and build) must pass.
- At least one team member must review and approve the PR.
- Squash commits into logical units before merging, if requested by a reviewer.

## Code style

Follow the ESLint rules configured in `eslint.config.js`. Run `npm run lint` before pushing.