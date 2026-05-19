# Andersseen Stack

Un ecosistema de librerías Angular modernas, accesibles y animadas. Inspirado en Tan Stack, construido para Angular.

## Librerías

- **Volt UI** — Componentes UI estilizados y accesibles con theming, variantes y CLI propio.
- **Quartz** — Primitivas UI headless. Overlays, dialogs, drag-drop, toast, virtual scroll y más.
- **Angular Movement** — Sistema declarativo de animaciones con WAAPI y springs. Directivas para scroll, hover, parallax y presencia.
- **Lumen Icons** — Iconos SVG como componentes Angular. Tree-shakeable, accesibles y con animaciones integradas.

## Tech Stack

- [Analog](https://analogjs.org/) — Fullstack meta-framework para Angular
- [Angular 21](https://angular.dev/) — Standalone components, signals, hydration
- [Tailwind CSS v4](https://tailwindcss.com/) — Utility-first CSS
- [Vite](https://vitejs.dev/) — Build tool ultrarrápido
- [Vitest](https://vitest.dev/) + Testing Library — Tests unitarios
- [Playwright](https://playwright.dev/) — Tests E2E
- [Cloudflare Pages](https://pages.cloudflare.com/) — Hosting + CI/CD

## Requisitos

- Node.js >= 20.19.1
- pnpm >= 10

## Instalación

```bash
pnpm install
```

## Desarrollo

```bash
pnpm run dev
```

La aplicación estará disponible en `http://localhost:5173/`.

## Build

```bash
pnpm run build
```

El output estático se genera en `dist/client` (prerender SSG con Analog).

## Tests

### Unitarios (Vitest)

```bash
pnpm run test          # Modo watch
pnpm run test:run      # Modo CI
pnpm run test:coverage # Con cobertura
```

### E2E (Playwright)

```bash
pnpm run e2e     # Headless
pnpm run e2e:ui  # Modo UI interactivo
```

## Calidad de código

```bash
pnpm run check        # Typecheck + Lint
pnpm run lint:fix     # Auto-fix ESLint
pnpm run format       # Formatear con Prettier
pnpm run format:check # Verificar formato
```

## Deploy

El deploy es automático mediante GitHub Actions en cada push a `main` (producción) y en cada PR (preview).

```bash
# Deploy manual a Cloudflare Pages
pnpm run deploy

# Deploy preview
pnpm run deploy:preview
```

## Licencia

MIT
