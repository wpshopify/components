import { StorefrontFilter } from '../../filter'
import { StorefrontOptionsContext } from '../_state/context'
import { StorefrontFilterOptionsGroupItem } from '../group-item'
import isEmpty from 'lodash/isEmpty'

const { Notice } = wp.components
const { useContext } = wp.element

function StorefrontFilterOptionsGroup({ groupType, displayStyle, heading }) {
  const [storefrontOptionsState] = useContext(StorefrontOptionsContext)

  return (
    <StorefrontFilter heading={heading}>
      <div className='wps-filter-content'>
        {storefrontOptionsState.isBootstrapping ? (
          <p data-wps-is-ready='0'>Loading {groupType} ...</p>
        ) : isEmpty(storefrontOptionsState.filterOptions[groupType]) ? (
          <Notice status='info' isDismissible={false}>
            {'No ' + groupType + ' found'}
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
