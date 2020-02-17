function checkHasMore(component) {
  if (
    !component.componentPayload ||
    !component.payloadSettings.pageSize ||
    !component.payloadSettings.pagination
  ) {
    return false
  }

  var payload = component.componentPayload
  var payloadLength = payload.length
  var limit = component.payloadSettings.limit ? parseInt(component.payloadSettings.limit) : false
  var pageSize = component.payloadSettings.pageSize
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

function ItemsInitialState({ component, afterLoading, beforeLoading }) {
  var itemsState = {
    payloadSettings: component.payloadSettings,
    element: component.componentElement,
    payload: [],
    queryParams: {
      query: component.payloadSettings.query,
      sortKey: component.payloadSettings.sortBy,
      reverse: component.payloadSettings.reverse,
      first: component.payloadSettings.pageSize
    },
    originalParams: {
      type: component.componentType,
      queryParams: {
        query: component.payloadSettings.query,
        sortKey: component.payloadSettings.sortBy,
        reverse: component.payloadSettings.reverse,
        first: component.payloadSettings.pageSize
      },
      connectionParams: false
    },
    dataType: component.componentType,
    limit: component.payloadSettings.limit ? parseInt(component.payloadSettings.limit) : false,
    lastCursorId: false,
    totalShown: 0,
    noResultsText: component.payloadSettings.noResultsText
      ? component.payloadSettings.noResultsText
      : 'No items left',
    isLoading: false,
    hasMoreItems: checkHasMore(component),
    notices: [],
    lastQuery: component.payloadSettings.query ? component.payloadSettings.query : false,
    payloadCache: {},
    afterLoading: afterLoading,
    beforeLoading: beforeLoading
  }

  wp.hooks.doAction('items.init', itemsState)

  return itemsState
}

export { ItemsInitialState }
