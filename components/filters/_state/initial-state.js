function getFiltersInitialState(options = {}) {
   return {
      componentID: options.componentID ? options.componentID : false,
      element: options.element ? options.element : false,
      renderFromServer: options.componentOptions ? options.componentOptions.renderFromServer : false,
      componentOptions: options.componentOptions ? options.componentOptions : false,
      isLoading: false,
      isBootstrapping: true,
      filterData: [],
      isLoading: false,
      filterParams: {
         query: '*',
         first: 10,
         sortKey: 'TITLE',
         reverse: false
      },
      selections: {},
      selectedTags: [],
      selectedTypes: [],
      selectedVendors: [],
      hasResults: false,
      hasNextPage: true,
      hasPrevPage: true
   }
}

export { getFiltersInitialState }
