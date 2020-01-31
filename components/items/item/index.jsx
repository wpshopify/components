import React, { useContext, useRef, useEffect } from 'react'
import { ItemsContext } from '../_state/context'
import { ShopContext } from '../../shop/_state/context'
import { hashQueryParams } from '../../../common/utils'
import {
  fetchNextPage,
  graphQuery
} from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import to from 'await-to-js'
import isEmpty from 'lodash/isEmpty'
import has from 'lodash/has'

function resendInitialQuery(state) {
  var originalDataType = has(state.originalParams, 'type')
    ? state.originalParams.type
    : state.dataType
  var originalQueryParams = state.originalParams
    ? state.originalParams.queryParams
    : state.queryParams
  var connectionParams = has(state.originalParams, 'connectionParams')
    ? state.originalParams.connectionParams
    : false

  return graphQuery(originalDataType, originalQueryParams, connectionParams)
}

function hasNextPageQueryAndPath(payload) {
  if (!payload || isEmpty(payload)) {
    return false
  }

  // Checks if the latest item in the payload has the nextPageQueryAndPath method
  return has(payload[payload.length - 1], 'nextPageQueryAndPath')
}

function fetchNextItems(itemsState, itemsDispatch, miscDispatch = false) {
  return new Promise(async (resolve, reject) => {
    if (isEmpty(itemsState.payload)) {
      return
    }

    itemsDispatch({ type: 'SET_IS_LOADING', payload: true })

    /*
      
      This check is needed because of our caching system. The "next page" of products is fetched 
      using the payload of the last page. This is using the built in Shopify buy SDK method fetchNextPage.

      This Shopify function calls the method hasNextPageQueryAndPath on the last payload item.
      
      Since our caching system strips all functions from the payload, we loose the ability to call these built in functions.

      So before loading more, we need to check whether this method exists on the last item in our payload. If it does, we can simply proceed. If not, we need to refetch the initial query first. 

      */
    if (!hasNextPageQueryAndPath(itemsState.payload)) {
      const [resendInitialError, resendInitialResp] = await to(resendInitialQuery(itemsState))

      var productsExisting = resendInitialResp.model.products
    } else {
      var productsExisting = itemsState.payload
    }

    const [resultsError, results] = await to(fetchNextPage(productsExisting))

    if (resultsError) {
      const [initialError, initialResponse] = await to(resendInitialQuery(itemsState))

      if (initialError) {
        itemsDispatch({
          type: 'UPDATE_NOTICES',
          payload: { type: 'error', message: initialError }
        })
        itemsDispatch({ type: 'SET_IS_LOADING', payload: false })

        return reject(initialError)
      } else {
        if (
          itemsState.dataType === 'collections' ||
          itemsState.originalParams.type === 'collections'
        ) {
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
          itemsDispatch({
            type: 'UPDATE_NOTICES',
            payload: { type: 'error', message: finalResultsError }
          })
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

    if (itemsState.miscDispatch) {
      itemsState.miscDispatch(nextItems)
    }

    resolve(results)
  })
}

function Item({ children }) {
  const [itemsState, itemsDispatch] = useContext(ItemsContext)
  const isFirstRender = useRef(true)

  async function fetchNewItems(miscDispatch = false) {
    var hashCacheId = hashQueryParams(itemsState.queryParams)

    console.log('hashCacheId', hashCacheId)

    if (has(itemsState.payloadCache, hashCacheId)) {
      itemsDispatch({
        type: 'SET_TOTAL_SHOWN',
        payload: itemsState.payloadCache[hashCacheId].length
      })
      itemsDispatch({
        type: 'SET_PAYLOAD',
        payload: itemsState.payloadCache[hashCacheId]
      })
      itemsDispatch({
        type: 'UPDATE_HAS_MORE_ITEMS',
        payload: itemsState.payloadCache[hashCacheId].length
      })

      if (itemsState.miscDispatch) {
        itemsState.miscDispatch(itemsState.payloadCache)
      }
    } else {
      itemsDispatch({ type: 'SET_IS_LOADING', payload: true })
      itemsDispatch({ type: 'UPDATE_NOTICES', payload: [] })

      console.log('itemsState.queryParams', itemsState.queryParams)
      console.log('itemsState.dataType', itemsState.dataType)

      const [resultsError, results] = await to(
        graphQuery(itemsState.dataType, itemsState.queryParams)
      )

      if (resultsError) {
        itemsDispatch({
          type: 'UPDATE_NOTICES',
          payload: { type: 'error', message: resultsError }
        })
      } else {
        var newItems = results.model[itemsState.dataType]
        var newItemsTotal = newItems.length

        itemsDispatch({ type: 'SET_TOTAL_SHOWN', payload: newItemsTotal })
        itemsDispatch({ type: 'SET_PAYLOAD', payload: newItems })
        itemsDispatch({ type: 'UPDATE_HAS_MORE_ITEMS', payload: newItemsTotal })

        if (newItems.length) {
          let newPayloadCacheAddition = {}
          newPayloadCacheAddition[hashCacheId] = newItems
          console.log('>>>>>>>>>>>> newItems ', newItems)

          itemsDispatch({
            type: 'UPDATE_PAYLOAD_CACHE',
            payload: newPayloadCacheAddition
          })
        }

        if (itemsState.miscDispatch) {
          itemsState.miscDispatch(newItems)
        }
      }

      itemsDispatch({ type: 'SET_IS_LOADING', payload: false })
    }
  }

  useEffect(() => {
    //  if (isFirstRender.current) {
    //    isFirstRender.current = false
    //    return
    //  }
    console.log('Item itemsState', itemsState)

    fetchNewItems(itemsState.miscDispatch)
  }, [itemsState.queryParams])

  return <>{children}</>
}

export { Item, fetchNextItems }
