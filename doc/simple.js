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
