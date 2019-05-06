function ItemsInitialState(options = {}) {
   return {
      componentOptions: options.componentOptions,
      element: options.element,
      payload: options.payload ? options.payload : [],
      queryParams: options.queryParams ? options.queryParams : {},
      dataType: options.dataType ? options.dataType : 'products',
      limit: options.componentOptions.limit ? parseInt(options.componentOptions.limit) : false,
      lastCursorId: options.lastCursorId ? options.lastCursorId : false,
      totalShown: options.payload ? options.payload.length : 0,
      isLoading: false,
      hasMoreItems: true
   }
}

export { ItemsInitialState }
