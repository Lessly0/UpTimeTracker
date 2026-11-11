# UpTime Tracker

UpTime Tracker is a frontend application for monitoring service uptime. This repository contains the frontend application, built with **React**, **TypeScript**, and **Vite**.

## Tech stack

- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [ESLint](https://eslint.org/) (flat config) with TypeScript and React rules

## Prerequisites

- Node.js >= 20
- npm >= 10

## Installation

1. Clone the repository:

   ```sh
   git clone git@github.com:Lessly0/UpTimeTracker.git
   cd UpTimeTracker
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Configure environment variables:

   ```sh
   cp .env.example .env
   ```

   Then edit `.env` and fill in the required values (see `.env.example`).

## Available scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the Vite development server with hot reload |
| `npm run build` | Type-check and build the app for production (`dist/`) |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint against the project |

## Development instructions

1. Create a branch off `main` using the naming convention described in [docs/BRANCHING_STRATEGY.md](./docs/BRANCHING_STRATEGY.md).
2. Run `npm run dev` and open the local URL shown by Vite.
3. Make your changes, run `npm run lint` and `npm run build` to verify.
4. Commit using conventional commit messages and open a pull request against `main`.

## Project structure

See [docs/PROJECT_STRUCTURE.md](./docs/PROJECT_STRUCTURE.md) for a detailed explanation of the folder organization.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute to this project.

## License

MIT