export default {
  title: '行号显示',
  description: '展示行号显示功能，包括开关控制和收起时的行号跳过',
  file: '_JsonView(@kne/current-lib_json-view)[import * as _JsonView from "@kne/json-view"],(@kne/current-lib_json-view/dist/index.css)[import "@kne/json-view/dist/index.css"]',
  entry: `const { default: JsonView } = _JsonView;
const { useState } = React;

const mockData = {
  id: 1001,
  name: "示例产品",
  price: 99.99,
  inStock: true,
  tags: ["热销", "推荐", "新品"],
  metadata: {
    createdAt: "2024-01-15",
    updatedAt: "2024-03-10",
    author: {
      name: "Admin",
      role: "editor",
      contact: {
        email: "admin@example.com",
        phone: "+86-138-0000-0000"
      }
    }
  },
  items: [
    { id: 1, name: "商品A", quantity: 10 },
    { id: 2, name: "商品B", quantity: 20 },
    { id: 3, name: "商品C", quantity: 30 }
  ]
};

const LineNumbersExample = () => {
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={showLineNumbers}
            onChange={(e) => setShowLineNumbers(e.target.checked)}
          />
          <span>显示行号</span>
        </label>
      </div>
      <div style={{ background: '#1e1e1e', padding: 16, borderRadius: 8 }}>
        <JsonView data={mockData} theme="dark" showLineNumbers={showLineNumbers} />
      </div>
    </div>
  );
};

render(<LineNumbersExample />);`
};
