import { ItemsContext } from '../../items/_state/context';
import { StorefrontContext } from '../_state/context';
import { FilterHook } from '../../../common/utils';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

const { useContext } = wp.element;

function StorefrontSelectionsClear() {
  const [, itemsDispatch] = useContext(ItemsContext);
  const [storefrontState, storefrontDispatch] = useContext(StorefrontContext);

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
