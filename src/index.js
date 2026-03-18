import { useIntl } from '@kne/react-intl';
import withLocale from './withLocale';
import { useState, useCallback, useMemo, useEffect } from 'react';
import classNames from 'classnames';
import Fuse from 'fuse.js';
import { collectCollapsedKeys, collectAllData, collectAllCollapsibleKeys, getMatchedPaths } from './utils/helpers';
import JsonValue from './components/JsonValue';
import Toolbar from './components/Toolbar';
import style from './style.module.scss';

const JsonView = withLocale(({ data, collapsedFrom = Infinity, theme = 'dark', searchable = true, collapsable = true, indentWidth = 20, className }) => {
  useIntl();

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
      {(searchable || collapsable) && <Toolbar searchQuery={searchQuery} onSearchChange={setSearchQuery} onToggleExpand={handleToggleExpand} isAllExpanded={isAllExpanded} theme={theme} searchable={searchable} collapsable={collapsable} />}
      <div className={style.container}>
        <JsonValue data={data} path={['root']} onToggle={handleToggle} collapsedKeys={collapsedKeys} highlight={searchQuery} matchedPaths={matchedPaths} indentWidth={indentWidth} />
      </div>
    </div>
  );
});

export default JsonView;
