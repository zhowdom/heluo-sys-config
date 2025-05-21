import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from 'path' // need install @types/node
import legacy from '@vitejs/plugin-legacy'
import fs from 'fs'

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
    assetsInlineLimit: 4096, // < 4KB的文件转base64
    rollupOptions: {
      plugins: [
        {
          name: 'preserve-public-folder',
          generateBundle() {
            // 复制整个 public 文件夹到 dist/public
            // [注意这里遗留一个小问题，就是目标已经达成，原样复制输出了public目录，但和index.html同级，也有一个同样的config.js文件，雷同了，怎么去掉这个，还没研究。。。后续再看，目前不影响就是多了个自定义的重复的配置config。js文件]
            fs.cpSync(
              path.resolve(__dirname, 'public'),
              path.resolve(__dirname, 'dist/public'),
              { recursive: true }
            )
          }
        }
      ]
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets')
    }
  }
});
