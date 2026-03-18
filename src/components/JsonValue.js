import { useIntl } from '@kne/react-intl';
import { useCallback } from 'react';
import classNames from 'classnames';
import { getDataType } from '../utils/helpers';
import HighlightText from './HighlightText';
import style from '../style.module.scss';

const JsonValue = ({ data, path, onToggle, collapsedKeys, highlight, matchedPaths, indentWidth }) => {
  const { formatMessage } = useIntl();
  const type = getDataType(data);
  const key = path.join('.');
  const isCollapsed = collapsedKeys.has(key);
  const isMatched = matchedPaths.has(key);

  const handleToggle = useCallback(() => {
    onToggle(key);
  }, [key, onToggle]);

  if (type === 'null') {
    return <span className={classNames(style.null, { [style.matched]: isMatched })}>null</span>;
  }

  if (type === 'undefined') {
    return <span className={classNames(style.null, { [style.matched]: isMatched })}>undefined</span>;
  }

  if (type === 'boolean') {
    return (
      <span className={classNames(style.boolean, { [style.matched]: isMatched })}>
        <HighlightText text={data ? 'true' : 'false'} highlight={highlight} />
      </span>
    );
  }

  if (type === 'number') {
    return (
      <span className={classNames(style.number, { [style.matched]: isMatched })}>
        <HighlightText text={String(data)} highlight={highlight} />
      </span>
    );
  }

  if (type === 'string') {
    return (
      <span className={classNames(style.string, { [style.matched]: isMatched })}>
        "<HighlightText text={data} highlight={highlight} />"
      </span>
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
        <span className={style.toggle} onClick={handleToggle}>
          <span className={classNames(style.arrow, { [style.expanded]: !isCollapsed })}>▶</span>
          <span className={style.bracket}>{openBracket}</span>
        </span>
        {isCollapsed && (
          <span className={style.preview}>
            ...{entries.length} {formatMessage({ id: `JsonView.${type === 'array' ? 'items' : 'keys'}` })}
          </span>
        )}
        {isCollapsed && <span className={style.bracket}>{closeBracket}</span>}
        {!isCollapsed && (
          <span className={style.content} style={{ paddingLeft: `${indentWidth}px` }}>
            {entries.map(([keyName, value], index) => (
              <div key={keyName} className={style.line}>
                <span className={style.key}>{type === 'object' ? `"${keyName}"` : keyName}</span>
                <span className={style.colon}>:</span>
                <JsonValue data={value} path={[...path, keyName]} onToggle={onToggle} collapsedKeys={collapsedKeys} highlight={highlight} matchedPaths={matchedPaths} indentWidth={indentWidth} />
                {index < entries.length - 1 && <span className={style.comma}>,</span>}
              </div>
            ))}
            <span className={style.line}>
              <span className={style.bracket}>{closeBracket}</span>
            </span>
          </span>
        )}
      </span>
    );
  }

  return <span>{String(data)}</span>;
};

export default JsonValue;
