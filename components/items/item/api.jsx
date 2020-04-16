import { getHashFromQueryParams } from '../../../common/utils'
import {
  fetchNextPage,
  graphQuery,
} from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import to from 'await-to-js'
import isEmpty from 'lodash/isEmpty'
import has from 'lodash/has'

function sanitizeQueryResponse(response, type) {
  if (type === 'storefront' || type === 'search') {
    type = 'products'
  }

  if (!response.model) {
    return []
  }

  return response.model[type]
}

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

/*

Fetch NEXT items

*/
function fetchNextItems(itemsState, itemsDispatch) {
  console.log('fetchNextItems 0')

  return new Promise(async (resolve, reject) => {
    console.log('itemsState', itemsState)

    if (isEmpty(itemsState.payload)) {
      console.log('fetchNextItems 1')
      return
    }

    itemsDispatch({ type: 'SET_IS_LOADING', payload: true })
    console.log('fetchNextItems 2')
    if (itemsState.beforeLoading) {
      console.log('fetchNextItems 3')
      itemsState.beforeLoading(itemsState)
    }
    console.log('fetchNextItems 4')
    /*

   This check is needed because of our caching system. The "next page" of products is fetched 
   using the payload of the last page. This is using the built in Shopify buy SDK method fetchNextPage.

   This Shopify function calls the method hasNextPageQueryAndPath on the last payload item.

   Since our caching system strips all functions from the payload, we loose the ability to call these built in functions.

   So before loading more, we need to check whether this method exists on the last item in our payload. If it does, we can simply proceed. If not, we need to refetch the initial query first. 

   */
    if (!hasNextPageQueryAndPath(itemsState.payload)) {
      const [resendInitialError, resendInitialResp] = await to(resendInitialQuery(itemsState))

      var productsExisting = sanitizeQueryResponse(resendInitialResp, itemsState.dataType)
    } else {
      var productsExisting = itemsState.payload
    }

    const [resultsError, results] = await to(fetchNextPage(productsExisting))

    if (resultsError) {
      const [initialError, initialResponse] = await to(resendInitialQuery(itemsState))

      if (initialError) {
        itemsDispatch({
          type: 'UPDATE_NOTICES',
          payload: { type: 'error', message: initialError },
        })
        itemsDispatch({ type: 'SET_IS_LOADING', payload: false })

        return reject(initialError)
      } else {
        if (
          itemsState.dataType === 'collections' ||
          itemsState.originalParams.type === 'collections'
        ) {
          if (!itemsState.originalParams) {
            var nextPayload = sanitizeQueryResponse(initialResponse, itemsState.dataType)
          } else {
            var nextPayload = sanitizeQueryResponse(
              initialResponse,
              itemsState.originalParams.type
            )[0][itemsState.originalParams.type]
          }
        } else {
          var nextPayload = sanitizeQueryResponse(initialResponse, itemsState.dataType)
        }

        var [finalResultsError, finalResults] = await to(fetchNextPage(nextPayload))

        if (finalResultsError) {
          itemsDispatch({
            type: 'UPDATE_NOTICES',
            payload: { type: 'error', message: finalResultsError },
          })
          itemsDispatch({ type: 'SET_IS_LOADING', payload: false })

          return reject(initialError)
        } else {
          var nextItems = finalResults.model
        }
      }
    } else {
      var nextItems = results.model
    }

    itemsDispatch({
      type: 'UPDATE_TOTAL_SHOWN',
      payload: nextItems.length,
    })

    itemsDispatch({
      type: 'UPDATE_PAYLOAD',
      payload: {
        items: nextItems,
        skipCache: true,
        replace: false,
      },
    })
    itemsDispatch({ type: 'SET_IS_LOADING', payload: false })

    if (itemsState.afterLoading) {
      itemsState.afterLoading(nextItems)
    }

    resolve(results)
  })
}

function setCachedPayload(itemsState, itemsDispatch, hashCacheId) {
  console.log('fetchNewItems 2')
  itemsDispatch({
    type: 'UPDATE_TOTAL_SHOWN',
    payload: itemsState.payloadCache[hashCacheId].length,
  })

  itemsDispatch({
    type: 'UPDATE_PAYLOAD',
    payload: {
      items: itemsState.payloadCache[hashCacheId],
      replace: true,
    },
  })

  console.log('itemsState.afterLoading', itemsState.afterLoading)
  console.log('fetchNewItems 3')
  if (itemsState.afterLoading) {
    console.log('fetchNewItems 4')
    itemsState.afterLoading(itemsState.payloadCache)
  }
}

/*

Fetch NEW items

*/
async function fetchNewItems(itemsState, itemsDispatch) {
  console.log('fetchNewItems 0', itemsState)
  console.log('itemsState.beforeLoading', itemsState.beforeLoading)

  if (itemsState.beforeLoading) {
    console.log('fetchNewItems 1')
    itemsState.beforeLoading(itemsState)
  }

  var hashCacheId = getHashFromQueryParams(itemsState.queryParams)
  console.log('hashCacheId', hashCacheId)
  console.log('itemsState.payloadCache', itemsState.payloadCache)

  /* 
  
  This payloadCache is only available during a users page visit. As such, 
  only the storefront, search, and pagination controls benefit.

  */
  if (has(itemsState.payloadCache, hashCacheId)) {
    console.log('fetchNewItems 4')
    return setCachedPayload(itemsState, itemsDispatch, hashCacheId)
  }

  console.log('fetchNewItems 5')
  // Lands here when we fetch brand new items
  itemsDispatch({
    type: 'SET_IS_LOADING',
    payload: true,
  })
  itemsDispatch({
    type: 'UPDATE_NOTICES',
    payload: [],
  })

  const [resultsError, results] = await to(graphQuery(itemsState.dataType, itemsState.queryParams))
  console.log('fetchNewItems 6', resultsError)
  console.log('fetchNewItems 7', results)

  if (resultsError) {
    itemsDispatch({
      type: 'UPDATE_NOTICES',
      payload: {
        type: 'error',
        message: resultsError,
      },
    })

    return resultsError
  }

  var newItems = sanitizeQueryResponse(results, itemsState.dataType)

  itemsDispatch({
    type: 'UPDATE_TOTAL_SHOWN',
    payload: newItems.length,
  })

  itemsDispatch({
    type: 'UPDATE_PAYLOAD',
    payload: {
      items: newItems,
      replace: true,
    },
  })

  if (itemsState.afterLoading) {
    itemsState.afterLoading(newItems)
  }

  itemsDispatch({
    type: 'SET_IS_LOADING',
    payload: false,
  })
}

export { fetchNewItems, fetchNextItems }
