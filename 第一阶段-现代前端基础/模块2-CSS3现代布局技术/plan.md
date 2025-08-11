# 模块2：CSS3+现代布局技术学习计划

## 模块概述
- **学习时长**: 6天 (第6-11天)
- **每日学习时间**: 2-3小时
- **核心目标**: 掌握CSS3现代布局技术、响应式设计和CSS工程化实践

## 学习目标
- 精通CSS3新特性和高级选择器
- 熟练掌握Flexbox和Grid布局系统
- 能够实现现代响应式设计
- 掌握CSS工程化和最佳实践
- 具备创建美观、高性能CSS代码的能力

## 详细学习计划

### 第6天：CSS3基础和选择器

#### 上午学习 (1-1.5小时)
**理论学习:**
- CSS3新特性概览
- 高级选择器和伪类
- CSS变量(Custom Properties)
- 现代CSS重置和标准化

**核心选择器学习:**
```css
/* 属性选择器 */
[data-theme="dark"] { }
input[type="email"]:focus { }

/* 伪类选择器 */
:nth-child(odd) { }
:nth-of-type(2n+1) { }
:not(.excluded) { }
:has(.child-element) { }

/* 伪元素 */
::before, ::after { }
::first-line, ::first-letter { }
::placeholder { }
::selection { }
```

**CSS变量应用:**
```css
:root {
  /* 颜色系统 */
  --primary-color: #3b82f6;
  --secondary-color: #64748b;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --error-color: #ef4444;
  
  /* 间距系统 */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* 字体系统 */
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
}

/* 使用变量 */
.button {
  background-color: var(--primary-color);
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-base);
}
```

#### 下午实践 (1-1.5小时)
**实践任务:**
1. 为个人网站创建CSS变量系统
2. 实现深色/浅色主题切换
3. 使用高级选择器优化样式
4. 创建现代CSS重置样式

**主题切换实现:**
```css
/* 浅色主题 */
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
}

/* 深色主题 */
[data-theme="dark"] {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

### 第7天：Flexbox布局

#### 上午学习 (1-1.5小时)
**理论学习:**
- Flexbox模型和概念
- 主轴和交叉轴理解
- Flex容器和项目属性
- 常见布局模式

**Flexbox属性详解:**
```css
/* 容器属性 */
.flex-container {
  display: flex;
  flex-direction: row | row-reverse | column | column-reverse;
  flex-wrap: nowrap | wrap | wrap-reverse;
  flex-flow: <flex-direction> <flex-wrap>;
  justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;
  align-items: stretch | flex-start | flex-end | center | baseline;
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}

