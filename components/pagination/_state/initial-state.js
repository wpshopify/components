function PaginationInitialState(options) {
   console.log('/////////////// PaginationInitialState options', options)

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
      originalQueryParams: options.originalQueryParams
   }
}

export { PaginationInitialState }
