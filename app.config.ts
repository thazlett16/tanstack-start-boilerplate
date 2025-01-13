import { join } from 'node:path';

import { defineConfig } from '@tanstack/start/config';
import {default as vitePluginTSConfigPaths} from 'vite-plugin-tsconfig-paths'
import tailwindcss from "@tailwindcss/vite";

const startConfig = {
    directory: 'src',
}

export default defineConfig({
    vite: {
        plugins: [
            vitePluginTSConfigPaths({
                projects: ['./tsconfig.json'],
            }),
            tailwindcss(),
        ],
    },
    tsr: {
        appDirectory: startConfig.directory,
        generatedRouteTree: join(startConfig.directory, "route-tree.gen.ts"),
    },
    routers: {
        client: {
            entry: join(startConfig.directory, "entry-client.tsx"),
        },
        api: {
            entry: join(startConfig.directory, "entry-api.ts"),
        },
        ssr: {
            entry: join(startConfig.directory, "entry-ssr.ts"),
        },
    },
    react: {
        babel: {
            plugins: [
                [
                    'babel-plugin-react-compiler',
                    {
                        target: '19',
                    },
                ]
            ],
        }
    },
    server: {
        preset: 'node-server',
        compatibilityDate: '2024-11-28',
    },
});
