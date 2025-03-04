/// <reference types="vitest" />
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

const r = (...args: string[]) => resolve(dirname(fileURLToPath(import.meta.url)), ...args)

// eslint-disable-next-line node/prefer-global/process
const host = process.env.TAURI_DEV_HOST

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${r('src')}/`, // 设置别名 `~/` 为 `src/` 目录
    },
  },

  plugins: [
    UnoCSS(), // https://unocss.dev/integrations/vite#react
    react(),
  ],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: 'ws',
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ['**/src-tauri/**', '**/src/libs/**'],
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    exclude: ['src/libs/**'],
    setupFiles: ['./src/test/setup.tsx'],
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['html'],
      include: ['src/**/*.{js,jsx,ts,tsx}'],
    },
  },
  build: {
    emptyOutDir: true,
    cssCodeSplit: true,
    minify: 'terser', // 使用 Terser 进行代码压缩
    sourcemap: false, // 不生成源映射文件
    terserOptions: {
      mangle: true, // 是否混淆变量名
      compress: {
        drop_console: false, // 删除 console 语句
        drop_debugger: true, // 删除 debugger 语句
        // pure_funcs: ['console.log'], // 删除特定的函数调用，如 console.log
      },
      format: {
        comments: false, // 是否保留注释
      },
    },
  },
})
