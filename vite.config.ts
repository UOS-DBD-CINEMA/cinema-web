import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, type PluginOption } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    visualizer() as PluginOption,
    tailwindcss(),
  ],
  server: {
    proxy: {
      '^/api': {
        target: 'https://cinema-api.fly.dev',
        changeOrigin: true,
      },
    },
  },
});
