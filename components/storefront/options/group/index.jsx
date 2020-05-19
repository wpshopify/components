import { StorefrontFilter } from '../../filter'
import { StorefrontOptionsContext } from '../_state/context'
import { StorefrontFilterOptionsGroupItem } from '../group-item'
import { FilterHook } from '../../../../common/utils'
import isEmpty from 'lodash/isEmpty'

const { Notice } = wp.components
const { useContext } = wp.element

function StorefrontFilterOptionsGroup({ groupType, displayStyle, heading }) {
  const [storefrontOptionsState] = useContext(StorefrontOptionsContext)

  return (
    <StorefrontFilter heading={heading}>
      <div className='wps-filter-content'>
        {storefrontOptionsState.isBootstrapping ? (
          <FilterHook name='storefront.group.loading.text'>
            <p>{wp.i18n.sprintf(wp.i18n.__('Loading %s ...', 'wpshopify'), groupType)}</p>
          </FilterHook>
        ) : isEmpty(storefrontOptionsState.filterOptions[groupType]) ? (
          <Notice status='info' isDismissible={false}>
            <FilterHook name='notice.storefront.noGroup.text'>
              {wp.i18n.sprintf(wp.i18n.__('No %s found', 'wpshopify'), groupType)}
            </FilterHook>
          </Notice>
        ) : (
          <ul className={'wps-' + groupType}>
            {storefrontOptionsState.filterOptions[groupType].map((item) => (
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
