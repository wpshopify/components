import React, { useContext, useEffect, useRef } from 'react'
import { fetchNextPage, graphQuery } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import { PaginationContext } from '../../_state/context'
import { PaginationControlsContext } from '../_state/context'
import { usePortal } from '../../../../common/hooks'
import to from 'await-to-js'
import { afterQueryParam } from '../index'

function PaginationLoadMore() {
   const [paginationState, paginationDispatch] = useContext(PaginationContext)

   const [paginationControlsState, paginationControlsDispatch] = useContext(PaginationControlsContext)

   const isFirstLoad = useRef(true)

   function setTotalItemsShown(itemsToAdd) {
      paginationDispatch({ type: 'SET_TOTAL_SHOWN', payload: itemsToAdd })
   }

   function setLoadingStates(isLoading) {
      paginationDispatch({ type: 'SET_IS_LOADING', payload: isLoading })
      paginationControlsDispatch({ type: 'SET_IS_LOADING', payload: isLoading })
   }

   function setPayloadStates(payload) {
      paginationDispatch({ type: 'SET_LAST_PAYLOAD', payload: payload })
      paginationDispatch({ type: 'UPDATE_PAYLOAD', payload: payload })
   }

   function setQueryParams(params) {
      paginationDispatch({ type: 'SET_QUERY_PARAMS', payload: params })
   }

   function setControlsTouched(touched) {
      paginationDispatch({ type: 'SET_CONTROLS_TOUCHED', payload: touched })
   }

   function findTypeFromOriginalPayload(payload) {
      return payload.type.name.split('Connection')[0].toLowerCase() + 's'
   }

   function resendInitialQuery() {
      console.log('paginationState', paginationState)

      return graphQuery(findTypeFromOriginalPayload(paginationState.originalPayload), paginationState.originalQueryParams, paginationState.queryParams)
   }

   function getNextResults(lastResults) {
      return new Promise(async (resolve, reject) => {
         const [newResultsError, newResults] = await to(fetchNextPage(lastResults))

         setTotalItemsShown(newResults.model.length)
         setPayloadStates(newResults.model)

         resolve(newResults)
      })
   }

   function combineLastCursorWithParams() {
      const queryParams = paginationState.queryParams
      queryParams.after = paginationState.lastCursorId

      return queryParams
   }

   async function onNextPage() {
      setControlsTouched(true)

      if (!isFirstLoad.current) {
         setLoadingStates(true)
         const [resultsError, results] = await to(getNextResults(paginationState.lastPayload))

         setQueryParams(afterQueryParam(results, paginationState.dataType))

         return setLoadingStates(false)
      }

      isFirstLoad.current = false

      if (!paginationState.lastCursorId) {
         setLoadingStates(true)

         // Resend original query so that we can get a proper response
         const [responseError, response] = await to(resendInitialQuery())
         console.log('paginationState //////////////', paginationState)
         console.log('response!!!!!!!!!!!!!', response)

         if (paginationState.dataType === 'products') {
            var newModel = response.model.products
         } else if (paginationState.dataType === 'collections') {
            var newModel = response.model.collections[0].products
         }

         const [nextError, nextResponse] = await to(getNextResults(newModel))
         console.log('nextResponse', nextResponse)

         return setLoadingStates(false)
      }

      setLoadingStates(true)

      const [resultsError, results] = await to(graphQuery(paginationState.dataType, combineLastCursorWithParams()))

      setTotalItemsShown(results.model[paginationState.dataType].length)
      setPayloadStates(results.model[paginationState.dataType])
      setQueryParams(afterQueryParam(results, paginationState.dataType))
      setLoadingStates(false)
   }

   return usePortal(
      <>
         {paginationState.hasMoreItems && (
            <button type='button' disabled={paginationControlsState.isLoading} className='wps-button wps-btn-next-page' onClick={onNextPage}>
               {paginationControlsState.isLoading ? 'Loading ...' : 'Load more'}
            </button>
         )}
      </>,
      document.querySelector(paginationState.componentOptions.dropzoneLoadMore)
   )
}

export { PaginationLoadMore }
