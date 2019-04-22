import React from 'react'

function PaginationPrev() {
   function onPrevPage() {}

   return (
      <button type='button' className='wps-btn-next-page' onClick={onPrevPage}>
         Previous page
      </button>
   )
}

export { PaginationPrev }
