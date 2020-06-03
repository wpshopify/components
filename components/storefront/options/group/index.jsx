import { StorefrontFilter } from '../../filter'
import { StorefrontOptionsContext } from '../_state/context'
import { StorefrontFilterOptionsGroupItem } from '../group-item'
import { FilterHook } from '../../../../common/utils'
import isEmpty from 'lodash/isEmpty'

const { Notice } = wp.components
const { useContext } = wp.element

function sortAndCleanValues(values) {
  if (!values) {
    return
  }

  return values
    .sort((a, b) => a.localeCompare(b))
    .filter(function (e) {
      return e === 0 || e
    })
}

function StorefrontFilterOptionsGroup({ groupType, displayStyle, heading }) {
  const [storefrontOptionsState] = useContext(StorefrontOptionsContext)

  const filterOptions = sortAndCleanValues(storefrontOptionsState.filterOptions[groupType])

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
            {filterOptions.map((item) => (
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
