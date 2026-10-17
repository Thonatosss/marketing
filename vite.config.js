import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        thanks: resolve(import.meta.dirname, 'thanks.html'),
        policy: resolve(import.meta.dirname, 'policy.html'),
      },
    },
  },
  css: { preprocessorOptions: { scss: { quietDeps: true, silenceDeprecations: ['import'] } } },
});
