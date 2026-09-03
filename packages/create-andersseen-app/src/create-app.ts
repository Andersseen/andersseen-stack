import { spawn } from 'node:child_process';
import {
  assertTargetAvailable,
  createStagingDir,
  moveRenderedTemplate,
  removeGeneratedPath,
  renderTemplate,
} from './filesystem.js';
import type { AppShape } from './options.js';

export interface CreateAppOptions {
  readonly projectName: string;
  readonly packageName: string;
  readonly targetDir: string;
  readonly install: boolean;
  readonly shape: AppShape;
}

export interface CreateAppResult {
  readonly targetDir: string;
  readonly installed: boolean;
  readonly installFailed: boolean;
}

export async function createApp(options: CreateAppOptions): Promise<CreateAppResult> {
  const availability = await assertTargetAvailable(options.targetDir);
  const stagingDir = await createStagingDir(options.targetDir);
  let movedToTarget = false;

  try {
    await renderTemplate(stagingDir, {
      projectName: options.projectName,
      packageName: options.packageName,
      shape: options.shape,
    });

    await moveRenderedTemplate(stagingDir, options.targetDir);
    movedToTarget = true;
  } catch (error) {
    await removeGeneratedPath(stagingDir);

    if (!availability.existed && !movedToTarget) {
      await removeGeneratedPath(options.targetDir);
    }

    throw error;
  }

  if (!options.install) {
    return { targetDir: options.targetDir, installed: false, installFailed: false };
  }

  const installed = await installDependencies(options.targetDir);

  return {
    targetDir: options.targetDir,
    installed,
    installFailed: !installed,
  };
}

function installDependencies(cwd: string): Promise<boolean> {
  return new Promise((resolve) => {
    const child = spawn('pnpm', ['install'], {
      cwd,
      shell: false,
      stdio: 'inherit',
    });

    child.on('error', () => resolve(false));
    child.on('exit', (code) => resolve(code === 0));
  });
}
