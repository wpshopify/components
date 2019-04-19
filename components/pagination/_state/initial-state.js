function getPaginationInitialState(options) {
   return {
      componentItems: options.componentItems,
      payload: options.payload,
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
