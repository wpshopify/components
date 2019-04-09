function getProductInitialState(options) {
   return {
      product: options.product,
      componentID: options.componentID,
      element: options.element,
      gid: options.gid,
      excludes: options.componentOptions.excludes,
      renderFromServer: options.componentOptions.renderFromServer,
      selectedVariant: false,
      componentOptions: options.componentOptions
   }
}

export { getProductInitialState }
