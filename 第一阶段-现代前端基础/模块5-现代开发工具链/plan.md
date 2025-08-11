# 模块5：现代开发工具链学习计划

## 模块概述
- **学习时长**: 5天 (第19-23天)
- **每日学习时间**: 2-3小时
- **核心目标**: 掌握现代前端开发工具链，建立高效的开发环境

## 学习目标
- 熟练掌握Vite构建工具和配置
- 理解现代包管理器的使用
- 掌握代码质量工具配置
- 建立完整的开发工作流
- 具备工程化项目搭建能力

## 详细学习计划

### 第19天：Vite构建工具

#### 上午学习 (1.5-2小时)
**理论学习:**
- Vite核心概念和优势
- Vite项目创建和配置
- 开发服务器和热更新
- 插件系统和生态

**Vite基础:**
```bash
# 创建Vite项目
npm create vite@latest my-project
cd my-project
npm install
npm run dev

# 或者使用特定模板
npm create vite@latest my-react-app -- --template react-ts
npm create vite@latest my-vue-app -- --template vue-ts
```

**Vite配置文件:**
```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  
  // 开发服务器配置
  server: {
    port: 3000,
    open: true,
    cors: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  
  // 构建配置
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]'
      }
    }
  },
  
  // 路径别名
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@/components': resolve(__dirname, 'src/components'),
      '@/utils': resolve(__dirname, 'src/utils'),
      '@/types': resolve(__dirname, 'src/types'),
      '@/assets': resolve(__dirname, 'src/assets')
    }
  },
  
  // CSS配置
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    },
    modules: {
      localsConvention: 'camelCase'
    }
  },
  
  // 环境变量
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version)
  }
})
```

**环境变量配置:**
```bash
# .env
VITE_APP_TITLE=My App
VITE_API_BASE_URL=https://api.example.com

# .env.development
VITE_API_BASE_URL=http://localhost:8080
VITE_DEBUG=true

# .env.production
VITE_API_BASE_URL=https://prod-api.example.com
VITE_DEBUG=false
```

```typescript
// src/config/env.ts
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_DEBUG: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

export const config = {
  appTitle: import.meta.env.VITE_APP_TITLE,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  isDebug: import.meta.env.VITE_DEBUG === 'true',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD
}
```

**常用Vite插件:**
```typescript
// 安装常用插件
// npm install -D @vitejs/plugin-react
// npm install -D vite-plugin-eslint
// npm install -D vite-plugin-mock
// npm install -D vite-plugin-windicss

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'
import { viteMockServe } from 'vite-plugin-mock'
import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({
  plugins: [
    react(),
    eslint({
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['node_modules']
    }),
    viteMockServe({
      mockPath: 'mock',
      localEnabled: true,
      prodEnabled: false
    }),
    WindiCSS()
  ]
})
```

#### 下午实践 (1-1.5小时)
**实践任务:**
1. 创建Vite项目并配置
2. 设置开发环境和构建配置
3. 配置路径别名和环境变量
4. 集成常用插件

**项目结构搭建:**
```
my-vite-project/
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── styles/
│   │       ├── variables.scss
│   │       ├── mixins.scss
│   │       └── global.scss
│   ├── components/
│   │   ├── common/
│   │   └── ui/
│   ├── hooks/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── config/
│   │   └── env.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── mock/
├── .env
├── .env.development
├── .env.production
├── vite.config.ts
├── tsconfig.json
└── package.json
```

### 第20天：包管理器和依赖管理

#### 上午学习 (1.5-2小时)
**理论学习:**
- npm、yarn、pnpm对比
- package.json配置详解
- 依赖版本管理
- 锁文件的作用

**现代包管理器:**
```bash
# pnpm - 推荐使用
npm install -g pnpm

# pnpm的优势
# 1. 磁盘空间效率高
# 2. 安装速度快
# 3. 严格的依赖管理
# 4. 支持monorepo

# 基本命令
pnpm install
pnpm add react
pnpm add -D typescript
pnpm remove lodash
pnpm update

# 工作空间
pnpm install -w  # 安装到工作空间根目录
pnpm add react --filter my-app  # 为特定包安装依赖
```

