import React from 'react'
import { StorefrontSelectionsClear } from './clear'
import { StorefrontSelectionsTypes } from './types'

function StorefrontSelectionsWrapper() {
   return (
      <div className='wps-filter-selections wps-mt-2 wps-mb-2'>
         <StorefrontSelectionsTypes />
         <StorefrontSelectionsClear />
      </div>
   )
}

export { StorefrontSelectionsWrapper }
