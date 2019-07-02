function CartInitialState(options) {
   return {
      isUpdating: false,
      isCheckingOut: false,
      termsAccepted: true,
      cartOpen: false,
      buttons: options,
      notices: [],
      title: wp.hooks ? wp.hooks.applyFilters('default.cart.title', 'Shopping cart') : 'Shopping cart',
      checkoutText: wp.hooks ? wp.hooks.applyFilters('default.cart.checkout.text', 'Begin checkout') : 'Begin checkout'
   }
}

export { CartInitialState }
