/**
 * 现代HTML工作流 - 主JavaScript文件
 * 展示现代前端开发的最佳实践
 */

// ==========================================================================
// 工具函数
// ==========================================================================

/**
 * DOM元素选择器
 * @param {string} selector - CSS选择器
 * @param {Element} context - 上下文元素，默认为document
 * @returns {Element|null} 匹配的第一个元素
 */
function $(selector, context = document) {
  return context.querySelector(selector);
}

/**
 * DOM元素选择器（多个）
 * @param {string} selector - CSS选择器
 * @param {Element} context - 上下文元素，默认为document
 * @returns {NodeList} 匹配的所有元素
 */
function $$(selector, context = document) {
  return context.querySelectorAll(selector);
}

/**
 * 防抖函数
 * @param {Function} func - 要防抖的函数
 * @param {number} wait - 等待时间（毫秒）
 * @param {boolean} immediate - 是否立即执行
 * @returns {Function} 防抖后的函数
 */
function debounce(func, wait, immediate = false) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(this, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(this, args);
  };
}

/**
 * 节流函数
 * @param {Function} func - 要节流的函数
 * @param {number} limit - 限制时间（毫秒）
 * @returns {Function} 节流后的函数
 */
function throttle(func, limit) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * 检查元素是否在视口中
 * @param {Element} element - 要检查的元素
 * @param {number} threshold - 阈值（0-1）
 * @returns {boolean} 是否在视口中
 */
function isInViewport(element, threshold = 0) {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  
  const vertInView = (rect.top <= windowHeight * (1 - threshold)) && 
                     ((rect.top + rect.height) >= windowHeight * threshold);
  const horInView = (rect.left <= windowWidth * (1 - threshold)) && 
                    ((rect.left + rect.width) >= windowWidth * threshold);
  
  return vertInView && horInView;
}

/**
 * 平滑滚动到指定元素
 * @param {Element|string} target - 目标元素或选择器
 * @param {number} offset - 偏移量
 */
function scrollToElement(target, offset = 0) {
  const element = typeof target === 'string' ? $(target) : target;
  if (!element) return;
  
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementPosition - offset;
  
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

// ==========================================================================
// 导航功能
// ==========================================================================

class Navigation {
  constructor() {
    this.nav = $('.nav');
    this.navToggle = $('.nav__toggle');
    this.navMenu = $('.nav__menu');
    this.navLinks = $$('.nav__link');
    this.header = $('.header');
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.handleScroll();
  }
  
  bindEvents() {
    // 移动端菜单切换
    if (this.navToggle) {
      this.navToggle.addEventListener('click', () => this.toggleMenu());
    }
    
    // 导航链接点击
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => this.handleNavClick(e));
    });
    
    // 滚动事件
    window.addEventListener('scroll', throttle(() => this.handleScroll(), 100));
    
    // 窗口大小改变
    window.addEventListener('resize', debounce(() => this.handleResize(), 250));
    
    // 点击外部关闭菜单
    document.addEventListener('click', (e) => this.handleOutsideClick(e));
    
    // 键盘导航
    document.addEventListener('keydown', (e) => this.handleKeydown(e));
  }
  
  toggleMenu() {
    const isOpen = this.navMenu.classList.contains('is-open');
    
    if (isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }
  
  openMenu() {
    this.navMenu.classList.add('is-open');
    this.navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    
    // 焦点管理
    const firstLink = this.navMenu.querySelector('.nav__link');
    if (firstLink) {
      firstLink.focus();
    }
  }
  
  closeMenu() {
    this.navMenu.classList.remove('is-open');
    this.navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  
  handleNavClick(e) {
    const link = e.currentTarget;
    const href = link.getAttribute('href');
    
    // 处理锚点链接
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = $(href);
      if (target) {
        scrollToElement(target, 80);
        this.closeMenu();
        
        // 更新活动状态
        this.updateActiveLink(link);
      }
    }
  }
  
  updateActiveLink(activeLink) {
    this.navLinks.forEach(link => {
      link.classList.remove('nav__link--active');
    });
    activeLink.classList.add('nav__link--active');
  }
  
  handleScroll() {
    const scrollY = window.scrollY;
    
    // 添加滚动样式
    if (scrollY > 50) {
      this.header.classList.add('is-scrolled');
    } else {
      this.header.classList.remove('is-scrolled');
    }
    
    // 更新活动导航项
    this.updateActiveNavOnScroll();
  }
  
  updateActiveNavOnScroll() {
    const sections = $$('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const navLink = $(`.nav__link[href="#${sectionId}"]`);
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        if (navLink) {
          this.updateActiveLink(navLink);
        }
      }
    });
  }
  
  handleResize() {
    // 在桌面端关闭移动菜单
    if (window.innerWidth >= 768) {
      this.closeMenu();
    }
  }
  
  handleOutsideClick(e) {
    if (!this.nav.contains(e.target) && this.navMenu.classList.contains('is-open')) {
      this.closeMenu();
    }
  }
  
  handleKeydown(e) {
    // ESC键关闭菜单
    if (e.key === 'Escape' && this.navMenu.classList.contains('is-open')) {
      this.closeMenu();
      this.navToggle.focus();
    }
  }
}

