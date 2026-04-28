import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
// import introfyConfig from './introfy.config.js'

// https://vite.dev/config/
export default defineConfig({
  // base: `/${introfyConfig?.app?.github?.repository}/`,
  base: '/',
  plugins: [
    tailwindcss(),
    vue({
      include: [/\.vue$/], // Include .vue files for processing
      exclude: [/\.md$/] // Exclude .md files from being processed by Vue
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
