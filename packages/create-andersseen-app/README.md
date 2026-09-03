# create-andersseen-app

Create a new Andersseen Stack application.

```bash
pnpm create andersseen-app my-app
cd my-app
pnpm dev
```

Without a project name, the CLI prompts for one, then asks what you're building:

```bash
pnpm create andersseen-app
```

```text
What are you building?

● Dashboard  — AppShell: sidebar, navbar and routed pages
○ Landing    — public shell: navbar, hero, content section and footer
○ Minimal    — today's single-page starter
```

## Options

```text
-h, --help              Show help
-v, --version           Show version
-y, --yes               Accept safe defaults (shape defaults to "dashboard")
    --no-install        Generate files without running pnpm install
    --shape <shape>     "minimal", "dashboard" or "landing" (default: dashboard)
```

## Application Shapes

Every shape shares the same baseline (Angular 21, Analog file-based routing, SSR, Tailwind CSS 4, Vitest and Testing Library) — a shape only adds the application-specific pieces on top of it.

- **Minimal** — today's single-page starter. Nothing extra.
- **Dashboard** — an AppShell composed from published packages, not a copy of them:
  - `/dashboard`, `/projects`, `/settings` routes, with `/` redirecting to `/dashboard`.
  - A responsive Sidebar and Navbar built on `@quartz-headless/primitives`' `SidebarDirective`/`SidebarTriggerDirective` for push/overlay/collapse behavior, dismiss-on-Escape and focus management.
  - Volt UI (`@voltui/components`) for visuals, using semantic theme tokens throughout.
  - Lumen Icons (`lumen-icons`) via subpath imports for navigation icons.
- **Landing** — a responsive public shell composed from published packages, not a copy of them:
  - `/` renders a `PublicLayout` (navbar, `<main>`, footer) around a neutral hero and a 3-item feature section — structure, not a fake business.
  - A responsive Navbar built on `@quartz-headless/primitives`' `NavbarDirective`/`NavbarTriggerDirective` for the mobile menu disclosure, dismiss-on-Escape and focus management.
  - Volt UI (`@voltui/components`) for visuals, using semantic theme tokens and `buttonVariants` throughout.
  - Lumen Icons (`lumen-icons`) via subpath imports for the menu toggle and feature icons.
  - `Title`/`Meta` from `@angular/platform-browser` for a page title and meta description, set in an SSR-safe way.

## Generated App

The generated application is a small Analog application with:

- Angular 21, standalone components, signals and zoneless change detection
- Analog file-based routing, SSR entrypoint and Vite
- Tailwind CSS 4 with the default Volt UI theme
- Volt UI, Quartz Headless and Lumen Icons from published packages
- Vitest and Testing Library

The generated application owns its source. It has no runtime dependency on this creator and does not use workspace or file dependencies.

## Compatibility Matrix

This creator keeps dependency versions centralized in `src/constants.ts`.

- Angular `21.2.14` satisfies Volt UI 1.0.1 peer dependencies; generated apps pin `@angular/cdk` to Angular 21 through pnpm overrides for ng-primitives compatibility.
- Analog `2.5.1` matches the current Andersseen workspace baseline and supports Vite 8.
- Tailwind CSS 4 is wired through `@tailwindcss/vite`.
- Angular Movement, Etyma, Palette Crafter, Agentyx, auth, database and deployment are intentionally not included yet.

## Testing The Generator

```bash
pnpm --filter create-andersseen-app lint
pnpm --filter create-andersseen-app test
pnpm --filter create-andersseen-app test:generated
```

`test:generated` builds the creator, then for each of the **Dashboard** and **Landing** shapes generates a temporary external app with `--no-install`, installs dependencies, then runs `pnpm typecheck`, `pnpm test` and `pnpm build` in that generated app — the end-to-end signal that Quartz, Volt and Lumen actually compose together in a real build. Minimal is covered by the fast in-package template-contract tests above, not by the external smoke, to keep the signal fast.
