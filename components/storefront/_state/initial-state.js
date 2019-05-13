function StorefrontInitialState(options = {}) {
   return {
      componentID: options.componentID ? options.componentID : false,
      element: options.element ? options.element : false,
      renderFromServer: options.componentOptions ? options.componentOptions.renderFromServer : false,
      componentOptions: options.componentOptions ? options.componentOptions : false,
      isLoading: false,
      payload: [], // represents the actual filtered data (Products, collections, etc)
      selections: {},
      selectedTags: [],
      selectedTypes: [],
      selectedVendors: [],
      hasResults: false
   }
}

export { StorefrontInitialState }
