function getProductsInitialState(options) {
   return {
      componentOptions: options.componentOptions,
      payload: options.payload,
      type: 'list',
      isLoading: false,
      element: options.element
   }
}

export { getProductsInitialState }
