function CollectionInitialState(payload) {
   return {
      payload: payload,
      products: payload.products,
      element: false,
      selectedVariant: false
   }
}

export { CollectionInitialState }
