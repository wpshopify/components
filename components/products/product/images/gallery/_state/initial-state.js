function ProductGalleryInitialState(productState) {
   return {
      featImage: productState.payload.images[0],
      featImageElement: false,
      featImagePlaceholder: {
         src: '',
         alt: 'WP Shopify Placeholder Image'
      }
   }
}

export { ProductGalleryInitialState }
