import React from 'react'
import { FiltersProvider } from './_state/provider'
import { FiltersWrapper } from './wrapper'

function Filters({ options }) {
   return (
      <FiltersProvider options={options}>
         <FiltersWrapper />
      </FiltersProvider>
   )
}

export { Filters }
