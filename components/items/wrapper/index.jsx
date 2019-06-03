import React, { useContext, useRef, useEffect } from 'react'
import { ItemsContext } from '../_state/context'
import { ShopContext } from '../../shop/_state/context'
import { fetchNextPage, graphQuery } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import to from 'await-to-js'
import isEmpty from 'lodash/isEmpty'
import has from 'lodash/has'

function resendInitialQuery(state) {
   var connectionParams = has(state.originalParams, 'connectionParams') ? state.originalParams.connectionParams : false
   var originalDataType = has(state.originalParams, 'type') ? state.originalParams.type : state.dataType
   var originalQueryParams = state.originalParams ? state.originalParams.queryParams : state.queryParams

   return graphQuery(originalDataType, originalQueryParams, connectionParams)
}

function fetchNextItems(itemsState, itemsDispatch) {
   return new Promise(async (resolve, reject) => {
      if (isEmpty(itemsState.payload)) {
         return
      }

      itemsDispatch({ type: 'SET_IS_LOADING', payload: true })

      const [resultsError, results] = await to(fetchNextPage(itemsState.payload))

      if (resultsError) {
         const [initialError, initialResponse] = await to(resendInitialQuery(itemsState))

         if (itemsState.dataType === 'collections' || itemsState.originalParams.type === 'collections') {
            var nextPayload = initialResponse.model[itemsState.originalParams.type][0].products
         } else {
            var nextPayload = initialResponse.model[itemsState.dataType]
         }

         var [finalResultsError, finalResults] = await to(fetchNextPage(nextPayload))

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
