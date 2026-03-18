import { useIntl } from '@kne/react-intl';
import { useState } from 'react';
import classNames from 'classnames';
import style from '../style.module.scss';
import { CopyIcon, CheckIcon, ExpandIcon, CollapseIcon } from '../icons';

const Toolbar = ({ searchQuery, onSearchChange, onToggleExpand, isAllExpanded, theme, searchable, collapsable, data }) => {
  const { formatMessage } = useIntl();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const jsonStr = JSON.stringify(data, null, 2);
      await navigator.clipboard.writeText(jsonStr);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

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
      <div className={style['button-group']}>
        <button className={style['action-btn']} onClick={handleCopy} title={formatMessage({ id: copied ? 'JsonView.copied' : 'JsonView.copy' })}>
          {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
        {collapsable && (
          <button className={style['action-btn']} onClick={onToggleExpand} title={formatMessage({ id: isAllExpanded ? 'JsonView.collapseAll' : 'JsonView.expandAll' })}>
            {isAllExpanded ? <CollapseIcon /> : <ExpandIcon />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Toolbar;
