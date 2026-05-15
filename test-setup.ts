import { expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import { setupTestBed } from '@analogjs/vitest-angular/setup-testbed';

expect.extend(matchers);
setupTestBed();
