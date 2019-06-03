function CartInitialState(options) {
   return {
      isUpdating: false,
      isCheckingOut: false,
      termsAccepted: true,
      buttons: options,
      title: wp.hooks.applyFilters('default.cart.title', 'Shopping cart'),
      checkoutText: 'Begin checkout'
   }
}

export { CartInitialState }
