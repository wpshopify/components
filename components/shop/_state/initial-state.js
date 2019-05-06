function ShopInitialState(options = false) {
   return {
      checkout: { lineItems: [] },
      notifyingCart: false,
      isShopReady: false,
      checkoutCache: {
         lineItems: [],
         variants: [],
         total: 0.0
      },
      isCartEmpty: true,
      settings: WP_Shopify.settings
   }
}

export { ShopInitialState }
