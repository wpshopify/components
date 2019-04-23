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

   const isFirstRender = useRef(true)
   const [isFirstLoad, setIsFirstLoad] = useState(true)
   const [lastPayload, setLastPayload] = useState(true)
   const [hasMoreItems, sethasMoreItems] = useState(true)

   function hasNextPage(lastPayload) {
      return last(lastPayload).hasNextPage
   }

   async function onNextPage() {
      if (isFirstLoad) {
         const firstQueryParams = paginationState.queryParams
         firstQueryParams.after = paginationState.lastCursorId

         paginationItemsDispatch({ type: 'SET_IS_LOADING', payload: true })
         // setIsLoading(true)
         paginationControlsDispatch({ type: 'SET_IS_LOADING', payload: true })
         // Calls Shopify
         const shopifyResponse = await graphQuery('products', firstQueryParams)

         setIsFirstLoad(false)
         setLastPayload(shopifyResponse.model.products)

         paginationItemsDispatch({ type: 'UPDATE_PAYLOAD', payload: shopifyResponse.model.products })
         paginationItemsDispatch({ type: 'SET_IS_LOADING', payload: false })
         // setIsLoading(false)
         paginationControlsDispatch({ type: 'SET_IS_LOADING', payload: false })
         if (!hasNextPage(shopifyResponse.model.products)) {
            sethasMoreItems(false)
         }
      } else {
         paginationItemsDispatch({ type: 'SET_IS_LOADING', payload: true })
         // setIsLoading(true)
         paginationControlsDispatch({ type: 'SET_IS_LOADING', payload: true })
         const nextPageOfResults = await fetchNextPage(lastPayload)

         setLastPayload(nextPageOfResults.model)

         paginationItemsDispatch({ type: 'UPDATE_PAYLOAD', payload: nextPageOfResults.model })
         paginationItemsDispatch({ type: 'SET_IS_LOADING', payload: false })
         // setIsLoading(false)
         paginationControlsDispatch({ type: 'SET_IS_LOADING', payload: false })

         if (!hasNextPage(nextPageOfResults.model)) {
            sethasMoreItems(false)
         }
      }
   }

   // Used to update payload when page size changes ...
   useEffect(
      function() {
         if (isFirstRender.current) {
            isFirstRender.current = false
            return
         }

         onNextPage()
      },
      [paginationState.queryParams]
   )

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
