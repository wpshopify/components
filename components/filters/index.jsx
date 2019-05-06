import React from 'react'
import { FiltersProvider } from './_state/provider'
import { FilterSelections } from './selections'
import { FilterOptions } from './options'
import { FilterSorting } from './sorting'
import { FilterItems } from './items'

function Filters({ options }) {
   return (
      <FiltersProvider options={options}>
         {options.componentOptions.dropzoneSelections ? <FilterSelections /> : ''}
         {options.componentOptions.dropzoneSorting ? <FilterSorting /> : ''}
         <FilterOptions />
         <FilterItems />
      </FiltersProvider>
   )
}

export { Filters }
