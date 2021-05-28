import isArray from 'lodash/isArray';
import has from 'lodash/has';
import { getHashFromQueryParams } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-utils';

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

  var payloadFinal = payload;

  if (payload && !isArray(payload)) {
    var payloadFinal = [payload];
  }

  if (payload && isArray(payload)) {
    var payloadFinal = payload;
  }

  const queryParams = {
    query: component.payloadSettings.query,
    sortKey: component.payloadSettings.sortBy,
    reverse: component.payloadSettings.reverse,
    first: component.payloadSettings.pageSize,
  };

  const newQueryId = getHashFromQueryParams(queryParams);

  const isModal = has(component, 'isModal') && component.isModal ? true : false;
  if (isModal) {
    component.payloadSettings.carousel = false;
  }
  var itemsState = {
    componentId: component.componentId,
    payloadSettings: component.payloadSettings,
    isModal: isModal,
    element: component.componentElement,
    payload: payloadFinal,
    queryParams: {
      query: customQueryParams ? customQueryParams.query : component.payloadSettings.query,
      sortKey: customQueryParams ? customQueryParams.sortKey : component.payloadSettings.sortBy,
      reverse: customQueryParams ? customQueryParams.reverse : component.payloadSettings.reverse,
      first: customQueryParams ? customQueryParams.first : component.payloadSettings.pageSize,
    },
    connectionParams: connectionParams,
    originalParams: {
      type: component.componentType ? component.componentType : 'products',
      queryParams: queryParams,
      connectionParams: connectionParams,
    },
    hasParentPayload: payload ? true : false,
    customQueryParams: customQueryParams,
    dataType: component.componentType ? component.componentType : 'products',
    lastCursorId: false,
    totalShown: 0,
    noResultsText: component.payloadSettings.noResultsText
      ? component.payloadSettings.noResultsText
      : wp.i18n.__('No items left', 'wpshopify'),
    isLoading: isParentLoading ? isParentLoading : false,
    isBootstrapping: true,
    isFetchingNew: false,
    isFetchingNext: false,
    newQueryId: newQueryId,
    nextQueryId: false,
    hasMoreItems: getDefaultHasMoreItems(payload),
    notices: [],
    variantsInventory: [],
    lastQuery: component.payloadSettings.query ? component.payloadSettings.query : false,
    payloadCache: {},
    afterLoading: afterLoading,
    beforeLoading: beforeLoading,
    htmlTemplate: component.payloadSettings.htmlTemplate,
    htmlTemplateData: false,
  };

  return itemsState;
}

export { ItemsInitialState };
