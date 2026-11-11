# Project structure

```
uptime-tracker/
├── .env.example            # Example environment variables (copy to .env)
├── .gitignore              # Files ignored by Git
├── eslint.config.js        # Shared ESLint flat config
├── index.html              # Application entry point
├── package.json            # Dependencies and npm scripts
├── package-lock.json       # Locked dependency versions
├── tsconfig.json           # TypeScript configuration for src/
├── tsconfig.node.json      # TypeScript configuration for tooling (vite.config.ts)
├── vite.config.ts          # Vite configuration
├── docs/                   # Project documentation
│   ├── BRANCHING_STRATEGY.md
│   └── PROJECT_STRUCTURE.md
├── public/                 # Static assets copied to dist/
└── src/                    # Application source code
    ├── main.tsx            # React entry point
    ├── App.tsx             # Main application component
    └── index.css           # Global styles
```

## Key directories

| Path | Purpose |
|------|---------|
| `src/` | All application source code (components, hooks, pages, etc.) |
| `public/` | Static assets that are copied as-is to the build output |
| `docs/` | Team documentation (branching, structure, etc.) |

## Conventions

- Keep source code under `src/` only.
- Place reusable components in `src/components/` as the app grows.
- Add new pages under `src/pages/` and route entries in `src/App.tsx` (or a dedicated router module).
- Do not commit `.env`; only `.env.example` is tracked.