function getProductBuyButtonInitialState(props = false) {

   return {
      selectedOptions: {},
      availableVariants: [],
      allOptionsSelected: false,
      missingSelections: false,
      isAdding: false,
      product: props.product ? props.product : false,
      isLoading: props.isLoading ? props.isLoading : false
   }

}

export {
   getProductBuyButtonInitialState
}