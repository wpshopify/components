import React, { useContext } from 'react'
import { Filter } from '../filter'
import { FiltersContext } from '../_state/context'
import { FilterTag } from '../tag'
import isEmpty from 'lodash/isEmpty'

function FilterTags() {
   const { filtersState } = useContext(FiltersContext)

   return (
      <Filter heading='Tags'>
         <div className='wps-filter-content'>
            {filtersState.isBootstrapping ? (
               <p data-wps-is-ready='0'>Loading Tags ...</p>
            ) : isEmpty(filtersState.filterData.tag) ? (
               <p>No tags found</p>
            ) : (
               <ul className='wps-tags'>
                  {filtersState.filterData.tag.map(tag => (
                     <FilterTag key={tag} tag={tag} />
                  ))}
               </ul>
            )}
         </div>
      </Filter>
   )
}

export { FilterTags }
