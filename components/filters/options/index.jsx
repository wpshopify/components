import React from 'react'

import { FiltersOptionsProvider } from './_state/provider'
import { FiltersOptionsWrapper } from './wrapper'

/*

<FilterOptions>

*/
function FilterOptions() {
   return (
      <FiltersOptionsProvider>
         <FiltersOptionsWrapper />
      </FiltersOptionsProvider>
   )
}

export { FilterOptions }
