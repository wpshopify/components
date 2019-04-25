import React, { useContext, useRef, useEffect, useState } from 'react'
import { fetchNextPage, graphQuery } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import { PaginationContext } from '../../_state/context'
import { PaginationItemsContext } from '../../items/_state/context'
import { PaginationControlsContext } from '../_state/context'
import { Notice } from '../../../notice'
import { usePortal } from '../../../../common/hooks'
import last from 'lodash/last'
import isEmpty from 'lodash/isEmpty'
import { afterQueryParam } from '../index'

function PaginationLoadMore() {
   console.log('<PaginationLoadMore>')
   const [paginationState, paginationDispatch] = useContext(PaginationContext)
   const [paginationItemsState, paginationItemsDispatch] = useContext(PaginationItemsContext)

   const [paginationControlsState, paginationControlsDispatch] = useContext(PaginationControlsContext)

   const [isFirstLoad, setIsFirstLoad] = useState(true)
   const [hasMoreItems, setHasMoreItems] = useState(true)

   function hasNextPage(lastPayload) {
      if (isEmpty(lastPayload)) {
         return false
      }

      return last(lastPayload).hasNextPage
   }

   async function onNextPage() {
      console.log('paginationState.queryParams', paginationState.queryParams)

      console.log('paginationState.dataType', paginationState.dataType)

      if (isFirstLoad) {
         console.log('.............................. FIRST LOAD')

         const firstQueryParams = paginationState.queryParams
         firstQueryParams.after = paginationState.lastCursorId

         paginationItemsDispatch({ type: 'SET_IS_LOADING', payload: true })

         paginationControlsDispatch({ type: 'SET_IS_LOADING', payload: true })

         const shopifyResponse = await graphQuery(paginationState.dataType, firstQueryParams)

         setIsFirstLoad(false)

         paginationItemsDispatch({ type: 'SET_LAST_PAYLOAD', payload: shopifyResponse.model[paginationState.dataType] })
         console.log('shopifyResponse.data')

         paginationDispatch({ type: 'SET_QUERY_PARAMS', payload: afterQueryParam(shopifyResponse, paginationState.dataType) })

         paginationItemsDispatch({ type: 'UPDATE_PAYLOAD', payload: shopifyResponse.model[paginationState.dataType] })
         paginationItemsDispatch({ type: 'SET_IS_LOADING', payload: false })

         paginationControlsDispatch({ type: 'SET_IS_LOADING', payload: false })
         if (!hasNextPage(shopifyResponse.model[paginationState.dataType])) {
            setHasMoreItems(false)
         }
      } else {
         console.log('.............................. nottt FIRST LOAD', paginationItemsState.lastPayload)

         paginationItemsDispatch({ type: 'SET_IS_LOADING', payload: true })

         paginationControlsDispatch({ type: 'SET_IS_LOADING', payload: true })

         const nextPageOfResults = await fetchNextPage(paginationItemsState.lastPayload)

         paginationItemsDispatch({ type: 'SET_LAST_PAYLOAD', payload: nextPageOfResults.model })

         paginationDispatch({ type: 'SET_QUERY_PARAMS', payload: afterQueryParam(nextPageOfResults, paginationState.dataType) })

         paginationItemsDispatch({ type: 'UPDATE_PAYLOAD', payload: nextPageOfResults.model })
         paginationItemsDispatch({ type: 'SET_IS_LOADING', payload: false })

         paginationControlsDispatch({ type: 'SET_IS_LOADING', payload: false })

         if (!hasNextPage(nextPageOfResults.model)) {
            setHasMoreItems(false)
         }
      }
   }

   return usePortal(
      <>
         {hasMoreItems ? (
            <button type='button' disabled={paginationControlsState.isLoading} className='wps-button wps-btn-next-page' onClick={onNextPage}>
               {paginationControlsState.isLoading ? 'Loading ...' : 'Load more'}
            </button>
         ) : (
            <Notice message='No items left!' type='info' />
         )}
      </>,
      document.querySelector(paginationState.componentOptions.dropzoneLoadMore)
   )
}

export { PaginationLoadMore }
