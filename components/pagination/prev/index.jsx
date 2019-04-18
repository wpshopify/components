import React, { useContext, useRef, useEffect, useState } from 'react'
import { FiltersContext } from '../../_state/context'

function PaginationPrev() {
   function onPrevPage() {
      console.log('onPrevPage')
   }

   return (
      <button type='button' className='wps-btn-next-page' onClick={onPrevPage}>
         Previous page
      </button>
   )
}

export { PaginationPrev }
