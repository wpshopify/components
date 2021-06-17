/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { StorefrontFilter } from '../../filter';
import { StorefrontOptionsContext } from '../_state/context';
import { FilterHook } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-utils';
import isEmpty from 'lodash/isEmpty';

const StorefrontFilterOptionsGroupItems = wp.element.lazy(() =>
  import(/* webpackChunkName: 'StorefrontFilterOptionsGroupItems-public' */ '../group-items')
);

const Notice = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Notice-public' */ '../../../notice')
);

function StorefrontFilterOptionsGroup({
  groupType,
  displayStyle,
  heading,
  filterOptions,
  onSelectionChange,
}) {
  const { useContext, useState, Suspense } = wp.element;
  const [storefrontOptionsState] = useContext(StorefrontOptionsContext);
  const [isOpen, setIsOpen] = useState(() => false);

  function toggleDrawer() {
    setIsOpen(!isOpen);
  }

  const filterContentCSS = css`
    padding: 10px 0;

    .components-notice {
      width: 100%;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
  `;

  return (
    <StorefrontFilter heading={heading} isOpen={isOpen} setIsOpen={toggleDrawer}>
      <div className='wps-filter-content' css={filterContentCSS}>
        {storefrontOptionsState.isBootstrapping ? (
          <FilterHook name='storefront.group.loading.text'>
            <p>
              {
                /* translators: %s: Loading products / collections */
                wp.i18n.sprintf(wp.i18n.__('Loading %s ...', 'wpshopify'), groupType)
              }
            </p>
          </FilterHook>
        ) : isEmpty(filterOptions) ? (
          <Notice status='info' isDismissible={false}>
            <FilterHook name='notice.storefront.noGroup.text'>
              {wp.i18n.sprintf(wp.i18n.__('No %s found', 'wpshopify'), groupType)}
            </FilterHook>
          </Notice>
        ) : (
          <Suspense fallback={'Loading ' + groupType + ' ...'}>
            {isOpen && (
              <StorefrontFilterOptionsGroupItems
                onSelectionChange={onSelectionChange}
                filterOptions={filterOptions}
                displayStyle={displayStyle}
                groupType={groupType}
              />
            )}
          </Suspense>
        )}
      </div>
    </StorefrontFilter>
  );
}

export default StorefrontFilterOptionsGroup;
