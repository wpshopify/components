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
      showQuantity_label: true,
      quantityLabelText: 'Quantity 🎛'
   }
}

function getProductBuyButtonInitialState(productState = false, props = false) {
   console.log('getProductBuyButtonInitialState ... productState', productState)

   return {
      selectedOptions: {},
      availableVariants: [],
      allOptionsSelected: false,
      missingSelections: false,
      isAdding: false,
      quantity: 1,
      product: productState.payload ? productState.payload : false
   }
}

export { getProductBuyButtonInitialState }
