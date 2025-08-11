# 模块3：JavaScript基础强化学习计划

## 模块概述
- **学习时长**: 3天 (第12-14天)
- **每日学习时间**: 2-3小时
- **核心目标**: 强化JavaScript核心概念，掌握现代ES特性和异步编程

## 学习目标
- 深入理解JavaScript核心概念和机制
- 熟练掌握ES2020-2024新特性
- 精通异步编程和Promise处理
- 具备现代JavaScript开发能力
- 为TypeScript学习打下坚实基础

## 详细学习计划

### 第12天：JavaScript核心概念复习

#### 上午学习 (1.5-2小时)
**理论学习:**
- JavaScript基础语法回顾
- 作用域和闭包深入理解
- 原型链和继承机制
- this绑定规则详解

**作用域和闭包:**
```javascript
// 作用域链示例
function outerFunction(x) {
  // 外部函数作用域
  const outerVariable = x;
  
  function innerFunction(y) {
    // 内部函数作用域
    const innerVariable = y;
    
    // 可以访问外部作用域的变量
    console.log(outerVariable + innerVariable);
  }
  
  return innerFunction;
}

const closure = outerFunction(10);
closure(5); // 输出: 15

// 闭包实际应用 - 模块模式
const counterModule = (function() {
  let count = 0;
  
  return {
    increment() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    },
    getCount() {
      return count;
    }
  };
})();

console.log(counterModule.increment()); // 1
console.log(counterModule.getCount()); // 1
```

**原型和继承:**
```javascript
// 原型链继承
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  console.log(`${this.name} makes a sound`);
};

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

// 设置原型链
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  console.log(`${this.name} barks`);
};

const dog = new Dog('Buddy', 'Golden Retriever');
dog.speak(); // Buddy makes a sound
dog.bark();  // Buddy barks

// ES6 类语法
class ModernAnimal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(`${this.name} makes a sound`);
  }
}

class ModernDog extends ModernAnimal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  
  bark() {
    console.log(`${this.name} barks`);
  }
}
```

**this绑定规则:**
```javascript
// 1. 默认绑定
function defaultBinding() {
  console.log(this); // 严格模式下为undefined，非严格模式为window
}

// 2. 隐式绑定
const obj = {
  name: 'Object',
  greet() {
    console.log(`Hello, ${this.name}`);
  }
};
obj.greet(); // Hello, Object

// 3. 显式绑定
function explicitBinding() {
  console.log(`Hello, ${this.name}`);
}
const person = { name: 'Alice' };
explicitBinding.call(person); // Hello, Alice
explicitBinding.apply(person); // Hello, Alice
const boundFunction = explicitBinding.bind(person);
boundFunction(); // Hello, Alice

// 4. new绑定
function Constructor(name) {
  this.name = name;
}
const instance = new Constructor('Instance'); // this指向新创建的对象

// 箭头函数的this
const arrowObj = {
  name: 'Arrow Object',
  regularFunction() {
    console.log(this.name); // Arrow Object
    
    const arrowFunction = () => {
      console.log(this.name); // Arrow Object (继承外层this)
    };
    arrowFunction();
  }
};
```

#### 下午实践 (1-1.5小时)
**实践任务:**
1. 实现常见的JavaScript算法和数据结构
2. 创建闭包应用实例
3. 练习原型链和继承
4. 解决this绑定问题

**实践代码:**
```javascript
// 任务1: 实现防抖和节流
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

function throttle(func, delay) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(this, args);
    }
  };
}

// 任务2: 实现深拷贝
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  
  if (obj instanceof Array) {
    return obj.map(item => deepClone(item));
  }
  
  if (typeof obj === 'object') {
    const clonedObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
}

// 任务3: 实现观察者模式
class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }
  
  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(listener => {
        listener.apply(this, args);
      });
    }
  }
  
  off(event, listenerToRemove) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(
        listener => listener !== listenerToRemove
      );
    }
  }
}
```

### 第13天：现代JavaScript特性

#### 上午学习 (1.5-2小时)
**理论学习:**
- ES2020-2024新特性详解
- 解构赋值和展开运算符
- 模板字符串和标签模板
- 可选链和空值合并

