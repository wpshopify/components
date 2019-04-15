import React, { useContext } from 'react'
import { FiltersContext } from '../_state/context'

function FilterSelectionsClear() {
   const { filtersDispatch } = useContext(FiltersContext)

   function clearAllSelections() {
      filtersDispatch({ type: 'CLEAR_SELECTIONS' })
      filtersDispatch({ type: 'CLEAR_SELECTED_VENDORS' })
      filtersDispatch({ type: 'CLEAR_SELECTED_TAGS' })
      filtersDispatch({ type: 'CLEAR_SELECTED_TYPES' })
   }

   return (
      <div className='wps-filter-selections-clear' onClick={clearAllSelections}>
         Clear all
      </div>
   )
}

export { FilterSelectionsClear }
