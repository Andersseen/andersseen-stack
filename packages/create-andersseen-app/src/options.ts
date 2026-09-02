import { parseArgs } from 'node:util';
import { resolveProjectTarget } from './validation.js';

export interface ResolvedCreateOptions {
  readonly projectName: string;
  readonly packageName: string;
  readonly targetDir: string;
  readonly install: boolean;
  readonly yes: boolean;
  readonly normalizedFrom?: string;
}

export interface ParsedCliOptions {
  readonly help: boolean;
  readonly version: boolean;
  readonly yes: boolean;
  readonly install: boolean;
  readonly projectName?: string;
}

export function parseCliArgs(args: readonly string[]): ParsedCliOptions {
  const parsed = parseArgs({
    args,
    allowPositionals: true,
    options: {
      help: { type: 'boolean', short: 'h' },
      version: { type: 'boolean', short: 'v' },
      yes: { type: 'boolean', short: 'y' },
      'no-install': { type: 'boolean' },
    },
  });

  if (parsed.positionals.length > 1) {
    throw new Error('Expected at most one project name.');
  }

  return {
    help: parsed.values.help === true,
    version: parsed.values.version === true,
    yes: parsed.values.yes === true,
    install: parsed.values['no-install'] !== true,
    projectName: parsed.positionals[0],
  };
}

export function resolveCreateOptions(input: {
  readonly projectName: string;
  readonly cwd?: string;
  readonly install?: boolean;
  readonly yes?: boolean;
}): ResolvedCreateOptions {
  const target = resolveProjectTarget(input.projectName, input.cwd);

  return {
    projectName: target.projectName,
    packageName: target.packageName,
    targetDir: target.targetDir,
    install: input.install ?? true,
    yes: input.yes ?? false,
    normalizedFrom: target.normalized ? target.inputName : undefined,
  };
}
