function CartButtonInitialState(options) {
   console.log('::::::::::::::: options', options)

   return {
      componentID: options.componentID,
      element: options.element,
      renderFromServer: options.componentOptions.renderFromServer,
      componentOptions: options.componentOptions
   }
}

export { CartButtonInitialState }
