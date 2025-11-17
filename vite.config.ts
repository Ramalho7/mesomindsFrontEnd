/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import viteReact from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [
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
    include: ['src/__tests__/**/*.test.ts', 'src/__tests__/**/*.test.tsx'],
    exclude: ['node_modules', 'dist', 'src/**/*.stories.@(js|jsx|ts|tsx)'],
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
    chunkSizeWarningLimit: 1000,
  },
});