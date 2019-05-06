import React, { useContext, useEffect, useRef } from 'react'
import { PaginationControls } from './controls'
import { usePortal } from '../../common/hooks'
import { PaginationItems } from './items'
import { PaginationProvider } from './_state/provider'
import { ItemsContext } from '../items/_state/context'
import { Notice } from '../notice'
import isEmpty from 'lodash/isEmpty'
import { fetchNextPage, graphQuery, findTypeFromPayload } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import to from 'await-to-js'

function Pagination({ children }) {
   const [itemsState, itemsDispatch] = useContext(ItemsContext)
   const isFirstRender = useRef(true)

   function resendInitialQuery() {
      return graphQuery(findTypeFromPayload(itemsState.payload), itemsState.queryParams)
   }

   function fetchNextItems() {
      return new Promise(async (resolve, reject) => {
         console.log('itemsState.payload', itemsState.payload)
         itemsDispatch({ type: 'SET_IS_LOADING', payload: true })

         const [resultsError, results] = await to(fetchNextPage(itemsState.payload))

         console.log('NEXT PAGE RESULTS: ', results)
         console.log('resultsError', resultsError)

         if (resultsError) {
            const [resendInitialQueryError, resendInitialQueryResponse] = await to(resendInitialQuery())
            console.log('resendInitialQueryError', resendInitialQueryError)
            console.log('resendInitialQueryResponse', resendInitialQueryResponse)

            var [finalResultsError, finalResults] = await to(fetchNextPage(resendInitialQueryResponse.model[itemsState.dataType]))
            console.log('finalResults', finalResults)
            console.log('finalResultsError', finalResultsError)

            var nextItems = finalResults.model
            var nextItemsTotal = finalResults.model.length

            console.log('resend results ...............', finalResults)
         } else {
            console.log('initial send results ...............', results)

            var nextItems = results.model
            var nextItemsTotal = results.model.length
         }

         console.log('final: nextItems', nextItems)
         console.log('final: nextItemsTotal', nextItemsTotal)

         itemsDispatch({ type: 'SET_TOTAL_SHOWN', payload: nextItemsTotal })
         itemsDispatch({ type: 'UPDATE_PAYLOAD', payload: nextItems })
         itemsDispatch({ type: 'SET_IS_LOADING', payload: false })

         resolve(results)
      })
   }

   async function fetchNewItems() {
      itemsDispatch({ type: 'SET_IS_LOADING', payload: true })

      const [resultsError, results] = await to(graphQuery(itemsState.dataType, itemsState.queryParams))

      var newItems = results.model[itemsState.dataType]
      var newItemsTotal = newItems.length

      itemsDispatch({ type: 'SET_TOTAL_SHOWN', payload: newItemsTotal })
      itemsDispatch({ type: 'UPDATE_PAYLOAD', payload: newItems })
      itemsDispatch({ type: 'SET_IS_LOADING', payload: false })
   }

   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }

      fetchNewItems()
   }, [itemsState.queryParams])

   return usePortal(
      <PaginationProvider options={itemsState}>
         {isEmpty(itemsState.payload) ? <Notice message={itemsState.noResultsText} type='info' /> : <PaginationItems>{children}</PaginationItems>}

         {itemsState.componentOptions.pagination && <PaginationControls fetchNextItems={fetchNextItems} />}
      </PaginationProvider>
   )
}

export { Pagination }
