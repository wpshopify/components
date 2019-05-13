import React from 'react'
import { PaginationPageSize } from './page-size'
import { PaginationLoadMore } from './load-more'

function PaginationControls({ fetchNextItems }) {
   return (
      <section className='wps-pagination-controls container-fluid'>
         <PaginationPageSize />
         <PaginationLoadMore fetchNextItems={fetchNextItems} />
      </section>
   )
}

export { PaginationControls }
