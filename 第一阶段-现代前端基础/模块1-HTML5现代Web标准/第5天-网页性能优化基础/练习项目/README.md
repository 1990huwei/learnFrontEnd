# 第5天 - 网页性能优化基础 练习项目

## 📋 项目概述

本练习项目旨在帮助学习者掌握HTML5网页性能优化的基础知识和实践技能。通过实际的代码示例和对比分析，深入理解性能优化的重要性和具体实现方法。

## 📁 项目结构

```
练习项目/
├── performance-example.html      # 性能优化完整示例
├── performance-comparison.html    # 性能优化好坏实践对比
└── README.md                     # 项目说明文档
```

## 🚀 使用方法

### 环境准备
1. 确保已安装现代浏览器（Chrome、Firefox、Safari、Edge）
2. 推荐安装VS Code编辑器
3. 安装Live Server扩展（用于本地预览）

### 项目运行
1. 使用VS Code打开项目文件夹
2. 右键点击HTML文件，选择"Open with Live Server"
3. 浏览器会自动打开页面
4. 打开浏览器开发者工具查看性能数据

## 📚 练习内容

### 1. 性能优化完整示例 (performance-example.html)

**学习目标：**
- 理解关键渲染路径优化
- 掌握资源预加载技术
- 学习图片优化方法
- 了解Core Web Vitals指标

**主要特性：**
- ✅ 关键CSS内联
- ✅ 资源预加载（preload、preconnect、dns-prefetch）
- ✅ 响应式图片和懒加载
- ✅ 异步CSS和JavaScript加载
- ✅ Web Vitals性能监控
- ✅ 现代图片格式支持

### 2. 性能优化对比示例 (performance-comparison.html)

**学习目标：**
- 对比好坏实践的差异
- 理解性能问题的根源
- 学习优化策略和方法
- 掌握性能检测工具

**对比内容：**
- 📦 资源加载优化
- 🎨 CSS加载策略
- ⚡ JavaScript优化
- 🖼️ 图片优化技术
- 📊 性能指标对比

## 🎯 练习任务

### 基础任务
1. **性能分析**
   - 使用Chrome DevTools的Performance面板分析页面性能
   - 使用Lighthouse进行综合性能审计
   - 记录LCP、FID、CLS等Core Web Vitals指标

2. **代码理解**
   - 分析关键CSS内联的实现方式
   - 理解预加载技术的使用场景
   - 学习响应式图片的配置方法

3. **对比学习**
   - 对比好坏实践的代码差异
   - 理解每种优化技术的作用
   - 分析性能指标的改善效果

### 进阶任务
1. **性能优化实践**
   - 创建一个未优化的页面版本
   - 逐步应用各种优化技术
   - 测量每次优化后的性能改善

2. **自定义优化**
   - 为自己的项目添加性能优化
   - 实现图片懒加载功能
   - 配置资源预加载策略

3. **性能监控**
   - 集成Web Vitals监控
   - 创建性能数据收集脚本
   - 分析用户真实性能数据

### 挑战任务
1. **高级优化技术**
   - 实现Service Worker缓存策略
   - 使用Intersection Observer优化懒加载
   - 实现关键资源的智能预加载

2. **性能预算**
   - 设定页面性能预算
   - 创建性能监控仪表板
   - 实现性能回归检测

3. **多设备优化**
   - 针对移动设备优化性能
   - 实现网络感知的资源加载
   - 优化低端设备的用户体验

## 🎓 学习要点

### 1. 关键渲染路径优化
- **关键资源识别**：确定首屏渲染必需的资源
- **CSS优化**：内联关键CSS，异步加载非关键CSS
- **JavaScript优化**：使用async/defer，避免阻塞解析
- **资源优先级**：合理设置资源加载优先级

### 2. 资源加载策略
- **预加载技术**：preload、preconnect、dns-prefetch的使用
- **懒加载**：图片和内容的按需加载
- **代码分割**：JavaScript模块化和动态导入
- **缓存策略**：浏览器缓存和CDN优化

### 3. 图片优化技术
- **格式选择**：WebP、AVIF等现代格式的使用
- **响应式图片**：srcset和sizes属性的配置
- **尺寸优化**：为不同设备提供合适尺寸的图片
- **懒加载**：loading="lazy"属性的使用

