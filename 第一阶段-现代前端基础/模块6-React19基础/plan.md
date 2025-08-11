# 模块6：React 19基础学习计划

## 模块概述
- **学习时长**: 7天 (第24-30天)
- **每日学习时间**: 2-3小时
- **核心目标**: 掌握React 19的核心概念和新特性，建立现代React开发基础

## 学习目标
- 熟练掌握React 19核心概念
- 理解组件化开发思想
- 掌握Hooks的使用和原理
- 学会状态管理和事件处理
- 具备构建交互式应用的能力

## 详细学习计划

### 第24天：React基础概念

#### 上午学习 (1.5-2小时)
**理论学习:**
- React核心概念和设计思想
- JSX语法和虚拟DOM
- 组件的概念和类型
- React 19新特性概览

**React基础概念:**
```typescript
// React 19项目初始化
npx create-react-app my-react-app --template typescript
# 或使用Vite (推荐)
npm create vite@latest my-react-app -- --template react-ts

// 基础依赖
npm install react@19 react-dom@19
npm install -D @types/react@19 @types/react-dom@19
```

**JSX基础语法:**
```typescript
// src/components/Welcome.tsx
import React from 'react';

interface WelcomeProps {
  name: string;
  age?: number;
  isStudent: boolean;
}

// 函数组件 (推荐)
const Welcome: React.FC<WelcomeProps> = ({ name, age, isStudent }) => {
  // JSX表达式
  const greeting = `Hello, ${name}!`;
  
  return (
    <div className="welcome-container">
      <h1>{greeting}</h1>
      {age && <p>Age: {age}</p>}
      <p>Status: {isStudent ? 'Student' : 'Not a student'}</p>
      
      {/* 条件渲染 */}
      {isStudent && (
        <div className="student-info">
          <p>Welcome to our learning platform!</p>
        </div>
      )}
      
      {/* 列表渲染 */}
      <ul>
        {['React', 'TypeScript', 'Vite'].map((tech, index) => (
          <li key={index}>{tech}</li>
        ))}
      </ul>
    </div>
  );
};

export default Welcome;
```

**组件组合和Props:**
```typescript
// src/components/UserCard.tsx
interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
  onDelete?: (id: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  const handleEdit = () => {
    onEdit?.(user);
  };
  
  const handleDelete = () => {
    onDelete?.(user.id);
  };
  
  return (
    <div className="user-card">
      {user.avatar && (
        <img 
          src={user.avatar} 
          alt={`${user.name}'s avatar`}
          className="avatar"
        />
      )}
      <div className="user-info">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
      <div className="actions">
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default UserCard;
```

**React 19新特性预览:**
```typescript
// React 19的新特性

// 1. 自动批处理改进
import { useState, useTransition } from 'react';

const AutoBatchingExample = () => {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);
  const [isPending, startTransition] = useTransition();
  
  const handleClick = () => {
    // React 19中，这些更新会自动批处理
    startTransition(() => {
      setCount(c => c + 1);
      setFlag(f => !f);
    });
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Flag: {flag.toString()}</p>
      <button onClick={handleClick} disabled={isPending}>
        {isPending ? 'Updating...' : 'Update'}
      </button>
    </div>
  );
};

// 2. 改进的Suspense
import { Suspense } from 'react';

const DataComponent = () => {
  // 模拟异步数据获取
  throw new Promise(resolve => setTimeout(resolve, 2000));
};

const SuspenseExample = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DataComponent />
    </Suspense>
  );
};

// 3. 服务器组件支持 (Server Components)
// 注意：这需要特殊的构建配置
'use server'; // 服务器组件标识

