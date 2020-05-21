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
  return new Promise(async (resolve, reject) => {
    if (isEmpty(itemsState.payload)) {
      return
    }
    console.log('SET_IS_LOADING')

    itemsDispatch({ type: 'SET_IS_LOADING', payload: true })

    if (itemsState.beforeLoading) {
      itemsState.beforeLoading(itemsState)
    }

    /*

   This check is needed because of our caching system. The "next page" of products is fetched 
   using the payload of the last page. This is using the built in Shopify buy SDK method fetchNextPage.

   This Shopify function calls the method hasNextPageQueryAndPath on the last payload item.

   Since our caching system strips all functions from the payload, we loose the ability to call these built in functions.

   So before loading more, we need to check whether this method exists on the last item in our payload. If it does, we can simply proceed. If not, we need to refetch the initial query first. 

   */
    if (!hasNextPageQueryAndPath(itemsState.payload)) {
      const [resendInitialError, resendInitialResp] = await to(resendInitialQuery(itemsState))

      if (resendInitialError) {
        itemsDispatch({
          type: 'UPDATE_NOTICES',
          payload: { type: 'error', message: resendInitialError },
        })

        itemsDispatch({ type: 'SET_IS_LOADING', payload: false })

        return reject(resendInitialError)
      }

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

function updatePayloadState(newItems) {
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
}

export { fetchNextItems }
