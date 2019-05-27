function ProductInitialState(payload) {
   return {
      payload: payload,
      element: false,
      selectedVariant: false,
      hasManyImages: payload.images.length >= 2 ? true : false
   }
}

export { ProductInitialState }
