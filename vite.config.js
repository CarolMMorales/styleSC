// import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VueI18nPlugin({ 
      runtimeOnly: false,
      include: ['./src/locales/**'], 
      jitCompilation: true,
    }),
  ],
  resolve: {
    alias: {
      '@': '/src', // Ruta base de tu aplicación
    },
  }
})
// 