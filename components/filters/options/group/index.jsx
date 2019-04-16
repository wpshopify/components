import React, { useContext } from 'react'
import { Filter } from '../../filter'
import { FiltersOptionsContext } from '../_state/context'
import { FilterOptionsGroupItem } from '../group-item'
import isEmpty from 'lodash/isEmpty'

function FilterOptionsGroup({ groupType, displayStyle }) {
   const { filtersOptionsState } = useContext(FiltersOptionsContext)

   return (
      <Filter heading={groupType}>
         <div className='wps-filter-content'>
            {filtersOptionsState.isBootstrapping ? (
               <p data-wps-is-ready='0'>Loading {groupType} ...</p>
            ) : isEmpty(filtersOptionsState.filterOptions[groupType]) ? (
               <p>No {groupType} found</p>
            ) : (
               <ul className={'wps-' + groupType}>
                  {filtersOptionsState.filterOptions[groupType].map(item => (
                     <FilterOptionsGroupItem key={item} itemValue={item} itemType={groupType} displayStyle={displayStyle} />
                  ))}
               </ul>
            )}
         </div>
      </Filter>
   )
}

export { FilterOptionsGroup }
