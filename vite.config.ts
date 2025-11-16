/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import viteReact from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import { resolve } from 'node:path';
import { nitroV2Plugin } from '@tanstack/nitro-v2-vite-plugin'; // Reintroduzindo o plugin para SSR
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    nitroV2Plugin(), 
    TanStackRouterVite({
      autoCodeSplitting: true,
    }),
    viteReact(),
    tailwindcss(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    deps: {
      inline: ['crypto-browserify'],
    },
    projects: [
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  esbuild: {
    logOverride: { console: 'silent' },
  },
  define: {
    'process.env': {},
  },
  optimizeDeps: {
    exclude: ['console'],
    include: ['react', 'react-dom', '@storybook/react'],
  },
  build: {
    ssr: true,
    rollupOptions: {
      input: './src/entry-server.tsx', 
    },
    chunkSizeWarningLimit: 1000,
  },
});