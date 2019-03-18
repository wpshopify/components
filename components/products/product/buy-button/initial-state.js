function getProductBuyButtonInitialState(product = false, props = false) {

   return {
      selectedOptions: {},
      availableVariants: [],
      allOptionsSelected: false,
      missingSelections: false,
      isAdding: false,
      quantity: 1,
      product: product ? product : false,
   }

}

export {
   getProductBuyButtonInitialState
}