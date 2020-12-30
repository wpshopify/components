import { StorefrontContext } from '../_state/context';
import { FilterHook } from '../../../common/utils';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

const { useContext } = wp.element;

function StorefrontSelectionsClear() {
  const [storefrontState, storefrontDispatch] = useContext(StorefrontContext);

  function clearAllSelections() {
    storefrontDispatch({ type: 'CLEAR_SELECTIONS' });
    storefrontDispatch({ type: 'CLEAR_SELECTED_VENDORS' });
    storefrontDispatch({ type: 'CLEAR_SELECTED_TAGS' });
    storefrontDispatch({ type: 'CLEAR_SELECTED_TYPES' });
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
