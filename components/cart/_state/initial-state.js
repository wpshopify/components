function CartInitialState(options) {
   return {
      isUpdating: false,
      isCheckingOut: false,
      isCartOpen: false,
      termsAccepted: true,
      isCartEmpty: true,
      buttons: options,
      isReady: false,
      notices: [],
      checkoutCache: {
         lineItems: [],
         variants: [],
         total: 0.0
      },
      customAttributes: [],
      note: false,
      title: wp.hooks ? wp.hooks.applyFilters('default.cart.title', 'Shopping cart') : 'Shopping cart',
      checkoutText: wp.hooks ? wp.hooks.applyFilters('default.cart.checkout.text', 'Begin checkout') : 'Begin checkout'
   }
}

export { CartInitialState }
