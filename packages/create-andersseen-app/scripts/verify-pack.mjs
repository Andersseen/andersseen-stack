import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Reads the *actual* tarball contents `npm pack` would publish, instead of
// trusting that package.json's `files` field behaves the way we expect.

const packageRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const manifest = JSON.parse(readFileSync(join(packageRoot, 'package.json'), 'utf8'));

const REQUIRED_PATHS = [
  'package.json',
  'README.md',
  'LICENSE',
  'bin/create-andersseen-app.mjs',
  'dist/cli.js',
  'dist/index.js',
  'templates/base/src/app/app.ts',
  'templates/shapes/dashboard/src/app/layouts/dashboard/dashboard-layout.ts',
  'templates/shapes/landing/src/app/layouts/public/public-layout.ts',
  'templates/compositions/landing-dashboard/src/app/pages/index.page.ts',
];

const FORBIDDEN_PREFIXES = ['src/', 'test/', 'scripts/', 'coverage/', 'node_modules/'];

const FORBIDDEN_ROOT_FILES = new Set([
  'tsconfig.json',
  'tsconfig.app.json',
  'tsconfig.spec.json',
  'eslint.config.js',
  'eslint.config.mjs',
  '.eslintrc.json',
]);

const raw = execFileSync('npm', ['pack', '--dry-run', '--json'], {
  cwd: packageRoot,
  encoding: 'utf8',
});

const [summary] = JSON.parse(raw);
const paths = summary.files.map((file) => file.path);
const errors = [];

if (summary.name !== 'create-andersseen-app') {
  errors.push(`Unexpected package name in tarball: "${summary.name}".`);
}

if (summary.version !== manifest.version) {
  errors.push(`Tarball version "${summary.version}" does not match package.json version "${manifest.version}".`);
}

for (const required of REQUIRED_PATHS) {
  if (!paths.includes(required)) {
    errors.push(`Missing required file in tarball: ${required}`);
  }
}

for (const path of paths) {
  if (path.endsWith('.DS_Store')) {
    errors.push(`Tarball must not include .DS_Store: ${path}`);
    continue;
  }

  if (FORBIDDEN_PREFIXES.some((prefix) => path.startsWith(prefix))) {
    errors.push(`Tarball must not include workspace-only path: ${path}`);
    continue;
  }

  if (!path.includes('/') && FORBIDDEN_ROOT_FILES.has(path)) {
    errors.push(`Tarball must not include development-only file: ${path}`);
  }
}

if (errors.length > 0) {
  console.error(`create-andersseen-app@${summary.version} tarball validation failed:\n`);
  for (const error of errors) {
    console.error(`  - ${error}`);
  }
  process.exitCode = 1;
} else {
  console.log(`create-andersseen-app@${summary.version} tarball contains exactly the expected ${paths.length} files.`);
}
