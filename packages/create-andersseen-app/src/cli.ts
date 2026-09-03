import { readFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { intro, log, outro, spinner } from '@clack/prompts';
import { createApp } from './create-app.js';
import { parseCliArgs, resolveCreateOptions } from './options.js';
import { promptAppShape, promptProjectName } from './prompts.js';

const packageRoot = dirname(dirname(fileURLToPath(import.meta.url)));

export async function runCli(args = process.argv.slice(2)): Promise<void> {
  try {
    const parsed = parseCliArgs(args);

    if (parsed.help) {
      console.log(helpText());
      return;
    }

    if (parsed.version) {
      console.log(await readPackageVersion());
      return;
    }

    intro('create-andersseen-app');

    const projectName = parsed.projectName ?? (parsed.yes ? undefined : await promptProjectName());

    if (!projectName) {
      throw new Error('Project name is required. Pass it as an argument or omit --yes to be prompted.');
    }

    const shape = parsed.shape ?? (parsed.yes ? undefined : await promptAppShape());

    const options = resolveCreateOptions({
      projectName,
      install: parsed.install,
      yes: parsed.yes,
      shape,
    });

    if (options.normalizedFrom) {
      log.info(`Using "${options.projectName}" for project name.`);
    }

    const s = spinner();
    s.start('Creating application');
    const result = await createApp(options);
    s.stop(`Created ${options.projectName}`);

    if (result.installFailed) {
      log.warn('Dependency installation failed. The project files were generated successfully.');
    }

    outro(nextSteps(options.targetDir, result.installed));
  } catch (error) {
    if (error instanceof Error && error.message === 'CREATE_ANDERSSEEN_APP_CANCELLED') {
      return;
    }

    const message = error instanceof Error ? error.message : String(error);
    log.error(message);
    process.exitCode = 1;
  }
}

function helpText(): string {
  return `Usage: pnpm create andersseen-app [project-name] [options]

Create a new Andersseen Stack application.

Options:
  -h, --help              Show help
  -v, --version           Show version
  -y, --yes               Accept safe defaults (shape defaults to "dashboard")
      --no-install        Generate files without running pnpm install
      --shape <shape>     "minimal", "dashboard" or "landing" (default: dashboard)`;
}

async function readPackageVersion(): Promise<string> {
  const manifestPath = join(packageRoot, 'package.json');
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8')) as { version?: string };
  return manifest.version ?? '0.0.0';
}

function nextSteps(targetDir: string, installed: boolean): string {
  const target = relative(process.cwd(), targetDir) || '.';
  const commands = installed ? [`cd ${target}`, 'pnpm dev'] : [`cd ${target}`, 'pnpm install', 'pnpm dev'];

  return `Next steps:

  ${commands.join('\n  ')}`;
}
