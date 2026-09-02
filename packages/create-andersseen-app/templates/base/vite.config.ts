/// <reference types="vitest" />

import analog from '@analogjs/platform';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: ['es2022'],
  },
  optimizeDeps: {
    exclude: [
      'lumen-icons',
      'lumen-icons/*',
      '@voltui/components',
      '@quartz-headless/core',
      '@quartz-headless/primitives',
    ],
  },
  plugins: [
    analog({
      ssr: true,
    }),
    tailwindcss(),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['test-setup.js'],
  },
});
