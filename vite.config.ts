import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // Loads environment variables from .env file or system (GitHub Actions secrets)
    const env = loadEnv(mode, process.cwd(), '');

    return {
        // IMPORTANT: Replace 'repo-name' with your actual GitHub repository name.
        // If your repo is https://github.com/user/my-app, this should be '/my-app/'
        base: '/repo-name/', 

        server: {
            port: 3000,
            host: '0.0.0.0',
        },
        plugins: [react()],
        define: {
            // This injects the key from GitHub Secrets into the build
            'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
            'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, '.'),
            }
        }
    };
});
