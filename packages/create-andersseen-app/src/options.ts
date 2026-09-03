import { parseArgs } from 'node:util';
import { resolveProjectTarget } from './validation.js';

export type AppShape = 'minimal' | 'dashboard' | 'landing';

export const APP_SHAPES: readonly AppShape[] = ['minimal', 'dashboard', 'landing'];

/**
 * Dashboard is the default: Andersseen Stack aims to resolve applications,
 * not just replace `create analog`. No prior `--yes` consumers depend on
 * the previous implicit behavior (this creator is unreleased, 0.0.0).
 */
export const DEFAULT_APP_SHAPE: AppShape = 'dashboard';

export interface ResolvedCreateOptions {
  readonly projectName: string;
  readonly packageName: string;
  readonly targetDir: string;
  readonly install: boolean;
  readonly yes: boolean;
  readonly shape: AppShape;
  readonly normalizedFrom?: string;
}

export interface ParsedCliOptions {
  readonly help: boolean;
  readonly version: boolean;
  readonly yes: boolean;
  readonly install: boolean;
  readonly projectName?: string;
  readonly shape?: AppShape;
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
      shape: { type: 'string' },
    },
  });

  if (parsed.positionals.length > 1) {
    throw new Error('Expected at most one project name.');
  }

  const shapeValue = parsed.values.shape;

  if (shapeValue !== undefined && !isAppShape(shapeValue)) {
    throw new Error(`Invalid --shape "${shapeValue}". Expected one of: ${APP_SHAPES.join(', ')}.`);
  }

  return {
    help: parsed.values.help === true,
    version: parsed.values.version === true,
    yes: parsed.values.yes === true,
    install: parsed.values['no-install'] !== true,
    projectName: parsed.positionals[0],
    shape: shapeValue,
  };
}

export function resolveCreateOptions(input: {
  readonly projectName: string;
  readonly cwd?: string;
  readonly install?: boolean;
  readonly yes?: boolean;
  readonly shape?: AppShape;
}): ResolvedCreateOptions {
  const target = resolveProjectTarget(input.projectName, input.cwd);

  return {
    projectName: target.projectName,
    packageName: target.packageName,
    targetDir: target.targetDir,
    install: input.install ?? true,
    yes: input.yes ?? false,
    shape: input.shape ?? DEFAULT_APP_SHAPE,
    normalizedFrom: target.normalized ? target.inputName : undefined,
  };
}

function isAppShape(value: string): value is AppShape {
  return (APP_SHAPES as readonly string[]).includes(value);
}