const ServerComponent = async () => {
  // 这个组件在服务器端运行
  const data = await fetch('https://api.example.com/data');
  const result = await data.json();
  
  return (
    <div>
      <h2>Server Data</h2>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
};
```

#### 下午实践 (1-1.5小时)
**实践任务:**
1. 创建React项目并配置
2. 编写基础组件
3. 练习JSX语法和Props传递
4. 实现简单的组件组合

**实践项目 - 个人信息卡片:**
```typescript
// src/types/index.ts
export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  skills: string[];
  social?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

// src/components/PersonCard.tsx
import React from 'react';
import { Person } from '../types';

interface PersonCardProps {
  person: Person;
  showDetails?: boolean;
  onContactClick?: (person: Person) => void;
}

const PersonCard: React.FC<PersonCardProps> = ({ 
  person, 
  showDetails = false, 
  onContactClick 
}) => {
  const fullName = `${person.firstName} ${person.lastName}`;
  
  return (
    <div className="person-card">
      <div className="card-header">
        {person.avatar ? (
          <img 
            src={person.avatar} 
            alt={`${fullName}'s avatar`}
            className="avatar"
          />
        ) : (
          <div className="avatar-placeholder">
            {person.firstName[0]}{person.lastName[0]}
          </div>
        )}
        <div className="basic-info">
          <h2>{fullName}</h2>
          <p className="email">{person.email}</p>
          {person.phone && <p className="phone">{person.phone}</p>}
        </div>
      </div>
      
      {showDetails && (
        <div className="card-details">
          {person.bio && (
            <div className="bio">
              <h3>About</h3>
              <p>{person.bio}</p>
            </div>
          )}
          
          <div className="skills">
            <h3>Skills</h3>
            <div className="skill-tags">
              {person.skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          {person.social && (
            <div className="social-links">
              <h3>Social</h3>
              <div className="links">
                {person.social.github && (
                  <a href={person.social.github} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                )}
                {person.social.linkedin && (
                  <a href={person.social.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                )}
                {person.social.twitter && (
                  <a href={person.social.twitter} target="_blank" rel="noopener noreferrer">
                    Twitter
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      
      <div className="card-actions">
        <button 
          onClick={() => onContactClick?.(person)}
          className="contact-btn"
        >
          Contact
        </button>
      </div>
    </div>
  );
};

export default PersonCard;
```

### 第25天：React Hooks基础

#### 上午学习 (1.5-2小时)
**理论学习:**
- Hooks的概念和规则
- useState和useEffect
- useContext和useReducer
- 自定义Hooks

**useState Hook:**
```typescript
import React, { useState } from 'react';

// 基础状态管理
const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [step, setStep] = useState<number>(1);
  
  const increment = () => setCount(prev => prev + step);
  const decrement = () => setCount(prev => prev - step);
  const reset = () => setCount(0);
  
  return (
    <div className="counter">
      <h2>Count: {count}</h2>
      <div className="controls">
        <label>
          Step: 
          <input 
            type="number" 
            value={step} 
            onChange={(e) => setStep(Number(e.target.value))}
            min="1"
          />
        </label>
      </div>
      <div className="buttons">
        <button onClick={decrement}>-{step}</button>
        <button onClick={reset}>Reset</button>
        <button onClick={increment}>+{step}</button>
      </div>
    </div>
  );
};

// 复杂状态管理
interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const updateField = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    
    // 清除错误
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted:', formData);
      
      // 重置表单
      setFormData({ name: '', email: '', message: '' });
      alert('Message sent successfully!');
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="field">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={updateField('name')}
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>
      
      <div className="field">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={updateField('email')}
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>
      
      <div className="field">
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          value={formData.message}
          onChange={updateField('message')}
          className={errors.message ? 'error' : ''}
          rows={4}
        />
        {errors.message && <span className="error-message">{errors.message}</span>}
      </div>
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};
```

**useEffect Hook:**
```typescript
import React, { useState, useEffect } from 'react';

// 基础副作用
const DocumentTitle: React.FC<{ title: string }> = ({ title }) => {
  useEffect(() => {
    // 副作用：更新文档标题
    const originalTitle = document.title;
    document.title = title;
    
    // 清理函数
    return () => {
      document.title = originalTitle;
    };
  }, [title]); // 依赖数组
  
  return <div>Check the browser tab title!</div>;
};

// 数据获取
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    let isCancelled = false;
    
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!isCancelled) {
          setPosts(data);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };
    
    fetchPosts();
    
    // 清理函数：取消请求
    return () => {
      isCancelled = true;
    };
  }, []); // 空依赖数组：仅在组件挂载时执行
  
  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div className="post-list">
      <h2>Latest Posts</h2>
      {posts.map(post => (
        <article key={post.id} className="post">
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </article>
      ))}
    </div>
  );
};

// 定时器和事件监听
const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (isRunning) {
      intervalId = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]);
  
  // 键盘事件监听
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        setIsRunning(prev => !prev);
      } else if (event.code === 'KeyR') {
        setSeconds(0);
        setIsRunning(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);
  
  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="timer">
      <h2>Timer</h2>
      <div className="time-display">{formatTime(seconds)}</div>
      <div className="controls">
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={() => { setSeconds(0); setIsRunning(false); }}>
          Reset
        </button>
      </div>
      <p className="hint">
        Press <kbd>Space</kbd> to start/pause, <kbd>R</kbd> to reset
      </p>
    </div>
  );
};
```

#### 下午实践 (1-1.5小时)
**实践任务:**
1. 实现状态管理组件
2. 练习useEffect的各种用法
3. 创建数据获取组件
4. 实现定时器和事件监听

### 第26天：高级Hooks

#### 上午学习 (1.5-2小时)
**理论学习:**
- useContext全局状态
- useReducer复杂状态管理
- useMemo和useCallback性能优化
- useRef和DOM操作

**useContext全局状态:**
```typescript
// src/contexts/ThemeContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app-theme-${theme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// 使用主题的组件
const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className="header">
      <h1>My App</h1>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'} mode
      </button>
    </header>
  );
};
```

**useReducer复杂状态管理:**
```typescript
// src/hooks/useShoppingCart.ts
import { useReducer } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'APPLY_DISCOUNT'; payload: { percentage: number } };

