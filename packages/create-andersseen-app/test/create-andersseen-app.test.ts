import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { CREATE_APP_SCOPE, CREATE_PACKAGE_NAME } from '../src/index';

const packageRoot = dirname(dirname(fileURLToPath(import.meta.url)));

describe('create-andersseen-app contract', () => {
  it('reserves the pnpm create package name', () => {
    expect(CREATE_PACKAGE_NAME).toBe('create-andersseen-app');
  });

  it('keeps generated app source owned by the target app', () => {
    expect(CREATE_APP_SCOPE).toContain('own generated source inside the target app');
  });

  it('wires the executable placeholder', () => {
    const manifest = JSON.parse(readFileSync(join(packageRoot, 'package.json'), 'utf8')) as {
      bin: Record<string, string>;
    };
    const output = execFileSync('node', [join(packageRoot, manifest.bin['create-andersseen-app']), '--help'], {
      encoding: 'utf8',
    });

    expect(output).toContain('pnpm create andersseen-app');
  });
});
