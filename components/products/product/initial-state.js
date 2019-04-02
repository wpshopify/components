function getProductInitialState({ options, ...props }) {
   console.log('options.componentOptions 🔥', options.componentOptions)

   return {
      product: options.product,
      componentID: options.componentID,
      element: options.element,
      gid: options.gid,
      excludes: options.componentOptions.excludes,
      renderFromServer: options.componentOptions.renderFromServer,
      selectedVariant: false,
      isFeaturedOnly: false,
      componentOptions: options.componentOptions,
      ...props
   }
}

export { getProductInitialState }
