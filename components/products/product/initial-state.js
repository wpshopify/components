function getProductInitialState({ options, ...props }) {
   console.log('options.componentOptions', options.componentOptions)

   return {
      product: options.product,
      componentID: options.componentID,
      element: options.element,
      gid: options.gid,
      excludes: options.componentOptions.excludes,
      renderFromServer: options.componentOptions.renderFromServer,
      selectedVariant: false,
      isFeaturedOnly: false,
      pricing: {
         showing_compare_at: options.componentOptions.showing_compare_at,
         showing_local: options.componentOptions.showing_local,
         showing_price_range: options.componentOptions.showing_price_range
      },
      ...props
   }
}

export { getProductInitialState }