**package.json配置:**
```json
{
  "name": "my-frontend-app",
  "version": "1.0.0",
  "type": "module",
  "description": "Modern frontend application",
  "keywords": ["react", "typescript", "vite"],
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "homepage": "https://github.com/username/repo#readme",
  "repository": {
    "type": "git",
    "url": "https://github.com/username/repo.git"
  },
  "bugs": {
    "url": "https://github.com/username/repo/issues"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=8.0.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext .ts,.tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,css,scss,json}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,css,scss,json}\"",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "prepare": "husky install",
    "clean": "rimraf dist node_modules/.vite",
    "analyze": "vite-bundle-analyzer"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "axios": "^1.3.0",
    "zustand": "^4.3.0",
    "@tanstack/react-query": "^4.24.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.27",
    "@types/react-dom": "^18.0.10",
    "@typescript-eslint/eslint-plugin": "^5.54.0",
    "@typescript-eslint/parser": "^5.54.0",
    "@vitejs/plugin-react": "^3.1.0",
    "eslint": "^8.35.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.3.4",
    "prettier": "^2.8.4",
    "typescript": "^4.9.5",
    "vite": "^4.1.4",
    "vitest": "^0.28.5",
    "husky": "^8.0.3",
    "lint-staged": "^13.1.2"
  },
  "peerDependencies": {
    "react": ">=18.0.0"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

**依赖版本管理:**
```bash
# 版本号规则
# ^1.2.3 - 兼容版本更新 (1.x.x)
# ~1.2.3 - 补丁版本更新 (1.2.x)
# 1.2.3 - 精确版本
# latest - 最新版本
# * - 任意版本

# 查看依赖信息
pnpm list
pnpm list --depth=0
pnpm outdated
pnpm audit

# 更新依赖
pnpm update
pnpm update react
pnpm update --latest

# 依赖分析
npx depcheck  # 检查未使用的依赖
npx npm-check-updates  # 检查可更新的依赖
```

#### 下午实践 (1-1.5小时)
**实践任务:**
1. 配置完整的package.json
2. 设置依赖管理策略
3. 配置脚本命令
4. 建立依赖更新流程

### 第21天：代码质量工具

#### 上午学习 (1.5-2小时)
**理论学习:**
- ESLint配置和规则
- Prettier代码格式化
- TypeScript编译检查
- Git Hooks集成

**ESLint配置:**
```javascript
// .eslintrc.cjs
module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: [
    'react',
    'react-hooks',
    'react-refresh',
    '@typescript-eslint',
    'jsx-a11y',
    'import'
  ],
  rules: {
    // TypeScript规则
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    
    // React规则
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    
    // 通用规则
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    'no-unused-vars': 'off', // 使用TypeScript版本
    'prefer-const': 'error',
    'no-var': 'error',
    
    // 导入规则
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index'
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ],
    'import/no-unresolved': 'error',
    'import/no-cycle': 'error'
  },
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json'
      }
    }
  }
}
```

**Prettier配置:**
```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "quoteProps": "as-needed",
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "avoid",
  "endOfLine": "lf",
  "embeddedLanguageFormatting": "auto",
  "overrides": [
    {
      "files": "*.json",
      "options": {
        "printWidth": 120
      }
    },
    {
      "files": "*.md",
      "options": {
        "printWidth": 100,
        "proseWrap": "always"
      }
    }
  ]
}
```

```
// .prettierignore
dist
node_modules
*.min.js
*.min.css
public
coverage
.next
.nuxt
.vuepress/dist
.serverless
.fusebox
.dynamodb
.tern-port
```

**Git Hooks配置:**
```bash
# 安装husky和lint-staged
pnpm add -D husky lint-staged

# 初始化husky
npx husky install
npm pkg set scripts.prepare="husky install"

# 添加pre-commit hook
npx husky add .husky/pre-commit "npx lint-staged"

# 添加commit-msg hook
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

```json
// package.json中的lint-staged配置
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{css,scss,json,md}": [
      "prettier --write"
    ]
  }
}
```

