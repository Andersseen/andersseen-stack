import { basename, resolve, sep } from 'node:path';

export interface ProjectTarget {
  readonly inputName: string;
  readonly projectName: string;
  readonly packageName: string;
  readonly targetDir: string;
  readonly normalized: boolean;
}

const npmNamePattern =
  /^(?:@[a-z0-9][a-z0-9._~-]*\/)?[a-z0-9][a-z0-9._~-]*$/;

const windowsReservedNames = new Set([
  'con',
  'prn',
  'aux',
  'nul',
  'com1',
  'com2',
  'com3',
  'com4',
  'com5',
  'com6',
  'com7',
  'com8',
  'com9',
  'lpt1',
  'lpt2',
  'lpt3',
  'lpt4',
  'lpt5',
  'lpt6',
  'lpt7',
  'lpt8',
  'lpt9',
]);

export function resolveProjectTarget(input: string, cwd = process.cwd()): ProjectTarget {
  const trimmed = input.trim();

  if (!trimmed) {
    throw new Error('Project name is required.');
  }

  if (trimmed.includes('\0')) {
    throw new Error('Project name cannot contain null bytes.');
  }

  const parts = trimmed.split(/[\\/]+/).filter(Boolean);

  if (parts.includes('..')) {
    throw new Error('Project name cannot contain ".." path segments.');
  }

  if (trimmed.startsWith('@')) {
    throw new Error('Scoped package names are not supported by this creator yet.');
  }

  const rawName = basename(trimmed);
  const projectName = normalizeProjectName(rawName);
  const packageName = projectName;

  validatePackageName(packageName);

  const targetDir = resolve(cwd, trimmed);
  const root = resolve(sep);

  if (targetDir === root) {
    throw new Error('Refusing to create a project at the filesystem root.');
  }

  return {
    inputName: trimmed,
    projectName,
    packageName,
    targetDir,
    normalized: rawName !== projectName,
  };
}

export function validatePackageName(packageName: string): void {
  if (packageName.length > 214) {
    throw new Error('Package name must be 214 characters or fewer.');
  }

  if (!npmNamePattern.test(packageName)) {
    throw new Error(
      `Invalid project name "${packageName}". Use a valid npm package name such as "my-app".`
    );
  }

  if (packageName.startsWith('.') || packageName.startsWith('_')) {
    throw new Error('Project name cannot start with "." or "_".');
  }

  if (packageName.endsWith('.')) {
    throw new Error('Project name cannot end with ".".');
  }

  if (windowsReservedNames.has(packageName)) {
    throw new Error(`Project name "${packageName}" is reserved by Windows.`);
  }
}

function normalizeProjectName(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
