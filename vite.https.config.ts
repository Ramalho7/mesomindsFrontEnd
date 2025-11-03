import { defineConfig } from 'vite';
import viteReact from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import { resolve } from 'node:path';
import { nitroV2Plugin } from '@tanstack/nitro-v2-vite-plugin';
import fs from 'fs';

export default defineConfig({
    plugins: [
        nitroV2Plugin(),
        TanStackRouterVite({ autoCodeSplitting: true }),
        viteReact(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
    server: {
        https: {
            key: fs.readFileSync('./mesominds.com+5-key.pem'),
            cert: fs.readFileSync('./mesominds.com+5.pem'),
        },
        port: 3000,
        host: '0.0.0.0', 
    },
});