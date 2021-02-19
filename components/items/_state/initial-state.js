import shortid from 'shortid';

function getDefaultHasMoreItems(payload) {
  if (!payload || !payload.length) {
    return false;
  }

  return payload[payload.length - 1].hasNextPage;
}

function ItemsInitialState({
  component,
  afterLoading = false,
  beforeLoading = false,
  customQueryParams = false,
  payload = false,
  isParentLoading = false,
}) {
  if (component.componentType === 'collections') {
    var connectionParams = {
      first: parseInt(component.payloadSettings.products.pageSize),
      reverse: component.payloadSettings.products.reverse,
      sortKey: component.payloadSettings.products.sortBy,
      query: component.payloadSettings.products.query,
    };
  } else {
    var connectionParams = false;
  }

  var itemsState = {
    payloadSettings: component.payloadSettings,
    element: component.componentElement,
    payload: payload ? [payload] : false,
    queryParams: {
      query: customQueryParams ? customQueryParams.query : component.payloadSettings.query,
      sortKey: customQueryParams ? customQueryParams.sortKey : component.payloadSettings.sortBy,
      reverse: customQueryParams ? customQueryParams.reverse : component.payloadSettings.reverse,
      first: customQueryParams ? customQueryParams.first : component.payloadSettings.pageSize,
    },
    connectionParams: connectionParams,
    originalParams: {
      type: component.componentType ? component.componentType : 'products',
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
    dataType: component.componentType ? component.componentType : 'products',
    lastCursorId: false,
    totalShown: 0,
    uniqueId: shortid.generate(),
    noResultsText: component.payloadSettings.noResultsText
      ? component.payloadSettings.noResultsText
      : wp.i18n.__('No items left', 'wpshopify'),
    isLoading: isParentLoading ? isParentLoading : false,
    isBootstrapping: true,
    hasMoreItems: getDefaultHasMoreItems(payload),
    notices: [],
    variantsInventory: [],
    lastQuery: component.payloadSettings.query ? component.payloadSettings.query : false,
    payloadCache: {},
    afterLoading: afterLoading,
    beforeLoading: beforeLoading,
    htmlTemplate: component.payloadSettings.htmlTemplate,
  };

  return itemsState;
}

export { ItemsInitialState };
