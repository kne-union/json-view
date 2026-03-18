# json-view

### 描述

一个用于友好展示 JSON 数据的 React 组件，支持语法高亮、层级展开收起、自定义展开深度等功能

### 安装

```shell
npm i --save @kne/json-view
```

### 概述

### JsonView

一个用于友好展示 JSON 数据的 React 组件，支持语法高亮、层级展开收起、自定义展开深度等功能。

### 主要特性

- **语法高亮**: 不同数据类型（字符串、数字、布尔值、null等）使用不同颜色显示
- **层级控制**: 支持通过 `collapsedFrom` 属性指定从第几级开始收起
- **交互式展开**: 每一层级的对象和数组都可以点击展开或收起
- **类型提示**: 数组和对象显示长度或键数量
- **深色主题**: 默认采用类似 VS Code 的深色主题风格

### 适用场景

- API 响应数据展示
- 配置文件可视化
- 调试工具中的数据查看
- 数据结构文档展示


### 示例

#### 示例代码

- 基础示例
- 展示 JsonView 组件的基本用法，黑色主题 + 搜索功能
- _JsonView(@kne/current-lib_json-view)[import * as _JsonView from "@kne/json-view"],(@kne/current-lib_json-view/dist/index.css)[import "@kne/json-view/dist/index.css"]

```jsx
const { default: JsonView } = _JsonView;

const mockData = {
  name: "John Doe",
  age: 30,
  isActive: true,
  email: "john@example.com",
  address: {
    street: "123 Main St",
    city: "New York",
    zipCode: "10001",
    coordinates: {
      lat: 40.7128,
      lng: -74.006
    }
  },
  skills: ["JavaScript", "React", "Node.js", "TypeScript"],
  projects: [
    {
      id: 1,
      name: "Project Alpha",
      status: "active"
    },
    {
      id: 2,
      name: "Project Beta",
      status: "completed"
    }
  ],
  settings: {
    theme: "dark",
    notifications: {
      email: true,
      push: false,
      sms: null
    }
  }
};

const BaseExample = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h4 style={{ marginBottom: 12 }}>默认黑色主题 + 搜索功能</h4>
        <JsonView data={mockData} />
      </div>
    </div>
  );
};

render(<BaseExample />);

```

- 搜索功能
- 展示搜索功能和高亮效果，以及关闭搜索功能
- _JsonView(@kne/current-lib_json-view)[import * as _JsonView from "@kne/json-view"],(@kne/current-lib_json-view/dist/index.css)[import "@kne/json-view/dist/index.css"]

```jsx
const { default: JsonView } = _JsonView;

const mockData = {
  users: [
    { id: 1, name: "Alice Johnson", role: "Admin", email: "alice@example.com" },
    { id: 2, name: "Bob Smith", role: "User", email: "bob@example.com" },
    { id: 3, name: "Charlie Brown", role: "Editor", email: "charlie@example.com" }
  ],
  products: [
    { id: 101, name: "Laptop", price: 999.99, stock: 50 },
    { id: 102, name: "Mouse", price: 29.99, stock: 200 },
    { id: 103, name: "Keyboard", price: 79.99, stock: 150 }
  ],
  settings: {
    appName: "My Application",
    version: "2.0.1",
    features: {
      darkMode: true,
      notifications: true,
      analytics: false
    }
  }
};

const SearchExample = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <h4 style={{ marginBottom: 12 }}>搜索功能示例（尝试搜索 "Admin" 或 "Mouse"）</h4>
        <JsonView data={mockData} />
      </div>
      <div>
        <h4 style={{ marginBottom: 12 }}>关闭搜索功能</h4>
        <JsonView data={mockData} searchable={false} />
      </div>
    </div>
  );
};

render(<SearchExample />);

```

- 主题切换
- 动态切换白色和黑色主题
- _JsonView(@kne/current-lib_json-view)[import * as _JsonView from "@kne/json-view"],(@kne/current-lib_json-view/dist/index.css)[import "@kne/json-view/dist/index.css"]

