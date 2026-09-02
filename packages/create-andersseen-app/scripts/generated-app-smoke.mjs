import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const packageRoot = new URL('..', import.meta.url);
const workspaceRoot = new URL('../..', packageRoot);
const tempRoot = mkdtempSync(join(tmpdir(), 'andersseen-generated-'));
const appDir = join(tempRoot, 'smoke-app');

try {
  execFileSync('pnpm', ['pack', '--pack-destination', tempRoot], {
    cwd: fileURLToPath(packageRoot),
    stdio: 'inherit',
  });

  const tarball = readdirSync(tempRoot).find((entry) => entry.endsWith('.tgz'));

  if (!tarball) {
    throw new Error('Unable to find packed create-andersseen-app tarball.');
  }

  execFileSync('pnpm', ['dlx', join(tempRoot, tarball), appDir, '--no-install'], {
    cwd: fileURLToPath(workspaceRoot),
    stdio: 'inherit',
  });

  if (!existsSync(join(appDir, '.gitignore'))) {
    throw new Error('Packed creator did not generate .gitignore.');
  }

  execFileSync('pnpm', ['install'], { cwd: appDir, stdio: 'inherit' });
  execFileSync('pnpm', ['typecheck'], { cwd: appDir, stdio: 'inherit' });
  execFileSync('pnpm', ['test'], { cwd: appDir, stdio: 'inherit' });
  execFileSync('pnpm', ['build'], { cwd: appDir, stdio: 'inherit' });
} finally {
  rmSync(tempRoot, { recursive: true, force: true });
}
