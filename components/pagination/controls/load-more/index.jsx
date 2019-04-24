import React, { useContext, useRef, useEffect, useState } from 'react'
import { fetchNextPage, graphQuery } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import { PaginationContext } from '../../_state/context'
import { PaginationItemsContext } from '../../items/_state/context'
import { PaginationControlsContext } from '../_state/context'
import { Notice } from '../../../notice'
import { usePortal } from '../../../../common/hooks'
import last from 'lodash/last'

function PaginationLoadMore() {
   console.log('<PaginationLoadMore>')
   const [paginationState, paginationDispatch] = useContext(PaginationContext)
   const [paginationItemsState, paginationItemsDispatch] = useContext(PaginationItemsContext)

   const [paginationControlsState, paginationControlsDispatch] = useContext(PaginationControlsContext)

   const [isFirstLoad, setIsFirstLoad] = useState(true)

   const [hasMoreItems, sethasMoreItems] = useState(true)

   function hasNextPage(lastPayload) {
      return last(lastPayload).hasNextPage
   }

   function afterQueryParam(shopifyResponse) {
      return {
         after: shopifyResponse.data.products.edges[0].cursor
      }
   }

   async function onNextPage() {
      console.log('paginationState.queryParams', paginationState.queryParams)

      if (isFirstLoad) {
         console.log('.............................. FIRST LOAD')

         const firstQueryParams = paginationState.queryParams
         firstQueryParams.after = paginationState.lastCursorId

         paginationItemsDispatch({ type: 'SET_IS_LOADING', payload: true })

         paginationControlsDispatch({ type: 'SET_IS_LOADING', payload: true })

         const shopifyResponse = await graphQuery('products', firstQueryParams)

         setIsFirstLoad(false)

         paginationItemsDispatch({ type: 'SET_LAST_PAYLOAD', payload: shopifyResponse.model.products })
         console.log('shopifyResponse.data')

         paginationDispatch({ type: 'SET_QUERY_PARAMS', payload: afterQueryParam(shopifyResponse) })

         paginationItemsDispatch({ type: 'UPDATE_PAYLOAD', payload: shopifyResponse.model.products })
         paginationItemsDispatch({ type: 'SET_IS_LOADING', payload: false })

         paginationControlsDispatch({ type: 'SET_IS_LOADING', payload: false })
         if (!hasNextPage(shopifyResponse.model.products)) {
            sethasMoreItems(false)
         }
      } else {
         console.log('.............................. nottt FIRST LOAD', paginationItemsState.lastPayload)

         paginationItemsDispatch({ type: 'SET_IS_LOADING', payload: true })

         paginationControlsDispatch({ type: 'SET_IS_LOADING', payload: true })

         const nextPageOfResults = await fetchNextPage(paginationItemsState.lastPayload)

         paginationItemsDispatch({ type: 'SET_LAST_PAYLOAD', payload: nextPageOfResults.model })

         paginationDispatch({ type: 'SET_QUERY_PARAMS', payload: afterQueryParam(nextPageOfResults) })

         paginationItemsDispatch({ type: 'UPDATE_PAYLOAD', payload: nextPageOfResults.model })
         paginationItemsDispatch({ type: 'SET_IS_LOADING', payload: false })

         paginationControlsDispatch({ type: 'SET_IS_LOADING', payload: false })

         if (!hasNextPage(nextPageOfResults.model)) {
            sethasMoreItems(false)
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
