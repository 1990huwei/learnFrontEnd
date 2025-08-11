import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // 项目根目录
  root: 'src',
  
  // 开发服务器配置
  server: {
    port: 3000,
    open: true,
    host: true,
    cors: true
  },
  
  // 构建配置
  build: {
    // 输出目录
    outDir: '../dist',
    // 清空输出目录
    emptyOutDir: true,
    // 生成源码映射
    sourcemap: true,
    // 资源内联阈值
    assetsInlineLimit: 4096,
    // Rollup配置
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        about: resolve(__dirname, 'src/about.html'),
        contact: resolve(__dirname, 'src/contact.html'),
        blog: resolve(__dirname, 'src/blog.html')
      },
      output: {
        // 静态资源文件名格式
        assetFileNames: 'assets/[name]-[hash][extname]',
        // JS文件名格式
        chunkFileNames: 'js/[name]-[hash].js',
        // 入口文件名格式
        entryFileNames: 'js/[name]-[hash].js'
      }
    },
    // 压缩配置
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  
  // CSS配置
  css: {
    // 开发时生成源码映射
    devSourcemap: true,
    // PostCSS配置
    postcss: {
      plugins: [
        require('autoprefixer'),
        require('cssnano')({
          preset: 'default'
        })
      ]
    }
  },
  
  // 静态资源处理
  assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.webp'],
  
  // 预览服务器配置
  preview: {
    port: 4173,
    open: true,
    host: true
  },
  
  // 环境变量配置
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString())
  },
  
  // 插件配置
  plugins: [
    // HTML处理插件
    {
      name: 'html-transform',
      transformIndexHtml(html) {
        return html.replace(
          /<title>(.*?)<\/title>/,
          `<title>$1 - 现代HTML工作流</title>`
        );
      }
    }
  ],
  
  // 优化配置
  optimizeDeps: {
    include: ['normalize.css']
  }
});