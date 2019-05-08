function ItemsInitialState(options = {}) {
   return {
      componentOptions: options.componentOptions,
      element: options.element,
      payload: options.payload ? options.payload : [],
      queryParams: options.queryParams ? options.queryParams : {},
      originalParams: options.originalParams ? options.originalParams : false,
      dataType: options.dataType ? options.dataType : 'products',
      limit: options.componentOptions.limit ? parseInt(options.componentOptions.limit) : false,
      lastCursorId: options.lastCursorId ? options.lastCursorId : false,
      totalShown: options.payload ? options.payload.length : 0,
      noResultsText: options.componentOptions.noResultsText ? options.componentOptions.noResultsText : 'No items left',
      isLoading: false,
      hasMoreItems: true
   }
}

export { ItemsInitialState }
