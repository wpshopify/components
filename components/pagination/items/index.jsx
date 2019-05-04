import React, { useContext, useEffect } from 'react'
import { PaginationContext } from '../_state/context'
import { FiltersContext } from '../../filters/_state/context'
import { useFiltersContext } from '../../../common/hooks'
import { Notice } from '../../notice'
import uuidv4 from 'uuid/v4'
import isEmpty from 'lodash/isEmpty'
import last from 'lodash/last'

function PaginationItems({ children }) {
   const [paginationState, paginationDispatch] = useContext(PaginationContext)
   const [filtersState] = useFiltersContext(FiltersContext)

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

         if (!hasNextPage(paginationState.payload) || limitReached()) {
            if (paginationState.limit) {
               paginationDispatch({ type: 'LIMIT_PAYLOAD', payload: paginationState.limit })
            }
            paginationDispatch({ type: 'SET_HAS_MORE_ITEMS', payload: false })
         }
      },
      [paginationState.payload]
   )

   useEffect(
      function() {
         if (filtersState.payload === false) {
            console.log('NO FILTERSSTATE OBJ DEFINED')
            return
         }

         paginationDispatch({ type: 'SET_IS_LOADING', payload: filtersState.isLoading })
      },
      [filtersState.isLoading]
   )

   useEffect(
      function() {
         if (filtersState.payload === false) {
            console.log('NO FILTERSSTATE OBJ DEFINED')
            return
         }

         paginationDispatch({ type: 'SET_LAST_PAYLOAD', payload: filtersState.payload })
         paginationDispatch({ type: 'SET_PAYLOAD', payload: filtersState.payload })
         paginationDispatch({ type: 'SET_QUERY_PARAMS', payload: filtersState.queryParams })

         console.log('FILTERS PAYLOAD CHANGED DETECTED FROM WITHIN PAGINATION', filtersState)
      },
      [filtersState.payload]
   )

   return (
      <section className={'wps-items wps-items-list wps-row'} data-item-is-loading={paginationState.isLoading}>
         {paginationState.payload.map(item => React.cloneElement(children, { payload: item, key: uuidv4() }))}
         {paginationState.controlsTouched && !paginationState.hasMoreItems && <Notice message='No items left!' type='info' />}
      </section>
   )
}

export { PaginationItems }
