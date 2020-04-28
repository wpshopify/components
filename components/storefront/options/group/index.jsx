import { StorefrontFilter } from '../../filter'
import { StorefrontOptionsContext } from '../_state/context'
import { StorefrontFilterOptionsGroupItem } from '../group-item'
import { FilterHook, __t } from '../../../../common/utils'
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
            <p>{__t('Loading ' + groupType + ' ...')}</p>
          </FilterHook>
        ) : isEmpty(storefrontOptionsState.filterOptions[groupType]) ? (
          <Notice status='info' isDismissible={false}>
            <FilterHook name='notice.storefront.noGroup.text'>
              {__t('No ' + groupType + ' found')}
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
