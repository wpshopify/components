import { hashQueryParams } from '../../../common/utils'

function checkHasMore(component) {
  if (
    !component.componentPayload ||
    !component.componentOptions.pageSize ||
    !component.componentOptions.pagination
  ) {
    return false
  }

  var payload = component.componentPayload
  var payloadLength = payload.length
  var limit = component.componentOptions.limit ? parseInt(component.componentOptions.limit) : false
  var pageSize = component.componentOptions.pageSize
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

function hashInitialPayloadCache(queryParams, payload) {
  let initalPayloadCache = {}

  if (payload) {
    var hashId = hashQueryParams(queryParams)
    initalPayloadCache[hashId] = payload
  }

  return initalPayloadCache
}

function ItemsInitialState({ component, miscDispatch }) {
  var itemsState = {
    componentOptions: component.componentOptions,
    element: component.componentElement,
    payload: [],
    queryParams: {
      query: component.componentOptions.query,
      sortKey: component.componentOptions.sortBy,
      reverse: component.componentOptions.reverse,
      first: component.componentOptions.pageSize
    },
    originalParams: {
      type: component.componentType,
      queryParams: {
        query: component.componentOptions.query,
        sortKey: component.componentOptions.sortBy,
        reverse: component.componentOptions.reverse,
        first: component.componentOptions.pageSize
      },
      connectionParams: false
    },
    dataType: component.componentType,
    limit: component.componentOptions.limit ? parseInt(component.componentOptions.limit) : false,
    lastCursorId: false,
    totalShown: 0,
    noResultsText: component.componentOptions.noResultsText
      ? component.componentOptions.noResultsText
      : 'No items left',
    isLoading: false,
    hasMoreItems: checkHasMore(component),
    notices: [],
    lastQuery: component.componentOptions.query ? component.componentOptions.query : false,
    payloadCache: {},
    miscDispatch: miscDispatch ? miscDispatch : false
  }

  wp.hooks.doAction('items.init', itemsState)

  return itemsState
}

export { ItemsInitialState }
