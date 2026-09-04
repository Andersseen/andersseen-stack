# Changelog

All notable changes to `create-andersseen-app` are documented in this file.

## 0.1.0

Initial public release.

- Analog.js application creator (`pnpm create andersseen-app`)
- `minimal` shape — today's single-page starter
- `dashboard` shape — AppShell with sidebar, navbar and routed `/dashboard`, `/projects`, `/settings` pages
- `landing` shape — public shell with navbar, hero, feature section and footer
- `landing-dashboard` shape — composes the existing `landing` and `dashboard` overlays into one application (public site at `/`, routed app shell under `/dashboard`)
- Quartz Headless, Volt UI and Lumen Icons wired together in every generated app
- Zoneless Angular, standalone components and SSR
- Vitest and Testing Library baseline
- Generated apps own their source with no runtime dependency on this creator
