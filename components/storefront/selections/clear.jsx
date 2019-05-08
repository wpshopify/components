import React, { useContext } from 'react'
import { StorefrontContext } from '../_state/context'

function StorefrontSelectionsClear() {
   const [storefrontState, storefrontDispatch] = useContext(StorefrontContext)

   function clearAllSelections() {
      storefrontDispatch({ type: 'CLEAR_SELECTIONS' })
      storefrontDispatch({ type: 'CLEAR_SELECTED_VENDORS' })
      storefrontDispatch({ type: 'CLEAR_SELECTED_TAGS' })
      storefrontDispatch({ type: 'CLEAR_SELECTED_TYPES' })
   }

   return (
      <div className='wps-filter-selections-clear' onClick={clearAllSelections}>
         Clear all
      </div>
   )
}

export { StorefrontSelectionsClear }
