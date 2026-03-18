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
