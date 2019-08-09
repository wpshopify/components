import React, { useContext, useRef, useEffect } from 'react'
import { ItemsContext } from '../_state/context'
import { ShopContext } from '../../shop/_state/context'
import { fetchNextPage, graphQuery } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import to from 'await-to-js'
import isEmpty from 'lodash/isEmpty'
import has from 'lodash/has'

function resendInitialQuery(state) {
   var originalDataType = has(state.originalParams, 'type') ? state.originalParams.type : state.dataType
   var originalQueryParams = state.originalParams ? state.originalParams.queryParams : state.queryParams
   var connectionParams = has(state.originalParams, 'connectionParams') ? state.originalParams.connectionParams : false

   return graphQuery(originalDataType, originalQueryParams, connectionParams)
}

function fetchNextItems(itemsState, itemsDispatch, miscDispatch = false) {
   return new Promise(async (resolve, reject) => {
      if (isEmpty(itemsState.payload)) {
         return
      }

      itemsDispatch({ type: 'SET_IS_LOADING', payload: true })

      const [resultsError, results] = await to(fetchNextPage(itemsState.payload))
      console.log('fetchNextPage results', results)

      if (resultsError) {
         const [initialError, initialResponse] = await to(resendInitialQuery(itemsState))
         console.log('resendInitialQuery', initialResponse)

         if (initialError) {
            itemsDispatch({ type: 'UPDATE_NOTICES', payload: { type: 'error', message: initialError } })
            itemsDispatch({ type: 'SET_IS_LOADING', payload: false })

            return reject(initialError)
         } else {
            if (itemsState.dataType === 'collections' || itemsState.originalParams.type === 'collections') {
               if (!itemsState.originalParams) {
                  var nextPayload = initialResponse.model[itemsState.dataType]
               } else {
                  var nextPayload = initialResponse.model[itemsState.originalParams.type][0].products
               }
            } else {
               var nextPayload = initialResponse.model[itemsState.dataType]
            }

            var [finalResultsError, finalResults] = await to(fetchNextPage(nextPayload))

            if (finalResultsError) {
               itemsDispatch({ type: 'UPDATE_NOTICES', payload: { type: 'error', message: finalResultsError } })
               itemsDispatch({ type: 'SET_IS_LOADING', payload: false })
               return reject(initialError)
            } else {
               var nextItems = finalResults.model
               var nextItemsTotal = finalResults.model.length
            }
         }
      } else {
         var nextItems = results.model
         var nextItemsTotal = results.model.length
      }

      itemsDispatch({ type: 'SET_TOTAL_SHOWN', payload: nextItemsTotal })
      itemsDispatch({ type: 'UPDATE_PAYLOAD', payload: nextItems })
      itemsDispatch({ type: 'SET_IS_LOADING', payload: false })

      if (miscDispatch) {
         miscDispatch(nextItems)
      }

      resolve(results)
   })
}

function ItemsWrapper({ children, miscDispatch }) {
   const [itemsState, itemsDispatch] = useContext(ItemsContext)
   const isFirstRender = useRef(true)

   async function fetchNewItems(miscDispatch = false) {
      itemsDispatch({ type: 'SET_IS_LOADING', payload: true })
      itemsDispatch({ type: 'UPDATE_NOTICES', payload: [] })

      const [resultsError, results] = await to(graphQuery(itemsState.dataType, itemsState.queryParams))

      if (resultsError) {
         itemsDispatch({ type: 'UPDATE_NOTICES', payload: { type: 'error', message: resultsError } })
      } else {
         var newItems = results.model[itemsState.dataType]
         var newItemsTotal = newItems.length

         itemsDispatch({ type: 'SET_TOTAL_SHOWN', payload: newItemsTotal })
         itemsDispatch({ type: 'SET_PAYLOAD', payload: newItems })
         itemsDispatch({ type: 'UPDATE_HAS_MORE_ITEMS', payload: newItemsTotal })

         if (miscDispatch) {
            miscDispatch(newItems)
         }
      }

      itemsDispatch({ type: 'SET_IS_LOADING', payload: false })
   }

   useEffect(() => {
      console.log('1111111111 itemsState.queryParams 00000000')
      if (isFirstRender.current) {
         console.log('1111111111 itemsState.queryParams FIRST')
         isFirstRender.current = false
         return
      }

      console.log('itemsState.lastQuery', itemsState.lastQuery)
      console.log('itemsState.queryParams.query', itemsState.queryParams.query)

      if (itemsState.lastQuery !== itemsState.queryParams.query) {
         console.log('THEY DONT EQUAL, FETCHING NEW API REQUEST')

         fetchNewItems(miscDispatch)
      } else {
         console.log("THEY'RE EQUAL")
      }
   }, [itemsState.queryParams])

   return <>{children}</>
}

export { ItemsWrapper, fetchNextItems }