**ES2020-2024新特性:**
```javascript
// ES2020 特性
// 1. 可选链操作符 (Optional Chaining)
const user = {
  profile: {
    address: {
      street: '123 Main St'
    }
  }
};

// 传统写法
const street = user && user.profile && user.profile.address && user.profile.address.street;

// 可选链写法
const streetOptional = user?.profile?.address?.street;
const phoneOptional = user?.profile?.phone?.number; // undefined，不会报错

// 2. 空值合并操作符 (Nullish Coalescing)
const defaultValue = null ?? 'default'; // 'default'
const zeroValue = 0 ?? 'default'; // 0 (不同于 || 操作符)
const emptyString = '' ?? 'default'; // '' (不同于 || 操作符)

// 3. BigInt
const bigNumber = 9007199254740991n;
const anotherBig = BigInt(9007199254740991);

// 4. globalThis
console.log(globalThis); // 在任何环境下都指向全局对象

// ES2021 特性
// 1. 逻辑赋值操作符
let a = null;
a ??= 'default'; // 等同于 a = a ?? 'default'

let b = true;
b &&= false; // 等同于 b = b && false

let c = false;
c ||= true; // 等同于 c = c || true

// 2. 数字分隔符
const million = 1_000_000;
const binary = 0b1010_0001;
const hex = 0xFF_EC_DE_5E;

// ES2022 特性
// 1. 类的私有字段和方法
class BankAccount {
  #balance = 0; // 私有字段
  
  constructor(initialBalance) {
    this.#balance = initialBalance;
  }
  
  #validateAmount(amount) { // 私有方法
    return amount > 0;
  }
  
  deposit(amount) {
    if (this.#validateAmount(amount)) {
      this.#balance += amount;
    }
  }
  
  getBalance() {
    return this.#balance;
  }
}

// 2. 顶层 await
// 在模块顶层可以直接使用 await
const data = await fetch('/api/data').then(res => res.json());

// ES2023 特性
// 1. Array.prototype.findLast() 和 findLastIndex()
const numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
const lastEven = numbers.findLast(n => n % 2 === 0); // 2
const lastEvenIndex = numbers.findLastIndex(n => n % 2 === 0); // 7

// 2. Array.prototype.toSorted(), toReversed(), with()
const original = [3, 1, 4, 1, 5];
const sorted = original.toSorted(); // [1, 1, 3, 4, 5] (不改变原数组)
const reversed = original.toReversed(); // [5, 1, 4, 1, 3] (不改变原数组)
const modified = original.with(2, 99); // [3, 1, 99, 1, 5] (不改变原数组)
```

**解构赋值高级用法:**
```javascript
// 数组解构
const [first, second, ...rest] = [1, 2, 3, 4, 5];
const [a, , c] = [1, 2, 3]; // 跳过第二个元素
const [x = 10, y = 20] = [1]; // 默认值

// 对象解构
const { name, age, ...otherProps } = {
  name: 'Alice',
  age: 30,
  city: 'New York',
  country: 'USA'
};

// 重命名和默认值
const { name: userName, age: userAge = 25 } = { name: 'Bob' };

// 嵌套解构
const {
  profile: {
    address: { street, city }
  }
} = {
  profile: {
    address: {
      street: '123 Main St',
      city: 'Boston'
    }
  }
};

// 函数参数解构
function greetUser({ name, age = 18, city = 'Unknown' }) {
  console.log(`Hello ${name}, age ${age}, from ${city}`);
}

greetUser({ name: 'Charlie', city: 'Seattle' });
```

#### 下午实践 (1-1.5小时)
**实践任务:**
1. 使用现代JavaScript重写项目代码
2. 实现实用的工具函数
3. 练习解构赋值和展开运算符
4. 应用新特性优化代码

**实用工具函数:**
```javascript
// 工具函数库
const utils = {
  // 数组去重
  unique: (arr) => [...new Set(arr)],
  
  // 数组分组
  groupBy: (arr, key) => {
    return arr.reduce((groups, item) => {
      const group = item[key];
      groups[group] = groups[group] || [];
      groups[group].push(item);
      return groups;
    }, {});
  },
  
  // 对象选择属性
  pick: (obj, keys) => {
    return keys.reduce((result, key) => {
      if (key in obj) {
        result[key] = obj[key];
      }
      return result;
    }, {});
  },
  
  // 对象排除属性
  omit: (obj, keys) => {
    const result = { ...obj };
    keys.forEach(key => delete result[key]);
    return result;
  },
  
  // 延迟函数
  delay: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
  
  // 重试函数
  retry: async (fn, maxAttempts = 3, delay = 1000) => {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await fn();
      } catch (error) {
        if (attempt === maxAttempts) {
          throw error;
        }
        await utils.delay(delay);
      }
    }
  },
  
  // 格式化货币
  formatCurrency: (amount, currency = 'USD', locale = 'en-US') => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency
    }).format(amount);
  },
  
  // 格式化日期
  formatDate: (date, options = {}) => {
    const defaultOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Intl.DateTimeFormat('zh-CN', { ...defaultOptions, ...options }).format(date);
  }
};

// 使用示例
const numbers = [1, 2, 2, 3, 3, 3, 4];
console.log(utils.unique(numbers)); // [1, 2, 3, 4]

const users = [
  { name: 'Alice', department: 'Engineering' },
  { name: 'Bob', department: 'Marketing' },
  { name: 'Charlie', department: 'Engineering' }
];
console.log(utils.groupBy(users, 'department'));

console.log(utils.formatCurrency(1234.56)); // $1,234.56
console.log(utils.formatDate(new Date())); // 2024年12月20日
```

