function ShopInitialState(options = false) {
   return {
      checkout: { lineItems: [] },
      notifyingCart: false,
      cartOpen: false,
      isShopReady: false,
      checkoutCache: {
         lineItems: [],
         variants: [],
         total: 0.0
      },
      notices: [],
      info: {
         currencyCode: 'USD',
         primaryDomain: {
            url: ''
         }
      },
      customAttributes: [],
      note: false,
      isCartEmpty: true,
      settings: WP_Shopify.settings
   }
}

export { ShopInitialState }
