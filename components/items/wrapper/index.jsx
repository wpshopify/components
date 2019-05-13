import React, { useContext, useRef, useEffect } from 'react'
import { ItemsContext } from '../_state/context'
import { fetchNextPage, graphQuery, findTypeFromPayload } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import to from 'await-to-js'
import isEmpty from 'lodash/isEmpty'
import has from 'lodash/has'

function resendInitialQuery(state) {
   console.log('state!!!!!!!!!!!!!! ', state)
   var connectionParams = has(state.originalParams, 'connectionParams') ? state.originalParams.connectionParams : false

   return graphQuery(state.dataType, state.originalParams, connectionParams)
}

function fetchNextItems(itemsState, itemsDispatch) {
   return new Promise(async (resolve, reject) => {
      if (isEmpty(itemsState.payload)) {
         return
      }

      itemsDispatch({ type: 'SET_IS_LOADING', payload: true })

      const [resultsError, results] = await to(fetchNextPage(itemsState.payload))

      if (resultsError) {
         console.log('errror, resending original query')

         const [resendInitialQueryError, resendInitialQueryResponse] = await to(resendInitialQuery(itemsState))
         console.log('resendInitialQueryResponse ::', resendInitialQueryResponse)

         if (itemsState.dataType === 'collections') {
            var nextPayload = resendInitialQueryResponse.model[itemsState.dataType][0].products
         } else {
            var nextPayload = resendInitialQueryResponse.model[itemsState.dataType]
         }

         var [finalResultsError, finalResults] = await to(fetchNextPage(nextPayload))

         console.log('finalResults .............................', finalResults)

         var nextItems = finalResults.model
         var nextItemsTotal = finalResults.model.length
      } else {
         var nextItems = results.model
         var nextItemsTotal = results.model.length
      }

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
      itemsDispatch({ type: 'SET_IS_LOADING', payload: true })

      const [resultsError, results] = await to(graphQuery(itemsState.dataType, itemsState.queryParams))

      var newItems = results.model[itemsState.dataType]
      var newItemsTotal = newItems.length

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
