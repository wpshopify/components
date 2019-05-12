function ItemsInitialState(options = {}) {
   return {
      componentOptions: options.componentOptions,
      element: options.componentElement,
      payload: options.componentPayload ? options.componentPayload : [],
      queryParams: options.componentQueryParams ? options.componentQueryParams : {},
      originalParams: options.componentOriginalQueryParams ? options.componentOriginalQueryParams : false,
      dataType: options.componentType ? options.componentType : 'products',
      limit: options.componentOptions.limit ? parseInt(options.componentOptions.limit) : false,
      lastCursorId: options.componentPayloadLastCursor ? options.componentPayloadLastCursor : false,
      totalShown: options.componentPayload ? options.componentPayload.length : 0,
      noResultsText: options.componentOptions.noResultsText ? options.componentOptions.noResultsText : 'No items left',
      isLoading: false,
      hasMoreItems: true
   }
}

export { ItemsInitialState }