const calculateTotals = (items: CartItem[]) => {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  return { itemCount, total };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      let newItems: CartItem[];
      if (existingItem) {
        newItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }
      
      const { itemCount, total } = calculateTotals(newItems);
      return { items: newItems, itemCount, total };
    }
    
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload.id);
      const { itemCount, total } = calculateTotals(newItems);
      return { items: newItems, itemCount, total };
    }
    
    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0);
      
      const { itemCount, total } = calculateTotals(newItems);
      return { items: newItems, itemCount, total };
    }
    
    case 'CLEAR_CART':
      return { items: [], total: 0, itemCount: 0 };
    
    case 'APPLY_DISCOUNT': {
      const discountedTotal = state.total * (1 - action.payload.percentage / 100);
      return { ...state, total: discountedTotal };
    }
    
    default:
      return state;
  }
};

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0
};

export const useShoppingCart = () => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };
  
  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };
  
  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  const applyDiscount = (percentage: number) => {
    dispatch({ type: 'APPLY_DISCOUNT', payload: { percentage } });
  };
  
  return {
    ...state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    applyDiscount
  };
};
```

**性能优化Hooks:**
```typescript
import React, { useState, useMemo, useCallback, memo } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  rating: number;
}

interface ProductListProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

// 使用memo优化的产品项组件
const ProductItem = memo<{ product: Product; onClick: (product: Product) => void }>(({ product, onClick }) => {
  console.log(`Rendering ProductItem: ${product.name}`);
  
  return (
    <div className="product-item" onClick={() => onClick(product)}>
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
      <p>Rating: {product.rating}/5</p>
    </div>
  );
});

const ProductList: React.FC<ProductListProps> = ({ products, onProductClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating'>('name');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  
  // useMemo优化昂贵的计算
  const filteredAndSortedProducts = useMemo(() => {
    console.log('Recalculating filtered and sorted products');
    
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
    
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
    
    return filtered;
  }, [products, searchTerm, sortBy, filterCategory]);
  
  // 获取唯一分类
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
    return ['all', ...uniqueCategories];
  }, [products]);
  
  // useCallback优化事件处理函数
  const handleProductClick = useCallback((product: Product) => {
    console.log('Product clicked:', product.name);
    onProductClick(product);
  }, [onProductClick]);
  
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);
  
  const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as 'name' | 'price' | 'rating');
  }, []);
  
  const handleCategoryChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterCategory(e.target.value);
  }, []);
  
  return (
    <div className="product-list">
      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        
        <select value={sortBy} onChange={handleSortChange}>
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
          <option value="rating">Sort by Rating</option>
        </select>
        
        <select value={filterCategory} onChange={handleCategoryChange}>
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>
      </div>
      
      <div className="products">
        {filteredAndSortedProducts.map(product => (
          <ProductItem
            key={product.id}
            product={product}
            onClick={handleProductClick}
          />
        ))}
      </div>
      
      <div className="stats">
        Showing {filteredAndSortedProducts.length} of {products.length} products
      </div>
    </div>
  );
};

