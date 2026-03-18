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
