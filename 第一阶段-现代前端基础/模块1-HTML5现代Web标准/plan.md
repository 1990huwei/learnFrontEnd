# 模块1：HTML5+现代Web标准学习计划

## 模块概述
- **学习时长**: 5天 (第1-5天)
- **每日学习时间**: 2-3小时
- **核心目标**: 掌握现代HTML5语义化标签、Web标准和无障碍性开发

## 学习目标
- 熟练掌握HTML5语义化标签和最佳实践
- 理解Web标准和无障碍性开发原则
- 能够创建SEO友好和性能优化的HTML结构
- 掌握现代HTML工具和验证方法
- 为后续CSS和JavaScript学习打下坚实基础

## 详细学习计划

### 第1天：HTML5基础和语义化

#### 上午学习 (1-1.5小时)
**理论学习:**
- HTML5新特性概览
- 语义化标签的重要性和应用
- 文档结构最佳实践
- HTML5与HTML4的区别

**核心标签学习:**
```html
<!-- 结构性标签 -->
<header>, <nav>, <main>, <section>, <article>, <aside>, <footer>

<!-- 内容标签 -->
<figure>, <figcaption>, <details>, <summary>, <mark>, <time>

<!-- 表单标签 -->
<input type="email|tel|url|date|color|range">
<datalist>, <output>, <progress>, <meter>
```

#### 下午实践 (1-1.5小时)
**实践任务:**
1. 创建个人简历页面结构
2. 使用语义化标签组织内容
3. 添加各种HTML5表单元素
4. 集成多媒体元素

**代码示例:**
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>张三 - 前端开发工程师</title>
</head>
<body>
    <header>
        <h1>张三</h1>
        <p>前端开发工程师</p>
    </header>
    
    <nav>
        <ul>
            <li><a href="#about">关于我</a></li>
            <li><a href="#skills">技能</a></li>
            <li><a href="#experience">经验</a></li>
            <li><a href="#contact">联系方式</a></li>
        </ul>
    </nav>
    
    <main>
        <section id="about">
            <h2>关于我</h2>
            <article>
                <p>我是一名热爱技术的前端开发工程师...</p>
            </article>
        </section>
        
        <section id="skills">
            <h2>技能水平</h2>
            <div>
                <label for="html">HTML5</label>
                <progress id="html" value="90" max="100">90%</progress>
            </div>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 张三. 保留所有权利.</p>
    </footer>
</body>
</html>
```

### 第2天：Web标准和无障碍性

#### 上午学习 (1-1.5小时)
**理论学习:**
- ARIA标签和无障碍性原则
- WCAG 2.1指导原则
- 屏幕阅读器兼容性
- 键盘导航支持

**ARIA属性学习:**
```html
<!-- 常用ARIA属性 -->
aria-label="描述性标签"
aria-labelledby="关联元素ID"
aria-describedby="描述元素ID"
aria-expanded="true|false"
aria-hidden="true|false"
role="button|navigation|main|banner"
```

#### 下午实践 (1-1.5小时)
**实践任务:**
1. 为简历页面添加ARIA标签
2. 实现键盘导航支持
3. 测试屏幕阅读器兼容性
4. 优化页面的语义结构

**无障碍性检查清单:**
- [ ] 所有图片都有alt属性
- [ ] 表单元素都有关联的label
- [ ] 页面有清晰的标题层次结构
- [ ] 链接文本具有描述性
- [ ] 颜色对比度符合WCAG标准

### 第3天：SEO优化和性能

#### 上午学习 (1-1.5小时)
**理论学习:**
- SEO友好的HTML结构
- Meta标签优化
- 结构化数据(Schema.org)
- 页面性能优化基础

**Meta标签示例:**
```html
<head>
    <!-- 基础SEO -->
    <title>页面标题 - 网站名称</title>
    <meta name="description" content="页面描述，150字符以内">
    <meta name="keywords" content="关键词1,关键词2,关键词3">
    
    <!-- Open Graph -->
    <meta property="og:title" content="页面标题">
    <meta property="og:description" content="页面描述">
    <meta property="og:image" content="分享图片URL">
    <meta property="og:url" content="页面URL">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="页面标题">
    <meta name="twitter:description" content="页面描述">
