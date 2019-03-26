function getProductInitialState({ options, ...props }) {
   console.log('props', props)

   return {
      product: options.product,
      componentID: options.componentID,
      element: options.element,
      gid: options.gid,
      renderFromServer: options.renderFromServer,
      selectedVariant: false,
      isFeaturedOnly: false,
      ...props
   }
}

export { getProductInitialState }
