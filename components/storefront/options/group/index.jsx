import React, { useContext } from 'react'
import { StorefrontFilter } from '../../filter'
import { Notice } from '../../../notices/notice'
import { StorefrontOptionsContext } from '../_state/context'
import { StorefrontFilterOptionsGroupItem } from '../group-item'
import isEmpty from 'lodash/isEmpty'

function StorefrontFilterOptionsGroup({ groupType, displayStyle, heading }) {
   const [storefrontOptionsState] = useContext(StorefrontOptionsContext)

   return (
      <StorefrontFilter heading={heading}>
         <div className='wps-filter-content'>
            {storefrontOptionsState.isBootstrapping ? (
               <p data-wps-is-ready='0'>Loading {groupType} ...</p>
            ) : isEmpty(storefrontOptionsState.filterOptions[groupType]) ? (
               <Notice type='info' message={'No ' + groupType + ' found'} />
            ) : (
               <ul className={'wps-' + groupType}>
                  {storefrontOptionsState.filterOptions[groupType].map(item => (
                     <StorefrontFilterOptionsGroupItem key={item} itemValue={item} itemType={groupType} displayStyle={displayStyle} />
                  ))}
               </ul>
            )}
         </div>
      </StorefrontFilter>
   )
}

export { StorefrontFilterOptionsGroup }
