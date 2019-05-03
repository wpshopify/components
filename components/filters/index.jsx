import React from 'react'
import { FilterSelections } from './selections'
import { FilterDropzone } from './dropzone'
import { FilterOptions } from './options'
import { FilterSorting } from './sorting'
import { FiltersProvider } from './_state/provider'

function Filters({ options }) {
   console.log('Filterssssssssssssssssssssss', options)

   return (
      <FiltersProvider options={options}>
         {options.componentOptions.dropzoneSelections ? <FilterSelections /> : ''}
         {options.componentOptions.dropzoneSorting ? <FilterSorting /> : ''}

         <FilterOptions />
         <FilterDropzone />
      </FiltersProvider>
   )
}

export { Filters }
