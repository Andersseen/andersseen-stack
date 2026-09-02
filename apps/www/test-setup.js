import { expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import { setupTestBed } from '@analogjs/vitest-angular/setup-testbed';

expect.extend(matchers);

const createMatchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener: () => undefined,
  removeEventListener: () => undefined,
  addListener: () => undefined,
  removeListener: () => undefined,
  dispatchEvent: () => false,
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: createMatchMedia,
});

setupTestBed();
