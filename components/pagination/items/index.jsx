import React, { useContext, useEffect } from 'react'
import { PaginationItemsContext } from './_state/context'
import { PaginationContext } from '../_state/context'
import { Notice } from '../../notice'
import uuidv4 from 'uuid/v4'
import isEmpty from 'lodash/isEmpty'
import last from 'lodash/last'

function PaginationItems({ children }) {
   const [paginationItemsState, paginationItemsDispatch] = useContext(PaginationItemsContext)
   const [paginationState, paginationDispatch] = useContext(PaginationContext)

   console.log('paginationItemsState.payload', paginationItemsState.payload)

   function hasNextPage() {
      if (isEmpty(paginationState.payload)) {
         return false
      }

      return last(paginationState.payload).hasNextPage
   }

   function limitReached() {
      if (!paginationState.limit) {
         return false
      }

      return paginationState.totalShown >= paginationState.limit
   }

   useEffect(
      function() {
         if (!paginationState.hasMoreItems) {
            return
         }

         if (!hasNextPage(paginationItemsState.payload) || limitReached()) {
            console.log('paginationItemsState', paginationItemsState)
            console.log('paginationState', paginationState)
            if (paginationState.limit) {
               paginationItemsDispatch({ type: 'LIMIT_PAYLOAD', payload: paginationState.limit })
            }
            paginationDispatch({ type: 'SET_HAS_MORE_ITEMS', payload: false })
         }
      },
      [paginationItemsState.payload]
   )

   return (
      <section className={'wps-items wps-items-list wps-row'} data-item-is-loading={paginationItemsState.isLoading}>
         {paginationItemsState.payload.map(item => React.cloneElement(children, { payload: item, key: uuidv4() }))}
         {paginationState.controlsTouched && !paginationState.hasMoreItems && <Notice message='No items left!' type='info' />}
      </section>
   )
}

export { PaginationItems }
