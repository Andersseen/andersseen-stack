import { execFileSync, spawnSync, type SpawnSyncReturns } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, describe, expect, it } from 'vitest';
import { APP_SHAPES, createApp, resolveCreateOptions, resolveProjectTarget } from '../src/index.js';
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
    expect(parseCliArgs(['my-app', '--shape', 'landing']).shape).toBe('landing');
    expect(parseCliArgs(['my-app', '--shape', 'landing-dashboard']).shape).toBe('landing-dashboard');
    expect(() => parseCliArgs(['my-app', '--shape', 'nonsense'])).toThrow(/Invalid --shape/);
  });
});

describe('APP_SHAPES', () => {
  it('contains landing-dashboard alongside minimal, dashboard and landing', () => {
    expect(APP_SHAPES).toEqual(['minimal', 'dashboard', 'landing', 'landing-dashboard']);
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

    const landing = resolveCreateOptions({
      projectName: 'my-app',
      cwd: '/tmp/work',
      install: false,
      shape: 'landing',
    });
    expect(landing.shape).toBe('landing');
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

  it.each<AppShape>(['minimal', 'dashboard', 'landing', 'landing-dashboard'])('does not leave template tokens in generated text files (%s)', async (shape) => {
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

  it('the landing shape composes a PublicLayout on top of the base template', async () => {
    const root = tempRoot();
    const targetDir = join(root, 'landing-app');

    await createApp({
      projectName: 'landing-app',
      packageName: 'landing-app',
      targetDir,
      install: false,
      shape: 'landing',
    });

    const files = readdirRecursive(targetDir);

    expect(files).toEqual(
      expect.arrayContaining([
        'src/app/layouts/public/public-layout.ts',
        'src/app/layouts/public/public-layout.spec.ts',
        'src/app/layouts/public/navbar/navbar.ts',
        'src/app/layouts/public/footer/footer.ts',
        'src/app/pages/index.page.ts',
        'src/app/pages/index.page.spec.ts',
      ])
    );

    // No dashboard AppShell contamination, and no artificial routes beyond "/".
    expect(files.some((file) => file.startsWith('src/app/layouts/dashboard/'))).toBe(false);
    expect(files).not.toContain('src/app/pages/(app).page.ts');

    // The base hero page/spec are replaced, not duplicated alongside the new one.
    const indexPage = readFileSync(join(targetDir, 'src/app/pages/index.page.ts'), 'utf8');
    expect(indexPage).toContain('PublicLayout');
    expect(indexPage).not.toContain('Your application is ready');
    expect(indexPage).not.toContain("redirectTo: '/dashboard'");
  });

  it('the minimal shape does not contain the landing PublicLayout', async () => {
    const root = tempRoot();
    const targetDir = join(root, 'minimal-app-2');

    await createApp({
      projectName: 'minimal-app-2',
      packageName: 'minimal-app-2',
      targetDir,
      install: false,
      shape: 'minimal',
    });

    const files = readdirRecursive(targetDir);

    expect(files.some((file) => file.startsWith('src/app/layouts/'))).toBe(false);
  });

  it('does not let dashboard and landing overlays contaminate each other', async () => {
    const root = tempRoot();
    const dashboardDir = join(root, 'shape-check-dashboard');
    const landingDir = join(root, 'shape-check-landing');

    await createApp({
      projectName: 'shape-check-dashboard',
      packageName: 'shape-check-dashboard',
      targetDir: dashboardDir,
      install: false,
      shape: 'dashboard',
    });
    await createApp({
      projectName: 'shape-check-landing',
      packageName: 'shape-check-landing',
      targetDir: landingDir,
      install: false,
      shape: 'landing',
    });

    const dashboardFiles = readdirRecursive(dashboardDir);
    const landingFiles = readdirRecursive(landingDir);

    expect(dashboardFiles.some((file) => file.startsWith('src/app/layouts/public/'))).toBe(false);
    expect(landingFiles.some((file) => file.startsWith('src/app/layouts/dashboard/'))).toBe(false);
  });
});

describe('composition: landing-dashboard', () => {
  it('composes the existing PublicLayout and DashboardLayout without a dedicated template', async () => {
    const root = tempRoot();
    const targetDir = join(root, 'combined-app');

    await createApp({
      projectName: 'combined-app',
      packageName: 'combined-app',
      targetDir,
      install: false,
      shape: 'landing-dashboard',
    });

    const files = readdirRecursive(targetDir);

    // The public shell.
    expect(files).toEqual(
      expect.arrayContaining([
        'src/app/layouts/public/public-layout.ts',
        'src/app/layouts/public/public-layout.spec.ts',
        'src/app/layouts/public/navbar/navbar.ts',
        'src/app/layouts/public/footer/footer.ts',
      ])
    );

    // The dashboard AppShell, routed under /dashboard, /projects and /settings.
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

    // Exactly one index page — Landing and Dashboard both produce one, but
    // composition resolves ownership instead of duplicating the route.
    expect(files.filter((file) => file === 'src/app/pages/index.page.ts')).toHaveLength(1);
  });

  it('reserves / for the public Landing home and drops the Dashboard root redirect', async () => {
    const root = tempRoot();
    const targetDir = join(root, 'combined-root-route');

    await createApp({
      projectName: 'combined-root-route',
      packageName: 'combined-root-route',
      targetDir,
      install: false,
      shape: 'landing-dashboard',
    });

    const indexPage = readFileSync(join(targetDir, 'src/app/pages/index.page.ts'), 'utf8');

    expect(indexPage).toContain('PublicLayout');
    expect(indexPage).toContain('Build your next application');
    expect(indexPage).not.toContain("redirectTo: '/dashboard'");
  });

  it('connects the Landing CTA to the Dashboard shell and the Dashboard brand back to /', async () => {
    const root = tempRoot();
    const targetDir = join(root, 'combined-navigation');

    await createApp({
      projectName: 'combined-navigation',
      packageName: 'combined-navigation',
      targetDir,
      install: false,
      shape: 'landing-dashboard',
    });

    const indexPage = readFileSync(join(targetDir, 'src/app/pages/index.page.ts'), 'utf8');
    const publicNavbar = readFileSync(join(targetDir, 'src/app/layouts/public/navbar/navbar.ts'), 'utf8');
    const sidebar = readFileSync(join(targetDir, 'src/app/layouts/dashboard/sidebar/sidebar.ts'), 'utf8');

    expect(indexPage).toContain('routerLink="/dashboard"');
    expect(publicNavbar).toContain('Open dashboard');
    expect(publicNavbar).toContain('routerLink="/dashboard"');
    expect(sidebar).toContain('routerLink="/" aria-label="Andersseen App"');
  });

  it('reuses the shared overlay files byte-for-byte instead of forking a third template', async () => {
    const root = tempRoot();
    const combinedDir = join(root, 'reuse-combined');
    const dashboardDir = join(root, 'reuse-dashboard');
    const landingDir = join(root, 'reuse-landing');

    // Same project name for all three so token replacement (__PROJECT_NAME__)
    // can't be mistaken for a real content difference in the comparison below.
    await createApp({
      projectName: 'reuse-app',
      packageName: 'reuse-app',
      targetDir: combinedDir,
      install: false,
      shape: 'landing-dashboard',
    });
    await createApp({
      projectName: 'reuse-app',
      packageName: 'reuse-app',
      targetDir: dashboardDir,
      install: false,
      shape: 'dashboard',
    });
    await createApp({
      projectName: 'reuse-app',
      packageName: 'reuse-app',
      targetDir: landingDir,
      install: false,
      shape: 'landing',
    });

    // Untouched by the landing-dashboard composition patch: identical to the
    // standalone shape's own file, not a duplicate copy.
    const sharedDashboardFiles = [
      'src/app/layouts/dashboard/dashboard-layout.ts',
      'src/app/layouts/dashboard/dashboard-layout.spec.ts',
      'src/app/layouts/dashboard/navigation.ts',
      'src/app/layouts/dashboard/navbar/navbar.ts',
      'src/app/pages/(app).page.ts',
      'src/app/pages/(app)/dashboard.page.ts',
      'src/app/pages/(app)/projects.page.ts',
      'src/app/pages/(app)/settings.page.ts',
      'src/app/pages/[...not-found].page.ts',
    ];
    const sharedLandingFiles = [
      'src/app/layouts/public/public-layout.ts',
      'src/app/layouts/public/public-layout.spec.ts',
      'src/app/layouts/public/footer/footer.ts',
    ];

    for (const file of sharedDashboardFiles) {
      expect(readFileSync(join(combinedDir, file), 'utf8'), file).toBe(readFileSync(join(dashboardDir, file), 'utf8'));
    }

    for (const file of sharedLandingFiles) {
      expect(readFileSync(join(combinedDir, file), 'utf8'), file).toBe(readFileSync(join(landingDir, file), 'utf8'));
    }

    // The composition patch touches exactly these files, and standalone
    // generation never sees it: the standalone shapes keep their own
    // originals unmodified.
    const standaloneSidebar = readFileSync(join(dashboardDir, 'src/app/layouts/dashboard/sidebar/sidebar.ts'), 'utf8');
    expect(standaloneSidebar).toContain('routerLink="/dashboard" aria-label="Andersseen App"');

    const standaloneNavbar = readFileSync(join(landingDir, 'src/app/layouts/public/navbar/navbar.ts'), 'utf8');
    expect(standaloneNavbar).toContain('Get started');
    expect(standaloneNavbar).not.toContain('Open dashboard');
  });
});

describe('shape contamination matrix', () => {
  it('gives each shape exactly the layouts it claims and none of the others', async () => {
    const root = tempRoot();
    const dirs: Record<AppShape, string> = {
      minimal: join(root, 'matrix-minimal'),
      dashboard: join(root, 'matrix-dashboard'),
      landing: join(root, 'matrix-landing'),
      'landing-dashboard': join(root, 'matrix-landing-dashboard'),
    };

    for (const shape of APP_SHAPES) {
      await createApp({
        projectName: `matrix-${shape}`,
        packageName: `matrix-${shape}`,
        targetDir: dirs[shape],
        install: false,
        shape,
      });
    }

    const filesFor = (shape: AppShape) => readdirRecursive(dirs[shape]);
    const hasPublicLayout = (files: string[]) => files.includes('src/app/layouts/public/public-layout.ts');
    const hasDashboardLayout = (files: string[]) => files.includes('src/app/layouts/dashboard/dashboard-layout.ts');

    const minimalFiles = filesFor('minimal');
    expect(hasPublicLayout(minimalFiles)).toBe(false);
    expect(hasDashboardLayout(minimalFiles)).toBe(false);

    const landingFiles = filesFor('landing');
    expect(hasPublicLayout(landingFiles)).toBe(true);
    expect(hasDashboardLayout(landingFiles)).toBe(false);

    const dashboardFiles = filesFor('dashboard');
    expect(hasPublicLayout(dashboardFiles)).toBe(false);
    expect(hasDashboardLayout(dashboardFiles)).toBe(true);

    const combinedFiles = filesFor('landing-dashboard');
    expect(hasPublicLayout(combinedFiles)).toBe(true);
    expect(hasDashboardLayout(combinedFiles)).toBe(true);
  });
});

describe('root route resolution', () => {
  it.each<[AppShape, string, boolean]>([
    ['dashboard', "redirectTo: '/dashboard'", true],
    ['landing', "redirectTo: '/dashboard'", false],
    ['landing-dashboard', "redirectTo: '/dashboard'", false],
  ])('shape "%s" resolves / independently of overlay application order', async (shape, needle, shouldContain) => {
    const root = tempRoot();
    const targetDir = join(root, `root-route-${shape}`);

    await createApp({
      projectName: 'root-route-app',
      packageName: 'root-route-app',
      targetDir,
      install: false,
      shape,
    });

    const indexPage = readFileSync(join(targetDir, 'src/app/pages/index.page.ts'), 'utf8');

    if (shouldContain) {
      expect(indexPage).toContain(needle);
    } else {
      expect(indexPage).not.toContain(needle);
    }
  });

  it('renders the public Landing home at / for both landing and landing-dashboard', async () => {
    const root = tempRoot();
    const landingDir = join(root, 'root-route-landing-home');
    const combinedDir = join(root, 'root-route-combined-home');

    await createApp({
      projectName: 'root-route-landing-home',
      packageName: 'root-route-landing-home',
      targetDir: landingDir,
      install: false,
      shape: 'landing',
    });
    await createApp({
      projectName: 'root-route-combined-home',
      packageName: 'root-route-combined-home',
      targetDir: combinedDir,
      install: false,
      shape: 'landing-dashboard',
    });

    expect(readFileSync(join(landingDir, 'src/app/pages/index.page.ts'), 'utf8')).toContain('PublicLayout');
    expect(readFileSync(join(combinedDir, 'src/app/pages/index.page.ts'), 'utf8')).toContain('PublicLayout');
  });
});

describe('generated app contract', () => {
  it.each<AppShape>(['minimal', 'dashboard', 'landing', 'landing-dashboard'])(
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
