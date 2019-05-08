import React, { useContext } from 'react'
import { StorefrontFilter } from '../../filter'
import { StorefrontOptionsContext } from '../_state/context'
import { StorefrontFilterOptionsGroupItem } from '../group-item'
import isEmpty from 'lodash/isEmpty'

function StorefrontFilterOptionsGroup({ groupType, displayStyle }) {
   const [storefrontOptionsState] = useContext(StorefrontOptionsContext)

   return (
      <StorefrontFilter heading={groupType}>
         <div className='wps-filter-content'>
            {storefrontOptionsState.isBootstrapping ? (
               <p data-wps-is-ready='0'>Loading {groupType} ...</p>
            ) : isEmpty(storefrontOptionsState.filterOptions[groupType]) ? (
               <p>No {groupType} found</p>
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
