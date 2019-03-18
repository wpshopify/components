function getProductInitialState(product = false) {

   return {
      product: product,
      selectedVariant: false
   }

}

export {
   getProductInitialState
}