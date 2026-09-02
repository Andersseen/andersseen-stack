import { constants as fsConstants } from 'node:fs';
import { access, cp, mkdir, readdir, readFile, rename, rmdir, rm, stat, writeFile } from 'node:fs/promises';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { packageManager, versions } from './constants.js';

export interface TemplateValues {
  readonly projectName: string;
  readonly packageName: string;
}

const templateRoot = join(dirname(dirname(fileURLToPath(import.meta.url))), 'templates/base');
const templateTokens = ['__PROJECT_NAME__', '__PACKAGE_NAME__'] as const;
const textExtensions = new Set([
  '',
  '.css',
  '.html',
  '.json',
  '.md',
  '.mjs',
  '.ts',
  '.txt',
  '.yml',
  '.yaml',
]);

export async function pathExists(path: string): Promise<boolean> {
  try {
    await access(path, fsConstants.F_OK);
    return true;
  } catch {
    return false;
  }
}

export async function assertTargetAvailable(targetDir: string): Promise<{ existed: boolean }> {
  if (!(await pathExists(targetDir))) {
    return { existed: false };
  }

  const current = await stat(targetDir);

  if (!current.isDirectory()) {
    throw new Error(`Target path already exists and is not a directory: ${targetDir}`);
  }

  const entries = await readdir(targetDir);

  if (entries.length > 0) {
    throw new Error(`Target directory is not empty: ${targetDir}`);
  }

  return { existed: true };
}

export async function renderTemplate(destination: string, values: TemplateValues): Promise<void> {
  await cp(templateRoot, destination, {
    recursive: true,
    force: false,
    errorOnExist: true,
    verbatimSymlinks: true,
    filter(source) {
      return !basename(source).startsWith('.DS_Store');
    },
  });

  await renderFiles(destination, values);
  await writeGeneratedPackageJson(destination, values);
}

export async function moveRenderedTemplate(stagingDir: string, targetDir: string): Promise<void> {
  if (!(await pathExists(targetDir))) {
    await rename(stagingDir, targetDir);
    return;
  }

  await rmdir(targetDir);
  await rename(stagingDir, targetDir);
}

export async function removeGeneratedPath(path: string): Promise<void> {
  await rm(path, { recursive: true, force: true });
}

export async function createStagingDir(targetDir: string): Promise<string> {
  const parentDir = dirname(targetDir);
  await mkdir(parentDir, { recursive: true });
  return `${targetDir}.tmp-${process.pid}-${Date.now()}`;
}

async function renderFiles(root: string, values: TemplateValues): Promise<void> {
  const entries = await readdir(root, { withFileTypes: true });

  for (const entry of entries) {
    const currentPath = join(root, entry.name);

    if (entry.isDirectory()) {
      await renderFiles(currentPath, values);
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const templatePath = entry.name.endsWith('.tmpl') ? currentPath.slice(0, -5) : currentPath;
    const renderedPath =
      basename(templatePath) === 'gitignore' ? join(dirname(templatePath), '.gitignore') : templatePath;
    const extension = extensionFor(renderedPath);

    if (textExtensions.has(extension)) {
      const content = await readFile(currentPath, 'utf8');
      await writeFile(renderedPath, replaceTokens(content, values));
    }

    if (renderedPath !== currentPath) {
      await rm(currentPath);
    }
  }
}

function replaceTokens(content: string, values: TemplateValues): string {
  return content
    .replaceAll('__PROJECT_NAME__', values.projectName)
    .replaceAll('__PACKAGE_NAME__', values.packageName);
}

function extensionFor(filePath: string): string {
  const name = basename(filePath);
  const dot = name.lastIndexOf('.');
  return dot <= 0 ? '' : name.slice(dot);
}

export function hasTemplateToken(content: string): boolean {
  return templateTokens.some((token) => content.includes(token));
}

async function writeGeneratedPackageJson(destination: string, values: TemplateValues): Promise<void> {
  const manifest = {
    name: values.packageName,
    version: '0.0.0',
    private: true,
    type: 'module',
    packageManager,
    engines: {
      node: '>=22',
    },
    scripts: {
      dev: 'vite',
      start: 'pnpm run dev',
      build: 'vite build',
      test: 'vitest run',
      'test:watch': 'vitest',
      typecheck: 'tsc --noEmit -p tsconfig.app.json',
      check: 'pnpm run typecheck && pnpm run test',
      preview: 'node dist/analog/server/index.mjs',
    },
    dependencies: {
      '@analogjs/router': versions.analog,
      '@angular/animations': versions.angularAnimations,
      '@angular/common': versions.angular,
      '@angular/compiler': versions.angular,
      '@angular/core': versions.angular,
      '@angular/forms': versions.angular,
      '@angular/platform-browser': versions.angular,
      '@angular/platform-server': versions.angular,
      '@angular/router': versions.angular,
      '@quartz-headless/core': versions.quartz,
      '@quartz-headless/primitives': versions.quartz,
      '@tailwindcss/vite': versions.tailwind,
      '@voltui/components': versions.volt,
      'lumen-icons': versions.lumen,
      rxjs: versions.rxjs,
      tailwindcss: versions.tailwind,
      tslib: versions.tslib,
    },
    devDependencies: {
      '@analogjs/platform': versions.analog,
      '@analogjs/vite-plugin-angular': versions.analog,
      '@analogjs/vitest-angular': versions.analog,
      '@angular/build': versions.angularBuild,
      '@angular/cli': versions.angularCli,
      '@angular/compiler-cli': versions.angular,
      '@testing-library/angular': versions.testingLibraryAngular,
      '@testing-library/jest-dom': versions.testingLibraryJestDom,
      '@testing-library/user-event': versions.testingLibraryUserEvent,
      '@types/node': versions.nodeTypes,
      jsdom: versions.jsdom,
      typescript: versions.typescript,
      vite: versions.vite,
      vitest: versions.vitest,
    },
    pnpm: {
      overrides: {
        '@angular/cdk': versions.angularCdk,
      },
    },
  };

  await writeFile(join(destination, 'package.json'), `${JSON.stringify(manifest, null, 2)}\n`);
}
