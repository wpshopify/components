function defaultComponentOptions() {
   return {
      orderby: 'title',
      order: 'desc',
      limit: 10,
      buttonWidth: 1,
      buttonColor: '#000',
      buttonText: 'Add to cart',
      variantColor: '#69c7bf',
      hideQuantity: false,
      minQuantity: 1,
      maxQuantity: false,
      showQuantityLabel: true,
      quantityLabelText: 'Quantity 🎛'
   }
}

function getProductInitialState(options) {
   return {
      product: options.product,
      componentID: options.componentID,
      element: options.element,
      gid: options.gid,
      excludes: options.componentOptions.excludes,
      renderFromServer: options.componentOptions.renderFromServer,
      selectedVariant: false,
      componentOptions: options.componentOptions ? options.componentOptions : defaultComponentOptions()
   }
}

export { getProductInitialState }
