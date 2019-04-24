import React, { useContext } from 'react'
import { PaginationItemsContext } from './_state/context'

function PaginationItems({ children }) {
   const [paginationItemsState] = useContext(PaginationItemsContext)

   return (
      <section className={'wps-items wps-items-list'} data-item-is-loading={paginationItemsState.isLoading}>
         {children}
      </section>
   )
}

export { PaginationItems }
