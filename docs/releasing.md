# Releasing

This monorepo currently has one publishable package: `create-andersseen-app`
(`packages/create-andersseen-app`). `@andersseen/stack` is `private: true` and
not part of any release process yet. This document covers the first release
and the intended process going forward. It intentionally does not use
Changesets, semantic-release, release-please or Nx release — with a single
publishable package, a plain `npm publish` is the smallest process that
works. Revisit orchestration tooling once a second package needs releasing.

## Tag naming

```text
create-andersseen-app-v0.1.0
```

not `v0.1.0` — the monorepo is expected to gain more publishable packages
over time, and a package-scoped tag keeps each package's release history
unambiguous.

## First release (manual bootstrap)

The package does not exist on npm yet, so it cannot use Trusted Publishing —
that requires the package to already exist so a maintainer can configure it
in the npm dashboard. The first release is a manual, local `npm publish`:

```bash
pnpm install --frozen-lockfile

pnpm --filter create-andersseen-app release:check

cd packages/create-andersseen-app
npm login
npm publish --access public
```

`npm login` may prompt for 2FA depending on your npm account settings. Do
not script or store credentials for this step — authenticate interactively.

`release:check` runs, in order: lint, typecheck, build + unit tests, a pack
content audit (`verify:pack`, which reads the real tarball `npm pack` would
publish rather than trusting `package.json`'s `files` field), and the
external generated-app smoke test (real `pnpm install && typecheck && test
&& build` for the `dashboard`, `landing` and `landing-dashboard` shapes,
outside the workspace). It's the full gate — safe to run locally as often as
you like, but too slow to run inside every `npm publish` invocation.

`prepublishOnly` (which `npm publish` runs automatically) repeats the cheap
parts of that gate — lint, typecheck, build + unit tests, `verify:pack` —
as a last-second safety net, but skips the external smoke test so a plain
`npm publish` doesn't unexpectedly spend minutes reinstalling three
generated apps.

After a successful publish:

```bash
git tag create-andersseen-app-v0.1.0
git push origin create-andersseen-app-v0.1.0
```

Then create a GitHub Release from that tag. A stable npm release should
always correspond to a git tag, a GitHub Release and the published npm
package together — but none of that (tag, push, or GitHub Release) happens
automatically, and none of it happens as part of this preparation work. It's
a deliberate, reviewed action a maintainer takes after `release:check`
passes.

## Future releases: npm Trusted Publishing (GitHub OIDC)

Once `create-andersseen-app@0.1.0` exists on npm, configure Trusted
Publishing so future releases don't depend on a long-lived `NPM_TOKEN`:

1. On npmjs.com, open the `create-andersseen-app` package → **Settings** →
   **Publishing access** → add a Trusted Publisher.
2. Provider: GitHub Actions. Repository: `Andersseen/andersseen-stack`.
   Workflow: the release workflow file (e.g. `release.yml`). Environment:
   optional, but recommended for an extra approval gate.
3. Add `.github/workflows/release.yml` in a follow-up PR, triggered on
   pushes of tags matching `create-andersseen-app-v*`, with:
   - `permissions: id-token: write` (required for OIDC, no other write
     access needed)
   - `pnpm --filter create-andersseen-app release:check`
   - `npm publish --provenance --access public` run from
     `packages/create-andersseen-app`, authenticated via OIDC — no
     `NPM_TOKEN` secret at all.
4. Once that workflow exists and is verified, tagging
   `create-andersseen-app-v0.1.1` (or later) becomes the entire release
   action: the tag push triggers the workflow, which re-runs the checks,
   publishes with provenance, and the maintainer creates the matching
   GitHub Release.

That workflow is intentionally **not** added in this PR: it would have
nothing to publish yet (the package doesn't exist on npm) and no Trusted
Publisher configured to authenticate against, so an active workflow would
just fail. It's designed above so it can be added directly once the
bootstrap release lands.

## What never goes in this repository

No `NPM_TOKEN`, no `NODE_AUTH_TOKEN`, no `.npmrc` with a token, committed
here — not even as a placeholder. Trusted Publishing exists specifically so
this repository never needs to hold npm credentials. GitHub secrets, if ever
needed as a stopgap, are configured through GitHub's UI, never from code.
