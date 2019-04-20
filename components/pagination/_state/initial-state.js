function getPaginationInitialState(options) {
   return {
      componentOptions: options.componentOptions,
      payload: options.payload,
      fullPayload: options.fullPayload,
      isLoading: false,
      hasResults: false,
      queryParams: {
         query: '*',
         first: 10,
         sortKey: 'TITLE',
         reverse: false
      }
   }
}

export { getPaginationInitialState }
