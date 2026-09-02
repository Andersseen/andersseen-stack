# @andersseen/stack

Reserved package for adopting Andersseen core libraries into an existing Angular or Analog application.

Future command shape:

```bash
pnpm dlx @andersseen/stack init
```

Its responsibility is intentionally small:

- detect a compatible Angular/Analog project;
- install Volt UI, Quartz, Angular Movement and Lumen Icons;
- apply the minimum configuration required for those libraries to work together.

It must not generate dashboards, landing pages, auth, database, billing or business architecture. New application generation belongs to `create-andersseen-app`.
