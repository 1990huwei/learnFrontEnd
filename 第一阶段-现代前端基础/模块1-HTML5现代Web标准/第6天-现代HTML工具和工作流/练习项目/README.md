# 第6天 - 现代HTML工具和工作流

## 项目概述

本项目是"第6天-现代HTML工具和工作流"的练习项目，旨在展示现代前端开发的最佳实践和工具链使用。项目集成了Vite、Gulp、代码格式化、质量检查、性能优化等现代开发工具。

## 🚀 项目特性

### 现代构建工具
- **Vite** - 快速的开发服务器和构建工具
- **Gulp** - 任务自动化和工作流管理
- **热重载** - 开发时实时更新
- **模块化开发** - ES6模块支持

### 代码质量保证
- **Prettier** - 代码格式化
- **HTMLHint** - HTML代码检查
- **Stylelint** - CSS/SCSS代码检查
- **EditorConfig** - 编辑器配置统一

### 性能优化
- **资源压缩** - HTML/CSS/JS/图片压缩
- **代码分割** - 按需加载
- **缓存优化** - 文件指纹和缓存策略
- **Core Web Vitals** - 性能指标监控

### 开发体验
- **响应式设计** - 移动端适配
- **无障碍访问** - ARIA标签和键盘导航
- **主题切换** - 明暗主题支持
- **错误处理** - 全局错误捕获和处理

## 📁 项目结构

```
练习项目/
├── src/                    # 源代码目录
│   ├── css/               # 样式文件
│   │   └── main.css       # 主样式文件
│   ├── js/                # JavaScript文件
│   │   └── main.js        # 主脚本文件
│   ├── images/            # 图片资源
│   │   └── logo.svg       # Logo图标
│   └── index.html         # 主页面
├── dist/                  # 构建输出目录
├── node_modules/          # 依赖包
├── .prettierrc            # Prettier配置
├── .htmlhintrc            # HTMLHint配置
├── .stylelintrc.json      # Stylelint配置
├── gulpfile.js            # Gulp任务配置
├── vite.config.js         # Vite配置
├── package.json           # 项目配置和依赖
└── README.md              # 项目说明
```

## 🛠️ 环境准备

### 系统要求
- Node.js 16.0 或更高版本
- npm 7.0 或更高版本
- 现代浏览器（Chrome 90+, Firefox 88+, Safari 14+）

### 安装依赖

```bash
# 进入项目目录
cd 练习项目

# 安装依赖
npm install
```

## 🚀 使用方法

### 开发模式

#### 使用Vite开发服务器（推荐）
```bash
# 启动Vite开发服务器
npm run dev

# 浏览器访问 http://localhost:5173
```

#### 使用Gulp开发服务器
```bash
# 启动Gulp开发服务器
npm run gulp:dev

# 浏览器访问 http://localhost:3000
```

### 生产构建

#### 使用Vite构建
```bash
# Vite生产构建
npm run build

# 预览构建结果
npm run preview
```

#### 使用Gulp构建
```bash
# Gulp生产构建
npm run gulp:build
```

### 代码质量检查

```bash
# HTML代码检查
npm run lint:html

# CSS代码检查
npm run lint:css

# 代码格式化
npm run format

# 代码验证（包含所有检查）
npm run validate
```

### 其他任务

```bash
# 性能分析
npm run analyze

# 创建发布包
npm run package

# 清理构建文件
npm run clean
```

## 📚 练习内容

### 基础练习

1. **工具配置体验**
   - 修改Prettier配置，观察代码格式化效果
   - 调整HTMLHint规则，体验代码检查
   - 配置Stylelint，检查CSS代码质量

2. **开发服务器对比**
   - 分别使用Vite和Gulp启动开发服务器
   - 对比两者的启动速度和热重载效果
   - 观察不同工具的控制台输出

3. **构建流程理解**
   - 执行不同的构建命令
   - 查看生成的dist目录结构
   - 分析构建后的文件大小和优化效果

### 进阶练习

1. **自定义Gulp任务**
   - 添加新的Gulp任务（如SVG优化）
   - 修改现有任务的配置
   - 创建复合任务组合

2. **Vite插件配置**
   - 添加新的Vite插件
   - 配置环境变量
   - 自定义构建选项

3. **代码质量规则**
   - 自定义HTMLHint规则
   - 配置Stylelint规则集
   - 设置Prettier格式化选项

4. **性能优化实践**
   - 分析Core Web Vitals指标
   - 优化资源加载策略
   - 实现代码分割

### 挑战练习

1. **工作流集成**
   - 集成ESLint进行JavaScript代码检查
   - 添加TypeScript支持
   - 配置Git hooks进行代码检查

