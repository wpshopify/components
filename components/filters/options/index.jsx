import React, { useContext } from 'react'
import { usePortal } from '../../../common/hooks'
import { FiltersContext } from '../_state/context'
import { FilterVendors } from '../vendors'
import { FilterTypes } from '../types'
import { FilterTags } from '../tags'
import { FilterHeading } from '../heading'

function FilterOptions() {
   const { filtersState } = useContext(FiltersContext)
   const componentOptions = filtersState.componentOptions

   return usePortal(
      <>
         {componentOptions.showHeading ? <FilterHeading /> : ''}
         <aside className='wps-filters'>
            {componentOptions.showTags ? <FilterTags /> : ''}
            {componentOptions.showVendors ? <FilterVendors /> : ''}
            {componentOptions.showTypes ? <FilterTypes /> : ''}
         </aside>
      </>,
      document.querySelector(componentOptions.dropzoneOptions)
   )
}

export { FilterOptions }
