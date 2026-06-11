import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  server: {
    watch: {
      usePolling: true,
    },
  },
  css: {
    devSourcemap: false,
  },
  build: {
    sourcemap: false,
  },
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
  ],
})