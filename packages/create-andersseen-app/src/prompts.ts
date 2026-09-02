import { cancel, isCancel, text } from '@clack/prompts';

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
