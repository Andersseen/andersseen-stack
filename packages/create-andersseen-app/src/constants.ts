export const CREATE_PACKAGE_NAME = 'create-andersseen-app';

export const packageManager = 'pnpm@10.30.1';

export const versions = {
  analog: '2.5.1',
  angular: '21.2.14',
  angularAnimations: '21.2.14',
  angularBuild: '21.2.14',
  angularCdk: '21.2.14',
  angularCli: '21.2.14',
  clack: '^1.7.0',
  jsdom: '22.1.0',
  lumen: '0.2.0',
  nodeTypes: '22.15.0',
  pnpm: '10.30.1',
  quartz: '0.4.0',
  rxjs: '7.8.2',
  tailwind: '4.3.3',
  testingLibraryAngular: '17.2.0',
  testingLibraryJestDom: '6.6.3',
  testingLibraryUserEvent: '14.6.1',
  tslib: '2.8.1',
  typescript: '~5.9.0',
  vite: '8.2.2',
  vitest: '4.1.11',
  volt: '1.0.1',
} as const;

export const compatibilityNotes = [
  'Angular ^21.2.0 satisfies Volt UI 1.0.1 peer dependencies; @angular/cdk is pinned to Angular 21 for ng-primitives compatibility.',
  'Analog ^2.5.1 matches the current workspace baseline and supports Vite 8 and Vitest 4.',
  'Tailwind CSS 4 is wired through @tailwindcss/vite and Volt default theme CSS.',
  'Angular Movement and Etyma are intentionally not installed in the base starter.',
] as const;
