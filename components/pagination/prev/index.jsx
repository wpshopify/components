import React from 'react'

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
