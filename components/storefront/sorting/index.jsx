/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { StorefrontContext } from '../_state/context';
import { ItemsContext } from '../../items/_state/context';
import { usePortal } from '../../../common/hooks';
import { FilterHook } from '../../../common/utils';
const { useContext, useState } = wp.element;

function getSelectedOption(select) {
  return select.options[select.selectedIndex];
}

function hasReverse(select) {
  var selectedOption = getSelectedOption(select);

  return selectedOption.hasAttribute('data-wps-reverse');
}

function StorefrontSorting() {
  const [storefrontState] = useContext(StorefrontContext);
  const [itemsState, itemsDispatch] = useContext(ItemsContext);

  const [sortValue, setSortValue] = useState(() => storefrontState.payloadSettings.sortBy);

  function updateFetchParams(event) {
    let reverse = false;

    if (hasReverse(event.target)) {
      reverse = true;
    }

    let sortKey = event.target.value;

    if (sortKey.includes('-REVERSE')) {
      sortKey = sortKey.replace('-REVERSE', '');
    }

    return {
      reverse: reverse,
      sortKey: sortKey,
    };
  }

  function onChange(event) {
    setSortValue(event.target.value);

    itemsDispatch({
      type: 'MERGE_QUERY_PARAMS',
      payload: updateFetchParams(event),
    });
  }

  const sortingSelectorCSS = css`
    width: 100%;
    &:hover {
      cursor: pointer;
    }
  `;

  return usePortal(
    <div className='wps-component wps-component-sorting'>
      <label className='wps-sorting-heading wps-mr-2' htmlFor='wps-sorting'>
        <FilterHook name='storefront.sorting.label.text'>
          {wp.i18n.__('Sort by:', 'wpshopify')}
        </FilterHook>
      </label>

      <select
        value={sortValue}
        id='wps-sorting'
        onChange={onChange}
        disabled={itemsState.isLoading}
        css={sortingSelectorCSS}>
        <option value='DEFAULT' disabled='disabled'>
          {wp.hooks.applyFilters(
            'storefront.sorting.default.text',
            wp.i18n.__('Choose an option', 'wpshopify'),
            itemsState
          )}
        </option>
        <option value='PRICE'>
          {wp.hooks.applyFilters(
            'storefront.sorting.price.text',
            wp.i18n.__('Price (Low to high)', 'wpshopify'),
            itemsState
          )}
        </option>
        <option value='PRICE-REVERSE' data-wps-reverse>
          {wp.hooks.applyFilters(
            'storefront.sorting.priceReverse.text',
            wp.i18n.__('Price (High to low)', 'wpshopify'),
            itemsState
          )}
        </option>
        <option value='CREATED_AT' data-wps-reverse>
          {wp.hooks.applyFilters(
            'storefront.sorting.newArrival.text',
            wp.i18n.__('New Arrival', 'wpshopify'),
            itemsState
          )}
        </option>
        <option value='BEST_SELLING'>
          {wp.hooks.applyFilters(
            'storefront.sorting.bestSelling.text',
            wp.i18n.__('Best Selling', 'wpshopify'),
            itemsState
          )}
        </option>
        <option value='TITLE'>
          {wp.hooks.applyFilters(
            'storefront.sorting.title.text',
            wp.i18n.__('Title (A-Z)', 'wpshopify'),
            itemsState
          )}
        </option>
        <option value='TITLE-REVERSE' data-wps-reverse>
          {wp.hooks.applyFilters(
            'storefront.sorting.titleReverse.text',
            wp.i18n.__('Title (Z-A)', 'wpshopify'),
            itemsState
          )}
        </option>
      </select>
    </div>,
    document.querySelector(storefrontState.payloadSettings.dropzoneSorting)
  );
}

export { StorefrontSorting };
