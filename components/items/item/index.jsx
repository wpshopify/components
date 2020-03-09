import { ItemsContext } from '../_state/context'
import { getHashFromQueryParams } from '../../../common/utils'
import {
  fetchNextPage,
  graphQuery
} from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import to from 'await-to-js'
import isEmpty from 'lodash/isEmpty'
import has from 'lodash/has'
import isEqual from 'lodash/isEqual'

const { useContext, useRef, useEffect } = wp.element

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

function fetchNextItems(itemsState, itemsDispatch) {
  return new Promise(async (resolve, reject) => {
    if (isEmpty(itemsState.payload)) {
      return
    }

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
        }
      }
    } else {
      var nextItems = results.model
    }

    itemsDispatch({
      type: 'UPDATE_TOTAL_SHOWN',
      payload: nextItems.length
    })

    itemsDispatch({
      type: 'UPDATE_PAYLOAD',
      payload: {
        items: nextItems,
        skipCache: true,
        replace: false
      }
    })
    itemsDispatch({ type: 'SET_IS_LOADING', payload: false })

    if (itemsState.afterLoading) {
      itemsState.afterLoading(nextItems)
    }

    resolve(results)
  })
}

function Item({ children, customQueryParams, limit = false, infiniteScroll = false }) {
  const [itemsState, itemsDispatch] = useContext(ItemsContext)
  const isFirstRender = useRef(true)

  async function fetchNewItems() {
    if (itemsState.beforeLoading) {
      itemsState.beforeLoading(itemsState)
    }

    var hashCacheId = getHashFromQueryParams(itemsState.queryParams)

    if (has(itemsState.payloadCache, hashCacheId)) {
      itemsDispatch({
        type: 'UPDATE_TOTAL_SHOWN',
        payload: itemsState.payloadCache[hashCacheId].length
      })

      itemsDispatch({
        type: 'UPDATE_PAYLOAD',
        payload: {
          items: itemsState.payloadCache[hashCacheId],
          replace: true
        }
      })

      if (itemsState.afterLoading) {
        itemsState.afterLoading(itemsState.payloadCache)
      }
    } else {
      /*
      
      Lands here when we fetch brand new items
      
      */
      itemsDispatch({ type: 'SET_IS_LOADING', payload: true })
      itemsDispatch({ type: 'UPDATE_NOTICES', payload: [] })

      const [resultsError, results] = await to(
        graphQuery(itemsState.dataType, itemsState.queryParams)
      )

      if (resultsError) {
        itemsDispatch({
          type: 'UPDATE_NOTICES',
          payload: { type: 'error', message: resultsError }
        })

        return
      }

      var newItems = results.model[itemsState.dataType]

      itemsDispatch({
        type: 'UPDATE_TOTAL_SHOWN',
        payload: newItems.length
      })

      itemsDispatch({
        type: 'UPDATE_PAYLOAD',
        payload: {
          items: newItems,
          replace: true
        }
      })

      if (itemsState.afterLoading) {
        itemsState.afterLoading(newItems)
      }

      itemsDispatch({ type: 'SET_IS_LOADING', payload: false })
    }
  }

  useEffect(() => {
    wp.hooks.doAction('before.payload.update', itemsState)

    fetchNewItems()
  }, [itemsState.queryParams])

  /*

   Run after every render. Make sure this only runs when customQueryParams changes

   */
  useEffect(() => {
    if (!customQueryParams || itemsState.isLoading) {
      return
    }

    if (!isEqual(itemsState.queryParams, customQueryParams)) {
      itemsDispatch({
        type: 'SET_QUERY_PARAMS',
        payload: customQueryParams
      })
    }
  }, [customQueryParams])

  useEffect(() => {
    if (itemsState.isLoading) {
      return
    }

    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    itemsDispatch({
      type: 'UPDATE_PAYLOAD',
      payload: {
        items: itemsState.payload,
        replace: false
      }
    })
  }, [limit, infiniteScroll])

  return <>{children}</>
}

export { Item, fetchNextItems }