export default ProductList;
```

#### 下午实践 (1-1.5小时)
**实践任务:**
1. 实现全局状态管理
2. 创建复杂的状态逻辑
3. 优化组件性能
4. 练习自定义Hooks

### 第27天：事件处理和表单

#### 上午学习 (1.5-2小时)
**理论学习:**
- React事件系统
- 表单处理和验证
- 受控组件vs非受控组件
- 文件上传和处理

**React事件处理:**
```typescript
import React, { useState, useRef } from 'react';

// 事件处理基础
const EventHandlingDemo: React.FC = () => {
  const [clickCount, setClickCount] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [keyPressed, setKeyPressed] = useState('');
  
  // 点击事件
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setClickCount(prev => prev + 1);
    console.log('Button clicked at:', e.clientX, e.clientY);
  };
  
  // 鼠标移动事件
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };
  
  // 键盘事件
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setKeyPressed(e.key);
    
    // 特殊键处理
    if (e.key === 'Enter') {
      console.log('Enter pressed!');
    } else if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      console.log('Ctrl+S pressed!');
    }
  };
  
  // 表单提交事件
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log('Form data:', Object.fromEntries(formData));
  };
  
  return (
    <div className="event-demo">
      <h2>Event Handling Demo</h2>
      
      <div className="click-demo">
        <button onClick={handleClick}>
          Click me! (Clicked {clickCount} times)
        </button>
      </div>
      
      <div 
        className="mouse-demo"
        onMouseMove={handleMouseMove}
        style={{ height: '200px', border: '1px solid #ccc', padding: '10px' }}
      >
        <p>Move your mouse here!</p>
        <p>Mouse position: ({mousePosition.x}, {mousePosition.y})</p>
      </div>
      
      <div className="keyboard-demo">
        <input
          type="text"
          placeholder="Type something..."
          onKeyDown={handleKeyDown}
        />
        <p>Last key pressed: {keyPressed}</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" required />
        <input name="email" type="email" placeholder="Email" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
```

**高级表单处理:**
```typescript
// src/hooks/useForm.ts
import { useState, useCallback } from 'react';

type ValidationRule<T> = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: T) => string | undefined;
};

type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule<T[K]>;
};

type FormErrors<T> = {
  [K in keyof T]?: string;
};

export const useForm = <T extends Record<string, any>>(
  initialValues: T,
  validationRules?: ValidationRules<T>
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [touched, setTouched] = useState<Record<keyof T, boolean>>({} as Record<keyof T, boolean>);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const validateField = useCallback((name: keyof T, value: any): string | undefined => {
    const rules = validationRules?.[name];
    if (!rules) return undefined;
    
    if (rules.required && (!value || (typeof value === 'string' && !value.trim()))) {
      return `${String(name)} is required`;
    }
    
    if (typeof value === 'string') {
      if (rules.minLength && value.length < rules.minLength) {
        return `${String(name)} must be at least ${rules.minLength} characters`;
      }
      
      if (rules.maxLength && value.length > rules.maxLength) {
        return `${String(name)} must be no more than ${rules.maxLength} characters`;
      }
      
      if (rules.pattern && !rules.pattern.test(value)) {
        return `${String(name)} format is invalid`;
      }
    }
    
    if (rules.custom) {
      return rules.custom(value);
    }
    
    return undefined;
  }, [validationRules]);
  
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors<T> = {};
    let isValid = true;
    
    Object.keys(values).forEach(key => {
      const error = validateField(key as keyof T, values[key as keyof T]);
      if (error) {
        newErrors[key as keyof T] = error;
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    return isValid;
  }, [values, validateField]);
  
  const setValue = useCallback((name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // 实时验证
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [touched, validateField]);
  
  const setFieldTouched = useCallback((name: keyof T) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);
  
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    let finalValue: any = value;
    
    if (type === 'checkbox') {
      finalValue = (e.target as HTMLInputElement).checked;
    } else if (type === 'number') {
      finalValue = value === '' ? '' : Number(value);
    }
    
    setValue(name as keyof T, finalValue);
  }, [setValue]);
  
  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setFieldTouched(name as keyof T);
    
    const error = validateField(name as keyof T, values[name as keyof T]);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [values, validateField, setFieldTouched]);
  
  const handleSubmit = useCallback(async (onSubmit: (values: T) => Promise<void> | void) => {
    setIsSubmitting(true);
    
    // 标记所有字段为已触摸
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key as keyof T] = true;
      return acc;
    }, {} as Record<keyof T, boolean>);
    setTouched(allTouched);
    
    if (validateForm()) {
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }
    
    setIsSubmitting(false);
  }, [values, validateForm]);
  
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({} as Record<keyof T, boolean>);
    setIsSubmitting(false);
  }, [initialValues]);
  
  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setValue,
    setFieldTouched,
    validateForm,
    reset
  };
};

