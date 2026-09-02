export const STACK_PACKAGE_NAME = '@andersseen/stack';

export const STACK_INIT_SCOPE = [
  'detect Angular or Analog projects',
  'install Andersseen core libraries',
  'apply minimum integration configuration',
] as const;

export const OUT_OF_SCOPE = [
  'new application generation',
  'dashboard or landing generators',
  'auth, database, billing or deploy provider setup',
] as const;
