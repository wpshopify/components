/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { FilterHook } from '/Users/arobbins/www/_devilbox/devilbox/data/www/wpshopify-utils';
import { useItemsDispatch } from '../../items/_state/hooks';
import { useStorefrontDispatch } from '../_state/hooks';

function StorefrontSelectionsClear() {
  const itemsDispatch = useItemsDispatch();
  const storefrontDispatch = useStorefrontDispatch();

  function clearAllSelections() {
    itemsDispatch({ type: 'SET_IS_LOADING', payload: true });
    storefrontDispatch({ type: 'CLEAR_SELECTIONS' });
  }

  const clearAllCSS = css`
    text-decoration: underline;
    font-size: 90%;
    margin-left: 0;
    margin-top: 20px;

    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
  `;

  return (
    <div className='wps-filter-selections-clear' onClick={clearAllSelections} css={clearAllCSS}>
      <FilterHook name='storefront.selections.clear.text'>
        {wp.i18n.__('Clear all', 'wpshopify')}
      </FilterHook>
    </div>
  );
}

export { StorefrontSelectionsClear };
