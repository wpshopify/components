import to from 'await-to-js';
import assign from 'lodash/assign';
import mapValues from 'lodash/mapValues';
import map from 'lodash/map';
import { usePortal } from '../../../../common/hooks';

import TypesHeading from '../heading-types';
import VendorsHeading from '../heading-vendors';
import TagsHeading from '../heading-tags';
import { getFilterData } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api';
import { StorefrontFilterOptionsGroup } from '../group';
import { StorefrontFilterOptionsHeading } from '../heading';
import { StorefrontOptionsContext } from '../_state/context';
import { ItemsContext } from '../../../items/_state/context';

const { useEffect, useContext } = wp.element;

function combineFilterOptions(accumulator, currentValue) {
  return assign(accumulator, currentValue);
}

function formatFilterOptions(data) {
  return data.reduce(combineFilterOptions);
}

function getDataFromResponse(response) {
  return response.map((item) => {
    return item.data;
  });
}

function lowercaseFilterOptions(allFilteredData) {
  return mapValues(allFilteredData, (value) => {
    return map(value, (val) => val.toLowerCase());
  });
}

function sortAndCleanValues(values) {
  if (!values) {
    return;
  }

  return values
    .sort((a, b) => a.localeCompare(b))
    .filter(function (e) {
      return e === 0 || e;
    });
}

function StorefrontOptionsWrapper({ payloadSettings, onSelectionChange }) {
  const [storefrontOptionsState, storefrontOptionsDispatch] = useContext(StorefrontOptionsContext);
  const [, itemsDispatch] = useContext(ItemsContext);

  async function getAllFilterOptions() {
    var [respError, respData] = await to(getFilterData());

    if (respError) {
      /* translators: %s: Error message */
      itemsDispatch({
        type: 'UPDATE_NOTICES',
        payload: {
          type: 'error',
          message: wp.i18n.sprintf(
            wp.i18n.__(
              '%s. Occurred when fetching available filter options. Please clear your browser cache and reload the page. ',
              'wpshopify'
            ),
            respError.message
          ),
        },
      });
    } else {
      storefrontOptionsDispatch({
        type: 'SET_FILTER_OPTIONS',
        payload: lowercaseFilterOptions(formatFilterOptions(getDataFromResponse(respData))),
      });
    }

    storefrontOptionsDispatch({ type: 'SET_IS_BOOTSTRAPPING', payload: false });
  }

  // On component initial render
  useEffect(() => {
    getAllFilterOptions();
  }, []);

  const tagsFilterOptions = sortAndCleanValues(storefrontOptionsState.filterOptions.tags);
  const vendorsFilterOptions = sortAndCleanValues(storefrontOptionsState.filterOptions.vendors);
  const typesFilterOptions = sortAndCleanValues(storefrontOptionsState.filterOptions.types);

  return usePortal(
    <>
      {payloadSettings.showOptionsHeading ? <StorefrontFilterOptionsHeading /> : ''}
      <aside className='wps-storefront'>
        {payloadSettings.showTags ? (
          <StorefrontFilterOptionsGroup
            onSelectionChange={onSelectionChange}
            filterOptions={tagsFilterOptions}
            heading={<TagsHeading />}
            groupType='tags'
          />
        ) : (
          ''
        )}
        {payloadSettings.showVendors ? (
          <StorefrontFilterOptionsGroup
            onSelectionChange={onSelectionChange}
            heading={<VendorsHeading />}
            groupType='vendors'
            displayStyle='checkbox'
            filterOptions={vendorsFilterOptions}
          />
        ) : (
          ''
        )}
        {payloadSettings.showTypes ? (
          <StorefrontFilterOptionsGroup
            onSelectionChange={onSelectionChange}
            filterOptions={typesFilterOptions}
            heading={<TypesHeading />}
            groupType='types'
            displayStyle='checkbox'
          />
        ) : (
          ''
        )}
      </aside>
    </>,
    document.querySelector(payloadSettings.dropzoneOptions)
  );
}

export default wp.element.memo(StorefrontOptionsWrapper);
