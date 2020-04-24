import uniqid from 'uniqid'

function ItemsInitialState({
  component,
  afterLoading = false,
  beforeLoading = false,
  customQueryParams = false,
  payload = false,
}) {
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
    originalParams: {
      type: component.componentType,
      queryParams: {
        query: component.payloadSettings.query,
        sortKey: component.payloadSettings.sortBy,
        reverse: component.payloadSettings.reverse,
        first: component.payloadSettings.pageSize,
      },
      connectionParams: false,
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
