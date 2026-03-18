import { useIntl } from '@kne/react-intl';
import withLocale from './withLocale';
import { useState, useCallback, useMemo, useEffect } from 'react';
import classNames from 'classnames';
import Fuse from 'fuse.js';
import { collectCollapsedKeys, collectAllData, collectAllCollapsibleKeys, getMatchedPaths, getDataType, getNodeLineCount } from './utils/helpers';
import JsonValue from './components/JsonValue';
import Toolbar from './components/Toolbar';
import style from './style.module.scss';

const JsonView = withLocale(({ data, collapsedFrom = Infinity, theme = 'dark', searchable = true, collapsable = true, indentWidth = 20, showLineNumbers = true, className }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const initialCollapsedKeys = useMemo(() => {
    if (data === undefined || collapsedFrom === Infinity) {
      return new Set();
    }
    return collectCollapsedKeys(data, collapsedFrom);
  }, [data, collapsedFrom]);

  const [collapsedKeys, setCollapsedKeys] = useState(initialCollapsedKeys);

  const allCollapsibleKeys = useMemo(() => {
    if (data === undefined) return new Set();
    return collectAllCollapsibleKeys(data);
  }, [data]);

  const allData = useMemo(() => {
    if (data === undefined) return [];
    return collectAllData(data);
  }, [data]);

  const fuse = useMemo(() => {
    return new Fuse(allData, {
      keys: ['value'],
      includeMatches: true,
      threshold: 0.3,
      ignoreLocation: true,
      minMatchCharLength: 1
    });
  }, [allData]);

  const matchedPaths = useMemo(() => {
    return getMatchedPaths(fuse, searchQuery);
  }, [fuse, searchQuery]);

  useEffect(() => {
    if (searchQuery && matchedPaths.size > 0) {
      setCollapsedKeys(prev => {
        const next = new Set(prev);
        matchedPaths.forEach(path => {
          if (next.has(path)) {
            next.delete(path);
          }
        });
        return next;
      });
    }
  }, [searchQuery, matchedPaths]);

  const handleToggle = useCallback(key => {
    setCollapsedKeys(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  const handleExpandAll = useCallback(() => {
    setCollapsedKeys(new Set());
  }, []);

  const handleCollapseAll = useCallback(() => {
    setCollapsedKeys(new Set(allCollapsibleKeys));
  }, [allCollapsibleKeys]);

  // 判断是否全部展开
  const isAllExpanded = collapsedKeys.size === 0;

  // 计算完全展开后的总行数
  const totalLineCount = useMemo(() => {
    if (data === undefined) return 1;
    return getNodeLineCount(data);
  }, [data]);

  // 根节点收起时的行数
  const rootLineCount = useMemo(() => {
    const type = getDataType(data);
    if (type !== 'array' && type !== 'object') return 1;
    if (!collapsedKeys.has('root')) return 1; // 展开时正常处理
    return totalLineCount;
  }, [data, collapsedKeys, totalLineCount]);

  // 计算行号区域宽度 (等宽字体 12px 约 7.2px/字符，最小 32px，右侧加 12px 边距)
  const lineNumberWidth = useMemo(() => {
    const digits = String(totalLineCount).length;
    return Math.max(32, Math.ceil(digits * 7.5 + 12));
  }, [totalLineCount]);

  // 切换展开/收起
  const handleToggleExpand = useCallback(() => {
    if (isAllExpanded) {
      handleCollapseAll();
    } else {
      handleExpandAll();
    }
  }, [isAllExpanded, handleExpandAll, handleCollapseAll]);

  if (data === undefined) {
    return (
      <div className={classNames(style.container, style[`theme-${theme}`], className)}>
        <span className={style.null}>undefined</span>
      </div>
    );
  }

  return (
    <div className={classNames(style.wrapper, style[`theme-${theme}`], className)}>
      {(searchable || collapsable) && (
        <Toolbar searchQuery={searchQuery} onSearchChange={setSearchQuery} onToggleExpand={handleToggleExpand} isAllExpanded={isAllExpanded} theme={theme} searchable={searchable} collapsable={collapsable} data={data} />
      )}
      <div className={classNames(style.container, { [style['show-line-numbers']]: showLineNumbers })} style={showLineNumbers ? { '--line-number-width': `${lineNumberWidth}px` } : undefined}>
        <div className={style.line} style={rootLineCount > 1 ? { '--line-count': rootLineCount } : undefined}>
          <JsonValue data={data} path={['root']} onToggle={handleToggle} collapsedKeys={collapsedKeys} highlight={searchQuery} matchedPaths={matchedPaths} indentWidth={indentWidth} />
        </div>
      </div>
    </div>
  );
});

export default JsonView;