2. **自动化部署**
   - 配置GitHub Actions
   - 实现自动化测试
   - 设置部署流水线

3. **多环境配置**
   - 配置开发、测试、生产环境
   - 实现环境变量管理
   - 设置不同环境的构建策略

## 🎯 学习要点

### 现代构建工具
- **Vite特性**：快速冷启动、热重载、ES模块支持
- **Gulp优势**：任务流控制、插件生态、灵活配置
- **工具选择**：根据项目需求选择合适的构建工具

### 代码质量保证
- **代码格式化**：统一代码风格，提高可读性
- **代码检查**：发现潜在问题，确保代码质量
- **自动化流程**：集成到开发工作流中

### 性能优化策略
- **资源优化**：压缩、合并、缓存策略
- **加载优化**：懒加载、预加载、代码分割
- **监控指标**：Core Web Vitals、用户体验指标

### 开发体验提升
- **热重载**：实时预览开发效果
- **错误处理**：友好的错误提示和调试信息
- **工具集成**：编辑器插件、命令行工具

## 🔧 工具介绍

### Vite
- **官网**：https://vitejs.dev/
- **特点**：基于ES模块的快速构建工具
- **优势**：开发服务器启动快、热重载效率高

### Gulp
- **官网**：https://gulpjs.com/
- **特点**：基于流的任务自动化工具
- **优势**：灵活的任务配置、丰富的插件生态

### Prettier
- **官网**：https://prettier.io/
- **特点**：代码格式化工具
- **优势**：支持多种语言、配置简单

### HTMLHint
- **官网**：https://htmlhint.com/
- **特点**：HTML代码检查工具
- **优势**：规则丰富、配置灵活

### Stylelint
- **官网**：https://stylelint.io/
- **特点**：CSS代码检查工具
- **优势**：现代CSS支持、可扩展规则

## 📊 性能监控

### Core Web Vitals指标
- **LCP (Largest Contentful Paint)**：最大内容绘制时间
- **FID (First Input Delay)**：首次输入延迟
- **CLS (Cumulative Layout Shift)**：累积布局偏移

### 监控工具
- **Chrome DevTools**：浏览器开发者工具
- **Lighthouse**：性能审计工具
- **Web Vitals Extension**：Chrome扩展

## ❓ 常见问题

### Q: Vite和Gulp有什么区别？
A: Vite专注于快速开发体验，特别适合现代前端框架；Gulp更适合复杂的构建流程和传统项目。

### Q: 如何选择代码检查规则？
A: 建议从推荐配置开始，根据团队需求逐步调整，保持规则的一致性和实用性。

### Q: 性能优化的优先级是什么？
A: 优先关注Core Web Vitals指标，然后是资源大小、加载速度、用户体验。

### Q: 如何处理构建错误？
A: 查看控制台错误信息，检查配置文件，确保依赖安装正确，必要时清理缓存重新构建。

## 🔗 扩展练习

1. **集成测试框架**
   - 添加Jest单元测试
   - 配置Cypress端到端测试
   - 实现测试覆盖率报告

2. **PWA功能**
   - 添加Service Worker
   - 实现离线缓存
   - 配置Web App Manifest

3. **国际化支持**
   - 实现多语言切换
   - 配置语言资源文件
   - 优化SEO多语言支持

4. **微前端架构**
   - 模块联邦配置
   - 组件库开发
   - 跨应用通信

## 📖 学习资源

### 官方文档
- [Vite官方文档](https://vitejs.dev/guide/)
- [Gulp官方文档](https://gulpjs.com/docs/en/getting-started/quick-start)
- [Prettier配置指南](https://prettier.io/docs/en/configuration.html)
- [HTMLHint规则文档](https://htmlhint.com/docs/user-guide/list-rules)
- [Stylelint规则文档](https://stylelint.io/user-guide/rules/list)

### 最佳实践
- [前端工程化最佳实践](https://web.dev/)
- [性能优化指南](https://developers.google.com/web/fundamentals/performance)
- [无障碍访问指南](https://www.w3.org/WAI/WCAG21/quickref/)

### 社区资源
- [Awesome Vite](https://github.com/vitejs/awesome-vite)
- [Gulp插件库](https://gulpjs.com/plugins/)
- [前端工具链对比](https://tool.lu/)

---

## 📝 练习记录

请在完成练习后，记录你的学习心得：

- [ ] 完成基础练习
- [ ] 完成进阶练习
- [ ] 完成挑战练习
- [ ] 理解现代构建工具的优势
- [ ] 掌握代码质量保证方法
- [ ] 学会性能优化策略
- [ ] 提升开发体验和效率

**学习心得**：
```
在这里记录你的学习心得和遇到的问题...
```

**改进建议**：
```
在这里记录你对项目的改进建议...
```