<div align="center">

<img src="./apps/www/public/logo.svg" alt="Andersseen Stack" width="88" height="88" />

# Andersseen Stack

### Entry point for exploring, creating with and adopting the Andersseen Angular ecosystem.

[![Live Demo](https://img.shields.io/badge/Live_Demo-andersseen--stack.pages.dev-6366F1?style=for-the-badge&logo=cloudflare&logoColor=white)](https://andersseen-stack.pages.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](./LICENSE)

![Angular](https://img.shields.io/badge/Angular_21-DD0031?style=flat-square&logo=angular&logoColor=white)
![AnalogJS](https://img.shields.io/badge/AnalogJS-C10F3A?style=flat-square&logo=analogue&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=flat-square&logo=turborepo&logoColor=white)
![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-F38020?style=flat-square&logo=cloudflare&logoColor=white)

</div>

## Workspace

This repository is now a pnpm workspace coordinated by Turborepo.

```text
andersseen-stack/
|-- apps/
|   `-- www/                     # Current Analog ecosystem website
|-- packages/
|   |-- stack/                   # Future @andersseen/stack init
|   `-- create-andersseen-app/   # Future pnpm create andersseen-app
|-- docs/
|-- pnpm-workspace.yaml
`-- turbo.json
```

The website consumes the published ecosystem packages as an external application would:

| Package | Role |
| --- | --- |
| `@voltui/components` 1.x | Visual components and semantic theme |
| `@quartz-headless/core` / `@quartz-headless/primitives` | Headless behavior primitives |
| `angular-movement` 1.x | Declarative motion |
| `lumen-icons` | Angular icon components with subpath exports |

## Product Boundaries

Andersseen Stack has three long-term lanes:

- Explore: `apps/www`, the website/docs/ecosystem portal.
- Create: `pnpm create andersseen-app`, future complete new-application creator.
- Adopt: `pnpm dlx @andersseen/stack init`, future command for adding the core stack to an existing Angular/Analog app.

This phase intentionally does not ship the final creator, wizard, generators, auth, database, billing or deploy-provider flows. See [docs/architecture.md](./docs/architecture.md) for the current boundaries.

## Quick Start

Requirements: Node.js `>=22` and pnpm `>=10`.

```bash
pnpm install
pnpm dev
```

The website runs at `http://localhost:5173/`.

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start `apps/www` locally |
| `pnpm build` | Build all workspace packages through Turbo |
| `pnpm typecheck` | Typecheck packages with a `typecheck` script |
| `pnpm lint` | Lint packages with a `lint` script |
| `pnpm test` / `pnpm test:run` | Run non-watch tests through Turbo |
| `pnpm e2e` | Run website Playwright tests |
| `pnpm format` | Format the website source |
| `pnpm deploy:www` | Build and deploy the website to Cloudflare Pages |

Website-specific commands are also available with `pnpm --filter @andersseen/www <script>`.

## Deployment

GitHub Actions installs the workspace, runs quality gates, builds once, uploads `apps/www/dist/client`, and deploys that artifact to Cloudflare Pages.

- `main` deploys production at [andersseen-stack.pages.dev](https://andersseen-stack.pages.dev)
- Pull requests deploy preview branches as `pr-<number>`

Manual deploy:

```bash
pnpm deploy:www
```

## License

[MIT](./LICENSE) © Andersseen
