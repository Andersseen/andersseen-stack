import { execFileSync, spawnSync, type SpawnSyncReturns } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, describe, expect, it } from 'vitest';
import { createApp, resolveCreateOptions, resolveProjectTarget } from '../src/index.js';
import type { AppShape } from '../src/index.js';
import { parseCliArgs } from '../src/options.js';

const packageRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const workspaceRoot = dirname(dirname(packageRoot));
const tempRoots: string[] = [];

afterEach(() => {
  for (const root of tempRoots.splice(0)) {
    rmSync(root, { recursive: true, force: true });
  }
});

describe('CLI', () => {
  it('prints help', () => {
    const output = runBin(['--help']);

    expect(output).toContain('Usage: pnpm create andersseen-app');
    expect(output).toContain('--no-install');
  });

  it('prints version', () => {
    const manifest = readPackageJson(join(packageRoot, 'package.json')) as { version: string };

    expect(runBin(['--version']).trim()).toBe(manifest.version);
  });

  it('accepts a positional project name with --no-install', () => {
    const root = tempRoot();
    const targetDir = join(root, 'positional-app');

    const output = runBin([targetDir, '--shape', 'minimal', '--no-install'], root);

    expect(output).toContain('Created positional-app');
    expect(readPackageJson(join(targetDir, 'package.json'))).toMatchObject({
      name: 'positional-app',
      private: true,
    });
  });

  it('requires a project name when --yes cannot infer one', () => {
    const result = runBinResult(['--yes', '--no-install']);

    expect(result.status).toBe(1);
    expect(`${result.stdout}\n${result.stderr}`).toContain('Project name is required');
  });

  it('accepts --shape and rejects an unknown value', () => {
    expect(parseCliArgs(['my-app', '--shape', 'dashboard']).shape).toBe('dashboard');
    expect(parseCliArgs(['my-app', '--shape', 'minimal']).shape).toBe('minimal');
    expect(() => parseCliArgs(['my-app', '--shape', 'landing'])).toThrow(/Invalid --shape/);
  });
});

describe('validation', () => {
  it('normalizes friendly names clearly', () => {
    const target = resolveProjectTarget('My App', '/tmp');

    expect(target.projectName).toBe('my-app');
    expect(target.normalized).toBe(true);
  });

  it('normalizes the target directory alongside the package name', () => {
    const bare = resolveProjectTarget('My App', '/tmp/work');
    expect(bare.targetDir).toBe('/tmp/work/my-app');

    const nested = resolveProjectTarget('projects/My App', '/tmp/work');
    expect(nested.targetDir).toBe('/tmp/work/projects/my-app');

    const absolute = resolveProjectTarget('/Users/x/My App', '/tmp/work');
    expect(absolute.targetDir).toBe('/Users/x/my-app');
  });

  it('defaults the resolved shape to dashboard and honors an explicit shape', () => {
    const target = resolveCreateOptions({ projectName: 'my-app', cwd: '/tmp/work', install: false });
    expect(target.shape).toBe('dashboard');

    const minimal = resolveCreateOptions({
      projectName: 'my-app',
      cwd: '/tmp/work',
      install: false,
      shape: 'minimal',
    });
    expect(minimal.shape).toBe('minimal');
  });

  it('accepts underscores because npm package names allow them', () => {
    const target = resolveProjectTarget('cool_project', '/tmp');

    expect(target.packageName).toBe('cool_project');
  });

  it('rejects invalid names and scoped names for now', () => {
    expect(() => resolveProjectTarget('@scope/name', '/tmp')).toThrow(/Scoped package names/);
    expect(() => resolveProjectTarget('bad:name', '/tmp')).toThrow(/Invalid project name/);
  });

  it('rejects unsafe parent traversal', () => {
    expect(() => resolveProjectTarget('../outside', '/tmp/safe')).toThrow(/"\.\."/);
  });

  it('resolves targets inside the current working directory', () => {
    const target = resolveCreateOptions({
      projectName: 'nested/my-app',
      cwd: '/tmp/work',
      install: false,
    });

    expect(target.targetDir).toBe('/tmp/work/nested/my-app');
    expect(relative('/tmp/work', target.targetDir)).toBe('nested/my-app');
  });
});

