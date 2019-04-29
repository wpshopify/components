import React, { useContext, useRef, useEffect, useState } from 'react'
import { fetchNextPage, graphQuery } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import { PaginationContext } from '../../_state/context'
import { PaginationItemsContext } from '../../items/_state/context'
import { PaginationControlsContext } from '../_state/context'
import { Notice } from '../../../notice'
import { usePortal } from '../../../../common/hooks'
import last from 'lodash/last'
import has from 'lodash/has'
import isEmpty from 'lodash/isEmpty'
import to from 'await-to-js'
import { afterQueryParam } from '../index'

function PaginationLoadMore() {
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
      if (isFirstLoad) {
         console.log('.............................. FIRST LOAD')
         console.log('paginationState :::::::::::::::::::::', paginationState)
         console.log('paginationItemsState :::::::::::::::::', paginationItemsState)

         // var sutff1 = paginationState.dataType;
         // var stuff2 = false;

         if (!paginationState.lastCursorId) {
            // paginationState.queryParams.first

            paginationItemsDispatch({ type: 'SET_IS_LOADING', payload: true })
            paginationControlsDispatch({ type: 'SET_IS_LOADING', payload: true })

            // Resend original query so that we can get a proper response
            const [shopifyError, shopifyResponse] = await to(graphQuery('collections', paginationState.originalQueryParams, paginationState.queryParams))

            console.log('// shopifyResponse', shopifyResponse)
            console.log('// shopifyError ', shopifyError)

            const [nextPageOfResultsErrorHi, nextPageOfResults] = await to(fetchNextPage(shopifyResponse.model.collections[0].products))

            console.log('// nextPageOfResults', nextPageOfResults.model)
            console.log('// nextPageOfResultsErrorHi ', nextPageOfResultsErrorHi)

            setIsFirstLoad(false)

            paginationItemsDispatch({ type: 'SET_LAST_PAYLOAD', payload: nextPageOfResults.model })
            console.log('shopifyResponse.data')

            // paginationDispatch({ type: 'SET_QUERY_PARAMS', payload: afterQueryParam(shopifyResponse, paginationState.dataType) })

            paginationItemsDispatch({ type: 'UPDATE_PAYLOAD', payload: nextPageOfResults.model })
            paginationItemsDispatch({ type: 'SET_IS_LOADING', payload: false })

            paginationControlsDispatch({ type: 'SET_IS_LOADING', payload: false })

            if (!hasNextPage(nextPageOfResults.model)) {
               setHasMoreItems(false)
            }
         } else {
            const firstQueryParams = paginationState.queryParams
            firstQueryParams.after = paginationState.lastCursorId

            paginationItemsDispatch({ type: 'SET_IS_LOADING', payload: true })

            paginationControlsDispatch({ type: 'SET_IS_LOADING', payload: true })

            // console.log('paginationState.dataType', paginationState.dataType)
            // console.log('firstQueryParams', firstQueryParams)

            if (!paginationState.dataType) {
               console.log('//////////////////////////')
               paginationState.dataType = 'products'
            }

            console.log('paginationItemsState.lastPayload', paginationItemsState.lastPayload)

            const [shopifyError, shopifyResponse] = await to(graphQuery(paginationState.dataType, firstQueryParams))

            console.log('___________________ paginationState', paginationState)
            console.log('shopifyError', shopifyError)

            if (has(shopifyResponse, 'errors')) {
               console.log('!!!!!!!!!!! ERRORS shopifyResponse !!!!!!!!!!!', shopifyResponse)
            } else {
               console.log('success shopifyResponse', shopifyResponse)
            }

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
         }
      } else {
         console.log('.............................. nottt FIRST LOAD', paginationItemsState.lastPayload)

         paginationItemsDispatch({ type: 'SET_IS_LOADING', payload: true })

         paginationControlsDispatch({ type: 'SET_IS_LOADING', payload: true })

         const [nextPageOfResultsError, nextPageOfResults] = await to(fetchNextPage(paginationItemsState.lastPayload))

         console.log('nextPageOfResultsError', nextPageOfResultsError)

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
