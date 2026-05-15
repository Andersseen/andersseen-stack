/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
    alias: {
      '@app': resolve(__dirname, 'src/app'),
      '@components': resolve(__dirname, 'src/app/components'),
      '@demos': resolve(__dirname, 'src/app/demos'),
      '@content': resolve(__dirname, 'src/content'),
      '@test': resolve(__dirname, 'src/test'),
    },
  },
  plugins: [
    analog({
      ssr: false,
      static: true,
      prerender: {
        routes: [
          '/',
          '/volt-ui',
          '/quartz',
          '/angular-movement',
          '/lumen-icons',
          '/docs',
        ],
      },
      nitro: {
        preset: 'cloudflare-pages',
      },
    }),
    tailwindcss(),
  ],

});
