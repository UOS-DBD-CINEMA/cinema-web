import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv, type PluginOption } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    plugins: [
      react(),
      tsconfigPaths(),
      visualizer() as PluginOption,
      tailwindcss(),
    ],
    server: {
      proxy: {
        '^/api': {
          target: env.SERVER_BASE_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '/api'),
        },
      },
    },
  });
};
