function ProductGalleryInitialState(props) {
  return {
    product: props.payload,
    featImage: props.payload && props.payload.images ? props.payload.images[0] : false,
    featImageElement: false,
    featImagePlaceholder: {
      src: wp.hooks.applyFilters(
        'default.image.placeholder',
        wpshopify.misc.pluginsDirURL + 'public/imgs/placeholder.png',
        props
      ),
      alt: wp.i18n.__('WP Shopify Placeholder Image', 'wpshopify'),
    },
  };
}

export { ProductGalleryInitialState };
