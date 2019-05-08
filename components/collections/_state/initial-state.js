function CollectionsInitialState(options) {
   return {
      componentOptions: options.componentOptions ? options.componentOptions : false,
      payload: options.payload ? options.payload : [],
      element: options.element ? options.element : false,
      isLoading: false
   }
}

export { CollectionsInitialState }