// 使用自定义表单Hook
interface UserRegistrationForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: number;
  agreeToTerms: boolean;
}

const UserRegistration: React.FC = () => {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit
  } = useForm<UserRegistrationForm>(
    {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      age: 0,
      agreeToTerms: false
    },
    {
      username: {
        required: true,
        minLength: 3,
        maxLength: 20,
        pattern: /^[a-zA-Z0-9_]+$/
      },
      email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      },
      password: {
        required: true,
        minLength: 8,
        custom: (value: string) => {
          if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
            return 'Password must contain at least one lowercase letter, one uppercase letter, and one number';
          }
        }
      },
      confirmPassword: {
        required: true,
        custom: (value: string) => {
          if (value !== values.password) {
            return 'Passwords do not match';
          }
        }
      },
      age: {
        required: true,
        custom: (value: number) => {
          if (value < 13) {
            return 'You must be at least 13 years old';
          }
          if (value > 120) {
            return 'Please enter a valid age';
          }
        }
      },
      agreeToTerms: {
        custom: (value: boolean) => {
          if (!value) {
            return 'You must agree to the terms and conditions';
          }
        }
      }
    }
  );
  
  const onSubmit = async (formData: UserRegistrationForm) => {
    console.log('Registering user:', formData);
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert('Registration successful!');
  };
  
  return (
    <form className="registration-form">
      <h2>User Registration</h2>
      
      <div className="field">
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          name="username"
          type="text"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.username && touched.username ? 'error' : ''}
        />
        {errors.username && touched.username && (
          <span className="error-message">{errors.username}</span>
        )}
      </div>
      
      <div className="field">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.email && touched.email ? 'error' : ''}
        />
        {errors.email && touched.email && (
          <span className="error-message">{errors.email}</span>
        )}
      </div>
      
      <div className="field">
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.password && touched.password ? 'error' : ''}
        />
        {errors.password && touched.password && (
          <span className="error-message">{errors.password}</span>
        )}
      </div>
      
      <div className="field">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.confirmPassword && touched.confirmPassword ? 'error' : ''}
        />
        {errors.confirmPassword && touched.confirmPassword && (
          <span className="error-message">{errors.confirmPassword}</span>
        )}
      </div>
      
      <div className="field">
        <label htmlFor="age">Age:</label>
        <input
          id="age"
          name="age"
          type="number"
          value={values.age || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.age && touched.age ? 'error' : ''}
        />
        {errors.age && touched.age && (
          <span className="error-message">{errors.age}</span>
        )}
      </div>
      
      <div className="field checkbox-field">
        <label>
          <input
            name="agreeToTerms"
            type="checkbox"
            checked={values.agreeToTerms}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          I agree to the terms and conditions
        </label>
        {errors.agreeToTerms && touched.agreeToTerms && (
          <span className="error-message">{errors.agreeToTerms}</span>
        )}
      </div>
      
      <button 
        type="button" 
        onClick={() => handleSubmit(onSubmit)}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
};
```

#### 下午实践 (1-1.5小时)
**实践任务:**
1. 实现复杂表单处理
2. 创建自定义表单验证
3. 处理文件上传
4. 实现动态表单字段

### 第28-30天：React项目实践

#### 综合项目：任务管理应用

**项目需求:**
- 任务的增删改查
- 任务分类和优先级
- 任务搜索和过滤
- 本地存储持久化
- 响应式设计

**项目结构:**
```
task-manager/
├── src/
│   ├── components/
│   │   ├── TaskList.tsx
│   │   ├── TaskItem.tsx
│   │   ├── TaskForm.tsx
│   │   ├── FilterBar.tsx
│   │   └── SearchBox.tsx
│   ├── hooks/
│   │   ├── useTasks.ts
│   │   ├── useLocalStorage.ts
│   │   └── useDebounce.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── helpers.ts
│   └── styles/
│       └── global.css
```

**核心实现:**
```typescript
// src/types/index.ts
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskFilters {
  search: string;
  category: string;
  priority: string;
  status: 'all' | 'completed' | 'pending';
}

