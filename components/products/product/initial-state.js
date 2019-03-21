function getProductInitialState(product = false) {
   return {
      product: product,
      selectedVariant: false,
      isFeaturedOnly: false
   };
}

export { getProductInitialState };
