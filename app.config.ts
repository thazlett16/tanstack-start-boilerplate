import { defineConfig } from '@tanstack/start/config';
import {default as vitePluginTSConfigPaths} from 'vite-plugin-tsconfig-paths'

export default defineConfig({
    // routers: {
    //
    // },
    // tsr: {
    //
    // },
    vite: {
        plugins: [
            vitePluginTSConfigPaths({
                projects: ['./tsconfig.json'],
            }),
        ],
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
    }
});
