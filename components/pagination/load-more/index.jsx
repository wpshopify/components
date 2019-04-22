import React, { useContext, useRef, useEffect } from 'react'
import { fetchNextPage, graphQuery } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import { PaginationContext } from '../_state/context'
import { ProductsContext } from '../../products/_state/context'
import { Notice } from '../../notice'
import { usePortal } from '../../../common/hooks'
import last from 'lodash/last'

function PaginationLoadMore() {
   const { productsDispatch } = useContext(ProductsContext)
   const { paginationState, paginationDispatch } = useContext(PaginationContext)
   const isFirstRender = useRef(true)

   function hasNextPage(lastPayload) {
      return last(lastPayload).hasNextPage
   }

   async function onNextPage() {
      console.log('paginationState.hasMoreItems', paginationState.hasMoreItems)

      if (paginationState.isFirstLoad) {
         const firstQueryParams = paginationState.queryParams
         firstQueryParams.after = paginationState.lastCursorId

         productsDispatch({ type: 'SET_IS_LOADING', payload: true })
         paginationDispatch({ type: 'SET_IS_LOADING', payload: true })

         // Calls Shopify
         const shopifyResponse = await graphQuery('products', firstQueryParams)

         paginationDispatch({ type: 'SET_IS_FIRST_LOAD', payload: false })

         setTimeout(function() {
            paginationDispatch({ type: 'SET_IS_LAST_PAYLOAD', payload: shopifyResponse.model.products })
            productsDispatch({ type: 'UPDATE_PAYLOAD', payload: shopifyResponse.model.products })
         }, 2000)

         productsDispatch({ type: 'SET_IS_LOADING', payload: false })
         paginationDispatch({ type: 'SET_IS_LOADING', payload: false })

         if (!hasNextPage(shopifyResponse.model.products)) {
            paginationDispatch({ type: 'SET_HAS_MORE_ITEMS', payload: false })
         }
      } else {
         productsDispatch({ type: 'SET_IS_LOADING', payload: true })
         paginationDispatch({ type: 'SET_IS_LOADING', payload: true })

         const nextPageOfResults = await fetchNextPage(paginationState.lastPayload)

         setTimeout(function() {
            paginationDispatch({ type: 'SET_IS_LAST_PAYLOAD', payload: nextPageOfResults.model })
            productsDispatch({ type: 'UPDATE_PAYLOAD', payload: nextPageOfResults.model })
         }, 2000)

         productsDispatch({ type: 'SET_IS_LOADING', payload: false })
         paginationDispatch({ type: 'SET_IS_LOADING', payload: false })

         if (!hasNextPage(nextPageOfResults.model)) {
            paginationDispatch({ type: 'SET_HAS_MORE_ITEMS', payload: false })
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
         {paginationState.hasMoreItems ? (
            <button type='button' disabled={paginationState.isLoading} className='wps-button wps-btn-next-page' onClick={onNextPage}>
               {paginationState.isLoading ? 'Loading ...' : 'Load more'}
            </button>
         ) : (
            <Notice message='No items left!' type='info' />
         )}
      </>,
      document.querySelector(paginationState.componentOptions.dropzoneLoadMore)
   )
}

export { PaginationLoadMore }
