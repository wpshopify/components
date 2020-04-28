function hasManyVariants(payload) {
  if (!payload.variants) {
    return false
  }

  if (!payload.variants.length) {
    return false
  }

  if (payload.variants.length === 1 && payload.variants[0].title === 'Default Title') {
    return false
  }

  return true
}

function ProductInitialState(payload) {
  return {
    payload: payload,
    element: false,
    selectedVariant: false,
    addedToCart: false,
    hasManyImages: payload.images && payload.images.length > 1 ? true : false,
    hasManyVariants: hasManyVariants(payload),
  }
}

export { ProductInitialState }
