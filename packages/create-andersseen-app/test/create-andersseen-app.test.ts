import { execFileSync, spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, describe, expect, it } from 'vitest';
import { createApp, resolveCreateOptions, resolveProjectTarget } from '../src/index';

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

    const output = runBin([targetDir, '--no-install'], root);

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
});

describe('validation', () => {
  it('normalizes friendly names clearly', () => {
    const target = resolveProjectTarget('My App', '/tmp');

    expect(target.projectName).toBe('my-app');
    expect(target.normalized).toBe(true);
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
    });

    await expect(
      createApp({
        projectName: 'non-empty',
        packageName: 'non-empty',
        targetDir: nonEmptyDir,
        install: false,
      })
    ).rejects.toThrow(/not empty/);
  });

  it('does not leave template tokens in generated text files', async () => {
    const root = tempRoot();
    const targetDir = join(root, 'tokens-app');

    await createApp({
      projectName: 'tokens-app',
      packageName: 'tokens-app',
      targetDir,
      install: false,
    });

    for (const file of readdirRecursive(targetDir)) {
      const content = readFileSync(join(targetDir, file), 'utf8');

      expect(content, file).not.toContain('__PROJECT_NAME__');
      expect(content, file).not.toContain('__PACKAGE_NAME__');
    }
  });
});

describe('generated app contract', () => {
  it('uses published packages and avoids creator runtime coupling', async () => {
    const root = tempRoot();
    const targetDir = join(root, 'contract-app');

    await createApp({
      projectName: 'contract-app',
      packageName: 'contract-app',
      targetDir,
      install: false,
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
  });
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

function runBinResult(args: string[], cwd = workspaceRoot): ReturnType<typeof spawnSync> {
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
