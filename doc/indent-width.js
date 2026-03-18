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