### 第14天：异步编程

#### 上午学习 (1.5-2小时)
**理论学习:**
- Promise详解和最佳实践
- async/await深入理解
- 错误处理策略
- 并发控制技巧

**Promise深入理解:**
```javascript
// Promise基础
const promise = new Promise((resolve, reject) => {
  // 异步操作
  setTimeout(() => {
    const success = Math.random() > 0.5;
    if (success) {
      resolve('操作成功');
    } else {
      reject(new Error('操作失败'));
    }
  }, 1000);
});

// Promise链式调用
promise
  .then(result => {
    console.log(result);
    return result.toUpperCase();
  })
  .then(upperResult => {
    console.log(upperResult);
  })
  .catch(error => {
    console.error('错误:', error.message);
  })
  .finally(() => {
    console.log('操作完成');
  });

// Promise静态方法
// Promise.all - 所有Promise都成功才成功
const promises = [
  fetch('/api/user'),
  fetch('/api/posts'),
  fetch('/api/comments')
];

Promise.all(promises)
  .then(responses => {
    console.log('所有请求完成');
    return Promise.all(responses.map(res => res.json()));
  })
  .then(data => {
    console.log('所有数据:', data);
  })
  .catch(error => {
    console.error('某个请求失败:', error);
  });

// Promise.allSettled - 等待所有Promise完成(无论成功失败)
Promise.allSettled(promises)
  .then(results => {
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log(`请求${index}成功:`, result.value);
      } else {
        console.log(`请求${index}失败:`, result.reason);
      }
    });
  });

// Promise.race - 第一个完成的Promise决定结果
const timeoutPromise = new Promise((_, reject) => {
  setTimeout(() => reject(new Error('超时')), 5000);
});

Promise.race([fetch('/api/data'), timeoutPromise])
  .then(response => console.log('请求成功'))
  .catch(error => console.log('请求超时或失败'));
```

**async/await最佳实践:**
```javascript
// 基础用法
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('获取用户数据失败:', error);
    throw error; // 重新抛出错误，让调用者处理
  }
}

// 并发处理
async function fetchMultipleUsers(userIds) {
  try {
    // 并发执行多个请求
    const promises = userIds.map(id => fetchUserData(id));
    const users = await Promise.all(promises);
    return users;
  } catch (error) {
    console.error('批量获取用户失败:', error);
    return [];
  }
}

// 顺序处理
async function processUsersSequentially(userIds) {
  const results = [];
  for (const userId of userIds) {
    try {
      const user = await fetchUserData(userId);
      results.push(user);
    } catch (error) {
      console.error(`处理用户${userId}失败:`, error);
      // 继续处理下一个用户
    }
  }
  return results;
}

// 错误处理策略
async function robustFetch(url, options = {}) {
  const maxRetries = 3;
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, {
        ...options,
        timeout: 5000 // 5秒超时
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return response;
    } catch (error) {
      lastError = error;
      console.warn(`请求失败 (尝试 ${attempt}/${maxRetries}):`, error.message);
      
      if (attempt < maxRetries) {
        // 指数退避
        const delay = Math.pow(2, attempt) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw new Error(`请求最终失败: ${lastError.message}`);
}
```

#### 下午实践 (1-1.5小时)
**实践任务:**
1. 实现异步数据处理功能
2. 创建Promise工具函数
3. 练习错误处理和重试机制
4. 构建异步流程控制

