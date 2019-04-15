import React, { useContext } from 'react'
import { Filter } from '../filter'
import isEmpty from 'lodash/isEmpty'
import { FiltersContext } from '../_state/context'
import { FilterType } from '../type'

function FilterTypes() {
   const { filtersState } = useContext(FiltersContext)

   return (
      <Filter heading='Types'>
         <div className='wps-filter-content'>
            {filtersState.isBootstrapping ? (
               <p data-wps-is-ready='0'>Loading product types ...</p>
            ) : isEmpty(filtersState.filterData) ? (
               <p>No types found</p>
            ) : (
               <ul className='wps-filters-list wps-types'>
                  {filtersState.filterData.types.map(type => (
                     <FilterType key={type} type={type} />
                  ))}
               </ul>
            )}
         </div>
      </Filter>
   )
}

export { FilterTypes }
