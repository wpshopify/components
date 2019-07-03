function ShopInitialState(options = false) {
   return {
      checkout: { lineItems: [] },
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
      isMobile: WP_Shopify.misc.is_mobile,
      settings: WP_Shopify.settings
   }
}

export { ShopInitialState }
