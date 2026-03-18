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
