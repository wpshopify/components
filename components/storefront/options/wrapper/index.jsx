import to from 'await-to-js';
import TypesHeading from '../heading-types';
import VendorsHeading from '../heading-vendors';
import TagsHeading from '../heading-tags';
import StorefrontFilterOptionsGroup from '../group';
import StorefrontFilterOptionsHeading from '../heading';
import { usePortal } from '../../../../common/hooks';
import { getFilterData } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api';
import {
  sortAndCleanValues,
  lowercaseFilterOptions,
  formatFilterOptions,
  getDataFromResponse,
} from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-utils';
import { StorefrontOptionsContext } from '../_state/context';
import { ItemsContext } from '../../../items/_state/context';

const { useEffect, useContext } = wp.element;

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