// ==========================================================================
// 动画和视觉效果
// ==========================================================================

class AnimationController {
  constructor() {
    this.animatedElements = $$('[data-animate]');
    this.init();
  }
  
  init() {
    this.setupIntersectionObserver();
    this.bindEvents();
  }
  
  setupIntersectionObserver() {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
          this.observer.unobserve(entry.target);
        }
      });
    }, options);
    
    this.animatedElements.forEach(element => {
      this.observer.observe(element);
    });
  }
  
  animateElement(element) {
    const animationType = element.dataset.animate;
    const delay = element.dataset.delay || 0;
    
    setTimeout(() => {
      element.classList.add('animate-in');
      
      switch (animationType) {
        case 'fade-in':
          element.style.animation = 'fadeIn 0.6s ease-out forwards';
          break;
        case 'slide-in-left':
          element.style.animation = 'slideInLeft 0.6s ease-out forwards';
          break;
        case 'slide-in-right':
          element.style.animation = 'slideInRight 0.6s ease-out forwards';
          break;
        default:
          element.style.animation = 'fadeIn 0.6s ease-out forwards';
      }
    }, delay);
  }
  
  bindEvents() {
    // 视差滚动效果
    window.addEventListener('scroll', throttle(() => this.handleParallax(), 16));
  }
  
  handleParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = $$('[data-parallax]');
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.parallax || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  }
}

// ==========================================================================
// 性能监控
// ==========================================================================

class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.init();
  }
  
  init() {
    this.measurePageLoad();
    this.measureCoreWebVitals();
    this.setupPerformanceObserver();
  }
  
  measurePageLoad() {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0];
      
      this.metrics.pageLoad = {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        totalTime: navigation.loadEventEnd - navigation.fetchStart
      };
      
      this.logMetrics('Page Load', this.metrics.pageLoad);
    });
  }
  
  measureCoreWebVitals() {
    // Largest Contentful Paint (LCP)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.lcp = lastEntry.startTime;
      this.logMetrics('LCP', this.metrics.lcp);
    }).observe({ entryTypes: ['largest-contentful-paint'] });
    
    // First Input Delay (FID)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        this.metrics.fid = entry.processingStart - entry.startTime;
        this.logMetrics('FID', this.metrics.fid);
      });
    }).observe({ entryTypes: ['first-input'] });
    
    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      this.metrics.cls = clsValue;
      this.logMetrics('CLS', this.metrics.cls);
    }).observe({ entryTypes: ['layout-shift'] });
  }
  
  setupPerformanceObserver() {
    // 监控资源加载
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        if (entry.duration > 1000) {
          console.warn(`Slow resource: ${entry.name} took ${entry.duration}ms`);
        }
      });
    }).observe({ entryTypes: ['resource'] });
  }
  
  logMetrics(name, value) {
    if (typeof value === 'object') {
      console.group(`📊 ${name} Metrics`);
      Object.entries(value).forEach(([key, val]) => {
        console.log(`${key}: ${val}ms`);
      });
      console.groupEnd();
    } else {
      console.log(`📊 ${name}: ${value}ms`);
    }
  }
  
  getMetrics() {
    return this.metrics;
  }
}

// ==========================================================================
// 主题切换
// ==========================================================================

class ThemeController {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'auto';
    this.init();
  }
  
  init() {
    this.applyTheme();
    this.createThemeToggle();
  }
  
  applyTheme() {
    const html = document.documentElement;
    
    if (this.currentTheme === 'dark') {
      html.classList.add('dark-theme');
    } else if (this.currentTheme === 'light') {
      html.classList.remove('dark-theme');
    } else {
      // 自动模式：根据系统偏好
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        html.classList.add('dark-theme');
      } else {
        html.classList.remove('dark-theme');
      }
    }
  }
  
  createThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '🌓';
    themeToggle.setAttribute('aria-label', '切换主题');
    themeToggle.title = '切换主题';
    
    // 添加到导航栏
    const nav = $('.nav');
    if (nav) {
      nav.appendChild(themeToggle);
    }
    
    themeToggle.addEventListener('click', () => this.toggleTheme());
  }
  
  toggleTheme() {
    const themes = ['auto', 'light', 'dark'];
    const currentIndex = themes.indexOf(this.currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    
    this.currentTheme = themes[nextIndex];
    localStorage.setItem('theme', this.currentTheme);
    this.applyTheme();
  }
}

// ==========================================================================
// 错误处理和日志
// ==========================================================================

class ErrorHandler {
  constructor() {
    this.init();
  }
  
  init() {
    // 全局错误处理
    window.addEventListener('error', (e) => this.handleError(e));
    window.addEventListener('unhandledrejection', (e) => this.handlePromiseRejection(e));
  }
  
  handleError(event) {
    console.error('JavaScript Error:', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error
    });
    
