import React, { useContext } from 'react'
import { PaginationItemsContext } from './_state/context'
import uuidv4 from 'uuid/v4'

function PaginationItems({ children }) {
   const [paginationItemsState] = useContext(PaginationItemsContext)

   return (
      <section className={'wps-items wps-items-list wps-row'} data-item-is-loading={paginationItemsState.isLoading}>
         {paginationItemsState.payload.map(item => React.cloneElement(children, { payload: item, key: uuidv4() }))}
      </section>
   )
}

export { PaginationItems }
