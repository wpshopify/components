function getProductInitialState(props) {
   return {
      product: props.product,
      selectedVariant: false,
      isFeaturedOnly: false,
      ...props
   }
}

export { getProductInitialState }
