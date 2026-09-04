# create-andersseen-app

Create a new Andersseen Stack application.

```bash
pnpm create andersseen-app my-app
cd my-app
pnpm dev
```

Pass `--shape` to skip the prompt and pick a shape non-interactively:

```bash
pnpm create andersseen-app my-app --shape dashboard
```

Without a project name, the CLI prompts for one, then asks what you're building:

```bash
pnpm create andersseen-app
```

```text
What are you building?

● Dashboard             — AppShell: sidebar, navbar and routed pages
○ Landing               — public shell: navbar, hero, content section and footer
○ Landing + Dashboard   — public site at / plus a routed app shell under /dashboard
○ Minimal               — today's single-page starter
```

## Requirements

- Node.js 22 or later
- pnpm (the generated app's package manager and scripts assume it)

## Options

```text
-h, --help              Show help
-v, --version           Show version
-y, --yes               Accept safe defaults (shape defaults to "dashboard")
    --no-install        Generate files without running pnpm install
    --shape <shape>     "minimal", "dashboard", "landing" or "landing-dashboard" (default: dashboard)
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
- **Landing + Dashboard** — a public marketing site at `/` plus the routed application shell under `/dashboard`, composed from the same `PublicLayout` and `DashboardLayout` pieces above, not a third duplicated template:
  - `/` renders the Landing home; `/dashboard`, `/projects` and `/settings` render inside the Dashboard AppShell. Analog's `(app)` route group keeps the two layouts separate without a root layout branching on the URL.
  - The Landing hero's primary CTA (`Start building`) and the public navbar's CTA (`Open dashboard`) route into `/dashboard`; the Dashboard sidebar brand links back to `/`. These are the only three points where the combined shape's behavior differs from the standalone shapes — see `templates/compositions/landing-dashboard/`.
  - No auth — the application is still fully public. This shape validates shell composition and navigation, not access control.

### How composition works

`Dashboard` and `Landing` are each a *shape overlay* — the reusable template pieces for one shell. `landing-dashboard` composes the existing `landing` and `dashboard` overlays onto the base template in order; it does not get its own copy of their files (`src/shape-overlays.ts`). The only real conflict between the two overlays is `src/app/pages/index.page.ts` (Dashboard's redirect vs. Landing's hero page) — an explicit ownership table resolves it in Landing's favor so `/` stays the public site, independent of overlay order. A small composition patch (`templates/compositions/landing-dashboard/`) then overrides the handful of files whose *content* differs only when both shells are present (the CTA and brand link targets above).

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

`test:generated` builds the creator, then for each of the **Dashboard**, **Landing** and **Landing + Dashboard** shapes generates a temporary external app with `--no-install`, installs dependencies, then runs `pnpm typecheck`, `pnpm test` and `pnpm build` in that generated app — the end-to-end signal that Quartz, Volt and Lumen actually compose together in a real build. Minimal is covered by the fast in-package template-contract tests above, not by the external smoke, to keep the signal fast.
