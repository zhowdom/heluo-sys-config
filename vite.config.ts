import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import path from 'path' // need install @types/node
import legacy from '@vitejs/plugin-legacy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 自动导入Ant Design Vue相关函数
    AutoImport({
      resolvers: [AntDesignVueResolver()]
    }),
    // 自动导入Ant Design Vue组件
    Components({
      resolvers: [
        // 配置Ant Design Vue组件解析器
        AntDesignVueResolver({
          // 自动引入相关样式，false表示不引入全部样式
          importStyle: 'less',
          // 自动导入图标组件
          resolveIcons: true  // 开启图标自动导入
        })
      ]
    }),
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
