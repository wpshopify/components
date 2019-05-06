import React from 'react'
import { ItemsContext } from '../items/_state/context'
import { FiltersProvider } from './_state/provider'
import { FilterSelections } from './selections'
import { FilterOptions } from './options'
import { FilterSorting } from './sorting'
import { FilterItems } from './items'

function Filters() {
   const [itemsState] = useContext(ItemsContext)

   return (
      <FiltersProvider options={itemsState}>
         {itemsState.componentOptions.dropzoneSelections ? <FilterSelections /> : ''}
         {itemsState.componentOptions.dropzoneSorting ? <FilterSorting /> : ''}
         <FilterOptions />
         <FilterItems />
      </FiltersProvider>
   )
}

export { Filters }
