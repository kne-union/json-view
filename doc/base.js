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