#### 下午实践 (1-1.5小时)
**实践任务:**
1. 配置ESLint和Prettier
2. 设置Git Hooks
3. 建立代码质量检查流程
4. 集成到开发工作流

### 第22天：开发工作流优化

#### 上午学习 (1.5-2小时)
**理论学习:**
- VS Code配置优化
- 调试配置
- 开发效率工具
- 团队协作配置

**VS Code配置:**
```json
// .vscode/settings.json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true,
  "typescript.updateImportsOnFileMove.enabled": "always",
  
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  },
  
  "files.associations": {
    "*.css": "tailwindcss"
  },
  
  "tailwindCSS.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  },
  
  "css.validate": false,
  "less.validate": false,
  "scss.validate": false
}
```

```json
// .vscode/extensions.json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json",
    "usernamehw.errorlens",
    "gruntfuggly.todo-tree",
    "ms-vscode.vscode-thunder-client"
  ]
}
```

**调试配置:**
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Chrome",
      "request": "launch",
      "type": "chrome",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/src",
      "sourceMapPathOverrides": {
        "webpack:///src/*": "${webRoot}/*"
      }
    },
    {
      "name": "Attach to Chrome",
      "port": 9222,
      "request": "attach",
      "type": "chrome",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```

**开发脚本优化:**
```json
// package.json scripts优化
{
  "scripts": {
    "dev": "vite --host",
    "dev:debug": "vite --host --debug",
    "build": "npm run type-check && vite build",
    "build:analyze": "npm run build && npx vite-bundle-analyzer",
    "preview": "vite preview --host",
    
    "lint": "eslint src --ext .ts,.tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "npm run lint -- --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,css,scss,json}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,css,scss,json}\"",
    
    "type-check": "tsc --noEmit",
    "type-check:watch": "tsc --noEmit --watch",
    
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "test:coverage": "vitest --coverage",
    
    "clean": "rimraf dist node_modules/.vite",
    "clean:all": "rimraf dist node_modules node_modules/.vite",
    "reinstall": "npm run clean:all && npm install",
    
    "check-all": "npm run type-check && npm run lint && npm run format:check && npm run test:run",
    "fix-all": "npm run lint:fix && npm run format"
  }
}
```

#### 下午实践 (1-1.5小时)
**实践任务:**
1. 配置VS Code开发环境
2. 设置调试配置
3. 优化开发脚本
4. 建立团队开发规范

### 第23天：工程化项目实践

#### 上午学习 (1.5-2小时)
**理论学习:**
- 项目模板创建
- CI/CD基础配置
- 性能监控集成
- 部署配置

**项目模板结构:**
```
modern-frontend-template/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
├── .vscode/
│   ├── settings.json
│   ├── extensions.json
│   └── launch.json
├── public/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   └── common/
│   ├── hooks/
│   ├── services/
│   ├── stores/
│   ├── types/
│   ├── utils/
│   ├── styles/
│   └── config/
├── tests/
│   ├── __mocks__/
│   ├── fixtures/
│   └── utils/
├── docs/
├── .env.example
├── .eslintrc.cjs
├── .prettierrc
├── .gitignore
├── vite.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

**GitHub Actions CI配置:**
```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Type check
        run: npm run type-check
      
      - name: Lint
        run: npm run lint
      
      - name: Format check
        run: npm run format:check
      
      - name: Test
        run: npm run test:run
      
      - name: Build
        run: npm run build
      
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        if: matrix.node-version == '18.x'
```

**性能监控配置:**
```typescript
// src/utils/performance.ts
interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
}

class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  
  constructor() {
    this.observeWebVitals();
  }
  
  private observeWebVitals() {
    // 观察Core Web Vitals
    if ('PerformanceObserver' in window) {
      // LCP
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.lcp = lastEntry.startTime;
      }).observe({ entryTypes: ['largest-contentful-paint'] });
      
      // FID
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          this.metrics.fid = entry.processingStart - entry.startTime;
        });
      }).observe({ entryTypes: ['first-input'] });
      
      // CLS
      new PerformanceObserver((entryList) => {
        let clsValue = 0;
        entryList.getEntries().forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        this.metrics.cls = clsValue;
      }).observe({ entryTypes: ['layout-shift'] });
    }
  }
  
  getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }
  
  sendMetrics() {
    // 发送性能数据到分析服务
    if (import.meta.env.PROD) {
      console.log('Performance Metrics:', this.metrics);
      // 实际项目中可以发送到Google Analytics、Sentry等
    }
  }
}

export const performanceMonitor = new PerformanceMonitor();
```

