import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

// Minimal is exercised by the fast in-package template-contract tests
// (test/create-andersseen-app.test.ts); it needs no external install/build
// cycle. Dashboard, Landing and Landing + Dashboard compose published
// Quartz/Volt/Lumen packages into a real app, so those are the ones worth
// the cost of a real external pnpm install + build per shape.
const SHAPES_TO_SMOKE = ['dashboard', 'landing', 'landing-dashboard'];

const packageRoot = new URL('..', import.meta.url);
const workspaceRoot = new URL('../..', packageRoot);
const tempRoot = mkdtempSync(join(tmpdir(), 'andersseen-generated-'));

try {
  execFileSync('pnpm', ['pack', '--pack-destination', tempRoot], {
    cwd: fileURLToPath(packageRoot),
    stdio: 'inherit',
  });

  const tarball = readdirSync(tempRoot).find((entry) => entry.endsWith('.tgz'));

  if (!tarball) {
    throw new Error('Unable to find packed create-andersseen-app tarball.');
  }

  for (const shape of SHAPES_TO_SMOKE) {
    const appDir = join(tempRoot, `smoke-app-${shape}`);

    execFileSync('pnpm', ['dlx', join(tempRoot, tarball), appDir, '--shape', shape, '--no-install'], {
      cwd: fileURLToPath(workspaceRoot),
      stdio: 'inherit',
    });

    if (!existsSync(join(appDir, '.gitignore'))) {
      throw new Error(`Packed creator did not generate .gitignore for shape "${shape}".`);
    }

    execFileSync('pnpm', ['install'], { cwd: appDir, stdio: 'inherit' });
    execFileSync('pnpm', ['typecheck'], { cwd: appDir, stdio: 'inherit' });
    execFileSync('pnpm', ['test'], { cwd: appDir, stdio: 'inherit' });
    execFileSync('pnpm', ['build'], { cwd: appDir, stdio: 'inherit' });
  }
} finally {
  rmSync(tempRoot, { recursive: true, force: true });
}
