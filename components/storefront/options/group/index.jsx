import { StorefrontFilter } from '../../filter'
import { StorefrontOptionsContext } from '../_state/context'
import { StorefrontFilterOptionsGroupItem } from '../group-item'
import isEmpty from 'lodash/isEmpty'

const { Notice } = wp.components
const { useContext } = wp.element
const { __ } = wp.i18n

function StorefrontFilterOptionsGroup({ groupType, displayStyle, heading }) {
  const [storefrontOptionsState] = useContext(StorefrontOptionsContext)

  return (
    <StorefrontFilter heading={heading}>
      <div className='wps-filter-content'>
        {storefrontOptionsState.isBootstrapping ? (
          <p data-wps-is-ready='0'>
            {wp.hooks.applyFilters(
              'storefront.group.loading.text',
              __('Loading ' + groupType + ' ...', wpshopify.misc.textdomain)
            )}
          </p>
        ) : isEmpty(storefrontOptionsState.filterOptions[groupType]) ? (
          <Notice status='info' isDismissible={false}>
            {wp.hooks.applyFilters(
              'notice.storefront.noGroup.text',
              __('No ' + groupType + ' found', wpshopify.misc.textdomain)
            )}
          </Notice>
        ) : (
          <ul className={'wps-' + groupType}>
            {storefrontOptionsState.filterOptions[groupType].map(item => (
              <StorefrontFilterOptionsGroupItem
                key={item}
                itemValue={item}
                itemType={groupType}
                displayStyle={displayStyle}
              />
            ))}
          </ul>
        )}
      </div>
    </StorefrontFilter>
  )
}

export { StorefrontFilterOptionsGroup }
