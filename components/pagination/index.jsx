import React from 'react'
import { PaginationLoadMore } from './load-more'
import { PaginationPageSize } from './page-size'

function Pagination() {
   return (
      <>
         <PaginationPageSize />
         <PaginationLoadMore />
      </>
   )
}

export { Pagination }
