function getProductsInitialState(options) {
   return {
      componentOptions: options.componentOptions,
      payload: options.payload,
      fullPayload: options.fullPayload,
      type: 'list',
      isLoading: false,
      element: options.element
   }
}

export { getProductsInitialState }
