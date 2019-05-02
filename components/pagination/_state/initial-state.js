function PaginationInitialState(options) {
   return {
      element: options.element,
      componentOptions: options.componentOptions,
      payload: options.payload,
      type: 'list',
      isLoading: false,
      hasResults: false,
      lastCursorId: options.lastCursorId,
      queryParams: options.queryParams,
      dataType: options.dataType,
      originalPayload: options.originalPayload,
      originalQueryParams: options.originalQueryParams,
      totalShown: options.payload ? options.payload.length : 0,
      limit: options.componentOptions.limit ? parseInt(options.componentOptions.limit) : false,
      hasMoreItems: true
   }
}

export { PaginationInitialState }
