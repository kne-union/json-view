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
