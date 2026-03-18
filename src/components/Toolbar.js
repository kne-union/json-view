import { useIntl } from '@kne/react-intl';
import classNames from 'classnames';
import style from '../style.module.scss';

const Toolbar = ({ searchQuery, onSearchChange, onToggleExpand, isAllExpanded, theme, searchable, collapsable }) => {
  const { formatMessage } = useIntl();

  return (
    <div className={classNames(style.toolbar, style[`theme-${theme}`], { [style['toolbar-right']]: !searchable && collapsable })}>
      {searchable && (
        <div className={style['search-wrapper']}>
          <input type="text" value={searchQuery} onChange={e => onSearchChange(e.target.value)} placeholder={formatMessage({ id: 'JsonView.searchPlaceholder' })} className={style['search-input']} />
          {searchQuery && (
            <button className={style['clear-btn']} onClick={() => onSearchChange('')}>
              ×
            </button>
          )}
        </div>
      )}
      {collapsable && (
        <button className={style['action-btn']} onClick={onToggleExpand} title={formatMessage({ id: isAllExpanded ? 'JsonView.collapseAll' : 'JsonView.expandAll' })}>
          {formatMessage({ id: isAllExpanded ? 'JsonView.collapse' : 'JsonView.expand' })}
        </button>
      )}
    </div>
  );
};

export default Toolbar;
