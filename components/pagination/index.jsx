import React, { useContext } from 'react'
import { FiltersContext } from '../_state/context'
import { PaginationNext } from './next'
import { PaginationPrev } from './prev'
import { Notice } from '../../notice'
import { PaginationPageSize } from './page-size'
import { usePortal } from '../../../common/hooks'

function FilterPagination() {
   const { filtersState } = useContext(FiltersContext)

   return usePortal(
      <>
         {!filtersState.hasResults ? <Notice type='info' message='No more productsss found' /> : <PaginationNext />}
         <PaginationPageSize />
      </>,
      document.querySelector(filtersState.componentOptions.dropzonePagination)
   )
}

export { FilterPagination }
