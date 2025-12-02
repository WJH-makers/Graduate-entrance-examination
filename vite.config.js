import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  // 采用相对资源路径，避免直接打开 dist/index.html 时空白
  base: './',
  plugins: [react()],
  build: {
    // 启用生产环境优化（使用内置 esbuild，避免额外 terser 依赖）
    minify: 'esbuild',
    esbuild: {
      drop: ['console', 'debugger']
    },
    // 代码分割策略
    rollupOptions: {
      output: {
        manualChunks: {
          // 将React相关库分离
          'react-vendor': ['react', 'react-dom'],
          // 将UI库分离
          'ui-vendor': ['framer-motion', 'lucide-react'],
          // 将数学/图表库分离
          'math-vendor': ['katex', 'mermaid'],
        },
      },
    },
    // 启用源码映射（仅用于调试）
    sourcemap: false,
    // 块大小警告限制
    chunkSizeWarningLimit: 1000,
  },
  // 优化依赖预构建
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
  },
});
