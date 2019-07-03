function CollectionInitialState(payload) {
   return {
      payload: payload,
      products: payload.products,
      productOptions: [],
      element: false,
      selectedVariant: false
   }
}

export { CollectionInitialState }
