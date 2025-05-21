import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from 'path' // need install @types/node
import legacy from '@vitejs/plugin-legacy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy({
      targets: ["ie>11"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"], //解决跨域警告
    })
  ],
  base: './',
  build: {
    target: ['es2015', 'chrome63'], // 默认是modules,更改这个会去输出兼容浏览器
    assetsInlineLimit: 4096 // < 4KB的文件转base64
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets')
    }
  }
});
