import { describe, expect, it } from 'vitest';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { STACK_INIT_SCOPE, STACK_PACKAGE_NAME } from '../src/index';

const packageRoot = dirname(dirname(fileURLToPath(import.meta.url)));

describe('@andersseen/stack contract', () => {
  it('names the future adoption package', () => {
    expect(STACK_PACKAGE_NAME).toBe('@andersseen/stack');
  });

  it('keeps init scoped to adoption work', () => {
    expect(STACK_INIT_SCOPE).toContain('install Andersseen core libraries');
  });

  it('wires the executable placeholder', () => {
    const manifest = JSON.parse(readFileSync(join(packageRoot, 'package.json'), 'utf8')) as {
      bin: Record<string, string>;
    };
    const output = execFileSync('node', [join(packageRoot, manifest.bin.stack), 'init'], {
      encoding: 'utf8',
    });

    expect(output).toContain('@andersseen/stack init');
  });
});
