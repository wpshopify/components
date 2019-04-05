function getProductGalleryInitialState() {
   return {
      featImage: false,
      featImageElement: false,
      featImagePlaceholder: {
         src: 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png',
         alt: 'WP Shopify Placeholder Image'
      }
   }
}

export { getProductGalleryInitialState }
