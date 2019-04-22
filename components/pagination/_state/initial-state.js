function getPaginationInitialState(options) {
   return {
      componentOptions: options.componentOptions,
      payload: options.payload,
      lastPayload: [],
      isLoading: false,
      isFirstLoad: true,
      hasResults: false,
      hasMoreItems: true,
      lastCursorId: options.lastCursorId,
      queryParams: options.queryParams
   }
}

export { getPaginationInitialState }
