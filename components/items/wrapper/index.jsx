import React, { useContext, useRef, useEffect } from 'react'
import { ItemsContext } from '../_state/context'
import { fetchNextPage, graphQuery, findTypeFromPayload } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import to from 'await-to-js'

function resendInitialQuery(state) {
   return graphQuery(findTypeFromPayload(state.payload), state.queryParams)
}

function fetchNextItems(itemsState, itemsDispatch) {
   return new Promise(async (resolve, reject) => {
      console.log('itemsState.payload', itemsState.payload)
      itemsDispatch({ type: 'SET_IS_LOADING', payload: true })

      const [resultsError, results] = await to(fetchNextPage(itemsState.payload))

      console.log('NEXT PAGE RESULTS: ', results)
      console.log('resultsError', resultsError)

      if (resultsError) {
         const [resendInitialQueryError, resendInitialQueryResponse] = await to(resendInitialQuery(itemsState))
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

function ItemsWrapper({ children }) {
   const [itemsState, itemsDispatch] = useContext(ItemsContext)

   const isFirstRender = useRef(true)

   async function fetchNewItems() {
      console.log('fetchNewItems', itemsState.queryParams)

      itemsDispatch({ type: 'SET_IS_LOADING', payload: true })

      const [resultsError, results] = await to(graphQuery(itemsState.dataType, itemsState.queryParams))

      var newItems = results.model[itemsState.dataType]
      var newItemsTotal = newItems.length

      console.log('newItemsTotal', newItemsTotal)
      console.log('newItems', newItems)

      itemsDispatch({ type: 'SET_TOTAL_SHOWN', payload: newItemsTotal })
      itemsDispatch({ type: 'SET_PAYLOAD', payload: newItems })
      itemsDispatch({ type: 'UPDATE_HAS_MORE_ITEMS', payload: newItemsTotal })
      itemsDispatch({ type: 'SET_IS_LOADING', payload: false })
   }

   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }

      fetchNewItems()
   }, [itemsState.queryParams])

   return <>{children}</>
}

export { ItemsWrapper, fetchNextItems }
