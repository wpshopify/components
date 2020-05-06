import uniqid from 'uniqid'

function ItemsInitialState({
  component,
  afterLoading = false,
  beforeLoading = false,
  customQueryParams = false,
  payload = false,
}) {
  console.log('component.connectionParams >>>>>>>', component)

  if (component.componentType === 'collections') {
    var connectionParams = {
      first: parseInt(component.payloadSettings.products.pageSize),
      reverse: component.payloadSettings.products.reverse,
      sortKey: component.payloadSettings.products.sortBy,
      query: component.payloadSettings.products.query,
    }
  } else {
    var connectionParams = false
  }

  var itemsState = {
    payloadSettings: component.payloadSettings,
    element: component.componentElement,
    payload: payload,
    queryParams: {
      query: customQueryParams ? customQueryParams.query : component.payloadSettings.query,
      sortKey: customQueryParams ? customQueryParams.sortKey : component.payloadSettings.sortBy,
      reverse: customQueryParams ? customQueryParams.reverse : component.payloadSettings.reverse,
      first: customQueryParams ? customQueryParams.first : component.payloadSettings.pageSize,
    },
    connectionParams: connectionParams,
    originalParams: {
      type: component.componentType,
      queryParams: {
        query: component.payloadSettings.query,
        sortKey: component.payloadSettings.sortBy,
        reverse: component.payloadSettings.reverse,
        first: component.payloadSettings.pageSize,
      },
      connectionParams: connectionParams,
    },
    hasParentPayload: payload ? true : false,
    customQueryParams: customQueryParams,
    dataType: component.componentType,
    lastCursorId: false,
    totalShown: 0,
    uniqueId: uniqid(),
    noResultsText: component.payloadSettings.noResultsText
      ? component.payloadSettings.noResultsText
      : 'No items left',
    isLoading: false,
    hasMoreItems: true,
    notices: [],
    variantsInventory: [],
    lastQuery: component.payloadSettings.query ? component.payloadSettings.query : false,
    payloadCache: {},
    afterLoading: afterLoading,
    beforeLoading: beforeLoading,
  }

  wp.hooks.doAction('items.init', itemsState)

  return itemsState
}

export { ItemsInitialState }
