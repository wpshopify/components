import React from 'react'
import { PaginationPageSize } from './page-size'
import { PaginationLoadMore } from './load-more'
import { PaginationControlsProvider } from './_state/provider'

function PaginationControls() {
   console.log('<PaginationControls>')
   return (
      <PaginationControlsProvider>
         <section className='wps-pagination-controls'>
            <PaginationPageSize />
            <PaginationLoadMore />
         </section>
      </PaginationControlsProvider>
   )
}

export { PaginationControls }
