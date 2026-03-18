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
    name: `项目编号 ${i}`,
    description: `这是第 ${i} 个项目的详细描述信息，包含一些额外的文本内容来增加每行的长度，看看在数组元素较多且内容较长时的显示效果如何`
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