describe('generation', () => {
  it('generates the baseline application files including dotfiles', async () => {
    const root = tempRoot();
    const targetDir = join(root, 'generated-app');

    await createApp({
      projectName: 'generated-app',
      packageName: 'generated-app',
      targetDir,
      install: false,
      shape: 'minimal',
    });

    expect(readdirSync(targetDir).sort()).toEqual(
      expect.arrayContaining([
        '.editorconfig',
        '.gitignore',
        'README.md',
        'index.html',
        'package.json',
        'src',
        'tsconfig.app.json',
        'tsconfig.json',
        'vite.config.ts',
      ])
    );
    expect(readdirRecursive(targetDir)).toEqual(
      expect.arrayContaining([
        'src/app/app.config.ts',
        'src/app/app.ts',
        'src/app/pages/index.page.spec.ts',
        'src/app/pages/index.page.ts',
        'src/styles.css',
        'test-setup.js',
      ])
    );
  });

  it('allows an existing empty directory and rejects a non-empty one', async () => {
    const root = tempRoot();
    const emptyDir = join(root, 'empty');
    const nonEmptyDir = join(root, 'non-empty');

    mkdirSync(emptyDir);
    mkdirSync(nonEmptyDir);
    writeFileSync(join(nonEmptyDir, 'existing.txt'), 'user data');

    await createApp({
      projectName: 'empty',
      packageName: 'empty',
      targetDir: emptyDir,
      install: false,
      shape: 'minimal',
    });

    await expect(
      createApp({
        projectName: 'non-empty',
        packageName: 'non-empty',
        targetDir: nonEmptyDir,
        install: false,
        shape: 'minimal',
      })
    ).rejects.toThrow(/not empty/);
  });

  it.each<AppShape>(['minimal', 'dashboard'])('does not leave template tokens in generated text files (%s)', async (shape) => {
    const root = tempRoot();
    const targetDir = join(root, `tokens-app-${shape}`);

    await createApp({
      projectName: 'tokens-app',
      packageName: 'tokens-app',
      targetDir,
      install: false,
      shape,
    });

    for (const file of readdirRecursive(targetDir)) {
      const content = readFileSync(join(targetDir, file), 'utf8');

      expect(content, file).not.toContain('__PROJECT_NAME__');
      expect(content, file).not.toContain('__PACKAGE_NAME__');
    }
  });

  it('the dashboard shape composes an AppShell on top of the base template', async () => {
    const root = tempRoot();
    const targetDir = join(root, 'dashboard-app');

    await createApp({
      projectName: 'dashboard-app',
      packageName: 'dashboard-app',
      targetDir,
      install: false,
      shape: 'dashboard',
    });

    const files = readdirRecursive(targetDir);

    expect(files).toEqual(
      expect.arrayContaining([
        'src/app/layouts/dashboard/dashboard-layout.ts',
        'src/app/layouts/dashboard/dashboard-layout.spec.ts',
        'src/app/layouts/dashboard/navigation.ts',
        'src/app/layouts/dashboard/sidebar/sidebar.ts',
        'src/app/layouts/dashboard/navbar/navbar.ts',
        'src/app/pages/(app).page.ts',
        'src/app/pages/(app)/dashboard.page.ts',
        'src/app/pages/(app)/projects.page.ts',
        'src/app/pages/(app)/settings.page.ts',
        'src/app/pages/[...not-found].page.ts',
      ])
    );

    // The base hero page/spec are replaced, not duplicated alongside the new ones.
    const indexPage = readFileSync(join(targetDir, 'src/app/pages/index.page.ts'), 'utf8');
    expect(indexPage).toContain("redirectTo: '/dashboard'");
    expect(indexPage).not.toContain('Your application is ready');
  });

  it('the minimal shape does not contain the dashboard AppShell', async () => {
    const root = tempRoot();
    const targetDir = join(root, 'minimal-app');

    await createApp({
      projectName: 'minimal-app',
      packageName: 'minimal-app',
      targetDir,
      install: false,
      shape: 'minimal',
    });

    const files = readdirRecursive(targetDir);

    expect(files.some((file) => file.startsWith('src/app/layouts/'))).toBe(false);
    expect(files).not.toContain('src/app/pages/(app).page.ts');

    const indexPage = readFileSync(join(targetDir, 'src/app/pages/index.page.ts'), 'utf8');
    expect(indexPage).toContain('Your application is ready');
  });
});

describe('generated app contract', () => {
  it.each<AppShape>(['minimal', 'dashboard'])(
    'uses published packages and avoids creator runtime coupling (%s)',
    async (shape) => {
      const root = tempRoot();
      const targetDir = join(root, `contract-app-${shape}`);

      await createApp({
        projectName: 'contract-app',
        packageName: 'contract-app',
        targetDir,
        install: false,
        shape,
      });

      const manifest = readPackageJson(join(targetDir, 'package.json')) as {
        dependencies: Record<string, string>;
        devDependencies: Record<string, string>;
      };
      const allDependencies = {
        ...manifest.dependencies,
        ...manifest.devDependencies,
      };

      expect(allDependencies).toHaveProperty('@quartz-headless/core');
      expect(allDependencies).toHaveProperty('@quartz-headless/primitives');
      expect(allDependencies).toHaveProperty('@voltui/components');
      expect(allDependencies).toHaveProperty('lumen-icons');
      expect(allDependencies).not.toHaveProperty('quartz-headless');
      expect(allDependencies).not.toHaveProperty('create-andersseen-app');

      for (const version of Object.values(allDependencies)) {
        expect(version).not.toMatch(/^file:/);
        expect(version).not.toMatch(/^workspace:/);
      }
    }
  );
});

function runBin(args: string[], cwd = workspaceRoot): string {
  const manifest = readPackageJson(join(packageRoot, 'package.json')) as { bin: Record<string, string> };

  return execFileSync('node', [join(packageRoot, manifest.bin['create-andersseen-app']), ...args], {
    cwd,
    encoding: 'utf8',
    env: {
      ...process.env,
      NO_COLOR: '1',
    },
  });
}

function runBinResult(args: string[], cwd = workspaceRoot): SpawnSyncReturns<string> {
  const manifest = readPackageJson(join(packageRoot, 'package.json')) as { bin: Record<string, string> };

  return spawnSync('node', [join(packageRoot, manifest.bin['create-andersseen-app']), ...args], {
    cwd,
    encoding: 'utf8',
    env: {
      ...process.env,
      NO_COLOR: '1',
    },
  });
}

function readPackageJson(path: string): unknown {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function tempRoot(): string {
  const root = mkdtempSync(join(tmpdir(), 'create-andersseen-app-'));
  tempRoots.push(root);
  return root;
}

function readdirRecursive(root: string): string[] {
  return readdirSync(root, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => join(entry.parentPath, entry.name))
    .map((file) => relative(root, file))
    .sort();
}
