import React, { useContext, useRef, useEffect, useState } from 'react'
import { fetchNextPage, graphQuery, formatIdsIntoQuery } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
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
   const [totalItemsShown, setTotalItemsShown] = useState(paginationItemsState.payload.length)

   function hasNextPage(lastPayload) {
      if (isEmpty(lastPayload)) {
         return false
      }

      return last(lastPayload).hasNextPage
   }

   function setLoadingStates(isLoading) {
      paginationItemsDispatch({ type: 'SET_IS_LOADING', payload: isLoading })
      paginationControlsDispatch({ type: 'SET_IS_LOADING', payload: isLoading })
   }

   function setPayloadStates(payload) {
      paginationItemsDispatch({ type: 'SET_LAST_PAYLOAD', payload: payload })
      paginationItemsDispatch({ type: 'UPDATE_PAYLOAD', payload: payload })
   }

   function setQueryParams(params) {
      paginationDispatch({ type: 'SET_QUERY_PARAMS', payload: params })
   }

   function findTypeFromOriginalPayload(payload) {
      return payload.type.name.split('Connection')[0].toLowerCase() + 's'
   }

   function resendInitialQuery() {
      return graphQuery(findTypeFromOriginalPayload(paginationState.originalPayload), paginationState.originalQueryParams, paginationState.queryParams)
   }

   function limitReached(newTotal) {
      console.log('paginationState.componentOptions.limit', paginationState.componentOptions.limit)

      if (paginationState.componentOptions.limit === 0) {
         return false
      }

      return newTotal >= paginationState.componentOptions.limit
   }

   async function checkForEmptySet(results, totalShown) {
      // console.log('checkForEmptySet results', results)
      console.log('idsChunks')
      console.log('paginationItemsState', paginationItemsState)

      if (!hasNextPage(results) || limitReached(totalShown)) {
         console.log('hasNextPage(results)', hasNextPage(results))
         if (paginationState.componentOptions.idsChunks) {
            var newIds = paginationState.componentOptions.idsChunks[1]
            console.log('newIds', newIds)
            console.log('formatIdsIntoQuery(newIds)', formatIdsIntoQuery(newIds))
            console.log('paginationState.queryParams', paginationState.queryParams)

            const [resultsError, newres] = await to(
               graphQuery(paginationState.dataType, {
                  query: formatIdsIntoQuery(newIds),
                  first: paginationState.queryParams.first,
                  reverse: paginationState.queryParams.reverse,
                  sortKey: paginationState.queryParams.sortKey
               })
            )

            // console.log('newres ???????????????', newres)
            setQueryParams({
               query: formatIdsIntoQuery(newIds)
            })
            setPayloadStates(newres.model.products)
         } else {
            setHasMoreItems(false)
         }
      }
   }

   function getNextResults(lastResults) {
      return new Promise(async (resolve, reject) => {
         const [newResultsError, newResults] = await to(fetchNextPage(lastResults))

         var newTotal = totalItemsShown + newResults.model.length

         setTotalItemsShown(newTotal)
         setPayloadStates(newResults.model)
         checkForEmptySet(newResults.model, newTotal)

         resolve(newResults)
      })
   }

   function combineLastCursorWithParams() {
      const queryParams = paginationState.queryParams
      queryParams.after = paginationState.lastCursorId

      console.log('queryParams', queryParams)

      return queryParams
   }

   async function onNextPage() {
      if (!isFirstLoad) {
         setLoadingStates(true)
         const [resultsError, results] = await to(getNextResults(paginationItemsState.lastPayload))

         setQueryParams(afterQueryParam(results, paginationState.dataType))

         return setLoadingStates(false)
      }

      setIsFirstLoad(false)

      if (!paginationState.lastCursorId) {
         setLoadingStates(true)

         // Resend original query so that we can get a proper response
         const [responseError, response] = await to(resendInitialQuery())

         getNextResults(response.model.collections[0].products)

         return setLoadingStates(false)
      }

      setLoadingStates(true)

      const [resultsError, results] = await to(graphQuery(paginationState.dataType, combineLastCursorWithParams()))

      // if (has(results, 'errors')) {
      // }

      var newTotal = totalItemsShown + results.model[paginationState.dataType].length

      setPayloadStates(results.model[paginationState.dataType])

      setQueryParams(afterQueryParam(results, paginationState.dataType))

      setLoadingStates(false)

      checkForEmptySet(results.model[paginationState.dataType], newTotal)
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
