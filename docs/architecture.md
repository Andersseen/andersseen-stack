# Andersseen Stack Architecture

Andersseen Stack is the composition and orchestration layer for the Andersseen ecosystem. It should make the libraries easy to explore, create with and adopt, without becoming a runtime mega-starter.

## Workspace

- `apps/www` is the current Analog website and ecosystem portal.
- `packages/stack` is reserved for adopting core Andersseen libraries into an existing Angular or Analog project.
- `packages/create-andersseen-app` owns new application creation. It currently generates a Minimal or Dashboard Analog application and keeps the generated source owned by the target project.

## Command Boundaries

`pnpm create andersseen-app` creates a complete application. The current flow resolves CLI input into typed creation options (including an application `shape` — `minimal` or `dashboard`), renders the baseline Analog template composed with the chosen shape's overlay, then optionally installs dependencies with pnpm. Future choices can extend that resolved-options pipeline with a landing shape, theme, Movement, Etyma, tests, Agentyx and OpenSpec, but this package should own new-app creation only.

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
