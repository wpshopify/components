/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { StorefrontFilter } from '../../filter';
import { StorefrontOptionsContext } from '../_state/context';
import StorefrontFilterOptionsGroupItems from '../group-items';
import { FilterHook } from '../../../../common/utils';
import { Notice } from '../../../notices';
import isEmpty from 'lodash/isEmpty';

function StorefrontFilterOptionsGroup({
  groupType,
  displayStyle,
  heading,
  filterOptions,
  onSelectionChange,
}) {
  const { useContext } = wp.element;
  const [storefrontOptionsState] = useContext(StorefrontOptionsContext);

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
    <StorefrontFilter heading={heading}>
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
          <ul className={'wps-' + groupType}>
            <StorefrontFilterOptionsGroupItems
              onSelectionChange={onSelectionChange}
              filterOptions={filterOptions}
              displayStyle={displayStyle}
              groupType={groupType}
            />
          </ul>
        )}
      </div>
    </StorefrontFilter>
  );
}

export { StorefrontFilterOptionsGroup };
