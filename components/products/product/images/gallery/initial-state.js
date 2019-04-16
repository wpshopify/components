function getProductGalleryInitialState() {
   return {
      featImage: false,
      featImageElement: false,
      featImagePlaceholder: {
         src: '',
         alt: 'WP Shopify Placeholder Image'
      }
   }
}

export { getProductGalleryInitialState }
