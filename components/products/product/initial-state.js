function getProductInitialState({ options, ...props }) {

   return {
      product: options.product,
      componentID: options.componentID,
      element: options.element,
      gid: options.gid,
      excludes: options.excludes,
      renderFromServer: options.renderFromServer,
      selectedVariant: false,
      isFeaturedOnly: false,
      ...props
   }
}

export { getProductInitialState }
