function getCartButtonInitialState(options) {
   return {
      componentID: options.componentID,
      element: options.element,
      renderFromServer: options.componentOptions.renderFromServer,
      componentOptions: options.componentOptions
   }
}

export { getCartButtonInitialState }
