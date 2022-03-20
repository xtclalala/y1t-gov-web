import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
// @ts-ignore
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 配置导包使用的快捷方式
      '@': resolve('./src'),
      '@r': resolve('./src/router'),
      '#': resolve('./types'),
    },
  },
  base: './',
  server: {
    // 前端端口
    port: 3000,
    host: '0.0.0.0',
    proxy: {
      // '^/y1t': {
      '^/mock': {
        target: 'http://127.0.0.1:4523',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mock/, '/mock'),
      },
      '^/7lk': {
        target: 'ws://127.0.0.1:8080',
        ws: true,
        rewrite: (path) => path.replace(/^\/7lk/, ''),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/styles/main.scss";',
      },
    },
  },

  build: {
    assetsDir: './',

    terserOptions: {
      compress: {
        // eslint-disable-next-line camelcase
        drop_console: true,
        // eslint-disable-next-line camelcase
        drop_debugger: true,
      },
    },
  },
})
