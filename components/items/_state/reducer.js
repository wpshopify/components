import update from 'immutability-helper'
import isEmpty from 'lodash/isEmpty'
import some from 'lodash/some'
import concat from 'lodash/concat'
import { getHashFromQueryParams } from '../../../common/utils'
import has from 'lodash/has'
import uniqBy from 'lodash/uniqBy'

function limitReached(state) {
  if (!state.payloadSettings.limit) {
    return false
  }

  return state.totalShown >= state.payloadSettings.limit
}

function limitPayload(currentPayload, newPayload, limit) {
  return currentPayload.concat(newPayload).slice(0, limit)
}

function createNewPayloadCacheObj(state, items) {
  var hashCacheId = getHashFromQueryParams(state.queryParams)

  let newPayloadCacheAddition = {}
  newPayloadCacheAddition[hashCacheId] = items

  return newPayloadCacheAddition
}

function maybeCachePayload(state, updatedPayload, updatedHasMoreItems, hasExistingCache = false) {
  var newPayloadstuff = {
    ...state,
    payload: updatedPayload,
    hasMoreItems: updatedHasMoreItems,
    totalShown: updatedPayload.length
  }

  console.log('newPayloadstuff 1')

  if (hasExistingCache) {
    console.log('newPayloadstuff 2')
    return newPayloadstuff
  }

  if (updatedPayload.length) {
    console.log('newPayloadstuff 3')
    var newCache = createNewPayloadCacheObj(state, updatedPayload)
    console.log('newPayloadstuff 4', newCache)
    newPayloadstuff['payloadCache'] = update(state.payloadCache, { $merge: newCache })
  }
  console.log('newPayloadstuff 5 ........', newPayloadstuff)
  return newPayloadstuff
}

function updatePayload(state, newPayload, skipCache, replace) {
  console.log('updatePayload 1')

  var hashCacheId = getHashFromQueryParams(state.queryParams)
  console.log('updatePayload 2')
  if (!skipCache && has(state.payloadCache, hashCacheId)) {
    console.log('updatePayload 3')
    let updatedPayload = update(state.payload, {
      $set: state.payloadCache[hashCacheId]
    })

    let updatedHasMoreItems = update(state.hasMoreItems, {
      $set: checkHasMore(state.payloadSettings, state.payloadCache[hashCacheId])
    })

    if (limitReached(state)) {
      console.log('updatePayload 4')
      updatedPayload = update(state.payload, {
        $set: limitPayload(state.payload, newPayload, state.payloadSettings.limit)
      })

      updatedHasMoreItems = update(state.hasMoreItems, {
        $set: checkHasMore(state.payloadSettings, updatedPayload)
      })
    }
    console.log('updatePayload 5')
    return maybeCachePayload(state, updatedPayload, updatedHasMoreItems, true)
  }

  if (limitReached(state)) {
    console.log('updatePayload 6')
    let updatedPayload = update(state.payload, {
      $set: limitPayload(state.payload, newPayload, state.payloadSettings.limit)
    })

    let updatedHasMoreItems = update(state.hasMoreItems, {
      $set: checkHasMore(state.payloadSettings, updatedPayload)
    })
    console.log('updatePayload 7')
    return maybeCachePayload(state, updatedPayload, updatedHasMoreItems)
  }
  console.log('updatePayload 8')
  // If lands here, we're not limiting, just adding
  console.log('sup sup', state)

  if (replace) {
    console.log('updatePayload 9')
    var updatedPayload = update(state.payload, {
      $set: newPayload
    })
  } else {
    console.log('updatePayload 10')
    var updatedPayload = update(state.payload, {
      $set: uniqBy(update(state.payload, { $push: newPayload }), 'id')
    })
  }

  let updatedHasMoreItems = update(state.hasMoreItems, {
    $set: checkHasMore(state.payloadSettings, updatedPayload)
  })
  console.log('updatePayload 11')
  return maybeCachePayload(state, updatedPayload, updatedHasMoreItems)
}

function checkHasMore(payloadSettings, payload) {
  if (!payload || !payloadSettings.pageSize || !payloadSettings.pagination) {
    return false
  }

  var payloadLength = payload.length
  var limit = payloadSettings.limit ? parseInt(payloadSettings.limit) : false
  var pageSize = payloadSettings.pageSize
  var lastItem = payload[payloadLength - 1]

  if (!lastItem) {
    return false
  }

  var hasNextPage = lastItem.hasNextPage

  if (!limit) {
    return hasNextPage
  }

  if (pageSize === payloadLength) {
    if (pageSize === limit) {
      return false
    } else if (limit < payloadLength) {
      return false
    } else {
      return true
    }
  } else {
    if (payloadLength > limit) {
      return false
    } else {
      return hasNextPage
    }
  }
}

function ItemsReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_PAYLOAD': {
      if (!action.payload) {
        return {
          ...state
        }
      }

      console.log('action.payload', action.payload)

      if (!has(action.payload, 'skipCache')) {
        action.payload.skipCache = false
      }

      if (!has(action.payload, 'replace')) {
        action.payload.replace = true
      }

      return updatePayload(
        state,
        action.payload.items,
        action.payload.skipCache,
        action.payload.replace
      )
    }

    case 'SET_IS_LOADING': {
      return {
        ...state,
        isLoading: update(state.isLoading, { $set: action.payload })
      }
    }

    case 'MERGE_QUERY_PARAMS': {
      return {
        ...state,
        queryParams: update(state.queryParams, { $merge: action.payload })
      }
    }

    case 'UPDATE_TOTAL_SHOWN': {
      const newTotal = action.payload + state.totalShown

      return {
        ...state,
        totalShown: update(state.totalShown, { $set: newTotal })
      }
    }

    case 'SET_QUERY_PARAMS': {
      return {
        ...state,
        queryParams: update(state.queryParams, { $set: action.payload })
      }
    }

    case 'UPDATE_NOTICES': {
      let updatedNotices = state.notices

      if (isEmpty(action.payload)) {
        updatedNotices = action.payload
      } else {
        if (!some(state.notices, action.payload)) {
          updatedNotices = concat(state.notices, [action.payload])
        } else {
          updatedNotices = state.notices
        }
      }

      return {
        ...state,
        notices: update(state.notices, { $set: updatedNotices })
      }
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type} in ItemsReducer`)
    }
  }
}

export { ItemsReducer }