**异步工具函数:**
```javascript
// 异步工具库
const asyncUtils = {
  // 并发限制
  async concurrentLimit(tasks, limit = 3) {
    const results = [];
    const executing = [];
    
    for (const task of tasks) {
      const promise = Promise.resolve().then(() => task());
      results.push(promise);
      
      if (tasks.length >= limit) {
        executing.push(promise);
        
        if (executing.length >= limit) {
          await Promise.race(executing);
          executing.splice(executing.findIndex(p => p === promise), 1);
        }
      }
    }
    
    return Promise.all(results);
  },
  
  // 超时控制
  timeout(promise, ms) {
    return Promise.race([
      promise,
      new Promise((_, reject) => {
        setTimeout(() => reject(new Error('操作超时')), ms);
      })
    ]);
  },
  
  // 重试机制
  async retry(fn, options = {}) {
    const { maxAttempts = 3, delay = 1000, backoff = 2 } = options;
    let lastError;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;
        
        if (attempt < maxAttempts) {
          const waitTime = delay * Math.pow(backoff, attempt - 1);
          await new Promise(resolve => setTimeout(resolve, waitTime));
        }
      }
    }
    
    throw lastError;
  },
  
  // 缓存异步结果
  memoizeAsync(fn, keyFn = (...args) => JSON.stringify(args)) {
    const cache = new Map();
    
    return async (...args) => {
      const key = keyFn(...args);
      
      if (cache.has(key)) {
        return cache.get(key);
      }
      
      const promise = fn(...args);
      cache.set(key, promise);
      
      try {
        const result = await promise;
        cache.set(key, Promise.resolve(result));
        return result;
      } catch (error) {
        cache.delete(key);
        throw error;
      }
    };
  }
};

// 使用示例
const fetchData = asyncUtils.memoizeAsync(async (url) => {
  const response = await fetch(url);
  return response.json();
});

// 第一次调用会发起请求
const data1 = await fetchData('/api/data');
// 第二次调用会使用缓存
const data2 = await fetchData('/api/data');
```

## 学习资源

### 官方文档
- [MDN JavaScript文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)
- [ECMAScript规范](https://tc39.es/ecma262/)
- [JavaScript.info](https://javascript.info/)

### 学习平台
- [freeCodeCamp JavaScript课程](https://www.freecodecamp.org/)
- [Eloquent JavaScript](https://eloquentjavascript.net/)
- [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS)

### 实践平台
- [LeetCode](https://leetcode.com/) - 算法练习
- [Codewars](https://www.codewars.com/) - 编程挑战
- [HackerRank](https://www.hackerrank.com/) - 技能测试

## 评估标准

### 技能检查清单
- [ ] 深入理解JavaScript核心概念(作用域、闭包、原型)
- [ ] 熟练掌握ES2020-2024新特性
- [ ] 精通异步编程和Promise处理
- [ ] 能够编写高质量的JavaScript代码
- [ ] 具备调试和性能优化能力
- [ ] 理解函数式编程概念

### 项目评估标准
**基础要求 (60分):**
- 正确使用JavaScript语法和特性
- 实现基本的异步操作
- 代码逻辑清晰，无明显错误

**进阶要求 (80分):**
- 熟练运用现代JavaScript特性
- 良好的错误处理和异步流程控制
- 代码结构清晰，可读性强

**优秀标准 (100分):**
- 创新的解决方案和算法实现
- 出色的性能优化
- 可复用的工具函数和模块
- 完善的错误处理和边界情况考虑

## 常见问题和解决方案

**Q: 什么时候使用Promise，什么时候使用async/await？**
A: async/await是Promise的语法糖，使异步代码看起来像同步代码。复杂的Promise链建议使用async/await，简单的异步操作可以直接使用Promise。

**Q: 如何处理并发异步操作？**
A: 使用Promise.all()处理并发操作，Promise.allSettled()处理可能失败的并发操作，Promise.race()处理竞态条件。

**Q: 闭包会导致内存泄漏吗？**
A: 闭包本身不会导致内存泄漏，但如果闭包引用了大量数据且长期存在，可能会导致内存占用过高。及时清理不需要的引用。

## 下一步学习

完成本模块后，你将具备：
- 扎实的JavaScript核心技能
- 现代ES特性应用能力
- 异步编程专业技能
- 函数式编程思维

**准备进入模块4：TypeScript类型系统**
- 确保JavaScript基础扎实
- 理解类型系统的价值
- 为类型安全开发做好准备

---

**记住：JavaScript是前端开发的核心，掌握其精髓将让你在任何前端技术栈中都游刃有余！**