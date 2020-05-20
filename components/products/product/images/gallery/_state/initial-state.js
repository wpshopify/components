function ProductGalleryInitialState(productState) {
  return {
    product: productState.payload,
    featImage:
      productState.payload && productState.payload.images ? productState.payload.images[0] : false,
    featImageElement: false,
    featImagePlaceholder: {
      src: '',
      alt: wp.i18n.__('WP Shopify Placeholder Image', 'wpshopify'),
    },
  }
}

export { ProductGalleryInitialState }