```jsx
const { default: JsonView } = _JsonView;
const { useState } = React;

const mockData = {
  id: 1001,
  name: "示例产品",
  price: 99.99,
  inStock: true,
  tags: ["热销", "推荐"],
  metadata: {
    createdAt: "2024-01-15",
    updatedAt: "2024-03-10",
    author: {
      name: "Admin",
      role: "editor"
    }
  }
};

const ThemeExample = () => {
  const [theme, setTheme] = useState('light');
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <button 
          onClick={() => setTheme('light')}
          style={{ 
            padding: '8px 16px', 
            background: theme === 'light' ? '#0ea5e9' : '#e5e7eb',
            color: theme === 'light' ? '#fff' : '#1f2937',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer'
          }}
        >
          白色主题
        </button>
        <button 
          onClick={() => setTheme('dark')}
          style={{ 
            padding: '8px 16px', 
            background: theme === 'dark' ? '#0ea5e9' : '#e5e7eb',
            color: theme === 'dark' ? '#fff' : '#1f2937',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer'
          }}
        >
          黑色主题
        </button>
      </div>
      <div style={{ background: theme === 'dark' ? '#1e1e1e' : 'transparent', padding: 16, borderRadius: 8 }}>
        <JsonView data={mockData} theme={theme} />
      </div>
    </div>
  );
};

render(<ThemeExample />);

```

- 简单数据
- 展示简单 JSON 数据的渲染效果
- _JsonView(@kne/current-lib_json-view)[import * as _JsonView from "@kne/json-view"],(@kne/current-lib_json-view/dist/index.css)[import "@kne/json-view/dist/index.css"]

```jsx
const { default: JsonView } = _JsonView;

const simpleData = {
  id: 1001,
  name: "示例产品",
  price: 99.99,
  inStock: true,
  tags: ["热销", "推荐", "新品"],
  description: null
};

const SimpleExample = () => {
  return (
    <JsonView data={simpleData} />
  );
};

render(<SimpleExample />);

```

- 数组数据
- 展示数组类型 JSON 数据的渲染效果
- _JsonView(@kne/current-lib_json-view)[import * as _JsonView from "@kne/json-view"],(@kne/current-lib_json-view/dist/index.css)[import "@kne/json-view/dist/index.css"]

```jsx
const { default: JsonView } = _JsonView;

const arrayData = [
  { id: 1, name: "Item 1", value: 100 },
  { id: 2, name: "Item 2", value: 200 },
  { id: 3, name: "Item 3", value: 300 }
];

const ArrayExample = () => {
  return (
    <JsonView data={arrayData} collapsedFrom={2} />
  );
};

render(<ArrayExample />);

```

- 深层嵌套
- 展示深层嵌套数据的渲染效果
- _JsonView(@kne/current-lib_json-view)[import * as _JsonView from "@kne/json-view"],(@kne/current-lib_json-view/dist/index.css)[import "@kne/json-view/dist/index.css"]

