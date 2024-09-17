// vite.config.js
import { defineConfig } from "file:///C:/Users/lauvm/Documents/GitHub/styleSC/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/lauvm/Documents/GitHub/styleSC/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///C:/Users/lauvm/Documents/GitHub/styleSC/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import VueI18nPlugin from "file:///C:/Users/lauvm/Documents/GitHub/styleSC/node_modules/@intlify/unplugin-vue-i18n/lib/vite.mjs";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VueI18nPlugin({
      runtimeOnly: false,
      include: ["./src/locales/**"],
      jitCompilation: true
    })
  ],
  resolve: {
    alias: {
      "@": "/src"
      // Ruta base de tu aplicación
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxsYXV2bVxcXFxEb2N1bWVudHNcXFxcR2l0SHViXFxcXHN0eWxlU0NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGxhdXZtXFxcXERvY3VtZW50c1xcXFxHaXRIdWJcXFxcc3R5bGVTQ1xcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvbGF1dm0vRG9jdW1lbnRzL0dpdEh1Yi9zdHlsZVNDL3ZpdGUuY29uZmlnLmpzXCI7Ly8gaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXHJcblxyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4J1xyXG5pbXBvcnQgVnVlSTE4blBsdWdpbiBmcm9tICdAaW50bGlmeS91bnBsdWdpbi12dWUtaTE4bi92aXRlJztcclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICB2dWUoKSxcclxuICAgIHZ1ZUpzeCgpLFxyXG4gICAgVnVlSTE4blBsdWdpbih7IFxyXG4gICAgICBydW50aW1lT25seTogZmFsc2UsXHJcbiAgICAgIGluY2x1ZGU6IFsnLi9zcmMvbG9jYWxlcy8qKiddLCBcclxuICAgICAgaml0Q29tcGlsYXRpb246IHRydWUsXHJcbiAgICB9KSxcclxuICBdLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAJzogJy9zcmMnLCAvLyBSdXRhIGJhc2UgZGUgdHUgYXBsaWNhY2lcdTAwRjNuXHJcbiAgICB9LFxyXG4gIH1cclxufSlcclxuLy8gIl0sCiAgIm1hcHBpbmdzIjogIjtBQUVBLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxtQkFBbUI7QUFFMUIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osT0FBTztBQUFBLElBQ1AsY0FBYztBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2IsU0FBUyxDQUFDLGtCQUFrQjtBQUFBLE1BQzVCLGdCQUFnQjtBQUFBLElBQ2xCLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLO0FBQUE7QUFBQSxJQUNQO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
