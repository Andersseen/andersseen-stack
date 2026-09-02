# create-andersseen-app

Create a new Andersseen Stack application.

```bash
pnpm create andersseen-app my-app
cd my-app
pnpm dev
```

Without a project name, the CLI prompts for one:

```bash
pnpm create andersseen-app
```

## Options

```text
-h, --help        Show help
-v, --version     Show version
-y, --yes         Accept safe defaults
    --no-install  Generate files without running pnpm install
```

## Generated App

The first starter is a small Analog application with:

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
pnpm --filter create-andersseen-app test
pnpm --filter create-andersseen-app test:generated
```

`test:generated` builds the creator, generates a temporary external app with `--no-install`, installs dependencies, then runs `pnpm typecheck`, `pnpm test` and `pnpm build` in that generated app.
