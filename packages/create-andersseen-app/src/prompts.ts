import { cancel, isCancel, select, text } from '@clack/prompts';
import type { AppShape } from './options.js';

export async function promptProjectName(): Promise<string> {
  const value = await text({
    message: 'Project name?',
    placeholder: 'my-app',
    validate(input) {
      if (!input?.trim()) {
        return 'Enter a project name.';
      }

      return undefined;
    },
  });

  if (isCancel(value)) {
    cancel('Operation cancelled.');
    process.exitCode = 130;
    throw new Error('CREATE_ANDERSSEEN_APP_CANCELLED');
  }

  return value;
}

export async function promptAppShape(): Promise<AppShape> {
  const value = await select<AppShape>({
    message: 'What are you building?',
    initialValue: 'dashboard',
    options: [
      { value: 'dashboard', label: 'Dashboard', hint: 'AppShell — sidebar, navbar and routed pages' },
      { value: 'landing', label: 'Landing', hint: 'Public shell — navbar, hero, content section and footer' },
      { value: 'minimal', label: 'Minimal', hint: "Today's single-page starter" },
    ],
  });

  if (isCancel(value)) {
    cancel('Operation cancelled.');
    process.exitCode = 130;
    throw new Error('CREATE_ANDERSSEEN_APP_CANCELLED');
  }

  return value;
}
