# Coding Standard for Frontend

## General

* Use Next.js. Determine the architecture, directory structure, and related configurations with reference to the [Next.js Docs](https://nextjs.org/docs). When in doubt, follow the examples provided in the official documentation.
* Use SSG (Static Site Generation). No other rendering method is allowed in this project.

## Directory Structure

```
frontend/
├── README.md
├── package.json
├── next.config.mjs
├── tsconfig.json
├── eslint.config.mjs            # ESLint (Flat Config)
├── .env.example                 # Template for required environment variables
├── public/                      # Images and static assets
│   └── favicon.ico
└── src/                         # The main application code is consolidated under src/
    ├── app/                    # App Router (based on Next.js Docs)
    │   ├── layout.tsx          # Root layout
    │   └── page.tsx            # Root page
    ├── components/             # Reusable UI components
    │   └── ui/
    ├── features/               # Domain-specific UI and logic (per screen fragment)
    │   └── sample/
    ├── lib/                    # Shared utilities and business logic
    │   └── env.client.ts       # Client-accessible env (NEXT_PUBLIC_*)
    ├── styles/                 # CSS Modules / Tailwind etc. (optional)
    ├── test/                   # Unit/component tests
    │   └── setup.ts
    └── utils/                  # Lightweight generic utilities
```
