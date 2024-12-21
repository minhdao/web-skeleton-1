import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ''); // Third argument '' ensures all variables are loaded

  return {
    base: env.BASE_URL,
    build: {
      outDir: 'dist',
    },
    plugins: [react()],
  };
});