// src/hooks/useTasks.ts
import { useState, useCallback, useMemo } from 'react';
import { Task, TaskFilters } from '../types';
import { useLocalStorage } from './useLocalStorage';

export const useTasks = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [filters, setFilters] = useState<TaskFilters>({
    search: '',
    category: 'all',
    priority: 'all',
    status: 'all'
  });
  
  const addTask = useCallback((taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setTasks(prev => [...prev, newTask]);
  }, [setTasks]);
  
  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, ...updates, updatedAt: new Date() }
        : task
    ));
  }, [setTasks]);
  
  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, [setTasks]);
  
  const toggleTask = useCallback((id: string) => {
    updateTask(id, { completed: !tasks.find(t => t.id === id)?.completed });
  }, [tasks, updateTask]);
  
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                           task.description.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesCategory = filters.category === 'all' || task.category === filters.category;
      const matchesPriority = filters.priority === 'all' || task.priority === filters.priority;
      
      const matchesStatus = filters.status === 'all' ||
                           (filters.status === 'completed' && task.completed) ||
                           (filters.status === 'pending' && !task.completed);
      
      return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
    });
  }, [tasks, filters]);
  
  const categories = useMemo(() => {
    return Array.from(new Set(tasks.map(task => task.category)));
  }, [tasks]);
  
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;
    const highPriority = tasks.filter(task => task.priority === 'high' && !task.completed).length;
    
    return { total, completed, pending, highPriority };
  }, [tasks]);
  
  return {
    tasks: filteredTasks,
    filters,
    categories,
    stats,
    setFilters,
    addTask,
    updateTask,
    deleteTask,
    toggleTask
  };
};
```

## 学习资源

### 官方文档
- [React官方文档](https://react.dev/)
- [React 19发布说明](https://react.dev/blog/2024/04/25/react-19)
- [React Hooks参考](https://react.dev/reference/react)

### 学习平台
- [React官方教程](https://react.dev/learn)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [React Patterns](https://reactpatterns.com/)

### 实践项目
- [React练习题](https://github.com/alexgurr/react-coding-challenges)
- [React项目集合](https://github.com/topics/react-projects)

## 评估标准

### 技能检查清单
- [ ] 熟练掌握React核心概念
- [ ] 精通Hooks的使用和原理
- [ ] 能够构建复杂的交互式应用
- [ ] 掌握状态管理和事件处理
- [ ] 理解React性能优化
- [ ] 具备组件设计能力

### 项目评估标准
**基础要求 (60分):**
- 正确使用React基础概念
- 实现基本的组件交互
- 无明显的React使用错误

**进阶要求 (80分):**
- 熟练运用Hooks
- 良好的组件设计
- 合理的状态管理

**优秀标准 (100分):**
- 优秀的组件架构设计
- 高效的性能优化
- 完善的用户体验
- 可维护的代码结构

## 常见问题和解决方案

**Q: 什么时候使用useState，什么时候使用useReducer？**
A: 简单状态用useState，复杂状态逻辑用useReducer。当状态更新逻辑复杂或涉及多个子值时，useReducer更合适。

**Q: 如何避免不必要的重新渲染？**
A: 使用React.memo、useMemo、useCallback等优化工具，合理设计组件结构，避免在render中创建新对象。

**Q: Hook的依赖数组应该如何设置？**
A: 包含Hook内部使用的所有外部变量，使用ESLint插件帮助检查，避免遗漏依赖。

## 下一步学习

完成本模块后，你将具备：
- 扎实的React开发基础
- 现代React开发技能
- 组件化开发思维
- 交互式应用构建能力

**准备进入第二阶段：现代前端框架**
- 确保React基础扎实
- 理解组件化开发思想
- 为高级React特性学习做好准备

---

**记住：React是现代前端开发的核心技能，掌握React将为你的前端开发之路奠定坚实的基础！**