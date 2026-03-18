export const getDataType = data => {
  if (data === null) return 'null';
  if (Array.isArray(data)) return 'array';
  return typeof data;
};

export const collectCollapsedKeys = (data, collapsedFrom, path = ['root'], depth = 0) => {
  const keys = new Set();
  const type = getDataType(data);

  if (type !== 'array' && type !== 'object') {
    return keys;
  }

  if (depth >= collapsedFrom) {
    keys.add(path.join('.'));
  }

  if (type === 'array') {
    data.forEach((item, index) => {
      const childKeys = collectCollapsedKeys(item, collapsedFrom, [...path, index], depth + 1);
      childKeys.forEach(key => keys.add(key));
    });
  } else if (type === 'object') {
    Object.entries(data).forEach(([keyName, value]) => {
      const childKeys = collectCollapsedKeys(value, collapsedFrom, [...path, keyName], depth + 1);
      childKeys.forEach(key => keys.add(key));
    });
  }

  return keys;
};

export const collectAllData = (data, path = ['root']) => {
  const items = [];
  const type = getDataType(data);

  const pathStr = path.join('.');
  items.push({ path: pathStr, value: data, type });

  if (type === 'array') {
    data.forEach((item, index) => {
      items.push(...collectAllData(item, [...path, index]));
    });
  } else if (type === 'object' && data !== null) {
    Object.entries(data).forEach(([keyName, value]) => {
      items.push(...collectAllData(value, [...path, keyName]));
    });
  }

  return items;
};

export const collectAllCollapsibleKeys = (data, path = ['root']) => {
  const keys = new Set();
  const type = getDataType(data);

  if (type !== 'array' && type !== 'object') {
    return keys;
  }

  const entries = type === 'array' ? data : Object.entries(data);
  if (type === 'array' && data.length === 0) return keys;
  if (type === 'object' && Object.keys(data).length === 0) return keys;

  keys.add(path.join('.'));

  if (type === 'array') {
    data.forEach((item, index) => {
      const childKeys = collectAllCollapsibleKeys(item, [...path, index]);
      childKeys.forEach(key => keys.add(key));
    });
  } else {
    Object.entries(data).forEach(([keyName, value]) => {
      const childKeys = collectAllCollapsibleKeys(value, [...path, keyName]);
      childKeys.forEach(key => keys.add(key));
    });
  }

  return keys;
};

export const getMatchedPaths = (fuse, query) => {
  if (!query || !fuse) return new Set();

  const results = fuse.search(query);
  const matchedPaths = new Set();

  results.forEach(result => {
    const path = result.item.path;
    matchedPaths.add(path);
    const parts = path.split('.');
    for (let i = 1; i < parts.length; i++) {
      matchedPaths.add(parts.slice(0, i).join('.'));
    }
  });

  return matchedPaths;
};
