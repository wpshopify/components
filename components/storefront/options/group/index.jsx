import { StorefrontFilter } from '../../filter'
import { StorefrontOptionsContext } from '../_state/context'
import StorefrontFilterOptionsGroupItems from '../group-items'
import { FilterHook } from '../../../../common/utils'
import isEmpty from 'lodash/isEmpty'

const { Notice } = wp.components
const { useContext } = wp.element

function StorefrontFilterOptionsGroup({ groupType, displayStyle, heading, filterOptions }) {
  const [storefrontOptionsState] = useContext(StorefrontOptionsContext)

  return (
    <StorefrontFilter heading={heading}>
      <div className='wps-filter-content'>
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
              filterOptions={filterOptions}
              displayStyle={displayStyle}
              groupType={groupType}
            />
          </ul>
        )}
      </div>
    </StorefrontFilter>
  )
}

export { StorefrontFilterOptionsGroup }
