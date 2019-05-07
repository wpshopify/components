import React from 'react'
import { FilterSelectionsClear } from './clear'
import { FilterSelectionsTypes } from './types'

function FilterSelectionsWrapper() {
   return (
      <div className='wps-filter-selections wps-mt-2 wps-mb-2'>
         <FilterSelectionsTypes />
         <FilterSelectionsClear />
      </div>
   )
}

export { FilterSelectionsWrapper }
