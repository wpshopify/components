function BuilderInitialState(options) {
   return {
      isReady: false,
      notices: [],
      shortcode: '[wps_products]',
      settings: WP_Shopify.settings
   }
}

export { BuilderInitialState }