/* 项目属性 */
.flex-item {
  order: <integer>;
  flex-grow: <number>;
  flex-shrink: <number>;
  flex-basis: <length> | auto;
  flex: <flex-grow> <flex-shrink> <flex-basis>;
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

#### 下午实践 (1-1.5小时)
**实践任务:**
1. 创建响应式导航栏
2. 实现卡片布局系统
3. 构建圣杯布局
4. 制作居中对齐组件

**响应式导航栏:**
```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md) var(--spacing-lg);
  background-color: var(--bg-secondary);
}

.nav-brand {
  font-size: var(--font-size-xl);
  font-weight: bold;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: var(--spacing-lg);
  margin: 0;
  padding: 0;
}

.nav-link {
  text-decoration: none;
  color: var(--text-primary);
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: var(--primary-color);
}

/* 移动端适配 */
@media (max-width: 768px) {
  .nav-menu {
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: var(--bg-secondary);
    padding: var(--spacing-md);
    transform: translateY(-100%);
    opacity: 0;
    transition: all 0.3s ease;
  }
  
  .nav-menu.active {
    transform: translateY(0);
    opacity: 1;
  }
}
```

### 第8天：Grid布局

#### 上午学习 (1-1.5小时)
**理论学习:**
- CSS Grid基础概念
- 网格容器和项目
- 网格线、轨道和区域
- Grid与Flexbox的区别和应用场景

**Grid属性详解:**
```css
/* 容器属性 */
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr) | 200px 1fr 100px | minmax(200px, 1fr);
  grid-template-rows: repeat(3, 100px) | auto 1fr auto;
  grid-template-areas: 
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  gap: 1rem;
  grid-auto-columns: 1fr;
  grid-auto-rows: minmax(100px, auto);
  grid-auto-flow: row | column | dense;
}

/* 项目属性 */
.grid-item {
  grid-column: 1 / 3 | span 2;
  grid-row: 1 / 3 | span 2;
  grid-area: header | 1 / 1 / 2 / 3;
  justify-self: start | end | center | stretch;
  align-self: start | end | center | stretch;
}
```

#### 下午实践 (1-1.5小时)
**实践任务:**
1. 创建复杂页面布局
2. 实现响应式网格系统
3. 构建卡片网格布局
4. 制作图片画廊

**响应式网格布局:**
```css
.page-layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  gap: var(--spacing-md);
}

.header { grid-area: header; }
.nav { grid-area: nav; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }

/* 平板适配 */
@media (max-width: 1024px) {
  .page-layout {
    grid-template-areas:
      "header header"
      "nav main"
      "footer footer";
    grid-template-columns: 150px 1fr;
  }
  
  .aside {
    display: none;
  }
}

/* 手机适配 */
@media (max-width: 768px) {
  .page-layout {
    grid-template-areas:
      "header"
      "nav"
      "main"
      "footer";
    grid-template-columns: 1fr;
  }
}
```

### 第9天：响应式设计进阶

#### 上午学习 (1-1.5小时)
**理论学习:**
- 移动优先设计原则
- 媒体查询高级技巧
- 流体排版和间距系统
- 现代CSS函数应用

**现代CSS函数:**
```css
/* clamp() - 流体排版 */
.title {
  font-size: clamp(1.5rem, 4vw, 3rem);
}

/* min() 和 max() */
.container {
  width: min(90%, 1200px);
  padding: max(1rem, 3vw);
}

/* calc() 高级应用 */
.sidebar {
  width: calc(25% - var(--gap) / 2);
  height: calc(100vh - var(--header-height));
}

/* 自定义属性与函数结合 */
:root {
  --fluid-spacing: clamp(1rem, 3vw, 2rem);
  --container-width: min(90%, 1200px);
}
```

#### 下午实践 (1-1.5小时)
**实践任务:**
1. 实现完全响应式的页面布局
2. 创建流体排版系统
3. 优化移动端用户体验
4. 测试多设备兼容性

### 第10天：CSS架构和组织

#### 上午学习 (1-1.5小时)
**理论学习:**
- CSS架构方法论(BEM, OOCSS, SMACSS)
- 组件化CSS设计
- CSS预处理器(Sass/SCSS)
- 样式组织和命名规范

**BEM命名规范:**
```css
/* Block Element Modifier */
.card { }
.card__header { }
.card__body { }
.card__footer { }
.card--featured { }
.card--large { }
.card__title--highlighted { }

/* 实际应用 */
.button {
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.button--primary {
  background-color: var(--primary-color);
  color: white;
}

.button--secondary {
  background-color: var(--secondary-color);
  color: white;
}

.button--large {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--font-size-lg);
}
```

#### 下午实践 (1-1.5小时)
**实践任务:**
1. 重构CSS代码结构
2. 应用BEM命名规范
3. 创建组件化样式系统
4. 建立样式指南

### 第11天：CSS工具链

#### 上午学习 (1-1.5小时)
**理论学习:**
- PostCSS和现代CSS工具链
- CSS性能优化技巧
- 浏览器兼容性处理
- CSS调试和开发工具

**PostCSS配置:**
```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-nested'),
    require('postcss-custom-properties'),
    require('cssnano')({
      preset: 'default',
    }),
  ],
}
```

#### 下午实践 (1-1.5小时)
**实践任务:**
1. 设置PostCSS编译环境
2. 优化CSS性能和文件大小
3. 解决浏览器兼容性问题
4. 建立CSS开发工作流

## 学习资源

### 官方文档
- [MDN CSS文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS)
- [CSS Grid完整指南](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Flexbox完整指南](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

### 学习平台
- [CSS Grid Garden](https://cssgridgarden.com/)
- [Flexbox Froggy](https://flexboxfroggy.com/)
- [CSS Diner](https://flukeout.github.io/)

### 工具和资源
- [Can I Use](https://caniuse.com/) - 浏览器兼容性查询
- [CSS Gradient](https://cssgradient.io/) - 渐变生成器
- [Clippy](https://bennettfeely.com/clippy/) - CSS clip-path生成器

### 设计系统参考
- [Material Design](https://material.io/design)
- [Ant Design](https://ant.design/)
- [Tailwind CSS](https://tailwindcss.com/)

## 评估标准

### 技能检查清单
- [ ] 熟练掌握CSS3新特性和高级选择器
- [ ] 精通Flexbox和Grid布局系统
- [ ] 能够实现完全响应式设计
- [ ] 掌握CSS变量和现代函数
- [ ] 具备CSS架构和组织能力
- [ ] 了解CSS性能优化技巧

### 项目评估标准
**基础要求 (60分):**
- 正确使用Flexbox和Grid布局
- 实现基本的响应式设计
- 代码结构清晰，命名规范

**进阶要求 (80分):**
- 完善的响应式设计
- 优秀的CSS架构和组织
- 良好的性能优化

**优秀标准 (100分):**
- 创新的布局设计
- 完美的多设备适配
- 出色的用户体验
- 可维护的代码结构

### 实践项目

**项目1: 响应式个人网站样式**
- 使用CSS变量创建主题系统
- 实现Flexbox导航和Grid布局
- 完全响应式设计
- 深色/浅色主题切换

**项目2: 组件库样式系统**
- 按钮、卡片、表单组件
- BEM命名规范
- 可复用的样式模块
- 完整的样式指南

## 常见问题和解决方案

**Q: 什么时候使用Flexbox，什么时候使用Grid？**
A: Flexbox适合一维布局(行或列)，Grid适合二维布局(行和列)。简单组件用Flexbox，复杂页面布局用Grid。

**Q: 如何选择响应式断点？**
A: 基于内容而非设备选择断点。常用断点：768px(平板)、1024px(桌面)、1200px(大屏)。

**Q: CSS变量和Sass变量有什么区别？**
A: CSS变量在运行时可以动态修改，支持主题切换；Sass变量在编译时确定，性能更好但不能动态修改。

## 下一步学习

完成本模块后，你将具备：
- 现代CSS布局技能
- 响应式设计能力
- CSS工程化思维
- 组件化开发基础

**准备进入模块3：JavaScript基础强化**
- 确保CSS布局技能扎实
- 理解组件化设计思维
- 为JavaScript交互开发做好准备

---

**记住：CSS不仅仅是样式，更是用户体验的重要组成部分。掌握现代CSS技术将让你的网页既美观又高效！**