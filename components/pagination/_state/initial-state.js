function PaginationInitialState(options) {
   return {
      element: options.element,
      componentOptions: options.componentOptions,
      payload: options.payload,
      type: 'list',
      isLoading: false,
      hasResults: false,
      lastCursorId: options.lastCursorId,
      queryParams: options.queryParams
   }
}

export { PaginationInitialState }
