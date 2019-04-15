import React, { useContext } from 'react'
import { FiltersContext } from '../_state/context'
import { PaginationNext } from './next'
import { PaginationPrev } from './prev'
import { PaginationPageSize } from './page-size'
import { usePortal } from '../../../common/hooks'

function FilterPagination() {
   const { filtersState } = useContext(FiltersContext)

   const componentOptions = filtersState.componentOptions

   return usePortal(
      <>
         {!componentOptions.hasResults ? '' : componentOptions.hasNextPage ? <PaginationNext /> : 'No more products to show!'}

         <PaginationPageSize />
      </>,
      document.querySelector(filtersState.componentOptions.dropzonePagination)
   )
}

export { FilterPagination }