    // 在开发环境显示错误信息
    if (this.isDevelopment()) {
      this.showErrorNotification(event.message);
    }
  }
  
  handlePromiseRejection(event) {
    console.error('Unhandled Promise Rejection:', event.reason);
    
    if (this.isDevelopment()) {
      this.showErrorNotification(`Promise rejected: ${event.reason}`);
    }
  }
  
  isDevelopment() {
    return window.location.hostname === 'localhost' || 
           window.location.hostname === '127.0.0.1' ||
           window.location.hostname.includes('dev');
  }
  
  showErrorNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'error-notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #ef4444;
      color: white;
      padding: 12px 16px;
      border-radius: 8px;
      z-index: 10000;
      max-width: 300px;
      font-size: 14px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 5000);
  }
}

// ==========================================================================
// 应用初始化
// ==========================================================================

class App {
  constructor() {
    this.components = {};
    this.init();
  }
  
  init() {
    // 等待DOM加载完成
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
    } else {
      this.initializeComponents();
    }
  }
  
  initializeComponents() {
    try {
      // 初始化各个组件
      this.components.navigation = new Navigation();
      this.components.animation = new AnimationController();
      this.components.performance = new PerformanceMonitor();
      this.components.theme = new ThemeController();
      this.components.errorHandler = new ErrorHandler();
      
      // 初始化其他功能
      this.initializeFeatures();
      
      console.log('✅ 应用初始化完成');
    } catch (error) {
      console.error('❌ 应用初始化失败:', error);
    }
  }
  
  initializeFeatures() {
    // 外部链接处理
    this.handleExternalLinks();
    
    // 图片懒加载
    this.initializeLazyLoading();
    
    // 表单增强
    this.enhanceForms();
    
    // 可访问性增强
    this.enhanceAccessibility();
  }
  
  handleExternalLinks() {
    const externalLinks = $$('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
    
    externalLinks.forEach(link => {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
      
      // 添加外部链接图标
      if (!link.querySelector('.external-icon')) {
        const icon = document.createElement('span');
        icon.className = 'external-icon';
        icon.innerHTML = ' ↗';
        icon.setAttribute('aria-hidden', 'true');
        link.appendChild(icon);
      }
    });
  }
  
  initializeLazyLoading() {
    const lazyImages = $$('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });
      
      lazyImages.forEach(img => {
        img.classList.add('lazy');
        imageObserver.observe(img);
      });
    } else {
      // 降级处理
      lazyImages.forEach(img => {
        img.src = img.dataset.src;
      });
    }
  }
  
  enhanceForms() {
    const forms = $$('form');
    
    forms.forEach(form => {
      // 实时验证
      const inputs = form.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        input.addEventListener('blur', () => this.validateField(input));
        input.addEventListener('input', debounce(() => this.validateField(input), 300));
      });
      
      // 表单提交处理
      form.addEventListener('submit', (e) => this.handleFormSubmit(e));
    });
  }
  
  validateField(field) {
    const isValid = field.checkValidity();
    const errorElement = field.parentNode.querySelector('.field-error');
    
    if (!isValid) {
      field.classList.add('is-invalid');
      if (!errorElement) {
        const error = document.createElement('div');
        error.className = 'field-error';
        error.textContent = field.validationMessage;
        field.parentNode.appendChild(error);
      }
    } else {
      field.classList.remove('is-invalid');
      if (errorElement) {
        errorElement.remove();
      }
    }
  }
  
  handleFormSubmit(event) {
    const form = event.target;
    const isValid = form.checkValidity();
    
    if (!isValid) {
      event.preventDefault();
      
      // 聚焦到第一个无效字段
      const firstInvalidField = form.querySelector(':invalid');
      if (firstInvalidField) {
        firstInvalidField.focus();
      }
    }
  }
  
  enhanceAccessibility() {
    // 跳转到主内容链接
    this.addSkipLink();
    
    // 焦点管理
    this.manageFocus();
    
    // ARIA标签增强
    this.enhanceARIA();
  }
  
  addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = '跳转到主内容';
    skipLink.className = 'skip-link sr-only';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: #000;
      color: #fff;
      padding: 8px;
      text-decoration: none;
      z-index: 10000;
    `;
    
    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
  }
  
  manageFocus() {
    // 键盘导航增强
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });
    
    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });
  }
  
  enhanceARIA() {
    // 为没有标签的表单控件添加aria-label
    const unlabeledInputs = $$('input:not([aria-label]):not([aria-labelledby]):not([id])');
    unlabeledInputs.forEach(input => {
      const placeholder = input.getAttribute('placeholder');
      if (placeholder) {
        input.setAttribute('aria-label', placeholder);
      }
    });
  }
}

// ==========================================================================
// 启动应用
// ==========================================================================

// 创建全局应用实例
window.app = new App();

// 导出工具函数供其他脚本使用
window.utils = {
  $,
  $$,
  debounce,
  throttle,
  isInViewport,
  scrollToElement
};

// 开发环境调试信息
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  console.log('🚀 现代HTML工作流示例已启动');
  console.log('📱 响应式设计已启用');
  console.log('♿ 无障碍功能已启用');
  console.log('⚡ 性能监控已启用');
  console.log('🎨 主题切换已启用');
}