</head>
```

#### 下午实践 (1-1.5小时)
**实践任务:**
1. 优化页面的SEO结构
2. 添加结构化数据标记
3. 实现性能优化技巧
4. 测试页面加载速度

### 第4天：现代HTML工具和实践

#### 上午学习 (1-1.5小时)
**理论学习:**
- HTML验证工具使用
- 代码质量检查
- 现代HTML开发工具
- 组件化思维入门

**工具介绍:**
- W3C Markup Validator
- HTML5 Validator
- Lighthouse性能检测
- axe无障碍性检测

#### 下午实践 (1-1.5小时)
**实践任务:**
1. 使用验证工具检查代码质量
2. 修复所有HTML验证错误
3. 优化页面性能得分
4. 创建可复用的HTML组件模板

### 第5天：项目实践和总结

#### 上午项目开发 (1.5-2小时)
**项目目标:** 创建现代化个人介绍网站

**功能要求:**
- 响应式布局结构
- 完整的语义化标签
- 无障碍性支持
- SEO优化
- 性能优化

**页面结构:**
```
个人介绍网站/
├── index.html          # 主页
├── about.html          # 关于页面
├── portfolio.html      # 作品集页面
├── contact.html        # 联系页面
└── assets/
    ├── images/         # 图片资源
    └── icons/          # 图标资源
```

#### 下午总结和评估 (0.5-1小时)
**总结内容:**
1. 技能掌握情况自评
2. 项目代码审查
3. 学习笔记整理
4. 问题和解决方案记录

## 学习资源

### 官方文档
- [MDN HTML文档](https://developer.mozilla.org/zh-CN/docs/Web/HTML)
- [W3C HTML5规范](https://www.w3.org/TR/html52/)
- [WHATWG HTML Living Standard](https://html.spec.whatwg.org/)

### 无障碍性资源
- [WCAG 2.1指南](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA最佳实践](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM无障碍性指南](https://webaim.org/)

### 工具和验证
- [W3C Markup Validator](https://validator.w3.org/)
- [WAVE无障碍性评估](https://wave.webaim.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

### 学习平台
- [web.dev HTML课程](https://web.dev/learn/html/)
- [freeCodeCamp HTML教程](https://www.freecodecamp.org/)
- [Codecademy HTML课程](https://www.codecademy.com/learn/learn-html)

## 评估标准

### 技能检查清单
- [ ] 熟练使用HTML5语义化标签
- [ ] 理解并应用无障碍性原则
- [ ] 能够优化页面SEO结构
- [ ] 掌握HTML验证和调试方法
- [ ] 具备组件化开发思维
- [ ] 能够创建性能优化的HTML结构

### 项目评估标准
**基础要求 (60分):**
- HTML结构正确，无验证错误
- 使用语义化标签组织内容
- 基本的SEO优化

**进阶要求 (80分):**
- 完整的无障碍性支持
- 优秀的SEO优化
- 良好的代码组织结构

**优秀标准 (100分):**
- 创新的HTML5特性应用
- 出色的性能优化
- 可复用的组件设计
- 完美的用户体验

### 常见问题和解决方案

**Q: 什么时候使用div，什么时候使用语义化标签？**
A: 优先使用语义化标签(header, nav, main, section, article等)，只有在没有合适的语义化标签时才使用div。

**Q: 如何选择合适的标题层次？**
A: 遵循逻辑层次结构，h1用于页面主标题，h2用于主要章节，h3用于子章节，避免跳级使用。

**Q: ARIA标签什么时候必须使用？**
A: 当HTML语义不足以表达元素的作用时，如自定义按钮、动态内容、复杂交互组件等。

## 下一步学习

完成本模块后，你将具备：
- 扎实的HTML5基础
- 现代Web标准理解
- 无障碍性开发能力
- SEO优化技能

**准备进入模块2：CSS3+现代布局技术**
- 确保HTML结构清晰合理
- 为CSS样式设计做好准备
- 理解内容与表现分离的原则

---

**记住：良好的HTML结构是整个前端开发的基础，投入时间学好HTML5将为后续学习带来巨大收益！**