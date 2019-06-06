function ProductBuyButtonInitialState(productState = false) {
   return {
      selectedOptions: {},
      availableVariants: [],
      allOptionsSelected: false,
      missingSelections: false,
      quantity: 1,
      product: productState.payload ? productState.payload : false
   }
}

export { ProductBuyButtonInitialState }
