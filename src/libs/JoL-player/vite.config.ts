import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { visualizer } from 'rollup-plugin-visualizer'
import * as path from 'node:path';

// 判断是否是库模式
const isLib = process.env.BUILD === 'lib'

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
      },
    }),
    visualizer({ open: false }), // 可选：打包体积分析
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    sourcemap: !isLib ? 'inline' : false,
    lib: isLib
      ? {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'JolPlayer',
        fileName: () => 'jol-player.js',
        formats: ['cjs'],
      }
      : undefined,
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    outDir: isLib ? 'dist' : 'dist-dev',
    emptyOutDir: true,
  },
  server: {
    open: true,
    port: 9000,
  },
})