```jsx
const { default: JsonView } = _JsonView;

// 创建深度嵌套的数据结构
const createDeepNestedData = (depth, currentLevel = 1) => {
  if (currentLevel >= depth) {
    return {
      level: currentLevel,
      value: "这是最深层的值",
      description: "这是一个非常长的字符串用来测试超出页面宽度的显示效果，希望能够看到完整的文本内容并且有良好的换行和滚动体验，同时验证组件在处理超长文本时的稳定性和性能表现"
    };
  }
  
  return {
    level: currentLevel,
    nested: {
      child: createDeepNestedData(depth, currentLevel + 1)
    },
    arrayData: [
      { index: 0, name: "第一个元素" },
      { index: 1, name: "第二个元素" }
    ]
  };
};

// 创建包含超长字符串的数据
const dataWithLongStrings = {
  shortField: "短文本",
  veryLongStringField: "这是一个非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常长的字符串，用于测试当文本超出容器宽度时的显示效果，看看是否能够正确换行或者提供滚动功能",
  nestedWithLongString: {
    anotherLongString: "嵌套对象中的超长字符串：Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    deepNested: {
      level3: {
        level4: {
          level5: {
            level6: {
              level7: {
                level8: {
                  level9: {
                    level10: {
                      finalValue: "到达第10层！这是一个深度嵌套的结构",
                      ultraLongText: "在第10层中放置一个超长的字符串来测试极限情况下的显示效果：这是一段很长的文本内容，用于验证组件在处理深度嵌套和超长文本时的表现，希望能够看到良好的视觉效果和用户体验"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  longArray: Array.from({ length: 20 }, (_, i) => ({
    id: i,
    name: &#96;项目编号 ${i}&#96;,
    description: &#96;这是第 ${i} 个项目的详细描述信息，包含一些额外的文本内容来增加每行的长度，看看在数组元素较多且内容较长时的显示效果如何&#96;
  }))
};

// 深度嵌套数据
const deepNestedData = createDeepNestedData(15);

const DeepNestedExample = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h4 style={{ marginBottom: 12 }}>深度嵌套数据 (15层)</h4>
        <JsonView data={deepNestedData} collapsedFrom={5} />
      </div>
      <div>
        <h4 style={{ marginBottom: 12 }}>包含超长字符串的数据</h4>
        <JsonView data={dataWithLongStrings} collapsedFrom={3} indentWidth={24} />
      </div>
    </div>
  );
};

render(<DeepNestedExample />);

```

- 数据类型展示
- 展示各种数据类型的渲染效果
- _JsonView(@kne/current-lib_json-view)[import * as _JsonView from "@kne/json-view"],(@kne/current-lib_json-view/dist/index.css)[import "@kne/json-view/dist/index.css"]

```jsx
const { default: JsonView } = _JsonView;

const typesData = {
  string: "Hello World",
  number: 42,
  float: 3.14159,
  booleanTrue: true,
  booleanFalse: false,
  nullValue: null,
  undefinedValue: undefined,
  emptyArray: [],
  emptyObject: {},
  nestedArray: [[1, 2], [3, 4]],
  nestedObject: {
    inner: {
      deep: "value"
    }
  }
};

const TypesExample = () => {
  return <JsonView data={typesData} />;
};

render(<TypesExample />);

```

- 缩进宽度调整
- 展示如何动态调整 JSON 数据的缩进宽度
- _JsonView(@kne/current-lib_json-view)[import * as _JsonView from "@kne/json-view"],(@kne/current-lib_json-view/dist/index.css)[import "@kne/json-view/dist/index.css"]

```jsx
const { default: JsonView } = _JsonView;
const { useState } = React;

const mockData = {
  id: 1001,
  name: "示例产品",
  price: 99.99,
  inStock: true,
  tags: ["热销", "推荐"],
  metadata: {
    createdAt: "2024-01-15",
    updatedAt: "2024-03-10",
    author: {
      name: "Admin",
      role: "editor"
    }
  }
};

const IndentWidthExample = () => {
  const [indentWidth, setIndentWidth] = useState(20);
  
  const handleDecrease = () => {
    setIndentWidth(prev => Math.max(10, prev - 5));
  };
  
  const handleIncrease = () => {
    setIndentWidth(prev => Math.min(50, prev + 5));
  };
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 14, color: '#666' }}>缩进宽度：</span>
        <button 
          onClick={handleDecrease}
          disabled={indentWidth <= 10}
          style={{ 
            width: 32,
            height: 32,
            padding: 0,
            background: indentWidth <= 10 ? '#f3f4f6' : '#0ea5e9',
            color: indentWidth <= 10 ? '#9ca3af' : '#fff',
            border: 'none',
            borderRadius: 4,
            cursor: indentWidth <= 10 ? 'not-allowed' : 'pointer',
            fontSize: 18,
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          −
        </button>
        <span style={{ 
          fontSize: 16, 
          fontWeight: 'bold', 
          minWidth: 40, 
          textAlign: 'center',
          color: '#1f2937'
        }}>
          {indentWidth}px
        </span>
        <button 
          onClick={handleIncrease}
          disabled={indentWidth >= 50}
          style={{ 
            width: 32,
            height: 32,
            padding: 0,
            background: indentWidth >= 50 ? '#f3f4f6' : '#0ea5e9',
            color: indentWidth >= 50 ? '#9ca3af' : '#fff',
            border: 'none',
            borderRadius: 4,
            cursor: indentWidth >= 50 ? 'not-allowed' : 'pointer',
            fontSize: 18,
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          +
        </button>
      </div>
      <div style={{ background: '#1e1e1e', padding: 16, borderRadius: 8 }}>
        <JsonView data={mockData} theme="dark" indentWidth={indentWidth} />
      </div>
    </div>
  );
};

render(<IndentWidthExample />);

```

