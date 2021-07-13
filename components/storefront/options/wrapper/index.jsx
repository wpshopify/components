import to from 'await-to-js';
import TypesHeading from '../heading-types';
import VendorsHeading from '../heading-vendors';
import TagsHeading from '../heading-tags';
import StorefrontFilterOptionsGroup from '../group';
import StorefrontFilterOptionsHeading from '../heading';
import { usePortal } from '../../../../common/hooks';
import { getFilterData } from '/Users/arobbins/www/_devilbox/devilbox/data/www/wpshopify-api';
import {
  lowercaseFilterOptions,
  formatFilterOptions,
  getDataFromResponse,
} from '/Users/arobbins/www/_devilbox/devilbox/data/www/wpshopify-utils';
import { StorefrontOptionsContext } from '../_state/context';
import { useItemsDispatch } from '../../../items/_state/hooks';

const { useEffect, useContext } = wp.element;

function StorefrontOptionsWrapper({ payloadSettings, onSelectionChange, dropzoneHeading }) {
  const [storefrontOptionsState, storefrontOptionsDispatch] = useContext(StorefrontOptionsContext);

  const itemsDispatch = useItemsDispatch();

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


  return usePortal(
    <>
      {payloadSettings.showOptionsHeading ? (
        <StorefrontFilterOptionsHeading dropzone={dropzoneHeading} />
      ) : (
        ''
      )}
      <aside className='wps-storefront'>
        {payloadSettings.showTags ? (
          <StorefrontFilterOptionsGroup
            onSelectionChange={onSelectionChange}
            filterOptions={storefrontOptionsState.filterOptions.tags}
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
            filterOptions={storefrontOptionsState.filterOptions.vendors}
          />
        ) : (
          ''
        )}
        {payloadSettings.showTypes ? (
          <StorefrontFilterOptionsGroup
            onSelectionChange={onSelectionChange}
            filterOptions={storefrontOptionsState.filterOptions.types}
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