#### 下午实践 (1-1.5小时)
**实践任务:**
1. 创建完整的项目模板
2. 配置CI/CD流程
3. 集成性能监控
4. 编写项目文档

**项目文档模板:**
```markdown
# Modern Frontend Project

## 项目概述
基于Vite + React + TypeScript的现代前端项目模板

## 技术栈
- **构建工具**: Vite 4.x
- **框架**: React 18.x
- **语言**: TypeScript 4.x
- **状态管理**: Zustand
- **路由**: React Router 6.x
- **样式**: Tailwind CSS
- **代码质量**: ESLint + Prettier
- **测试**: Vitest + Testing Library

## 快速开始

### 环境要求
- Node.js >= 18.0.0
- npm >= 8.0.0 (推荐使用pnpm)

### 安装依赖
```bash
pnpm install
```

### 开发
```bash
pnpm dev
```

### 构建
```bash
pnpm build
```

### 测试
```bash
pnpm test
```

## 项目结构
```
src/
├── components/     # 组件
├── hooks/         # 自定义Hooks
├── services/      # API服务
├── stores/        # 状态管理
├── types/         # 类型定义
├── utils/         # 工具函数
└── styles/        # 样式文件
```

## 开发规范
- 使用TypeScript严格模式
- 遵循ESLint和Prettier规则
- 组件使用函数式组件
- 使用自定义Hooks抽象逻辑
- 编写单元测试

## 部署
项目支持多种部署方式：
- Vercel
- Netlify
- GitHub Pages
- Docker
```

## 学习资源

### 官方文档
- [Vite官方文档](https://vitejs.dev/)
- [ESLint配置指南](https://eslint.org/docs/user-guide/configuring/)
- [Prettier配置](https://prettier.io/docs/en/configuration.html)

### 工具和插件
- [Vite插件生态](https://github.com/vitejs/awesome-vite)
- [ESLint规则参考](https://eslint.org/docs/rules/)
- [VS Code扩展推荐](https://marketplace.visualstudio.com/)

## 评估标准

### 技能检查清单
- [ ] 熟练掌握Vite配置和使用
- [ ] 精通现代包管理器使用
- [ ] 能够配置完整的代码质量工具链
- [ ] 掌握开发工作流优化
- [ ] 具备工程化项目搭建能力
- [ ] 理解CI/CD基础概念

### 项目评估标准
**基础要求 (60分):**
- 正确配置Vite项目
- 基本的代码质量工具配置
- 清晰的项目结构

**进阶要求 (80分):**
- 完善的工具链配置
- 良好的开发体验
- 规范的代码质量检查

**优秀标准 (100分):**
- 高度优化的开发工作流
- 完善的CI/CD配置
- 出色的项目文档
- 可复用的项目模板

## 常见问题和解决方案

**Q: Vite开发服务器启动慢怎么办？**
A: 检查依赖预构建配置，排除不必要的依赖，使用SSD硬盘。

**Q: ESLint和Prettier冲突怎么解决？**
A: 使用eslint-config-prettier禁用ESLint中与Prettier冲突的规则。

**Q: 如何优化构建性能？**
A: 使用代码分割、Tree Shaking、压缩优化等技术。

## 下一步学习

完成本模块后，你将具备：
- 现代前端工具链掌握能力
- 高效的开发环境配置技能
- 工程化项目搭建经验
- 团队协作开发规范

**准备进入模块6：React 19基础**
- 确保工具链配置熟练
- 理解现代开发流程
- 为React学习做好准备

---

**记住：工具链是现代前端开发的基础，掌握好工具链将大大提高你的开发效率和代码质量！**