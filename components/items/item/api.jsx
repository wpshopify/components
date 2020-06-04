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
  console.log('fetchNextItems 1')

  return new Promise(async (resolve, reject) => {
    if (isEmpty(itemsState.payload)) {
      return
    }
    console.log('SET_IS_LOADING')

    itemsDispatch({ type: 'SET_IS_LOADING', payload: true })

    if (itemsState.beforeLoading) {
      console.log('fetchNextItems 2')
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
      console.log('fetchNextItems 3')
      const [resendInitialError, resendInitialResp] = await to(resendInitialQuery(itemsState))
      console.log('fetchNextItems 4')
      if (resendInitialError) {
        console.log('fetchNextItems 5')
        itemsDispatch({
          type: 'UPDATE_NOTICES',
          payload: { type: 'error', message: resendInitialError },
        })

        itemsDispatch({ type: 'SET_IS_LOADING', payload: false })

        return reject(resendInitialError)
      }

      var productsExisting = sanitizeQueryResponse(resendInitialResp, itemsState.dataType)
    } else {
      console.log('fetchNextItems 6')
      var productsExisting = itemsState.payload
    }
    console.log('fetchNextItems 7')
    const [resultsError, results] = await to(fetchNextPage(productsExisting))
    console.log('fetchNextItems 8')
    if (resultsError) {
      console.log('fetchNextItems 9')
      const [initialError, initialResponse] = await to(resendInitialQuery(itemsState))
      console.log('fetchNextItems 10')
      if (initialError) {
        console.log('fetchNextItems 13')
        itemsDispatch({
          type: 'UPDATE_NOTICES',
          payload: { type: 'error', message: initialError },
        })
        itemsDispatch({ type: 'SET_IS_LOADING', payload: false })

        return reject(initialError)
      } else {
        console.log('fetchNextItems 14')
        if (
          itemsState.dataType === 'collections' ||
          itemsState.originalParams.type === 'collections'
        ) {
          console.log('fetchNextItems 15')
          if (!itemsState.originalParams) {
            console.log('fetchNextItems 16')
            var nextPayload = sanitizeQueryResponse(initialResponse, itemsState.dataType)
          } else {
            console.log('fetchNextItems 17')
            var nextPayload = sanitizeQueryResponse(
              initialResponse,
              itemsState.originalParams.type
            )[0][itemsState.originalParams.type]
          }
        } else {
          console.log('fetchNextItems 18')
          var nextPayload = sanitizeQueryResponse(initialResponse, itemsState.dataType)
        }
        console.log('fetchNextItems 19')
        var [finalResultsError, finalResults] = await to(fetchNextPage(nextPayload))
        console.log('fetchNextItems 20')
        if (finalResultsError) {
          console.log('fetchNextItems 21')
          itemsDispatch({
            type: 'UPDATE_NOTICES',
            payload: { type: 'error', message: finalResultsError },
          })
          itemsDispatch({ type: 'SET_IS_LOADING', payload: false })

          return reject(initialError)
        } else {
          console.log('fetchNextItems 22')
          var nextItems = finalResults.model
        }
      }
    } else {
      console.log('fetchNextItems 11')
      var nextItems = results.model
    }

    itemsDispatch({
      type: 'UPDATE_TOTAL_SHOWN',
      payload: nextItems.length,
    })
    console.log('UPDATE_PAYLOAD 11111')

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
  console.log('UPDATE_PAYLOAD 222222')
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
