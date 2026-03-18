import { useIntl } from '@kne/react-intl';
import { useCallback } from 'react';
import classNames from 'classnames';
import { getDataType, getNodeLineCount } from '../utils/helpers';
import HighlightText from './HighlightText';
import style from '../style.module.scss';

const JsonValue = ({ data, path, onToggle, collapsedKeys, highlight, matchedPaths, indentWidth, showComma }) => {
  const { formatMessage } = useIntl();
  const type = getDataType(data);
  const key = path.join('.');
  const isCollapsed = collapsedKeys.has(key);
  const isMatched = matchedPaths.has(key);

  const handleToggle = useCallback(() => {
    onToggle(key);
  }, [key, onToggle]);

  if (type === 'null') {
    return (
      <>
        <span className={classNames(style.null, { [style.matched]: isMatched })}>null</span>
        {showComma && <span className={style.comma}>,</span>}
      </>
    );
  }

  if (type === 'undefined') {
    return (
      <>
        <span className={classNames(style.null, { [style.matched]: isMatched })}>undefined</span>
        {showComma && <span className={style.comma}>,</span>}
      </>
    );
  }

  if (type === 'boolean') {
    return (
      <>
        <span className={classNames(style.boolean, { [style.matched]: isMatched })}>
          <HighlightText text={data ? 'true' : 'false'} highlight={highlight} />
        </span>
        {showComma && <span className={style.comma}>,</span>}
      </>
    );
  }

  if (type === 'number') {
    return (
      <>
        <span className={classNames(style.number, { [style.matched]: isMatched })}>
          <HighlightText text={String(data)} highlight={highlight} />
        </span>
        {showComma && <span className={style.comma}>,</span>}
      </>
    );
  }

  if (type === 'string') {
    return (
      <>
        <span className={classNames(style.string, { [style.matched]: isMatched })}>
          "<HighlightText text={data} highlight={highlight} />"
        </span>
        {showComma && <span className={style.comma}>,</span>}
      </>
    );
  }

  if (type === 'array' || type === 'object') {
    const entries = type === 'array' ? data.map((item, index) => [index, item]) : Object.entries(data);
    const isEmpty = entries.length === 0;
    const openBracket = type === 'array' ? '[' : '{';
    const closeBracket = type === 'array' ? ']' : '}';

    if (isEmpty) {
      return (
        <span className={style.bracket}>
          {openBracket}
          {closeBracket}
        </span>
      );
    }

    return (
      <span className={style.collapsible}>
        <span className={style['open-line']}>
          <span className={style.toggle} onClick={handleToggle}>
            <span className={classNames(style.arrow, { [style.expanded]: !isCollapsed })}>▶</span>
            <span className={style.bracket}>{openBracket}</span>
          </span>
        </span>
        {isCollapsed && (
          <span className={style.preview}>
            ...{entries.length} {formatMessage({ id: `JsonView.${type === 'array' ? 'items' : 'keys'}` })}
          </span>
        )}
        {isCollapsed && (
          <>
            <span className={style.bracket}>{closeBracket}</span>
            {showComma && <span className={style.comma}>,</span>}
          </>
        )}
        {!isCollapsed && (
          <>
            <span className={style.content} style={{ paddingLeft: `${indentWidth}px` }}>
              {entries.map(([keyName, value], index) => {
                const childPath = [...path, keyName];
                const childType = getDataType(value);
                const childKey = childPath.join('.');
                const isChildCollapsed = collapsedKeys.has(childKey);
                const childLineCount = childType === 'array' || childType === 'object' ? getNodeLineCount(value) : 1;
                const shouldSkipLines = isChildCollapsed && childLineCount > 1;

                return (
                  <div key={keyName} className={style.line} style={shouldSkipLines ? { '--line-count': childLineCount } : undefined}>
                    <span className={style.key}>{type === 'object' ? `"${keyName}"` : keyName}</span>
                    <span className={style.colon}>:</span>
                    <JsonValue data={value} path={childPath} onToggle={onToggle} collapsedKeys={collapsedKeys} highlight={highlight} matchedPaths={matchedPaths} indentWidth={indentWidth} showComma={index < entries.length - 1} />
                  </div>
                );
              })}
            </span>
            <span className={style['close-line']}>
              <span className={style.bracket}>{closeBracket}</span>
              {showComma && <span className={style.comma}>,</span>}
            </span>
          </>
        )}
      </span>
    );
  }

  return <span>{String(data)}</span>;
};

export default JsonValue;
