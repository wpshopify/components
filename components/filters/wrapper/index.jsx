import React, { useContext } from 'react'
import { FiltersContext } from '../_state/context'
import { FilterSelections } from '../selections'
import { FilterOptions } from '../options'
import { FilterSorting } from '../sorting'
import { FilterItems } from '../items'

function FiltersWrapper() {
   const [filtersState] = useContext(FiltersContext)

   return (
      <>
         {filtersState.componentOptions.dropzoneSelections ? <FilterSelections /> : ''}
         {filtersState.componentOptions.dropzoneSorting ? <FilterSorting /> : ''}

         <FilterOptions />
         <FilterItems />
      </>
   )
}

export { FiltersWrapper }
