import React from 'react'
import { PaginationPageSize } from './page-size'
import { PaginationLoadMore } from './load-more'

function PaginationControls({ miscDispatch }) {
   return (
      <section className='wps-pagination-controls container-fluid'>
         <PaginationPageSize />
         <PaginationLoadMore miscDispatch={miscDispatch} />
      </section>
   )
}

export { PaginationControls }
