function ShopInitialState(props = false) {
   return {
      checkout: { lineItems: [] },
      notifyingCart: false,
      isReady: false,
      checkoutCache: {
         lineItems: [],
         variants: [],
         total: 0.0
      },
      isCartEmpty: true,
      settings: WP_Shopify.settings
   };
}

export { ShopInitialState };
