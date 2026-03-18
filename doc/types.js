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