### 4. Core Web Vitals
- **LCP优化**：最大内容绘制时间的改善
- **FID优化**：首次输入延迟的减少
- **CLS优化**：累积布局偏移的控制
- **性能监控**：实时监控和数据收集

## 🔧 性能检测工具

### 浏览器内置工具
- **Chrome DevTools**：Performance、Network、Lighthouse面板
- **Firefox Developer Tools**：性能分析和网络监控
- **Safari Web Inspector**：时间线和网络分析

### 在线检测工具
- **PageSpeed Insights**：Google的页面速度测试
- **WebPageTest**：详细的性能分析和瀑布图
- **GTmetrix**：综合性能分析和优化建议
- **Pingdom**：网站速度和性能监控

### 浏览器扩展
- **Web Vitals**：实时监控Core Web Vitals
- **Lighthouse**：一键性能审计
- **Performance Observer**：性能数据收集

## ❓ 常见问题解答

### Q1: 什么是关键渲染路径？
**A:** 关键渲染路径是浏览器渲染页面首屏内容所必需的资源和步骤。优化关键渲染路径可以显著提升页面加载速度。

### Q2: 预加载技术有什么区别？
**A:** 
- `preload`：预加载当前页面需要的资源
- `preconnect`：预先建立与域名的连接
- `dns-prefetch`：预先解析域名的DNS
- `prefetch`：预加载未来可能需要的资源

### Q3: 如何选择图片格式？
**A:** 
- WebP：现代浏览器支持，压缩率高
- AVIF：最新格式，压缩率更高但支持有限
- JPEG：传统格式，兼容性好
- PNG：支持透明度，适合图标和简单图形

### Q4: Core Web Vitals的目标值是什么？
**A:** 
- LCP（最大内容绘制）：< 2.5秒
- FID（首次输入延迟）：< 100毫秒
- CLS（累积布局偏移）：< 0.1

### Q5: 如何避免布局偏移？
**A:** 
- 为图片和视频指定width和height属性
- 为动态内容预留空间
- 避免在现有内容上方插入新内容
- 使用transform进行动画而非改变布局属性

## 🚀 扩展练习

### 1. 性能优化项目
创建一个包含以下内容的完整项目：
- 多页面应用
- 图片画廊
- 动态内容加载
- 第三方集成

### 2. 性能监控系统
实现一个简单的性能监控系统：
- 收集用户真实性能数据
- 生成性能报告
- 设置性能告警

### 3. 移动端优化
针对移动设备进行专门优化：
- 网络感知加载
- 触摸优化
- 电池使用优化

## 📖 学习资源

### 官方文档
- [Web.dev Performance](https://web.dev/performance/)
- [MDN Performance](https://developer.mozilla.org/en-US/docs/Web/Performance)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)

### 推荐阅读
- [High Performance Browser Networking](https://hpbn.co/)
- [Web Performance Optimization](https://www.oreilly.com/library/view/web-performance-optimization/9781449377632/)
- [Designing for Performance](http://designingforperformance.com/)

### 在线课程
- [Web Performance Fundamentals](https://frontendmasters.com/courses/web-performance/)
- [Website Performance Optimization](https://www.udacity.com/course/website-performance-optimization--ud884)

## 📝 学习笔记模板

```markdown
# 网页性能优化学习笔记

## 今日学习内容
- [ ] 关键渲染路径概念
- [ ] 资源预加载技术
- [ ] 图片优化方法
- [ ] Core Web Vitals指标

## 实践记录
### 性能测试结果
- 优化前LCP: ___秒
- 优化后LCP: ___秒
- 优化前FID: ___毫秒
- 优化后FID: ___毫秒
- 优化前CLS: ___
- 优化后CLS: ___

### 优化技术应用
1. 关键CSS内联: ✅/❌
2. 资源预加载: ✅/❌
3. 图片懒加载: ✅/❌
4. JavaScript优化: ✅/❌

## 问题与解决
1. 问题描述：
   解决方案：

2. 问题描述：
   解决方案：

## 明日学习计划
- [ ] 深入学习Service Worker
- [ ] 实践PWA优化
- [ ] 学习构建工具优化
```

---

**学习提示：** 性能优化是一个持续的过程，需要结合实际项目不断实践和改进。建议定期使用性能检测工具监控网站性能，并根据用户反馈持续优化用户体验。