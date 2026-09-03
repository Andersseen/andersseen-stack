# Andersseen Stack Architecture

Andersseen Stack is the composition and orchestration layer for the Andersseen ecosystem. It should make the libraries easy to explore, create with and adopt, without becoming a runtime mega-starter.

## Workspace

- `apps/www` is the current Analog website and ecosystem portal.
- `packages/stack` is reserved for adopting core Andersseen libraries into an existing Angular or Analog project.
- `packages/create-andersseen-app` owns new application creation. It currently generates a Minimal, Dashboard, Landing or Landing + Dashboard Analog application and keeps the generated source owned by the target project.

## Command Boundaries

`pnpm create andersseen-app` creates a complete application. The current flow resolves CLI input into typed creation options (including an application `shape` — `minimal`, `dashboard`, `landing` or `landing-dashboard`), renders the baseline Analog template composed with the chosen shape's overlay(s), then optionally installs dependencies with pnpm. Shapes are user-facing presets; overlays are the internal composition units a shape is built from:

```text
base
+ zero or more ordered shape overlays (dashboard, landing)
+ an optional small composition patch
= a generated application
```

`Minimal`, `Dashboard` and `Landing` compose zero or one overlay onto the shared baseline; `Landing + Dashboard` composes both the existing `landing` and `dashboard` overlays — reusing `PublicLayout` and `DashboardLayout` under one generated app's routing rather than forking a third, duplicated template. Each overlay adds only its own pieces (layouts, pages) onto the same Angular/Analog/Tailwind/Vitest base, so upgrading that base upgrades every shape at once.

Composing overlays surfaces exactly one real file conflict: both `landing` and `dashboard` write `src/app/pages/index.page.ts` (a hero page vs. a redirect to `/dashboard`). This is resolved by an explicit, order-independent ownership rule — not "last overlay copied wins" — so `/` reliably stays the public Landing home when both overlays are active. Analog's file-router route groups (`(app)/...`) then keep `PublicLayout` and `DashboardLayout` from ever needing a root layout that branches on the URL. The handful of remaining differences that only matter when both shells are present — the Landing CTA and public navbar linking into `/dashboard`, the Dashboard sidebar brand linking back to `/` — live in a small, explicit composition patch (`templates/compositions/landing-dashboard/`), not in conditional template logic.

This composition model is intentionally minimal: it is not a plugin engine or a general config framework, and no further shapes are planned. Future choices can extend the resolved-options pipeline further with theme, Movement, Etyma, tests, Agentyx and OpenSpec, but this package should own new-app creation only.

`pnpm dlx @andersseen/stack init` adopts the core stack inside an existing project. Its future job is to detect a compatible Angular or Analog app, install Volt UI, Quartz, Angular Movement and Lumen Icons, then apply only required configuration. It must not generate dashboards, auth, database, billing or business architecture.

## Ecosystem Roles

- Quartz owns behavior: sidebar, navbar, overlays, focus, dismiss and viewport primitives.
- Volt UI owns visual components and semantic theme tokens.
- Angular Movement is optional motion.
- Lumen Icons owns Angular icon components.
- Palette Crafter is a color/theme generation capability. Generated Volt-compatible CSS should become source owned by the target app; it is not a runtime dependency.
- Etyma is the future i18n capability. The current website keeps `ngx-translate` until migration is small enough to justify.
- Agentyx is delegated developer workflow setup through `pnpm dlx @agentyx/cli init`.
- OpenSpec is a future optional developer tooling capability.

Generated app source belongs to the generated application. Shared improvements should flow down into Volt, Quartz, Angular Movement and Lumen rather than into a synchronized runtime starter.