### API

### JsonView

用于友好地展示 JSON 数据的组件，支持层级展开/收起、语法高亮、搜索功能、展开/收起全部、复制JSON数据、黑白双主题。

#### 属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|-------|------|
| data | any | - | 要展示的 JSON 数据，支持任意类型 |
| collapsedFrom | number | Infinity | 从第几级开始收起，默认全部展开 |
| theme | 'light' \| 'dark' | 'dark' | 主题模式 |
| searchable | boolean | true | 是否开启搜索功能 |
| collapsable | boolean | true | 是否显示展开/收起全部按钮 |
| indentWidth | number | 20 | 缩进宽度（像素） |
| className | string | - | 自定义容器样式类名 |

#### 搜索功能

- **关键字搜索**: 使用 Fuse.js 实现模糊搜索
- **高亮显示**: 匹配的关键字会高亮显示
- **自动展开**: 包含搜索结果的节点会自动展开
- **实时搜索**: 输入即时响应

#### 展开收起操作

- **切换按钮**: 点击展开/收起图标按钮切换全部节点的展开/收起状态
- **单节点操作**: 点击单个节点前的箭头展开/收起该节点
- **图标提示**: 鼠标悬停在图标按钮上会显示提示文本

#### 复制功能

- **一键复制**: 点击复制图标按钮将格式化的 JSON 数据复制到剪贴板
- **格式化输出**: 复制的 JSON 数据已格式化（缩进 2 个空格）
- **复制反馈**: 复制成功后图标变为对勾，2 秒后自动恢复
- **图标提示**: 鼠标悬停在图标按钮上会显示提示文本

#### 主题样式

**白色主题**
- 背景: 白色 `#ffffff`
- 高亮: 黄色背景 `#fef08a`

**黑色主题** - 默认
- 背景: 深色 `#1e1e1e`
- 高亮: 金色背景 `#604500`

#### 使用示例

```jsx
import JsonView from '@kne/json-view';

// 基础用法 - 黑色主题 + 搜索 + 展开/收起按钮
<JsonView data={data} />

// 白色主题
<JsonView data={data} theme="light" />

// 关闭搜索功能
<JsonView data={data} searchable={false} />

// 关闭展开/收起全部按钮
<JsonView data={data} collapsable={false} />

// 仅显示展开/收起按钮，无搜索
<JsonView data={data} searchable={false} collapsable={true} />

// 从第2级开始收起
<JsonView data={data} collapsedFrom={2} />

// 自定义缩进宽度
<JsonView data={data} indentWidth={40} />
```

#### 功能特性

- **搜索功能**: 基于 Fuse.js 的模糊搜索，关键字高亮
- **双主题支持**: 白色和黑色两种主题
- **语法高亮**: 不同数据类型使用不同颜色
- **层级控制**: 支持展开/收起，`collapsedFrom` 控制初始状态
- **缩进引导线**: 虚线显示层级关系
- **自定义缩进**: 通过 `indentWidth` 参数配置缩进宽度
- **复制功能**: 一键复制格式化的 JSON 数据到剪贴板
