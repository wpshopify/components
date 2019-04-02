function getProductBuyButtonInitialState(productState = false, props = false) {
   return {
      selectedOptions: {},
      availableVariants: [],
      allOptionsSelected: false,
      missingSelections: false,
      isAdding: false,
      quantity: 1,
      product: productState.product ? productState.product : false,
      componentOptions: productState.componentOptions
   }
}

export { getProductBuyButtonInitialState }
