import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import vitePluginCopyMarkdownPages from './plugins/markdown-pages.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    vue({
      include: [/\.vue$/], // Include .vue files for processing
      exclude: [/\.md$/] // Exclude .md files from being processed by Vue
    }),
    vueDevTools(),
    vitePluginCopyMarkdownPages({
      sourceDirectory: 'src/pages',
      destinationDirectory: 'dist/pages'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
