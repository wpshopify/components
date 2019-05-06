import React from 'react'
import { PaginationPageSize } from './page-size'
import { PaginationLoadMore } from './load-more'

function PaginationControls({ fetchNextItems }) {
   return (
      <section className='wps-pagination-controls'>
         <PaginationPageSize />
         <PaginationLoadMore fetchNextItems={fetchNextItems} />
      </section>
   )
}

export { PaginationControls }
