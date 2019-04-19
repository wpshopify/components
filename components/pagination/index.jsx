import React, { useContext } from 'react'
import { PaginationContext } from './_state/context'
import { PaginationNext } from './next'
import { PaginationPrev } from './prev'
import { Notice } from '../notice'
import { PaginationPageSize } from './page-size'
import { usePortal } from '../../common/hooks'

function Pagination() {
   const { paginationState } = useContext(PaginationContext)

   // return usePortal(
   //    <>
   //       {!paginationState.hasResults ? <Notice type='info' message='No more productsss found' /> : <PaginationNext />}
   //       <PaginationPageSize />
   //    </>,
   //    document.querySelector(paginationState.componentOptions.dropzonePagination)
   // )

   return (
      <>
         <PaginationNext />
         <PaginationPageSize />
      </>
   )
}

export { Pagination }
